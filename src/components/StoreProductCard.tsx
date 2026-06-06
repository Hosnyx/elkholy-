import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=905fa188"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=905fa188"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import { motion, AnimatePresence } from "/node_modules/.vite/deps/motion_react.js?v=905fa188";
import { ShoppingCart, Share2, RefreshCw, Check, Copy, X, Tag, Heart, Download } from "/node_modules/.vite/deps/lucide-react.js?v=905fa188";
import __vite__cjsImport4_qrcode from "/node_modules/.vite/deps/qrcode.js?v=905fa188"; const QRCode = __vite__cjsImport4_qrcode.__esModule ? __vite__cjsImport4_qrcode.default : __vite__cjsImport4_qrcode;
import { useLanguage } from "/src/context/LanguageContext.tsx";
export default function StoreProductCard({ product, onAddToCart, isFavorite, onToggleFavorite }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [idCopied, setIdCopied] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const { lang, dir } = useLanguage();
  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = `${window.location.origin}${window.location.pathname}?product=${product.id}`;
        const dataUrl = await QRCode.toDataURL(url, {
          width: 300,
          margin: 1,
          color: {
            dark: "#0B0F1A",
            light: "#FFFFFF"
          }
        });
        setQrUrl(dataUrl);
      } catch (err) {
        console.error("Error generating QR", err);
      }
    };
    generateQR();
  }, [product.id]);
  const handleCardClick = (e) => {
    if (e.target.closest(".no-flip")) {
      return;
    }
    setIsFlipped(!isFlipped);
  };
  const formatPrice = (pNum) => {
    if (lang === "ar") {
      return `${pNum.toLocaleString()} ج.م`;
    } else {
      return `${pNum.toLocaleString()} EGP`;
    }
  };
  const getSharedMessage = () => {
    const formattedPrice = formatPrice(product.price);
    const prodName = lang === "ar" ? product.nameAr : product.name;
    if (lang === "ar") {
      return `شاهد هذا المنتج الممتاز من ElKholy Motors:
[${prodName}]
السعر الحالي: ${formattedPrice}`;
    } else {
      return `Check out this cool product from ElKholy Motors:
[${product.name}]
Price: ${formattedPrice}`;
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
  const hasDiscount = !!(product.originalPrice && product.originalPrice > product.price);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      onClick: handleCardClick,
      className: "perspective-1000 h-[480px] w-full cursor-pointer group pointer-events-auto",
      id: `store-card-${product.id}`,
      children: /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: `relative w-full h-full duration-700 preserve-3d transition-all ${isFlipped ? "rotate-y-180" : ""}`,
          children: [
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "absolute inset-0 w-full h-full backface-hidden glass-panel rounded-3xl overflow-hidden border border-white/[0.08] hover:border-brand-primary/50 hover:shadow-[0_0_20px_rgba(235,166,42,0.15)] flex flex-col transition-all duration-500 bg-[#070A11]/40",
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute top-4 left-4 right-4 z-10 flex items-center justify-between no-flip", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 bg-black/60 rounded-full text-[9px] font-mono tracking-widest text-[#E5E7EB] border border-white/5 uppercase select-none", children: product.id }, void 0, false, {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 121,
                        columnNumber: 15
                      }, this),
                      product.isOffer && /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-1 bg-red-600/90 text-white text-[9px] font-black tracking-widest rounded-xl uppercase flex items-center gap-1 shadow-lg shadow-red-600/20", children: [
                        /* @__PURE__ */ jsxDEV(Tag, { className: "w-3.5 h-3.5 text-white" }, void 0, false, {
                          fileName: "/app/applet/src/components/StoreProductCard.tsx",
                          lineNumber: 127,
                          columnNumber: 19
                        }, this),
                        lang === "ar" ? product.offerLabelAr || "عرض خاص" : product.offerLabel || "SPECIAL"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 126,
                        columnNumber: 17
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/StoreProductCard.tsx",
                      lineNumber: 120,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: (e) => {
                          e.stopPropagation();
                          onToggleFavorite(product.id, e);
                        },
                        className: "p-2 rounded-xl border border-white/[0.06] bg-black/60 hover:bg-black/80 hover:scale-110 active:scale-95 transition-all text-white cursor-pointer select-none shadow-lg",
                        title: isFavorite ? lang === "ar" ? "إزالة من المفضلة" : "Remove from Favorites" : lang === "ar" ? "إضافة إلى المفضلة" : "Add to Favorites",
                        id: `fav-btn-${product.id}`,
                        children: /* @__PURE__ */ jsxDEV(
                          Heart,
                          {
                            className: `w-3.5 h-3.5 transition-transform ${isFavorite ? "fill-red-500 text-red-500 scale-105" : "text-gray-400 hover:text-red-400"}`
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/StoreProductCard.tsx",
                            lineNumber: 140,
                            columnNumber: 15
                          },
                          this
                        )
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 134,
                        columnNumber: 13
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/StoreProductCard.tsx",
                    lineNumber: 119,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "relative aspect-square w-full bg-gradient-to-b from-[#090D18] to-[#070A11] p-2 flex items-center justify-center overflow-hidden border-b border-white/5", children: /* @__PURE__ */ jsxDEV(
                    "img",
                    {
                      src: product.image,
                      referrerPolicy: "no-referrer",
                      alt: lang === "ar" ? product.nameAr : product.name,
                      className: "w-full h-full object-contain filter drop-shadow-[0_12px_12px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500 select-none pb-1"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/StoreProductCard.tsx",
                      lineNumber: 150,
                      columnNumber: 13
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "/app/applet/src/components/StoreProductCard.tsx",
                    lineNumber: 149,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col flex-1 p-5", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-brand-accent uppercase tracking-widest font-mono mb-1", children: product.brand || "ElKholy" }, void 0, false, {
                      fileName: "/app/applet/src/components/StoreProductCard.tsx",
                      lineNumber: 160,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV("h3", { className: "text-white font-bold text-base mb-1 truncate font-sans", children: lang === "ar" ? product.nameAr : product.name }, void 0, false, {
                      fileName: "/app/applet/src/components/StoreProductCard.tsx",
                      lineNumber: 164,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "text-gray-500 text-[10px] uppercase font-mono tracking-wider flex items-center gap-2 mt-0.5 mb-2", children: /* @__PURE__ */ jsxDEV("span", { children: [
                      lang === "ar" ? "التصنيف:" : "Category:",
                      " ",
                      product.category
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/StoreProductCard.tsx",
                      lineNumber: 170,
                      columnNumber: 15
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/StoreProductCard.tsx",
                      lineNumber: 169,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-end justify-between mt-auto pt-4 border-t border-white/5 no-flip", children: [
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        hasDiscount && product.originalPrice && /* @__PURE__ */ jsxDEV("div", { className: "text-gray-500 text-xs line-through font-mono", children: formatPrice(product.originalPrice) }, void 0, false, {
                          fileName: "/app/applet/src/components/StoreProductCard.tsx",
                          lineNumber: 177,
                          columnNumber: 19
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "text-brand-accent font-mono font-bold text-lg", children: formatPrice(product.price) }, void 0, false, {
                          fileName: "/app/applet/src/components/StoreProductCard.tsx",
                          lineNumber: 181,
                          columnNumber: 17
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 175,
                        columnNumber: 15
                      }, this),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          onClick: (e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                          },
                          disabled: product.stockCount <= 0,
                          className: `p-3 rounded-xl transition-all cursor-pointer ${product.stockCount > 0 ? "bg-brand-primary text-[#0B0F1A] hover:brightness-110 shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95" : "bg-gray-800 text-gray-500 cursor-not-allowed"}`,
                          title: lang === "ar" ? "أضف إلى السلة" : "Add to Cart",
                          children: /* @__PURE__ */ jsxDEV(ShoppingCart, { className: "w-4 h-4 font-bold" }, void 0, false, {
                            fileName: "/app/applet/src/components/StoreProductCard.tsx",
                            lineNumber: 196,
                            columnNumber: 17
                          }, this)
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/StoreProductCard.tsx",
                          lineNumber: 186,
                          columnNumber: 15
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/StoreProductCard.tsx",
                      lineNumber: 174,
                      columnNumber: 13
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/StoreProductCard.tsx",
                    lineNumber: 159,
                    columnNumber: 11
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/StoreProductCard.tsx",
                lineNumber: 115,
                columnNumber: 9
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "absolute inset-0 w-full h-full backface-hidden rotate-y-180 glass-panel rounded-3xl overflow-hidden border border-brand-accent/20 flex flex-col p-5 [backface-visibility:hidden] bg-[#0A0E1A]",
                style: { WebkitBackfaceVisibility: "hidden" },
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center border-b border-white/10 pb-3 mb-4 no-flip", children: [
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: (e) => {
                          e.stopPropagation();
                          setIsFlipped(false);
                        },
                        className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:text-brand-accent transition-all text-xs font-mono text-gray-300 font-semibold cursor-pointer",
                        children: [
                          /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-3.5 h-3.5" }, void 0, false, {
                            fileName: "/app/applet/src/components/StoreProductCard.tsx",
                            lineNumber: 214,
                            columnNumber: 15
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "رجوع" : "Flip" }, void 0, false, {
                            fileName: "/app/applet/src/components/StoreProductCard.tsx",
                            lineNumber: 215,
                            columnNumber: 15
                          }, this)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 210,
                        columnNumber: 13
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV("div", { className: "relative", children: /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: (e) => {
                          e.stopPropagation();
                          setShareOpen(!shareOpen);
                        },
                        className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-primary/10 border border-brand-primary/20 hover:bg-brand-primary/20 hover:text-brand-accent text-brand-primary transition-all text-xs font-mono font-semibold cursor-pointer",
                        children: [
                          /* @__PURE__ */ jsxDEV(Share2, { className: "w-3.5 h-3.5" }, void 0, false, {
                            fileName: "/app/applet/src/components/StoreProductCard.tsx",
                            lineNumber: 224,
                            columnNumber: 17
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "مشاركة" : "Share" }, void 0, false, {
                            fileName: "/app/applet/src/components/StoreProductCard.tsx",
                            lineNumber: 225,
                            columnNumber: 17
                          }, this)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 220,
                        columnNumber: 15
                      },
                      this
                    ) }, void 0, false, {
                      fileName: "/app/applet/src/components/StoreProductCard.tsx",
                      lineNumber: 219,
                      columnNumber: 13
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/StoreProductCard.tsx",
                    lineNumber: 208,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ jsxDEV(AnimatePresence, { children: shareOpen && /* @__PURE__ */ jsxDEV(
                    motion.div,
                    {
                      initial: { opacity: 0, scale: 0.95, y: -10 },
                      animate: { opacity: 1, scale: 1, y: 0 },
                      exit: { opacity: 0, scale: 0.95, y: -10 },
                      className: "absolute top-16 left-4 right-4 z-20 bg-[#0F172A]/95 backdrop-blur-md border border-white/10 rounded-2xl p-4 no-flip shadow-2xl space-y-2.5",
                      children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center border-b border-white/5 pb-1", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono font-bold uppercase tracking-wider text-brand-accent", children: lang === "ar" ? "خيارات المشاركة السريعة" : "QUICK SHARE" }, void 0, false, {
                            fileName: "/app/applet/src/components/StoreProductCard.tsx",
                            lineNumber: 240,
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
                                fileName: "/app/applet/src/components/StoreProductCard.tsx",
                                lineNumber: 247,
                                columnNumber: 21
                              }, this)
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/StoreProductCard.tsx",
                              lineNumber: 243,
                              columnNumber: 19
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/StoreProductCard.tsx",
                          lineNumber: 239,
                          columnNumber: 17
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 text-[10px] font-mono font-semibold", children: [
                          /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              onClick: (e) => handleShareClick("wa", e),
                              className: "flex items-center gap-1.5 p-2 bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/24 rounded-xl transition-all cursor-pointer text-left",
                              children: /* @__PURE__ */ jsxDEV("span", { children: "🟢 WhatsApp" }, void 0, false, {
                                fileName: "/app/applet/src/components/StoreProductCard.tsx",
                                lineNumber: 256,
                                columnNumber: 21
                              }, this)
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/StoreProductCard.tsx",
                              lineNumber: 252,
                              columnNumber: 19
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              onClick: (e) => handleShareClick("fb", e),
                              className: "flex items-center gap-1.5 p-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/24 rounded-xl transition-all cursor-pointer text-left",
                              children: /* @__PURE__ */ jsxDEV("span", { children: "🔵 Facebook" }, void 0, false, {
                                fileName: "/app/applet/src/components/StoreProductCard.tsx",
                                lineNumber: 262,
                                columnNumber: 21
                              }, this)
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/StoreProductCard.tsx",
                              lineNumber: 258,
                              columnNumber: 19
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              onClick: (e) => handleShareClick("x", e),
                              className: "flex items-center gap-1.5 p-2 bg-gray-800/80 border border-white/10 text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer text-left",
                              children: /* @__PURE__ */ jsxDEV("span", { children: "⚫ Twitter (X)" }, void 0, false, {
                                fileName: "/app/applet/src/components/StoreProductCard.tsx",
                                lineNumber: 268,
                                columnNumber: 21
                              }, this)
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/StoreProductCard.tsx",
                              lineNumber: 264,
                              columnNumber: 19
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              onClick: (e) => handleShareClick("copy", e),
                              className: "flex items-center gap-1.5 p-2 bg-brand-accent/10 border border-brand-accent/20 text-brand-primary hover:bg-brand-accent/20 rounded-xl transition-all cursor-pointer text-left",
                              children: [
                                copied ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-green-400" }, void 0, false, {
                                  fileName: "/app/applet/src/components/StoreProductCard.tsx",
                                  lineNumber: 274,
                                  columnNumber: 31
                                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                                  fileName: "/app/applet/src/components/StoreProductCard.tsx",
                                  lineNumber: 274,
                                  columnNumber: 82
                                }, this),
                                /* @__PURE__ */ jsxDEV("span", { children: copied ? "Copied!" : lang === "ar" ? "نسخ الرابط" : "Copy Link" }, void 0, false, {
                                  fileName: "/app/applet/src/components/StoreProductCard.tsx",
                                  lineNumber: 275,
                                  columnNumber: 21
                                }, this)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/app/applet/src/components/StoreProductCard.tsx",
                              lineNumber: 270,
                              columnNumber: 19
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/StoreProductCard.tsx",
                          lineNumber: 251,
                          columnNumber: 17
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/StoreProductCard.tsx",
                      lineNumber: 233,
                      columnNumber: 15
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "/app/applet/src/components/StoreProductCard.tsx",
                    lineNumber: 231,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto pr-1 select-text space-y-4 text-left font-sans text-xs scrollbar-thin", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: `flex justify-between items-start gap-4 ${dir === "rtl" ? "flex-row-reverse" : "flex-row"}`, children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-brand-accent uppercase tracking-widest font-mono block", children: product.brand }, void 0, false, {
                          fileName: "/app/applet/src/components/StoreProductCard.tsx",
                          lineNumber: 286,
                          columnNumber: 17
                        }, this),
                        /* @__PURE__ */ jsxDEV("h4", { className: "text-white font-black text-sm uppercase font-sans mt-0.5 break-words", children: lang === "ar" ? product.nameAr : product.name }, void 0, false, {
                          fileName: "/app/applet/src/components/StoreProductCard.tsx",
                          lineNumber: 289,
                          columnNumber: 17
                        }, this),
                        /* @__PURE__ */ jsxDEV(
                          "div",
                          {
                            onClick: (e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(product.id);
                              setIdCopied(true);
                              setTimeout(() => setIdCopied(false), 2e3);
                            },
                            className: "inline-flex items-center gap-1.5 mt-1.5 px-2 py-1 rounded bg-white/[0.04] border border-white/10 hover:bg-white/[0.1] active:bg-white/[0.15] text-gray-400 hover:text-brand-primary hover:border-brand-primary/20 transition-all cursor-pointer select-all font-mono text-[9px] font-bold active:scale-95 no-flip",
                            title: lang === "ar" ? "انقر لنسخ الكود" : "Click to copy ID",
                            children: idCopied ? /* @__PURE__ */ jsxDEV("span", { className: "text-green-400 flex items-center gap-1", children: [
                              /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-green-400" }, void 0, false, {
                                fileName: "/app/applet/src/components/StoreProductCard.tsx",
                                lineNumber: 306,
                                columnNumber: 23
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تم النسخ!" : "Copied!" }, void 0, false, {
                                fileName: "/app/applet/src/components/StoreProductCard.tsx",
                                lineNumber: 307,
                                columnNumber: 23
                              }, this)
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/StoreProductCard.tsx",
                              lineNumber: 305,
                              columnNumber: 21
                            }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                              /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
                                fileName: "/app/applet/src/components/StoreProductCard.tsx",
                                lineNumber: 311,
                                columnNumber: 23
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { children: [
                                "ID: ",
                                product.id
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/components/StoreProductCard.tsx",
                                lineNumber: 312,
                                columnNumber: 23
                              }, this)
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/StoreProductCard.tsx",
                              lineNumber: 310,
                              columnNumber: 21
                            }, this)
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/StoreProductCard.tsx",
                            lineNumber: 294,
                            columnNumber: 17
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 285,
                        columnNumber: 15
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "shrink-0 flex flex-col items-center gap-1 bg-white p-1.5 rounded-xl border border-white/10 shadow-lg no-flip w-[86px]", children: qrUrl ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                        /* @__PURE__ */ jsxDEV(
                          "img",
                          {
                            src: qrUrl,
                            alt: "Product QR Code",
                            className: "w-[74px] h-[74px] object-contain rounded"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/StoreProductCard.tsx",
                            lineNumber: 322,
                            columnNumber: 21
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV(
                          "a",
                          {
                            href: qrUrl,
                            download: `QR-${product.id}.png`,
                            onClick: (e) => e.stopPropagation(),
                            className: "text-[8px] font-mono font-bold text-[#0B0F1A] bg-brand-primary hover:bg-brand-primary/95 transition-all py-0.5 px-1.5 rounded-md flex items-center gap-0.5 cursor-pointer select-none",
                            children: [
                              /* @__PURE__ */ jsxDEV(Download, { className: "w-2.5 h-2.5" }, void 0, false, {
                                fileName: "/app/applet/src/components/StoreProductCard.tsx",
                                lineNumber: 333,
                                columnNumber: 23
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تحميل" : "PNG" }, void 0, false, {
                                fileName: "/app/applet/src/components/StoreProductCard.tsx",
                                lineNumber: 334,
                                columnNumber: 23
                              }, this)
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/components/StoreProductCard.tsx",
                            lineNumber: 327,
                            columnNumber: 21
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 321,
                        columnNumber: 19
                      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "w-[74px] h-[74px] flex items-center justify-center text-[8px] text-gray-400 font-mono", children: "..." }, void 0, false, {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 338,
                        columnNumber: 19
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 319,
                        columnNumber: 15
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/StoreProductCard.tsx",
                      lineNumber: 284,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 uppercase tracking-widest font-mono block", children: lang === "ar" ? "الوصف والتفاصيل" : "Description" }, void 0, false, {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 347,
                        columnNumber: 15
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-gray-300 leading-relaxed font-sans text-xs whitespace-pre-line", children: lang === "ar" ? product.descriptionAr : product.description }, void 0, false, {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 350,
                        columnNumber: 15
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/StoreProductCard.tsx",
                      lineNumber: 346,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 pt-2 border-t border-white/5", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 uppercase tracking-widest font-mono block", children: lang === "ar" ? "الكمية المتوفرة بالمخزون" : "Stock Quantity Available" }, void 0, false, {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 357,
                        columnNumber: 15
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: `text-xs font-mono font-bold flex items-center gap-1.5 ${product.stockCount <= 0 ? "text-red-500" : product.stockCount <= 3 ? "text-amber-400" : "text-brand-accent"}`, children: [
                        /* @__PURE__ */ jsxDEV("span", { children: "●" }, void 0, false, {
                          fileName: "/app/applet/src/components/StoreProductCard.tsx",
                          lineNumber: 367,
                          columnNumber: 17
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: product.stockCount <= 0 ? lang === "ar" ? "غير متوفر / نفذت الكمية" : "Out of stock" : `${product.stockCount} ${lang === "ar" ? "قطعة متوفرة حالياً" : "units available currently"}` }, void 0, false, {
                          fileName: "/app/applet/src/components/StoreProductCard.tsx",
                          lineNumber: 368,
                          columnNumber: 17
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 360,
                        columnNumber: 15
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/StoreProductCard.tsx",
                      lineNumber: 356,
                      columnNumber: 13
                    }, this),
                    product.specs && /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 pt-2 border-t border-white/5", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 uppercase tracking-widest font-mono block", children: lang === "ar" ? "المواصفات الفنية" : "Technical Specifications" }, void 0, false, {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 379,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-brand-accent/90 leading-relaxed font-mono text-[11px]", children: lang === "ar" ? product.specsAr : product.specs }, void 0, false, {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 382,
                        columnNumber: 17
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/StoreProductCard.tsx",
                      lineNumber: 378,
                      columnNumber: 15
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/StoreProductCard.tsx",
                    lineNumber: 283,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-t border-white/5 pt-3 mt-auto no-flip", children: [
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono tracking-wider block uppercase", children: lang === "ar" ? "السعر" : "Price" }, void 0, false, {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 392,
                        columnNumber: 15
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent font-mono font-bold text-base", children: formatPrice(product.price) }, void 0, false, {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 393,
                        columnNumber: 15
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/StoreProductCard.tsx",
                      lineNumber: 391,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: (e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        },
                        disabled: product.stockCount <= 0,
                        className: `flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer text-xs font-bold ${product.stockCount > 0 ? "bg-brand-primary text-[#0B0F1A] hover:brightness-110 shadow-lg shadow-brand-primary/20 active:scale-95" : "bg-gray-800 text-gray-500 cursor-not-allowed"}`,
                        children: [
                          /* @__PURE__ */ jsxDEV(ShoppingCart, { className: "w-3.5 h-3.5" }, void 0, false, {
                            fileName: "/app/applet/src/components/StoreProductCard.tsx",
                            lineNumber: 405,
                            columnNumber: 15
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "شراء" : "Buy" }, void 0, false, {
                            fileName: "/app/applet/src/components/StoreProductCard.tsx",
                            lineNumber: 406,
                            columnNumber: 15
                          }, this)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/app/applet/src/components/StoreProductCard.tsx",
                        lineNumber: 396,
                        columnNumber: 13
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/StoreProductCard.tsx",
                    lineNumber: 390,
                    columnNumber: 11
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/StoreProductCard.tsx",
                lineNumber: 203,
                columnNumber: 9
              },
              this
            )
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/StoreProductCard.tsx",
          lineNumber: 109,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    false,
    {
      fileName: "/app/applet/src/components/StoreProductCard.tsx",
      lineNumber: 104,
      columnNumber: 5
    },
    this
  );
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0b3JlUHJvZHVjdENhcmQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBTaG9wcGluZ0NhcnQsIFNoYXJlMiwgUmVmcmVzaEN3LCBDaGVjaywgQ29weSwgWCwgVGFnLCBIZWFydCwgRG93bmxvYWQgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IFFSQ29kZSBmcm9tICdxcmNvZGUnO1xuaW1wb3J0IHsgU3RvcmVQcm9kdWN0IH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgdXNlTGFuZ3VhZ2UgfSBmcm9tICcuLi9jb250ZXh0L0xhbmd1YWdlQ29udGV4dCc7XG5cbmludGVyZmFjZSBTdG9yZVByb2R1Y3RDYXJkUHJvcHMge1xuICBrZXk/OiBzdHJpbmcgfCBudW1iZXI7XG4gIHByb2R1Y3Q6IFN0b3JlUHJvZHVjdDtcbiAgb25BZGRUb0NhcnQ6IChwcm9kdWN0OiBTdG9yZVByb2R1Y3QpID0+IHZvaWQ7XG4gIGlzRmF2b3JpdGU6IGJvb2xlYW47XG4gIG9uVG9nZ2xlRmF2b3JpdGU6IChpZDogc3RyaW5nLCBlOiBhbnkpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN0b3JlUHJvZHVjdENhcmQoeyBwcm9kdWN0LCBvbkFkZFRvQ2FydCwgaXNGYXZvcml0ZSwgb25Ub2dnbGVGYXZvcml0ZSB9OiBTdG9yZVByb2R1Y3RDYXJkUHJvcHMpIHtcbiAgY29uc3QgW2lzRmxpcHBlZCwgc2V0SXNGbGlwcGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NoYXJlT3Blbiwgc2V0U2hhcmVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2NvcGllZCwgc2V0Q29waWVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lkQ29waWVkLCBzZXRJZENvcGllZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtxclVybCwgc2V0UXJVcmxdID0gdXNlU3RhdGU8c3RyaW5nPignJyk7XG4gIGNvbnN0IHsgbGFuZywgZGlyIH0gPSB1c2VMYW5ndWFnZSgpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZ2VuZXJhdGVRUiA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVybCA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59JHt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWV9P3Byb2R1Y3Q9JHtwcm9kdWN0LmlkfWA7XG4gICAgICAgIGNvbnN0IGRhdGFVcmwgPSBhd2FpdCBRUkNvZGUudG9EYXRhVVJMKHVybCwge1xuICAgICAgICAgIHdpZHRoOiAzMDAsXG4gICAgICAgICAgbWFyZ2luOiAxLFxuICAgICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICBkYXJrOiAnIzBCMEYxQScsXG4gICAgICAgICAgICBsaWdodDogJyNGRkZGRkYnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRRclVybChkYXRhVXJsKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBnZW5lcmF0aW5nIFFSJywgZXJyKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGdlbmVyYXRlUVIoKTtcbiAgfSwgW3Byb2R1Y3QuaWRdKTtcblxuICBjb25zdCBoYW5kbGVDYXJkQ2xpY2sgPSAoZTogYW55KSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsb3Nlc3QoJy5uby1mbGlwJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0SXNGbGlwcGVkKCFpc0ZsaXBwZWQpO1xuICB9O1xuXG4gIGNvbnN0IGZvcm1hdFByaWNlID0gKHBOdW06IG51bWJlcikgPT4ge1xuICAgIGlmIChsYW5nID09PSAnYXInKSB7XG4gICAgICByZXR1cm4gYCR7cE51bS50b0xvY2FsZVN0cmluZygpfSDYrC7ZhWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHtwTnVtLnRvTG9jYWxlU3RyaW5nKCl9IEVHUGA7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldFNoYXJlZE1lc3NhZ2UgPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybWF0dGVkUHJpY2UgPSBmb3JtYXRQcmljZShwcm9kdWN0LnByaWNlKTtcbiAgICBjb25zdCBwcm9kTmFtZSA9IGxhbmcgPT09ICdhcicgPyBwcm9kdWN0Lm5hbWVBciA6IHByb2R1Y3QubmFtZTtcbiAgICBpZiAobGFuZyA9PT0gJ2FyJykge1xuICAgICAgcmV0dXJuIGDYtNin2YfYryDZh9iw2Kcg2KfZhNmF2YbYqtisINin2YTZhdmF2KrYp9iyINmF2YYgRWxLaG9seSBNb3RvcnM6XG5bJHtwcm9kTmFtZX1dXG7Yp9mE2LPYudixINin2YTYrdin2YTZijogJHtmb3JtYXR0ZWRQcmljZX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYENoZWNrIG91dCB0aGlzIGNvb2wgcHJvZHVjdCBmcm9tIEVsS2hvbHkgTW90b3JzOlxuWyR7cHJvZHVjdC5uYW1lfV1cblByaWNlOiAke2Zvcm1hdHRlZFByaWNlfWA7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNoYXJlQ2xpY2sgPSAocGxhdGZvcm06ICd3YScgfCAnZmInIHwgJ3gnIHwgJ2NvcHknLCBlOiBhbnkpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBtc2cgPSBnZXRTaGFyZWRNZXNzYWdlKCk7XG4gICAgY29uc3QgY3VycmVudFVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgaWYgKHBsYXRmb3JtID09PSAnd2EnKSB7XG4gICAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly93YS5tZS8/dGV4dD0ke2VuY29kZVVSSUNvbXBvbmVudChtc2cgKyAnXFxuJyArIGN1cnJlbnRVcmwpfWA7XG4gICAgICB3aW5kb3cub3Blbih1cmwsICdfYmxhbmsnKTtcbiAgICB9IGVsc2UgaWYgKHBsYXRmb3JtID09PSAnZmInKSB7XG4gICAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHtlbmNvZGVVUklDb21wb25lbnQoY3VycmVudFVybCl9JnF1b3RlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KG1zZyl9YDtcbiAgICAgIHdpbmRvdy5vcGVuKHVybCwgJ19ibGFuaycpO1xuICAgIH0gZWxzZSBpZiAocGxhdGZvcm0gPT09ICd4Jykge1xuICAgICAgY29uc3QgdXJsID0gYGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3RleHQ9JHtlbmNvZGVVUklDb21wb25lbnQobXNnICsgJ1xcbicgKyBjdXJyZW50VXJsKX1gO1xuICAgICAgd2luZG93Lm9wZW4odXJsLCAnX2JsYW5rJyk7XG4gICAgfSBlbHNlIGlmIChwbGF0Zm9ybSA9PT0gJ2NvcHknKSB7XG4gICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChgJHttc2d9XFxuJHtjdXJyZW50VXJsfWApO1xuICAgICAgc2V0Q29waWVkKHRydWUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWQoZmFsc2UpLCAyMDAwKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQ2hlY2sgaWYgYSBvcmlnaW5hbCBwcmljZSBpcyBwcmVzZW50ZWQgYW5kIGRpc2NvdW50IGlzIGNvbmZpZ3VyZWRcbiAgY29uc3QgaGFzRGlzY291bnQgPSAhIShwcm9kdWN0Lm9yaWdpbmFsUHJpY2UgJiYgcHJvZHVjdC5vcmlnaW5hbFByaWNlID4gcHJvZHVjdC5wcmljZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IFxuICAgICAgb25DbGljaz17aGFuZGxlQ2FyZENsaWNrfVxuICAgICAgY2xhc3NOYW1lPVwicGVyc3BlY3RpdmUtMTAwMCBoLVs0ODBweF0gdy1mdWxsIGN1cnNvci1wb2ludGVyIGdyb3VwIHBvaW50ZXItZXZlbnRzLWF1dG9cIlxuICAgICAgaWQ9e2BzdG9yZS1jYXJkLSR7cHJvZHVjdC5pZH1gfVxuICAgID5cbiAgICAgIDxkaXYgXG4gICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHctZnVsbCBoLWZ1bGwgZHVyYXRpb24tNzAwIHByZXNlcnZlLTNkIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgaXNGbGlwcGVkID8gJ3JvdGF0ZS15LTE4MCcgOiAnJ1xuICAgICAgICB9YH1cbiAgICAgID5cbiAgICAgICAgey8qID09PT09PT09PT09PT09PT09PT09IEZST05UIFNJREUgT0YgUFJPRFVDVCBDQVJEID09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgICA8ZGl2IFxuICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgdy1mdWxsIGgtZnVsbCBiYWNrZmFjZS1oaWRkZW4gZ2xhc3MtcGFuZWwgcm91bmRlZC0zeGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGhvdmVyOmJvcmRlci1icmFuZC1wcmltYXJ5LzUwIGhvdmVyOnNoYWRvdy1bMF8wXzIwcHhfcmdiYSgyMzUsMTY2LDQyLDAuMTUpXSBmbGV4IGZsZXgtY29sIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTUwMCBiZy1bIzA3MEExMV0vNDBcIlxuICAgICAgICA+XG4gICAgICAgICAgey8qIEJhZGdlIG92ZXJsYXlzICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTQgbGVmdC00IHJpZ2h0LTQgei0xMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbm8tZmxpcFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IGJnLWJsYWNrLzYwIHJvdW5kZWQtZnVsbCB0ZXh0LVs5cHhdIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3QgdGV4dC1bI0U1RTdFQl0gYm9yZGVyIGJvcmRlci13aGl0ZS81IHVwcGVyY2FzZSBzZWxlY3Qtbm9uZVwiPlxuICAgICAgICAgICAgICAgIHtwcm9kdWN0LmlkfVxuICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAge3Byb2R1Y3QuaXNPZmZlciAmJiAoXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgYmctcmVkLTYwMC85MCB0ZXh0LXdoaXRlIHRleHQtWzlweF0gZm9udC1ibGFjayB0cmFja2luZy13aWRlc3Qgcm91bmRlZC14bCB1cHBlcmNhc2UgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgc2hhZG93LWxnIHNoYWRvdy1yZWQtNjAwLzIwXCI+XG4gICAgICAgICAgICAgICAgICA8VGFnIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAocHJvZHVjdC5vZmZlckxhYmVsQXIgfHwgJ9i52LHYtiDYrtin2LUnKSA6IChwcm9kdWN0Lm9mZmVyTGFiZWwgfHwgJ1NQRUNJQUwnKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEZhdm9yaXRlIGJ1dHRvbiAoIOKdpO+4jyApICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpOyBvblRvZ2dsZUZhdm9yaXRlKHByb2R1Y3QuaWQsIGUpOyB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA2XSBiZy1ibGFjay82MCBob3ZlcjpiZy1ibGFjay84MCBob3ZlcjpzY2FsZS0xMTAgYWN0aXZlOnNjYWxlLTk1IHRyYW5zaXRpb24tYWxsIHRleHQtd2hpdGUgY3Vyc29yLXBvaW50ZXIgc2VsZWN0LW5vbmUgc2hhZG93LWxnXCJcbiAgICAgICAgICAgICAgdGl0bGU9e2lzRmF2b3JpdGUgPyAobGFuZyA9PT0gJ2FyJyA/ICfYpdiy2KfZhNipINmF2YYg2KfZhNmF2YHYttmE2KknIDogJ1JlbW92ZSBmcm9tIEZhdm9yaXRlcycpIDogKGxhbmcgPT09ICdhcicgPyAn2KXYttin2YHYqSDYpdmE2Ykg2KfZhNmF2YHYttmE2KknIDogJ0FkZCB0byBGYXZvcml0ZXMnKX1cbiAgICAgICAgICAgICAgaWQ9e2BmYXYtYnRuLSR7cHJvZHVjdC5pZH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8SGVhcnQgXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgdHJhbnNpdGlvbi10cmFuc2Zvcm0gJHtcbiAgICAgICAgICAgICAgICAgIGlzRmF2b3JpdGUgPyAnZmlsbC1yZWQtNTAwIHRleHQtcmVkLTUwMCBzY2FsZS0xMDUnIDogJ3RleHQtZ3JheS00MDAgaG92ZXI6dGV4dC1yZWQtNDAwJ1xuICAgICAgICAgICAgICAgIH1gfSBcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFByb2R1Y3QgSW1hZ2UgU3RhZ2UgKFN0cmljdCAxOjEgZm9ybWF0KSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGFzcGVjdC1zcXVhcmUgdy1mdWxsIGJnLWdyYWRpZW50LXRvLWIgZnJvbS1bIzA5MEQxOF0gdG8tWyMwNzBBMTFdIHAtMiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzVcIj5cbiAgICAgICAgICAgIDxpbWcgXG4gICAgICAgICAgICAgIHNyYz17cHJvZHVjdC5pbWFnZX0gXG4gICAgICAgICAgICAgIHJlZmVycmVyUG9saWN5PVwibm8tcmVmZXJyZXJcIlxuICAgICAgICAgICAgICBhbHQ9e2xhbmcgPT09ICdhcicgPyBwcm9kdWN0Lm5hbWVBciA6IHByb2R1Y3QubmFtZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBvYmplY3QtY29udGFpbiBmaWx0ZXIgZHJvcC1zaGFkb3ctWzBfMTJweF8xMnB4X3JnYmEoMCwwLDAsMC41KV0gZ3JvdXAtaG92ZXI6c2NhbGUtMTA1IHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTUwMCBzZWxlY3Qtbm9uZSBwYi0xXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogRGV0YWlscyBSb3cgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGZsZXgtMSBwLTVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1icmFuZC1hY2NlbnQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBmb250LW1vbm8gbWItMVwiPlxuICAgICAgICAgICAgICB7cHJvZHVjdC5icmFuZCB8fCAnRWxLaG9seSd9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQtYmFzZSBtYi0xIHRydW5jYXRlIGZvbnQtc2Fuc1wiPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/IHByb2R1Y3QubmFtZUFyIDogcHJvZHVjdC5uYW1lfVxuICAgICAgICAgICAgPC9oMz5cblxuICAgICAgICAgICAgey8qIE1pY3JvIGRldGFpbHMgaW5kaWNhdG9yICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwIHRleHQtWzEwcHhdIHVwcGVyY2FzZSBmb250LW1vbm8gdHJhY2tpbmctd2lkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbXQtMC41IG1iLTJcIj5cbiAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2KfZhNiq2LXZhtmK2YE6JyA6ICdDYXRlZ29yeTonfSB7cHJvZHVjdC5jYXRlZ29yeX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEJvdHRvbSBBY3Rpb25zIGZvb3RlciBpbnNpZGUgQ2FyZCBGcm9udCAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1lbmQganVzdGlmeS1iZXR3ZWVuIG10LWF1dG8gcHQtNCBib3JkZXItdCBib3JkZXItd2hpdGUvNSBuby1mbGlwXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge2hhc0Rpc2NvdW50ICYmIHByb2R1Y3Qub3JpZ2luYWxQcmljZSAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDAgdGV4dC14cyBsaW5lLXRocm91Z2ggZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgIHtmb3JtYXRQcmljZShwcm9kdWN0Lm9yaWdpbmFsUHJpY2UpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYnJhbmQtYWNjZW50IGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1sZ1wiPlxuICAgICAgICAgICAgICAgICAge2Zvcm1hdFByaWNlKHByb2R1Y3QucHJpY2UpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpOyBvbkFkZFRvQ2FydChwcm9kdWN0KTsgfX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17cHJvZHVjdC5zdG9ja0NvdW50IDw9IDB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgIHByb2R1Y3Quc3RvY2tDb3VudCA+IDAgXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWJyYW5kLXByaW1hcnkgdGV4dC1bIzBCMEYxQV0gaG92ZXI6YnJpZ2h0bmVzcy0xMTAgc2hhZG93LWxnIHNoYWRvdy1icmFuZC1wcmltYXJ5LzIwIGhvdmVyOnNjYWxlLTEwNSBhY3RpdmU6c2NhbGUtOTUnIFxuICAgICAgICAgICAgICAgICAgICA6ICdiZy1ncmF5LTgwMCB0ZXh0LWdyYXktNTAwIGN1cnNvci1ub3QtYWxsb3dlZCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICB0aXRsZT17bGFuZyA9PT0gJ2FyJyA/ICfYo9i22YEg2KXZhNmJINin2YTYs9mE2KknIDogJ0FkZCB0byBDYXJ0J31cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxTaG9wcGluZ0NhcnQgY2xhc3NOYW1lPVwidy00IGgtNCBmb250LWJvbGRcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT0gQkFDSyBTSURFIE9GIFBST0RVQ1QgQ0FSRCA9PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgPGRpdiBcbiAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHctZnVsbCBoLWZ1bGwgYmFja2ZhY2UtaGlkZGVuIHJvdGF0ZS15LTE4MCBnbGFzcy1wYW5lbCByb3VuZGVkLTN4bCBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyIGJvcmRlci1icmFuZC1hY2NlbnQvMjAgZmxleCBmbGV4LWNvbCBwLTUgW2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuXSBiZy1bIzBBMEUxQV1cIlxuICAgICAgICAgIHN0eWxlPXt7IFdlYmtpdEJhY2tmYWNlVmlzaWJpbGl0eTogJ2hpZGRlbicgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHsvKiBIZWFkZXIgUm93OiBGbGlwIGJhY2sgW9mC2YTYqF0gYW5kIFNoYXJlIFvYp9mE2YXYtNin2LHZg9ipXSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBib3JkZXItYiBib3JkZXItd2hpdGUvMTAgcGItMyBtYi00IG5vLWZsaXBcIj5cbiAgICAgICAgICAgIHsvKiBGbGlwIGJhY2sgYnV0dG9uICovfVxuICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgc2V0SXNGbGlwcGVkKGZhbHNlKTsgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXdoaXRlL1swLjA0XSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIGhvdmVyOmJnLXdoaXRlL1swLjA4XSBob3Zlcjp0ZXh0LWJyYW5kLWFjY2VudCB0cmFuc2l0aW9uLWFsbCB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWdyYXktMzAwIGZvbnQtc2VtaWJvbGQgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2LHYrNmI2LknIDogJ0ZsaXAnfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogU2hhcmUgYWN0aW9uIGluZGljYXRvciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4geyBlLnN0b3BQcm9wYWdhdGlvbigpOyBzZXRTaGFyZU9wZW4oIXNoYXJlT3Blbik7IH19XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLWJyYW5kLXByaW1hcnkvMTAgYm9yZGVyIGJvcmRlci1icmFuZC1wcmltYXJ5LzIwIGhvdmVyOmJnLWJyYW5kLXByaW1hcnkvMjAgaG92ZXI6dGV4dC1icmFuZC1hY2NlbnQgdGV4dC1icmFuZC1wcmltYXJ5IHRyYW5zaXRpb24tYWxsIHRleHQteHMgZm9udC1tb25vIGZvbnQtc2VtaWJvbGQgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFNoYXJlMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2YXYtNin2LHZg9ipJyA6ICdTaGFyZSd9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFNvY2lhbCBTaGFyZSBHcmlkIG92ZXJsYXkgKi99XG4gICAgICAgICAgPEFuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAgICAgIHtzaGFyZU9wZW4gJiYgKFxuICAgICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgc2NhbGU6IDAuOTUsIHk6IC0xMCB9fVxuICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgc2NhbGU6IDEsIHk6IDAgfX1cbiAgICAgICAgICAgICAgICBleGl0PXt7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjk1LCB5OiAtMTAgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMTYgbGVmdC00IHJpZ2h0LTQgei0yMCBiZy1bIzBGMTcyQV0vOTUgYmFja2Ryb3AtYmx1ci1tZCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtMnhsIHAtNCBuby1mbGlwIHNoYWRvdy0yeGwgc3BhY2UteS0yLjVcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSBmb250LW1vbm8gZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LWJyYW5kLWFjY2VudFwiPlxuICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYrtmK2KfYsdin2Kog2KfZhNmF2LTYp9ix2YPYqSDYp9mE2LPYsdmK2LnYqScgOiAnUVVJQ0sgU0hBUkUnfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgc2V0U2hhcmVPcGVuKGZhbHNlKTsgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSByb3VuZGVkIGJnLXdoaXRlLzVcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4gaGFuZGxlU2hhcmVDbGljaygnd2EnLCBlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBwLTIgYmctZ3JlZW4tNTAwLzEwIGJvcmRlciBib3JkZXItZ3JlZW4tNTAwLzIwIHRleHQtZ3JlZW4tNDAwIGhvdmVyOmJnLWdyZWVuLTUwMC8yNCByb3VuZGVkLXhsIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHRleHQtbGVmdFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPvCfn6IgV2hhdHNBcHA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IGhhbmRsZVNoYXJlQ2xpY2soJ2ZiJywgZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcC0yIGJnLWJsdWUtNTAwLzEwIGJvcmRlciBib3JkZXItYmx1ZS01MDAvMjAgdGV4dC1ibHVlLTQwMCBob3ZlcjpiZy1ibHVlLTUwMC8yNCByb3VuZGVkLXhsIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHRleHQtbGVmdFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPvCflLUgRmFjZWJvb2s8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IGhhbmRsZVNoYXJlQ2xpY2soJ3gnLCBlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBwLTIgYmctZ3JheS04MDAvODAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCB0ZXh0LXdoaXRlIGhvdmVyOmJnLXdoaXRlLzEwIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgdGV4dC1sZWZ0XCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+4pqrIFR3aXR0ZXIgKFgpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiBoYW5kbGVTaGFyZUNsaWNrKCdjb3B5JywgZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcC0yIGJnLWJyYW5kLWFjY2VudC8xMCBib3JkZXIgYm9yZGVyLWJyYW5kLWFjY2VudC8yMCB0ZXh0LWJyYW5kLXByaW1hcnkgaG92ZXI6YmctYnJhbmQtYWNjZW50LzIwIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgdGV4dC1sZWZ0XCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2NvcGllZCA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWdyZWVuLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2NvcGllZCA/ICdDb3BpZWQhJyA6IChsYW5nID09PSAnYXInID8gJ9mG2LPYriDYp9mE2LHYp9io2LcnIDogJ0NvcHkgTGluaycpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuXG4gICAgICAgICAgey8qIEJhY2sgQm9keSBTY3JvbGwgY29udGFpbmVyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LXktYXV0byBwci0xIHNlbGVjdC10ZXh0IHNwYWNlLXktNCB0ZXh0LWxlZnQgZm9udC1zYW5zIHRleHQteHMgc2Nyb2xsYmFyLXRoaW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtc3RhcnQgZ2FwLTQgJHtkaXIgPT09ICdydGwnID8gJ2ZsZXgtcm93LXJldmVyc2UnIDogJ2ZsZXgtcm93J31gfT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtYnJhbmQtYWNjZW50IHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgZm9udC1tb25vIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICB7cHJvZHVjdC5icmFuZH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1ibGFjayB0ZXh0LXNtIHVwcGVyY2FzZSBmb250LXNhbnMgbXQtMC41IGJyZWFrLXdvcmRzXCI+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/IHByb2R1Y3QubmFtZUFyIDogcHJvZHVjdC5uYW1lfVxuICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgey8qIENsaWNrYWJsZSAmIENvcHlhYmxlIElEIEJhZGdlICovfVxuICAgICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChwcm9kdWN0LmlkKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0SWRDb3BpZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0SWRDb3BpZWQoZmFsc2UpLCAyMDAwKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBtdC0xLjUgcHgtMiBweS0xIHJvdW5kZWQgYmctd2hpdGUvWzAuMDRdIGJvcmRlciBib3JkZXItd2hpdGUvMTAgaG92ZXI6Ymctd2hpdGUvWzAuMV0gYWN0aXZlOmJnLXdoaXRlL1swLjE1XSB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtYnJhbmQtcHJpbWFyeSBob3Zlcjpib3JkZXItYnJhbmQtcHJpbWFyeS8yMCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzZWxlY3QtYWxsIGZvbnQtbW9ubyB0ZXh0LVs5cHhdIGZvbnQtYm9sZCBhY3RpdmU6c2NhbGUtOTUgbm8tZmxpcFwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT17bGFuZyA9PT0gJ2FyJyA/ICfYp9mG2YLYsSDZhNmG2LPYriDYp9mE2YPZiNivJyA6ICdDbGljayB0byBjb3B5IElEJ31cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aWRDb3BpZWQgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1ncmVlbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9iq2YUg2KfZhNmG2LPYriEnIDogJ0NvcGllZCEnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICA8Q29weSBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5JRDoge3Byb2R1Y3QuaWR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTbWFsbCBFbGVnYW50IFFSIENvZGUgRGlzcGxheSBvbiBUb3AgUmlnaHQgKExUUikgLyBUb3AgTGVmdCAoUlRMIGZsaXBwZWQgbGF5b3V0KSAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaHJpbmstMCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBnYXAtMSBiZy13aGl0ZSBwLTEuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItd2hpdGUvMTAgc2hhZG93LWxnIG5vLWZsaXAgdy1bODZweF1cIj5cbiAgICAgICAgICAgICAgICB7cXJVcmwgPyAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgICAgICAgIHNyYz17cXJVcmx9IFxuICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIlByb2R1Y3QgUVIgQ29kZVwiIFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctWzc0cHhdIGgtWzc0cHhdIG9iamVjdC1jb250YWluIHJvdW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e3FyVXJsfVxuICAgICAgICAgICAgICAgICAgICAgIGRvd25sb2FkPXtgUVItJHtwcm9kdWN0LmlkfS5wbmdgfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzhweF0gZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LVsjMEIwRjFBXSBiZy1icmFuZC1wcmltYXJ5IGhvdmVyOmJnLWJyYW5kLXByaW1hcnkvOTUgdHJhbnNpdGlvbi1hbGwgcHktMC41IHB4LTEuNSByb3VuZGVkLW1kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0wLjUgY3Vyc29yLXBvaW50ZXIgc2VsZWN0LW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMi41IGgtMi41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYqtit2YXZitmEJyA6ICdQTkcnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1bNzRweF0gaC1bNzRweF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1bOHB4XSB0ZXh0LWdyYXktNDAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAuLi5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBEZXNjcmlwdGlvbiAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBmb250LW1vbm8gYmxvY2tcIj5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YjYtdmBINmI2KfZhNiq2YHYp9i12YrZhCcgOiAnRGVzY3JpcHRpb24nfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS0zMDAgbGVhZGluZy1yZWxheGVkIGZvbnQtc2FucyB0ZXh0LXhzIHdoaXRlc3BhY2UtcHJlLWxpbmVcIj5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/IHByb2R1Y3QuZGVzY3JpcHRpb25BciA6IHByb2R1Y3QuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogQXZhaWxhYmxlIFN0b2NrICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgcHQtMiBib3JkZXItdCBib3JkZXItd2hpdGUvNVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgZm9udC1tb25vIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KfZhNmD2YXZitipINin2YTZhdiq2YjZgdix2Kkg2KjYp9mE2YXYrtiy2YjZhicgOiAnU3RvY2sgUXVhbnRpdHkgQXZhaWxhYmxlJ31cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSAke1xuICAgICAgICAgICAgICAgIHByb2R1Y3Quc3RvY2tDb3VudCA8PSAwIFxuICAgICAgICAgICAgICAgICAgPyAndGV4dC1yZWQtNTAwJyBcbiAgICAgICAgICAgICAgICAgIDogcHJvZHVjdC5zdG9ja0NvdW50IDw9IDMgXG4gICAgICAgICAgICAgICAgICAgID8gJ3RleHQtYW1iZXItNDAwJyBcbiAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1icmFuZC1hY2NlbnQnXG4gICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICA8c3Bhbj7il488L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICB7cHJvZHVjdC5zdG9ja0NvdW50IDw9IDAgXG4gICAgICAgICAgICAgICAgICAgID8gKGxhbmcgPT09ICdhcicgPyAn2LrZitixINmF2KrZiNmB2LEgLyDZhtmB2LDYqiDYp9mE2YPZhdmK2KknIDogJ091dCBvZiBzdG9jaycpIFxuICAgICAgICAgICAgICAgICAgICA6IGAke3Byb2R1Y3Quc3RvY2tDb3VudH0gJHtsYW5nID09PSAnYXInID8gJ9mC2LfYudipINmF2KrZiNmB2LHYqSDYrdin2YTZitin2YsnIDogJ3VuaXRzIGF2YWlsYWJsZSBjdXJyZW50bHknfWB9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFNwZWNpZmljYXRpb25zICovfVxuICAgICAgICAgICAge3Byb2R1Y3Quc3BlY3MgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBwdC0yIGJvcmRlci10IGJvcmRlci13aGl0ZS81XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IGZvbnQtbW9ubyBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KfZhNmF2YjYp9i12YHYp9iqINin2YTZgdmG2YrYqScgOiAnVGVjaG5pY2FsIFNwZWNpZmljYXRpb25zJ31cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1icmFuZC1hY2NlbnQvOTAgbGVhZGluZy1yZWxheGVkIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyBwcm9kdWN0LnNwZWNzQXIgOiBwcm9kdWN0LnNwZWNzfVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEJhY2sgRm9vdGVyOiBRdWljayBBZGQgYW5kIHByaWNlIHN1bW1hcnkgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLXQgYm9yZGVyLXdoaXRlLzUgcHQtMyBtdC1hdXRvIG5vLWZsaXBcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JheS01MDAgZm9udC1tb25vIHRyYWNraW5nLXdpZGVyIGJsb2NrIHVwcGVyY2FzZVwiPntsYW5nID09PSAnYXInID8gJ9in2YTYs9i52LEnIDogJ1ByaWNlJ308L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYnJhbmQtYWNjZW50IGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1iYXNlXCI+e2Zvcm1hdFByaWNlKHByb2R1Y3QucHJpY2UpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IG9uQWRkVG9DYXJ0KHByb2R1Y3QpOyB9fVxuICAgICAgICAgICAgICBkaXNhYmxlZD17cHJvZHVjdC5zdG9ja0NvdW50IDw9IDB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtNCBweS0yIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgdGV4dC14cyBmb250LWJvbGQgJHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0LnN0b2NrQ291bnQgPiAwIFxuICAgICAgICAgICAgICAgICAgPyAnYmctYnJhbmQtcHJpbWFyeSB0ZXh0LVsjMEIwRjFBXSBob3ZlcjpicmlnaHRuZXNzLTExMCBzaGFkb3ctbGcgc2hhZG93LWJyYW5kLXByaW1hcnkvMjAgYWN0aXZlOnNjYWxlLTk1JyBcbiAgICAgICAgICAgICAgICAgIDogJ2JnLWdyYXktODAwIHRleHQtZ3JheS01MDAgY3Vyc29yLW5vdC1hbGxvd2VkJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNob3BwaW5nQ2FydCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9i02LHYp9ihJyA6ICdCdXknfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm1hcHBpbmdzIjoiQUF3SGMsU0E2TE0sVUE3TE47QUF4SGQ7QUFBQTtBQUFBO0FBQUE7QUFLQSxTQUFnQixVQUFV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