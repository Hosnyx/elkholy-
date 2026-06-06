import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d4a02cea"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=d4a02cea"; const useState = __vite__cjsImport1_react["useState"];
import { Plus, Edit2, Trash2, Package } from "/node_modules/.vite/deps/lucide-react.js?v=1004c77f";
import { useLanguage } from "/src/context/LanguageContext.tsx";
export default function StoreAdminPanel({ storeProducts, onUpdateStoreProducts }) {
  const { lang, dir, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const defaultProduct = {
    id: `PRD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    name: "",
    nameAr: "",
    description: "",
    descriptionAr: "",
    category: "Parts",
    price: 0,
    originalPrice: 0,
    discount: 0,
    discountType: "percentage",
    image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=400&q=80",
    stockCount: 10,
    soldCount: 0,
    brand: "",
    isOffer: false,
    offerLabel: "",
    offerLabelAr: "",
    isHidden: false,
    galleryUrls: [],
    specs: "",
    specsAr: ""
  };
  const [editingItem, setEditingItem] = useState(null);
  const getCalculatedPrice = (orig, disc, type) => {
    if (!orig) return 0;
    if (!disc || disc <= 0) return orig;
    if (type === "percentage") {
      return Math.max(0, Math.round(orig * (1 - disc / 100)));
    } else {
      return Math.max(0, orig - disc);
    }
  };
  const handleAddNew = () => {
    setEditingItem({ ...defaultProduct, id: `PRD-${Math.random().toString(36).substring(2, 8).toUpperCase()}` });
  };
  const handleSaveItem = () => {
    if (editingItem) {
      let finalPrice = editingItem.price;
      if (editingItem.originalPrice && editingItem.discount && editingItem.discount > 0) {
        finalPrice = getCalculatedPrice(editingItem.originalPrice, editingItem.discount, editingItem.discountType || "percentage");
      }
      const itemToSave = {
        ...editingItem,
        price: finalPrice
      };
      if (storeProducts.find((p) => p.id === itemToSave.id)) {
        onUpdateStoreProducts(storeProducts.map((p) => p.id === itemToSave.id ? itemToSave : p));
      } else {
        onUpdateStoreProducts([...storeProducts, itemToSave]);
      }
      setEditingItem(null);
    }
  };
  const handleRemoveItem = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      onUpdateStoreProducts(storeProducts.filter((p) => p.id !== id));
    }
  };
  const filteredProducts = storeProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.nameAr && p.nameAr.includes(searchQuery) || p.id.toLowerCase().includes(searchQuery.toLowerCase()));
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", dir, children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row justify-between items-center bg-[#070A11]/60 p-5 rounded-2xl border border-white/5 gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxDEV(Package, { className: "w-5 h-5 text-green-400" }, void 0, false, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 93,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold font-sans text-white uppercase tracking-widest text-left", children: lang === "ar" ? "إدارة المتجر الإلكتروني" : "Store Management" }, void 0, false, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 94,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 w-full sm:w-auto", children: [
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            placeholder: lang === "ar" ? "بحث..." : "Search Products...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "flex-1 bg-[#0F172A] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-brand-primary outline-none"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 99,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleAddNew,
            className: "flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer shadow-lg shadow-green-500/20",
            children: [
              /* @__PURE__ */ jsxDEV(Plus, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
                lineNumber: 110,
                columnNumber: 13
              }, this),
              lang === "ar" ? "إضافة منتج" : "ADD PRODUCT"
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 106,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
        lineNumber: 98,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
      lineNumber: 91,
      columnNumber: 7
    }, this),
    editingItem && /* @__PURE__ */ jsxDEV("div", { className: "p-6 bg-[#0F172A] border border-white/10 rounded-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "text-white font-bold font-sans uppercase mb-4 pb-2 border-b border-white/10", children: storeProducts.find((p) => p.id === editingItem.id) ? "Edit Product" : "Add New Product" }, void 0, false, {
        fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
        lineNumber: 118,
        columnNumber: 12
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] uppercase font-bold text-gray-500 tracking-widest", children: lang === "ar" ? "اسم المنتج (انجليزي)" : "En Name" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 124,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              value: editingItem.name,
              onChange: (e) => setEditingItem({ ...editingItem, name: e.target.value }),
              className: "w-full bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white",
              placeholder: "Leather Jacket"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 125,
              columnNumber: 16
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 123,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: `space-y-1 ${lang === "ar" ? "text-right" : "text-left"}`, children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] uppercase font-bold text-gray-500 tracking-widest", children: lang === "ar" ? "اسم المنتج (العربية)" : "Ar Name" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 134,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              value: editingItem.nameAr,
              onChange: (e) => setEditingItem({ ...editingItem, nameAr: e.target.value }),
              className: `w-full bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-sans ${lang === "ar" ? "text-right" : "text-left"}`,
              placeholder: "جاكيت جلد",
              dir: lang === "ar" ? "rtl" : "ltr"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 135,
              columnNumber: 16
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 133,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] uppercase font-bold text-gray-500 tracking-widest", children: lang === "ar" ? "العلامة التجارية" : "Brand" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 145,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              value: editingItem.brand,
              onChange: (e) => setEditingItem({ ...editingItem, brand: e.target.value }),
              className: "w-full bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white",
              placeholder: "Alpinestars"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 146,
              columnNumber: 16
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 144,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] uppercase font-bold text-gray-500 tracking-widest", children: lang === "ar" ? "التصنيف" : "Category" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 155,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: editingItem.category,
              onChange: (e) => setEditingItem({ ...editingItem, category: e.target.value }),
              className: "w-full bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "Oils", children: lang === "ar" ? "زيوت ومحروقات" : "Oils & Lubricants" }, void 0, false, {
                  fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
                  lineNumber: 161,
                  columnNumber: 18
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "Safety", children: lang === "ar" ? "معدات أمان" : "Safety Equipment" }, void 0, false, {
                  fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
                  lineNumber: 162,
                  columnNumber: 18
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "Smart", children: lang === "ar" ? "اكسسوارات ذكية" : "Smart Accessories" }, void 0, false, {
                  fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
                  lineNumber: 163,
                  columnNumber: 18
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "Parts", children: lang === "ar" ? "قطع غيار" : "Spare Parts" }, void 0, false, {
                  fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
                  lineNumber: 164,
                  columnNumber: 18
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "Lifestyle", children: lang === "ar" ? "منتجات لايف ستايل" : "Lifestyle Products" }, void 0, false, {
                  fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
                  lineNumber: 165,
                  columnNumber: 18
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 156,
              columnNumber: 16
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 154,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] uppercase font-bold text-gray-500 tracking-widest", children: lang === "ar" ? "السعر الحالي (ج.م)" : "Current Price (EGP)" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 170,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "number",
              value: editingItem.price === 0 ? "" : editingItem.price,
              placeholder: "0",
              onChange: (e) => setEditingItem({ ...editingItem, price: e.target.value === "" ? 0 : Number(e.target.value) }),
              className: "w-full bg-[#0B0F1A] border border-brand-accent/50 rounded-lg px-3 py-2 text-sm text-white font-mono"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 171,
              columnNumber: 16
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 169,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] uppercase font-bold text-gray-500 tracking-widest", children: lang === "ar" ? "السعر الأصلي (اختياري)" : "Original Price (EGP - Optional)" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 181,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "number",
              value: editingItem.originalPrice === 0 || !editingItem.originalPrice ? "" : editingItem.originalPrice,
              placeholder: "0",
              onChange: (e) => {
                const orig = e.target.value === "" ? 0 : Number(e.target.value);
                const disc = editingItem.discount || 0;
                const type = editingItem.discountType || "percentage";
                const newPrice = getCalculatedPrice(orig, disc, type);
                setEditingItem({ ...editingItem, originalPrice: orig, price: newPrice });
              },
              className: "w-full bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 182,
              columnNumber: 16
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 180,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left md:col-span-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] uppercase font-bold text-gray-500 tracking-widest", children: lang === "ar" ? "رابط الصورة" : "Image URL" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 198,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              value: editingItem.image,
              onChange: (e) => setEditingItem({ ...editingItem, image: e.target.value }),
              className: "w-full bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-400 font-mono",
              placeholder: "https://..."
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 199,
              columnNumber: 16
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 197,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] uppercase font-bold text-gray-500 tracking-widest", children: lang === "ar" ? "الكمية المتاحة (المخزون)" : "Stock Available" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 208,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "number",
              value: editingItem.stockCount === 0 || !editingItem.stockCount ? "" : editingItem.stockCount,
              placeholder: "0",
              onChange: (e) => setEditingItem({ ...editingItem, stockCount: e.target.value === "" ? 0 : Number(e.target.value) }),
              className: "w-full bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 209,
              columnNumber: 16
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 207,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left flex items-end", children: /* @__PURE__ */ jsxDEV("label", { className: "flex items-center gap-2 cursor-pointer p-2 hover:bg-white/5 rounded-xl border border-white/5 h-[38px] w-full", children: [
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "checkbox",
              checked: editingItem.isOffer,
              onChange: (e) => setEditingItem({ ...editingItem, isOffer: e.target.checked }),
              className: "rounded bg-[#0B0F1A] border-white/20 text-brand-primary"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 220,
              columnNumber: 18
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs uppercase text-gray-300 font-bold tracking-widest", children: lang === "ar" ? "تفعيل مفتاح شارة العرض/الخصم" : "Active Offer/Sale Badge" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 226,
            columnNumber: 18
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 219,
          columnNumber: 16
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 218,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] uppercase font-bold text-gray-500 tracking-widest", children: lang === "ar" ? "نوع الخصم" : "Discount Type" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 232,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: editingItem.discountType || "percentage",
              onChange: (e) => {
                const type = e.target.value;
                const orig = editingItem.originalPrice || 0;
                const disc = editingItem.discount || 0;
                const newPrice = getCalculatedPrice(orig, disc, type);
                setEditingItem({ ...editingItem, discountType: type, price: newPrice });
              },
              className: "w-full bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "percentage", children: lang === "ar" ? "نسبة مئوية (%)" : "Percentage (%)" }, void 0, false, {
                  fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
                  lineNumber: 244,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "fixed", children: lang === "ar" ? "مبلغ ثابت (ج.م)" : "Fixed Amount (EGP)" }, void 0, false, {
                  fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
                  lineNumber: 245,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 233,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 231,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] uppercase font-bold text-gray-500 tracking-widest", children: lang === "ar" ? "قيمة الخصم" : "Discount Value" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 250,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "number",
              value: editingItem.discount === 0 || !editingItem.discount ? "" : editingItem.discount,
              placeholder: "0",
              onChange: (e) => {
                const disc = e.target.value === "" ? 0 : Number(e.target.value);
                const orig = editingItem.originalPrice || 0;
                const type = editingItem.discountType || "percentage";
                const newPrice = getCalculatedPrice(orig, disc, type);
                setEditingItem({ ...editingItem, discount: disc, price: newPrice });
              },
              className: "w-full bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 251,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 249,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left md:col-span-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] uppercase font-bold text-gray-500 tracking-widest", children: lang === "ar" ? "الوصف (بالإنجليزية)" : "Description (En)" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 268,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "textarea",
            {
              rows: 3,
              value: editingItem.description || "",
              onChange: (e) => setEditingItem({ ...editingItem, description: e.target.value }),
              className: "w-full bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white",
              placeholder: "Enter English description..."
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 269,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 267,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: `space-y-1 md:col-span-2 ${lang === "ar" ? "text-right" : "text-left"}`, children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] uppercase font-bold text-gray-500 tracking-widest", children: lang === "ar" ? "الوصف (بالعربية)" : "Description (Ar)" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 279,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "textarea",
            {
              rows: 3,
              value: editingItem.descriptionAr || "",
              onChange: (e) => setEditingItem({ ...editingItem, descriptionAr: e.target.value }),
              className: `w-full bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-sans ${lang === "ar" ? "text-right" : "text-left"}`,
              placeholder: "أدخل الوصف بالعربية...",
              dir: lang === "ar" ? "rtl" : "ltr"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 280,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 278,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] uppercase font-bold text-gray-500 tracking-widest", children: lang === "ar" ? "المواصفات (بالإنجليزية)" : "Specs (En)" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 292,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              value: editingItem.specs || "",
              onChange: (e) => setEditingItem({ ...editingItem, specs: e.target.value }),
              className: "w-full bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white",
              placeholder: "Material: High Grade | Weight: 1.5kg"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 293,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 291,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: `space-y-1 ${lang === "ar" ? "text-right" : "text-left"}`, children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] uppercase font-bold text-gray-500 tracking-widest", children: lang === "ar" ? "المواصفات (بالعربية)" : "Specs (Ar)" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 302,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              value: editingItem.specsAr || "",
              onChange: (e) => setEditingItem({ ...editingItem, specsAr: e.target.value }),
              className: `w-full bg-[#0B0F1A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-sans ${lang === "ar" ? "text-right" : "text-left"}`,
              placeholder: "المواصفات بالعربية...",
              dir: lang === "ar" ? "rtl" : "ltr"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 303,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 301,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
        lineNumber: 122,
        columnNumber: 12
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-2 text-xs text-brand-accent/80 font-mono text-center", children: "* Note: Saving a product automatically calculates and stores the final price set below if original price + discount is used." }, void 0, false, {
        fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
        lineNumber: 313,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end gap-3 pt-4 border-t border-white/10 mt-6", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setEditingItem(null),
            className: "px-5 py-2 font-mono text-xs uppercase tracking-widest text-gray-400 hover:text-white cursor-pointer",
            children: "Cancel"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 318,
            columnNumber: 14
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleSaveItem,
            className: "px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-accent text-[#0B0F1A] font-bold font-mono text-xs uppercase tracking-widest rounded-xl hover:brightness-110 cursor-pointer shadow-lg shadow-brand-primary/20",
            children: "Save Product"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 324,
            columnNumber: 14
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
        lineNumber: 317,
        columnNumber: 12
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
      lineNumber: 117,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
      filteredProducts.map((p) => /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-center gap-4 p-3 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors relative group", children: [
        /* @__PURE__ */ jsxDEV("img", { src: p.image, className: "w-16 h-16 rounded-xl object-contain bg-[#070A11] p-1" }, void 0, false, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 338,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0 md:text-left text-center", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 justify-center sm:justify-start", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-gray-500 bg-black tracking-widest px-2 py-0.5 rounded uppercase", children: p.id }, void 0, false, {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 341,
              columnNumber: 18
            }, this),
            p.isOffer && /* @__PURE__ */ jsxDEV("span", { className: "bg-red-500 text-white text-[9px] px-1 rounded font-bold uppercase tracking-widest", children: "OFFER" }, void 0, false, {
              fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
              lineNumber: 342,
              columnNumber: 32
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 340,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV("h4", { className: "text-white font-bold font-sans mt-0.5 truncate", children: lang === "ar" ? p.nameAr : p.name }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 344,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-brand-accent tracking-widest uppercase mt-0.5 font-mono", children: [
            p.brand,
            " | ",
            p.category
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 345,
            columnNumber: 16
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 339,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-white font-bold font-mono", children: [
            p.price.toLocaleString(),
            " EGP"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 349,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-gray-500 font-mono tracking-widest uppercase", children: [
            "Stock: ",
            p.stockCount
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 350,
            columnNumber: 16
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 348,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxDEV("button", { onClick: () => setEditingItem(p), className: "p-2 border border-white/10 hover:border-brand-primary hover:text-brand-primary rounded-xl transition-all cursor-pointer bg-[#0B0F1A]", children: /* @__PURE__ */ jsxDEV(Edit2, { className: "w-4 h-4" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 355,
            columnNumber: 18
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 354,
            columnNumber: 16
          }, this),
          /* @__PURE__ */ jsxDEV("button", { onClick: () => handleRemoveItem(p.id), className: "p-2 border border-white/10 hover:border-red-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer bg-[#0B0F1A]", children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 358,
            columnNumber: 18
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
            lineNumber: 357,
            columnNumber: 16
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 353,
          columnNumber: 14
        }, this)
      ] }, p.id, true, {
        fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
        lineNumber: 337,
        columnNumber: 11
      }, this)),
      filteredProducts.length === 0 && /* @__PURE__ */ jsxDEV("div", { className: "p-10 text-center border border-white/5 rounded-2xl bg-white/[0.01]", children: [
        /* @__PURE__ */ jsxDEV(Package, { className: "w-8 h-8 text-gray-600 mx-auto mb-3" }, void 0, false, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 365,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-gray-500 font-mono text-xs tracking-widest uppercase", children: "No products available" }, void 0, false, {
          fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
          lineNumber: 366,
          columnNumber: 14
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
        lineNumber: 364,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
      lineNumber: 335,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/StoreAdminPanel.tsx",
    lineNumber: 88,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN0b3JlQWRtaW5QYW5lbC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbW90aW9uLCBBbmltYXRlUHJlc2VuY2UgfSBmcm9tICdtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgUGx1cywgRWRpdDIsIFRyYXNoMiwgQ2hlY2tDaXJjbGUyLCBQYWNrYWdlLCBUYWcsIEZpbHRlciwgU2VhcmNoIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IHVzZUxhbmd1YWdlIH0gZnJvbSAnLi4vY29udGV4dC9MYW5ndWFnZUNvbnRleHQnO1xuaW1wb3J0IHsgU3RvcmVQcm9kdWN0IH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgTU9DS19TVE9SRV9QUk9EVUNUUyB9IGZyb20gJy4uL2RhdGFTdG9yZU1vY2snO1xuXG5pbnRlcmZhY2UgU3RvcmVBZG1pblBhbmVsUHJvcHMge1xuICBzdG9yZVByb2R1Y3RzOiBTdG9yZVByb2R1Y3RbXTtcbiAgb25VcGRhdGVTdG9yZVByb2R1Y3RzOiAocHJvZHVjdHM6IFN0b3JlUHJvZHVjdFtdKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdG9yZUFkbWluUGFuZWwoeyBzdG9yZVByb2R1Y3RzLCBvblVwZGF0ZVN0b3JlUHJvZHVjdHMgfTogU3RvcmVBZG1pblBhbmVsUHJvcHMpIHtcbiAgY29uc3QgeyBsYW5nLCBkaXIsIHQgfSA9IHVzZUxhbmd1YWdlKCk7XG4gIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xuICBcbiAgY29uc3QgZGVmYXVsdFByb2R1Y3Q6IFN0b3JlUHJvZHVjdCA9IHtcbiAgICBpZDogYFBSRC0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCA4KS50b1VwcGVyQ2FzZSgpfWAsXG4gICAgbmFtZTogJycsXG4gICAgbmFtZUFyOiAnJyxcbiAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgZGVzY3JpcHRpb25BcjogJycsXG4gICAgY2F0ZWdvcnk6ICdQYXJ0cycsXG4gICAgcHJpY2U6IDAsXG4gICAgb3JpZ2luYWxQcmljZTogMCxcbiAgICBkaXNjb3VudDogMCxcbiAgICBkaXNjb3VudFR5cGU6ICdwZXJjZW50YWdlJyxcbiAgICBpbWFnZTogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTU4OTgxODUyLTQyNmM2YzIyYTA2MD93PTQwMCZxPTgwJyxcbiAgICBzdG9ja0NvdW50OiAxMCxcbiAgICBzb2xkQ291bnQ6IDAsXG4gICAgYnJhbmQ6ICcnLFxuICAgIGlzT2ZmZXI6IGZhbHNlLFxuICAgIG9mZmVyTGFiZWw6ICcnLFxuICAgIG9mZmVyTGFiZWxBcjogJycsXG4gICAgaXNIaWRkZW46IGZhbHNlLFxuICAgIGdhbGxlcnlVcmxzOiBbXSxcbiAgICBzcGVjczogJycsXG4gICAgc3BlY3NBcjogJydcbiAgfTtcblxuICBjb25zdCBbZWRpdGluZ0l0ZW0sIHNldEVkaXRpbmdJdGVtXSA9IHVzZVN0YXRlPFN0b3JlUHJvZHVjdCB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGdldENhbGN1bGF0ZWRQcmljZSA9IChvcmlnOiBudW1iZXIsIGRpc2M6IG51bWJlciwgdHlwZTogJ3BlcmNlbnRhZ2UnIHwgJ2ZpeGVkJykgPT4ge1xuICAgIGlmICghb3JpZykgcmV0dXJuIDA7XG4gICAgaWYgKCFkaXNjIHx8IGRpc2MgPD0gMCkgcmV0dXJuIG9yaWc7XG4gICAgaWYgKHR5cGUgPT09ICdwZXJjZW50YWdlJykge1xuICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgucm91bmQob3JpZyAqICgxIC0gZGlzYyAvIDEwMCkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIG9yaWcgLSBkaXNjKTtcbiAgICB9XG4gIH07XG4gIFxuICBjb25zdCBoYW5kbGVBZGROZXcgPSAoKSA9PiB7XG4gICAgc2V0RWRpdGluZ0l0ZW0oeyAuLi5kZWZhdWx0UHJvZHVjdCwgaWQ6IGBQUkQtJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgOCkudG9VcHBlckNhc2UoKX1gIH0pO1xuICB9O1xuICBcbiAgY29uc3QgaGFuZGxlU2F2ZUl0ZW0gPSAoKSA9PiB7XG4gICAgaWYgKGVkaXRpbmdJdGVtKSB7XG4gICAgICAvLyBDYWxjdWxhdGUgZmluYWwgcHJpY2UgYXV0b21hdGljYWxseSBpZiBhIGRpc2NvdW50IGlzIGFjdGl2ZVxuICAgICAgbGV0IGZpbmFsUHJpY2UgPSBlZGl0aW5nSXRlbS5wcmljZTtcbiAgICAgIGlmIChlZGl0aW5nSXRlbS5vcmlnaW5hbFByaWNlICYmIGVkaXRpbmdJdGVtLmRpc2NvdW50ICYmIGVkaXRpbmdJdGVtLmRpc2NvdW50ID4gMCkge1xuICAgICAgICBmaW5hbFByaWNlID0gZ2V0Q2FsY3VsYXRlZFByaWNlKGVkaXRpbmdJdGVtLm9yaWdpbmFsUHJpY2UsIGVkaXRpbmdJdGVtLmRpc2NvdW50LCBlZGl0aW5nSXRlbS5kaXNjb3VudFR5cGUgfHwgJ3BlcmNlbnRhZ2UnKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QgaXRlbVRvU2F2ZSA9IHtcbiAgICAgICAgLi4uZWRpdGluZ0l0ZW0sXG4gICAgICAgIHByaWNlOiBmaW5hbFByaWNlXG4gICAgICB9O1xuXG4gICAgICBpZiAoc3RvcmVQcm9kdWN0cy5maW5kKHAgPT4gcC5pZCA9PT0gaXRlbVRvU2F2ZS5pZCkpIHtcbiAgICAgICAgb25VcGRhdGVTdG9yZVByb2R1Y3RzKHN0b3JlUHJvZHVjdHMubWFwKHAgPT4gcC5pZCA9PT0gaXRlbVRvU2F2ZS5pZCA/IGl0ZW1Ub1NhdmUgOiBwKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvblVwZGF0ZVN0b3JlUHJvZHVjdHMoWy4uLnN0b3JlUHJvZHVjdHMsIGl0ZW1Ub1NhdmVdKTtcbiAgICAgIH1cbiAgICAgIHNldEVkaXRpbmdJdGVtKG51bGwpO1xuICAgIH1cbiAgfTtcbiAgXG4gIGNvbnN0IGhhbmRsZVJlbW92ZUl0ZW0gPSAoaWQ6IHN0cmluZykgPT4ge1xuICAgIGlmIChjb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcHJvZHVjdD8nKSkge1xuICAgICAgb25VcGRhdGVTdG9yZVByb2R1Y3RzKHN0b3JlUHJvZHVjdHMuZmlsdGVyKChwKSA9PiBwLmlkICE9PSBpZCkpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBmaWx0ZXJlZFByb2R1Y3RzID0gc3RvcmVQcm9kdWN0cy5maWx0ZXIocCA9PiBwLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hRdWVyeS50b0xvd2VyQ2FzZSgpKSB8fCAocC5uYW1lQXIgJiYgcC5uYW1lQXIuaW5jbHVkZXMoc2VhcmNoUXVlcnkpKSB8fCBwLmlkLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoUXVlcnkudG9Mb3dlckNhc2UoKSkpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIiBkaXI9e2Rpcn0+XG4gICAgICAgXG4gICAgICB7LyogSGVhZGVyIGFuZCBBZGQgQnV0dG9uICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgYmctWyMwNzBBMTFdLzYwIHAtNSByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXdoaXRlLzUgZ2FwLTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB3LWZ1bGwgc206dy1hdXRvXCI+XG4gICAgICAgICAgPFBhY2thZ2UgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWdyZWVuLTQwMFwiIC8+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIGZvbnQtc2FucyB0ZXh0LXdoaXRlIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYpdiv2KfYsdipINin2YTZhdiq2KzYsSDYp9mE2KXZhNmD2KrYsdmI2YbZiicgOiAnU3RvcmUgTWFuYWdlbWVudCd9XG4gICAgICAgICAgPC9oMj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMiB3LWZ1bGwgc206dy1hdXRvXCI+XG4gICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2xhbmcgPT09ICdhcicgPyBcItio2K3Yqy4uLlwiIDogXCJTZWFyY2ggUHJvZHVjdHMuLi5cIn1cbiAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hRdWVyeX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoUXVlcnkoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIGJnLVsjMEYxNzJBXSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcHgtMyBweS0yIHRleHQtc20gdGV4dC13aGl0ZSBmb2N1czpib3JkZXItYnJhbmQtcHJpbWFyeSBvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQWRkTmV3fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIGJnLWdyZWVuLTUwMCBob3ZlcjpiZy1ncmVlbi02MDAgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCB3aGl0ZXNwYWNlLW5vd3JhcCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbGcgc2hhZG93LWdyZWVuLTUwMC8yMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFBsdXMgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYpdi22KfZgdipINmF2YbYqtisJyA6ICdBREQgUFJPRFVDVCd9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtlZGl0aW5nSXRlbSAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IGJnLVsjMEYxNzJBXSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtMnhsIHNwYWNlLXktNFwiPlxuICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LWJvbGQgZm9udC1zYW5zIHVwcGVyY2FzZSBtYi00IHBiLTIgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzEwXCI+XG4gICAgICAgICAgICAge3N0b3JlUHJvZHVjdHMuZmluZChwID0+IHAuaWQgPT09IGVkaXRpbmdJdGVtLmlkKSA/ICdFZGl0IFByb2R1Y3QnIDogJ0FkZCBOZXcgUHJvZHVjdCd9XG4gICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgIFxuICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgZm9udC1ib2xkIHRleHQtZ3JheS01MDAgdHJhY2tpbmctd2lkZXN0XCI+e2xhbmcgPT09ICdhcicgPyAn2KfYs9mFINin2YTZhdmG2KrYrCAo2KfZhtis2YTZitiy2YopJyA6ICdFbiBOYW1lJ308L2xhYmVsPlxuICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICB2YWx1ZT17ZWRpdGluZ0l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0RWRpdGluZ0l0ZW0oey4uLmVkaXRpbmdJdGVtLCBuYW1lOiBlLnRhcmdldC52YWx1ZX0pfVxuICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwQjBGMUFdIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC1zbSB0ZXh0LXdoaXRlXCIgXG4gICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTGVhdGhlciBKYWNrZXRcIlxuICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHNwYWNlLXktMSAke2xhbmcgPT09ICdhcicgPyAndGV4dC1yaWdodCcgOiAndGV4dC1sZWZ0J31gfT5cbiAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgZm9udC1ib2xkIHRleHQtZ3JheS01MDAgdHJhY2tpbmctd2lkZXN0XCI+e2xhbmcgPT09ICdhcicgPyAn2KfYs9mFINin2YTZhdmG2KrYrCAo2KfZhNi52LHYqNmK2KkpJyA6ICdBciBOYW1lJ308L2xhYmVsPlxuICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICB2YWx1ZT17ZWRpdGluZ0l0ZW0ubmFtZUFyfVxuICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRFZGl0aW5nSXRlbSh7Li4uZWRpdGluZ0l0ZW0sIG5hbWVBcjogZS50YXJnZXQudmFsdWV9KX1cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIGJnLVsjMEIwRjFBXSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtbGcgcHgtMyBweS0yIHRleHQtc20gdGV4dC13aGl0ZSBmb250LXNhbnMgJHtsYW5nID09PSAnYXInID8gJ3RleHQtcmlnaHQnIDogJ3RleHQtbGVmdCd9YH1cbiAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLYrNin2YPZitiqINis2YTYr1wiXG4gICAgICAgICAgICAgICAgIGRpcj17bGFuZyA9PT0gJ2FyJyA/IFwicnRsXCIgOiBcImx0clwifVxuICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgZm9udC1ib2xkIHRleHQtZ3JheS01MDAgdHJhY2tpbmctd2lkZXN0XCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNi52YTYp9mF2Kkg2KfZhNiq2KzYp9ix2YrYqScgOiAnQnJhbmQnfTwvbGFiZWw+XG4gICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgIHZhbHVlPXtlZGl0aW5nSXRlbS5icmFuZH1cbiAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0RWRpdGluZ0l0ZW0oey4uLmVkaXRpbmdJdGVtLCBicmFuZDogZS50YXJnZXQudmFsdWV9KX1cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMEIwRjFBXSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtbGcgcHgtMyBweS0yIHRleHQtc20gdGV4dC13aGl0ZVwiIFxuICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkFscGluZXN0YXJzXCJcbiAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0ZXh0LWdyYXktNTAwIHRyYWNraW5nLXdpZGVzdFwiPntsYW5nID09PSAnYXInID8gJ9in2YTYqti12YbZitmBJyA6ICdDYXRlZ29yeSd9PC9sYWJlbD5cbiAgICAgICAgICAgICAgIDxzZWxlY3QgXG4gICAgICAgICAgICAgICAgIHZhbHVlPXtlZGl0aW5nSXRlbS5jYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0RWRpdGluZ0l0ZW0oey4uLmVkaXRpbmdJdGVtLCBjYXRlZ29yeTogZS50YXJnZXQudmFsdWUgYXMgYW55fSl9XG4gICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzBCMEYxQV0gYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXNtIHRleHQtd2hpdGUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiT2lsc1wiPntsYW5nID09PSAnYXInID8gJ9iy2YrZiNiqINmI2YXYrdix2YjZgtin2KonIDogJ09pbHMgJiBMdWJyaWNhbnRzJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNhZmV0eVwiPntsYW5nID09PSAnYXInID8gJ9mF2LnYr9in2Kog2KPZhdin2YYnIDogJ1NhZmV0eSBFcXVpcG1lbnQnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiU21hcnRcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mD2LPYs9mI2KfYsdin2Kog2LDZg9mK2KknIDogJ1NtYXJ0IEFjY2Vzc29yaWVzJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlBhcnRzXCI+e2xhbmcgPT09ICdhcicgPyAn2YLYt9i5INi62YrYp9ixJyA6ICdTcGFyZSBQYXJ0cyd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJMaWZlc3R5bGVcIj57bGFuZyA9PT0gJ2FyJyA/ICfZhdmG2KrYrNin2Kog2YTYp9mK2YEg2LPYqtin2YrZhCcgOiAnTGlmZXN0eWxlIFByb2R1Y3RzJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHVwcGVyY2FzZSBmb250LWJvbGQgdGV4dC1ncmF5LTUwMCB0cmFja2luZy13aWRlc3RcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2LPYudixINin2YTYrdin2YTZiiAo2Kwu2YUpJyA6ICdDdXJyZW50IFByaWNlIChFR1ApJ308L2xhYmVsPlxuICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgdmFsdWU9e2VkaXRpbmdJdGVtLnByaWNlID09PSAwID8gJycgOiBlZGl0aW5nSXRlbS5wcmljZX1cbiAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIwXCJcbiAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0RWRpdGluZ0l0ZW0oey4uLmVkaXRpbmdJdGVtLCBwcmljZTogZS50YXJnZXQudmFsdWUgPT09ICcnID8gMCA6IE51bWJlcihlLnRhcmdldC52YWx1ZSl9KX1cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMEIwRjFBXSBib3JkZXIgYm9yZGVyLWJyYW5kLWFjY2VudC81MCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXNtIHRleHQtd2hpdGUgZm9udC1tb25vXCIgXG4gICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHVwcGVyY2FzZSBmb250LWJvbGQgdGV4dC1ncmF5LTUwMCB0cmFja2luZy13aWRlc3RcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2LPYudixINin2YTYo9i12YTZiiAo2KfYrtiq2YrYp9ix2YopJyA6ICdPcmlnaW5hbCBQcmljZSAoRUdQIC0gT3B0aW9uYWwpJ308L2xhYmVsPlxuICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgdmFsdWU9e2VkaXRpbmdJdGVtLm9yaWdpbmFsUHJpY2UgPT09IDAgfHwgIWVkaXRpbmdJdGVtLm9yaWdpbmFsUHJpY2UgPyAnJyA6IGVkaXRpbmdJdGVtLm9yaWdpbmFsUHJpY2V9XG4gICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiMFwiXG4gICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHtcbiAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnID0gZS50YXJnZXQudmFsdWUgPT09ICcnID8gMCA6IE51bWJlcihlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgY29uc3QgZGlzYyA9IGVkaXRpbmdJdGVtLmRpc2NvdW50IHx8IDA7XG4gICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IGVkaXRpbmdJdGVtLmRpc2NvdW50VHlwZSB8fCAncGVyY2VudGFnZSc7XG4gICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UHJpY2UgPSBnZXRDYWxjdWxhdGVkUHJpY2Uob3JpZywgZGlzYywgdHlwZSk7XG4gICAgICAgICAgICAgICAgICAgc2V0RWRpdGluZ0l0ZW0oey4uLmVkaXRpbmdJdGVtLCBvcmlnaW5hbFByaWNlOiBvcmlnLCBwcmljZTogbmV3UHJpY2V9KTtcbiAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMEIwRjFBXSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtbGcgcHgtMyBweS0yIHRleHQtc20gdGV4dC13aGl0ZSBmb250LW1vbm9cIiBcbiAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgdGV4dC1sZWZ0IG1kOmNvbC1zcGFuLTJcIj5cbiAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgZm9udC1ib2xkIHRleHQtZ3JheS01MDAgdHJhY2tpbmctd2lkZXN0XCI+e2xhbmcgPT09ICdhcicgPyAn2LHYp9io2Lcg2KfZhNi12YjYsdipJyA6ICdJbWFnZSBVUkwnfTwvbGFiZWw+XG4gICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgIHZhbHVlPXtlZGl0aW5nSXRlbS5pbWFnZX1cbiAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0RWRpdGluZ0l0ZW0oey4uLmVkaXRpbmdJdGVtLCBpbWFnZTogZS50YXJnZXQudmFsdWV9KX1cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMEIwRjFBXSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtbGcgcHgtMyBweS0yIHRleHQtc20gdGV4dC1ncmF5LTQwMCBmb250LW1vbm9cIiBcbiAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJodHRwczovLy4uLlwiXG4gICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHVwcGVyY2FzZSBmb250LWJvbGQgdGV4dC1ncmF5LTUwMCB0cmFja2luZy13aWRlc3RcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YPZhdmK2Kkg2KfZhNmF2KrYp9it2KkgKNin2YTZhdiu2LLZiNmGKScgOiAnU3RvY2sgQXZhaWxhYmxlJ308L2xhYmVsPlxuICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgdmFsdWU9e2VkaXRpbmdJdGVtLnN0b2NrQ291bnQgPT09IDAgfHwgIWVkaXRpbmdJdGVtLnN0b2NrQ291bnQgPyAnJyA6IGVkaXRpbmdJdGVtLnN0b2NrQ291bnR9XG4gICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiMFwiXG4gICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldEVkaXRpbmdJdGVtKHsuLi5lZGl0aW5nSXRlbSwgc3RvY2tDb3VudDogZS50YXJnZXQudmFsdWUgPT09ICcnID8gMCA6IE51bWJlcihlLnRhcmdldC52YWx1ZSl9KX1cbiAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMEIwRjFBXSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtbGcgcHgtMyBweS0yIHRleHQtc20gdGV4dC13aGl0ZSBmb250LW1vbm9cIiBcbiAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSB0ZXh0LWxlZnQgZmxleCBpdGVtcy1lbmRcIj5cbiAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBjdXJzb3ItcG9pbnRlciBwLTIgaG92ZXI6Ymctd2hpdGUvNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItd2hpdGUvNSBoLVszOHB4XSB3LWZ1bGxcIj5cbiAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgY2hlY2tlZD17ZWRpdGluZ0l0ZW0uaXNPZmZlcn1cbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRFZGl0aW5nSXRlbSh7Li4uZWRpdGluZ0l0ZW0sIGlzT2ZmZXI6IGUudGFyZ2V0LmNoZWNrZWR9KX1cbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkIGJnLVsjMEIwRjFBXSBib3JkZXItd2hpdGUvMjAgdGV4dC1icmFuZC1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB1cHBlcmNhc2UgdGV4dC1ncmF5LTMwMCBmb250LWJvbGQgdHJhY2tpbmctd2lkZXN0XCI+e2xhbmcgPT09ICdhcicgPyAn2KrZgdi52YrZhCDZhdmB2KrYp9itINi02KfYsdipINin2YTYudix2LYv2KfZhNiu2LXZhScgOiAnQWN0aXZlIE9mZmVyL1NhbGUgQmFkZ2UnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogRGlzY291bnQgc2VsZWN0aW9uIGZpZWxkcyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHVwcGVyY2FzZSBmb250LWJvbGQgdGV4dC1ncmF5LTUwMCB0cmFja2luZy13aWRlc3RcIj57bGFuZyA9PT0gJ2FyJyA/ICfZhtmI2Lkg2KfZhNiu2LXZhScgOiAnRGlzY291bnQgVHlwZSd9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8c2VsZWN0IFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2VkaXRpbmdJdGVtLmRpc2NvdW50VHlwZSB8fCAncGVyY2VudGFnZSd9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBlLnRhcmdldC52YWx1ZSBhcyAncGVyY2VudGFnZScgfCAnZml4ZWQnO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnID0gZWRpdGluZ0l0ZW0ub3JpZ2luYWxQcmljZSB8fCAwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNjID0gZWRpdGluZ0l0ZW0uZGlzY291bnQgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UHJpY2UgPSBnZXRDYWxjdWxhdGVkUHJpY2Uob3JpZywgZGlzYywgdHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldEVkaXRpbmdJdGVtKHsuLi5lZGl0aW5nSXRlbSwgZGlzY291bnRUeXBlOiB0eXBlLCBwcmljZTogbmV3UHJpY2V9KTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwQjBGMUFdIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC1zbSB0ZXh0LXdoaXRlIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicGVyY2VudGFnZVwiPntsYW5nID09PSAnYXInID8gJ9mG2LPYqNipINmF2KbZiNmK2KkgKCUpJyA6ICdQZXJjZW50YWdlICglKSd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZml4ZWRcIj57bGFuZyA9PT0gJ2FyJyA/ICfZhdio2YTYuiDYq9in2KjYqiAo2Kwu2YUpJyA6ICdGaXhlZCBBbW91bnQgKEVHUCknfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0ZXh0LWdyYXktNTAwIHRyYWNraW5nLXdpZGVzdFwiPntsYW5nID09PSAnYXInID8gJ9mC2YrZhdipINin2YTYrti12YUnIDogJ0Rpc2NvdW50IFZhbHVlJ308L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2VkaXRpbmdJdGVtLmRpc2NvdW50ID09PSAwIHx8ICFlZGl0aW5nSXRlbS5kaXNjb3VudCA/ICcnIDogZWRpdGluZ0l0ZW0uZGlzY291bnR9XG4gICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiMFwiXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc2MgPSBlLnRhcmdldC52YWx1ZSA9PT0gJycgPyAwIDogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZyA9IGVkaXRpbmdJdGVtLm9yaWdpbmFsUHJpY2UgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IGVkaXRpbmdJdGVtLmRpc2NvdW50VHlwZSB8fCAncGVyY2VudGFnZSc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ByaWNlID0gZ2V0Q2FsY3VsYXRlZFByaWNlKG9yaWcsIGRpc2MsIHR5cGUpO1xuICAgICAgICAgICAgICAgICAgICBzZXRFZGl0aW5nSXRlbSh7Li4uZWRpdGluZ0l0ZW0sIGRpc2NvdW50OiBkaXNjLCBwcmljZTogbmV3UHJpY2V9KTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwQjBGMUFdIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC1zbSB0ZXh0LXdoaXRlIGZvbnQtbW9ub1wiIFxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBEZXNjcmlwdGlvbiBmaWVsZHMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIHRleHQtbGVmdCBtZDpjb2wtc3Bhbi0yXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHVwcGVyY2FzZSBmb250LWJvbGQgdGV4dC1ncmF5LTUwMCB0cmFja2luZy13aWRlc3RcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YjYtdmBICjYqNin2YTYpdmG2KzZhNmK2LLZitipKScgOiAnRGVzY3JpcHRpb24gKEVuKSd9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgXG4gICAgICAgICAgICAgICAgICByb3dzPXszfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2VkaXRpbmdJdGVtLmRlc2NyaXB0aW9uIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0RWRpdGluZ0l0ZW0oey4uLmVkaXRpbmdJdGVtLCBkZXNjcmlwdGlvbjogZS50YXJnZXQudmFsdWV9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzBCMEYxQV0gYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXNtIHRleHQtd2hpdGVcIiBcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgRW5nbGlzaCBkZXNjcmlwdGlvbi4uLlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BzcGFjZS15LTEgbWQ6Y29sLXNwYW4tMiAke2xhbmcgPT09ICdhcicgPyAndGV4dC1yaWdodCcgOiAndGV4dC1sZWZ0J31gfT5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0ZXh0LWdyYXktNTAwIHRyYWNraW5nLXdpZGVzdFwiPntsYW5nID09PSAnYXInID8gJ9in2YTZiNi12YEgKNio2KfZhNi52LHYqNmK2KkpJyA6ICdEZXNjcmlwdGlvbiAoQXIpJ308L2xhYmVsPlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBcbiAgICAgICAgICAgICAgICAgIHJvd3M9ezN9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17ZWRpdGluZ0l0ZW0uZGVzY3JpcHRpb25BciB8fCAnJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldEVkaXRpbmdJdGVtKHsuLi5lZGl0aW5nSXRlbSwgZGVzY3JpcHRpb25BcjogZS50YXJnZXQudmFsdWV9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBiZy1bIzBCMEYxQV0gYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXNtIHRleHQtd2hpdGUgZm9udC1zYW5zICR7bGFuZyA9PT0gJ2FyJyA/ICd0ZXh0LXJpZ2h0JyA6ICd0ZXh0LWxlZnQnfWB9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cItij2K/YrtmEINin2YTZiNi12YEg2KjYp9mE2LnYsdio2YrYqS4uLlwiXG4gICAgICAgICAgICAgICAgICBkaXI9e2xhbmcgPT09ICdhcicgPyAncnRsJyA6ICdsdHInfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTcGVjcyBmaWVsZHMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgZm9udC1ib2xkIHRleHQtZ3JheS01MDAgdHJhY2tpbmctd2lkZXN0XCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNmF2YjYp9i12YHYp9iqICjYqNin2YTYpdmG2KzZhNmK2LLZitipKScgOiAnU3BlY3MgKEVuKSd9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17ZWRpdGluZ0l0ZW0uc3BlY3MgfHwgJyd9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRFZGl0aW5nSXRlbSh7Li4uZWRpdGluZ0l0ZW0sIHNwZWNzOiBlLnRhcmdldC52YWx1ZX0pfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMEIwRjFBXSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtbGcgcHgtMyBweS0yIHRleHQtc20gdGV4dC13aGl0ZVwiIFxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJNYXRlcmlhbDogSGlnaCBHcmFkZSB8IFdlaWdodDogMS41a2dcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgc3BhY2UteS0xICR7bGFuZyA9PT0gJ2FyJyA/ICd0ZXh0LXJpZ2h0JyA6ICd0ZXh0LWxlZnQnfWB9PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgZm9udC1ib2xkIHRleHQtZ3JheS01MDAgdHJhY2tpbmctd2lkZXN0XCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNmF2YjYp9i12YHYp9iqICjYqNin2YTYudix2KjZitipKScgOiAnU3BlY3MgKEFyKSd9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17ZWRpdGluZ0l0ZW0uc3BlY3NBciB8fCAnJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldEVkaXRpbmdJdGVtKHsuLi5lZGl0aW5nSXRlbSwgc3BlY3NBcjogZS50YXJnZXQudmFsdWV9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBiZy1bIzBCMEYxQV0gYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXNtIHRleHQtd2hpdGUgZm9udC1zYW5zICR7bGFuZyA9PT0gJ2FyJyA/ICd0ZXh0LXJpZ2h0JyA6ICd0ZXh0LWxlZnQnfWB9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cItin2YTZhdmI2KfYtdmB2KfYqiDYqNin2YTYudix2KjZitipLi4uXCJcbiAgICAgICAgICAgICAgICAgIGRpcj17bGFuZyA9PT0gJ2FyJyA/ICdydGwnIDogJ2x0cid9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIHRleHQteHMgdGV4dC1icmFuZC1hY2NlbnQvODAgZm9udC1tb25vIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICogTm90ZTogU2F2aW5nIGEgcHJvZHVjdCBhdXRvbWF0aWNhbGx5IGNhbGN1bGF0ZXMgYW5kIHN0b3JlcyB0aGUgZmluYWwgcHJpY2Ugc2V0IGJlbG93IGlmIG9yaWdpbmFsIHByaWNlICsgZGlzY291bnQgaXMgdXNlZC5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICBcbiAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktZW5kIGdhcC0zIHB0LTQgYm9yZGVyLXQgYm9yZGVyLXdoaXRlLzEwIG10LTZcIj5cbiAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRFZGl0aW5nSXRlbShudWxsKX1cbiAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTUgcHktMiBmb250LW1vbm8gdGV4dC14cyB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgQ2FuY2VsXG4gICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2F2ZUl0ZW19XG4gICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC02IHB5LTIgYmctZ3JhZGllbnQtdG8tciBmcm9tLWJyYW5kLXByaW1hcnkgdG8tYnJhbmQtYWNjZW50IHRleHQtWyMwQjBGMUFdIGZvbnQtYm9sZCBmb250LW1vbm8gdGV4dC14cyB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHJvdW5kZWQteGwgaG92ZXI6YnJpZ2h0bmVzcy0xMTAgY3Vyc29yLXBvaW50ZXIgc2hhZG93LWxnIHNoYWRvdy1icmFuZC1wcmltYXJ5LzIwXCJcbiAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICBTYXZlIFByb2R1Y3RcbiAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIFByb2R1Y3QgTGlzdCBHcmlkICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAge2ZpbHRlcmVkUHJvZHVjdHMubWFwKChwKSA9PiAoXG4gICAgICAgICAgPGRpdiBrZXk9e3AuaWR9IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtY2VudGVyIGdhcC00IHAtMyBiZy13aGl0ZS9bMC4wMl0gYm9yZGVyIGJvcmRlci13aGl0ZS81IHJvdW5kZWQtMnhsIGhvdmVyOmJnLXdoaXRlL1swLjA0XSB0cmFuc2l0aW9uLWNvbG9ycyByZWxhdGl2ZSBncm91cFwiPlxuICAgICAgICAgICAgIDxpbWcgc3JjPXtwLmltYWdlfSBjbGFzc05hbWU9XCJ3LTE2IGgtMTYgcm91bmRlZC14bCBvYmplY3QtY29udGFpbiBiZy1bIzA3MEExMV0gcC0xXCIgLz5cbiAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0wIG1kOnRleHQtbGVmdCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBqdXN0aWZ5LWNlbnRlciBzbTpqdXN0aWZ5LXN0YXJ0XCI+XG4gICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWdyYXktNTAwIGJnLWJsYWNrIHRyYWNraW5nLXdpZGVzdCBweC0yIHB5LTAuNSByb3VuZGVkIHVwcGVyY2FzZVwiPntwLmlkfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAge3AuaXNPZmZlciAmJiA8c3BhbiBjbGFzc05hbWU9XCJiZy1yZWQtNTAwIHRleHQtd2hpdGUgdGV4dC1bOXB4XSBweC0xIHJvdW5kZWQgZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3RcIj5PRkZFUjwvc3Bhbj59XG4gICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtYm9sZCBmb250LXNhbnMgbXQtMC41IHRydW5jYXRlXCI+e2xhbmcgPT09ICdhcicgPyBwLm5hbWVBciA6IHAubmFtZX08L2g0PlxuICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1icmFuZC1hY2NlbnQgdHJhY2tpbmctd2lkZXN0IHVwcGVyY2FzZSBtdC0wLjUgZm9udC1tb25vXCI+e3AuYnJhbmR9IHwge3AuY2F0ZWdvcnl9PC9wPlxuICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtYm9sZCBmb250LW1vbm9cIj57cC5wcmljZS50b0xvY2FsZVN0cmluZygpfSBFR1A8L2Rpdj5cbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlXCI+U3RvY2s6IHtwLnN0b2NrQ291bnR9PC9kaXY+XG4gICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XG4gICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldEVkaXRpbmdJdGVtKHApfSBjbGFzc05hbWU9XCJwLTIgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBob3Zlcjpib3JkZXItYnJhbmQtcHJpbWFyeSBob3Zlcjp0ZXh0LWJyYW5kLXByaW1hcnkgcm91bmRlZC14bCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBiZy1bIzBCMEYxQV1cIj5cbiAgICAgICAgICAgICAgICAgPEVkaXQyIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJlbW92ZUl0ZW0ocC5pZCl9IGNsYXNzTmFtZT1cInAtMiBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIGhvdmVyOmJvcmRlci1yZWQtNTAwIGhvdmVyOnRleHQtcmVkLTUwMCBob3ZlcjpiZy1yZWQtNTAwLzEwIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgYmctWyMwQjBGMUFdXCI+XG4gICAgICAgICAgICAgICAgIDxUcmFzaDIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICAgIHtmaWx0ZXJlZFByb2R1Y3RzLmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTEwIHRleHQtY2VudGVyIGJvcmRlciBib3JkZXItd2hpdGUvNSByb3VuZGVkLTJ4bCBiZy13aGl0ZS9bMC4wMV1cIj5cbiAgICAgICAgICAgICA8UGFja2FnZSBjbGFzc05hbWU9XCJ3LTggaC04IHRleHQtZ3JheS02MDAgbXgtYXV0byBtYi0zXCIgLz5cbiAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwIGZvbnQtbW9ubyB0ZXh0LXhzIHRyYWNraW5nLXdpZGVzdCB1cHBlcmNhc2VcIj5ObyBwcm9kdWN0cyBhdmFpbGFibGU8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm1hcHBpbmdzIjoiQUE0RlU7QUE1RlYsU0FBZ0IsZ0JBQWdCO0FBRWhDLFNBQVMsTUFBTSxPQUFPLFFBQXNCLGVBQW9DO0FBQ2hGLFNBQVMsbUJBQW1CO0FBUzVCLHdCQUF3QixnQkFBZ0IsRUFBRSxlQUFlLHNCQUFzQixHQUF5QjtBQUN0RyxRQUFNLEVBQUUsTUFBTSxLQUFLLEVBQUUsSUFBSSxZQUFZO0FBQ3JDLFFBQU0sQ0FBQyxhQUFhLGNBQWMsSUFBSSxTQUFTLEVBQUU7QUFFakQsUUFBTSxpQkFBK0I7QUFBQSxJQUNuQyxJQUFJLE9BQU8sS0FBSyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsVUFBVSxHQUFHLENBQUMsRUFBRSxZQUFZLENBQUM7QUFBQSxJQUNuRSxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixhQUFhO0FBQUEsSUFDYixlQUFlO0FBQUEsSUFDZixVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsSUFDUCxlQUFlO0FBQUEsSUFDZixV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