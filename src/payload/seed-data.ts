// src/payload/seed-data.ts

// Helper function untuk membuat objek RichText yang valid untuk editor Lexical
const createLexicalRichText = (text: string) => ({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: text,
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        type: 'paragraph', // Tipe yang benar adalah 'paragraph', bukan 'p'
        version: 1,
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    type: 'root',
    version: 1,
  },
});

export const hotelsData = [
  {
    "id": 13,
    "island": "Bali",
    "name": "Private Jet Villa",
    "type": "Unique Villa",
    "starting_price": 4013,
    "image": "img/hotels/private-jet-villa.jpg",
    "short_description": "World's first Boeing 737 conversion villa perched on Uluwatu cliffs with ocean views.",
    "overview": {
      "title": "The Private Jet Villa Experience",
      "caption": "Uluwatu, Bali",
      "subtitle": "An unparalleled luxury experience for discerning travelers atop the cliffs.",
      "description": createLexicalRichText("This unique abode boasts breathtaking views of the Indian Ocean, providing an exceptional setting that seamlessly blends comfort and elegance. Its innovative design promises an unforgettable stay."),
    },
    "facilities": [
      "Air conditioning available", "Bathrobe", "BBQ equipment",
      "Bed linens Included", "Enclosed living room",
      "Free parking private & covered", "Hairdryer", "Pool towels Included",
      "Safety box", "Swimming pool", "Terrace", "Toiletries",
      "Towels Included", "Smart home system", "Jacuzzi",
      "Carved marble bathtub", "Vanity table", "Dining area",
      "Sitting area", "Reading corner", "Minibar", "Hot tub",
      "Infinity pool", "Sun loungers", "Open fireplace with living room",
      "Wi-Fi"
    ],
    "media": {
      "hero": "img/hotels/private-jet-villa/1.JPG",
      "overview_1": "img/hotels/private-jet-villa/2.JPG",
      "overview_2": "img/hotels/private-jet-villa/3.JPG",
      "overview_3": "img/hotels/private-jet-villa/4.JPG",
    },
    "rooms": [
      {
        "id": 1,
        "name": "2 Bedrooms Villa",
        "price": 4013,
        "media": {
          "gallery": [
            "img/hotels/private-jet-villa/rooms/2-bedrooms/1.jpeg",
            "img/hotels/private-jet-villa/rooms/2-bedrooms/2.jpeg",
          ],
          "hero": "img/hotels/private-jet-villa/rooms/2-bedrooms/9.jpeg"
        },
        "review": [],
        "overview_title_small": "Unparalleled Aviation Luxury",
        "overview_title_main": "An Exclusive Retreat Above the Clouds.",
        "overview_description": createLexicalRichText("Step into a realm where avant-garde design meets the pinnacle of comfort. The 2 Bedrooms Villa, transformed from a Boeing 737, offers an immersive experience."),
      },
      {
        "id": 2,
        "name": "1 Bedrooms Villa",
        "price": 4013,
        "media": {
          "gallery": [
            "img/hotels/private-jet-villa/rooms/2-bedrooms/1.jpeg",
          ],
          "hero": "img/hotels/private-jet-villa/rooms/2-bedrooms/6.jpeg"
        },
        "review": [],
        "overview_title_small": "First Class Solitude",
        "overview_title_main": "Your Private Jet Sanctuary.",
        "overview_description": createLexicalRichText("The 1 Bedroom Villa offers an intimate yet opulent escape, meticulously converted from a section of a Boeing 737."),
      }
    ]
  },
  {
    "id": 19,
    "island": "NTB",
    "name": "Selong Selo",
    "type": "Villa",
    "starting_price": 115.42,
    "image": "img/hotels/selong-selo/bespoke-5-bedroom-samsara-1.webp",
    "short_description": "A five-star luxury resort and residence with custom-designed villas and breathtaking ocean views in Lombok.",
    "overview": {
      "title": "The Selong Selo Experience",
      "caption": "Lombok, Nusa Tenggara Barat",
      "subtitle": "Discover unparalleled hospitality and luxurious villas overlooking the stunning Selong Belanak Bay.",
      "description": createLexicalRichText("Nestled in the lush hills overlooking the turquoise waters of Selong Belanak Bay, Selong Selo Resort & Residences offers a five-star luxury escape."),
    },
    "facilities": [
      "BBQ Area", "Day Spa", "Gym", "Kids Club", "On Site Restaurant", "Outdoor Swimming Pool"
    ],
    "media": {
      "hero": "img/hotels/selong-selo/bespoke-5-bedroom-samsara-1.webp",
      "overview_1": "img/hotels/selong-selo/bespoke-5-bedroom-samsara-1.webp",
      "overview_2": "img/hotels/selong-selo/family-3-bedroom-asri-1.webp",
      "overview_3": "img/hotels/selong-selo/family-2-bedroom-1.webp"
    },
    "rooms": [
      {
        "id": 1,
        "name": "7 Bedroom Villas",
        "price": 464.72,
        "media": {
          "gallery": ["img/hotels/selong-selo/family-7-bedroom-maleo-1.webp"],
          "hero": "img/hotels/selong-selo/family-7-bedroom-maleo-1.webp"
        },
        "review": [],
        "overview_title_small": "Spacious Luxury for Large Groups",
        "overview_title_main": "7 Bedroom Villas",
        "overview_description": createLexicalRichText("Large and elegant bedrooms are spread throughout the villa, affording privacy to all guests."),
      },
      {
        "id": 6,
        "name": "1 Bedroom Villas",
        "price": 115.42,
        "media": {
          "gallery": ["img/hotels/selong-selo/1-bedroom-villa-1.webp"],
          "hero": "img/hotels/selong-selo/1-bedroom-villa-1.webp"
        },
        "review": [],
        "overview_title_small": "Relax in Style",
        "overview_title_main": "1 Bedroom Villas",
        "overview_description": createLexicalRichText("Intimate, private, luxurious, and generous – these are just a few adjectives that describe our 1-bedroom villas."),
      }
    ]
  },
];

