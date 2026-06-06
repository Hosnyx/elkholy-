import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d4a02cea"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=d4a02cea"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useMemo = __vite__cjsImport1_react["useMemo"];
import { motion, AnimatePresence } from "/node_modules/.vite/deps/motion_react.js?v=f1f188c8";
import {
  Bike,
  Heart,
  Trash2,
  ArrowDown,
  Target,
  Shield,
  X,
  ChevronRight,
  MessageCircle,
  ShoppingCart
} from "/node_modules/.vite/deps/lucide-react.js?v=1004c77f";
import Navbar from "/src/components/Navbar.tsx";
import FilterSection from "/src/components/FilterSection.tsx";
import MotorcycleCard from "/src/components/MotorcycleCard.tsx";
import BookingModal from "/src/components/BookingModal.tsx";
import PdfModal from "/src/components/PdfModal.tsx";
import ContactFooter from "/src/components/ContactFooter.tsx";
import AdminPanel from "/src/components/AdminPanel.tsx";
import StoreView from "/src/components/StoreView.tsx";
import CartDrawer from "/src/components/CartDrawer.tsx";
import { MOTORCYCLES_DATA, HERO_BG_IMAGE, DEFAULT_HOMEPAGE_CONFIG } from "/src/data.ts";
import { MOCK_STORE_PRODUCTS } from "/src/dataStoreMock.ts";
import { useLanguage } from "/src/context/LanguageContext.tsx";
import { db } from "/src/lib/firebase.ts";
import { collection, doc, getDocs, setDoc, getDoc, deleteDoc, writeBatch } from "/node_modules/.vite/deps/firebase_firestore.js?v=09e70c7a";
export default function App() {
  const { lang, dir, t } = useLanguage();
  const formatAppPrice = (num) => {
    return lang === "ar" ? `${num.toLocaleString()} جنيه` : `${num.toLocaleString()} EGP`;
  };
  const [motorcyclesData, setMotorcyclesData] = useState(() => {
    const saved = localStorage.getItem("elkholy_motorcycles");
    return saved ? JSON.parse(saved) : MOTORCYCLES_DATA;
  });
  const [homepageConfig, setHomepageConfig] = useState(() => {
    const saved = localStorage.getItem("elkholy_homepage_config");
    return saved ? JSON.parse(saved) : DEFAULT_HOMEPAGE_CONFIG;
  });
  const [customText, setCustomText] = useState(() => {
    const saved = localStorage.getItem("elkholy_custom_text");
    return saved ? JSON.parse(saved) : null;
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("elkholy_favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeView, setActiveView] = useState("home");
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("elkholy_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [storeProductsData, setStoreProductsData] = useState(() => {
    const saved = localStorage.getItem("elkholy_store_products");
    return saved ? JSON.parse(saved) : [];
  });
  const [filters, setFilters] = useState({
    searchQuery: "",
    category: "ALL",
    priceRange: 5e6,
    sortBy: "default",
    onlyPopular: false
  });
  const [speedRange, setSpeedRange] = useState(100);
  const handleUpdateMotorcycles = async (updated) => {
    setMotorcyclesData(updated);
    localStorage.setItem("elkholy_motorcycles", JSON.stringify(updated));
    try {
      const querySnapshot = await getDocs(collection(db, "motorcycles"));
      const fbIds = querySnapshot.docs.map((doc2) => doc2.id);
      const nextIds = updated.map((bike) => bike.id);
      for (const id of fbIds) {
        if (!nextIds.includes(id)) {
          await deleteDoc(doc(db, "motorcycles", id));
        }
      }
      for (const bike of updated) {
        await setDoc(doc(db, "motorcycles", bike.id), bike);
      }
    } catch (err) {
      console.warn("Unable to sync motorcycles changes to Firestore:", err);
    }
  };
  const handleUpdateHomepageConfig = async (updatedConfig) => {
    setHomepageConfig(updatedConfig);
    localStorage.setItem("elkholy_homepage_config", JSON.stringify(updatedConfig));
    try {
      await setDoc(doc(db, "homepageConfig", "main"), updatedConfig);
    } catch (err) {
      console.warn("Unable to sync homepageConfig changes to Firestore:", err);
    }
  };
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [activeBookItem, setActiveBookItem] = useState(null);
  const [activePdfItem, setActivePdfItem] = useState(null);
  const [showFlagshipSpecs, setShowFlagshipSpecs] = useState(false);
  const [bentoBookingName, setBentoBookingName] = useState("");
  const [bentoBookingPhone, setBentoBookingPhone] = useState("");
  const customBadgeText = useMemo(() => {
    return lang === "ar" ? homepageConfig.header.titleAr || "أول معرض كبار الشخصيات بمصر" : homepageConfig.header.title || "EGYPT'S FIRST CHRONOS SHOWROOM";
  }, [lang, homepageConfig]);
  const customTitleText = useMemo(() => {
    return lang === "ar" ? homepageConfig.header.titleAr || "الخولي" : homepageConfig.header.title || "ELKHOLY";
  }, [lang, homepageConfig]);
  const customTitleAccent = useMemo(() => {
    return lang === "ar" ? homepageConfig.header.accentAr || "موتورز" : homepageConfig.header.accent || "MOTORS";
  }, [lang, homepageConfig]);
  const customHeroSlogan = useMemo(() => {
    return lang === "ar" ? homepageConfig.header.subtitleAr || "سابق مع المستقبل" : homepageConfig.header.subtitle || "RIDE THE FUTURE";
  }, [lang, homepageConfig]);
  const customHeroDesc = useMemo(() => {
    return lang === "ar" ? homepageConfig.footer.contentAr || "انضم إلى عالم الغد. تقدم الخولي موتورز أقوى الموتوسيكلات والاسكوترات فائقة الأداء للمستقبل. استكشف كتالوجاتنا، واقرأ المواصفات واحجز رحلتك مباشرة." : homepageConfig.footer.content || "Step inside the virtual grid. ElKholy Motors introduces extreme-output solid-state performance bikes, plasma touring adventurers, and high-fidelity smart urban scooters designed in 2026. Explore our catalog, review blueprints, and book a secure ride directly.";
  }, [lang, homepageConfig]);
  const flagshipBike = useMemo(() => {
    const activeCat = filters.category;
    if (activeCat === "ALL") {
      return motorcyclesData.find((b) => b.id === "sport-cybersport-v4") || motorcyclesData[0];
    }
    return motorcyclesData.find((b) => b.category === activeCat && b.isPopular) || motorcyclesData.find((b) => b.category === activeCat) || motorcyclesData[0];
  }, [filters.category, motorcyclesData]);
  const handleBentoBookingSubmit = (e) => {
    if (e) e.preventDefault();
    if (!bentoBookingName.trim() || !bentoBookingPhone.trim()) {
      handleOpenBooking(flagshipBike.id, flagshipBike.name, flagshipBike.category, flagshipBike.price);
      return;
    }
    const vehicleType = flagshipBike.category === "S" ? lang === "ar" ? "سكوتر" : "Scooter" : lang === "ar" ? "موتوسيكل" : "Motorcycle";
    const catLabelMap = { A: "Sport (A)", B: "Cruiser (B)", C: "Adventure (C)", S: "Scooter (S)" };
    const arabicCategory = catLabelMap[flagshipBike.category] || flagshipBike.categoryName;
    const priceText = formatAppPrice(flagshipBike.priceNum);
    let waText = "";
    if (lang === "ar") {
      waText = `مرحباً، أريد حجز هذا ${vehicleType}:
الاسم: ${flagshipBike.name}
الفئة: ${arabicCategory}
السعر: ${priceText}
التاريخ: ${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}
اسم الحجز: ${bentoBookingName}
رقم الهاتف: ${bentoBookingPhone}`;
    } else {
      waText = `Hello, I would like to book this ${vehicleType}:
Name: ${flagshipBike.name}
Category: ${flagshipBike.categoryName}
Price: ${priceText}
Date: ${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}
Client Name: ${bentoBookingName}
Phone: ${bentoBookingPhone}`;
    }
    const targetPhone = "201007062123";
    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;
    try {
      const existingStr = localStorage.getItem("elkholy_bookings");
      const existing = existingStr ? JSON.parse(existingStr) : [];
      const newBooking = {
        id: `book-${Date.now()}`,
        motorcycleId: flagshipBike.id,
        motorcycleName: flagshipBike.name,
        category: flagshipBike.category,
        price: flagshipBike.price,
        name: bentoBookingName,
        phone: bentoBookingPhone,
        email: "N/A (Quick Booking)",
        date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        status: "sold"
      };
      existing.unshift(newBooking);
      localStorage.setItem("elkholy_bookings", JSON.stringify(existing));
    } catch (err) {
      console.error("Error saving quick booking:", err);
    }
    setBentoBookingName("");
    setBentoBookingPhone("");
    window.open(waUrl, "_blank");
  };
  useEffect(() => {
    async function loadData() {
      try {
        const configDocRef = doc(db, "homepageConfig", "main");
        const configSnap = await getDoc(configDocRef);
        if (configSnap.exists()) {
          const cloudConfig = configSnap.data();
          setHomepageConfig(cloudConfig);
          localStorage.setItem("elkholy_homepage_config", JSON.stringify(cloudConfig));
        } else {
          await setDoc(configDocRef, DEFAULT_HOMEPAGE_CONFIG);
        }
      } catch (err) {
        console.warn("Unable to fetch homepageConfig from Firestore, falling back to local:", err);
      }
      try {
        const querySnapshot = await getDocs(collection(db, "motorcycles"));
        if (!querySnapshot.empty) {
          const list = [];
          querySnapshot.forEach((doc2) => {
            list.push(doc2.data());
          });
          const categoriesToCheck = ["A", "B", "C", "S"];
          let needsSelfHeal = false;
          for (const cat of categoriesToCheck) {
            const count = list.filter((b) => b.category === cat).length;
            if (count < 5) {
              needsSelfHeal = true;
              break;
            }
          }
          if (needsSelfHeal) {
            console.log("Self-healing triggered: Seeding default models into Firestore...");
            const mergedList = [...list];
            for (const defaultBike of MOTORCYCLES_DATA) {
              if (!mergedList.some((b) => b.id === defaultBike.id)) {
                mergedList.push(defaultBike);
                try {
                  await setDoc(doc(db, "motorcycles", defaultBike.id), defaultBike);
                } catch (writeErr) {
                  console.warn(`Could not seed missing bike ${defaultBike.id} to Firestore (expected if not logged in):`, writeErr);
                }
              }
            }
            setMotorcyclesData(mergedList);
            localStorage.setItem("elkholy_motorcycles", JSON.stringify(mergedList));
          } else {
            setMotorcyclesData(list);
            localStorage.setItem("elkholy_motorcycles", JSON.stringify(list));
          }
        } else {
          console.log("Firestore empty: Seeding initial categories into remote...");
          for (const bike of MOTORCYCLES_DATA) {
            try {
              await setDoc(doc(db, "motorcycles", bike.id), bike);
            } catch (writeErr) {
              console.warn(`Could not seed bike ${bike.id} to Firestore (expected if not logged in):`, writeErr);
            }
          }
          setMotorcyclesData(MOTORCYCLES_DATA);
          localStorage.setItem("elkholy_motorcycles", JSON.stringify(MOTORCYCLES_DATA));
        }
      } catch (err) {
        console.warn("Unable to fetch motorcycles from Firestore, falling back to local:", err);
        setMotorcyclesData(MOTORCYCLES_DATA);
        localStorage.setItem("elkholy_motorcycles", JSON.stringify(MOTORCYCLES_DATA));
      }
      try {
        const querySnapshot = await getDocs(collection(db, "store_products"));
        if (!querySnapshot.empty && querySnapshot.size >= 50) {
          const list = [];
          querySnapshot.forEach((doc2) => {
            list.push(doc2.data());
          });
          setStoreProductsData(list);
          localStorage.setItem("elkholy_store_products", JSON.stringify(list));
        } else {
          console.log("Seeding 50 premium store products in batch...");
          try {
            const batch = writeBatch(db);
            for (const p of MOCK_STORE_PRODUCTS) {
              batch.set(doc(db, "store_products", p.id), p);
            }
            await batch.commit();
          } catch (writeErr) {
            console.warn("Could not write initial store seed to Firestore (fallback to local state):", writeErr);
          }
          setStoreProductsData(MOCK_STORE_PRODUCTS);
          localStorage.setItem("elkholy_store_products", JSON.stringify(MOCK_STORE_PRODUCTS));
        }
      } catch (err) {
        console.warn("Unable to fetch store products from Firestore, falling back to local:", err);
        const local = localStorage.getItem("elkholy_store_products");
        if (local && JSON.parse(local).length > 0) {
          setStoreProductsData(JSON.parse(local));
        } else {
          setStoreProductsData(MOCK_STORE_PRODUCTS);
          localStorage.setItem("elkholy_store_products", JSON.stringify(MOCK_STORE_PRODUCTS));
        }
      }
    }
    loadData();
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prodId = params.get("product");
    if (prodId) {
      setActiveView("store");
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("elkholy_favorites", JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    localStorage.setItem("elkholy_cart", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    const fontQueriesMap = {
      "Inter": "family=Inter:wght@300;400;500;600;700&display=swap",
      "Poppins": "family=Poppins:wght@300;400;500;600;700&display=swap",
      "Montserrat": "family=Montserrat:wght@300;400;500;600;700&display=swap",
      "Roboto": "family=Roboto:wght@300;400;500;700&display=swap",
      "Cairo": "family=Cairo:wght@300;400;500;600;700;800;900&display=swap",
      "Tajawal": "family=Tajawal:wght@300;400;500;700&display=swap",
      "IBM Plex Sans": "family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap",
      "Open Sans": "family=Open+Sans:wght@300;400;500;600;700&display=swap",
      "Lato": "family=Lato:wght@300;400;700&display=swap",
      "Nunito": "family=Nunito:wght@300;400;600;700&display=swap",
      "Space Grotesk": "family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
      // Arabic companion fonts
      "IBM Plex Sans Arabic": "family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap",
      "Rubik": "family=Rubik:wght@300;400;500;600;700;800;900&display=swap",
      "Almarai": "family=Almarai:wght@300;400;700;800&display=swap",
      "Vazirmatn": "family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
    };
    const fontToCssMap = {
      "Inter": "'Inter', 'Vazirmatn', sans-serif",
      "Poppins": "'Poppins', 'Rubik', sans-serif",
      "Montserrat": "'Montserrat', 'Almarai', sans-serif",
      "Roboto": "'Roboto', 'Vazirmatn', sans-serif",
      "Cairo": "'Cairo', sans-serif",
      "Tajawal": "'Tajawal', sans-serif",
      "IBM Plex Sans": "'IBM Plex Sans Arabic', 'IBM Plex Sans', sans-serif",
      "Open Sans": "'Open Sans', 'Vazirmatn', sans-serif",
      "Lato": "'Lato', 'Almarai', sans-serif",
      "Nunito": "'Nunito', 'Rubik', sans-serif",
      "Space Grotesk": "'Space Grotesk', 'Vazirmatn', sans-serif"
    };
    const activeFontHeadings = homepageConfig.fontHeadings || homepageConfig.font || "Space Grotesk";
    const activeFontSubheadings = homepageConfig.fontSubheadings || homepageConfig.font || "Cairo";
    const activeFontBody = homepageConfig.fontBody || homepageConfig.font || "Inter";
    const activeFontHeadingsCss = fontToCssMap[activeFontHeadings] || `"${activeFontHeadings}", sans-serif`;
    const activeFontSubheadingsCss = fontToCssMap[activeFontSubheadings] || `"${activeFontSubheadings}", sans-serif`;
    const activeFontBodyCss = fontToCssMap[activeFontBody] || `"${activeFontBody}", sans-serif`;
    const fontFamilies = Array.from(/* @__PURE__ */ new Set([
      "Inter",
      "Poppins",
      "Montserrat",
      "Roboto",
      "Cairo",
      "Tajawal",
      "IBM Plex Sans",
      "Open Sans",
      "Lato",
      "Nunito",
      "Space Grotesk",
      "IBM Plex Sans Arabic",
      "Rubik",
      "Almarai",
      "Vazirmatn",
      activeFontHeadings,
      activeFontSubheadings,
      activeFontBody
    ]));
    const cleanQueryParts = fontFamilies.map((f) => {
      const q = fontQueriesMap[f] || `family=${f.replace(/ /g, "+")}:wght@300;400;500;600;700`;
      return q.replace("&display=swap", "");
    });
    const fontsUrl = `https://fonts.googleapis.com/css2?${cleanQueryParts.join("&")}&display=swap`;
    const fontLinkId = "dynamic-google-fonts";
    let linkTag = document.getElementById(fontLinkId);
    if (!linkTag) {
      linkTag = document.createElement("link");
      linkTag.id = fontLinkId;
      linkTag.rel = "stylesheet";
      document.head.appendChild(linkTag);
    }
    if (linkTag.href !== fontsUrl) {
      linkTag.href = fontsUrl;
    }
    const styleId = "dynamic-homepage-theme";
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    const radiusMap = {
      "rounded-none": "0px",
      "rounded-md": "6px",
      "rounded-xl": "12px",
      "rounded-3xl": "24px",
      "rounded-full": "9999px"
    };
    const radValue = radiusMap[homepageConfig.theme.buttonRadius] || "12px";
    const spacingMult = homepageConfig.theme.spacingMultiplier || 1;
    styleTag.innerHTML = `

      :root {
        --color-brand-primary: ${homepageConfig.theme.primaryColor || "#6366F1"} !important;
        --color-brand-secondary: ${homepageConfig.theme.secondaryColor || "#A855F7"} !important;
        --color-brand-accent: ${homepageConfig.mainContent.iconColor || "#22D3EE"} !important;
        --color-brand-bg: ${homepageConfig.theme.backgroundColor || "#0B0F1A"} !important;
        --button-radius: ${radValue} !important;
        --spacing-scale: ${spacingMult} !important;
        
        --font-headings: ${activeFontHeadingsCss} !important;
        --font-subheadings: ${activeFontSubheadingsCss} !important;
        --font-body: ${activeFontBodyCss} !important;
        --font-sans: var(--font-body) !important;
      }
      
      /* Global fonts: default/body style with correct inheritance */
      html, body {
        font-family: var(--font-body) !important;
        --font-sans: var(--font-body) !important;
      }
      
      .font-sans, [class*="font-sans"] {
        font-family: var(--font-body) !important;
      }
      
      /* Paragraphs & descriptions always use body font */
      p, .font-body, .description, [class*="description"] {
        font-family: var(--font-body) !important;
      }
      
      /* Main headings */
      h1, h2, h3, .font-headings, [class*="font-headings"] {
        font-family: var(--font-headings) !important;
      }

      /* Secondary subheadings, small tags, buttons, badges */
      h4, h5, h6, .font-subheadings, [class*="font-subheadings"],
      button, .badge, [class*="badge"] {
        font-family: var(--font-subheadings), var(--font-body) !important;
      }

      /* Exact font-preview classes with high specificity so they can override any global custom settings */
      .admin-panel-root .font-preview-Inter, .admin-panel-root .font-preview-Inter *, .font-preview-Inter, .font-preview-Inter * { font-family: 'Inter', 'Vazirmatn', sans-serif !important; }
      .admin-panel-root .font-preview-Poppins, .admin-panel-root .font-preview-Poppins *, .font-preview-Poppins, .font-preview-Poppins * { font-family: 'Poppins', 'Rubik', sans-serif !important; }
      .admin-panel-root .font-preview-Montserrat, .admin-panel-root .font-preview-Montserrat *, .font-preview-Montserrat, .font-preview-Montserrat * { font-family: 'Montserrat', 'Almarai', sans-serif !important; }
      .admin-panel-root .font-preview-Roboto, .admin-panel-root .font-preview-Roboto *, .font-preview-Roboto, .font-preview-Roboto * { font-family: 'Roboto', 'Vazirmatn', sans-serif !important; }
      .admin-panel-root .font-preview-Cairo, .admin-panel-root .font-preview-Cairo *, .font-preview-Cairo, .font-preview-Cairo * { font-family: 'Cairo', sans-serif !important; }
      .admin-panel-root .font-preview-Tajawal, .admin-panel-root .font-preview-Tajawal *, .font-preview-Tajawal, .font-preview-Tajawal * { font-family: 'Tajawal', sans-serif !important; }
      .admin-panel-root .font-preview-IBMPlexSans, .admin-panel-root .font-preview-IBMPlexSans *, .font-preview-IBMPlexSans, .font-preview-IBMPlexSans * { font-family: 'IBM Plex Sans Arabic', 'IBM Plex Sans', sans-serif !important; }
      .admin-panel-root .font-preview-OpenSans, .admin-panel-root .font-preview-OpenSans *, .font-preview-OpenSans, .font-preview-OpenSans * { font-family: 'Open Sans', 'Vazirmatn', sans-serif !important; }
      .admin-panel-root .font-preview-Lato, .admin-panel-root .font-preview-Lato *, .font-preview-Lato, .font-preview-Lato * { font-family: 'Lato', 'Almarai', sans-serif !important; }
      .admin-panel-root .font-preview-Nunito, .admin-panel-root .font-preview-Nunito *, .font-preview-Nunito, .font-preview-Nunito * { font-family: 'Nunito', 'Rubik', sans-serif !important; }
      .admin-panel-root .font-preview-SpaceGrotesk, .admin-panel-root .font-preview-SpaceGrotesk *, .font-preview-SpaceGrotesk, .font-preview-SpaceGrotesk * { font-family: 'Space Grotesk', 'Vazirmatn', sans-serif !important; }

      /* PRESERVE fonts and inline designs inside admin/management overlays without overriding preview classes */
      .admin-panel-root {
        font-family: "Space Grotesk", "Inter", sans-serif;
      }

      .admin-panel-root .font-mono,
      .admin-panel-root [class*="font-mono"],
      .admin-panel-root pre,
      .admin-panel-root code,
      .admin-panel-root .font-mono * {
        font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace !important;
      }

      /* Keep monospace elements */
      .font-mono, [class*="font-mono"], pre, code, .font-mono * {
        font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace !important;
      }
      
      body {
        background-color: ${homepageConfig.theme.backgroundColor || "#0B0F1A"} !important;
      }
      
      button, .rounded-xl, .rounded-2xl, .rounded-3xl, .glass-panel {
        border-radius: var(--button-radius) !important;
      }
    `;
  }, [homepageConfig]);
  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  const handleToggleFavorite = (id, e) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  const handleClearFavorites = () => {
    setFavorites([]);
  };
  const handleAddToCart = (product, type = "product") => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.id, product, type, quantity: 1 }];
    });
    setIsCartOpen(true);
  };
  const handleUpdateCartQuantity = (id, delta) => {
    setCartItems((prev) => prev.map((item) => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };
  const handleRemoveCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const handleClearCart = () => {
    setCartItems([]);
  };
  const handleCheckoutCart = async () => {
    if (cartItems.length === 0) return;
    let orderText = lang === "ar" ? "مرحباً، أريد طلب:\n\n" : "Hello, I would like to order:\n\n";
    let total = 0;
    const names = [];
    const ids = [];
    cartItems.forEach((item) => {
      const name = lang === "ar" ? item.product.nameAr || item.product.name : item.product.name;
      const price = item.product.price || item.product.priceNum || 0;
      orderText += `- ${name} (x${item.quantity}) = ${(price * item.quantity).toLocaleString()} ${lang === "ar" ? "ج.م" : "EGP"}
`;
      total += price * item.quantity;
      names.push(`${name} (x${item.quantity})`);
      ids.push(item.product.id || "PRODUCT");
    });
    orderText += `
${lang === "ar" ? "الإجمالي:" : "Total:"} ${total.toLocaleString()} ${lang === "ar" ? "ج.م" : "EGP"}
`;
    const orderId = `STORE-ORDER-${Date.now()}`;
    const timestampStr = (/* @__PURE__ */ new Date()).toISOString();
    const dateStr = timestampStr.split("T")[0];
    const targetPhone = homepageConfig.invoiceWhatsappNumber || "201211116631";
    try {
      await setDoc(doc(db, "bookings", orderId), {
        customerName: lang === "ar" ? "طلب متجر (واتساب)" : "Store Order (WA)",
        customerPhone: targetPhone,
        customerEmail: "customer@elkholy.com",
        motorcycleId: ids.join(", "),
        motorcycleName: names.join(", "),
        totalPrice: total,
        timestamp: timestampStr,
        date: dateStr,
        status: "sold"
      });
    } catch (err) {
      console.warn("Firestore save of store order failed, falling back gracefully:", err);
    }
    try {
      const existingStr = localStorage.getItem("elkholy_bookings");
      const existing = existingStr ? JSON.parse(existingStr) : [];
      const newBookingObj = {
        id: orderId,
        motorcycleId: ids.join(", "),
        motorcycleName: names.join(", "),
        category: "A",
        price: `${total.toLocaleString()} EGP`,
        name: lang === "ar" ? "طلب متجر (واتساب)" : "Store Order (WA)",
        phone: targetPhone,
        email: "customer@elkholy.com",
        date: dateStr,
        timestamp: timestampStr,
        status: "sold"
      };
      existing.unshift(newBookingObj);
      localStorage.setItem("elkholy_bookings", JSON.stringify(existing));
    } catch (err) {
      console.error("Error persisting booking locally:", err);
    }
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(orderText)}`;
    window.open(waUrl, "_blank");
  };
  const favoriteBikes = useMemo(() => {
    return motorcyclesData.filter((bike) => favorites.includes(bike.id));
  }, [favorites, motorcyclesData]);
  const favoriteProducts = useMemo(() => {
    return storeProductsData.filter((p) => favorites.includes(p.id));
  }, [favorites, storeProductsData]);
  const handleOpenBooking = (id, name, cat, price, e, selectedAddOnIds) => {
    if (e) e.stopPropagation();
    const bike = motorcyclesData.find((b) => b.id === id);
    setActiveBookItem({
      motorcycleId: id,
      motorcycleName: name,
      category: cat,
      price,
      serialCode: bike?.serialCode,
      preSelectedAddOnIds: selectedAddOnIds
    });
  };
  const handleOpenPdf = (bike, e) => {
    e.stopPropagation();
    setActivePdfItem(bike);
  };
  const isFilterActive = useMemo(() => {
    return filters.searchQuery.trim() !== "" || filters.category !== "ALL" || filters.priceRange < 5e6 || speedRange > 100 || filters.onlyPopular || filters.sortBy !== "default";
  }, [filters, speedRange]);
  const filteredBikes = useMemo(() => {
    let result = [...motorcyclesData];
    if (filters.searchQuery.trim() !== "") {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (bike) => bike.name.toLowerCase().includes(query) || bike.tagline.toLowerCase().includes(query) || bike.shortDesc.toLowerCase().includes(query) || bike.specs.engine.toLowerCase().includes(query)
      );
    }
    if (filters.category !== "ALL") {
      result = result.filter((bike) => bike.category === filters.category);
    }
    result = result.filter((bike) => bike.priceNum <= filters.priceRange);
    result = result.filter((bike) => {
      const speedVal = parseInt(bike.specs.topSpeed, 10);
      return speedVal >= speedRange;
    });
    if (filters.onlyPopular) {
      result = result.filter((bike) => bike.isPopular);
    }
    if (filters.sortBy === "price-asc") {
      result.sort((a, b) => a.priceNum - b.priceNum);
    } else if (filters.sortBy === "price-desc") {
      result.sort((a, b) => b.priceNum - a.priceNum);
    } else if (filters.sortBy === "speed-desc") {
      result.sort((a, b) => parseInt(b.specs.topSpeed, 10) - parseInt(a.specs.topSpeed, 10));
    }
    return result;
  }, [filters, speedRange, motorcyclesData]);
  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      category: "ALL",
      priceRange: 5e6,
      sortBy: "default",
      onlyPopular: false
    });
    setSpeedRange(100);
  };
  const customSectionMeta = useMemo(() => {
    const mapAr = {
      A: { title: "موتوسيكلات سبورت فئة (A)", desc: "وحوش رياضية هجينة مصممة للتسارع الاستثنائي والتحكم المتفوق على حلبات السباق." },
      B: { title: "موتوسيكلات كروزر فئة (B)", desc: "ملوك الطريق والترحال الطويل مع مقاعد وثيرة ورفاهية كروزر معززة هيدروليكياً." },
      C: { title: "دراجات تورينج والرحلات فئة (C)", desc: "دراجات مخصصة للطرق والرحلات الطويلة قادرة على عبور المسافات والدروب بأمان متين." },
      S: { title: "اسكوترات ذكية فئة (S)", desc: "أسطورة الترحال الحضري والاسكوترات الكهربائية الخفيفة والسريعة للمدن الحديثة دون انبعاثات." }
    };
    const mapEn = {
      A: { title: "SPORT SEC-A FLEET", desc: "Aerodynamic track predators built for extreme velocity and instant power response." },
      B: { title: "CRUISER SEC-B FLEET", desc: "Sovereigns of the open road, featuring ultra-comfortable seating and magnetic suspension." },
      C: { title: "TOURING SEC-C FLEET", desc: "Heavy-duty performance touring tourers engineered to bypass extreme distances and road terrains." },
      S: { title: "SCOOTER SEC-S FLEET", desc: "Fidelity lightweight electric vehicles designed for seamless, carbon-neutral city commuting." }
    };
    return lang === "ar" ? mapAr : mapEn;
  }, [lang]);
  return /* @__PURE__ */ jsxDEV("div", { className: "relative min-h-screen bg-[#0B0F1A] text-gray-200 overflow-x-hidden selection:bg-brand-accent selection:text-[#0B0F1A] text-left", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-primary/40 via-brand-accent/50 to-brand-secondary/40 z-50 pointer-events-none" }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 813,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      Navbar,
      {
        favoriteCount: favorites.length,
        cartItemCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        cartTotal: cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
        activeView,
        onNavigate: (view) => {
          setActiveView(view);
          if (view === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        },
        onOpenCart: () => setIsCartOpen(true),
        onOpenFavorites: () => setFavoritesOpen(true),
        onScrollToSection: handleScrollToSection,
        onOpenBooking: (id, name, cat, price) => handleOpenBooking(id, name, cat, price),
        onOpenAdmin: () => setAdminOpen(true),
        homepageConfig
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 816,
        columnNumber: 7
      },
      this
    ),
    activeView === "home" && /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV(
        "section",
        {
          id: "home",
          className: "relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-cover bg-center",
          style: { backgroundImage: `linear-gradient(to bottom, rgba(11, 15, 26, 0.7), rgba(11, 15, 26, 0.95)), url(${homepageConfig.header.backgroundImage || HERO_BG_IMAGE})` },
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1/4 left-1/12 w-[350px] h-[350px] rounded-full bg-brand-primary/10 blur-[130px] pointer-events-none animate-pulse-slow font-sans" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 844,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-1/4 right-1/12 w-[300px] h-[300px] rounded-full bg-brand-accent/15 blur-[120px] pointer-events-none animate-pulse-slow", style: { animationDelay: "2s" } }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 845,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center", dir, children: [
              /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-12 xl:col-span-7 space-y-6 text-left", dir, children: [
                homepageConfig.header.logoUrl && /* @__PURE__ */ jsxDEV("div", { className: "mb-4 block", children: /* @__PURE__ */ jsxDEV(
                  "img",
                  {
                    src: homepageConfig.header.logoUrl,
                    alt: "Brand Logo",
                    className: `
                    ${homepageConfig.header.logoSize === "small" ? "h-10" : homepageConfig.header.logoSize === "large" ? "h-20" : "h-14"}
                    ${homepageConfig.header.logoEffect === "glow" ? "shadow-[0_0_20px_rgba(34,211,238,0.6)] border border-[#22D3EE]/30 bg-[#22D3EE]/5 px-4 py-2 rounded-2xl" : ""}
                    ${homepageConfig.header.logoEffect === "neon" ? "shadow-[0_0_25px_rgba(168,85,247,0.73)] border border-[#A855F7]/40 bg-[#A855F7]/10 px-4 py-2 rounded-2xl" : ""}
                    ${homepageConfig.header.logoEffect === "shadow" ? "shadow-2xl shadow-black bg-black/60 px-4 py-2 rounded-2xl border border-white/5" : "px-2 py-1"}
                    object-contain max-w-[280px] transition-all duration-300 hover:scale-105
                  `,
                    referrerPolicy: "no-referrer"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 854,
                    columnNumber: 17
                  },
                  this
                ) }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 853,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "h-2 w-2 rounded-full bg-[#22D3EE] animate-ping" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 870,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono tracking-widest text-[#22D3EE] font-extrabold uppercase", children: customBadgeText }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 871,
                    columnNumber: 15
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 869,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV("h1", { className: "text-4xl sm:text-6xl font-black font-sans tracking-tight text-white uppercase leading-none", children: [
                  customTitleText,
                  " ",
                  /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 877,
                    columnNumber: 33
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent glow-cyan", children: customTitleAccent }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 878,
                    columnNumber: 15
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 876,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-lg font-mono text-brand-accent tracking-widest font-semibold italic", children: [
                  '"',
                  customHeroSlogan,
                  '"'
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 883,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "max-w-xl text-base text-gray-400 font-sans leading-relaxed", children: customHeroDesc }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 887,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-4 pt-2", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleScrollToSection("gallery"),
                      className: "px-8 py-3.5 rounded-xl font-mono text-xs tracking-widest font-bold text-[#0B0F1A] bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent hover:brightness-115 active:scale-95 transition-all text-center cursor-pointer shadow-lg shadow-brand-primary/20 hover:shadow-brand-accent/30 uppercase",
                      children: t("explore_vehicles")
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 893,
                      columnNumber: 15
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleOpenBooking("sport-cybersport-v4", "ElKholy CyberSport V4", "A", "$42,500"),
                      className: "px-8 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 hover:text-white hover:border-brand-accent font-mono text-xs tracking-widest font-bold transition-all hover:bg-white/[0.05]",
                      children: t("quick_book")
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 900,
                      columnNumber: 15
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 892,
                  columnNumber: 13
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 850,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-12 xl:col-span-5", dir: "ltr", children: /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.3 },
                  className: "glass-panel border border-[#6366F1]/20 rounded-3xl p-6 sm:p-8 space-y-6 relative box-glow-indigo overflow-hidden text-left",
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-12 -right-12 w-24 h-24 bg-brand-accent/10 rounded-full blur-xl" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 919,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/[0.08] pb-3", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-gray-400 font-bold tracking-widest flex items-center gap-1.5 uppercase", children: [
                        /* @__PURE__ */ jsxDEV(Target, { className: "w-4 h-4 text-brand-accent animate-spin-slow" }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 923,
                          columnNumber: 19
                        }, this),
                        " ",
                        t("performance_title")
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 922,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 bg-black/50 text-[9px] font-mono rounded border border-white/5 text-gray-500 font-extrabold uppercase", children: t("real_time_sys") }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 925,
                        columnNumber: 17
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 921,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 font-mono", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center bg-black/30 p-3 rounded-2xl border border-white/[0.03]", children: [
                        /* @__PURE__ */ jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono tracking-widest block uppercase", children: t("max_horsepower") }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 935,
                            columnNumber: 21
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-bold font-mono text-white tracking-widest", children: "240 HP / 310 Nm" }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 936,
                            columnNumber: 21
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 934,
                          columnNumber: 19
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-brand-accent font-black tracking-widest animate-pulse px-2 py-1 bg-brand-accent/10 rounded", children: "MAX" }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 938,
                          columnNumber: 19
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 933,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center bg-black/30 p-3 rounded-2xl border border-white/[0.03]", children: [
                        /* @__PURE__ */ jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono tracking-widest block uppercase", children: t("carbon_emissions") }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 943,
                            columnNumber: 21
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-bold font-mono text-white tracking-widest uppercase", children: t("carbon_emissions_val") }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 944,
                            columnNumber: 21
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 942,
                          columnNumber: 19
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-green-400 font-black tracking-widest px-2 py-1 bg-green-500/10 rounded", children: "100% ECO" }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 946,
                          columnNumber: 19
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 941,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center bg-black/30 p-3 rounded-2xl border border-white/[0.03]", children: [
                        /* @__PURE__ */ jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono tracking-widest block uppercase", children: t("top_speed_cap") }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 951,
                            columnNumber: 21
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-bold font-mono text-white tracking-widest", children: t("top_speed_val") }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 952,
                            columnNumber: 21
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 950,
                          columnNumber: 19
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-brand-secondary font-black tracking-widest px-2 py-1 bg-brand-secondary/10 rounded", children: "HYPER" }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 954,
                          columnNumber: 19
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 949,
                        columnNumber: 17
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 931,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] font-mono text-gray-500 text-center flex items-center justify-center gap-1.5 pt-2 border-t border-white/[0.05]", children: [
                      /* @__PURE__ */ jsxDEV(Shield, { className: "w-3.5 h-3.5 text-brand-accent shrink-0" }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 960,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "font-bold uppercase", children: t("warranty_info") }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 961,
                        columnNumber: 17
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 959,
                      columnNumber: 15
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 912,
                  columnNumber: 13
                },
                this
              ) }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 911,
                columnNumber: 11
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 847,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[10px] font-mono text-gray-500 animate-bounce pointer-events-none uppercase", children: [
              /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "انزل لأسفل لعرض صالة الألعاب" : "SCROLL FOR SHOWROOM" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 971,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDEV(ArrowDown, { className: "w-4 h-4 text-brand-accent" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 972,
                columnNumber: 11
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 970,
              columnNumber: 9
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 838,
          columnNumber: 9
        },
        this
      ),
      homepageConfig.header.customHtml && /* @__PURE__ */ jsxDEV(
        "section",
        {
          className: "py-12 border-y border-white/[0.04] bg-white/[0.01] relative z-20",
          dangerouslySetInnerHTML: { __html: homepageConfig.header.customHtml }
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 978,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("section", { id: "categories", className: "py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", dir, children: [
        /* @__PURE__ */ jsxDEV("div", { className: "mb-12", children: /* @__PURE__ */ jsxDEV(
          FilterSection,
          {
            filters,
            onFilterChange: setFilters,
            speedRange,
            onSpeedRangeChange: setSpeedRange
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 989,
            columnNumber: 11
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 988,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 relative z-10", dir, children: [
          /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden group text-left", dir, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-16 h-16 bg-gradient-to-tr from-brand-secondary/5 to-transparent blur-xl pointer-events-none" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1002,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-[10px] uppercase tracking-[0.3em] text-brand-secondary font-bold mb-4 font-mono", children: lang === "ar" ? "توصيف الفئات الحالية" : "Select Category" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1004,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
                { code: "ALL", label: t("cat_ALL"), desc: lang === "ar" ? "عرض الـ 16 طراز بالكامل" : "Show all cyber models" },
                { code: "A", label: t("cat_A"), desc: lang === "ar" ? "الرياضية الاستثنائية الحرة" : "Aerodynamic Predators" },
                { code: "B", label: t("cat_B"), desc: lang === "ar" ? "رحلات ملوك الطريق السريع" : "Sovereigns of Highway" },
                { code: "C", label: t("cat_C"), desc: lang === "ar" ? "مغامرات تخترق الآفاق الرملية" : "Uncharted Horizons" },
                { code: "S", label: t("cat_S"), desc: lang === "ar" ? "اسكوتر المدن الذكية الموفر" : "Neo-Urban Mobility" }
              ].map((cat) => {
                const isActive = filters.category === cat.code;
                return /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    onClick: () => setFilters({ ...filters, category: cat.code }),
                    className: `p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-all duration-300 ${isActive ? "bg-brand-primary/20 border-brand-primary/50 text-white shadow-md" : "bg-white/[0.02] border-white/5 hover:border-brand-accent/50 text-gray-300"}`,
                    children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir, children: [
                        /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-bold font-mono tracking-wide uppercase", children: cat.label }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1025,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-500 font-sans mt-0.5", children: cat.desc }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1026,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1024,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: `text-[#22D3EE] text-sm transition-transform duration-300 ${isActive ? dir === "rtl" ? "-translate-x-1 rotate-180" : "translate-x-1" : "opacity-0"}`, children: "→" }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1028,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  cat.code,
                  true,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1015,
                    columnNumber: 21
                  },
                  this
                );
              }) }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1005,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1003,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-6 p-4 bg-gradient-to-t from-brand-accent/10 to-transparent border border-brand-accent/20 rounded-xl relative overflow-hidden text-left", dir, children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-6 -right-6 w-12 h-12 bg-brand-accent/5 rounded-full blur-md" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1037,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] uppercase font-bold text-brand-accent mb-1 tracking-widest font-mono", children: t("active_offer") }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1038,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-bold text-white uppercase tracking-wider", children: t("free_service") }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1039,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-400 font-mono mt-0.5", children: t("valid_util") }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1040,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1036,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1001,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-6 min-h-[380px] relative bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] border border-white/10 rounded-3xl overflow-hidden group flex flex-col justify-between p-6 shadow-2xl text-left", dir, children: [
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 transition-transform duration-1000 group-hover:scale-105",
                style: { backgroundImage: `url(${flagshipBike.image})` }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1047,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1052,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 flex flex-col", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { className: "px-3 py-1 bg-[#6366F1] text-[10px] font-bold tracking-widest rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)] font-mono uppercase", children: filters.category === "ALL" ? "FLAGSHIP 2026" : `POPULAR IN ${t("cat_" + filters.category)}` }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1057,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1056,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("h1", { className: "text-4xl sm:text-5xl font-black italic tracking-tighter mt-4 text-white uppercase font-sans", dir: "ltr", children: [
                flagshipBike.name.replace("ElKholy ", ""),
                " ",
                /* @__PURE__ */ jsxDEV("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary", children: "SPEC" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1062,
                  columnNumber: 61
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1061,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-gray-300 max-w-md mt-2 font-medium leading-relaxed font-sans", children: flagshipBike.shortDesc }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1064,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4 max-w-sm mt-5", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "bg-white/[0.03] border border-white/5 rounded-xl p-2.5 font-mono text-[9px] text-gray-400 text-left", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "block uppercase text-gray-500", children: t("drive_engine") }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1071,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold truncate block mt-0.5", dir: "ltr", children: [
                    flagshipBike.specs.engine.split(" ")[0],
                    " Drive"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1072,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1070,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "bg-white/[0.03] border border-white/5 rounded-xl p-2.5 font-mono text-[9px] text-gray-400 text-left", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "block uppercase text-gray-500", children: t("clock_speed") }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1075,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent font-black block mt-0.5", dir: "ltr", children: flagshipBike.specs.topSpeed }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1076,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1074,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1069,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1055,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 flex items-center justify-between mt-8 pt-4 border-t border-white/[0.08]", dir, children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir, children: [
                /* @__PURE__ */ jsxDEV("p", { className: "text-2xl font-mono font-bold text-[#22D3EE] drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]", children: formatAppPrice(flagshipBike.priceNum) }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1084,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] uppercase tracking-widest text-gray-550 font-mono font-bold mt-0.5", children: t("starting_price") }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1087,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1083,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2.5", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: (e) => handleToggleFavorite(flagshipBike.id, e),
                    className: "w-11 h-11 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/15 transition-all text-sm relative",
                    title: "Bookmark Flagship",
                    children: /* @__PURE__ */ jsxDEV("span", { className: favorites.includes(flagshipBike.id) ? "text-red-500 scale-110" : "text-gray-400", children: favorites.includes(flagshipBike.id) ? "❤️" : "🤍" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1095,
                      columnNumber: 19
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1090,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setShowFlagshipSpecs(true),
                    className: "px-6 py-2.5 bg-white text-black font-extrabold uppercase text-xs rounded-full hover:bg-brand-accent hover:text-black transition-all cursor-pointer font-mono tracking-widest shadow-md",
                    children: t("explore_specs").toUpperCase()
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1099,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1089,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1082,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV(AnimatePresence, { children: showFlagshipSpecs && /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.96 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.96 },
                className: "absolute inset-0 z-20 bg-black/95 backdrop-blur-md p-6 flex flex-col justify-between",
                dir,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/[0.08] pb-3", dir, children: [
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono font-bold tracking-widest text-brand-accent uppercase block", children: t("specifications") }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1121,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-white tracking-wide font-sans mt-0.5", dir: "ltr", children: flagshipBike.name }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1124,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1120,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: () => setShowFlagshipSpecs(false),
                        className: "p-1.5 rounded-lg border border-white/10 bg-white/5 font-mono text-[10px] text-gray-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer",
                        children: [
                          /* @__PURE__ */ jsxDEV(X, { className: "w-3.5 h-3.5" }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1132,
                            columnNumber: 23
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { children: t("flip_back") }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1133,
                            columnNumber: 23
                          }, this)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1128,
                        columnNumber: 21
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1119,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3.5 my-4 overflow-y-auto max-h-[200px] font-mono text-xs pr-1", dir, children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 border border-white/[0.04] rounded-xl bg-white/[0.01] text-left", dir, children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-gray-500 text-[9px] block uppercase font-bold tracking-wide", children: t("drive_engine") }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1140,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-white block mt-1", dir: "ltr", children: flagshipBike.specs.engine }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1143,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1139,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 border border-white/[0.04] rounded-xl bg-white/[0.01] text-left", dir, children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-gray-500 text-[9px] block uppercase font-bold tracking-wide", children: t("clock_speed") }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1149,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-brand-accent block mt-1", dir: "ltr", children: flagshipBike.specs.topSpeed }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1152,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1148,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 border border-white/[0.04] rounded-xl bg-white/[0.01] text-left", dir, children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-gray-500 text-[9px] block uppercase font-bold tracking-wide", children: t("energy_consumption") }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1158,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-white block mt-1", dir: "ltr", children: flagshipBike.specs.fuelConsumption }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1161,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1157,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 border border-white/[0.04] rounded-xl bg-white/[0.01] text-left", dir, children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-gray-500 text-[9px] block uppercase font-bold tracking-wide", children: t("output_capacity") }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1167,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-brand-secondary block mt-1", dir: "ltr", children: flagshipBike.specs.power }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1170,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1166,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "col-span-2 p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl font-sans text-xs text-gray-300 leading-relaxed text-left", dir, children: [
                      /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-white text-[9.5px] font-mono uppercase tracking-wider mb-1", dir, children: lang === "ar" ? "الوصف الكامل" : "FULL SPECIFICATION STORY" }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1177,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-gray-400", children: lang === "ar" ? flagshipBike.descAr || flagshipBike.shortDesc : flagshipBike.longDesc || flagshipBike.shortDesc }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1180,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1176,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1138,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "pt-3 border-t border-white/[0.08] flex items-center justify-between", dir, children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir, children: [
                      /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-500 font-mono tracking-widest uppercase", children: t("starting_price") }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1189,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-lg font-mono font-bold text-brand-accent mt-1", children: formatAppPrice(flagshipBike.priceNum) }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1190,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1188,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: () => {
                          setShowFlagshipSpecs(false);
                          handleOpenBooking(flagshipBike.id, flagshipBike.name, flagshipBike.category, flagshipBike.price);
                        },
                        className: "px-5 py-2 bg-gradient-to-r from-brand-primary to-brand-accent text-white font-extrabold uppercase text-[10px] rounded-full hover:brightness-110 active:scale-95 transition-all cursor-pointer font-mono tracking-widest shadow-md flex items-center gap-1.5",
                        children: [
                          /* @__PURE__ */ jsxDEV("span", { children: t("book_now") }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1201,
                            columnNumber: 23
                          }, this),
                          /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-3.5 h-3.5" }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1202,
                            columnNumber: 23
                          }, this)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1194,
                        columnNumber: 21
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1187,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1111,
                columnNumber: 17
              },
              this
            ) }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1109,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1045,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-lg flex flex-col justify-between relative overflow-hidden", dir, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1212,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir, children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-xs font-bold uppercase tracking-widest text-center mb-5 text-[#22D3EE] font-mono", children: t("digital_reservation") }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1215,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-3.5", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", dir, children: [
                  /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] uppercase text-gray-500 tracking-wider font-mono block", children: t("full_name") }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1219,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: "text",
                      placeholder: t("full_name_placeholder"),
                      value: bentoBookingName,
                      onChange: (e) => setBentoBookingName(e.target.value),
                      className: "w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#6366F1] placeholder-gray-600 transition-colors font-sans text-left",
                      dir
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1220,
                      columnNumber: 19
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1218,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", dir, children: [
                  /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] uppercase text-gray-500 tracking-wider font-mono block", children: t("contact_number") }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1230,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: "tel",
                      placeholder: t("phone_placeholder"),
                      value: bentoBookingPhone,
                      onChange: (e) => setBentoBookingPhone(e.target.value),
                      className: "w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#6366F1] placeholder-gray-600 transition-colors font-mono"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1231,
                      columnNumber: 19
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1229,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-brand-secondary/10 border border-brand-secondary/20 rounded-xl mt-3 text-left", dir, children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[10px] font-bold font-mono", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-gray-400", children: [
                      t("target_model"),
                      ":"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1242,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-brand-secondary truncate max-w-[120px] font-sans", dir: "ltr", children: flagshipBike.name.replace("ElKholy ", "") }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1243,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1241,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[10px] font-bold font-mono mt-1", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-gray-400", children: [
                      t("estimated_price"),
                      ":"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1246,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-brand-secondary", children: formatAppPrice(flagshipBike.priceNum) }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1247,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1245,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1240,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1217,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1214,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleBentoBookingSubmit,
                  className: "w-full py-3.5 bg-gradient-to-r from-[#22D3EE] to-[#6366F1] text-black font-black uppercase text-xs tracking-wider rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:brightness-110 active:scale-95 transition-all mt-5 cursor-pointer font-mono",
                  children: t("confirm_whatsapp")
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1256,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[8px] text-center text-gray-600 mt-3 uppercase tracking-widest font-mono", children: "SECURE GPRS ENCRYPTION ACTIVE v2.26" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1262,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1255,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1211,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 998,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV(AnimatePresence, { mode: "wait", children: isFilterActive ? (
          // Unified grid view for filtered outputs
          /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "space-y-8",
              dir,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center border-b border-white/[0.06] pb-3", dir, children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-xs text-brand-accent font-bold tracking-widest uppercase", children: t("matching_vehicles", { count: filteredBikes.length }) }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1281,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: handleResetFilters,
                      className: "text-xs font-mono text-gray-450 hover:text-white underline cursor-pointer",
                      children: t("clear_filters")
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1284,
                      columnNumber: 17
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1280,
                  columnNumber: 15
                }, this),
                filteredBikes.length > 0 ? /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8", children: filteredBikes.map((bike) => /* @__PURE__ */ jsxDEV(
                  MotorcycleCard,
                  {
                    bike,
                    isFavorite: favorites.includes(bike.id),
                    onToggleFavorite: handleToggleFavorite,
                    onOpenPdf: handleOpenPdf,
                    onOpenBooking: handleOpenBooking
                  },
                  bike.id,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1295,
                    columnNumber: 21
                  },
                  this
                )) }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1293,
                  columnNumber: 17
                }, this) : (
                  // Clean empty diagnostics screen
                  /* @__PURE__ */ jsxDEV("div", { className: "text-center py-20 bg-white/[0.01] border border-white/5 rounded-3xl p-6", dir, children: [
                    /* @__PURE__ */ jsxDEV(Bike, { className: "w-12 h-12 text-gray-600 mx-auto mb-4 animate-bounce" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1308,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-base font-bold text-white uppercase mb-2", children: t("empty_showroom") }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1309,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-400 max-w-sm mx-auto font-sans leading-relaxed", children: t("empty_desc") }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1312,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: handleResetFilters,
                        className: "mt-6 px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-brand-primary to-brand-accent text-white uppercase cursor-pointer",
                        children: t("reset_shield")
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1315,
                        columnNumber: 19
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1307,
                    columnNumber: 17
                  }, this)
                )
              ]
            },
            "filtered-showroom-results",
            true,
            {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1272,
              columnNumber: 13
            },
            this
          )
        ) : (
          // Default 4 sections structure (A, B, C, S) which complies exactly to user specifications
          /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "space-y-24 animate-fade-in",
              dir,
              children: ["A", "B", "C", "S"].map((catCode) => {
                const sectionMeta = customSectionMeta[catCode];
                const sectionBikes = filteredBikes.filter((bike) => bike.category === catCode);
                return /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    id: `section-${catCode}`,
                    className: "space-y-8 scroll-mt-24 text-left",
                    dir,
                    children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "relative border-b border-white/[0.06] pb-4", dir, children: [
                        /* @__PURE__ */ jsxDEV("div", { className: `absolute top-0 bottom-4 ${dir === "rtl" ? "right-0" : "left-0"} w-1 bg-gradient-to-b from-brand-accent to-brand-primary rounded-full` }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1349,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: `${dir === "rtl" ? "pr-4" : "pl-4"} flex flex-col md:flex-row md:items-end justify-between gap-4`, children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "max-w-2xl text-left", dir, children: [
                            /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl sm:text-3.5xl font-black font-sans tracking-tight text-white uppercase flex items-center gap-1.5 leading-none", children: sectionMeta.title }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1353,
                              columnNumber: 27
                            }, this),
                            /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-400 font-sans leading-relaxed mt-2 pr-4", children: sectionMeta.desc }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1356,
                              columnNumber: 27
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1352,
                            columnNumber: 25
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[10px] text-gray-500 border border-white/5 py-1 px-3 bg-[#0B0F1A] rounded-xl shrink-0 h-fit select-none", children: [
                            "FLEET MODEL: SECTION-",
                            catCode
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1362,
                            columnNumber: 25
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1351,
                          columnNumber: 23
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1347,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8", children: sectionBikes.map((bike) => /* @__PURE__ */ jsxDEV(
                        MotorcycleCard,
                        {
                          bike,
                          isFavorite: favorites.includes(bike.id),
                          onToggleFavorite: handleToggleFavorite,
                          onOpenPdf: handleOpenPdf,
                          onOpenBooking: handleOpenBooking
                        },
                        bike.id,
                        false,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1371,
                          columnNumber: 25
                        },
                        this
                      )) }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1369,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  catCode,
                  true,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1339,
                    columnNumber: 19
                  },
                  this
                );
              })
            },
            "static-sections-view",
            false,
            {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1326,
              columnNumber: 13
            },
            this
          )
        ) }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 1269,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 985,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV(ContactFooter, { onScrollToSection: handleScrollToSection, homepageConfig }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 1392,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 836,
      columnNumber: 7
    }, this),
    activeView === "store" && /* @__PURE__ */ jsxDEV(
      StoreView,
      {
        products: storeProductsData,
        homepageConfig,
        onAddToCart: handleAddToCart,
        favorites,
        onToggleFavorite: handleToggleFavorite
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 1397,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      CartDrawer,
      {
        isOpen: isCartOpen,
        onClose: () => setIsCartOpen(false),
        cartItems,
        onUpdateQuantity: handleUpdateCartQuantity,
        onRemoveItem: handleRemoveCartItem,
        onClearCart: handleClearCart,
        onCheckout: handleCheckoutCart
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 1407,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: adminOpen && /* @__PURE__ */ jsxDEV(
      AdminPanel,
      {
        onClose: () => setAdminOpen(false),
        motorcycles: motorcyclesData,
        onUpdateMotorcycles: handleUpdateMotorcycles,
        storeProducts: storeProductsData,
        onUpdateStoreProducts: async (updated) => {
          setStoreProductsData(updated);
          localStorage.setItem("elkholy_store_products", JSON.stringify(updated));
          try {
            const querySnapshot = await getDocs(collection(db, "store_products"));
            const fbIds = querySnapshot.docs.map((doc2) => doc2.id);
            const nextIds = updated.map((p) => p.id);
            const batch = writeBatch(db);
            for (const id of fbIds) {
              if (!nextIds.includes(id)) {
                batch.delete(doc(db, "store_products", id));
              }
            }
            for (const p of updated) {
              batch.set(doc(db, "store_products", p.id), p);
            }
            await batch.commit();
          } catch (e) {
            console.warn("Unable to sync store products in batch:", e);
          }
        },
        customText,
        onUpdateCustomText: (updatedText) => {
          setCustomText(updatedText);
          localStorage.setItem("elkholy_custom_text", JSON.stringify(updatedText));
        },
        homepageConfig,
        onUpdateHomepageConfig: handleUpdateHomepageConfig
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 1420,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 1418,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: activeBookItem && /* @__PURE__ */ jsxDEV(
      BookingModal,
      {
        motorcycleId: activeBookItem.motorcycleId,
        motorcycleName: activeBookItem.motorcycleName,
        category: activeBookItem.category,
        price: activeBookItem.price,
        serialCode: activeBookItem.serialCode,
        invoiceWhatsappNumber: homepageConfig.invoiceWhatsappNumber,
        preSelectedAddOnIds: activeBookItem.preSelectedAddOnIds,
        storeProducts: storeProductsData,
        onAddToCart: handleAddToCart,
        onClose: () => setActiveBookItem(null)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 1465,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 1463,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: activePdfItem && /* @__PURE__ */ jsxDEV(
      PdfModal,
      {
        bike: activePdfItem,
        onClose: () => setActivePdfItem(null)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 1483,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 1481,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: favoritesOpen && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 overflow-hidden pointer-events-auto", children: [
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          onClick: () => setFavoritesOpen(false),
          className: "absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 1495,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: `absolute inset-y-0 ${dir === "rtl" ? "left-0" : "right-0"} max-w-full flex`, children: /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { x: dir === "rtl" ? "-100%" : "100%" },
          animate: { x: 0 },
          exit: { x: dir === "rtl" ? "-100%" : "100%" },
          transition: { type: "spring", stiffness: 300, damping: 30 },
          className: "w-screen max-w-md bg-[#0F172A]/95 border-l border-white/[0.08] backdrop-blur-xl relative flex flex-col justify-between",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-b border-white/[0.08] flex items-center justify-between", dir, children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxDEV(Heart, { className: "w-5 h-5 text-red-500 fill-red-500 animate-pulse" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1512,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir, children: [
                  /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold font-mono tracking-widest text-white uppercase", children: t("garage") }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1514,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-500 font-mono uppercase", children: lang === "ar" ? `المحركات والمستلزمات (${favoriteBikes.length + favoriteProducts.length})` : `Bookmarked Items (${favoriteBikes.length + favoriteProducts.length})` }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1515,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1513,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1511,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setFavoritesOpen(false),
                  className: "p-1.5 rounded-lg bg-white/[0.03] text-gray-400 hover:text-white",
                  children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1524,
                    columnNumber: 21
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1520,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1510,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-6 space-y-4", dir, children: favoriteBikes.length > 0 || favoriteProducts.length > 0 ? /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
              favoriteBikes.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono uppercase font-black text-brand-accent tracking-widest block border-b border-white/5 pb-1", children: lang === "ar" ? "الدرجات النارية" : "Motorcycles" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1535,
                  columnNumber: 27
                }, this),
                favoriteBikes.map((bike) => /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    className: "flex items-center gap-4 bg-black/40 border border-white/5 rounded-2xl p-3 hover:border-brand-accent/25 transition-all group",
                    dir,
                    children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "w-20 h-16 bg-[#111827] border border-white/10 rounded-xl overflow-hidden flex items-center justify-center p-1 relative shrink-0", children: /* @__PURE__ */ jsxDEV(
                        "img",
                        {
                          src: bike.image,
                          alt: bike.name,
                          referrerPolicy: "no-referrer",
                          className: "w-full h-full object-contain"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1545,
                          columnNumber: 33
                        },
                        this
                      ) }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1544,
                        columnNumber: 31
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0 text-left", dir, children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono font-bold tracking-wider text-brand-accent block", children: [
                          "SECTION-",
                          bike.category
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1554,
                          columnNumber: 33
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-bold text-white truncate block font-sans", dir: "ltr", children: bike.name }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1557,
                          columnNumber: 33
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-gray-400 font-bold", children: formatAppPrice(bike.priceNum) }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1560,
                          columnNumber: 33
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1553,
                        columnNumber: 31
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1 shrink-0", children: [
                        /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            onClick: () => {
                              setFavoritesOpen(false);
                              handleOpenBooking(bike.id, bike.name, bike.category, bike.price);
                            },
                            className: "p-1.5 bg-brand-primary hover:bg-brand-accent text-[#0B0F1A] rounded-lg transition-colors cursor-pointer",
                            title: "Quick Book Catalog",
                            children: /* @__PURE__ */ jsxDEV(MessageCircle, { className: "w-3.5 h-3.5 shrink-0" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1575,
                              columnNumber: 35
                            }, this)
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1567,
                            columnNumber: 33
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            onClick: (e) => handleToggleFavorite(bike.id, e),
                            className: "p-1.5 bg-white/5 hover:bg-red-500/15 text-gray-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer",
                            title: "Remove",
                            children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5 shrink-0" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1582,
                              columnNumber: 35
                            }, this)
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1577,
                            columnNumber: 33
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1566,
                        columnNumber: 31
                      }, this)
                    ]
                  },
                  bike.id,
                  true,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1539,
                    columnNumber: 29
                  },
                  this
                ))
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1534,
                columnNumber: 25
              }, this),
              favoriteProducts.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono uppercase font-black text-brand-primary tracking-widest block border-b border-white/5 pb-1", children: lang === "ar" ? "المستلزمات وقطع الغيار" : "Store Products" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1593,
                  columnNumber: 27
                }, this),
                favoriteProducts.map((product) => /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    className: "flex items-center gap-4 bg-black/40 border border-white/5 rounded-2xl p-3 hover:border-brand-primary/25 transition-all group",
                    dir,
                    children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "w-20 h-16 bg-[#111827] border border-white/10 rounded-xl overflow-hidden flex items-center justify-center p-1 relative shrink-0", children: /* @__PURE__ */ jsxDEV(
                        "img",
                        {
                          src: product.image,
                          alt: lang === "ar" ? product.nameAr : product.name,
                          referrerPolicy: "no-referrer",
                          className: "w-full h-full object-contain"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1603,
                          columnNumber: 33
                        },
                        this
                      ) }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1602,
                        columnNumber: 31
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0 text-left", dir, children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono font-bold tracking-wider text-brand-primary block", children: product.brand || "Store Product" }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1612,
                          columnNumber: 33
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-bold text-white truncate block font-sans", dir: lang === "ar" ? "rtl" : "ltr", children: lang === "ar" ? product.nameAr : product.name }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1615,
                          columnNumber: 33
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-gray-400 font-bold", children: [
                          product.price.toLocaleString(),
                          " ",
                          lang === "ar" ? "ج.م" : "EGP"
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1618,
                          columnNumber: 33
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1611,
                        columnNumber: 31
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1 shrink-0", children: [
                        /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            onClick: () => {
                              setFavoritesOpen(false);
                              handleAddToCart(product);
                            },
                            className: "p-1.5 bg-brand-primary hover:bg-brand-accent text-[#0B0F1A] rounded-lg transition-colors cursor-pointer",
                            title: "Add to Cart",
                            children: /* @__PURE__ */ jsxDEV(ShoppingCart, { className: "w-3.5 h-3.5 shrink-0" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1633,
                              columnNumber: 35
                            }, this)
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1625,
                            columnNumber: 33
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            onClick: (e) => handleToggleFavorite(product.id, e),
                            className: "p-1.5 bg-white/5 hover:bg-red-500/15 text-gray-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer",
                            title: "Remove",
                            children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5 shrink-0" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1640,
                              columnNumber: 35
                            }, this)
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1635,
                            columnNumber: 33
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1624,
                        columnNumber: 31
                      }, this)
                    ]
                  },
                  product.id,
                  true,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1597,
                    columnNumber: 29
                  },
                  this
                ))
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1592,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1531,
              columnNumber: 21
            }, this) : (
              // Empty showcase
              /* @__PURE__ */ jsxDEV("div", { className: "text-center py-24 text-gray-500 space-y-3 font-mono", children: [
                /* @__PURE__ */ jsxDEV(Bike, { className: "w-12 h-12 text-gray-700 mx-auto animate-pulse" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1651,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs uppercase text-gray-400 font-extrabold tracking-widest", children: lang === "ar" ? "الجراج الإلكتروني للتسوق فارغ" : "Garage is Vacant" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1652,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-gray-500 max-w-xs mx-auto leading-relaxed font-sans normal-case text-center", children: lang === "ar" ? "راجع الأطقم المتوفرة في المعرض أو المنتجات في المتجر واضغط على زر القلب لحفظها هنا." : "Review the models & click the ❤️ icon on cards to save them here for fast comparisons and booking actions." }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1655,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1650,
                columnNumber: 21
              }, this)
            ) }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1529,
              columnNumber: 17
            }, this),
            (favoriteBikes.length > 0 || favoriteProducts.length > 0) && /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-t border-white/[0.08] bg-[#070A11]/60 space-y-3", dir, children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleClearFavorites,
                  className: "w-full py-2.5 rounded-xl border border-red-500/20 hover:bg-red-500/10 text-red-400 text-xs font-mono font-bold tracking-widest transition-colors cursor-pointer",
                  children: [
                    t("vacate_garage").toUpperCase(),
                    " (🗑)"
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1668,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    setFavoritesOpen(false);
                    handleScrollToSection("categories");
                  },
                  className: "w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent text-[#0B0F1A] text-xs font-mono font-bold tracking-widest transition-all text-center cursor-pointer hover:brightness-110 active:scale-95",
                  children: t("return_showroom").toUpperCase()
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1674,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1667,
              columnNumber: 19
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 1501,
          columnNumber: 15
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 1500,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 1493,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 1491,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/App.tsx",
    lineNumber: 810,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlTWVtbyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG1vdGlvbiwgQW5pbWF0ZVByZXNlbmNlIH0gZnJvbSAnbW90aW9uL3JlYWN0JztcbmltcG9ydCB7IFxuICBCaWtlLCBIZWFydCwgVHJhc2gyLCBBcnJvd0Rvd24sIFNwYXJrbGVzLCBUYXJnZXQsIFxuICBTZXR0aW5ncywgQXdhcmQsIFphcCwgU2hpZWxkLCBIZWxwQ2lyY2xlLCBYLCBDaGV2cm9uUmlnaHQsIE1lc3NhZ2VDaXJjbGUsIFNob3BwaW5nQ2FydFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5pbXBvcnQgTmF2YmFyIGZyb20gJy4vY29tcG9uZW50cy9OYXZiYXInO1xuaW1wb3J0IEZpbHRlclNlY3Rpb24gZnJvbSAnLi9jb21wb25lbnRzL0ZpbHRlclNlY3Rpb24nO1xuaW1wb3J0IE1vdG9yY3ljbGVDYXJkIGZyb20gJy4vY29tcG9uZW50cy9Nb3RvcmN5Y2xlQ2FyZCc7XG5pbXBvcnQgQm9va2luZ01vZGFsIGZyb20gJy4vY29tcG9uZW50cy9Cb29raW5nTW9kYWwnO1xuaW1wb3J0IFBkZk1vZGFsIGZyb20gJy4vY29tcG9uZW50cy9QZGZNb2RhbCc7XG5pbXBvcnQgQ29udGFjdEZvb3RlciBmcm9tICcuL2NvbXBvbmVudHMvQ29udGFjdEZvb3Rlcic7XG5pbXBvcnQgQWRtaW5QYW5lbCBmcm9tICcuL2NvbXBvbmVudHMvQWRtaW5QYW5lbCc7XG5pbXBvcnQgU3RvcmVWaWV3IGZyb20gJy4vY29tcG9uZW50cy9TdG9yZVZpZXcnO1xuaW1wb3J0IENhcnREcmF3ZXIgZnJvbSAnLi9jb21wb25lbnRzL0NhcnREcmF3ZXInO1xuXG5pbXBvcnQgeyBNb3RvcmN5Y2xlLCBDYXRlZ29yeVNsdWcsIEZpbHRlclN0YXRlLCBCb29raW5nRGF0YSwgSG9tZXBhZ2VDb25maWcgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IE1PVE9SQ1lDTEVTX0RBVEEsIEhFUk9fQkdfSU1BR0UsIERFRkFVTFRfSE9NRVBBR0VfQ09ORklHIH0gZnJvbSAnLi9kYXRhJztcbmltcG9ydCB7IE1PQ0tfU1RPUkVfUFJPRFVDVFMgfSBmcm9tICcuL2RhdGFTdG9yZU1vY2snO1xuaW1wb3J0IHsgdXNlTGFuZ3VhZ2UgfSBmcm9tICcuL2NvbnRleHQvTGFuZ3VhZ2VDb250ZXh0JztcbmltcG9ydCB7IGRiLCBoYW5kbGVGaXJlc3RvcmVFcnJvciwgT3BlcmF0aW9uVHlwZSB9IGZyb20gJy4vbGliL2ZpcmViYXNlJztcbmltcG9ydCB7IGNvbGxlY3Rpb24sIGRvYywgZ2V0RG9jcywgc2V0RG9jLCBnZXREb2MsIGRlbGV0ZURvYywgd3JpdGVCYXRjaCB9IGZyb20gJ2ZpcmViYXNlL2ZpcmVzdG9yZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCgpIHtcbiAgY29uc3QgeyBsYW5nLCBkaXIsIHQgfSA9IHVzZUxhbmd1YWdlKCk7XG5cbiAgY29uc3QgZm9ybWF0QXBwUHJpY2UgPSAobnVtOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gbGFuZyA9PT0gJ2FyJyA/IGAke251bS50b0xvY2FsZVN0cmluZygpfSDYrNmG2YrZh2AgOiBgJHtudW0udG9Mb2NhbGVTdHJpbmcoKX0gRUdQYDtcbiAgfTtcblxuICAvLyBMb2FkIHBlcnNpc3RlbmNlIGNvbmZpZ3VyYXRpb25zIGZyb20gTG9jYWxTdG9yYWdlXG4gIGNvbnN0IFttb3RvcmN5Y2xlc0RhdGEsIHNldE1vdG9yY3ljbGVzRGF0YV0gPSB1c2VTdGF0ZTxNb3RvcmN5Y2xlW10+KCgpID0+IHtcbiAgICBjb25zdCBzYXZlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbGtob2x5X21vdG9yY3ljbGVzJyk7XG4gICAgcmV0dXJuIHNhdmVkID8gSlNPTi5wYXJzZShzYXZlZCkgOiBNT1RPUkNZQ0xFU19EQVRBO1xuICB9KTtcblxuICBjb25zdCBbaG9tZXBhZ2VDb25maWcsIHNldEhvbWVwYWdlQ29uZmlnXSA9IHVzZVN0YXRlPEhvbWVwYWdlQ29uZmlnPigoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZWxraG9seV9ob21lcGFnZV9jb25maWcnKTtcbiAgICByZXR1cm4gc2F2ZWQgPyBKU09OLnBhcnNlKHNhdmVkKSA6IERFRkFVTFRfSE9NRVBBR0VfQ09ORklHO1xuICB9KTtcblxuICBjb25zdCBbY3VzdG9tVGV4dCwgc2V0Q3VzdG9tVGV4dF0gPSB1c2VTdGF0ZSgoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZWxraG9seV9jdXN0b21fdGV4dCcpO1xuICAgIHJldHVybiBzYXZlZCA/IEpTT04ucGFyc2Uoc2F2ZWQpIDogbnVsbDtcbiAgfSk7XG5cbiAgLy8gU3RvcmFnZSBmb3IgZmF2b3JpdGVzIHNhdmVkIGluIGxvY2FsIGNsaWVudCBzdGF0ZVxuICBjb25zdCBbZmF2b3JpdGVzLCBzZXRGYXZvcml0ZXNdID0gdXNlU3RhdGU8c3RyaW5nW10+KCgpID0+IHtcbiAgICBjb25zdCBzYXZlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbGtob2x5X2Zhdm9yaXRlcycpO1xuICAgIHJldHVybiBzYXZlZCA/IEpTT04ucGFyc2Uoc2F2ZWQpIDogW107XG4gIH0pO1xuXG4gIC8vIEFjdGl2ZSBWaWV3IFN0YXRlXG4gIGNvbnN0IFthY3RpdmVWaWV3LCBzZXRBY3RpdmVWaWV3XSA9IHVzZVN0YXRlPCdob21lJyB8ICdzdG9yZSc+KCdob21lJyk7XG5cbiAgLy8gU2hvcHBpbmcgQ2FydCBzdGF0ZVxuICBjb25zdCBbY2FydEl0ZW1zLCBzZXRDYXJ0SXRlbXNdID0gdXNlU3RhdGU8YW55W10+KCgpID0+IHtcbiAgICBjb25zdCBzYXZlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbGtob2x5X2NhcnQnKTtcbiAgICByZXR1cm4gc2F2ZWQgPyBKU09OLnBhcnNlKHNhdmVkKSA6IFtdO1xuICB9KTtcbiAgY29uc3QgW2lzQ2FydE9wZW4sIHNldElzQ2FydE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIFN0b3JlIFByb2R1Y3RzIHN0YXRlXG4gIGNvbnN0IFtzdG9yZVByb2R1Y3RzRGF0YSwgc2V0U3RvcmVQcm9kdWN0c0RhdGFdID0gdXNlU3RhdGU8YW55W10+KCgpID0+IHtcbiAgICBjb25zdCBzYXZlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbGtob2x5X3N0b3JlX3Byb2R1Y3RzJyk7XG4gICAgcmV0dXJuIHNhdmVkID8gSlNPTi5wYXJzZShzYXZlZCkgOiBbXTtcbiAgfSk7XG5cbiAgLy8gRmlsdGVycyBjb25maWd1cmF0aW9uc1xuICBjb25zdCBbZmlsdGVycywgc2V0RmlsdGVyc10gPSB1c2VTdGF0ZTxGaWx0ZXJTdGF0ZT4oe1xuICAgIHNlYXJjaFF1ZXJ5OiAnJyxcbiAgICBjYXRlZ29yeTogJ0FMTCcsXG4gICAgcHJpY2VSYW5nZTogNTAwMDAwMCxcbiAgICBzb3J0Qnk6ICdkZWZhdWx0JyxcbiAgICBvbmx5UG9wdWxhcjogZmFsc2UsXG4gIH0pO1xuXG4gIC8vIFNwZWNpYWwgc3BlZWQgcmFuZ2Ugc2xpZGVyIGZpbHRlciBzdGF0ZVxuICBjb25zdCBbc3BlZWRSYW5nZSwgc2V0U3BlZWRSYW5nZV0gPSB1c2VTdGF0ZTxudW1iZXI+KDEwMCk7XG5cbiAgLy8gRmlyZXN0b3JlIHBlcnNpc3RlbnQgdXBkYXRlIHN5bmNocm9uaXplcnNcbiAgY29uc3QgaGFuZGxlVXBkYXRlTW90b3JjeWNsZXMgPSBhc3luYyAodXBkYXRlZDogTW90b3JjeWNsZVtdKSA9PiB7XG4gICAgc2V0TW90b3JjeWNsZXNEYXRhKHVwZGF0ZWQpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X21vdG9yY3ljbGVzJywgSlNPTi5zdHJpbmdpZnkodXBkYXRlZCkpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBxdWVyeVNuYXBzaG90ID0gYXdhaXQgZ2V0RG9jcyhjb2xsZWN0aW9uKGRiLCAnbW90b3JjeWNsZXMnKSk7XG4gICAgICBjb25zdCBmYklkcyA9IHF1ZXJ5U25hcHNob3QuZG9jcy5tYXAoZG9jID0+IGRvYy5pZCk7XG4gICAgICBjb25zdCBuZXh0SWRzID0gdXBkYXRlZC5tYXAoYmlrZSA9PiBiaWtlLmlkKTtcblxuICAgICAgZm9yIChjb25zdCBpZCBvZiBmYklkcykge1xuICAgICAgICBpZiAoIW5leHRJZHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICAgICAgYXdhaXQgZGVsZXRlRG9jKGRvYyhkYiwgJ21vdG9yY3ljbGVzJywgaWQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IGJpa2Ugb2YgdXBkYXRlZCkge1xuICAgICAgICBhd2FpdCBzZXREb2MoZG9jKGRiLCAnbW90b3JjeWNsZXMnLCBiaWtlLmlkKSwgYmlrZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gc3luYyBtb3RvcmN5Y2xlcyBjaGFuZ2VzIHRvIEZpcmVzdG9yZTpcIiwgZXJyKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVXBkYXRlSG9tZXBhZ2VDb25maWcgPSBhc3luYyAodXBkYXRlZENvbmZpZzogSG9tZXBhZ2VDb25maWcpID0+IHtcbiAgICBzZXRIb21lcGFnZUNvbmZpZyh1cGRhdGVkQ29uZmlnKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZWxraG9seV9ob21lcGFnZV9jb25maWcnLCBKU09OLnN0cmluZ2lmeSh1cGRhdGVkQ29uZmlnKSk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHNldERvYyhkb2MoZGIsICdob21lcGFnZUNvbmZpZycsICdtYWluJyksIHVwZGF0ZWRDb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS53YXJuKFwiVW5hYmxlIHRvIHN5bmMgaG9tZXBhZ2VDb25maWcgY2hhbmdlcyB0byBGaXJlc3RvcmU6XCIsIGVycik7XG4gICAgfVxuICB9O1xuXG4gIC8vIEZhdm9yaXRlcyBzaWRlYmFyIHRyaWdnZXIgc3RhdGVcbiAgY29uc3QgW2Zhdm9yaXRlc09wZW4sIHNldEZhdm9yaXRlc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIEFkbWluIERhc2hib2FyZCBkcmF3ZXIgdHJpZ2dlciBzdGF0ZVxuICBjb25zdCBbYWRtaW5PcGVuLCBzZXRBZG1pbk9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIEFjdGl2ZSBib29rIGl0ZW0gY29udGV4dFxuICBjb25zdCBbYWN0aXZlQm9va0l0ZW0sIHNldEFjdGl2ZUJvb2tJdGVtXSA9IHVzZVN0YXRlPHtcbiAgICBtb3RvcmN5Y2xlSWQ6IHN0cmluZztcbiAgICBtb3RvcmN5Y2xlTmFtZTogc3RyaW5nO1xuICAgIGNhdGVnb3J5OiBDYXRlZ29yeVNsdWc7XG4gICAgcHJpY2U6IHN0cmluZztcbiAgICBzZXJpYWxDb2RlPzogc3RyaW5nO1xuICAgIHByZVNlbGVjdGVkQWRkT25JZHM/OiBzdHJpbmdbXTtcbiAgfSB8IG51bGw+KG51bGwpO1xuXG4gIC8vIEFjdGl2ZSBQREYgZG9jdW1lbnQgY29udGV4dFxuICBjb25zdCBbYWN0aXZlUGRmSXRlbSwgc2V0QWN0aXZlUGRmSXRlbV0gPSB1c2VTdGF0ZTxNb3RvcmN5Y2xlIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gVG9nZ2xlIHNwZWNpZmljYXRpb25zIGZvciBmbGFnc2hpcCBiaWtlXG4gIGNvbnN0IFtzaG93RmxhZ3NoaXBTcGVjcywgc2V0U2hvd0ZsYWdzaGlwU3BlY3NdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIEJlbnRvIFJlc2VydmF0aW9uIHN0YXRlc1xuICBjb25zdCBbYmVudG9Cb29raW5nTmFtZSwgc2V0QmVudG9Cb29raW5nTmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtiZW50b0Jvb2tpbmdQaG9uZSwgc2V0QmVudG9Cb29raW5nUGhvbmVdID0gdXNlU3RhdGUoJycpO1xuXG4gIC8vIFNsb2dhbiwgYmFkZ2UgYW5kIGhlcm8gZGVzY3JpcHRvcnMgbG9hZGVkIGZyb20gY3VzdG9tIHRleHRzIGlmIGFkbWluaXN0cmF0aXZlIGFjdGlvbiBtb2RpZmllZCB0aGVtXG4gIGNvbnN0IGN1c3RvbUJhZGdlVGV4dCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBsYW5nID09PSAnYXInIFxuICAgICAgPyAoaG9tZXBhZ2VDb25maWcuaGVhZGVyLnRpdGxlQXIgfHwgJ9ij2YjZhCDZhdi52LHYtiDZg9io2KfYsSDYp9mE2LTYrti12YrYp9iqINio2YXYtdixJykgXG4gICAgICA6IChob21lcGFnZUNvbmZpZy5oZWFkZXIudGl0bGUgfHwgXCJFR1lQVCdTIEZJUlNUIENIUk9OT1MgU0hPV1JPT01cIik7XG4gIH0sIFtsYW5nLCBob21lcGFnZUNvbmZpZ10pO1xuXG4gIGNvbnN0IGN1c3RvbVRpdGxlVGV4dCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBsYW5nID09PSAnYXInIFxuICAgICAgPyAoaG9tZXBhZ2VDb25maWcuaGVhZGVyLnRpdGxlQXIgfHwgJ9in2YTYrtmI2YTZiicpIFxuICAgICAgOiAoaG9tZXBhZ2VDb25maWcuaGVhZGVyLnRpdGxlIHx8ICdFTEtIT0xZJyk7XG4gIH0sIFtsYW5nLCBob21lcGFnZUNvbmZpZ10pO1xuXG4gIGNvbnN0IGN1c3RvbVRpdGxlQWNjZW50ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGxhbmcgPT09ICdhcicgXG4gICAgICA/IChob21lcGFnZUNvbmZpZy5oZWFkZXIuYWNjZW50QXIgfHwgJ9mF2YjYqtmI2LHYsicpIFxuICAgICAgOiAoaG9tZXBhZ2VDb25maWcuaGVhZGVyLmFjY2VudCB8fCAnTU9UT1JTJyk7XG4gIH0sIFtsYW5nLCBob21lcGFnZUNvbmZpZ10pO1xuXG4gIGNvbnN0IGN1c3RvbUhlcm9TbG9nYW4gPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gbGFuZyA9PT0gJ2FyJyBcbiAgICAgID8gKGhvbWVwYWdlQ29uZmlnLmhlYWRlci5zdWJ0aXRsZUFyIHx8ICfYs9in2KjZgiDZhdi5INin2YTZhdiz2KrZgtio2YQnKSBcbiAgICAgIDogKGhvbWVwYWdlQ29uZmlnLmhlYWRlci5zdWJ0aXRsZSB8fCAnUklERSBUSEUgRlVUVVJFJyk7XG4gIH0sIFtsYW5nLCBob21lcGFnZUNvbmZpZ10pO1xuXG4gIGNvbnN0IGN1c3RvbUhlcm9EZXNjID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGxhbmcgPT09ICdhcicgXG4gICAgICA/IChob21lcGFnZUNvbmZpZy5mb290ZXIuY29udGVudEFyIHx8ICfYp9mG2LbZhSDYpdmE2Ykg2LnYp9mE2YUg2KfZhNi62K8uINiq2YLYr9mFINin2YTYrtmI2YTZiiDZhdmI2KrZiNix2LIg2KPZgtmI2Ykg2KfZhNmF2YjYqtmI2LPZitmD2YTYp9iqINmI2KfZhNin2LPZg9mI2KrYsdin2Kog2YHYp9im2YLYqSDYp9mE2KPYr9in2KEg2YTZhNmF2LPYqtmC2KjZhC4g2KfYs9iq2YPYtNmBINmD2KrYp9mE2YjYrNin2KrZhtin2Iwg2YjYp9mC2LHYoyDYp9mE2YXZiNin2LXZgdin2Kog2YjYp9it2KzYsiDYsdit2YTYqtmDINmF2KjYp9i02LHYqS4nKSBcbiAgICAgIDogKGhvbWVwYWdlQ29uZmlnLmZvb3Rlci5jb250ZW50IHx8ICdTdGVwIGluc2lkZSB0aGUgdmlydHVhbCBncmlkLiBFbEtob2x5IE1vdG9ycyBpbnRyb2R1Y2VzIGV4dHJlbWUtb3V0cHV0IHNvbGlkLXN0YXRlIHBlcmZvcm1hbmNlIGJpa2VzLCBwbGFzbWEgdG91cmluZyBhZHZlbnR1cmVycywgYW5kIGhpZ2gtZmlkZWxpdHkgc21hcnQgdXJiYW4gc2Nvb3RlcnMgZGVzaWduZWQgaW4gMjAyNi4gRXhwbG9yZSBvdXIgY2F0YWxvZywgcmV2aWV3IGJsdWVwcmludHMsIGFuZCBib29rIGEgc2VjdXJlIHJpZGUgZGlyZWN0bHkuJyk7XG4gIH0sIFtsYW5nLCBob21lcGFnZUNvbmZpZ10pO1xuXG4gIC8vIEZsYWdzaGlwIEJpa2Ugc2VsZWN0b3IgZm9yIEJlbnRvIEdyaWRcbiAgY29uc3QgZmxhZ3NoaXBCaWtlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgYWN0aXZlQ2F0ID0gZmlsdGVycy5jYXRlZ29yeTtcbiAgICBpZiAoYWN0aXZlQ2F0ID09PSAnQUxMJykge1xuICAgICAgcmV0dXJuIG1vdG9yY3ljbGVzRGF0YS5maW5kKGIgPT4gYi5pZCA9PT0gJ3Nwb3J0LWN5YmVyc3BvcnQtdjQnKSB8fCBtb3RvcmN5Y2xlc0RhdGFbMF07XG4gICAgfVxuICAgIHJldHVybiBtb3RvcmN5Y2xlc0RhdGEuZmluZChiID0+IGIuY2F0ZWdvcnkgPT09IGFjdGl2ZUNhdCAmJiBiLmlzUG9wdWxhcikgfHwgXG4gICAgICAgICAgIG1vdG9yY3ljbGVzRGF0YS5maW5kKGIgPT4gYi5jYXRlZ29yeSA9PT0gYWN0aXZlQ2F0KSB8fCBcbiAgICAgICAgICAgbW90b3JjeWNsZXNEYXRhWzBdO1xuICB9LCBbZmlsdGVycy5jYXRlZ29yeSwgbW90b3JjeWNsZXNEYXRhXSk7XG5cbiAgLy8gQmVudG8gQm9va2luZyBzdWJtaXRcbiAgY29uc3QgaGFuZGxlQmVudG9Cb29raW5nU3VibWl0ID0gKGU6IGFueSkgPT4ge1xuICAgIGlmIChlKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCFiZW50b0Jvb2tpbmdOYW1lLnRyaW0oKSB8fCAhYmVudG9Cb29raW5nUGhvbmUudHJpbSgpKSB7XG4gICAgICBoYW5kbGVPcGVuQm9va2luZyhmbGFnc2hpcEJpa2UuaWQsIGZsYWdzaGlwQmlrZS5uYW1lLCBmbGFnc2hpcEJpa2UuY2F0ZWdvcnksIGZsYWdzaGlwQmlrZS5wcmljZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdmVoaWNsZVR5cGUgPSBmbGFnc2hpcEJpa2UuY2F0ZWdvcnkgPT09ICdTJyBcbiAgICAgID8gKGxhbmcgPT09ICdhcicgPyAn2LPZg9mI2KrYsScgOiAnU2Nvb3RlcicpXG4gICAgICA6IChsYW5nID09PSAnYXInID8gJ9mF2YjYqtmI2LPZitmD2YQnIDogJ01vdG9yY3ljbGUnKTtcblxuICAgIGNvbnN0IGNhdExhYmVsTWFwID0geyBBOiAnU3BvcnQgKEEpJywgQjogJ0NydWlzZXIgKEIpJywgQzogJ0FkdmVudHVyZSAoQyknLCBTOiAnU2Nvb3RlciAoUyknIH07XG4gICAgY29uc3QgYXJhYmljQ2F0ZWdvcnkgPSBjYXRMYWJlbE1hcFtmbGFnc2hpcEJpa2UuY2F0ZWdvcnldIHx8IGZsYWdzaGlwQmlrZS5jYXRlZ29yeU5hbWU7XG4gICAgY29uc3QgcHJpY2VUZXh0ID0gZm9ybWF0QXBwUHJpY2UoZmxhZ3NoaXBCaWtlLnByaWNlTnVtKTtcblxuICAgIGxldCB3YVRleHQgPSAnJztcbiAgICBpZiAobGFuZyA9PT0gJ2FyJykge1xuICAgICAgd2FUZXh0ID0gXG5g2YXYsdit2KjYp9mL2Iwg2KPYsdmK2K8g2K3YrNiyINmH2LDYpyAke3ZlaGljbGVUeXBlfTpcbtin2YTYp9iz2YU6ICR7ZmxhZ3NoaXBCaWtlLm5hbWV9XG7Yp9mE2YHYptipOiAke2FyYWJpY0NhdGVnb3J5fVxu2KfZhNiz2LnYsTogJHtwcmljZVRleHR9XG7Yp9mE2KrYp9ix2YrYrjogJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1cbtin2LPZhSDYp9mE2K3YrNiyOiAke2JlbnRvQm9va2luZ05hbWV9XG7YsdmC2YUg2KfZhNmH2KfYqtmBOiAke2JlbnRvQm9va2luZ1Bob25lfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdhVGV4dCA9IFxuYEhlbGxvLCBJIHdvdWxkIGxpa2UgdG8gYm9vayB0aGlzICR7dmVoaWNsZVR5cGV9OlxuTmFtZTogJHtmbGFnc2hpcEJpa2UubmFtZX1cbkNhdGVnb3J5OiAke2ZsYWdzaGlwQmlrZS5jYXRlZ29yeU5hbWV9XG5QcmljZTogJHtwcmljZVRleHR9XG5EYXRlOiAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdfVxuQ2xpZW50IE5hbWU6ICR7YmVudG9Cb29raW5nTmFtZX1cblBob25lOiAke2JlbnRvQm9va2luZ1Bob25lfWA7XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0UGhvbmUgPSAnMjAxMDA3MDYyMTIzJztcbiAgICBjb25zdCBlbmNvZGVkVGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudCh3YVRleHQpO1xuICAgIGNvbnN0IHdhVXJsID0gYGh0dHBzOi8vd2EubWUvJHt0YXJnZXRQaG9uZX0/dGV4dD0ke2VuY29kZWRUZXh0fWA7XG5cbiAgICAvLyBQZXJzaXN0IGJlbnRvIGJvb2tpbmcgdG8gbG9jYWxTdG9yYWdlIGZvciB0aGUgU2FhUyBEYXNoYm9hcmRcbiAgICB0cnkge1xuICAgICAgY29uc3QgZXhpc3RpbmdTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZWxraG9seV9ib29raW5ncycpO1xuICAgICAgY29uc3QgZXhpc3RpbmcgPSBleGlzdGluZ1N0ciA/IEpTT04ucGFyc2UoZXhpc3RpbmdTdHIpIDogW107XG4gICAgICBjb25zdCBuZXdCb29raW5nID0ge1xuICAgICAgICBpZDogYGJvb2stJHtEYXRlLm5vdygpfWAsXG4gICAgICAgIG1vdG9yY3ljbGVJZDogZmxhZ3NoaXBCaWtlLmlkLFxuICAgICAgICBtb3RvcmN5Y2xlTmFtZTogZmxhZ3NoaXBCaWtlLm5hbWUsXG4gICAgICAgIGNhdGVnb3J5OiBmbGFnc2hpcEJpa2UuY2F0ZWdvcnksXG4gICAgICAgIHByaWNlOiBmbGFnc2hpcEJpa2UucHJpY2UsXG4gICAgICAgIG5hbWU6IGJlbnRvQm9va2luZ05hbWUsXG4gICAgICAgIHBob25lOiBiZW50b0Jvb2tpbmdQaG9uZSxcbiAgICAgICAgZW1haWw6ICdOL0EgKFF1aWNrIEJvb2tpbmcpJyxcbiAgICAgICAgZGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0sXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICBzdGF0dXM6ICdzb2xkJ1xuICAgICAgfTtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobmV3Qm9va2luZyk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZWxraG9seV9ib29raW5ncycsIEpTT04uc3RyaW5naWZ5KGV4aXN0aW5nKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2F2aW5nIHF1aWNrIGJvb2tpbmc6XCIsIGVycik7XG4gICAgfVxuXG4gICAgc2V0QmVudG9Cb29raW5nTmFtZSgnJyk7XG4gICAgc2V0QmVudG9Cb29raW5nUGhvbmUoJycpO1xuICAgIHdpbmRvdy5vcGVuKHdhVXJsLCAnX2JsYW5rJyk7XG4gIH07XG5cbiAgLy8gMS4gRmV0Y2gsIHN5bmNocm9uaXplIGFuZCB3cml0ZSBib290c3RyYXAgZGF0YSB0byBGaXJlc3RvcmUgb24gc3RhcnR1cFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFzeW5jIGZ1bmN0aW9uIGxvYWREYXRhKCkge1xuICAgICAgLy8gTG9hZCBob21lcGFnZUNvbmZpZyBmcm9tIEZpcmVzdG9yZVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29uZmlnRG9jUmVmID0gZG9jKGRiLCAnaG9tZXBhZ2VDb25maWcnLCAnbWFpbicpO1xuICAgICAgICBjb25zdCBjb25maWdTbmFwID0gYXdhaXQgZ2V0RG9jKGNvbmZpZ0RvY1JlZik7XG4gICAgICAgIGlmIChjb25maWdTbmFwLmV4aXN0cygpKSB7XG4gICAgICAgICAgY29uc3QgY2xvdWRDb25maWcgPSBjb25maWdTbmFwLmRhdGEoKSBhcyBIb21lcGFnZUNvbmZpZztcbiAgICAgICAgICBzZXRIb21lcGFnZUNvbmZpZyhjbG91ZENvbmZpZyk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfaG9tZXBhZ2VfY29uZmlnJywgSlNPTi5zdHJpbmdpZnkoY2xvdWRDb25maWcpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiBGaXJlc3RvcmUgaXMgY29tcGxldGVseSBwcmlzdGluZSwgaW5pdGlhbGl6ZSBpdCB3aXRoIERFRkFVTFRfSE9NRVBBR0VfQ09ORklHXG4gICAgICAgICAgYXdhaXQgc2V0RG9jKGNvbmZpZ0RvY1JlZiwgREVGQVVMVF9IT01FUEFHRV9DT05GSUcpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiVW5hYmxlIHRvIGZldGNoIGhvbWVwYWdlQ29uZmlnIGZyb20gRmlyZXN0b3JlLCBmYWxsaW5nIGJhY2sgdG8gbG9jYWw6XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIC8vIExvYWQgbW90b3JjeWNsZXMgZnJvbSBGaXJlc3RvcmVcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5U25hcHNob3QgPSBhd2FpdCBnZXREb2NzKGNvbGxlY3Rpb24oZGIsICdtb3RvcmN5Y2xlcycpKTtcbiAgICAgICAgaWYgKCFxdWVyeVNuYXBzaG90LmVtcHR5KSB7XG4gICAgICAgICAgY29uc3QgbGlzdDogTW90b3JjeWNsZVtdID0gW107XG4gICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKChkb2MpID0+IHtcbiAgICAgICAgICAgIGxpc3QucHVzaChkb2MuZGF0YSgpIGFzIE1vdG9yY3ljbGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIFNlbGYtaGVhbGluZyBjaGVjazogRW5zdXJlIGV2ZXJ5IGNhdGVnb3J5IGNvbnRhaW5zIGF0IGxlYXN0IDUgbW9kZWxzLlxuICAgICAgICAgIGNvbnN0IGNhdGVnb3JpZXNUb0NoZWNrOiAoJ0EnIHwgJ0InIHwgJ0MnIHwgJ1MnKVtdID0gWydBJywgJ0InLCAnQycsICdTJ107XG4gICAgICAgICAgbGV0IG5lZWRzU2VsZkhlYWwgPSBmYWxzZTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNhdCBvZiBjYXRlZ29yaWVzVG9DaGVjaykge1xuICAgICAgICAgICAgY29uc3QgY291bnQgPSBsaXN0LmZpbHRlcihiID0+IGIuY2F0ZWdvcnkgPT09IGNhdCkubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGNvdW50IDwgNSkge1xuICAgICAgICAgICAgICBuZWVkc1NlbGZIZWFsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5lZWRzU2VsZkhlYWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZi1oZWFsaW5nIHRyaWdnZXJlZDogU2VlZGluZyBkZWZhdWx0IG1vZGVscyBpbnRvIEZpcmVzdG9yZS4uLlwiKTtcbiAgICAgICAgICAgIGNvbnN0IG1lcmdlZExpc3QgPSBbLi4ubGlzdF07XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGRlZmF1bHRCaWtlIG9mIE1PVE9SQ1lDTEVTX0RBVEEpIHtcbiAgICAgICAgICAgICAgaWYgKCFtZXJnZWRMaXN0LnNvbWUoYiA9PiBiLmlkID09PSBkZWZhdWx0QmlrZS5pZCkpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRMaXN0LnB1c2goZGVmYXVsdEJpa2UpO1xuICAgICAgICAgICAgICAgIC8vIEF0dGVtcHQgdG8gd3JpdGUgdG8gRmlyZXN0b3JlLCBidXQgZG8gbm90IGJsb2NrIGNsaWVudCBsb2FkIGlmIHVuYXV0aG9yaXplZC9ub3QtYWRtaW5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgYXdhaXQgc2V0RG9jKGRvYyhkYiwgJ21vdG9yY3ljbGVzJywgZGVmYXVsdEJpa2UuaWQpLCBkZWZhdWx0QmlrZSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAod3JpdGVFcnIpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ291bGQgbm90IHNlZWQgbWlzc2luZyBiaWtlICR7ZGVmYXVsdEJpa2UuaWR9IHRvIEZpcmVzdG9yZSAoZXhwZWN0ZWQgaWYgbm90IGxvZ2dlZCBpbik6YCwgd3JpdGVFcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0TW90b3JjeWNsZXNEYXRhKG1lcmdlZExpc3QpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfbW90b3JjeWNsZXMnLCBKU09OLnN0cmluZ2lmeShtZXJnZWRMaXN0KSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldE1vdG9yY3ljbGVzRGF0YShsaXN0KTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X21vdG9yY3ljbGVzJywgSlNPTi5zdHJpbmdpZnkobGlzdCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiBGaXJlc3RvcmUgaXMgZW1wdHksIHNlZWQgYWN0aXZlIG1vdG9yY3ljbGVzIGNvbGxlY3Rpb24gd2l0aCBkZWZhdWx0IG1hY2hpbmVzIGFycmF5XG4gICAgICAgICAgY29uc29sZS5sb2coXCJGaXJlc3RvcmUgZW1wdHk6IFNlZWRpbmcgaW5pdGlhbCBjYXRlZ29yaWVzIGludG8gcmVtb3RlLi4uXCIpO1xuICAgICAgICAgIGZvciAoY29uc3QgYmlrZSBvZiBNT1RPUkNZQ0xFU19EQVRBKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBhd2FpdCBzZXREb2MoZG9jKGRiLCAnbW90b3JjeWNsZXMnLCBiaWtlLmlkKSwgYmlrZSk7XG4gICAgICAgICAgICB9IGNhdGNoICh3cml0ZUVycikge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBzZWVkIGJpa2UgJHtiaWtlLmlkfSB0byBGaXJlc3RvcmUgKGV4cGVjdGVkIGlmIG5vdCBsb2dnZWQgaW4pOmAsIHdyaXRlRXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0TW90b3JjeWNsZXNEYXRhKE1PVE9SQ1lDTEVTX0RBVEEpO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X21vdG9yY3ljbGVzJywgSlNPTi5zdHJpbmdpZnkoTU9UT1JDWUNMRVNfREFUQSkpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiVW5hYmxlIHRvIGZldGNoIG1vdG9yY3ljbGVzIGZyb20gRmlyZXN0b3JlLCBmYWxsaW5nIGJhY2sgdG8gbG9jYWw6XCIsIGVycik7XG4gICAgICAgIHNldE1vdG9yY3ljbGVzRGF0YShNT1RPUkNZQ0xFU19EQVRBKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfbW90b3JjeWNsZXMnLCBKU09OLnN0cmluZ2lmeShNT1RPUkNZQ0xFU19EQVRBKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIExvYWQgU3RvcmUgcHJvZHVjdHMgZnJvbSBGaXJlc3RvcmVcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5U25hcHNob3QgPSBhd2FpdCBnZXREb2NzKGNvbGxlY3Rpb24oZGIsICdzdG9yZV9wcm9kdWN0cycpKTtcbiAgICAgICAgaWYgKCFxdWVyeVNuYXBzaG90LmVtcHR5ICYmIHF1ZXJ5U25hcHNob3Quc2l6ZSA+PSA1MCkge1xuICAgICAgICAgIGNvbnN0IGxpc3Q6IGFueVtdID0gW107XG4gICAgICAgICAgcXVlcnlTbmFwc2hvdC5mb3JFYWNoKChkb2MpID0+IHtcbiAgICAgICAgICAgIGxpc3QucHVzaChkb2MuZGF0YSgpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXRTdG9yZVByb2R1Y3RzRGF0YShsaXN0KTtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZWxraG9seV9zdG9yZV9wcm9kdWN0cycsIEpTT04uc3RyaW5naWZ5KGxpc3QpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiBlbXB0eSBvciBmZXdlciB0aGFuIDUwIGl0ZW1zLCB0cnkgdG8gc2VlZCB0aGUgcHJlbWl1bSBwcm9kdWN0cyBhdXRvbWF0aWNhbGx5IHVzaW5nIGEgZmFzdCBXcml0ZUJhdGNoXG4gICAgICAgICAgY29uc29sZS5sb2coXCJTZWVkaW5nIDUwIHByZW1pdW0gc3RvcmUgcHJvZHVjdHMgaW4gYmF0Y2guLi5cIik7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGJhdGNoID0gd3JpdGVCYXRjaChkYik7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHAgb2YgTU9DS19TVE9SRV9QUk9EVUNUUykge1xuICAgICAgICAgICAgICBiYXRjaC5zZXQoZG9jKGRiLCAnc3RvcmVfcHJvZHVjdHMnLCBwLmlkKSwgcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCBiYXRjaC5jb21taXQoKTtcbiAgICAgICAgICB9IGNhdGNoICh3cml0ZUVycikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ291bGQgbm90IHdyaXRlIGluaXRpYWwgc3RvcmUgc2VlZCB0byBGaXJlc3RvcmUgKGZhbGxiYWNrIHRvIGxvY2FsIHN0YXRlKTpcIiwgd3JpdGVFcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBBbHdheXMgZmFsbCBiYWNrIHRvIE1PQ0tfU1RPUkVfUFJPRFVDVFMgc28gdGhhdCB0aGUgdmlldyBpcyBwb3B1bGF0ZWQgaW1tZWRpYXRlbHksIFxuICAgICAgICAgIC8vIGV2ZW4gaWYgdGhlIHJlbW90ZSBiYXRjaCBjb21taXQgZmFpbGVkIHBlcm1pc3Npb25zIGNoZWNrIVxuICAgICAgICAgIHNldFN0b3JlUHJvZHVjdHNEYXRhKE1PQ0tfU1RPUkVfUFJPRFVDVFMpO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X3N0b3JlX3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoTU9DS19TVE9SRV9QUk9EVUNUUykpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiVW5hYmxlIHRvIGZldGNoIHN0b3JlIHByb2R1Y3RzIGZyb20gRmlyZXN0b3JlLCBmYWxsaW5nIGJhY2sgdG8gbG9jYWw6XCIsIGVycik7XG4gICAgICAgIGNvbnN0IGxvY2FsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Vsa2hvbHlfc3RvcmVfcHJvZHVjdHMnKTtcbiAgICAgICAgaWYgKGxvY2FsICYmIEpTT04ucGFyc2UobG9jYWwpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzZXRTdG9yZVByb2R1Y3RzRGF0YShKU09OLnBhcnNlKGxvY2FsKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0U3RvcmVQcm9kdWN0c0RhdGEoTU9DS19TVE9SRV9QUk9EVUNUUyk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfc3RvcmVfcHJvZHVjdHMnLCBKU09OLnN0cmluZ2lmeShNT0NLX1NUT1JFX1BST0RVQ1RTKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbG9hZERhdGEoKTtcbiAgfSwgW10pO1xuXG4gIC8vIENoZWNrIGZvciBwcm9kdWN0IGxhbmRpbmcgZnJvbSBRUiBjb2RlIHNjYW5uaW5nXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICBjb25zdCBwcm9kSWQgPSBwYXJhbXMuZ2V0KCdwcm9kdWN0Jyk7XG4gICAgaWYgKHByb2RJZCkge1xuICAgICAgc2V0QWN0aXZlVmlldygnc3RvcmUnKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICAvLyBQZXJzaXN0IGZhdm9yaXRlcyBpbiBjbGllbnQga2V5IHN0b3JhZ2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZWxraG9seV9mYXZvcml0ZXMnLCBKU09OLnN0cmluZ2lmeShmYXZvcml0ZXMpKTtcbiAgfSwgW2Zhdm9yaXRlc10pO1xuXG4gIC8vIFBlcnNpc3QgY2FydCB0byBsb2NhbCBjbGllbnQgc3RhdGVcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZWxraG9seV9jYXJ0JywgSlNPTi5zdHJpbmdpZnkoY2FydEl0ZW1zKSk7XG4gIH0sIFtjYXJ0SXRlbXNdKTtcblxuICAvLyBEeW5hbWljIGRlc2lnbiBicmFuZGluZyBtYW5hZ2VyIChQYWdlIEJ1aWxkZXIgaW50ZWdyYXRpb24pXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZm9udFF1ZXJpZXNNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgICAnSW50ZXInOiAnZmFtaWx5PUludGVyOndnaHRAMzAwOzQwMDs1MDA7NjAwOzcwMCZkaXNwbGF5PXN3YXAnLFxuICAgICAgJ1BvcHBpbnMnOiAnZmFtaWx5PVBvcHBpbnM6d2dodEAzMDA7NDAwOzUwMDs2MDA7NzAwJmRpc3BsYXk9c3dhcCcsXG4gICAgICAnTW9udHNlcnJhdCc6ICdmYW1pbHk9TW9udHNlcnJhdDp3Z2h0QDMwMDs0MDA7NTAwOzYwMDs3MDAmZGlzcGxheT1zd2FwJyxcbiAgICAgICdSb2JvdG8nOiAnZmFtaWx5PVJvYm90bzp3Z2h0QDMwMDs0MDA7NTAwOzcwMCZkaXNwbGF5PXN3YXAnLFxuICAgICAgJ0NhaXJvJzogJ2ZhbWlseT1DYWlybzp3Z2h0QDMwMDs0MDA7NTAwOzYwMDs3MDA7ODAwOzkwMCZkaXNwbGF5PXN3YXAnLFxuICAgICAgJ1RhamF3YWwnOiAnZmFtaWx5PVRhamF3YWw6d2dodEAzMDA7NDAwOzUwMDs3MDAmZGlzcGxheT1zd2FwJyxcbiAgICAgICdJQk0gUGxleCBTYW5zJzogJ2ZhbWlseT1JQk0rUGxleCtTYW5zOndnaHRAMzAwOzQwMDs1MDA7NjAwOzcwMCZkaXNwbGF5PXN3YXAnLFxuICAgICAgJ09wZW4gU2Fucyc6ICdmYW1pbHk9T3BlbitTYW5zOndnaHRAMzAwOzQwMDs1MDA7NjAwOzcwMCZkaXNwbGF5PXN3YXAnLFxuICAgICAgJ0xhdG8nOiAnZmFtaWx5PUxhdG86d2dodEAzMDA7NDAwOzcwMCZkaXNwbGF5PXN3YXAnLFxuICAgICAgJ051bml0byc6ICdmYW1pbHk9TnVuaXRvOndnaHRAMzAwOzQwMDs2MDA7NzAwJmRpc3BsYXk9c3dhcCcsXG4gICAgICAnU3BhY2UgR3JvdGVzayc6ICdmYW1pbHk9U3BhY2UrR3JvdGVzazp3Z2h0QDMwMDs0MDA7NTAwOzYwMDs3MDAmZGlzcGxheT1zd2FwJyxcbiAgICAgIC8vIEFyYWJpYyBjb21wYW5pb24gZm9udHNcbiAgICAgICdJQk0gUGxleCBTYW5zIEFyYWJpYyc6ICdmYW1pbHk9SUJNK1BsZXgrU2FucytBcmFiaWM6d2dodEAzMDA7NDAwOzUwMDs2MDA7NzAwJmRpc3BsYXk9c3dhcCcsXG4gICAgICAnUnViaWsnOiAnZmFtaWx5PVJ1YmlrOndnaHRAMzAwOzQwMDs1MDA7NjAwOzcwMDs4MDA7OTAwJmRpc3BsYXk9c3dhcCcsXG4gICAgICAnQWxtYXJhaSc6ICdmYW1pbHk9QWxtYXJhaTp3Z2h0QDMwMDs0MDA7NzAwOzgwMCZkaXNwbGF5PXN3YXAnLFxuICAgICAgJ1ZhemlybWF0bic6ICdmYW1pbHk9VmF6aXJtYXRuOndnaHRAMzAwOzQwMDs1MDA7NjAwOzcwMDs4MDA7OTAwJmRpc3BsYXk9c3dhcCcsXG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBmb250VG9Dc3NNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgICAnSW50ZXInOiBcIidJbnRlcicsICdWYXppcm1hdG4nLCBzYW5zLXNlcmlmXCIsXG4gICAgICAnUG9wcGlucyc6IFwiJ1BvcHBpbnMnLCAnUnViaWsnLCBzYW5zLXNlcmlmXCIsXG4gICAgICAnTW9udHNlcnJhdCc6IFwiJ01vbnRzZXJyYXQnLCAnQWxtYXJhaScsIHNhbnMtc2VyaWZcIixcbiAgICAgICdSb2JvdG8nOiBcIidSb2JvdG8nLCAnVmF6aXJtYXRuJywgc2Fucy1zZXJpZlwiLFxuICAgICAgJ0NhaXJvJzogXCInQ2Fpcm8nLCBzYW5zLXNlcmlmXCIsXG4gICAgICAnVGFqYXdhbCc6IFwiJ1RhamF3YWwnLCBzYW5zLXNlcmlmXCIsXG4gICAgICAnSUJNIFBsZXggU2Fucyc6IFwiJ0lCTSBQbGV4IFNhbnMgQXJhYmljJywgJ0lCTSBQbGV4IFNhbnMnLCBzYW5zLXNlcmlmXCIsXG4gICAgICAnT3BlbiBTYW5zJzogXCInT3BlbiBTYW5zJywgJ1ZhemlybWF0bicsIHNhbnMtc2VyaWZcIixcbiAgICAgICdMYXRvJzogXCInTGF0bycsICdBbG1hcmFpJywgc2Fucy1zZXJpZlwiLFxuICAgICAgJ051bml0byc6IFwiJ051bml0bycsICdSdWJpaycsIHNhbnMtc2VyaWZcIixcbiAgICAgICdTcGFjZSBHcm90ZXNrJzogXCInU3BhY2UgR3JvdGVzaycsICdWYXppcm1hdG4nLCBzYW5zLXNlcmlmXCIsXG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBhY3RpdmVGb250SGVhZGluZ3MgPSBob21lcGFnZUNvbmZpZy5mb250SGVhZGluZ3MgfHwgaG9tZXBhZ2VDb25maWcuZm9udCB8fCAnU3BhY2UgR3JvdGVzayc7XG4gICAgY29uc3QgYWN0aXZlRm9udFN1YmhlYWRpbmdzID0gaG9tZXBhZ2VDb25maWcuZm9udFN1YmhlYWRpbmdzIHx8IGhvbWVwYWdlQ29uZmlnLmZvbnQgfHwgJ0NhaXJvJztcbiAgICBjb25zdCBhY3RpdmVGb250Qm9keSA9IGhvbWVwYWdlQ29uZmlnLmZvbnRCb2R5IHx8IGhvbWVwYWdlQ29uZmlnLmZvbnQgfHwgJ0ludGVyJztcblxuICAgIGNvbnN0IGFjdGl2ZUZvbnRIZWFkaW5nc0NzcyA9IGZvbnRUb0Nzc01hcFthY3RpdmVGb250SGVhZGluZ3NdIHx8IGBcIiR7YWN0aXZlRm9udEhlYWRpbmdzfVwiLCBzYW5zLXNlcmlmYDtcbiAgICBjb25zdCBhY3RpdmVGb250U3ViaGVhZGluZ3NDc3MgPSBmb250VG9Dc3NNYXBbYWN0aXZlRm9udFN1YmhlYWRpbmdzXSB8fCBgXCIke2FjdGl2ZUZvbnRTdWJoZWFkaW5nc31cIiwgc2Fucy1zZXJpZmA7XG4gICAgY29uc3QgYWN0aXZlRm9udEJvZHlDc3MgPSBmb250VG9Dc3NNYXBbYWN0aXZlRm9udEJvZHldIHx8IGBcIiR7YWN0aXZlRm9udEJvZHl9XCIsIHNhbnMtc2VyaWZgO1xuXG4gICAgLy8gTG9hZCBhbGwgcG9zc2libGUgZm9udHMgdG8gZW5zdXJlIHRoZSBmb250IGNob2ljZSBidXR0b25zIGFuZCB0eXBvZ3JhcGh5IHByZXZpZXdzIGVsZW1lbnRzIHJlbmRlciBjb3JyZWN0bHkgaW4gdGhlIHZpc3VhbCBzZXR0aW5ncyBwaWNrZXJcbiAgICBjb25zdCBmb250RmFtaWxpZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoW1xuICAgICAgJ0ludGVyJywgJ1BvcHBpbnMnLCAnTW9udHNlcnJhdCcsICdSb2JvdG8nLCAnQ2Fpcm8nLCAnVGFqYXdhbCcsIFxuICAgICAgJ0lCTSBQbGV4IFNhbnMnLCAnT3BlbiBTYW5zJywgJ0xhdG8nLCAnTnVuaXRvJywgJ1NwYWNlIEdyb3Rlc2snLFxuICAgICAgJ0lCTSBQbGV4IFNhbnMgQXJhYmljJywgJ1J1YmlrJywgJ0FsbWFyYWknLCAnVmF6aXJtYXRuJyxcbiAgICAgIGFjdGl2ZUZvbnRIZWFkaW5ncywgYWN0aXZlRm9udFN1YmhlYWRpbmdzLCBhY3RpdmVGb250Qm9keVxuICAgIF0pKTtcbiAgICBcbiAgICBjb25zdCBjbGVhblF1ZXJ5UGFydHMgPSBmb250RmFtaWxpZXMubWFwKGYgPT4ge1xuICAgICAgY29uc3QgcSA9IGZvbnRRdWVyaWVzTWFwW2ZdIHx8IGBmYW1pbHk9JHtmLnJlcGxhY2UoLyAvZywgJysnKX06d2dodEAzMDA7NDAwOzUwMDs2MDA7NzAwYDtcbiAgICAgIHJldHVybiBxLnJlcGxhY2UoJyZkaXNwbGF5PXN3YXAnLCAnJyk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gMS4gSW5qZWN0ZWQgZHluYW1pYyBmb250cyBzdHlsZXNoZWV0IHZpYSA8bGluaz5cbiAgICBjb25zdCBmb250c1VybCA9IGBodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/JHtjbGVhblF1ZXJ5UGFydHMuam9pbignJicpfSZkaXNwbGF5PXN3YXBgO1xuICAgIGNvbnN0IGZvbnRMaW5rSWQgPSAnZHluYW1pYy1nb29nbGUtZm9udHMnO1xuICAgIGxldCBsaW5rVGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZm9udExpbmtJZCkgYXMgSFRNTExpbmtFbGVtZW50O1xuICAgIGlmICghbGlua1RhZykge1xuICAgICAgbGlua1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgIGxpbmtUYWcuaWQgPSBmb250TGlua0lkO1xuICAgICAgbGlua1RhZy5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmtUYWcpO1xuICAgIH1cbiAgICBpZiAobGlua1RhZy5ocmVmICE9PSBmb250c1VybCkge1xuICAgICAgbGlua1RhZy5ocmVmID0gZm9udHNVcmw7XG4gICAgfVxuICAgIFxuICAgIC8vIDIuIEluamVjdGVkIGR5bmFtaWMgc3R5bGVzIHRhZyB0byBvdmVycmlkZSBnZW5lcmFsIHN0eWxlcyBhbmQgc3BhY2luZ3NcbiAgICBjb25zdCBzdHlsZUlkID0gJ2R5bmFtaWMtaG9tZXBhZ2UtdGhlbWUnO1xuICAgIGxldCBzdHlsZVRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHN0eWxlSWQpIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG4gICAgaWYgKCFzdHlsZVRhZykge1xuICAgICAgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgc3R5bGVUYWcuaWQgPSBzdHlsZUlkO1xuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHJhZGl1c01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAgICdyb3VuZGVkLW5vbmUnOiAnMHB4JyxcbiAgICAgICdyb3VuZGVkLW1kJzogJzZweCcsXG4gICAgICAncm91bmRlZC14bCc6ICcxMnB4JyxcbiAgICAgICdyb3VuZGVkLTN4bCc6ICcyNHB4JyxcbiAgICAgICdyb3VuZGVkLWZ1bGwnOiAnOTk5OXB4JyxcbiAgICB9O1xuICAgIGNvbnN0IHJhZFZhbHVlID0gcmFkaXVzTWFwW2hvbWVwYWdlQ29uZmlnLnRoZW1lLmJ1dHRvblJhZGl1c10gfHwgJzEycHgnO1xuICAgIGNvbnN0IHNwYWNpbmdNdWx0ID0gaG9tZXBhZ2VDb25maWcudGhlbWUuc3BhY2luZ011bHRpcGxpZXIgfHwgMS4wO1xuICAgIFxuICAgICAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSBgXG5cbiAgICAgIDpyb290IHtcbiAgICAgICAgLS1jb2xvci1icmFuZC1wcmltYXJ5OiAke2hvbWVwYWdlQ29uZmlnLnRoZW1lLnByaW1hcnlDb2xvciB8fCAnIzYzNjZGMSd9ICFpbXBvcnRhbnQ7XG4gICAgICAgIC0tY29sb3ItYnJhbmQtc2Vjb25kYXJ5OiAke2hvbWVwYWdlQ29uZmlnLnRoZW1lLnNlY29uZGFyeUNvbG9yIHx8ICcjQTg1NUY3J30gIWltcG9ydGFudDtcbiAgICAgICAgLS1jb2xvci1icmFuZC1hY2NlbnQ6ICR7aG9tZXBhZ2VDb25maWcubWFpbkNvbnRlbnQuaWNvbkNvbG9yIHx8ICcjMjJEM0VFJ30gIWltcG9ydGFudDtcbiAgICAgICAgLS1jb2xvci1icmFuZC1iZzogJHtob21lcGFnZUNvbmZpZy50aGVtZS5iYWNrZ3JvdW5kQ29sb3IgfHwgJyMwQjBGMUEnfSAhaW1wb3J0YW50O1xuICAgICAgICAtLWJ1dHRvbi1yYWRpdXM6ICR7cmFkVmFsdWV9ICFpbXBvcnRhbnQ7XG4gICAgICAgIC0tc3BhY2luZy1zY2FsZTogJHtzcGFjaW5nTXVsdH0gIWltcG9ydGFudDtcbiAgICAgICAgXG4gICAgICAgIC0tZm9udC1oZWFkaW5nczogJHthY3RpdmVGb250SGVhZGluZ3NDc3N9ICFpbXBvcnRhbnQ7XG4gICAgICAgIC0tZm9udC1zdWJoZWFkaW5nczogJHthY3RpdmVGb250U3ViaGVhZGluZ3NDc3N9ICFpbXBvcnRhbnQ7XG4gICAgICAgIC0tZm9udC1ib2R5OiAke2FjdGl2ZUZvbnRCb2R5Q3NzfSAhaW1wb3J0YW50O1xuICAgICAgICAtLWZvbnQtc2FuczogdmFyKC0tZm9udC1ib2R5KSAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgXG4gICAgICAvKiBHbG9iYWwgZm9udHM6IGRlZmF1bHQvYm9keSBzdHlsZSB3aXRoIGNvcnJlY3QgaW5oZXJpdGFuY2UgKi9cbiAgICAgIGh0bWwsIGJvZHkge1xuICAgICAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1ib2R5KSAhaW1wb3J0YW50O1xuICAgICAgICAtLWZvbnQtc2FuczogdmFyKC0tZm9udC1ib2R5KSAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgXG4gICAgICAuZm9udC1zYW5zLCBbY2xhc3MqPVwiZm9udC1zYW5zXCJdIHtcbiAgICAgICAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtYm9keSkgIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLyogUGFyYWdyYXBocyAmIGRlc2NyaXB0aW9ucyBhbHdheXMgdXNlIGJvZHkgZm9udCAqL1xuICAgICAgcCwgLmZvbnQtYm9keSwgLmRlc2NyaXB0aW9uLCBbY2xhc3MqPVwiZGVzY3JpcHRpb25cIl0ge1xuICAgICAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1ib2R5KSAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgICAgXG4gICAgICAvKiBNYWluIGhlYWRpbmdzICovXG4gICAgICBoMSwgaDIsIGgzLCAuZm9udC1oZWFkaW5ncywgW2NsYXNzKj1cImZvbnQtaGVhZGluZ3NcIl0ge1xuICAgICAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1oZWFkaW5ncykgIWltcG9ydGFudDtcbiAgICAgIH1cblxuICAgICAgLyogU2Vjb25kYXJ5IHN1YmhlYWRpbmdzLCBzbWFsbCB0YWdzLCBidXR0b25zLCBiYWRnZXMgKi9cbiAgICAgIGg0LCBoNSwgaDYsIC5mb250LXN1YmhlYWRpbmdzLCBbY2xhc3MqPVwiZm9udC1zdWJoZWFkaW5nc1wiXSxcbiAgICAgIGJ1dHRvbiwgLmJhZGdlLCBbY2xhc3MqPVwiYmFkZ2VcIl0ge1xuICAgICAgICBmb250LWZhbWlseTogdmFyKC0tZm9udC1zdWJoZWFkaW5ncyksIHZhcigtLWZvbnQtYm9keSkgIWltcG9ydGFudDtcbiAgICAgIH1cblxuICAgICAgLyogRXhhY3QgZm9udC1wcmV2aWV3IGNsYXNzZXMgd2l0aCBoaWdoIHNwZWNpZmljaXR5IHNvIHRoZXkgY2FuIG92ZXJyaWRlIGFueSBnbG9iYWwgY3VzdG9tIHNldHRpbmdzICovXG4gICAgICAuYWRtaW4tcGFuZWwtcm9vdCAuZm9udC1wcmV2aWV3LUludGVyLCAuYWRtaW4tcGFuZWwtcm9vdCAuZm9udC1wcmV2aWV3LUludGVyICosIC5mb250LXByZXZpZXctSW50ZXIsIC5mb250LXByZXZpZXctSW50ZXIgKiB7IGZvbnQtZmFtaWx5OiAnSW50ZXInLCAnVmF6aXJtYXRuJywgc2Fucy1zZXJpZiAhaW1wb3J0YW50OyB9XG4gICAgICAuYWRtaW4tcGFuZWwtcm9vdCAuZm9udC1wcmV2aWV3LVBvcHBpbnMsIC5hZG1pbi1wYW5lbC1yb290IC5mb250LXByZXZpZXctUG9wcGlucyAqLCAuZm9udC1wcmV2aWV3LVBvcHBpbnMsIC5mb250LXByZXZpZXctUG9wcGlucyAqIHsgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgJ1J1YmlrJywgc2Fucy1zZXJpZiAhaW1wb3J0YW50OyB9XG4gICAgICAuYWRtaW4tcGFuZWwtcm9vdCAuZm9udC1wcmV2aWV3LU1vbnRzZXJyYXQsIC5hZG1pbi1wYW5lbC1yb290IC5mb250LXByZXZpZXctTW9udHNlcnJhdCAqLCAuZm9udC1wcmV2aWV3LU1vbnRzZXJyYXQsIC5mb250LXByZXZpZXctTW9udHNlcnJhdCAqIHsgZm9udC1mYW1pbHk6ICdNb250c2VycmF0JywgJ0FsbWFyYWknLCBzYW5zLXNlcmlmICFpbXBvcnRhbnQ7IH1cbiAgICAgIC5hZG1pbi1wYW5lbC1yb290IC5mb250LXByZXZpZXctUm9ib3RvLCAuYWRtaW4tcGFuZWwtcm9vdCAuZm9udC1wcmV2aWV3LVJvYm90byAqLCAuZm9udC1wcmV2aWV3LVJvYm90bywgLmZvbnQtcHJldmlldy1Sb2JvdG8gKiB7IGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgJ1ZhemlybWF0bicsIHNhbnMtc2VyaWYgIWltcG9ydGFudDsgfVxuICAgICAgLmFkbWluLXBhbmVsLXJvb3QgLmZvbnQtcHJldmlldy1DYWlybywgLmFkbWluLXBhbmVsLXJvb3QgLmZvbnQtcHJldmlldy1DYWlybyAqLCAuZm9udC1wcmV2aWV3LUNhaXJvLCAuZm9udC1wcmV2aWV3LUNhaXJvICogeyBmb250LWZhbWlseTogJ0NhaXJvJywgc2Fucy1zZXJpZiAhaW1wb3J0YW50OyB9XG4gICAgICAuYWRtaW4tcGFuZWwtcm9vdCAuZm9udC1wcmV2aWV3LVRhamF3YWwsIC5hZG1pbi1wYW5lbC1yb290IC5mb250LXByZXZpZXctVGFqYXdhbCAqLCAuZm9udC1wcmV2aWV3LVRhamF3YWwsIC5mb250LXByZXZpZXctVGFqYXdhbCAqIHsgZm9udC1mYW1pbHk6ICdUYWphd2FsJywgc2Fucy1zZXJpZiAhaW1wb3J0YW50OyB9XG4gICAgICAuYWRtaW4tcGFuZWwtcm9vdCAuZm9udC1wcmV2aWV3LUlCTVBsZXhTYW5zLCAuYWRtaW4tcGFuZWwtcm9vdCAuZm9udC1wcmV2aWV3LUlCTVBsZXhTYW5zICosIC5mb250LXByZXZpZXctSUJNUGxleFNhbnMsIC5mb250LXByZXZpZXctSUJNUGxleFNhbnMgKiB7IGZvbnQtZmFtaWx5OiAnSUJNIFBsZXggU2FucyBBcmFiaWMnLCAnSUJNIFBsZXggU2FucycsIHNhbnMtc2VyaWYgIWltcG9ydGFudDsgfVxuICAgICAgLmFkbWluLXBhbmVsLXJvb3QgLmZvbnQtcHJldmlldy1PcGVuU2FucywgLmFkbWluLXBhbmVsLXJvb3QgLmZvbnQtcHJldmlldy1PcGVuU2FucyAqLCAuZm9udC1wcmV2aWV3LU9wZW5TYW5zLCAuZm9udC1wcmV2aWV3LU9wZW5TYW5zICogeyBmb250LWZhbWlseTogJ09wZW4gU2FucycsICdWYXppcm1hdG4nLCBzYW5zLXNlcmlmICFpbXBvcnRhbnQ7IH1cbiAgICAgIC5hZG1pbi1wYW5lbC1yb290IC5mb250LXByZXZpZXctTGF0bywgLmFkbWluLXBhbmVsLXJvb3QgLmZvbnQtcHJldmlldy1MYXRvICosIC5mb250LXByZXZpZXctTGF0bywgLmZvbnQtcHJldmlldy1MYXRvICogeyBmb250LWZhbWlseTogJ0xhdG8nLCAnQWxtYXJhaScsIHNhbnMtc2VyaWYgIWltcG9ydGFudDsgfVxuICAgICAgLmFkbWluLXBhbmVsLXJvb3QgLmZvbnQtcHJldmlldy1OdW5pdG8sIC5hZG1pbi1wYW5lbC1yb290IC5mb250LXByZXZpZXctTnVuaXRvICosIC5mb250LXByZXZpZXctTnVuaXRvLCAuZm9udC1wcmV2aWV3LU51bml0byAqIHsgZm9udC1mYW1pbHk6ICdOdW5pdG8nLCAnUnViaWsnLCBzYW5zLXNlcmlmICFpbXBvcnRhbnQ7IH1cbiAgICAgIC5hZG1pbi1wYW5lbC1yb290IC5mb250LXByZXZpZXctU3BhY2VHcm90ZXNrLCAuYWRtaW4tcGFuZWwtcm9vdCAuZm9udC1wcmV2aWV3LVNwYWNlR3JvdGVzayAqLCAuZm9udC1wcmV2aWV3LVNwYWNlR3JvdGVzaywgLmZvbnQtcHJldmlldy1TcGFjZUdyb3Rlc2sgKiB7IGZvbnQtZmFtaWx5OiAnU3BhY2UgR3JvdGVzaycsICdWYXppcm1hdG4nLCBzYW5zLXNlcmlmICFpbXBvcnRhbnQ7IH1cblxuICAgICAgLyogUFJFU0VSVkUgZm9udHMgYW5kIGlubGluZSBkZXNpZ25zIGluc2lkZSBhZG1pbi9tYW5hZ2VtZW50IG92ZXJsYXlzIHdpdGhvdXQgb3ZlcnJpZGluZyBwcmV2aWV3IGNsYXNzZXMgKi9cbiAgICAgIC5hZG1pbi1wYW5lbC1yb290IHtcbiAgICAgICAgZm9udC1mYW1pbHk6IFwiU3BhY2UgR3JvdGVza1wiLCBcIkludGVyXCIsIHNhbnMtc2VyaWY7XG4gICAgICB9XG5cbiAgICAgIC5hZG1pbi1wYW5lbC1yb290IC5mb250LW1vbm8sXG4gICAgICAuYWRtaW4tcGFuZWwtcm9vdCBbY2xhc3MqPVwiZm9udC1tb25vXCJdLFxuICAgICAgLmFkbWluLXBhbmVsLXJvb3QgcHJlLFxuICAgICAgLmFkbWluLXBhbmVsLXJvb3QgY29kZSxcbiAgICAgIC5hZG1pbi1wYW5lbC1yb290IC5mb250LW1vbm8gKiB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiBcIkpldEJyYWlucyBNb25vXCIsIHVpLW1vbm9zcGFjZSwgU0ZNb25vLVJlZ3VsYXIsIG1vbm9zcGFjZSAhaW1wb3J0YW50O1xuICAgICAgfVxuXG4gICAgICAvKiBLZWVwIG1vbm9zcGFjZSBlbGVtZW50cyAqL1xuICAgICAgLmZvbnQtbW9ubywgW2NsYXNzKj1cImZvbnQtbW9ub1wiXSwgcHJlLCBjb2RlLCAuZm9udC1tb25vICoge1xuICAgICAgICBmb250LWZhbWlseTogXCJKZXRCcmFpbnMgTW9ub1wiLCB1aS1tb25vc3BhY2UsIFNGTW9uby1SZWd1bGFyLCBtb25vc3BhY2UgIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgYm9keSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7aG9tZXBhZ2VDb25maWcudGhlbWUuYmFja2dyb3VuZENvbG9yIHx8ICcjMEIwRjFBJ30gIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgYnV0dG9uLCAucm91bmRlZC14bCwgLnJvdW5kZWQtMnhsLCAucm91bmRlZC0zeGwsIC5nbGFzcy1wYW5lbCB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWJ1dHRvbi1yYWRpdXMpICFpbXBvcnRhbnQ7XG4gICAgICB9XG4gICAgYDtcbiAgfSwgW2hvbWVwYWdlQ29uZmlnXSk7XG5cbiAgLy8gSGFuZGxlIHNlY3Rpb24ganVtcGluZ1xuICBjb25zdCBoYW5kbGVTY3JvbGxUb1NlY3Rpb24gPSAoc2VjdGlvbklkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VjdGlvbklkKTtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgY29uc3QgaGVhZGVyT2Zmc2V0ID0gODA7XG4gICAgICBjb25zdCBlbGVtZW50UG9zaXRpb24gPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgIGNvbnN0IG9mZnNldFBvc2l0aW9uID0gZWxlbWVudFBvc2l0aW9uICsgd2luZG93LnNjcm9sbFkgLSBoZWFkZXJPZmZzZXQ7XG4gICAgICBcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgIHRvcDogb2Zmc2V0UG9zaXRpb24sXG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFRvZ2dsZSBmYXZvcml0ZSBib29rbWFyayAo4p2k77iPKVxuICBjb25zdCBoYW5kbGVUb2dnbGVGYXZvcml0ZSA9IChpZDogc3RyaW5nLCBlOiBhbnkpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmIChmYXZvcml0ZXMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICBzZXRGYXZvcml0ZXMoZmF2b3JpdGVzLmZpbHRlcihmYXZJZCA9PiBmYXZJZCAhPT0gaWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0RmF2b3JpdGVzKFsuLi5mYXZvcml0ZXMsIGlkXSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIENsZWFyIGVudGlyZSBib29rbWFya3NcbiAgY29uc3QgaGFuZGxlQ2xlYXJGYXZvcml0ZXMgPSAoKSA9PiB7XG4gICAgc2V0RmF2b3JpdGVzKFtdKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGRUb0NhcnQgPSAocHJvZHVjdDogYW55LCB0eXBlOiAncHJvZHVjdCcgfCAnbW90b3JjeWNsZScgfCAnYWRkb24nID0gJ3Byb2R1Y3QnKSA9PiB7XG4gICAgc2V0Q2FydEl0ZW1zKHByZXYgPT4ge1xuICAgICAgY29uc3QgZXhpc3RpbmcgPSBwcmV2LmZpbmQoaXRlbSA9PiBpdGVtLmlkID09PSBwcm9kdWN0LmlkKTtcbiAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICByZXR1cm4gcHJldi5tYXAoaXRlbSA9PiBpdGVtLmlkID09PSBwcm9kdWN0LmlkID8geyAuLi5pdGVtLCBxdWFudGl0eTogaXRlbS5xdWFudGl0eSArIDEgfSA6IGl0ZW0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFsuLi5wcmV2LCB7IGlkOiBwcm9kdWN0LmlkLCBwcm9kdWN0LCB0eXBlLCBxdWFudGl0eTogMSB9XTtcbiAgICB9KTtcbiAgICBzZXRJc0NhcnRPcGVuKHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVVwZGF0ZUNhcnRRdWFudGl0eSA9IChpZDogc3RyaW5nLCBkZWx0YTogbnVtYmVyKSA9PiB7XG4gICAgc2V0Q2FydEl0ZW1zKHByZXYgPT4gcHJldi5tYXAoaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbS5pZCA9PT0gaWQpIHtcbiAgICAgICAgY29uc3QgbmV3USA9IGl0ZW0ucXVhbnRpdHkgKyBkZWx0YTtcbiAgICAgICAgcmV0dXJuIG5ld1EgPiAwID8geyAuLi5pdGVtLCBxdWFudGl0eTogbmV3USB9IDogaXRlbTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZW1vdmVDYXJ0SXRlbSA9IChpZDogc3RyaW5nKSA9PiB7XG4gICAgc2V0Q2FydEl0ZW1zKHByZXYgPT4gcHJldi5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkICE9PSBpZCkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNsZWFyQ2FydCA9ICgpID0+IHtcbiAgICBzZXRDYXJ0SXRlbXMoW10pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNoZWNrb3V0Q2FydCA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoY2FydEl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIGxldCBvcmRlclRleHQgPSBsYW5nID09PSAnYXInID8gJ9mF2LHYrdio2KfZi9iMINij2LHZitivINi32YTYqDpcXG5cXG4nIDogJ0hlbGxvLCBJIHdvdWxkIGxpa2UgdG8gb3JkZXI6XFxuXFxuJztcbiAgICBcbiAgICBsZXQgdG90YWwgPSAwO1xuICAgIGNvbnN0IG5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IGlkczogc3RyaW5nW10gPSBbXTtcbiAgICBjYXJ0SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBsYW5nID09PSAnYXInID8gKGl0ZW0ucHJvZHVjdC5uYW1lQXIgfHwgaXRlbS5wcm9kdWN0Lm5hbWUpIDogaXRlbS5wcm9kdWN0Lm5hbWU7XG4gICAgICBjb25zdCBwcmljZSA9IGl0ZW0ucHJvZHVjdC5wcmljZSB8fCBpdGVtLnByb2R1Y3QucHJpY2VOdW0gfHwgMDtcbiAgICAgIG9yZGVyVGV4dCArPSBgLSAke25hbWV9ICh4JHtpdGVtLnF1YW50aXR5fSkgPSAkeyhwcmljZSAqIGl0ZW0ucXVhbnRpdHkpLnRvTG9jYWxlU3RyaW5nKCl9ICR7bGFuZyA9PT0gJ2FyJyA/ICfYrC7ZhScgOiAnRUdQJ31cXG5gO1xuICAgICAgdG90YWwgKz0gcHJpY2UgKiBpdGVtLnF1YW50aXR5O1xuICAgICAgbmFtZXMucHVzaChgJHtuYW1lfSAoeCR7aXRlbS5xdWFudGl0eX0pYCk7XG4gICAgICBpZHMucHVzaChpdGVtLnByb2R1Y3QuaWQgfHwgJ1BST0RVQ1QnKTtcbiAgICB9KTtcbiAgICBcbiAgICBvcmRlclRleHQgKz0gYFxcbiR7bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2KXYrNmF2KfZhNmKOicgOiAnVG90YWw6J30gJHt0b3RhbC50b0xvY2FsZVN0cmluZygpfSAke2xhbmcgPT09ICdhcicgPyAn2Kwu2YUnIDogJ0VHUCd9XFxuYDtcbiAgICBcbiAgICBjb25zdCBvcmRlcklkID0gYFNUT1JFLU9SREVSLSR7RGF0ZS5ub3coKX1gO1xuICAgIGNvbnN0IHRpbWVzdGFtcFN0ciA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICBjb25zdCBkYXRlU3RyID0gdGltZXN0YW1wU3RyLnNwbGl0KCdUJylbMF07XG5cbiAgICBjb25zdCB0YXJnZXRQaG9uZSA9IGhvbWVwYWdlQ29uZmlnLmludm9pY2VXaGF0c2FwcE51bWJlciB8fCAnMjAxMjExMTE2NjMxJztcbiAgICBcbiAgICAvLyAxLiBQZXJzaXN0IHByb2R1Y3QgYm9va2luZyB0byBGaXJlc3RvcmVcbiAgICB0cnkge1xuICAgICAgYXdhaXQgc2V0RG9jKGRvYyhkYiwgJ2Jvb2tpbmdzJywgb3JkZXJJZCksIHtcbiAgICAgICAgY3VzdG9tZXJOYW1lOiBsYW5nID09PSAnYXInID8gJ9i32YTYqCDZhdiq2KzYsSAo2YjYp9iq2LPYp9ioKScgOiAnU3RvcmUgT3JkZXIgKFdBKScsXG4gICAgICAgIGN1c3RvbWVyUGhvbmU6IHRhcmdldFBob25lLFxuICAgICAgICBjdXN0b21lckVtYWlsOiAnY3VzdG9tZXJAZWxraG9seS5jb20nLFxuICAgICAgICBtb3RvcmN5Y2xlSWQ6IGlkcy5qb2luKCcsICcpLFxuICAgICAgICBtb3RvcmN5Y2xlTmFtZTogbmFtZXMuam9pbignLCAnKSxcbiAgICAgICAgdG90YWxQcmljZTogdG90YWwsXG4gICAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wU3RyLFxuICAgICAgICBkYXRlOiBkYXRlU3RyLFxuICAgICAgICBzdGF0dXM6ICdzb2xkJ1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJGaXJlc3RvcmUgc2F2ZSBvZiBzdG9yZSBvcmRlciBmYWlsZWQsIGZhbGxpbmcgYmFjayBncmFjZWZ1bGx5OlwiLCBlcnIpO1xuICAgIH1cblxuICAgIC8vIDIuIFBlcnNpc3QgYm9va2luZyB0byBsb2NhbFN0b3JhZ2Ugd2l0aCBjb21wbGV0ZSBkZXRhaWxzXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Vsa2hvbHlfYm9va2luZ3MnKTtcbiAgICAgIGNvbnN0IGV4aXN0aW5nID0gZXhpc3RpbmdTdHIgPyBKU09OLnBhcnNlKGV4aXN0aW5nU3RyKSA6IFtdO1xuICAgICAgY29uc3QgbmV3Qm9va2luZ09iaiA9IHtcbiAgICAgICAgaWQ6IG9yZGVySWQsXG4gICAgICAgIG1vdG9yY3ljbGVJZDogaWRzLmpvaW4oJywgJyksXG4gICAgICAgIG1vdG9yY3ljbGVOYW1lOiBuYW1lcy5qb2luKCcsICcpLFxuICAgICAgICBjYXRlZ29yeTogJ0EnLFxuICAgICAgICBwcmljZTogYCR7dG90YWwudG9Mb2NhbGVTdHJpbmcoKX0gRUdQYCxcbiAgICAgICAgbmFtZTogbGFuZyA9PT0gJ2FyJyA/ICfYt9mE2Kgg2YXYqtis2LEgKNmI2KfYqtiz2KfYqCknIDogJ1N0b3JlIE9yZGVyIChXQSknLFxuICAgICAgICBwaG9uZTogdGFyZ2V0UGhvbmUsXG4gICAgICAgIGVtYWlsOiAnY3VzdG9tZXJAZWxraG9seS5jb20nLFxuICAgICAgICBkYXRlOiBkYXRlU3RyLFxuICAgICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcFN0cixcbiAgICAgICAgc3RhdHVzOiAnc29sZCdcbiAgICAgIH07XG4gICAgICBleGlzdGluZy51bnNoaWZ0KG5ld0Jvb2tpbmdPYmopO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfYm9va2luZ3MnLCBKU09OLnN0cmluZ2lmeShleGlzdGluZykpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHBlcnNpc3RpbmcgYm9va2luZyBsb2NhbGx5OlwiLCBlcnIpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCB3YVVybCA9IGBodHRwczovL3dhLm1lLyR7dGFyZ2V0UGhvbmV9P3RleHQ9JHtlbmNvZGVVUklDb21wb25lbnQob3JkZXJUZXh0KX1gO1xuICAgIHdpbmRvdy5vcGVuKHdhVXJsLCAnX2JsYW5rJyk7XG4gIH07XG5cbiAgLy8gRmF2b3JpdGVzIGNvbGxlY3Rpb24gbGlzdCBsb29rdXBcbiAgY29uc3QgZmF2b3JpdGVCaWtlcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBtb3RvcmN5Y2xlc0RhdGEuZmlsdGVyKGJpa2UgPT4gZmF2b3JpdGVzLmluY2x1ZGVzKGJpa2UuaWQpKTtcbiAgfSwgW2Zhdm9yaXRlcywgbW90b3JjeWNsZXNEYXRhXSk7XG5cbiAgY29uc3QgZmF2b3JpdGVQcm9kdWN0cyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBzdG9yZVByb2R1Y3RzRGF0YS5maWx0ZXIocCA9PiBmYXZvcml0ZXMuaW5jbHVkZXMocC5pZCkpO1xuICB9LCBbZmF2b3JpdGVzLCBzdG9yZVByb2R1Y3RzRGF0YV0pO1xuXG4gIC8vIE9wZW4gYm9va2luZyBtb2RhbFxuICBjb25zdCBoYW5kbGVPcGVuQm9va2luZyA9IChpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNhdDogQ2F0ZWdvcnlTbHVnLCBwcmljZTogc3RyaW5nLCBlPzogYW55LCBzZWxlY3RlZEFkZE9uSWRzPzogc3RyaW5nW10pID0+IHtcbiAgICBpZiAoZSkgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBiaWtlID0gbW90b3JjeWNsZXNEYXRhLmZpbmQoYiA9PiBiLmlkID09PSBpZCk7XG4gICAgc2V0QWN0aXZlQm9va0l0ZW0oe1xuICAgICAgbW90b3JjeWNsZUlkOiBpZCxcbiAgICAgIG1vdG9yY3ljbGVOYW1lOiBuYW1lLFxuICAgICAgY2F0ZWdvcnk6IGNhdCxcbiAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgIHNlcmlhbENvZGU6IGJpa2U/LnNlcmlhbENvZGUsXG4gICAgICBwcmVTZWxlY3RlZEFkZE9uSWRzOiBzZWxlY3RlZEFkZE9uSWRzXG4gICAgfSk7XG4gIH07XG5cbiAgLy8gT3BlbiBQREYgYnJvY2h1cmVcbiAgY29uc3QgaGFuZGxlT3BlblBkZiA9IChiaWtlOiBNb3RvcmN5Y2xlLCBlOiBhbnkpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHNldEFjdGl2ZVBkZkl0ZW0oYmlrZSk7XG4gIH07XG5cbiAgLy8gRmlsdGVycyBjYWxjdWxhdGlvbiBsb2dpY1xuICBjb25zdCBpc0ZpbHRlckFjdGl2ZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICBmaWx0ZXJzLnNlYXJjaFF1ZXJ5LnRyaW0oKSAhPT0gJycgfHxcbiAgICAgIGZpbHRlcnMuY2F0ZWdvcnkgIT09ICdBTEwnIHx8XG4gICAgICBmaWx0ZXJzLnByaWNlUmFuZ2UgPCA1MDAwMDAwIHx8XG4gICAgICBzcGVlZFJhbmdlID4gMTAwIHx8XG4gICAgICBmaWx0ZXJzLm9ubHlQb3B1bGFyIHx8XG4gICAgICBmaWx0ZXJzLnNvcnRCeSAhPT0gJ2RlZmF1bHQnXG4gICAgKTtcbiAgfSwgW2ZpbHRlcnMsIHNwZWVkUmFuZ2VdKTtcblxuICBjb25zdCBmaWx0ZXJlZEJpa2VzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgbGV0IHJlc3VsdCA9IFsuLi5tb3RvcmN5Y2xlc0RhdGFdO1xuXG4gICAgLy8gU2VhcmNoIHF1ZXJ5IGNhbGN1bGF0aW9uXG4gICAgaWYgKGZpbHRlcnMuc2VhcmNoUXVlcnkudHJpbSgpICE9PSAnJykge1xuICAgICAgY29uc3QgcXVlcnkgPSBmaWx0ZXJzLnNlYXJjaFF1ZXJ5LnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXN1bHQgPSByZXN1bHQuZmlsdGVyKFxuICAgICAgICBiaWtlID0+XG4gICAgICAgICAgYmlrZS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpIHx8XG4gICAgICAgICAgYmlrZS50YWdsaW5lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpIHx8XG4gICAgICAgICAgYmlrZS5zaG9ydERlc2MudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSkgfHxcbiAgICAgICAgICBiaWtlLnNwZWNzLmVuZ2luZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBDYXRlZ29yeSBtYXBwaW5nXG4gICAgaWYgKGZpbHRlcnMuY2F0ZWdvcnkgIT09ICdBTEwnKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQuZmlsdGVyKGJpa2UgPT4gYmlrZS5jYXRlZ29yeSA9PT0gZmlsdGVycy5jYXRlZ29yeSk7XG4gICAgfVxuXG4gICAgLy8gUHJpY2Ugc2xpZGVyIGNvbnN0cmFpbnRcbiAgICByZXN1bHQgPSByZXN1bHQuZmlsdGVyKGJpa2UgPT4gYmlrZS5wcmljZU51bSA8PSBmaWx0ZXJzLnByaWNlUmFuZ2UpO1xuXG4gICAgLy8gU3BlZWQgc2xpZGVyIGNvbnN0cmFpbnRcbiAgICByZXN1bHQgPSByZXN1bHQuZmlsdGVyKGJpa2UgPT4ge1xuICAgICAgY29uc3Qgc3BlZWRWYWwgPSBwYXJzZUludChiaWtlLnNwZWNzLnRvcFNwZWVkLCAxMCk7XG4gICAgICByZXR1cm4gc3BlZWRWYWwgPj0gc3BlZWRSYW5nZTtcbiAgICB9KTtcblxuICAgIC8vIFBvcHVsYXIgc3dpdGNoXG4gICAgaWYgKGZpbHRlcnMub25seVBvcHVsYXIpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5maWx0ZXIoYmlrZSA9PiBiaWtlLmlzUG9wdWxhcik7XG4gICAgfVxuXG4gICAgLy8gU29ydGluZyBwYXJhbWV0ZXJzXG4gICAgaWYgKGZpbHRlcnMuc29ydEJ5ID09PSAncHJpY2UtYXNjJykge1xuICAgICAgcmVzdWx0LnNvcnQoKGEsIGIpID0+IGEucHJpY2VOdW0gLSBiLnByaWNlTnVtKTtcbiAgICB9IGVsc2UgaWYgKGZpbHRlcnMuc29ydEJ5ID09PSAncHJpY2UtZGVzYycpIHtcbiAgICAgIHJlc3VsdC5zb3J0KChhLCBiKSA9PiBiLnByaWNlTnVtIC0gYS5wcmljZU51bSk7XG4gICAgfSBlbHNlIGlmIChmaWx0ZXJzLnNvcnRCeSA9PT0gJ3NwZWVkLWRlc2MnKSB7XG4gICAgICByZXN1bHQuc29ydCgoYSwgYikgPT4gcGFyc2VJbnQoYi5zcGVjcy50b3BTcGVlZCwgMTApIC0gcGFyc2VJbnQoYS5zcGVjcy50b3BTcGVlZCwgMTApKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LCBbZmlsdGVycywgc3BlZWRSYW5nZSwgbW90b3JjeWNsZXNEYXRhXSk7XG5cbiAgLy8gUmVzZXQgaGVscGVyXG4gIGNvbnN0IGhhbmRsZVJlc2V0RmlsdGVycyA9ICgpID0+IHtcbiAgICBzZXRGaWx0ZXJzKHtcbiAgICAgIHNlYXJjaFF1ZXJ5OiAnJyxcbiAgICAgIGNhdGVnb3J5OiAnQUxMJyxcbiAgICAgIHByaWNlUmFuZ2U6IDUwMDAwMDAsXG4gICAgICBzb3J0Qnk6ICdkZWZhdWx0JyxcbiAgICAgIG9ubHlQb3B1bGFyOiBmYWxzZSxcbiAgICB9KTtcbiAgICBzZXRTcGVlZFJhbmdlKDEwMCk7XG4gIH07XG5cbiAgY29uc3QgY3VzdG9tU2VjdGlvbk1ldGEgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBtYXBBciA9IHtcbiAgICAgIEE6IHsgdGl0bGU6ICfZhdmI2KrZiNiz2YrZg9mE2KfYqiDYs9io2YjYsdiqINmB2KbYqSAoQSknLCBkZXNjOiAn2YjYrdmI2LQg2LHZitin2LbZitipINmH2KzZitmG2Kkg2YXYtdmF2YXYqSDZhNmE2KrYs9in2LHYuSDYp9mE2KfYs9iq2KvZhtin2KbZiiDZiNin2YTYqtit2YPZhSDYp9mE2YXYqtmB2YjZgiDYudmE2Ykg2K3ZhNio2KfYqiDYp9mE2LPYqNin2YIuJyB9LFxuICAgICAgQjogeyB0aXRsZTogJ9mF2YjYqtmI2LPZitmD2YTYp9iqINmD2LHZiNiy2LEg2YHYptipIChCKScsIGRlc2M6ICfZhdmE2YjZgyDYp9mE2LfYsdmK2YIg2YjYp9mE2KrYsdit2KfZhCDYp9mE2LfZiNmK2YQg2YXYuSDZhdmC2KfYudivINmI2KvZitix2Kkg2YjYsdmB2KfZh9mK2Kkg2YPYsdmI2LLYsSDZhdi52LLYstipINmH2YrYr9ix2YjZhNmK2YPZitin2YsuJyB9LFxuICAgICAgQzogeyB0aXRsZTogJ9iv2LHYp9is2KfYqiDYqtmI2LHZitmG2Kwg2YjYp9mE2LHYrdmE2KfYqiDZgdim2KkgKEMpJywgZGVzYzogJ9iv2LHYp9is2KfYqiDZhdiu2LXYtdipINmE2YTYt9ix2YIg2YjYp9mE2LHYrdmE2KfYqiDYp9mE2LfZiNmK2YTYqSDZgtin2K/YsdipINi52YTZiSDYudio2YjYsSDYp9mE2YXYs9in2YHYp9iqINmI2KfZhNiv2LHZiNioINio2KPZhdin2YYg2YXYqtmK2YYuJyB9LFxuICAgICAgUzogeyB0aXRsZTogJ9in2LPZg9mI2KrYsdin2Kog2LDZg9mK2Kkg2YHYptipIChTKScsIGRlc2M6ICfYo9iz2LfZiNix2Kkg2KfZhNiq2LHYrdin2YQg2KfZhNit2LbYsdmKINmI2KfZhNin2LPZg9mI2KrYsdin2Kog2KfZhNmD2YfYsdio2KfYptmK2Kkg2KfZhNiu2YHZitmB2Kkg2YjYp9mE2LPYsdmK2LnYqSDZhNmE2YXYr9mGINin2YTYrdiv2YrYq9ipINiv2YjZhiDYp9mG2KjYudin2KvYp9iqLicgfVxuICAgIH07XG4gICAgY29uc3QgbWFwRW4gPSB7XG4gICAgICBBOiB7IHRpdGxlOiAnU1BPUlQgU0VDLUEgRkxFRVQnLCBkZXNjOiAnQWVyb2R5bmFtaWMgdHJhY2sgcHJlZGF0b3JzIGJ1aWx0IGZvciBleHRyZW1lIHZlbG9jaXR5IGFuZCBpbnN0YW50IHBvd2VyIHJlc3BvbnNlLicgfSxcbiAgICAgIEI6IHsgdGl0bGU6ICdDUlVJU0VSIFNFQy1CIEZMRUVUJywgZGVzYzogJ1NvdmVyZWlnbnMgb2YgdGhlIG9wZW4gcm9hZCwgZmVhdHVyaW5nIHVsdHJhLWNvbWZvcnRhYmxlIHNlYXRpbmcgYW5kIG1hZ25ldGljIHN1c3BlbnNpb24uJyB9LFxuICAgICAgQzogeyB0aXRsZTogJ1RPVVJJTkcgU0VDLUMgRkxFRVQnLCBkZXNjOiAnSGVhdnktZHV0eSBwZXJmb3JtYW5jZSB0b3VyaW5nIHRvdXJlcnMgZW5naW5lZXJlZCB0byBieXBhc3MgZXh0cmVtZSBkaXN0YW5jZXMgYW5kIHJvYWQgdGVycmFpbnMuJyB9LFxuICAgICAgUzogeyB0aXRsZTogJ1NDT09URVIgU0VDLVMgRkxFRVQnLCBkZXNjOiAnRmlkZWxpdHkgbGlnaHR3ZWlnaHQgZWxlY3RyaWMgdmVoaWNsZXMgZGVzaWduZWQgZm9yIHNlYW1sZXNzLCBjYXJib24tbmV1dHJhbCBjaXR5IGNvbW11dGluZy4nIH1cbiAgICB9O1xuICAgIHJldHVybiBsYW5nID09PSAnYXInID8gbWFwQXIgOiBtYXBFbjtcbiAgfSwgW2xhbmddKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgbWluLWgtc2NyZWVuIGJnLVsjMEIwRjFBXSB0ZXh0LWdyYXktMjAwIG92ZXJmbG93LXgtaGlkZGVuIHNlbGVjdGlvbjpiZy1icmFuZC1hY2NlbnQgc2VsZWN0aW9uOnRleHQtWyMwQjBGMUFdIHRleHQtbGVmdFwiPlxuICAgICAgXG4gICAgICB7LyogRGVjb3JhdGl2ZSBjeWJlcm5ldGljIG92ZXJsYXkgc2NhbiBsaWdodHMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIHRvcC0wIGxlZnQtMCByaWdodC0wIGgtWzJweF0gYmctZ3JhZGllbnQtdG8tciBmcm9tLWJyYW5kLXByaW1hcnkvNDAgdmlhLWJyYW5kLWFjY2VudC81MCB0by1icmFuZC1zZWNvbmRhcnkvNDAgei01MCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cblxuICAgICAgey8qIEhFQURFUiBOQVZCQVIgKi99XG4gICAgICA8TmF2YmFyIFxuICAgICAgICBmYXZvcml0ZUNvdW50PXtmYXZvcml0ZXMubGVuZ3RofVxuICAgICAgICBjYXJ0SXRlbUNvdW50PXtjYXJ0SXRlbXMucmVkdWNlKChhY2MsIGl0ZW0pID0+IGFjYyArIGl0ZW0ucXVhbnRpdHksIDApfVxuICAgICAgICBjYXJ0VG90YWw9e2NhcnRJdGVtcy5yZWR1Y2UoKGFjYywgaXRlbSkgPT4gYWNjICsgKGl0ZW0ucHJvZHVjdC5wcmljZSAqIGl0ZW0ucXVhbnRpdHkpLCAwKX1cbiAgICAgICAgYWN0aXZlVmlldz17YWN0aXZlVmlld31cbiAgICAgICAgb25OYXZpZ2F0ZT17KHZpZXcpID0+IHtcbiAgICAgICAgICBzZXRBY3RpdmVWaWV3KHZpZXcpO1xuICAgICAgICAgIGlmICh2aWV3ID09PSAnaG9tZScpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICAgICAgb25PcGVuQ2FydD17KCkgPT4gc2V0SXNDYXJ0T3Blbih0cnVlKX1cbiAgICAgICAgb25PcGVuRmF2b3JpdGVzPXsoKSA9PiBzZXRGYXZvcml0ZXNPcGVuKHRydWUpfVxuICAgICAgICBvblNjcm9sbFRvU2VjdGlvbj17aGFuZGxlU2Nyb2xsVG9TZWN0aW9ufVxuICAgICAgICBvbk9wZW5Cb29raW5nPXsoaWQsIG5hbWUsIGNhdCwgcHJpY2UpID0+IGhhbmRsZU9wZW5Cb29raW5nKGlkLCBuYW1lLCBjYXQsIHByaWNlKX1cbiAgICAgICAgb25PcGVuQWRtaW49eygpID0+IHNldEFkbWluT3Blbih0cnVlKX1cbiAgICAgICAgaG9tZXBhZ2VDb25maWc9e2hvbWVwYWdlQ29uZmlnfVxuICAgICAgLz5cblxuICAgICAge2FjdGl2ZVZpZXcgPT09ICdob21lJyAmJiAoXG4gICAgICA8PlxuICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09IEhFUk8gQkFOTkVSIExBTkRJTkcgQ09NUE9ORU5UID09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgPHNlY3Rpb24gXG4gICAgICAgICAgaWQ9XCJob21lXCIgXG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgbWluLWgtc2NyZWVuIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB0LTI0IHBiLTEyIG92ZXJmbG93LWhpZGRlbiBiZy1jb3ZlciBiZy1jZW50ZXJcIlxuICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRJbWFnZTogYGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMTEsIDE1LCAyNiwgMC43KSwgcmdiYSgxMSwgMTUsIDI2LCAwLjk1KSksIHVybCgke2hvbWVwYWdlQ29uZmlnLmhlYWRlci5iYWNrZ3JvdW5kSW1hZ2UgfHwgSEVST19CR19JTUFHRX0pYCB9fVxuICAgICAgICA+XG4gICAgICAgIHsvKiBEeW5hbWljIGF0bW9zcGhlcmljIGFtYmllbnQgZ2xvdyBidWJibGVzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xLzQgbGVmdC0xLzEyIHctWzM1MHB4XSBoLVszNTBweF0gcm91bmRlZC1mdWxsIGJnLWJyYW5kLXByaW1hcnkvMTAgYmx1ci1bMTMwcHhdIHBvaW50ZXItZXZlbnRzLW5vbmUgYW5pbWF0ZS1wdWxzZS1zbG93IGZvbnQtc2Fuc1wiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTEvNCByaWdodC0xLzEyIHctWzMwMHB4XSBoLVszMDBweF0gcm91bmRlZC1mdWxsIGJnLWJyYW5kLWFjY2VudC8xNSBibHVyLVsxMjBweF0gcG9pbnRlci1ldmVudHMtbm9uZSBhbmltYXRlLXB1bHNlLXNsb3dcIiBzdHlsZT17eyBhbmltYXRpb25EZWxheTogJzJzJyB9fSAvPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggdy1mdWxsIHJlbGF0aXZlIHotMTAgZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTEyIGl0ZW1zLWNlbnRlclwiIGRpcj17ZGlyfT5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogSGVybyB0ZXh0IGRlc2NyaXB0b3IgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi0xMiB4bDpjb2wtc3Bhbi03IHNwYWNlLXktNiB0ZXh0LWxlZnRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHtob21lcGFnZUNvbmZpZy5oZWFkZXIubG9nb1VybCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNCBibG9ja1wiPlxuICAgICAgICAgICAgICAgIDxpbWcgXG4gICAgICAgICAgICAgICAgICBzcmM9e2hvbWVwYWdlQ29uZmlnLmhlYWRlci5sb2dvVXJsfSBcbiAgICAgICAgICAgICAgICAgIGFsdD1cIkJyYW5kIExvZ29cIiBcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YFxuICAgICAgICAgICAgICAgICAgICAke2hvbWVwYWdlQ29uZmlnLmhlYWRlci5sb2dvU2l6ZSA9PT0gJ3NtYWxsJyA/ICdoLTEwJyA6IGhvbWVwYWdlQ29uZmlnLmhlYWRlci5sb2dvU2l6ZSA9PT0gJ2xhcmdlJyA/ICdoLTIwJyA6ICdoLTE0J31cbiAgICAgICAgICAgICAgICAgICAgJHtob21lcGFnZUNvbmZpZy5oZWFkZXIubG9nb0VmZmVjdCA9PT0gJ2dsb3cnID8gJ3NoYWRvdy1bMF8wXzIwcHhfcmdiYSgzNCwyMTEsMjM4LDAuNildIGJvcmRlciBib3JkZXItWyMyMkQzRUVdLzMwIGJnLVsjMjJEM0VFXS81IHB4LTQgcHktMiByb3VuZGVkLTJ4bCcgOiAnJ31cbiAgICAgICAgICAgICAgICAgICAgJHtob21lcGFnZUNvbmZpZy5oZWFkZXIubG9nb0VmZmVjdCA9PT0gJ25lb24nID8gJ3NoYWRvdy1bMF8wXzI1cHhfcmdiYSgxNjgsODUsMjQ3LDAuNzMpXSBib3JkZXIgYm9yZGVyLVsjQTg1NUY3XS80MCBiZy1bI0E4NTVGN10vMTAgcHgtNCBweS0yIHJvdW5kZWQtMnhsJyA6ICcnfVxuICAgICAgICAgICAgICAgICAgICAke2hvbWVwYWdlQ29uZmlnLmhlYWRlci5sb2dvRWZmZWN0ID09PSAnc2hhZG93JyA/ICdzaGFkb3ctMnhsIHNoYWRvdy1ibGFjayBiZy1ibGFjay82MCBweC00IHB5LTIgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci13aGl0ZS81JyA6ICdweC0yIHB5LTEnfVxuICAgICAgICAgICAgICAgICAgICBvYmplY3QtY29udGFpbiBtYXgtdy1bMjgwcHhdIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBob3ZlcjpzY2FsZS0xMDVcbiAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTMgcHktMSBiZy13aGl0ZS9bMC4wNF0gYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLWZ1bGxcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaC0yIHctMiByb3VuZGVkLWZ1bGwgYmctWyMyMkQzRUVdIGFuaW1hdGUtcGluZ1wiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCB0ZXh0LVsjMjJEM0VFXSBmb250LWV4dHJhYm9sZCB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICB7Y3VzdG9tQmFkZ2VUZXh0fVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNHhsIHNtOnRleHQtNnhsIGZvbnQtYmxhY2sgZm9udC1zYW5zIHRyYWNraW5nLXRpZ2h0IHRleHQtd2hpdGUgdXBwZXJjYXNlIGxlYWRpbmctbm9uZVwiPlxuICAgICAgICAgICAgICB7Y3VzdG9tVGl0bGVUZXh0fSA8YnIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC10cmFuc3BhcmVudCBiZy1jbGlwLXRleHQgYmctZ3JhZGllbnQtdG8tciBmcm9tLWJyYW5kLXByaW1hcnkgdmlhLWJyYW5kLXNlY29uZGFyeSB0by1icmFuZC1hY2NlbnQgZ2xvdy1jeWFuXCI+XG4gICAgICAgICAgICAgICAge2N1c3RvbVRpdGxlQWNjZW50fVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2gxPlxuXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtbW9ubyB0ZXh0LWJyYW5kLWFjY2VudCB0cmFja2luZy13aWRlc3QgZm9udC1zZW1pYm9sZCBpdGFsaWNcIj5cbiAgICAgICAgICAgICAgXCJ7Y3VzdG9tSGVyb1Nsb2dhbn1cIlxuICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtYXgtdy14bCB0ZXh0LWJhc2UgdGV4dC1ncmF5LTQwMCBmb250LXNhbnMgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIHtjdXN0b21IZXJvRGVzY31cbiAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgey8qIENUQXMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC00IHB0LTJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNjcm9sbFRvU2VjdGlvbignZ2FsbGVyeScpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTggcHktMy41IHJvdW5kZWQteGwgZm9udC1tb25vIHRleHQteHMgdHJhY2tpbmctd2lkZXN0IGZvbnQtYm9sZCB0ZXh0LVsjMEIwRjFBXSBiZy1ncmFkaWVudC10by1yIGZyb20tYnJhbmQtcHJpbWFyeSB2aWEtYnJhbmQtc2Vjb25kYXJ5IHRvLWJyYW5kLWFjY2VudCBob3ZlcjpicmlnaHRuZXNzLTExNSBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgdGV4dC1jZW50ZXIgY3Vyc29yLXBvaW50ZXIgc2hhZG93LWxnIHNoYWRvdy1icmFuZC1wcmltYXJ5LzIwIGhvdmVyOnNoYWRvdy1icmFuZC1hY2NlbnQvMzAgdXBwZXJjYXNlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0KCdleHBsb3JlX3ZlaGljbGVzJyl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZU9wZW5Cb29raW5nKCdzcG9ydC1jeWJlcnNwb3J0LXY0JywgJ0VsS2hvbHkgQ3liZXJTcG9ydCBWNCcsICdBJywgJyQ0Miw1MDAnKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC04IHB5LTMuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItd2hpdGUvMTAgYmctd2hpdGUvWzAuMDNdIHRleHQtZ3JheS0zMDAgaG92ZXI6dGV4dC13aGl0ZSBob3Zlcjpib3JkZXItYnJhbmQtYWNjZW50IGZvbnQtbW9ubyB0ZXh0LXhzIHRyYWNraW5nLXdpZGVzdCBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgaG92ZXI6Ymctd2hpdGUvWzAuMDVdXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0KCdxdWlja19ib29rJyl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBTaWRlIHN0YXRpc3RpY3MgaW50ZXJhY3RpdmUgZGlhZ25vc3RpY3MgYm9hcmQgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi0xMiB4bDpjb2wtc3Bhbi01XCIgZGlyPVwibHRyXCI+XG4gICAgICAgICAgICA8bW90aW9uLmRpdiBcbiAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB4OiAyMCB9fVxuICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHg6IDAgfX1cbiAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkZWxheTogMC4zIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImdsYXNzLXBhbmVsIGJvcmRlciBib3JkZXItWyM2MzY2RjFdLzIwIHJvdW5kZWQtM3hsIHAtNiBzbTpwLTggc3BhY2UteS02IHJlbGF0aXZlIGJveC1nbG93LWluZGlnbyBvdmVyZmxvdy1oaWRkZW4gdGV4dC1sZWZ0XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgey8qIEJsdXIgcGFuZWwgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC0xMiAtcmlnaHQtMTIgdy0yNCBoLTI0IGJnLWJyYW5kLWFjY2VudC8xMCByb3VuZGVkLWZ1bGwgYmx1ci14bFwiIC8+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXdoaXRlL1swLjA4XSBwYi0zXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC1ncmF5LTQwMCBmb250LWJvbGQgdHJhY2tpbmctd2lkZXN0IGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICA8VGFyZ2V0IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1icmFuZC1hY2NlbnQgYW5pbWF0ZS1zcGluLXNsb3dcIiAvPiB7dCgncGVyZm9ybWFuY2VfdGl0bGUnKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgYmctYmxhY2svNTAgdGV4dC1bOXB4XSBmb250LW1vbm8gcm91bmRlZCBib3JkZXIgYm9yZGVyLXdoaXRlLzUgdGV4dC1ncmF5LTUwMCBmb250LWV4dHJhYm9sZCB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICAgIHt0KCdyZWFsX3RpbWVfc3lzJyl9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogU3RhdCBlbGVtZW50cyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTQgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgYmctYmxhY2svMzAgcC0zIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDNdXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3QgYmxvY2sgdXBwZXJjYXNlXCI+e3QoJ21heF9ob3JzZXBvd2VyJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCBmb250LW1vbm8gdGV4dC13aGl0ZSB0cmFja2luZy13aWRlc3RcIj4yNDAgSFAgLyAzMTAgTm08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtYnJhbmQtYWNjZW50IGZvbnQtYmxhY2sgdHJhY2tpbmctd2lkZXN0IGFuaW1hdGUtcHVsc2UgcHgtMiBweS0xIGJnLWJyYW5kLWFjY2VudC8xMCByb3VuZGVkXCI+TUFYPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgYmctYmxhY2svMzAgcC0zIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDNdXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3QgYmxvY2sgdXBwZXJjYXNlXCI+e3QoJ2NhcmJvbl9lbWlzc2lvbnMnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGVzdCB1cHBlcmNhc2VcIj57dCgnY2FyYm9uX2VtaXNzaW9uc192YWwnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtZ3JlZW4tNDAwIGZvbnQtYmxhY2sgdHJhY2tpbmctd2lkZXN0IHB4LTIgcHktMSBiZy1ncmVlbi01MDAvMTAgcm91bmRlZFwiPjEwMCUgRUNPPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgYmctYmxhY2svMzAgcC0zIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDNdXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3QgYmxvY2sgdXBwZXJjYXNlXCI+e3QoJ3RvcF9zcGVlZF9jYXAnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGVzdFwiPnt0KCd0b3Bfc3BlZWRfdmFsJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWJyYW5kLXNlY29uZGFyeSBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVzdCBweC0yIHB5LTEgYmctYnJhbmQtc2Vjb25kYXJ5LzEwIHJvdW5kZWRcIj5IWVBFUjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1tb25vIHRleHQtZ3JheS01MDAgdGV4dC1jZW50ZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNSBwdC0yIGJvcmRlci10IGJvcmRlci13aGl0ZS9bMC4wNV1cIj5cbiAgICAgICAgICAgICAgICA8U2hpZWxkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYnJhbmQtYWNjZW50IHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdXBwZXJjYXNlXCI+e3QoJ3dhcnJhbnR5X2luZm8nKX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFNjcm9sbCBoZWxwZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTggbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWdyYXktNTAwIGFuaW1hdGUtYm91bmNlIHBvaW50ZXItZXZlbnRzLW5vbmUgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2KfZhtiy2YQg2YTYo9iz2YHZhCDZhNi52LHYtiDYtdin2YTYqSDYp9mE2KPZhNi52KfYqCcgOiAnU0NST0xMIEZPUiBTSE9XUk9PTSd9PC9zcGFuPlxuICAgICAgICAgIDxBcnJvd0Rvd24gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWJyYW5kLWFjY2VudFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09IERZTkFNSUMgUEFHRSBCVUlMREVSIENVU1RPTSBIVE1MIFNFQ1RJT04gPT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAge2hvbWVwYWdlQ29uZmlnLmhlYWRlci5jdXN0b21IdG1sICYmIChcbiAgICAgICAgPHNlY3Rpb24gXG4gICAgICAgICAgY2xhc3NOYW1lPVwicHktMTIgYm9yZGVyLXkgYm9yZGVyLXdoaXRlL1swLjA0XSBiZy13aGl0ZS9bMC4wMV0gcmVsYXRpdmUgei0yMFwiXG4gICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBob21lcGFnZUNvbmZpZy5oZWFkZXIuY3VzdG9tSHRtbCB9fVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PSBTSE9XUk9PTSBDT05URU5UIFNFQ1RJT04gPT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgPHNlY3Rpb24gaWQ9XCJjYXRlZ29yaWVzXCIgY2xhc3NOYW1lPVwicHktMjAgbWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcmVsYXRpdmUgei0xMFwiIGRpcj17ZGlyfT5cbiAgICAgICAgXG4gICAgICAgIHsvKiBEeW5hbWljIGNvbnRyb2xzIGFuZCBsaXN0IHN0cnVjdHVyZSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi0xMlwiPlxuICAgICAgICAgIDxGaWx0ZXJTZWN0aW9uIFxuICAgICAgICAgICAgZmlsdGVycz17ZmlsdGVyc31cbiAgICAgICAgICAgIG9uRmlsdGVyQ2hhbmdlPXtzZXRGaWx0ZXJzfVxuICAgICAgICAgICAgc3BlZWRSYW5nZT17c3BlZWRSYW5nZX1cbiAgICAgICAgICAgIG9uU3BlZWRSYW5nZUNoYW5nZT17c2V0U3BlZWRSYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09IFNISU5ZIEJFTlRPIFNFQ1RJT05TIENPTlRBSU5FUiA9PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTYgbWItMTYgcmVsYXRpdmUgei0xMFwiIGRpcj17ZGlyfT5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogQkVOVE8gQ0FSRCAxOiBDQVRFR09SSUVTIFNFTEVDVE9SIEJPQVJEIChjb2wtc3Bhbi0xMiBsZzpjb2wtc3Bhbi0zKSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTMgYmctd2hpdGUvNSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtMnhsIHAtNSBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBiYWNrZHJvcC1ibHVyLXNtIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBncm91cCB0ZXh0LWxlZnRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIGxlZnQtMCB3LTE2IGgtMTYgYmctZ3JhZGllbnQtdG8tdHIgZnJvbS1icmFuZC1zZWNvbmRhcnkvNSB0by10cmFuc3BhcmVudCBibHVyLXhsIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHVwcGVyY2FzZSB0cmFja2luZy1bMC4zZW1dIHRleHQtYnJhbmQtc2Vjb25kYXJ5IGZvbnQtYm9sZCBtYi00IGZvbnQtbW9ub1wiPntsYW5nID09PSAnYXInID8gJ9iq2YjYtdmK2YEg2KfZhNmB2KbYp9iqINin2YTYrdin2YTZitipJyA6ICdTZWxlY3QgQ2F0ZWdvcnknfTwvaDM+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgeyhbXG4gICAgICAgICAgICAgICAgICB7IGNvZGU6ICdBTEwnLCBsYWJlbDogdCgnY2F0X0FMTCcpLCBkZXNjOiBsYW5nID09PSAnYXInID8gJ9i52LHYtiDYp9mE2YAgMTYg2LfYsdin2LIg2KjYp9mE2YPYp9mF2YQnIDogJ1Nob3cgYWxsIGN5YmVyIG1vZGVscycgfSxcbiAgICAgICAgICAgICAgICAgIHsgY29kZTogJ0EnLCBsYWJlbDogdCgnY2F0X0EnKSwgZGVzYzogbGFuZyA9PT0gJ2FyJyA/ICfYp9mE2LHZitin2LbZitipINin2YTYp9iz2KrYq9mG2KfYptmK2Kkg2KfZhNit2LHYqScgOiAnQWVyb2R5bmFtaWMgUHJlZGF0b3JzJyB9LFxuICAgICAgICAgICAgICAgICAgeyBjb2RlOiAnQicsIGxhYmVsOiB0KCdjYXRfQicpLCBkZXNjOiBsYW5nID09PSAnYXInID8gJ9ix2K3ZhNin2Kog2YXZhNmI2YMg2KfZhNi32LHZitmCINin2YTYs9ix2YrYuScgOiAnU292ZXJlaWducyBvZiBIaWdod2F5JyB9LFxuICAgICAgICAgICAgICAgICAgeyBjb2RlOiAnQycsIGxhYmVsOiB0KCdjYXRfQycpLCBkZXNjOiBsYW5nID09PSAnYXInID8gJ9mF2LrYp9mF2LHYp9iqINiq2K7Yqtix2YIg2KfZhNii2YHYp9mCINin2YTYsdmF2YTZitipJyA6ICdVbmNoYXJ0ZWQgSG9yaXpvbnMnIH0sXG4gICAgICAgICAgICAgICAgICB7IGNvZGU6ICdTJywgbGFiZWw6IHQoJ2NhdF9TJyksIGRlc2M6IGxhbmcgPT09ICdhcicgPyAn2KfYs9mD2YjYqtixINin2YTZhdiv2YYg2KfZhNiw2YPZitipINin2YTZhdmI2YHYsScgOiAnTmVvLVVyYmFuIE1vYmlsaXR5JyB9XG4gICAgICAgICAgICAgICAgXSBhcyBjb25zdCkubWFwKChjYXQpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gZmlsdGVycy5jYXRlZ29yeSA9PT0gY2F0LmNvZGU7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAgICAgIGtleT17Y2F0LmNvZGV9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RmlsdGVycyh7IC4uLmZpbHRlcnMsIGNhdGVnb3J5OiBjYXQuY29kZSB9KX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTMgYm9yZGVyIHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWJyYW5kLXByaW1hcnkvMjAgYm9yZGVyLWJyYW5kLXByaW1hcnkvNTAgdGV4dC13aGl0ZSBzaGFkb3ctbWQnIFxuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy13aGl0ZS9bMC4wMl0gYm9yZGVyLXdoaXRlLzUgaG92ZXI6Ym9yZGVyLWJyYW5kLWFjY2VudC81MCB0ZXh0LWdyYXktMzAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gdHJhY2tpbmctd2lkZSB1cHBlcmNhc2VcIj57Y2F0LmxhYmVsfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTUwMCBmb250LXNhbnMgbXQtMC41XCI+e2NhdC5kZXNjfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LVsjMjJEM0VFXSB0ZXh0LXNtIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMCAke2lzQWN0aXZlID8gKGRpciA9PT0gJ3J0bCcgPyAnLXRyYW5zbGF0ZS14LTEgcm90YXRlLTE4MCcgOiAndHJhbnNsYXRlLXgtMScpIDogJ29wYWNpdHktMCd9YH0+4oaSPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBBY3RpdmUgUHJvbW90aW9uIFNlY3Rpb24gKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTYgcC00IGJnLWdyYWRpZW50LXRvLXQgZnJvbS1icmFuZC1hY2NlbnQvMTAgdG8tdHJhbnNwYXJlbnQgYm9yZGVyIGJvcmRlci1icmFuZC1hY2NlbnQvMjAgcm91bmRlZC14bCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gdGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtNiAtcmlnaHQtNiB3LTEyIGgtMTIgYmctYnJhbmQtYWNjZW50LzUgcm91bmRlZC1mdWxsIGJsdXItbWRcIiAvPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgZm9udC1ib2xkIHRleHQtYnJhbmQtYWNjZW50IG1iLTEgdHJhY2tpbmctd2lkZXN0IGZvbnQtbW9ub1wiPnt0KCdhY3RpdmVfb2ZmZXInKX08L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCI+e3QoJ2ZyZWVfc2VydmljZScpfTwvcD5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTQwMCBmb250LW1vbm8gbXQtMC41XCI+e3QoJ3ZhbGlkX3V0aWwnKX08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBCRU5UTyBDQVJEIDI6IEJJRyBGTEFHU0hJUCBCSUtFIEhFUk8gRElTUExBWSAoY29sLXNwYW4tMTIgbGc6Y29sLXNwYW4tNikgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi02IG1pbi1oLVszODBweF0gcmVsYXRpdmUgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1bIzBmMTcyYV0gdG8tWyMxZTFiNGJdIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC0zeGwgb3ZlcmZsb3ctaGlkZGVuIGdyb3VwIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHAtNiBzaGFkb3ctMnhsIHRleHQtbGVmdFwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgIHsvKiBBbWJpZW50IG92ZXJsYXkgYmFja2dyb3VuZCBpbWFnZSAqL31cbiAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctY292ZXIgYmctY2VudGVyIG1peC1ibGVuZC1vdmVybGF5IG9wYWNpdHktMzAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMTAwMCBncm91cC1ob3ZlcjpzY2FsZS0xMDVcIlxuICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtmbGFnc2hpcEJpa2UuaW1hZ2V9KWAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7LyogVmlzdWFsIGJvdHRvbSBjb250cmFzdCBzaGFkb3cgb3ZlcmxheSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by10IGZyb20tYmxhY2sgdmlhLWJsYWNrLzQwIHRvLXRyYW5zcGFyZW50IHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuXG4gICAgICAgICAgICB7LyogSGVhZGVyIC8gc3BlY3MgbGFiZWxzICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwIGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTMgcHktMSBiZy1bIzYzNjZGMV0gdGV4dC1bMTBweF0gZm9udC1ib2xkIHRyYWNraW5nLXdpZGVzdCByb3VuZGVkLWZ1bGwgc2hhZG93LVswXzBfMTBweF9yZ2JhKDk5LDEwMiwyNDEsMC41KV0gZm9udC1tb25vIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICAgICAge2ZpbHRlcnMuY2F0ZWdvcnkgPT09ICdBTEwnID8gJ0ZMQUdTSElQIDIwMjYnIDogYFBPUFVMQVIgSU4gJHt0KCdjYXRfJyArIGZpbHRlcnMuY2F0ZWdvcnkpfWB9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNHhsIHNtOnRleHQtNXhsIGZvbnQtYmxhY2sgaXRhbGljIHRyYWNraW5nLXRpZ2h0ZXIgbXQtNCB0ZXh0LXdoaXRlIHVwcGVyY2FzZSBmb250LXNhbnNcIiBkaXI9XCJsdHJcIj5cbiAgICAgICAgICAgICAgICB7ZmxhZ3NoaXBCaWtlLm5hbWUucmVwbGFjZSgnRWxLaG9seSAnLCAnJyl9IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtdHJhbnNwYXJlbnQgYmctY2xpcC10ZXh0IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1icmFuZC1hY2NlbnQgdG8tYnJhbmQtc2Vjb25kYXJ5XCI+U1BFQzwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtZ3JheS0zMDAgbWF4LXctbWQgbXQtMiBmb250LW1lZGl1bSBsZWFkaW5nLXJlbGF4ZWQgZm9udC1zYW5zXCI+XG4gICAgICAgICAgICAgICAge2ZsYWdzaGlwQmlrZS5zaG9ydERlc2N9XG4gICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICB7LyogQ29yZSBTcGVjcyByb3cgbWV0cmljcyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC00IG1heC13LXNtIG10LTVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlL1swLjAzXSBib3JkZXIgYm9yZGVyLXdoaXRlLzUgcm91bmRlZC14bCBwLTIuNSBmb250LW1vbm8gdGV4dC1bOXB4XSB0ZXh0LWdyYXktNDAwIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdXBwZXJjYXNlIHRleHQtZ3JheS01MDBcIj57dCgnZHJpdmVfZW5naW5lJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LWJvbGQgdHJ1bmNhdGUgYmxvY2sgbXQtMC41XCIgZGlyPVwibHRyXCI+e2ZsYWdzaGlwQmlrZS5zcGVjcy5lbmdpbmUuc3BsaXQoJyAnKVswXX0gRHJpdmU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZS9bMC4wM10gYm9yZGVyIGJvcmRlci13aGl0ZS81IHJvdW5kZWQteGwgcC0yLjUgZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1ncmF5LTQwMCB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHVwcGVyY2FzZSB0ZXh0LWdyYXktNTAwXCI+e3QoJ2Nsb2NrX3NwZWVkJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1icmFuZC1hY2NlbnQgZm9udC1ibGFjayBibG9jayBtdC0wLjVcIiBkaXI9XCJsdHJcIj57ZmxhZ3NoaXBCaWtlLnNwZWNzLnRvcFNwZWVkfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFByaWNlIHRhZyArIENUQSBhY3Rpb25zICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtdC04IHB0LTQgYm9yZGVyLXQgYm9yZGVyLXdoaXRlL1swLjA4XVwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LVsjMjJEM0VFXSBkcm9wLXNoYWRvdy1bMF8wXzhweF9yZ2JhKDM0LDIxMSwyMzgsMC40KV1cIj5cbiAgICAgICAgICAgICAgICAgIHtmb3JtYXRBcHBQcmljZShmbGFnc2hpcEJpa2UucHJpY2VOdW0pfVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRleHQtZ3JheS01NTAgZm9udC1tb25vIGZvbnQtYm9sZCBtdC0wLjVcIj57dCgnc3RhcnRpbmdfcHJpY2UnKX08L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTIuNVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiBoYW5kbGVUb2dnbGVGYXZvcml0ZShmbGFnc2hpcEJpa2UuaWQsIGUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMSBoLTExIGJnLXdoaXRlLzUgYmFja2Ryb3AtYmx1ci1tZCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBjdXJzb3ItcG9pbnRlciBob3ZlcjpiZy13aGl0ZS8xNSB0cmFuc2l0aW9uLWFsbCB0ZXh0LXNtIHJlbGF0aXZlXCJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiQm9va21hcmsgRmxhZ3NoaXBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17ZmF2b3JpdGVzLmluY2x1ZGVzKGZsYWdzaGlwQmlrZS5pZCkgPyBcInRleHQtcmVkLTUwMCBzY2FsZS0xMTBcIiA6IFwidGV4dC1ncmF5LTQwMFwifT5cbiAgICAgICAgICAgICAgICAgICAge2Zhdm9yaXRlcy5pbmNsdWRlcyhmbGFnc2hpcEJpa2UuaWQpID8gJ+KdpO+4jycgOiAn8J+kjSd9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd0ZsYWdzaGlwU3BlY3ModHJ1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC02IHB5LTIuNSBiZy13aGl0ZSB0ZXh0LWJsYWNrIGZvbnQtZXh0cmFib2xkIHVwcGVyY2FzZSB0ZXh0LXhzIHJvdW5kZWQtZnVsbCBob3ZlcjpiZy1icmFuZC1hY2NlbnQgaG92ZXI6dGV4dC1ibGFjayB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IHNoYWRvdy1tZFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3QoJ2V4cGxvcmVfc3BlY3MnKS50b1VwcGVyQ2FzZSgpfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogRlJPU1RFRCBCTFVFUFJJTlQgU1BFQ0lGSUNBVElPTlMgT1ZFUkxBWSAqL31cbiAgICAgICAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgICAgICAgIHtzaG93RmxhZ3NoaXBTcGVjcyAmJiAoXG4gICAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgc2NhbGU6IDAuOTYgfX1cbiAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgc2NhbGU6IDEgfX1cbiAgICAgICAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCwgc2NhbGU6IDAuOTYgfX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei0yMCBiZy1ibGFjay85NSBiYWNrZHJvcC1ibHVyLW1kIHAtNiBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiXG4gICAgICAgICAgICAgICAgICBkaXI9e2Rpcn1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXdoaXRlL1swLjA4XSBwYi0zXCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXN0IHRleHQtYnJhbmQtYWNjZW50IHVwcGVyY2FzZSBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3QoJ3NwZWNpZmljYXRpb25zJyl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGUgZm9udC1zYW5zIG10LTAuNVwiIGRpcj1cImx0clwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2ZsYWdzaGlwQmlrZS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd0ZsYWdzaGlwU3BlY3MoZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBiZy13aGl0ZS81IGZvbnQtbW9ubyB0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0KCdmbGlwX2JhY2snKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBDb250ZW50IGdyaWQgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTMuNSBteS00IG92ZXJmbG93LXktYXV0byBtYXgtaC1bMjAwcHhdIGZvbnQtbW9ubyB0ZXh0LXhzIHByLTFcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wNF0gcm91bmRlZC14bCBiZy13aGl0ZS9bMC4wMV0gdGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDAgdGV4dC1bOXB4XSBibG9jayB1cHBlcmNhc2UgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0KCdkcml2ZV9lbmdpbmUnKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIGJsb2NrIG10LTFcIiBkaXI9XCJsdHJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtmbGFnc2hpcEJpa2Uuc3BlY3MuZW5naW5lfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA0XSByb3VuZGVkLXhsIGJnLXdoaXRlL1swLjAxXSB0ZXh0LWxlZnRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMCB0ZXh0LVs5cHhdIGJsb2NrIHVwcGVyY2FzZSBmb250LWJvbGQgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3QoJ2Nsb2NrX3NwZWVkJyl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1icmFuZC1hY2NlbnQgYmxvY2sgbXQtMVwiIGRpcj1cImx0clwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2ZsYWdzaGlwQmlrZS5zcGVjcy50b3BTcGVlZH1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wNF0gcm91bmRlZC14bCBiZy13aGl0ZS9bMC4wMV0gdGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDAgdGV4dC1bOXB4XSBibG9jayB1cHBlcmNhc2UgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0KCdlbmVyZ3lfY29uc3VtcHRpb24nKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIGJsb2NrIG10LTFcIiBkaXI9XCJsdHJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtmbGFnc2hpcEJpa2Uuc3BlY3MuZnVlbENvbnN1bXB0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA0XSByb3VuZGVkLXhsIGJnLXdoaXRlL1swLjAxXSB0ZXh0LWxlZnRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMCB0ZXh0LVs5cHhdIGJsb2NrIHVwcGVyY2FzZSBmb250LWJvbGQgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3QoJ291dHB1dF9jYXBhY2l0eScpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtYnJhbmQtc2Vjb25kYXJ5IGJsb2NrIG10LTFcIiBkaXI9XCJsdHJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtmbGFnc2hpcEJpa2Uuc3BlY3MucG93ZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogSW50ZWdyYXRlZCBkeW5hbWljIGRlc2NyaXB0aW9uIGJsb2NrICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zcGFuLTIgcC0zIGJnLXdoaXRlL1swLjAxXSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA0XSByb3VuZGVkLXhsIGZvbnQtc2FucyB0ZXh0LXhzIHRleHQtZ3JheS0zMDAgbGVhZGluZy1yZWxheGVkIHRleHQtbGVmdFwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtd2hpdGUgdGV4dC1bOS41cHhdIGZvbnQtbW9ubyB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgbWItMVwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9in2YTZiNi12YEg2KfZhNmD2KfZhdmEJyA6ICdGVUxMIFNQRUNJRklDQVRJT04gU1RPUlknfVxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/IChmbGFnc2hpcEJpa2UuZGVzY0FyIHx8IGZsYWdzaGlwQmlrZS5zaG9ydERlc2MpIDogKGZsYWdzaGlwQmlrZS5sb25nRGVzYyB8fCBmbGFnc2hpcEJpa2Uuc2hvcnREZXNjKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBGb290ZXIgY2hlY2tvdXQgY29udHJvbHMgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTMgYm9yZGVyLXQgYm9yZGVyLXdoaXRlL1swLjA4XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTUwMCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IHVwcGVyY2FzZVwiPnt0KCdzdGFydGluZ19wcmljZScpfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1icmFuZC1hY2NlbnQgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm1hdEFwcFByaWNlKGZsYWdzaGlwQmlrZS5wcmljZU51bSl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dGbGFnc2hpcFNwZWNzKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZU9wZW5Cb29raW5nKGZsYWdzaGlwQmlrZS5pZCwgZmxhZ3NoaXBCaWtlLm5hbWUsIGZsYWdzaGlwQmlrZS5jYXRlZ29yeSwgZmxhZ3NoaXBCaWtlLnByaWNlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTUgcHktMiBiZy1ncmFkaWVudC10by1yIGZyb20tYnJhbmQtcHJpbWFyeSB0by1icmFuZC1hY2NlbnQgdGV4dC13aGl0ZSBmb250LWV4dHJhYm9sZCB1cHBlcmNhc2UgdGV4dC1bMTBweF0gcm91bmRlZC1mdWxsIGhvdmVyOmJyaWdodG5lc3MtMTEwIGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IHNoYWRvdy1tZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0KCdib29rX25vdycpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBCRU5UTyBDQVJEIDM6IFJFU0VSVkFUSU9OIFRFUk1JTkFMIElOUFVUIFRJTEUgKGNvbC1zcGFuLTEyIGxnOmNvbC1zcGFuLTMpICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tMyBiZy13aGl0ZS81IGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC0yeGwgcC01IGJhY2tkcm9wLWJsdXItbGcgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIHctMjQgaC0yNCBiZy1icmFuZC1hY2NlbnQvNSByb3VuZGVkLWZ1bGwgYmx1ci0yeGwgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCB0ZXh0LWNlbnRlciBtYi01IHRleHQtWyMyMkQzRUVdIGZvbnQtbW9ub1wiPnt0KCdkaWdpdGFsX3Jlc2VydmF0aW9uJyl9PC9oMz5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zLjVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSB0ZXh0LWxlZnRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB1cHBlcmNhc2UgdGV4dC1ncmF5LTUwMCB0cmFja2luZy13aWRlciBmb250LW1vbm8gYmxvY2tcIj57dCgnZnVsbF9uYW1lJyl9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ2Z1bGxfbmFtZV9wbGFjZWhvbGRlcicpfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YmVudG9Cb29raW5nTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCZW50b0Jvb2tpbmdOYW1lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLWJsYWNrLzQwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC14cyB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItWyM2MzY2RjFdIHBsYWNlaG9sZGVyLWdyYXktNjAwIHRyYW5zaXRpb24tY29sb3JzIGZvbnQtc2FucyB0ZXh0LWxlZnRcIiBkaXI9e2Rpcn1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgYmxvY2sgdGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdXBwZXJjYXNlIHRleHQtZ3JheS01MDAgdHJhY2tpbmctd2lkZXIgZm9udC1tb25vIGJsb2NrXCI+e3QoJ2NvbnRhY3RfbnVtYmVyJyl9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRlbFwiIFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dCgncGhvbmVfcGxhY2Vob2xkZXInKX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2JlbnRvQm9va2luZ1Bob25lfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJlbnRvQm9va2luZ1Bob25lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLWJsYWNrLzQwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC14cyB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItWyM2MzY2RjFdIHBsYWNlaG9sZGVyLWdyYXktNjAwIHRyYW5zaXRpb24tY29sb3JzIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctYnJhbmQtc2Vjb25kYXJ5LzEwIGJvcmRlciBib3JkZXItYnJhbmQtc2Vjb25kYXJ5LzIwIHJvdW5kZWQteGwgbXQtMyB0ZXh0LWxlZnRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQtWzEwcHhdIGZvbnQtYm9sZCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMFwiPnt0KCd0YXJnZXRfbW9kZWwnKX06PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJyYW5kLXNlY29uZGFyeSB0cnVuY2F0ZSBtYXgtdy1bMTIwcHhdIGZvbnQtc2Fuc1wiIGRpcj1cImx0clwiPntmbGFnc2hpcEJpa2UubmFtZS5yZXBsYWNlKCdFbEtob2x5ICcsICcnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gZm9udC1ib2xkIGZvbnQtbW9ubyBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDBcIj57dCgnZXN0aW1hdGVkX3ByaWNlJyl9Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1icmFuZC1zZWNvbmRhcnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0QXBwUHJpY2UoZmxhZ3NoaXBCaWtlLnByaWNlTnVtKX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQmVudG9Cb29raW5nU3VibWl0fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0zLjUgYmctZ3JhZGllbnQtdG8tciBmcm9tLVsjMjJEM0VFXSB0by1bIzYzNjZGMV0gdGV4dC1ibGFjayBmb250LWJsYWNrIHVwcGVyY2FzZSB0ZXh0LXhzIHRyYWNraW5nLXdpZGVyIHJvdW5kZWQteGwgc2hhZG93LVswXzBfMjBweF9yZ2JhKDM0LDIxMSwyMzgsMC4zKV0gaG92ZXI6YnJpZ2h0bmVzcy0xMTAgYWN0aXZlOnNjYWxlLTk1IHRyYW5zaXRpb24tYWxsIG10LTUgY3Vyc29yLXBvaW50ZXIgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0KCdjb25maXJtX3doYXRzYXBwJyl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVs4cHhdIHRleHQtY2VudGVyIHRleHQtZ3JheS02MDAgbXQtMyB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IGZvbnQtbW9ub1wiPlNFQ1VSRSBHUFJTIEVOQ1JZUFRJT04gQUNUSVZFIHYyLjI2PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIER5bmFtaWMgcmVuZGVyIHN3aXRjaCAqL31cbiAgICAgICAgPEFuaW1hdGVQcmVzZW5jZSBtb2RlPVwid2FpdFwiPlxuICAgICAgICAgIHtpc0ZpbHRlckFjdGl2ZSA/IChcbiAgICAgICAgICAgIC8vIFVuaWZpZWQgZ3JpZCB2aWV3IGZvciBmaWx0ZXJlZCBvdXRwdXRzXG4gICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICBrZXk9XCJmaWx0ZXJlZC1zaG93cm9vbS1yZXN1bHRzXCJcbiAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSB9fVxuICAgICAgICAgICAgICBleGl0PXt7IG9wYWNpdHk6IDAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3BhY2UteS04XCJcbiAgICAgICAgICAgICAgZGlyPXtkaXJ9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIGJvcmRlci1iIGJvcmRlci13aGl0ZS9bMC4wNl0gcGItM1wiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC14cyB0ZXh0LWJyYW5kLWFjY2VudCBmb250LWJvbGQgdHJhY2tpbmctd2lkZXN0IHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICAgICAge3QoJ21hdGNoaW5nX3ZlaGljbGVzJywgeyBjb3VudDogZmlsdGVyZWRCaWtlcy5sZW5ndGggfSl9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJlc2V0RmlsdGVyc31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtZ3JheS00NTAgaG92ZXI6dGV4dC13aGl0ZSB1bmRlcmxpbmUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHt0KCdjbGVhcl9maWx0ZXJzJyl9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHtmaWx0ZXJlZEJpa2VzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIHhsOmdyaWQtY29scy00IGdhcC04XCI+XG4gICAgICAgICAgICAgICAgICB7ZmlsdGVyZWRCaWtlcy5tYXAoKGJpa2UpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPE1vdG9yY3ljbGVDYXJkIFxuICAgICAgICAgICAgICAgICAgICAgIGtleT17YmlrZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICBiaWtlPXtiaWtlfVxuICAgICAgICAgICAgICAgICAgICAgIGlzRmF2b3JpdGU9e2Zhdm9yaXRlcy5pbmNsdWRlcyhiaWtlLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgICBvblRvZ2dsZUZhdm9yaXRlPXtoYW5kbGVUb2dnbGVGYXZvcml0ZX1cbiAgICAgICAgICAgICAgICAgICAgICBvbk9wZW5QZGY9e2hhbmRsZU9wZW5QZGZ9XG4gICAgICAgICAgICAgICAgICAgICAgb25PcGVuQm9va2luZz17aGFuZGxlT3BlbkJvb2tpbmd9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAvLyBDbGVhbiBlbXB0eSBkaWFnbm9zdGljcyBzY3JlZW5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHB5LTIwIGJnLXdoaXRlL1swLjAxXSBib3JkZXIgYm9yZGVyLXdoaXRlLzUgcm91bmRlZC0zeGwgcC02XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgPEJpa2UgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHRleHQtZ3JheS02MDAgbXgtYXV0byBtYi00IGFuaW1hdGUtYm91bmNlXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtd2hpdGUgdXBwZXJjYXNlIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAge3QoJ2VtcHR5X3Nob3dyb29tJyl9XG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS00MDAgbWF4LXctc20gbXgtYXV0byBmb250LXNhbnMgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0KCdlbXB0eV9kZXNjJyl9XG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJlc2V0RmlsdGVyc31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtNiBweC02IHB5LTIuNSByb3VuZGVkLXhsIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCBiZy1ncmFkaWVudC10by1yIGZyb20tYnJhbmQtcHJpbWFyeSB0by1icmFuZC1hY2NlbnQgdGV4dC13aGl0ZSB1cHBlcmNhc2UgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7dCgncmVzZXRfc2hpZWxkJyl9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgLy8gRGVmYXVsdCA0IHNlY3Rpb25zIHN0cnVjdHVyZSAoQSwgQiwgQywgUykgd2hpY2ggY29tcGxpZXMgZXhhY3RseSB0byB1c2VyIHNwZWNpZmljYXRpb25zXG4gICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICBrZXk9XCJzdGF0aWMtc2VjdGlvbnMtdmlld1wiXG4gICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEgfX1cbiAgICAgICAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInNwYWNlLXktMjQgYW5pbWF0ZS1mYWRlLWluXCJcbiAgICAgICAgICAgICAgZGlyPXtkaXJ9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHsoWydBJywgJ0InLCAnQycsICdTJ10gYXMgQ2F0ZWdvcnlTbHVnW10pLm1hcCgoY2F0Q29kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlY3Rpb25NZXRhID0gY3VzdG9tU2VjdGlvbk1ldGFbY2F0Q29kZV07XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VjdGlvbkJpa2VzID0gZmlsdGVyZWRCaWtlcy5maWx0ZXIoYmlrZSA9PiBiaWtlLmNhdGVnb3J5ID09PSBjYXRDb2RlKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAgICBrZXk9e2NhdENvZGV9IFxuICAgICAgICAgICAgICAgICAgICBpZD17YHNlY3Rpb24tJHtjYXRDb2RlfWB9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInNwYWNlLXktOCBzY3JvbGwtbXQtMjQgdGV4dC1sZWZ0XCJcbiAgICAgICAgICAgICAgICAgICAgZGlyPXtkaXJ9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB7LyogR2xvd2luZyBzZWN0aW9uIGhlYWRlcnMgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgYm9yZGVyLWIgYm9yZGVyLXdoaXRlL1swLjA2XSBwYi00XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBWZXJ0aWNhbCBzaWRlIGdsb3dpbmcgYWNjZW50IGJhciAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGFic29sdXRlIHRvcC0wIGJvdHRvbS00ICR7ZGlyID09PSAncnRsJyA/ICdyaWdodC0wJyA6ICdsZWZ0LTAnfSB3LTEgYmctZ3JhZGllbnQtdG8tYiBmcm9tLWJyYW5kLWFjY2VudCB0by1icmFuZC1wcmltYXJ5IHJvdW5kZWQtZnVsbGB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake2RpciA9PT0gJ3J0bCcgPyAncHItNCcgOiAncGwtNCd9IGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgbWQ6aXRlbXMtZW5kIGp1c3RpZnktYmV0d2VlbiBnYXAtNGB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy0yeGwgdGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgc206dGV4dC0zLjV4bCBmb250LWJsYWNrIGZvbnQtc2FucyB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlIHVwcGVyY2FzZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGxlYWRpbmctbm9uZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWN0aW9uTWV0YS50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNDAwIGZvbnQtc2FucyBsZWFkaW5nLXJlbGF4ZWQgbXQtMiBwci00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3NlY3Rpb25NZXRhLmRlc2N9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogT3JkZXIgY2xhc3NpZmljYXRpb24gaW5kaWNhdG9yICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTBweF0gdGV4dC1ncmF5LTUwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzUgcHktMSBweC0zIGJnLVsjMEIwRjFBXSByb3VuZGVkLXhsIHNocmluay0wIGgtZml0IHNlbGVjdC1ub25lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIEZMRUVUIE1PREVMOiBTRUNUSU9OLXtjYXRDb2RlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBSZXNwb25zaXZlIEdyaWQgb2YgQ2FyZHMgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyB4bDpncmlkLWNvbHMtNCBnYXAtOFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtzZWN0aW9uQmlrZXMubWFwKChiaWtlKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8TW90b3JjeWNsZUNhcmQgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17YmlrZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmlrZT17YmlrZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGYXZvcml0ZT17ZmF2b3JpdGVzLmluY2x1ZGVzKGJpa2UuaWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvblRvZ2dsZUZhdm9yaXRlPXtoYW5kbGVUb2dnbGVGYXZvcml0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25PcGVuUGRmPXtoYW5kbGVPcGVuUGRmfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbk9wZW5Cb29raW5nPXtoYW5kbGVPcGVuQm9va2luZ31cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cblxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09IEZPT1RFUiA9PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICA8Q29udGFjdEZvb3RlciBvblNjcm9sbFRvU2VjdGlvbj17aGFuZGxlU2Nyb2xsVG9TZWN0aW9ufSBob21lcGFnZUNvbmZpZz17aG9tZXBhZ2VDb25maWd9IC8+XG4gICAgICA8Lz5cbiAgICAgICl9XG5cbiAgICAgIHthY3RpdmVWaWV3ID09PSAnc3RvcmUnICYmIChcbiAgICAgICAgPFN0b3JlVmlldyBcbiAgICAgICAgICBwcm9kdWN0cz17c3RvcmVQcm9kdWN0c0RhdGF9IFxuICAgICAgICAgIGhvbWVwYWdlQ29uZmlnPXtob21lcGFnZUNvbmZpZ30gXG4gICAgICAgICAgb25BZGRUb0NhcnQ9e2hhbmRsZUFkZFRvQ2FydH1cbiAgICAgICAgICBmYXZvcml0ZXM9e2Zhdm9yaXRlc31cbiAgICAgICAgICBvblRvZ2dsZUZhdm9yaXRlPXtoYW5kbGVUb2dnbGVGYXZvcml0ZX1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBDYXJ0IERyYXdlciAqL31cbiAgICAgIDxDYXJ0RHJhd2VyIFxuICAgICAgICBpc09wZW49e2lzQ2FydE9wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzQ2FydE9wZW4oZmFsc2UpfVxuICAgICAgICBjYXJ0SXRlbXM9e2NhcnRJdGVtc31cbiAgICAgICAgb25VcGRhdGVRdWFudGl0eT17aGFuZGxlVXBkYXRlQ2FydFF1YW50aXR5fVxuICAgICAgICBvblJlbW92ZUl0ZW09e2hhbmRsZVJlbW92ZUNhcnRJdGVtfVxuICAgICAgICBvbkNsZWFyQ2FydD17aGFuZGxlQ2xlYXJDYXJ0fVxuICAgICAgICBvbkNoZWNrb3V0PXtoYW5kbGVDaGVja291dENhcnR9XG4gICAgICAvPlxuXG4gICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09IFNFQ1VSRSBBRE1JTiBUVU5ORUwgUEFORUwgT1ZFUkxBWSA9PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICA8QW5pbWF0ZVByZXNlbmNlPlxuICAgICAgICB7YWRtaW5PcGVuICYmIChcbiAgICAgICAgICA8QWRtaW5QYW5lbCBcbiAgICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHNldEFkbWluT3BlbihmYWxzZSl9XG4gICAgICAgICAgICBtb3RvcmN5Y2xlcz17bW90b3JjeWNsZXNEYXRhfVxuICAgICAgICAgICAgb25VcGRhdGVNb3RvcmN5Y2xlcz17aGFuZGxlVXBkYXRlTW90b3JjeWNsZXN9XG4gICAgICAgICAgICBzdG9yZVByb2R1Y3RzPXtzdG9yZVByb2R1Y3RzRGF0YX1cbiAgICAgICAgICAgIG9uVXBkYXRlU3RvcmVQcm9kdWN0cz17YXN5bmMgKHVwZGF0ZWQpID0+IHtcbiAgICAgICAgICAgICAgc2V0U3RvcmVQcm9kdWN0c0RhdGEodXBkYXRlZCk7XG4gICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X3N0b3JlX3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkodXBkYXRlZCkpO1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5U25hcHNob3QgPSBhd2FpdCBnZXREb2NzKGNvbGxlY3Rpb24oZGIsICdzdG9yZV9wcm9kdWN0cycpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmYklkcyA9IHF1ZXJ5U25hcHNob3QuZG9jcy5tYXAoZG9jID0+IGRvYy5pZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dElkcyA9IHVwZGF0ZWQubWFwKHAgPT4gcC5pZCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gV3JpdGUgaW4gRmlyZXN0b3JlIFdyaXRlQmF0Y2ggdG8gc3BlZWQgdXAgb3BlcmF0aW9ucyBmcm9tIE8obikgcmVxdWVzdHMgdG8gYSBzaW5nbGUgYXRvbWljIGNhbGxcbiAgICAgICAgICAgICAgICBjb25zdCBiYXRjaCA9IHdyaXRlQmF0Y2goZGIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaWQgb2YgZmJJZHMpIHtcbiAgICAgICAgICAgICAgICAgIGlmICghbmV4dElkcy5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYmF0Y2guZGVsZXRlKGRvYyhkYiwgJ3N0b3JlX3Byb2R1Y3RzJywgaWQpKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwIG9mIHVwZGF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgIGJhdGNoLnNldChkb2MoZGIsICdzdG9yZV9wcm9kdWN0cycsIHAuaWQpLCBwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYXdhaXQgYmF0Y2guY29tbWl0KCk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gc3luYyBzdG9yZSBwcm9kdWN0cyBpbiBiYXRjaDpcIiwgZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjdXN0b21UZXh0PXtjdXN0b21UZXh0fVxuICAgICAgICAgICAgb25VcGRhdGVDdXN0b21UZXh0PXsodXBkYXRlZFRleHQpID0+IHtcbiAgICAgICAgICAgICAgc2V0Q3VzdG9tVGV4dCh1cGRhdGVkVGV4dCk7XG4gICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X2N1c3RvbV90ZXh0JywgSlNPTi5zdHJpbmdpZnkodXBkYXRlZFRleHQpKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBob21lcGFnZUNvbmZpZz17aG9tZXBhZ2VDb25maWd9XG4gICAgICAgICAgICBvblVwZGF0ZUhvbWVwYWdlQ29uZmlnPXtoYW5kbGVVcGRhdGVIb21lcGFnZUNvbmZpZ31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG5cbiAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT0gQk9PS0lOR1MgRFlOQU1JQyBPVkVSTEFZIENPTlRBSU5FUiA9PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICA8QW5pbWF0ZVByZXNlbmNlPlxuICAgICAgICB7YWN0aXZlQm9va0l0ZW0gJiYgKFxuICAgICAgICAgIDxCb29raW5nTW9kYWwgXG4gICAgICAgICAgICBtb3RvcmN5Y2xlSWQ9e2FjdGl2ZUJvb2tJdGVtLm1vdG9yY3ljbGVJZH1cbiAgICAgICAgICAgIG1vdG9yY3ljbGVOYW1lPXthY3RpdmVCb29rSXRlbS5tb3RvcmN5Y2xlTmFtZX1cbiAgICAgICAgICAgIGNhdGVnb3J5PXthY3RpdmVCb29rSXRlbS5jYXRlZ29yeX1cbiAgICAgICAgICAgIHByaWNlPXthY3RpdmVCb29rSXRlbS5wcmljZX1cbiAgICAgICAgICAgIHNlcmlhbENvZGU9e2FjdGl2ZUJvb2tJdGVtLnNlcmlhbENvZGV9XG4gICAgICAgICAgICBpbnZvaWNlV2hhdHNhcHBOdW1iZXI9e2hvbWVwYWdlQ29uZmlnLmludm9pY2VXaGF0c2FwcE51bWJlcn1cbiAgICAgICAgICAgIHByZVNlbGVjdGVkQWRkT25JZHM9e2FjdGl2ZUJvb2tJdGVtLnByZVNlbGVjdGVkQWRkT25JZHN9XG4gICAgICAgICAgICBzdG9yZVByb2R1Y3RzPXtzdG9yZVByb2R1Y3RzRGF0YX1cbiAgICAgICAgICAgIG9uQWRkVG9DYXJ0PXtoYW5kbGVBZGRUb0NhcnR9XG4gICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRBY3RpdmVCb29rSXRlbShudWxsKX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG5cbiAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT0gUERGIENBVEFMT0cgTU9EQUwgT1ZFUkxBWSBHQVRFID09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgIHthY3RpdmVQZGZJdGVtICYmIChcbiAgICAgICAgICA8UGRmTW9kYWwgXG4gICAgICAgICAgICBiaWtlPXthY3RpdmVQZGZJdGVtfVxuICAgICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0QWN0aXZlUGRmSXRlbShudWxsKX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG5cbiAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT0gQk9PS01BUktTIEZBVk9SSVRFUyBTSURFQkFSIERSQVdFUiA9PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICA8QW5pbWF0ZVByZXNlbmNlPlxuICAgICAgICB7ZmF2b3JpdGVzT3BlbiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgb3ZlcmZsb3ctaGlkZGVuIHBvaW50ZXItZXZlbnRzLWF1dG9cIj5cbiAgICAgICAgICAgIHsvKiBCYWNrZHJvcCBjbGljayBkaXNtaXNzICovfVxuICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RmF2b3JpdGVzT3BlbihmYWxzZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctYmxhY2svNzUgYmFja2Ryb3AtYmx1ci1zbSB0cmFuc2l0aW9uLW9wYWNpdHlcIiBcbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQteS0wICR7ZGlyID09PSAncnRsJyA/ICdsZWZ0LTAnIDogJ3JpZ2h0LTAnfSBtYXgtdy1mdWxsIGZsZXhgfT5cbiAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICBpbml0aWFsPXt7IHg6IGRpciA9PT0gJ3J0bCcgPyAnLTEwMCUnIDogJzEwMCUnIH19XG4gICAgICAgICAgICAgICAgYW5pbWF0ZT17eyB4OiAwIH19XG4gICAgICAgICAgICAgICAgZXhpdD17eyB4OiBkaXIgPT09ICdydGwnID8gJy0xMDAlJyA6ICcxMDAlJyB9fVxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgdHlwZTogJ3NwcmluZycsIHN0aWZmbmVzczogMzAwLCBkYW1waW5nOiAzMCB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctc2NyZWVuIG1heC13LW1kIGJnLVsjMEYxNzJBXS85NSBib3JkZXItbCBib3JkZXItd2hpdGUvWzAuMDhdIGJhY2tkcm9wLWJsdXIteGwgcmVsYXRpdmUgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW5cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgey8qIEhlYWRlciBSb3cgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgYm9yZGVyLWIgYm9yZGVyLXdoaXRlL1swLjA4XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPEhlYXJ0IGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1yZWQtNTAwIGZpbGwtcmVkLTUwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCB0ZXh0LXdoaXRlIHVwcGVyY2FzZVwiPnt0KCdnYXJhZ2UnKX08L2gzPlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JheS01MDAgZm9udC1tb25vIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyBg2KfZhNmF2K3YsdmD2KfYqiDZiNin2YTZhdiz2KrZhNiy2YXYp9iqICgke2Zhdm9yaXRlQmlrZXMubGVuZ3RoICsgZmF2b3JpdGVQcm9kdWN0cy5sZW5ndGh9KWAgOiBgQm9va21hcmtlZCBJdGVtcyAoJHtmYXZvcml0ZUJpa2VzLmxlbmd0aCArIGZhdm9yaXRlUHJvZHVjdHMubGVuZ3RofSlgfVxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEZhdm9yaXRlc09wZW4oZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLXdoaXRlL1swLjAzXSB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIEl0ZW1zIEFyZWEgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIHAtNiBzcGFjZS15LTRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICB7KGZhdm9yaXRlQmlrZXMubGVuZ3RoID4gMCB8fCBmYXZvcml0ZVByb2R1Y3RzLmxlbmd0aCA+IDApID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBNb3RvcmN5Y2xlcyBMaXN0ICovfVxuICAgICAgICAgICAgICAgICAgICAgIHtmYXZvcml0ZUJpa2VzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHVwcGVyY2FzZSBmb250LWJsYWNrIHRleHQtYnJhbmQtYWNjZW50IHRyYWNraW5nLXdpZGVzdCBibG9jayBib3JkZXItYiBib3JkZXItd2hpdGUvNSBwYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KfZhNiv2LHYrNin2Kog2KfZhNmG2KfYsdmK2KknIDogJ01vdG9yY3ljbGVzJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ZmF2b3JpdGVCaWtlcy5tYXAoKGJpa2UpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtiaWtlLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTQgYmctYmxhY2svNDAgYm9yZGVyIGJvcmRlci13aGl0ZS81IHJvdW5kZWQtMnhsIHAtMyBob3Zlcjpib3JkZXItYnJhbmQtYWNjZW50LzI1IHRyYW5zaXRpb24tYWxsIGdyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcj17ZGlyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0yMCBoLTE2IGJnLVsjMTExODI3XSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtMSByZWxhdGl2ZSBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YmlrZS5pbWFnZX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PXtiaWtlLm5hbWV9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVyUG9saWN5PVwibm8tcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvbnRhaW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTAgdGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgdGV4dC1icmFuZC1hY2NlbnQgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTRUNUSU9OLXtiaWtlLmNhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgdHJ1bmNhdGUgYmxvY2sgZm9udC1zYW5zXCIgZGlyPVwibHRyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jpa2UubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWdyYXktNDAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtYXRBcHBQcmljZShiaWtlLnByaWNlTnVtKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBRdWljayBBY3Rpb24gYnV0dG9ucyAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMSBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0RmF2b3JpdGVzT3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVPcGVuQm9va2luZyhiaWtlLmlkLCBiaWtlLm5hbWUsIGJpa2UuY2F0ZWdvcnksIGJpa2UucHJpY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgYmctYnJhbmQtcHJpbWFyeSBob3ZlcjpiZy1icmFuZC1hY2NlbnQgdGV4dC1bIzBCMEYxQV0gcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJRdWljayBCb29rIENhdGFsb2dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VDaXJjbGUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiBoYW5kbGVUb2dnbGVGYXZvcml0ZShiaWtlLmlkLCBlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSBiZy13aGl0ZS81IGhvdmVyOmJnLXJlZC01MDAvMTUgdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXJlZC00MDAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJSZW1vdmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBTdG9yZSBQcm9kdWN0cyBMaXN0ICovfVxuICAgICAgICAgICAgICAgICAgICAgIHtmYXZvcml0ZVByb2R1Y3RzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHVwcGVyY2FzZSBmb250LWJsYWNrIHRleHQtYnJhbmQtcHJpbWFyeSB0cmFja2luZy13aWRlc3QgYmxvY2sgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9in2YTZhdiz2KrZhNiy2YXYp9iqINmI2YLYt9i5INin2YTYutmK2KfYsScgOiAnU3RvcmUgUHJvZHVjdHMnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtmYXZvcml0ZVByb2R1Y3RzLm1hcCgocHJvZHVjdCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3Byb2R1Y3QuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCBiZy1ibGFjay80MCBib3JkZXIgYm9yZGVyLXdoaXRlLzUgcm91bmRlZC0yeGwgcC0zIGhvdmVyOmJvcmRlci1icmFuZC1wcmltYXJ5LzI1IHRyYW5zaXRpb24tYWxsIGdyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcj17ZGlyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0yMCBoLTE2IGJnLVsjMTExODI3XSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtMSByZWxhdGl2ZSBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17cHJvZHVjdC5pbWFnZX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PXtsYW5nID09PSAnYXInID8gcHJvZHVjdC5uYW1lQXIgOiBwcm9kdWN0Lm5hbWV9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVyUG9saWN5PVwibm8tcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvbnRhaW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTAgdGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgdGV4dC1icmFuZC1wcmltYXJ5IGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb2R1Y3QuYnJhbmQgfHwgJ1N0b3JlIFByb2R1Y3QnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgdHJ1bmNhdGUgYmxvY2sgZm9udC1zYW5zXCIgZGlyPXtsYW5nID09PSAnYXInID8gJ3J0bCcgOiAnbHRyJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyBwcm9kdWN0Lm5hbWVBciA6IHByb2R1Y3QubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWdyYXktNDAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9kdWN0LnByaWNlLnRvTG9jYWxlU3RyaW5nKCl9IHtsYW5nID09PSAnYXInID8gJ9isLtmFJyA6ICdFR1AnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFF1aWNrIEFjdGlvbiBidXR0b25zICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0xIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGYXZvcml0ZXNPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUFkZFRvQ2FydChwcm9kdWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IGJnLWJyYW5kLXByaW1hcnkgaG92ZXI6YmctYnJhbmQtYWNjZW50IHRleHQtWyMwQjBGMUFdIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiQWRkIHRvIENhcnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNob3BwaW5nQ2FydCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IGhhbmRsZVRvZ2dsZUZhdm9yaXRlKHByb2R1Y3QuaWQsIGUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IGJnLXdoaXRlLzUgaG92ZXI6YmctcmVkLTUwMC8xNSB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtcmVkLTQwMCByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlJlbW92ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIC8vIEVtcHR5IHNob3djYXNlXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgcHktMjQgdGV4dC1ncmF5LTUwMCBzcGFjZS15LTMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEJpa2UgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHRleHQtZ3JheS03MDAgbXgtYXV0byBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHVwcGVyY2FzZSB0ZXh0LWdyYXktNDAwIGZvbnQtZXh0cmFib2xkIHRyYWNraW5nLXdpZGVzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KfZhNis2LHYp9isINin2YTYpdmE2YPYqtix2YjZhtmKINmE2YTYqtiz2YjZgiDZgdin2LHYuicgOiAnR2FyYWdlIGlzIFZhY2FudCd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtZ3JheS01MDAgbWF4LXcteHMgbXgtYXV0byBsZWFkaW5nLXJlbGF4ZWQgZm9udC1zYW5zIG5vcm1hbC1jYXNlIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAn2LHYp9is2Lkg2KfZhNij2LfZgtmFINin2YTZhdiq2YjZgdix2Kkg2YHZiiDYp9mE2YXYudix2LYg2KPZiCDYp9mE2YXZhtiq2KzYp9iqINmB2Yog2KfZhNmF2KrYrNixINmI2KfYtti62Lcg2LnZhNmJINiy2LEg2KfZhNmC2YTYqCDZhNit2YHYuNmH2Kcg2YfZhtinLidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnUmV2aWV3IHRoZSBtb2RlbHMgJiBjbGljayB0aGUg4p2k77iPIGljb24gb24gY2FyZHMgdG8gc2F2ZSB0aGVtIGhlcmUgZm9yIGZhc3QgY29tcGFyaXNvbnMgYW5kIGJvb2tpbmcgYWN0aW9ucy4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogRm9vdGVyIENvbnRyb2xzICovfVxuICAgICAgICAgICAgICAgIHsoZmF2b3JpdGVCaWtlcy5sZW5ndGggPiAwIHx8IGZhdm9yaXRlUHJvZHVjdHMubGVuZ3RoID4gMCkgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgYm9yZGVyLXQgYm9yZGVyLXdoaXRlL1swLjA4XSBiZy1bIzA3MEExMV0vNjAgc3BhY2UteS0zXCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ2xlYXJGYXZvcml0ZXN9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItcmVkLTUwMC8yMCBob3ZlcjpiZy1yZWQtNTAwLzEwIHRleHQtcmVkLTQwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXN0IHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHt0KCd2YWNhdGVfZ2FyYWdlJykudG9VcHBlckNhc2UoKX0gKPCfl5EpXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0RmF2b3JpdGVzT3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVTY3JvbGxUb1NlY3Rpb24oJ2NhdGVnb3JpZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yLjUgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tYnJhbmQtcHJpbWFyeSB0by1icmFuZC1hY2NlbnQgdGV4dC1bIzBCMEYxQV0gdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIHRyYWNraW5nLXdpZGVzdCB0cmFuc2l0aW9uLWFsbCB0ZXh0LWNlbnRlciBjdXJzb3ItcG9pbnRlciBob3ZlcjpicmlnaHRuZXNzLTExMCBhY3RpdmU6c2NhbGUtOTVcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge3QoJ3JldHVybl9zaG93cm9vbScpLnRvVXBwZXJDYXNlKCl9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuXG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiJBQTR5Qk0sU0F1QkEsVUF2QkE7QUE1eUJOO0FBQUE7QUFBQTtB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