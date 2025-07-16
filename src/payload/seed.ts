// src/payload/seed.ts
import type { Payload } from 'payload';
import path from 'path';
import fs from 'fs';
import { hotelsData, golfCoursesData } from './seed-data';

export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info('Mulai proses seeding...');

  try {
    // --- 1. Buat Media (Gambar Placeholder) ---
    payload.logger.info('Membuat data media...');
    const placeholderImagePath = path.resolve(process.cwd(), 'src/payload/placeholder.jpg');

    // Pastikan file ada sebelum melanjutkan
    if (!fs.existsSync(placeholderImagePath)) {
      throw new Error(`File placeholder tidak ditemukan di path: ${placeholderImagePath}. Pastikan file 'placeholder.jpg' ada di dalam folder 'src/payload/'.`);
    }

    const hotelPlaceholder = await payload.create({
      collection: 'media',
      data: { alt: 'Placeholder Hotel' },
      filePath: placeholderImagePath,
    });

    const golfPlaceholder = await payload.create({
      collection: 'media',
      data: { alt: 'Placeholder Golf' },
      filePath: placeholderImagePath,
    });

    payload.logger.info('Data media berhasil dibuat.');

    // --- 2. Buat Hotels dan Hotel Rooms ---
    payload.logger.info('Membuat data hotels dan rooms...');
    for (const hotel of hotelsData) {
      const newHotel = await payload.create({
        collection: 'hotels',
        data: {
          name: hotel.name,
          island: hotel.island,
          type: hotel.type,
          starting_price: hotel.starting_price,
          short_description: hotel.short_description,
          overview: hotel.overview,
          facilities: hotel.facilities.map(f => ({ facility: f })),
          media: {
            hero: hotelPlaceholder.id,
            overview_1: hotelPlaceholder.id,
            overview_2: hotelPlaceholder.id,
            overview_3: hotelPlaceholder.id,
          },
        },
      });

      for (const room of hotel.rooms) {
        await payload.create({
          collection: 'hotel-rooms',
          data: {
            name: room.name,
            price: room.price,
            parentHotel: newHotel.id,
            overview: {
              title_small: room.overview_title_small,
              title_main: room.overview_title_main,
              description: room.overview_description,
            },
            media: {
              hero: hotelPlaceholder.id,
              gallery: room.media.gallery.map(() => ({ image: hotelPlaceholder.id })),
            },
          },
        });
      }
    }
    payload.logger.info('Data hotels dan rooms berhasil dibuat.');

    // --- 3. Buat Golf Courses dan Golf Packages ---
    payload.logger.info('Membuat data golf courses dan packages...');
    for (const course of golfCoursesData) {
      const newCourse = await payload.create({
        collection: 'golf-courses',
        data: {
          name: course.name,
          island: course.island,
          hero: course.hero,
          overview: course.overview,
          facilities: course.facilities.map(f => ({ facility: f })),
          details: course.details,
          media: {
            hero: golfPlaceholder.id,
            gallery: course.media.gallery.map(() => ({ image: golfPlaceholder.id })),
          },
        },
      });

      for (const pkg of course.pricing) {
        await payload.create({
          collection: 'golf-packages',
          data: {
            package: pkg.package,
            price: Number(pkg.price.replace(/[^0-9.-]+/g, "")),
            parentCourse: newCourse.id,
          },
        });
      }
    }
    payload.logger.info('Data golf berhasil dibuat.');

    payload.logger.info('Proses seeding selesai!');

  } catch (err) {
    payload.logger.error(`Error saat seeding: ${err.message}`);
  }
};