export const golfCoursesData = [
  {
    "id": 5,
    "island": "ntb",
    "name": "Kosaido Country Club",
    "type": "golf",
    "hero": {
      "title": "Kosaido Country Club",
      "tagline": "Lombok's premier international championship course.",
      "location": "Lombok Island, West Nusa Tenggara, Indonesia",
    },
    "overview": {
      "designer": "Peter Thompson, Michael Wolveridge & Perret",
      "difficultyLevel": "Championship",
      "courseDetails": { "holes": 18, "par": 72 },
      "copywriting": createLexicalRichText("Formerly known as Kosaido Country Club, Sire Beach Golf is the only international 18-hole, par-72 championship course in Lombok Island. Holes 1–9 face the sea with the signature hole #4 adjacent to the white sandy beach."),
    },
    "pricing": [
      { "package": "Weekdays Golf fee (inclusive of caddy fee, green fee & cart fee)", "price": "$76" },
      { "package": "Weekends/Public Holiday Golf fee (inclusive of caddy fee, green fee & cart fee)", "price": "$92" },
    ],
    "facilities": [
      "Golf Course",
      "Driving range",
      "Pro shop"
    ],
    "details": {
      "grassType": "Bermuda",
      "golfInclusions": "Caddy fee, green fee & cart fee included",
    },
    "media": {
      "hero": "img/golf/courses/kosaido-country-club/1.jpg",
      "gallery": [
        "img/golf/courses/kosaido-country-club/1.jpg",
        "img/golf/courses/kosaido-country-club/2.jpeg",
      ]
    }
  },
  {
    "id": 6,
    "island": "bali",
    "name": "New Kuta Golf",
    "type": "golf",
    "hero": {
      "title": "New Kuta Golf",
      "tagline": "Indonesia's first links-style layout perched on a limestone cliff.",
      "location": "Pecatu Indah Resort, Bukit Peninsula, Bali, Indonesia",
    },
    "overview": {
      "designer": "Ronald Fream, David Dale & Kevin Ramsey (USA)",
      "difficultyLevel": "Championship",
      "courseDetails": { "holes": 18, "par": 72 },
      "copywriting": createLexicalRichText("New Kuta Golf is an 85 hectare championship standard course and the first links-style layout in Indonesia. Located on a limestone cliff overlooking Dreamland and Balangan Beach."),
    },
    "pricing": [
      { "package": "18 Holes – Foreign Visitor (Non KIM's Holder)", "price": "$140" },
      { "package": "9 Holes (Sunset) – Non KITAS Guest", "price": "$92" },
    ],
    "facilities": [
      "Restaurant", "Driving range", "Pro Shop", "Golf Academy", "Locker Room"
    ],
    "details": {
      "grassType": "Seashore Paspalum",
      "inclusions": "Green fee, cart fee, caddy service, player's insurance, TAX 11% VAT & Complimentary 2 Bottles of Mineral Water",
    },
    "media": {
      "hero": "img/golf/courses/new-kuta-golf/1.jpg",
      "gallery": [
        "img/golf/courses/new-kuta-golf/1.jpg",
        "img/golf/courses/new-kuta-golf/2.jpg",
      ]
    }
  },
];
