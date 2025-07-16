import { CollectionConfig } from 'payload';

const Hotels: CollectionConfig = {
  slug: 'hotels',
  admin: {
    useAsTitle: 'name',
    description: 'Properti hotel atau villa utama.',
  },
  access: {
    read: () => true, // Siapa saja boleh membaca (GET) data hotel
    create: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa membuat
    update: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa mengubah
    delete: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa menghapus
  },
  fields: [
    {
      name: 'name', // Contoh: Private Jet Villa
      type: 'text',
      required: true,
    },
    {
      name: 'island', // Contoh: Bali
      type: 'text',
      required: true,
    },
    {
      name: 'type', // Contoh: Unique Villa
      type: 'text',
    },
    {
      name: 'starting_price',
      type: 'number',
    },
    {
      name: 'short_description',
      type: 'textarea',
    },
    {
      name: 'overview', // Mereplikasi objek 'overview'
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'caption', type: 'text' },
        { name: 'subtitle', type: 'text' },
        { name: 'description', type: 'richText' }, // richText untuk format HTML
      ],
    },
    {
      name: 'facilities', // Mereplikasi array 'facilities'
      type: 'array',
      fields: [
        { name: 'facility', type: 'text' },
      ],
    },
    {
      name: 'media', // Mereplikasi objek 'media'
      type: 'group',
      fields: [
        {
          name: 'hero',
          type: 'upload',
          relationTo: 'media', // Menghubungkan ke Media Collection
          required: true,
        },
        {
          name: 'overview_1',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'overview_2',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'overview_3',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
};

export default Hotels;