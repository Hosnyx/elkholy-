import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d4a02cea"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=d4a02cea"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import { Sparkles, Trash2, CheckCircle2, ChevronRight } from "/node_modules/.vite/deps/lucide-react.js?v=1004c77f";
import { DEFAULT_HOMEPAGE_CONFIG } from "/src/data.ts";
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
export default function HomepagePageBuilder({
  homepageConfig,
  onUpdateHomepageConfig,
  lang,
  dir,
  customText,
  onUpdateCustomText,
  fireToast
}) {
  const [builderConfig, setBuilderConfig] = useState(homepageConfig || DEFAULT_HOMEPAGE_CONFIG);
  const [history, setHistory] = useState([homepageConfig || DEFAULT_HOMEPAGE_CONFIG]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [templates, setTemplates] = useState(() => {
    const loaded = localStorage.getItem("elkholy_templates");
    return loaded ? JSON.parse(loaded) : [];
  });
  const [newTemplateName, setNewTemplateName] = useState("");
  const [activeBuilderTab, setActiveBuilderTab] = useState("header");
  const [fontTarget, setFontTarget] = useState("headings");
  useEffect(() => {
    if (homepageConfig) {
      setBuilderConfig(homepageConfig);
    }
  }, [homepageConfig]);
  const updateBuilderConfig = (newConfig) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(newConfig);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setBuilderConfig(newConfig);
    onUpdateHomepageConfig(newConfig);
  };
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setBuilderConfig(history[prevIndex]);
      onUpdateHomepageConfig(history[prevIndex]);
      fireToast(lang === "ar" ? "تم التراجع عن التعديل من الذاكرة" : "Design undone successfully", "info");
    }
  };
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setBuilderConfig(history[nextIndex]);
      onUpdateHomepageConfig(history[nextIndex]);
      fireToast(lang === "ar" ? "تمت إعادة تطبيق التعديل" : "Design redone successfully", "info");
    }
  };
  const handleSaveTemplate = () => {
    if (!newTemplateName.trim()) {
      fireToast(lang === "ar" ? "يرجى كتابة اسم للقالب أولاً" : "Please type a valid template identity", "error");
      return;
    }
    const updated = [...templates, { name: newTemplateName.trim(), config: builderConfig }];
    setTemplates(updated);
    localStorage.setItem("elkholy_templates", JSON.stringify(updated));
    setNewTemplateName("");
    fireToast(lang === "ar" ? "تم حفظ التموضع الخارجي كقالب مخصص بنجاح!" : "Current styled config saved as active template!", "success");
  };
  const handleApplyTemplate = (config) => {
    updateBuilderConfig(config);
    fireToast(lang === "ar" ? "تم تطبيق القالب وجاري المعاينة الحية فورا!" : "Template applied with live preview rendering!", "success");
  };
  const handleRemoveTemplate = (idx) => {
    const updated = templates.filter((_, i) => i !== idx);
    setTemplates(updated);
    localStorage.setItem("elkholy_templates", JSON.stringify(updated));
    fireToast(lang === "ar" ? "تم حذف القالب المختار" : "Template removed", "info");
  };
  const handleResetToDefault = () => {
    updateBuilderConfig(DEFAULT_HOMEPAGE_CONFIG);
    fireToast(lang === "ar" ? "تمت إعادة تعيين لوحة التصاميم للسمات الافتراضية للمعرض" : "Showroom style layouts reset to default template", "info");
  };
  const handleSaveAll = () => {
    onUpdateHomepageConfig(builderConfig);
    onUpdateCustomText({
      arTitle: builderConfig.header.titleAr,
      enTitle: builderConfig.header.title,
      arSlogan: builderConfig.header.subtitleAr,
      enSlogan: builderConfig.header.subtitle,
      arBadge: builderConfig.header.badgeAr,
      enBadge: builderConfig.header.badge,
      arHeroDesc: builderConfig.header.descriptionAr,
      enHeroDesc: builderConfig.header.description
    });
    fireToast(lang === "ar" ? "تم تثبيت ونشر كافة التعديلات والتصاميم بنجاح!" : "Advanced layout configuration deployed successfully!", "success");
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 animate-fade-in font-mono text-xs", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center justify-between gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-left", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold tracking-widest font-mono uppercase flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-5 h-5 text-brand-primary animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 137,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "منشئ الصفحات المتقدم بمصر" : "EGYPT ELKHOLY HERO PAGE BUILDER" }, void 0, false, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 138,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
          lineNumber: 136,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-450 font-sans tracking-tight mt-0.5 normal-case font-medium", children: lang === "ar" ? "التحكم الهيكلي الفوري بالمظهر، الألوان، الزوايا، الفونتات، الخلفيات والرموز مع تراجع وحفظ القوالب." : "Live drafting panel with 10 font selection, custom HTML embeds, color pickers, and border curves scaling." }, void 0, false, {
          fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
          lineNumber: 140,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
        lineNumber: 135,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "button",
            onClick: handleUndo,
            disabled: historyIndex <= 0,
            className: "px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 disabled:opacity-45 transition-all font-bold cursor-pointer",
            title: "Undo",
            children: lang === "ar" ? "↩ تراجع" : "↩ Undo"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 146,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "button",
            onClick: handleRedo,
            disabled: historyIndex >= history.length - 1,
            className: "px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 disabled:opacity-45 transition-all font-bold cursor-pointer",
            title: "Redo",
            children: lang === "ar" ? "↪ إعادة" : "↪ Redo"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 155,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "button",
            onClick: handleResetToDefault,
            className: "px-3 py-2 bg-red-950/25 border border-red-900/30 text-red-400 rounded-xl hover:bg-red-950/50 transition-all font-bold cursor-pointer",
            children: lang === "ar" ? "⚠️ إعادة تعيين" : "⚠️ Reset"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 164,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
        lineNumber: 145,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
      lineNumber: 134,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-3 flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 border-b lg:border-b-0 lg:border-r border-white/5 pr-0 lg:pr-3 shrink-0", children: [
        { id: "header", labelAr: "نصوص البانر والمقدمة", labelEn: "Landing Hero Header" },
        { id: "theme", labelAr: "لوحة الألوان والتحكم الشامل", labelEn: "Color Palette & Spacing" },
        { id: "font", labelAr: "الخطوط الـ 10 المعاصرة", labelEn: "Font Family Picker" },
        { id: "main", labelAr: "التحكم بأقسام العرض والرموز", labelEn: "Grid Showroom Slots" },
        { id: "footer", labelAr: "الفوتر الاجتماعي والروابط", labelEn: "Collapsible Footer Node" },
        { id: "templates", labelAr: "حقيبة القوالب المخصصة", labelEn: "Template Vault Drawer" }
      ].map((tab) => {
        const isSubActive = activeBuilderTab === tab.id;
        return /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "button",
            onClick: () => setActiveBuilderTab(tab.id),
            className: `w-full text-left px-3.5 py-3 rounded-xl border text-[10px] font-bold transition-all shrink-0 flex items-center justify-between whitespace-nowrap cursor-pointer ${isSubActive ? "bg-brand-primary/20 border-brand-primary text-white shadow-md" : "bg-white/[0.01] border-white/5 hover:border-white/10 text-gray-400 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? tab.labelAr : tab.labelEn }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 198,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-3.5 h-3.5 opacity-40" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 199,
                columnNumber: 17
              }, this)
            ]
          },
          tab.id,
          true,
          {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 188,
            columnNumber: 15
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
        lineNumber: 177,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-9 bg-black/40 border border-white/5 rounded-2xl p-5 text-left space-y-5", children: [
        activeBuilderTab === "header" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 animate-fade-in text-left", children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-[11px] font-black uppercase text-brand-secondary tracking-widest border-b border-white/5 pb-1.5 font-mono", children: lang === "ar" ? "تخصيص نصوص ترحيب الواجهة واللوجو" : "Setup Hero Header and Branding Details" }, void 0, false, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 211,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-450 text-[10px] uppercase font-bold tracking-wider", children: lang === "ar" ? "اسم المعرض بالعربية (نص بديل):" : "Branding Logo Text (Arabic)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 218,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: builderConfig.header.logoTextAr || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    header: { ...builderConfig.header, logoTextAr: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2.5 text-white font-sans text-right focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 219,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 217,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-455 text-[10px] uppercase font-bold tracking-wider", children: lang === "ar" ? "اسم المعرض بالإنجليزية (نص بديل):" : "Branding Logo Text (English)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 230,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: builderConfig.header.logoText || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    header: { ...builderConfig.header, logoText: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 231,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 229,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 216,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/5 pb-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-black text-[#22D3EE] uppercase tracking-wider", children: lang === "ar" ? "🎨 نظام وإدارة لوجو المعرض المطور" : "🎨 Advanced Logo Management System" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 246,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 bg-brand-secondary/10 border border-brand-secondary/25 text-[8px] font-extrabold text-[#A855F7] rounded uppercase", children: "2026 Core Engine" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 249,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 245,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[9px] block uppercase font-bold", children: lang === "ar" ? "معاينة اللوجو الحالي:" : "Live Logo Preview:" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 254,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center p-6 bg-[#0B0F1A]/90 border border-white/[0.08] rounded-xl relative min-h-[90px]", children: [
                builderConfig.header.logoUrl ? /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV(
                    "img",
                    {
                      src: builderConfig.header.logoUrl,
                      alt: "Logo Preview",
                      className: `
                            ${builderConfig.header.logoSize === "small" ? "h-8" : builderConfig.header.logoSize === "large" ? "h-14" : "h-10"}
                            ${builderConfig.header.logoEffect === "glow" ? "shadow-[0_0_15px_rgba(34,211,238,0.55)] border border-[#22D3EE]/30 bg-[#22D3EE]/5 px-2 py-1 rounded-xl" : ""}
                            ${builderConfig.header.logoEffect === "neon" ? "shadow-[0_0_20px_rgba(168,85,247,0.65)] border border-[#A855F7]/40 bg-[#A855F7]/10 px-2 py-1 rounded-xl" : ""}
                            ${builderConfig.header.logoEffect === "shadow" ? "shadow-2xl shadow-black/80 bg-black/50 px-2 py-1 rounded-xl border border-white/5" : ""}
                            object-contain max-w-[200px] transition-all
                          `
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                      lineNumber: 258,
                      columnNumber: 25
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] text-gray-500 font-mono", children: [
                    builderConfig.header.logoSize?.toUpperCase(),
                    " | ",
                    builderConfig.header.logoEffect?.toUpperCase()
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 269,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 257,
                  columnNumber: 23
                }, this) : /* @__PURE__ */ jsxDEV("div", { className: "text-center text-xs text-gray-500 font-mono", children: lang === "ar" ? "لا يوجد ملف لوجو مخصص. سيتم تفعيل الوضع الافتراضي للشبكة البرمجية." : "No custom logo loaded. System default cyber indicator active." }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 274,
                  columnNumber: 23
                }, this),
                builderConfig.header.logoUrl && /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      updateBuilderConfig({
                        ...builderConfig,
                        header: { ...builderConfig.header, logoUrl: "" }
                      });
                      fireToast(lang === "ar" ? "تم حذف اللوجو المخصص!" : "Branded custom Logo removed!", "success");
                    },
                    className: "absolute top-2 right-2 p-1.5 bg-red-950/80 hover:bg-red-900 border border-red-500/10 rounded-xl text-red-400",
                    title: lang === "ar" ? "حذف اللوجو المخصص" : "Delete Custom Logo",
                    children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                      lineNumber: 291,
                      columnNumber: 25
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 279,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 255,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 253,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-500 text-[9px] block uppercase font-bold", children: lang === "ar" ? "رابط ملف اللوجو الجديد:" : "Direct Logo Image Link URL:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 300,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    placeholder: "https://...",
                    value: builderConfig.header.logoUrl || "",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      header: { ...builderConfig.header, logoUrl: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2 py-1.5 text-white focus:outline-none text-xs"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 301,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 299,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-500 text-[9px] block uppercase font-bold", children: lang === "ar" ? "أو رفع ملف لوجو (SVG/PNG/JPG):" : "Or upload logo image file directement:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 313,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    onChange: (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          updateBuilderConfig({
                            ...builderConfig,
                            header: { ...builderConfig.header, logoUrl: reader.result }
                          });
                          fireToast(lang === "ar" ? "تم تعيين اللوجو ورفعه بنجاح!" : "Custom Logo uploaded and set successfully!", "success");
                        };
                        reader.readAsDataURL(file);
                      }
                    },
                    className: "w-full bg-white/5 border border-white/10 rounded-xl p-1 text-gray-400 text-xs file:bg-brand-secondary file:border-none file:text-white file:px-2.5 file:py-1 file:rounded-md file:text-[10px] file:cursor-pointer"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 314,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 312,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 298,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[9px] block uppercase font-bold", children: lang === "ar" ? "تعديل حجم اللوجو:" : "Resize Logo Dimensions:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 341,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "select",
                  {
                    value: builderConfig.header.logoSize || "medium",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      header: { ...builderConfig.header, logoSize: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2 text-white focus:outline-none text-xs",
                    children: [
                      /* @__PURE__ */ jsxDEV("option", { value: "small", children: lang === "ar" ? "صغير (Small - 32px)" : "Small (32px)" }, void 0, false, {
                        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                        lineNumber: 350,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "medium", children: lang === "ar" ? "متوسط (Medium - 40px)" : "Medium (40px)" }, void 0, false, {
                        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                        lineNumber: 351,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "large", children: lang === "ar" ? "كبير (Large - 56px)" : "Large (56px)" }, void 0, false, {
                        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                        lineNumber: 352,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 342,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 340,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[9px] block uppercase font-bold", children: lang === "ar" ? "موضع وموقع اللوجو:" : "Logo Position Layout:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 358,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "select",
                  {
                    value: builderConfig.header.logoPosition || "left",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      header: { ...builderConfig.header, logoPosition: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2 text-white focus:outline-none text-xs",
                    children: [
                      /* @__PURE__ */ jsxDEV("option", { value: "left", children: lang === "ar" ? "على اليسار (الأطراف)" : "Align Left / Start" }, void 0, false, {
                        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                        lineNumber: 367,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "center", children: lang === "ar" ? "في المنتصف (مركز)" : "Center Aligned" }, void 0, false, {
                        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                        lineNumber: 368,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 359,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 357,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[9px] block uppercase font-bold", children: lang === "ar" ? "تأثير الهالة المحيطة باللوجو:" : "Logo Background Effect:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 374,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "select",
                  {
                    value: builderConfig.header.logoEffect || "none",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      header: { ...builderConfig.header, logoEffect: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2 text-white focus:outline-none text-xs",
                    children: [
                      /* @__PURE__ */ jsxDEV("option", { value: "none", children: lang === "ar" ? "بدون تأثير" : "None / Default transparency" }, void 0, false, {
                        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                        lineNumber: 383,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "glow", children: lang === "ar" ? "هالة النيون الفيروزية" : "Cyan Cyber Glow" }, void 0, false, {
                        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                        lineNumber: 384,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "neon", children: lang === "ar" ? "هالة النيون البنفسجية" : "Purple Aurora Glow" }, void 0, false, {
                        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                        lineNumber: 385,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "shadow", children: lang === "ar" ? "ظل عميق عالي التباين" : "Deep Dynamic Shadow" }, void 0, false, {
                        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                        lineNumber: 386,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 375,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 373,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 337,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 244,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-455 text-[10px] uppercase font-bold tracking-wider", children: lang === "ar" ? "العنوان الترحيبي العريض (عربي):" : "Display Main Title (Arabic)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 396,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: builderConfig.header.titleAr || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    header: { ...builderConfig.header, titleAr: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2.5 text-white font-sans text-right focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 397,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 395,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-455 text-[10px] uppercase font-bold tracking-wider", children: lang === "ar" ? "العنوان الترحيبي العريض (إنجليزي):" : "Display Main Title (English)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 408,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: builderConfig.header.title || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    header: { ...builderConfig.header, title: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 409,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 407,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 394,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-455 text-[10px] uppercase font-bold tracking-wider", children: lang === "ar" ? "النص الكلمي الملون المصاحب (عربي):" : "Color Accent Part (Arabic)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 423,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: builderConfig.header.accentAr || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    header: { ...builderConfig.header, accentAr: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2.5 text-white font-sans text-right focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 424,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 422,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-455 text-[10px] uppercase font-bold tracking-wider", children: lang === "ar" ? "النص الكلمي الملون المصاحب (إنجليزي):" : "Color Accent Part (English)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 435,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: builderConfig.header.accent || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    header: { ...builderConfig.header, accent: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 436,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 434,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 421,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-455 text-[10px] uppercase font-bold tracking-wider", children: lang === "ar" ? "الشعار السلوجان الترويجي (عربي):" : "Hero Subtitle Slogan (Arabic)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 451,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: builderConfig.header.subtitleAr || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    header: { ...builderConfig.header, subtitleAr: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2.5 text-white font-sans text-right focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 452,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 450,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-455 text-[10px] uppercase font-bold tracking-wider", children: lang === "ar" ? "الشعار السلوجان الترويجي (إنجليزي):" : "Hero Subtitle Slogan (English)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 463,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: builderConfig.header.subtitle || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    header: { ...builderConfig.header, subtitle: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 464,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 462,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 449,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-455 text-[10px] uppercase font-bold tracking-wider", children: lang === "ar" ? "الشارة الترحيبية العائمة العليا (عربي):" : "Floating Hero Upper Badge (Arabic)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 479,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: builderConfig.header.badgeAr || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    header: { ...builderConfig.header, badgeAr: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2.5 text-white font-sans text-right focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 480,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 478,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-455 text-[10px] uppercase font-bold tracking-wider", children: lang === "ar" ? "الشارة الترحيبية العائمة العليا (إنجليزي):" : "Floating Hero Upper Badge (English)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 491,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: builderConfig.header.badge || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    header: { ...builderConfig.header, badge: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 492,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 490,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 477,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-455 text-[10px] uppercase font-bold tracking-wider", children: lang === "ar" ? "وصف السرد والبيان الفاخر (عربي):" : "Landing Narrative Paragraph (Arabic)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 506,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "textarea",
                {
                  rows: 3,
                  value: builderConfig.header.descriptionAr || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    header: { ...builderConfig.header, descriptionAr: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2.5 text-white font-sans text-right focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 507,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 505,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-455 text-[10px] uppercase font-bold tracking-wider", children: lang === "ar" ? "وصف السرد والبيان الفاخر (إنجليزي):" : "Landing Narrative Paragraph (English)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 518,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "textarea",
                {
                  rows: 3,
                  value: builderConfig.header.description || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    header: { ...builderConfig.header, description: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2.5 text-white font-sans focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 519,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 517,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 504,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 block", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] uppercase tracking-wider font-extrabold text-[#22D3EE]", children: lang === "ar" ? "نظام التحكم الشامل بالصور والخلفيات" : "DYNAMIC IMAGE CONTROL DRAWER" }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 533,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-3", children: [
              builderConfig.header.backgroundImage && /* @__PURE__ */ jsxDEV("div", { className: "relative w-full h-24 rounded-lg overflow-hidden border border-white/10 bg-black/40", children: [
                /* @__PURE__ */ jsxDEV(
                  "img",
                  {
                    src: builderConfig.header.backgroundImage,
                    alt: "Hero background",
                    className: "w-full h-full object-cover",
                    referrerPolicy: "no-referrer"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 538,
                    columnNumber: 23
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/50 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] bg-black/50 border border-brand-primary/20 px-2 py-0.5 rounded text-brand-primary uppercase font-extrabold", children: lang === "ar" ? "معاينة الخلفية الحية النشطة لمعرض الخولي" : "ACTIVE LANDING HERO BANNER IMAGE" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 545,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 544,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    type: "button",
                    onClick: () => updateBuilderConfig({
                      ...builderConfig,
                      header: { ...builderConfig.header, backgroundImage: "" }
                    }),
                    className: "absolute top-2 right-2 p-1.5 bg-red-950/80 hover:bg-red-900 border border-red-500/10 rounded-xl text-red-400",
                    title: "Remove Image",
                    children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                      lineNumber: 558,
                      columnNumber: 25
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 549,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 537,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 items-center", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxDEV("label", { className: "text-gray-500 text-[9px] block uppercase", children: lang === "ar" ? "رابط ملف الصورة المباشر:" : "Load image from external URL Link:" }, void 0, false, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 565,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: "text",
                      placeholder: "https://...",
                      value: builderConfig.header.backgroundImage || "",
                      onChange: (e) => updateBuilderConfig({
                        ...builderConfig,
                        header: { ...builderConfig.header, backgroundImage: e.target.value }
                      }),
                      className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                      lineNumber: 566,
                      columnNumber: 23
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 564,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxDEV("label", { className: "text-gray-500 text-[9px] block uppercase", children: lang === "ar" ? "أو رفع ملف مباشرة من جهازك:" : "Or convert image file to Base64:" }, void 0, false, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 578,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: "file",
                      accept: "image/*",
                      onChange: (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            updateBuilderConfig({
                              ...builderConfig,
                              header: { ...builderConfig.header, backgroundImage: reader.result }
                            });
                            fireToast(lang === "ar" ? "تم تحويل الملف وتعيينه بنجاح!" : "File transformed to Base64 vector!", "success");
                          };
                          reader.readAsDataURL(file);
                        }
                      },
                      className: "w-full bg-white/5 border border-white/10 rounded-xl p-1.5 text-gray-400 file:bg-brand-primary file:border-none file:text-white file:px-2.5 file:py-1 file:rounded-md file:text-[10px] file:cursor-pointer"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                      lineNumber: 579,
                      columnNumber: 23
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 577,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 563,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 535,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 532,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block mt-2", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-brand-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "صندوق الكود المخصص (Safe HTML Injector):" : "Custom HTML Injector Panel (Banners, Promos)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 606,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.5 bg-brand-primary/10 border border-brand-primary/20 text-[7px] font-extrabold text-brand-primary uppercase rounded", children: "Enterprise Node" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 607,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 605,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "textarea",
              {
                rows: 4,
                placeholder: "e.g. <div class='p-5 bg-gradient-to-r from-teal-950/40 text-left rounded-2xl border border-teal-500/20 text-teal-400'><p class='font-bold uppercase'>FLASH DEAL</p><p class='text-[10px] mt-1'>Save up to 12% on Scooter accessories this week.</p></div>",
                value: builderConfig.header.customHtml || "",
                onChange: (e) => updateBuilderConfig({
                  ...builderConfig,
                  header: { ...builderConfig.header, customHtml: e.target.value }
                }),
                className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-3 text-white font-mono leading-relaxed focus:outline-none",
                dir: "ltr"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 609,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 604,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block mt-4", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-green-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5", children: /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "رقم الواتساب لاستلام الفواتير:" : "WhatsApp Number for Invoices:" }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 625,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 624,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                placeholder: "e.g. +201012345678",
                value: builderConfig.invoiceWhatsappNumber || "",
                onChange: (e) => updateBuilderConfig({
                  ...builderConfig,
                  invoiceWhatsappNumber: e.target.value
                }),
                className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-3 text-white font-mono leading-relaxed focus:outline-none",
                dir: "ltr"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 627,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 623,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
          lineNumber: 210,
          columnNumber: 13
        }, this),
        activeBuilderTab === "theme" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 animate-fade-in text-left", children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-[11px] font-black uppercase text-brand-secondary tracking-widest border-b border-white/5 pb-1.5 font-mono", children: lang === "ar" ? "لوحة الألوان والتحكم الشامل للموقع" : "Branding Palette Colors & Scale Controls" }, void 0, false, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 645,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mt-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-455 text-[9px] uppercase tracking-wider block", children: lang === "ar" ? "اللون الترويجي الأساسي:" : "Primary Brand accent:" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 651,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "color",
                    value: builderConfig.theme.primaryColor || "#6366F1",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      theme: { ...builderConfig.theme, primaryColor: e.target.value }
                    }),
                    className: "w-9 h-9 rounded-lg pointer-events-auto cursor-pointer"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 653,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] uppercase", children: builderConfig.theme.primaryColor }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 662,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 652,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 650,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-455 text-[9px] uppercase tracking-wider block", children: lang === "ar" ? "اللون الترويجي الثانوي:" : "Secondary Brand color:" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 667,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "color",
                    value: builderConfig.theme.secondaryColor || "#A855F7",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      theme: { ...builderConfig.theme, secondaryColor: e.target.value }
                    }),
                    className: "w-9 h-9 rounded-lg pointer-events-auto cursor-pointer"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 669,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] uppercase", children: builderConfig.theme.secondaryColor }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 678,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 668,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 666,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-455 text-[9px] uppercase tracking-wider block", children: lang === "ar" ? "لون الهيدر وشارات العرض:" : "Showroom Highlight badge:" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 683,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "color",
                    value: builderConfig.mainContent.iconColor || "#22D3EE",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      mainContent: { ...builderConfig.mainContent, iconColor: e.target.value }
                    }),
                    className: "w-9 h-9 rounded-lg pointer-events-auto cursor-pointer"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 685,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] uppercase", children: builderConfig.mainContent.iconColor }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 694,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 684,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 682,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-455 text-[9px] uppercase tracking-wider block", children: lang === "ar" ? "لون الخلفية الأساسية:" : "Chamber Canvas Bg:" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 699,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "color",
                    value: builderConfig.theme.backgroundColor || "#0B0F1A",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      theme: { ...builderConfig.theme, backgroundColor: e.target.value }
                    }),
                    className: "w-9 h-9 rounded-lg pointer-events-auto cursor-pointer"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 701,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] uppercase", children: builderConfig.theme.backgroundColor }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 710,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 700,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 698,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 649,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 block mt-4 p-4 border border-white/5 rounded-2xl bg-white/[0.01]", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-gray-300 block mb-1", children: lang === "ar" ? "زوايا انحناء الأزرار والبطاقات (Radius profile):" : "Borders and buttons border-radius profiles:" }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 717,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: [
              { id: "rounded-none", label: lang === "ar" ? "حاد راديكالي (Sharp Brutalist)" : "Sharp Bounds (none)" },
              { id: "rounded-md", label: lang === "ar" ? "شبه دائري كلاسيكي (Standard)" : "Semi-Round (md)" },
              { id: "rounded-xl", label: lang === "ar" ? "زاوية مريحة فاخرة (Cyber)" : "Cyber Luxury (xl)" },
              { id: "rounded-3xl", label: lang === "ar" ? "تقوس كبسولة انسيابي (Round)" : "Capsule Profile (3xl)" }
            ].map((r) => {
              const isSel = builderConfig.theme.buttonRadius === r.id;
              return /* @__PURE__ */ jsxDEV(
                "button",
                {
                  type: "button",
                  onClick: () => updateBuilderConfig({
                    ...builderConfig,
                    theme: { ...builderConfig.theme, buttonRadius: r.id }
                  }),
                  className: `px-3 py-1.5 text-[10px] uppercase font-mono tracking-tight border rounded-lg transition-all cursor-pointer ${isSel ? "bg-brand-primary text-white border-brand-primary" : "bg-white/5 border-white/5 hover:border-white/10 text-gray-400"}`,
                  children: r.label
                },
                r.id,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 727,
                  columnNumber: 23
                },
                this
              );
            }) }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 718,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 716,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block mt-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-bold text-[9px] uppercase", children: [
              /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "مقاييس تباعد العناصر والبطاقات (Spacing multiplier):" : "Interactive Spacing Multiplier Scale:" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 748,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent", children: [
                builderConfig.theme.spacingMultiplier || 1,
                "x"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 749,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 747,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "range",
                min: "0.5",
                max: "1.5",
                step: "0.25",
                value: builderConfig.theme.spacingMultiplier || 1,
                onChange: (e) => updateBuilderConfig({
                  ...builderConfig,
                  theme: { ...builderConfig.theme, spacingMultiplier: parseFloat(e.target.value) }
                }),
                className: "w-full accent-brand-accent cursor-pointer"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 751,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[8px] text-gray-500 font-mono", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "Compact spacing (0.5x)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 764,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Standard size (1.0x)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 765,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Spacious layout (1.5x)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 766,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 763,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 746,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
          lineNumber: 644,
          columnNumber: 13
        }, this),
        activeBuilderTab === "font" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 animate-fade-in text-left", children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-[11px] font-black uppercase text-brand-secondary tracking-widest border-b border-white/5 pb-1.5 font-mono", children: lang === "ar" ? "متحكم خطوط وتيبوغرافيات الموقع المفصلة" : "Detailed Multi-Font Typography Controllers" }, void 0, false, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 775,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-550 font-sans mt-0.5 leading-normal", children: lang === "ar" ? "اختر تخصيص خط منفصل لكل جزء من أجزاء الموقع (العناوين الكبيرة، العناوين الفرعية، نصوص الوصف والفقرات)." : "Customize separate fonts for headings, small labels/buttons, and main body description paragraphs." }, void 0, false, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 778,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-1 bg-[#111827]/85 p-1 rounded-xl border border-white/5 mt-3", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setFontTarget("headings"),
                className: `py-2 px-1 text-[10px] font-black tracking-wider uppercase rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center text-center leading-none ${fontTarget === "headings" ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20 font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-extrabold", children: lang === "ar" ? "العناوين الرئيسية" : "Headings" }, void 0, false, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 795,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[7.5px] opacity-75 font-mono mt-1 text-center truncate max-w-[100px]", dir: "ltr", children: builderConfig.fontHeadings || builderConfig.font || "Space Grotesk" }, void 0, false, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 796,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 786,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setFontTarget("subheadings"),
                className: `py-2 px-1 text-[10px] font-black tracking-wider uppercase rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center text-center leading-none ${fontTarget === "subheadings" ? "bg-brand-secondary text-white shadow-md shadow-brand-secondary/20 font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-extrabold", children: lang === "ar" ? "العناوين الفرعية" : "Subheadings" }, void 0, false, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 810,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[7.5px] opacity-75 font-mono mt-1 text-center truncate max-w-[100px]", dir: "ltr", children: builderConfig.fontSubheadings || builderConfig.font || "Cairo" }, void 0, false, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 811,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 801,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setFontTarget("body"),
                className: `py-2 px-1 text-[10px] font-black tracking-wider uppercase rounded-lg transition-all cursor-pointer flex flex-col items-center justify-center text-center leading-none ${fontTarget === "body" ? "bg-[#22D3EE] text-black shadow-md shadow-[#22D3EE]/20 font-extrabold" : "text-gray-400 hover:text-white hover:bg-white/5"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-extrabold", children: lang === "ar" ? "النصوص والوصف" : "Body Text" }, void 0, false, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 825,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[7.5px] opacity-75 font-mono mt-1 text-center truncate max-w-[100px]", dir: "ltr", children: builderConfig.fontBody || builderConfig.font || "Inter" }, void 0, false, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 826,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 816,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 785,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-white/[0.01] border border-white/5 rounded-xl p-2.5 text-center text-[10px] text-gray-400 font-sans mt-2", children: [
            fontTarget === "headings" && /* @__PURE__ */ jsxDEV("span", { children: [
              "👉 ",
              lang === "ar" ? "تعديل خط العناوين الرئيسية الكبيرة (مثل اسم المعرض في الهيدر، وعناوين الفئات والأقسام)." : "Configuring main hero labels, large module section titles, and header text."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 835,
              columnNumber: 19
            }, this),
            fontTarget === "subheadings" && /* @__PURE__ */ jsxDEV("span", { children: [
              "👉 ",
              lang === "ar" ? "تعديل خط العناوين الفرعية، الأزرار، الشارات، وأقسام التصفية واللوجو الفرعي للمترو." : "Configuring categories slots, primary filter pills, badges, and action buttons."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 842,
              columnNumber: 19
            }, this),
            fontTarget === "body" && /* @__PURE__ */ jsxDEV("span", { children: [
              "👉 ",
              lang === "ar" ? "تعديل خط النصوص العادية، فقرات الوصف داخل الكروت، التفاصيل التقنية، وفوتر المعرض." : "Configuring standard paragraph specifications, item details, catalogs context, and footer info."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 849,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 833,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 mt-3", children: [
            { name: "Inter", desc: lang === "ar" ? "الخط السويسري الأنيق والقابل للقراءة العالية" : "Sleek, Swiss highly legible technology display" },
            { name: "Poppins", desc: lang === "ar" ? "هندسي حديث ملائم لواجهات المستقبل" : "Modern energetic geometric sans-serif standard" },
            { name: "Montserrat", desc: lang === "ar" ? "عريض وجريء، مخصص للعناوين اللافتة" : "Architecturally bold structural display" },
            { name: "Cairo", desc: lang === "ar" ? "الخط العربي المعاصر الأكثر شعبية وقوة" : "High contrast standard for contemporary Arabic" },
            { name: "Tajawal", desc: lang === "ar" ? "خط عربي نحيف وأنيق ذو طابع تحريري متميز" : "Elegant slim high-contrast editorial arabic" },
            { name: "IBM Plex Sans", desc: lang === "ar" ? "خط كود تقني احترافي عالي الدقة" : "Engineering-inspired professional system font" },
            { name: "Open Sans", desc: lang === "ar" ? "تصميم كلاسيكي نظيف ومريح للعين" : "Highly balanced neutral consumer layout" },
            { name: "Lato", desc: lang === "ar" ? "خط تكنولوجي ملائم للنصوص الفرعية والفقرات" : "Warm structural display typography standard" },
            { name: "Nunito", desc: lang === "ar" ? "خط مستدير يعطي حيوية وتفاعلية للموقع" : "Curved friendly consumer interactive font" },
            { name: "Space Grotesk", desc: lang === "ar" ? "خط مستقبلي بلمسة من تصميم Brutalist الهندسي للموتوسيكلات" : "Futuristic modern brutalist tech display" }
          ].map((f) => {
            const isSel = (fontTarget === "headings" ? builderConfig.fontHeadings || builderConfig.font || "Space Grotesk" : fontTarget === "subheadings" ? builderConfig.fontSubheadings || builderConfig.font || "Cairo" : builderConfig.fontBody || builderConfig.font || "Inter") === f.name;
            return /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => {
                  if (fontTarget === "headings") {
                    updateBuilderConfig({ ...builderConfig, fontHeadings: f.name });
                  } else if (fontTarget === "subheadings") {
                    updateBuilderConfig({ ...builderConfig, fontSubheadings: f.name });
                  } else {
                    updateBuilderConfig({ ...builderConfig, fontBody: f.name });
                  }
                  fireToast(
                    lang === "ar" ? `تم تغيير خط ${fontTarget === "headings" ? "العناوين الرئيسية" : fontTarget === "subheadings" ? "العناوين الفرعية" : "النصوص والوصف"} إلى: ${f.name}` : `Updated ${fontTarget} typography layout to: ${f.name}`,
                    "success"
                  );
                },
                className: `p-3 border rounded-xl transition-all cursor-pointer flex flex-col text-left ${isSel ? fontTarget === "headings" ? "bg-brand-primary/20 border-brand-primary text-white shadow-md" : fontTarget === "subheadings" ? "bg-brand-secondary/20 border-brand-secondary text-white shadow-md" : "bg-[#22D3EE]/20 border-[#22D3EE] text-white shadow-md" : "bg-white/[0.02] border-white/5 hover:border-white/10 text-gray-400 hover:text-white"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("span", { className: `font-bold text-xs font-preview-${f.name.replace(/\s+/g, "")}`, style: { fontFamily: fontToCssMap[f.name] || `"${f.name}", sans-serif` }, children: f.name }, void 0, false, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 905,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: `text-[9px] text-gray-550 mt-0.5 leading-tight font-preview-${f.name.replace(/\s+/g, "")}`, style: { fontFamily: fontToCssMap[f.name] || `"${f.name}", sans-serif` }, children: f.desc }, void 0, false, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 906,
                    columnNumber: 23
                  }, this)
                ]
              },
              f.name,
              true,
              {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 877,
                columnNumber: 21
              },
              this
            );
          }) }, void 0, false, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 858,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl border border-white/5 bg-[#111827]/40 block text-left space-y-2 mt-4", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] font-bold text-gray-500 uppercase tracking-widest block", children: lang === "ar" ? "معاينة خطوط الواجهة الحالية بالفهرس:" : "ACTIVE TYPOGRAPHY MIX MATRIX:" }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 914,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: `text-sm font-black text-white font-preview-${(builderConfig.fontHeadings || builderConfig.font || "Space Grotesk").replace(/\s+/g, "")}`, style: { fontFamily: fontToCssMap[builderConfig.fontHeadings || builderConfig.font || "Space Grotesk"] || `"${builderConfig.fontHeadings || builderConfig.font || "Space Grotesk"}", sans-serif` }, children: lang === "ar" ? "الخولي موتورز - معرض المستقبل بمصر" : "ELKHOLY MOTORS - FUTURE SHOWROOM" }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 917,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: `text-[11px] font-extrabold text-[#22D3EE] font-preview-${(builderConfig.fontSubheadings || builderConfig.font || "Cairo").replace(/\s+/g, "")}`, style: { fontFamily: fontToCssMap[builderConfig.fontSubheadings || builderConfig.font || "Cairo"] || `"${builderConfig.fontSubheadings || builderConfig.font || "Cairo"}", sans-serif` }, children: [
              "⚡ ",
              lang === "ar" ? "أقوى الموتوسيكلات والاسكوترز الذكية" : "SUPREME PERFORMANCE ELECTRIC & GAS SUPERBIKES"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 922,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: `text-[10px] text-gray-400 leading-normal mt-2 font-preview-${(builderConfig.fontBody || builderConfig.font || "Inter").replace(/\s+/g, "")}`, style: { fontFamily: fontToCssMap[builderConfig.fontBody || builderConfig.font || "Inter"] || `"${builderConfig.fontBody || builderConfig.font || "Inter"}", sans-serif` }, children: lang === "ar" ? "هذا النص يعبر عن الوصف الدقيق وكافة كروت الموتوسيكلات وساعات العمل وملاحظات العروض الحصرية الحالية." : "This is a sample layout description showing user details inside motorcycle specs cards and general catalog features." }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 927,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 913,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
          lineNumber: 774,
          columnNumber: 13
        }, this),
        activeBuilderTab === "main" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 animate-fade-in text-left", children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-[11px] font-black uppercase text-brand-secondary tracking-widest border-b border-white/5 pb-1.5 font-mono", children: lang === "ar" ? "التحكم الهيكلي وحجرات صالة العرض والمبيعات" : "Enable/Disable Visual Grid Elements" }, void 0, false, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 940,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir: "ltr", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-bold text-white uppercase", children: lang === "ar" ? "مربع فئات الموتوسيكلات والسكوترز (A / B / C / S):" : "Bento Categories filtering Slot:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 947,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-500 mt-0.5", children: lang === "ar" ? "إظهار شريط الفئات لتصفية الموتوسيكلات المتاحة." : "Toggle category filter grid tags." }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 948,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 946,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: builderConfig.mainContent.showCategories,
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    mainContent: { ...builderConfig.mainContent, showCategories: e.target.checked }
                  }),
                  className: "w-5 h-5 accent-brand-accent cursor-pointer"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 950,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 945,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-t border-white/5 pt-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir: "ltr", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-bold text-white uppercase", children: lang === "ar" ? "قسم المركبة الرائدة المميزة (Flagship Center Stage):" : "Flagship Display Center block:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 963,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-500 mt-0.5", children: lang === "ar" ? "إظهار لوح عرض الدراجة الرائدة الضخم في صالة العرض." : "Large bento container highlighting first flagship." }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 964,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 962,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: builderConfig.mainContent.showFeatured,
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    mainContent: { ...builderConfig.mainContent, showFeatured: e.target.checked }
                  }),
                  className: "w-5 h-5 accent-brand-accent cursor-pointer"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 966,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 961,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-t border-white/5 pt-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir: "ltr", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-bold text-white uppercase", children: lang === "ar" ? "شارات ومصلقات الخصم والعروض (Hot Deals Stickers):" : "Enable promotions and original price stickers:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 979,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-500 mt-0.5", children: lang === "ar" ? "شارات تدل بشكل فوري على توفير الموتوسيكلات." : "Toggle percentages label sticker tags." }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 980,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 978,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: builderConfig.mainContent.showOffers,
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    mainContent: { ...builderConfig.mainContent, showOffers: e.target.checked }
                  }),
                  className: "w-5 h-5 accent-brand-accent cursor-pointer"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 982,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 977,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 944,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-440 text-[9px] uppercase", children: lang === "ar" ? "عنوان صالة العرض بالعربية:" : "Showroom section header (Arabic)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 997,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: builderConfig.mainContent.titleAr || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    mainContent: { ...builderConfig.mainContent, titleAr: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/85 border border-white/10 rounded-xl p-2.5 text-white font-sans text-right focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 998,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 996,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-445 text-[9px] uppercase", children: lang === "ar" ? "عنوان صالة العرض بالإنجليزية:" : "Showroom section header (English)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1009,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: builderConfig.mainContent.title || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    mainContent: { ...builderConfig.mainContent, title: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/85 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1010,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1008,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 995,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
          lineNumber: 939,
          columnNumber: 13
        }, this),
        activeBuilderTab === "footer" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 animate-fade-in text-left", children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-[11px] font-black uppercase text-brand-secondary tracking-widest border-b border-white/5 pb-1.5 font-mono", children: lang === "ar" ? "التحكم بالفوتر والقنوات الإرشادية وسوشيال ميديا" : "Footer Collapsing & Channels options" }, void 0, false, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 1027,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir: "ltr", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-bold text-white uppercase", children: lang === "ar" ? "إظهار وإخفاء الفوتر العام بالكامل:" : "Global Footer Visibility Toggle:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1034,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-500 mt-0.5", children: lang === "ar" ? "بلمسة واحدة يمكنك حجب أو تفعيل الفوتر بمصر." : "Toggle whether footer sections display at all." }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1035,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1033,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: builderConfig.footer.visible,
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    footer: { ...builderConfig.footer, visible: e.target.checked }
                  }),
                  className: "w-5 h-5 accent-brand-accent cursor-pointer"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1037,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1032,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-t border-white/5 pt-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir: "ltr", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-bold text-white uppercase", children: lang === "ar" ? "دعم الفوتر القابل للفتح والطي (Collapsible):" : "Enable Drawer Collapsing behaviors:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1050,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-500 mt-0.5", children: lang === "ar" ? "يمنح العمل زر لطي الفوتر لتقليل الملاحات." : "Provide expand/collapse buttons for compact presentation." }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1051,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1049,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: builderConfig.footer.collapsible,
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    footer: { ...builderConfig.footer, collapsible: e.target.checked }
                  }),
                  className: "w-5 h-5 accent-brand-accent cursor-pointer"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1053,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1048,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 1031,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-right", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-445 text-[10px] uppercase block", children: lang === "ar" ? "الوصف الداخلي بالفوتر (عربي):" : "Footer Manifesto descriptive text (Arabic)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1068,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "textarea",
                {
                  rows: 2,
                  value: builderConfig.footer.contentAr || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    footer: { ...builderConfig.footer, contentAr: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2 text-white font-sans text-right focus:outline-none animate-fade-in"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1069,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1067,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "text-gray-445 text-[10px] uppercase block", children: lang === "ar" ? "الوصف الداخلي بالفوتر (إنجليزي):" : "Footer Manifesto descriptive text (English)" }, void 0, false, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1080,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "textarea",
                {
                  rows: 2,
                  value: builderConfig.footer.content || "",
                  onChange: (e) => updateBuilderConfig({
                    ...builderConfig,
                    footer: { ...builderConfig.footer, content: e.target.value }
                  }),
                  className: "w-full bg-[#111827]/80 border border-white/10 rounded-xl p-2 text-white font-sans focus:outline-none animate-fade-in"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1081,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1079,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 1066,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 block", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-black uppercase text-brand-primary tracking-widest block", children: lang === "ar" ? "تخصيص قنوات التواصل وسوشيال المعرض بمصر:" : "Customize Active Social Media Target Links:" }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1095,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-left", children: [
              { platform: "facebook", label: "Facebook" },
              { platform: "instagram", label: "Instagram" },
              { platform: "whatsapp", label: "WhatsApp" },
              { platform: "youtube", label: "YouTube" }
            ].map((social) => /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-[#A855F7] font-bold uppercase", children: [
                social.label,
                " Link URL:"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1104,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: builderConfig.footer.socialLinks?.[social.platform] || "",
                  onChange: (e) => {
                    updateBuilderConfig({
                      ...builderConfig,
                      footer: {
                        ...builderConfig.footer,
                        socialLinks: {
                          ...builderConfig.footer.socialLinks,
                          [social.platform]: e.target.value
                        }
                      }
                    });
                  },
                  className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2 py-1.5 text-white focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1105,
                  columnNumber: 23
                },
                this
              )
            ] }, social.platform, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1103,
              columnNumber: 21
            }, this)) }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1096,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 1094,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 pt-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-black uppercase text-brand-secondary tracking-widest block", children: lang === "ar" ? "بيانات مقر المعرض ومعلومات التواصل بالكامل (Contact details):" : "HEADQUARTERS LOCATION & CONTACT TELEMETRY:" }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1129,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-left", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] uppercase block", children: lang === "ar" ? "العنوان بمصر (عربي):" : "Egyptian Address (Arabic)" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1134,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    value: builderConfig.footer.addressAr || "",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      footer: { ...builderConfig.footer, addressAr: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2 py-1.5 text-white font-sans text-right focus:outline-none"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1135,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1133,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] uppercase block", children: lang === "ar" ? "العنوان (إنجليزي):" : "Headquarters Address (English)" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1146,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    value: builderConfig.footer.address || "",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      footer: { ...builderConfig.footer, address: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2 py-1.5 text-white font-sans focus:outline-none"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1147,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1145,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] uppercase block", children: lang === "ar" ? "رقم الهاتف:" : "Contact Phone Number:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1160,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    value: builderConfig.footer.phone || "",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      footer: { ...builderConfig.footer, phone: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2 py-1.5 text-white font-mono focus:outline-none"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1161,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1159,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] uppercase block", children: lang === "ar" ? "البريد الإلكتروني:" : "Contact E-mail Address:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1172,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    value: builderConfig.footer.email || "",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      footer: { ...builderConfig.footer, email: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2 py-1.5 text-white font-mono focus:outline-none"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1173,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1171,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] uppercase block", children: lang === "ar" ? "ساعات العمل الأحد - الخميس:" : "Working Hours Sun-Thu:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1186,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    placeholder: "e.g. 10:00 AM - 10:00 PM",
                    value: builderConfig.footer.hoursSunThu || "",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      footer: { ...builderConfig.footer, hoursSunThu: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2 py-1.5 text-white focus:outline-none"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1187,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1185,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] uppercase block", children: lang === "ar" ? "ساعات العمل الأحد - الخميس (عربي اختيارى):" : "Working Hours Sun-Thu (Arabic optional):" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1199,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    placeholder: "مثال: 10:00 ص - 10:00 م",
                    value: builderConfig.footer.hoursSunThuAr || "",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      footer: { ...builderConfig.footer, hoursSunThuAr: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2 py-1.5 text-white text-right focus:outline-none animate-fade-in"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1200,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1198,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] uppercase block", children: lang === "ar" ? "ساعات العمل الجمعة:" : "Working Hours Friday:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1214,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    placeholder: "e.g. 04:00 PM - 11:00 PM",
                    value: builderConfig.footer.hoursFri || "",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      footer: { ...builderConfig.footer, hoursFri: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2 py-1.5 text-white focus:outline-none"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1215,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1213,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] uppercase block", children: lang === "ar" ? "ساعات العمل الجمعة (عربي اختيارى):" : "Working Hours Friday (Arabic optional):" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1227,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    placeholder: "مثال: 04:00 م - 11:00 م",
                    value: builderConfig.footer.hoursFriAr || "",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      footer: { ...builderConfig.footer, hoursFriAr: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2 py-1.5 text-white text-right focus:outline-none"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1228,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1226,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] uppercase block", children: lang === "ar" ? "ساعات العمل السبت:" : "Working Hours Saturday:" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1242,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    placeholder: "e.g. 11:00 AM - 09:00 PM",
                    value: builderConfig.footer.hoursSat || "",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      footer: { ...builderConfig.footer, hoursSat: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2 py-1.5 text-white focus:outline-none"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1243,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1241,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] uppercase block", children: lang === "ar" ? "ساعات العمل السبت (عربي اختيارى):" : "Working Hours Saturday (Arabic optional):" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1255,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    placeholder: "مثال: 11:00 ص - 09:00 م",
                    value: builderConfig.footer.hoursSatAr || "",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      footer: { ...builderConfig.footer, hoursSatAr: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2 py-1.5 text-white text-right focus:outline-none"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1256,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1254,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] uppercase block", children: lang === "ar" ? "حقوق النشر والملكيات (عربي):" : "Copyright message (Arabic)" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1270,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    value: builderConfig.footer.copyrightAr || "",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      footer: { ...builderConfig.footer, copyrightAr: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2 py-1.5 text-white text-right focus:outline-none"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1271,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1269,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] uppercase block", children: lang === "ar" ? "حقوق النشر والملكيات (إنجليزي):" : "Copyright message (English)" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1282,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    value: builderConfig.footer.copyright || "",
                    onChange: (e) => updateBuilderConfig({
                      ...builderConfig,
                      footer: { ...builderConfig.footer, copyright: e.target.value }
                    }),
                    className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2 py-1.5 text-white focus:outline-none"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1283,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1281,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1130,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 1128,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2.5 pt-3 border-t border-white/[0.05]", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-left", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "block", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-black uppercase text-[#22D3EE] tracking-widest block", children: lang === "ar" ? "قنوات تواصل إضافية مخصصة (تيك توك، إلخ):" : "ADDITIONAL SOCIAL TARGET NETWORKS (TIKTOK, ETC.):" }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1301,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[8px] text-gray-500 mt-0.5", children: lang === "ar" ? "يمكنك رفع أيقونات مخصصة لكل منصة وحفظ رابطها." : "Provide custom logos and profile URLs for secondary accounts." }, void 0, false, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1302,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1300,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    const newList = [...builderConfig.footer.customSocialLinks || []];
                    newList.push({
                      id: "custom-" + Date.now(),
                      name: "TikTok",
                      url: "",
                      iconUrl: ""
                    });
                    updateBuilderConfig({
                      ...builderConfig,
                      footer: {
                        ...builderConfig.footer,
                        customSocialLinks: newList
                      }
                    });
                    fireToast(lang === "ar" ? "تمت إضافة تواصل مخصص جديد!" : "Added alternative social link placeholder!", "success");
                  },
                  className: "px-3 py-1.5 text-[9px] font-black tracking-wider bg-brand-primary hover:brightness-110 text-white uppercase rounded-lg transition-all cursor-pointer",
                  children: [
                    "+ ",
                    lang === "ar" ? "إضافة وسيلة مخصصة" : "ADD DYNAMIC LINK"
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1304,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1299,
              columnNumber: 17
            }, this),
            !builderConfig.footer.customSocialLinks || builderConfig.footer.customSocialLinks.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-center p-5 bg-white/[0.01] border border-white/5 border-dashed rounded-2xl block", children: /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-505", children: lang === "ar" ? "اضغط على زر الإضافة لتشغيل قنوات أخرى مخصصة (مثل تيك توك) بمصر." : "No additional links defined. Boost client navigation by establishing TikTok pages." }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1331,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1330,
              columnNumber: 19
            }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: builderConfig.footer.customSocialLinks.map((custom, idx) => /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-[#0B0F19]/40 border border-white/5 rounded-2xl space-y-3 relative text-left", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    const filtered = builderConfig.footer.customSocialLinks?.filter((_, i) => i !== idx) || [];
                    updateBuilderConfig({
                      ...builderConfig,
                      footer: {
                        ...builderConfig.footer,
                        customSocialLinks: filtered
                      }
                    });
                    fireToast(lang === "ar" ? "تم مسح وسيلة التواصل" : "Removed custom channel", "info");
                  },
                  className: "absolute top-4 right-4 text-gray-400 hover:text-red-505 cursor-pointer p-1",
                  title: lang === "ar" ? "حذف" : "Delete",
                  children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1353,
                    columnNumber: 27
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1337,
                  columnNumber: 25
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 text-left", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-gray-400 font-bold uppercase", children: lang === "ar" ? "اسم المنصة (كـ تيك توك):" : "Platform Identity:" }, void 0, false, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1358,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: "text",
                      value: custom.name,
                      onChange: (e) => {
                        const list = [...builderConfig.footer.customSocialLinks || []];
                        list[idx] = { ...list[idx], name: e.target.value };
                        updateBuilderConfig({
                          ...builderConfig,
                          footer: { ...builderConfig.footer, customSocialLinks: list }
                        });
                      },
                      className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2.5 py-1.5 text-white text-xs focus:outline-none"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                      lineNumber: 1359,
                      columnNumber: 29
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1357,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-[#A855F7] font-bold uppercase", children: lang === "ar" ? "رابط الصفحة الشخصية URL:" : "Platform Destination Web URL:" }, void 0, false, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1375,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: "text",
                      placeholder: "https://tiktok.com/@...",
                      value: custom.url,
                      onChange: (e) => {
                        const list = [...builderConfig.footer.customSocialLinks || []];
                        list[idx] = { ...list[idx], url: e.target.value };
                        updateBuilderConfig({
                          ...builderConfig,
                          footer: { ...builderConfig.footer, customSocialLinks: list }
                        });
                      },
                      className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2.5 py-1.5 text-white text-xs focus:outline-none font-mono"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                      lineNumber: 1376,
                      columnNumber: 29
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1374,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1356,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 text-left border-t border-white/5 pt-3", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-gray-400 font-bold uppercase", children: lang === "ar" ? "أو رابط مباشر للأيقونة (URL):" : "Platform Icon Image Link URL:" }, void 0, false, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1396,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: "text",
                      placeholder: "https://icon-cloud.com/tiktok.png",
                      value: custom.iconUrl || "",
                      onChange: (e) => {
                        const list = [...builderConfig.footer.customSocialLinks || []];
                        list[idx] = { ...list[idx], iconUrl: e.target.value };
                        updateBuilderConfig({
                          ...builderConfig,
                          footer: { ...builderConfig.footer, customSocialLinks: list }
                        });
                      },
                      className: "w-full bg-[#111827]/60 border border-white/10 rounded-xl px-2.5 py-1.5 text-white text-xs focus:outline-none font-mono"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                      lineNumber: 1397,
                      columnNumber: 29
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1395,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 block text-left", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-[#22D3EE] font-bold uppercase", children: lang === "ar" ? "رفع ملف أيقونة شعار المنصة من جهازك:" : "Or Upload Device Logo (PNG/SVG):" }, void 0, false, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1414,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                    custom.iconUrl && /* @__PURE__ */ jsxDEV("img", { src: custom.iconUrl, alt: "custom icon logo", className: "w-8 h-8 object-contain bg-white/5 border border-white/10 rounded-lg p-1", referrerPolicy: "no-referrer" }, void 0, false, {
                      fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                      lineNumber: 1417,
                      columnNumber: 33
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "input",
                      {
                        type: "file",
                        accept: "image/*",
                        onChange: (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const list = [...builderConfig.footer.customSocialLinks || []];
                              list[idx] = { ...list[idx], iconUrl: reader.result };
                              updateBuilderConfig({
                                ...builderConfig,
                                footer: { ...builderConfig.footer, customSocialLinks: list }
                              });
                              fireToast(lang === "ar" ? "تم رفع أيقونة المنصة بنجاح!" : "Platform logo uploaded successfully", "success");
                            };
                            reader.readAsDataURL(file);
                          }
                        },
                        className: "flex-1 bg-white/5 border border-white/10 rounded-xl p-1 text-gray-400 text-xs file:bg-brand-secondary file:border-none file:text-white file:px-2.5 file:py-0.5 file:rounded-md file:text-[9px] file:cursor-pointer"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                        lineNumber: 1419,
                        columnNumber: 31
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1415,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1413,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1394,
                columnNumber: 25
              }, this)
            ] }, custom.id || idx, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1336,
              columnNumber: 23
            }, this)) }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1334,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 1298,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
          lineNumber: 1026,
          columnNumber: 13
        }, this),
        activeBuilderTab === "templates" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 animate-fade-in text-left", children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-[11px] font-black uppercase text-brand-secondary tracking-widest border-b border-white/5 pb-1.5 font-mono", children: lang === "ar" ? "حقيبة القوالب والنسخ وتصميم السمات" : "Templates Vault and Visual Presets Archiver" }, void 0, false, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 1455,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-white/[0.01] border border-white/5 rounded-2xl block text-left", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-gray-400 font-bold text-[10px] uppercase block mb-1.5", children: lang === "ar" ? "حفظ تصميمك ومسافات ألوان الموقع الحالي في سجل القوالب:" : "Save current design config palette as visual template preset:" }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1460,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  placeholder: lang === "ar" ? "اكتب اسم مميز (مثال: الشتاء الأخاذ، كربون، رمضان الأكحل)" : "e.g. Carbon Edition, Summer Sunset",
                  value: newTemplateName,
                  onChange: (e) => setNewTemplateName(e.target.value),
                  className: "flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1462,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  type: "button",
                  onClick: handleSaveTemplate,
                  className: "px-4 py-2 bg-brand-primary hover:brightness-110 text-white font-extrabold rounded-xl transition-all cursor-pointer",
                  children: lang === "ar" ? "💾 حفظ كقالب" : "💾 Save Template"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                  lineNumber: 1469,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1461,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 1459,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 block", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-gray-300 block", children: lang === "ar" ? "قوالبك الإبداعية المحفوظة بالكامل:" : "Your Creative Saved Presets:" }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1480,
              columnNumber: 17
            }, this),
            templates.length === 0 ? /* @__PURE__ */ jsxDEV("p", { className: "p-8 text-center text-gray-650 bg-white/[0.01] border border-white/5 border-dashed rounded-xl font-mono leading-normal", children: lang === "ar" ? "حقيبة قوالبك فارغة حالياً. اكتب اسماً للألوان والتموضع بالأعلى لحفظ القالب فورا." : "No custom presets registered. Write a creative title above to buffer your sandbox styles." }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1483,
              columnNumber: 19
            }, this) : /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: templates.map((tpl, tplIdx) => /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between hover:bg-white/[0.04] transition-all",
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "text-left font-sans", children: [
                    /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-black text-gray-200", children: tpl.name }, void 0, false, {
                      fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                      lineNumber: 1494,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-[#A855F7] font-mono mt-0.5 tracking-wider font-extrabold uppercase", children: [
                      tpl.config.font,
                      " Font • BorderRadius: ",
                      tpl.config.theme.buttonRadius
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                      lineNumber: 1495,
                      columnNumber: 27
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1493,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex gap-1.5 shrink-0", children: [
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleApplyTemplate(tpl.config),
                        className: "px-2.5 py-1 bg-brand-accent hover:brightness-110 text-black font-extrabold rounded-lg text-[9px] uppercase tracking-wider transition-all cursor-pointer",
                        children: lang === "ar" ? "تطبيق" : "Apply"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                        lineNumber: 1499,
                        columnNumber: 27
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleRemoveTemplate(tplIdx),
                        className: "p-1 text-red-500 hover:bg-red-950/20 rounded border border-red-500/10 transition-all cursor-pointer",
                        children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
                          fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                          lineNumber: 1511,
                          columnNumber: 29
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                        lineNumber: 1506,
                        columnNumber: 27
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                    lineNumber: 1498,
                    columnNumber: 25
                  }, this)
                ]
              },
              `${tpl.name}-${tplIdx}`,
              true,
              {
                fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
                lineNumber: 1489,
                columnNumber: 23
              },
              this
            )) }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1487,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
            lineNumber: 1479,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
          lineNumber: 1454,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
        lineNumber: 206,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-12 border-t border-white/5 pt-4 flex justify-end", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "button",
          onClick: handleSaveAll,
          className: "px-7 py-3 bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-accent text-white font-black tracking-widest rounded-xl hover:brightness-110 active:scale-95 transition-all uppercase flex items-center gap-2 cursor-pointer text-xs shadow-xl shadow-brand-primary/10",
          children: [
            /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4.5 h-4.5 animate-bounce" }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1531,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تثبيت وحفظ التصميم نهائياً بمصر" : "DEPLOY LIVE THEME CONFIG" }, void 0, false, {
              fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
              lineNumber: 1532,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
          lineNumber: 1526,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
        lineNumber: 1525,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
      lineNumber: 174,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/HomepagePageBuilder.tsx",
    lineNumber: 131,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhvbWVwYWdlUGFnZUJ1aWxkZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3BhcmtsZXMsIFRyYXNoMiwgQ2hlY2tDaXJjbGUyLCBDaGV2cm9uUmlnaHQsIFNldHRpbmdzIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IEhvbWVwYWdlQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgREVGQVVMVF9IT01FUEFHRV9DT05GSUcgfSBmcm9tICcuLi9kYXRhJztcblxuY29uc3QgZm9udFRvQ3NzTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAnSW50ZXInOiBcIidJbnRlcicsICdWYXppcm1hdG4nLCBzYW5zLXNlcmlmXCIsXG4gICdQb3BwaW5zJzogXCInUG9wcGlucycsICdSdWJpaycsIHNhbnMtc2VyaWZcIixcbiAgJ01vbnRzZXJyYXQnOiBcIidNb250c2VycmF0JywgJ0FsbWFyYWknLCBzYW5zLXNlcmlmXCIsXG4gICdSb2JvdG8nOiBcIidSb2JvdG8nLCAnVmF6aXJtYXRuJywgc2Fucy1zZXJpZlwiLFxuICAnQ2Fpcm8nOiBcIidDYWlybycsIHNhbnMtc2VyaWZcIixcbiAgJ1RhamF3YWwnOiBcIidUYWphd2FsJywgc2Fucy1zZXJpZlwiLFxuICAnSUJNIFBsZXggU2Fucyc6IFwiJ0lCTSBQbGV4IFNhbnMgQXJhYmljJywgJ0lCTSBQbGV4IFNhbnMnLCBzYW5zLXNlcmlmXCIsXG4gICdPcGVuIFNhbnMnOiBcIidPcGVuIFNhbnMnLCAnVmF6aXJtYXRuJywgc2Fucy1zZXJpZlwiLFxuICAnTGF0byc6IFwiJ0xhdG8nLCAnQWxtYXJhaScsIHNhbnMtc2VyaWZcIixcbiAgJ051bml0byc6IFwiJ051bml0bycsICdSdWJpaycsIHNhbnMtc2VyaWZcIixcbiAgJ1NwYWNlIEdyb3Rlc2snOiBcIidTcGFjZSBHcm90ZXNrJywgJ1ZhemlybWF0bicsIHNhbnMtc2VyaWZcIixcbn07XG5cbmludGVyZmFjZSBIb21lcGFnZVBhZ2VCdWlsZGVyUHJvcHMge1xuICBob21lcGFnZUNvbmZpZzogSG9tZXBhZ2VDb25maWc7XG4gIG9uVXBkYXRlSG9tZXBhZ2VDb25maWc6IChjb25maWc6IEhvbWVwYWdlQ29uZmlnKSA9PiB2b2lkO1xuICBsYW5nOiAnYXInIHwgJ2VuJztcbiAgZGlyOiAncnRsJyB8ICdsdHInO1xuICBjdXN0b21UZXh0OiBhbnk7XG4gIG9uVXBkYXRlQ3VzdG9tVGV4dDogKHRleHQ6IGFueSkgPT4gdm9pZDtcbiAgZmlyZVRvYXN0OiAobXNnOiBzdHJpbmcsIHR5cGU6ICdzdWNjZXNzJyB8ICdlcnJvcicgfCAnaW5mbycpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWVwYWdlUGFnZUJ1aWxkZXIoe1xuICBob21lcGFnZUNvbmZpZyxcbiAgb25VcGRhdGVIb21lcGFnZUNvbmZpZyxcbiAgbGFuZyxcbiAgZGlyLFxuICBjdXN0b21UZXh0LFxuICBvblVwZGF0ZUN1c3RvbVRleHQsXG4gIGZpcmVUb2FzdCxcbn06IEhvbWVwYWdlUGFnZUJ1aWxkZXJQcm9wcykge1xuICBjb25zdCBbYnVpbGRlckNvbmZpZywgc2V0QnVpbGRlckNvbmZpZ10gPSB1c2VTdGF0ZTxIb21lcGFnZUNvbmZpZz4oaG9tZXBhZ2VDb25maWcgfHwgREVGQVVMVF9IT01FUEFHRV9DT05GSUcpO1xuICBjb25zdCBbaGlzdG9yeSwgc2V0SGlzdG9yeV0gPSB1c2VTdGF0ZTxIb21lcGFnZUNvbmZpZ1tdPihbaG9tZXBhZ2VDb25maWcgfHwgREVGQVVMVF9IT01FUEFHRV9DT05GSUddKTtcbiAgY29uc3QgW2hpc3RvcnlJbmRleCwgc2V0SGlzdG9yeUluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbdGVtcGxhdGVzLCBzZXRUZW1wbGF0ZXNdID0gdXNlU3RhdGU8eyBuYW1lOiBzdHJpbmc7IGNvbmZpZzogSG9tZXBhZ2VDb25maWcgfVtdPigoKSA9PiB7XG4gICAgY29uc3QgbG9hZGVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Vsa2hvbHlfdGVtcGxhdGVzJyk7XG4gICAgcmV0dXJuIGxvYWRlZCA/IEpTT04ucGFyc2UobG9hZGVkKSA6IFtdO1xuICB9KTtcbiAgY29uc3QgW25ld1RlbXBsYXRlTmFtZSwgc2V0TmV3VGVtcGxhdGVOYW1lXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2FjdGl2ZUJ1aWxkZXJUYWIsIHNldEFjdGl2ZUJ1aWxkZXJUYWJdID0gdXNlU3RhdGU8J2ZvbnQnIHwgJ3RoZW1lJyB8ICdoZWFkZXInIHwgJ21haW4nIHwgJ2Zvb3RlcicgfCAndGVtcGxhdGVzJz4oJ2hlYWRlcicpO1xuICBjb25zdCBbZm9udFRhcmdldCwgc2V0Rm9udFRhcmdldF0gPSB1c2VTdGF0ZTwnaGVhZGluZ3MnIHwgJ3N1YmhlYWRpbmdzJyB8ICdib2R5Jz4oJ2hlYWRpbmdzJyk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaG9tZXBhZ2VDb25maWcpIHtcbiAgICAgIHNldEJ1aWxkZXJDb25maWcoaG9tZXBhZ2VDb25maWcpO1xuICAgIH1cbiAgfSwgW2hvbWVwYWdlQ29uZmlnXSk7XG5cbiAgY29uc3QgdXBkYXRlQnVpbGRlckNvbmZpZyA9IChuZXdDb25maWc6IEhvbWVwYWdlQ29uZmlnKSA9PiB7XG4gICAgY29uc3QgbmV4dEhpc3RvcnkgPSBoaXN0b3J5LnNsaWNlKDAsIGhpc3RvcnlJbmRleCArIDEpO1xuICAgIG5leHRIaXN0b3J5LnB1c2gobmV3Q29uZmlnKTtcbiAgICBzZXRIaXN0b3J5KG5leHRIaXN0b3J5KTtcbiAgICBzZXRIaXN0b3J5SW5kZXgobmV4dEhpc3RvcnkubGVuZ3RoIC0gMSk7XG4gICAgc2V0QnVpbGRlckNvbmZpZyhuZXdDb25maWcpO1xuICAgIG9uVXBkYXRlSG9tZXBhZ2VDb25maWcobmV3Q29uZmlnKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVVbmRvID0gKCkgPT4ge1xuICAgIGlmIChoaXN0b3J5SW5kZXggPiAwKSB7XG4gICAgICBjb25zdCBwcmV2SW5kZXggPSBoaXN0b3J5SW5kZXggLSAxO1xuICAgICAgc2V0SGlzdG9yeUluZGV4KHByZXZJbmRleCk7XG4gICAgICBzZXRCdWlsZGVyQ29uZmlnKGhpc3RvcnlbcHJldkluZGV4XSk7XG4gICAgICBvblVwZGF0ZUhvbWVwYWdlQ29uZmlnKGhpc3RvcnlbcHJldkluZGV4XSk7XG4gICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmFINin2YTYqtix2KfYrNi5INi52YYg2KfZhNiq2LnYr9mK2YQg2YXZhiDYp9mE2LDYp9mD2LHYqScgOiAnRGVzaWduIHVuZG9uZSBzdWNjZXNzZnVsbHknLCAnaW5mbycpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZWRvID0gKCkgPT4ge1xuICAgIGlmIChoaXN0b3J5SW5kZXggPCBoaXN0b3J5Lmxlbmd0aCAtIDEpIHtcbiAgICAgIGNvbnN0IG5leHRJbmRleCA9IGhpc3RvcnlJbmRleCArIDE7XG4gICAgICBzZXRIaXN0b3J5SW5kZXgobmV4dEluZGV4KTtcbiAgICAgIHNldEJ1aWxkZXJDb25maWcoaGlzdG9yeVtuZXh0SW5kZXhdKTtcbiAgICAgIG9uVXBkYXRlSG9tZXBhZ2VDb25maWcoaGlzdG9yeVtuZXh0SW5kZXhdKTtcbiAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YXYqiDYpdi52KfYr9ipINiq2LfYqNmK2YIg2KfZhNiq2LnYr9mK2YQnIDogJ0Rlc2lnbiByZWRvbmUgc3VjY2Vzc2Z1bGx5JywgJ2luZm8nKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2F2ZVRlbXBsYXRlID0gKCkgPT4ge1xuICAgIGlmICghbmV3VGVtcGxhdGVOYW1lLnRyaW0oKSkge1xuICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2YrYsdis2Ykg2YPYqtin2KjYqSDYp9iz2YUg2YTZhNmC2KfZhNioINij2YjZhNin2YsnIDogJ1BsZWFzZSB0eXBlIGEgdmFsaWQgdGVtcGxhdGUgaWRlbnRpdHknLCAnZXJyb3InKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdXBkYXRlZCA9IFsuLi50ZW1wbGF0ZXMsIHsgbmFtZTogbmV3VGVtcGxhdGVOYW1lLnRyaW0oKSwgY29uZmlnOiBidWlsZGVyQ29uZmlnIH1dO1xuICAgIHNldFRlbXBsYXRlcyh1cGRhdGVkKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZWxraG9seV90ZW1wbGF0ZXMnLCBKU09OLnN0cmluZ2lmeSh1cGRhdGVkKSk7XG4gICAgc2V0TmV3VGVtcGxhdGVOYW1lKCcnKTtcbiAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmFINit2YHYuCDYp9mE2KrZhdmI2LbYuSDYp9mE2K7Yp9ix2KzZiiDZg9mC2KfZhNioINmF2K7Ytdi1INio2YbYrNin2K0hJyA6ICdDdXJyZW50IHN0eWxlZCBjb25maWcgc2F2ZWQgYXMgYWN0aXZlIHRlbXBsYXRlIScsICdzdWNjZXNzJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQXBwbHlUZW1wbGF0ZSA9IChjb25maWc6IEhvbWVwYWdlQ29uZmlnKSA9PiB7XG4gICAgdXBkYXRlQnVpbGRlckNvbmZpZyhjb25maWcpO1xuICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YUg2KrYt9io2YrZgiDYp9mE2YLYp9mE2Kgg2YjYrNin2LHZiiDYp9mE2YXYudin2YrZhtipINin2YTYrdmK2Kkg2YHZiNix2KchJyA6ICdUZW1wbGF0ZSBhcHBsaWVkIHdpdGggbGl2ZSBwcmV2aWV3IHJlbmRlcmluZyEnLCAnc3VjY2VzcycpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlbW92ZVRlbXBsYXRlID0gKGlkeDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgdXBkYXRlZCA9IHRlbXBsYXRlcy5maWx0ZXIoKF8sIGkpID0+IGkgIT09IGlkeCk7XG4gICAgc2V0VGVtcGxhdGVzKHVwZGF0ZWQpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X3RlbXBsYXRlcycsIEpTT04uc3RyaW5naWZ5KHVwZGF0ZWQpKTtcbiAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmFINit2LDZgSDYp9mE2YLYp9mE2Kgg2KfZhNmF2K7Yqtin2LEnIDogJ1RlbXBsYXRlIHJlbW92ZWQnLCAnaW5mbycpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlc2V0VG9EZWZhdWx0ID0gKCkgPT4ge1xuICAgIHVwZGF0ZUJ1aWxkZXJDb25maWcoREVGQVVMVF9IT01FUEFHRV9DT05GSUcpO1xuICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YXYqiDYpdi52KfYr9ipINiq2LnZitmK2YYg2YTZiNit2Kkg2KfZhNiq2LXYp9mF2YrZhSDZhNmE2LPZhdin2Kog2KfZhNin2YHYqtix2KfYttmK2Kkg2YTZhNmF2LnYsdi2JyA6ICdTaG93cm9vbSBzdHlsZSBsYXlvdXRzIHJlc2V0IHRvIGRlZmF1bHQgdGVtcGxhdGUnLCAnaW5mbycpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNhdmVBbGwgPSAoKSA9PiB7XG4gICAgb25VcGRhdGVIb21lcGFnZUNvbmZpZyhidWlsZGVyQ29uZmlnKTtcbiAgICAvLyBTeW5jIHRvIGJhc2ljIGN1c3RvbVRleHQgYXMgd2VsbCB0byBwcmVzZXJ2ZSBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgb25VcGRhdGVDdXN0b21UZXh0KHtcbiAgICAgIGFyVGl0bGU6IGJ1aWxkZXJDb25maWcuaGVhZGVyLnRpdGxlQXIsXG4gICAgICBlblRpdGxlOiBidWlsZGVyQ29uZmlnLmhlYWRlci50aXRsZSxcbiAgICAgIGFyU2xvZ2FuOiBidWlsZGVyQ29uZmlnLmhlYWRlci5zdWJ0aXRsZUFyLFxuICAgICAgZW5TbG9nYW46IGJ1aWxkZXJDb25maWcuaGVhZGVyLnN1YnRpdGxlLFxuICAgICAgYXJCYWRnZTogYnVpbGRlckNvbmZpZy5oZWFkZXIuYmFkZ2VBcixcbiAgICAgIGVuQmFkZ2U6IGJ1aWxkZXJDb25maWcuaGVhZGVyLmJhZGdlLFxuICAgICAgYXJIZXJvRGVzYzogYnVpbGRlckNvbmZpZy5oZWFkZXIuZGVzY3JpcHRpb25BcixcbiAgICAgIGVuSGVyb0Rlc2M6IGJ1aWxkZXJDb25maWcuaGVhZGVyLmRlc2NyaXB0aW9uLFxuICAgIH0pO1xuICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YUg2KrYq9io2YrYqiDZiNmG2LTYsSDZg9in2YHYqSDYp9mE2KrYudiv2YrZhNin2Kog2YjYp9mE2KrYtdin2YXZitmFINio2YbYrNin2K0hJyA6ICdBZHZhbmNlZCBsYXlvdXQgY29uZmlndXJhdGlvbiBkZXBsb3llZCBzdWNjZXNzZnVsbHkhJywgJ3N1Y2Nlc3MnKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02IGFuaW1hdGUtZmFkZS1pbiBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgXG4gICAgICB7LyogQWN0aW9uIEhlYWRlciBiYXIgKFVuZG8vUmVkbykgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgYmctd2hpdGUvWzAuMDJdIGJvcmRlciBib3JkZXItd2hpdGUvNSByb3VuZGVkLTJ4bCBwLTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdHJhY2tpbmctd2lkZXN0IGZvbnQtbW9ubyB1cHBlcmNhc2UgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtYnJhbmQtcHJpbWFyeSBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9mF2YbYtNimINin2YTYtdmB2K3Yp9iqINin2YTZhdiq2YLYr9mFINio2YXYtdixJyA6ICdFR1lQVCBFTEtIT0xZIEhFUk8gUEFHRSBCVUlMREVSJ308L3NwYW4+XG4gICAgICAgICAgPC9oMz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNDUwIGZvbnQtc2FucyB0cmFja2luZy10aWdodCBtdC0wLjUgbm9ybWFsLWNhc2UgZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9in2YTYqtit2YPZhSDYp9mE2YfZitmD2YTZiiDYp9mE2YHZiNix2Yog2KjYp9mE2YXYuNmH2LHYjCDYp9mE2KPZhNmI2KfZhtiMINin2YTYstmI2KfZitin2Iwg2KfZhNmB2YjZhtiq2KfYqtiMINin2YTYrtmE2YHZitin2Kog2YjYp9mE2LHZhdmI2LIg2YXYuSDYqtix2KfYrNi5INmI2K3Zgdi4INin2YTZgtmI2KfZhNioLicgOiAnTGl2ZSBkcmFmdGluZyBwYW5lbCB3aXRoIDEwIGZvbnQgc2VsZWN0aW9uLCBjdXN0b20gSFRNTCBlbWJlZHMsIGNvbG9yIHBpY2tlcnMsIGFuZCBib3JkZXIgY3VydmVzIHNjYWxpbmcuJ31cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVVuZG99XG4gICAgICAgICAgICBkaXNhYmxlZD17aGlzdG9yeUluZGV4IDw9IDB9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTIgYmctd2hpdGUvNSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgaG92ZXI6Ymctd2hpdGUvMTAgZGlzYWJsZWQ6b3BhY2l0eS00NSB0cmFuc2l0aW9uLWFsbCBmb250LWJvbGQgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgdGl0bGU9XCJVbmRvXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfihqkg2KrYsdin2KzYuScgOiAn4oapIFVuZG8nfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUmVkb31cbiAgICAgICAgICAgIGRpc2FibGVkPXtoaXN0b3J5SW5kZXggPj0gaGlzdG9yeS5sZW5ndGggLSAxfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0yIGJnLXdoaXRlLzUgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIGhvdmVyOmJnLXdoaXRlLzEwIGRpc2FibGVkOm9wYWNpdHktNDUgdHJhbnNpdGlvbi1hbGwgZm9udC1ib2xkIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgIHRpdGxlPVwiUmVkb1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn4oaqINil2LnYp9iv2KknIDogJ+KGqiBSZWRvJ31cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJlc2V0VG9EZWZhdWx0fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0yIGJnLXJlZC05NTAvMjUgYm9yZGVyIGJvcmRlci1yZWQtOTAwLzMwIHRleHQtcmVkLTQwMCByb3VuZGVkLXhsIGhvdmVyOmJnLXJlZC05NTAvNTAgdHJhbnNpdGlvbi1hbGwgZm9udC1ib2xkIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfimqDvuI8g2KXYudin2K/YqSDYqti52YrZitmGJyA6ICfimqDvuI8gUmVzZXQnfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC02XCI+XG4gICAgICAgIFxuICAgICAgICB7LyogU3ViIHRhYnMgbGlzdCBTZWxlY3RvciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi0zIGZsZXggZmxleC1yb3cgbGc6ZmxleC1jb2wgZ2FwLTEuNSBvdmVyZmxvdy14LWF1dG8gbGc6b3ZlcmZsb3cteC12aXNpYmxlIHBiLTMgbGc6cGItMCBib3JkZXItYiBsZzpib3JkZXItYi0wIGxnOmJvcmRlci1yIGJvcmRlci13aGl0ZS81IHByLTAgbGc6cHItMyBzaHJpbmstMFwiPlxuICAgICAgICAgIHsoW1xuICAgICAgICAgICAgeyBpZDogJ2hlYWRlcicsIGxhYmVsQXI6ICfZhti12YjYtSDYp9mE2KjYp9mG2LEg2YjYp9mE2YXZgtiv2YXYqScsIGxhYmVsRW46ICdMYW5kaW5nIEhlcm8gSGVhZGVyJyB9LFxuICAgICAgICAgICAgeyBpZDogJ3RoZW1lJywgbGFiZWxBcjogJ9mE2YjYrdipINin2YTYo9mE2YjYp9mGINmI2KfZhNiq2K3Zg9mFINin2YTYtNin2YXZhCcsIGxhYmVsRW46ICdDb2xvciBQYWxldHRlICYgU3BhY2luZycgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdmb250JywgbGFiZWxBcjogJ9in2YTYrti32YjYtyDYp9mE2YAgMTAg2KfZhNmF2LnYp9i12LHYqScsIGxhYmVsRW46ICdGb250IEZhbWlseSBQaWNrZXInIH0sXG4gICAgICAgICAgICB7IGlkOiAnbWFpbicsIGxhYmVsQXI6ICfYp9mE2KrYrdmD2YUg2KjYo9mC2LPYp9mFINin2YTYudix2LYg2YjYp9mE2LHZhdmI2LInLCBsYWJlbEVuOiAnR3JpZCBTaG93cm9vbSBTbG90cycgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdmb290ZXInLCBsYWJlbEFyOiAn2KfZhNmB2YjYqtixINin2YTYp9is2KrZhdin2LnZiiDZiNin2YTYsdmI2KfYqNi3JywgbGFiZWxFbjogJ0NvbGxhcHNpYmxlIEZvb3RlciBOb2RlJyB9LFxuICAgICAgICAgICAgeyBpZDogJ3RlbXBsYXRlcycsIGxhYmVsQXI6ICfYrdmC2YrYqNipINin2YTZgtmI2KfZhNioINin2YTZhdiu2LXYtdipJywgbGFiZWxFbjogJ1RlbXBsYXRlIFZhdWx0IERyYXdlcicgfVxuICAgICAgICAgIF0gYXMgY29uc3QpLm1hcCgodGFiKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1N1YkFjdGl2ZSA9IGFjdGl2ZUJ1aWxkZXJUYWIgPT09IHRhYi5pZDtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBrZXk9e3RhYi5pZH1cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVCdWlsZGVyVGFiKHRhYi5pZCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHRleHQtbGVmdCBweC0zLjUgcHktMyByb3VuZGVkLXhsIGJvcmRlciB0ZXh0LVsxMHB4XSBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgc2hyaW5rLTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHdoaXRlc3BhY2Utbm93cmFwIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICBpc1N1YkFjdGl2ZSBcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctYnJhbmQtcHJpbWFyeS8yMCBib3JkZXItYnJhbmQtcHJpbWFyeSB0ZXh0LXdoaXRlIHNoYWRvdy1tZCcgXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXdoaXRlL1swLjAxXSBib3JkZXItd2hpdGUvNSBob3Zlcjpib3JkZXItd2hpdGUvMTAgdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyB0YWIubGFiZWxBciA6IHRhYi5sYWJlbEVufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0IGNsYXNzTmFtZT1cInctMy41IGgtMy41IG9wYWNpdHktNDBcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDb25maWd1cmF0aW9ucyBGb3JtcyBQYW5lbCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi05IGJnLWJsYWNrLzQwIGJvcmRlciBib3JkZXItd2hpdGUvNSByb3VuZGVkLTJ4bCBwLTUgdGV4dC1sZWZ0IHNwYWNlLXktNVwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBIRUFERVIgRk9STSAqL31cbiAgICAgICAgICB7YWN0aXZlQnVpbGRlclRhYiA9PT0gJ2hlYWRlcicgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTQgYW5pbWF0ZS1mYWRlLWluIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdGV4dC1icmFuZC1zZWNvbmRhcnkgdHJhY2tpbmctd2lkZXN0IGJvcmRlci1iIGJvcmRlci13aGl0ZS81IHBiLTEuNSBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYqtiu2LXZiti1INmG2LXZiNi1INiq2LHYrdmK2Kgg2KfZhNmI2KfYrNmH2Kkg2YjYp9mE2YTZiNis2YgnIDogJ1NldHVwIEhlcm8gSGVhZGVyIGFuZCBCcmFuZGluZyBEZXRhaWxzJ31cbiAgICAgICAgICAgICAgPC9oND5cblxuICAgICAgICAgICAgICB7LyogTG9nbyB0ZXh0IHdpZGdldHMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQ1MCB0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyXCI+e2xhbmcgPT09ICdhcicgPyAn2KfYs9mFINin2YTZhdi52LHYtiDYqNin2YTYudix2KjZitipICjZhti1INio2K/ZitmEKTonIDogJ0JyYW5kaW5nIExvZ28gVGV4dCAoQXJhYmljKSd9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YnVpbGRlckNvbmZpZy5oZWFkZXIubG9nb1RleHRBciB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogeyAuLi5idWlsZGVyQ29uZmlnLmhlYWRlciwgbG9nb1RleHRBcjogZS50YXJnZXQudmFsdWUgfVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS84MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcC0yLjUgdGV4dC13aGl0ZSBmb250LXNhbnMgdGV4dC1yaWdodCBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00NTUgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0cmFja2luZy13aWRlclwiPntsYW5nID09PSAnYXInID8gJ9in2LPZhSDYp9mE2YXYudix2LYg2KjYp9mE2KXZhtis2YTZitiy2YrYqSAo2YbYtSDYqNiv2YrZhCk6JyA6ICdCcmFuZGluZyBMb2dvIFRleHQgKEVuZ2xpc2gpJ308L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmhlYWRlci5sb2dvVGV4dCB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogeyAuLi5idWlsZGVyQ29uZmlnLmhlYWRlciwgbG9nb1RleHQ6IGUudGFyZ2V0LnZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vODAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHAtMi41IHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PSBCcmFuZCBJbWFnZSAmIExvZ28gTWFuYWdlbWVudCBTeXN0ZW0gPT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLXdoaXRlL1swLjAyXSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtMnhsIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci13aGl0ZS81IHBiLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ibGFjayB0ZXh0LVsjMjJEM0VFXSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn8J+OqCDZhti42KfZhSDZiNil2K/Yp9ix2Kkg2YTZiNis2Ygg2KfZhNmF2LnYsdi2INin2YTZhdi32YjYsScgOiAn8J+OqCBBZHZhbmNlZCBMb2dvIE1hbmFnZW1lbnQgU3lzdGVtJ31cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IGJnLWJyYW5kLXNlY29uZGFyeS8xMCBib3JkZXIgYm9yZGVyLWJyYW5kLXNlY29uZGFyeS8yNSB0ZXh0LVs4cHhdIGZvbnQtZXh0cmFib2xkIHRleHQtWyNBODU1RjddIHJvdW5kZWQgdXBwZXJjYXNlXCI+MjAyNiBDb3JlIEVuZ2luZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBQcmV2aWV3IGJsb2NrICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0ZXh0LVs5cHhdIGJsb2NrIHVwcGVyY2FzZSBmb250LWJvbGRcIj57bGFuZyA9PT0gJ2FyJyA/ICfZhdi52KfZitmG2Kkg2KfZhNmE2YjYrNmIINin2YTYrdin2YTZijonIDogJ0xpdmUgTG9nbyBQcmV2aWV3Oid9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC02IGJnLVsjMEIwRjFBXS85MCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSByb3VuZGVkLXhsIHJlbGF0aXZlIG1pbi1oLVs5MHB4XVwiPlxuICAgICAgICAgICAgICAgICAgICB7YnVpbGRlckNvbmZpZy5oZWFkZXIubG9nb1VybCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2J1aWxkZXJDb25maWcuaGVhZGVyLmxvZ29Vcmx9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJMb2dvIFByZXZpZXdcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtidWlsZGVyQ29uZmlnLmhlYWRlci5sb2dvU2l6ZSA9PT0gJ3NtYWxsJyA/ICdoLTgnIDogYnVpbGRlckNvbmZpZy5oZWFkZXIubG9nb1NpemUgPT09ICdsYXJnZScgPyAnaC0xNCcgOiAnaC0xMCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtidWlsZGVyQ29uZmlnLmhlYWRlci5sb2dvRWZmZWN0ID09PSAnZ2xvdycgPyAnc2hhZG93LVswXzBfMTVweF9yZ2JhKDM0LDIxMSwyMzgsMC41NSldIGJvcmRlciBib3JkZXItWyMyMkQzRUVdLzMwIGJnLVsjMjJEM0VFXS81IHB4LTIgcHktMSByb3VuZGVkLXhsJyA6ICcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7YnVpbGRlckNvbmZpZy5oZWFkZXIubG9nb0VmZmVjdCA9PT0gJ25lb24nID8gJ3NoYWRvdy1bMF8wXzIwcHhfcmdiYSgxNjgsODUsMjQ3LDAuNjUpXSBib3JkZXIgYm9yZGVyLVsjQTg1NUY3XS80MCBiZy1bI0E4NTVGN10vMTAgcHgtMiBweS0xIHJvdW5kZWQteGwnIDogJyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtidWlsZGVyQ29uZmlnLmhlYWRlci5sb2dvRWZmZWN0ID09PSAnc2hhZG93JyA/ICdzaGFkb3ctMnhsIHNoYWRvdy1ibGFjay84MCBiZy1ibGFjay81MCBweC0yIHB5LTEgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXdoaXRlLzUnIDogJyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0LWNvbnRhaW4gbWF4LXctWzIwMHB4XSB0cmFuc2l0aW9uLWFsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzhweF0gdGV4dC1ncmF5LTUwMCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2J1aWxkZXJDb25maWcuaGVhZGVyLmxvZ29TaXplPy50b1VwcGVyQ2FzZSgpfSB8IHtidWlsZGVyQ29uZmlnLmhlYWRlci5sb2dvRWZmZWN0Py50b1VwcGVyQ2FzZSgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgdGV4dC14cyB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2YTYpyDZitmI2KzYryDZhdmE2YEg2YTZiNis2Ygg2YXYrti12LUuINiz2YrYqtmFINiq2YHYudmK2YQg2KfZhNmI2LbYuSDYp9mE2KfZgdiq2LHYp9i22Yog2YTZhNi02KjZg9ipINin2YTYqNix2YXYrNmK2KkuJyA6ICdObyBjdXN0b20gbG9nbyBsb2FkZWQuIFN5c3RlbSBkZWZhdWx0IGN5YmVyIGluZGljYXRvciBhY3RpdmUuJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAge2J1aWxkZXJDb25maWcuaGVhZGVyLmxvZ29VcmwgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogeyAuLi5idWlsZGVyQ29uZmlnLmhlYWRlciwgbG9nb1VybDogJycgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDYrdiw2YEg2KfZhNmE2YjYrNmIINin2YTZhdiu2LXYtSEnIDogJ0JyYW5kZWQgY3VzdG9tIExvZ28gcmVtb3ZlZCEnLCAnc3VjY2VzcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0yIHJpZ2h0LTIgcC0xLjUgYmctcmVkLTk1MC84MCBob3ZlcjpiZy1yZWQtOTAwIGJvcmRlciBib3JkZXItcmVkLTUwMC8xMCByb3VuZGVkLXhsIHRleHQtcmVkLTQwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17bGFuZyA9PT0gJ2FyJyA/ICfYrdiw2YEg2KfZhNmE2YjYrNmIINin2YTZhdiu2LXYtScgOiAnRGVsZXRlIEN1c3RvbSBMb2dvJ31cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFVwbG9hZCAmIFVybCBmaWVsZHMgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDAgdGV4dC1bOXB4XSBibG9jayB1cHBlcmNhc2UgZm9udC1ib2xkXCI+e2xhbmcgPT09ICdhcicgPyAn2LHYp9io2Lcg2YXZhNmBINin2YTZhNmI2KzZiCDYp9mE2KzYr9mK2K86JyA6ICdEaXJlY3QgTG9nbyBJbWFnZSBMaW5rIFVSTDonfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly8uLi5cIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmhlYWRlci5sb2dvVXJsIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7IC4uLmJ1aWxkZXJDb25maWcuaGVhZGVyLCBsb2dvVXJsOiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS84MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcC0yIHB5LTEuNSB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSB0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwIHRleHQtWzlweF0gYmxvY2sgdXBwZXJjYXNlIGZvbnQtYm9sZFwiPntsYW5nID09PSAnYXInID8gJ9ij2Ygg2LHZgdi5INmF2YTZgSDZhNmI2KzZiCAoU1ZHL1BORy9KUEcpOicgOiAnT3IgdXBsb2FkIGxvZ28gaW1hZ2UgZmlsZSBkaXJlY3RlbWVudDonfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXM/LlswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7IC4uLmJ1aWxkZXJDb25maWcuaGVhZGVyLCBsb2dvVXJsOiByZWFkZXIucmVzdWx0IGFzIHN0cmluZyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDYqti52YrZitmGINin2YTZhNmI2KzZiCDZiNix2YHYudmHINio2YbYrNin2K0hJyA6ICdDdXN0b20gTG9nbyB1cGxvYWRlZCBhbmQgc2V0IHN1Y2Nlc3NmdWxseSEnLCAnc3VjY2VzcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy13aGl0ZS81IGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBwLTEgdGV4dC1ncmF5LTQwMCB0ZXh0LXhzIGZpbGU6YmctYnJhbmQtc2Vjb25kYXJ5IGZpbGU6Ym9yZGVyLW5vbmUgZmlsZTp0ZXh0LXdoaXRlIGZpbGU6cHgtMi41IGZpbGU6cHktMSBmaWxlOnJvdW5kZWQtbWQgZmlsZTp0ZXh0LVsxMHB4XSBmaWxlOmN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIEFkanVzdG1lbnRzOiBSZXNpemUsIFBvc2l0aW9uLCBFZmZlY3RzICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMyBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB7LyogUmVzaXplIG9wdGlvbiAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIGJsb2NrIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0ZXh0LVs5cHhdIGJsb2NrIHVwcGVyY2FzZSBmb250LWJvbGRcIj57bGFuZyA9PT0gJ2FyJyA/ICfYqti52K/ZitmEINit2KzZhSDYp9mE2YTZiNis2Yg6JyA6ICdSZXNpemUgTG9nbyBEaW1lbnNpb25zOid9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmhlYWRlci5sb2dvU2l6ZSB8fCAnbWVkaXVtJ31cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZUJ1aWxkZXJDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogeyAuLi5idWlsZGVyQ29uZmlnLmhlYWRlciwgbG9nb1NpemU6IGUudGFyZ2V0LnZhbHVlIGFzIGFueSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS84MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcC0yIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIHRleHQteHNcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInNtYWxsXCI+e2xhbmcgPT09ICdhcicgPyAn2LXYutmK2LEgKFNtYWxsIC0gMzJweCknIDogJ1NtYWxsICgzMnB4KSd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm1lZGl1bVwiPntsYW5nID09PSAnYXInID8gJ9mF2KrZiNiz2LcgKE1lZGl1bSAtIDQwcHgpJyA6ICdNZWRpdW0gKDQwcHgpJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibGFyZ2VcIj57bGFuZyA9PT0gJ2FyJyA/ICfZg9io2YrYsSAoTGFyZ2UgLSA1NnB4KScgOiAnTGFyZ2UgKDU2cHgpJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIFBvc2l0aW9uIG9wdGlvbiAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIGJsb2NrIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0ZXh0LVs5cHhdIGJsb2NrIHVwcGVyY2FzZSBmb250LWJvbGRcIj57bGFuZyA9PT0gJ2FyJyA/ICfZhdmI2LbYuSDZiNmF2YjZgti5INin2YTZhNmI2KzZiDonIDogJ0xvZ28gUG9zaXRpb24gTGF5b3V0Oid9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmhlYWRlci5sb2dvUG9zaXRpb24gfHwgJ2xlZnQnfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7IC4uLmJ1aWxkZXJDb25maWcuaGVhZGVyLCBsb2dvUG9zaXRpb246IGUudGFyZ2V0LnZhbHVlIGFzIGFueSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS84MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcC0yIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIHRleHQteHNcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImxlZnRcIj57bGFuZyA9PT0gJ2FyJyA/ICfYudmE2Ykg2KfZhNmK2LPYp9ixICjYp9mE2KPYt9ix2KfZgSknIDogJ0FsaWduIExlZnQgLyBTdGFydCd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImNlbnRlclwiPntsYW5nID09PSAnYXInID8gJ9mB2Yog2KfZhNmF2YbYqti12YEgKNmF2LHZg9iyKScgOiAnQ2VudGVyIEFsaWduZWQnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogRWZmZWN0cyBvcHRpb24gKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9jayB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bOXB4XSBibG9jayB1cHBlcmNhc2UgZm9udC1ib2xkXCI+e2xhbmcgPT09ICdhcicgPyAn2KrYo9ir2YrYsSDYp9mE2YfYp9mE2Kkg2KfZhNmF2K3Ziti32Kkg2KjYp9mE2YTZiNis2Yg6JyA6ICdMb2dvIEJhY2tncm91bmQgRWZmZWN0Oid9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmhlYWRlci5sb2dvRWZmZWN0IHx8ICdub25lJ31cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZUJ1aWxkZXJDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogeyAuLi5idWlsZGVyQ29uZmlnLmhlYWRlciwgbG9nb0VmZmVjdDogZS50YXJnZXQudmFsdWUgYXMgYW55IH1cbiAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzgwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBwLTIgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgdGV4dC14c1wiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibm9uZVwiPntsYW5nID09PSAnYXInID8gJ9io2K/ZiNmGINiq2KPYq9mK2LEnIDogJ05vbmUgLyBEZWZhdWx0IHRyYW5zcGFyZW5jeSd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImdsb3dcIj57bGFuZyA9PT0gJ2FyJyA/ICfZh9in2YTYqSDYp9mE2YbZitmI2YYg2KfZhNmB2YrYsdmI2LLZitipJyA6ICdDeWFuIEN5YmVyIEdsb3cnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJuZW9uXCI+e2xhbmcgPT09ICdhcicgPyAn2YfYp9mE2Kkg2KfZhNmG2YrZiNmGINin2YTYqNmG2YHYs9is2YrYqScgOiAnUHVycGxlIEF1cm9yYSBHbG93J308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic2hhZG93XCI+e2xhbmcgPT09ICdhcicgPyAn2LjZhCDYudmF2YrZgiDYudin2YTZiiDYp9mE2KrYqNin2YrZhicgOiAnRGVlcCBEeW5hbWljIFNoYWRvdyd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFRpdGxlcyB3aWRnZXRzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00NTUgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0cmFja2luZy13aWRlclwiPntsYW5nID09PSAnYXInID8gJ9in2YTYudmG2YjYp9mGINin2YTYqtix2K3Zitio2Yog2KfZhNi52LHZiti2ICjYudix2KjZiik6JyA6ICdEaXNwbGF5IE1haW4gVGl0bGUgKEFyYWJpYyknfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2J1aWxkZXJDb25maWcuaGVhZGVyLnRpdGxlQXIgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHsgLi4uYnVpbGRlckNvbmZpZy5oZWFkZXIsIHRpdGxlQXI6IGUudGFyZ2V0LnZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vODAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHAtMi41IHRleHQtd2hpdGUgZm9udC1zYW5zIHRleHQtcmlnaHQgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDU1IHRleHQtWzEwcHhdIHVwcGVyY2FzZSBmb250LWJvbGQgdHJhY2tpbmctd2lkZXJcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2LnZhtmI2KfZhiDYp9mE2KrYsdit2YrYqNmKINin2YTYudix2YrYtiAo2KXZhtis2YTZitiy2YopOicgOiAnRGlzcGxheSBNYWluIFRpdGxlIChFbmdsaXNoKSd9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YnVpbGRlckNvbmZpZy5oZWFkZXIudGl0bGUgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHsgLi4uYnVpbGRlckNvbmZpZy5oZWFkZXIsIHRpdGxlOiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzgwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBwLTIuNSB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00NTUgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0cmFja2luZy13aWRlclwiPntsYW5nID09PSAnYXInID8gJ9in2YTZhti1INin2YTZg9mE2YXZiiDYp9mE2YXZhNmI2YYg2KfZhNmF2LXYp9it2KggKNi52LHYqNmKKTonIDogJ0NvbG9yIEFjY2VudCBQYXJ0IChBcmFiaWMpJ308L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmhlYWRlci5hY2NlbnRBciB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogeyAuLi5idWlsZGVyQ29uZmlnLmhlYWRlciwgYWNjZW50QXI6IGUudGFyZ2V0LnZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vODAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHAtMi41IHRleHQtd2hpdGUgZm9udC1zYW5zIHRleHQtcmlnaHQgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDU1IHRleHQtWzEwcHhdIHVwcGVyY2FzZSBmb250LWJvbGQgdHJhY2tpbmctd2lkZXJcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YbYtSDYp9mE2YPZhNmF2Yog2KfZhNmF2YTZiNmGINin2YTZhdi12KfYrdioICjYpdmG2KzZhNmK2LLZiik6JyA6ICdDb2xvciBBY2NlbnQgUGFydCAoRW5nbGlzaCknfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2J1aWxkZXJDb25maWcuaGVhZGVyLmFjY2VudCB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogeyAuLi5idWlsZGVyQ29uZmlnLmhlYWRlciwgYWNjZW50OiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzgwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBwLTIuNSB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogU2xvZ2FucyB3aWRnZXRzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00NTUgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0cmFja2luZy13aWRlclwiPntsYW5nID09PSAnYXInID8gJ9in2YTYtNi52KfYsSDYp9mE2LPZhNmI2KzYp9mGINin2YTYqtix2YjZitis2YogKNi52LHYqNmKKTonIDogJ0hlcm8gU3VidGl0bGUgU2xvZ2FuIChBcmFiaWMpJ308L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmhlYWRlci5zdWJ0aXRsZUFyIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZUJ1aWxkZXJDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgIC4uLmJ1aWxkZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7IC4uLmJ1aWxkZXJDb25maWcuaGVhZGVyLCBzdWJ0aXRsZUFyOiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzgwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBwLTIuNSB0ZXh0LXdoaXRlIGZvbnQtc2FucyB0ZXh0LXJpZ2h0IGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQ1NSB0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyXCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNi02LnYp9ixINin2YTYs9mE2YjYrNin2YYg2KfZhNiq2LHZiNmK2KzZiiAo2KXZhtis2YTZitiy2YopOicgOiAnSGVybyBTdWJ0aXRsZSBTbG9nYW4gKEVuZ2xpc2gpJ308L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmhlYWRlci5zdWJ0aXRsZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogeyAuLi5idWlsZGVyQ29uZmlnLmhlYWRlciwgc3VidGl0bGU6IGUudGFyZ2V0LnZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vODAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHAtMi41IHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBCYWRnZXMgYW5kIGRlc2NyaXB0aW9ucyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDU1IHRleHQtWzEwcHhdIHVwcGVyY2FzZSBmb250LWJvbGQgdHJhY2tpbmctd2lkZXJcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2LTYp9ix2Kkg2KfZhNiq2LHYrdmK2KjZitipINin2YTYudin2KbZhdipINin2YTYudmE2YrYpyAo2LnYsdio2YopOicgOiAnRmxvYXRpbmcgSGVybyBVcHBlciBCYWRnZSAoQXJhYmljKSd9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YnVpbGRlckNvbmZpZy5oZWFkZXIuYmFkZ2VBciB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogeyAuLi5idWlsZGVyQ29uZmlnLmhlYWRlciwgYmFkZ2VBcjogZS50YXJnZXQudmFsdWUgfVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS84MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcC0yLjUgdGV4dC13aGl0ZSBmb250LXNhbnMgdGV4dC1yaWdodCBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00NTUgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0cmFja2luZy13aWRlclwiPntsYW5nID09PSAnYXInID8gJ9in2YTYtNin2LHYqSDYp9mE2KrYsdit2YrYqNmK2Kkg2KfZhNi52KfYptmF2Kkg2KfZhNi52YTZitinICjYpdmG2KzZhNmK2LLZiik6JyA6ICdGbG9hdGluZyBIZXJvIFVwcGVyIEJhZGdlIChFbmdsaXNoKSd9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YnVpbGRlckNvbmZpZy5oZWFkZXIuYmFkZ2UgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHsgLi4uYnVpbGRlckNvbmZpZy5oZWFkZXIsIGJhZGdlOiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzgwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBwLTIuNSB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00NTUgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0cmFja2luZy13aWRlclwiPntsYW5nID09PSAnYXInID8gJ9mI2LXZgSDYp9mE2LPYsdivINmI2KfZhNio2YrYp9mGINin2YTZgdin2K7YsSAo2LnYsdio2YopOicgOiAnTGFuZGluZyBOYXJyYXRpdmUgUGFyYWdyYXBoIChBcmFiaWMpJ308L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIFxuICAgICAgICAgICAgICAgICAgICByb3dzPXszfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YnVpbGRlckNvbmZpZy5oZWFkZXIuZGVzY3JpcHRpb25BciB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogeyAuLi5idWlsZGVyQ29uZmlnLmhlYWRlciwgZGVzY3JpcHRpb25BcjogZS50YXJnZXQudmFsdWUgfVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS84MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcC0yLjUgdGV4dC13aGl0ZSBmb250LXNhbnMgdGV4dC1yaWdodCBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00NTUgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0cmFja2luZy13aWRlclwiPntsYW5nID09PSAnYXInID8gJ9mI2LXZgSDYp9mE2LPYsdivINmI2KfZhNio2YrYp9mGINin2YTZgdin2K7YsSAo2KXZhtis2YTZitiy2YopOicgOiAnTGFuZGluZyBOYXJyYXRpdmUgUGFyYWdyYXBoIChFbmdsaXNoKSd9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBcbiAgICAgICAgICAgICAgICAgICAgcm93cz17M31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2J1aWxkZXJDb25maWcuaGVhZGVyLmRlc2NyaXB0aW9uIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZUJ1aWxkZXJDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgIC4uLmJ1aWxkZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7IC4uLmJ1aWxkZXJDb25maWcuaGVhZGVyLCBkZXNjcmlwdGlvbjogZS50YXJnZXQudmFsdWUgfVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS84MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcC0yLjUgdGV4dC13aGl0ZSBmb250LXNhbnMgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBJTUFHRSBDT05UUk9MIFNZU1RFTTogSGVhZGVyIEJhY2tncm91bmQgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZm9udC1leHRyYWJvbGQgdGV4dC1bIzIyRDNFRV1cIj57bGFuZyA9PT0gJ2FyJyA/ICfZhti42KfZhSDYp9mE2KrYrdmD2YUg2KfZhNi02KfZhdmEINio2KfZhNi12YjYsSDZiNin2YTYrtmE2YHZitin2KonIDogJ0RZTkFNSUMgSU1BR0UgQ09OVFJPTCBEUkFXRVInfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IGJnLXdoaXRlL1swLjAyXSBib3JkZXIgYm9yZGVyLXdoaXRlLzUgcm91bmRlZC14bCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICAgIHtidWlsZGVyQ29uZmlnLmhlYWRlci5iYWNrZ3JvdW5kSW1hZ2UgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBoLTI0IHJvdW5kZWQtbGcgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItd2hpdGUvMTAgYmctYmxhY2svNDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtidWlsZGVyQ29uZmlnLmhlYWRlci5iYWNrZ3JvdW5kSW1hZ2V9IFxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiSGVybyBiYWNrZ3JvdW5kXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ibGFjay81MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSBiZy1ibGFjay81MCBib3JkZXIgYm9yZGVyLWJyYW5kLXByaW1hcnkvMjAgcHgtMiBweS0wLjUgcm91bmRlZCB0ZXh0LWJyYW5kLXByaW1hcnkgdXBwZXJjYXNlIGZvbnQtZXh0cmFib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9mF2LnYp9mK2YbYqSDYp9mE2K7ZhNmB2YrYqSDYp9mE2K3ZitipINin2YTZhti02LfYqSDZhNmF2LnYsdi2INin2YTYrtmI2YTZiicgOiAnQUNUSVZFIExBTkRJTkcgSEVSTyBCQU5ORVIgSU1BR0UnfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmJ1aWxkZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogeyAuLi5idWlsZGVyQ29uZmlnLmhlYWRlciwgYmFja2dyb3VuZEltYWdlOiAnJyB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0yIHJpZ2h0LTIgcC0xLjUgYmctcmVkLTk1MC84MCBob3ZlcjpiZy1yZWQtOTAwIGJvcmRlciBib3JkZXItcmVkLTUwMC8xMCByb3VuZGVkLXhsIHRleHQtcmVkLTQwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlJlbW92ZSBJbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwIHRleHQtWzlweF0gYmxvY2sgdXBwZXJjYXNlXCI+e2xhbmcgPT09ICdhcicgPyAn2LHYp9io2Lcg2YXZhNmBINin2YTYtdmI2LHYqSDYp9mE2YXYqNin2LTYsTonIDogJ0xvYWQgaW1hZ2UgZnJvbSBleHRlcm5hbCBVUkwgTGluazonfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly8uLi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2J1aWxkZXJDb25maWcuaGVhZGVyLmJhY2tncm91bmRJbWFnZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmJ1aWxkZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogeyAuLi5idWlsZGVyQ29uZmlnLmhlYWRlciwgYmFja2dyb3VuZEltYWdlOiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vODAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHAtMi41IHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMCB0ZXh0LVs5cHhdIGJsb2NrIHVwcGVyY2FzZVwiPntsYW5nID09PSAnYXInID8gJ9ij2Ygg2LHZgdi5INmF2YTZgSDZhdio2KfYtNix2Kkg2YXZhiDYrNmH2KfYstmDOicgOiAnT3IgY29udmVydCBpbWFnZSBmaWxlIHRvIEJhc2U2NDonfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmJ1aWxkZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjogeyAuLi5idWlsZGVyQ29uZmlnLmhlYWRlciwgYmFja2dyb3VuZEltYWdlOiByZWFkZXIucmVzdWx0IGFzIHN0cmluZyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YUg2KrYrdmI2YrZhCDYp9mE2YXZhNmBINmI2KrYudmK2YrZhtmHINio2YbYrNin2K0hJyA6ICdGaWxlIHRyYW5zZm9ybWVkIHRvIEJhc2U2NCB2ZWN0b3IhJywgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXdoaXRlLzUgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHAtMS41IHRleHQtZ3JheS00MDAgZmlsZTpiZy1icmFuZC1wcmltYXJ5IGZpbGU6Ym9yZGVyLW5vbmUgZmlsZTp0ZXh0LXdoaXRlIGZpbGU6cHgtMi41IGZpbGU6cHktMSBmaWxlOnJvdW5kZWQtbWQgZmlsZTp0ZXh0LVsxMHB4XSBmaWxlOmN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogQ3VzdG9tIEluamVjdGVkIEhUTUwgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIGJsb2NrIG10LTJcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1icmFuZC1hY2NlbnQgdGV4dC1bMTBweF0gZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2LXZhtiv2YjZgiDYp9mE2YPZiNivINin2YTZhdiu2LXYtSAoU2FmZSBIVE1MIEluamVjdG9yKTonIDogJ0N1c3RvbSBIVE1MIEluamVjdG9yIFBhbmVsIChCYW5uZXJzLCBQcm9tb3MpJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0xLjUgcHktMC41IGJnLWJyYW5kLXByaW1hcnkvMTAgYm9yZGVyIGJvcmRlci1icmFuZC1wcmltYXJ5LzIwIHRleHQtWzdweF0gZm9udC1leHRyYWJvbGQgdGV4dC1icmFuZC1wcmltYXJ5IHVwcGVyY2FzZSByb3VuZGVkXCI+RW50ZXJwcmlzZSBOb2RlPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIFxuICAgICAgICAgICAgICAgICAgcm93cz17NH1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZS5nLiA8ZGl2IGNsYXNzPSdwLTUgYmctZ3JhZGllbnQtdG8tciBmcm9tLXRlYWwtOTUwLzQwIHRleHQtbGVmdCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXRlYWwtNTAwLzIwIHRleHQtdGVhbC00MDAnPjxwIGNsYXNzPSdmb250LWJvbGQgdXBwZXJjYXNlJz5GTEFTSCBERUFMPC9wPjxwIGNsYXNzPSd0ZXh0LVsxMHB4XSBtdC0xJz5TYXZlIHVwIHRvIDEyJSBvbiBTY29vdGVyIGFjY2Vzc29yaWVzIHRoaXMgd2Vlay48L3A+PC9kaXY+XCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmhlYWRlci5jdXN0b21IdG1sIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7IC4uLmJ1aWxkZXJDb25maWcuaGVhZGVyLCBjdXN0b21IdG1sOiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vODAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHAtMyB0ZXh0LXdoaXRlIGZvbnQtbW9ubyBsZWFkaW5nLXJlbGF4ZWQgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgIGRpcj1cImx0clwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFdoYXRzQXBwIEludm9pY2UgTnVtYmVyICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9jayBtdC00XCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tNTAwIHRleHQtWzEwcHhdIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9ix2YLZhSDYp9mE2YjYp9iq2LPYp9ioINmE2KfYs9iq2YTYp9mFINin2YTZgdmI2KfYqtmK2LE6JyA6ICdXaGF0c0FwcCBOdW1iZXIgZm9yIEludm9pY2VzOid9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuICsyMDEwMTIzNDU2NzhcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2J1aWxkZXJDb25maWcuaW52b2ljZVdoYXRzYXBwTnVtYmVyIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgaW52b2ljZVdoYXRzYXBwTnVtYmVyOiBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzgwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBwLTMgdGV4dC13aGl0ZSBmb250LW1vbm8gbGVhZGluZy1yZWxheGVkIGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICBkaXI9XCJsdHJcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBUSEVNRSBDT05GSUcgRk9STSAqL31cbiAgICAgICAgICB7YWN0aXZlQnVpbGRlclRhYiA9PT0gJ3RoZW1lJyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCBhbmltYXRlLWZhZGUtaW4gdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0ZXh0LWJyYW5kLXNlY29uZGFyeSB0cmFja2luZy13aWRlc3QgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItMS41IGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9mE2YjYrdipINin2YTYo9mE2YjYp9mGINmI2KfZhNiq2K3Zg9mFINin2YTYtNin2YXZhCDZhNmE2YXZiNmC2LknIDogJ0JyYW5kaW5nIFBhbGV0dGUgQ29sb3JzICYgU2NhbGUgQ29udHJvbHMnfVxuICAgICAgICAgICAgICA8L2g0PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtNCBnYXAtNCBtdC0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDU1IHRleHQtWzlweF0gdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGJsb2NrXCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNmE2YjZhiDYp9mE2KrYsdmI2YrYrNmKINin2YTYo9iz2KfYs9mKOicgOiAnUHJpbWFyeSBCcmFuZCBhY2NlbnQ6J308L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNvbG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YnVpbGRlckNvbmZpZy50aGVtZS5wcmltYXJ5Q29sb3IgfHwgJyM2MzY2RjEnfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWU6IHsgLi4uYnVpbGRlckNvbmZpZy50aGVtZSwgcHJpbWFyeUNvbG9yOiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy05IGgtOSByb3VuZGVkLWxnIHBvaW50ZXItZXZlbnRzLWF1dG8gY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOXB4XSB1cHBlcmNhc2VcIj57YnVpbGRlckNvbmZpZy50aGVtZS5wcmltYXJ5Q29sb3J9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00NTUgdGV4dC1bOXB4XSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgYmxvY2tcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YTZiNmGINin2YTYqtix2YjZitis2Yog2KfZhNir2KfZhtmI2Yo6JyA6ICdTZWNvbmRhcnkgQnJhbmQgY29sb3I6J308L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNvbG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YnVpbGRlckNvbmZpZy50aGVtZS5zZWNvbmRhcnlDb2xvciB8fCAnI0E4NTVGNyd9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmJ1aWxkZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVtZTogeyAuLi5idWlsZGVyQ29uZmlnLnRoZW1lLCBzZWNvbmRhcnlDb2xvcjogZS50YXJnZXQudmFsdWUgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctOSBoLTkgcm91bmRlZC1sZyBwb2ludGVyLWV2ZW50cy1hdXRvIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzlweF0gdXBwZXJjYXNlXCI+e2J1aWxkZXJDb25maWcudGhlbWUuc2Vjb25kYXJ5Q29sb3J9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00NTUgdGV4dC1bOXB4XSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgYmxvY2tcIj57bGFuZyA9PT0gJ2FyJyA/ICfZhNmI2YYg2KfZhNmH2YrYr9ixINmI2LTYp9ix2KfYqiDYp9mE2LnYsdi2OicgOiAnU2hvd3Jvb20gSGlnaGxpZ2h0IGJhZGdlOid9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjb2xvclwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2J1aWxkZXJDb25maWcubWFpbkNvbnRlbnQuaWNvbkNvbG9yIHx8ICcjMjJEM0VFJ31cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZUJ1aWxkZXJDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5Db250ZW50OiB7IC4uLmJ1aWxkZXJDb25maWcubWFpbkNvbnRlbnQsIGljb25Db2xvcjogZS50YXJnZXQudmFsdWUgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctOSBoLTkgcm91bmRlZC1sZyBwb2ludGVyLWV2ZW50cy1hdXRvIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzlweF0gdXBwZXJjYXNlXCI+e2J1aWxkZXJDb25maWcubWFpbkNvbnRlbnQuaWNvbkNvbG9yfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDU1IHRleHQtWzlweF0gdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGJsb2NrXCI+e2xhbmcgPT09ICdhcicgPyAn2YTZiNmGINin2YTYrtmE2YHZitipINin2YTYo9iz2KfYs9mK2Kk6JyA6ICdDaGFtYmVyIENhbnZhcyBCZzonfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY29sb3JcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLnRoZW1lLmJhY2tncm91bmRDb2xvciB8fCAnIzBCMEYxQSd9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmJ1aWxkZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVtZTogeyAuLi5idWlsZGVyQ29uZmlnLnRoZW1lLCBiYWNrZ3JvdW5kQ29sb3I6IGUudGFyZ2V0LnZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTkgaC05IHJvdW5kZWQtbGcgcG9pbnRlci1ldmVudHMtYXV0byBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs5cHhdIHVwcGVyY2FzZVwiPntidWlsZGVyQ29uZmlnLnRoZW1lLmJhY2tncm91bmRDb2xvcn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEJvcmRlcnMgUmFkaXVzIG9wdGlvbiAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgYmxvY2sgbXQtNCBwLTQgYm9yZGVyIGJvcmRlci13aGl0ZS81IHJvdW5kZWQtMnhsIGJnLXdoaXRlL1swLjAxXVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtZ3JheS0zMDAgYmxvY2sgbWItMVwiPntsYW5nID09PSAnYXInID8gJ9iy2YjYp9mK2Kcg2KfZhtit2YbYp9ihINin2YTYo9iy2LHYp9ixINmI2KfZhNio2LfYp9mC2KfYqiAoUmFkaXVzIHByb2ZpbGUpOicgOiAnQm9yZGVycyBhbmQgYnV0dG9ucyBib3JkZXItcmFkaXVzIHByb2ZpbGVzOid9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIHsoW1xuICAgICAgICAgICAgICAgICAgICB7IGlkOiAncm91bmRlZC1ub25lJywgbGFiZWw6IGxhbmcgPT09ICdhcicgPyAn2K3Yp9ivINix2KfYr9mK2YPYp9mE2YogKFNoYXJwIEJydXRhbGlzdCknIDogJ1NoYXJwIEJvdW5kcyAobm9uZSknIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6ICdyb3VuZGVkLW1kJywgbGFiZWw6IGxhbmcgPT09ICdhcicgPyAn2LTYqNmHINiv2KfYptix2Yog2YPZhNin2LPZitmD2YogKFN0YW5kYXJkKScgOiAnU2VtaS1Sb3VuZCAobWQpJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IGlkOiAncm91bmRlZC14bCcsIGxhYmVsOiBsYW5nID09PSAnYXInID8gJ9iy2KfZiNmK2Kkg2YXYsdmK2K3YqSDZgdin2K7YsdipIChDeWJlciknIDogJ0N5YmVyIEx1eHVyeSAoeGwpJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IGlkOiAncm91bmRlZC0zeGwnLCBsYWJlbDogbGFuZyA9PT0gJ2FyJyA/ICfYqtmC2YjYsyDZg9io2LPZiNmE2Kkg2KfZhtiz2YrYp9io2YogKFJvdW5kKScgOiAnQ2Fwc3VsZSBQcm9maWxlICgzeGwpJyB9XG4gICAgICAgICAgICAgICAgICBdIGFzIGNvbnN0KS5tYXAoKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNTZWwgPSBidWlsZGVyQ29uZmlnLnRoZW1lLmJ1dHRvblJhZGl1cyA9PT0gci5pZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3IuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHVwZGF0ZUJ1aWxkZXJDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVtZTogeyAuLi5idWlsZGVyQ29uZmlnLnRoZW1lLCBidXR0b25SYWRpdXM6IHIuaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSB0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgZm9udC1tb25vIHRyYWNraW5nLXRpZ2h0IGJvcmRlciByb3VuZGVkLWxnIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsID8gJ2JnLWJyYW5kLXByaW1hcnkgdGV4dC13aGl0ZSBib3JkZXItYnJhbmQtcHJpbWFyeScgOiAnYmctd2hpdGUvNSBib3JkZXItd2hpdGUvNSBob3Zlcjpib3JkZXItd2hpdGUvMTAgdGV4dC1ncmF5LTQwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTcGFjaW5nIG11bHRpcGxpZXIgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIGJsb2NrIG10LTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBmb250LWJvbGQgdGV4dC1bOXB4XSB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9mF2YLYp9mK2YrYsyDYqtio2KfYudivINin2YTYudmG2KfYtdixINmI2KfZhNio2LfYp9mC2KfYqiAoU3BhY2luZyBtdWx0aXBsaWVyKTonIDogJ0ludGVyYWN0aXZlIFNwYWNpbmcgTXVsdGlwbGllciBTY2FsZTonfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYnJhbmQtYWNjZW50XCI+e2J1aWxkZXJDb25maWcudGhlbWUuc3BhY2luZ011bHRpcGxpZXIgfHwgMS4wfXg8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgIG1pbj1cIjAuNVwiXG4gICAgICAgICAgICAgICAgICBtYXg9XCIxLjVcIlxuICAgICAgICAgICAgICAgICAgc3RlcD1cIjAuMjVcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2J1aWxkZXJDb25maWcudGhlbWUuc3BhY2luZ011bHRpcGxpZXIgfHwgMS4wfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgdGhlbWU6IHsgLi4uYnVpbGRlckNvbmZpZy50aGVtZSwgc3BhY2luZ011bHRpcGxpZXI6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpIH1cbiAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGFjY2VudC1icmFuZC1hY2NlbnQgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bOHB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+Q29tcGFjdCBzcGFjaW5nICgwLjV4KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlN0YW5kYXJkIHNpemUgKDEuMHgpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+U3BhY2lvdXMgbGF5b3V0ICgxLjV4KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIEZPTlQgU0VMRUNUT1IgRk9STSAqL31cbiAgICAgICAgICB7YWN0aXZlQnVpbGRlclRhYiA9PT0gJ2ZvbnQnICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IGFuaW1hdGUtZmFkZS1pbiB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRleHQtYnJhbmQtc2Vjb25kYXJ5IHRyYWNraW5nLXdpZGVzdCBib3JkZXItYiBib3JkZXItd2hpdGUvNSBwYi0xLjUgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2YXYqtit2YPZhSDYrti32YjYtyDZiNiq2YrYqNmI2LrYsdin2YHZitin2Kog2KfZhNmF2YjZgti5INin2YTZhdmB2LXZhNipJyA6ICdEZXRhaWxlZCBNdWx0aS1Gb250IFR5cG9ncmFwaHkgQ29udHJvbGxlcnMnfVxuICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTUwIGZvbnQtc2FucyBtdC0wLjUgbGVhZGluZy1ub3JtYWxcIj5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyBcbiAgICAgICAgICAgICAgICAgID8gJ9in2K7YqtixINiq2K7YtdmK2LUg2K7YtyDZhdmG2YHYtdmEINmE2YPZhCDYrNiy2KEg2YXZhiDYo9is2LLYp9ihINin2YTZhdmI2YLYuSAo2KfZhNi52YbYp9mI2YrZhiDYp9mE2YPYqNmK2LHYqdiMINin2YTYudmG2KfZiNmK2YYg2KfZhNmB2LHYudmK2KnYjCDZhti12YjYtSDYp9mE2YjYtdmBINmI2KfZhNmB2YLYsdin2KopLidcbiAgICAgICAgICAgICAgICAgIDogJ0N1c3RvbWl6ZSBzZXBhcmF0ZSBmb250cyBmb3IgaGVhZGluZ3MsIHNtYWxsIGxhYmVscy9idXR0b25zLCBhbmQgbWFpbiBib2R5IGRlc2NyaXB0aW9uIHBhcmFncmFwaHMuJ31cbiAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgIHsvKiBTdWItdGFicyBzZWxlY3RvciBmb3IgZm9udCB0YXJnZXQgc2NvcGUgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtMSBiZy1bIzExMTgyN10vODUgcC0xIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci13aGl0ZS81IG10LTNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEZvbnRUYXJnZXQoJ2hlYWRpbmdzJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweS0yIHB4LTEgdGV4dC1bMTBweF0gZm9udC1ibGFjayB0cmFja2luZy13aWRlciB1cHBlcmNhc2Ugcm91bmRlZC1sZyB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LWNlbnRlciBsZWFkaW5nLW5vbmUgJHtcbiAgICAgICAgICAgICAgICAgICAgZm9udFRhcmdldCA9PT0gJ2hlYWRpbmdzJ1xuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWJyYW5kLXByaW1hcnkgdGV4dC13aGl0ZSBzaGFkb3ctbWQgc2hhZG93LWJyYW5kLXByaW1hcnkvMjAgZm9udC1ib2xkJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy13aGl0ZS81J1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSBmb250LWV4dHJhYm9sZFwiPntsYW5nID09PSAnYXInID8gJ9in2YTYudmG2KfZiNmK2YYg2KfZhNix2KbZitiz2YrYqScgOiAnSGVhZGluZ3MnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzcuNXB4XSBvcGFjaXR5LTc1IGZvbnQtbW9ubyBtdC0xIHRleHQtY2VudGVyIHRydW5jYXRlIG1heC13LVsxMDBweF1cIiBkaXI9XCJsdHJcIj5cbiAgICAgICAgICAgICAgICAgICAge2J1aWxkZXJDb25maWcuZm9udEhlYWRpbmdzIHx8IGJ1aWxkZXJDb25maWcuZm9udCB8fCAnU3BhY2UgR3JvdGVzayd9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEZvbnRUYXJnZXQoJ3N1YmhlYWRpbmdzJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweS0yIHB4LTEgdGV4dC1bMTBweF0gZm9udC1ibGFjayB0cmFja2luZy13aWRlciB1cHBlcmNhc2Ugcm91bmRlZC1sZyB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LWNlbnRlciBsZWFkaW5nLW5vbmUgJHtcbiAgICAgICAgICAgICAgICAgICAgZm9udFRhcmdldCA9PT0gJ3N1YmhlYWRpbmdzJ1xuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWJyYW5kLXNlY29uZGFyeSB0ZXh0LXdoaXRlIHNoYWRvdy1tZCBzaGFkb3ctYnJhbmQtc2Vjb25kYXJ5LzIwIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctd2hpdGUvNSdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1leHRyYWJvbGRcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2LnZhtin2YjZitmGINin2YTZgdix2LnZitipJyA6ICdTdWJoZWFkaW5ncyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bNy41cHhdIG9wYWNpdHktNzUgZm9udC1tb25vIG10LTEgdGV4dC1jZW50ZXIgdHJ1bmNhdGUgbWF4LXctWzEwMHB4XVwiIGRpcj1cImx0clwiPlxuICAgICAgICAgICAgICAgICAgICB7YnVpbGRlckNvbmZpZy5mb250U3ViaGVhZGluZ3MgfHwgYnVpbGRlckNvbmZpZy5mb250IHx8ICdDYWlybyd9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEZvbnRUYXJnZXQoJ2JvZHknKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB5LTIgcHgtMSB0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVyIHVwcGVyY2FzZSByb3VuZGVkLWxnIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtY2VudGVyIGxlYWRpbmctbm9uZSAke1xuICAgICAgICAgICAgICAgICAgICBmb250VGFyZ2V0ID09PSAnYm9keSdcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1bIzIyRDNFRV0gdGV4dC1ibGFjayBzaGFkb3ctbWQgc2hhZG93LVsjMjJEM0VFXS8yMCBmb250LWV4dHJhYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctd2hpdGUvNSdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1leHRyYWJvbGRcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YbYtdmI2LUg2YjYp9mE2YjYtdmBJyA6ICdCb2R5IFRleHQnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzcuNXB4XSBvcGFjaXR5LTc1IGZvbnQtbW9ubyBtdC0xIHRleHQtY2VudGVyIHRydW5jYXRlIG1heC13LVsxMDBweF1cIiBkaXI9XCJsdHJcIj5cbiAgICAgICAgICAgICAgICAgICAge2J1aWxkZXJDb25maWcuZm9udEJvZHkgfHwgYnVpbGRlckNvbmZpZy5mb250IHx8ICdJbnRlcid9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBEeW5hbWljIGluc3RydWN0aW9uIGZvciB0aGUgc2VsZWN0ZWQgZm9udCBjYXRlZ29yeSAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZS9bMC4wMV0gYm9yZGVyIGJvcmRlci13aGl0ZS81IHJvdW5kZWQteGwgcC0yLjUgdGV4dC1jZW50ZXIgdGV4dC1bMTBweF0gdGV4dC1ncmF5LTQwMCBmb250LXNhbnMgbXQtMlwiPlxuICAgICAgICAgICAgICAgIHtmb250VGFyZ2V0ID09PSAnaGVhZGluZ3MnICYmIChcbiAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICDwn5GJIHtsYW5nID09PSAnYXInIFxuICAgICAgICAgICAgICAgICAgICAgID8gJ9iq2LnYr9mK2YQg2K7YtyDYp9mE2LnZhtin2YjZitmGINin2YTYsdim2YrYs9mK2Kkg2KfZhNmD2KjZitix2KkgKNmF2KvZhCDYp9iz2YUg2KfZhNmF2LnYsdi2INmB2Yog2KfZhNmH2YrYr9ix2Iwg2YjYudmG2KfZiNmK2YYg2KfZhNmB2KbYp9iqINmI2KfZhNij2YLYs9in2YUpLicgXG4gICAgICAgICAgICAgICAgICAgICAgOiAnQ29uZmlndXJpbmcgbWFpbiBoZXJvIGxhYmVscywgbGFyZ2UgbW9kdWxlIHNlY3Rpb24gdGl0bGVzLCBhbmQgaGVhZGVyIHRleHQuJ31cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtmb250VGFyZ2V0ID09PSAnc3ViaGVhZGluZ3MnICYmIChcbiAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICDwn5GJIHtsYW5nID09PSAnYXInIFxuICAgICAgICAgICAgICAgICAgICAgID8gJ9iq2LnYr9mK2YQg2K7YtyDYp9mE2LnZhtin2YjZitmGINin2YTZgdix2LnZitip2Iwg2KfZhNij2LLYsdin2LHYjCDYp9mE2LTYp9ix2KfYqtiMINmI2KPZgtiz2KfZhSDYp9mE2KrYtdmB2YrYqSDZiNin2YTZhNmI2KzZiCDYp9mE2YHYsdi52Yog2YTZhNmF2KrYsdmILicgXG4gICAgICAgICAgICAgICAgICAgICAgOiAnQ29uZmlndXJpbmcgY2F0ZWdvcmllcyBzbG90cywgcHJpbWFyeSBmaWx0ZXIgcGlsbHMsIGJhZGdlcywgYW5kIGFjdGlvbiBidXR0b25zLid9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7Zm9udFRhcmdldCA9PT0gJ2JvZHknICYmIChcbiAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICDwn5GJIHtsYW5nID09PSAnYXInIFxuICAgICAgICAgICAgICAgICAgICAgID8gJ9iq2LnYr9mK2YQg2K7YtyDYp9mE2YbYtdmI2LUg2KfZhNi52KfYr9mK2KnYjCDZgdmC2LHYp9iqINin2YTZiNi12YEg2K/Yp9iu2YQg2KfZhNmD2LHZiNiq2Iwg2KfZhNiq2YHYp9i12YrZhCDYp9mE2KrZgtmG2YrYqdiMINmI2YHZiNiq2LEg2KfZhNmF2LnYsdi2LicgXG4gICAgICAgICAgICAgICAgICAgICAgOiAnQ29uZmlndXJpbmcgc3RhbmRhcmQgcGFyYWdyYXBoIHNwZWNpZmljYXRpb25zLCBpdGVtIGRldGFpbHMsIGNhdGFsb2dzIGNvbnRleHQsIGFuZCBmb290ZXIgaW5mby4nfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBUaGUgMTAgZm9udHMgbGlzdCAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC0zIG10LTNcIj5cbiAgICAgICAgICAgICAgICB7KFtcbiAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ0ludGVyJywgZGVzYzogbGFuZyA9PT0gJ2FyJyA/ICfYp9mE2K7YtyDYp9mE2LPZiNmK2LPYsdmKINin2YTYo9mG2YrZgiDZiNin2YTZgtin2KjZhCDZhNmE2YLYsdin2KHYqSDYp9mE2LnYp9mE2YrYqScgOiAnU2xlZWssIFN3aXNzIGhpZ2hseSBsZWdpYmxlIHRlY2hub2xvZ3kgZGlzcGxheScgfSxcbiAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ1BvcHBpbnMnLCBkZXNjOiBsYW5nID09PSAnYXInID8gJ9mH2YbYr9iz2Yog2K3Yr9mK2Ksg2YXZhNin2KbZhSDZhNmI2KfYrNmH2KfYqiDYp9mE2YXYs9iq2YLYqNmEJyA6ICdNb2Rlcm4gZW5lcmdldGljIGdlb21ldHJpYyBzYW5zLXNlcmlmIHN0YW5kYXJkJyB9LFxuICAgICAgICAgICAgICAgICAgeyBuYW1lOiAnTW9udHNlcnJhdCcsIGRlc2M6IGxhbmcgPT09ICdhcicgPyAn2LnYsdmK2LYg2YjYrNix2YrYodiMINmF2K7Ytdi1INmE2YTYudmG2KfZiNmK2YYg2KfZhNmE2KfZgdiq2KknIDogJ0FyY2hpdGVjdHVyYWxseSBib2xkIHN0cnVjdHVyYWwgZGlzcGxheScgfSxcbiAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ0NhaXJvJywgZGVzYzogbGFuZyA9PT0gJ2FyJyA/ICfYp9mE2K7YtyDYp9mE2LnYsdio2Yog2KfZhNmF2LnYp9i12LEg2KfZhNij2YPYq9ixINi02LnYqNmK2Kkg2YjZgtmI2KknIDogJ0hpZ2ggY29udHJhc3Qgc3RhbmRhcmQgZm9yIGNvbnRlbXBvcmFyeSBBcmFiaWMnIH0sXG4gICAgICAgICAgICAgICAgICB7IG5hbWU6ICdUYWphd2FsJywgZGVzYzogbGFuZyA9PT0gJ2FyJyA/ICfYrti3INi52LHYqNmKINmG2K3ZitmBINmI2KPZhtmK2YIg2LDZiCDYt9in2KjYuSDYqtit2LHZitix2Yog2YXYqtmF2YrYsicgOiAnRWxlZ2FudCBzbGltIGhpZ2gtY29udHJhc3QgZWRpdG9yaWFsIGFyYWJpYycgfSxcbiAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ0lCTSBQbGV4IFNhbnMnLCBkZXNjOiBsYW5nID09PSAnYXInID8gJ9iu2Lcg2YPZiNivINiq2YLZhtmKINin2K3Yqtix2KfZgdmKINi52KfZhNmKINin2YTYr9mC2KknIDogJ0VuZ2luZWVyaW5nLWluc3BpcmVkIHByb2Zlc3Npb25hbCBzeXN0ZW0gZm9udCcgfSxcbiAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ09wZW4gU2FucycsIGRlc2M6IGxhbmcgPT09ICdhcicgPyAn2KrYtdmF2YrZhSDZg9mE2KfYs9mK2YPZiiDZhti42YrZgSDZiNmF2LHZititINmE2YTYudmK2YYnIDogJ0hpZ2hseSBiYWxhbmNlZCBuZXV0cmFsIGNvbnN1bWVyIGxheW91dCcgfSxcbiAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ0xhdG8nLCBkZXNjOiBsYW5nID09PSAnYXInID8gJ9iu2Lcg2KrZg9mG2YjZhNmI2KzZiiDZhdmE2KfYptmFINmE2YTZhti12YjYtSDYp9mE2YHYsdi52YrYqSDZiNin2YTZgdmC2LHYp9iqJyA6ICdXYXJtIHN0cnVjdHVyYWwgZGlzcGxheSB0eXBvZ3JhcGh5IHN0YW5kYXJkJyB9LFxuICAgICAgICAgICAgICAgICAgeyBuYW1lOiAnTnVuaXRvJywgZGVzYzogbGFuZyA9PT0gJ2FyJyA/ICfYrti3INmF2LPYqtiv2YrYsSDZiti52LfZiiDYrdmK2YjZitipINmI2KrZgdin2LnZhNmK2Kkg2YTZhNmF2YjZgti5JyA6ICdDdXJ2ZWQgZnJpZW5kbHkgY29uc3VtZXIgaW50ZXJhY3RpdmUgZm9udCcgfSxcbiAgICAgICAgICAgICAgICAgIHsgbmFtZTogJ1NwYWNlIEdyb3Rlc2snLCBkZXNjOiBsYW5nID09PSAnYXInID8gJ9iu2Lcg2YXYs9iq2YLYqNmE2Yog2KjZhNmF2LPYqSDZhdmGINiq2LXZhdmK2YUgQnJ1dGFsaXN0INin2YTZh9mG2K/Ys9mKINmE2YTZhdmI2KrZiNiz2YrZg9mE2KfYqicgOiAnRnV0dXJpc3RpYyBtb2Rlcm4gYnJ1dGFsaXN0IHRlY2ggZGlzcGxheScgfVxuICAgICAgICAgICAgICAgIF0gYXMgY29uc3QpLm1hcCgoZikgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNTZWwgPSAoZm9udFRhcmdldCA9PT0gJ2hlYWRpbmdzJyBcbiAgICAgICAgICAgICAgICAgICAgPyBidWlsZGVyQ29uZmlnLmZvbnRIZWFkaW5ncyB8fCBidWlsZGVyQ29uZmlnLmZvbnQgfHwgJ1NwYWNlIEdyb3Rlc2snXG4gICAgICAgICAgICAgICAgICAgIDogZm9udFRhcmdldCA9PT0gJ3N1YmhlYWRpbmdzJ1xuICAgICAgICAgICAgICAgICAgICAgID8gYnVpbGRlckNvbmZpZy5mb250U3ViaGVhZGluZ3MgfHwgYnVpbGRlckNvbmZpZy5mb250IHx8ICdDYWlybydcbiAgICAgICAgICAgICAgICAgICAgICA6IGJ1aWxkZXJDb25maWcuZm9udEJvZHkgfHwgYnVpbGRlckNvbmZpZy5mb250IHx8ICdJbnRlcicpID09PSBmLm5hbWU7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtmLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvbnRUYXJnZXQgPT09ICdoZWFkaW5ncycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQnVpbGRlckNvbmZpZyh7IC4uLmJ1aWxkZXJDb25maWcsIGZvbnRIZWFkaW5nczogZi5uYW1lIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb250VGFyZ2V0ID09PSAnc3ViaGVhZGluZ3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUJ1aWxkZXJDb25maWcoeyAuLi5idWlsZGVyQ29uZmlnLCBmb250U3ViaGVhZGluZ3M6IGYubmFtZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUJ1aWxkZXJDb25maWcoeyAuLi5idWlsZGVyQ29uZmlnLCBmb250Qm9keTogZi5uYW1lIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZVRvYXN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5nID09PSAnYXInIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYNiq2YUg2KrYutmK2YrYsSDYrti3ICR7Zm9udFRhcmdldCA9PT0gJ2hlYWRpbmdzJyA/ICfYp9mE2LnZhtin2YjZitmGINin2YTYsdim2YrYs9mK2KknIDogZm9udFRhcmdldCA9PT0gJ3N1YmhlYWRpbmdzJyA/ICfYp9mE2LnZhtin2YjZitmGINin2YTZgdix2LnZitipJyA6ICfYp9mE2YbYtdmI2LUg2YjYp9mE2YjYtdmBJ30g2KXZhNmJOiAke2YubmFtZX1gIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYFVwZGF0ZWQgJHtmb250VGFyZ2V0fSB0eXBvZ3JhcGh5IGxheW91dCB0bzogJHtmLm5hbWV9YCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMyBib3JkZXIgcm91bmRlZC14bCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBmbGV4IGZsZXgtY29sIHRleHQtbGVmdCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gZm9udFRhcmdldCA9PT0gJ2hlYWRpbmdzJyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1icmFuZC1wcmltYXJ5LzIwIGJvcmRlci1icmFuZC1wcmltYXJ5IHRleHQtd2hpdGUgc2hhZG93LW1kJyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZvbnRUYXJnZXQgPT09ICdzdWJoZWFkaW5ncydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWJyYW5kLXNlY29uZGFyeS8yMCBib3JkZXItYnJhbmQtc2Vjb25kYXJ5IHRleHQtd2hpdGUgc2hhZG93LW1kJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctWyMyMkQzRUVdLzIwIGJvcmRlci1bIzIyRDNFRV0gdGV4dC13aGl0ZSBzaGFkb3ctbWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXdoaXRlL1swLjAyXSBib3JkZXItd2hpdGUvNSBob3Zlcjpib3JkZXItd2hpdGUvMTAgdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgZm9udC1ib2xkIHRleHQteHMgZm9udC1wcmV2aWV3LSR7Zi5uYW1lLnJlcGxhY2UoL1xccysvZywgJycpfWB9IHN0eWxlPXt7IGZvbnRGYW1pbHk6IGZvbnRUb0Nzc01hcFtmLm5hbWVdIHx8IGBcIiR7Zi5uYW1lfVwiLCBzYW5zLXNlcmlmYCB9fT57Zi5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LVs5cHhdIHRleHQtZ3JheS01NTAgbXQtMC41IGxlYWRpbmctdGlnaHQgZm9udC1wcmV2aWV3LSR7Zi5uYW1lLnJlcGxhY2UoL1xccysvZywgJycpfWB9IHN0eWxlPXt7IGZvbnRGYW1pbHk6IGZvbnRUb0Nzc01hcFtmLm5hbWVdIHx8IGBcIiR7Zi5uYW1lfVwiLCBzYW5zLXNlcmlmYCB9fT57Zi5kZXNjfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogUmVhbC10aW1lIHR5cG9ncmFwaHkgcHJldmlldyBjYXJkICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItd2hpdGUvNSBiZy1bIzExMTgyN10vNDAgYmxvY2sgdGV4dC1sZWZ0IHNwYWNlLXktMiBtdC00XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOHB4XSBmb250LWJvbGQgdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IGJsb2NrXCI+e2xhbmcgPT09ICdhcicgPyAn2YXYudin2YrZhtipINiu2LfZiNi3INin2YTZiNin2KzZh9ipINin2YTYrdin2YTZitipINio2KfZhNmB2YfYsdizOicgOiAnQUNUSVZFIFRZUE9HUkFQSFkgTUlYIE1BVFJJWDonfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7LyogSGVhZGluZyBzdHlsZSBwcmV2aWV3ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdGV4dC1zbSBmb250LWJsYWNrIHRleHQtd2hpdGUgZm9udC1wcmV2aWV3LSR7KGJ1aWxkZXJDb25maWcuZm9udEhlYWRpbmdzIHx8IGJ1aWxkZXJDb25maWcuZm9udCB8fCAnU3BhY2UgR3JvdGVzaycpLnJlcGxhY2UoL1xccysvZywgJycpfWB9IHN0eWxlPXt7IGZvbnRGYW1pbHk6IGZvbnRUb0Nzc01hcFtidWlsZGVyQ29uZmlnLmZvbnRIZWFkaW5ncyB8fCBidWlsZGVyQ29uZmlnLmZvbnQgfHwgJ1NwYWNlIEdyb3Rlc2snXSB8fCBgXCIke2J1aWxkZXJDb25maWcuZm9udEhlYWRpbmdzIHx8IGJ1aWxkZXJDb25maWcuZm9udCB8fCAnU3BhY2UgR3JvdGVzayd9XCIsIHNhbnMtc2VyaWZgIH19PlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KfZhNiu2YjZhNmKINmF2YjYqtmI2LHYsiAtINmF2LnYsdi2INin2YTZhdiz2KrZgtio2YQg2KjZhdi12LEnIDogJ0VMS0hPTFkgTU9UT1JTIC0gRlVUVVJFIFNIT1dST09NJ31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBTdWJoZWFkaW5ncyBwcmV2aWV3ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdGV4dC1bMTFweF0gZm9udC1leHRyYWJvbGQgdGV4dC1bIzIyRDNFRV0gZm9udC1wcmV2aWV3LSR7KGJ1aWxkZXJDb25maWcuZm9udFN1YmhlYWRpbmdzIHx8IGJ1aWxkZXJDb25maWcuZm9udCB8fCAnQ2Fpcm8nKS5yZXBsYWNlKC9cXHMrL2csICcnKX1gfSBzdHlsZT17eyBmb250RmFtaWx5OiBmb250VG9Dc3NNYXBbYnVpbGRlckNvbmZpZy5mb250U3ViaGVhZGluZ3MgfHwgYnVpbGRlckNvbmZpZy5mb250IHx8ICdDYWlybyddIHx8IGBcIiR7YnVpbGRlckNvbmZpZy5mb250U3ViaGVhZGluZ3MgfHwgYnVpbGRlckNvbmZpZy5mb250IHx8ICdDYWlybyd9XCIsIHNhbnMtc2VyaWZgIH19PlxuICAgICAgICAgICAgICAgICAg4pqhIHtsYW5nID09PSAnYXInID8gJ9ij2YLZiNmJINin2YTZhdmI2KrZiNiz2YrZg9mE2KfYqiDZiNin2YTYp9iz2YPZiNiq2LHYsiDYp9mE2LDZg9mK2KknIDogJ1NVUFJFTUUgUEVSRk9STUFOQ0UgRUxFQ1RSSUMgJiBHQVMgU1VQRVJCSUtFUyd9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogQm9keSBwYXJhZ3JhcGggcHJldmlldyAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHRleHQtWzEwcHhdIHRleHQtZ3JheS00MDAgbGVhZGluZy1ub3JtYWwgbXQtMiBmb250LXByZXZpZXctJHsoYnVpbGRlckNvbmZpZy5mb250Qm9keSB8fCBidWlsZGVyQ29uZmlnLmZvbnQgfHwgJ0ludGVyJykucmVwbGFjZSgvXFxzKy9nLCAnJyl9YH0gc3R5bGU9e3sgZm9udEZhbWlseTogZm9udFRvQ3NzTWFwW2J1aWxkZXJDb25maWcuZm9udEJvZHkgfHwgYnVpbGRlckNvbmZpZy5mb250IHx8ICdJbnRlciddIHx8IGBcIiR7YnVpbGRlckNvbmZpZy5mb250Qm9keSB8fCBidWlsZGVyQ29uZmlnLmZvbnQgfHwgJ0ludGVyJ31cIiwgc2Fucy1zZXJpZmAgfX0+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyBcbiAgICAgICAgICAgICAgICAgICAgPyAn2YfYsNinINin2YTZhti1INmK2LnYqNixINi52YYg2KfZhNmI2LXZgSDYp9mE2K/ZgtmK2YIg2YjZg9in2YHYqSDZg9ix2YjYqiDYp9mE2YXZiNiq2YjYs9mK2YPZhNin2Kog2YjYs9in2LnYp9iqINin2YTYudmF2YQg2YjZhdmE2KfYrdi42KfYqiDYp9mE2LnYsdmI2LYg2KfZhNit2LXYsdmK2Kkg2KfZhNit2KfZhNmK2KkuJyBcbiAgICAgICAgICAgICAgICAgICAgOiAnVGhpcyBpcyBhIHNhbXBsZSBsYXlvdXQgZGVzY3JpcHRpb24gc2hvd2luZyB1c2VyIGRldGFpbHMgaW5zaWRlIG1vdG9yY3ljbGUgc3BlY3MgY2FyZHMgYW5kIGdlbmVyYWwgY2F0YWxvZyBmZWF0dXJlcy4nfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBHUklEIFNIT1dST09NIEVMRU1FTlRTICovfVxuICAgICAgICAgIHthY3RpdmVCdWlsZGVyVGFiID09PSAnbWFpbicgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTQgYW5pbWF0ZS1mYWRlLWluIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdGV4dC1icmFuZC1zZWNvbmRhcnkgdHJhY2tpbmctd2lkZXN0IGJvcmRlci1iIGJvcmRlci13aGl0ZS81IHBiLTEuNSBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2KrYrdmD2YUg2KfZhNmH2YrZg9mE2Yog2YjYrdis2LHYp9iqINi12KfZhNipINin2YTYudix2LYg2YjYp9mE2YXYqNmK2LnYp9iqJyA6ICdFbmFibGUvRGlzYWJsZSBWaXN1YWwgR3JpZCBFbGVtZW50cyd9XG4gICAgICAgICAgICAgIDwvaDQ+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYmctd2hpdGUvWzAuMDJdIGJvcmRlciBib3JkZXItd2hpdGUvNSByb3VuZGVkLTJ4bCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIiBkaXI9XCJsdHJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC13aGl0ZSB1cHBlcmNhc2VcIj57bGFuZyA9PT0gJ2FyJyA/ICfZhdix2KjYuSDZgdim2KfYqiDYp9mE2YXZiNiq2YjYs9mK2YPZhNin2Kog2YjYp9mE2LPZg9mI2KrYsdiyIChBIC8gQiAvIEMgLyBTKTonIDogJ0JlbnRvIENhdGVnb3JpZXMgZmlsdGVyaW5nIFNsb3Q6J308L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTUwMCBtdC0wLjVcIj57bGFuZyA9PT0gJ2FyJyA/ICfYpdi42YfYp9ixINi02LHZiti3INin2YTZgdim2KfYqiDZhNiq2LXZgdmK2Kkg2KfZhNmF2YjYqtmI2LPZitmD2YTYp9iqINin2YTZhdiq2KfYrdipLicgOiAnVG9nZ2xlIGNhdGVnb3J5IGZpbHRlciBncmlkIHRhZ3MuJ308L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17YnVpbGRlckNvbmZpZy5tYWluQ29udGVudC5zaG93Q2F0ZWdvcmllc31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgIG1haW5Db250ZW50OiB7IC4uLmJ1aWxkZXJDb25maWcubWFpbkNvbnRlbnQsIHNob3dDYXRlZ29yaWVzOiBlLnRhcmdldC5jaGVja2VkIH1cbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNSBoLTUgYWNjZW50LWJyYW5kLWFjY2VudCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLXQgYm9yZGVyLXdoaXRlLzUgcHQtM1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIiBkaXI9XCJsdHJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC13aGl0ZSB1cHBlcmNhc2VcIj57bGFuZyA9PT0gJ2FyJyA/ICfZgtiz2YUg2KfZhNmF2LHZg9io2Kkg2KfZhNix2KfYptiv2Kkg2KfZhNmF2YXZitiy2KkgKEZsYWdzaGlwIENlbnRlciBTdGFnZSk6JyA6ICdGbGFnc2hpcCBEaXNwbGF5IENlbnRlciBibG9jazonfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWdyYXktNTAwIG10LTAuNVwiPntsYW5nID09PSAnYXInID8gJ9il2LjZh9in2LEg2YTZiNitINi52LHYtiDYp9mE2K/Ysdin2KzYqSDYp9mE2LHYp9im2K/YqSDYp9mE2LbYrtmFINmB2Yog2LXYp9mE2Kkg2KfZhNi52LHYti4nIDogJ0xhcmdlIGJlbnRvIGNvbnRhaW5lciBoaWdobGlnaHRpbmcgZmlyc3QgZmxhZ3NoaXAuJ308L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17YnVpbGRlckNvbmZpZy5tYWluQ29udGVudC5zaG93RmVhdHVyZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICBtYWluQ29udGVudDogeyAuLi5idWlsZGVyQ29uZmlnLm1haW5Db250ZW50LCBzaG93RmVhdHVyZWQ6IGUudGFyZ2V0LmNoZWNrZWQgfVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy01IGgtNSBhY2NlbnQtYnJhbmQtYWNjZW50IGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItdCBib3JkZXItd2hpdGUvNSBwdC0zXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGVmdFwiIGRpcj1cImx0clwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIHVwcGVyY2FzZVwiPntsYW5nID09PSAnYXInID8gJ9i02KfYsdin2Kog2YjZhdi12YTZgtin2Kog2KfZhNiu2LXZhSDZiNin2YTYudix2YjYtiAoSG90IERlYWxzIFN0aWNrZXJzKTonIDogJ0VuYWJsZSBwcm9tb3Rpb25zIGFuZCBvcmlnaW5hbCBwcmljZSBzdGlja2VyczonfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWdyYXktNTAwIG10LTAuNVwiPntsYW5nID09PSAnYXInID8gJ9i02KfYsdin2Kog2KrYr9mEINio2LTZg9mEINmB2YjYsdmKINi52YTZiSDYqtmI2YHZitixINin2YTZhdmI2KrZiNiz2YrZg9mE2KfYqi4nIDogJ1RvZ2dsZSBwZXJjZW50YWdlcyBsYWJlbCBzdGlja2VyIHRhZ3MuJ308L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17YnVpbGRlckNvbmZpZy5tYWluQ29udGVudC5zaG93T2ZmZXJzfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZUJ1aWxkZXJDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgIC4uLmJ1aWxkZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgbWFpbkNvbnRlbnQ6IHsgLi4uYnVpbGRlckNvbmZpZy5tYWluQ29udGVudCwgc2hvd09mZmVyczogZS50YXJnZXQuY2hlY2tlZCB9XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTUgaC01IGFjY2VudC1icmFuZC1hY2NlbnQgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEN1c3RvbSBIZWFkbGluZSBuYW1lcyBlZGl0aW5nICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTQgbXQtMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQ0MCB0ZXh0LVs5cHhdIHVwcGVyY2FzZVwiPntsYW5nID09PSAnYXInID8gJ9i52YbZiNin2YYg2LXYp9mE2Kkg2KfZhNi52LHYtiDYqNin2YTYudix2KjZitipOicgOiAnU2hvd3Jvb20gc2VjdGlvbiBoZWFkZXIgKEFyYWJpYyknfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2J1aWxkZXJDb25maWcubWFpbkNvbnRlbnQudGl0bGVBciB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgIG1haW5Db250ZW50OiB7IC4uLmJ1aWxkZXJDb25maWcubWFpbkNvbnRlbnQsIHRpdGxlQXI6IGUudGFyZ2V0LnZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vODUgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHAtMi41IHRleHQtd2hpdGUgZm9udC1zYW5zIHRleHQtcmlnaHQgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDQ1IHRleHQtWzlweF0gdXBwZXJjYXNlXCI+e2xhbmcgPT09ICdhcicgPyAn2LnZhtmI2KfZhiDYtdin2YTYqSDYp9mE2LnYsdi2INio2KfZhNil2YbYrNmE2YrYstmK2Kk6JyA6ICdTaG93cm9vbSBzZWN0aW9uIGhlYWRlciAoRW5nbGlzaCknfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2J1aWxkZXJDb25maWcubWFpbkNvbnRlbnQudGl0bGUgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICBtYWluQ29udGVudDogeyAuLi5idWlsZGVyQ29uZmlnLm1haW5Db250ZW50LCB0aXRsZTogZS50YXJnZXQudmFsdWUgfVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS84NSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcC0yLjUgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIERZTkFNSUMgQ09MTEFQU0lCTEUgRk9PVEVSICovfVxuICAgICAgICAgIHthY3RpdmVCdWlsZGVyVGFiID09PSAnZm9vdGVyJyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCBhbmltYXRlLWZhZGUtaW4gdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0ZXh0LWJyYW5kLXNlY29uZGFyeSB0cmFja2luZy13aWRlc3QgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItMS41IGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9in2YTYqtit2YPZhSDYqNin2YTZgdmI2KrYsSDZiNin2YTZgtmG2YjYp9iqINin2YTYpdix2LTYp9iv2YrYqSDZiNiz2YjYtNmK2KfZhCDZhdmK2K/ZitinJyA6ICdGb290ZXIgQ29sbGFwc2luZyAmIENoYW5uZWxzIG9wdGlvbnMnfVxuICAgICAgICAgICAgICA8L2g0PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLXdoaXRlL1swLjAyXSBib3JkZXIgYm9yZGVyLXdoaXRlLzUgcm91bmRlZC0yeGwgc3BhY2UteS00XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCIgZGlyPVwibHRyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtd2hpdGUgdXBwZXJjYXNlXCI+e2xhbmcgPT09ICdhcicgPyAn2KXYuNmH2KfYsSDZiNil2K7Zgdin2KEg2KfZhNmB2YjYqtixINin2YTYudin2YUg2KjYp9mE2YPYp9mF2YQ6JyA6ICdHbG9iYWwgRm9vdGVyIFZpc2liaWxpdHkgVG9nZ2xlOid9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS01MDAgbXQtMC41XCI+e2xhbmcgPT09ICdhcicgPyAn2KjZhNmF2LPYqSDZiNin2K3Yr9ipINmK2YXZg9mG2YMg2K3YrNioINij2Ygg2KrZgdi52YrZhCDYp9mE2YHZiNiq2LEg2KjZhdi12LEuJyA6ICdUb2dnbGUgd2hldGhlciBmb290ZXIgc2VjdGlvbnMgZGlzcGxheSBhdCBhbGwuJ308L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17YnVpbGRlckNvbmZpZy5mb290ZXIudmlzaWJsZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgIGZvb3RlcjogeyAuLi5idWlsZGVyQ29uZmlnLmZvb3RlciwgdmlzaWJsZTogZS50YXJnZXQuY2hlY2tlZCB9XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTUgaC01IGFjY2VudC1icmFuZC1hY2NlbnQgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci10IGJvcmRlci13aGl0ZS81IHB0LTNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCIgZGlyPVwibHRyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtd2hpdGUgdXBwZXJjYXNlXCI+e2xhbmcgPT09ICdhcicgPyAn2K/YudmFINin2YTZgdmI2KrYsSDYp9mE2YLYp9io2YQg2YTZhNmB2KrYrSDZiNin2YTYt9mKIChDb2xsYXBzaWJsZSk6JyA6ICdFbmFibGUgRHJhd2VyIENvbGxhcHNpbmcgYmVoYXZpb3JzOid9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS01MDAgbXQtMC41XCI+e2xhbmcgPT09ICdhcicgPyAn2YrZhdmG2K0g2KfZhNi52YXZhCDYstixINmE2LfZiiDYp9mE2YHZiNiq2LEg2YTYqtmC2YTZitmEINin2YTZhdmE2KfYrdin2KouJyA6ICdQcm92aWRlIGV4cGFuZC9jb2xsYXBzZSBidXR0b25zIGZvciBjb21wYWN0IHByZXNlbnRhdGlvbi4nfTwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtidWlsZGVyQ29uZmlnLmZvb3Rlci5jb2xsYXBzaWJsZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgIGZvb3RlcjogeyAuLi5idWlsZGVyQ29uZmlnLmZvb3RlciwgY29sbGFwc2libGU6IGUudGFyZ2V0LmNoZWNrZWQgfVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy01IGgtNSBhY2NlbnQtYnJhbmQtYWNjZW50IGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTcGFjaW5nIGN1c3RvbSBkZXNjcmlwdGlvbiB0ZXh0cyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00IG10LTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9jayB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQ0NSB0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgYmxvY2tcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YjYtdmBINin2YTYr9in2K7ZhNmKINio2KfZhNmB2YjYqtixICjYudix2KjZiik6JyA6ICdGb290ZXIgTWFuaWZlc3RvIGRlc2NyaXB0aXZlIHRleHQgKEFyYWJpYyknfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgXG4gICAgICAgICAgICAgICAgICAgIHJvd3M9ezJ9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmZvb3Rlci5jb250ZW50QXIgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHsgLi4uYnVpbGRlckNvbmZpZy5mb290ZXIsIGNvbnRlbnRBcjogZS50YXJnZXQudmFsdWUgfVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS84MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcC0yIHRleHQtd2hpdGUgZm9udC1zYW5zIHRleHQtcmlnaHQgZm9jdXM6b3V0bGluZS1ub25lIGFuaW1hdGUtZmFkZS1pblwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIGJsb2NrIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00NDUgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGJsb2NrXCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNmI2LXZgSDYp9mE2K/Yp9iu2YTZiiDYqNin2YTZgdmI2KrYsSAo2KXZhtis2YTZitiy2YopOicgOiAnRm9vdGVyIE1hbmlmZXN0byBkZXNjcmlwdGl2ZSB0ZXh0IChFbmdsaXNoKSd9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBcbiAgICAgICAgICAgICAgICAgICAgcm93cz17Mn1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2J1aWxkZXJDb25maWcuZm9vdGVyLmNvbnRlbnQgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHsgLi4uYnVpbGRlckNvbmZpZy5mb290ZXIsIGNvbnRlbnQ6IGUudGFyZ2V0LnZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vODAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHAtMiB0ZXh0LXdoaXRlIGZvbnQtc2FucyBmb2N1czpvdXRsaW5lLW5vbmUgYW5pbWF0ZS1mYWRlLWluXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTT0NJQUwgQ09OVFJPTCBMSU5LUyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNSBibG9ja1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdGV4dC1icmFuZC1wcmltYXJ5IHRyYWNraW5nLXdpZGVzdCBibG9ja1wiPntsYW5nID09PSAnYXInID8gJ9iq2K7YtdmK2LUg2YLZhtmI2KfYqiDYp9mE2KrZiNin2LXZhCDZiNiz2YjYtNmK2KfZhCDYp9mE2YXYudix2LYg2KjZhdi12LE6JyA6ICdDdXN0b21pemUgQWN0aXZlIFNvY2lhbCBNZWRpYSBUYXJnZXQgTGlua3M6J308L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC0zIHAtNCBiZy13aGl0ZS9bMC4wMl0gYm9yZGVyIGJvcmRlci13aGl0ZS81IHJvdW5kZWQtMnhsIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgeyhbXG4gICAgICAgICAgICAgICAgICAgIHsgcGxhdGZvcm06ICdmYWNlYm9vaycsIGxhYmVsOiAnRmFjZWJvb2snIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcGxhdGZvcm06ICdpbnN0YWdyYW0nLCBsYWJlbDogJ0luc3RhZ3JhbScgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBwbGF0Zm9ybTogJ3doYXRzYXBwJywgbGFiZWw6ICdXaGF0c0FwcCcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBwbGF0Zm9ybTogJ3lvdXR1YmUnLCBsYWJlbDogJ1lvdVR1YmUnIH1cbiAgICAgICAgICAgICAgICAgIF0gYXMgY29uc3QpLm1hcCgoc29jaWFsKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtzb2NpYWwucGxhdGZvcm19IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9jayB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtWyNBODU1RjddIGZvbnQtYm9sZCB1cHBlcmNhc2VcIj57c29jaWFsLmxhYmVsfSBMaW5rIFVSTDo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmZvb3Rlci5zb2NpYWxMaW5rcz8uW3NvY2lhbC5wbGF0Zm9ybV0gfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLmZvb3RlciwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2NpYWxMaW5rczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLmZvb3Rlci5zb2NpYWxMaW5rcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3NvY2lhbC5wbGF0Zm9ybV06IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzYwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBweC0yIHB5LTEuNSB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIENPTlRBQ1QgJiBIRUFEUVVBUlRFUlMgRURJVE9SUyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMgcHQtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdGV4dC1icmFuZC1zZWNvbmRhcnkgdHJhY2tpbmctd2lkZXN0IGJsb2NrXCI+e2xhbmcgPT09ICdhcicgPyAn2KjZitin2YbYp9iqINmF2YLYsSDYp9mE2YXYudix2LYg2YjZhdi52YTZiNmF2KfYqiDYp9mE2KrZiNin2LXZhCDYqNin2YTZg9in2YXZhCAoQ29udGFjdCBkZXRhaWxzKTonIDogJ0hFQURRVUFSVEVSUyBMT0NBVElPTiAmIENPTlRBQ1QgVEVMRU1FVFJZOid9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtMyBwLTQgYmctd2hpdGUvWzAuMDJdIGJvcmRlciBib3JkZXItd2hpdGUvNSByb3VuZGVkLTJ4bCB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgey8qIEFkZHJlc3MgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9jayB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGJsb2NrXCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNi52YbZiNin2YYg2KjZhdi12LEgKNi52LHYqNmKKTonIDogJ0VneXB0aWFuIEFkZHJlc3MgKEFyYWJpYyknfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmZvb3Rlci5hZGRyZXNzQXIgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmJ1aWxkZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHsgLi4uYnVpbGRlckNvbmZpZy5mb290ZXIsIGFkZHJlc3NBcjogZS50YXJnZXQudmFsdWUgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vNjAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHB4LTIgcHktMS41IHRleHQtd2hpdGUgZm9udC1zYW5zIHRleHQtcmlnaHQgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgYmxvY2sgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtWzEwcHhdIHVwcGVyY2FzZSBibG9ja1wiPntsYW5nID09PSAnYXInID8gJ9in2YTYudmG2YjYp9mGICjYpdmG2KzZhNmK2LLZiik6JyA6ICdIZWFkcXVhcnRlcnMgQWRkcmVzcyAoRW5nbGlzaCknfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmZvb3Rlci5hZGRyZXNzIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7IC4uLmJ1aWxkZXJDb25maWcuZm9vdGVyLCBhZGRyZXNzOiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS82MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcHgtMiBweS0xLjUgdGV4dC13aGl0ZSBmb250LXNhbnMgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogUGhvbmUgJiBFbWFpbCAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIGJsb2NrIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgYmxvY2tcIj57bGFuZyA9PT0gJ2FyJyA/ICfYsdmC2YUg2KfZhNmH2KfYqtmBOicgOiAnQ29udGFjdCBQaG9uZSBOdW1iZXI6J308L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YnVpbGRlckNvbmZpZy5mb290ZXIucGhvbmUgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmJ1aWxkZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHsgLi4uYnVpbGRlckNvbmZpZy5mb290ZXIsIHBob25lOiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS82MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcHgtMiBweS0xLjUgdGV4dC13aGl0ZSBmb250LW1vbm8gZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgYmxvY2sgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtWzEwcHhdIHVwcGVyY2FzZSBibG9ja1wiPntsYW5nID09PSAnYXInID8gJ9in2YTYqNix2YrYryDYp9mE2KXZhNmD2KrYsdmI2YbZijonIDogJ0NvbnRhY3QgRS1tYWlsIEFkZHJlc3M6J308L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YnVpbGRlckNvbmZpZy5mb290ZXIuZW1haWwgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmJ1aWxkZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHsgLi4uYnVpbGRlckNvbmZpZy5mb290ZXIsIGVtYWlsOiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS82MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcHgtMiBweS0xLjUgdGV4dC13aGl0ZSBmb250LW1vbm8gZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogV29ya2luZyBUaW1lcyAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIGJsb2NrIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgYmxvY2tcIj57bGFuZyA9PT0gJ2FyJyA/ICfYs9in2LnYp9iqINin2YTYudmF2YQg2KfZhNij2K3YryAtINin2YTYrtmF2YrYszonIDogJ1dvcmtpbmcgSG91cnMgU3VuLVRodTonfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZS5nLiAxMDowMCBBTSAtIDEwOjAwIFBNXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YnVpbGRlckNvbmZpZy5mb290ZXIuaG91cnNTdW5UaHUgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmJ1aWxkZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHsgLi4uYnVpbGRlckNvbmZpZy5mb290ZXIsIGhvdXJzU3VuVGh1OiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS82MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcHgtMiBweS0xLjUgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9jayB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGJsb2NrXCI+e2xhbmcgPT09ICdhcicgPyAn2LPYp9i52KfYqiDYp9mE2LnZhdmEINin2YTYo9it2K8gLSDYp9mE2K7ZhdmK2LMgKNi52LHYqNmKINin2K7YqtmK2KfYsdmJKTonIDogJ1dvcmtpbmcgSG91cnMgU3VuLVRodSAoQXJhYmljIG9wdGlvbmFsKTonfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi2YXYq9in2YQ6IDEwOjAwINi1IC0gMTA6MDAg2YVcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmZvb3Rlci5ob3Vyc1N1blRodUFyIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7IC4uLmJ1aWxkZXJDb25maWcuZm9vdGVyLCBob3Vyc1N1blRodUFyOiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS82MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcHgtMiBweS0xLjUgdGV4dC13aGl0ZSB0ZXh0LXJpZ2h0IGZvY3VzOm91dGxpbmUtbm9uZSBhbmltYXRlLWZhZGUtaW5cIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBIb3VycyBGcmlkYXkgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9jayB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGJsb2NrXCI+e2xhbmcgPT09ICdhcicgPyAn2LPYp9i52KfYqiDYp9mE2LnZhdmEINin2YTYrNmF2LnYqTonIDogJ1dvcmtpbmcgSG91cnMgRnJpZGF5Oid9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIDA0OjAwIFBNIC0gMTE6MDAgUE1cIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmZvb3Rlci5ob3Vyc0ZyaSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZUJ1aWxkZXJDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvb3RlcjogeyAuLi5idWlsZGVyQ29uZmlnLmZvb3RlciwgaG91cnNGcmk6IGUudGFyZ2V0LnZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzYwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBweC0yIHB5LTEuNSB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIGJsb2NrIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgYmxvY2tcIj57bGFuZyA9PT0gJ2FyJyA/ICfYs9in2LnYp9iqINin2YTYudmF2YQg2KfZhNis2YXYudipICjYudix2KjZiiDYp9iu2KrZitin2LHZiSk6JyA6ICdXb3JraW5nIEhvdXJzIEZyaWRheSAoQXJhYmljIG9wdGlvbmFsKTonfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi2YXYq9in2YQ6IDA0OjAwINmFIC0gMTE6MDAg2YVcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtidWlsZGVyQ29uZmlnLmZvb3Rlci5ob3Vyc0ZyaUFyIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7IC4uLmJ1aWxkZXJDb25maWcuZm9vdGVyLCBob3Vyc0ZyaUFyOiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS82MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcHgtMiBweS0xLjUgdGV4dC13aGl0ZSB0ZXh0LXJpZ2h0IGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIEhvdXJzIFNhdHVyZGF5ICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgYmxvY2sgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtWzEwcHhdIHVwcGVyY2FzZSBibG9ja1wiPntsYW5nID09PSAnYXInID8gJ9iz2KfYudin2Kog2KfZhNi52YXZhCDYp9mE2LPYqNiqOicgOiAnV29ya2luZyBIb3VycyBTYXR1cmRheTonfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZS5nLiAxMTowMCBBTSAtIDA5OjAwIFBNXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YnVpbGRlckNvbmZpZy5mb290ZXIuaG91cnNTYXQgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmJ1aWxkZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHsgLi4uYnVpbGRlckNvbmZpZy5mb290ZXIsIGhvdXJzU2F0OiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS82MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcHgtMiBweS0xLjUgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9jayB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGJsb2NrXCI+e2xhbmcgPT09ICdhcicgPyAn2LPYp9i52KfYqiDYp9mE2LnZhdmEINin2YTYs9io2KogKNi52LHYqNmKINin2K7YqtmK2KfYsdmJKTonIDogJ1dvcmtpbmcgSG91cnMgU2F0dXJkYXkgKEFyYWJpYyBvcHRpb25hbCk6J308L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cItmF2KvYp9mEOiAxMTowMCDYtSAtIDA5OjAwINmFXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YnVpbGRlckNvbmZpZy5mb290ZXIuaG91cnNTYXRBciB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZUJ1aWxkZXJDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvb3RlcjogeyAuLi5idWlsZGVyQ29uZmlnLmZvb3RlciwgaG91cnNTYXRBcjogZS50YXJnZXQudmFsdWUgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vNjAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHB4LTIgcHktMS41IHRleHQtd2hpdGUgdGV4dC1yaWdodCBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBDb3B5cmlnaHQgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9jayB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGJsb2NrXCI+e2xhbmcgPT09ICdhcicgPyAn2K3ZgtmI2YIg2KfZhNmG2LTYsSDZiNin2YTZhdmE2YPZitin2KogKNi52LHYqNmKKTonIDogJ0NvcHlyaWdodCBtZXNzYWdlIChBcmFiaWMpJ308L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YnVpbGRlckNvbmZpZy5mb290ZXIuY29weXJpZ2h0QXIgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmJ1aWxkZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHsgLi4uYnVpbGRlckNvbmZpZy5mb290ZXIsIGNvcHlyaWdodEFyOiBlLnRhcmdldC52YWx1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS82MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcHgtMiBweS0xLjUgdGV4dC13aGl0ZSB0ZXh0LXJpZ2h0IGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIGJsb2NrIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgYmxvY2tcIj57bGFuZyA9PT0gJ2FyJyA/ICfYrdmC2YjZgiDYp9mE2YbYtNixINmI2KfZhNmF2YTZg9mK2KfYqiAo2KXZhtis2YTZitiy2YopOicgOiAnQ29weXJpZ2h0IG1lc3NhZ2UgKEVuZ2xpc2gpJ308L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YnVpbGRlckNvbmZpZy5mb290ZXIuY29weXJpZ2h0IHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7IC4uLmJ1aWxkZXJDb25maWcuZm9vdGVyLCBjb3B5cmlnaHQ6IGUudGFyZ2V0LnZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzYwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBweC0yIHB5LTEuNSB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogRFlOQU1JQyBDVVNUT00gU09DSUFMIE5FVFdPUktTICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMi41IHB0LTMgYm9yZGVyLXQgYm9yZGVyLXdoaXRlL1swLjA1XVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0ZXh0LVsjMjJEM0VFXSB0cmFja2luZy13aWRlc3QgYmxvY2tcIj57bGFuZyA9PT0gJ2FyJyA/ICfZgtmG2YjYp9iqINiq2YjYp9i12YQg2KXYttin2YHZitipINmF2K7Ytdi12KkgKNiq2YrZgyDYqtmI2YPYjCDYpdmE2K4pOicgOiAnQURESVRJT05BTCBTT0NJQUwgVEFSR0VUIE5FVFdPUktTIChUSUtUT0ssIEVUQy4pOid9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVs4cHhdIHRleHQtZ3JheS01MDAgbXQtMC41XCI+e2xhbmcgPT09ICdhcicgPyAn2YrZhdmD2YbZgyDYsdmB2Lkg2KPZitmC2YjZhtin2Kog2YXYrti12LXYqSDZhNmD2YQg2YXZhti12Kkg2YjYrdmB2Lgg2LHYp9io2LfZh9inLicgOiAnUHJvdmlkZSBjdXN0b20gbG9nb3MgYW5kIHByb2ZpbGUgVVJMcyBmb3Igc2Vjb25kYXJ5IGFjY291bnRzLid9PC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TGlzdCA9IFsuLi4oYnVpbGRlckNvbmZpZy5mb290ZXIuY3VzdG9tU29jaWFsTGlua3MgfHwgW10pXTtcbiAgICAgICAgICAgICAgICAgICAgICBuZXdMaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdjdXN0b20tJyArIERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnVGlrVG9rJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uVXJsOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUJ1aWxkZXJDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLmZvb3RlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tU29jaWFsTGlua3M6IG5ld0xpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmF2Kog2KXYttin2YHYqSDYqtmI2KfYtdmEINmF2K7Ytdi1INis2K/ZitivIScgOiAnQWRkZWQgYWx0ZXJuYXRpdmUgc29jaWFsIGxpbmsgcGxhY2Vob2xkZXIhJywgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgdGV4dC1bOXB4XSBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVyIGJnLWJyYW5kLXByaW1hcnkgaG92ZXI6YnJpZ2h0bmVzcy0xMTAgdGV4dC13aGl0ZSB1cHBlcmNhc2Ugcm91bmRlZC1sZyB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICsge2xhbmcgPT09ICdhcicgPyAn2KXYttin2YHYqSDZiNiz2YrZhNipINmF2K7Ytdi12KknIDogJ0FERCBEWU5BTUlDIExJTksnfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7KCFidWlsZGVyQ29uZmlnLmZvb3Rlci5jdXN0b21Tb2NpYWxMaW5rcyB8fCBidWlsZGVyQ29uZmlnLmZvb3Rlci5jdXN0b21Tb2NpYWxMaW5rcy5sZW5ndGggPT09IDApID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBwLTUgYmctd2hpdGUvWzAuMDFdIGJvcmRlciBib3JkZXItd2hpdGUvNSBib3JkZXItZGFzaGVkIHJvdW5kZWQtMnhsIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwNVwiPntsYW5nID09PSAnYXInID8gJ9in2LbYuti3INi52YTZiSDYstixINin2YTYpdi22KfZgdipINmE2KrYtNi62YrZhCDZgtmG2YjYp9iqINij2K7YsdmJINmF2K7Ytdi12KkgKNmF2KvZhCDYqtmK2YMg2KrZiNmDKSDYqNmF2LXYsS4nIDogJ05vIGFkZGl0aW9uYWwgbGlua3MgZGVmaW5lZC4gQm9vc3QgY2xpZW50IG5hdmlnYXRpb24gYnkgZXN0YWJsaXNoaW5nIFRpa1RvayBwYWdlcy4nfTwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgICAgICB7YnVpbGRlckNvbmZpZy5mb290ZXIuY3VzdG9tU29jaWFsTGlua3MubWFwKChjdXN0b20sIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtjdXN0b20uaWQgfHwgaWR4fSBjbGFzc05hbWU9XCJwLTQgYmctWyMwQjBGMTldLzQwIGJvcmRlciBib3JkZXItd2hpdGUvNSByb3VuZGVkLTJ4bCBzcGFjZS15LTMgcmVsYXRpdmUgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWQgPSBidWlsZGVyQ29uZmlnLmZvb3Rlci5jdXN0b21Tb2NpYWxMaW5rcz8uZmlsdGVyKChfLCBpKSA9PiBpICE9PSBpZHgpIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUJ1aWxkZXJDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLmZvb3RlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tU29jaWFsTGlua3M6IGZpbHRlcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDZhdiz2K0g2YjYs9mK2YTYqSDYp9mE2KrZiNin2LXZhCcgOiAnUmVtb3ZlZCBjdXN0b20gY2hhbm5lbCcsICdpbmZvJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC00IHJpZ2h0LTQgdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXJlZC01MDUgY3Vyc29yLXBvaW50ZXIgcC0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e2xhbmcgPT09ICdhcicgPyAn2K3YsNmBJyA6ICdEZWxldGUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTMgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIGJsb2NrIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTQwMCBmb250LWJvbGQgdXBwZXJjYXNlXCI+e2xhbmcgPT09ICdhcicgPyAn2KfYs9mFINin2YTZhdmG2LXYqSAo2YPZgCDYqtmK2YMg2KrZiNmDKTonIDogJ1BsYXRmb3JtIElkZW50aXR5Oid9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y3VzdG9tLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IFsuLi4oYnVpbGRlckNvbmZpZy5mb290ZXIuY3VzdG9tU29jaWFsTGlua3MgfHwgW10pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdFtpZHhdID0geyAuLi5saXN0W2lkeF0sIG5hbWU6IGUudGFyZ2V0LnZhbHVlIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUJ1aWxkZXJDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmJ1aWxkZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7IC4uLmJ1aWxkZXJDb25maWcuZm9vdGVyLCBjdXN0b21Tb2NpYWxMaW5rczogbGlzdCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vNjAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHB4LTIuNSBweS0xLjUgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgYmxvY2sgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LVsjQTg1NUY3XSBmb250LWJvbGQgdXBwZXJjYXNlXCI+e2xhbmcgPT09ICdhcicgPyAn2LHYp9io2Lcg2KfZhNi12YHYrdipINin2YTYtNiu2LXZitipIFVSTDonIDogJ1BsYXRmb3JtIERlc3RpbmF0aW9uIFdlYiBVUkw6J308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly90aWt0b2suY29tL0AuLi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2N1c3RvbS51cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IFsuLi4oYnVpbGRlckNvbmZpZy5mb290ZXIuY3VzdG9tU29jaWFsTGlua3MgfHwgW10pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdFtpZHhdID0geyAuLi5saXN0W2lkeF0sIHVybDogZS50YXJnZXQudmFsdWUgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHsgLi4uYnVpbGRlckNvbmZpZy5mb290ZXIsIGN1c3RvbVNvY2lhbExpbmtzOiBsaXN0IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS82MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcHgtMi41IHB5LTEuNSB0ZXh0LXdoaXRlIHRleHQteHMgZm9jdXM6b3V0bGluZS1ub25lIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIEZpbGUgaW1hZ2UgQmFzZTY0IGxvZ28gZGlyZWN0IGlucHV0cyAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtMyB0ZXh0LWxlZnQgYm9yZGVyLXQgYm9yZGVyLXdoaXRlLzUgcHQtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9jayB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS00MDAgZm9udC1ib2xkIHVwcGVyY2FzZVwiPntsYW5nID09PSAnYXInID8gJ9ij2Ygg2LHYp9io2Lcg2YXYqNin2LTYsSDZhNmE2KPZitmC2YjZhtipIChVUkwpOicgOiAnUGxhdGZvcm0gSWNvbiBJbWFnZSBMaW5rIFVSTDonfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJodHRwczovL2ljb24tY2xvdWQuY29tL3Rpa3Rvay5wbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2N1c3RvbS5pY29uVXJsIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBbLi4uKGJ1aWxkZXJDb25maWcuZm9vdGVyLmN1c3RvbVNvY2lhbExpbmtzIHx8IFtdKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RbaWR4XSA9IHsgLi4ubGlzdFtpZHhdLCBpY29uVXJsOiBlLnRhcmdldC52YWx1ZSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVCdWlsZGVyQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5idWlsZGVyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvb3RlcjogeyAuLi5idWlsZGVyQ29uZmlnLmZvb3RlciwgY3VzdG9tU29jaWFsTGlua3M6IGxpc3QgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzYwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBweC0yLjUgcHktMS41IHRleHQtd2hpdGUgdGV4dC14cyBmb2N1czpvdXRsaW5lLW5vbmUgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBibG9jayB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtWyMyMkQzRUVdIGZvbnQtYm9sZCB1cHBlcmNhc2VcIj57bGFuZyA9PT0gJ2FyJyA/ICfYsdmB2Lkg2YXZhNmBINij2YrZgtmI2YbYqSDYtNi52KfYsSDYp9mE2YXZhti12Kkg2YXZhiDYrNmH2KfYstmDOicgOiAnT3IgVXBsb2FkIERldmljZSBMb2dvIChQTkcvU1ZHKTonfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y3VzdG9tLmljb25VcmwgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17Y3VzdG9tLmljb25Vcmx9IGFsdD1cImN1c3RvbSBpY29uIGxvZ29cIiBjbGFzc05hbWU9XCJ3LTggaC04IG9iamVjdC1jb250YWluIGJnLXdoaXRlLzUgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLWxnIHAtMVwiIHJlZmVycmVyUG9saWN5PVwibm8tcmVmZXJyZXJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsaXN0ID0gWy4uLihidWlsZGVyQ29uZmlnLmZvb3Rlci5jdXN0b21Tb2NpYWxMaW5rcyB8fCBbXSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0W2lkeF0gPSB7IC4uLmxpc3RbaWR4XSwgaWNvblVybDogcmVhZGVyLnJlc3VsdCBhcyBzdHJpbmcgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQnVpbGRlckNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uYnVpbGRlckNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHsgLi4uYnVpbGRlckNvbmZpZy5mb290ZXIsIGN1c3RvbVNvY2lhbExpbmtzOiBsaXN0IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YUg2LHZgdi5INij2YrZgtmI2YbYqSDYp9mE2YXZhti12Kkg2KjZhtis2KfYrSEnIDogJ1BsYXRmb3JtIGxvZ28gdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5JywgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBiZy13aGl0ZS81IGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBwLTEgdGV4dC1ncmF5LTQwMCB0ZXh0LXhzIGZpbGU6YmctYnJhbmQtc2Vjb25kYXJ5IGZpbGU6Ym9yZGVyLW5vbmUgZmlsZTp0ZXh0LXdoaXRlIGZpbGU6cHgtMi41IGZpbGU6cHktMC41IGZpbGU6cm91bmRlZC1tZCBmaWxlOnRleHQtWzlweF0gZmlsZTpjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIENVU1RPTSBURU1QTEFURVMgU1lTVEVNICovfVxuICAgICAgICAgIHthY3RpdmVCdWlsZGVyVGFiID09PSAndGVtcGxhdGVzJyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCBhbmltYXRlLWZhZGUtaW4gdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LWJsYWNrIHVwcGVyY2FzZSB0ZXh0LWJyYW5kLXNlY29uZGFyeSB0cmFja2luZy13aWRlc3QgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItMS41IGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9it2YLZitio2Kkg2KfZhNmC2YjYp9mE2Kgg2YjYp9mE2YbYs9iuINmI2KrYtdmF2YrZhSDYp9mE2LPZhdin2KonIDogJ1RlbXBsYXRlcyBWYXVsdCBhbmQgVmlzdWFsIFByZXNldHMgQXJjaGl2ZXInfVxuICAgICAgICAgICAgICA8L2g0PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLXdoaXRlL1swLjAxXSBib3JkZXIgYm9yZGVyLXdoaXRlLzUgcm91bmRlZC0yeGwgYmxvY2sgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCBmb250LWJvbGQgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGJsb2NrIG1iLTEuNVwiPntsYW5nID09PSAnYXInID8gJ9it2YHYuCDYqti12YXZitmF2YMg2YjZhdiz2KfZgdin2Kog2KPZhNmI2KfZhiDYp9mE2YXZiNmC2Lkg2KfZhNit2KfZhNmKINmB2Yog2LPYrNmEINin2YTZgtmI2KfZhNioOicgOiAnU2F2ZSBjdXJyZW50IGRlc2lnbiBjb25maWcgcGFsZXR0ZSBhcyB2aXN1YWwgdGVtcGxhdGUgcHJlc2V0Oid9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17bGFuZyA9PT0gJ2FyJyA/ICfYp9mD2KrYqCDYp9iz2YUg2YXZhdmK2LIgKNmF2KvYp9mEOiDYp9mE2LTYqtin2KEg2KfZhNij2K7Yp9iw2Iwg2YPYsdio2YjZhtiMINix2YXYttin2YYg2KfZhNij2YPYrdmEKScgOiAnZS5nLiBDYXJib24gRWRpdGlvbiwgU3VtbWVyIFN1bnNldCd9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdUZW1wbGF0ZU5hbWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3VGVtcGxhdGVOYW1lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIGJnLWJsYWNrLzUwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBweC0zIHB5LTIgdGV4dC14cyB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2F2ZVRlbXBsYXRlfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgYmctYnJhbmQtcHJpbWFyeSBob3ZlcjpicmlnaHRuZXNzLTExMCB0ZXh0LXdoaXRlIGZvbnQtZXh0cmFib2xkIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfwn5K+INit2YHYuCDZg9mC2KfZhNioJyA6ICfwn5K+IFNhdmUgVGVtcGxhdGUnfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1ncmF5LTMwMCBibG9ja1wiPntsYW5nID09PSAnYXInID8gJ9mC2YjYp9mE2KjZgyDYp9mE2KXYqNiv2KfYudmK2Kkg2KfZhNmF2K3ZgdmI2LjYqSDYqNin2YTZg9in2YXZhDonIDogJ1lvdXIgQ3JlYXRpdmUgU2F2ZWQgUHJlc2V0czonfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7dGVtcGxhdGVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInAtOCB0ZXh0LWNlbnRlciB0ZXh0LWdyYXktNjUwIGJnLXdoaXRlL1swLjAxXSBib3JkZXIgYm9yZGVyLXdoaXRlLzUgYm9yZGVyLWRhc2hlZCByb3VuZGVkLXhsIGZvbnQtbW9ubyBsZWFkaW5nLW5vcm1hbFwiPlxuICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYrdmC2YrYqNipINmC2YjYp9mE2KjZgyDZgdin2LHYutipINit2KfZhNmK2KfZiy4g2KfZg9iq2Kgg2KfYs9mF2KfZiyDZhNmE2KPZhNmI2KfZhiDZiNin2YTYqtmF2YjYtti5INio2KfZhNij2LnZhNmJINmE2K3Zgdi4INin2YTZgtin2YTYqCDZgdmI2LHYpy4nIDogJ05vIGN1c3RvbSBwcmVzZXRzIHJlZ2lzdGVyZWQuIFdyaXRlIGEgY3JlYXRpdmUgdGl0bGUgYWJvdmUgdG8gYnVmZmVyIHlvdXIgc2FuZGJveCBzdHlsZXMuJ31cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0ZW1wbGF0ZXMubWFwKCh0cGwsIHRwbElkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2Ake3RwbC5uYW1lfS0ke3RwbElkeH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zIGJnLXdoaXRlL1swLjAyXSBib3JkZXIgYm9yZGVyLXdoaXRlLzUgcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gaG92ZXI6Ymctd2hpdGUvWzAuMDRdIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGVmdCBmb250LXNhbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJsYWNrIHRleHQtZ3JheS0yMDBcIj57dHBsLm5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtWyNBODU1RjddIGZvbnQtbW9ubyBtdC0wLjUgdHJhY2tpbmctd2lkZXIgZm9udC1leHRyYWJvbGQgdXBwZXJjYXNlXCI+e3RwbC5jb25maWcuZm9udH0gRm9udCDigKIgQm9yZGVyUmFkaXVzOiB7dHBsLmNvbmZpZy50aGVtZS5idXR0b25SYWRpdXN9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMS41IHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVBcHBseVRlbXBsYXRlKHRwbC5jb25maWcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIGJnLWJyYW5kLWFjY2VudCBob3ZlcjpicmlnaHRuZXNzLTExMCB0ZXh0LWJsYWNrIGZvbnQtZXh0cmFib2xkIHJvdW5kZWQtbGcgdGV4dC1bOXB4XSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KrYt9io2YrZgicgOiAnQXBwbHknfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJlbW92ZVRlbXBsYXRlKHRwbElkeCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHRleHQtcmVkLTUwMCBob3ZlcjpiZy1yZWQtOTUwLzIwIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1yZWQtNTAwLzEwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUcmFzaDIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogR2xvYmFsIFNhdmUgVHJpZ2dlciBidXR0b24gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tMTIgYm9yZGVyLXQgYm9yZGVyLXdoaXRlLzUgcHQtNCBmbGV4IGp1c3RpZnktZW5kXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTYXZlQWxsfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNyBweS0zIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1icmFuZC1zZWNvbmRhcnkgdmlhLWJyYW5kLXByaW1hcnkgdG8tYnJhbmQtYWNjZW50IHRleHQtd2hpdGUgZm9udC1ibGFjayB0cmFja2luZy13aWRlc3Qgcm91bmRlZC14bCBob3ZlcjpicmlnaHRuZXNzLTExMCBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGN1cnNvci1wb2ludGVyIHRleHQteHMgc2hhZG93LXhsIHNoYWRvdy1icmFuZC1wcmltYXJ5LzEwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctNC41IGgtNC41IGFuaW1hdGUtYm91bmNlXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9iq2KvYqNmK2Kog2YjYrdmB2Lgg2KfZhNiq2LXZhdmK2YUg2YbZh9in2KbZitin2Ysg2KjZhdi12LEnIDogJ0RFUExPWSBMSVZFIFRIRU1FIENPTkZJRyd9PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiJBQXdJWTtBQXhJWixTQUFnQixVQUFVLGlCQUFpQjtBQUMzQyxTQUFTLFVBQVUsUUFBUSxjQUFjLG9CQUE4QjtBQUV2RSxTQUFTLCtCQUErQjtBQUV4QyxNQUFNLGVBQXVDO0FBQUEsRUFDM0MsU0FBUztBQUFBLEVBQ1QsV0FBVztBQUFBLEVBQ1gsY0FBYztBQUFBLEVBQ2QsVUFBVTtBQUFBLEVBQ1YsU0FBUztBQUFBLEVBQ1QsV0FBVztBQUFBLEVBQ1gsaUJBQWlCO0FBQUEsRUFDakIsYUFBYTtBQUFBLEVBQ2IsUUFBUTtBQUFBLEVBQ1IsVUFBVTtBQUFBLEVBQ1YsaUJBQWlCO0FBQ25CO0FBWUEsd0JBQXdCLG9CQUFvQjtBQUFBLEVBQzFDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsR0FBNkI7QUFDM0IsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLElBQUksU0FBeUIsa0JBQWtCLHVCQUF1QjtBQUM1RyxRQUFNLENBQUMsU0FBUyxVQUFVLElBQUksU0FBMkIsQ0FBQyxrQkFBa0IsdUJBQXVCLENBQUM7QUFDcEcsUUFBTSxDQUFDLGNBQWMsZUFBZSxJQUFJLFNBQVMsQ0FB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