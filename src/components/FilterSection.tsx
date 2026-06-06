import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d4a02cea"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=d4a02cea"; const useState = __vite__cjsImport1_react["useState"];
import { Search, SlidersHorizontal } from "/node_modules/.vite/deps/lucide-react.js?v=1004c77f";
import { useLanguage } from "/src/context/LanguageContext.tsx";
export default function FilterSection({
  filters,
  onFilterChange,
  speedRange,
  onSpeedRangeChange
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { lang, dir, t } = useLanguage();
  const setCategory = (category) => {
    onFilterChange({ ...filters, category });
  };
  const handleSearchChange = (e) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };
  const handlePriceChange = (e) => {
    onFilterChange({ ...filters, priceRange: parseInt(e.target.value, 10) });
  };
  const handleSortChange = (e) => {
    onFilterChange({ ...filters, sortBy: e.target.value });
  };
  const togglePopularOnly = () => {
    onFilterChange({ ...filters, onlyPopular: !filters.onlyPopular });
  };
  const resetFilters = () => {
    onFilterChange({
      searchQuery: "",
      category: "ALL",
      priceRange: 5e6,
      sortBy: "default",
      onlyPopular: false
    });
    onSpeedRangeChange(100);
  };
  const categoriesList = [
    { code: "ALL", name: t("cat_ALL") },
    { code: "A", name: t("cat_A") },
    { code: "B", name: t("cat_B") },
    { code: "C", name: t("cat_C") },
    { code: "S", name: t("cat_S") }
  ];
  return /* @__PURE__ */ jsxDEV("section", { id: "gallery", className: "glass-panel rounded-3xl p-6 sm:p-8 max-w-7xl mx-auto border border-white/5 relative z-10 box-glow-indigo text-left", dir, children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-accent rounded-tl-3xl opacity-60" }, void 0, false, {
      fileName: "/app/applet/src/components/FilterSection.tsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-secondary rounded-br-3xl opacity-60" }, void 0, false, {
      fileName: "/app/applet/src/components/FilterSection.tsx",
      lineNumber: 71,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8", dir, children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "h-2 w-2 rounded-full bg-brand-accent animate-ping" }, void 0, false, {
            fileName: "/app/applet/src/components/FilterSection.tsx",
            lineNumber: 77,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold tracking-wider text-white uppercase font-mono", children: lang === "ar" ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
            "المعرض ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent", children: "الرقمي الفخم" }, void 0, false, {
              fileName: "/app/applet/src/components/FilterSection.tsx",
              lineNumber: 79,
              columnNumber: 41
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FilterSection.tsx",
            lineNumber: 79,
            columnNumber: 32
          }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
            "DIGITAL ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent", children: "SHOWROOM" }, void 0, false, {
              fileName: "/app/applet/src/components/FilterSection.tsx",
              lineNumber: 79,
              columnNumber: 112
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FilterSection.tsx",
            lineNumber: 79,
            columnNumber: 102
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/FilterSection.tsx",
            lineNumber: 78,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FilterSection.tsx",
          lineNumber: 76,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-400 font-sans leading-relaxed", children: t("showroom_desc") }, void 0, false, {
          fileName: "/app/applet/src/components/FilterSection.tsx",
          lineNumber: 82,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FilterSection.tsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setCollapsed(!collapsed),
            className: "flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] hover:border-brand-accent font-mono text-xs tracking-wider text-gray-300 hover:text-white bg-[#0B0F1A]/40 transition-colors pointer-events-auto cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV(SlidersHorizontal, { className: "w-4 h-4 text-brand-accent" }, void 0, false, {
                fileName: "/app/applet/src/components/FilterSection.tsx",
                lineNumber: 93,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: collapsed ? t("show_advanced") : t("hide_advanced") }, void 0, false, {
                fileName: "/app/applet/src/components/FilterSection.tsx",
                lineNumber: 94,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/FilterSection.tsx",
            lineNumber: 89,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: resetFilters,
            className: "px-4 py-2.5 rounded-xl border border-white/[0.08] hover:border-brand-secondary font-mono text-xs tracking-wider text-gray-400 hover:text-white bg-[#0B0F1A]/20 transition-colors pointer-events-auto cursor-pointer",
            children: t("reset_filters")
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/FilterSection.tsx",
            lineNumber: 96,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FilterSection.tsx",
        lineNumber: 88,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/FilterSection.tsx",
      lineNumber: 74,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-4 relative flex items-center", children: [
          /* @__PURE__ */ jsxDEV(Search, { className: `absolute ${dir === "rtl" ? "right-4" : "left-4"} w-4 h-4 text-brand-accent` }, void 0, false, {
            fileName: "/app/applet/src/components/FilterSection.tsx",
            lineNumber: 113,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              value: filters.searchQuery,
              onChange: handleSearchChange,
              placeholder: t("search_placeholder"),
              className: `w-full bg-[#111827]/70 border border-white/[0.08] focus:border-brand-accent text-white placeholder-gray-500 rounded-xl ${dir === "rtl" ? "pr-11 pl-4" : "pl-11 pr-4"} py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent/20 transition-all font-sans text-left`,
              dir
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/FilterSection.tsx",
              lineNumber: 114,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FilterSection.tsx",
          lineNumber: 112,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-8 flex flex-wrap gap-2 items-center", children: categoriesList.map((cat) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setCategory(cat.code),
            className: `px-4 py-2.5 rounded-xl text-xs font-mono tracking-widest font-semibold transition-all duration-300 border cursor-pointer uppercase ${filters.category === cat.code ? "bg-gradient-to-r from-brand-primary to-brand-accent text-white border-transparent shadow-lg shadow-brand-primary/15 scale-105" : "bg-white/[0.02] text-gray-400 hover:text-white border-white/[0.06] hover:bg-white/[0.05]"}`,
            children: cat.name
          },
          cat.code,
          false,
          {
            fileName: "/app/applet/src/components/FilterSection.tsx",
            lineNumber: 126,
            columnNumber: 15
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/FilterSection.tsx",
          lineNumber: 124,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FilterSection.tsx",
        lineNumber: 109,
        columnNumber: 9
      }, this),
      !collapsed && /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/[0.06] relative z-20", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2.5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-gray-400 tracking-wider uppercase", children: t("max_budget") }, void 0, false, {
              fileName: "/app/applet/src/components/FilterSection.tsx",
              lineNumber: 149,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent font-black", children: lang === "ar" ? `${filters.priceRange.toLocaleString()} جنيه` : `${filters.priceRange.toLocaleString()} EGP` }, void 0, false, {
              fileName: "/app/applet/src/components/FilterSection.tsx",
              lineNumber: 150,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FilterSection.tsx",
            lineNumber: 148,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "range",
              min: "5000",
              max: "5000000",
              step: "5000",
              value: filters.priceRange,
              onChange: handlePriceChange,
              className: "w-full accent-brand-accent"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/FilterSection.tsx",
              lineNumber: 154,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[10px] font-mono text-gray-600", children: [
            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "5,000 جنيه" : "5,000 EGP" }, void 0, false, {
              fileName: "/app/applet/src/components/FilterSection.tsx",
              lineNumber: 164,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "5,000,000 جنيه" : "5,000,000 EGP" }, void 0, false, {
              fileName: "/app/applet/src/components/FilterSection.tsx",
              lineNumber: 165,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FilterSection.tsx",
            lineNumber: 163,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FilterSection.tsx",
          lineNumber: 147,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2.5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-gray-400 tracking-wider uppercase", children: t("min_speed") }, void 0, false, {
              fileName: "/app/applet/src/components/FilterSection.tsx",
              lineNumber: 172,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-brand-secondary font-black", children: [
              speedRange,
              " KM/H"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/FilterSection.tsx",
              lineNumber: 173,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FilterSection.tsx",
            lineNumber: 171,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "range",
              min: "100",
              max: "400",
              step: "10",
              value: speedRange,
              onChange: (e) => onSpeedRangeChange(parseInt(e.target.value, 10)),
              className: "w-full accent-brand-secondary"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/FilterSection.tsx",
              lineNumber: 175,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[10px] font-mono text-gray-600", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "100 KM/H" }, void 0, false, {
              fileName: "/app/applet/src/components/FilterSection.tsx",
              lineNumber: 185,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "400 KM/H" }, void 0, false, {
              fileName: "/app/applet/src/components/FilterSection.tsx",
              lineNumber: 186,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FilterSection.tsx",
            lineNumber: 184,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FilterSection.tsx",
          lineNumber: 170,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2.5 text-left", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-mono text-gray-400 tracking-wider uppercase", children: t("sort_flights") }, void 0, false, {
            fileName: "/app/applet/src/components/FilterSection.tsx",
            lineNumber: 192,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "relative", children: /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: filters.sortBy,
              onChange: handleSortChange,
              className: "w-full bg-[#111827]/70 border border-white/[0.08] text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent font-mono uppercase",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "default", children: t("sort_default") }, void 0, false, {
                  fileName: "/app/applet/src/components/FilterSection.tsx",
                  lineNumber: 201,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "price-asc", children: t("sort_price_asc") }, void 0, false, {
                  fileName: "/app/applet/src/components/FilterSection.tsx",
                  lineNumber: 202,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "price-desc", children: t("sort_price_desc") }, void 0, false, {
                  fileName: "/app/applet/src/components/FilterSection.tsx",
                  lineNumber: 203,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "speed-desc", children: t("sort_speed_desc") }, void 0, false, {
                  fileName: "/app/applet/src/components/FilterSection.tsx",
                  lineNumber: 204,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/FilterSection.tsx",
              lineNumber: 196,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/FilterSection.tsx",
            lineNumber: 195,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FilterSection.tsx",
          lineNumber: 191,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "col-span-1 md:col-span-3 pt-2", children: /* @__PURE__ */ jsxDEV("label", { className: "inline-flex items-center gap-2.5 cursor-pointer select-none", children: [
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "checkbox",
              checked: filters.onlyPopular,
              onChange: togglePopularOnly,
              className: "w-4 h-4 rounded border-brand-accent bg-[#111827]"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/FilterSection.tsx",
              lineNumber: 212,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-gray-300 font-bold uppercase", children: [
            "⭐ SHOW ONLY ",
            t("crowned_popular"),
            " EXCLUSIVES"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FilterSection.tsx",
            lineNumber: 218,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FilterSection.tsx",
          lineNumber: 211,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/FilterSection.tsx",
          lineNumber: 210,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FilterSection.tsx",
        lineNumber: 144,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/FilterSection.tsx",
      lineNumber: 106,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/FilterSection.tsx",
    lineNumber: 67,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZpbHRlclNlY3Rpb24udHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU2VhcmNoLCBTbGlkZXJzSG9yaXpvbnRhbCwgQXJyb3dVcERvd24sIEZsYW1lLCBIZWxwQ2lyY2xlIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IEZpbHRlclN0YXRlLCBDYXRlZ29yeVNsdWcgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyB1c2VMYW5ndWFnZSB9IGZyb20gJy4uL2NvbnRleHQvTGFuZ3VhZ2VDb250ZXh0JztcblxuaW50ZXJmYWNlIEZpbHRlclNlY3Rpb25Qcm9wcyB7XG4gIGZpbHRlcnM6IEZpbHRlclN0YXRlO1xuICBvbkZpbHRlckNoYW5nZTogKG5ld0ZpbHRlcnM6IEZpbHRlclN0YXRlKSA9PiB2b2lkO1xuICBzcGVlZFJhbmdlOiBudW1iZXI7XG4gIG9uU3BlZWRSYW5nZUNoYW5nZTogKHNwZWVkOiBudW1iZXIpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZpbHRlclNlY3Rpb24oe1xuICBmaWx0ZXJzLFxuICBvbkZpbHRlckNoYW5nZSxcbiAgc3BlZWRSYW5nZSxcbiAgb25TcGVlZFJhbmdlQ2hhbmdlLFxufTogRmlsdGVyU2VjdGlvblByb3BzKSB7XG4gIGNvbnN0IFtjb2xsYXBzZWQsIHNldENvbGxhcHNlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IHsgbGFuZywgZGlyLCB0IH0gPSB1c2VMYW5ndWFnZSgpO1xuXG4gIGNvbnN0IHNldENhdGVnb3J5ID0gKGNhdGVnb3J5OiBDYXRlZ29yeVNsdWcgfCAnQUxMJykgPT4ge1xuICAgIG9uRmlsdGVyQ2hhbmdlKHsgLi4uZmlsdGVycywgY2F0ZWdvcnkgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VhcmNoQ2hhbmdlID0gKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgb25GaWx0ZXJDaGFuZ2UoeyAuLi5maWx0ZXJzLCBzZWFyY2hRdWVyeTogZS50YXJnZXQudmFsdWUgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUHJpY2VDaGFuZ2UgPSAoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBvbkZpbHRlckNoYW5nZSh7IC4uLmZpbHRlcnMsIHByaWNlUmFuZ2U6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlLCAxMCkgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU29ydENoYW5nZSA9IChlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MU2VsZWN0RWxlbWVudD4pID0+IHtcbiAgICBvbkZpbHRlckNoYW5nZSh7IC4uLmZpbHRlcnMsIHNvcnRCeTogZS50YXJnZXQudmFsdWUgYXMgRmlsdGVyU3RhdGVbJ3NvcnRCeSddIH0pO1xuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZVBvcHVsYXJPbmx5ID0gKCkgPT4ge1xuICAgIG9uRmlsdGVyQ2hhbmdlKHsgLi4uZmlsdGVycywgb25seVBvcHVsYXI6ICFmaWx0ZXJzLm9ubHlQb3B1bGFyIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlc2V0RmlsdGVycyA9ICgpID0+IHtcbiAgICBvbkZpbHRlckNoYW5nZSh7XG4gICAgICBzZWFyY2hRdWVyeTogJycsXG4gICAgICBjYXRlZ29yeTogJ0FMTCcsXG4gICAgICBwcmljZVJhbmdlOiA1MDAwMDAwLFxuICAgICAgc29ydEJ5OiAnZGVmYXVsdCcsXG4gICAgICBvbmx5UG9wdWxhcjogZmFsc2UsXG4gICAgfSk7XG4gICAgb25TcGVlZFJhbmdlQ2hhbmdlKDEwMCk7XG4gIH07XG5cbiAgY29uc3QgY2F0ZWdvcmllc0xpc3Q6IHsgY29kZTogQ2F0ZWdvcnlTbHVnIHwgJ0FMTCc7IG5hbWU6IHN0cmluZyB9W10gPSBbXG4gICAgeyBjb2RlOiAnQUxMJywgbmFtZTogdCgnY2F0X0FMTCcpIH0sXG4gICAgeyBjb2RlOiAnQScsIG5hbWU6IHQoJ2NhdF9BJykgfSxcbiAgICB7IGNvZGU6ICdCJywgbmFtZTogdCgnY2F0X0InKSB9LFxuICAgIHsgY29kZTogJ0MnLCBuYW1lOiB0KCdjYXRfQycpIH0sXG4gICAgeyBjb2RlOiAnUycsIG5hbWU6IHQoJ2NhdF9TJykgfSxcbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGlkPVwiZ2FsbGVyeVwiIGNsYXNzTmFtZT1cImdsYXNzLXBhbmVsIHJvdW5kZWQtM3hsIHAtNiBzbTpwLTggbWF4LXctN3hsIG14LWF1dG8gYm9yZGVyIGJvcmRlci13aGl0ZS81IHJlbGF0aXZlIHotMTAgYm94LWdsb3ctaW5kaWdvIHRleHQtbGVmdFwiIGRpcj17ZGlyfT5cbiAgICAgIFxuICAgICAgey8qIERlY29yYXRpdmUgY3liZXIgY29ybmVyIGhpZ2hsaWdodHMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIGxlZnQtMCB3LTggaC04IGJvcmRlci10LTIgYm9yZGVyLWwtMiBib3JkZXItYnJhbmQtYWNjZW50IHJvdW5kZWQtdGwtM3hsIG9wYWNpdHktNjBcIiAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMCByaWdodC0wIHctOCBoLTggYm9yZGVyLWItMiBib3JkZXItci0yIGJvcmRlci1icmFuZC1zZWNvbmRhcnkgcm91bmRlZC1ici0zeGwgb3BhY2l0eS02MFwiIC8+XG5cbiAgICAgIHsvKiBIZWFkZXIgYW5kIHRvcCBwYW5lbCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBsZzppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC02IG1iLThcIiBkaXI9e2Rpcn0+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtYi0yXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoLTIgdy0yIHJvdW5kZWQtZnVsbCBiZy1icmFuZC1hY2NlbnQgYW5pbWF0ZS1waW5nXCIgLz5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgdGV4dC13aGl0ZSB1cHBlcmNhc2UgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gPD7Yp9mE2YXYudix2LYgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1icmFuZC1hY2NlbnRcIj7Yp9mE2LHZgtmF2Yog2KfZhNmB2K7ZhTwvc3Bhbj48Lz4gOiA8PkRJR0lUQUwgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1icmFuZC1hY2NlbnRcIj5TSE9XUk9PTTwvc3Bhbj48Lz59XG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTQwMCBmb250LXNhbnMgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICB7dCgnc2hvd3Jvb21fZGVzYycpfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEJ1dHRvbnMgLyBTZXR0aW5ncyBpbmRpY2F0b3JzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Q29sbGFwc2VkKCFjb2xsYXBzZWQpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBob3Zlcjpib3JkZXItYnJhbmQtYWNjZW50IGZvbnQtbW9ubyB0ZXh0LXhzIHRyYWNraW5nLXdpZGVyIHRleHQtZ3JheS0zMDAgaG92ZXI6dGV4dC13aGl0ZSBiZy1bIzBCMEYxQV0vNDAgdHJhbnNpdGlvbi1jb2xvcnMgcG9pbnRlci1ldmVudHMtYXV0byBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFNsaWRlcnNIb3Jpem9udGFsIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1icmFuZC1hY2NlbnRcIiAvPlxuICAgICAgICAgICAgPHNwYW4+e2NvbGxhcHNlZCA/IHQoJ3Nob3dfYWR2YW5jZWQnKSA6IHQoJ2hpZGVfYWR2YW5jZWQnKX08L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17cmVzZXRGaWx0ZXJzfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBob3Zlcjpib3JkZXItYnJhbmQtc2Vjb25kYXJ5IGZvbnQtbW9ubyB0ZXh0LXhzIHRyYWNraW5nLXdpZGVyIHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSBiZy1bIzBCMEYxQV0vMjAgdHJhbnNpdGlvbi1jb2xvcnMgcG9pbnRlci1ldmVudHMtYXV0byBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3QoJ3Jlc2V0X2ZpbHRlcnMnKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIENvcmUgU2VhcmNoICYgQ2F0ZWdvcmllcyByb3cgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgICBcbiAgICAgICAgey8qIFJvdyAxOiBTZWFyY2ggJiBDYXRlZ29yaWVzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC00XCI+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIFNlYXJjaCBCb3ggKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi00IHJlbGF0aXZlIGZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICA8U2VhcmNoIGNsYXNzTmFtZT17YGFic29sdXRlICR7ZGlyID09PSAncnRsJyA/ICdyaWdodC00JyA6ICdsZWZ0LTQnfSB3LTQgaC00IHRleHQtYnJhbmQtYWNjZW50YH0gLz5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIHZhbHVlPXtmaWx0ZXJzLnNlYXJjaFF1ZXJ5fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlU2VhcmNoQ2hhbmdlfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dCgnc2VhcmNoX3BsYWNlaG9sZGVyJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBiZy1bIzExMTgyN10vNzAgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wOF0gZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudCB0ZXh0LXdoaXRlIHBsYWNlaG9sZGVyLWdyYXktNTAwIHJvdW5kZWQteGwgJHtkaXIgPT09ICdydGwnID8gJ3ByLTExIHBsLTQnIDogJ3BsLTExIHByLTQnfSBweS0zIHRleHQtc20gZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMSBmb2N1czpyaW5nLWJyYW5kLWFjY2VudC8yMCB0cmFuc2l0aW9uLWFsbCBmb250LXNhbnMgdGV4dC1sZWZ0YH0gZGlyPXtkaXJ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIENhdGVnb3JpZXMgc2VsZWN0IHBpbGxzIGNvbnRhaW5lciAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTggZmxleCBmbGV4LXdyYXAgZ2FwLTIgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICB7Y2F0ZWdvcmllc0xpc3QubWFwKChjYXQpID0+IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGtleT17Y2F0LmNvZGV9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Q2F0ZWdvcnkoY2F0LmNvZGUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMi41IHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGJvcmRlciBjdXJzb3ItcG9pbnRlciB1cHBlcmNhc2UgJHtcbiAgICAgICAgICAgICAgICAgIGZpbHRlcnMuY2F0ZWdvcnkgPT09IGNhdC5jb2RlXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1icmFuZC1wcmltYXJ5IHRvLWJyYW5kLWFjY2VudCB0ZXh0LXdoaXRlIGJvcmRlci10cmFuc3BhcmVudCBzaGFkb3ctbGcgc2hhZG93LWJyYW5kLXByaW1hcnkvMTUgc2NhbGUtMTA1J1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy13aGl0ZS9bMC4wMl0gdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGJvcmRlci13aGl0ZS9bMC4wNl0gaG92ZXI6Ymctd2hpdGUvWzAuMDVdJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NhdC5uYW1lfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDb2xsYXBzaWJsZSBQYW5lbCB3aXRoIEFkdmFuY2VkIEZpbHRlcnMgKi99XG4gICAgICAgIHshY29sbGFwc2VkICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTMgZ2FwLTYgcHQtNiBib3JkZXItdCBib3JkZXItd2hpdGUvWzAuMDZdIHJlbGF0aXZlIHotMjBcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgey8qIFByaWNlIHNsaWRlciBmaWx0ZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMi41XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0cmFja2luZy13aWRlciB1cHBlcmNhc2VcIj57dCgnbWF4X2J1ZGdldCcpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJyYW5kLWFjY2VudCBmb250LWJsYWNrXCI+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/IGAke2ZpbHRlcnMucHJpY2VSYW5nZS50b0xvY2FsZVN0cmluZygpfSDYrNmG2YrZh2AgOiBgJHtmaWx0ZXJzLnByaWNlUmFuZ2UudG9Mb2NhbGVTdHJpbmcoKX0gRUdQYH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgIG1pbj1cIjUwMDBcIlxuICAgICAgICAgICAgICAgIG1heD1cIjUwMDAwMDBcIlxuICAgICAgICAgICAgICAgIHN0ZXA9XCI1MDAwXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZmlsdGVycy5wcmljZVJhbmdlfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVQcmljZUNoYW5nZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWJyYW5kLWFjY2VudFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtZ3JheS02MDBcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICc1LDAwMCDYrNmG2YrZhycgOiAnNSwwMDAgRUdQJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAnNSwwMDAsMDAwINis2YbZitmHJyA6ICc1LDAwMCwwMDAgRUdQJ308L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBTcGVlZCBzbGlkZXIgZmlsdGVyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIuNVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlXCI+e3QoJ21pbl9zcGVlZCcpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJyYW5kLXNlY29uZGFyeSBmb250LWJsYWNrXCI+e3NwZWVkUmFuZ2V9IEtNL0g8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgIG1pbj1cIjEwMFwiXG4gICAgICAgICAgICAgICAgbWF4PVwiNDAwXCJcbiAgICAgICAgICAgICAgICBzdGVwPVwiMTBcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtzcGVlZFJhbmdlfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25TcGVlZFJhbmdlQ2hhbmdlKHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlLCAxMCkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtYnJhbmQtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1ncmF5LTYwMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPjEwMCBLTS9IPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjQwMCBLTS9IPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogU29ydCBieSBkcm9wZG93biAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yLjUgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWdyYXktNDAwIHRyYWNraW5nLXdpZGVyIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICAgIHt0KCdzb3J0X2ZsaWdodHMnKX1cbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtmaWx0ZXJzLnNvcnRCeX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVTb3J0Q2hhbmdlfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS83MCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcHgtNCBweS0yLjUgdGV4dC14cyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudCBmb250LW1vbm8gdXBwZXJjYXNlXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZGVmYXVsdFwiPnt0KCdzb3J0X2RlZmF1bHQnKX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwcmljZS1hc2NcIj57dCgnc29ydF9wcmljZV9hc2MnKX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwcmljZS1kZXNjXCI+e3QoJ3NvcnRfcHJpY2VfZGVzYycpfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInNwZWVkLWRlc2NcIj57dCgnc29ydF9zcGVlZF9kZXNjJyl9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBGaWx0ZXIgVG9nZ2xlOiBQb3B1bGFyIE9ubHkgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zcGFuLTEgbWQ6Y29sLXNwYW4tMyBwdC0yXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSBjdXJzb3ItcG9pbnRlciBzZWxlY3Qtbm9uZVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2ZpbHRlcnMub25seVBvcHVsYXJ9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dG9nZ2xlUG9wdWxhck9ubHl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTQgaC00IHJvdW5kZWQgYm9yZGVyLWJyYW5kLWFjY2VudCBiZy1bIzExMTgyN11cIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC1ncmF5LTMwMCBmb250LWJvbGQgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICDirZAgU0hPVyBPTkxZIHt0KCdjcm93bmVkX3BvcHVsYXInKX0gRVhDTFVTSVZFU1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9zZWN0aW9uPlxuICApO1xufVxuIl0sIm1hcHBpbmdzIjoiQUFxRU0sU0FTeUIsVUFUekI7QUFyRU47QUFBQTtBQUFBO0FBQUE7QUFLQSxTQUFnQixnQkFBZ0I7QUFDaEMsU0FBUyxRQUFRLHlCQUF5RDtBQUUxRSxTQUFTLG1CQUFtQjtBQVM1Qix3QkFBd0IsY0FBYztBQUFBLEVBQ3BDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsR0FBdUI7QUFDckIsUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQVMsS0FBSztBQUNoRCxRQUFNLEVBQUUsTUFBTSxLQUFLLEVBQUUsSUFBSSxZQUFZO0FBRXJDLFFBQU0sY0FBYyxDQUFDLGFBQW1DO0FBQ3RELG1CQUFlLEVBQUUsR0FBRyxTQUFTLFNBQVMsQ0FBQztBQUFBLEVBQ3pDO0FBRUEsUUFBTSxxQkFBcUIsQ0FBQyxNQUEyQztBQUNyRSxtQkFBZSxFQUFFLEdBQUcsU0FBUyxhQUFhLEVBQUUsT0FBTyxNQUFNLENBQUM7QUFBQSxFQUM1RDtBQUVBLFFBQU0sb0JBQW9CLENBQUMsTUFBMkM7QUFDcEUsbUJBQWUsRUFBRSxHQUFHLFNBQVMsWUFBWSxTQUFTLEVBQUUsT0FBTyxPQUFPLEVBQUUsRUFBRSxDQUFDO0FBQUEsRUFDekU7QUFFQSxR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