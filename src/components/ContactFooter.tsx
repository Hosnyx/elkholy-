import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=905fa188"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=905fa188"; const useState = __vite__cjsImport1_react["useState"];
import { Bike, Instagram, Facebook, MessageCircle, MapPin, Phone, Mail, Clock, ArrowUp, Sparkles, ChevronDown, ChevronUp, Youtube } from "/node_modules/.vite/deps/lucide-react.js?v=905fa188";
import { useLanguage } from "/src/context/LanguageContext.tsx";
export default function ContactFooter({ onScrollToSection, homepageConfig }) {
  const { lang, dir, t } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (!homepageConfig?.footer || homepageConfig.footer.visible === false) {
    return null;
  }
  const fbLink = homepageConfig.footer.socialLinks?.facebook || "https://facebook.com";
  const igLink = homepageConfig.footer.socialLinks?.instagram || "https://instagram.com";
  const waLink = homepageConfig.footer.socialLinks?.whatsapp || "https://wa.me/201007062123";
  const ytLink = homepageConfig.footer.socialLinks?.youtube || "https://youtube.com";
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
      return /* @__PURE__ */ jsxDEV("div", { className: `flex items-center gap-2.5 ${logoPosition === "center" ? "mx-auto justify-center" : ""}`, children: [
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
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 53,
            columnNumber: 11
          },
          this
        ),
        (homepageConfig?.header?.logoText || homepageConfig?.header?.logoTextAr) && /* @__PURE__ */ jsxDEV("div", { className: "text-left", children: /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-bold tracking-wider text-white", children: [
          logoText,
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent", children: logoAccent }, void 0, false, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 62,
            columnNumber: 28
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 61,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 60,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ContactFooter.tsx",
        lineNumber: 52,
        columnNumber: 9
      }, this);
    }
    return /* @__PURE__ */ jsxDEV("div", { className: `flex items-center gap-3 ${logoPosition === "center" ? "mx-auto justify-center" : ""} group`, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-accent p-[0.5px]", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full h-full bg-[#070A11] rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(Bike, { className: "w-5 h-5 text-brand-accent animate-pulse" }, void 0, false, {
        fileName: "/app/applet/src/components/ContactFooter.tsx",
        lineNumber: 74,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/ContactFooter.tsx",
        lineNumber: 73,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/ContactFooter.tsx",
        lineNumber: 72,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir, children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-bold tracking-wider text-white select-none", children: [
          logoText,
          " ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent", children: logoAccent }, void 0, false, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 79,
            columnNumber: 24
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 78,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-[8px] text-gray-500 font-mono tracking-widest uppercase", children: t("slogan") }, void 0, false, {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 81,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ContactFooter.tsx",
        lineNumber: 77,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ContactFooter.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this);
  };
  return /* @__PURE__ */ jsxDEV("footer", { id: "footer", className: "relative border-t border-white/[0.08] bg-[#070A11] pt-12 pb-8 overflow-hidden text-left", dir, children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" }, void 0, false, {
      fileName: "/app/applet/src/components/ContactFooter.tsx",
      lineNumber: 91,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none" }, void 0, false, {
      fileName: "/app/applet/src/components/ContactFooter.tsx",
      lineNumber: 92,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
      homepageConfig.footer.collapsible && /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-6 pb-4 border-b border-white/5", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-gray-500 uppercase tracking-widest", children: lang === "ar" ? "▼ خيارات العرض والطي متوفرة للفوتر" : "▼ COLLAPSIBLE FOOTER REGIONS" }, void 0, false, {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 99,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsCollapsed(!isCollapsed),
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-brand-accent bg-[#0B0F1A]/50 text-gray-400 hover:text-white transition-all text-xs font-mono cursor-pointer",
            children: [
              isCollapsed ? /* @__PURE__ */ jsxDEV(ChevronDown, { className: "w-3.5 h-3.5 text-brand-accent" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 104,
                columnNumber: 30
              }, this) : /* @__PURE__ */ jsxDEV(ChevronUp, { className: "w-3.5 h-3.5 text-brand-secondary" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 104,
                columnNumber: 90
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: isCollapsed ? lang === "ar" ? "توسيع القائمة" : "EXPAND FOOTER" : lang === "ar" ? "طي القائمة" : "COLLAPSE FOOTER" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 105,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 100,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ContactFooter.tsx",
        lineNumber: 98,
        columnNumber: 11
      }, this),
      !isCollapsed && /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
          renderLogo(),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-400 font-sans leading-relaxed", children: lang === "ar" ? homepageConfig.footer.contentAr || "الوجهة الأولى والوحيدة بمصر للموتوسيكلات والاسكوترات الكهربائية والهجينة فائقة الأداء للمستقبل. ندمج الكفاءة العالية بالأناقة والسيطرة الهندسية." : homepageConfig.footer.content || "Egypt's premier boutique destination for high-end cybernetic motorcycles and tech-scooters. Launching the next generation of style, hyper-efficiency, and track dominance." }, void 0, false, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 117,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 pt-2", children: [
            waLink && /* @__PURE__ */ jsxDEV(
              "a",
              {
                href: waLink,
                target: "_blank",
                rel: "noreferrer",
                className: "w-10 h-10 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300",
                "aria-label": "WhatsApp",
                children: /* @__PURE__ */ jsxDEV(MessageCircle, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 134,
                  columnNumber: 21
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 127,
                columnNumber: 19
              },
              this
            ),
            igLink && /* @__PURE__ */ jsxDEV(
              "a",
              {
                href: igLink,
                target: "_blank",
                rel: "noreferrer",
                className: "w-10 h-10 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all duration-300",
                "aria-label": "Instagram",
                children: /* @__PURE__ */ jsxDEV(Instagram, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 145,
                  columnNumber: 21
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 138,
                columnNumber: 19
              },
              this
            ),
            fbLink && /* @__PURE__ */ jsxDEV(
              "a",
              {
                href: fbLink,
                target: "_blank",
                rel: "noreferrer",
                className: "w-10 h-10 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300",
                "aria-label": "Facebook",
                children: /* @__PURE__ */ jsxDEV(Facebook, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 156,
                  columnNumber: 21
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 149,
                columnNumber: 19
              },
              this
            ),
            ytLink && /* @__PURE__ */ jsxDEV(
              "a",
              {
                href: ytLink,
                target: "_blank",
                rel: "noreferrer",
                className: "w-10 h-10 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300",
                "aria-label": "YouTube",
                children: /* @__PURE__ */ jsxDEV(Youtube, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 167,
                  columnNumber: 21
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 160,
                columnNumber: 19
              },
              this
            ),
            homepageConfig.footer.customSocialLinks?.map((customLink, idx) => {
              if (!customLink.url) return null;
              return /* @__PURE__ */ jsxDEV(
                "a",
                {
                  href: customLink.url,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "w-10 h-10 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-brand-accent hover:border-brand-accent/35 hover:bg-brand-accent/5 transition-all duration-300 overflow-hidden",
                  "aria-label": customLink.name,
                  children: customLink.iconUrl ? /* @__PURE__ */ jsxDEV(
                    "img",
                    {
                      src: customLink.iconUrl,
                      alt: customLink.name,
                      className: "w-5 h-5 object-contain",
                      referrerPolicy: "no-referrer"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ContactFooter.tsx",
                      lineNumber: 183,
                      columnNumber: 25
                    },
                    this
                  ) : /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] uppercase font-mono font-black tracking-wider text-brand-secondary", children: customLink.name.slice(0, 2) }, void 0, false, {
                    fileName: "/app/applet/src/components/ContactFooter.tsx",
                    lineNumber: 190,
                    columnNumber: 25
                  }, this)
                },
                customLink.id || idx,
                false,
                {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 174,
                  columnNumber: 21
                },
                this
              );
            })
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 125,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 114,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir, children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-mono tracking-widest text-white uppercase mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-brand-accent animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 201,
              columnNumber: 17
            }, this),
            " ",
            lang === "ar" ? "أقسام الموقع" : "SHOWROOM NAVIGATION"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 200,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("ul", { className: "space-y-3 text-xs font-mono text-gray-400", children: homepageConfig.footer.quickLinks?.map((link, idx) => /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                const targetId = link.url.replace("#", "");
                onScrollToSection(targetId);
              },
              className: "hover:text-brand-accent transition-colors duration-200 cursor-pointer flex items-center gap-1 group uppercase",
              children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-brand-primary opacity-0 group-hover:opacity-100 transition-all duration-300", children: ">" }, void 0, false, {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 213,
                  columnNumber: 23
                }, this),
                " ",
                lang === "ar" ? link.labelAr : link.label
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 206,
              columnNumber: 21
            },
            this
          ) }, idx, false, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 205,
            columnNumber: 19
          }, this)) || /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => onScrollToSection("home"),
                className: "hover:text-brand-accent transition-colors duration-200 cursor-pointer flex items-center gap-1 group uppercase",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-brand-primary opacity-0 group-hover:opacity-100 transition-all duration-300", children: ">" }, void 0, false, {
                    fileName: "/app/applet/src/components/ContactFooter.tsx",
                    lineNumber: 223,
                    columnNumber: 25
                  }, this),
                  " ",
                  t("home")
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 219,
                columnNumber: 23
              },
              this
            ) }, void 0, false, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 218,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => onScrollToSection("categories"),
                className: "hover:text-brand-accent transition-colors duration-200 cursor-pointer flex items-center gap-1 group uppercase",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-brand-primary opacity-0 group-hover:opacity-100 transition-all duration-300", children: ">" }, void 0, false, {
                    fileName: "/app/applet/src/components/ContactFooter.tsx",
                    lineNumber: 231,
                    columnNumber: 25
                  }, this),
                  " ",
                  t("categories")
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 227,
                columnNumber: 23
              },
              this
            ) }, void 0, false, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 226,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => onScrollToSection("gallery"),
                className: "hover:text-brand-accent transition-colors duration-200 cursor-pointer flex items-center gap-1 group uppercase",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-brand-primary opacity-0 group-hover:opacity-100 transition-all duration-300", children: ">" }, void 0, false, {
                    fileName: "/app/applet/src/components/ContactFooter.tsx",
                    lineNumber: 239,
                    columnNumber: 25
                  }, this),
                  " ",
                  t("showroom")
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 235,
                columnNumber: 23
              },
              this
            ) }, void 0, false, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 234,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 217,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 203,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 199,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir, children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-mono tracking-widest text-white uppercase mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(MapPin, { className: "w-3.5 h-3.5 text-brand-accent" }, void 0, false, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 250,
              columnNumber: 17
            }, this),
            " ",
            lang === "ar" ? "المقر الفاخر بمصر" : "THE LUXURY CODES"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 249,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("ul", { className: "space-y-4 text-xs text-gray-400", children: [
            /* @__PURE__ */ jsxDEV("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxDEV(MapPin, { className: "w-5 h-5 text-brand-accent shrink-0 mt-0.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 254,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? homepageConfig.footer.addressAr || "أرض رقم 18، الطريق الدائري الإقليمي، التجمع الخامس، القاهرة الجديدة، مصر" : homepageConfig.footer.address || "Plot 18, Royal Zone Road, Fifth Settlement, New Cairo, Egypt" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 255,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 253,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxDEV(Phone, { className: "w-4 h-4 text-brand-primary shrink-0" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 264,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-gray-300", children: homepageConfig.footer.phone || "+20 100 7062 123" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 265,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 263,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxDEV(Mail, { className: "w-4 h-4 text-brand-secondary shrink-0" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 268,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-gray-205", children: homepageConfig.footer.email || "sales@elkholymotors.com" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 269,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 267,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 252,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 248,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir, children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-mono tracking-widest text-white uppercase mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Clock, { className: "w-3.5 h-3.5 text-brand-accent" }, void 0, false, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 277,
              columnNumber: 17
            }, this),
            " ",
            lang === "ar" ? "ساعات العمل الرسمية" : "DIGITAL CONCIERGE"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 276,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 text-xs text-gray-400 bg-white/[0.02] border border-white/5 rounded-xl p-4 font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "الأحد - الخميس:" : "SUN - THU:" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 281,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-white", children: lang === "ar" ? homepageConfig.footer.hoursSunThuAr || homepageConfig.footer.hoursSunThu || "10:00 AM - 10:00 PM" : homepageConfig.footer.hoursSunThu || "10:00 AM - 10:00 PM" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 282,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 280,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "الجمعة:" : "FRIDAY:" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 289,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent", children: lang === "ar" ? homepageConfig.footer.hoursFriAr || homepageConfig.footer.hoursFri || "04:00 PM - 11:00 PM" : homepageConfig.footer.hoursFri || "04:00 PM - 11:00 PM" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 290,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 288,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "السبت:" : "SATURDAY:" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 297,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-white", children: lang === "ar" ? homepageConfig.footer.hoursSatAr || homepageConfig.footer.hoursSat || "11:00 AM - 09:00 PM" : homepageConfig.footer.hoursSat || "11:00 AM - 09:00 PM" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 298,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 296,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-500 italic mt-2 border-t border-white/5 pt-2 font-sans leading-relaxed", children: lang === "ar" ? "* دعم الحجز على الواتساب يعمل تلقائياً على مدار الساعة طوال الأسبوع." : "* Online support desk operates 24/7 on WhatsApp." }, void 0, false, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 304,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 279,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 275,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ContactFooter.tsx",
        lineNumber: 111,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-gray-500 font-mono tracking-wider", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          lang === "ar" ? homepageConfig.header.logoTextAr || "الخولي موتورز" : homepageConfig.header.logoText || "ELKHOLY MOTORS",
          ". ",
          lang === "ar" ? homepageConfig.footer.copyrightAr || "جميع الحقوق محفوظة. مشروع جراج رقمي 2026." : homepageConfig.footer.copyright || "ALL RIGHTS RESERVED. YEAR 2026 CYBER SHOWROOM PROJECT."
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 318,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-6 text-[10px] font-mono text-gray-400", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "hover:text-brand-accent transition-colors duration-200 cursor-help uppercase", children: lang === "ar" ? "شروط القيادة للتجارب" : "TERMS OF RIDE" }, void 0, false, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 326,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: scrollToTop,
              className: "p-2 bg-gradient-to-tr from-brand-primary to-brand-accent rounded-lg text-white hover:brightness-125 focus:ring-1 focus:ring-brand-accent hover:-translate-y-1 transition-all cursor-pointer shadow-lg shadow-brand-primary/10",
              "aria-label": "Scroll to top",
              children: /* @__PURE__ */ jsxDEV(ArrowUp, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 334,
                columnNumber: 15
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 329,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 325,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ContactFooter.tsx",
        lineNumber: 317,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ContactFooter.tsx",
      lineNumber: 94,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ContactFooter.tsx",
    lineNumber: 88,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRhY3RGb290ZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQmlrZSwgSW5zdGFncmFtLCBGYWNlYm9vaywgTWVzc2FnZUNpcmNsZSwgTWFwUGluLCBQaG9uZSwgTWFpbCwgQ2xvY2ssIEFycm93VXAsIFNwYXJrbGVzLCBDaGV2cm9uRG93biwgQ2hldnJvblVwLCBZb3V0dWJlIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IHVzZUxhbmd1YWdlIH0gZnJvbSAnLi4vY29udGV4dC9MYW5ndWFnZUNvbnRleHQnO1xuaW1wb3J0IHsgSG9tZXBhZ2VDb25maWcgfSBmcm9tICcuLi90eXBlcyc7XG5cbmludGVyZmFjZSBGb290ZXJQcm9wcyB7XG4gIG9uU2Nyb2xsVG9TZWN0aW9uOiAoc2VjdGlvbklkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGhvbWVwYWdlQ29uZmlnOiBIb21lcGFnZUNvbmZpZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29udGFjdEZvb3Rlcih7IG9uU2Nyb2xsVG9TZWN0aW9uLCBob21lcGFnZUNvbmZpZyB9OiBGb290ZXJQcm9wcykge1xuICBjb25zdCB7IGxhbmcsIGRpciwgdCB9ID0gdXNlTGFuZ3VhZ2UoKTtcbiAgY29uc3QgW2lzQ29sbGFwc2VkLCBzZXRJc0NvbGxhcHNlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIFxuICBjb25zdCBzY3JvbGxUb1RvcCA9ICgpID0+IHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDAsIGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcbiAgfTtcblxuICBpZiAoIWhvbWVwYWdlQ29uZmlnPy5mb290ZXIgfHwgaG9tZXBhZ2VDb25maWcuZm9vdGVyLnZpc2libGUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBmYkxpbmsgPSBob21lcGFnZUNvbmZpZy5mb290ZXIuc29jaWFsTGlua3M/LmZhY2Vib29rIHx8IFwiaHR0cHM6Ly9mYWNlYm9vay5jb21cIjtcbiAgY29uc3QgaWdMaW5rID0gaG9tZXBhZ2VDb25maWcuZm9vdGVyLnNvY2lhbExpbmtzPy5pbnN0YWdyYW0gfHwgXCJodHRwczovL2luc3RhZ3JhbS5jb21cIjtcbiAgY29uc3Qgd2FMaW5rID0gaG9tZXBhZ2VDb25maWcuZm9vdGVyLnNvY2lhbExpbmtzPy53aGF0c2FwcCB8fCBcImh0dHBzOi8vd2EubWUvMjAxMDA3MDYyMTIzXCI7XG4gIGNvbnN0IHl0TGluayA9IGhvbWVwYWdlQ29uZmlnLmZvb3Rlci5zb2NpYWxMaW5rcz8ueW91dHViZSB8fCBcImh0dHBzOi8veW91dHViZS5jb21cIjtcblxuICBjb25zdCBsb2dvVXJsID0gaG9tZXBhZ2VDb25maWc/LmhlYWRlcj8ubG9nb1VybDtcbiAgY29uc3QgbG9nb1RleHQgPSBsYW5nID09PSAnYXInID8gKGhvbWVwYWdlQ29uZmlnPy5oZWFkZXI/LmxvZ29UZXh0QXIgfHwgJ9in2YTYrtmI2YTZiicpIDogKGhvbWVwYWdlQ29uZmlnPy5oZWFkZXI/LmxvZ29UZXh0IHx8ICdFTEtIT0xZJyk7XG4gIGNvbnN0IGxvZ29BY2NlbnQgPSBsYW5nID09PSAnYXInID8gKGhvbWVwYWdlQ29uZmlnPy5oZWFkZXI/LmFjY2VudEFyIHx8ICfZhdmI2KrZiNix2LInKSA6IChob21lcGFnZUNvbmZpZz8uaGVhZGVyPy5hY2NlbnQgfHwgJ01PVE9SUycpO1xuICBjb25zdCBsb2dvU2l6ZSA9IGhvbWVwYWdlQ29uZmlnPy5oZWFkZXI/LmxvZ29TaXplIHx8ICdtZWRpdW0nO1xuICBjb25zdCBsb2dvRWZmZWN0ID0gaG9tZXBhZ2VDb25maWc/LmhlYWRlcj8ubG9nb0VmZmVjdCB8fCAnZ2xvdyc7XG4gIGNvbnN0IGxvZ29Qb3NpdGlvbiA9IGhvbWVwYWdlQ29uZmlnPy5oZWFkZXI/LmxvZ29Qb3NpdGlvbiB8fCAnbGVmdCc7XG5cbiAgY29uc3QgcmVuZGVyTG9nbyA9ICgpID0+IHtcbiAgICBsZXQgc2l6ZUNsYXNzID0gJ2gtMTAnO1xuICAgIGlmIChsb2dvU2l6ZSA9PT0gJ3NtYWxsJykgc2l6ZUNsYXNzID0gJ2gtOCc7XG4gICAgaWYgKGxvZ29TaXplID09PSAnbGFyZ2UnKSBzaXplQ2xhc3MgPSAnaC0xNCc7XG5cbiAgICBsZXQgZWZmZWN0Q2xhc3MgPSAnJztcbiAgICBpZiAobG9nb0VmZmVjdCA9PT0gJ2dsb3cnKSBlZmZlY3RDbGFzcyA9ICdzaGFkb3ctWzBfMF8xNXB4X3JnYmEoMzQsMjExLDIzOCwwLjU1KV0gYm9yZGVyIGJvcmRlci1bIzIyRDNFRV0vMzAgYmctWyMyMkQzRUVdLzUgcHgtMiBweS0xIHJvdW5kZWQteGwnO1xuICAgIGlmIChsb2dvRWZmZWN0ID09PSAnbmVvbicpIGVmZmVjdENsYXNzID0gJ3NoYWRvdy1bMF8wXzIwcHhfcmdiYSgxNjgsODUsMjQ3LDAuNjUpXSBib3JkZXIgYm9yZGVyLVsjQTg1NUY3XS80MCBiZy1bI0E4NTVGN10vMTAgcHgtMiBweS0xIHJvdW5kZWQteGwnO1xuICAgIGlmIChsb2dvRWZmZWN0ID09PSAnc2hhZG93JykgZWZmZWN0Q2xhc3MgPSAnc2hhZG93LTJ4bCBzaGFkb3ctYmxhY2svODAgYmctYmxhY2svNTAgcHgtMiBweS0xIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci13aGl0ZS81JztcblxuICAgIGlmIChsb2dvVXJsKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjUgJHtsb2dvUG9zaXRpb24gPT09ICdjZW50ZXInID8gJ214LWF1dG8ganVzdGlmeS1jZW50ZXInIDogJyd9YH0+XG4gICAgICAgICAgPGltZyBcbiAgICAgICAgICAgIHNyYz17bG9nb1VybH0gXG4gICAgICAgICAgICBhbHQ9XCJFbEtob2x5IE1vdG9ycyBMb2dvXCIgXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Ake3NpemVDbGFzc30gJHtlZmZlY3RDbGFzc30gb2JqZWN0LWNvbnRhaW4gdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGhvdmVyOnNjYWxlLTEwNWB9XG4gICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIHsoaG9tZXBhZ2VDb25maWc/LmhlYWRlcj8ubG9nb1RleHQgfHwgaG9tZXBhZ2VDb25maWc/LmhlYWRlcj8ubG9nb1RleHRBcikgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1iYXNlIHNtOnRleHQtbGcgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICB7bG9nb1RleHR9IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYnJhbmQtYWNjZW50XCI+e2xvZ29BY2NlbnR9PC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgJHtsb2dvUG9zaXRpb24gPT09ICdjZW50ZXInID8gJ214LWF1dG8ganVzdGlmeS1jZW50ZXInIDogJyd9IGdyb3VwYH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tdHIgZnJvbS1icmFuZC1wcmltYXJ5IHRvLWJyYW5kLWFjY2VudCBwLVswLjVweF1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgYmctWyMwNzBBMTFdIHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxCaWtlIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1icmFuZC1hY2NlbnQgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGVmdFwiIGRpcj17ZGlyfT5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciB0ZXh0LXdoaXRlIHNlbGVjdC1ub25lXCI+XG4gICAgICAgICAgICB7bG9nb1RleHR9IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYnJhbmQtYWNjZW50XCI+e2xvZ29BY2NlbnR9PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVs4cHhdIHRleHQtZ3JheS01MDAgZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCB1cHBlcmNhc2VcIj57dCgnc2xvZ2FuJyl9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Zm9vdGVyIGlkPVwiZm9vdGVyXCIgY2xhc3NOYW1lPVwicmVsYXRpdmUgYm9yZGVyLXQgYm9yZGVyLXdoaXRlL1swLjA4XSBiZy1bIzA3MEExMV0gcHQtMTIgcGItOCBvdmVyZmxvdy1oaWRkZW4gdGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgXG4gICAgICB7LyogVmlzdWFsIGJhY2tncm91bmQgbGlnaHRzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0xLzQgdy1bNDAwcHhdIGgtWzQwMHB4XSByb3VuZGVkLWZ1bGwgYmctYnJhbmQtcHJpbWFyeS81IGJsdXItWzEyMHB4XSBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTAgbGVmdC0xMCB3LVszMDBweF0gaC1bMzAwcHhdIHJvdW5kZWQtZnVsbCBiZy1icmFuZC1hY2NlbnQvNSBibHVyLVsxMDBweF0gcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICBcbiAgICAgICAgey8qIENvbGxhcHNpYmxlIHRvZ2dsZSBoZWFkZXIgKi99XG4gICAgICAgIHtob21lcGFnZUNvbmZpZy5mb290ZXIuY29sbGFwc2libGUgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIG1iLTYgcGItNCBib3JkZXItYiBib3JkZXItd2hpdGUvNVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0XCI+e2xhbmcgPT09ICdhcicgPyAn4pa8INiu2YrYp9ix2KfYqiDYp9mE2LnYsdi2INmI2KfZhNi32Yog2YXYqtmI2YHYsdipINmE2YTZgdmI2KrYsScgOiAn4pa8IENPTExBUFNJQkxFIEZPT1RFUiBSRUdJT05TJ308L3NwYW4+XG4gICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0NvbGxhcHNlZCghaXNDb2xsYXBzZWQpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMS41IHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBob3Zlcjpib3JkZXItYnJhbmQtYWNjZW50IGJnLVsjMEIwRjFBXS81MCB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1hbGwgdGV4dC14cyBmb250LW1vbm8gY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aXNDb2xsYXBzZWQgPyA8Q2hldnJvbkRvd24gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1icmFuZC1hY2NlbnRcIiAvPiA6IDxDaGV2cm9uVXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1icmFuZC1zZWNvbmRhcnlcIiAvPn1cbiAgICAgICAgICAgICAgPHNwYW4+e2lzQ29sbGFwc2VkID8gKGxhbmcgPT09ICdhcicgPyAn2KrZiNiz2YrYuSDYp9mE2YLYp9im2YXYqScgOiAnRVhQQU5EIEZPT1RFUicpIDogKGxhbmcgPT09ICdhcicgPyAn2LfZiiDYp9mE2YLYp9im2YXYqScgOiAnQ09MTEFQU0UgRk9PVEVSJyl9PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgeyFpc0NvbGxhcHNlZCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC0xMiBtYi0xMlwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogQnJhbmQgSW50cm8gaW5mbyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICAgIHtyZW5kZXJMb2dvKCl9XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS00MDAgZm9udC1zYW5zIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInIFxuICAgICAgICAgICAgICAgICAgPyBob21lcGFnZUNvbmZpZy5mb290ZXIuY29udGVudEFyIHx8ICfYp9mE2YjYrNmH2Kkg2KfZhNij2YjZhNmJINmI2KfZhNmI2K3Zitiv2Kkg2KjZhdi12LEg2YTZhNmF2YjYqtmI2LPZitmD2YTYp9iqINmI2KfZhNin2LPZg9mI2KrYsdin2Kog2KfZhNmD2YfYsdio2KfYptmK2Kkg2YjYp9mE2YfYrNmK2YbYqSDZgdin2KbZgtipINin2YTYo9iv2KfYoSDZhNmE2YXYs9iq2YLYqNmELiDZhtiv2YXYrCDYp9mE2YPZgdin2KHYqSDYp9mE2LnYp9mE2YrYqSDYqNin2YTYo9mG2KfZgtipINmI2KfZhNiz2YrYt9ix2Kkg2KfZhNmH2YbYr9iz2YrYqS4nXG4gICAgICAgICAgICAgICAgICA6IGhvbWVwYWdlQ29uZmlnLmZvb3Rlci5jb250ZW50IHx8IFwiRWd5cHQncyBwcmVtaWVyIGJvdXRpcXVlIGRlc3RpbmF0aW9uIGZvciBoaWdoLWVuZCBjeWJlcm5ldGljIG1vdG9yY3ljbGVzIGFuZCB0ZWNoLXNjb290ZXJzLiBMYXVuY2hpbmcgdGhlIG5leHQgZ2VuZXJhdGlvbiBvZiBzdHlsZSwgaHlwZXItZWZmaWNpZW5jeSwgYW5kIHRyYWNrIGRvbWluYW5jZS5cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgIHsvKiBTb2NpYWwgR3JpZCAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBwdC0yXCI+XG4gICAgICAgICAgICAgICAge3dhTGluayAmJiAoXG4gICAgICAgICAgICAgICAgICA8YSBcbiAgICAgICAgICAgICAgICAgICAgaHJlZj17d2FMaW5rfSBcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCIgXG4gICAgICAgICAgICAgICAgICAgIHJlbD1cIm5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC1sZyBiZy13aGl0ZS9bMC4wM10gYm9yZGVyIGJvcmRlci13aGl0ZS81IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC1ncmVlbi00MDAgaG92ZXI6Ym9yZGVyLWdyZWVuLTUwMC8zMCBob3ZlcjpiZy1ncmVlbi01MDAvNSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDBcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiV2hhdHNBcHBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZUNpcmNsZSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtpZ0xpbmsgJiYgKFxuICAgICAgICAgICAgICAgICAgPGEgXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9e2lnTGlua30gXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiIFxuICAgICAgICAgICAgICAgICAgICByZWw9XCJub3JlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQtbGcgYmctd2hpdGUvWzAuMDNdIGJvcmRlciBib3JkZXItd2hpdGUvNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtcGluay01MDAgaG92ZXI6Ym9yZGVyLXBpbmstNTAwLzMwIGhvdmVyOmJnLXBpbmstNTAwLzUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkluc3RhZ3JhbVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxJbnN0YWdyYW0gY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7ZmJMaW5rICYmIChcbiAgICAgICAgICAgICAgICAgIDxhIFxuICAgICAgICAgICAgICAgICAgICBocmVmPXtmYkxpbmt9IFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIiBcbiAgICAgICAgICAgICAgICAgICAgcmVsPVwibm9yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLWxnIGJnLXdoaXRlL1swLjAzXSBib3JkZXIgYm9yZGVyLXdoaXRlLzUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LWJsdWUtNTAwIGhvdmVyOmJvcmRlci1ibHVlLTUwMC8zMCBob3ZlcjpiZy1ibHVlLTUwMC81IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJGYWNlYm9va1wiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxGYWNlYm9vayBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHt5dExpbmsgJiYgKFxuICAgICAgICAgICAgICAgICAgPGEgXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9e3l0TGlua30gXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiIFxuICAgICAgICAgICAgICAgICAgICByZWw9XCJub3JlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQtbGcgYmctd2hpdGUvWzAuMDNdIGJvcmRlciBib3JkZXItd2hpdGUvNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtcmVkLTUwMCBob3Zlcjpib3JkZXItcmVkLTUwMC8zMCBob3ZlcjpiZy1yZWQtNTAwLzUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIllvdVR1YmVcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8WW91dHViZSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHsvKiBDdXN0b20gU29jaWFsIExpbmtzIChlLmcuIFRpa1Rvaykgd2l0aCBjdXN0b20gaW1hZ2Ugb3IgaW5pdGlhbHMgaWNvbiAqL31cbiAgICAgICAgICAgICAgICB7aG9tZXBhZ2VDb25maWcuZm9vdGVyLmN1c3RvbVNvY2lhbExpbmtzPy5tYXAoKGN1c3RvbUxpbmssIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKCFjdXN0b21MaW5rLnVybCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8YSBcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2N1c3RvbUxpbmsuaWQgfHwgaWR4fVxuICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e2N1c3RvbUxpbmsudXJsfSBcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIiBcbiAgICAgICAgICAgICAgICAgICAgICByZWw9XCJub3JlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC1sZyBiZy13aGl0ZS9bMC4wM10gYm9yZGVyIGJvcmRlci13aGl0ZS81IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC1icmFuZC1hY2NlbnQgaG92ZXI6Ym9yZGVyLWJyYW5kLWFjY2VudC8zNSBob3ZlcjpiZy1icmFuZC1hY2NlbnQvNSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgb3ZlcmZsb3ctaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtjdXN0b21MaW5rLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7Y3VzdG9tTGluay5pY29uVXJsID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtjdXN0b21MaW5rLmljb25Vcmx9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e2N1c3RvbUxpbmsubmFtZX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNSBoLTUgb2JqZWN0LWNvbnRhaW5cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZXJQb2xpY3k9XCJuby1yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgZm9udC1tb25vIGZvbnQtYmxhY2sgdHJhY2tpbmctd2lkZXIgdGV4dC1icmFuZC1zZWNvbmRhcnlcIj57Y3VzdG9tTGluay5uYW1lLnNsaWNlKDAsIDIpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogUXVpY2sgTmF2aWdhdGUgTGlua3MgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGVmdFwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCB0ZXh0LXdoaXRlIHVwcGVyY2FzZSBtYi02IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYnJhbmQtYWNjZW50IGFuaW1hdGUtcHVsc2VcIiAvPiB7bGFuZyA9PT0gJ2FyJyA/ICfYo9mC2LPYp9mFINin2YTZhdmI2YLYuScgOiAnU0hPV1JPT00gTkFWSUdBVElPTid9XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTMgdGV4dC14cyBmb250LW1vbm8gdGV4dC1ncmF5LTQwMFwiPlxuICAgICAgICAgICAgICAgIHtob21lcGFnZUNvbmZpZy5mb290ZXIucXVpY2tMaW5rcz8ubWFwKChsaW5rLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2lkeH0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0SWQgPSBsaW5rLnVybC5yZXBsYWNlKCcjJywgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb25TY3JvbGxUb1NlY3Rpb24odGFyZ2V0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1icmFuZC1hY2NlbnQgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwIGN1cnNvci1wb2ludGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGdyb3VwIHVwcGVyY2FzZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJyYW5kLXByaW1hcnkgb3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiPiZndDs8L3NwYW4+IHtsYW5nID09PSAnYXInID8gbGluay5sYWJlbEFyIDogbGluay5sYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICkpIHx8IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25TY3JvbGxUb1NlY3Rpb24oJ2hvbWUnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhvdmVyOnRleHQtYnJhbmQtYWNjZW50IHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTIwMCBjdXJzb3ItcG9pbnRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBncm91cCB1cHBlcmNhc2VcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYnJhbmQtcHJpbWFyeSBvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCI+Jmd0Ozwvc3Bhbj4ge3QoJ2hvbWUnKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblNjcm9sbFRvU2VjdGlvbignY2F0ZWdvcmllcycpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1icmFuZC1hY2NlbnQgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwIGN1cnNvci1wb2ludGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGdyb3VwIHVwcGVyY2FzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1icmFuZC1wcmltYXJ5IG9wYWNpdHktMCBncm91cC1ob3ZlcjpvcGFjaXR5LTEwMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDBcIj4mZ3Q7PC9zcGFuPiB7dCgnY2F0ZWdvcmllcycpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uU2Nyb2xsVG9TZWN0aW9uKCdnYWxsZXJ5Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJob3Zlcjp0ZXh0LWJyYW5kLWFjY2VudCB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0yMDAgY3Vyc29yLXBvaW50ZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgZ3JvdXAgdXBwZXJjYXNlXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJyYW5kLXByaW1hcnkgb3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiPiZndDs8L3NwYW4+IHt0KCdzaG93cm9vbScpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogTHV4dXJ5IEVneXB0aWFuIEhlYWRxdWFydGVycyBBZGRyZXNzL0RldGFpbHMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGVmdFwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCB0ZXh0LXdoaXRlIHVwcGVyY2FzZSBtYi02IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPE1hcFBpbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWJyYW5kLWFjY2VudFwiIC8+IHtsYW5nID09PSAnYXInID8gJ9in2YTZhdmC2LEg2KfZhNmB2KfYrtixINio2YXYtdixJyA6ICdUSEUgTFVYVVJZIENPREVTJ31cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInNwYWNlLXktNCB0ZXh0LXhzIHRleHQtZ3JheS00MDBcIj5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgPE1hcFBpbiBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtYnJhbmQtYWNjZW50IHNocmluay0wIG10LTAuNVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgaG9tZXBhZ2VDb25maWcuZm9vdGVyLmFkZHJlc3NBciB8fCAn2KPYsdi2INix2YLZhSAxONiMINin2YTYt9ix2YrZgiDYp9mE2K/Yp9im2LHZiiDYp9mE2KXZgtmE2YrZhdmK2Iwg2KfZhNiq2KzZhdi5INin2YTYrtin2YXYs9iMINin2YTZgtin2YfYsdipINin2YTYrNiv2YrYr9ip2Iwg2YXYtdixJ1xuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIGhvbWVwYWdlQ29uZmlnLmZvb3Rlci5hZGRyZXNzIHx8ICdQbG90IDE4LCBSb3lhbCBab25lIFJvYWQsIEZpZnRoIFNldHRsZW1lbnQsIE5ldyBDYWlybywgRWd5cHQnXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgIDxQaG9uZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYnJhbmQtcHJpbWFyeSBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1ncmF5LTMwMFwiPntob21lcGFnZUNvbmZpZy5mb290ZXIucGhvbmUgfHwgXCIrMjAgMTAwIDcwNjIgMTIzXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICA8TWFpbCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYnJhbmQtc2Vjb25kYXJ5IHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LWdyYXktMjA1XCI+e2hvbWVwYWdlQ29uZmlnLmZvb3Rlci5lbWFpbCB8fCBcInNhbGVzQGVsa2hvbHltb3RvcnMuY29tXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEJyYW5kIFdvcmtpbmcgVGltZXMgZGV0YWlscyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IHRleHQtd2hpdGUgdXBwZXJjYXNlIG1iLTYgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8Q2xvY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1icmFuZC1hY2NlbnRcIiAvPiB7bGFuZyA9PT0gJ2FyJyA/ICfYs9in2LnYp9iqINin2YTYudmF2YQg2KfZhNix2LPZhdmK2KknIDogJ0RJR0lUQUwgQ09OQ0lFUkdFJ31cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMgdGV4dC14cyB0ZXh0LWdyYXktNDAwIGJnLXdoaXRlL1swLjAyXSBib3JkZXIgYm9yZGVyLXdoaXRlLzUgcm91bmRlZC14bCBwLTQgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2KPYrdivIC0g2KfZhNiu2YXZitizOicgOiAnU1VOIC0gVEhVOid9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyBcbiAgICAgICAgICAgICAgICAgICAgICA/IChob21lcGFnZUNvbmZpZy5mb290ZXIuaG91cnNTdW5UaHVBciB8fCBob21lcGFnZUNvbmZpZy5mb290ZXIuaG91cnNTdW5UaHUgfHwgXCIxMDowMCBBTSAtIDEwOjAwIFBNXCIpIFxuICAgICAgICAgICAgICAgICAgICAgIDogKGhvbWVwYWdlQ29uZmlnLmZvb3Rlci5ob3Vyc1N1blRodSB8fCBcIjEwOjAwIEFNIC0gMTA6MDAgUE1cIil9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2KzZhdi52Kk6JyA6ICdGUklEQVk6J308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJyYW5kLWFjY2VudFwiPlxuICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyBcbiAgICAgICAgICAgICAgICAgICAgICA/IChob21lcGFnZUNvbmZpZy5mb290ZXIuaG91cnNGcmlBciB8fCBob21lcGFnZUNvbmZpZy5mb290ZXIuaG91cnNGcmkgfHwgXCIwNDowMCBQTSAtIDExOjAwIFBNXCIpIFxuICAgICAgICAgICAgICAgICAgICAgIDogKGhvbWVwYWdlQ29uZmlnLmZvb3Rlci5ob3Vyc0ZyaSB8fCBcIjA0OjAwIFBNIC0gMTE6MDAgUE1cIil9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2LPYqNiqOicgOiAnU0FUVVJEQVk6J308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInIFxuICAgICAgICAgICAgICAgICAgICAgID8gKGhvbWVwYWdlQ29uZmlnLmZvb3Rlci5ob3Vyc1NhdEFyIHx8IGhvbWVwYWdlQ29uZmlnLmZvb3Rlci5ob3Vyc1NhdCB8fCBcIjExOjAwIEFNIC0gMDk6MDAgUE1cIikgXG4gICAgICAgICAgICAgICAgICAgICAgOiAoaG9tZXBhZ2VDb25maWcuZm9vdGVyLmhvdXJzU2F0IHx8IFwiMTE6MDAgQU0gLSAwOTowMCBQTVwiKX1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIGl0YWxpYyBtdC0yIGJvcmRlci10IGJvcmRlci13aGl0ZS81IHB0LTIgZm9udC1zYW5zIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgXG4gICAgICAgICAgICAgICAgICAgID8gJyog2K/YudmFINin2YTYrdis2LIg2LnZhNmJINin2YTZiNin2KrYs9in2Kgg2YrYudmF2YQg2KrZhNmC2KfYptmK2KfZiyDYudmE2Ykg2YXYr9in2LEg2KfZhNiz2KfYudipINi32YjYp9mEINin2YTYo9iz2KjZiNi5LicgXG4gICAgICAgICAgICAgICAgICAgIDogJyogT25saW5lIHN1cHBvcnQgZGVzayBvcGVyYXRlcyAyNC83IG9uIFdoYXRzQXBwLidcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7LyogQ2xvc2luZyBkZXRhaWxzIGFuZCBjb3B5IHJpZ2h0ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlci10IGJvcmRlci13aGl0ZS81IHB0LTggZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1ncmF5LTUwMCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgICZjb3B5OyB7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSB7bGFuZyA9PT0gJ2FyJyA/IGhvbWVwYWdlQ29uZmlnLmhlYWRlci5sb2dvVGV4dEFyIHx8ICfYp9mE2K7ZiNmE2Yog2YXZiNiq2YjYsdiyJyA6IGhvbWVwYWdlQ29uZmlnLmhlYWRlci5sb2dvVGV4dCB8fCAnRUxLSE9MWSBNT1RPUlMnfS4ge1xuICAgICAgICAgICAgICBsYW5nID09PSAnYXInIFxuICAgICAgICAgICAgICAgID8gKGhvbWVwYWdlQ29uZmlnLmZvb3Rlci5jb3B5cmlnaHRBciB8fCAn2KzZhdmK2Lkg2KfZhNit2YLZiNmCINmF2K3ZgdmI2LjYqS4g2YXYtNix2YjYuSDYrNix2KfYrCDYsdmC2YXZiiAyMDI2LicpIFxuICAgICAgICAgICAgICAgIDogKGhvbWVwYWdlQ29uZmlnLmZvb3Rlci5jb3B5cmlnaHQgfHwgJ0FMTCBSSUdIVFMgUkVTRVJWRUQuIFlFQVIgMjAyNiBDWUJFUiBTSE9XUk9PTSBQUk9KRUNULicpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTYgdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtZ3JheS00MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhvdmVyOnRleHQtYnJhbmQtYWNjZW50IHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTIwMCBjdXJzb3ItaGVscCB1cHBlcmNhc2VcIj57bGFuZyA9PT0gJ2FyJyA/ICfYtNix2YjYtyDYp9mE2YLZitin2K/YqSDZhNmE2KrYrNin2LHYqCcgOiAnVEVSTVMgT0YgUklERSd9PC9zcGFuPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogU2Nyb2xsIGJhY2sgdXAgYnV0dG9uICovfVxuICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgb25DbGljaz17c2Nyb2xsVG9Ub3B9IFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgYmctZ3JhZGllbnQtdG8tdHIgZnJvbS1icmFuZC1wcmltYXJ5IHRvLWJyYW5kLWFjY2VudCByb3VuZGVkLWxnIHRleHQtd2hpdGUgaG92ZXI6YnJpZ2h0bmVzcy0xMjUgZm9jdXM6cmluZy0xIGZvY3VzOnJpbmctYnJhbmQtYWNjZW50IGhvdmVyOi10cmFuc2xhdGUteS0xIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHNoYWRvdy1sZyBzaGFkb3ctYnJhbmQtcHJpbWFyeS8xMFwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTY3JvbGwgdG8gdG9wXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPEFycm93VXAgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgIDwvZm9vdGVyPlxuICApO1xufVxuIl0sIm1hcHBpbmdzIjoiQUFvRFUsU0FvS1EsVUFwS1I7QUFwRFY7QUFBQTtBQUFBO0FBQUE7QUFLQSxTQUFnQixnQkFBZ0I7QUFDaEMsU0FBUyxNQUFNLFdBQVcsVUFBVSxlQUFlLFFBQVEsT0FBTyxNQUFNLE9BQU8sU0FBUyxVQUFVLGFBQWEsV0FBVyxlQUFlO0FBQ3pJLFNBQVMsbUJBQW1CO0FBUTVCLHdCQUF3QixjQUFjLEVBQUUsbUJBQW1CLGVBQWUsR0FBZ0I7QUFDeEYsUUFBTSxFQUFFLE1BQU0sS0FBSyxFQUFFLElBQUksWUFBWTtBQUNyQyxRQUFNLENBQUMsYUFBYSxjQUFjLElBQUksU0FBUyxLQUFLO0FBRXBELFFBQU0sY0FBYyxNQUFNO0FBQ3hCLFdBQU8sU0FBUyxFQUFFLEtBQUssR0FBRyxVQUFVLFNBQVMsQ0FBQztBQUFBLEVBQ2hEO0FBRUEsTUFBSSxDQUFDLGdCQUFnQixVQUFVLGVBQWUsT0FBTyxZQUFZLE9BQU87QUFDdEUsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFNBQVMsZUFBZSxPQUFPLGFBQWEsWUFBWTtBQUM5RCxRQUFNLFNBQVMsZUFBZSxPQUFPLGFBQWEsYUFBYTtBQUMvRCxRQUFNLFNBQVMsZUFBZSxPQUFPLGFBQWEsWUFBWTtBQUM5RCxRQUFNLFNBQVMsZUFBZSxPQUFPLGFBQWEsV0FBVztBQUU3RCxRQUFNLFVBQVUsZ0JBQWdCLFFBQVE7QUFDeEMsUUFBTSxXQUFXLFNBQVMsT0FBUSxnQkFBZ0IsUUFBUSxjQUFjLFdBQWEsZ0JBQWdCLFFBQVEsWUFBWTtBQUN6SCxRQUFNLGFBQWEsU0FBUyxPQUFRLGdCQUFnQixRQUFRLFlBQVksV0FBYSxnQkFBZ0IsUUFBUSxVQUFVO0FBQ3ZILFFBQU0sV0FBVyxnQkFBZ0IsUUFBUSxZQUFZO0FBQ3JELFFBQU0sYUFBYSxnQkFBZ0IsUUFBUSxjQUFjO0FBQ3pELFFBQU0sZUFBZSxnQkFBZ0IsUUFBUSxnQkFBZ0I7QUFFN0QsUUFBTSxhQUFhLE1BQU07QUFDdkIsUUFBSSxZQUFZO0FBQ2hCLFFBQUksYUFBYSxRQUFTLGFBQVk7QUFDdEMsUUFBSSxhQUFhLFFBQVMsYUFBWTtBQUV0QyxRQUFJLGNBQWM7QUFDbEIsUUFBSSxlQUFlLE9BQVEsZUFBYztBQUN6QyxRQUFJLGVBQWUsT0FBUSxlQUFjO0FBQ3pDLFFBQUksZUFBZSxTQUFVLGVBQWM7QUFFM0MsUUFBSSxTQUFTO0FBQ1gsYUFDRSx1QkFBQyxTQUFJLFdBQVcsNkJBQTZCLGlCQUFpQixXQUFXLDJCQUEyQixFQUFFLElBQ3BHO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLEtBQUs7QUFBQSxZQUNMLEtBQUk7QUFBQSxZQUNKLFdBQVcsR0FBRyxTQUFTLElBQUksV0FBVztBQUFBLFlBQ3RDLGdCQUFlO0FBQUE7QUFBQSxVQUpqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFLQTtBQUFBLFNBQ0UsZ0JBQWdCLFFBQVEsWUFBWSxnQkFBZ0IsUUFBUSxlQUM1RCx1QkFBQyxTQUFJLFdBQVUsYUFDYixpQ0FBQyxVQUFLLFdBQVUsNERBQ2I7QUFBQTtBQUFBLFVBQVM7QUFBQSxVQUFDLHVCQUFDLFVBQUssV0FBVSxxQkFBcUIsd0JBQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWdEO0FBQUEsYUFEN0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBLEtBSEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUlBO0FBQUEsV0FaSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBY0E7QUFBQSxJQUVKO0FBRUEsV0FDRSx1QkFBQyxTQUFJLFdBQVcsMkJBQTJCLGlCQUFpQixXQUFXLDJCQUEyQixFQUFFLFVBQ2xHO0FBQUEsNkJBQUMsU0FBSSxXQUFVLHVGQUNiLGlDQUFDLFNBQUksV0FBVSwwRUFDYixpQ0FBQyxRQUFLLFdBQVUsNkNBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBMEQsS0FENUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBLEtBSEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUlBO0FBQUEsTUFDQSx1QkFBQyxTQUFJLFdBQVUsYUFBWSxLQUN6QjtBQUFBLCtCQUFDLFVBQUssV0FBVSwyREFDYjtBQUFBO0FBQUEsVUFBUztBQUFBLFVBQUMsdUJBQUMsVUFBSyxXQUFVLHFCQUFxQix3QkFBckM7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBZ0Q7QUFBQSxhQUQ3RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUNBLHVCQUFDLE9BQUUsV0FBVSxnRUFBZ0UsWUFBRSxRQUFRLEtBQXZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBeUY7QUFBQSxXQUozRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBS0E7QUFBQSxTQVhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FZQTtBQUFBLEVBRUo7QUFFQSxTQUNFLHVCQUFDLFlBQU8sSUFBRyxVQUFTLFdBQVUsMkZBQTBGLEtBR3RIO0FBQUEsMkJBQUMsU0FBSSxXQUFVLG1IQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBK0g7QUFBQSxJQUMvSCx1QkFBQyxTQUFJLFdBQVUsbUhBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUErSDtBQUFBLElBRS9ILHVCQUFDLFNBQUksV0FBVSx3REFHWjtBQUFBLHFCQUFlLE9BQU8sZUFDckIsdUJBQUMsU0FBSSxXQUFVLHVFQUNiO0FBQUEsK0JBQUMsVUFBSyxXQUFVLDZEQUE2RCxtQkFBUyxPQUFPLHVDQUF1QyxrQ0FBcEk7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFtSztBQUFBLFFBQ25LO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxTQUFTLE1BQU0sZUFBZSxDQUFDLFdBQVc7QUFBQSxZQUMxQyxXQUFVO0FBQUEsWUFFVDtBQUFBLDRCQUFjLHVCQUFDLGVBQVksV0FBVSxtQ0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBdUQsSUFBSyx1QkFBQyxhQUFVLFdBQVUsc0NBQXJCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXdEO0FBQUEsY0FDbkksdUJBQUMsVUFBTSx3QkFBZSxTQUFTLE9BQU8sa0JBQWtCLGtCQUFvQixTQUFTLE9BQU8sZUFBZSxxQkFBM0c7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBOEg7QUFBQTtBQUFBO0FBQUEsVUFMaEk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBTUE7QUFBQSxXQVJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFTQTtBQUFBLE1BR0QsQ0FBQyxlQUNBLHVCQUFDLFNBQUksV0FBVSwrREFHYjtBQUFBLCtCQUFDLFNBQUksV0FBVSxhQUNaO0FBQUEscUJBQVc7QUFBQSxVQUVaLHVCQUFDLE9BQUUsV0FBVSxtREFDVixtQkFBUyxPQUNOLGVBQWUsT0FBTyxhQUFhLHFKQUNuQyxlQUFlLE9BQU8sV0FBVyxnTEFIdkM7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFLQTtBQUFBLFVBR0EsdUJBQUMsU0FBSSxXQUFVLGdDQUNaO0FBQUEsc0JBQ0M7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxNQUFNO0FBQUEsZ0JBQ04sUUFBTztBQUFBLGdCQUNQLEtBQUk7QUFBQSxnQkFDSixXQUFVO0FBQUEsZ0JBQ1YsY0FBVztBQUFBLGdCQUVYLGlDQUFDLGlCQUFjLFdBQVUsYUFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBbUM7QUFBQTtBQUFBLGNBUHJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVFBO0FBQUEsWUFFRCxVQUNDO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsTUFBTTtBQUFBLGdCQUNOLFFBQU87QUFBQSxnQkFDUCxLQUFJO0FBQUEsZ0JBQ0osV0FBVTtBQUFBLGdCQUNWLGNBQVc7QUFBQSxnQkFFWCxpQ0FBQyxhQUFVLFdBQVUsYUFBckI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBK0I7QUFBQTtBQUFBLGNBUGpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVFBO0FBQUEsWUFFRCxVQUNDO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsTUFBTTtBQUFBLGdCQUNOLFFBQU87QUFBQSxnQkFDUCxLQUFJO0FBQUEsZ0JBQ0osV0FBVTtBQUFBLGdCQUNWLGNBQVc7QUFBQSxnQkFFWCxpQ0FBQyxZQUFTLFdBQVUsYUFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBOEI7QUFBQTtBQUFBLGNBUGhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVFBO0FBQUEsWUFFRCxVQUNDO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsTUFBTTtBQUFBLGdCQUNOLFFBQU87QUFBQSxnQkFDUCxLQUFJO0FBQUEsZ0JBQ0osV0FBVTtBQUFBLGdCQUNWLGNBQVc7QUFBQSxnQkFFWCxpQ0FBQyxXQUFRLFdBQVUsYUFBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBNkI7QUFBQTtBQUFBLGNBUC9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVFBO0FBQUEsWUFHRCxlQUFlLE9BQU8sbUJBQW1CLElBQUksQ0FBQyxZQUFZLFFBQVE7QUFDakUsa0JBQUksQ0FBQyxXQUFXLElBQUssUUFBTztBQUM1QixxQkFDRTtBQUFBLGdCQUFDO0FBQUE7QUFBQSxrQkFFQyxNQUFNLFdBQVc7QUFBQSxrQkFDakIsUUFBTztBQUFBLGtCQUNQLEtBQUk7QUFBQSxrQkFDSixXQUFVO0FBQUEsa0JBQ1YsY0FBWSxXQUFXO0FBQUEsa0JBRXRCLHFCQUFXLFVBQ1Y7QUFBQSxvQkFBQztBQUFBO0FBQUEsc0JBQ0MsS0FBSyxXQUFXO0FBQUEsc0JBQ2hCLEtBQUssV0FBVztBQUFBLHNCQUNoQixXQUFVO0FBQUEsc0JBQ1YsZ0JBQWU7QUFBQTtBQUFBLG9CQUpqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBS0EsSUFFQSx1QkFBQyxVQUFLLFdBQVUsa0ZBQWtGLHFCQUFXLEtBQUssTUFBTSxHQUFHLENBQUMsS0FBNUg7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBOEg7QUFBQTtBQUFBLGdCQWYzSCxXQUFXLE1BQU07QUFBQSxnQkFEeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQWtCQTtBQUFBLFlBRUosQ0FBQztBQUFBLGVBckVIO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBc0VBO0FBQUEsYUFqRkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWtGQTtBQUFBLFFBR0EsdUJBQUMsU0FBSSxXQUFVLGFBQVksS0FDekI7QUFBQSxpQ0FBQyxRQUFHLFdBQVUsdUZBQ1o7QUFBQSxtQ0FBQyxZQUFTLFdBQVUsaURBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQWtFO0FBQUEsWUFBRTtBQUFBLFlBQUUsU0FBUyxPQUFPLGlCQUFpQjtBQUFBLGVBRHpHO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxVQUNBLHVCQUFDLFFBQUcsV0FBVSw2Q0FDWCx5QkFBZSxPQUFPLFlBQVksSUFBSSxDQUFDLE1BQU0sUUFDNUMsdUJBQUMsUUFDQztBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUyxNQUFNO0FBQ2Isc0JBQU0sV0FBVyxLQUFLLElBQUksUUFBUSxLQUFLLEVBQUU7QUFDekMsa0NBQWtCLFFBQVE7QUFBQSxjQUM1QjtBQUFBLGNBQ0EsV0FBVTtBQUFBLGNBRVY7QUFBQSx1Q0FBQyxVQUFLLFdBQVUsb0ZBQW1GLGlCQUFuRztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUF1RztBQUFBLGdCQUFPO0FBQUEsZ0JBQUUsU0FBUyxPQUFPLEtBQUssVUFBVSxLQUFLO0FBQUE7QUFBQTtBQUFBLFlBUHRKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVFBLEtBVE8sS0FBVDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQVVBLENBQ0QsS0FDQyxtQ0FDRTtBQUFBLG1DQUFDLFFBQ0M7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxTQUFTLE1BQU0sa0JBQWtCLE1BQU07QUFBQSxnQkFDdkMsV0FBVTtBQUFBLGdCQUVWO0FBQUEseUNBQUMsVUFBSyxXQUFVLG9GQUFtRixpQkFBbkc7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBdUc7QUFBQSxrQkFBTztBQUFBLGtCQUFFLEVBQUUsTUFBTTtBQUFBO0FBQUE7QUFBQSxjQUoxSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFLQSxLQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBT0E7QUFBQSxZQUNBLHVCQUFDLFFBQ0M7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxTQUFTLE1BQU0sa0JBQWtCLFlBQVk7QUFBQSxnQkFDN0MsV0FBVTtBQUFBLGdCQUVWO0FBQUEseUNBQUMsVUFBSyxXQUFVLG9GQUFtRixpQkFBbkc7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBdUc7QUFBQSxrQkFBTztBQUFBLGtCQUFFLEVBQUUsWUFBWTtBQUFBO0FBQUE7QUFBQSxjQUpoSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFLQSxLQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBT0E7QUFBQSxZQUNBLHVCQUFDLFFBQ0M7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxTQUFTLE1BQU0sa0JBQWtCLFNBQVM7QUFBQSxnQkFDMUMsV0FBVTtBQUFBLGdCQUVWO0FBQUEseUNBQUMsVUFBSyxXQUFVLG9GQUFtRixpQkFBbkc7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBdUc7QUFBQSxrQkFBTztBQUFBLGtCQUFFLEVBQUUsVUFBVTtBQUFBO0FBQUE7QUFBQSxjQUo5SDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFLQSxLQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBT0E7QUFBQSxlQXhCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQXlCQSxLQXZDSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQXlDQTtBQUFBLGFBN0NGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUE4Q0E7QUFBQSxRQUdBLHVCQUFDLFNBQUksV0FBVSxhQUFZLEtBQ3pCO0FBQUEsaUNBQUMsUUFBRyxXQUFVLHVGQUNaO0FBQUEsbUNBQUMsVUFBTyxXQUFVLG1DQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFrRDtBQUFBLFlBQUU7QUFBQSxZQUFFLFNBQVMsT0FBTyxzQkFBc0I7QUFBQSxlQUQ5RjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsVUFDQSx1QkFBQyxRQUFHLFdBQVUsbUNBQ1o7QUFBQSxtQ0FBQyxRQUFHLFdBQVUsMEJBQ1o7QUFBQSxxQ0FBQyxVQUFPLFdBQVUsK0NBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQThEO0FBQUEsY0FDOUQsdUJBQUMsVUFDRSxtQkFBUyxPQUNSLGVBQWUsT0FBTyxhQUFhLDZFQUVuQyxlQUFlLE9BQU8sV0FBVyxrRUFKckM7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFNQTtBQUFBLGlCQVJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBU0E7QUFBQSxZQUNBLHVCQUFDLFFBQUcsV0FBVSwyQkFDWjtBQUFBLHFDQUFDLFNBQU0sV0FBVSx5Q0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBdUQ7QUFBQSxjQUN2RCx1QkFBQyxVQUFLLFdBQVUsMkJBQTJCLHlCQUFlLE9BQU8sU0FBUyxzQkFBMUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBNkY7QUFBQSxpQkFGL0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHQTtBQUFBLFlBQ0EsdUJBQUMsUUFBRyxXQUFVLDJCQUNaO0FBQUEscUNBQUMsUUFBSyxXQUFVLDJDQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUF3RDtBQUFBLGNBQ3hELHVCQUFDLFVBQUssV0FBVSwyQkFBMkIseUJBQWUsT0FBTyxTQUFTLDZCQUExRTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFvRztBQUFBLGlCQUZ0RztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUdBO0FBQUEsZUFsQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFtQkE7QUFBQSxhQXZCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBd0JBO0FBQUEsUUFHQSx1QkFBQyxTQUFJLFdBQVUsYUFBWSxLQUN6QjtBQUFBLGlDQUFDLFFBQUcsV0FBVSx1RkFDWjtBQUFBLG1DQUFDLFNBQU0sV0FBVSxtQ0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBaUQ7QUFBQSxZQUFFO0FBQUEsWUFBRSxTQUFTLE9BQU8sd0JBQXdCO0FBQUEsZUFEL0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLFVBQ0EsdUJBQUMsU0FBSSxXQUFVLGtHQUNiO0FBQUEsbUNBQUMsU0FBSSxXQUFVLGdDQUNiO0FBQUEscUNBQUMsVUFBTSxtQkFBUyxPQUFPLG9CQUFvQixnQkFBM0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBd0Q7QUFBQSxjQUN4RCx1QkFBQyxVQUFLLFdBQVUsY0FDYixtQkFBUyxPQUNMLGVBQWUsT0FBTyxpQkFBaUIsZUFBZSxPQUFPLGVBQWUsd0JBQzVFLGVBQWUsT0FBTyxlQUFlLHlCQUg1QztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUlBO0FBQUEsaUJBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFPQTtBQUFBLFlBQ0EsdUJBQUMsU0FBSSxXQUFVLGdDQUNiO0FBQUEscUNBQUMsVUFBTSxtQkFBUyxPQUFPLFlBQVksYUFBbkM7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBNkM7QUFBQSxjQUM3Qyx1QkFBQyxVQUFLLFdBQVUscUJBQ2IsbUJBQVMsT0FDTCxlQUFlLE9BQU8sY0FBYyxlQUFlLE9BQU8sWUFBWSx3QkFDdEUsZUFBZSxPQUFPLFlBQVkseUJBSHpDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBSUE7QUFBQSxpQkFORjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQU9BO0FBQUEsWUFDQSx1QkFBQyxTQUFJLFdBQVUsZ0NBQ2I7QUFBQSxxQ0FBQyxVQUFNLG1CQUFTLE9BQU8sV0FBVyxlQUFsQztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUE4QztBQUFBLGNBQzlDLHVCQUFDLFVBQUssV0FBVSxjQUNiLG1CQUFTLE9BQ0wsZUFBZSxPQUFPLGNBQWMsZUFBZSxPQUFPLFlBQVksd0JBQ3RFLGVBQWUsT0FBTyxZQUFZLHlCQUh6QztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUlBO0FBQUEsaUJBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFPQTtBQUFBLFlBQ0EsdUJBQUMsT0FBRSxXQUFVLGdHQUNWLG1CQUFTLE9BQ04seUVBQ0Esc0RBSE47QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFLQTtBQUFBLGVBOUJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBK0JBO0FBQUEsYUFuQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQW9DQTtBQUFBLFdBeE1GO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUEwTUE7QUFBQSxNQUlGLHVCQUFDLFNBQUksV0FBVSw2RkFDYjtBQUFBLCtCQUFDLE9BQUUsV0FBVSxzREFBcUQ7QUFBQTtBQUFBLFdBQ3hELG9CQUFJLEtBQUssR0FBRSxZQUFZO0FBQUEsVUFBRTtBQUFBLFVBQUUsU0FBUyxPQUFPLGVBQWUsT0FBTyxjQUFjLGtCQUFrQixlQUFlLE9BQU8sWUFBWTtBQUFBLFVBQWlCO0FBQUEsVUFDMUosU0FBUyxPQUNKLGVBQWUsT0FBTyxlQUFlLDhDQUNyQyxlQUFlLE9BQU8sYUFBYTtBQUFBLGFBSjVDO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFNQTtBQUFBLFFBQ0EsdUJBQUMsU0FBSSxXQUFVLCtEQUNiO0FBQUEsaUNBQUMsVUFBSyxXQUFVLGdGQUFnRixtQkFBUyxPQUFPLHlCQUF5QixtQkFBekk7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBeUo7QUFBQSxVQUd6SjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUztBQUFBLGNBQ1QsV0FBVTtBQUFBLGNBQ1YsY0FBVztBQUFBLGNBRVgsaUNBQUMsV0FBUSxXQUFVLGFBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTZCO0FBQUE7QUFBQSxZQUwvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFNQTtBQUFBLGFBVkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVdBO0FBQUEsV0FuQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQW9CQTtBQUFBLFNBblBGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FxUEE7QUFBQSxPQTNQRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBNFBBO0FBRUo7IiwibmFtZXMiOltdfQ==