import { Venue, User, EventItem, EventLayout, Guest, Vendor, ScheduleItem, BudgetItem, NotificationItem } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_karthick',
    name: 'Karthick Raman',
    email: 'karthick@venueflow.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    phone: '+1 (555) 234-5678',
    preferredEventType: 'Wedding',
    currency: 'USD',
    createdAt: '2026-01-15T08:00:00.000Z'
  },
  {
    id: 'user_admin',
    name: 'VenueFlow Administrator',
    email: 'admin@venueflow.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    phone: '+1 (555) 999-0000',
    currency: 'USD',
    createdAt: '2026-01-01T00:00:00.000Z'
  }
];

export const INITIAL_VENUES: Venue[] = [
  {
    id: 'grand-aurora',
    name: 'Grand Aurora Palatial Estate',
    tagline: 'Neoclassical grandeur with crystal illuminations and majestic gardens',
    description: 'The Grand Aurora is an architectural masterpiece designed for extraordinary celebrations. Boasting Italian marble arches, towering 28-foot coffered ceilings, and bespoke crystal chandeliers, it seamlessly bridges heritage opulence with state-of-the-art concert acoustic fidelity and private garden terraces.',
    location: 'Beverly Hills, California',
    city: 'Los Angeles',
    capacityMin: 150,
    capacityMax: 550,
    pricePerDay: 12500,
    sqFt: 18500,
    featured: true,
    rating: 4.96,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80'
    ],
    supportedEvents: ['Wedding', 'Corporate', 'Social', 'Entertainment'],
    amenities: [
      'Bridal Suite with Private Salon',
      'Full Concert-Grade Audio/Visual',
      'Commercial Culinary Kitchen',
      'Valet Parking (250 vehicles)',
      'Outdoor Twilight Garden Fountain',
      'Dedicated Security Detail',
      'High-Speed Gig Multi-Zone WiFi'
    ],
    rules: {
      curfew: '01:30 AM',
      outsideCatering: true,
      valetParking: true,
      soundLimitDb: 98
    }
  },
  {
    id: 'glasshouse-pavilion',
    name: 'The Glasshouse Botanical Pavilion',
    tagline: 'Modern glass conservatory bathed in canopy fairy lights and flora',
    description: 'An ethereal architectural glass dome nestled inside a manicured botanical sanctuary. Natural sunlight filters through structural brass prisms during the day, transforming into a constellation of suspended fairy lights and starlit ambiance by night.',
    location: 'Hudson Valley, New York',
    city: 'New York',
    capacityMin: 80,
    capacityMax: 320,
    pricePerDay: 9800,
    sqFt: 12000,
    featured: true,
    rating: 4.92,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80'
    ],
    supportedEvents: ['Wedding', 'Birthday', 'Social', 'Corporate'],
    amenities: [
      'Climate-Controlled Glass Structure',
      'Integrated Botanical Floral Trellises',
      'Ambient LED Uplighting Suite',
      'Riverside Cocktail Lawn',
      'Green Room & Lounge',
      'Prep Kitchen'
    ],
    rules: {
      curfew: '00:00 AM',
      outsideCatering: true,
      valetParking: false,
      soundLimitDb: 92
    }
  },
  {
    id: 'villa-bella-vista',
    name: 'Villa Bella Vista Terraces',
    tagline: 'Mediterranean hilltop estate overlooking rolling vineyards & sunset',
    description: 'Perched high above serene valleys, Villa Bella Vista brings timeless Tuscan romance to life. Stone courtyards, aged olive groves, and panoramic sunset terraces provide an unforgettable backdrop for gala dinners and intimate soirees.',
    location: 'Napa Valley, California',
    city: 'San Francisco',
    capacityMin: 50,
    capacityMax: 240,
    pricePerDay: 11000,
    sqFt: 15000,
    featured: true,
    rating: 4.95,
    reviewsCount: 116,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80'
    ],
    supportedEvents: ['Wedding', 'Social', 'Corporate', 'Birthday'],
    amenities: [
      'Private Estate Vineyard Access',
      'Infinity Pool Lounge Area',
      'Bistro String Lighting Canopy',
      'Sommelier Tasting Cellar',
      'Guest Cottages On-Site'
    ],
    rules: {
      curfew: '01:00 AM',
      outsideCatering: true,
      valetParking: true,
      soundLimitDb: 94
    }
  },
  {
    id: 'celestial-skyline-loft',
    name: 'Celestial Skyline Penthouse Loft',
    tagline: 'Modern 360-degree metropolitan skyline views and dramatic sunset glass',
    description: 'Rising 48 stories above downtown, this duplex penthouse loft offers breathtaking 360-degree skyline views through floor-to-ceiling glass walls. Featuring minimalist black steel finishes, wrap-around observation terrace, and precision acoustics.',
    location: 'Downtown Manhattan, New York',
    city: 'New York',
    capacityMin: 40,
    capacityMax: 190,
    pricePerDay: 8500,
    sqFt: 7500,
    featured: false,
    rating: 4.88,
    reviewsCount: 79,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    supportedEvents: ['Corporate', 'Entertainment', 'Social', 'Birthday'],
    amenities: [
      '360° Panoramic Skyline Views',
      'Dual High-Speed Private Elevators',
      'Luminescent Onyx Bar Counter',
      'Integrated DJ & Sound Rig',
      'Executive Boardroom Suite'
    ],
    rules: {
      curfew: '02:00 AM',
      outsideCatering: true,
      valetParking: true,
      soundLimitDb: 96
    }
  },
  {
    id: 'royal-orchid-convention',
    name: 'Royal Orchid Convention & Gala Hall',
    tagline: 'Expansive grand arena for keynote summits, expos and royal receptions',
    description: 'Equipped to accommodate up to 850 guests in total luxury. The Royal Orchid combines divisible acoustic wall partitions, stadium-grade LED projection rigs, and lavish staging for national summits and grand cultural galas.',
    location: 'Chicago Loop, Illinois',
    city: 'Chicago',
    capacityMin: 200,
    capacityMax: 850,
    pricePerDay: 16500,
    sqFt: 28000,
    featured: false,
    rating: 4.89,
    reviewsCount: 164,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80'
    ],
    supportedEvents: ['Corporate', 'Academic', 'Entertainment', 'Wedding'],
    amenities: [
      'Dual 4K Laser Projection Walls',
      'Modular Partition Wall System',
      'Simultaneous Translation Booths',
      'Loading Bay with Freight Elevators',
      'Dedicated Media Room'
    ],
    rules: {
      curfew: '02:00 AM',
      outsideCatering: false,
      valetParking: true,
      soundLimitDb: 105
    }
  },
  {
    id: 'courtyard-manor-estate',
    name: 'The Courtyard Manor Estate',
    tagline: 'Timeless stone manor courtyard wrapped in ivy and warm festoon lighting',
    description: 'An 18th-century stone country estate with secluded courtyards, fountain verandas, and rustic wood-beam banqueting halls. Ideal for romantic ceremonies, heritage celebrations, and academic symposiums.',
    location: 'Charlottesville, Virginia',
    city: 'Washington DC',
    capacityMin: 60,
    capacityMax: 260,
    pricePerDay: 7900,
    sqFt: 11500,
    featured: false,
    rating: 4.91,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80'
    ],
    supportedEvents: ['Wedding', 'Academic', 'Social', 'Birthday'],
    amenities: [
      'Cobblestone Open-Air Courtyard',
      'Heated Limestone Fireplaces',
      'Historic Library Lounge',
      'On-site Bridal & Groom Suites',
      'Private Forest Walking Trails'
    ],
    rules: {
      curfew: '23:30 PM',
      outsideCatering: true,
      valetParking: false,
      soundLimitDb: 88
    }
  },
  {
    id: 'horizon-beach-pavilion',
    name: 'Horizon Oceanside Sunset Pavilion',
    tagline: 'Coastal luxury with crashing waves, fire bowls and open-air sea breezes',
    description: 'Where contemporary beachfront sophistication meets the calm Pacific shoreline. Elevated wooden deck platforms, teak lounge furniture, open fire cauldrons, and unobstructed sunset vistas create a magical setting.',
    location: 'Malibu Coast, California',
    city: 'Los Angeles',
    capacityMin: 70,
    capacityMax: 360,
    pricePerDay: 13500,
    sqFt: 16000,
    featured: false,
    rating: 4.97,
    reviewsCount: 130,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    supportedEvents: ['Wedding', 'Social', 'Entertainment', 'Corporate'],
    amenities: [
      'Direct Private Beach Boardwalk',
      'Artisan Teak Bar & Lounge',
      'Gas Fire Bowls & Patio Heaters',
      'Oceanfront Ceremony Platform',
      'Valet Shuttle Fleet'
    ],
    rules: {
      curfew: '00:30 AM',
      outsideCatering: true,
      valetParking: true,
      soundLimitDb: 90
    }
  },
  {
    id: 'industrial-foundry',
    name: 'The Foundry Creative Warehouse',
    tagline: 'Industrial-chic brick foundry with copper lights, steel trusses and raw vibe',
    description: 'A restored 1920s metalworks factory transformed into an atmospheric industrial canvas. Raw exposed brickwork, black iron trusses, polished aggregate concrete, and skylights produce an edgy, high-impact venue for tech product launches and music shows.',
    location: 'Austin, Texas',
    city: 'Austin',
    capacityMin: 50,
    capacityMax: 300,
    pricePerDay: 6800,
    sqFt: 9800,
    featured: false,
    rating: 4.85,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'
    ],
    supportedEvents: ['Entertainment', 'Corporate', 'Birthday', 'Other'],
    amenities: [
      'Heavy Truss Rigging Points (10-ton load)',
      'DMX Architectural Lighting Rig',
      'Roll-up Drive-In Access Doors',
      'Artist Green Room with Private Shower',
      'Acoustic Baffling Panels'
    ],
    rules: {
      curfew: '03:00 AM',
      outsideCatering: true,
      valetParking: false,
      soundLimitDb: 104
    }
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'event_wedding_karthick',
    userId: 'user_karthick',
    title: "Karthick & Maya's Royal Wedding",
    eventType: 'Wedding',
    date: '2026-10-18',
    venueId: 'grand-aurora',
    venueName: 'Grand Aurora Palatial Estate',
    venueImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    guestTargetCount: 350,
    totalBudget: 48000,
    notes: 'Twilight reception with live orchestral quartet, candlelit dinner, and fireworks send-off.',
    createdAt: '2026-02-01T10:00:00.000Z'
  },
  {
    id: 'event_summit_karthick',
    userId: 'user_karthick',
    title: 'TechVision Global Summit 2026',
    eventType: 'Corporate',
    date: '2026-11-20',
    venueId: 'celestial-skyline-loft',
    venueName: 'Celestial Skyline Penthouse Loft',
    venueImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    guestTargetCount: 150,
    totalBudget: 32000,
    notes: 'Annual executive board symposium & product reveal keynote.',
    createdAt: '2026-02-15T14:30:00.000Z'
  }
];

