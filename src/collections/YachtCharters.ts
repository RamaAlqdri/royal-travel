import { CollectionConfig } from 'payload';

const YachtCharters: CollectionConfig = {
  slug: 'yacht-charters', // Produk yang bisa dipesan
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true, // Siapa saja boleh membaca (GET) data hotel
    create: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa membuat
    update: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa mengubah
    delete: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa menghapus
  },
  fields: [
    {
      name: 'name', // Contoh: "Komodo National Park - 3 Days 2 Nights"
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      // Menghubungkan charter ke yacht induknya
      name: 'parentYacht',
      type: 'relationship',
      relationTo: 'yachts',
      required: true,
      hasMany: false,
    },
    // Tambahkan field lain seperti overview, media, dll.
    // ... (strukturnya sama persis seperti HotelRooms)
  ],
};

export default YachtCharters;