import { CollectionConfig } from 'payload';

const Yachts: CollectionConfig = {
  slug: 'yachts',
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
      name: 'name', // Contoh: The Phinisi 'Nusantara'
      type: 'text',
      required: true,
    },
    {
      name: 'type', // Contoh: Traditional Phinisi
      type: 'text',
    },
    {
      name: 'island', // Lokasi utama
      type: 'text',
    },
    {
      name: 'starting_price',
      type: 'number',
    },
    // Tambahkan field lain seperti short_description, overview, facilities, media
    // ... (strukturnya sama persis dengan Hotels)
  ],
};

export default Yachts;