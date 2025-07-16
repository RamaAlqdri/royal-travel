import { CollectionConfig } from 'payload';

const PrivateJets: CollectionConfig = {
  slug: 'private-jets',
  admin: {
    useAsTitle: 'name',
    description: 'Informasi mengenai armada jet pribadi yang tersedia.',
  },
  access: {
    read: () => true, // Siapa saja boleh membaca (GET) data hotel
    create: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa membuat
    update: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa mengubah
    delete: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa menghapus
  },
  fields: [
    {
      name: 'name', // Contoh: Gulfstream G650ER
      type: 'text',
      required: true,
    },
    {
      name: 'type', // Contoh: Ultra Long Range Jet
      type: 'text',
    },
    {
      name: 'homeBase', // Menggantikan 'island' untuk lebih relevan
      label: 'Home Base',
      type: 'text',
      admin: {
        description: 'Lokasi utama atau bandara asal jet ini.',
      }
    },
    {
      name: 'startingPrice',
      label: 'Harga Mulai (per jam)',
      type: 'number',
    },
    {
      name: 'short_description',
      type: 'textarea',
    },
    {
      name: 'overview',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'caption', type: 'text' },
        { name: 'subtitle', type: 'text' },
        { name: 'description', type: 'richText' },
      ],
    },
    {
      name: 'facilities',
      type: 'array',
      fields: [
        { name: 'facility', type: 'text' },
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

export default PrivateJets;