export const INITIAL_LAYOUTS: EventLayout[] = [
  {
    id: 'layout_wedding',
    eventId: 'event_wedding_karthick',
    name: 'Grand Ballroom Master Layout',
    canvasWidth: 900,
    canvasHeight: 600,
    lastUpdated: '2026-03-10T16:20:00.000Z',
    elements: [
      {
        id: 'elem_stage_1',
        type: 'stage',
        label: 'Main Stage & Altar',
        x: 320,
        y: 40,
        width: 260,
        height: 70,
        rotation: 0,
        color: '#8b5cf6'
      },
      {
        id: 'elem_dancefloor_1',
        type: 'dancefloor',
        label: 'Central Dance Floor',
        x: 350,
        y: 190,
        width: 200,
        height: 160,
        rotation: 0,
        color: '#ec4899'
      },
      {
        id: 'elem_head_table',
        type: 'table-rect',
        label: 'VIP Head Table (Bride & Groom)',
        x: 340,
        y: 130,
        width: 220,
        height: 40,
        rotation: 0,
        capacity: 10,
        color: '#f59e0b'
      },
      {
        id: 'elem_table_1',
        type: 'table-round',
        label: 'Table 1 (Family East)',
        x: 170,
        y: 160,
        width: 80,
        height: 80,
        rotation: 0,
        capacity: 10,
        color: '#6366f1'
      },
      {
        id: 'elem_table_2',
        type: 'table-round',
        label: 'Table 2 (Family West)',
        x: 650,
        y: 160,
        width: 80,
        height: 80,
        rotation: 0,
        capacity: 10,
        color: '#6366f1'
      },
      {
        id: 'elem_table_3',
        type: 'table-round',
        label: 'Table 3 (Colleagues)',
        x: 170,
        y: 280,
        width: 80,
        height: 80,
        rotation: 0,
        capacity: 10,
        color: '#6366f1'
      },
      {
        id: 'elem_table_4',
        type: 'table-round',
        label: 'Table 4 (Friends)',
        x: 650,
        y: 280,
        width: 80,
        height: 80,
        rotation: 0,
        capacity: 10,
        color: '#6366f1'
      },
      {
        id: 'elem_table_5',
        type: 'table-round',
        label: 'Table 5 (High School)',
        x: 230,
        y: 400,
        width: 80,
        height: 80,
        rotation: 0,
        capacity: 10,
        color: '#6366f1'
      },
      {
        id: 'elem_table_6',
        type: 'table-round',
        label: 'Table 6 (International Guests)',
        x: 590,
        y: 400,
        width: 80,
        height: 80,
        rotation: 0,
        capacity: 10,
        color: '#6366f1'
      },
      {
        id: 'elem_bar_1',
        type: 'bar',
        label: 'Champagne & Cocktail Island',
        x: 60,
        y: 220,
        width: 60,
        height: 180,
        rotation: 0,
        color: '#06b6d4'
      },
      {
        id: 'elem_photobooth_1',
        type: 'photobooth',
        label: 'Vintage Glam Photobooth',
        x: 770,
        y: 220,
        width: 80,
        height: 80,
        rotation: 0,
        color: '#10b981'
      },
      {
        id: 'elem_entrance_1',
        type: 'entrance',
        label: 'Grand Floral Entrance Arch',
        x: 370,
        y: 520,
        width: 160,
        height: 40,
        rotation: 0,
        color: '#a855f7'
      },
      {
        id: 'elem_dj_1',
        type: 'dj',
        label: 'DJ & Lighting Console',
        x: 400,
        y: 380,
        width: 100,
        height: 50,
        rotation: 0,
        color: '#f43f5e'
      }
    ]
  }
];

