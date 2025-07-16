import { CollectionConfig } from 'payload'

const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'invoiceNumber',
    description: 'Kumpulan semua pesanan yang masuk dari pelanggan.',
  },
  
  access: {
    create: () => true,
    read: ({ req }) => {
      if (req.user && req.user.collection === 'users') {
        return true
      }
      return false
    },
    update: ({ req }) => !!req.user && req.user.collection === 'users',
    delete: ({ req }) => !!req.user && req.user.collection === 'users',
  },
  fields: [
    {
      name: 'invoiceNumber',
      type: 'text',
      label: 'Nomor Invoice',
      unique: true,
      admin: {
        readOnly: true, // Sebaiknya dibuat otomatis oleh server
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status Pesanan',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'pending',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'totalAmount',
      type: 'number',
      label: 'Total Harga',
      required: true,
      admin: {
        readOnly: true, // Dihitung otomatis oleh server
        position: 'sidebar',
      },
    },
    {
      type: 'tabs', // Menggunakan Tabs untuk layout yang lebih rapi di Admin
      tabs: [
        {
          label: 'Detail Pelanggan',
          fields: [
            // Field-field ini dikelompokkan di bawah satu tab
            {
              name: 'customerDetails',
              type: 'group',
              fields: [
                {
                  name: 'firstName',
                  type: 'text',
                  label: 'Nama Depan',
                  required: true,
                },
                {
                  name: 'lastName',
                  type: 'text',
                  label: 'Nama Belakang',
                },
                {
                  name: 'email',
                  type: 'email',
                  label: 'Email',
                  required: true,
                },
                {
                  name: 'phoneNumber',
                  type: 'text',
                  label: 'Nomor Ponsel',
                },
              ],
            },
          ],
        },
        {
          label: 'Item Pesanan',
          fields: [
            // Array untuk menampung item-item yang dipesan
            {
              name: 'orderedItems',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'product',
                  type: 'relationship',
                  // INI BAGIAN PALING PENTING (Relasi Polimorfik)
                  // Menghubungkan ke SEMUA jenis produk yang bisa dipesan
                  relationTo: ['hotel-rooms', 'golf-packages', 'yacht-charters', 'jet-charters'],
                  required: true,
                },
                {
                  name: 'priceAtTimeOfPurchase',
                  label: 'Harga Saat Pesan',
                  type: 'number',
                  required: true,
                  admin: {
                    description: 'Harga produk per unit saat transaksi dibuat.',
                  },
                },
                {
                  name: 'quantity',
                  type: 'number',
                  defaultValue: 1,
                },
                {
                  name: 'bookingDetails',
                  label: 'Detail Booking',
                  type: 'json',
                  admin: {
                    description: 'Informasi spesifik seperti tanggal check-in, jumlah tamu, dll.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Orders
