// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import Hotels from './collections/Hotels'
import HotelRooms from './collections/HotelRooms'
import GolfCourses from './collections/GolfCourses'
import GolfPackages from './collections/GolfPackages'
import Yachts from './collections/Yachts'
import YachtCharters from './collections/YachtCharters'
import Orders from './collections/Orders'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import PrivateJets from './collections/PrivateJets'
import JetCharters from './collections/JetCharters'

import { seed } from './payload/seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },

  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    // Tambahan baru:
    Hotels,
    HotelRooms,
    GolfCourses,
    GolfPackages,
    Yachts,
    YachtCharters,
    PrivateJets,
    JetCharters,
    Orders,
  ],
  onInit: async (payload) => {
    // Jika argumen --seed ada, jalankan proses seeding
    if (process.env.PAYLOAD_SEED) {
      await seed(payload)
    }
  },

  cors: [getServerSideURL(), 'http://127.0.0.1:5501', 'http://localhost:5500'].filter(Boolean),
  // cors: ['http://localhost:550', 'http://localhost:5173', 'https://royaltravel.id'],
  // csrf: ['http://localhost:5501', 'http://localhost:5173', 'https://royaltravel.id'],
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  endpoints: [
    {
      path: '/api/v1/orders',
      method: 'post',
      handler: async (req) => {
        const { payload } = req
        const body = await req.json()
        const { customer, items } = body

        if (!customer || !items || !Array.isArray(items) || items.length === 0) {
          return Response.json(
            { error: 'Struktur payload tidak valid atau item kosong.' },
            { status: 400 },
          )
        }

        try {
          let totalAmount = 0
          const processedItems = []

          const collectionSlugMap = {
            hotel: 'hotel-rooms',
            golf: 'golf-packages',
            yacht: 'yacht-charters',
            jet: 'jet-charters',
          }

          // 2. (PENTING) Ambil data produk secara lengkap untuk email
          for (const item of items) {
            const slug = collectionSlugMap[item.productType]
            if (!slug) throw new Error(`Tipe produk tidak dikenal: ${item.productType}`)

            const productDoc = await payload.findByID({
              collection: slug,
              id: item.productId,
              depth: 0, // Ambil hanya ID relasi, bukan data lengkap relasi di dalam produk
            })

            if (!productDoc) throw new Error(`Produk dengan ID ${item.productId} tidak ditemukan.`)

            const priceFromServer = productDoc.price
            totalAmount += priceFromServer * (item.quantity || 1)

            processedItems.push({
              product: {
                relationTo: slug,
                value: productDoc, // Simpan objek lengkap sementara untuk email
              },
              priceAtTimeOfPurchase: priceFromServer,
              quantity: item.quantity || 1,
              bookingDetails: item.bookingDetails,
            })
          }

          // 3. Buat dokumen pesanan di database
          const newOrder = await payload.create({
            collection: 'orders',
            data: {
              customerDetails: customer,
              // Saat menyimpan, kita hanya simpan ID-nya saja, bukan objek lengkap
              orderedItems: processedItems.map((item) => ({
                ...item,
                product: {
                  relationTo: item.product.relationTo,
                  value: item.product.value.id,
                },
              })),
              totalAmount: totalAmount,
              status: 'confirmed',
              invoiceNumber: `INV-${Date.now()}`,
            },
          })

          // Siapkan data lengkap untuk dikirim ke email
          const orderForEmail = {
            ...newOrder,
            orderedItems: processedItems, // Gunakan processedItems yang punya data produk lengkap
          }

          // 4. Panggil fungsi pengiriman email di sini
          // await sendInvoiceEmail(orderForEmail);

          // 5. Kirim respon sukses ke frontend
          return Response.json(
            {
              message: 'Pesanan berhasil dibuat dan invoice telah dikirim!',
              orderId: newOrder.id,
            },
            { status: 201 },
          )
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error)
          payload.logger.error(`Gagal membuat pesanan: ${errorMessage}`)
          return Response.json({ error: 'Terjadi kesalahan di server.' }, { status: 500 })
        }
      },
    },
  ],
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
