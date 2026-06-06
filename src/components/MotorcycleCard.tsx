import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=905fa188"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=905fa188"; const useState = __vite__cjsImport1_react["useState"];
import { motion, AnimatePresence } from "/node_modules/.vite/deps/motion_react.js?v=905fa188";
import { Heart, Zap, Gauge, Droplet, Cpu, FileText, ChevronRight, RefreshCw, Sparkles, Award, Share2, Check, Copy, X, ShoppingBag } from "/node_modules/.vite/deps/lucide-react.js?v=905fa188";
import { useLanguage } from "/src/context/LanguageContext.tsx";
export default function MotorcycleCard({
  bike,
  isFavorite,
  onToggleFavorite,
  onOpenPdf,
  onOpenBooking
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [backTab, setBackTab] = useState("specs");
  const [selectedAddOnIds, setSelectedAddOnIds] = useState([]);
  const { lang, dir, t } = useLanguage();
  const handleCardClick = (e) => {
    if (e.target.closest(".no-flip")) {
      return;
    }
    setIsFlipped(!isFlipped);
  };
  const getThemeColor = () => {
    switch (bike.category) {
      case "A":
        return { border: "group-hover:border-brand-accent/40", text: "text-brand-accent", shadow: "hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]", glow: "glow-cyan", bg: "bg-brand-accent/10", borderSolid: "border-brand-accent/20" };
      case "B":
        return { border: "group-hover:border-brand-secondary/40", text: "text-brand-secondary", shadow: "hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]", glow: "glow-purple", bg: "bg-brand-secondary/10", borderSolid: "border-brand-secondary/20" };
      case "C":
        return { border: "group-hover:border-orange-400/40", text: "text-orange-400", shadow: "hover:shadow-[0_0_25px_rgba(251,146,60,0.15)]", glow: "text-shadow: 0 0 10px rgba(251,146,60,0.5)", bg: "bg-orange-450/10", borderSolid: "border-orange-400/20" };
      default:
        return { border: "group-hover:border-brand-accent/40", text: "text-brand-accent", shadow: "hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]", glow: "glow-cyan", bg: "bg-brand-accent/10", borderSolid: "border-brand-accent/20" };
    }
  };
  const themeColors = getThemeColor();
  const originalPriceUsd = bike.originalPrice || bike.priceNum;
  const isDiscounted = !!(bike.originalPrice && bike.discount && bike.discount > 0);
  const getDiscountedPriceUsd = () => {
    if (isDiscounted && bike.discount && bike.originalPrice) {
      if (bike.discountType === "percentage") {
        return Math.max(0, bike.originalPrice * (1 - bike.discount / 100));
      } else {
        return Math.max(0, bike.originalPrice - bike.discount);
      }
    }
    return bike.priceNum;
  };
  const basePriceUsd = getDiscountedPriceUsd();
  const activeAddOns = bike.addOns || [];
  const selectedAddOnsPriceUsd = activeAddOns.filter((addon) => selectedAddOnIds.includes(addon.id)).reduce((sum, addon) => sum + addon.price, 0);
  const totalLivePriceUsd = basePriceUsd + selectedAddOnsPriceUsd;
  const formatPrice = (usd) => {
    if (lang === "ar") {
      return `${usd.toLocaleString()} جنيه`;
    } else {
      return `${usd.toLocaleString()} EGP`;
    }
  };
  const getSharedMessage = () => {
    const formattedTotal = formatPrice(totalLivePriceUsd);
    let addonsListMsg = "";
    if (selectedAddOnIds.length > 0) {
      const names = activeAddOns.filter((a) => selectedAddOnIds.includes(a.id)).map((a) => lang === "ar" && a.nameAr ? a.nameAr : a.name).join(", ");
      addonsListMsg = lang === "ar" ? `
الإضافات: ${names}` : `
Add-ons: ${names}`;
    }
    if (lang === "ar") {
      return `شاهد هذا الموتوسيكل من ElKholy Motors:
[${bike.name}]${addonsListMsg}
السعر الإجمالي: ${formattedTotal}`;
    } else {
      return `Check out this motorcycle from ElKholy Motors:
[${bike.name}]${addonsListMsg}
Total Price: ${formattedTotal}`;
    }
  };
  const handleShareClick = (platform, e) => {
    e.stopPropagation();
    e.preventDefault();
    const msg = getSharedMessage();
    const currentUrl = window.location.href;
    if (platform === "wa") {
      const url = `https://wa.me/?text=${encodeURIComponent(msg + "\n" + currentUrl)}`;
      window.open(url, "_blank");
    } else if (platform === "fb") {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");
    } else if (platform === "x") {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(msg + "\n" + currentUrl)}`;
      window.open(url, "_blank");
    } else if (platform === "copy") {
      navigator.clipboard.writeText(`${msg}
${currentUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    }
  };
  const toggleAddOn = (id, e) => {
    e.stopPropagation();
    if (selectedAddOnIds.includes(id)) {
      setSelectedAddOnIds(selectedAddOnIds.filter((x) => x !== id));
    } else {
      setSelectedAddOnIds([...selectedAddOnIds, id]);
    }
  };
  const handleBookNowClick = (e) => {
    e.stopPropagation();
    onOpenBooking(
      bike.id,
      bike.name,
      bike.category,
      formatPrice(totalLivePriceUsd),
      e,
      selectedAddOnIds
    );
  };
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      onClick: handleCardClick,
      className: `perspective-1000 h-[500px] w-full min-w-[280px] cursor-pointer group pointer-events-auto`,
      id: `bike-card-${bike.id}`,
      children: /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: `relative w-full h-full duration-700 preserve-3d transition-all ${isFlipped ? "rotate-y-180" : ""}`,
          children: [
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: `absolute inset-0 w-full h-full backface-hidden glass-panel rounded-3xl overflow-hidden border border-white/[0.08] ${themeColors.border} ${themeColors.shadow} flex flex-col transition-all duration-500`,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute top-4 left-4 right-4 z-10 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "px-3 py-1 bg-black/60 rounded-full text-[10px] font-mono font-semibold tracking-widest text-[#E5E7EB] border border-white/10 uppercase", children: t("cat_" + bike.category).replace("فئة", "").replace("Series", "") }, void 0, false, {
                      fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                      lineNumber: 171,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 no-flip", children: [
                      (bike.catalogFileContent || bike.catalogFileName) && /* @__PURE__ */ jsxDEV(
                        "a",
                        {
                          href: bike.catalogFileContent || "#",
                          download: bike.catalogFileName || `${bike.name}-catalog.pdf`,
                          onClick: (e) => {
                            e.stopPropagation();
                          },
                          className: "p-2 rounded-xl border border-blue-500/30 bg-blue-500/10 text-brand-accent hover:bg-blue-500/25 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/10 active:scale-95 transition-all text-white cursor-pointer select-none no-flip inline-flex items-center justify-center",
                          title: lang === "ar" ? "تحميل الكتالوج الرقمي PDF المخصص" : "Download Custom spec PDF Catalog",
                          children: /* @__PURE__ */ jsxDEV(FileText, { className: "w-4 h-4 text-[#22D3EE]" }, void 0, false, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 187,
                            columnNumber: 19
                          }, this)
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                          lineNumber: 180,
                          columnNumber: 17
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          onClick: (e) => {
                            e.stopPropagation();
                            setShareOpen(!shareOpen);
                          },
                          className: "p-2 sm:p-2.5 rounded-xl border border-white/[0.06] bg-black/50 hover:bg-black/75 hover:scale-110 active:scale-95 transition-all text-white cursor-pointer select-none",
                          title: t("share_title"),
                          id: `share-btn-${bike.id}`,
                          children: /* @__PURE__ */ jsxDEV(Share2, { className: "w-4 h-4 text-[#22D3EE] hover:text-white" }, void 0, false, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 198,
                            columnNumber: 17
                          }, this)
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                          lineNumber: 192,
                          columnNumber: 15
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          onClick: (e) => onToggleFavorite(bike.id, e),
                          className: "p-2 sm:p-2.5 rounded-xl border border-white/[0.06] bg-black/50 hover:bg-black/75 hover:scale-110 active:scale-95 transition-all text-white cursor-pointer select-none",
                          title: isFavorite ? "Remove from Favorites" : "Add to Favorites",
                          id: `fav-btn-${bike.id}`,
                          children: /* @__PURE__ */ jsxDEV(
                            Heart,
                            {
                              className: `w-4 h-4 transition-transform ${isFavorite ? "fill-red-500 text-red-500 scale-105" : "text-gray-400 hover:text-red-400"}`
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 208,
                              columnNumber: 17
                            },
                            this
                          )
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                          lineNumber: 202,
                          columnNumber: 15
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                      lineNumber: 176,
                      columnNumber: 13
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                    lineNumber: 170,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ jsxDEV(AnimatePresence, { children: shareOpen && /* @__PURE__ */ jsxDEV(
                    motion.div,
                    {
                      initial: { opacity: 0, scale: 0.95, y: -10 },
                      animate: { opacity: 1, scale: 1, y: 0 },
                      exit: { opacity: 0, scale: 0.95, y: -10 },
                      className: "absolute top-16 left-4 right-4 z-30 bg-[#0F172A]/95 backdrop-blur-md border border-white/10 rounded-2xl p-4 no-flip shadow-2xl space-y-3",
                      children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center border-b border-white/5 pb-1.5", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono font-bold uppercase tracking-wider text-[#22D3EE]", children: t("share_options") }, void 0, false, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 227,
                            columnNumber: 19
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              onClick: (e) => {
                                e.stopPropagation();
                                setShareOpen(false);
                              },
                              className: "p-1 text-gray-400 hover:text-white rounded bg-white/5",
                              children: /* @__PURE__ */ jsxDEV(X, { className: "w-3 h-3" }, void 0, false, {
                                fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                lineNumber: 234,
                                columnNumber: 21
                              }, this)
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 230,
                              columnNumber: 19
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                          lineNumber: 226,
                          columnNumber: 17
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 text-[11px] font-mono font-semibold", children: [
                          /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              onClick: (e) => handleShareClick("wa", e),
                              className: "flex items-center gap-1.5 p-2 bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 rounded-xl transition-all cursor-pointer",
                              children: /* @__PURE__ */ jsxDEV("span", { children: "🟢 WhatsApp" }, void 0, false, {
                                fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                lineNumber: 243,
                                columnNumber: 21
                              }, this)
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 239,
                              columnNumber: 19
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              onClick: (e) => handleShareClick("fb", e),
                              className: "flex items-center gap-1.5 p-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 rounded-xl transition-all cursor-pointer",
                              children: /* @__PURE__ */ jsxDEV("span", { children: "🔵 Facebook" }, void 0, false, {
                                fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                lineNumber: 249,
                                columnNumber: 21
                              }, this)
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 245,
                              columnNumber: 19
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              onClick: (e) => handleShareClick("x", e),
                              className: "flex items-center gap-1.5 p-2 bg-gray-800/55 border border-white/10 text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer",
                              children: /* @__PURE__ */ jsxDEV("span", { children: "⚫ Twitter (X)" }, void 0, false, {
                                fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                lineNumber: 255,
                                columnNumber: 21
                              }, this)
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 251,
                              columnNumber: 19
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              onClick: (e) => handleShareClick("copy", e),
                              className: "flex items-center gap-1.5 p-2 bg-brand-accent/10 border border-brand-accent/20 text-[#22D3EE] hover:bg-brand-accent/20 rounded-xl transition-all cursor-pointer",
                              children: [
                                copied ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-green-400" }, void 0, false, {
                                  fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                  lineNumber: 261,
                                  columnNumber: 31
                                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                                  fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                  lineNumber: 261,
                                  columnNumber: 82
                                }, this),
                                /* @__PURE__ */ jsxDEV("span", { children: copied ? "Copied!" : t("copy_link") }, void 0, false, {
                                  fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                  lineNumber: 262,
                                  columnNumber: 21
                                }, this)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 257,
                              columnNumber: 19
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                          lineNumber: 238,
                          columnNumber: 17
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "bg-black/40 border border-white/5 p-2 rounded-lg text-[9px] text-gray-500 font-sans leading-tight text-right", dir, children: getSharedMessage() }, void 0, false, {
                          fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                          lineNumber: 267,
                          columnNumber: 17
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                      lineNumber: 220,
                      columnNumber: 15
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                    lineNumber: 218,
                    columnNumber: 11
                  }, this),
                  bike.isPopular && /* @__PURE__ */ jsxDEV("div", { className: `absolute top-16 ${dir === "rtl" ? "right-4" : "left-4"} z-10 flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-xl`, children: [
                    /* @__PURE__ */ jsxDEV(Award, { className: "w-3 h-3 text-red-500 animate-pulse" }, void 0, false, {
                      fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                      lineNumber: 277,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono font-bold uppercase tracking-widest text-red-400", children: t("crowned_popular") }, void 0, false, {
                      fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                      lineNumber: 278,
                      columnNumber: 15
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                    lineNumber: 276,
                    columnNumber: 13
                  }, this),
                  bike.offerLabel && /* @__PURE__ */ jsxDEV("div", { className: `absolute top-16 ${dir === "rtl" ? "left-4" : "right-4"} z-10 flex items-center gap-1.5 px-3 py-1 bg-[#22D3EE]/15 border border-[#22D3EE]/40 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.25)] animate-pulse`, children: [
                    /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3 h-3 text-[#22D3EE]" }, void 0, false, {
                      fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                      lineNumber: 287,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono font-bold uppercase tracking-widest text-[#22D3EE]", children: bike.offerLabel }, void 0, false, {
                      fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                      lineNumber: 288,
                      columnNumber: 15
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                    lineNumber: 286,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "w-full h-[240px] relative overflow-hidden bg-gradient-to-b from-[#111827]/10 to-[#070A11]/30", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: `absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-12 rounded-full ${themeColors.bg} filter blur-xl opacity-80` }, void 0, false, {
                      fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                      lineNumber: 297,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "img",
                      {
                        src: bike.image,
                        alt: bike.name,
                        referrerPolicy: "no-referrer",
                        className: "w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 select-none"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                        lineNumber: 299,
                        columnNumber: 13
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                    lineNumber: 295,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-5 flex-1 flex flex-col justify-between relative bg-gradient-to-t from-black/80 to-[#0F172A]/10 text-left", dir: dir === "rtl" ? "rtl" : "ltr", children: [
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] tracking-widest text-gray-400 font-semibold uppercase block mb-1", children: t("cat_" + bike.category) }, void 0, false, {
                        fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                        lineNumber: 310,
                        columnNumber: 15
                      }, this),
                      /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-white tracking-wide group-hover:text-brand-accent transition-colors duration-300 font-sans", dir: "ltr", children: bike.name }, void 0, false, {
                        fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                        lineNumber: 314,
                        columnNumber: 15
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-mono text-brand-accent/80 italic mt-0.5", children: [
                        '"',
                        bike.tagline,
                        '"'
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                        lineNumber: 317,
                        columnNumber: 15
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-400 font-sans line-clamp-2 mt-2 leading-relaxed", children: bike.shortDesc }, void 0, false, {
                        fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                        lineNumber: 320,
                        columnNumber: 15
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                      lineNumber: 309,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "pt-3 border-t border-white/[0.05] flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-500 font-mono tracking-widest uppercase", children: t("starting_price").replace("Retail Price", "") }, void 0, false, {
                          fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                          lineNumber: 328,
                          columnNumber: 17
                        }, this),
                        isDiscounted ? /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-gray-500 font-mono line-through leading-tight", children: formatPrice(originalPriceUsd) }, void 0, false, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 332,
                            columnNumber: 21
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: `text-xl font-bold tracking-wider font-mono ${themeColors.glow} text-brand-accent`, children: formatPrice(basePriceUsd) }, void 0, false, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 335,
                            columnNumber: 21
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                          lineNumber: 331,
                          columnNumber: 19
                        }, this) : /* @__PURE__ */ jsxDEV("p", { className: `text-xl font-bold tracking-wider font-mono ${themeColors.glow} text-white`, children: formatPrice(basePriceUsd) }, void 0, false, {
                          fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                          lineNumber: 340,
                          columnNumber: 19
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                        lineNumber: 327,
                        columnNumber: 15
                      }, this),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          onClick: (e) => {
                            e.stopPropagation();
                            setIsFlipped(true);
                            setBackTab("specs");
                          },
                          className: "flex items-center gap-1.5 py-1.5 px-3 bg-white/[0.03] border border-white/5 rounded-xl font-mono text-[9px] text-gray-400 hover:text-white transition-colors no-flip",
                          children: [
                            /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-3 h-3 text-brand-accent animate-spin-slow" }, void 0, false, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 351,
                              columnNumber: 17
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: t("explore_specs").toUpperCase() }, void 0, false, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 352,
                              columnNumber: 17
                            }, this)
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                          lineNumber: 347,
                          columnNumber: 15
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                      lineNumber: 326,
                      columnNumber: 13
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                    lineNumber: 308,
                    columnNumber: 11
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                lineNumber: 166,
                columnNumber: 9
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "absolute inset-0 w-full h-full backface-hidden rotate-y-180 glass-panel rounded-3xl overflow-hidden border border-brand-accent/20 flex flex-col p-5 [backface-visibility:hidden]",
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/[0.08] pb-2 mb-3 shrink-0", dir, children: [
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("p", { className: "text-[9.5px] text-brand-accent font-mono tracking-widest font-bold uppercase", children: t("specifications") }, void 0, false, {
                        fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                        lineNumber: 366,
                        columnNumber: 15
                      }, this),
                      /* @__PURE__ */ jsxDEV("h4", { className: "text-base font-bold text-white tracking-wide leading-none font-sans mt-0.5 truncate max-w-[150px]", dir: "ltr", children: bike.name }, void 0, false, {
                        fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                        lineNumber: 367,
                        columnNumber: 15
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                      lineNumber: 365,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 no-flip", children: [
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          onClick: (e) => {
                            e.stopPropagation();
                            setBackTab(backTab === "specs" ? "addons" : "specs");
                          },
                          className: `p-1 px-2 rounded-lg border text-[9px] font-mono font-bold transition-all ${backTab === "addons" ? "bg-brand-accent/15 border-brand-accent/30 text-brand-accent shadow-[0_0_8px_rgba(34,211,238,0.2)]" : "bg-white/5 border-white/10 text-gray-400 hover:text-white"}`,
                          title: "Toggle accessories",
                          children: lang === "ar" ? "الإضافات" : "ADDONS"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                          lineNumber: 372,
                          columnNumber: 15
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          onClick: (e) => {
                            e.stopPropagation();
                            setIsFlipped(false);
                          },
                          className: "p-1 px-2 rounded-lg border border-white/10 bg-white/5 font-mono text-[9px] text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer",
                          title: t("flip_back"),
                          children: [
                            /* @__PURE__ */ jsxDEV(X, { className: "w-3 h-3" }, void 0, false, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 389,
                              columnNumber: 17
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: t("flip_back") }, void 0, false, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 390,
                              columnNumber: 17
                            }, this)
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                          lineNumber: 384,
                          columnNumber: 15
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                      lineNumber: 371,
                      columnNumber: 13
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                    lineNumber: 364,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ jsxDEV(AnimatePresence, { mode: "wait", children: backTab === "specs" ? (
                    /* TAB A: SPEC DETAILS MATRIX */
                    /* @__PURE__ */ jsxDEV(
                      motion.div,
                      {
                        initial: { opacity: 0, x: -10 },
                        animate: { opacity: 1, x: 0 },
                        exit: { opacity: 0, x: 10 },
                        transition: { duration: 0.2 },
                        className: "grid grid-cols-2 gap-x-3 gap-y-2 font-mono text-[11px] text-gray-300 flex-1 overflow-y-auto max-h-[305px] pr-1",
                        dir,
                        children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "p-1.5 border border-white/[0.03] rounded-xl bg-white/[0.01]", children: [
                            /* @__PURE__ */ jsxDEV("span", { className: "text-gray-500 text-[8.5px] flex items-center gap-1 uppercase", children: [
                              /* @__PURE__ */ jsxDEV(Zap, { className: "w-3 h-3 text-brand-accent" }, void 0, false, {
                                fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                lineNumber: 409,
                                columnNumber: 21
                              }, this),
                              " ",
                              t("drive_engine")
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 408,
                              columnNumber: 19
                            }, this),
                            /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-white truncate pr-1 mt-0.5", dir: "ltr", children: bike.specs.engine }, void 0, false, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 411,
                              columnNumber: 19
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 407,
                            columnNumber: 17
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "p-1.5 border border-white/[0.03] rounded-xl bg-white/[0.01]", children: [
                            /* @__PURE__ */ jsxDEV("span", { className: "text-gray-500 text-[8.5px] flex items-center gap-1 uppercase", children: [
                              /* @__PURE__ */ jsxDEV(Gauge, { className: "w-3 h-3 text-brand-secondary animate-pulse" }, void 0, false, {
                                fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                lineNumber: 416,
                                columnNumber: 21
                              }, this),
                              " ",
                              t("clock_speed")
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 415,
                              columnNumber: 19
                            }, this),
                            /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-white mt-0.5", dir: "ltr", children: bike.specs.topSpeed }, void 0, false, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 418,
                              columnNumber: 19
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 414,
                            columnNumber: 17
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "p-1.5 border border-[#6366F1]/10 border-dashed rounded-xl bg-white/[0.01]", children: [
                            /* @__PURE__ */ jsxDEV("span", { className: "text-gray-500 text-[8.5px] flex items-center gap-1 uppercase", children: [
                              /* @__PURE__ */ jsxDEV(Droplet, { className: "w-3 h-3 text-brand-accent" }, void 0, false, {
                                fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                lineNumber: 423,
                                columnNumber: 21
                              }, this),
                              " ",
                              t("energy_consumption")
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 422,
                              columnNumber: 19
                            }, this),
                            /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-white mt-0.5", dir: "ltr", children: bike.specs.fuelConsumption }, void 0, false, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 425,
                              columnNumber: 19
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 421,
                            columnNumber: 17
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "p-1.5 border border-[#6366F1]/10 border-dashed rounded-xl bg-white/[0.01]", children: [
                            /* @__PURE__ */ jsxDEV("span", { className: "text-gray-500 text-[8.5px] flex items-center gap-1 uppercase", children: [
                              /* @__PURE__ */ jsxDEV(Cpu, { className: "w-3 h-3 text-brand-secondary" }, void 0, false, {
                                fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                lineNumber: 430,
                                columnNumber: 21
                              }, this),
                              " ",
                              t("output_capacity")
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 429,
                              columnNumber: 19
                            }, this),
                            /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-white mt-0.5", dir: "ltr", children: bike.specs.power }, void 0, false, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 432,
                              columnNumber: 19
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 428,
                            columnNumber: 17
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "col-span-2 p-2.5 bg-black/40 border border-white/[0.05] rounded-xl font-sans text-[11px] text-gray-400 leading-relaxed overflow-y-auto max-h-[140px] text-right", dir, children: [
                            /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-white font-mono text-[9px] mb-1 text-left uppercase", dir: "ltr", children: bike.name }, void 0, false, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 437,
                              columnNumber: 19
                            }, this),
                            /* @__PURE__ */ jsxDEV("p", { className: "text-gray-300", children: bike.shortDesc }, void 0, false, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 438,
                              columnNumber: 19
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "mt-2 pt-2 border-t border-white/10 text-gray-400", children: bike.longDesc }, void 0, false, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 439,
                              columnNumber: 19
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 436,
                            columnNumber: 17
                          }, this)
                        ]
                      },
                      "specs",
                      true,
                      {
                        fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                        lineNumber: 398,
                        columnNumber: 15
                      },
                      this
                    )
                  ) : (
                    /* TAB B: ACCESSORIES & SMART ADD-ONS SELECTOR */
                    /* @__PURE__ */ jsxDEV(
                      motion.div,
                      {
                        initial: { opacity: 0, x: 10 },
                        animate: { opacity: 1, x: 0 },
                        exit: { opacity: 0, x: -10 },
                        transition: { duration: 0.2 },
                        className: "flex flex-col flex-1 overflow-hidden font-mono text-xs no-flip",
                        children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-gray-400 flex items-center justify-between mb-2 pb-1 border-b border-white/5", dir, children: [
                            /* @__PURE__ */ jsxDEV("span", { className: "font-bold flex items-center gap-1", children: [
                              /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-3.5 h-3.5 text-brand-accent" }, void 0, false, {
                                fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                lineNumber: 454,
                                columnNumber: 21
                              }, this),
                              lang === "ar" ? "اختر الكماليات والإضافات:" : "SELECT PREMIUM PLUG-IN ADD-ONS:"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 453,
                              columnNumber: 19
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] shrink-0 font-bold text-[#A855F7] animate-pulse", children: [
                              selectedAddOnIds.length,
                              " ",
                              lang === "ar" ? "محدد" : "SELECTED"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 457,
                              columnNumber: 19
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 452,
                            columnNumber: 17
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 overflow-y-auto flex-1 max-h-[220px] pr-1 scrollbar-thin", dir, children: activeAddOns.length > 0 ? activeAddOns.map((addon) => {
                            const isChecked = selectedAddOnIds.includes(addon.id);
                            const displayAddonName = lang === "ar" && addon.nameAr ? addon.nameAr : addon.name;
                            const displayAddonDesc = lang === "ar" && addon.descAr ? addon.descAr : addon.description;
                            return /* @__PURE__ */ jsxDEV(
                              "div",
                              {
                                onClick: (e) => toggleAddOn(addon.id, e),
                                className: `flex flex-col justify-between p-2 rounded-xl border relative cursor-pointer select-none transition-all duration-300 hover:scale-[1.03] ${isChecked ? "bg-[#22D3EE]/5 border-brand-accent/40 shadow-[0_0_12px_rgba(34,211,238,0.15)] ring-1 ring-brand-accent/30" : "bg-[#0F172A]/80 border-white/[0.04] hover:bg-white/[0.02] hover:border-white/10 hover:shadow-[0_0_8px_rgba(255,255,255,0.05)]"}`,
                                children: [
                                  /* @__PURE__ */ jsxDEV("div", { className: `absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center border transition-all ${isChecked ? "bg-brand-accent border-brand-accent text-[#0B0F1A]" : "border-white/20 bg-black/50"}`, children: isChecked && /* @__PURE__ */ jsxDEV(Check, { className: "w-2.5 h-2.5 stroke-[3]" }, void 0, false, {
                                    fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                    lineNumber: 486,
                                    columnNumber: 43
                                  }, this) }, void 0, false, {
                                    fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                    lineNumber: 481,
                                    columnNumber: 27
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center text-center gap-1.5 pt-1", children: [
                                    addon.image && /* @__PURE__ */ jsxDEV(
                                      "img",
                                      {
                                        src: addon.image,
                                        alt: addon.name,
                                        className: "w-12 h-12 rounded-lg object-cover border border-white/10 shadow-md shadow-black/40",
                                        referrerPolicy: "no-referrer"
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                        lineNumber: 492,
                                        columnNumber: 31
                                      },
                                      this
                                    ),
                                    /* @__PURE__ */ jsxDEV("div", { className: "leading-tight w-full", children: [
                                      /* @__PURE__ */ jsxDEV("p", { className: "font-bold text-white text-[10px] truncate", title: displayAddonName, children: displayAddonName }, void 0, false, {
                                        fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                        lineNumber: 501,
                                        columnNumber: 31
                                      }, this),
                                      /* @__PURE__ */ jsxDEV("p", { className: "text-[8px] text-gray-500 truncate", title: displayAddonDesc, children: displayAddonDesc }, void 0, false, {
                                        fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                        lineNumber: 502,
                                        columnNumber: 31
                                      }, this)
                                    ] }, void 0, true, {
                                      fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                      lineNumber: 500,
                                      columnNumber: 29
                                    }, this)
                                  ] }, void 0, true, {
                                    fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                    lineNumber: 489,
                                    columnNumber: 27
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("div", { className: "text-center mt-2 pt-1 border-t border-white/[0.05] shrink-0", children: /* @__PURE__ */ jsxDEV("span", { className: "text-[9.5px] font-bold text-brand-accent", children: [
                                    "+",
                                    formatPrice(addon.price)
                                  ] }, void 0, true, {
                                    fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                    lineNumber: 507,
                                    columnNumber: 29
                                  }, this) }, void 0, false, {
                                    fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                    lineNumber: 506,
                                    columnNumber: 27
                                  }, this)
                                ]
                              },
                              addon.id,
                              true,
                              {
                                fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                                lineNumber: 471,
                                columnNumber: 25
                              },
                              this
                            );
                          }) : /* @__PURE__ */ jsxDEV("div", { className: "col-span-2 text-center py-8 text-gray-500 text-[10px] font-mono lowercase", children: lang === "ar" ? "لا يوجد إضافات متوفرة لطلبها حالياً" : "No compatible accessories located." }, void 0, false, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 513,
                            columnNumber: 21
                          }, this) }, void 0, false, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 463,
                            columnNumber: 17
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "bg-black/40 border border-white/[0.05] p-2 mt-2 rounded-xl flex items-center justify-between text-[11px] shrink-0", dir, children: [
                            /* @__PURE__ */ jsxDEV("div", { className: "text-[9.5px] text-gray-400", children: lang === "ar" ? "سعر الخيار الكلي المباشر:" : "ACTIVE TOTAL DYNAMIC PRICE:" }, void 0, false, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 521,
                              columnNumber: 19
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "text-brand-accent font-extrabold text-sm tracking-wider", children: formatPrice(totalLivePriceUsd) }, void 0, false, {
                              fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                              lineNumber: 524,
                              columnNumber: 19
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 520,
                            columnNumber: 17
                          }, this)
                        ]
                      },
                      "addons",
                      true,
                      {
                        fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                        lineNumber: 444,
                        columnNumber: 15
                      },
                      this
                    )
                  ) }, void 0, false, {
                    fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                    lineNumber: 395,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "pt-3.5 border-t border-white/[0.08] flex items-center justify-between gap-3 mt-auto no-flip shrink-0", children: [
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: (e) => onOpenPdf(bike, e),
                        className: "px-4 py-2 rounded-xl border border-white/[0.08] hover:border-brand-accent font-mono text-xs font-semibold text-gray-300 hover:text-white bg-[#0B0F1A]/50 transition-all duration-200 flex items-center gap-2 select-none pointer-events-auto cursor-pointer",
                        title: "Open specifications PDF Catalog",
                        id: `pdf-btn-${bike.id}`,
                        children: [
                          /* @__PURE__ */ jsxDEV(FileText, { className: "w-4 h-4 text-brand-accent" }, void 0, false, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 543,
                            columnNumber: 15
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { children: t("catalog_btn") }, void 0, false, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 544,
                            columnNumber: 15
                          }, this)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                        lineNumber: 537,
                        columnNumber: 13
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: handleBookNowClick,
                        className: "flex-1 py-2 rounded-xl font-mono text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-brand-primary to-brand-accent hover:brightness-110 active:scale-95 transition-all scroll-smooth shadow-md shadow-brand-primary/10 select-none cursor-pointer flex items-center justify-center gap-1 uppercase",
                        id: `book-now-card-${bike.id}`,
                        children: [
                          /* @__PURE__ */ jsxDEV("span", { children: t("book_now") }, void 0, false, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 553,
                            columnNumber: 15
                          }, this),
                          /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-3.5 h-3.5" }, void 0, false, {
                            fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                            lineNumber: 554,
                            columnNumber: 15
                          }, this)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                        lineNumber: 548,
                        columnNumber: 13
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                    lineNumber: 534,
                    columnNumber: 11
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/MotorcycleCard.tsx",
                lineNumber: 360,
                columnNumber: 9
              },
              this
            )
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/MotorcycleCard.tsx",
          lineNumber: 159,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    false,
    {
      fileName: "/app/applet/src/components/MotorcycleCard.tsx",
      lineNumber: 154,
      columnNumber: 5
    },
    this
  );
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vdG9yY3ljbGVDYXJkLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG1vdGlvbiwgQW5pbWF0ZVByZXNlbmNlIH0gZnJvbSAnbW90aW9uL3JlYWN0JztcbmltcG9ydCB7IEhlYXJ0LCBaYXAsIEdhdWdlLCBEcm9wbGV0LCBGdWVsLCBDcHUsIEtleSwgRmlsZVRleHQsIENoZXZyb25SaWdodCwgUmVmcmVzaEN3LCBTcGFya2xlcywgQXdhcmQsIFNoYXJlMiwgQ2hlY2ssIENvcHksIFgsIExpc3RDb2xsYXBzZSwgU2hvcHBpbmdCYWcgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgTW90b3JjeWNsZSwgQ2F0ZWdvcnlTbHVnLCBBZGRPbiB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHVzZUxhbmd1YWdlIH0gZnJvbSAnLi4vY29udGV4dC9MYW5ndWFnZUNvbnRleHQnO1xuXG5pbnRlcmZhY2UgTW90b3JjeWNsZUNhcmRQcm9wcyB7XG4gIGtleT86IHN0cmluZyB8IG51bWJlcjtcbiAgYmlrZTogTW90b3JjeWNsZTtcbiAgaXNGYXZvcml0ZTogYm9vbGVhbjtcbiAgb25Ub2dnbGVGYXZvcml0ZTogKGlkOiBzdHJpbmcsIGU6IGFueSkgPT4gdm9pZDtcbiAgb25PcGVuUGRmOiAoYmlrZTogTW90b3JjeWNsZSwgZTogYW55KSA9PiB2b2lkO1xuICBvbk9wZW5Cb29raW5nOiAoaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjYXQ6IENhdGVnb3J5U2x1ZywgcHJpY2U6IHN0cmluZywgZT86IGFueSwgc2VsZWN0ZWRBZGRPbklkcz86IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNb3RvcmN5Y2xlQ2FyZCh7XG4gIGJpa2UsXG4gIGlzRmF2b3JpdGUsXG4gIG9uVG9nZ2xlRmF2b3JpdGUsXG4gIG9uT3BlblBkZixcbiAgb25PcGVuQm9va2luZyxcbn06IE1vdG9yY3ljbGVDYXJkUHJvcHMpIHtcbiAgY29uc3QgW2lzRmxpcHBlZCwgc2V0SXNGbGlwcGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NoYXJlT3Blbiwgc2V0U2hhcmVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2NvcGllZCwgc2V0Q29waWVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2JhY2tUYWIsIHNldEJhY2tUYWJdID0gdXNlU3RhdGU8J3NwZWNzJyB8ICdhZGRvbnMnPignc3BlY3MnKTtcbiAgY29uc3QgW3NlbGVjdGVkQWRkT25JZHMsIHNldFNlbGVjdGVkQWRkT25JZHNdID0gdXNlU3RhdGU8c3RyaW5nW10+KFtdKTtcbiAgY29uc3QgeyBsYW5nLCBkaXIsIHQgfSA9IHVzZUxhbmd1YWdlKCk7XG5cbiAgY29uc3QgaGFuZGxlQ2FyZENsaWNrID0gKGU6IGFueSkgPT4ge1xuICAgIC8vIElmIGNsaWNraW5nIHRhcmdldCBpcyBhIGJ1dHRvbiBvciBpcyBpbnNpZGUgc2hhcmUgbWVudSwgZG8gbm90IGZsaXBcbiAgICBpZiAoZS50YXJnZXQuY2xvc2VzdCgnLm5vLWZsaXAnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRJc0ZsaXBwZWQoIWlzRmxpcHBlZCk7XG4gIH07XG5cbiAgLy8gQ29sb3IgdGhlbWUgc2VsZWN0b3JzIGJhc2VkIG9uIGJpa2UgY2F0ZWdvcnlcbiAgY29uc3QgZ2V0VGhlbWVDb2xvciA9ICgpID0+IHtcbiAgICBzd2l0Y2ggKGJpa2UuY2F0ZWdvcnkpIHtcbiAgICAgIGNhc2UgJ0EnOiByZXR1cm4geyBib3JkZXI6ICdncm91cC1ob3Zlcjpib3JkZXItYnJhbmQtYWNjZW50LzQwJywgdGV4dDogJ3RleHQtYnJhbmQtYWNjZW50Jywgc2hhZG93OiAnaG92ZXI6c2hhZG93LVswXzBfMjVweF9yZ2JhKDM0LDIxMSwyMzgsMC4yKV0nLCBnbG93OiAnZ2xvdy1jeWFuJywgYmc6ICdiZy1icmFuZC1hY2NlbnQvMTAnLCBib3JkZXJTb2xpZDogJ2JvcmRlci1icmFuZC1hY2NlbnQvMjAnIH07XG4gICAgICBjYXNlICdCJzogcmV0dXJuIHsgYm9yZGVyOiAnZ3JvdXAtaG92ZXI6Ym9yZGVyLWJyYW5kLXNlY29uZGFyeS80MCcsIHRleHQ6ICd0ZXh0LWJyYW5kLXNlY29uZGFyeScsIHNoYWRvdzogJ2hvdmVyOnNoYWRvdy1bMF8wXzI1cHhfcmdiYSgxNjgsODUsMjQ3LDAuMildJywgZ2xvdzogJ2dsb3ctcHVycGxlJywgYmc6ICdiZy1icmFuZC1zZWNvbmRhcnkvMTAnLCBib3JkZXJTb2xpZDogJ2JvcmRlci1icmFuZC1zZWNvbmRhcnkvMjAnIH07XG4gICAgICBjYXNlICdDJzogcmV0dXJuIHsgYm9yZGVyOiAnZ3JvdXAtaG92ZXI6Ym9yZGVyLW9yYW5nZS00MDAvNDAnLCB0ZXh0OiAndGV4dC1vcmFuZ2UtNDAwJywgc2hhZG93OiAnaG92ZXI6c2hhZG93LVswXzBfMjVweF9yZ2JhKDI1MSwxNDYsNjAsMC4xNSldJywgZ2xvdzogJ3RleHQtc2hhZG93OiAwIDAgMTBweCByZ2JhKDI1MSwxNDYsNjAsMC41KScsIGJnOiAnYmctb3JhbmdlLTQ1MC8xMCcsIGJvcmRlclNvbGlkOiAnYm9yZGVyLW9yYW5nZS00MDAvMjAnIH07XG4gICAgICBkZWZhdWx0OiByZXR1cm4geyBib3JkZXI6ICdncm91cC1ob3Zlcjpib3JkZXItYnJhbmQtYWNjZW50LzQwJywgdGV4dDogJ3RleHQtYnJhbmQtYWNjZW50Jywgc2hhZG93OiAnaG92ZXI6c2hhZG93LVswXzBfMjVweF9yZ2JhKDM0LDIxMSwyMzgsMC4xNSldJywgZ2xvdzogJ2dsb3ctY3lhbicsIGJnOiAnYmctYnJhbmQtYWNjZW50LzEwJywgYm9yZGVyU29saWQ6ICdib3JkZXItYnJhbmQtYWNjZW50LzIwJyB9O1xuICAgIH1cbiAgfTtcblxuICBjb25zdCB0aGVtZUNvbG9ycyA9IGdldFRoZW1lQ29sb3IoKTtcblxuICAvLyBQcmljZSBDYWxjdWxhdGlvbiBsb2dpY1xuICBjb25zdCBvcmlnaW5hbFByaWNlVXNkID0gYmlrZS5vcmlnaW5hbFByaWNlIHx8IGJpa2UucHJpY2VOdW07XG4gIGNvbnN0IGlzRGlzY291bnRlZCA9ICEhKGJpa2Uub3JpZ2luYWxQcmljZSAmJiBiaWtlLmRpc2NvdW50ICYmIGJpa2UuZGlzY291bnQgPiAwKTtcblxuICBjb25zdCBnZXREaXNjb3VudGVkUHJpY2VVc2QgPSAoKSA9PiB7XG4gICAgaWYgKGlzRGlzY291bnRlZCAmJiBiaWtlLmRpc2NvdW50ICYmIGJpa2Uub3JpZ2luYWxQcmljZSkge1xuICAgICAgaWYgKGJpa2UuZGlzY291bnRUeXBlID09PSAncGVyY2VudGFnZScpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIGJpa2Uub3JpZ2luYWxQcmljZSAqICgxIC0gYmlrZS5kaXNjb3VudCAvIDEwMCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIGJpa2Uub3JpZ2luYWxQcmljZSAtIGJpa2UuZGlzY291bnQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYmlrZS5wcmljZU51bTtcbiAgfTtcblxuICBjb25zdCBiYXNlUHJpY2VVc2QgPSBnZXREaXNjb3VudGVkUHJpY2VVc2QoKTtcblxuICAvLyBTZWxlY3RlZCBhZGQtb25zIHByaWNpbmdcbiAgY29uc3QgYWN0aXZlQWRkT25zID0gYmlrZS5hZGRPbnMgfHwgW107XG4gIGNvbnN0IHNlbGVjdGVkQWRkT25zUHJpY2VVc2QgPSBhY3RpdmVBZGRPbnNcbiAgICAuZmlsdGVyKGFkZG9uID0+IHNlbGVjdGVkQWRkT25JZHMuaW5jbHVkZXMoYWRkb24uaWQpKVxuICAgIC5yZWR1Y2UoKHN1bSwgYWRkb24pID0+IHN1bSArIGFkZG9uLnByaWNlLCAwKTtcblxuICBjb25zdCB0b3RhbExpdmVQcmljZVVzZCA9IGJhc2VQcmljZVVzZCArIHNlbGVjdGVkQWRkT25zUHJpY2VVc2Q7XG5cbiAgY29uc3QgZm9ybWF0UHJpY2UgPSAodXNkOiBudW1iZXIpID0+IHtcbiAgICBpZiAobGFuZyA9PT0gJ2FyJykge1xuICAgICAgcmV0dXJuIGAke3VzZC50b0xvY2FsZVN0cmluZygpfSDYrNmG2YrZh2A7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHt1c2QudG9Mb2NhbGVTdHJpbmcoKX0gRUdQYDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0U2hhcmVkTWVzc2FnZSA9ICgpID0+IHtcbiAgICBjb25zdCBmb3JtYXR0ZWRUb3RhbCA9IGZvcm1hdFByaWNlKHRvdGFsTGl2ZVByaWNlVXNkKTtcbiAgICBsZXQgYWRkb25zTGlzdE1zZyA9ICcnO1xuICAgIGlmIChzZWxlY3RlZEFkZE9uSWRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG5hbWVzID0gYWN0aXZlQWRkT25zXG4gICAgICAgIC5maWx0ZXIoYSA9PiBzZWxlY3RlZEFkZE9uSWRzLmluY2x1ZGVzKGEuaWQpKVxuICAgICAgICAubWFwKGEgPT4gbGFuZyA9PT0gJ2FyJyAmJiBhLm5hbWVBciA/IGEubmFtZUFyIDogYS5uYW1lKVxuICAgICAgICAuam9pbignLCAnKTtcbiAgICAgIGFkZG9uc0xpc3RNc2cgPSBsYW5nID09PSAnYXInID8gYFxcbtin2YTYpdi22KfZgdin2Ko6ICR7bmFtZXN9YCA6IGBcXG5BZGQtb25zOiAke25hbWVzfWA7XG4gICAgfVxuXG4gICAgaWYgKGxhbmcgPT09ICdhcicpIHtcbiAgICAgIHJldHVybiBg2LTYp9mH2K8g2YfYsNinINin2YTZhdmI2KrZiNiz2YrZg9mEINmF2YYgRWxLaG9seSBNb3RvcnM6XG5bJHtiaWtlLm5hbWV9XSR7YWRkb25zTGlzdE1zZ31cbtin2YTYs9i52LEg2KfZhNil2KzZhdin2YTZijogJHtmb3JtYXR0ZWRUb3RhbH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYENoZWNrIG91dCB0aGlzIG1vdG9yY3ljbGUgZnJvbSBFbEtob2x5IE1vdG9yczpcblske2Jpa2UubmFtZX1dJHthZGRvbnNMaXN0TXNnfVxuVG90YWwgUHJpY2U6ICR7Zm9ybWF0dGVkVG90YWx9YDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2hhcmVDbGljayA9IChwbGF0Zm9ybTogJ3dhJyB8ICdmYicgfCAneCcgfCAnY29weScsIGU6IGFueSkgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IG1zZyA9IGdldFNoYXJlZE1lc3NhZ2UoKTtcbiAgICBjb25zdCBjdXJyZW50VXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5cbiAgICBpZiAocGxhdGZvcm0gPT09ICd3YScpIHtcbiAgICAgIGNvbnN0IHVybCA9IGBodHRwczovL3dhLm1lLz90ZXh0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG1zZyArICdcXG4nICsgY3VycmVudFVybCl9YDtcbiAgICAgIHdpbmRvdy5vcGVuKHVybCwgJ19ibGFuaycpO1xuICAgIH0gZWxzZSBpZiAocGxhdGZvcm0gPT09ICdmYicpIHtcbiAgICAgIGNvbnN0IHVybCA9IGBodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0ke2VuY29kZVVSSUNvbXBvbmVudChjdXJyZW50VXJsKX0mcXVvdGU9JHtlbmNvZGVVUklDb21wb25lbnQobXNnKX1gO1xuICAgICAgd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XG4gICAgfSBlbHNlIGlmIChwbGF0Zm9ybSA9PT0gJ3gnKSB7XG4gICAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dGV4dD0ke2VuY29kZVVSSUNvbXBvbmVudChtc2cgKyAnXFxuJyArIGN1cnJlbnRVcmwpfWA7XG4gICAgICB3aW5kb3cub3Blbih1cmwsICdfYmxhbmsnKTtcbiAgICB9IGVsc2UgaWYgKHBsYXRmb3JtID09PSAnY29weScpIHtcbiAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGAke21zZ31cXG4ke2N1cnJlbnRVcmx9YCk7XG4gICAgICBzZXRDb3BpZWQodHJ1ZSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHNldENvcGllZChmYWxzZSksIDIwMDApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCB0b2dnbGVBZGRPbiA9IChpZDogc3RyaW5nLCBlOiBhbnkpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmIChzZWxlY3RlZEFkZE9uSWRzLmluY2x1ZGVzKGlkKSkge1xuICAgICAgc2V0U2VsZWN0ZWRBZGRPbklkcyhzZWxlY3RlZEFkZE9uSWRzLmZpbHRlcih4ID0+IHggIT09IGlkKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFNlbGVjdGVkQWRkT25JZHMoWy4uLnNlbGVjdGVkQWRkT25JZHMsIGlkXSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUJvb2tOb3dDbGljayA9IChlOiBhbnkpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIG9uT3BlbkJvb2tpbmcoXG4gICAgICBiaWtlLmlkLFxuICAgICAgYmlrZS5uYW1lLFxuICAgICAgYmlrZS5jYXRlZ29yeSxcbiAgICAgIGZvcm1hdFByaWNlKHRvdGFsTGl2ZVByaWNlVXNkKSxcbiAgICAgIGUsXG4gICAgICBzZWxlY3RlZEFkZE9uSWRzXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgXG4gICAgICBvbkNsaWNrPXtoYW5kbGVDYXJkQ2xpY2t9XG4gICAgICBjbGFzc05hbWU9e2BwZXJzcGVjdGl2ZS0xMDAwIGgtWzUwMHB4XSB3LWZ1bGwgbWluLXctWzI4MHB4XSBjdXJzb3ItcG9pbnRlciBncm91cCBwb2ludGVyLWV2ZW50cy1hdXRvYH1cbiAgICAgIGlkPXtgYmlrZS1jYXJkLSR7YmlrZS5pZH1gfVxuICAgID5cbiAgICAgIDxkaXYgXG4gICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHctZnVsbCBoLWZ1bGwgZHVyYXRpb24tNzAwIHByZXNlcnZlLTNkIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgaXNGbGlwcGVkID8gJ3JvdGF0ZS15LTE4MCcgOiAnJ1xuICAgICAgICB9YH1cbiAgICAgID5cbiAgICAgICAgXG4gICAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PSBGUk9OVCBTSURFIE9GIE1PVE9SQ1lDTEUgQ0FSRCA9PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgPGRpdiBcbiAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSBpbnNldC0wIHctZnVsbCBoLWZ1bGwgYmFja2ZhY2UtaGlkZGVuIGdsYXNzLXBhbmVsIHJvdW5kZWQtM3hsIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSAke3RoZW1lQ29sb3JzLmJvcmRlcn0gJHt0aGVtZUNvbG9ycy5zaGFkb3d9IGZsZXggZmxleC1jb2wgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNTAwYH1cbiAgICAgICAgPlxuICAgICAgICAgIHsvKiBUb3AgSW5mbyByb3cgKENhdGVnb3J5ICsgRmF2b3JpdGVzIGJ1dHRvbiArIFNoYXJlIHRvZ2dsZSArIENhdGFsb2cgaW5kaWNhdG9yKSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC00IGxlZnQtNCByaWdodC00IHotMTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0zIHB5LTEgYmctYmxhY2svNjAgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LXNlbWlib2xkIHRyYWNraW5nLXdpZGVzdCB0ZXh0LVsjRTVFN0VCXSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICB7dCgnY2F0XycgKyBiaWtlLmNhdGVnb3J5KS5yZXBsYWNlKCfZgdim2KknLCAnJykucmVwbGFjZSgnU2VyaWVzJywgJycpfVxuICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICB7LyogSWNvbnMgQWN0aW9uIEdyaWQgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgbm8tZmxpcFwiPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgey8qIEN1c3RvbSB1cGxvYWRlZCBjYXRhbG9nIGhhbG8gaWNvbiBpbmRpY2F0b3IgKi99XG4gICAgICAgICAgICAgIHsoYmlrZS5jYXRhbG9nRmlsZUNvbnRlbnQgfHwgYmlrZS5jYXRhbG9nRmlsZU5hbWUpICYmIChcbiAgICAgICAgICAgICAgICA8YSBcbiAgICAgICAgICAgICAgICAgIGhyZWY9e2Jpa2UuY2F0YWxvZ0ZpbGVDb250ZW50IHx8IFwiI1wifVxuICAgICAgICAgICAgICAgICAgZG93bmxvYWQ9e2Jpa2UuY2F0YWxvZ0ZpbGVOYW1lIHx8IGAke2Jpa2UubmFtZX0tY2F0YWxvZy5wZGZgfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItYmx1ZS01MDAvMzAgYmctYmx1ZS01MDAvMTAgdGV4dC1icmFuZC1hY2NlbnQgaG92ZXI6YmctYmx1ZS01MDAvMjUgaG92ZXI6c2NhbGUtMTEwIGhvdmVyOnNoYWRvdy1sZyBob3ZlcjpzaGFkb3ctYmx1ZS01MDAvMTAgYWN0aXZlOnNjYWxlLTk1IHRyYW5zaXRpb24tYWxsIHRleHQtd2hpdGUgY3Vyc29yLXBvaW50ZXIgc2VsZWN0LW5vbmUgbm8tZmxpcCBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2xhbmcgPT09ICdhcicgPyAn2KrYrdmF2YrZhCDYp9mE2YPYqtin2YTZiNisINin2YTYsdmC2YXZiiBQREYg2KfZhNmF2K7Ytdi1JyA6ICdEb3dubG9hZCBDdXN0b20gc3BlYyBQREYgQ2F0YWxvZyd9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPEZpbGVUZXh0IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1bIzIyRDNFRV1cIiAvPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICB7LyogU2hhcmUgUG9wb3ZlciBTd2l0Y2ggYnV0dG9uICovfVxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgc2V0U2hhcmVPcGVuKCFzaGFyZU9wZW4pOyB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiBzbTpwLTIuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDZdIGJnLWJsYWNrLzUwIGhvdmVyOmJnLWJsYWNrLzc1IGhvdmVyOnNjYWxlLTExMCBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgdGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlciBzZWxlY3Qtbm9uZVwiXG4gICAgICAgICAgICAgICAgdGl0bGU9e3QoJ3NoYXJlX3RpdGxlJyl9XG4gICAgICAgICAgICAgICAgaWQ9e2BzaGFyZS1idG4tJHtiaWtlLmlkfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8U2hhcmUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1bIzIyRDNFRV0gaG92ZXI6dGV4dC13aGl0ZVwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIHsvKiBGYXZvcml0ZSBidXR0b24gKCDinaTvuI8gKSAqL31cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiBvblRvZ2dsZUZhdm9yaXRlKGJpa2UuaWQsIGUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiBzbTpwLTIuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDZdIGJnLWJsYWNrLzUwIGhvdmVyOmJnLWJsYWNrLzc1IGhvdmVyOnNjYWxlLTExMCBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgdGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlciBzZWxlY3Qtbm9uZVwiXG4gICAgICAgICAgICAgICAgdGl0bGU9e2lzRmF2b3JpdGUgPyBcIlJlbW92ZSBmcm9tIEZhdm9yaXRlc1wiIDogXCJBZGQgdG8gRmF2b3JpdGVzXCJ9XG4gICAgICAgICAgICAgICAgaWQ9e2BmYXYtYnRuLSR7YmlrZS5pZH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEhlYXJ0IFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy00IGgtNCB0cmFuc2l0aW9uLXRyYW5zZm9ybSAke1xuICAgICAgICAgICAgICAgICAgICBpc0Zhdm9yaXRlID8gJ2ZpbGwtcmVkLTUwMCB0ZXh0LXJlZC01MDAgc2NhbGUtMTA1JyA6ICd0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtcmVkLTQwMCdcbiAgICAgICAgICAgICAgICAgIH1gfSBcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEdsb3dpbmcgU2hhcmUgcG9wdXAgZGlhbG9nIG92ZXJsYXkgaW5zaWRlIENhcmQgY29udGV4dCAqL31cbiAgICAgICAgICA8QW5pbWF0ZVByZXNlbmNlPlxuICAgICAgICAgICAge3NoYXJlT3BlbiAmJiAoXG4gICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCBzY2FsZTogMC45NSwgeTogLTEwIH19XG4gICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCBzY2FsZTogMSwgeTogMCB9fVxuICAgICAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCwgc2NhbGU6IDAuOTUsIHk6IC0xMCB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xNiBsZWZ0LTQgcmlnaHQtNCB6LTMwIGJnLVsjMEYxNzJBXS85NSBiYWNrZHJvcC1ibHVyLW1kIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC0yeGwgcC00IG5vLWZsaXAgc2hhZG93LTJ4bCBzcGFjZS15LTNcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItMS41XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LVsjMjJEM0VFXVwiPlxuICAgICAgICAgICAgICAgICAgICB7dCgnc2hhcmVfb3B0aW9ucycpfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgc2V0U2hhcmVPcGVuKGZhbHNlKTsgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSByb3VuZGVkIGJnLXdoaXRlLzVcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiB0ZXh0LVsxMXB4XSBmb250LW1vbm8gZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4gaGFuZGxlU2hhcmVDbGljaygnd2EnLCBlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBwLTIgYmctZ3JlZW4tNTAwLzEwIGJvcmRlciBib3JkZXItZ3JlZW4tNTAwLzIwIHRleHQtZ3JlZW4tNDAwIGhvdmVyOmJnLWdyZWVuLTUwMC8yMCByb3VuZGVkLXhsIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+8J+foiBXaGF0c0FwcDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4gaGFuZGxlU2hhcmVDbGljaygnZmInLCBlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBwLTIgYmctYmx1ZS01MDAvMTAgYm9yZGVyIGJvcmRlci1ibHVlLTUwMC8yMCB0ZXh0LWJsdWUtNDAwIGhvdmVyOmJnLWJsdWUtNTAwLzIwIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj7wn5S1IEZhY2Vib29rPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiBoYW5kbGVTaGFyZUNsaWNrKCd4JywgZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcC0yIGJnLWdyYXktODAwLzU1IGJvcmRlciBib3JkZXItd2hpdGUvMTAgdGV4dC13aGl0ZSBob3ZlcjpiZy13aGl0ZS8xMCByb3VuZGVkLXhsIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+4pqrIFR3aXR0ZXIgKFgpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiBoYW5kbGVTaGFyZUNsaWNrKCdjb3B5JywgZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcC0yIGJnLWJyYW5kLWFjY2VudC8xMCBib3JkZXIgYm9yZGVyLWJyYW5kLWFjY2VudC8yMCB0ZXh0LVsjMjJEM0VFXSBob3ZlcjpiZy1icmFuZC1hY2NlbnQvMjAgcm91bmRlZC14bCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtjb3BpZWQgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1ncmVlbi00MDBcIiAvPiA6IDxDb3B5IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz59XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntjb3BpZWQgPyAnQ29waWVkIScgOiB0KCdjb3B5X2xpbmsnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBNaWNybyBQcmV2aWV3IG9mIG1lc3NhZ2UgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ibGFjay80MCBib3JkZXIgYm9yZGVyLXdoaXRlLzUgcC0yIHJvdW5kZWQtbGcgdGV4dC1bOXB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtc2FucyBsZWFkaW5nLXRpZ2h0IHRleHQtcmlnaHRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICB7Z2V0U2hhcmVkTWVzc2FnZSgpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuXG4gICAgICAgICAgey8qIFBvcHVsYXIgVGFnICovfVxuICAgICAgICAgIHtiaWtlLmlzUG9wdWxhciAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGFic29sdXRlIHRvcC0xNiAke2RpciA9PT0gJ3J0bCcgPyAncmlnaHQtNCcgOiAnbGVmdC00J30gei0xMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMSBiZy1yZWQtNTAwLzEwIGJvcmRlciBib3JkZXItcmVkLTUwMC8zMCByb3VuZGVkLXhsYH0+XG4gICAgICAgICAgICAgIDxBd2FyZCBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtcmVkLTUwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSBmb250LW1vbm8gZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgdGV4dC1yZWQtNDAwXCI+XG4gICAgICAgICAgICAgICAge3QoJ2Nyb3duZWRfcG9wdWxhcicpfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIEdsb3dpbmcgQWN0aXZlIE9mZmVyIExhYmVsICovfVxuICAgICAgICAgIHtiaWtlLm9mZmVyTGFiZWwgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BhYnNvbHV0ZSB0b3AtMTYgJHtkaXIgPT09ICdydGwnID8gJ2xlZnQtNCcgOiAncmlnaHQtNCd9IHotMTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEgYmctWyMyMkQzRUVdLzE1IGJvcmRlciBib3JkZXItWyMyMkQzRUVdLzQwIHJvdW5kZWQteGwgc2hhZG93LVswXzBfMTVweF9yZ2JhKDM0LDIxMSwyMzgsMC4yNSldIGFuaW1hdGUtcHVsc2VgfT5cbiAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1bIzIyRDNFRV1cIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCB0ZXh0LVsjMjJEM0VFXVwiPlxuICAgICAgICAgICAgICAgIHtiaWtlLm9mZmVyTGFiZWx9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7LyogUHJvZHVjdCBUaHVtYm5haWwgYmxvY2sgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1bMjQwcHhdIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBiZy1ncmFkaWVudC10by1iIGZyb20tWyMxMTE4MjddLzEwIHRvLVsjMDcwQTExXS8zMFwiPlxuICAgICAgICAgICAgey8qIFZpc3VhbCBiYWNrZ3JvdW5kIGF0bW9zcGhlcmljIGhhbG8gc3RyaXAgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGFic29sdXRlIGJvdHRvbS0wIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgdy00OCBoLTEyIHJvdW5kZWQtZnVsbCAke3RoZW1lQ29sb3JzLmJnfSBmaWx0ZXIgYmx1ci14bCBvcGFjaXR5LTgwYH0gLz5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9e2Jpa2UuaW1hZ2V9XG4gICAgICAgICAgICAgIGFsdD17YmlrZS5uYW1lfVxuICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBvYmplY3QtY29udGFpbiBwLTQgZ3JvdXAtaG92ZXI6c2NhbGUtMTA1IHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTUwMCBzZWxlY3Qtbm9uZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIENhcmQgTWV0YSBDb250ZW50IERldGFpbHMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgZmxleC0xIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHJlbGF0aXZlIGJnLWdyYWRpZW50LXRvLXQgZnJvbS1ibGFjay84MCB0by1bIzBGMTcyQV0vMTAgdGV4dC1sZWZ0XCIgZGlyPXtkaXIgPT09ICdydGwnID8gJ3J0bCcgOiAnbHRyJ30+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTBweF0gdHJhY2tpbmctd2lkZXN0IHRleHQtZ3JheS00MDAgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgYmxvY2sgbWItMVwiPlxuICAgICAgICAgICAgICAgIHt0KCdjYXRfJyArIGJpa2UuY2F0ZWdvcnkpfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIHsvKiBCUkFORCBDT05TSVNURU5DWTogS0VFUCBCSUtFIE5BTUVTIElOIEVOR0xJU0ggKi99XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGUgZ3JvdXAtaG92ZXI6dGV4dC1icmFuZC1hY2NlbnQgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMzAwIGZvbnQtc2Fuc1wiIGRpcj1cImx0clwiPlxuICAgICAgICAgICAgICAgIHtiaWtlLm5hbWV9XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtYnJhbmQtYWNjZW50LzgwIGl0YWxpYyBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICBcIntiaWtlLnRhZ2xpbmV9XCJcbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS00MDAgZm9udC1zYW5zIGxpbmUtY2xhbXAtMiBtdC0yIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgIHtiaWtlLnNob3J0RGVzY31cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBQcmljZSBkaXNwbGF5IHNlY3Rpb24gd2l0aCBvbGQgc3RyaWtldGhyb3VnaCBzdXBwb3J0ICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0zIGJvcmRlci10IGJvcmRlci13aGl0ZS9bMC4wNV0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlXCI+e3QoJ3N0YXJ0aW5nX3ByaWNlJykucmVwbGFjZSgnUmV0YWlsIFByaWNlJywgJycpfTwvcD5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7aXNEaXNjb3VudGVkID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtZ3JheS01MDAgZm9udC1tb25vIGxpbmUtdGhyb3VnaCBsZWFkaW5nLXRpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAge2Zvcm1hdFByaWNlKG9yaWdpbmFsUHJpY2VVc2QpfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQteGwgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIGZvbnQtbW9ubyAke3RoZW1lQ29sb3JzLmdsb3d9IHRleHQtYnJhbmQtYWNjZW50YH0+XG4gICAgICAgICAgICAgICAgICAgICAge2Zvcm1hdFByaWNlKGJhc2VQcmljZVVzZCl9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e2B0ZXh0LXhsIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciBmb250LW1vbm8gJHt0aGVtZUNvbG9ycy5nbG93fSB0ZXh0LXdoaXRlYH0+XG4gICAgICAgICAgICAgICAgICAgIHtmb3JtYXRQcmljZShiYXNlUHJpY2VVc2QpfVxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBUYXAgdG8gZmxpcCBhY3Rpb24gaW5kaWNhdG9yICovfVxuICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldElzRmxpcHBlZCh0cnVlKTsgc2V0QmFja1RhYignc3BlY3MnKTsgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB5LTEuNSBweC0zIGJnLXdoaXRlL1swLjAzXSBib3JkZXIgYm9yZGVyLXdoaXRlLzUgcm91bmRlZC14bCBmb250LW1vbm8gdGV4dC1bOXB4XSB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnMgbm8tZmxpcFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1icmFuZC1hY2NlbnQgYW5pbWF0ZS1zcGluLXNsb3dcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPnt0KCdleHBsb3JlX3NwZWNzJykudG9VcHBlckNhc2UoKX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qID09PT09PT09PT09PT09PT09PT09IEJBQ0sgU0lERSBPRiBNT1RPUkNZQ0xFIENBUkQgPT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgIDxkaXYgXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB3LWZ1bGwgaC1mdWxsIGJhY2tmYWNlLWhpZGRlbiByb3RhdGUteS0xODAgZ2xhc3MtcGFuZWwgcm91bmRlZC0zeGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItYnJhbmQtYWNjZW50LzIwIGZsZXggZmxleC1jb2wgcC01IFtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbl1cIlxuICAgICAgICA+XG4gICAgICAgICAgey8qIEhlYWRlciBvbiBiYWNrIHNpZGUgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXdoaXRlL1swLjA4XSBwYi0yIG1iLTMgc2hyaW5rLTBcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVs5LjVweF0gdGV4dC1icmFuZC1hY2NlbnQgZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCBmb250LWJvbGQgdXBwZXJjYXNlXCI+e3QoJ3NwZWNpZmljYXRpb25zJyl9PC9wPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGUgbGVhZGluZy1ub25lIGZvbnQtc2FucyBtdC0wLjUgdHJ1bmNhdGUgbWF4LXctWzE1MHB4XVwiIGRpcj1cImx0clwiPntiaWtlLm5hbWV9PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogQmFjayBmbGlwIGNvbnRyb2wgJiBTdWItbmF2aWdhdGlvbiBUYWJzICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IG5vLWZsaXBcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpOyBzZXRCYWNrVGFiKGJhY2tUYWIgPT09ICdzcGVjcycgPyAnYWRkb25zJyA6ICdzcGVjcycpOyB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMSBweC0yIHJvdW5kZWQtbGcgYm9yZGVyIHRleHQtWzlweF0gZm9udC1tb25vIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgYmFja1RhYiA9PT0gJ2FkZG9ucycgXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWJyYW5kLWFjY2VudC8xNSBib3JkZXItYnJhbmQtYWNjZW50LzMwIHRleHQtYnJhbmQtYWNjZW50IHNoYWRvdy1bMF8wXzhweF9yZ2JhKDM0LDIxMSwyMzgsMC4yKV0nXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXdoaXRlLzUgYm9yZGVyLXdoaXRlLzEwIHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICB0aXRsZT1cIlRvZ2dsZSBhY2Nlc3Nvcmllc1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2KXYttin2YHYp9iqJyA6ICdBRERPTlMnfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldElzRmxpcHBlZChmYWxzZSk7IH19XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHB4LTIgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIGJnLXdoaXRlLzUgZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXdoaXRlLzEwIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICB0aXRsZT17dCgnZmxpcF9iYWNrJyl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj57dCgnZmxpcF9iYWNrJyl9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPEFuaW1hdGVQcmVzZW5jZSBtb2RlPVwid2FpdFwiPlxuICAgICAgICAgICAge2JhY2tUYWIgPT09ICdzcGVjcycgPyAoXG4gICAgICAgICAgICAgIC8qIFRBQiBBOiBTUEVDIERFVEFJTFMgTUFUUklYICovXG4gICAgICAgICAgICAgIDxtb3Rpb24uZGl2IFxuICAgICAgICAgICAgICAgIGtleT1cInNwZWNzXCJcbiAgICAgICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHg6IC0xMCB9fVxuICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeDogMCB9fVxuICAgICAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCwgeDogMTAgfX1cbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAwLjIgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC14LTMgZ2FwLXktMiBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1ncmF5LTMwMCBmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIG1heC1oLVszMDVweF0gcHItMVwiIFxuICAgICAgICAgICAgICAgIGRpcj17ZGlyfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTEuNSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjAzXSByb3VuZGVkLXhsIGJnLXdoaXRlL1swLjAxXVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMCB0ZXh0LVs4LjVweF0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWJyYW5kLWFjY2VudFwiIC8+IHt0KCdkcml2ZV9lbmdpbmUnKX1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSB0cnVuY2F0ZSBwci0xIG10LTAuNVwiIGRpcj1cImx0clwiPntiaWtlLnNwZWNzLmVuZ2luZX08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMS41IGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDNdIHJvdW5kZWQteGwgYmctd2hpdGUvWzAuMDFdXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwIHRleHQtWzguNXB4XSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPEdhdWdlIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1icmFuZC1zZWNvbmRhcnkgYW5pbWF0ZS1wdWxzZVwiIC8+IHt0KCdjbG9ja19zcGVlZCcpfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIG10LTAuNVwiIGRpcj1cImx0clwiPntiaWtlLnNwZWNzLnRvcFNwZWVkfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0xLjUgYm9yZGVyIGJvcmRlci1bIzYzNjZGMV0vMTAgYm9yZGVyLWRhc2hlZCByb3VuZGVkLXhsIGJnLXdoaXRlL1swLjAxXVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMCB0ZXh0LVs4LjVweF0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxEcm9wbGV0IGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1icmFuZC1hY2NlbnRcIiAvPiB7dCgnZW5lcmd5X2NvbnN1bXB0aW9uJyl9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtd2hpdGUgbXQtMC41XCIgZGlyPVwibHRyXCI+e2Jpa2Uuc3BlY3MuZnVlbENvbnN1bXB0aW9ufTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0xLjUgYm9yZGVyIGJvcmRlci1bIzYzNjZGMV0vMTAgYm9yZGVyLWRhc2hlZCByb3VuZGVkLXhsIGJnLXdoaXRlL1swLjAxXVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMCB0ZXh0LVs4LjVweF0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDcHUgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWJyYW5kLXNlY29uZGFyeVwiIC8+IHt0KCdvdXRwdXRfY2FwYWNpdHknKX1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBtdC0wLjVcIiBkaXI9XCJsdHJcIj57YmlrZS5zcGVjcy5wb3dlcn08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogRGVlcCBkZXRhaWxzIHBhcmFncmFwaCBpbiBiYWNrIHNpZGUgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc3Bhbi0yIHAtMi41IGJnLWJsYWNrLzQwIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDVdIHJvdW5kZWQteGwgZm9udC1zYW5zIHRleHQtWzExcHhdIHRleHQtZ3JheS00MDAgbGVhZGluZy1yZWxheGVkIG92ZXJmbG93LXktYXV0byBtYXgtaC1bMTQwcHhdIHRleHQtcmlnaHRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtd2hpdGUgZm9udC1tb25vIHRleHQtWzlweF0gbWItMSB0ZXh0LWxlZnQgdXBwZXJjYXNlXCIgZGlyPVwibHRyXCI+e2Jpa2UubmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktMzAwXCI+e2Jpa2Uuc2hvcnREZXNjfTwvcD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMiBwdC0yIGJvcmRlci10IGJvcmRlci13aGl0ZS8xMCB0ZXh0LWdyYXktNDAwXCI+e2Jpa2UubG9uZ0Rlc2N9PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIC8qIFRBQiBCOiBBQ0NFU1NPUklFUyAmIFNNQVJUIEFERC1PTlMgU0VMRUNUT1IgKi9cbiAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICBrZXk9XCJhZGRvbnNcIlxuICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeDogMTAgfX1cbiAgICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHg6IDAgfX1cbiAgICAgICAgICAgICAgICBleGl0PXt7IG9wYWNpdHk6IDAsIHg6IC0xMCB9fVxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuMiB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZmxleC0xIG92ZXJmbG93LWhpZGRlbiBmb250LW1vbm8gdGV4dC14cyBuby1mbGlwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItMiBwYi0xIGJvcmRlci1iIGJvcmRlci13aGl0ZS81XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTaG9wcGluZ0JhZyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWJyYW5kLWFjY2VudFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9in2K7YqtixINin2YTZg9mF2KfZhNmK2KfYqiDZiNin2YTYpdi22KfZgdin2Ko6JyA6ICdTRUxFQ1QgUFJFTUlVTSBQTFVHLUlOIEFERC1PTlM6J31cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gc2hyaW5rLTAgZm9udC1ib2xkIHRleHQtWyNBODU1RjddIGFuaW1hdGUtcHVsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkQWRkT25JZHMubGVuZ3RofSB7bGFuZyA9PT0gJ2FyJyA/ICfZhdit2K/YrycgOiAnU0VMRUNURUQnfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFNjcm9sbGFibGUgZ3JpZCBwcm9kdWN0cyAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgb3ZlcmZsb3cteS1hdXRvIGZsZXgtMSBtYXgtaC1bMjIwcHhdIHByLTEgc2Nyb2xsYmFyLXRoaW5cIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICB7YWN0aXZlQWRkT25zLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUFkZE9ucy5tYXAoYWRkb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzQ2hlY2tlZCA9IHNlbGVjdGVkQWRkT25JZHMuaW5jbHVkZXMoYWRkb24uaWQpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlBZGRvbk5hbWUgPSBsYW5nID09PSAnYXInICYmIGFkZG9uLm5hbWVBciA/IGFkZG9uLm5hbWVBciA6IGFkZG9uLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzcGxheUFkZG9uRGVzYyA9IGxhbmcgPT09ICdhcicgJiYgYWRkb24uZGVzY0FyID8gYWRkb24uZGVzY0FyIDogYWRkb24uZGVzY3JpcHRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXthZGRvbi5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHRvZ2dsZUFkZE9uKGFkZG9uLmlkLCBlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gcC0yIHJvdW5kZWQteGwgYm9yZGVyIHJlbGF0aXZlIGN1cnNvci1wb2ludGVyIHNlbGVjdC1ub25lIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBob3ZlcjpzY2FsZS1bMS4wM10gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NoZWNrZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLVsjMjJEM0VFXS81IGJvcmRlci1icmFuZC1hY2NlbnQvNDAgc2hhZG93LVswXzBfMTJweF9yZ2JhKDM0LDIxMSwyMzgsMC4xNSldIHJpbmctMSByaW5nLWJyYW5kLWFjY2VudC8zMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLVsjMEYxNzJBXS84MCBib3JkZXItd2hpdGUvWzAuMDRdIGhvdmVyOmJnLXdoaXRlL1swLjAyXSBob3Zlcjpib3JkZXItd2hpdGUvMTAgaG92ZXI6c2hhZG93LVswXzBfOHB4X3JnYmEoMjU1LDI1NSwyNTUsMC4wNSldJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFNlbGVjdG9yIEljb24gYWJzb2x1dGUgcGxhY2VtZW50IGF0IHRvcCByaWdodCAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BhYnNvbHV0ZSB0b3AtMS41IHJpZ2h0LTEuNSB3LTQgaC00IHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NoZWNrZWQgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1icmFuZC1hY2NlbnQgYm9yZGVyLWJyYW5kLWFjY2VudCB0ZXh0LVsjMEIwRjFBXScgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItd2hpdGUvMjAgYmctYmxhY2svNTAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNDaGVja2VkICYmIDxDaGVjayBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSBzdHJva2UtWzNdXCIgLz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgdGV4dC1jZW50ZXIgZ2FwLTEuNSBwdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIEFjY2Vzc29yeSBJbWFnZSBpbiBTZXBhcmF0ZSBDYXJkICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthZGRvbi5pbWFnZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2FkZG9uLmltYWdlfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PXthZGRvbi5uYW1lfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHJvdW5kZWQtbGcgb2JqZWN0LWNvdmVyIGJvcmRlciBib3JkZXItd2hpdGUvMTAgc2hhZG93LW1kIHNoYWRvdy1ibGFjay80MFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGVhZGluZy10aWdodCB3LWZ1bGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXdoaXRlIHRleHQtWzEwcHhdIHRydW5jYXRlXCIgdGl0bGU9e2Rpc3BsYXlBZGRvbk5hbWV9PntkaXNwbGF5QWRkb25OYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzhweF0gdGV4dC1ncmF5LTUwMCB0cnVuY2F0ZVwiIHRpdGxlPXtkaXNwbGF5QWRkb25EZXNjfT57ZGlzcGxheUFkZG9uRGVzY308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbXQtMiBwdC0xIGJvcmRlci10IGJvcmRlci13aGl0ZS9bMC4wNV0gc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5LjVweF0gZm9udC1ib2xkIHRleHQtYnJhbmQtYWNjZW50XCI+K3tmb3JtYXRQcmljZShhZGRvbi5wcmljZSl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zcGFuLTIgdGV4dC1jZW50ZXIgcHktOCB0ZXh0LWdyYXktNTAwIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBsb3dlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfZhNinINmK2YjYrNivINil2LbYp9mB2KfYqiDZhdiq2YjZgdix2Kkg2YTYt9mE2KjZh9inINit2KfZhNmK2KfZiycgOiAnTm8gY29tcGF0aWJsZSBhY2Nlc3NvcmllcyBsb2NhdGVkLid9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBTdWItdG90YWwgaW5kaWNhdG9yIGZyYW1lICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctYmxhY2svNDAgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wNV0gcC0yIG10LTIgcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTFweF0gc2hyaW5rLTBcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzkuNXB4XSB0ZXh0LWdyYXktNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9iz2LnYsSDYp9mE2K7Zitin2LEg2KfZhNmD2YTZiiDYp9mE2YXYqNin2LTYsTonIDogJ0FDVElWRSBUT1RBTCBEWU5BTUlDIFBSSUNFOid9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1icmFuZC1hY2NlbnQgZm9udC1leHRyYWJvbGQgdGV4dC1zbSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0UHJpY2UodG90YWxMaXZlUHJpY2VVc2QpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cblxuICAgICAgICAgIHsvKiBBY3Rpb25zIHBhbmVsIGF0IGJvdHRvbSAo8J+ThCBQREYgaWNvbiBjYXRhbG9nIGJ1dHRvbiArIPCfn6IgQm9vayBOb3cgYnV0dG9uKSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTMuNSBib3JkZXItdCBib3JkZXItd2hpdGUvWzAuMDhdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBtdC1hdXRvIG5vLWZsaXAgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgey8qIFZpZXcgUERGIGNhdGFsb2dzIGJ1dHRvbiAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IG9uT3BlblBkZihiaWtlLCBlKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wOF0gaG92ZXI6Ym9yZGVyLWJyYW5kLWFjY2VudCBmb250LW1vbm8gdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtZ3JheS0zMDAgaG92ZXI6dGV4dC13aGl0ZSBiZy1bIzBCMEYxQV0vNTAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNlbGVjdC1ub25lIHBvaW50ZXItZXZlbnRzLWF1dG8gY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICB0aXRsZT1cIk9wZW4gc3BlY2lmaWNhdGlvbnMgUERGIENhdGFsb2dcIlxuICAgICAgICAgICAgICBpZD17YHBkZi1idG4tJHtiaWtlLmlkfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGaWxlVGV4dCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYnJhbmQtYWNjZW50XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e3QoJ2NhdGFsb2dfYnRuJyl9PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHsvKiBCb29rIE5vdyBCdXR0b24gb2YgdGhlIHNwZWNpZmljIHZlaGljbGUgKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUJvb2tOb3dDbGlja31cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB5LTIgcm91bmRlZC14bCBmb250LW1vbm8gdGV4dC14cyBmb250LXNlbWlib2xkIHRyYWNraW5nLXdpZGVyIHRleHQtd2hpdGUgYmctZ3JhZGllbnQtdG8tciBmcm9tLWJyYW5kLXByaW1hcnkgdG8tYnJhbmQtYWNjZW50IGhvdmVyOmJyaWdodG5lc3MtMTEwIGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCBzY3JvbGwtc21vb3RoIHNoYWRvdy1tZCBzaGFkb3ctYnJhbmQtcHJpbWFyeS8xMCBzZWxlY3Qtbm9uZSBjdXJzb3ItcG9pbnRlciBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSB1cHBlcmNhc2VcIlxuICAgICAgICAgICAgICBpZD17YGJvb2stbm93LWNhcmQtJHtiaWtlLmlkfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuPnt0KCdib29rX25vdycpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPENoZXZyb25SaWdodCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJtYXBwaW5ncyI6IkFBMEtZO0FBMUtaO0FBQUE7QUFBQTtBQUFBO0FBS0EsU0FBZ0IsZ0JBQWdCO0FBQ2hDLFNBQVMsUUFBUSx1QkFBdUI7QUFDeEMsU0FBUyxPQUFPLEtBQUssT0FBTyxTQUFlLEtBQVUsVUFBVSxjQUFjLFdBQVcsVUFBVSxPQUFPLFFBQVEsT0FBTyxNQUFNLEdBQWlCLG1CQUFtQjtBQUVsSyxTQUFTLG1CQUFtQjtBQVc1Qix3QkFBd0IsZUFBZTtBQUFBLEVBQ3JDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLEdBQXdCO0FBQ3RCLFFBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSSxTQUFTLEtBQUs7QUFDaEQsUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQVMsS0FBSztBQUNoRCxRQUFNLENBQUMsUUFBUSxTQUFTLElBQUksU0FBUyxLQUFLO0FBQzFDLFFBQU0sQ0FBQyxTQUFTLFVBQVUsSUFBSSxTQUE2QixPQUFPO0FBQ2xFLFFBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLElBQUksU0FBbUIsQ0FBQyxDQUFDO0FBQ3JFLFFBQU0sRUFBRSxNQUFNLEtBQUssRUFBRSxJQUFJLFlBQVk7QUFFckMsUUFBTSxrQkFBa0IsQ0FBQyxNQUFXO0FBRWxDLFFBQUksRUFBRSxPQUFPLFFBQVEsVUFBVSxHQUFHO0FBQ2hDO0FBQUEsSUFDRjtBQUNBLGlCQUFhLENBQUMsU0FBUztBQUFBLEVBQ3pCO0FBR0EsUUFBTSxnQkFBZ0IsTUFBTTtBQUMxQixZQUFRLEtBQUssVUFBVTtBQUFBLE1BQ3JCLEtBQUs7QUFBSyxlQUFPLEVBQUUsUUFBUSxzQ0FBc0MsTUFBTSxxQkFBcUIsUUFBUSxnREFBZ0QsTUFBTSxhQUFhLElBQUksc0JBQXNCLGFBQWEseUJBQXlCO0FB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