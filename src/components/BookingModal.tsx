import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=905fa188"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=905fa188"; const useState = __vite__cjsImport1_react["useState"];
import { motion } from "/node_modules/.vite/deps/motion_react.js?v=905fa188";
import { X, Calendar, User, Phone, Mail, CheckCircle2, MessageSquare, ArrowRight, Bike, ShoppingBag, Check } from "/node_modules/.vite/deps/lucide-react.js?v=905fa188";
import { useLanguage } from "/src/context/LanguageContext.tsx";
import { MOTORCYCLES_DATA } from "/src/data.ts";
import { db } from "/src/lib/firebase.ts";
import { doc, setDoc } from "/node_modules/.vite/deps/firebase_firestore.js?v=905fa188";
export default function BookingModal({
  motorcycleId,
  motorcycleName,
  category,
  price,
  serialCode,
  // New field
  preSelectedAddOnIds = [],
  storeProducts = [],
  onAddToCart,
  onClose,
  invoiceWhatsappNumber
}) {
  const { lang, dir, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    // Default to current date
  });
  const [selectedAddOnIds, setSelectedAddOnIds] = useState(preSelectedAddOnIds);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const motorcyclesData = (() => {
    try {
      const saved = localStorage.getItem("elkholy_motorcycles");
      return saved ? JSON.parse(saved) : MOTORCYCLES_DATA;
    } catch {
      return MOTORCYCLES_DATA;
    }
  })();
  const selectedBike = motorcyclesData.find((b) => b.id === motorcycleId);
  const bikeAddOns = selectedBike?.addOns || [];
  const categoryNameMap = {
    A: { ar: "سبورت (A)", en: "Sport (A)" },
    B: { ar: "كروزر (B)", en: "Cruiser (B)" },
    C: { ar: "مغامرات (C)", en: "Adventure (C)" },
    S: { ar: "سكوتر (S)", en: "Scooter (S)" }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleToggleAddOn = (id) => {
    if (selectedAddOnIds.includes(id)) {
      setSelectedAddOnIds(selectedAddOnIds.filter((x) => x !== id));
    } else {
      setSelectedAddOnIds([...selectedAddOnIds, id]);
    }
  };
  const originalPriceUsd = selectedBike ? selectedBike.originalPrice || selectedBike.priceNum : parseFloat(price.replace(/[^0-9]/g, ""));
  const isDiscounted = !!(selectedBike && selectedBike.originalPrice && selectedBike.discount && selectedBike.discount > 0);
  const getDiscountedPriceUsd = () => {
    if (selectedBike) {
      if (isDiscounted && selectedBike.discount && selectedBike.originalPrice) {
        if (selectedBike.discountType === "percentage") {
          return Math.max(0, selectedBike.originalPrice * (1 - selectedBike.discount / 100));
        } else {
          return Math.max(0, selectedBike.originalPrice - selectedBike.discount);
        }
      }
      return selectedBike.priceNum;
    }
    return parseFloat(price.replace(/[^0-9]/g, "")) || 0;
  };
  const basePriceUsd = getDiscountedPriceUsd();
  const selectedAddOnsPriceUsd = bikeAddOns.filter((addon) => selectedAddOnIds.includes(addon.id)).reduce((sum, addon) => sum + addon.price, 0);
  const finalTotalPriceUsd = basePriceUsd + selectedAddOnsPriceUsd;
  const formatPrice = (usd) => {
    if (lang === "ar") {
      return `${usd.toLocaleString()} جنيه`;
    } else {
      return `${usd.toLocaleString()} EGP`;
    }
  };
  const displayPriceText = formatPrice(finalTotalPriceUsd);
  const selectedAddOns = bikeAddOns.filter((a) => selectedAddOnIds.includes(a.id));
  const addonsTextEn = selectedAddOns.length > 0 ? `
Add-ons Selected: ${selectedAddOns.map((a) => `${a.name} (+${a.price.toLocaleString()} EGP)`).join(", ")}` : "";
  const addonsTextAr = selectedAddOns.length > 0 ? `
الكماليات المحددة: ${selectedAddOns.map((a) => `${a.nameAr || a.name} (+${a.price.toLocaleString()} جنيه)`).join("، ")}` : "";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.date) {
      setErrorMsg(t("required_fields"));
      return;
    }
    const vehicleType2 = category === "S" ? lang === "ar" ? "سكوتر" : "Scooter" : lang === "ar" ? "موتوسيكل" : "Motorcycle";
    const activeCategory2 = categoryNameMap[category][lang];
    let waText = "";
    if (lang === "ar") {
      waText = `مرحباً، أريد حجز هذا ال${vehicleType2}:
الموديل: ${motorcycleName}
الفئة: ${activeCategory2}${addonsTextAr}
السعر الرياضي الإجمالي: ${displayPriceText}
التاريخ: ${formData.date}
اسم العميل: ${formData.name}
الهاتف: ${formData.phone}
البريد: ${formData.email}`;
    } else {
      waText = `Hello, I would like to reserve this ${vehicleType2}:
Model: ${motorcycleName}
Category: ${activeCategory2}${addonsTextEn}
Total Combined Price: ${displayPriceText}
Date: ${formData.date}
Customer Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}`;
    }
    const targetPhone = invoiceWhatsappNumber || "201007062123";
    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;
    const newBookingId = `book-${Date.now()}`;
    const newBooking = {
      id: newBookingId,
      motorcycleId,
      motorcycleName,
      category,
      price: displayPriceText,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      date: formData.date,
      selectedAddOns: selectedAddOns.map((a) => ({ id: a.id, name: a.name, price: a.price })),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      status: "pending"
    };
    try {
      await setDoc(doc(db, "bookings", newBookingId), {
        customerName: formData.name || "Anonymous User",
        customerPhone: formData.phone || "000000000",
        motorcycleId,
        motorcycleName,
        totalPrice: finalTotalPriceUsd,
        status: "pending"
      });
    } catch (err) {
      console.warn("Firestore save failed, falling back gracefully to local index:", err);
    }
    try {
      const existingStr = localStorage.getItem("elkholy_bookings");
      const existing = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(newBooking);
      localStorage.setItem("elkholy_bookings", JSON.stringify(existing));
    } catch (err) {
      console.error("Error persisting booking locally:", err);
    }
    setSubmitted(true);
    setTimeout(() => {
      window.open(waUrl, "_blank");
      onClose();
    }, 2e3);
  };
  const vehicleType = category === "S" ? lang === "ar" ? "سكوتر" : "Scooter" : lang === "ar" ? "موتوسيكل" : "Motorcycle";
  const activeCategory = categoryNameMap[category][lang];
  let waPreviewText = "";
  if (lang === "ar") {
    waPreviewText = `مرحباً، أريد حجز هذا ال${vehicleType}:
الموديل: ${motorcycleName}
الفئة: ${activeCategory}${addonsTextAr}
السعر الكلي: ${displayPriceText}
التاريخ: ${formData.date || "[تحديد التاريخ]"}
اسم العميل: ${formData.name || "[اسمك بالكامل]"}`;
  } else {
    waPreviewText = `Hello, I would like to reserve this ${vehicleType}:
Model: ${motorcycleName}
Category: ${activeCategory}${addonsTextEn}
Total Price: ${displayPriceText}
Date: ${formData.date || "[Selected Date]"}
Customer Name: ${formData.name || "[Your Name]"}`;
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto", children: /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      initial: { scale: 0.95, opacity: 0, y: 20 },
      animate: { scale: 1, opacity: 1, y: 0 },
      exit: { scale: 0.95, opacity: 0, y: 20 },
      className: "w-full max-w-lg glass-panel border border-[#6366F1]/30 rounded-3xl overflow-hidden relative shadow-2xl box-glow-cyan my-8",
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-transparent to-brand-accent/20 blur-xl rounded-full animate-pulse pointer-events-none" }, void 0, false, {
          fileName: "/app/applet/src/components/BookingModal.tsx",
          lineNumber: 256,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-bl from-transparent to-brand-primary/20 blur-xl rounded-full animate-pulse pointer-events-none" }, void 0, false, {
          fileName: "/app/applet/src/components/BookingModal.tsx",
          lineNumber: 257,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/[0.08] p-5 shrink-0 relative z-20", dir, children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-brand-accent/10 border border-brand-accent/20", children: /* @__PURE__ */ jsxDEV(Bike, { className: "w-5 h-5 text-brand-accent" }, void 0, false, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 263,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 262,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir, children: [
              /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-bold tracking-wider text-white uppercase font-mono", children: lang === "ar" ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                "حجز ",
                /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent", children: "آمن ومباشر" }, void 0, false, {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 267,
                  columnNumber: 40
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 267,
                columnNumber: 34
              }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                "SECURE ",
                /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent", children: "RESERVATION" }, void 0, false, {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 267,
                  columnNumber: 108
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 267,
                columnNumber: 99
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 266,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-500 font-mono uppercase tracking-widest", children: [
                "Model: ",
                motorcycleName
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 269,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 265,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 261,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: onClose,
              className: "p-1.5 rounded-lg border border-white/5 bg-white/[0.03] text-gray-400 hover:text-white transition-colors cursor-pointer relative z-50",
              "aria-label": "Close",
              children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 277,
                columnNumber: 13
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 272,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/BookingModal.tsx",
          lineNumber: 260,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-5 max-h-[75vh] overflow-y-auto", children: !submitted ? /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "space-y-4 text-left", dir, children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-gray-400 font-sans leading-relaxed border-l-2 border-brand-primary pl-3 bg-brand-primary/5 py-2.5 rounded-r-lg mb-2 text-right", dir, children: lang === "ar" ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
            "تقدير سعر الماكينة المختارة: ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent font-extrabold font-mono text-sm", children: displayPriceText }, void 0, false, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 288,
              columnNumber: 50
            }, this),
            ". أكمل معايير الاستمارة لفتح بوابة الحجز فائقة الأمان."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 288,
            columnNumber: 19
          }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
            "Selected machine price estimate: ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent font-extrabold font-mono text-sm", children: displayPriceText }, void 0, false, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 290,
              columnNumber: 54
            }, this),
            ". Complete the form parameters to start the secure WhatsApp order gateway."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 290,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 286,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-mono text-gray-400 font-semibold uppercase", children: [
              t("full_name"),
              ":"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 296,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative flex items-center", children: [
              /* @__PURE__ */ jsxDEV(User, { className: "absolute left-3.5 w-4 h-4 text-brand-accent" }, void 0, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 298,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  name: "name",
                  required: true,
                  value: formData.name,
                  onChange: handleInputChange,
                  placeholder: t("full_name_placeholder"),
                  className: "w-full bg-black/65 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 299,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 297,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 295,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-mono text-gray-400 font-semibold uppercase", children: [
              t("contact_number"),
              ":"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 313,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative flex items-center", children: [
              /* @__PURE__ */ jsxDEV(Phone, { className: "absolute left-3.5 w-4 h-4 text-brand-accent" }, void 0, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 315,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "tel",
                  name: "phone",
                  required: true,
                  value: formData.phone,
                  onChange: handleInputChange,
                  placeholder: t("phone_placeholder"),
                  className: "w-full bg-black/65 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 316,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 314,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 312,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-mono text-gray-400 font-semibold uppercase", children: [
              lang === "ar" ? "البريد الإلكتروني" : "Email Address",
              ":"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 330,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative flex items-center", children: [
              /* @__PURE__ */ jsxDEV(Mail, { className: "absolute left-3.5 w-4 h-4 text-brand-accent" }, void 0, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 332,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "email",
                  name: "email",
                  required: true,
                  value: formData.email,
                  onChange: handleInputChange,
                  placeholder: t("email_placeholder"),
                  className: "w-full bg-black/65 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 333,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 331,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 329,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-mono text-gray-400 font-semibold uppercase", children: [
              t("preferred_date"),
              ":"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 347,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative flex items-center", children: [
              /* @__PURE__ */ jsxDEV(Calendar, { className: "absolute left-3.5 w-4 h-4 text-brand-accent" }, void 0, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 349,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "date",
                  name: "date",
                  required: true,
                  value: formData.date,
                  onChange: handleInputChange,
                  className: "w-full bg-black/65 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono focus:outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 350,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 348,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 346,
            columnNumber: 15
          }, this),
          bikeAddOns.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 p-3.5 bg-black/40 border border-white/[0.05] rounded-xl font-mono", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-3.5 h-3.5 text-brand-accent" }, void 0, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 365,
                columnNumber: 21
              }, this),
              lang === "ar" ? "تعديل ملحقات وكماليات الطلب:" : "CUSTOMIZE SELECTED ACCENTS & ADDONS:"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 364,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 max-h-[170px] overflow-y-auto scrollbar-thin pr-1 text-xs", children: bikeAddOns.map((addon) => {
              const isChecked = selectedAddOnIds.includes(addon.id);
              const displayAddonName = lang === "ar" && addon.nameAr ? addon.nameAr : addon.name;
              const displayAddonDesc = lang === "ar" && addon.descAr ? addon.descAr : addon.description;
              return /* @__PURE__ */ jsxDEV(
                "div",
                {
                  onClick: () => handleToggleAddOn(addon.id),
                  className: `flex flex-col justify-between p-2 rounded-xl border relative cursor-pointer select-none transition-all duration-300 hover:scale-[1.02] ${isChecked ? "bg-[#22D3EE]/5 border-[#22D3EE]/40 shadow-[0_0_10px_rgba(34,211,238,0.12)] ring-1 ring-[#22D3EE]/20" : "bg-black/40 border-white/[0.05] hover:bg-black/20 hover:border-white/10"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: `absolute top-1.5 right-1.5 w-4.5 h-4.5 rounded-full flex items-center justify-center border transition-all ${isChecked ? "bg-[#22D3EE] border-[#22D3EE] text-[#0B0F1A]" : "border-white/20 bg-black/60"}`, children: isChecked && /* @__PURE__ */ jsxDEV(Check, { className: "w-2.5 h-2.5 stroke-[3]" }, void 0, false, {
                      fileName: "/app/applet/src/components/BookingModal.tsx",
                      lineNumber: 388,
                      columnNumber: 43
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/BookingModal.tsx",
                      lineNumber: 385,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center text-center gap-1.5 pt-1", children: [
                      addon.image && /* @__PURE__ */ jsxDEV(
                        "img",
                        {
                          src: addon.image,
                          alt: addon.name,
                          className: "w-10 h-10 rounded-lg object-cover border border-white/10 shadow-sm shadow-black/30 animate-pulse-slow",
                          referrerPolicy: "no-referrer"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/BookingModal.tsx",
                          lineNumber: 393,
                          columnNumber: 31
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV("div", { className: "leading-tight w-full", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-white text-[10px] font-bold block truncate max-w-[125px]", children: displayAddonName }, void 0, false, {
                          fileName: "/app/applet/src/components/BookingModal.tsx",
                          lineNumber: 402,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] text-gray-500 block truncate max-w-[125px]", children: displayAddonDesc }, void 0, false, {
                          fileName: "/app/applet/src/components/BookingModal.tsx",
                          lineNumber: 405,
                          columnNumber: 31
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/BookingModal.tsx",
                        lineNumber: 401,
                        columnNumber: 29
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/BookingModal.tsx",
                      lineNumber: 391,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "text-center mt-2 pt-1 border-t border-white/[0.05] shrink-0", children: /* @__PURE__ */ jsxDEV("span", { className: "text-[9.5px] text-brand-accent font-bold", children: [
                      "+",
                      formatPrice(addon.price)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/BookingModal.tsx",
                      lineNumber: 412,
                      columnNumber: 29
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/BookingModal.tsx",
                      lineNumber: 411,
                      columnNumber: 27
                    }, this)
                  ]
                },
                addon.id,
                true,
                {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 375,
                  columnNumber: 25
                },
                this
              );
            }) }, void 0, false, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 369,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 363,
            columnNumber: 17
          }, this),
          selectedBike?.relatedProductIds && selectedBike.relatedProductIds.length > 0 && storeProducts.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 p-3.5 bg-black/40 border border-white/[0.05] rounded-xl font-mono", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-brand-secondary font-bold uppercase flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-3.5 h-3.5 text-brand-secondary" }, void 0, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 427,
                columnNumber: 21
              }, this),
              lang === "ar" ? "ينصح بشرائها مع الموديل:" : "FREQUENTLY BOUGHT TOGETHER:"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 426,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex overflow-x-auto hide-scrollbar gap-2 pb-1", children: selectedBike.relatedProductIds.map((productId) => {
              const sp = storeProducts.find((p) => p.id === productId);
              if (!sp) return null;
              return /* @__PURE__ */ jsxDEV("div", { className: "min-w-[140px] flex flex-col justify-between p-2 rounded-xl border border-white/[0.05] bg-white/[0.02] relative transition-all duration-300", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ jsxDEV("img", { src: sp.image, className: "w-12 h-12 rounded-lg object-contain bg-black/50 overflow-hidden" }, void 0, false, {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 438,
                  columnNumber: 30
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 437,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-center w-full mb-2", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "text-white text-[10px] font-bold truncate max-w-[120px]", children: lang === "ar" ? sp.nameAr : sp.name }, void 0, false, {
                    fileName: "/app/applet/src/components/BookingModal.tsx",
                    lineNumber: 442,
                    columnNumber: 30
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-brand-secondary font-bold", children: [
                    sp.price.toLocaleString(),
                    " ",
                    lang === "ar" ? "ج" : "EGP"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/BookingModal.tsx",
                    lineNumber: 443,
                    columnNumber: 30
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 441,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      if (onAddToCart) {
                        onAddToCart(sp, "product");
                        alert(lang === "ar" ? "تمت الإضافة للسلة" : "Added to cart");
                      }
                    },
                    className: "w-full text-center py-1.5 bg-brand-secondary/20 hover:bg-brand-secondary/40 text-brand-secondary text-[9px] uppercase tracking-widest rounded transition-colors",
                    children: [
                      "+ ",
                      lang === "ar" ? "إضافة" : "ADD"
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/BookingModal.tsx",
                    lineNumber: 446,
                    columnNumber: 27
                  },
                  this
                )
              ] }, sp.id, true, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 436,
                columnNumber: 25
              }, this);
            }) }, void 0, false, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 431,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 425,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "rounded-xl border border-white/[0.06] bg-[#070A11] p-3 text-xs leading-relaxed space-y-1.5 font-mono", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-[#A855F7] uppercase tracking-wider font-bold border-b border-white/5 pb-1 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { children: t("preview_message") }, void 0, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 468,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-gray-500 uppercase", children: lang }, void 0, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 469,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 467,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("pre", { className: "text-gray-300 font-sans whitespace-pre-wrap text-right text-xs pt-1", dir, children: waPreviewText }, void 0, false, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 471,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 466,
            columnNumber: 15
          }, this),
          errorMsg && /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-red-500 font-mono text-center", children: errorMsg }, void 0, false, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 478,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "submit",
              className: "w-full py-3 mt-4 rounded-xl font-mono text-xs font-bold tracking-widest text-[#0B0F1A] bg-gradient-to-r from-brand-accent to-brand-primary hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer shadow-lg shadow-brand-accent/20 uppercase flex items-center justify-center gap-2",
              id: "modal-submit-booking",
              children: [
                /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "إرسال طلب الحجز إلى واتساب الكترونياً" : "TRANSMIT RESERVATION TO WHATSAPP" }, void 0, false, {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 487,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(ArrowRight, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 488,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 482,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/BookingModal.tsx",
          lineNumber: 284,
          columnNumber: 13
        }, this) : (
          // Success Transmission state of-the-art visual panel
          /* @__PURE__ */ jsxDEV("div", { className: "text-center py-8 space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-10 h-10 text-green-400 animate-bounce" }, void 0, false, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 496,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 495,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-bold tracking-wider text-white uppercase font-mono", children: lang === "ar" ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                "تم ",
                /* @__PURE__ */ jsxDEV("span", { className: "text-green-400", children: "تفويض الحجز" }, void 0, false, {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 500,
                  columnNumber: 41
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 500,
                columnNumber: 36
              }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                "TRANSMISSION ",
                /* @__PURE__ */ jsxDEV("span", { className: "text-green-400", children: "AUTHORIZED" }, void 0, false, {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 500,
                  columnNumber: 113
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 500,
                columnNumber: 98
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 499,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-400 leading-relaxed max-w-sm mx-auto font-sans", children: lang === "ar" ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                "جاري توجيه بياناتك بنجاح إلى لوحة شركة ",
                /* @__PURE__ */ jsxDEV("strong", { children: "الخولي موتورز" }, void 0, false, {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 504,
                  columnNumber: 64
                }, this),
                " عبر خدمة الواتساب الآمنة وتجهيز الرابط المباشر."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 504,
                columnNumber: 23
              }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                "We are forwarding your parameters to ",
                /* @__PURE__ */ jsxDEV("strong", { children: "ElKholy Motors WhatsApp" }, void 0, false, {
                  fileName: "/app/applet/src/components/BookingModal.tsx",
                  lineNumber: 505,
                  columnNumber: 62
                }, this),
                " secure dashboard. Continue booking steps in the upcoming window tab."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 505,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 502,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 498,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[11px] font-mono text-gray-400 flex items-center justify-center gap-2 max-w-xs mx-auto animate-pulse", children: [
              /* @__PURE__ */ jsxDEV(MessageSquare, { className: "w-4 h-4 text-brand-accent shrink-0" }, void 0, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 511,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: t("transmitting_link") }, void 0, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 512,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 510,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 494,
            columnNumber: 13
          }, this)
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/BookingModal.tsx",
          lineNumber: 282,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/BookingModal.tsx",
      lineNumber: 249,
      columnNumber: 7
    },
    this
  ) }, void 0, false, {
    fileName: "/app/applet/src/components/BookingModal.tsx",
    lineNumber: 246,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJvb2tpbmdNb2RhbC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBYLCBDYWxlbmRhciwgVXNlciwgUGhvbmUsIE1haWwsIENoZWNrQ2lyY2xlMiwgTWVzc2FnZVNxdWFyZSwgQXJyb3dSaWdodCwgQmlrZSwgU2hvcHBpbmdCYWcsIENoZWNrIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IENhdGVnb3J5U2x1ZywgTW90b3JjeWNsZSwgQWRkT24sIFN0b3JlUHJvZHVjdCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHVzZUxhbmd1YWdlIH0gZnJvbSAnLi4vY29udGV4dC9MYW5ndWFnZUNvbnRleHQnO1xuaW1wb3J0IHsgTU9UT1JDWUNMRVNfREFUQSB9IGZyb20gJy4uL2RhdGEnO1xuaW1wb3J0IHsgZGIsIGhhbmRsZUZpcmVzdG9yZUVycm9yLCBPcGVyYXRpb25UeXBlIH0gZnJvbSAnLi4vbGliL2ZpcmViYXNlJztcbmltcG9ydCB7IGRvYywgc2V0RG9jIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcblxuaW50ZXJmYWNlIEJvb2tpbmdNb2RhbFByb3BzIHtcbiAgbW90b3JjeWNsZUlkOiBzdHJpbmc7XG4gIG1vdG9yY3ljbGVOYW1lOiBzdHJpbmc7XG4gIGNhdGVnb3J5OiBDYXRlZ29yeVNsdWc7XG4gIHByaWNlOiBzdHJpbmc7XG4gIHNlcmlhbENvZGU/OiBzdHJpbmc7IC8vIE5ldyBmaWVsZFxuICBwcmVTZWxlY3RlZEFkZE9uSWRzPzogc3RyaW5nW107XG4gIHN0b3JlUHJvZHVjdHM/OiBTdG9yZVByb2R1Y3RbXTtcbiAgb25BZGRUb0NhcnQ/OiAocHJvZHVjdDogYW55LCB0eXBlPzogJ3Byb2R1Y3QnIHwgJ21vdG9yY3ljbGUnIHwgJ2FkZG9uJykgPT4gdm9pZDtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgaW52b2ljZVdoYXRzYXBwTnVtYmVyPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBCb29raW5nTW9kYWwoe1xuICBtb3RvcmN5Y2xlSWQsXG4gIG1vdG9yY3ljbGVOYW1lLFxuICBjYXRlZ29yeSxcbiAgcHJpY2UsXG4gIHNlcmlhbENvZGUsIC8vIE5ldyBmaWVsZFxuICBwcmVTZWxlY3RlZEFkZE9uSWRzID0gW10sXG4gIHN0b3JlUHJvZHVjdHMgPSBbXSxcbiAgb25BZGRUb0NhcnQsXG4gIG9uQ2xvc2UsXG4gIGludm9pY2VXaGF0c2FwcE51bWJlcixcbn06IEJvb2tpbmdNb2RhbFByb3BzKSB7XG4gIGNvbnN0IHsgbGFuZywgZGlyLCB0IH0gPSB1c2VMYW5ndWFnZSgpO1xuICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlKHtcbiAgICBuYW1lOiAnJyxcbiAgICBwaG9uZTogJycsXG4gICAgZW1haWw6ICcnLFxuICAgIGRhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLCAvLyBEZWZhdWx0IHRvIGN1cnJlbnQgZGF0ZVxuICB9KTtcblxuICBjb25zdCBbc2VsZWN0ZWRBZGRPbklkcywgc2V0U2VsZWN0ZWRBZGRPbklkc10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4ocHJlU2VsZWN0ZWRBZGRPbklkcyk7XG4gIGNvbnN0IFtzdWJtaXR0ZWQsIHNldFN1Ym1pdHRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1zZywgc2V0RXJyb3JNc2ddID0gdXNlU3RhdGUoJycpO1xuXG4gIC8vIFJldHJpZXZlIGN1cnJlbnQgbW90b3JjeWNsZXMgZGF0YSB0byBmaW5kIHRoaXMgYmlrZSdzIGFjdGl2ZSBhZGQtb25zXG4gIGNvbnN0IG1vdG9yY3ljbGVzRGF0YSA9ICgoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNhdmVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Vsa2hvbHlfbW90b3JjeWNsZXMnKTtcbiAgICAgIHJldHVybiBzYXZlZCA/IEpTT04ucGFyc2Uoc2F2ZWQpIDogTU9UT1JDWUNMRVNfREFUQTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBNT1RPUkNZQ0xFU19EQVRBO1xuICAgIH1cbiAgfSkoKSBhcyBNb3RvcmN5Y2xlW107XG5cbiAgY29uc3Qgc2VsZWN0ZWRCaWtlID0gbW90b3JjeWNsZXNEYXRhLmZpbmQoYiA9PiBiLmlkID09PSBtb3RvcmN5Y2xlSWQpO1xuICBjb25zdCBiaWtlQWRkT25zID0gc2VsZWN0ZWRCaWtlPy5hZGRPbnMgfHwgW107XG5cbiAgY29uc3QgY2F0ZWdvcnlOYW1lTWFwID0ge1xuICAgIEE6IHsgYXI6ICfYs9io2YjYsdiqIChBKScsIGVuOiAnU3BvcnQgKEEpJyB9LFxuICAgIEI6IHsgYXI6ICfZg9ix2YjYstixIChCKScsIGVuOiAnQ3J1aXNlciAoQiknIH0sXG4gICAgQzogeyBhcjogJ9mF2LrYp9mF2LHYp9iqIChDKScsIGVuOiAnQWR2ZW50dXJlIChDKScgfSxcbiAgICBTOiB7IGFyOiAn2LPZg9mI2KrYsSAoUyknLCBlbjogJ1Njb290ZXIgKFMpJyB9LFxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gZS50YXJnZXQ7XG4gICAgc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgW25hbWVdOiB2YWx1ZSB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVUb2dnbGVBZGRPbiA9IChpZDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHNlbGVjdGVkQWRkT25JZHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICBzZXRTZWxlY3RlZEFkZE9uSWRzKHNlbGVjdGVkQWRkT25JZHMuZmlsdGVyKHggPT4geCAhPT0gaWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0U2VsZWN0ZWRBZGRPbklkcyhbLi4uc2VsZWN0ZWRBZGRPbklkcywgaWRdKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gUHJpY2luZyBjYWxjdWxhdGlvbnNcbiAgY29uc3Qgb3JpZ2luYWxQcmljZVVzZCA9IHNlbGVjdGVkQmlrZSA/IChzZWxlY3RlZEJpa2Uub3JpZ2luYWxQcmljZSB8fCBzZWxlY3RlZEJpa2UucHJpY2VOdW0pIDogcGFyc2VGbG9hdChwcmljZS5yZXBsYWNlKC9bXjAtOV0vZywgJycpKTtcbiAgY29uc3QgaXNEaXNjb3VudGVkID0gISEoc2VsZWN0ZWRCaWtlICYmIHNlbGVjdGVkQmlrZS5vcmlnaW5hbFByaWNlICYmIHNlbGVjdGVkQmlrZS5kaXNjb3VudCAmJiBzZWxlY3RlZEJpa2UuZGlzY291bnQgPiAwKTtcblxuICBjb25zdCBnZXREaXNjb3VudGVkUHJpY2VVc2QgPSAoKSA9PiB7XG4gICAgaWYgKHNlbGVjdGVkQmlrZSkge1xuICAgICAgaWYgKGlzRGlzY291bnRlZCAmJiBzZWxlY3RlZEJpa2UuZGlzY291bnQgJiYgc2VsZWN0ZWRCaWtlLm9yaWdpbmFsUHJpY2UpIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkQmlrZS5kaXNjb3VudFR5cGUgPT09ICdwZXJjZW50YWdlJykge1xuICAgICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBzZWxlY3RlZEJpa2Uub3JpZ2luYWxQcmljZSAqICgxIC0gc2VsZWN0ZWRCaWtlLmRpc2NvdW50IC8gMTAwKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIHNlbGVjdGVkQmlrZS5vcmlnaW5hbFByaWNlIC0gc2VsZWN0ZWRCaWtlLmRpc2NvdW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGVjdGVkQmlrZS5wcmljZU51bTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQocHJpY2UucmVwbGFjZSgvW14wLTldL2csICcnKSkgfHwgMDtcbiAgfTtcblxuICBjb25zdCBiYXNlUHJpY2VVc2QgPSBnZXREaXNjb3VudGVkUHJpY2VVc2QoKTtcbiAgY29uc3Qgc2VsZWN0ZWRBZGRPbnNQcmljZVVzZCA9IGJpa2VBZGRPbnNcbiAgICAuZmlsdGVyKGFkZG9uID0+IHNlbGVjdGVkQWRkT25JZHMuaW5jbHVkZXMoYWRkb24uaWQpKVxuICAgIC5yZWR1Y2UoKHN1bSwgYWRkb24pID0+IHN1bSArIGFkZG9uLnByaWNlLCAwKTtcblxuICBjb25zdCBmaW5hbFRvdGFsUHJpY2VVc2QgPSBiYXNlUHJpY2VVc2QgKyBzZWxlY3RlZEFkZE9uc1ByaWNlVXNkO1xuXG4gIGNvbnN0IGZvcm1hdFByaWNlID0gKHVzZDogbnVtYmVyKSA9PiB7XG4gICAgaWYgKGxhbmcgPT09ICdhcicpIHtcbiAgICAgIHJldHVybiBgJHt1c2QudG9Mb2NhbGVTdHJpbmcoKX0g2KzZhtmK2YdgO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7dXNkLnRvTG9jYWxlU3RyaW5nKCl9IEVHUGA7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlQcmljZVRleHQgPSBmb3JtYXRQcmljZShmaW5hbFRvdGFsUHJpY2VVc2QpO1xuXG4gIC8vIEFjY2Vzc29yaWVzIHBheWxvYWQgc3RyaW5ncyBmb3IgV2hhdHNBcHBcbiAgY29uc3Qgc2VsZWN0ZWRBZGRPbnMgPSBiaWtlQWRkT25zLmZpbHRlcihhID0+IHNlbGVjdGVkQWRkT25JZHMuaW5jbHVkZXMoYS5pZCkpO1xuICBjb25zdCBhZGRvbnNUZXh0RW4gPSBzZWxlY3RlZEFkZE9ucy5sZW5ndGggPiAwXG4gICAgPyBgXFxuQWRkLW9ucyBTZWxlY3RlZDogJHtzZWxlY3RlZEFkZE9ucy5tYXAoYSA9PiBgJHthLm5hbWV9ICgrJHthLnByaWNlLnRvTG9jYWxlU3RyaW5nKCl9IEVHUClgKS5qb2luKCcsICcpfWBcbiAgICA6ICcnO1xuICBjb25zdCBhZGRvbnNUZXh0QXIgPSBzZWxlY3RlZEFkZE9ucy5sZW5ndGggPiAwXG4gICAgPyBgXFxu2KfZhNmD2YXYp9mE2YrYp9iqINin2YTZhdit2K/Yr9ipOiAke3NlbGVjdGVkQWRkT25zLm1hcChhID0+IGAke2EubmFtZUFyIHx8IGEubmFtZX0gKCske2EucHJpY2UudG9Mb2NhbGVTdHJpbmcoKX0g2KzZhtmK2YcpYCkuam9pbign2IwgJyl9YFxuICAgIDogJyc7XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIWZvcm1EYXRhLm5hbWUgfHwgIWZvcm1EYXRhLnBob25lIHx8ICFmb3JtRGF0YS5lbWFpbCB8fCAhZm9ybURhdGEuZGF0ZSkge1xuICAgICAgc2V0RXJyb3JNc2codCgncmVxdWlyZWRfZmllbGRzJykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHZlaGljbGVUeXBlID0gY2F0ZWdvcnkgPT09ICdTJyBcbiAgICAgID8gKGxhbmcgPT09ICdhcicgPyAn2LPZg9mI2KrYsScgOiAnU2Nvb3RlcicpXG4gICAgICA6IChsYW5nID09PSAnYXInID8gJ9mF2YjYqtmI2LPZitmD2YQnIDogJ01vdG9yY3ljbGUnKTtcblxuICAgIGNvbnN0IGFjdGl2ZUNhdGVnb3J5ID0gY2F0ZWdvcnlOYW1lTWFwW2NhdGVnb3J5XVtsYW5nXTtcblxuICAgIC8vIEJ1aWxkIG11bHRpbGluZ3VhbCBXaGF0c0FwcCBtZXNzYWdlIHdpdGggYWRkLW9ucyBhbmQgZHluYW1pYyBwcmljaW5nXG4gICAgbGV0IHdhVGV4dCA9ICcnO1xuICAgIGlmIChsYW5nID09PSAnYXInKSB7XG4gICAgICB3YVRleHQgPSBcbmDZhdix2K3YqNin2YvYjCDYo9ix2YrYryDYrdis2LIg2YfYsNinINin2YQke3ZlaGljbGVUeXBlfTpcbtin2YTZhdmI2K/ZitmEOiAke21vdG9yY3ljbGVOYW1lfVxu2KfZhNmB2KbYqTogJHthY3RpdmVDYXRlZ29yeX0ke2FkZG9uc1RleHRBcn1cbtin2YTYs9i52LEg2KfZhNix2YrYp9i22Yog2KfZhNil2KzZhdin2YTZijogJHtkaXNwbGF5UHJpY2VUZXh0fVxu2KfZhNiq2KfYsdmK2K46ICR7Zm9ybURhdGEuZGF0ZX1cbtin2LPZhSDYp9mE2LnZhdmK2YQ6ICR7Zm9ybURhdGEubmFtZX1cbtin2YTZh9in2KrZgTogJHtmb3JtRGF0YS5waG9uZX1cbtin2YTYqNix2YrYrzogJHtmb3JtRGF0YS5lbWFpbH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB3YVRleHQgPSBcbmBIZWxsbywgSSB3b3VsZCBsaWtlIHRvIHJlc2VydmUgdGhpcyAke3ZlaGljbGVUeXBlfTpcbk1vZGVsOiAke21vdG9yY3ljbGVOYW1lfVxuQ2F0ZWdvcnk6ICR7YWN0aXZlQ2F0ZWdvcnl9JHthZGRvbnNUZXh0RW59XG5Ub3RhbCBDb21iaW5lZCBQcmljZTogJHtkaXNwbGF5UHJpY2VUZXh0fVxuRGF0ZTogJHtmb3JtRGF0YS5kYXRlfVxuQ3VzdG9tZXIgTmFtZTogJHtmb3JtRGF0YS5uYW1lfVxuUGhvbmU6ICR7Zm9ybURhdGEucGhvbmV9XG5FbWFpbDogJHtmb3JtRGF0YS5lbWFpbH1gO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldFBob25lID0gaW52b2ljZVdoYXRzYXBwTnVtYmVyIHx8ICcyMDEwMDcwNjIxMjMnO1xuICAgIGNvbnN0IGVuY29kZWRUZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHdhVGV4dCk7XG4gICAgY29uc3Qgd2FVcmwgPSBgaHR0cHM6Ly93YS5tZS8ke3RhcmdldFBob25lfT90ZXh0PSR7ZW5jb2RlZFRleHR9YDtcblxuICAgIGNvbnN0IG5ld0Jvb2tpbmdJZCA9IGBib29rLSR7RGF0ZS5ub3coKX1gO1xuICAgIGNvbnN0IG5ld0Jvb2tpbmcgPSB7XG4gICAgICBpZDogbmV3Qm9va2luZ0lkLFxuICAgICAgbW90b3JjeWNsZUlkLFxuICAgICAgbW90b3JjeWNsZU5hbWUsXG4gICAgICBjYXRlZ29yeSxcbiAgICAgIHByaWNlOiBkaXNwbGF5UHJpY2VUZXh0LFxuICAgICAgbmFtZTogZm9ybURhdGEubmFtZSxcbiAgICAgIHBob25lOiBmb3JtRGF0YS5waG9uZSxcbiAgICAgIGVtYWlsOiBmb3JtRGF0YS5lbWFpbCxcbiAgICAgIGRhdGU6IGZvcm1EYXRhLmRhdGUsXG4gICAgICBzZWxlY3RlZEFkZE9uczogc2VsZWN0ZWRBZGRPbnMubWFwKGEgPT4gKHsgaWQ6IGEuaWQsIG5hbWU6IGEubmFtZSwgcHJpY2U6IGEucHJpY2UgfSkpLFxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBzdGF0dXM6ICdwZW5kaW5nJ1xuICAgIH07XG5cbiAgICAvLyAxLiBQZXJzaXN0IGJvb2tpbmcgdG8gRmlyZXN0b3JlIHVzaW5nIG91ciBzZWN1cmUgc2NoZW1hXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHNldERvYyhkb2MoZGIsICdib29raW5ncycsIG5ld0Jvb2tpbmdJZCksIHtcbiAgICAgICAgY3VzdG9tZXJOYW1lOiBmb3JtRGF0YS5uYW1lIHx8ICdBbm9ueW1vdXMgVXNlcicsXG4gICAgICAgIGN1c3RvbWVyUGhvbmU6IGZvcm1EYXRhLnBob25lIHx8ICcwMDAwMDAwMDAnLFxuICAgICAgICBtb3RvcmN5Y2xlSWQ6IG1vdG9yY3ljbGVJZCxcbiAgICAgICAgbW90b3JjeWNsZU5hbWU6IG1vdG9yY3ljbGVOYW1lLFxuICAgICAgICB0b3RhbFByaWNlOiBmaW5hbFRvdGFsUHJpY2VVc2QsXG4gICAgICAgIHN0YXR1czogJ3BlbmRpbmcnXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIkZpcmVzdG9yZSBzYXZlIGZhaWxlZCwgZmFsbGluZyBiYWNrIGdyYWNlZnVsbHkgdG8gbG9jYWwgaW5kZXg6XCIsIGVycik7XG4gICAgICAvLyBPcHRpb25hbDogaGFuZGxlRmlyZXN0b3JlRXJyb3IoZXJyLCBPcGVyYXRpb25UeXBlLldSSVRFLCBgYm9va2luZ3MvJHtuZXdCb29raW5nSWR9YCk7XG4gICAgfVxuXG4gICAgLy8gMi4gUGVyc2lzdCBib29raW5nIHRvIGxvY2FsU3RvcmFnZSB3aXRoIGNvbXBsZXRlIGRldGFpbHNcbiAgICB0cnkge1xuICAgICAgY29uc3QgZXhpc3RpbmdTdHIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZWxraG9seV9ib29raW5ncycpO1xuICAgICAgY29uc3QgZXhpc3RpbmcgPSBleGlzdGluZ1N0ciA/IEpTT04ucGFyc2UoZXhpc3RpbmdTdHIpIDogW107XG4gICAgICBleGlzdGluZy51bnNoaWZ0KG5ld0Jvb2tpbmcpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfYm9va2luZ3MnLCBKU09OLnN0cmluZ2lmeShleGlzdGluZykpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHBlcnNpc3RpbmcgYm9va2luZyBsb2NhbGx5OlwiLCBlcnIpO1xuICAgIH1cblxuICAgIHNldFN1Ym1pdHRlZCh0cnVlKTtcbiAgICBcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHdpbmRvdy5vcGVuKHdhVXJsLCAnX2JsYW5rJyk7XG4gICAgICBvbkNsb3NlKCk7XG4gICAgfSwgMjAwMCk7XG4gIH07XG5cbiAgLy8gTXVsdGktbGluZ3VhbCBkeW5hbWljIGxpdmUgdGV4dCBjb25zdHJ1Y3Rpb24gZm9yIHByZXZpZXdcbiAgY29uc3QgdmVoaWNsZVR5cGUgPSBjYXRlZ29yeSA9PT0gJ1MnIFxuICAgID8gKGxhbmcgPT09ICdhcicgPyAn2LPZg9mI2KrYsScgOiAnU2Nvb3RlcicpXG4gICAgOiAobGFuZyA9PT0gJ2FyJyA/ICfZhdmI2KrZiNiz2YrZg9mEJyA6ICdNb3RvcmN5Y2xlJyk7XG5cbiAgY29uc3QgYWN0aXZlQ2F0ZWdvcnkgPSBjYXRlZ29yeU5hbWVNYXBbY2F0ZWdvcnldW2xhbmddO1xuXG4gIGxldCB3YVByZXZpZXdUZXh0ID0gJyc7XG4gIGlmIChsYW5nID09PSAnYXInKSB7XG4gICAgd2FQcmV2aWV3VGV4dCA9IFxuYNmF2LHYrdio2KfZi9iMINij2LHZitivINit2KzYsiDZh9iw2Kcg2KfZhCR7dmVoaWNsZVR5cGV9Olxu2KfZhNmF2YjYr9mK2YQ6ICR7bW90b3JjeWNsZU5hbWV9XG7Yp9mE2YHYptipOiAke2FjdGl2ZUNhdGVnb3J5fSR7YWRkb25zVGV4dEFyfVxu2KfZhNiz2LnYsSDYp9mE2YPZhNmKOiAke2Rpc3BsYXlQcmljZVRleHR9XG7Yp9mE2KrYp9ix2YrYrjogJHtmb3JtRGF0YS5kYXRlIHx8ICdb2KrYrdiv2YrYryDYp9mE2KrYp9ix2YrYrl0nfVxu2KfYs9mFINin2YTYudmF2YrZhDogJHtmb3JtRGF0YS5uYW1lIHx8ICdb2KfYs9mF2YMg2KjYp9mE2YPYp9mF2YRdJ31gO1xuICB9IGVsc2Uge1xuICAgIHdhUHJldmlld1RleHQgPSBcbmBIZWxsbywgSSB3b3VsZCBsaWtlIHRvIHJlc2VydmUgdGhpcyAke3ZlaGljbGVUeXBlfTpcbk1vZGVsOiAke21vdG9yY3ljbGVOYW1lfVxuQ2F0ZWdvcnk6ICR7YWN0aXZlQ2F0ZWdvcnl9JHthZGRvbnNUZXh0RW59XG5Ub3RhbCBQcmljZTogJHtkaXNwbGF5UHJpY2VUZXh0fVxuRGF0ZTogJHtmb3JtRGF0YS5kYXRlIHx8ICdbU2VsZWN0ZWQgRGF0ZV0nfVxuQ3VzdG9tZXIgTmFtZTogJHtmb3JtRGF0YS5uYW1lIHx8ICdbWW91ciBOYW1lXSd9YDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00IGJnLWJsYWNrLzg1IGJhY2tkcm9wLWJsdXItbWQgb3ZlcmZsb3cteS1hdXRvXCI+XG4gICAgICBcbiAgICAgIHsvKiBDb250YWluZXIgQ2FyZCB3aXRoIEVudHJ5IEJvdW5jZSAqL31cbiAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgIGluaXRpYWw9e3sgc2NhbGU6IDAuOTUsIG9wYWNpdHk6IDAsIHk6IDIwIH19XG4gICAgICAgIGFuaW1hdGU9e3sgc2NhbGU6IDEsIG9wYWNpdHk6IDEsIHk6IDAgfX1cbiAgICAgICAgZXhpdD17eyBzY2FsZTogMC45NSwgb3BhY2l0eTogMCwgeTogMjAgfX1cbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LWxnIGdsYXNzLXBhbmVsIGJvcmRlciBib3JkZXItWyM2MzY2RjFdLzMwIHJvdW5kZWQtM3hsIG92ZXJmbG93LWhpZGRlbiByZWxhdGl2ZSBzaGFkb3ctMnhsIGJveC1nbG93LWN5YW4gbXktOFwiXG4gICAgICA+XG4gICAgICAgIHsvKiBHbG93IGNvcm5lciBoaWdobGlnaHRzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgdy0yNCBoLTI0IGJnLWdyYWRpZW50LXRvLXRyIGZyb20tdHJhbnNwYXJlbnQgdG8tYnJhbmQtYWNjZW50LzIwIGJsdXIteGwgcm91bmRlZC1mdWxsIGFuaW1hdGUtcHVsc2UgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTAgbGVmdC0wIHctMjQgaC0yNCBiZy1ncmFkaWVudC10by1ibCBmcm9tLXRyYW5zcGFyZW50IHRvLWJyYW5kLXByaW1hcnkvMjAgYmx1ci14bCByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1wdWxzZSBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cblxuICAgICAgICB7LyogTW9kYWwgV2luZG93IFRpdGxlIFBhbmVsICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItd2hpdGUvWzAuMDhdIHAtNSBzaHJpbmstMCByZWxhdGl2ZSB6LTIwXCIgZGlyPXtkaXJ9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQtbGcgYmctYnJhbmQtYWNjZW50LzEwIGJvcmRlciBib3JkZXItYnJhbmQtYWNjZW50LzIwXCI+XG4gICAgICAgICAgICAgIDxCaWtlIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1icmFuZC1hY2NlbnRcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGVmdFwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIHRleHQtd2hpdGUgdXBwZXJjYXNlIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gPD7Yrdis2LIgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1icmFuZC1hY2NlbnRcIj7YotmF2YYg2YjZhdio2KfYtNixPC9zcGFuPjwvPiA6IDw+U0VDVVJFIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYnJhbmQtYWNjZW50XCI+UkVTRVJWQVRJT048L3NwYW4+PC8+fVxuICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ubyB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0XCI+TW9kZWw6IHttb3RvcmN5Y2xlTmFtZX08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci13aGl0ZS81IGJnLXdoaXRlL1swLjAzXSB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgcmVsYXRpdmUgei01MFwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiQ2xvc2VcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQ29udGVudCBCb3ggKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IG1heC1oLVs3NXZoXSBvdmVyZmxvdy15LWF1dG9cIj5cbiAgICAgICAgICB7IXN1Ym1pdHRlZCA/IChcbiAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IGNsYXNzTmFtZT1cInNwYWNlLXktNCB0ZXh0LWxlZnRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTQwMCBmb250LXNhbnMgbGVhZGluZy1yZWxheGVkIGJvcmRlci1sLTIgYm9yZGVyLWJyYW5kLXByaW1hcnkgcGwtMyBiZy1icmFuZC1wcmltYXJ5LzUgcHktMi41IHJvdW5kZWQtci1sZyBtYi0yIHRleHQtcmlnaHRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAoXG4gICAgICAgICAgICAgICAgICA8Ptiq2YLYr9mK2LEg2LPYudixINin2YTZhdin2YPZitmG2Kkg2KfZhNmF2K7Yqtin2LHYqTogPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1icmFuZC1hY2NlbnQgZm9udC1leHRyYWJvbGQgZm9udC1tb25vIHRleHQtc21cIj57ZGlzcGxheVByaWNlVGV4dH08L3NwYW4+LiDYo9mD2YXZhCDZhdi52KfZitmK2LEg2KfZhNin2LPYqtmF2KfYsdipINmE2YHYqtitINio2YjYp9io2Kkg2KfZhNit2KzYsiDZgdin2KbZgtipINin2YTYo9mF2KfZhi48Lz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPD5TZWxlY3RlZCBtYWNoaW5lIHByaWNlIGVzdGltYXRlOiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJyYW5kLWFjY2VudCBmb250LWV4dHJhYm9sZCBmb250LW1vbm8gdGV4dC1zbVwiPntkaXNwbGF5UHJpY2VUZXh0fTwvc3Bhbj4uIENvbXBsZXRlIHRoZSBmb3JtIHBhcmFtZXRlcnMgdG8gc3RhcnQgdGhlIHNlY3VyZSBXaGF0c0FwcCBvcmRlciBnYXRld2F5LjwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBOYW1lIGlucHV0ICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWdyYXktNDAwIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlXCI+e3QoJ2Z1bGxfbmFtZScpfTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxVc2VyIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMy41IHctNCBoLTQgdGV4dC1icmFuZC1hY2NlbnRcIiAvPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgbmFtZT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Zm9ybURhdGEubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dCgnZnVsbF9uYW1lX3BsYWNlaG9sZGVyJyl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1ibGFjay82NSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBmb2N1czpib3JkZXItYnJhbmQtYWNjZW50IHRleHQtd2hpdGUgcm91bmRlZC14bCBwbC0xMCBwci00IHB5LTIuNSB0ZXh0LXNtIGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogV2hhdHNBcHAgUGhvbmUgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1tb25vIHRleHQtZ3JheS00MDAgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2VcIj57dCgnY29udGFjdF9udW1iZXInKX06PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICA8UGhvbmUgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0zLjUgdy00IGgtNCB0ZXh0LWJyYW5kLWFjY2VudFwiIC8+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRlbFwiXG4gICAgICAgICAgICAgICAgICAgIG5hbWU9XCJwaG9uZVwiXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5waG9uZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0Q2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dCgncGhvbmVfcGxhY2Vob2xkZXInKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLWJsYWNrLzY1IGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGZvY3VzOmJvcmRlci1icmFuZC1hY2NlbnQgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHBsLTEwIHByLTQgcHktMi41IHRleHQtc20gZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBFbWFpbCAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LW1vbm8gdGV4dC1ncmF5LTQwMCBmb250LXNlbWlib2xkIHVwcGVyY2FzZVwiPntsYW5nID09PSAnYXInID8gJ9in2YTYqNix2YrYryDYp9mE2KXZhNmD2KrYsdmI2YbZiicgOiAnRW1haWwgQWRkcmVzcyd9OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPE1haWwgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0zLjUgdy00IGgtNCB0ZXh0LWJyYW5kLWFjY2VudFwiIC8+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLmVtYWlsfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXt0KCdlbWFpbF9wbGFjZWhvbGRlcicpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctYmxhY2svNjUgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wOF0gZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcGwtMTAgcHItNCBweS0yLjUgdGV4dC1zbSBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIERhdGUgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1tb25vIHRleHQtZ3JheS00MDAgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2VcIj57dCgncHJlZmVycmVkX2RhdGUnKX06PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0zLjUgdy00IGgtNCB0ZXh0LWJyYW5kLWFjY2VudFwiIC8+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImRhdGVcIlxuICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5kYXRlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1ibGFjay82NSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBmb2N1czpib3JkZXItYnJhbmQtYWNjZW50IHRleHQtd2hpdGUgcm91bmRlZC14bCBwbC0xMCBwci00IHB5LTIuNSB0ZXh0LXNtIGZvbnQtbW9ubyBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEludGVyYWN0aXZlIEFjY2Vzc29yaWVzIEN1c3RvbSBXaWRnZXQgaW5zaWRlIE1vZGFsICovfVxuICAgICAgICAgICAgICB7YmlrZUFkZE9ucy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBwLTMuNSBiZy1ibGFjay80MCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA1XSByb3VuZGVkLXhsIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTQwMCBmb250LWJvbGQgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTaG9wcGluZ0JhZyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWJyYW5kLWFjY2VudFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9iq2LnYr9mK2YQg2YXZhNit2YLYp9iqINmI2YPZhdin2YTZitin2Kog2KfZhNi32YTYqDonIDogJ0NVU1RPTUlaRSBTRUxFQ1RFRCBBQ0NFTlRTICYgQURET05TOid9XG4gICAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBtYXgtaC1bMTcwcHhdIG92ZXJmbG93LXktYXV0byBzY3JvbGxiYXItdGhpbiBwci0xIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgICAge2Jpa2VBZGRPbnMubWFwKGFkZG9uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0NoZWNrZWQgPSBzZWxlY3RlZEFkZE9uSWRzLmluY2x1ZGVzKGFkZG9uLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNwbGF5QWRkb25OYW1lID0gbGFuZyA9PT0gJ2FyJyAmJiBhZGRvbi5uYW1lQXIgPyBhZGRvbi5uYW1lQXIgOiBhZGRvbi5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlBZGRvbkRlc2MgPSBsYW5nID09PSAnYXInICYmIGFkZG9uLmRlc2NBciA/IGFkZG9uLmRlc2NBciA6IGFkZG9uLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2FkZG9uLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVUb2dnbGVBZGRPbihhZGRvbi5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHAtMiByb3VuZGVkLXhsIGJvcmRlciByZWxhdGl2ZSBjdXJzb3ItcG9pbnRlciBzZWxlY3Qtbm9uZSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgaG92ZXI6c2NhbGUtWzEuMDJdICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDaGVja2VkIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctWyMyMkQzRUVdLzUgYm9yZGVyLVsjMjJEM0VFXS80MCBzaGFkb3ctWzBfMF8xMHB4X3JnYmEoMzQsMjExLDIzOCwwLjEyKV0gcmluZy0xIHJpbmctWyMyMkQzRUVdLzIwJyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWJsYWNrLzQwIGJvcmRlci13aGl0ZS9bMC4wNV0gaG92ZXI6YmctYmxhY2svMjAgaG92ZXI6Ym9yZGVyLXdoaXRlLzEwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFNlbGVjdGlvbiBjaXJjbGUgaW5kaWNhdG9yICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGFic29sdXRlIHRvcC0xLjUgcmlnaHQtMS41IHctNC41IGgtNC41IHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NoZWNrZWQgPyAnYmctWyMyMkQzRUVdIGJvcmRlci1bIzIyRDNFRV0gdGV4dC1bIzBCMEYxQV0nIDogJ2JvcmRlci13aGl0ZS8yMCBiZy1ibGFjay82MCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc0NoZWNrZWQgJiYgPENoZWNrIGNsYXNzTmFtZT1cInctMi41IGgtMi41IHN0cm9rZS1bM11cIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciB0ZXh0LWNlbnRlciBnYXAtMS41IHB0LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWRkb24uaW1hZ2UgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXthZGRvbi5pbWFnZX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD17YWRkb24ubmFtZX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLWxnIG9iamVjdC1jb3ZlciBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHNoYWRvdy1zbSBzaGFkb3ctYmxhY2svMzAgYW5pbWF0ZS1wdWxzZS1zbG93XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVyUG9saWN5PVwibm8tcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZWFkaW5nLXRpZ2h0IHctZnVsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZSB0ZXh0LVsxMHB4XSBmb250LWJvbGQgYmxvY2sgdHJ1bmNhdGUgbWF4LXctWzEyNXB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGlzcGxheUFkZG9uTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzhweF0gdGV4dC1ncmF5LTUwMCBibG9jayB0cnVuY2F0ZSBtYXgtdy1bMTI1cHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkaXNwbGF5QWRkb25EZXNjfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG10LTIgcHQtMSBib3JkZXItdCBib3JkZXItd2hpdGUvWzAuMDVdIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOS41cHhdIHRleHQtYnJhbmQtYWNjZW50IGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgK3tmb3JtYXRQcmljZShhZGRvbi5wcmljZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgey8qIFNUT1JFOiBGUkVRVUVOVExZIEJPVUdIVCBUT0dFVEhFUiAqL31cbiAgICAgICAgICAgICAge3NlbGVjdGVkQmlrZT8ucmVsYXRlZFByb2R1Y3RJZHMgJiYgc2VsZWN0ZWRCaWtlLnJlbGF0ZWRQcm9kdWN0SWRzLmxlbmd0aCA+IDAgJiYgc3RvcmVQcm9kdWN0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBwLTMuNSBiZy1ibGFjay80MCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA1XSByb3VuZGVkLXhsIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1icmFuZC1zZWNvbmRhcnkgZm9udC1ib2xkIHVwcGVyY2FzZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8U2hvcHBpbmdCYWcgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1icmFuZC1zZWNvbmRhcnlcIiAvPlxuICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfZitmG2LXYrSDYqNi02LHYp9im2YfYpyDZhdi5INin2YTZhdmI2K/ZitmEOicgOiAnRlJFUVVFTlRMWSBCT1VHSFQgVE9HRVRIRVI6J31cbiAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IG92ZXJmbG93LXgtYXV0byBoaWRlLXNjcm9sbGJhciBnYXAtMiBwYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZEJpa2UucmVsYXRlZFByb2R1Y3RJZHMubWFwKHByb2R1Y3RJZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3AgPSBzdG9yZVByb2R1Y3RzLmZpbmQocCA9PiBwLmlkID09PSBwcm9kdWN0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICghc3ApIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17c3AuaWR9IGNsYXNzTmFtZT1cIm1pbi13LVsxNDBweF0gZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gcC0yIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wNV0gYmctd2hpdGUvWzAuMDJdIHJlbGF0aXZlIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17c3AuaW1hZ2V9IGNsYXNzTmFtZT1cInctMTIgaC0xMiByb3VuZGVkLWxnIG9iamVjdC1jb250YWluIGJnLWJsYWNrLzUwIG92ZXJmbG93LWhpZGRlblwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciB3LWZ1bGwgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtd2hpdGUgdGV4dC1bMTBweF0gZm9udC1ib2xkIHRydW5jYXRlIG1heC13LVsxMjBweF1cIj57bGFuZyA9PT0gJ2FyJyA/IHNwLm5hbWVBciA6IHNwLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1icmFuZC1zZWNvbmRhcnkgZm9udC1ib2xkXCI+e3NwLnByaWNlLnRvTG9jYWxlU3RyaW5nKCl9IHtsYW5nID09PSAnYXInID8gJ9isJyA6ICdFR1AnfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25BZGRUb0NhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25BZGRUb0NhcnQoc3AsICdwcm9kdWN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGxhbmcgPT09ICdhcicgPyAn2KrZhdiqINin2YTYpdi22KfZgdipINmE2YTYs9mE2KknIDogJ0FkZGVkIHRvIGNhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWNlbnRlciBweS0xLjUgYmctYnJhbmQtc2Vjb25kYXJ5LzIwIGhvdmVyOmJnLWJyYW5kLXNlY29uZGFyeS80MCB0ZXh0LWJyYW5kLXNlY29uZGFyeSB0ZXh0LVs5cHhdIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3Qgcm91bmRlZCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArIHtsYW5nID09PSAnYXInID8gJ9il2LbYp9mB2KknIDogJ0FERCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICB7LyogRHluYW1pYyBXaGF0c0FwcCBQcmV2aWV3ICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wNl0gYmctWyMwNzBBMTFdIHAtMyB0ZXh0LXhzIGxlYWRpbmctcmVsYXhlZCBzcGFjZS15LTEuNSBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LVsjQTg1NUY3XSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZm9udC1ib2xkIGJvcmRlci1iIGJvcmRlci13aGl0ZS81IHBiLTEgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57dCgncHJldmlld19tZXNzYWdlJyl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZVwiPntsYW5nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktMzAwIGZvbnQtc2FucyB3aGl0ZXNwYWNlLXByZS13cmFwIHRleHQtcmlnaHQgdGV4dC14cyBwdC0xXCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAge3dhUHJldmlld1RleHR9XG4gICAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBFcnJvciBtZXNzYWdlcyAqL31cbiAgICAgICAgICAgICAge2Vycm9yTXNnICYmIChcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtcmVkLTUwMCBmb250LW1vbm8gdGV4dC1jZW50ZXJcIj57ZXJyb3JNc2d9PC9wPlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIHsvKiBTdWJtaXQgQ1RBICovfVxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTMgbXQtNCByb3VuZGVkLXhsIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFja2luZy13aWRlc3QgdGV4dC1bIzBCMEYxQV0gYmctZ3JhZGllbnQtdG8tciBmcm9tLWJyYW5kLWFjY2VudCB0by1icmFuZC1wcmltYXJ5IGhvdmVyOmJyaWdodG5lc3MtMTEwIGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCB0ZXh0LWNlbnRlciBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbGcgc2hhZG93LWJyYW5kLWFjY2VudC8yMCB1cHBlcmNhc2UgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTJcIlxuICAgICAgICAgICAgICAgIGlkPVwibW9kYWwtc3VibWl0LWJvb2tpbmdcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2KXYsdiz2KfZhCDYt9mE2Kgg2KfZhNit2KzYsiDYpdmE2Ykg2YjYp9iq2LPYp9ioINin2YTZg9iq2LHZiNmG2YrYp9mLJyA6ICdUUkFOU01JVCBSRVNFUlZBVElPTiBUTyBXSEFUU0FQUCd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxBcnJvd1JpZ2h0IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAvLyBTdWNjZXNzIFRyYW5zbWlzc2lvbiBzdGF0ZSBvZi10aGUtYXJ0IHZpc3VhbCBwYW5lbFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBweS04IHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTYgaC0xNiByb3VuZGVkLWZ1bGwgYmctZ3JlZW4tNTAwLzEwIGJvcmRlciBib3JkZXItZ3JlZW4tNTAwLzMwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctMTAgaC0xMCB0ZXh0LWdyZWVuLTQwMCBhbmltYXRlLWJvdW5jZVwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciB0ZXh0LXdoaXRlIHVwcGVyY2FzZSBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gPD7YqtmFIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tNDAwXCI+2KrZgdmI2YrYtiDYp9mE2K3YrNiyPC9zcGFuPjwvPiA6IDw+VFJBTlNNSVNTSU9OIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZ3JlZW4tNDAwXCI+QVVUSE9SSVpFRDwvc3Bhbj48Lz59XG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS00MDAgbGVhZGluZy1yZWxheGVkIG1heC13LXNtIG14LWF1dG8gZm9udC1zYW5zXCI+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyBcbiAgICAgICAgICAgICAgICAgICAgPyA8Ptis2KfYsdmKINiq2YjYrNmK2Ycg2KjZitin2YbYp9iq2YMg2KjZhtis2KfYrSDYpdmE2Ykg2YTZiNit2Kkg2LTYsdmD2KkgPHN0cm9uZz7Yp9mE2K7ZiNmE2Yog2YXZiNiq2YjYsdiyPC9zdHJvbmc+INi52KjYsSDYrtiv2YXYqSDYp9mE2YjYp9iq2LPYp9ioINin2YTYotmF2YbYqSDZiNiq2KzZh9mK2LIg2KfZhNix2KfYqNi3INin2YTZhdio2KfYtNixLjwvPlxuICAgICAgICAgICAgICAgICAgICA6IDw+V2UgYXJlIGZvcndhcmRpbmcgeW91ciBwYXJhbWV0ZXJzIHRvIDxzdHJvbmc+RWxLaG9seSBNb3RvcnMgV2hhdHNBcHA8L3N0cm9uZz4gc2VjdXJlIGRhc2hib2FyZC4gQ29udGludWUgYm9va2luZyBzdGVwcyBpbiB0aGUgdXBjb21pbmcgd2luZG93IHRhYi48Lz5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLXdoaXRlL1swLjAyXSBib3JkZXIgYm9yZGVyLXdoaXRlLzUgcm91bmRlZC0yeGwgdGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtZ3JheS00MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgbWF4LXcteHMgbXgtYXV0byBhbmltYXRlLXB1bHNlXCI+XG4gICAgICAgICAgICAgICAgPE1lc3NhZ2VTcXVhcmUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWJyYW5kLWFjY2VudCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3QoJ3RyYW5zbWl0dGluZ19saW5rJyl9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L21vdGlvbi5kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiJBQStQUSxTQVd5QixVQVh6QjtBQS9QUjtBQUFBO0FBQUE7QUFBQTtBQUtBLFNBQWdCLGdCQUFnQjtBQUNoQyxTQUFTLGNBQStCO0FBQ3hDLFNBQVMsR0FBRyxVQUFVLE1BQU0sT0FBTyxNQUFNLGNBQWMsZUFBZSxZQUFZLE1BQU0sYUFBYSxhQUFhO0FBRWxILFNBQVMsbUJBQW1CO0FBQzVCLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsVUFBK0M7QUFDeEQsU0FBUyxLQUFLLGNBQWM7QUFlNUIsd0JBQXdCLGFBQWE7QUFBQSxFQUNuQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQTtBQUFBLEVBQ0Esc0JBQXNCLENBQUM7QUFBQSxFQUN2QixnQkFBZ0IsQ0FBQztBQUFBLEVBQ2pCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixHQUFzQjtBQUNwQixRQUFNLEVBQUUsTUFBTSxLQUFLLEVBQUUsSUFBSSxZQUFZO0FBQ3JDLFFBQU0sQ0FBQyxVQUFVLFdBQVcsSUFBSSxTQUFTO0FBQUEsSUFDdkMsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLElBQ1AsT0FBTSxvQkFBSSxLQUFLLEdBQUUsWUFBWSxFQUFFLE1BQU0sR0FB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