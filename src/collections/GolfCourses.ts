import { CollectionConfig } from 'payload';

const GolfCourses: CollectionConfig = {
  slug: 'golf-courses',
  admin: {
    useAsTitle: 'name',
    description: 'Informasi utama mengenai lapangan golf.',
  },
  access: {
    read: () => true, // Siapa saja boleh membaca (GET) data hotel
    create: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa membuat
    update: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa mengubah
    delete: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa menghapus
  },
  fields: [
    {
      name: 'name', // Contoh: New Kuta Golf
      type: 'text',
      required: true,
    },
    {
      name: 'island',
      type: 'text',
      required: true,
    },
    {
      name: 'hero', // Objek hero
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'tagline', type: 'text' },
        { name: 'location', type: 'text' },
      ],
    },
    {
      name: 'overview', // Objek overview
      type: 'group',
      fields: [
        { name: 'designer', type: 'text' },
        { name: 'difficultyLevel', type: 'text' },
        {
          name: 'courseDetails',
          type: 'group',
          fields: [
            { name: 'holes', type: 'number' },
            { name: 'par', type: 'number' },
          ],
        },
        {
          name: 'copywriting',
          type: 'richText', // richText lebih cocok untuk deskripsi panjang
        },
      ],
    },
    {
      name: 'facilities', // Array fasilitas
      type: 'array',
      fields: [
        { name: 'facility', type: 'text' },
      ],
    },
    {
      name: 'details', // Objek details
      type: 'group',
      fields: [
        { name: 'grassType', type: 'text' },
        { name: 'inclusions', type: 'textarea' },
        // Anda bisa tambahkan field lain seperti tee distances, dress code, dll.
      ],
    },
    {
      name: 'media', // Objek media
      type: 'group',
      fields: [
        {
          name: 'hero',
          type: 'upload',
          relationTo: 'media',
          required: true,
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

export default GolfCourses;