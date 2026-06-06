import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=905fa188"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=905fa188"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react; const useState = __vite__cjsImport1_react["useState"]; const useMemo = __vite__cjsImport1_react["useMemo"];
import { AnimatePresence } from "/node_modules/.vite/deps/motion_react.js?v=905fa188";
import { Search, Info, Check, Package, Layers, Shield, Zap } from "/node_modules/.vite/deps/lucide-react.js?v=905fa188";
import { useLanguage } from "/src/context/LanguageContext.tsx";
import StoreProductCard from "/src/components/StoreProductCard.tsx";
export default function StoreView({ products, homepageConfig, onAddToCart, favorites, onToggleFavorite }) {
  const { lang, dir, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prodId = params.get("product");
    if (prodId) {
      setSearchQuery(prodId);
      setActiveCategory("ALL");
    }
  }, []);
  const categories = [
    { id: "ALL", labelAr: "الكل", labelEn: "All", icon: Layers },
    { id: "Oils", labelAr: "زيوت ومحروقات", labelEn: "Oils & Lubricants", icon: Zap },
    { id: "Safety", labelAr: "معدات أمان", labelEn: "Safety Equipment", icon: Shield },
    { id: "Smart", labelAr: "اكسسوارات ذكية", labelEn: "Smart Accessories", icon: Info },
    { id: "Parts", labelAr: "قطع غيار", labelEn: "Spare Parts", icon: Package },
    { id: "Lifestyle", labelAr: "منتجات لايف ستايل", labelEn: "Lifestyle Products", icon: Check }
  ];
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (activeCategory !== "ALL" && p.category !== activeCategory) return false;
      if (!p.isHidden) {
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          return p.name.toLowerCase().includes(q) || p.nameAr.includes(q) || p.id.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
        }
        return true;
      }
      return false;
    });
  }, [products, activeCategory, searchQuery]);
  return /* @__PURE__ */ jsxDEV("div", { className: "pt-28 pb-20 min-h-screen bg-[#0B0F1A]", dir, children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h1", { className: "text-3xl font-black font-sans text-white uppercase tracking-tight", children: lang === "ar" ? "المتجر الإلكتروني" : "Digital Store" }, void 0, false, {
          fileName: "/app/applet/src/components/StoreView.tsx",
          lineNumber: 60,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-brand-accent font-mono text-xs tracking-widest uppercase mt-1", children: lang === "ar" ? "اكسسوارات، قطع غيار والمزيد" : "Accessories, Parts & More" }, void 0, false, {
          fileName: "/app/applet/src/components/StoreView.tsx",
          lineNumber: 63,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/StoreView.tsx",
        lineNumber: 59,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "relative w-full md:w-auto flex-1 max-w-md", children: [
        /* @__PURE__ */ jsxDEV(Search, { className: `absolute ${lang === "ar" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500` }, void 0, false, {
          fileName: "/app/applet/src/components/StoreView.tsx",
          lineNumber: 69,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            placeholder: lang === "ar" ? "ابحث برقم المنتج، اسم، تصنيف..." : "Search by ID, name, category...",
            className: `w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-2.5 ${lang === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"} text-sm text-white focus:border-brand-primary outline-none focus:ring-1 focus:ring-brand-primary placeholder:text-gray-600 transition-all font-mono`,
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/StoreView.tsx",
            lineNumber: 70,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/StoreView.tsx",
        lineNumber: 68,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/StoreView.tsx",
      lineNumber: 58,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex overflow-x-auto hide-scrollbar gap-3 mb-10 pb-2", children: categories.map((c) => {
      const Icon = c.icon;
      const isActive = activeCategory === c.id;
      return /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveCategory(c.id),
          className: `flex items-center gap-2 px-5 py-2.5 rounded-xl border whitespace-nowrap transition-all font-mono text-xs tracking-widest uppercase cursor-pointer ${isActive ? "bg-brand-primary/10 border-brand-primary text-brand-accent font-bold" : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:bg-white/5"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Icon, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/StoreView.tsx",
              lineNumber: 95,
              columnNumber: 17
            }, this),
            lang === "ar" ? c.labelAr : c.labelEn
          ]
        },
        c.id,
        true,
        {
          fileName: "/app/applet/src/components/StoreView.tsx",
          lineNumber: 86,
          columnNumber: 15
        },
        this
      );
    }) }, void 0, false, {
      fileName: "/app/applet/src/components/StoreView.tsx",
      lineNumber: 81,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsxDEV(AnimatePresence, { children: filteredProducts.map((product) => /* @__PURE__ */ jsxDEV(
        StoreProductCard,
        {
          product,
          onAddToCart,
          isFavorite: favorites.includes(product.id),
          onToggleFavorite
        },
        product.id,
        false,
        {
          fileName: "/app/applet/src/components/StoreView.tsx",
          lineNumber: 106,
          columnNumber: 15
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/StoreView.tsx",
        lineNumber: 104,
        columnNumber: 11
      }, this),
      filteredProducts.length === 0 && /* @__PURE__ */ jsxDEV("div", { className: "col-span-full py-20 text-center flex flex-col items-center", children: [
        /* @__PURE__ */ jsxDEV(Package, { className: "w-16 h-16 text-white/5 mb-4" }, void 0, false, {
          fileName: "/app/applet/src/components/StoreView.tsx",
          lineNumber: 118,
          columnNumber: 18
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-gray-400 font-sans", children: lang === "ar" ? "لا توجد منتجات تطابق بحثك" : "No products match your search" }, void 0, false, {
          fileName: "/app/applet/src/components/StoreView.tsx",
          lineNumber: 119,
          columnNumber: 18
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/StoreView.tsx",
        lineNumber: 117,
        columnNumber: 14
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/StoreView.tsx",
      lineNumber: 103,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/StoreView.tsx",
    lineNumber: 55,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/StoreView.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0b3JlVmlldy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbW90aW9uLCBBbmltYXRlUHJlc2VuY2UgfSBmcm9tICdtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgU2VhcmNoLCBGaWx0ZXIsIFNob3BwaW5nQ2FydCwgSW5mbywgQ2hlY2ssIFBhY2thZ2UsIExheWVycywgU2hpZWxkLCBaYXAsIENoZXZyb25SaWdodCwgWCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyB1c2VMYW5ndWFnZSB9IGZyb20gJy4uL2NvbnRleHQvTGFuZ3VhZ2VDb250ZXh0JztcbmltcG9ydCB7IFN0b3JlUHJvZHVjdCwgSG9tZXBhZ2VDb25maWcgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgU3RvcmVQcm9kdWN0Q2FyZCBmcm9tICcuL1N0b3JlUHJvZHVjdENhcmQnO1xuXG5pbnRlcmZhY2UgU3RvcmVWaWV3UHJvcHMge1xuICBwcm9kdWN0czogU3RvcmVQcm9kdWN0W107XG4gIGhvbWVwYWdlQ29uZmlnOiBIb21lcGFnZUNvbmZpZztcbiAgb25BZGRUb0NhcnQ6IChwcm9kdWN0OiBTdG9yZVByb2R1Y3QpID0+IHZvaWQ7XG4gIGZhdm9yaXRlczogc3RyaW5nW107XG4gIG9uVG9nZ2xlRmF2b3JpdGU6IChpZDogc3RyaW5nLCBlOiBhbnkpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN0b3JlVmlldyh7IHByb2R1Y3RzLCBob21lcGFnZUNvbmZpZywgb25BZGRUb0NhcnQsIGZhdm9yaXRlcywgb25Ub2dnbGVGYXZvcml0ZSB9OiBTdG9yZVZpZXdQcm9wcykge1xuICBjb25zdCB7IGxhbmcsIGRpciwgdCB9ID0gdXNlTGFuZ3VhZ2UoKTtcbiAgY29uc3QgW3NlYXJjaFF1ZXJ5LCBzZXRTZWFyY2hRdWVyeV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFthY3RpdmVDYXRlZ29yeSwgc2V0QWN0aXZlQ2F0ZWdvcnldID0gdXNlU3RhdGU8J0FMTCcgfCBTdG9yZVByb2R1Y3RbJ2NhdGVnb3J5J10+KCdBTEwnKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgY29uc3QgcHJvZElkID0gcGFyYW1zLmdldCgncHJvZHVjdCcpO1xuICAgIGlmIChwcm9kSWQpIHtcbiAgICAgIHNldFNlYXJjaFF1ZXJ5KHByb2RJZCk7XG4gICAgICBzZXRBY3RpdmVDYXRlZ29yeSgnQUxMJyk7XG4gICAgfVxuICB9LCBbXSk7XG4gIFxuICBjb25zdCBjYXRlZ29yaWVzID0gW1xuICAgIHsgaWQ6ICdBTEwnLCBsYWJlbEFyOiAn2KfZhNmD2YQnLCBsYWJlbEVuOiAnQWxsJywgaWNvbjogTGF5ZXJzIH0sXG4gICAgeyBpZDogJ09pbHMnLCBsYWJlbEFyOiAn2LLZitmI2Kog2YjZhdit2LHZiNmC2KfYqicsIGxhYmVsRW46ICdPaWxzICYgTHVicmljYW50cycsIGljb246IFphcCB9LFxuICAgIHsgaWQ6ICdTYWZldHknLCBsYWJlbEFyOiAn2YXYudiv2KfYqiDYo9mF2KfZhicsIGxhYmVsRW46ICdTYWZldHkgRXF1aXBtZW50JywgaWNvbjogU2hpZWxkIH0sXG4gICAgeyBpZDogJ1NtYXJ0JywgbGFiZWxBcjogJ9in2YPYs9iz2YjYp9ix2KfYqiDYsNmD2YrYqScsIGxhYmVsRW46ICdTbWFydCBBY2Nlc3NvcmllcycsIGljb246IEluZm8gfSxcbiAgICB7IGlkOiAnUGFydHMnLCBsYWJlbEFyOiAn2YLYt9i5INi62YrYp9ixJywgbGFiZWxFbjogJ1NwYXJlIFBhcnRzJywgaWNvbjogUGFja2FnZSB9LFxuICAgIHsgaWQ6ICdMaWZlc3R5bGUnLCBsYWJlbEFyOiAn2YXZhtiq2KzYp9iqINmE2KfZitmBINiz2KrYp9mK2YQnLCBsYWJlbEVuOiAnTGlmZXN0eWxlIFByb2R1Y3RzJywgaWNvbjogQ2hlY2sgfSxcbiAgXTtcblxuICBjb25zdCBmaWx0ZXJlZFByb2R1Y3RzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIHByb2R1Y3RzLmZpbHRlcigocCkgPT4ge1xuICAgICAgaWYgKGFjdGl2ZUNhdGVnb3J5ICE9PSAnQUxMJyAmJiBwLmNhdGVnb3J5ICE9PSBhY3RpdmVDYXRlZ29yeSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKCFwLmlzSGlkZGVuKSB7XG4gICAgICAgIGlmIChzZWFyY2hRdWVyeSkge1xuICAgICAgICAgIGNvbnN0IHEgPSBzZWFyY2hRdWVyeS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIHJldHVybiBwLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKSB8fCBwLm5hbWVBci5pbmNsdWRlcyhxKSB8fCBwLmlkLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHwgcC5icmFuZC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9LCBbcHJvZHVjdHMsIGFjdGl2ZUNhdGVnb3J5LCBzZWFyY2hRdWVyeV0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yOCBwYi0yMCBtaW4taC1zY3JlZW4gYmctWyMwQjBGMUFdXCIgZGlyPXtkaXJ9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOFwiPlxuICAgICAgICBcbiAgICAgICAgey8qIEhlYWRlciAmIFNlYXJjaCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1zdGFydCBtZDppdGVtcy1jZW50ZXIgbWItOCBnYXAtNFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC0zeGwgZm9udC1ibGFjayBmb250LXNhbnMgdGV4dC13aGl0ZSB1cHBlcmNhc2UgdHJhY2tpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KfZhNmF2KrYrNixINin2YTYpdmE2YPYqtix2YjZhtmKJyA6ICdEaWdpdGFsIFN0b3JlJ31cbiAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWJyYW5kLWFjY2VudCBmb250LW1vbm8gdGV4dC14cyB0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlIG10LTFcIj5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KfZg9iz2LPZiNin2LHYp9iq2Iwg2YLYt9i5INi62YrYp9ixINmI2KfZhNmF2LLZitivJyA6ICdBY2Nlc3NvcmllcywgUGFydHMgJiBNb3JlJ31cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBtZDp3LWF1dG8gZmxleC0xIG1heC13LW1kXCI+XG4gICAgICAgICAgICA8U2VhcmNoIGNsYXNzTmFtZT17YGFic29sdXRlICR7bGFuZyA9PT0gJ2FyJyA/ICdyaWdodC0zJyA6ICdsZWZ0LTMnfSB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdy00IGgtNCB0ZXh0LWdyYXktNTAwYH0gLz5cbiAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2xhbmcgPT09ICdhcicgPyAn2KfYqNit2Ksg2KjYsdmC2YUg2KfZhNmF2YbYqtis2Iwg2KfYs9mF2Iwg2KrYtdmG2YrZgS4uLicgOiAnU2VhcmNoIGJ5IElELCBuYW1lLCBjYXRlZ29yeS4uLid9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBiZy1bIzBGMTcyQV0vODAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHB5LTIuNSAke2xhbmcgPT09ICdhcicgPyAncHItMTAgcGwtNCcgOiAncGwtMTAgcHItNCd9IHRleHQtc20gdGV4dC13aGl0ZSBmb2N1czpib3JkZXItYnJhbmQtcHJpbWFyeSBvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0xIGZvY3VzOnJpbmctYnJhbmQtcHJpbWFyeSBwbGFjZWhvbGRlcjp0ZXh0LWdyYXktNjAwIHRyYW5zaXRpb24tYWxsIGZvbnQtbW9ub2B9XG4gICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hRdWVyeX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWFyY2hRdWVyeShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQ2F0ZWdvcmllcyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IG92ZXJmbG93LXgtYXV0byBoaWRlLXNjcm9sbGJhciBnYXAtMyBtYi0xMCBwYi0yXCI+XG4gICAgICAgICAge2NhdGVnb3JpZXMubWFwKChjKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBJY29uID0gYy5pY29uO1xuICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBhY3RpdmVDYXRlZ29yeSA9PT0gYy5pZDtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBrZXk9e2MuaWR9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlQ2F0ZWdvcnkoYy5pZCBhcyBhbnkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTUgcHktMi41IHJvdW5kZWQteGwgYm9yZGVyIHdoaXRlc3BhY2Utbm93cmFwIHRyYW5zaXRpb24tYWxsIGZvbnQtbW9ubyB0ZXh0LXhzIHRyYWNraW5nLXdpZGVzdCB1cHBlcmNhc2UgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgIGlzQWN0aXZlIFxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1icmFuZC1wcmltYXJ5LzEwIGJvcmRlci1icmFuZC1wcmltYXJ5IHRleHQtYnJhbmQtYWNjZW50IGZvbnQtYm9sZCcgXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXdoaXRlL1swLjAyXSBib3JkZXItd2hpdGUvNSB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctd2hpdGUvNSdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxJY29uIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gYy5sYWJlbEFyIDogYy5sYWJlbEVufVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFByb2R1Y3QgR3JpZCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIHhsOmdyaWQtY29scy00IGdhcC02XCI+XG4gICAgICAgICAgPEFuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAgICAgIHtmaWx0ZXJlZFByb2R1Y3RzLm1hcCgocHJvZHVjdCkgPT4gKFxuICAgICAgICAgICAgICA8U3RvcmVQcm9kdWN0Q2FyZCBcbiAgICAgICAgICAgICAgICBrZXk9e3Byb2R1Y3QuaWR9XG4gICAgICAgICAgICAgICAgcHJvZHVjdD17cHJvZHVjdH1cbiAgICAgICAgICAgICAgICBvbkFkZFRvQ2FydD17b25BZGRUb0NhcnR9XG4gICAgICAgICAgICAgICAgaXNGYXZvcml0ZT17ZmF2b3JpdGVzLmluY2x1ZGVzKHByb2R1Y3QuaWQpfVxuICAgICAgICAgICAgICAgIG9uVG9nZ2xlRmF2b3JpdGU9e29uVG9nZ2xlRmF2b3JpdGV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAgICBcbiAgICAgICAgICB7ZmlsdGVyZWRQcm9kdWN0cy5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNwYW4tZnVsbCBweS0yMCB0ZXh0LWNlbnRlciBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICA8UGFja2FnZSBjbGFzc05hbWU9XCJ3LTE2IGgtMTYgdGV4dC13aGl0ZS81IG1iLTRcIiAvPlxuICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1ncmF5LTQwMCBmb250LXNhbnNcIj57bGFuZyA9PT0gJ2FyJyA/ICfZhNinINiq2YjYrNivINmF2YbYqtis2KfYqiDYqti32KfYqNmCINio2K3Yq9mDJyA6ICdObyBwcm9kdWN0cyBtYXRjaCB5b3VyIHNlYXJjaCd9PC9oMj5cbiAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm1hcHBpbmdzIjoiQUEyRFk7QUEzRFosT0FBTyxTQUFTLFVBQVUsZUFBZTtBQUN6QyxTQUFpQix1QkFBdUI7QUFDeEMsU0FBUyxRQUE4QixNQUFNLE9BQU8sU0FBUyxRQUFRLFFBQVEsV0FBNEI7QUFDekcsU0FBUyxtQkFBbUI7QUFFNUIsT0FBTyxzQkFBc0I7QUFVN0Isd0JBQXdCLFVBQVUsRUFBRSxVQUFVLGdCQUFnQixhQUFhLFdBQVcsaUJBQWlCLEdBQW1CO0FBQ3hILFFBQU0sRUFBRSxNQUFNLEtBQUssRUFBRSxJQUFJLFlBQVk7QUFDckMsUUFBTSxDQUFDLGFB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