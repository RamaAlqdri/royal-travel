import { CollectionConfig } from 'payload';

const HotelRooms: CollectionConfig = {
  slug: 'hotel-rooms', // Ini adalah "produk" yang bisa dipesan
  admin: {
    useAsTitle: 'name',
    description: 'Tipe kamar atau unit spesifik di dalam sebuah hotel.',
  },
  access: {
    read: () => true, // Siapa saja boleh membaca (GET) data hotel
    create: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa membuat
    update: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa mengubah
    delete: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa menghapus
  },
  fields: [
    {
      name: 'name', // Contoh: "2 Bedrooms Villa"
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      // Ini cara menghubungkan kamar ke hotel induknya
      name: 'parentHotel',
      type: 'relationship',
      relationTo: 'hotels', // Menunjuk ke slug collection 'Hotels'
      required: true,
      hasMany: false,
    },
    {
      name: 'overview',
      type: 'group',
      fields: [
        { name: 'title_small', type: 'text' },
        { name: 'title_main', type: 'text' },
        { name: 'description', type: 'richText' },
      ],
    },
    {
      name: 'media',
      type: 'group',
      fields: [
        {
          name: 'hero',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'gallery',
          type: 'array',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default HotelRooms;