export const INITIAL_GUESTS: Guest[] = [
  {
    id: 'guest_1',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    name: 'Maya Elizabeth Chen',
    email: 'maya.chen@gmail.com',
    phone: '+1 (555) 432-8765',
    rsvpStatus: 'attending',
    plusOnes: 0,
    dietary: 'Gluten-free',
    assignedTableId: 'elem_head_table',
    assignedTableName: 'VIP Head Table (Bride & Groom)',
    notes: 'Bride',
    updatedAt: '2026-03-01'
  },
  {
    id: 'guest_2',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    name: 'Vikram Raman',
    email: 'vikram.raman@gmail.com',
    phone: '+1 (555) 234-1122',
    rsvpStatus: 'attending',
    plusOnes: 1,
    dietary: 'Vegetarian',
    assignedTableId: 'elem_table_1',
    assignedTableName: 'Table 1 (Family East)',
    notes: 'Groom brother',
    updatedAt: '2026-03-02'
  },
  {
    id: 'guest_3',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    name: 'Dr. Alistair Vance',
    email: 'a.vance@stanford.edu',
    phone: '+1 (555) 890-4433',
    rsvpStatus: 'attending',
    plusOnes: 1,
    dietary: 'None',
    assignedTableId: 'elem_table_3',
    assignedTableName: 'Table 3 (Colleagues)',
    notes: 'Keynote mentor',
    updatedAt: '2026-03-03'
  },
  {
    id: 'guest_4',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    name: 'Sophia Laurent',
    email: 'sophia.l@parisart.fr',
    phone: '+33 6 12 34 56 78',
    rsvpStatus: 'attending',
    plusOnes: 0,
    dietary: 'Pescatarian',
    assignedTableId: 'elem_table_6',
    assignedTableName: 'Table 6 (International Guests)',
    updatedAt: '2026-03-04'
  },
  {
    id: 'guest_5',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    name: 'Marcus Brody',
    email: 'marcus.brody@nexus.io',
    phone: '+1 (555) 777-8899',
    rsvpStatus: 'pending',
    plusOnes: 1,
    dietary: 'Nut allergy',
    updatedAt: '2026-03-05'
  },
  {
    id: 'guest_6',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    name: 'Elena Rostova',
    email: 'elena.rostova@designworks.com',
    phone: '+1 (555) 345-6677',
    rsvpStatus: 'declined',
    plusOnes: 0,
    notes: 'Out of country for architectural biennale',
    updatedAt: '2026-03-06'
  },
  {
    id: 'guest_7',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    name: 'David K. Miller',
    email: 'dkmiller@apex.com',
    phone: '+1 (555) 555-1234',
    rsvpStatus: 'attending',
    plusOnes: 1,
    dietary: 'None',
    assignedTableId: 'elem_table_4',
    assignedTableName: 'Table 4 (Friends)',
    updatedAt: '2026-03-07'
  },
  {
    id: 'guest_8',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    name: 'Priya Sharma',
    email: 'priya.s@sharma.co',
    phone: '+1 (555) 901-2345',
    rsvpStatus: 'attending',
    plusOnes: 0,
    dietary: 'Vegan',
    assignedTableId: 'elem_table_1',
    assignedTableName: 'Table 1 (Family East)',
    updatedAt: '2026-03-08'
  },
  {
    id: 'guest_9',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    name: 'Julian Sterling',
    email: 'julian@sterlingmedia.com',
    phone: '+1 (555) 678-9012',
    rsvpStatus: 'pending',
    plusOnes: 1,
    dietary: 'None',
    updatedAt: '2026-03-09'
  }
];

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'vendor_1',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    name: 'Lumière Cinematic Wedding Films',
    category: 'Photography',
    status: 'confirmed',
    contactPerson: 'Antoine Mercier',
    phone: '+1 (555) 333-8899',
    email: 'studio@lumierecinema.com',
    quotedCost: 4500,
    depositPaid: 2000,
    notes: 'Includes 2 principal cinematographers, drone operator and edited highlight reel.'
  },
  {
    id: 'vendor_2',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    name: 'Epicurean Art Culinary Guild',
    category: 'Catering',
    status: 'confirmed',
    contactPerson: 'Chef Christian Delacroix',
    phone: '+1 (555) 222-7711',
    email: 'events@epicureancatering.com',
    quotedCost: 16800,
    depositPaid: 8000,
    notes: '5-course seasonal plated dinner, canapé cocktail hour, and top-shelf open bar package.'
  },
  {
    id: 'vendor_3',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    name: 'Fleur & Velvet Botanical Design',
    category: 'Decoration',
    status: 'confirmed',
    contactPerson: 'Sienna Sterling',
    phone: '+1 (555) 888-2345',
    email: 'info@fleurandvelvet.com',
    quotedCost: 5800,
    depositPaid: 2900,
    notes: 'Hanging botanical chandeliers, floral ceremony arch, and 20 low table centerpieces.'
  },
  {
    id: 'vendor_4',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    name: 'SoundWave Live Quintet & DJ',
    category: 'Music',
    status: 'quoted',
    contactPerson: 'Leo Cruz',
    phone: '+1 (555) 444-6600',
    email: 'booking@soundwavemusic.com',
    quotedCost: 3200,
    depositPaid: 0,
    notes: 'Ceremony acoustic violin/cello, dinner jazz trio, evening DJ set.'
  },
  {
    id: 'vendor_5',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    name: 'Aura Bridal Hair & Makeup',
    category: 'Makeup',
    status: 'confirmed',
    contactPerson: 'Camille Dubois',
    phone: '+1 (555) 911-3456',
    email: 'glam@aurabridal.com',
    quotedCost: 1600,
    depositPaid: 800,
    notes: 'Bride hair/makeup + 4 bridesmaids styling package.'
  },
  {
    id: 'vendor_6',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    name: 'Black Pearl Luxury Chauffeur Fleet',
    category: 'Transport',
    status: 'inquiry',
    contactPerson: 'Frank Donovan',
    phone: '+1 (555) 765-4321',
    email: 'reservations@blackpearlfleet.com',
    quotedCost: 1400,
    depositPaid: 0,
    notes: 'Vintage 1958 Rolls-Royce for couple + two 24-passenger executive sprinters.'
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sched_1',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    time: '12:00',
    endTime: '14:00',
    title: 'Vendor Load-In & Audio Engineering Setup',
    description: 'AV crew, stage decorators, lighting engineers setup at Grand Aurora Hall',
    location: 'Main Ballroom',
    category: 'Setup',
    status: 'completed',
    leadPerson: 'Venue Operations Lead',
    order: 1
  },
  {
    id: 'sched_2',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    time: '14:30',
    endTime: '15:45',
    title: 'Bridal Party & Groom First Look Photography',
    description: 'Golden hour portraits in the fountain garden and grand staircase',
    location: 'Aurora Formal Gardens',
    category: 'Photo',
    status: 'completed',
    leadPerson: 'Antoine (Lumière Cinema)',
    order: 2
  },
  {
    id: 'sched_3',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    time: '16:00',
    endTime: '16:30',
    title: 'Guest Arrival & Champagne Welcome',
    description: 'Harpist accompaniment, welcome cocktails served on South Terrace',
    location: 'South Terrace Garden',
    category: 'Ceremony',
    status: 'in-progress',
    leadPerson: 'Concierge Staff',
    order: 3
  },
  {
    id: 'sched_4',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    time: '16:45',
    endTime: '17:30',
    title: 'Wedding Ceremony & Vows Exchange',
    description: 'Processional, sacred readings, exchange of vows and rings under floral arch',
    location: 'Grand Ballroom Stage',
    category: 'Ceremony',
    status: 'pending',
    leadPerson: 'Officiant',
    order: 4
  },
  {
    id: 'sched_5',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    time: '17:30',
    endTime: '18:45',
    title: 'Sunset Cocktail Reception & Passed Canapés',
    description: 'Artisan cocktails, jazz quartet, photobooth open for guest portraits',
    location: 'Cocktail Island & Terrace',
    category: 'Dining',
    status: 'pending',
    leadPerson: 'Epicurean Guild Team',
    order: 5
  },
  {
    id: 'sched_6',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    time: '19:00',
    endTime: '20:30',
    title: 'Grand Ballroom Entrance & 5-Course Plated Dinner',
    description: 'Formal bridal party introduction followed by dinner service',
    location: 'Main Ballroom Tables',
    category: 'Dining',
    status: 'pending',
    leadPerson: 'Maitre D',
    order: 6
  },
  {
    id: 'sched_7',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    time: '20:30',
    endTime: '21:15',
    title: 'Toasts, Speeches & Couple First Dance',
    description: 'Best man & maid of honour speeches, champagne toast, first dance spotlight',
    location: 'Dance Floor',
    category: 'Entertainment',
    status: 'pending',
    leadPerson: 'DJ Leo Cruz',
    order: 7
  },
  {
    id: 'sched_8',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    time: '21:15',
    endTime: '23:45',
    title: 'Celebration Dance Party & Dessert Lounge',
    description: 'High energy DJ performance, wedding cake cutting, and midnight snack cart',
    location: 'Dance Floor & Bar',
    category: 'Entertainment',
    status: 'pending',
    leadPerson: 'DJ Leo Cruz',
    order: 8
  },
  {
    id: 'sched_9',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    time: '23:45',
    endTime: '00:15',
    title: 'Sparkler Grand Send-off & Teardown Initiation',
    description: 'Guests line the grand driveway with sparklers as vintage limousine departs',
    location: 'Grand Entrance Driveway',
    category: 'Teardown',
    status: 'pending',
    leadPerson: 'Event Coordinator',
    order: 9
  }
];

