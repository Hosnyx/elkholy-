/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import heroBannerImg from "/src/assets/images/elkholy_hero_banner_1780393961041.png?import";
import sportBikeImg from "/src/assets/images/elkholy_sport_bike_1780393979815.png?import";
import cruiserBikeImg from "/src/assets/images/elkholy_cruiser_bike_1780393998079.png?import";
import adventureBikeImg from "/src/assets/images/elkholy_adventure_bike_1780394016498.png?import";
import scooterImg from "/src/assets/images/elkholy_scooter_1780394036022.png?import";
export const HERO_BG_IMAGE = heroBannerImg;
export const DEFAULT_ADDONS = [
  {
    id: "addon-helmet",
    name: "ELKHOLY Cyber Helmet V1",
    nameAr: "خوذة الخولي الذكية V1",
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=200",
    description: "Smart helmet with integrated HUD, telemetry sync, and noise cancellation.",
    descAr: "خوذة ذكية مزودة بشاشة عرض أمامية (HUD)، ومزامنة البيانات وتصفية الضوضاء.",
    price: 150
  },
  {
    id: "addon-oil",
    name: "Castrol Ultra Synth Oil",
    nameAr: "زيت كاسترول التخليقي الفائق",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=200",
    description: "Extended endurance liquid fluid optimized for high-rpm engines.",
    descAr: "سائل تخليقي لزيادة التحمل مصمم خصيصاً للمحركات ذات الدوران العالي.",
    price: 50
  },
  {
    id: "addon-holder",
    name: "Anti-Vibration Phone Mount",
    nameAr: "حامل هاتف مقاوم للاهتزاز",
    image: "https://images.unsplash.com/photo-1584438784894-089d6a128f3e?auto=format&fit=crop&q=80&w=200",
    description: "Aircraft-grade aluminum phone holder with secure multi-clamp lock.",
    descAr: "حامل هاتف من ألومنيوم الطائرات مع قفل حماية متعدد المحاور لواتساب آمن.",
    price: 30
  },
  {
    id: "addon-bag",
    name: "Carbon Aero Smart Bag",
    nameAr: "حقيبة كربون ذكية انسيابية",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=200",
    description: "Waterproof aerodynamic tail bag with integrated charge controller.",
    descAr: "حقيبة خلفية انسيابية مقاومة للماء مع وحدة شحن وتحكم متكاملة.",
    price: 185
  }
];
export const MOTORCYCLES_DATA = [
  // ==================== CATEGORY A: SPORT (4 models) ====================
  {
    id: "sport-cybersport-v4",
    name: "ElKholy CyberSport V4",
    category: "A",
    categoryName: "Sport",
    price: "$37,500",
    priceNum: 37500,
    image: sportBikeImg,
    tagline: "Adrenaline Redefined",
    shortDesc: "Aerodynamic carbon-monocoque masterpiece with high-frequency stabilizers and liquid-neon vectoring.",
    longDesc: "Engineered for maximum racing precision, the CyberSport V4 features a smart carbon monocoque frame, predictive digital aerodynamics, and a state-of-the-art quad-electric powertrain. Designed to break limits, it delivers instant torque and hyper-stability at high velocities.",
    specs: {
      engine: "1200cc Solid-State Quad-Electric Hub",
      topSpeed: "380 km/h",
      fuelConsumption: "0.0 L/100km (Zero-emission)",
      power: "240 hp / 310 Nm",
      weight: "168 kg"
    },
    isPopular: true,
    originalPrice: 42500,
    discount: 5e3,
    discountType: "fixed",
    offerLabel: "🔥 HOT DEAL",
    addOns: DEFAULT_ADDONS
  },
  {
    id: "sport-phantom-apex",
    name: "ElKholy Phantom Apex",
    category: "A",
    categoryName: "Sport",
    price: "$36,000",
    priceNum: 36e3,
    image: sportBikeImg,
    tagline: "The Dark Knight of Speed",
    shortDesc: "Stealth-styled lightning runner featuring full-spectrum HUD connectivity and custom neural speed presets.",
    longDesc: "The Phantom Apex is built around active bio-luminescent fiber composites that display real-time speed diagnostics. Outfitted with intelligent torque vectoring and automatic lane-assist lidar, this is the ultimate hybrid speedster.",
    specs: {
      engine: "998cc Liquid-Cooled Plasma Hybrid Engine",
      topSpeed: "330 km/h",
      fuelConsumption: "1.2 L/100km",
      power: "195 hp / 220 Nm",
      weight: "172 kg"
    },
    isPopular: false,
    addOns: DEFAULT_ADDONS
  },
  {
    id: "sport-vortex-overdrive",
    name: "ElKholy Vortex Overdrive",
    category: "A",
    categoryName: "Sport",
    price: "$41,000",
    priceNum: 41e3,
    image: sportBikeImg,
    tagline: "Break the Sound Barrier",
    shortDesc: "Precision engineered speed racer with an ionic aerodynamic shell and real-time tire pressure matrix.",
    longDesc: "Formulated with ultra-high voltage dual magnetic rotors, the Vortex Overdrive is built for enthusiasts seeking sheer adrenaline. Adapts dynamically to asphalt temperatures and wet coefficient indices.",
    specs: {
      engine: "1100cc Dual-Magnetic Rotors Core",
      topSpeed: "360 km/h",
      fuelConsumption: "0.0 L/100km (Electric)",
      power: "220 hp / 285 Nm",
      weight: "165 kg"
    },
    isPopular: true,
    addOns: DEFAULT_ADDONS
  },
  {
    id: "sport-cyberforce-ultra",
    name: "ElKholy CyberForce Ultra",
    category: "A",
    categoryName: "Sport",
    price: "$29,900",
    priceNum: 29900,
    image: sportBikeImg,
    tagline: "Light, Agile, Unleashed",
    shortDesc: "Lightweight entry-level sport model containing interactive neural navigation links and rapid heat dissipation.",
    longDesc: "The CyberForce Ultra incorporates aerospace-grade composites for structural resilience. A perfect machine for urban racers seeking track-level performance on everyday streets.",
    specs: {
      engine: "750cc Liquid-Cooled Electric Inducer",
      topSpeed: "280 km/h",
      fuelConsumption: "0.0 L/100km (Electric)",
      power: "150 hp / 190 Nm",
      weight: "155 kg"
    },
    isPopular: false,
    addOns: DEFAULT_ADDONS
  },
  {
    id: "sport-hypercharged-x",
    name: "ElKholy HyperCharged X",
    category: "A",
    categoryName: "Sport",
    price: "$34,500",
    priceNum: 34500,
    image: sportBikeImg,
    tagline: "Futuristic Electric Thunderbolt",
    shortDesc: "Hypercharged induction superbike featuring active lateral stabilizers and advanced torque vectoring matrices.",
    longDesc: "The HyperCharged X represents the zenith of electrical velocity. Equipped with custom carbon-glass cooling canals and a solid-electrolyte power pack, this motorcycle delivers continuous high-output propulsion under any track load.",
    specs: {
      engine: "1000cc Dual-Array Supercharged Induction",
      topSpeed: "310 km/h",
      fuelConsumption: "0.0 L/100km (Electric)",
      power: "185 hp / 240 Nm",
      weight: "162 kg"
    },
    isPopular: false,
    addOns: DEFAULT_ADDONS
  },
  // ==================== CATEGORY B: CRUISER (4 models) ====================
  {
    id: "cruiser-ghost-cruiser",
    name: "ElKholy Ghost Cruiser",
    category: "B",
    categoryName: "Cruiser",
    price: "$43,200",
    priceNum: 43200,
    image: cruiserBikeImg,
    tagline: "Sovereign of the Highways",
    shortDesc: "A ultra-luxury relaxed cruiser offering hover-feel electronic suspension and deep-bass exhaust waves.",
    longDesc: "Enjoy infinite open highways on this ultimate comfortable luxury cruiser. Outfitted with orthopedic smart-gel seats, dynamic cybernetic shock-absorbers that adapt to road imperfections in microseconds, and an custom acoustic synthesizer.",
    specs: {
      engine: "1800cc Dual-Rotor Plasma Induction core",
      topSpeed: "220 km/h",
      fuelConsumption: "0.2 L/100km (Bio-Plasma)",
      power: "165 hp / 290 Nm",
      weight: "245 kg"
    },
    isPopular: true,
    originalPrice: 48e3,
    discount: 10,
    discountType: "percentage",
    offerLabel: "⚡ 10% OFF",
    addOns: DEFAULT_ADDONS
  },
  {
    id: "cruiser-obsidian",
    name: "ElKholy Obsidian Cyber",
    category: "B",
    categoryName: "Cruiser",
    price: "$39,500",
    priceNum: 39500,
    image: cruiserBikeImg,
    tagline: "Pure Luxury, Dark Soul",
    shortDesc: "Handcrafted ultra-low stance cruiser featuring reactive matte titanium framing and adjustable neon base glow.",
    longDesc: "The Obsidian Cruiser merges retro-futuristic chopper lines with futuristic electronic styling. Features automated parking kickstands, full integrated digital helmet link, and high-fidelity smart radar arrays for complete 360 safety.",
    specs: {
      engine: "1650cc Supercharged Electric Hybrid",
      topSpeed: "200 km/h",
      fuelConsumption: "1.5 L/100km",
      power: "140 hp / 250 Nm",
      weight: "235 kg"
    },
    isPopular: false,
    addOns: DEFAULT_ADDONS
  },
  {
    id: "cruiser-titan-beast",
    name: "ElKholy Titan Beast",
    category: "B",
    categoryName: "Cruiser",
    price: "$46,000",
    priceNum: 46e3,
    image: cruiserBikeImg,
    tagline: "The Ultimate Iron Giant",
    shortDesc: "A colossal low-slung powerhouse offering heavy-duty chrome detailing, ambient dynamic exhaust notes, and dual highway mapping.",
    longDesc: "The Titan Beast combines a retro double-cradle posture with absolute hyper-electric solid state power. Offers micro-seconds adaptive pneumatic ride buffers to ensure a smooth, luxurious floating sensation.",
    specs: {
      engine: "1900cc Dual Solid State Hybrid Induction",
      topSpeed: "210 km/h",
      fuelConsumption: "0.5 L/100km",
      power: "180 hp / 320 Nm",
      weight: "260 kg"
    },
    isPopular: true,
    addOns: DEFAULT_ADDONS
  },
  {
    id: "cruiser-rebel-v2",
    name: "ElKholy Rebel V2",
    category: "B",
    categoryName: "Cruiser",
    price: "$32,000",
    priceNum: 32e3,
    image: cruiserBikeImg,
    tagline: "Neon Renegade",
    shortDesc: "Stripped-down bobber styling paired with advanced smart diagnostics, active wheel lights, and standard ABS.",
    longDesc: "Comfortable, nimble, and beautifully accented with customizable perimeter glow grids. Designed specifically for evening cruises and long relaxed road adventures.",
    specs: {
      engine: "1200cc Parallel-Twin High Torque",
      topSpeed: "180 km/h",
      fuelConsumption: "1.8 L/100km",
      power: "110 hp / 195 Nm",
      weight: "210 kg"
    },
    isPopular: false,
    addOns: DEFAULT_ADDONS
  },
  {
    id: "cruiser-royal-sovereign",
    name: "ElKholy Royal Sovereign",
    category: "B",
    categoryName: "Cruiser",
    price: "$41,500",
    priceNum: 41500,
    image: cruiserBikeImg,
    tagline: "Imperial Cruiser Majesty",
    shortDesc: "Premium heavy bobber layout accented with hand-polished nickel cladding, solid-gel comfort frame, and custom smart soundscapes.",
    longDesc: "Engineered as the quintessential majestic long-distance sovereign, this model provides full active pneumatic load leveling, premium ergonomic heated seating curves, and ambient perimeter LED strips linked directly with navigation alerts.",
    specs: {
      engine: "1750cc Solid-State Magnetic Torque Hub",
      topSpeed: "195 km/h",
      fuelConsumption: "0.0 L/100km (Electric)",
      power: "150 hp / 265 Nm",
      weight: "238 kg"
    },
    isPopular: false,
    addOns: DEFAULT_ADDONS
  },
  // ==================== CATEGORY C: TOURING / ADVENTURE (4 models) ====================
  {
    id: "adventure-dune-wanderer",
    name: "ElKholy Dune Wanderer",
    category: "C",
    categoryName: "Adventure",
    price: "$34,000",
    priceNum: 34e3,
    image: adventureBikeImg,
    tagline: "Master of Every Grid",
    shortDesc: "Planetary expedition build with robust impact-absorbing armor, smart GPS grids and terrain adaptation.",
    longDesc: "Engineered for extreme sands, cyber-jungles, and cracked concrete, the Dune Wanderer boasts active magnetic ride suspensions and mud-shedding carbon panels. Equipped with high-powered survival spotlights and emergency power nodes.",
    specs: {
      engine: "1050cc Self-Generating Fusion Battery",
      topSpeed: "190 km/h",
      fuelConsumption: "0.0 L/100km (Fusion Hub)",
      power: "125 hp / 185 Nm",
      weight: "198 kg"
    },
    isPopular: false,
    addOns: DEFAULT_ADDONS
  },
  {
    id: "adventure-horizon",
    name: "ElKholy Horizon Voyager",
    category: "C",
    categoryName: "Adventure",
    price: "$43,000",
    priceNum: 43e3,
    image: adventureBikeImg,
    tagline: "Endless Horizons Await",
    shortDesc: "The luxury continent-crosser containing virtual shielding, multi-fuel bio-systems, and campsite battery link.",
    longDesc: "Our flagship adventurer features a biological plasma generator, allowing it to take bio-fuels without losing its glowing electric propulsion capacity. Includes integrated dual 6K HUD navigation displays and an extra cargo-drone bay.",
    specs: {
      engine: "1250cc Multi-fuel Bio-Plasma Generator",
      topSpeed: "210 km/h",
      fuelConsumption: "2.1 L/100km",
      power: "155 hp / 240 Nm",
      weight: "215 kg"
    },
    isPopular: true,
    originalPrice: 45e3,
    discount: 2e3,
    discountType: "fixed",
    offerLabel: "🔥 MEGA DEAL",
    addOns: DEFAULT_ADDONS
  },
  {
    id: "adventure-canyon-tracker",
    name: "ElKholy Canyon Tracker",
    category: "C",
    categoryName: "Adventure",
    price: "$31,500",
    priceNum: 31500,
    image: adventureBikeImg,
    tagline: "Pathfinder of the Wilds",
    shortDesc: "Robust multi-terrain explorer equipped with water-resistant composite side-panniers, manual suspension lifting, and GPRS link.",
    longDesc: "Perfectly balanced for extended dual-sport expeditions. Equipped with an auxiliary hydrogen-charge cells array that can regenerate energy during passive braking or descent.",
    specs: {
      engine: "950cc Self-charging HydrogenCore",
      topSpeed: "175 km/h",
      fuelConsumption: "0.0 L/100km (Hydrogen)",
      power: "110 hp / 160 Nm",
      weight: "190 kg"
    },
    isPopular: false,
    addOns: DEFAULT_ADDONS
  },
  {
    id: "adventure-aurora-explorer",
    name: "ElKholy Aurora Explorer",
    category: "C",
    categoryName: "Adventure",
    price: "$48,000",
    priceNum: 48e3,
    image: adventureBikeImg,
    tagline: "The Long Range Pioneer",
    shortDesc: "Luxury heavy-touring ship equipped with heated seats, satellite navigation HUD, and carbon safety armor.",
    longDesc: "Whether tracking through remote mountain pathways or embarking on continental tours, the Aurora Explorer delivers supreme stability and cargo space. Double-layered carbon armor bars defend crucial mechanisms from impact.",
    specs: {
      engine: "1400cc Dual-induct Electro-Fusion Cluster",
      topSpeed: "220 km/h",
      fuelConsumption: "0.1 L/100km",
      power: "180 hp / 270 Nm",
      weight: "230 kg"
    },
    isPopular: true,
    addOns: DEFAULT_ADDONS
  },
  {
    id: "adventure-nomad-legend",
    name: "ElKholy Nomad Legend",
    category: "C",
    categoryName: "Adventure",
    price: "$38,900",
    priceNum: 38900,
    image: adventureBikeImg,
    tagline: "Untamable Terrain Dominator",
    shortDesc: "A powerful off-road dual-sport titan constructed with heavy-duty titanium alloy and customizable cargo expansion racks.",
    longDesc: "The Nomad Legend was built for the fearless. It features predictive multi-terrain traction algorithms, heavy duty reinforced crash frame bars, high capacity adventure panniers, and standard military-grade navigation GPS setups.",
    specs: {
      engine: "1150cc Liquid-Cooled Parallel Twin",
      topSpeed: "200 km/h",
      fuelConsumption: "2.5 L/100km",
      power: "135 hp / 195 Nm",
      weight: "205 kg"
    },
    isPopular: false,
    addOns: DEFAULT_ADDONS
  },
  // ==================== CATEGORY S: SCOOTER (4 models) ====================
  {
    id: "scooter-cyberglide",
    name: "ElKholy CyberGlide X",
    category: "S",
    categoryName: "Scooter",
    price: "$12,500",
    priceNum: 12500,
    image: scooterImg,
    tagline: "Reclaim the Urban Core",
    shortDesc: "High-end smart scooter with hover-inspired design, interactive heads-up screen, and automatic city lane tracking.",
    longDesc: "Designed to slalom through neo-city traffic jams in style. Built-in magnetic hub motor and dynamic smart-cruise controller ensure smooth riding. Charges fully in under 8 minutes with high-speed quantum chargers.",
    specs: {
      engine: "400cc Hyper-Magnetic Urban Hub Motor",
      topSpeed: "135 km/h",
      fuelConsumption: "0.0 L/100km (High-density battery)",
      power: "55 hp / 95 Nm",
      weight: "110 kg"
    },
    isPopular: true,
    addOns: DEFAULT_ADDONS
  },
  {
    id: "scooter-neon-breeze",
    name: "ElKholy Neon Breeze",
    category: "S",
    categoryName: "Scooter",
    price: "$9,000",
    priceNum: 9e3,
    image: scooterImg,
    tagline: "Agility Meets Neon Elegance",
    shortDesc: "Comfortable lightweight smart scooter featuring interchangeable side trunks and adaptive underglow lighting strips.",
    longDesc: "The Neon Breeze combines extreme agility with high-end aesthetic details. Custom-sync the wheel lights directly to your smartphone music beats. Built-in secure wireless helmet lock and advanced anti-theft biometrics.",
    specs: {
      engine: "300cc Brushless Direct-Drive Motor",
      topSpeed: "110 km/h",
      fuelConsumption: "0.0 L/100km (Solid-electrolyte battery)",
      power: "38 hp / 72 Nm",
      weight: "95 kg"
    },
    isPopular: false,
    addOns: DEFAULT_ADDONS
  },
  {
    id: "scooter-solar-wave",
    name: "ElKholy Solar Wave Smart",
    category: "S",
    categoryName: "Scooter",
    price: "$14,000",
    priceNum: 14e3,
    image: scooterImg,
    tagline: "Ride the Sunlight",
    shortDesc: "Lightweight carbon carbon-fiber frame retrofitted with micro solar-recharge panels and built-in navigation.",
    longDesc: "The Solar Wave features integrated high-efficiency photovoltaic panels across the front fairing, feeding a trickle-charge into the auxiliary battery. Reclaim city commutes on a completely self-sustaining energy loop.",
    specs: {
      engine: "500cc High-Output Solar-Electric Hub",
      topSpeed: "140 km/h",
      fuelConsumption: "0.0 L/100km",
      power: "60 hp / 105 Nm",
      weight: "105 kg"
    },
    isPopular: false,
    addOns: DEFAULT_ADDONS
  },
  {
    id: "scooter-quantum-pulse",
    name: "ElKholy Quantum Pulse Jet",
    category: "S",
    categoryName: "Scooter",
    price: "$16,500",
    priceNum: 16500,
    image: scooterImg,
    tagline: "The City Lightning Bolt",
    shortDesc: "High-velocity premium commuter scooter with instant smart-drive torque, smart helmets support, and perimeter lasers.",
    longDesc: "The Quantum Pulse represents the upper-tier of premium urban mobility. Featuring double-wishbone active electronic front suspension shocks and a full digital diagnostic cockpit.",
    specs: {
      engine: "650cc Quantum Induction Liquid-Cooled Hub",
      topSpeed: "150 km/h",
      fuelConsumption: "0.0 L/100km",
      power: "72 hp / 120 Nm",
      weight: "115 kg"
    },
    isPopular: true,
    addOns: DEFAULT_ADDONS
  },
  {
    id: "scooter-fusion-lite",
    name: "ElKholy Fusion Lite",
    category: "S",
    categoryName: "Scooter",
    price: "$11,000",
    priceNum: 11e3,
    image: scooterImg,
    tagline: "Ultralight Urban Fleet",
    shortDesc: "Featherweight high-efficiency electronic scooter perfect for quick smart commutes and dense urban corridors.",
    longDesc: "The Fusion Lite offers responsive performance with dual rear brushless motors and a super compact collapsible posture. Features full interactive bluetooth application linkage for keyless digital engine ignition.",
    specs: {
      engine: "350cc Dual Rear Brushless Hubs",
      topSpeed: "120 km/h",
      fuelConsumption: "0.0 L/100km (Solid state compact)",
      power: "45 hp / 85 Nm",
      weight: "88 kg"
    },
    isPopular: false,
    addOns: DEFAULT_ADDONS
  }
];
export const CATEGORY_DES_MAP = {
  A: {
    title: "⚡ Sport Motorcycles",
    desc: "Engineered for pure speed, extreme acceleration, and cutting-edge digital aerodynamics. Built for track dominance and night speed."
  },
  B: {
    title: "🛋 Cruiser Motorcycles",
    desc: "Where low-slung retro-classic chopper comfort meets continuous high-energy hover magnetic power. Cruise the cosmic highways."
  },
  C: {
    title: "🌎 Adventure / Touring Series",
    desc: "Robust off-road armored builds crafted to bypass structural constraints, dust storms, and extreme gravel terrains with ease."
  },
  S: {
    title: "🔋 Smart City Scooters",
    desc: "Ultra-sleek, lightweight electric urban slalomers with instant high-density charging and interactive multi-touch cockpits."
  }
};
export const DEFAULT_HOMEPAGE_CONFIG = {
  font: "Space Grotesk",
  fontHeadings: "Space Grotesk",
  fontSubheadings: "Cairo",
  fontBody: "Inter",
  theme: {
    primaryColor: "#6366F1",
    secondaryColor: "#A855F7",
    backgroundColor: "#0B0F1A",
    buttonRadius: "rounded-xl",
    iconShape: "circle",
    spacingMultiplier: 1
  },
  header: {
    backgroundImage: HERO_BG_IMAGE,
    logoUrl: "",
    logoText: "ELKHOLY",
    logoTextAr: "الخولي",
    logoSize: "medium",
    logoPosition: "left",
    logoEffect: "glow",
    title: "ELKHOLY",
    titleAr: "الخولي",
    accent: "MOTORS",
    accentAr: "موتورز",
    subtitle: "RIDE THE FUTURE",
    subtitleAr: "سابق مع المستقبل",
    customHtmlEnabled: false,
    customHtml: `<div class="p-4 bg-white/5 border border-white/10 rounded-xl my-4 text-center text-xs font-mono">
  <p class="text-brand-accent font-bold">✨ EXTREME RACING EVENT CODES ACTIVE ✨</p>
  <p class="text-gray-400 mt-1">Special track testing starts Friday 8:00 PM at Cairo Ring Road virtual gateway. All operators welcome.</p>
</div>`,
    buttonExploreText: "EXPLORE VEHICLES ↓",
    buttonExploreTextAr: "استكشف المركبات ↓",
    buttonBookText: "QUICK BOOK 🏆",
    buttonBookTextAr: "حجز سريع 🏆",
    animationsEnabled: true
  },
  mainContent: {
    showCategories: true,
    showFeatured: true,
    showOffers: true,
    categoriesTitle: "Showroom Categories",
    categoriesTitleAr: "أقسام المعرض الرقمية",
    featuredTitle: "Holographic Super Machines",
    featuredTitleAr: "الموتوسيكلات الخارقة المميزة",
    offersTitle: "Active Trade Options & Discounts",
    offersTitleAr: "العروض الساخنة والخصومات المتفردة",
    layoutStyle: "grid",
    customCategoryIcons: {
      A: "",
      B: "",
      C: "",
      S: ""
    },
    iconColor: "#22D3EE",
    iconSize: "md"
  },
  footer: {
    visible: true,
    collapsible: true,
    content: "Step inside the virtual grid. ElKholy Motors introduces extreme-output solid-state performance bikes, plasma touring adventurers, and high-fidelity smart urban scooters designed in 2026. Explore our catalog, review blueprints, and book a secure ride directly.",
    contentAr: "انضم إلى عالم الغد. تقدم الخولي موتورز أقوى الموتوسيكلات والاسكوترات فائقة الأداء للمستقبل. استكشف كتالوجاتنا، واقرأ المواصفات واحجز رحلتك مباشرة.",
    socialLinks: {
      facebook: "https://facebook.com/elkholy.motors",
      instagram: "https://instagram.com/elkholy.motors",
      whatsapp: "https://wa.me/201007062123",
      youtube: "https://youtube.com/elkholy.motors"
    },
    quickLinks: [
      { label: "Home", labelAr: "الرئيسية", url: "#home" },
      { label: "Showroom", labelAr: "المعرض الرقمي", url: "#gallery" },
      { label: "Categories", labelAr: "الأقسام", url: "#categories" }
    ]
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBNb3RvcmN5Y2xlLCBIb21lcGFnZUNvbmZpZyB9IGZyb20gJy4vdHlwZXMnO1xuXG4vLyBJbXBvcnRpbmcgZ2VuZXJhdGVkIHByZW1pdW0gaW1hZ2VzXG5pbXBvcnQgaGVyb0Jhbm5lckltZyBmcm9tICcuL2Fzc2V0cy9pbWFnZXMvZWxraG9seV9oZXJvX2Jhbm5lcl8xNzgwMzkzOTYxMDQxLnBuZyc7XG5pbXBvcnQgc3BvcnRCaWtlSW1nIGZyb20gJy4vYXNzZXRzL2ltYWdlcy9lbGtob2x5X3Nwb3J0X2Jpa2VfMTc4MDM5Mzk3OTgxNS5wbmcnO1xuaW1wb3J0IGNydWlzZXJCaWtlSW1nIGZyb20gJy4vYXNzZXRzL2ltYWdlcy9lbGtob2x5X2NydWlzZXJfYmlrZV8xNzgwMzkzOTk4MDc5LnBuZyc7XG5pbXBvcnQgYWR2ZW50dXJlQmlrZUltZyBmcm9tICcuL2Fzc2V0cy9pbWFnZXMvZWxraG9seV9hZHZlbnR1cmVfYmlrZV8xNzgwMzk0MDE2NDk4LnBuZyc7XG5pbXBvcnQgc2Nvb3RlckltZyBmcm9tICcuL2Fzc2V0cy9pbWFnZXMvZWxraG9seV9zY29vdGVyXzE3ODAzOTQwMzYwMjIucG5nJztcblxuZXhwb3J0IGNvbnN0IEhFUk9fQkdfSU1BR0UgPSBoZXJvQmFubmVySW1nO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9BRERPTlMgPSBbXG4gIHtcbiAgICBpZDogJ2FkZG9uLWhlbG1ldCcsXG4gICAgbmFtZTogJ0VMS0hPTFkgQ3liZXIgSGVsbWV0IFYxJyxcbiAgICBuYW1lQXI6ICfYrtmI2LDYqSDYp9mE2K7ZiNmE2Yog2KfZhNiw2YPZitipIFYxJyxcbiAgICBpbWFnZTogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTk5ODE5ODExMjc5LWQ1YWQ5Y2NjZjgzOD9hdXRvPWZvcm1hdCZmaXQ9Y3JvcCZxPTgwJnc9MjAwJyxcbiAgICBkZXNjcmlwdGlvbjogJ1NtYXJ0IGhlbG1ldCB3aXRoIGludGVncmF0ZWQgSFVELCB0ZWxlbWV0cnkgc3luYywgYW5kIG5vaXNlIGNhbmNlbGxhdGlvbi4nLFxuICAgIGRlc2NBcjogJ9iu2YjYsNipINiw2YPZitipINmF2LLZiNiv2Kkg2KjYtNin2LTYqSDYudix2LYg2KPZhdin2YXZitipIChIVUQp2Iwg2YjZhdiy2KfZhdmG2Kkg2KfZhNio2YrYp9mG2KfYqiDZiNiq2LXZgdmK2Kkg2KfZhNi22YjYttin2KEuJyxcbiAgICBwcmljZTogMTUwXG4gIH0sXG4gIHtcbiAgICBpZDogJ2FkZG9uLW9pbCcsXG4gICAgbmFtZTogJ0Nhc3Ryb2wgVWx0cmEgU3ludGggT2lsJyxcbiAgICBuYW1lQXI6ICfYstmK2Kog2YPYp9iz2KrYsdmI2YQg2KfZhNiq2K7ZhNmK2YLZiiDYp9mE2YHYp9im2YInLFxuICAgIGltYWdlOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTk2NDI3NTEwMzQtNzY1ZGZkZjdjNThlP2F1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAmdz0yMDAnLFxuICAgIGRlc2NyaXB0aW9uOiAnRXh0ZW5kZWQgZW5kdXJhbmNlIGxpcXVpZCBmbHVpZCBvcHRpbWl6ZWQgZm9yIGhpZ2gtcnBtIGVuZ2luZXMuJyxcbiAgICBkZXNjQXI6ICfYs9in2KbZhCDYqtiu2YTZitmC2Yog2YTYstmK2KfYr9ipINin2YTYqtit2YXZhCDZhdi12YXZhSDYrti12YrYtdin2Ysg2YTZhNmF2K3YsdmD2KfYqiDYsNin2Kog2KfZhNiv2YjYsdin2YYg2KfZhNi52KfZhNmKLicsXG4gICAgcHJpY2U6IDUwXG4gIH0sXG4gIHtcbiAgICBpZDogJ2FkZG9uLWhvbGRlcicsXG4gICAgbmFtZTogJ0FudGktVmlicmF0aW9uIFBob25lIE1vdW50JyxcbiAgICBuYW1lQXI6ICfYrdin2YXZhCDZh9in2KrZgSDZhdmC2KfZiNmFINmE2YTYp9mH2KrYstin2LInLFxuICAgIGltYWdlOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1ODQ0Mzg3ODQ4OTQtMDg5ZDZhMTI4ZjNlP2F1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAmdz0yMDAnLFxuICAgIGRlc2NyaXB0aW9uOiAnQWlyY3JhZnQtZ3JhZGUgYWx1bWludW0gcGhvbmUgaG9sZGVyIHdpdGggc2VjdXJlIG11bHRpLWNsYW1wIGxvY2suJyxcbiAgICBkZXNjQXI6ICfYrdin2YXZhCDZh9in2KrZgSDZhdmGINij2YTZiNmF2YbZitmI2YUg2KfZhNi32KfYptix2KfYqiDZhdi5INmC2YHZhCDYrdmF2KfZitipINmF2KrYudiv2K8g2KfZhNmF2K3Yp9mI2LEg2YTZiNin2KrYs9in2Kgg2KLZhdmGLicsXG4gICAgcHJpY2U6IDMwXG4gIH0sXG4gIHtcbiAgICBpZDogJ2FkZG9uLWJhZycsXG4gICAgbmFtZTogJ0NhcmJvbiBBZXJvIFNtYXJ0IEJhZycsXG4gICAgbmFtZUFyOiAn2K3ZgtmK2KjYqSDZg9ix2KjZiNmGINiw2YPZitipINin2YbYs9mK2KfYqNmK2KknLFxuICAgIGltYWdlOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NTMwNjI0MDctOThlZWI2NGM2YTYyP2F1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAmdz0yMDAnLFxuICAgIGRlc2NyaXB0aW9uOiAnV2F0ZXJwcm9vZiBhZXJvZHluYW1pYyB0YWlsIGJhZyB3aXRoIGludGVncmF0ZWQgY2hhcmdlIGNvbnRyb2xsZXIuJyxcbiAgICBkZXNjQXI6ICfYrdmC2YrYqNipINiu2YTZgdmK2Kkg2KfZhtiz2YrYp9io2YrYqSDZhdmC2KfZiNmF2Kkg2YTZhNmF2KfYoSDZhdi5INmI2K3Yr9ipINi02K3ZhiDZiNiq2K3Zg9mFINmF2KrZg9in2YXZhNipLicsXG4gICAgcHJpY2U6IDE4NVxuICB9XG5dO1xuXG5leHBvcnQgY29uc3QgTU9UT1JDWUNMRVNfREFUQTogTW90b3JjeWNsZVtdID0gW1xuICAvLyA9PT09PT09PT09PT09PT09PT09PSBDQVRFR09SWSBBOiBTUE9SVCAoNCBtb2RlbHMpID09PT09PT09PT09PT09PT09PT09XG4gIHtcbiAgICBpZDogJ3Nwb3J0LWN5YmVyc3BvcnQtdjQnLFxuICAgIG5hbWU6ICdFbEtob2x5IEN5YmVyU3BvcnQgVjQnLFxuICAgIGNhdGVnb3J5OiAnQScsXG4gICAgY2F0ZWdvcnlOYW1lOiAnU3BvcnQnLFxuICAgIHByaWNlOiAnJDM3LDUwMCcsXG4gICAgcHJpY2VOdW06IDM3NTAwLFxuICAgIGltYWdlOiBzcG9ydEJpa2VJbWcsXG4gICAgdGFnbGluZTogJ0FkcmVuYWxpbmUgUmVkZWZpbmVkJyxcbiAgICBzaG9ydERlc2M6ICdBZXJvZHluYW1pYyBjYXJib24tbW9ub2NvcXVlIG1hc3RlcnBpZWNlIHdpdGggaGlnaC1mcmVxdWVuY3kgc3RhYmlsaXplcnMgYW5kIGxpcXVpZC1uZW9uIHZlY3RvcmluZy4nLFxuICAgIGxvbmdEZXNjOiAnRW5naW5lZXJlZCBmb3IgbWF4aW11bSByYWNpbmcgcHJlY2lzaW9uLCB0aGUgQ3liZXJTcG9ydCBWNCBmZWF0dXJlcyBhIHNtYXJ0IGNhcmJvbiBtb25vY29xdWUgZnJhbWUsIHByZWRpY3RpdmUgZGlnaXRhbCBhZXJvZHluYW1pY3MsIGFuZCBhIHN0YXRlLW9mLXRoZS1hcnQgcXVhZC1lbGVjdHJpYyBwb3dlcnRyYWluLiBEZXNpZ25lZCB0byBicmVhayBsaW1pdHMsIGl0IGRlbGl2ZXJzIGluc3RhbnQgdG9ycXVlIGFuZCBoeXBlci1zdGFiaWxpdHkgYXQgaGlnaCB2ZWxvY2l0aWVzLicsXG4gICAgc3BlY3M6IHtcbiAgICAgIGVuZ2luZTogJzEyMDBjYyBTb2xpZC1TdGF0ZSBRdWFkLUVsZWN0cmljIEh1YicsXG4gICAgICB0b3BTcGVlZDogJzM4MCBrbS9oJyxcbiAgICAgIGZ1ZWxDb25zdW1wdGlvbjogJzAuMCBMLzEwMGttIChaZXJvLWVtaXNzaW9uKScsXG4gICAgICBwb3dlcjogJzI0MCBocCAvIDMxMCBObScsXG4gICAgICB3ZWlnaHQ6ICcxNjgga2cnXG4gICAgfSxcbiAgICBpc1BvcHVsYXI6IHRydWUsXG4gICAgb3JpZ2luYWxQcmljZTogNDI1MDAsXG4gICAgZGlzY291bnQ6IDUwMDAsXG4gICAgZGlzY291bnRUeXBlOiAnZml4ZWQnLFxuICAgIG9mZmVyTGFiZWw6ICfwn5SlIEhPVCBERUFMJyxcbiAgICBhZGRPbnM6IERFRkFVTFRfQURET05TXG4gIH0sXG4gIHtcbiAgICBpZDogJ3Nwb3J0LXBoYW50b20tYXBleCcsXG4gICAgbmFtZTogJ0VsS2hvbHkgUGhhbnRvbSBBcGV4JyxcbiAgICBjYXRlZ29yeTogJ0EnLFxuICAgIGNhdGVnb3J5TmFtZTogJ1Nwb3J0JyxcbiAgICBwcmljZTogJyQzNiwwMDAnLFxuICAgIHByaWNlTnVtOiAzNjAwMCxcbiAgICBpbWFnZTogc3BvcnRCaWtlSW1nLFxuICAgIHRhZ2xpbmU6ICdUaGUgRGFyayBLbmlnaHQgb2YgU3BlZWQnLFxuICAgIHNob3J0RGVzYzogJ1N0ZWFsdGgtc3R5bGVkIGxpZ2h0bmluZyBydW5uZXIgZmVhdHVyaW5nIGZ1bGwtc3BlY3RydW0gSFVEIGNvbm5lY3Rpdml0eSBhbmQgY3VzdG9tIG5ldXJhbCBzcGVlZCBwcmVzZXRzLicsXG4gICAgbG9uZ0Rlc2M6ICdUaGUgUGhhbnRvbSBBcGV4IGlzIGJ1aWx0IGFyb3VuZCBhY3RpdmUgYmlvLWx1bWluZXNjZW50IGZpYmVyIGNvbXBvc2l0ZXMgdGhhdCBkaXNwbGF5IHJlYWwtdGltZSBzcGVlZCBkaWFnbm9zdGljcy4gT3V0Zml0dGVkIHdpdGggaW50ZWxsaWdlbnQgdG9ycXVlIHZlY3RvcmluZyBhbmQgYXV0b21hdGljIGxhbmUtYXNzaXN0IGxpZGFyLCB0aGlzIGlzIHRoZSB1bHRpbWF0ZSBoeWJyaWQgc3BlZWRzdGVyLicsXG4gICAgc3BlY3M6IHtcbiAgICAgIGVuZ2luZTogJzk5OGNjIExpcXVpZC1Db29sZWQgUGxhc21hIEh5YnJpZCBFbmdpbmUnLFxuICAgICAgdG9wU3BlZWQ6ICczMzAga20vaCcsXG4gICAgICBmdWVsQ29uc3VtcHRpb246ICcxLjIgTC8xMDBrbScsXG4gICAgICBwb3dlcjogJzE5NSBocCAvIDIyMCBObScsXG4gICAgICB3ZWlnaHQ6ICcxNzIga2cnXG4gICAgfSxcbiAgICBpc1BvcHVsYXI6IGZhbHNlLFxuICAgIGFkZE9uczogREVGQVVMVF9BRERPTlNcbiAgfSxcbiAge1xuICAgIGlkOiAnc3BvcnQtdm9ydGV4LW92ZXJkcml2ZScsXG4gICAgbmFtZTogJ0VsS2hvbHkgVm9ydGV4IE92ZXJkcml2ZScsXG4gICAgY2F0ZWdvcnk6ICdBJyxcbiAgICBjYXRlZ29yeU5hbWU6ICdTcG9ydCcsXG4gICAgcHJpY2U6ICckNDEsMDAwJyxcbiAgICBwcmljZU51bTogNDEwMDAsXG4gICAgaW1hZ2U6IHNwb3J0QmlrZUltZyxcbiAgICB0YWdsaW5lOiAnQnJlYWsgdGhlIFNvdW5kIEJhcnJpZXInLFxuICAgIHNob3J0RGVzYzogJ1ByZWNpc2lvbiBlbmdpbmVlcmVkIHNwZWVkIHJhY2VyIHdpdGggYW4gaW9uaWMgYWVyb2R5bmFtaWMgc2hlbGwgYW5kIHJlYWwtdGltZSB0aXJlIHByZXNzdXJlIG1hdHJpeC4nLFxuICAgIGxvbmdEZXNjOiAnRm9ybXVsYXRlZCB3aXRoIHVsdHJhLWhpZ2ggdm9sdGFnZSBkdWFsIG1hZ25ldGljIHJvdG9ycywgdGhlIFZvcnRleCBPdmVyZHJpdmUgaXMgYnVpbHQgZm9yIGVudGh1c2lhc3RzIHNlZWtpbmcgc2hlZXIgYWRyZW5hbGluZS4gQWRhcHRzIGR5bmFtaWNhbGx5IHRvIGFzcGhhbHQgdGVtcGVyYXR1cmVzIGFuZCB3ZXQgY29lZmZpY2llbnQgaW5kaWNlcy4nLFxuICAgIHNwZWNzOiB7XG4gICAgICBlbmdpbmU6ICcxMTAwY2MgRHVhbC1NYWduZXRpYyBSb3RvcnMgQ29yZScsXG4gICAgICB0b3BTcGVlZDogJzM2MCBrbS9oJyxcbiAgICAgIGZ1ZWxDb25zdW1wdGlvbjogJzAuMCBMLzEwMGttIChFbGVjdHJpYyknLFxuICAgICAgcG93ZXI6ICcyMjAgaHAgLyAyODUgTm0nLFxuICAgICAgd2VpZ2h0OiAnMTY1IGtnJ1xuICAgIH0sXG4gICAgaXNQb3B1bGFyOiB0cnVlLFxuICAgIGFkZE9uczogREVGQVVMVF9BRERPTlNcbiAgfSxcbiAge1xuICAgIGlkOiAnc3BvcnQtY3liZXJmb3JjZS11bHRyYScsXG4gICAgbmFtZTogJ0VsS2hvbHkgQ3liZXJGb3JjZSBVbHRyYScsXG4gICAgY2F0ZWdvcnk6ICdBJyxcbiAgICBjYXRlZ29yeU5hbWU6ICdTcG9ydCcsXG4gICAgcHJpY2U6ICckMjksOTAwJyxcbiAgICBwcmljZU51bTogMjk5MDAsXG4gICAgaW1hZ2U6IHNwb3J0QmlrZUltZyxcbiAgICB0YWdsaW5lOiAnTGlnaHQsIEFnaWxlLCBVbmxlYXNoZWQnLFxuICAgIHNob3J0RGVzYzogJ0xpZ2h0d2VpZ2h0IGVudHJ5LWxldmVsIHNwb3J0IG1vZGVsIGNvbnRhaW5pbmcgaW50ZXJhY3RpdmUgbmV1cmFsIG5hdmlnYXRpb24gbGlua3MgYW5kIHJhcGlkIGhlYXQgZGlzc2lwYXRpb24uJyxcbiAgICBsb25nRGVzYzogJ1RoZSBDeWJlckZvcmNlIFVsdHJhIGluY29ycG9yYXRlcyBhZXJvc3BhY2UtZ3JhZGUgY29tcG9zaXRlcyBmb3Igc3RydWN0dXJhbCByZXNpbGllbmNlLiBBIHBlcmZlY3QgbWFjaGluZSBmb3IgdXJiYW4gcmFjZXJzIHNlZWtpbmcgdHJhY2stbGV2ZWwgcGVyZm9ybWFuY2Ugb24gZXZlcnlkYXkgc3RyZWV0cy4nLFxuICAgIHNwZWNzOiB7XG4gICAgICBlbmdpbmU6ICc3NTBjYyBMaXF1aWQtQ29vbGVkIEVsZWN0cmljIEluZHVjZXInLFxuICAgICAgdG9wU3BlZWQ6ICcyODAga20vaCcsXG4gICAgICBmdWVsQ29uc3VtcHRpb246ICcwLjAgTC8xMDBrbSAoRWxlY3RyaWMpJyxcbiAgICAgIHBvd2VyOiAnMTUwIGhwIC8gMTkwIE5tJyxcbiAgICAgIHdlaWdodDogJzE1NSBrZydcbiAgICB9LFxuICAgIGlzUG9wdWxhcjogZmFsc2UsXG4gICAgYWRkT25zOiBERUZBVUxUX0FERE9OU1xuICB9LFxuICB7XG4gICAgaWQ6ICdzcG9ydC1oeXBlcmNoYXJnZWQteCcsXG4gICAgbmFtZTogJ0VsS2hvbHkgSHlwZXJDaGFyZ2VkIFgnLFxuICAgIGNhdGVnb3J5OiAnQScsXG4gICAgY2F0ZWdvcnlOYW1lOiAnU3BvcnQnLFxuICAgIHByaWNlOiAnJDM0LDUwMCcsXG4gICAgcHJpY2VOdW06IDM0NTAwLFxuICAgIGltYWdlOiBzcG9ydEJpa2VJbWcsXG4gICAgdGFnbGluZTogJ0Z1dHVyaXN0aWMgRWxlY3RyaWMgVGh1bmRlcmJvbHQnLFxuICAgIHNob3J0RGVzYzogJ0h5cGVyY2hhcmdlZCBpbmR1Y3Rpb24gc3VwZXJiaWtlIGZlYXR1cmluZyBhY3RpdmUgbGF0ZXJhbCBzdGFiaWxpemVycyBhbmQgYWR2YW5jZWQgdG9ycXVlIHZlY3RvcmluZyBtYXRyaWNlcy4nLFxuICAgIGxvbmdEZXNjOiAnVGhlIEh5cGVyQ2hhcmdlZCBYIHJlcHJlc2VudHMgdGhlIHplbml0aCBvZiBlbGVjdHJpY2FsIHZlbG9jaXR5LiBFcXVpcHBlZCB3aXRoIGN1c3RvbSBjYXJib24tZ2xhc3MgY29vbGluZyBjYW5hbHMgYW5kIGEgc29saWQtZWxlY3Ryb2x5dGUgcG93ZXIgcGFjaywgdGhpcyBtb3RvcmN5Y2xlIGRlbGl2ZXJzIGNvbnRpbnVvdXMgaGlnaC1vdXRwdXQgcHJvcHVsc2lvbiB1bmRlciBhbnkgdHJhY2sgbG9hZC4nLFxuICAgIHNwZWNzOiB7XG4gICAgICBlbmdpbmU6ICcxMDAwY2MgRHVhbC1BcnJheSBTdXBlcmNoYXJnZWQgSW5kdWN0aW9uJyxcbiAgICAgIHRvcFNwZWVkOiAnMzEwIGttL2gnLFxuICAgICAgZnVlbENvbnN1bXB0aW9uOiAnMC4wIEwvMTAwa20gKEVsZWN0cmljKScsXG4gICAgICBwb3dlcjogJzE4NSBocCAvIDI0MCBObScsXG4gICAgICB3ZWlnaHQ6ICcxNjIga2cnXG4gICAgfSxcbiAgICBpc1BvcHVsYXI6IGZhbHNlLFxuICAgIGFkZE9uczogREVGQVVMVF9BRERPTlNcbiAgfSxcblxuICAvLyA9PT09PT09PT09PT09PT09PT09PSBDQVRFR09SWSBCOiBDUlVJU0VSICg0IG1vZGVscykgPT09PT09PT09PT09PT09PT09PT1cbiAge1xuICAgIGlkOiAnY3J1aXNlci1naG9zdC1jcnVpc2VyJyxcbiAgICBuYW1lOiAnRWxLaG9seSBHaG9zdCBDcnVpc2VyJyxcbiAgICBjYXRlZ29yeTogJ0InLFxuICAgIGNhdGVnb3J5TmFtZTogJ0NydWlzZXInLFxuICAgIHByaWNlOiAnJDQzLDIwMCcsXG4gICAgcHJpY2VOdW06IDQzMjAwLFxuICAgIGltYWdlOiBjcnVpc2VyQmlrZUltZyxcbiAgICB0YWdsaW5lOiAnU292ZXJlaWduIG9mIHRoZSBIaWdod2F5cycsXG4gICAgc2hvcnREZXNjOiAnQSB1bHRyYS1sdXh1cnkgcmVsYXhlZCBjcnVpc2VyIG9mZmVyaW5nIGhvdmVyLWZlZWwgZWxlY3Ryb25pYyBzdXNwZW5zaW9uIGFuZCBkZWVwLWJhc3MgZXhoYXVzdCB3YXZlcy4nLFxuICAgIGxvbmdEZXNjOiAnRW5qb3kgaW5maW5pdGUgb3BlbiBoaWdod2F5cyBvbiB0aGlzIHVsdGltYXRlIGNvbWZvcnRhYmxlIGx1eHVyeSBjcnVpc2VyLiBPdXRmaXR0ZWQgd2l0aCBvcnRob3BlZGljIHNtYXJ0LWdlbCBzZWF0cywgZHluYW1pYyBjeWJlcm5ldGljIHNob2NrLWFic29yYmVycyB0aGF0IGFkYXB0IHRvIHJvYWQgaW1wZXJmZWN0aW9ucyBpbiBtaWNyb3NlY29uZHMsIGFuZCBhbiBjdXN0b20gYWNvdXN0aWMgc3ludGhlc2l6ZXIuJyxcbiAgICBzcGVjczoge1xuICAgICAgZW5naW5lOiAnMTgwMGNjIER1YWwtUm90b3IgUGxhc21hIEluZHVjdGlvbiBjb3JlJyxcbiAgICAgIHRvcFNwZWVkOiAnMjIwIGttL2gnLFxuICAgICAgZnVlbENvbnN1bXB0aW9uOiAnMC4yIEwvMTAwa20gKEJpby1QbGFzbWEpJyxcbiAgICAgIHBvd2VyOiAnMTY1IGhwIC8gMjkwIE5tJyxcbiAgICAgIHdlaWdodDogJzI0NSBrZydcbiAgICB9LFxuICAgIGlzUG9wdWxhcjogdHJ1ZSxcbiAgICBvcmlnaW5hbFByaWNlOiA0ODAwMCxcbiAgICBkaXNjb3VudDogMTAsXG4gICAgZGlzY291bnRUeXBlOiAncGVyY2VudGFnZScsXG4gICAgb2ZmZXJMYWJlbDogJ+KaoSAxMCUgT0ZGJyxcbiAgICBhZGRPbnM6IERFRkFVTFRfQURET05TXG4gIH0sXG4gIHtcbiAgICBpZDogJ2NydWlzZXItb2JzaWRpYW4nLFxuICAgIG5hbWU6ICdFbEtob2x5IE9ic2lkaWFuIEN5YmVyJyxcbiAgICBjYXRlZ29yeTogJ0InLFxuICAgIGNhdGVnb3J5TmFtZTogJ0NydWlzZXInLFxuICAgIHByaWNlOiAnJDM5LDUwMCcsXG4gICAgcHJpY2VOdW06IDM5NTAwLFxuICAgIGltYWdlOiBjcnVpc2VyQmlrZUltZyxcbiAgICB0YWdsaW5lOiAnUHVyZSBMdXh1cnksIERhcmsgU291bCcsXG4gICAgc2hvcnREZXNjOiAnSGFuZGNyYWZ0ZWQgdWx0cmEtbG93IHN0YW5jZSBjcnVpc2VyIGZlYXR1cmluZyByZWFjdGl2ZSBtYXR0ZSB0aXRhbml1bSBmcmFtaW5nIGFuZCBhZGp1c3RhYmxlIG5lb24gYmFzZSBnbG93LicsXG4gICAgbG9uZ0Rlc2M6ICdUaGUgT2JzaWRpYW4gQ3J1aXNlciBtZXJnZXMgcmV0cm8tZnV0dXJpc3RpYyBjaG9wcGVyIGxpbmVzIHdpdGggZnV0dXJpc3RpYyBlbGVjdHJvbmljIHN0eWxpbmcuIEZlYXR1cmVzIGF1dG9tYXRlZCBwYXJraW5nIGtpY2tzdGFuZHMsIGZ1bGwgaW50ZWdyYXRlZCBkaWdpdGFsIGhlbG1ldCBsaW5rLCBhbmQgaGlnaC1maWRlbGl0eSBzbWFydCByYWRhciBhcnJheXMgZm9yIGNvbXBsZXRlIDM2MCBzYWZldHkuJyxcbiAgICBzcGVjczoge1xuICAgICAgZW5naW5lOiAnMTY1MGNjIFN1cGVyY2hhcmdlZCBFbGVjdHJpYyBIeWJyaWQnLFxuICAgICAgdG9wU3BlZWQ6ICcyMDAga20vaCcsXG4gICAgICBmdWVsQ29uc3VtcHRpb246ICcxLjUgTC8xMDBrbScsXG4gICAgICBwb3dlcjogJzE0MCBocCAvIDI1MCBObScsXG4gICAgICB3ZWlnaHQ6ICcyMzUga2cnXG4gICAgfSxcbiAgICBpc1BvcHVsYXI6IGZhbHNlLFxuICAgIGFkZE9uczogREVGQVVMVF9BRERPTlNcbiAgfSxcbiAge1xuICAgIGlkOiAnY3J1aXNlci10aXRhbi1iZWFzdCcsXG4gICAgbmFtZTogJ0VsS2hvbHkgVGl0YW4gQmVhc3QnLFxuICAgIGNhdGVnb3J5OiAnQicsXG4gICAgY2F0ZWdvcnlOYW1lOiAnQ3J1aXNlcicsXG4gICAgcHJpY2U6ICckNDYsMDAwJyxcbiAgICBwcmljZU51bTogNDYwMDAsXG4gICAgaW1hZ2U6IGNydWlzZXJCaWtlSW1nLFxuICAgIHRhZ2xpbmU6ICdUaGUgVWx0aW1hdGUgSXJvbiBHaWFudCcsXG4gICAgc2hvcnREZXNjOiAnQSBjb2xvc3NhbCBsb3ctc2x1bmcgcG93ZXJob3VzZSBvZmZlcmluZyBoZWF2eS1kdXR5IGNocm9tZSBkZXRhaWxpbmcsIGFtYmllbnQgZHluYW1pYyBleGhhdXN0IG5vdGVzLCBhbmQgZHVhbCBoaWdod2F5IG1hcHBpbmcuJyxcbiAgICBsb25nRGVzYzogJ1RoZSBUaXRhbiBCZWFzdCBjb21iaW5lcyBhIHJldHJvIGRvdWJsZS1jcmFkbGUgcG9zdHVyZSB3aXRoIGFic29sdXRlIGh5cGVyLWVsZWN0cmljIHNvbGlkIHN0YXRlIHBvd2VyLiBPZmZlcnMgbWljcm8tc2Vjb25kcyBhZGFwdGl2ZSBwbmV1bWF0aWMgcmlkZSBidWZmZXJzIHRvIGVuc3VyZSBhIHNtb290aCwgbHV4dXJpb3VzIGZsb2F0aW5nIHNlbnNhdGlvbi4nLFxuICAgIHNwZWNzOiB7XG4gICAgICBlbmdpbmU6ICcxOTAwY2MgRHVhbCBTb2xpZCBTdGF0ZSBIeWJyaWQgSW5kdWN0aW9uJyxcbiAgICAgIHRvcFNwZWVkOiAnMjEwIGttL2gnLFxuICAgICAgZnVlbENvbnN1bXB0aW9uOiAnMC41IEwvMTAwa20nLFxuICAgICAgcG93ZXI6ICcxODAgaHAgLyAzMjAgTm0nLFxuICAgICAgd2VpZ2h0OiAnMjYwIGtnJ1xuICAgIH0sXG4gICAgaXNQb3B1bGFyOiB0cnVlLFxuICAgIGFkZE9uczogREVGQVVMVF9BRERPTlNcbiAgfSxcbiAge1xuICAgIGlkOiAnY3J1aXNlci1yZWJlbC12MicsXG4gICAgbmFtZTogJ0VsS2hvbHkgUmViZWwgVjInLFxuICAgIGNhdGVnb3J5OiAnQicsXG4gICAgY2F0ZWdvcnlOYW1lOiAnQ3J1aXNlcicsXG4gICAgcHJpY2U6ICckMzIsMDAwJyxcbiAgICBwcmljZU51bTogMzIwMDAsXG4gICAgaW1hZ2U6IGNydWlzZXJCaWtlSW1nLFxuICAgIHRhZ2xpbmU6ICdOZW9uIFJlbmVnYWRlJyxcbiAgICBzaG9ydERlc2M6ICdTdHJpcHBlZC1kb3duIGJvYmJlciBzdHlsaW5nIHBhaXJlZCB3aXRoIGFkdmFuY2VkIHNtYXJ0IGRpYWdub3N0aWNzLCBhY3RpdmUgd2hlZWwgbGlnaHRzLCBhbmQgc3RhbmRhcmQgQUJTLicsXG4gICAgbG9uZ0Rlc2M6ICdDb21mb3J0YWJsZSwgbmltYmxlLCBhbmQgYmVhdXRpZnVsbHkgYWNjZW50ZWQgd2l0aCBjdXN0b21pemFibGUgcGVyaW1ldGVyIGdsb3cgZ3JpZHMuIERlc2lnbmVkIHNwZWNpZmljYWxseSBmb3IgZXZlbmluZyBjcnVpc2VzIGFuZCBsb25nIHJlbGF4ZWQgcm9hZCBhZHZlbnR1cmVzLicsXG4gICAgc3BlY3M6IHtcbiAgICAgIGVuZ2luZTogJzEyMDBjYyBQYXJhbGxlbC1Ud2luIEhpZ2ggVG9ycXVlJyxcbiAgICAgIHRvcFNwZWVkOiAnMTgwIGttL2gnLFxuICAgICAgZnVlbENvbnN1bXB0aW9uOiAnMS44IEwvMTAwa20nLFxuICAgICAgcG93ZXI6ICcxMTAgaHAgLyAxOTUgTm0nLFxuICAgICAgd2VpZ2h0OiAnMjEwIGtnJ1xuICAgIH0sXG4gICAgaXNQb3B1bGFyOiBmYWxzZSxcbiAgICBhZGRPbnM6IERFRkFVTFRfQURET05TXG4gIH0sXG4gIHtcbiAgICBpZDogJ2NydWlzZXItcm95YWwtc292ZXJlaWduJyxcbiAgICBuYW1lOiAnRWxLaG9seSBSb3lhbCBTb3ZlcmVpZ24nLFxuICAgIGNhdGVnb3J5OiAnQicsXG4gICAgY2F0ZWdvcnlOYW1lOiAnQ3J1aXNlcicsXG4gICAgcHJpY2U6ICckNDEsNTAwJyxcbiAgICBwcmljZU51bTogNDE1MDAsXG4gICAgaW1hZ2U6IGNydWlzZXJCaWtlSW1nLFxuICAgIHRhZ2xpbmU6ICdJbXBlcmlhbCBDcnVpc2VyIE1hamVzdHknLFxuICAgIHNob3J0RGVzYzogJ1ByZW1pdW0gaGVhdnkgYm9iYmVyIGxheW91dCBhY2NlbnRlZCB3aXRoIGhhbmQtcG9saXNoZWQgbmlja2VsIGNsYWRkaW5nLCBzb2xpZC1nZWwgY29tZm9ydCBmcmFtZSwgYW5kIGN1c3RvbSBzbWFydCBzb3VuZHNjYXBlcy4nLFxuICAgIGxvbmdEZXNjOiAnRW5naW5lZXJlZCBhcyB0aGUgcXVpbnRlc3NlbnRpYWwgbWFqZXN0aWMgbG9uZy1kaXN0YW5jZSBzb3ZlcmVpZ24sIHRoaXMgbW9kZWwgcHJvdmlkZXMgZnVsbCBhY3RpdmUgcG5ldW1hdGljIGxvYWQgbGV2ZWxpbmcsIHByZW1pdW0gZXJnb25vbWljIGhlYXRlZCBzZWF0aW5nIGN1cnZlcywgYW5kIGFtYmllbnQgcGVyaW1ldGVyIExFRCBzdHJpcHMgbGlua2VkIGRpcmVjdGx5IHdpdGggbmF2aWdhdGlvbiBhbGVydHMuJyxcbiAgICBzcGVjczoge1xuICAgICAgZW5naW5lOiAnMTc1MGNjIFNvbGlkLVN0YXRlIE1hZ25ldGljIFRvcnF1ZSBIdWInLFxuICAgICAgdG9wU3BlZWQ6ICcxOTUga20vaCcsXG4gICAgICBmdWVsQ29uc3VtcHRpb246ICcwLjAgTC8xMDBrbSAoRWxlY3RyaWMpJyxcbiAgICAgIHBvd2VyOiAnMTUwIGhwIC8gMjY1IE5tJyxcbiAgICAgIHdlaWdodDogJzIzOCBrZydcbiAgICB9LFxuICAgIGlzUG9wdWxhcjogZmFsc2UsXG4gICAgYWRkT25zOiBERUZBVUxUX0FERE9OU1xuICB9LFxuXG4gIC8vID09PT09PT09PT09PT09PT09PT09IENBVEVHT1JZIEM6IFRPVVJJTkcgLyBBRFZFTlRVUkUgKDQgbW9kZWxzKSA9PT09PT09PT09PT09PT09PT09PVxuICB7XG4gICAgaWQ6ICdhZHZlbnR1cmUtZHVuZS13YW5kZXJlcicsXG4gICAgbmFtZTogJ0VsS2hvbHkgRHVuZSBXYW5kZXJlcicsXG4gICAgY2F0ZWdvcnk6ICdDJyxcbiAgICBjYXRlZ29yeU5hbWU6ICdBZHZlbnR1cmUnLFxuICAgIHByaWNlOiAnJDM0LDAwMCcsXG4gICAgcHJpY2VOdW06IDM0MDAwLFxuICAgIGltYWdlOiBhZHZlbnR1cmVCaWtlSW1nLFxuICAgIHRhZ2xpbmU6ICdNYXN0ZXIgb2YgRXZlcnkgR3JpZCcsXG4gICAgc2hvcnREZXNjOiAnUGxhbmV0YXJ5IGV4cGVkaXRpb24gYnVpbGQgd2l0aCByb2J1c3QgaW1wYWN0LWFic29yYmluZyBhcm1vciwgc21hcnQgR1BTIGdyaWRzIGFuZCB0ZXJyYWluIGFkYXB0YXRpb24uJyxcbiAgICBsb25nRGVzYzogJ0VuZ2luZWVyZWQgZm9yIGV4dHJlbWUgc2FuZHMsIGN5YmVyLWp1bmdsZXMsIGFuZCBjcmFja2VkIGNvbmNyZXRlLCB0aGUgRHVuZSBXYW5kZXJlciBib2FzdHMgYWN0aXZlIG1hZ25ldGljIHJpZGUgc3VzcGVuc2lvbnMgYW5kIG11ZC1zaGVkZGluZyBjYXJib24gcGFuZWxzLiBFcXVpcHBlZCB3aXRoIGhpZ2gtcG93ZXJlZCBzdXJ2aXZhbCBzcG90bGlnaHRzIGFuZCBlbWVyZ2VuY3kgcG93ZXIgbm9kZXMuJyxcbiAgICBzcGVjczoge1xuICAgICAgZW5naW5lOiAnMTA1MGNjIFNlbGYtR2VuZXJhdGluZyBGdXNpb24gQmF0dGVyeScsXG4gICAgICB0b3BTcGVlZDogJzE5MCBrbS9oJyxcbiAgICAgIGZ1ZWxDb25zdW1wdGlvbjogJzAuMCBMLzEwMGttIChGdXNpb24gSHViKScsXG4gICAgICBwb3dlcjogJzEyNSBocCAvIDE4NSBObScsXG4gICAgICB3ZWlnaHQ6ICcxOTgga2cnXG4gICAgfSxcbiAgICBpc1BvcHVsYXI6IGZhbHNlLFxuICAgIGFkZE9uczogREVGQVVMVF9BRERPTlNcbiAgfSxcbiAge1xuICAgIGlkOiAnYWR2ZW50dXJlLWhvcml6b24nLFxuICAgIG5hbWU6ICdFbEtob2x5IEhvcml6b24gVm95YWdlcicsXG4gICAgY2F0ZWdvcnk6ICdDJyxcbiAgICBjYXRlZ29yeU5hbWU6ICdBZHZlbnR1cmUnLFxuICAgIHByaWNlOiAnJDQzLDAwMCcsXG4gICAgcHJpY2VOdW06IDQzMDAwLFxuICAgIGltYWdlOiBhZHZlbnR1cmVCaWtlSW1nLFxuICAgIHRhZ2xpbmU6ICdFbmRsZXNzIEhvcml6b25zIEF3YWl0JyxcbiAgICBzaG9ydERlc2M6ICdUaGUgbHV4dXJ5IGNvbnRpbmVudC1jcm9zc2VyIGNvbnRhaW5pbmcgdmlydHVhbCBzaGllbGRpbmcsIG11bHRpLWZ1ZWwgYmlvLXN5c3RlbXMsIGFuZCBjYW1wc2l0ZSBiYXR0ZXJ5IGxpbmsuJyxcbiAgICBsb25nRGVzYzogJ091ciBmbGFnc2hpcCBhZHZlbnR1cmVyIGZlYXR1cmVzIGEgYmlvbG9naWNhbCBwbGFzbWEgZ2VuZXJhdG9yLCBhbGxvd2luZyBpdCB0byB0YWtlIGJpby1mdWVscyB3aXRob3V0IGxvc2luZyBpdHMgZ2xvd2luZyBlbGVjdHJpYyBwcm9wdWxzaW9uIGNhcGFjaXR5LiBJbmNsdWRlcyBpbnRlZ3JhdGVkIGR1YWwgNksgSFVEIG5hdmlnYXRpb24gZGlzcGxheXMgYW5kIGFuIGV4dHJhIGNhcmdvLWRyb25lIGJheS4nLFxuICAgIHNwZWNzOiB7XG4gICAgICBlbmdpbmU6ICcxMjUwY2MgTXVsdGktZnVlbCBCaW8tUGxhc21hIEdlbmVyYXRvcicsXG4gICAgICB0b3BTcGVlZDogJzIxMCBrbS9oJyxcbiAgICAgIGZ1ZWxDb25zdW1wdGlvbjogJzIuMSBMLzEwMGttJyxcbiAgICAgIHBvd2VyOiAnMTU1IGhwIC8gMjQwIE5tJyxcbiAgICAgIHdlaWdodDogJzIxNSBrZydcbiAgICB9LFxuICAgIGlzUG9wdWxhcjogdHJ1ZSxcbiAgICBvcmlnaW5hbFByaWNlOiA0NTAwMCxcbiAgICBkaXNjb3VudDogMjAwMCxcbiAgICBkaXNjb3VudFR5cGU6ICdmaXhlZCcsXG4gICAgb2ZmZXJMYWJlbDogJ/CflKUgTUVHQSBERUFMJyxcbiAgICBhZGRPbnM6IERFRkFVTFRfQURET05TXG4gIH0sXG4gIHtcbiAgICBpZDogJ2FkdmVudHVyZS1jYW55b24tdHJhY2tlcicsXG4gICAgbmFtZTogJ0VsS2hvbHkgQ2FueW9uIFRyYWNrZXInLFxuICAgIGNhdGVnb3J5OiAnQycsXG4gICAgY2F0ZWdvcnlOYW1lOiAnQWR2ZW50dXJlJyxcbiAgICBwcmljZTogJyQzMSw1MDAnLFxuICAgIHByaWNlTnVtOiAzMTUwMCxcbiAgICBpbWFnZTogYWR2ZW50dXJlQmlrZUltZyxcbiAgICB0YWdsaW5lOiAnUGF0aGZpbmRlciBvZiB0aGUgV2lsZHMnLFxuICAgIHNob3J0RGVzYzogJ1JvYnVzdCBtdWx0aS10ZXJyYWluIGV4cGxvcmVyIGVxdWlwcGVkIHdpdGggd2F0ZXItcmVzaXN0YW50IGNvbXBvc2l0ZSBzaWRlLXBhbm5pZXJzLCBtYW51YWwgc3VzcGVuc2lvbiBsaWZ0aW5nLCBhbmQgR1BSUyBsaW5rLicsXG4gICAgbG9uZ0Rlc2M6ICdQZXJmZWN0bHkgYmFsYW5jZWQgZm9yIGV4dGVuZGVkIGR1YWwtc3BvcnQgZXhwZWRpdGlvbnMuIEVxdWlwcGVkIHdpdGggYW4gYXV4aWxpYXJ5IGh5ZHJvZ2VuLWNoYXJnZSBjZWxscyBhcnJheSB0aGF0IGNhbiByZWdlbmVyYXRlIGVuZXJneSBkdXJpbmcgcGFzc2l2ZSBicmFraW5nIG9yIGRlc2NlbnQuJyxcbiAgICBzcGVjczoge1xuICAgICAgZW5naW5lOiAnOTUwY2MgU2VsZi1jaGFyZ2luZyBIeWRyb2dlbkNvcmUnLFxuICAgICAgdG9wU3BlZWQ6ICcxNzUga20vaCcsXG4gICAgICBmdWVsQ29uc3VtcHRpb246ICcwLjAgTC8xMDBrbSAoSHlkcm9nZW4pJyxcbiAgICAgIHBvd2VyOiAnMTEwIGhwIC8gMTYwIE5tJyxcbiAgICAgIHdlaWdodDogJzE5MCBrZydcbiAgICB9LFxuICAgIGlzUG9wdWxhcjogZmFsc2UsXG4gICAgYWRkT25zOiBERUZBVUxUX0FERE9OU1xuICB9LFxuICB7XG4gICAgaWQ6ICdhZHZlbnR1cmUtYXVyb3JhLWV4cGxvcmVyJyxcbiAgICBuYW1lOiAnRWxLaG9seSBBdXJvcmEgRXhwbG9yZXInLFxuICAgIGNhdGVnb3J5OiAnQycsXG4gICAgY2F0ZWdvcnlOYW1lOiAnQWR2ZW50dXJlJyxcbiAgICBwcmljZTogJyQ0OCwwMDAnLFxuICAgIHByaWNlTnVtOiA0ODAwMCxcbiAgICBpbWFnZTogYWR2ZW50dXJlQmlrZUltZyxcbiAgICB0YWdsaW5lOiAnVGhlIExvbmcgUmFuZ2UgUGlvbmVlcicsXG4gICAgc2hvcnREZXNjOiAnTHV4dXJ5IGhlYXZ5LXRvdXJpbmcgc2hpcCBlcXVpcHBlZCB3aXRoIGhlYXRlZCBzZWF0cywgc2F0ZWxsaXRlIG5hdmlnYXRpb24gSFVELCBhbmQgY2FyYm9uIHNhZmV0eSBhcm1vci4nLFxuICAgIGxvbmdEZXNjOiAnV2hldGhlciB0cmFja2luZyB0aHJvdWdoIHJlbW90ZSBtb3VudGFpbiBwYXRod2F5cyBvciBlbWJhcmtpbmcgb24gY29udGluZW50YWwgdG91cnMsIHRoZSBBdXJvcmEgRXhwbG9yZXIgZGVsaXZlcnMgc3VwcmVtZSBzdGFiaWxpdHkgYW5kIGNhcmdvIHNwYWNlLiBEb3VibGUtbGF5ZXJlZCBjYXJib24gYXJtb3IgYmFycyBkZWZlbmQgY3J1Y2lhbCBtZWNoYW5pc21zIGZyb20gaW1wYWN0LicsXG4gICAgc3BlY3M6IHtcbiAgICAgIGVuZ2luZTogJzE0MDBjYyBEdWFsLWluZHVjdCBFbGVjdHJvLUZ1c2lvbiBDbHVzdGVyJyxcbiAgICAgIHRvcFNwZWVkOiAnMjIwIGttL2gnLFxuICAgICAgZnVlbENvbnN1bXB0aW9uOiAnMC4xIEwvMTAwa20nLFxuICAgICAgcG93ZXI6ICcxODAgaHAgLyAyNzAgTm0nLFxuICAgICAgd2VpZ2h0OiAnMjMwIGtnJ1xuICAgIH0sXG4gICAgaXNQb3B1bGFyOiB0cnVlLFxuICAgIGFkZE9uczogREVGQVVMVF9BRERPTlNcbiAgfSxcbiAge1xuICAgIGlkOiAnYWR2ZW50dXJlLW5vbWFkLWxlZ2VuZCcsXG4gICAgbmFtZTogJ0VsS2hvbHkgTm9tYWQgTGVnZW5kJyxcbiAgICBjYXRlZ29yeTogJ0MnLFxuICAgIGNhdGVnb3J5TmFtZTogJ0FkdmVudHVyZScsXG4gICAgcHJpY2U6ICckMzgsOTAwJyxcbiAgICBwcmljZU51bTogMzg5MDAsXG4gICAgaW1hZ2U6IGFkdmVudHVyZUJpa2VJbWcsXG4gICAgdGFnbGluZTogJ1VudGFtYWJsZSBUZXJyYWluIERvbWluYXRvcicsXG4gICAgc2hvcnREZXNjOiAnQSBwb3dlcmZ1bCBvZmYtcm9hZCBkdWFsLXNwb3J0IHRpdGFuIGNvbnN0cnVjdGVkIHdpdGggaGVhdnktZHV0eSB0aXRhbml1bSBhbGxveSBhbmQgY3VzdG9taXphYmxlIGNhcmdvIGV4cGFuc2lvbiByYWNrcy4nLFxuICAgIGxvbmdEZXNjOiAnVGhlIE5vbWFkIExlZ2VuZCB3YXMgYnVpbHQgZm9yIHRoZSBmZWFybGVzcy4gSXQgZmVhdHVyZXMgcHJlZGljdGl2ZSBtdWx0aS10ZXJyYWluIHRyYWN0aW9uIGFsZ29yaXRobXMsIGhlYXZ5IGR1dHkgcmVpbmZvcmNlZCBjcmFzaCBmcmFtZSBiYXJzLCBoaWdoIGNhcGFjaXR5IGFkdmVudHVyZSBwYW5uaWVycywgYW5kIHN0YW5kYXJkIG1pbGl0YXJ5LWdyYWRlIG5hdmlnYXRpb24gR1BTIHNldHVwcy4nLFxuICAgIHNwZWNzOiB7XG4gICAgICBlbmdpbmU6ICcxMTUwY2MgTGlxdWlkLUNvb2xlZCBQYXJhbGxlbCBUd2luJyxcbiAgICAgIHRvcFNwZWVkOiAnMjAwIGttL2gnLFxuICAgICAgZnVlbENvbnN1bXB0aW9uOiAnMi41IEwvMTAwa20nLFxuICAgICAgcG93ZXI6ICcxMzUgaHAgLyAxOTUgTm0nLFxuICAgICAgd2VpZ2h0OiAnMjA1IGtnJ1xuICAgIH0sXG4gICAgaXNQb3B1bGFyOiBmYWxzZSxcbiAgICBhZGRPbnM6IERFRkFVTFRfQURET05TXG4gIH0sXG5cbiAgLy8gPT09PT09PT09PT09PT09PT09PT0gQ0FURUdPUlkgUzogU0NPT1RFUiAoNCBtb2RlbHMpID09PT09PT09PT09PT09PT09PT09XG4gIHtcbiAgICBpZDogJ3Njb290ZXItY3liZXJnbGlkZScsXG4gICAgbmFtZTogJ0VsS2hvbHkgQ3liZXJHbGlkZSBYJyxcbiAgICBjYXRlZ29yeTogJ1MnLFxuICAgIGNhdGVnb3J5TmFtZTogJ1Njb290ZXInLFxuICAgIHByaWNlOiAnJDEyLDUwMCcsXG4gICAgcHJpY2VOdW06IDEyNTAwLFxuICAgIGltYWdlOiBzY29vdGVySW1nLFxuICAgIHRhZ2xpbmU6ICdSZWNsYWltIHRoZSBVcmJhbiBDb3JlJyxcbiAgICBzaG9ydERlc2M6ICdIaWdoLWVuZCBzbWFydCBzY29vdGVyIHdpdGggaG92ZXItaW5zcGlyZWQgZGVzaWduLCBpbnRlcmFjdGl2ZSBoZWFkcy11cCBzY3JlZW4sIGFuZCBhdXRvbWF0aWMgY2l0eSBsYW5lIHRyYWNraW5nLicsXG4gICAgbG9uZ0Rlc2M6ICdEZXNpZ25lZCB0byBzbGFsb20gdGhyb3VnaCBuZW8tY2l0eSB0cmFmZmljIGphbXMgaW4gc3R5bGUuIEJ1aWx0LWluIG1hZ25ldGljIGh1YiBtb3RvciBhbmQgZHluYW1pYyBzbWFydC1jcnVpc2UgY29udHJvbGxlciBlbnN1cmUgc21vb3RoIHJpZGluZy4gQ2hhcmdlcyBmdWxseSBpbiB1bmRlciA4IG1pbnV0ZXMgd2l0aCBoaWdoLXNwZWVkIHF1YW50dW0gY2hhcmdlcnMuJyxcbiAgICBzcGVjczoge1xuICAgICAgZW5naW5lOiAnNDAwY2MgSHlwZXItTWFnbmV0aWMgVXJiYW4gSHViIE1vdG9yJyxcbiAgICAgIHRvcFNwZWVkOiAnMTM1IGttL2gnLFxuICAgICAgZnVlbENvbnN1bXB0aW9uOiAnMC4wIEwvMTAwa20gKEhpZ2gtZGVuc2l0eSBiYXR0ZXJ5KScsXG4gICAgICBwb3dlcjogJzU1IGhwIC8gOTUgTm0nLFxuICAgICAgd2VpZ2h0OiAnMTEwIGtnJ1xuICAgIH0sXG4gICAgaXNQb3B1bGFyOiB0cnVlLFxuICAgIGFkZE9uczogREVGQVVMVF9BRERPTlNcbiAgfSxcbiAge1xuICAgIGlkOiAnc2Nvb3Rlci1uZW9uLWJyZWV6ZScsXG4gICAgbmFtZTogJ0VsS2hvbHkgTmVvbiBCcmVlemUnLFxuICAgIGNhdGVnb3J5OiAnUycsXG4gICAgY2F0ZWdvcnlOYW1lOiAnU2Nvb3RlcicsXG4gICAgcHJpY2U6ICckOSwwMDAnLFxuICAgIHByaWNlTnVtOiA5MDAwLFxuICAgIGltYWdlOiBzY29vdGVySW1nLFxuICAgIHRhZ2xpbmU6ICdBZ2lsaXR5IE1lZXRzIE5lb24gRWxlZ2FuY2UnLFxuICAgIHNob3J0RGVzYzogJ0NvbWZvcnRhYmxlIGxpZ2h0d2VpZ2h0IHNtYXJ0IHNjb290ZXIgZmVhdHVyaW5nIGludGVyY2hhbmdlYWJsZSBzaWRlIHRydW5rcyBhbmQgYWRhcHRpdmUgdW5kZXJnbG93IGxpZ2h0aW5nIHN0cmlwcy4nLFxuICAgIGxvbmdEZXNjOiAnVGhlIE5lb24gQnJlZXplIGNvbWJpbmVzIGV4dHJlbWUgYWdpbGl0eSB3aXRoIGhpZ2gtZW5kIGFlc3RoZXRpYyBkZXRhaWxzLiBDdXN0b20tc3luYyB0aGUgd2hlZWwgbGlnaHRzIGRpcmVjdGx5IHRvIHlvdXIgc21hcnRwaG9uZSBtdXNpYyBiZWF0cy4gQnVpbHQtaW4gc2VjdXJlIHdpcmVsZXNzIGhlbG1ldCBsb2NrIGFuZCBhZHZhbmNlZCBhbnRpLXRoZWZ0IGJpb21ldHJpY3MuJyxcbiAgICBzcGVjczoge1xuICAgICAgZW5naW5lOiAnMzAwY2MgQnJ1c2hsZXNzIERpcmVjdC1Ecml2ZSBNb3RvcicsXG4gICAgICB0b3BTcGVlZDogJzExMCBrbS9oJyxcbiAgICAgIGZ1ZWxDb25zdW1wdGlvbjogJzAuMCBMLzEwMGttIChTb2xpZC1lbGVjdHJvbHl0ZSBiYXR0ZXJ5KScsXG4gICAgICBwb3dlcjogJzM4IGhwIC8gNzIgTm0nLFxuICAgICAgd2VpZ2h0OiAnOTUga2cnXG4gICAgfSxcbiAgICBpc1BvcHVsYXI6IGZhbHNlLFxuICAgIGFkZE9uczogREVGQVVMVF9BRERPTlNcbiAgfSxcbiAge1xuICAgIGlkOiAnc2Nvb3Rlci1zb2xhci13YXZlJyxcbiAgICBuYW1lOiAnRWxLaG9seSBTb2xhciBXYXZlIFNtYXJ0JyxcbiAgICBjYXRlZ29yeTogJ1MnLFxuICAgIGNhdGVnb3J5TmFtZTogJ1Njb290ZXInLFxuICAgIHByaWNlOiAnJDE0LDAwMCcsXG4gICAgcHJpY2VOdW06IDE0MDAwLFxuICAgIGltYWdlOiBzY29vdGVySW1nLFxuICAgIHRhZ2xpbmU6ICdSaWRlIHRoZSBTdW5saWdodCcsXG4gICAgc2hvcnREZXNjOiAnTGlnaHR3ZWlnaHQgY2FyYm9uIGNhcmJvbi1maWJlciBmcmFtZSByZXRyb2ZpdHRlZCB3aXRoIG1pY3JvIHNvbGFyLXJlY2hhcmdlIHBhbmVscyBhbmQgYnVpbHQtaW4gbmF2aWdhdGlvbi4nLFxuICAgIGxvbmdEZXNjOiAnVGhlIFNvbGFyIFdhdmUgZmVhdHVyZXMgaW50ZWdyYXRlZCBoaWdoLWVmZmljaWVuY3kgcGhvdG92b2x0YWljIHBhbmVscyBhY3Jvc3MgdGhlIGZyb250IGZhaXJpbmcsIGZlZWRpbmcgYSB0cmlja2xlLWNoYXJnZSBpbnRvIHRoZSBhdXhpbGlhcnkgYmF0dGVyeS4gUmVjbGFpbSBjaXR5IGNvbW11dGVzIG9uIGEgY29tcGxldGVseSBzZWxmLXN1c3RhaW5pbmcgZW5lcmd5IGxvb3AuJyxcbiAgICBzcGVjczoge1xuICAgICAgZW5naW5lOiAnNTAwY2MgSGlnaC1PdXRwdXQgU29sYXItRWxlY3RyaWMgSHViJyxcbiAgICAgIHRvcFNwZWVkOiAnMTQwIGttL2gnLFxuICAgICAgZnVlbENvbnN1bXB0aW9uOiAnMC4wIEwvMTAwa20nLFxuICAgICAgcG93ZXI6ICc2MCBocCAvIDEwNSBObScsXG4gICAgICB3ZWlnaHQ6ICcxMDUga2cnXG4gICAgfSxcbiAgICBpc1BvcHVsYXI6IGZhbHNlLFxuICAgIGFkZE9uczogREVGQVVMVF9BRERPTlNcbiAgfSxcbiAge1xuICAgIGlkOiAnc2Nvb3Rlci1xdWFudHVtLXB1bHNlJyxcbiAgICBuYW1lOiAnRWxLaG9seSBRdWFudHVtIFB1bHNlIEpldCcsXG4gICAgY2F0ZWdvcnk6ICdTJyxcbiAgICBjYXRlZ29yeU5hbWU6ICdTY29vdGVyJyxcbiAgICBwcmljZTogJyQxNiw1MDAnLFxuICAgIHByaWNlTnVtOiAxNjUwMCxcbiAgICBpbWFnZTogc2Nvb3RlckltZyxcbiAgICB0YWdsaW5lOiAnVGhlIENpdHkgTGlnaHRuaW5nIEJvbHQnLFxuICAgIHNob3J0RGVzYzogJ0hpZ2gtdmVsb2NpdHkgcHJlbWl1bSBjb21tdXRlciBzY29vdGVyIHdpdGggaW5zdGFudCBzbWFydC1kcml2ZSB0b3JxdWUsIHNtYXJ0IGhlbG1ldHMgc3VwcG9ydCwgYW5kIHBlcmltZXRlciBsYXNlcnMuJyxcbiAgICBsb25nRGVzYzogJ1RoZSBRdWFudHVtIFB1bHNlIHJlcHJlc2VudHMgdGhlIHVwcGVyLXRpZXIgb2YgcHJlbWl1bSB1cmJhbiBtb2JpbGl0eS4gRmVhdHVyaW5nIGRvdWJsZS13aXNoYm9uZSBhY3RpdmUgZWxlY3Ryb25pYyBmcm9udCBzdXNwZW5zaW9uIHNob2NrcyBhbmQgYSBmdWxsIGRpZ2l0YWwgZGlhZ25vc3RpYyBjb2NrcGl0LicsXG4gICAgc3BlY3M6IHtcbiAgICAgIGVuZ2luZTogJzY1MGNjIFF1YW50dW0gSW5kdWN0aW9uIExpcXVpZC1Db29sZWQgSHViJyxcbiAgICAgIHRvcFNwZWVkOiAnMTUwIGttL2gnLFxuICAgICAgZnVlbENvbnN1bXB0aW9uOiAnMC4wIEwvMTAwa20nLFxuICAgICAgcG93ZXI6ICc3MiBocCAvIDEyMCBObScsXG4gICAgICB3ZWlnaHQ6ICcxMTUga2cnXG4gICAgfSxcbiAgICBpc1BvcHVsYXI6IHRydWUsXG4gICAgYWRkT25zOiBERUZBVUxUX0FERE9OU1xuICB9LFxuICB7XG4gICAgaWQ6ICdzY29vdGVyLWZ1c2lvbi1saXRlJyxcbiAgICBuYW1lOiAnRWxLaG9seSBGdXNpb24gTGl0ZScsXG4gICAgY2F0ZWdvcnk6ICdTJyxcbiAgICBjYXRlZ29yeU5hbWU6ICdTY29vdGVyJyxcbiAgICBwcmljZTogJyQxMSwwMDAnLFxuICAgIHByaWNlTnVtOiAxMTAwMCxcbiAgICBpbWFnZTogc2Nvb3RlckltZyxcbiAgICB0YWdsaW5lOiAnVWx0cmFsaWdodCBVcmJhbiBGbGVldCcsXG4gICAgc2hvcnREZXNjOiAnRmVhdGhlcndlaWdodCBoaWdoLWVmZmljaWVuY3kgZWxlY3Ryb25pYyBzY29vdGVyIHBlcmZlY3QgZm9yIHF1aWNrIHNtYXJ0IGNvbW11dGVzIGFuZCBkZW5zZSB1cmJhbiBjb3JyaWRvcnMuJyxcbiAgICBsb25nRGVzYzogJ1RoZSBGdXNpb24gTGl0ZSBvZmZlcnMgcmVzcG9uc2l2ZSBwZXJmb3JtYW5jZSB3aXRoIGR1YWwgcmVhciBicnVzaGxlc3MgbW90b3JzIGFuZCBhIHN1cGVyIGNvbXBhY3QgY29sbGFwc2libGUgcG9zdHVyZS4gRmVhdHVyZXMgZnVsbCBpbnRlcmFjdGl2ZSBibHVldG9vdGggYXBwbGljYXRpb24gbGlua2FnZSBmb3Iga2V5bGVzcyBkaWdpdGFsIGVuZ2luZSBpZ25pdGlvbi4nLFxuICAgIHNwZWNzOiB7XG4gICAgICBlbmdpbmU6ICczNTBjYyBEdWFsIFJlYXIgQnJ1c2hsZXNzIEh1YnMnLFxuICAgICAgdG9wU3BlZWQ6ICcxMjAga20vaCcsXG4gICAgICBmdWVsQ29uc3VtcHRpb246ICcwLjAgTC8xMDBrbSAoU29saWQgc3RhdGUgY29tcGFjdCknLFxuICAgICAgcG93ZXI6ICc0NSBocCAvIDg1IE5tJyxcbiAgICAgIHdlaWdodDogJzg4IGtnJ1xuICAgIH0sXG4gICAgaXNQb3B1bGFyOiBmYWxzZSxcbiAgICBhZGRPbnM6IERFRkFVTFRfQURET05TXG4gIH1cbl07XG5cbmV4cG9ydCBjb25zdCBDQVRFR09SWV9ERVNfTUFQID0ge1xuICBBOiB7XG4gICAgdGl0bGU6IFwi4pqhIFNwb3J0IE1vdG9yY3ljbGVzXCIsXG4gICAgZGVzYzogXCJFbmdpbmVlcmVkIGZvciBwdXJlIHNwZWVkLCBleHRyZW1lIGFjY2VsZXJhdGlvbiwgYW5kIGN1dHRpbmctZWRnZSBkaWdpdGFsIGFlcm9keW5hbWljcy4gQnVpbHQgZm9yIHRyYWNrIGRvbWluYW5jZSBhbmQgbmlnaHQgc3BlZWQuXCJcbiAgfSxcbiAgQjoge1xuICAgIHRpdGxlOiBcIvCfm4sgQ3J1aXNlciBNb3RvcmN5Y2xlc1wiLFxuICAgIGRlc2M6IFwiV2hlcmUgbG93LXNsdW5nIHJldHJvLWNsYXNzaWMgY2hvcHBlciBjb21mb3J0IG1lZXRzIGNvbnRpbnVvdXMgaGlnaC1lbmVyZ3kgaG92ZXIgbWFnbmV0aWMgcG93ZXIuIENydWlzZSB0aGUgY29zbWljIGhpZ2h3YXlzLlwiXG4gIH0sXG4gIEM6IHtcbiAgICB0aXRsZTogXCLwn4yOIEFkdmVudHVyZSAvIFRvdXJpbmcgU2VyaWVzXCIsXG4gICAgZGVzYzogXCJSb2J1c3Qgb2ZmLXJvYWQgYXJtb3JlZCBidWlsZHMgY3JhZnRlZCB0byBieXBhc3Mgc3RydWN0dXJhbCBjb25zdHJhaW50cywgZHVzdCBzdG9ybXMsIGFuZCBleHRyZW1lIGdyYXZlbCB0ZXJyYWlucyB3aXRoIGVhc2UuXCJcbiAgfSxcbiAgUzoge1xuICAgIHRpdGxlOiBcIvCflIsgU21hcnQgQ2l0eSBTY29vdGVyc1wiLFxuICAgIGRlc2M6IFwiVWx0cmEtc2xlZWssIGxpZ2h0d2VpZ2h0IGVsZWN0cmljIHVyYmFuIHNsYWxvbWVycyB3aXRoIGluc3RhbnQgaGlnaC1kZW5zaXR5IGNoYXJnaW5nIGFuZCBpbnRlcmFjdGl2ZSBtdWx0aS10b3VjaCBjb2NrcGl0cy5cIlxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9IT01FUEFHRV9DT05GSUc6IEhvbWVwYWdlQ29uZmlnID0ge1xuICBmb250OiAnU3BhY2UgR3JvdGVzaycsXG4gIGZvbnRIZWFkaW5nczogJ1NwYWNlIEdyb3Rlc2snLFxuICBmb250U3ViaGVhZGluZ3M6ICdDYWlybycsXG4gIGZvbnRCb2R5OiAnSW50ZXInLFxuICB0aGVtZToge1xuICAgIHByaW1hcnlDb2xvcjogJyM2MzY2RjEnLFxuICAgIHNlY29uZGFyeUNvbG9yOiAnI0E4NTVGNycsXG4gICAgYmFja2dyb3VuZENvbG9yOiAnIzBCMEYxQScsXG4gICAgYnV0dG9uUmFkaXVzOiAncm91bmRlZC14bCcsXG4gICAgaWNvblNoYXBlOiAnY2lyY2xlJyxcbiAgICBzcGFjaW5nTXVsdGlwbGllcjogMS4wLFxuICB9LFxuICBoZWFkZXI6IHtcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6IEhFUk9fQkdfSU1BR0UsXG4gICAgbG9nb1VybDogJycsXG4gICAgbG9nb1RleHQ6ICdFTEtIT0xZJyxcbiAgICBsb2dvVGV4dEFyOiAn2KfZhNiu2YjZhNmKJyxcbiAgICBsb2dvU2l6ZTogJ21lZGl1bScsXG4gICAgbG9nb1Bvc2l0aW9uOiAnbGVmdCcsXG4gICAgbG9nb0VmZmVjdDogJ2dsb3cnLFxuICAgIHRpdGxlOiAnRUxLSE9MWScsXG4gICAgdGl0bGVBcjogJ9in2YTYrtmI2YTZiicsXG4gICAgYWNjZW50OiAnTU9UT1JTJyxcbiAgICBhY2NlbnRBcjogJ9mF2YjYqtmI2LHYsicsXG4gICAgc3VidGl0bGU6ICdSSURFIFRIRSBGVVRVUkUnLFxuICAgIHN1YnRpdGxlQXI6ICfYs9in2KjZgiDZhdi5INin2YTZhdiz2KrZgtio2YQnLFxuICAgIGN1c3RvbUh0bWxFbmFibGVkOiBmYWxzZSxcbiAgICBjdXN0b21IdG1sOiBgPGRpdiBjbGFzcz1cInAtNCBiZy13aGl0ZS81IGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBteS00IHRleHQtY2VudGVyIHRleHQteHMgZm9udC1tb25vXCI+XG4gIDxwIGNsYXNzPVwidGV4dC1icmFuZC1hY2NlbnQgZm9udC1ib2xkXCI+4pyoIEVYVFJFTUUgUkFDSU5HIEVWRU5UIENPREVTIEFDVElWRSDinKg8L3A+XG4gIDxwIGNsYXNzPVwidGV4dC1ncmF5LTQwMCBtdC0xXCI+U3BlY2lhbCB0cmFjayB0ZXN0aW5nIHN0YXJ0cyBGcmlkYXkgODowMCBQTSBhdCBDYWlybyBSaW5nIFJvYWQgdmlydHVhbCBnYXRld2F5LiBBbGwgb3BlcmF0b3JzIHdlbGNvbWUuPC9wPlxuPC9kaXY+YCxcbiAgICBidXR0b25FeHBsb3JlVGV4dDogJ0VYUExPUkUgVkVISUNMRVMg4oaTJyxcbiAgICBidXR0b25FeHBsb3JlVGV4dEFyOiAn2KfYs9iq2YPYtNmBINin2YTZhdix2YPYqNin2Kog4oaTJyxcbiAgICBidXR0b25Cb29rVGV4dDogJ1FVSUNLIEJPT0sg8J+PhicsXG4gICAgYnV0dG9uQm9va1RleHRBcjogJ9it2KzYsiDYs9ix2YrYuSDwn4+GJyxcbiAgICBhbmltYXRpb25zRW5hYmxlZDogdHJ1ZSxcbiAgfSxcbiAgbWFpbkNvbnRlbnQ6IHtcbiAgICBzaG93Q2F0ZWdvcmllczogdHJ1ZSxcbiAgICBzaG93RmVhdHVyZWQ6IHRydWUsXG4gICAgc2hvd09mZmVyczogdHJ1ZSxcbiAgICBjYXRlZ29yaWVzVGl0bGU6ICdTaG93cm9vbSBDYXRlZ29yaWVzJyxcbiAgICBjYXRlZ29yaWVzVGl0bGVBcjogJ9ij2YLYs9in2YUg2KfZhNmF2LnYsdi2INin2YTYsdmC2YXZitipJyxcbiAgICBmZWF0dXJlZFRpdGxlOiAnSG9sb2dyYXBoaWMgU3VwZXIgTWFjaGluZXMnLFxuICAgIGZlYXR1cmVkVGl0bGVBcjogJ9in2YTZhdmI2KrZiNiz2YrZg9mE2KfYqiDYp9mE2K7Yp9ix2YLYqSDYp9mE2YXZhdmK2LLYqScsXG4gICAgb2ZmZXJzVGl0bGU6ICdBY3RpdmUgVHJhZGUgT3B0aW9ucyAmIERpc2NvdW50cycsXG4gICAgb2ZmZXJzVGl0bGVBcjogJ9in2YTYudix2YjYtiDYp9mE2LPYp9iu2YbYqSDZiNin2YTYrti12YjZhdin2Kog2KfZhNmF2KrZgdix2K/YqScsXG4gICAgbGF5b3V0U3R5bGU6ICdncmlkJyxcbiAgICBjdXN0b21DYXRlZ29yeUljb25zOiB7XG4gICAgICBBOiAnJyxcbiAgICAgIEI6ICcnLFxuICAgICAgQzogJycsXG4gICAgICBTOiAnJyxcbiAgICB9LFxuICAgIGljb25Db2xvcjogJyMyMkQzRUUnLFxuICAgIGljb25TaXplOiAnbWQnLFxuICB9LFxuICBmb290ZXI6IHtcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgIGNvbnRlbnQ6ICdTdGVwIGluc2lkZSB0aGUgdmlydHVhbCBncmlkLiBFbEtob2x5IE1vdG9ycyBpbnRyb2R1Y2VzIGV4dHJlbWUtb3V0cHV0IHNvbGlkLXN0YXRlIHBlcmZvcm1hbmNlIGJpa2VzLCBwbGFzbWEgdG91cmluZyBhZHZlbnR1cmVycywgYW5kIGhpZ2gtZmlkZWxpdHkgc21hcnQgdXJiYW4gc2Nvb3RlcnMgZGVzaWduZWQgaW4gMjAyNi4gRXhwbG9yZSBvdXIgY2F0YWxvZywgcmV2aWV3IGJsdWVwcmludHMsIGFuZCBib29rIGEgc2VjdXJlIHJpZGUgZGlyZWN0bHkuJyxcbiAgICBjb250ZW50QXI6ICfYp9mG2LbZhSDYpdmE2Ykg2LnYp9mE2YUg2KfZhNi62K8uINiq2YLYr9mFINin2YTYrtmI2YTZiiDZhdmI2KrZiNix2LIg2KPZgtmI2Ykg2KfZhNmF2YjYqtmI2LPZitmD2YTYp9iqINmI2KfZhNin2LPZg9mI2KrYsdin2Kog2YHYp9im2YLYqSDYp9mE2KPYr9in2KEg2YTZhNmF2LPYqtmC2KjZhC4g2KfYs9iq2YPYtNmBINmD2KrYp9mE2YjYrNin2KrZhtin2Iwg2YjYp9mC2LHYoyDYp9mE2YXZiNin2LXZgdin2Kog2YjYp9it2KzYsiDYsdit2YTYqtmDINmF2KjYp9i02LHYqS4nLFxuICAgIHNvY2lhbExpbmtzOiB7XG4gICAgICBmYWNlYm9vazogJ2h0dHBzOi8vZmFjZWJvb2suY29tL2Vsa2hvbHkubW90b3JzJyxcbiAgICAgIGluc3RhZ3JhbTogJ2h0dHBzOi8vaW5zdGFncmFtLmNvbS9lbGtob2x5Lm1vdG9ycycsXG4gICAgICB3aGF0c2FwcDogJ2h0dHBzOi8vd2EubWUvMjAxMDA3MDYyMTIzJyxcbiAgICAgIHlvdXR1YmU6ICdodHRwczovL3lvdXR1YmUuY29tL2Vsa2hvbHkubW90b3JzJyxcbiAgICB9LFxuICAgIHF1aWNrTGlua3M6IFtcbiAgICAgIHsgbGFiZWw6ICdIb21lJywgbGFiZWxBcjogJ9in2YTYsdim2YrYs9mK2KknLCB1cmw6ICcjaG9tZScgfSxcbiAgICAgIHsgbGFiZWw6ICdTaG93cm9vbScsIGxhYmVsQXI6ICfYp9mE2YXYudix2LYg2KfZhNix2YLZhdmKJywgdXJsOiAnI2dhbGxlcnknIH0sXG4gICAgICB7IGxhYmVsOiAnQ2F0ZWdvcmllcycsIGxhYmVsQXI6ICfYp9mE2KPZgtiz2KfZhScsIHVybDogJyNjYXRlZ29yaWVzJyB9LFxuICAgIF0sXG4gIH0sXG59O1xuXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUUEsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxvQkFBb0I7QUFDM0IsT0FBTyxzQkFBc0I7QUFDN0IsT0FBTyxnQkFBZ0I7QUFFaEIsYUFBTSxnQkFBZ0I7QUFFdEIsYUFBTSxpQkFBaUI7QUFBQSxFQUM1QjtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsYUFBYTtBQUFBLElBQ2IsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixPQUFPO0FBQUEsSUFDUCxhQUFhO0FBQUEsSUFDYixRQUFRO0FBQUEsSUFDUixPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLE9BQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLFFBQVE7QUFBQSxJQUNSLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsYUFBYTtBQUFBLElBQ2IsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLEVBQ1Q7QUFDRjtBQUVPLGFBQU0sbUJBQWlDO0FBQUE7QUFBQSxFQUU1QztBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsY0FBYztBQUFBLElBQ2QsT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUEsTUFDakIsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxJQUNmLFVBQVU7QUFBQSxJQUNWLGNBQWM7QUFBQSxJQUNkLFlBQVk7QUFBQSxJQUNaLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsY0FBYztBQUFBLElBQ2QsT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUEsTUFDakIsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsY0FBYztBQUFBLElBQ2QsT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUEsTUFDakIsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsY0FBYztBQUFBLElBQ2QsT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUEsTUFDakIsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsY0FBYztBQUFBLElBQ2QsT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUEsTUFDakIsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxFQUNWO0FBQUE7QUFBQSxFQUdBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFDVixjQUFjO0FBQUEsSUFDZCxPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsSUFDUCxTQUFTO0FBQUEsSUFDVCxXQUFXO0FBQUEsSUFDWCxVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixpQkFBaUI7QUFBQSxNQUNqQixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLElBQ2YsVUFBVTtBQUFBLElBQ1YsY0FBYztBQUFBLElBQ2QsWUFBWTtBQUFBLElBQ1osUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFDVixjQUFjO0FBQUEsSUFDZCxPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsSUFDUCxTQUFTO0FBQUEsSUFDVCxXQUFXO0FBQUEsSUFDWCxVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixpQkFBaUI7QUFBQSxNQUNqQixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFDVixjQUFjO0FBQUEsSUFDZCxPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsSUFDUCxTQUFTO0FBQUEsSUFDVCxXQUFXO0FBQUEsSUFDWCxVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixpQkFBaUI7QUFBQSxNQUNqQixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFDVixjQUFjO0FBQUEsSUFDZCxPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsSUFDUCxTQUFTO0FBQUEsSUFDVCxXQUFXO0FBQUEsSUFDWCxVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixpQkFBaUI7QUFBQSxNQUNqQixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFDVixjQUFjO0FBQUEsSUFDZCxPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsSUFDUCxTQUFTO0FBQUEsSUFDVCxXQUFXO0FBQUEsSUFDWCxVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixpQkFBaUI7QUFBQSxNQUNqQixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLEVBQ1Y7QUFBQTtBQUFBLEVBR0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUNWLGNBQWM7QUFBQSxJQUNkLE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLGlCQUFpQjtBQUFBLE1BQ2pCLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUNWLGNBQWM7QUFBQSxJQUNkLE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLGlCQUFpQjtBQUFBLE1BQ2pCLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsSUFDZixVQUFVO0FBQUEsSUFDVixjQUFjO0FBQUEsSUFDZCxZQUFZO0FBQUEsSUFDWixRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUNWLGNBQWM7QUFBQSxJQUNkLE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLGlCQUFpQjtBQUFBLE1BQ2pCLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUNWLGNBQWM7QUFBQSxJQUNkLE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLGlCQUFpQjtBQUFBLE1BQ2pCLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUNWLGNBQWM7QUFBQSxJQUNkLE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLGlCQUFpQjtBQUFBLE1BQ2pCLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsRUFDVjtBQUFBO0FBQUEsRUFHQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsY0FBYztBQUFBLElBQ2QsT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUEsTUFDakIsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsY0FBYztBQUFBLElBQ2QsT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUEsTUFDakIsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsY0FBYztBQUFBLElBQ2QsT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUEsTUFDakIsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsY0FBYztBQUFBLElBQ2QsT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUEsTUFDakIsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsY0FBYztBQUFBLElBQ2QsT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUEsTUFDakIsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxFQUNWO0FBQ0Y7QUFFTyxhQUFNLG1CQUFtQjtBQUFBLEVBQzlCLEdBQUc7QUFBQSxJQUNELE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxHQUFHO0FBQUEsSUFDRCxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsR0FBRztBQUFBLElBQ0QsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLEdBQUc7QUFBQSxJQUNELE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSO0FBQ0Y7QUFFTyxhQUFNLDBCQUEwQztBQUFBLEVBQ3JELE1BQU07QUFBQSxFQUNOLGNBQWM7QUFBQSxFQUNkLGlCQUFpQjtBQUFBLEVBQ2pCLFVBQVU7QUFBQSxFQUNWLE9BQU87QUFBQSxJQUNMLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLFdBQVc7QUFBQSxJQUNYLG1CQUFtQjtBQUFBLEVBQ3JCO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixpQkFBaUI7QUFBQSxJQUNqQixTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsSUFDVixZQUFZO0FBQUEsSUFDWixVQUFVO0FBQUEsSUFDVixjQUFjO0FBQUEsSUFDZCxZQUFZO0FBQUEsSUFDWixPQUFPO0FBQUEsSUFDUCxTQUFTO0FBQUEsSUFDVCxRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixZQUFZO0FBQUEsSUFDWixtQkFBbUI7QUFBQSxJQUNuQixZQUFZO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFJWixtQkFBbUI7QUFBQSxJQUNuQixxQkFBcUI7QUFBQSxJQUNyQixnQkFBZ0I7QUFBQSxJQUNoQixrQkFBa0I7QUFBQSxJQUNsQixtQkFBbUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsYUFBYTtBQUFBLElBQ1gsZ0JBQWdCO0FBQUEsSUFDaEIsY0FBYztBQUFBLElBQ2QsWUFBWTtBQUFBLElBQ1osaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIsZUFBZTtBQUFBLElBQ2YsaUJBQWlCO0FBQUEsSUFDakIsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLElBQ2YsYUFBYTtBQUFBLElBQ2IscUJBQXFCO0FBQUEsTUFDbkIsR0FBRztBQUFBLE1BQ0gsR0FBRztBQUFBLE1BQ0gsR0FBRztBQUFBLE1BQ0gsR0FBRztBQUFBLElBQ0w7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixTQUFTO0FBQUEsSUFDVCxXQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUEsTUFDWCxVQUFVO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EsWUFBWTtBQUFBLE1BQ1YsRUFBRSxPQUFPLFFBQVEsU0FBUyxZQUFZLEtBQUssUUFBUTtBQUFBLE1BQ25ELEVBQUUsT0FBTyxZQUFZLFNBQVMsaUJBQWlCLEtBQUssV0FBVztBQUFBLE1BQy9ELEVBQUUsT0FBTyxjQUFjLFNBQVMsV0FBVyxLQUFLLGNBQWM7QUFBQSxJQUNoRTtBQUFBLEVBQ0Y7QUFDRjsiLCJuYW1lcyI6W119