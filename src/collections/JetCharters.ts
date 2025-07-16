import { CollectionConfig } from 'payload';

const JetCharters: CollectionConfig = {
  slug: 'jet-charters', // Ini adalah "produk" yang bisa dipesan
  admin: {
    useAsTitle: 'name',
    description: 'Paket charter atau rute spesifik untuk jet pribadi.',
  },
  access: {
    read: () => true, // Siapa saja boleh membaca (GET) data hotel
    create: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa membuat
    update: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa mengubah
    delete: ({ req }) => req.user?.collection === 'users', // Hanya admin yang bisa menghapus
  },
  fields: [
    {
      name: 'name', // Contoh: "One-Way: Jakarta (HLP) to Singapore (XSP)"
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      // Menghubungkan charter ke jet induknya
      name: 'parentJet',
      type: 'relationship',
      relationTo: 'private-jets',
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

export default JetCharters;