export const INITIAL_BUDGET: BudgetItem[] = [
  {
    id: 'budget_1',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    description: 'Grand Aurora Palatial Estate Full Day Rental',
    category: 'Venue',
    allocated: 12500,
    actual: 12500,
    status: 'paid'
  },
  {
    id: 'budget_2',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    description: 'Epicurean Guild 5-Course Plated Catering & Bar',
    category: 'Catering',
    allocated: 17000,
    actual: 16800,
    status: 'deposit-paid',
    vendorId: 'vendor_2'
  },
  {
    id: 'budget_3',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    description: 'Lumière Photo & Cinema Package with Drone',
    category: 'Photography',
    allocated: 5000,
    actual: 4500,
    status: 'deposit-paid',
    vendorId: 'vendor_1'
  },
  {
    id: 'budget_4',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    description: 'Fleur & Velvet Floral Chandeliers & Table Pieces',
    category: 'Decoration',
    allocated: 6000,
    actual: 5800,
    status: 'deposit-paid',
    vendorId: 'vendor_3'
  },
  {
    id: 'budget_5',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    description: 'SoundWave Live Quintet & Evening DJ Rig',
    category: 'Music',
    allocated: 3500,
    actual: 3200,
    status: 'planned',
    vendorId: 'vendor_4'
  },
  {
    id: 'budget_6',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    description: 'Aura Bridal Glam Hair & Makeup Package',
    category: 'Attire',
    allocated: 1800,
    actual: 1600,
    status: 'deposit-paid',
    vendorId: 'vendor_5'
  },
  {
    id: 'budget_7',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    description: 'Black Pearl Chauffeur & Guest Sprinters',
    category: 'Logistics',
    allocated: 1500,
    actual: 1400,
    status: 'planned',
    vendorId: 'vendor_6'
  },
  {
    id: 'budget_8',
    eventId: 'event_wedding_karthick',
    userId: 'user_karthick',
    description: 'Unforeseen Day-of Contingency & Tips',
    category: 'Misc',
    allocated: 2000,
    actual: 500,
    status: 'planned'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    userId: 'user_karthick',
    eventId: 'event_wedding_karthick',
    title: 'New RSVP Received',
    message: 'Vikram Raman confirmed attendance with +1. Dietary notes: Vegetarian.',
    type: 'rsvp',
    read: false,
    createdAt: '2026-03-12T11:20:00.000Z'
  },
  {
    id: 'notif_2',
    userId: 'user_karthick',
    eventId: 'event_wedding_karthick',
    title: 'Vendor Contract Ready',
    message: 'Epicurean Art Culinary Guild uploaded final catering menu tasting notes.',
    type: 'vendor',
    read: false,
    createdAt: '2026-03-11T14:45:00.000Z'
  },
  {
    id: 'notif_3',
    userId: 'user_karthick',
    eventId: 'event_wedding_karthick',
    title: 'Layout Updated',
    message: 'Grand Ballroom Master Layout saved with 13 spatial elements.',
    type: 'system',
    read: true,
    createdAt: '2026-03-10T16:22:00.000Z'
  },
  {
    id: 'notif_4',
    userId: 'user_karthick',
    eventId: 'event_wedding_karthick',
    title: 'Budget Milestone Alert',
    message: '78% of your $48,000 budget is currently committed or paid.',
    type: 'budget',
    read: true,
    createdAt: '2026-03-08T09:10:00.000Z'
  }
];

export const INITIAL_FAVORITES = [
  {
    id: 'fav_1',
    userId: 'user_karthick',
    venueId: 'grand-aurora',
    addedAt: '2026-02-01'
  },
  {
    id: 'fav_2',
    userId: 'user_karthick',
    venueId: 'glasshouse-pavilion',
    addedAt: '2026-02-03'
  },
  {
    id: 'fav_3',
    userId: 'user_karthick',
    venueId: 'villa-bella-vista',
    addedAt: '2026-02-05'
  }
];
