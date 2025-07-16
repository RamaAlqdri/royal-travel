import { CollectionConfig } from 'payload';

const GolfPackages: CollectionConfig = {
  slug: 'golf-packages', // Ini adalah "produk" yang bisa dipesan
  admin: {
    useAsTitle: 'package',
    description: 'Paket harga spesifik yang tersedia di sebuah lapangan golf.',
  },
  access: {
    read: () => true, // Siapa saja boleh membaca (GET) data hotel
    create: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa membuat
    update: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa mengubah
    delete: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa menghapus
  },
  fields: [
    {
      name: 'package', // Contoh: "18 Holes – Foreign Visitor"
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      // Menghubungkan paket ini ke lapangan golf induknya
      name: 'parentCourse',
      type: 'relationship',
      relationTo: 'golf-courses',
      required: true,
      hasMany: false,
    },
  ],
};

export default GolfPackages;