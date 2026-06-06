import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d4a02cea"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=d4a02cea"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import { motion, AnimatePresence } from "/node_modules/.vite/deps/motion_react.js?v=f1f188c8";
import { Bike, Heart, Menu, X, ArrowUpRight, Settings, ShoppingCart } from "/node_modules/.vite/deps/lucide-react.js?v=1004c77f";
import { useLanguage } from "/src/context/LanguageContext.tsx";
export default function Navbar({
  favoriteCount,
  cartItemCount,
  cartTotal,
  activeView,
  onNavigate,
  onOpenCart,
  onOpenFavorites,
  onScrollToSection,
  onOpenBooking,
  onOpenAdmin,
  homepageConfig
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const { lang, setLang, dir, t } = useLanguage();
  const logoUrl = homepageConfig?.header?.logoUrl;
  const logoText = lang === "ar" ? homepageConfig?.header?.logoTextAr || "الخولي" : homepageConfig?.header?.logoText || "ELKHOLY";
  const logoAccent = lang === "ar" ? homepageConfig?.header?.accentAr || "موتورز" : homepageConfig?.header?.accent || "MOTORS";
  const logoSize = homepageConfig?.header?.logoSize || "medium";
  const logoEffect = homepageConfig?.header?.logoEffect || "glow";
  const logoPosition = homepageConfig?.header?.logoPosition || "left";
  const renderLogo = () => {
    let sizeClass = "h-10";
    if (logoSize === "small") sizeClass = "h-8";
    if (logoSize === "large") sizeClass = "h-14";
    let effectClass = "";
    if (logoEffect === "glow") effectClass = "shadow-[0_0_15px_rgba(34,211,238,0.55)] border border-[#22D3EE]/30 bg-[#22D3EE]/5 px-2 py-1 rounded-xl";
    if (logoEffect === "neon") effectClass = "shadow-[0_0_20px_rgba(168,85,247,0.65)] border border-[#A855F7]/40 bg-[#A855F7]/10 px-2 py-1 rounded-xl";
    if (logoEffect === "shadow") effectClass = "shadow-2xl shadow-black/80 bg-black/50 px-2 py-1 rounded-xl border border-white/5";
    if (logoUrl) {
      return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxDEV(
          "img",
          {
            src: logoUrl,
            alt: "ElKholy Motors Logo",
            className: `${sizeClass} ${effectClass} object-contain transition-all duration-300 hover:scale-105`,
            referrerPolicy: "no-referrer"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 66,
            columnNumber: 11
          },
          this
        ),
        (homepageConfig?.header?.logoText || homepageConfig?.header?.logoTextAr) && /* @__PURE__ */ jsxDEV("div", { className: "text-left", children: /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-bold tracking-wider text-white", children: [
          logoText,
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent", children: logoAccent }, void 0, false, {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 75,
            columnNumber: 28
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 74,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 73,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 65,
        columnNumber: 9
      }, this);
    }
    return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 group", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-accent p-[1px] shadow-lg shadow-brand-primary/10", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full h-full bg-[#0B0F1A] rounded-xl flex items-center justify-center transition-transform group-hover:scale-95 duration-300", children: /* @__PURE__ */ jsxDEV(Bike, { className: "w-5 h-5 text-brand-accent group-hover:text-brand-secondary transition-colors duration-300" }, void 0, false, {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 87,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 86,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-bold tracking-wider text-white", children: [
          logoText,
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent group-hover:text-brand-secondary transition-colors duration-300", children: logoAccent }, void 0, false, {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 92,
            columnNumber: 24
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 91,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-500 font-mono tracking-[0.25em] uppercase", children: t("slogan") }, void 0, false, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 94,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 90,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 84,
      columnNumber: 7
    }, this);
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["home", "gallery", "categories", "footer"];
      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveTab(sect);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleNavClick = (id, view = "home") => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    onNavigate(view);
    if (view === "home" && id !== "store") {
      onScrollToSection(id);
    }
  };
  return /* @__PURE__ */ jsxDEV(
    "header",
    {
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0B0F1A]/75 backdrop-blur-md border-b border-white/[0.06] py-3" : "bg-transparent py-5"}`,
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => handleNavClick("home", "home"),
              className: `cursor-pointer ${logoPosition === "center" ? "lg:absolute lg:start-1/2 lg:-translate-x-1/2 flex justify-center" : ""}`,
              children: renderLogo()
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 144,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("nav", { className: "hidden md:flex items-center gap-6 font-mono text-xs font-semibold", children: [
            { id: "home", label: t("home"), view: "home" },
            { id: "categories", label: t("categories"), view: "home" },
            { id: "gallery", label: t("showroom"), view: "home" },
            { id: "store", label: lang === "ar" ? "المتجر" : "Store", view: "store" }
          ].map((tab) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleNavClick(tab.id, tab.view),
              className: `relative px-1 py-2 cursor-pointer transition-colors duration-200 uppercase tracking-widest ${activeView === tab.view && (activeView !== "home" || activeTab === tab.id) ? "text-brand-accent" : "text-gray-400 hover:text-white"}`,
              children: [
                tab.label,
                activeView === tab.view && (activeView !== "home" || activeTab === tab.id) && /* @__PURE__ */ jsxDEV(
                  motion.div,
                  {
                    layoutId: "navbar-underline",
                    className: "absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-accent",
                    transition: { type: "spring", stiffness: 380, damping: 30 }
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/Navbar.tsx",
                    lineNumber: 168,
                    columnNumber: 19
                  },
                  this
                )
              ]
            },
            tab.id,
            true,
            {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 159,
              columnNumber: 15
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 152,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "hidden md:flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex bg-white/5 border border-white/10 rounded-xl p-0.5 font-mono text-[10px] items-center relative z-20", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setLang("ar"),
                  className: `px-2 py-1 rounded-lg transition-all duration-200 cursor-pointer ${lang === "ar" ? "bg-brand-accent text-[#0B0F1A] font-black" : "text-gray-400 hover:text-white"}`,
                  title: "العربية",
                  children: "🇪🇬 عربي"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 183,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setLang("en"),
                  className: `px-2 py-1 rounded-lg transition-all duration-200 cursor-pointer ${lang === "en" ? "bg-brand-primary text-white font-black" : "text-gray-400 hover:text-white"}`,
                  title: "English",
                  children: "🇺🇸 EN"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 194,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 182,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onOpenAdmin,
                className: "p-2.5 rounded-xl border border-white/[0.08] hover:border-brand-primary bg-[#0B0F1A]/50 hover:bg-brand-primary/10 transition-colors cursor-pointer text-gray-400 hover:text-white",
                title: t("admin_panel"),
                children: /* @__PURE__ */ jsxDEV(Settings, { className: "w-5 h-5 animate-spin-slow" }, void 0, false, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 213,
                  columnNumber: 15
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 208,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onOpenCart,
                className: "relative p-2.5 rounded-xl border border-white/[0.08] hover:border-brand-accent bg-[#0B0F1A]/50 transition-colors cursor-pointer group",
                title: lang === "ar" ? "سلة التسوق" : "Shopping Cart",
                id: "cart-btn",
                children: [
                  /* @__PURE__ */ jsxDEV(ShoppingCart, { className: "w-5 h-5 text-white group-hover:text-brand-accent transition-colors" }, void 0, false, {
                    fileName: "/app/applet/src/components/Navbar.tsx",
                    lineNumber: 223,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV(AnimatePresence, { children: cartItemCount > 0 && /* @__PURE__ */ jsxDEV(
                    motion.span,
                    {
                      initial: { scale: 0 },
                      animate: { scale: 1 },
                      exit: { scale: 0 },
                      className: "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary text-white text-[9px] font-bold font-mono",
                      children: cartItemCount
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/Navbar.tsx",
                      lineNumber: 226,
                      columnNumber: 19
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "/app/applet/src/components/Navbar.tsx",
                    lineNumber: 224,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 217,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onOpenFavorites,
                className: "relative p-2.5 rounded-xl border border-white/[0.08] hover:border-brand-accent bg-[#0B0F1A]/50 transition-colors cursor-pointer group",
                title: t("garage"),
                id: "favorite-btn",
                children: [
                  /* @__PURE__ */ jsxDEV(Heart, { className: `w-5 h-5 transition-colors ${favoriteCount > 0 ? "fill-red-500 text-red-500" : "text-white group-hover:text-brand-accent"}` }, void 0, false, {
                    fileName: "/app/applet/src/components/Navbar.tsx",
                    lineNumber: 245,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV(AnimatePresence, { children: favoriteCount > 0 && /* @__PURE__ */ jsxDEV(
                    motion.span,
                    {
                      initial: { scale: 0 },
                      animate: { scale: 1 },
                      exit: { scale: 0 },
                      className: "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent text-[#0B0F1A] text-[9px] font-bold font-mono",
                      children: favoriteCount
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/Navbar.tsx",
                      lineNumber: 248,
                      columnNumber: 19
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "/app/applet/src/components/Navbar.tsx",
                    lineNumber: 246,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 239,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => onOpenBooking("sport-cybersport-v4", "ElKholy CyberSport V4", "A", "$42,500"),
                className: "px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider font-semibold text-white bg-gradient-to-r from-brand-primary to-brand-secondary hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-brand-primary/20 pointer-events-auto cursor-pointer glow-border flex items-center gap-1.5",
                id: "desktop-book-btn",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { children: t("book_now") }, void 0, false, {
                    fileName: "/app/applet/src/components/Navbar.tsx",
                    lineNumber: 266,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV(ArrowUpRight, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/Navbar.tsx",
                    lineNumber: 267,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 261,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 179,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex md:hidden items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setLang(lang === "ar" ? "en" : "ar"),
                className: "p-2 rounded-lg border border-white/[0.08] bg-[#0B0F1A]/50 text-xs text-brand-accent font-mono cursor-pointer uppercase font-bold",
                title: "Toggle Language",
                children: lang === "ar" ? "🇺🇸" : "🇪🇬"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 275,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onOpenAdmin,
                className: "p-2 rounded-lg border border-white/[0.08] bg-[#0B0F1A]/50 text-gray-400 hover:text-white",
                title: t("admin_panel"),
                children: /* @__PURE__ */ jsxDEV(Settings, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 289,
                  columnNumber: 15
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 284,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onOpenCart,
                className: "relative p-2 rounded-lg border border-white/[0.08] bg-[#0B0F1A]/50 text-white",
                children: [
                  /* @__PURE__ */ jsxDEV(ShoppingCart, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/Navbar.tsx",
                    lineNumber: 297,
                    columnNumber: 15
                  }, this),
                  cartItemCount > 0 && /* @__PURE__ */ jsxDEV("span", { className: "absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-primary text-white text-[8px] font-bold", children: cartItemCount }, void 0, false, {
                    fileName: "/app/applet/src/components/Navbar.tsx",
                    lineNumber: 299,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 293,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onOpenFavorites,
                className: "relative p-2 rounded-lg border border-white/[0.08] bg-[#0B0F1A]/50 text-white",
                id: "mobile-fav-btn",
                children: [
                  /* @__PURE__ */ jsxDEV(Heart, { className: `w-4 h-4 ${favoriteCount > 0 ? "fill-red-500 text-red-500" : ""}` }, void 0, false, {
                    fileName: "/app/applet/src/components/Navbar.tsx",
                    lineNumber: 310,
                    columnNumber: 15
                  }, this),
                  favoriteCount > 0 && /* @__PURE__ */ jsxDEV("span", { className: "absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-accent text-[#0B0F1A] text-[8px] font-bold", children: favoriteCount }, void 0, false, {
                    fileName: "/app/applet/src/components/Navbar.tsx",
                    lineNumber: 312,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 305,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setMobileMenuOpen(!mobileMenuOpen),
                className: "p-2 rounded-lg border border-white/[0.08] bg-[#0B0F1A]/50 text-white cursor-pointer",
                "aria-label": "Toggle menu",
                id: "hamburger-btn",
                children: mobileMenuOpen ? /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 324,
                  columnNumber: 33
                }, this) : /* @__PURE__ */ jsxDEV(Menu, { className: "w-5 h-5" }, void 0, false, {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 324,
                  columnNumber: 61
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 318,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 272,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 141,
          columnNumber: 9
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 140,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(AnimatePresence, { children: mobileMenuOpen && /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            transition: { duration: 0.3 },
            className: "md:hidden border-b border-white/[0.08] bg-[#0F172A]/95 backdrop-blur-lg",
            children: /* @__PURE__ */ jsxDEV("div", { className: "px-5 pt-3 pb-6 space-y-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2", children: [
                { id: "home", label: t("home"), view: "home" },
                { id: "categories", label: t("categories"), view: "home" },
                { id: "gallery", label: t("showroom"), view: "home" },
                { id: "store", label: lang === "ar" ? "المتجر" : "Store", view: "store" }
              ].map((tab) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => handleNavClick(tab.id, tab.view),
                  className: `w-full ${lang === "ar" ? "text-right" : "text-left"} py-2 font-mono text-sm tracking-widest uppercase ${activeView === tab.view && (activeView !== "home" || activeTab === tab.id) ? "text-brand-accent font-semibold" : "text-gray-300"}`,
                  children: tab.label
                },
                tab.id,
                false,
                {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 349,
                  columnNumber: 19
                },
                this
              )) }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 342,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "border-t border-white/5 pt-4", children: /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    setMobileMenuOpen(false);
                    onOpenBooking("sport-cybersport-v4", "ElKholy CyberSport V4", "A", "$42,500");
                  },
                  className: "w-full py-3 rounded-lg text-center font-mono text-xs tracking-widest font-bold bg-gradient-to-r from-brand-primary to-brand-secondary text-white uppercase",
                  children: t("book_now")
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/Navbar.tsx",
                  lineNumber: 362,
                  columnNumber: 17
                },
                this
              ) }, void 0, false, {
                fileName: "/app/applet/src/components/Navbar.tsx",
                lineNumber: 361,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 341,
              columnNumber: 13
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 334,
            columnNumber: 11
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 332,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 133,
      columnNumber: 5
    },
    this
  );
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk5hdmJhci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG1vdGlvbiwgQW5pbWF0ZVByZXNlbmNlIH0gZnJvbSAnbW90aW9uL3JlYWN0JztcbmltcG9ydCB7IEJpa2UsIFNoaWVsZCwgSGVhcnQsIE1lbnUsIFgsIEFycm93VXBSaWdodCwgU2V0dGluZ3MsIEdsb2JlLCBTaG9wcGluZ0NhcnQgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgQ2F0ZWdvcnlTbHVnLCBIb21lcGFnZUNvbmZpZyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHVzZUxhbmd1YWdlIH0gZnJvbSAnLi4vY29udGV4dC9MYW5ndWFnZUNvbnRleHQnO1xuXG5pbnRlcmZhY2UgTmF2YmFyUHJvcHMge1xuICBmYXZvcml0ZUNvdW50OiBudW1iZXI7XG4gIGNhcnRJdGVtQ291bnQ6IG51bWJlcjtcbiAgY2FydFRvdGFsOiBudW1iZXI7XG4gIGFjdGl2ZVZpZXc6ICdob21lJyB8ICdzdG9yZSc7XG4gIG9uTmF2aWdhdGU6ICh2aWV3OiAnaG9tZScgfCAnc3RvcmUnKSA9PiB2b2lkO1xuICBvbk9wZW5DYXJ0OiAoKSA9PiB2b2lkO1xuICBvbk9wZW5GYXZvcml0ZXM6ICgpID0+IHZvaWQ7XG4gIG9uU2Nyb2xsVG9TZWN0aW9uOiAoc2VjdGlvbklkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uT3BlbkJvb2tpbmc6IChtb3RvcmN5Y2xlSWQ6IHN0cmluZywgbW90b3JjeWNsZU5hbWU6IHN0cmluZywgY2F0ZWdvcnk6IENhdGVnb3J5U2x1ZywgcHJpY2U6IHN0cmluZykgPT4gdm9pZDtcbiAgb25PcGVuQWRtaW46ICgpID0+IHZvaWQ7XG4gIGhvbWVwYWdlQ29uZmlnPzogSG9tZXBhZ2VDb25maWc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5hdmJhcih7XG4gIGZhdm9yaXRlQ291bnQsXG4gIGNhcnRJdGVtQ291bnQsXG4gIGNhcnRUb3RhbCxcbiAgYWN0aXZlVmlldyxcbiAgb25OYXZpZ2F0ZSxcbiAgb25PcGVuQ2FydCxcbiAgb25PcGVuRmF2b3JpdGVzLFxuICBvblNjcm9sbFRvU2VjdGlvbixcbiAgb25PcGVuQm9va2luZyxcbiAgb25PcGVuQWRtaW4sXG4gIGhvbWVwYWdlQ29uZmlnLFxufTogTmF2YmFyUHJvcHMpIHtcbiAgY29uc3QgW3Njcm9sbGVkLCBzZXRTY3JvbGxlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttb2JpbGVNZW51T3Blbiwgc2V0TW9iaWxlTWVudU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoJ2hvbWUnKTtcbiAgY29uc3QgeyBsYW5nLCBzZXRMYW5nLCBkaXIsIHQgfSA9IHVzZUxhbmd1YWdlKCk7XG5cbiAgY29uc3QgbG9nb1VybCA9IGhvbWVwYWdlQ29uZmlnPy5oZWFkZXI/LmxvZ29Vcmw7XG4gIGNvbnN0IGxvZ29UZXh0ID0gbGFuZyA9PT0gJ2FyJyA/IChob21lcGFnZUNvbmZpZz8uaGVhZGVyPy5sb2dvVGV4dEFyIHx8ICfYp9mE2K7ZiNmE2YonKSA6IChob21lcGFnZUNvbmZpZz8uaGVhZGVyPy5sb2dvVGV4dCB8fCAnRUxLSE9MWScpO1xuICBjb25zdCBsb2dvQWNjZW50ID0gbGFuZyA9PT0gJ2FyJyA/IChob21lcGFnZUNvbmZpZz8uaGVhZGVyPy5hY2NlbnRBciB8fCAn2YXZiNiq2YjYsdiyJykgOiAoaG9tZXBhZ2VDb25maWc/LmhlYWRlcj8uYWNjZW50IHx8ICdNT1RPUlMnKTtcbiAgY29uc3QgbG9nb1NpemUgPSBob21lcGFnZUNvbmZpZz8uaGVhZGVyPy5sb2dvU2l6ZSB8fCAnbWVkaXVtJztcbiAgY29uc3QgbG9nb0VmZmVjdCA9IGhvbWVwYWdlQ29uZmlnPy5oZWFkZXI/LmxvZ29FZmZlY3QgfHwgJ2dsb3cnO1xuICBjb25zdCBsb2dvUG9zaXRpb24gPSBob21lcGFnZUNvbmZpZz8uaGVhZGVyPy5sb2dvUG9zaXRpb24gfHwgJ2xlZnQnO1xuXG4gIGNvbnN0IHJlbmRlckxvZ28gPSAoKSA9PiB7XG4gICAgLy8gc2l6ZSBjbGFzc2VzXG4gICAgbGV0IHNpemVDbGFzcyA9ICdoLTEwJztcbiAgICBpZiAobG9nb1NpemUgPT09ICdzbWFsbCcpIHNpemVDbGFzcyA9ICdoLTgnO1xuICAgIGlmIChsb2dvU2l6ZSA9PT0gJ2xhcmdlJykgc2l6ZUNsYXNzID0gJ2gtMTQnO1xuXG4gICAgLy8gZWZmZWN0IGNsYXNzZXNcbiAgICBsZXQgZWZmZWN0Q2xhc3MgPSAnJztcbiAgICBpZiAobG9nb0VmZmVjdCA9PT0gJ2dsb3cnKSBlZmZlY3RDbGFzcyA9ICdzaGFkb3ctWzBfMF8xNXB4X3JnYmEoMzQsMjExLDIzOCwwLjU1KV0gYm9yZGVyIGJvcmRlci1bIzIyRDNFRV0vMzAgYmctWyMyMkQzRUVdLzUgcHgtMiBweS0xIHJvdW5kZWQteGwnO1xuICAgIGlmIChsb2dvRWZmZWN0ID09PSAnbmVvbicpIGVmZmVjdENsYXNzID0gJ3NoYWRvdy1bMF8wXzIwcHhfcmdiYSgxNjgsODUsMjQ3LDAuNjUpXSBib3JkZXIgYm9yZGVyLVsjQTg1NUY3XS80MCBiZy1bI0E4NTVGN10vMTAgcHgtMiBweS0xIHJvdW5kZWQteGwnO1xuICAgIGlmIChsb2dvRWZmZWN0ID09PSAnc2hhZG93JykgZWZmZWN0Q2xhc3MgPSAnc2hhZG93LTJ4bCBzaGFkb3ctYmxhY2svODAgYmctYmxhY2svNTAgcHgtMiBweS0xIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci13aGl0ZS81JztcblxuICAgIGlmIChsb2dvVXJsKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjVcIj5cbiAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgc3JjPXtsb2dvVXJsfSBcbiAgICAgICAgICAgIGFsdD1cIkVsS2hvbHkgTW90b3JzIExvZ29cIiBcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7c2l6ZUNsYXNzfSAke2VmZmVjdENsYXNzfSBvYmplY3QtY29udGFpbiB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgaG92ZXI6c2NhbGUtMTA1YH1cbiAgICAgICAgICAgIHJlZmVycmVyUG9saWN5PVwibm8tcmVmZXJyZXJcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgeyhob21lcGFnZUNvbmZpZz8uaGVhZGVyPy5sb2dvVGV4dCB8fCBob21lcGFnZUNvbmZpZz8uaGVhZGVyPy5sb2dvVGV4dEFyKSAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC1sZyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgIHtsb2dvVGV4dH0gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1icmFuZC1hY2NlbnRcIj57bG9nb0FjY2VudH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBncm91cFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXRyIGZyb20tYnJhbmQtcHJpbWFyeSB0by1icmFuZC1hY2NlbnQgcC1bMXB4XSBzaGFkb3ctbGcgc2hhZG93LWJyYW5kLXByaW1hcnkvMTBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgYmctWyMwQjBGMUFdIHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZ3JvdXAtaG92ZXI6c2NhbGUtOTUgZHVyYXRpb24tMzAwXCI+XG4gICAgICAgICAgICA8QmlrZSBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtYnJhbmQtYWNjZW50IGdyb3VwLWhvdmVyOnRleHQtYnJhbmQtc2Vjb25kYXJ5IHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTMwMFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgIHtsb2dvVGV4dH0gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1icmFuZC1hY2NlbnQgZ3JvdXAtaG92ZXI6dGV4dC1icmFuZC1zZWNvbmRhcnkgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMzAwXCI+e2xvZ29BY2NlbnR9PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS01MDAgZm9udC1tb25vIHRyYWNraW5nLVswLjI1ZW1dIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAge3QoJ3Nsb2dhbicpfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlU2Nyb2xsID0gKCkgPT4ge1xuICAgICAgc2V0U2Nyb2xsZWQod2luZG93LnNjcm9sbFkgPiAyMCk7XG4gICAgICBcbiAgICAgIC8vIERldGVybWluZSBhY3RpdmUgdGFyZ2V0IGJhc2VkIG9uIHNjcm9sbCBwb3NpdGlvblxuICAgICAgY29uc3Qgc2VjdGlvbnMgPSBbJ2hvbWUnLCAnZ2FsbGVyeScsICdjYXRlZ29yaWVzJywgJ2Zvb3RlciddO1xuICAgICAgZm9yIChjb25zdCBzZWN0IG9mIHNlY3Rpb25zKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VjdCk7XG4gICAgICAgIGlmIChlbCkge1xuICAgICAgICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBpZiAocmVjdC50b3AgPD0gMTIwICYmIHJlY3QuYm90dG9tID49IDEyMCkge1xuICAgICAgICAgICAgc2V0QWN0aXZlVGFiKHNlY3QpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaGFuZGxlU2Nyb2xsKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGhhbmRsZVNjcm9sbCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVOYXZDbGljayA9IChpZDogc3RyaW5nLCB2aWV3OiAnaG9tZScgfCAnc3RvcmUnID0gJ2hvbWUnKSA9PiB7XG4gICAgc2V0QWN0aXZlVGFiKGlkKTtcbiAgICBzZXRNb2JpbGVNZW51T3BlbihmYWxzZSk7XG4gICAgb25OYXZpZ2F0ZSh2aWV3KTtcbiAgICBpZiAodmlldyA9PT0gJ2hvbWUnICYmIGlkICE9PSAnc3RvcmUnKSB7XG4gICAgICAgIG9uU2Nyb2xsVG9TZWN0aW9uKGlkKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8aGVhZGVyXG4gICAgICBjbGFzc05hbWU9e2BmaXhlZCB0b3AtMCBsZWZ0LTAgcmlnaHQtMCB6LTUwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke1xuICAgICAgICBzY3JvbGxlZFxuICAgICAgICAgID8gJ2JnLVsjMEIwRjFBXS83NSBiYWNrZHJvcC1ibHVyLW1kIGJvcmRlci1iIGJvcmRlci13aGl0ZS9bMC4wNl0gcHktMydcbiAgICAgICAgICA6ICdiZy10cmFuc3BhcmVudCBweS01J1xuICAgICAgfWB9XG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBMb2dvIC0gY2xpY2sgcmV0dXJucyBIb21lICovfVxuICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVOYXZDbGljaygnaG9tZScsICdob21lJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BjdXJzb3ItcG9pbnRlciAke2xvZ29Qb3NpdGlvbiA9PT0gJ2NlbnRlcicgPyAnbGc6YWJzb2x1dGUgbGc6c3RhcnQtMS8yIGxnOi10cmFuc2xhdGUteC0xLzIgZmxleCBqdXN0aWZ5LWNlbnRlcicgOiAnJ31gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtyZW5kZXJMb2dvKCl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogRGVza3RvcCBOYXYgSXRlbXMgKi99XG4gICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJoaWRkZW4gbWQ6ZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTYgZm9udC1tb25vIHRleHQteHMgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAge1tcbiAgICAgICAgICAgICAgeyBpZDogJ2hvbWUnLCBsYWJlbDogdCgnaG9tZScpLCB2aWV3OiAnaG9tZScgfSxcbiAgICAgICAgICAgICAgeyBpZDogJ2NhdGVnb3JpZXMnLCBsYWJlbDogdCgnY2F0ZWdvcmllcycpLCB2aWV3OiAnaG9tZScgfSxcbiAgICAgICAgICAgICAgeyBpZDogJ2dhbGxlcnknLCBsYWJlbDogdCgnc2hvd3Jvb20nKSwgdmlldzogJ2hvbWUnIH0sXG4gICAgICAgICAgICAgIHsgaWQ6ICdzdG9yZScsIGxhYmVsOiBsYW5nID09PSAnYXInID8gJ9in2YTZhdiq2KzYsScgOiAnU3RvcmUnLCB2aWV3OiAnc3RvcmUnIH0sXG4gICAgICAgICAgICBdLm1hcCgodGFiKSA9PiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBrZXk9e3RhYi5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVOYXZDbGljayh0YWIuaWQsIHRhYi52aWV3IGFzICdob21lJyB8ICdzdG9yZScpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHB4LTEgcHktMiBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0yMDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCAke1xuICAgICAgICAgICAgICAgICAgKGFjdGl2ZVZpZXcgPT09IHRhYi52aWV3ICYmIChhY3RpdmVWaWV3ICE9PSAnaG9tZScgfHwgYWN0aXZlVGFiID09PSB0YWIuaWQpKSA/ICd0ZXh0LWJyYW5kLWFjY2VudCcgOiAndGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RhYi5sYWJlbH1cbiAgICAgICAgICAgICAgICB7KGFjdGl2ZVZpZXcgPT09IHRhYi52aWV3ICYmIChhY3RpdmVWaWV3ICE9PSAnaG9tZScgfHwgYWN0aXZlVGFiID09PSB0YWIuaWQpKSAmJiAoXG4gICAgICAgICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAgICAgICBsYXlvdXRJZD1cIm5hdmJhci11bmRlcmxpbmVcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMCBsZWZ0LTAgcmlnaHQtMCBoLVsycHhdIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1icmFuZC1wcmltYXJ5IHRvLWJyYW5kLWFjY2VudFwiXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgdHlwZTogJ3NwcmluZycsIHN0aWZmbmVzczogMzgwLCBkYW1waW5nOiAzMCB9fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvbmF2PlxuXG4gICAgICAgICAgey8qIFJpZ2h0IENvbnRyb2xzICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuIG1kOmZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHsvKiBMYW5ndWFnZSBTZWxlY3Rpb24gQ29udHJvbGxlciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBiZy13aGl0ZS81IGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBwLTAuNSBmb250LW1vbm8gdGV4dC1bMTBweF0gaXRlbXMtY2VudGVyIHJlbGF0aXZlIHotMjBcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldExhbmcoJ2FyJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMiBweS0xIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICBsYW5nID09PSAnYXInXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWJyYW5kLWFjY2VudCB0ZXh0LVsjMEIwRjFBXSBmb250LWJsYWNrJ1xuICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgdGl0bGU9XCLYp9mE2LnYsdio2YrYqVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICDwn4eq8J+HrCDYudix2KjZilxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldExhbmcoJ2VuJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMiBweS0xIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICBsYW5nID09PSAnZW4nXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWJyYW5kLXByaW1hcnkgdGV4dC13aGl0ZSBmb250LWJsYWNrJ1xuICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgdGl0bGU9XCJFbmdsaXNoXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIPCfh7rwn4e4IEVOXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBBZG1pbiBEYXNoYm9hcmQgR2VhciBpY29uICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5BZG1pbn1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBob3Zlcjpib3JkZXItYnJhbmQtcHJpbWFyeSBiZy1bIzBCMEYxQV0vNTAgaG92ZXI6YmctYnJhbmQtcHJpbWFyeS8xMCB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICB0aXRsZT17dCgnYWRtaW5fcGFuZWwnKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNldHRpbmdzIGNsYXNzTmFtZT1cInctNSBoLTUgYW5pbWF0ZS1zcGluLXNsb3dcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHsvKiBDYXJ0IEljb24gQnV0dG9uICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5DYXJ0fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBwLTIuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGhvdmVyOmJvcmRlci1icmFuZC1hY2NlbnQgYmctWyMwQjBGMUFdLzUwIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyIGdyb3VwXCJcbiAgICAgICAgICAgICAgdGl0bGU9e2xhbmcgPT09ICdhcicgPyAn2LPZhNipINin2YTYqtiz2YjZgicgOiAnU2hvcHBpbmcgQ2FydCd9XG4gICAgICAgICAgICAgIGlkPVwiY2FydC1idG5cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U2hvcHBpbmdDYXJ0IGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC13aGl0ZSBncm91cC1ob3Zlcjp0ZXh0LWJyYW5kLWFjY2VudCB0cmFuc2l0aW9uLWNvbG9yc1wiIC8+XG4gICAgICAgICAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgICAgICAgICAge2NhcnRJdGVtQ291bnQgPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDxtb3Rpb24uc3BhblxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsPXt7IHNjYWxlOiAwIH19XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgc2NhbGU6IDEgfX1cbiAgICAgICAgICAgICAgICAgICAgZXhpdD17eyBzY2FsZTogMCB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtdG9wLTEgLXJpZ2h0LTEgZmxleCBoLTQgdy00IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWZ1bGwgYmctYnJhbmQtcHJpbWFyeSB0ZXh0LXdoaXRlIHRleHQtWzlweF0gZm9udC1ib2xkIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtjYXJ0SXRlbUNvdW50fVxuICAgICAgICAgICAgICAgICAgPC9tb3Rpb24uc3Bhbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogRmF2b3JpdGVzIEljb24gQnV0dG9uICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5GYXZvcml0ZXN9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHAtMi41IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wOF0gaG92ZXI6Ym9yZGVyLWJyYW5kLWFjY2VudCBiZy1bIzBCMEYxQV0vNTAgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgZ3JvdXBcIlxuICAgICAgICAgICAgICB0aXRsZT17dCgnZ2FyYWdlJyl9XG4gICAgICAgICAgICAgIGlkPVwiZmF2b3JpdGUtYnRuXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPEhlYXJ0IGNsYXNzTmFtZT17YHctNSBoLTUgdHJhbnNpdGlvbi1jb2xvcnMgJHtmYXZvcml0ZUNvdW50ID4gMCA/ICdmaWxsLXJlZC01MDAgdGV4dC1yZWQtNTAwJyA6ICd0ZXh0LXdoaXRlIGdyb3VwLWhvdmVyOnRleHQtYnJhbmQtYWNjZW50J31gfSAvPlxuICAgICAgICAgICAgICA8QW5pbWF0ZVByZXNlbmNlPlxuICAgICAgICAgICAgICAgIHtmYXZvcml0ZUNvdW50ID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8bW90aW9uLnNwYW5cbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbD17eyBzY2FsZTogMCB9fVxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IHNjYWxlOiAxIH19XG4gICAgICAgICAgICAgICAgICAgIGV4aXQ9e3sgc2NhbGU6IDAgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC0xIC1yaWdodC0xIGZsZXggaC00IHctNCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1mdWxsIGJnLWJyYW5kLWFjY2VudCB0ZXh0LVsjMEIwRjFBXSB0ZXh0LVs5cHhdIGZvbnQtYm9sZCBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7ZmF2b3JpdGVDb3VudH1cbiAgICAgICAgICAgICAgICAgIDwvbW90aW9uLnNwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgey8qIFF1aWNrIEJvb2tpbmcgQ1RBICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk9wZW5Cb29raW5nKCdzcG9ydC1jeWJlcnNwb3J0LXY0JywgJ0VsS2hvbHkgQ3liZXJTcG9ydCBWNCcsICdBJywgJyQ0Miw1MDAnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yLjUgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtbW9ubyB0cmFja2luZy13aWRlciBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgYmctZ3JhZGllbnQtdG8tciBmcm9tLWJyYW5kLXByaW1hcnkgdG8tYnJhbmQtc2Vjb25kYXJ5IGhvdmVyOmJyaWdodG5lc3MtMTEwIGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctbGcgc2hhZG93LWJyYW5kLXByaW1hcnkvMjAgcG9pbnRlci1ldmVudHMtYXV0byBjdXJzb3ItcG9pbnRlciBnbG93LWJvcmRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICAgICAgaWQ9XCJkZXNrdG9wLWJvb2stYnRuXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHNwYW4+e3QoJ2Jvb2tfbm93Jyl9PC9zcGFuPlxuICAgICAgICAgICAgICA8QXJyb3dVcFJpZ2h0IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIE1vYmlsZSBhY3Rpb24gY29udHJvbHMgJiBNZW51IEJ1dHRvbiAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggbWQ6aGlkZGVuIGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogUXVpY2sgTGFuZ3VhZ2Ugc3dpdGNoIG9uIG1vYmlsZSBkaXJlY3RseSAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TGFuZyhsYW5nID09PSAnYXInID8gJ2VuJyA6ICdhcicpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBiZy1bIzBCMEYxQV0vNTAgdGV4dC14cyB0ZXh0LWJyYW5kLWFjY2VudCBmb250LW1vbm8gY3Vyc29yLXBvaW50ZXIgdXBwZXJjYXNlIGZvbnQtYm9sZFwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiVG9nZ2xlIExhbmd1YWdlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn8J+HuvCfh7gnIDogJ/Cfh6rwn4esJ31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogQWRtaW4gYnV0dG9uIG1vYmlsZSAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17b25PcGVuQWRtaW59XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGJnLVsjMEIwRjFBXS81MCB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICB0aXRsZT17dCgnYWRtaW5fcGFuZWwnKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNldHRpbmdzIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHsvKiBDYXJ0IE1vYmlsZSAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17b25PcGVuQ2FydH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgcC0yIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wOF0gYmctWyMwQjBGMUFdLzUwIHRleHQtd2hpdGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U2hvcHBpbmdDYXJ0IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICB7Y2FydEl0ZW1Db3VudCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMSAtcmlnaHQtMSBmbGV4IGgtMy41IHctMy41IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWZ1bGwgYmctYnJhbmQtcHJpbWFyeSB0ZXh0LXdoaXRlIHRleHQtWzhweF0gZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICB7Y2FydEl0ZW1Db3VudH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5GYXZvcml0ZXN9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHAtMiByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGJnLVsjMEIwRjFBXS81MCB0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgaWQ9XCJtb2JpbGUtZmF2LWJ0blwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxIZWFydCBjbGFzc05hbWU9e2B3LTQgaC00ICR7ZmF2b3JpdGVDb3VudCA+IDAgPyAnZmlsbC1yZWQtNTAwIHRleHQtcmVkLTUwMCcgOiAnJ31gfSAvPlxuICAgICAgICAgICAgICB7ZmF2b3JpdGVDb3VudCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMSAtcmlnaHQtMSBmbGV4IGgtMy41IHctMy41IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWZ1bGwgYmctYnJhbmQtYWNjZW50IHRleHQtWyMwQjBGMUFdIHRleHQtWzhweF0gZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICB7ZmF2b3JpdGVDb3VudH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRNb2JpbGVNZW51T3BlbighbW9iaWxlTWVudU9wZW4pfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBiZy1bIzBCMEYxQV0vNTAgdGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJUb2dnbGUgbWVudVwiXG4gICAgICAgICAgICAgIGlkPVwiaGFtYnVyZ2VyLWJ0blwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHttb2JpbGVNZW51T3BlbiA/IDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPiA6IDxNZW51IGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNb2JpbGUgRHJhd2VyIG1lbnUgKi99XG4gICAgICA8QW5pbWF0ZVByZXNlbmNlPlxuICAgICAgICB7bW9iaWxlTWVudU9wZW4gJiYgKFxuICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIGhlaWdodDogMCB9fVxuICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCBoZWlnaHQ6ICdhdXRvJyB9fVxuICAgICAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwLCBoZWlnaHQ6IDAgfX1cbiAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuMyB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibWQ6aGlkZGVuIGJvcmRlci1iIGJvcmRlci13aGl0ZS9bMC4wOF0gYmctWyMwRjE3MkFdLzk1IGJhY2tkcm9wLWJsdXItbGdcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNSBwdC0zIHBiLTYgc3BhY2UteS00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIHtbXG4gICAgICAgICAgICAgICAgICB7IGlkOiAnaG9tZScsIGxhYmVsOiB0KCdob21lJyksIHZpZXc6ICdob21lJyB9LFxuICAgICAgICAgICAgICAgICAgeyBpZDogJ2NhdGVnb3JpZXMnLCBsYWJlbDogdCgnY2F0ZWdvcmllcycpLCB2aWV3OiAnaG9tZScgfSxcbiAgICAgICAgICAgICAgICAgIHsgaWQ6ICdnYWxsZXJ5JywgbGFiZWw6IHQoJ3Nob3dyb29tJyksIHZpZXc6ICdob21lJyB9LFxuICAgICAgICAgICAgICAgICAgeyBpZDogJ3N0b3JlJywgbGFiZWw6IGxhbmcgPT09ICdhcicgPyAn2KfZhNmF2KrYrNixJyA6ICdTdG9yZScsIHZpZXc6ICdzdG9yZScgfSxcbiAgICAgICAgICAgICAgICBdLm1hcCgodGFiKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17dGFiLmlkfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVOYXZDbGljayh0YWIuaWQsIHRhYi52aWV3IGFzICdob21lJyB8ICdzdG9yZScpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgJHtsYW5nID09PSAnYXInID8gJ3RleHQtcmlnaHQnIDogJ3RleHQtbGVmdCd9IHB5LTIgZm9udC1tb25vIHRleHQtc20gdHJhY2tpbmctd2lkZXN0IHVwcGVyY2FzZSAke1xuICAgICAgICAgICAgICAgICAgICAgIChhY3RpdmVWaWV3ID09PSB0YWIudmlldyAmJiAoYWN0aXZlVmlldyAhPT0gJ2hvbWUnIHx8IGFjdGl2ZVRhYiA9PT0gdGFiLmlkKSkgPyAndGV4dC1icmFuZC1hY2NlbnQgZm9udC1zZW1pYm9sZCcgOiAndGV4dC1ncmF5LTMwMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHt0YWIubGFiZWx9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlci10IGJvcmRlci13aGl0ZS81IHB0LTRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldE1vYmlsZU1lbnVPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgb25PcGVuQm9va2luZygnc3BvcnQtY3liZXJzcG9ydC12NCcsICdFbEtob2x5IEN5YmVyU3BvcnQgVjQnLCAnQScsICckNDIsNTAwJyk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTMgcm91bmRlZC1sZyB0ZXh0LWNlbnRlciBmb250LW1vbm8gdGV4dC14cyB0cmFja2luZy13aWRlc3QgZm9udC1ib2xkIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1icmFuZC1wcmltYXJ5IHRvLWJyYW5kLXNlY29uZGFyeSB0ZXh0LXdoaXRlIHVwcGVyY2FzZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3QoJ2Jvb2tfbm93Jyl9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICApfVxuICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG4gICAgPC9oZWFkZXI+XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiJBQWlFVTtBQWpFVjtBQUFBO0FBQUE7QUFBQTtBQUtBLFNBQWdCLFVBQVUsaUJBQWlCO0FBQzNDLFNBQVMsUUFBUSx1QkFBdUI7QUFDeEMsU0FBUyxNQUFjLE9BQU8sTUFBTSxHQUFHLGNBQWMsVUFBaUIsb0JBQW9CO0FBRTFGLFNBQVMsbUJBQW1CO0FBZ0I1Qix3QkFBd0IsT0FBTztBQUFBLEVBQzdCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLEdBQWdCO0FBQ2QsUUFBTSxDQUFDLFVBQVUsV0FBVyxJQUFJLFNBQVMsS0FBSztBQUM5QyxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixJQUFJLFNBQVMsS0FBSztBQUMxRCxRQUFNLENBQUMsV0FBVyxZQUFZLElBQUksU0FBUyxNQUFNO0FBQ2pELFFBQU0sRUFBRSxNQUFNLFNBQVMsS0FBSyxFQUFFLElBQUksWUFBWTtBQUU5QyxRQUFNLFVBQVUsZ0JBQWdCLFFBQVE7QUFDeEMsUUFBTSxXQUFXLFNBQVMsT0FBUSxnQkFBZ0IsUUFBUSxjQUFjLFdBQWEsZ0JBQWdCLFFBQVEsWUFBWTtBQUN6SCxRQUFNLGFBQWEsU0FBUyxPQUFRLGdCQUFnQixRQUFRLFlBQVksV0FBYSxnQkFBZ0IsUUFBUSxVQUFVO0FBQ3ZILFFBQU0sV0FBVyxnQkFBZ0IsUUFBUSxZQUFZO0FBQ3JELFFBQU0sYUFBYSxnQkFBZ0IsUUFBUSxjQUFjO0FBQ3pELFFBQU0sZUFBZSxnQkFBZ0IsUUFBUSxnQkFBZ0I7QUFFN0QsUUFBTSxhQUFhLE1BQU07QUFFdkIsUUFBSSxZQUFZO0FBQ2hCLFFBQUksYUFBYSxRQUFTLGFBQVk7QUFDdEMsUUFBSSxhQUFhLFFBQVMsYUFBWTtBQUd0QyxRQUFJLGNBQWM7QUFDbEIsUUFBSSxlQUFlLE9BQVEsZUFBYztBQUN6QyxRQUFJLGVBQWUsT0FBUSxlQUFjO0FBQ3pDLFFBQUksZUFBZSxTQUFVLGVBQWM7QUFFM0MsUUFBSSxTQUFTO0FBQ1gsYUFDRSx1QkFBQyxTQUFJLFdBQVUsNkJBQ2I7QUFBQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsS0FBSztBQUFBLFlBQ0wsS0FBSTtBQUFBLFlBQ0osV0FBVyxHQUFHLFNBQVMsSUFBSSxXQUFXO0FBQUEsWUFDdEMsZ0JBQWU7QUFBQTtBQUFBLFVBSmpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUtBO0FBQUEsU0FDRSxnQkFBZ0IsUUFBUSxZQUFZLGdCQUFnQixRQUFRLGVBQzVELHVCQUFDLFNBQUksV0FBVSxhQUNiLGlDQUFDLFVBQUssV0FBVSw0REFDYjtBQUFBO0FBQUEsVUFBUztBQUFBLFVBQUMsdUJBQUMsVUFBSyxXQUFVLHFCQUFxQix3QkFBckM7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBZ0Q7QUFBQSxhQUQ3RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUEsS0FIRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBSUE7QUFBQSxXQVpKO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFjQTtBQUFBLElBRUo7QUFFQSxXQUNFLHVCQUFDLFNBQUksV0FBVSxpQ0FDYjtBQUFBLDZCQUFDLFNBQUksV0FBVSx1SEFDYixpQ0FBQyxTQUFJLFdBQVUsaUlBQ2IsaUNBQUMsUUFBSyxXQUFVLCtGQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQTRHLEtBRDlHO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFFQSxLQUhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFJQTtBQUFBLE1BQ0EsdUJBQUMsU0FDQztBQUFBLCtCQUFDLFVBQUssV0FBVSwrQ0FDYjtBQUFBO0FBQUEsVUFBUztBQUFBLFVBQUMsdUJBQUMsVUFBSyxXQUFVLHFGQUFxRix3QkFBckc7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBZ0g7QUFBQSxhQUQ3SDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUNBLHVCQUFDLE9BQUUsV0FBVSxrRUFDVixZQUFFLFFBQVEsS0FEYjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxXQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFPQTtBQUFBLFNBYkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWNBO0FBQUEsRUFFSjtBQUVBLFlBQVUsTUFBTTtBQUNkLFVBQU0sZUFBZSxNQUFNO0FBQ3pCLGtCQUFZLE9BQU8sVUFBVSxFQUFFO0FBRy9CLFlBQU0sV0FBVyxDQUFDLFFBQVEsV0FBVyxjQUFjLFFBQVE7QUFDM0QsaUJBQVcsUUFBUSxVQUFVO0FBQzNCLGNBQU0sS0FBSyxTQUFTLGVBQWUsSUFBSTtBQUN2QyxZQUFJLElBQUk7QUFDTixnQkFBTSxPQUFPLEdBQUcsc0JBQXNCO0FBQ3RDLGNBQUksS0FBSyxPQUFPLE9BQU8sS0FBSyxVQUFVLEtBQUs7QUFDekMseUJBQWEsSUFBSTtBQUNqQjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxXQUFPLGlCQUFpQixVQUFVLFlBQVk7QUFDOUMsV0FBTyxNQUFNLE9BQU8sb0JBQW9CLFVBQVUsWUFBWTtBQUFBLEVBQ2hFLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxpQkFBaUIsQ0FBQyxJQUFZLE9BQXlCLFdBQVc7QUFDdEUsaUJBQWEsRUFBRTtBQUNmLHNCQUFrQixLQUFLO0FBQ3ZCLGVBQVcsSUFBSTtBQUNmLFFBQUksU0FBUyxVQUFVLE9BQU8sU0FBUztBQUNuQyx3QkFBa0IsRUFBRTtBQUFBLElBQ3hCO0FBQUEsRUFDRjtBQUVBLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLFdBQVcsK0RBQ1QsV0FDSSx1RUFDQSxxQkFDTjtBQUFBLE1BRUE7QUFBQSwrQkFBQyxTQUFJLFdBQVUsMENBQ2IsaUNBQUMsU0FBSSxXQUFVLHFDQUdiO0FBQUE7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFNBQVMsTUFBTSxlQUFlLFFBQVEsTUFBTTtBQUFBLGNBQzVDLFdBQVcsa0JBQWtCLGlCQUFpQixXQUFXLHFFQUFxRSxFQUFFO0FBQUEsY0FFL0gscUJBQVc7QUFBQTtBQUFBLFlBSmQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBS0E7QUFBQSxVQUdBLHVCQUFDLFNBQUksV0FBVSxxRUFDWjtBQUFBLFlBQ0MsRUFBRSxJQUFJLFFBQVEsT0FBTyxFQUFFLE1BQU0sR0FBRyxNQUFNLE9BQU87QUFBQSxZQUM3QyxFQUFFLElBQUksY0FBYyxPQUFPLEVBQUUsWUFBWSxHQUFHLE1BQU0sT0FBTztBQUFBLFlBQ3pELEVBQUUsSUFBSSxXQUFXLE9BQU8sRUFBRSxVQUFVLEdBQUcsTUFBTSxPQUFPO0FBQUEsWUFDcEQsRUFBRSxJQUFJLFNBQVMsT0FBTyxTQUFTLE9BQU8sV0FBVyxTQUFTLE1BQU0sUUFBUTtBQUFBLFVBQzFFLEVBQUUsSUFBSSxDQUFDLFFBQ0w7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUVDLFNBQVMsTUFBTSxlQUFlLElBQUksSUFBSSxJQUFJLElBQXdCO0FBQUEsY0FDbEUsV0FBVyw4RkFDUixlQUFlLElBQUksU0FBUyxlQUFlLFVBQVUsY0FBYyxJQUFJLE1BQU8sc0JBQXNCLGdDQUN2RztBQUFBLGNBRUM7QUFBQSxvQkFBSTtBQUFBLGdCQUNILGVBQWUsSUFBSSxTQUFTLGVBQWUsVUFBVSxjQUFjLElBQUksT0FDdkU7QUFBQSxrQkFBQyxPQUFPO0FBQUEsa0JBQVA7QUFBQSxvQkFDQyxVQUFTO0FBQUEsb0JBQ1QsV0FBVTtBQUFBLG9CQUNWLFlBQVksRUFBRSxNQUFNLFVBQVUsV0FBVyxLQUFLLFNBQVMsR0FBRztBQUFBO0FBQUEsa0JBSDVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFJQTtBQUFBO0FBQUE7QUFBQSxZQVpHLElBQUk7QUFBQSxZQURYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFlQSxDQUNELEtBdkJIO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBd0JBO0FBQUEsVUFHQSx1QkFBQyxTQUFJLFdBQVUscUNBR2I7QUFBQSxtQ0FBQyxTQUFJLFdBQVUsNEdBQ2I7QUFBQTtBQUFBLGdCQUFDO0FBQUE7QUFBQSxrQkFDQyxTQUFTLE1BQU0sUUFBUSxJQUFJO0FBQUEsa0JBQzNCLFdBQVcsbUVBQ1QsU0FBUyxPQUNMLDhDQUNBLGdDQUNOO0FBQUEsa0JBQ0EsT0FBTTtBQUFBLGtCQUNQO0FBQUE7QUFBQSxnQkFSRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FVQTtBQUFBLGNBQ0E7QUFBQSxnQkFBQztBQUFBO0FBQUEsa0JBQ0MsU0FBUyxNQUFNLFFBQVEsSUFBSTtBQUFBLGtCQUMzQixXQUFXLG1FQUNULFNBQVMsT0FDTCwyQ0FDQSxnQ0FDTjtBQUFBLGtCQUNBLE9BQU07QUFBQSxrQkFDUDtBQUFBO0FBQUEsZ0JBUkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBVUE7QUFBQSxpQkF0QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkF1QkE7QUFBQSxZQUdBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsU0FBUztBQUFBLGdCQUNULFdBQVU7QUFBQSxnQkFDVixPQUFPLEVBQUUsYUFBYTtBQUFBLGdCQUV0QixpQ0FBQyxZQUFTLFdBQVUsK0JBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQWdEO0FBQUE7QUFBQSxjQUxsRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFNQTtBQUFBLFlBR0E7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxTQUFTO0FBQUEsZ0JBQ1QsV0FBVTtBQUFBLGdCQUNWLE9BQU8sU0FBUyxPQUFPLGVBQWU7QUFBQSxnQkFDdEMsSUFBRztBQUFBLGdCQUVIO0FBQUEseUNBQUMsZ0JBQWEsV0FBVSx3RUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBNkY7QUFBQSxrQkFDN0YsdUJBQUMsbUJBQ0UsMEJBQWdCLEtBQ2Y7QUFBQSxvQkFBQyxPQUFPO0FBQUEsb0JBQVA7QUFBQSxzQkFDQyxTQUFTLEVBQUUsT0FBTyxFQUFFO0FBQUEsc0JBQ3BCLFNBQVMsRUFBRSxPQUFPLEVBQUU7QUFBQSxzQkFDcEIsTUFBTSxFQUFFLE9BQU8sRUFBRTtBQUFBLHNCQUNqQixXQUFVO0FBQUEsc0JBRVQ7QUFBQTtBQUFBLG9CQU5IO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFPQSxLQVRKO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBV0E7QUFBQTtBQUFBO0FBQUEsY0FsQkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBbUJBO0FBQUEsWUFHQTtBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUNDLFNBQVM7QUFBQSxnQkFDVCxXQUFVO0FBQUEsZ0JBQ1YsT0FBTyxFQUFFLFFBQVE7QUFBQSxnQkFDakIsSUFBRztBQUFBLGdCQUVIO0FBQUEseUNBQUMsU0FBTSxXQUFXLDZCQUE2QixnQkFBZ0IsSUFBSSw4QkFBOEIsMENBQTBDLE1BQTNJO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQStJO0FBQUEsa0JBQy9JLHVCQUFDLG1CQUNFLDBCQUFnQixLQUNmO0FBQUEsb0JBQUMsT0FBTztBQUFBLG9CQUFQO0FBQUEsc0JBQ0MsU0FBUyxFQUFFLE9BQU8sRUFBRTtBQUFBLHNCQUNwQixTQUFTLEVBQUUsT0FBTyxFQUFFO0FBQUEsc0JBQ3BCLE1BQU0sRUFBRSxPQUFPLEVBQUU7QUFBQSxzQkFDakIsV0FBVTtBQUFBLHNCQUVUO0FBQUE7QUFBQSxvQkFOSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBT0EsS0FUSjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQVdBO0FBQUE7QUFBQTtBQUFBLGNBbEJGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQW1CQTtBQUFBLFlBR0E7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxTQUFTLE1BQU0sY0FBYyx1QkFBdUIseUJBQXlCLEtBQUssU0FBUztBQUFBLGdCQUMzRixXQUFVO0FBQUEsZ0JBQ1YsSUFBRztBQUFBLGdCQUVIO0FBQUEseUNBQUMsVUFBTSxZQUFFLFVBQVUsS0FBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBcUI7QUFBQSxrQkFDckIsdUJBQUMsZ0JBQWEsV0FBVSxpQkFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBc0M7QUFBQTtBQUFBO0FBQUEsY0FOeEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBT0E7QUFBQSxlQXpGRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQTBGQTtBQUFBLFVBR0EsdUJBQUMsU0FBSSxXQUFVLHFDQUdiO0FBQUE7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxTQUFTLE1BQU0sUUFBUSxTQUFTLE9BQU8sT0FBTyxJQUFJO0FBQUEsZ0JBQ2xELFdBQVU7QUFBQSxnQkFDVixPQUFNO0FBQUEsZ0JBRUwsbUJBQVMsT0FBTyxTQUFTO0FBQUE7QUFBQSxjQUw1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFNQTtBQUFBLFlBR0E7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxTQUFTO0FBQUEsZ0JBQ1QsV0FBVTtBQUFBLGdCQUNWLE9BQU8sRUFBRSxhQUFhO0FBQUEsZ0JBRXRCLGlDQUFDLFlBQVMsV0FBVSxhQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUE4QjtBQUFBO0FBQUEsY0FMaEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBTUE7QUFBQSxZQUdBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsU0FBUztBQUFBLGdCQUNULFdBQVU7QUFBQSxnQkFFVjtBQUFBLHlDQUFDLGdCQUFhLFdBQVUsYUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBa0M7QUFBQSxrQkFDakMsZ0JBQWdCLEtBQ2YsdUJBQUMsVUFBSyxXQUFVLHVJQUNiLDJCQURIO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBRUE7QUFBQTtBQUFBO0FBQUEsY0FSSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFVQTtBQUFBLFlBRUE7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxTQUFTO0FBQUEsZ0JBQ1QsV0FBVTtBQUFBLGdCQUNWLElBQUc7QUFBQSxnQkFFSDtBQUFBLHlDQUFDLFNBQU0sV0FBVyxXQUFXLGdCQUFnQixJQUFJLDhCQUE4QixFQUFFLE1BQWpGO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQXFGO0FBQUEsa0JBQ3BGLGdCQUFnQixLQUNmLHVCQUFDLFVBQUssV0FBVSwwSUFDYiwyQkFESDtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUVBO0FBQUE7QUFBQTtBQUFBLGNBVEo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBV0E7QUFBQSxZQUVBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsU0FBUyxNQUFNLGtCQUFrQixDQUFDLGNBQWM7QUFBQSxnQkFDaEQsV0FBVTtBQUFBLGdCQUNWLGNBQVc7QUFBQSxnQkFDWCxJQUFHO0FBQUEsZ0JBRUYsMkJBQWlCLHVCQUFDLEtBQUUsV0FBVSxhQUFiO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXVCLElBQUssdUJBQUMsUUFBSyxXQUFVLGFBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQTBCO0FBQUE7QUFBQSxjQU4xRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFPQTtBQUFBLGVBckRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBc0RBO0FBQUEsYUF6TEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQTJMQSxLQTVMRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBNkxBO0FBQUEsUUFHQSx1QkFBQyxtQkFDRSw0QkFDQztBQUFBLFVBQUMsT0FBTztBQUFBLFVBQVA7QUFBQSxZQUNDLFNBQVMsRUFBRSxTQUFTLEdBQUcsUUFBUSxFQUFFO0FBQUEsWUFDakMsU0FBUyxFQUFFLFNBQVMsR0FBRyxRQUFRLE9BQU87QUFBQSxZQUN0QyxNQUFNLEVBQUUsU0FBUyxHQUFHLFFBQVEsRUFBRTtBQUFBLFlBQzlCLFlBQVksRUFBRSxVQUFVLElBQUk7QUFBQSxZQUM1QixXQUFVO0FBQUEsWUFFVixpQ0FBQyxTQUFJLFdBQVUsNEJBQ2I7QUFBQSxxQ0FBQyxTQUFJLFdBQVUsdUJBQ1o7QUFBQSxnQkFDQyxFQUFFLElBQUksUUFBUSxPQUFPLEVBQUUsTUFBTSxHQUFHLE1BQU0sT0FBTztBQUFBLGdCQUM3QyxFQUFFLElBQUksY0FBYyxPQUFPLEVBQUUsWUFBWSxHQUFHLE1BQU0sT0FBTztBQUFBLGdCQUN6RCxFQUFFLElBQUksV0FBVyxPQUFPLEVBQUUsVUFBVSxHQUFHLE1BQU0sT0FBTztBQUFBLGdCQUNwRCxFQUFFLElBQUksU0FBUyxPQUFPLFNBQVMsT0FBTyxXQUFXLFNBQVMsTUFBTSxRQUFRO0FBQUEsY0FDMUUsRUFBRSxJQUFJLENBQUMsUUFDTDtBQUFBLGdCQUFDO0FBQUE7QUFBQSxrQkFFQyxTQUFTLE1BQU0sZUFBZSxJQUFJLElBQUksSUFBSSxJQUF3QjtBQUFBLGtCQUNsRSxXQUFXLFVBQVUsU0FBUyxPQUFPLGVBQWUsV0FBVyxxREFDNUQsZUFBZSxJQUFJLFNBQVMsZUFBZSxVQUFVLGNBQWMsSUFBSSxNQUFPLG9DQUFvQyxlQUNySDtBQUFBLGtCQUVDLGNBQUk7QUFBQTtBQUFBLGdCQU5BLElBQUk7QUFBQSxnQkFEWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBUUEsQ0FDRCxLQWhCSDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQWlCQTtBQUFBLGNBRUEsdUJBQUMsU0FBSSxXQUFVLGdDQUNiO0FBQUEsZ0JBQUM7QUFBQTtBQUFBLGtCQUNDLFNBQVMsTUFBTTtBQUNiLHNDQUFrQixLQUFLO0FBQ3ZCLGtDQUFjLHVCQUF1Qix5QkFBeUIsS0FBSyxTQUFTO0FBQUEsa0JBQzlFO0FBQUEsa0JBQ0EsV0FBVTtBQUFBLGtCQUVULFlBQUUsVUFBVTtBQUFBO0FBQUEsZ0JBUGY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBUUEsS0FURjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQVVBO0FBQUEsaUJBOUJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBK0JBO0FBQUE7QUFBQSxVQXRDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUF1Q0EsS0F6Q0o7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQTJDQTtBQUFBO0FBQUE7QUFBQSxJQWxQRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFtUEE7QUFFSjsiLCJuYW1lcyI6W119