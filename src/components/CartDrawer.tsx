import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d4a02cea"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import { motion, AnimatePresence } from "/node_modules/.vite/deps/motion_react.js?v=f1f188c8";
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2 } from "/node_modules/.vite/deps/lucide-react.js?v=1004c77f";
import { useLanguage } from "/src/context/LanguageContext.tsx";
export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout
}) {
  const { lang, dir, t } = useLanguage();
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = Number(item.product.price) || Number(item.product.priceNum) || 0;
    return acc + price * item.quantity;
  }, 0);
  return /* @__PURE__ */ jsxDEV(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onClose,
        className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity",
        "aria-hidden": "true"
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/CartDrawer.tsx",
        lineNumber: 37,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { x: dir === "rtl" ? "-100%" : "100%" },
        animate: { x: 0 },
        exit: { x: dir === "rtl" ? "-100%" : "100%" },
        transition: { type: "spring", damping: 25, stiffness: 200 },
        className: `fixed top-0 bottom-0 ${dir === "rtl" ? "left-0" : "right-0"} w-full sm:w-[400px] bg-[#070A11] border-${dir === "rtl" ? "r" : "l"} border-white/[0.08] z-50 flex flex-col shadow-2xl`,
        dir,
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between p-5 border-b border-white/[0.08]", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-brand-primary/10 rounded-lg", children: /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-5 h-5 text-brand-accent" }, void 0, false, {
                fileName: "/app/applet/src/components/CartDrawer.tsx",
                lineNumber: 58,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/CartDrawer.tsx",
                lineNumber: 57,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("h2", { className: "text-white font-bold font-sans uppercase tracking-wide", children: lang === "ar" ? "سلة التسوق" : "Shopping Cart" }, void 0, false, {
                  fileName: "/app/applet/src/components/CartDrawer.tsx",
                  lineNumber: 61,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-500 font-mono", children: [
                  cartItems.length,
                  " ",
                  lang === "ar" ? "عناصر" : "ITEMS"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/CartDrawer.tsx",
                  lineNumber: 64,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/CartDrawer.tsx",
                lineNumber: 60,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/CartDrawer.tsx",
              lineNumber: 56,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onClose,
                className: "p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer",
                children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                  fileName: "/app/applet/src/components/CartDrawer.tsx",
                  lineNumber: 73,
                  columnNumber: 17
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/CartDrawer.tsx",
                lineNumber: 69,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CartDrawer.tsx",
            lineNumber: 55,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: cartItems.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "h-full flex flex-col items-center justify-center text-center space-y-4", children: [
            /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-12 h-12 text-gray-800" }, void 0, false, {
              fileName: "/app/applet/src/components/CartDrawer.tsx",
              lineNumber: 81,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500 font-mono text-sm uppercase", children: lang === "ar" ? "السلة فارغة" : "Cart is empty" }, void 0, false, {
              fileName: "/app/applet/src/components/CartDrawer.tsx",
              lineNumber: 82,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CartDrawer.tsx",
            lineNumber: 80,
            columnNumber: 17
          }, this) : cartItems.map((item) => /* @__PURE__ */ jsxDEV("div", { className: "flex gap-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl", children: [
            /* @__PURE__ */ jsxDEV(
              "img",
              {
                src: item.product.image,
                alt: item.product.name,
                className: "w-16 h-16 rounded-lg object-contain bg-[#0B0F1A]"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/CartDrawer.tsx",
                lineNumber: 89,
                columnNumber: 21
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-white font-bold font-sans line-clamp-1 pr-4", children: item.product.nameAr && lang === "ar" ? item.product.nameAr : item.product.name }, void 0, false, {
                  fileName: "/app/applet/src/components/CartDrawer.tsx",
                  lineNumber: 96,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("button", { onClick: () => onRemoveItem(item.id), className: "text-gray-500 hover:text-red-400 transition-colors cursor-pointer", children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/CartDrawer.tsx",
                  lineNumber: 100,
                  columnNumber: 28
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/CartDrawer.tsx",
                  lineNumber: 99,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/CartDrawer.tsx",
                lineNumber: 95,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-brand-accent font-mono text-xs font-bold mt-1", children: [
                (Number(item.product.price) || Number(item.product.priceNum) || 0).toLocaleString(),
                " ",
                lang === "ar" ? "ج.م" : "EGP"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/CartDrawer.tsx",
                lineNumber: 103,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 mt-2", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center bg-white/5 rounded-lg border border-white/10", children: [
                /* @__PURE__ */ jsxDEV("button", { onClick: () => onUpdateQuantity(item.id, -1), className: "p-1 hover:bg-white/10 rounded-l-lg text-gray-400 hover:text-white cursor-pointer", children: /* @__PURE__ */ jsxDEV(Minus, { className: "w-3 h-3" }, void 0, false, {
                  fileName: "/app/applet/src/components/CartDrawer.tsx",
                  lineNumber: 108,
                  columnNumber: 175
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/CartDrawer.tsx",
                  lineNumber: 108,
                  columnNumber: 28
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "w-6 text-center text-xs font-mono text-white", children: item.quantity }, void 0, false, {
                  fileName: "/app/applet/src/components/CartDrawer.tsx",
                  lineNumber: 109,
                  columnNumber: 28
                }, this),
                /* @__PURE__ */ jsxDEV("button", { onClick: () => onUpdateQuantity(item.id, 1), className: "p-1 hover:bg-white/10 rounded-r-lg text-gray-400 hover:text-white cursor-pointer", children: /* @__PURE__ */ jsxDEV(Plus, { className: "w-3 h-3" }, void 0, false, {
                  fileName: "/app/applet/src/components/CartDrawer.tsx",
                  lineNumber: 110,
                  columnNumber: 174
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/CartDrawer.tsx",
                  lineNumber: 110,
                  columnNumber: 28
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/CartDrawer.tsx",
                lineNumber: 107,
                columnNumber: 26
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/CartDrawer.tsx",
                lineNumber: 106,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/CartDrawer.tsx",
              lineNumber: 94,
              columnNumber: 21
            }, this)
          ] }, item.id, true, {
            fileName: "/app/applet/src/components/CartDrawer.tsx",
            lineNumber: 88,
            columnNumber: 19
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/CartDrawer.tsx",
            lineNumber: 78,
            columnNumber: 13
          }, this),
          cartItems.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "p-5 border-t border-white/[0.08] bg-[#0A0D15]", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-gray-400 font-sans text-sm uppercase", children: lang === "ar" ? "المجموع الإجمالي:" : "Subtotal:" }, void 0, false, {
                fileName: "/app/applet/src/components/CartDrawer.tsx",
                lineNumber: 123,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-white font-mono font-bold text-xl", children: [
                totalPrice.toLocaleString(),
                " ",
                lang === "ar" ? "ج.م" : "EGP"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/CartDrawer.tsx",
                lineNumber: 124,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/CartDrawer.tsx",
              lineNumber: 122,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onCheckout,
                className: "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-mono text-sm tracking-widest font-bold uppercase transition-colors cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/CartDrawer.tsx",
                    lineNumber: 131,
                    columnNumber: 19
                  }, this),
                  lang === "ar" ? "إتمام الطلب واتساب" : "Checkout via WhatsApp"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/CartDrawer.tsx",
                lineNumber: 127,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onClearCart,
                className: "w-full mt-3 py-2 text-gray-500 hover:text-red-400 font-mono text-xs uppercase cursor-pointer transition-colors",
                children: lang === "ar" ? "تفريغ السلة" : "Clear Cart"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/CartDrawer.tsx",
                lineNumber: 135,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CartDrawer.tsx",
            lineNumber: 121,
            columnNumber: 15
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/CartDrawer.tsx",
        lineNumber: 46,
        columnNumber: 11
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/CartDrawer.tsx",
    lineNumber: 36,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/CartDrawer.tsx",
    lineNumber: 34,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhcnREcmF3ZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBYLCBUcmFzaDIsIFBsdXMsIE1pbnVzLCBTaG9wcGluZ0JhZywgQXJyb3dVcFJpZ2h0LCBDaGVja0NpcmNsZTIgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgdXNlTGFuZ3VhZ2UgfSBmcm9tICcuLi9jb250ZXh0L0xhbmd1YWdlQ29udGV4dCc7XG5pbXBvcnQgeyBDYXJ0SXRlbSB9IGZyb20gJy4uL3R5cGVzJztcblxuaW50ZXJmYWNlIENhcnREcmF3ZXJQcm9wcyB7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgY2FydEl0ZW1zOiBDYXJ0SXRlbVtdO1xuICBvblVwZGF0ZVF1YW50aXR5OiAoaWQ6IHN0cmluZywgZGVsdGE6IG51bWJlcikgPT4gdm9pZDtcbiAgb25SZW1vdmVJdGVtOiAoaWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgb25DbGVhckNhcnQ6ICgpID0+IHZvaWQ7XG4gIG9uQ2hlY2tvdXQ6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENhcnREcmF3ZXIoe1xuICBpc09wZW4sXG4gIG9uQ2xvc2UsXG4gIGNhcnRJdGVtcyxcbiAgb25VcGRhdGVRdWFudGl0eSxcbiAgb25SZW1vdmVJdGVtLFxuICBvbkNsZWFyQ2FydCxcbiAgb25DaGVja291dFxufTogQ2FydERyYXdlclByb3BzKSB7XG4gIGNvbnN0IHsgbGFuZywgZGlyLCB0IH0gPSB1c2VMYW5ndWFnZSgpO1xuICBcbiAgY29uc3QgdG90YWxQcmljZSA9IGNhcnRJdGVtcy5yZWR1Y2UoKGFjYywgaXRlbSkgPT4ge1xuICAgIGNvbnN0IHByaWNlID0gTnVtYmVyKChpdGVtLnByb2R1Y3QgYXMgYW55KS5wcmljZSkgfHwgTnVtYmVyKChpdGVtLnByb2R1Y3QgYXMgYW55KS5wcmljZU51bSkgfHwgMDtcbiAgICByZXR1cm4gYWNjICsgKHByaWNlICogaXRlbS5xdWFudGl0eSk7XG4gIH0sIDApO1xuXG4gIHJldHVybiAoXG4gICAgPEFuaW1hdGVQcmVzZW5jZT5cbiAgICAgIHtpc09wZW4gJiYgKFxuICAgICAgICA8PlxuICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAgfX1cbiAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSB9fVxuICAgICAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCBiZy1ibGFjay82MCBiYWNrZHJvcC1ibHVyLXNtIHotNTAgdHJhbnNpdGlvbi1vcGFjaXR5XCJcbiAgICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICBpbml0aWFsPXt7IHg6IGRpciA9PT0gJ3J0bCcgPyAnLTEwMCUnIDogJzEwMCUnIH19XG4gICAgICAgICAgICBhbmltYXRlPXt7IHg6IDAgfX1cbiAgICAgICAgICAgIGV4aXQ9e3sgeDogZGlyID09PSAncnRsJyA/ICctMTAwJScgOiAnMTAwJScgfX1cbiAgICAgICAgICAgIHRyYW5zaXRpb249e3sgdHlwZTogJ3NwcmluZycsIGRhbXBpbmc6IDI1LCBzdGlmZm5lc3M6IDIwMCB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZml4ZWQgdG9wLTAgYm90dG9tLTAgJHtkaXIgPT09ICdydGwnID8gJ2xlZnQtMCcgOiAncmlnaHQtMCd9IHctZnVsbCBzbTp3LVs0MDBweF0gYmctWyMwNzBBMTFdIGJvcmRlci0ke2RpciA9PT0gJ3J0bCcgPyAncicgOiAnbCd9IGJvcmRlci13aGl0ZS9bMC4wOF0gei01MCBmbGV4IGZsZXgtY29sIHNoYWRvdy0yeGxgfVxuICAgICAgICAgICAgZGlyPXtkaXJ9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtNSBib3JkZXItYiBib3JkZXItd2hpdGUvWzAuMDhdXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiBiZy1icmFuZC1wcmltYXJ5LzEwIHJvdW5kZWQtbGdcIj5cbiAgICAgICAgICAgICAgICAgIDxTaG9wcGluZ0JhZyBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtYnJhbmQtYWNjZW50XCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1ib2xkIGZvbnQtc2FucyB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYs9mE2Kkg2KfZhNiq2LPZiNmCJyA6ICdTaG9wcGluZyBDYXJ0J31cbiAgICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICB7Y2FydEl0ZW1zLmxlbmd0aH0ge2xhbmcgPT09ICdhcicgPyAn2LnZhtin2LXYsScgOiAnSVRFTVMnfVxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yIGhvdmVyOmJnLXdoaXRlLzUgcm91bmRlZC1mdWxsIHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEl0ZW1zICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIHAtNCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAge2NhcnRJdGVtcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLWZ1bGwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1jZW50ZXIgc3BhY2UteS00XCI+XG4gICAgICAgICAgICAgICAgICA8U2hvcHBpbmdCYWcgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHRleHQtZ3JheS04MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMCBmb250LW1vbm8gdGV4dC1zbSB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KfZhNiz2YTYqSDZgdin2LHYutipJyA6ICdDYXJ0IGlzIGVtcHR5J31cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICBjYXJ0SXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aXRlbS5pZH0gY2xhc3NOYW1lPVwiZmxleCBnYXAtNCBwLTMgYmctd2hpdGUvWzAuMDJdIGJvcmRlciBib3JkZXItd2hpdGUvNSByb3VuZGVkLXhsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgXG4gICAgICAgICAgICAgICAgICAgICAgc3JjPXtpdGVtLnByb2R1Y3QuaW1hZ2V9IFxuICAgICAgICAgICAgICAgICAgICAgIGFsdD17aXRlbS5wcm9kdWN0Lm5hbWV9IFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTYgaC0xNiByb3VuZGVkLWxnIG9iamVjdC1jb250YWluIGJnLVsjMEIwRjFBXVwiIFxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtc3RhcnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXdoaXRlIGZvbnQtYm9sZCBmb250LXNhbnMgbGluZS1jbGFtcC0xIHByLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyhpdGVtLnByb2R1Y3QgYXMgYW55KS5uYW1lQXIgJiYgbGFuZyA9PT0gJ2FyJyA/IChpdGVtLnByb2R1Y3QgYXMgYW55KS5uYW1lQXIgOiBpdGVtLnByb2R1Y3QubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvblJlbW92ZUl0ZW0oaXRlbS5pZCl9IGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDAgaG92ZXI6dGV4dC1yZWQtNDAwIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWJyYW5kLWFjY2VudCBmb250LW1vbm8gdGV4dC14cyBmb250LWJvbGQgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyhOdW1iZXIoKGl0ZW0ucHJvZHVjdCBhcyBhbnkpLnByaWNlKSB8fCBOdW1iZXIoKGl0ZW0ucHJvZHVjdCBhcyBhbnkpLnByaWNlTnVtKSB8fCAwKS50b0xvY2FsZVN0cmluZygpfSB7bGFuZyA9PT0gJ2FyJyA/ICfYrC7ZhScgOiAnRUdQJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIG10LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGJnLXdoaXRlLzUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXdoaXRlLzEwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IG9uVXBkYXRlUXVhbnRpdHkoaXRlbS5pZCwgLTEpfSBjbGFzc05hbWU9XCJwLTEgaG92ZXI6Ymctd2hpdGUvMTAgcm91bmRlZC1sLWxnIHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlclwiPjxNaW51cyBjbGFzc05hbWU9XCJ3LTMgaC0zXCIvPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy02IHRleHQtY2VudGVyIHRleHQteHMgZm9udC1tb25vIHRleHQtd2hpdGVcIj57aXRlbS5xdWFudGl0eX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IG9uVXBkYXRlUXVhbnRpdHkoaXRlbS5pZCwgMSl9IGNsYXNzTmFtZT1cInAtMSBob3ZlcjpiZy13aGl0ZS8xMCByb3VuZGVkLXItbGcgdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGN1cnNvci1wb2ludGVyXCI+PFBsdXMgY2xhc3NOYW1lPVwidy0zIGgtM1wiLz48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBGb290ZXIgKi99XG4gICAgICAgICAgICB7Y2FydEl0ZW1zLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSBib3JkZXItdCBib3JkZXItd2hpdGUvWzAuMDhdIGJnLVsjMEEwRDE1XVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIG1iLTRcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgZm9udC1zYW5zIHRleHQtc20gdXBwZXJjYXNlXCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNmF2KzZhdmI2Lkg2KfZhNil2KzZhdin2YTZijonIDogJ1N1YnRvdGFsOid9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQteGxcIj57dG90YWxQcmljZS50b0xvY2FsZVN0cmluZygpfSB7bGFuZyA9PT0gJ2FyJyA/ICfYrC7ZhScgOiAnRUdQJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17b25DaGVja291dH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBweS0zLjUgcm91bmRlZC14bCBiZy1ncmVlbi01MDAgaG92ZXI6YmctZ3JlZW4tNjAwIHRleHQtd2hpdGUgZm9udC1tb25vIHRleHQtc20gdHJhY2tpbmctd2lkZXN0IGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYpdiq2YXYp9mFINin2YTYt9mE2Kgg2YjYp9iq2LPYp9ioJyA6ICdDaGVja291dCB2aWEgV2hhdHNBcHAnfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xlYXJDYXJ0fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG10LTMgcHktMiB0ZXh0LWdyYXktNTAwIGhvdmVyOnRleHQtcmVkLTQwMCBmb250LW1vbm8gdGV4dC14cyB1cHBlcmNhc2UgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9iq2YHYsdmK2Log2KfZhNiz2YTYqScgOiAnQ2xlYXIgQ2FydCd9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgIDwvPlxuICAgICAgKX1cbiAgICA8L0FuaW1hdGVQcmVzZW5jZT5cbiAgKTtcbn1cbiJdLCJtYXBwaW5ncyI6IkFBbUNRLG1CQUNFLGNBREY7QUFsQ1IsU0FBUyxRQUFRLHVCQUF1QjtBQUN4QyxTQUFTLEdBQUcsUUFBUSxNQUFNLE9BQU8sYUFBMkIsb0JBQW9CO0FBQ2hGLFNBQVMsbUJBQW1CO0FBYTVCLHdCQUF3QixXQUFXO0FBQUEsRUFDakM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixHQUFvQjtBQUNsQixRQUFNLEVBQUUsTUFBTSxLQUFLLEVBQUUsSUFBSSxZQUFZO0FBRXJDLFFBQU0sYUFBYSxVQUFVLE9BQU8sQ0FBQyxLQUFLLFNBQVM7QUFDakQsVUFBTSxRQUFRLE9BQVEsS0FBSyxRQUFnQixLQUFLLEtBQUssT0FBUSxLQUFLLFFBQWdCLFFBQVEsS0FBSztBQUMvRixXQUFPLE1BQU8sUUFBUSxLQUFLO0FBQUEsRUFDN0IsR0FBRyxDQUFDO0FBRUosU0FDRSx1QkFBQyxtQkFDRSxvQkFDQyxtQ0FDRTtBQUFBO0FBQUEsTUFBQyxPQUFPO0FBQUEsTUFBUDtBQUFBLFFBQ0MsU0FBUyxFQUFFLFNBQVMsRUFBRTtBQUFBLFFBQ3RCLFNBQVMsRUFBRSxTQUFTLEVBQUU7QUFBQSxRQUN0QixNQUFNLEVBQUUsU0FBUyxFQUFFO0FBQUEsUUFDbkIsU0FBUztBQUFBLFFBQ1QsV0FBVTtBQUFBLFFBQ1YsZUFBWTtBQUFBO0FBQUEsTUFOZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFPQTtBQUFBLElBRUE7QUFBQSxNQUFDLE9BQU87QUFBQSxNQUFQO0FBQUEsUUFDQyxTQUFTLEVBQUUsR0FBRyxRQUFR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