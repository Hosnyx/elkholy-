import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=905fa188"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=905fa188"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useMemo = __vite__cjsImport1_react["useMemo"];
import { motion, AnimatePresence } from "/node_modules/.vite/deps/motion_react.js?v=905fa188";
import {
  X,
  Lock,
  Key,
  ShieldCheck,
  Database,
  Upload,
  Eye,
  EyeOff,
  FileText,
  Plus,
  Trash2,
  Edit2,
  Check,
  Sparkles,
  Users,
  Settings,
  TrendingUp,
  Coins,
  Activity,
  Calendar,
  MessageSquare,
  ArrowUpRight,
  CheckCircle2,
  LogOut,
  ShieldAlert,
  ShoppingBag,
  Package,
  Download,
  Search,
  Github,
  Link,
  RefreshCw,
  Code
} from "/node_modules/.vite/deps/lucide-react.js?v=905fa188";
import { useLanguage } from "/src/context/LanguageContext.tsx";
import { DEFAULT_HOMEPAGE_CONFIG } from "/src/data.ts";
import HomepagePageBuilder from "/src/components/HomepagePageBuilder.tsx";
import StoreAdminPanel from "/src/components/StoreAdminPanel.tsx";
import { db } from "/src/lib/firebase.ts";
import { collection, doc, setDoc, deleteDoc, getDocs } from "/node_modules/.vite/deps/firebase_firestore.js?v=905fa188";
import * as XLSX from "/node_modules/.vite/deps/xlsx.js?v=905fa188";
import { QRCodeSVG } from "/node_modules/.vite/deps/qrcode__react.js?v=905fa188";
import __vite__cjsImport12_jszip from "/node_modules/.vite/deps/jszip.js?v=905fa188"; const JSZip = __vite__cjsImport12_jszip.__esModule ? __vite__cjsImport12_jszip.default : __vite__cjsImport12_jszip;
const DEFAULT_USERS = [
  { username: "HOSNY1995", password: "Hhrm0101995ELelkholy", role: "Admin" }
];
export default function AdminPanel({
  onClose,
  motorcycles,
  onUpdateMotorcycles,
  storeProducts = [],
  onUpdateStoreProducts,
  customText,
  onUpdateCustomText,
  homepageConfig = DEFAULT_HOMEPAGE_CONFIG,
  onUpdateHomepageConfig
}) {
  const { lang, dir, t } = useLanguage();
  const [sessionUser, setSessionUser] = useState(() => {
    const saved = localStorage.getItem("elkholy_session_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("elkholy_users");
    if (saved) return JSON.parse(saved);
    localStorage.setItem("elkholy_users", JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const canAccess = (tab) => {
    if (sessionUser?.role === "Admin") return true;
    if (sessionUser?.role === "Manager") return ["dashboard", "motorcycles", "store"].includes(tab);
    if (sessionUser?.role === "Staff") return ["motorcycles", "store"].includes(tab);
    return false;
  };
  useEffect(() => {
    if (sessionUser && !canAccess(activeTab)) {
      if (sessionUser.role === "Manager") setActiveTab("dashboard");
      else setActiveTab("motorcycles");
    }
  }, [sessionUser, activeTab]);
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("elkholy_bookings");
    return saved ? JSON.parse(saved) : [];
  });
  const [toasts, setToasts] = useState([]);
  const [githubToken, setGithubToken] = useState(() => localStorage.getItem("elkholy_github_token") || "");
  const [githubRepo, setGithubRepo] = useState(() => localStorage.getItem("elkholy_github_repo") || "");
  const [githubBranch, setGithubBranch] = useState(() => localStorage.getItem("elkholy_github_branch") || "main");
  const [githubPath, setGithubPath] = useState(() => localStorage.getItem("elkholy_github_path") || "elkholy_backup.json");
  const [githubImportUrl, setGithubImportUrl] = useState("");
  const [isGithubExporting, setIsGithubExporting] = useState(false);
  const [isGithubImporting, setIsGithubImporting] = useState(false);
  const [isPushingProject, setIsPushingProject] = useState(false);
  const [projectPushStep, setProjectPushStep] = useState("");
  const [dashCategoryFilter, setDashCategoryFilter] = useState("All");
  const [bikeSearchTerm, setBikeSearchTerm] = useState("");
  const [formSubTab, setFormSubTab] = useState("basic");
  const [newAddOn, setNewAddOn] = useState({
    id: "",
    name: "",
    nameAr: "",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=150",
    description: "",
    descAr: "",
    price: 0
  });
  const [editingBike, setEditingBike] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [bikeForm, setBikeForm] = useState({
    id: "",
    name: "",
    category: "A",
    categoryName: "Sport",
    price: "$45,000",
    priceNum: 45e3,
    image: "",
    tagline: "Ride the Future",
    shortDesc: "",
    longDesc: "",
    isPopular: false,
    specs: {
      engine: "1200cc Solid-State Hub",
      topSpeed: "320 km/h",
      fuelConsumption: "0.0 L/100km",
      power: "190 hp",
      weight: "170 kg"
    },
    isCustom: true,
    catalogFileName: "",
    catalogFileContent: "",
    originalPrice: 45e3,
    discount: 0,
    discountType: "percentage",
    offerLabel: "",
    addOns: [],
    serialCode: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("Staff");
  const [textForm, setTextForm] = useState({
    arTitle: customText?.arTitle || "الخولي",
    arTitleAccent: customText?.arTitleAccent || "موتورز",
    enTitle: customText?.enTitle || "ELKHOLY",
    enTitleAccent: customText?.enTitleAccent || "MOTORS",
    arSlogan: customText?.arSlogan || "سابق مع المستقبل",
    enSlogan: customText?.enSlogan || "Ride the Future",
    arHeroDesc: customText?.arHeroDesc || "انضم إلى عالم الغد. تقدم الخولي موتورز أقوى الموتوسيكلات والاسكوترات فائقة الأداء للمستقبل. استكشف كتالوجاتنا، واقرأ المواصفات واحجز رحلتك مباشرة.",
    enHeroDesc: customText?.enHeroDesc || "Step inside the virtual grid. ElKholy Motors introduces extreme-output solid-state performance bikes, plasma touring adventurers, and high-fidelity smart urban scooters designed in 2026. Explore our catalog, review blueprints, and book a secure ride directly.",
    arBadge: customText?.arBadge || "أول معرض كبار الشخصيات بمصر",
    enBadge: customText?.enBadge || "EGYPT'S FIRST CHRONOS SHOWROOM"
  });
  const [builderConfig, setBuilderConfig] = useState(homepageConfig);
  const [history, setHistory] = useState([homepageConfig]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [templates, setTemplates] = useState(() => {
    const loaded = localStorage.getItem("elkholy_templates");
    return loaded ? JSON.parse(loaded) : [];
  });
  const [newTemplateName, setNewTemplateName] = useState("");
  const [activeBuilderTab, setActiveBuilderTab] = useState("header");
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
    if (onUpdateHomepageConfig) {
      onUpdateHomepageConfig(newConfig);
    }
  };
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setBuilderConfig(history[prevIndex]);
      if (onUpdateHomepageConfig) {
        onUpdateHomepageConfig(history[prevIndex]);
      }
      fireToast(lang === "ar" ? "تم التراجع عن التعديل" : "Design undone successfully", "info");
    }
  };
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setBuilderConfig(history[nextIndex]);
      if (onUpdateHomepageConfig) {
        onUpdateHomepageConfig(history[nextIndex]);
      }
      fireToast(lang === "ar" ? "تمت إعادة تطبيق التعديل" : "Design redone successfully", "info");
    }
  };
  const handleSaveTemplate = () => {
    if (!newTemplateName.trim()) {
      fireToast(lang === "ar" ? "يرجى إدخال اسم القالب أولاً" : "Template name cannot be empty", "error");
      return;
    }
    const updated = [...templates, { name: newTemplateName.trim(), config: builderConfig }];
    setTemplates(updated);
    localStorage.setItem("elkholy_templates", JSON.stringify(updated));
    setNewTemplateName("");
    fireToast(lang === "ar" ? "تم حفظ هذا التموضع في قائمة قوالبك بنجاح!" : "Current matrix saved as custom template!", "success");
  };
  const handleApplyTemplate = (config) => {
    updateBuilderConfig(config);
    fireToast(lang === "ar" ? "تم تحميل القالب وتثبيته!" : "Template deployed as active matrix!", "success");
  };
  const handleRemoveTemplate = (idx) => {
    const updated = templates.filter((_, i) => i !== idx);
    setTemplates(updated);
    localStorage.setItem("elkholy_templates", JSON.stringify(updated));
    fireToast(lang === "ar" ? "تم حذف القالب المختار" : "Selected template deleted", "info");
  };
  const handleResetToDefault = () => {
    updateBuilderConfig(DEFAULT_HOMEPAGE_CONFIG);
    fireToast(lang === "ar" ? "تمت إعادة تهيئة المعاينة للسمات الافتراضية للمعرض" : "Reset interactive showcase style deck", "info");
  };
  const fireToast = (text, type = "success") => {
    const newToast = { id: `toast-${Date.now()}`, text, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t2) => t2.id !== newToast.id));
    }, 4500);
  };
  useEffect(() => {
    const handleStorageChange = () => {
      const savedBookings = localStorage.getItem("elkholy_bookings");
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  useEffect(() => {
    localStorage.setItem("elkholy_users", JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    async function loadCloudData() {
      if (!sessionUser) return;
      try {
        const bookingsSnap = await getDocs(collection(db, "bookings"));
        if (!bookingsSnap.empty) {
          const list = [];
          bookingsSnap.forEach((doc2) => {
            const data = doc2.data();
            list.push({
              id: doc2.id,
              motorcycleId: data.motorcycleId,
              motorcycleName: data.motorcycleName,
              category: data.category || "A",
              price: data.totalPrice ? `${data.totalPrice.toLocaleString()} EGP` : data.price || "0 EGP",
              name: data.customerName || data.name || "Anonymous User",
              phone: data.customerPhone || data.phone || "000000000",
              email: data.customerEmail || data.email || "Guest (Cloud)",
              date: data.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
              timestamp: data.timestamp || (/* @__PURE__ */ new Date()).toISOString(),
              status: data.status || "sold"
            });
          });
          list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setBookings(list);
          localStorage.setItem("elkholy_bookings", JSON.stringify(list));
        }
      } catch (err) {
        console.warn("Unable to fetch bookings from Firestore:", err);
      }
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        if (!usersSnap.empty) {
          const list = [];
          usersSnap.forEach((doc2) => {
            list.push(doc2.data());
          });
          setUsers(list);
          localStorage.setItem("elkholy_users", JSON.stringify(list));
        } else {
          for (const user of DEFAULT_USERS) {
            await setDoc(doc(db, "users", user.username), user);
          }
        }
      } catch (err) {
        console.warn("Unable to fetch users from Firestore:", err);
      }
    }
    loadCloudData();
  }, [sessionUser]);
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const cleanUser = usernameInput.trim();
    const found = users.find((u) => u.username.toLowerCase() === cleanUser.toLowerCase() && u.password === passwordInput);
    if (found) {
      setSessionUser(found);
      localStorage.setItem("elkholy_session_user", JSON.stringify(found));
      setUsernameInput("");
      setPasswordInput("");
      fireToast(lang === "ar" ? `مرحباً بك مجدداً ${scoreRoleLabel(found.role)}` : `Welcome back ${found.role} operator`, "success");
    } else {
      fireToast(lang === "ar" ? "البوابة المغلقة: بيانات دخول خاطئة" : "Gateway Refused: Incorrect credentials", "error");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("elkholy_session_user");
    setSessionUser(null);
    fireToast(lang === "ar" ? "تم فصل الجلسة بأمان" : "Session terminated securely", "info");
  };
  const dashFilteredBikes = useMemo(() => {
    let filtered = motorcycles;
    if (dashCategoryFilter !== "All") {
      filtered = filtered.filter((b) => b.category === dashCategoryFilter);
    }
    if (bikeSearchTerm.trim()) {
      const query = bikeSearchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (b) => b.name.toLowerCase().includes(query) || b.id && b.id.toLowerCase().includes(query) || b.serialCode && b.serialCode.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [motorcycles, dashCategoryFilter, bikeSearchTerm]);
  const handleFormImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        fireToast(lang === "ar" ? "الحد الأقصى لحجم الملف هو 2 ميجابايت" : "Max attachment limit is 2MB", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setBikeForm((prev) => ({ ...prev, image: reader.result }));
          fireToast(lang === "ar" ? "تم تشفير الصورة وإرفاقها بنجاح" : "Resource image attached and base64 encoded", "success");
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEditBikeClick = (bike) => {
    if (sessionUser?.role === "Staff") {
      fireToast(lang === "ar" ? "صلاحيات منخفضة: لا يمكنك تعديل المركبات" : "Low Privilege Node: Staff cannot modify machines", "error");
      return;
    }
    setEditingBike(bike);
    setIsAddingNew(false);
    setFormSubTab("basic");
    setBikeForm({
      id: bike.id,
      name: bike.name,
      category: bike.category,
      categoryName: bike.categoryName,
      price: bike.price,
      priceNum: bike.priceNum || 45e3,
      image: bike.image,
      tagline: bike.tagline || "Apex Performance",
      shortDesc: bike.shortDesc,
      longDesc: bike.longDesc || "",
      isPopular: !!bike.isPopular,
      specs: { ...bike.specs },
      isCustom: true,
      catalogFileName: bike.catalogFileName || "",
      catalogFileContent: bike.catalogFileContent || "",
      originalPrice: bike.originalPrice !== void 0 ? bike.originalPrice : bike.priceNum || 45e3,
      discount: bike.discount || 0,
      discountType: bike.discountType || "percentage",
      offerLabel: bike.offerLabel || "",
      addOns: bike.addOns ? [...bike.addOns] : [],
      serialCode: bike.serialCode || ""
    });
  };
  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setEditingBike(null);
    setFormSubTab("basic");
    setBikeForm({
      id: `custom-bike-${Date.now()}`,
      name: "NEW APEX MACHINE V4",
      category: "A",
      categoryName: "Sport",
      price: "$45,000",
      priceNum: 45e3,
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600",
      tagline: "Defying Hybrid Propulsion Gravity",
      shortDesc: "State-of-the-art futuristic motorcycle prototype built for top speed and luxury.",
      longDesc: "Engineered with double aero-dynamics, plasma thrust controls, adaptive visual HUD panels, and lightweight solid-state lithium cells for continuous power output.",
      isPopular: false,
      specs: {
        engine: "1200cc Quad-Pulse Solid",
        topSpeed: "340 km/h",
        fuelConsumption: "0.0 L/100km",
        power: "210 HP",
        weight: "172 kg"
      },
      isCustom: true,
      catalogFileName: "",
      catalogFileContent: "",
      originalPrice: 45e3,
      discount: 0,
      discountType: "percentage",
      offerLabel: "",
      addOns: [],
      serialCode: "MOTO-" + Date.now()
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!bikeForm.name || !bikeForm.image) {
      fireToast(lang === "ar" ? "الرجاء إدخال اسم المركبة وصورة صالحة" : "Machine name and visual are both mandatory", "error");
      return;
    }
    const catNames = { A: "Sport", B: "Cruiser", C: "Adventure", S: "Scooter" };
    let calculatedPriceNum = Number(bikeForm.originalPrice !== void 0 ? bikeForm.originalPrice : bikeForm.priceNum || 45e3);
    const discVal = Number(bikeForm.discount || 0);
    if (discVal > 0 && bikeForm.originalPrice) {
      if (bikeForm.discountType === "percentage") {
        calculatedPriceNum = Math.round(bikeForm.originalPrice * (1 - discVal / 100));
      } else {
        calculatedPriceNum = Math.round(Math.max(0, bikeForm.originalPrice - discVal));
      }
    }
    const completedForm = {
      ...bikeForm,
      priceNum: calculatedPriceNum,
      categoryName: catNames[bikeForm.category],
      price: `${calculatedPriceNum.toLocaleString()} جنيه`
    };
    let nextBikes = [];
    if (isAddingNew) {
      nextBikes = [completedForm, ...motorcycles];
      fireToast(lang === "ar" ? "تمت إضافة آلة جديدة للأسطول!" : "New heavy machine commissioned successfully!", "success");
    } else if (editingBike) {
      if (sessionUser?.role === "Staff") {
        fireToast(lang === "ar" ? "خطأ في الترخيص: لا تملك حق التعديل" : "Staff node unauthorized for writes", "error");
        return;
      }
      nextBikes = motorcycles.map((b) => b.id === editingBike.id ? completedForm : b);
      fireToast(lang === "ar" ? "تم تحديث بيانات المعايرة بنجاح!" : "Machine parameters updated in showrooms!", "success");
    }
    onUpdateMotorcycles(nextBikes);
    setEditingBike(null);
    setIsAddingNew(false);
  };
  const handleDeleteBike = (bikeId) => {
    if (sessionUser?.role !== "Admin") {
      fireToast(lang === "ar" ? "العملية مرفوضة: المسؤولون فقط يمكنهم الحذف" : "Privilege Breach: Only core admins can decommission equipment", "error");
      return;
    }
    const nextBikes = motorcycles.filter((b) => b.id !== bikeId);
    onUpdateMotorcycles(nextBikes);
    fireToast(lang === "ar" ? "تم شطب وإزالة المركبة من قاعدة البيانات" : "Heavy cycle decommissioned successfully", "success");
  };
  const handleDownloadAndCopyQRCode = (bike) => {
    const qrCodeText = bike.serialCode || bike.id;
    navigator.clipboard.writeText(qrCodeText).then(() => {
      fireToast(
        lang === "ar" ? `تم نسخ الكود بنجاح: ${qrCodeText}` : `Code copied successfully: ${qrCodeText}`,
        "success"
      );
    }).catch((err) => {
      console.warn("Failed to copy", err);
    });
    const svgElement = document.getElementById(`qr-${bike.id}`);
    if (!svgElement) {
      console.warn(`SVG element qr-${bike.id} not found`);
      return;
    }
    try {
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const blobURL = window.URL.createObjectURL(svgBlob);
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext("2d");
        if (context) {
          context.fillStyle = "#FFFFFF";
          context.fillRect(0, 0, 256, 256);
          context.drawImage(image, 16, 16, 224, 224);
          const pngURL = canvas.toDataURL("image/png");
          const dlLink = document.createElement("a");
          dlLink.href = pngURL;
          dlLink.download = `QR_${bike.name.replace(/\s+/g, "_")}_${qrCodeText}.png`;
          document.body.appendChild(dlLink);
          dlLink.click();
          document.body.removeChild(dlLink);
          window.URL.revokeObjectURL(blobURL);
        }
      };
      image.onerror = () => {
        const dlLink = document.createElement("a");
        dlLink.href = blobURL;
        dlLink.download = `QR_${bike.name.replace(/\s+/g, "_")}_${qrCodeText}.svg`;
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
      };
      image.src = blobURL;
    } catch (err) {
      console.error("Failed to generate download:", err);
    }
  };
  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    if (sessionUser?.role !== "Admin") {
      fireToast(lang === "ar" ? "صلاحيات كافية فقط للمشرف الرئيسي" : "Master administrator key required for nodes curation", "error");
      return;
    }
    const cleanUsername = newUsername.trim();
    if (!cleanUsername || !newPassword) {
      fireToast(lang === "ar" ? "خطأ: يرجى ملء كافة خانات المشرفين" : "Node username and code key are required", "error");
      return;
    }
    const userExists = users.some((u) => u.username.toLowerCase() === cleanUsername.toLowerCase());
    if (userExists) {
      fireToast(lang === "ar" ? "هذا الحساب مسجل بالفعل في الأتمتة" : "Operator node identity key already online", "error");
      return;
    }
    const newUser = {
      username: cleanUsername,
      password: newPassword,
      role: newRole
    };
    const nextUsers = [...users, newUser];
    setUsers(nextUsers);
    setNewUsername("");
    setNewPassword("");
    try {
      await setDoc(doc(db, "users", cleanUsername), newUser);
    } catch (err) {
      console.warn("Unable to sync new user to Firestore:", err);
    }
    fireToast(lang === "ar" ? "تم تفويض المشغل الجديد بنجاح!" : `Operator node delegated: ${cleanUsername} [${newRole}]`, "success");
  };
  const handleDeleteUser = async (usernameToDelete) => {
    if (sessionUser?.role !== "Admin") {
      fireToast("Core admin authorization required", "error");
      return;
    }
    if (usernameToDelete.toUpperCase() === "HOSNY1995") {
      fireToast(lang === "ar" ? "لوائح الأمان: لا يمكن حذف حساب المالك الرئيسي" : "Security Directive: Locked node [HOSNY1995] cannot be erased", "error");
      return;
    }
    if (usernameToDelete === sessionUser.username) {
      fireToast(lang === "ar" ? "لوائح الأمان: لا يمكن حذف مشغل الجلسة الحالي" : "Security Directive: You cannot delete your own session node", "error");
      return;
    }
    const next = users.filter((u) => u.username !== usernameToDelete);
    setUsers(next);
    try {
      await deleteDoc(doc(db, "users", usernameToDelete));
    } catch (err) {
      console.warn("Unable to sync deleted user from Firestore:", err);
    }
    fireToast(lang === "ar" ? "تم سحب صلاحيات المشغل بنجاح" : `Privileges revoked for node: ${usernameToDelete}`, "success");
  };
  const handleContentSubmit = (e) => {
    e.preventDefault();
    if (sessionUser?.role !== "Admin") {
      fireToast(lang === "ar" ? "صلاحيات منخفضة: المشرفون فقط يحق لهم تعديل المحتوى المالي والوصفي" : "Forbidden: Homepage layouts restricted to Admin operators", "error");
      return;
    }
    onUpdateCustomText(textForm);
    if (onUpdateHomepageConfig) {
      onUpdateHomepageConfig(builderConfig);
    }
    fireToast(lang === "ar" ? "تم حفظ وتطوير تصميم صفحة المعرض بنجاح!" : "Advanced layout configuration deployed successfully!", "success");
  };
  const handleClearBookings = async () => {
    if (sessionUser?.role !== "Admin") {
      fireToast(lang === "ar" ? "الوصول مرفوض: الإداريون فقط يحق لهم الحذف" : "Privilege Breach: Only admins can clean logs", "error");
      return;
    }
    localStorage.removeItem("elkholy_bookings");
    setBookings([]);
    try {
      const qSnap = await getDocs(collection(db, "bookings"));
      for (const d of qSnap.docs) {
        await deleteDoc(doc(db, "bookings", d.id));
      }
    } catch (err) {
      console.warn("Unable to clear bookings from Firestore:", err);
    }
    fireToast(lang === "ar" ? "تم تفريغ طابور الحجوزات نهائياً" : "Holographic lead queue purged successfully", "info");
  };
  const handleToggleBookingStatus = async (bookingId, currentStatus) => {
    const nextStatus = currentStatus === "sold" ? "pending" : "sold";
    const updated = bookings.map((b) => b.id === bookingId ? { ...b, status: nextStatus } : b);
    setBookings(updated);
    localStorage.setItem("elkholy_bookings", JSON.stringify(updated));
    try {
      await setDoc(doc(db, "bookings", bookingId), {
        status: nextStatus
      }, { merge: true });
      fireToast(
        lang === "ar" ? "تم تحديث حالة البيع للدراجة بنجاح" : "Motorcycle status updated successfully",
        "success"
      );
    } catch (err) {
      console.warn("Unable to sync booking status in cloud:", err);
    }
  };
  const fleetValue = useMemo(() => {
    return motorcycles.reduce((acc, current) => acc + (current.priceNum || 45e3), 0);
  }, [motorcycles]);
  const catA_Count = useMemo(() => motorcycles.filter((b) => b.category === "A").length, [motorcycles]);
  const catB_Count = useMemo(() => motorcycles.filter((b) => b.category === "B").length, [motorcycles]);
  const catC_Count = useMemo(() => motorcycles.filter((b) => b.category === "C").length, [motorcycles]);
  const catS_Count = useMemo(() => motorcycles.filter((b) => b.category === "S").length, [motorcycles]);
  const motorsTotalSalesValue = useMemo(() => {
    return bookings.reduce((acc, b) => {
      const status = b.status || "sold";
      if (status !== "sold") return acc;
      let numericPrice = 45e3;
      if (b.price) {
        const cleaned = b.price.replace(/[^0-9]/g, "");
        if (cleaned) {
          numericPrice = Number(cleaned);
        }
      }
      return acc + numericPrice;
    }, 0);
  }, [bookings]);
  const motorsTotalSoldCount = useMemo(() => {
    return bookings.filter((b) => (b.status || "sold") === "sold").length;
  }, [bookings]);
  const storeTotalRevenue = useMemo(() => {
    return (storeProducts || []).reduce((acc, p) => acc + (p.price || 0) * (p.soldCount || 0), 0);
  }, [storeProducts]);
  const storeTotalItemsSold = useMemo(() => {
    return (storeProducts || []).reduce((acc, p) => acc + (p.soldCount || 0), 0);
  }, [storeProducts]);
  const [exportRangeType, setExportRangeType] = useState("month");
  const [exportStartDate, setExportStartDate] = useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 16));
  const [exportEndDate, setExportEndDate] = useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 16));
  const handleExportExcel = () => {
    const parsedRealBookings = bookings.map((b) => {
      let numericPrice = 45e3;
      if (b.price) {
        const cleaned = b.price.replace(/[^0-9]/g, "");
        if (cleaned) {
          numericPrice = Number(cleaned);
        }
      }
      let dateStr = b.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      if (b.timestamp) {
        try {
          dateStr = b.timestamp.split("T")[0];
        } catch (e) {
        }
      }
      return {
        id: b.id,
        code: b.motorcycleId || "MOTO-GEN",
        name: b.motorcycleName,
        type: lang === "ar" ? "دراجة نارية" : "Motorcycle",
        customerName: b.name || "Anonymous",
        customerPhone: b.phone || "-",
        quantity: 1,
        unitPrice: numericPrice,
        totalPrice: numericPrice,
        date: dateStr
      };
    });
    const allSales = [...parsedRealBookings];
    const now = new Date(2026, 5, 4);
    const filteredSales = allSales.filter((sale) => {
      const saleDate = new Date(sale.date);
      if (isNaN(saleDate.getTime())) return true;
      const diffTime = now.getTime() - saleDate.getTime();
      const diffDays = diffTime / (1e3 * 60 * 60 * 24);
      if (exportRangeType === "today") {
        return saleDate.toDateString() === now.toDateString();
      }
      if (exportRangeType === "week") {
        return diffDays >= 0 && diffDays <= 7;
      }
      if (exportRangeType === "month") {
        return diffDays >= 0 && diffDays <= 30;
      }
      if (exportRangeType === "3months") {
        return diffDays >= 0 && diffDays <= 90;
      }
      if (exportRangeType === "6months") {
        return diffDays >= 0 && diffDays <= 180;
      }
      if (exportRangeType === "year") {
        return diffDays >= 0 && diffDays <= 365;
      }
      if (exportRangeType === "custom") {
        const start = new Date(exportStartDate).getTime();
        const end = new Date(exportEndDate).getTime();
        const saleTime = saleDate.getTime();
        return saleTime >= start && saleTime <= end;
      }
      return true;
    });
    if (filteredSales.length === 0) {
      fireToast(
        lang === "ar" ? "لا توجد مبيعات أو حجوزات متوفرة في النطاق المحدد!" : "No sales or booking entries exist in this duration",
        "error"
      );
      return;
    }
    const xlsData = filteredSales.map((sale, index) => {
      if (lang === "ar") {
        return {
          "م": index + 1,
          "كود السلعة/الخدمة": sale.code,
          "الاسم / الموديل": sale.name,
          "التصنيف": sale.type,
          "اسم العميل": sale.customerName,
          "رقم الهاتف": sale.customerPhone,
          "الكمية المباعة": sale.quantity,
          "سعر الوحدة (ج.م)": sale.unitPrice,
          "الإجمالي كلي (ج.م)": sale.totalPrice,
          "تاريخ الاستحقاق/تاريخ البيع": sale.date
        };
      } else {
        return {
          "No": index + 1,
          "Item Code": sale.code,
          "Name / Model": sale.name,
          "Category Type": sale.type,
          "Customer Name": sale.customerName,
          "Phone Reference": sale.customerPhone,
          "Quantity": sale.quantity,
          "Unit Price (EGP)": sale.unitPrice,
          "Aggregate Total (EGP)": sale.totalPrice,
          "Transaction Date": sale.date
        };
      }
    });
    const worksheet = XLSX.utils.json_to_sheet(xlsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, lang === "ar" ? "سجل الأرباح والمبيعات" : "Sales Journal");
    XLSX.writeFile(workbook, `ElKholy_Motors_Sales_Report_2026.xlsx`);
    fireToast(
      lang === "ar" ? `تم تجميع وتصدير التقرير بنجاح! (${filteredSales.length} حركة بيع/حجز)` : `Successfully exported report containing ${filteredSales.length} transactions.`,
      "success"
    );
  };
  const handleDownloadBackup = async () => {
    try {
      const zip = new JSZip();
      zip.file("motorcycles_backup.json", JSON.stringify(motorcycles, null, 2));
      zip.file("store_products_backup.json", JSON.stringify(storeProducts || [], null, 2));
      zip.file("custom_text_backup.json", JSON.stringify(customText || {}, null, 2));
      zip.file("homepage_config_backup.json", JSON.stringify(builderConfig || DEFAULT_HOMEPAGE_CONFIG, null, 2));
      zip.file("bookings_backup.json", JSON.stringify(bookings || [], null, 2));
      zip.file("users_backup.json", JSON.stringify(users || [], null, 2));
      zip.file("README_BACKUP.txt", `ELKHOLY MOTORS COMPLETE SYSTEM BACKUP
Generated: ${(/* @__PURE__ */ new Date()).toLocaleString()}
Timestamp: ${(/* @__PURE__ */ new Date()).toISOString()}

This ZIP file contains complete system files and database configurations (Motorcycles, Store products, Customize layouts, reservations, and admin accounts). 
Do NOT edit or rename the json files inside this archive to ensure flawless synchronization when restoring in the future.`);
      const content = await zip.generateAsync({ type: "blob" });
      const dlURL = window.URL.createObjectURL(content);
      const tempLink = document.createElement("a");
      tempLink.href = dlURL;
      tempLink.download = `elkholy_site_backup_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(dlURL);
      fireToast(
        lang === "ar" ? "تم إنشاء نسخة احتياطية كاملة للموقع وتحميلها كملف مضغوط بنجاح! 📦" : "Complete site backup generated and downloaded successfully! 📦",
        "success"
      );
    } catch (err) {
      console.error("Backup generation failed:", err);
      fireToast(
        lang === "ar" ? "فشل إنشاء ملف النسخة الاحتياطية!" : "Failed to generate archive backup!",
        "error"
      );
    }
  };
  const handleRestoreBackup = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (sessionUser?.role !== "Admin") {
      fireToast(
        lang === "ar" ? "عذراً! الصلاحية غير كافية لعمل استعادة للموقع." : "Privilege Breach: Only Master Administrators can restore backup archives",
        "error"
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const buffer = evt.target?.result;
        const zip = await JSZip.loadAsync(buffer);
        let restoredCount = 0;
        const bikesFile = zip.file("motorcycles_backup.json");
        if (bikesFile) {
          const content = await bikesFile.async("string");
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            onUpdateMotorcycles(parsed);
            restoredCount++;
          }
        }
        const productsFile = zip.file("store_products_backup.json");
        if (productsFile && onUpdateStoreProducts) {
          const content = await productsFile.async("string");
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            onUpdateStoreProducts(parsed);
            restoredCount++;
          }
        }
        const textFile = zip.file("custom_text_backup.json");
        if (textFile) {
          const content = await textFile.async("string");
          const parsed = JSON.parse(content);
          onUpdateCustomText(parsed);
          restoredCount++;
        }
        const configFile = zip.file("homepage_config_backup.json");
        if (configFile) {
          const content = await configFile.async("string");
          const parsed = JSON.parse(content);
          setBuilderConfig(parsed);
          onUpdateHomepageConfig(parsed);
          restoredCount++;
        }
        const bookingsFile = zip.file("bookings_backup.json");
        if (bookingsFile) {
          const content = await bookingsFile.async("string");
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            setBookings(parsed);
            localStorage.setItem("elkholy_bookings", JSON.stringify(parsed));
            restoredCount++;
            try {
              for (const b of parsed) {
                await setDoc(doc(db, "bookings", b.id), b);
              }
            } catch (e2) {
              console.warn("Unable to sync restored bookings to Firestore:", e2);
            }
          }
        }
        const usersFile = zip.file("users_backup.json");
        if (usersFile) {
          const content = await usersFile.async("string");
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            setUsers(parsed);
            localStorage.setItem("elkholy_users", JSON.stringify(parsed));
            restoredCount++;
          }
        }
        if (restoredCount > 0) {
          fireToast(
            lang === "ar" ? "تمت استعادة النسخة الاحتياطية وتطبيقها على خوادم الموقع بنجاح! 🚀🔄" : "Restore sequence successful! All databases updated in real-time. 🚀🔄",
            "success"
          );
        } else {
          fireToast(
            lang === "ar" ? "لم يتم العثور على ملفات احتياطية صالحة داخل الأرشيف المضغوط!" : "Selected ZIP does not contain compliant ElKholy JSON database backups!",
            "error"
          );
        }
        e.target.value = "";
      } catch (err) {
        console.error("Restore failed:", err);
        fireToast(
          lang === "ar" ? "خطأ غير متوقع أثناء استخراج النسخة الاحتياطية!" : "Unrecognized structure! Unzip operation terminated unexpectedly.",
          "error"
        );
      }
    };
    reader.readAsArrayBuffer(file);
  };
  const generateUnifiedBackupData = () => {
    return {
      type: "elkholy_backup_json",
      version: "1.0",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      motorcycles: motorcycles || [],
      storeProducts: storeProducts || [],
      customText: customText || {},
      homepageConfig: builderConfig || DEFAULT_HOMEPAGE_CONFIG,
      bookings: bookings || [],
      users: users || []
    };
  };
  const applyUnifiedBackupData = (data) => {
    if (!data || data.type !== "elkholy_backup_json") {
      throw new Error("Invalid backup format");
    }
    let restoredCount = 0;
    if (Array.isArray(data.motorcycles)) {
      onUpdateMotorcycles(data.motorcycles);
      restoredCount++;
    }
    if (Array.isArray(data.storeProducts) && onUpdateStoreProducts) {
      onUpdateStoreProducts(data.storeProducts);
      restoredCount++;
    }
    if (data.customText) {
      onUpdateCustomText(data.customText);
      restoredCount++;
    }
    if (data.homepageConfig) {
      setBuilderConfig(data.homepageConfig);
      onUpdateHomepageConfig(data.homepageConfig);
      restoredCount++;
    }
    if (Array.isArray(data.bookings)) {
      setBookings(data.bookings);
      localStorage.setItem("elkholy_bookings", JSON.stringify(data.bookings));
      restoredCount++;
      try {
        data.bookings.forEach((b) => {
          setDoc(doc(db, "bookings", b.id), b).catch((err) => console.warn("Sync failed for booking", b.id));
        });
      } catch (err) {
        console.warn("Unable to sync restored bookings to Firestore:", err);
      }
    }
    if (Array.isArray(data.users)) {
      setUsers(data.users);
      localStorage.setItem("elkholy_users", JSON.stringify(data.users));
      restoredCount++;
    }
    return restoredCount;
  };
  const handleExportToGitHub = async () => {
    if (!githubToken.trim()) {
      fireToast(
        lang === "ar" ? "يرجى إدخال رمز الوصول الشخصي (Token) لحساب GitHub" : "Please provide a GitHub Personal Access Token",
        "error"
      );
      return;
    }
    if (!githubRepo.trim() || !githubRepo.includes("/")) {
      fireToast(
        lang === "ar" ? "يرجى إدخال مسار المستودع بالشكل الصحيح (username/repo)" : "Invalid repository path. Use format: username/repo-name",
        "error"
      );
      return;
    }
    setIsGithubExporting(true);
    try {
      const backupData = generateUnifiedBackupData();
      const contentString = JSON.stringify(backupData, null, 2);
      const contentBase64 = btoa(unescape(encodeURIComponent(contentString)));
      const cleanRepo = githubRepo.trim();
      const cleanBranch = githubBranch.trim() || "main";
      const cleanPath = githubPath.trim() || "elkholy_backup.json";
      let fileSha = null;
      try {
        const checkRes = await fetch(
          `https://api.github.com/repos/${cleanRepo}/contents/${cleanPath}?ref=${cleanBranch}`,
          {
            headers: {
              "Authorization": `token ${githubToken.trim()}`,
              "Accept": "application/vnd.github.v3+json"
            }
          }
        );
        if (checkRes.ok) {
          const checkData = await checkRes.json();
          fileSha = checkData.sha;
        }
      } catch (err) {
        console.log("File does not exist yet or error getting SHA, proceeding without SHA:", err);
      }
      const putBody = {
        message: `ElKholy Motors automatic system backup - ${(/* @__PURE__ */ new Date()).toISOString()}`,
        content: contentBase64,
        branch: cleanBranch
      };
      if (fileSha) {
        putBody.sha = fileSha;
      }
      const putRes = await fetch(
        `https://api.github.com/repos/${cleanRepo}/contents/${cleanPath}`,
        {
          method: "PUT",
          headers: {
            "Authorization": `token ${githubToken.trim()}`,
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(putBody)
        }
      );
      if (putRes.ok) {
        localStorage.setItem("elkholy_github_token", githubToken.trim());
        localStorage.setItem("elkholy_github_repo", cleanRepo);
        localStorage.setItem("elkholy_github_branch", cleanBranch);
        localStorage.setItem("elkholy_github_path", cleanPath);
        fireToast(
          lang === "ar" ? "تم تصدير النسخة الاحتياطية بنجاح إلى مستودع GitHub! 🚀📂" : "Operational catalog data pushed successfully to GitHub repository! 🚀📂",
          "success"
        );
      } else {
        const errJson = await putRes.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(errJson.message || `HTTP ${putRes.status}`);
      }
    } catch (err) {
      console.error("GitHub Export Failed:", err);
      fireToast(
        lang === "ar" ? `عذراً، فشل التصدير لـ GitHub: ${err.message || "تأكد من الرمز وصحة المستودع"}` : `GitHub connection termination: ${err.message || "Invalid PAT/Repo Permissions"}`,
        "error"
      );
    } finally {
      setIsGithubExporting(false);
    }
  };
  const handleImportByUrl = async () => {
    if (!githubImportUrl.trim()) {
      fireToast(
        lang === "ar" ? "يرجى إدخال رابط ملف النسخة الاحتياطية المباشر" : "Please provide a valid direct backup URL",
        "error"
      );
      return;
    }
    if (sessionUser?.role !== "Admin") {
      fireToast(
        lang === "ar" ? "عذراً! الصلاحية غير كافية لعمل استعادة للموقع." : "Privilege Breach: Only Master Administrators can restore backup archives",
        "error"
      );
      return;
    }
    setIsGithubImporting(true);
    try {
      let resolvedUrl = githubImportUrl.trim();
      if (resolvedUrl.includes("github.com") && !resolvedUrl.includes("raw.githubusercontent.com") && resolvedUrl.includes("/blob/")) {
        resolvedUrl = resolvedUrl.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
      }
      const res = await fetch(resolvedUrl);
      if (!res.ok) {
        throw new Error(`Failed to fetch file (HTTP ${res.status})`);
      }
      const backupData = await res.json();
      const count = applyUnifiedBackupData(backupData);
      if (count > 0) {
        fireToast(
          lang === "ar" ? "تم جلب واستعادة البيانات من الرابط بنجاح! 🚀🔄" : "Data imported and system modules synchronized from remote URL! 🚀🔄",
          "success"
        );
        setGithubImportUrl("");
      } else {
        throw new Error("No compatible tables restored");
      }
    } catch (err) {
      console.error("Remote Import Failed:", err);
      fireToast(
        lang === "ar" ? `عذراً، فشل جلب البيانات: ${err.message || "تأكد من صلاحية الرابط وملف الـ JSON"}` : `Import failed: ${err.message || "Ensure URL points to a public, valid backup JSON"}`,
        "error"
      );
    } finally {
      setIsGithubImporting(false);
    }
  };
  const handlePushEntireProjectToGitHub = async () => {
    if (!githubToken.trim()) {
      fireToast(
        lang === "ar" ? "يرجى إدخال رمز الوصول الشخصي (Token) لحساب GitHub" : "Please provide a GitHub Personal Access Token",
        "error"
      );
      return;
    }
    if (!githubRepo.trim() || !githubRepo.includes("/")) {
      fireToast(
        lang === "ar" ? "يرجى إدخال مسار المستودع بالشكل الصحيح (username/repo)" : "Invalid repository path. Use format: username/repo-name",
        "error"
      );
      return;
    }
    setIsPushingProject(true);
    setProjectPushStep(lang === "ar" ? "البدء وتجهيز الحزم..." : "Initializing package data...");
    const headers = {
      "Authorization": `token ${githubToken.trim()}`,
      "Accept": "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    };
    const cleanRepo = githubRepo.trim();
    const cleanBranch = githubBranch.trim() || "main";
    try {
      setProjectPushStep(lang === "ar" ? "جاري الاتصال بـ GitHub وجلب آخر التزام..." : "Connecting to GitHub & fetching target ref...");
      const refRes = await fetch(`https://api.github.com/repos/${cleanRepo}/git/ref/heads/${cleanBranch}`, { headers });
      let parentCommitSha = "";
      let baseTreeSha = "";
      let hasExistingBranch = refRes.ok;
      if (hasExistingBranch) {
        const refData = await refRes.json();
        parentCommitSha = refData.object.sha;
        const commitRes = await fetch(`https://api.github.com/repos/${cleanRepo}/git/commits/${parentCommitSha}`, { headers });
        if (commitRes.ok) {
          const commitData = await commitRes.json();
          baseTreeSha = commitData.tree.sha;
        }
      }
      const filesToUpload = [
        "package.json",
        "tsconfig.json",
        "vite.config.ts",
        "index.html",
        ".gitignore",
        ".env.example",
        "src/main.tsx",
        "src/App.tsx",
        "src/index.css",
        "src/types.ts",
        "src/translations.ts",
        "src/data.ts",
        "src/dataStoreMock.ts",
        "src/vite-env.d.ts",
        "src/context/LanguageContext.tsx",
        "src/lib/firebase.ts",
        "src/components/AdminPanel.tsx",
        "src/components/BookingModal.tsx",
        "src/components/CartDrawer.tsx",
        "src/components/ContactFooter.tsx",
        "src/components/FilterSection.tsx",
        "src/components/HomepagePageBuilder.tsx",
        "src/components/MotorcycleCard.tsx",
        "src/components/Navbar.tsx",
        "src/components/PdfModal.tsx",
        "src/components/StoreAdminPanel.tsx",
        "src/components/StoreProductCard.tsx",
        "src/components/StoreView.tsx"
      ];
      const binaryImages = [
        "src/assets/images/elkholy_adventure_bike_1780394016498.png",
        "src/assets/images/elkholy_cruiser_bike_1780393998079.png",
        "src/assets/images/elkholy_hero_banner_1780393961041.png",
        "src/assets/images/elkholy_scooter_1780394036022.png",
        "src/assets/images/elkholy_sport_bike_1780393979815.png"
      ];
      const treeItems = [];
      for (let i = 0; i < filesToUpload.length; i++) {
        const path = filesToUpload[i];
        setProjectPushStep(
          lang === "ar" ? `جاري تحضير الملف النصي (${i + 1}/${filesToUpload.length}): ${path}` : `Preparing source file (${i + 1}/${filesToUpload.length}): ${path}`
        );
        try {
          const fileRes = await fetch("/" + path);
          if (!fileRes.ok) throw new Error(`Could not fetch ${path}`);
          const content = await fileRes.text();
          treeItems.push({
            path,
            mode: "100644",
            type: "blob",
            content
          });
        } catch (err) {
          console.warn(`File fallback active or failed to load: ${path}`, err);
        }
      }
      for (let i = 0; i < binaryImages.length; i++) {
        const imgPath = binaryImages[i];
        setProjectPushStep(
          lang === "ar" ? `جاري رفع صورة المعرض الثنائية (${i + 1}/${binaryImages.length}): ${imgPath.split("/").pop()}` : `Uploading assets node (${i + 1}/${binaryImages.length}): ${imgPath.split("/").pop()}`
        );
        try {
          const imgRes = await fetch("/" + imgPath);
          if (!imgRes.ok) throw new Error(`Image fetch failed: ${imgPath}`);
          const blob = await imgRes.blob();
          const sha = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = async () => {
              const base64str = reader.result.split(",")[1];
              try {
                const blobRes = await fetch(`https://api.github.com/repos/${cleanRepo}/git/blobs`, {
                  method: "POST",
                  headers,
                  body: JSON.stringify({
                    content: base64str,
                    encoding: "base64"
                  })
                });
                if (!blobRes.ok) {
                  const errorText = await blobRes.text();
                  throw new Error(`Blob creation failed: ${errorText}`);
                }
                const blobData = await blobRes.json();
                resolve(blobData.sha);
              } catch (e) {
                reject(e);
              }
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
          treeItems.push({
            path: imgPath,
            mode: "100644",
            type: "blob",
            sha
          });
        } catch (err) {
          console.warn(`Binary upload failed or skipped for: ${imgPath}`, err);
        }
      }
      setProjectPushStep(lang === "ar" ? "جاري بناء خريطة مستودع GitHub..." : "Deploying new files tree map on GitHub...");
      const treeBody = {
        tree: treeItems
      };
      if (baseTreeSha) {
        treeBody.base_tree = baseTreeSha;
      }
      const treePostRes = await fetch(`https://api.github.com/repos/${cleanRepo}/git/trees`, {
        method: "POST",
        headers,
        body: JSON.stringify(treeBody)
      });
      if (!treePostRes.ok) {
        const errJson = await treePostRes.json().catch(() => ({ message: "Tree creation failed" }));
        throw new Error(errJson.message || "Failed to craft repository map tree");
      }
      const treePostData = await treePostRes.json();
      const newTreeSha = treePostData.sha;
      setProjectPushStep(lang === "ar" ? "جاري تسجيل التزام الكود (Commit)..." : "Committing codebase modifications...");
      const commitBody = {
        message: `Automatic live backup deploy - Vercel compatible - ${(/* @__PURE__ */ new Date()).toLocaleString()}`,
        tree: newTreeSha
      };
      if (parentCommitSha) {
        commitBody.parents = [parentCommitSha];
      }
      const commitPostRes = await fetch(`https://api.github.com/repos/${cleanRepo}/git/commits`, {
        method: "POST",
        headers,
        body: JSON.stringify(commitBody)
      });
      if (!commitPostRes.ok) {
        const errJson = await commitPostRes.json().catch(() => ({ message: "Commit creation failed" }));
        throw new Error(errJson.message || "Failed to create Git commit node");
      }
      const commitPostData = await commitPostRes.json();
      const newCommitSha = commitPostData.sha;
      setProjectPushStep(lang === "ar" ? "جاري تحديث فرع المستودع الرئيسي..." : "Updating GitHub branch reference HEAD...");
      let refUpdateRes;
      if (hasExistingBranch) {
        refUpdateRes = await fetch(`https://api.github.com/repos/${cleanRepo}/git/refs/heads/${cleanBranch}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            sha: newCommitSha,
            force: true
          })
        });
      } else {
        refUpdateRes = await fetch(`https://api.github.com/repos/${cleanRepo}/git/refs`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            ref: `refs/heads/${cleanBranch}`,
            sha: newCommitSha
          })
        });
      }
      if (refUpdateRes.ok) {
        localStorage.setItem("elkholy_github_token", githubToken.trim());
        localStorage.setItem("elkholy_github_repo", cleanRepo);
        localStorage.setItem("elkholy_github_branch", cleanBranch);
        fireToast(
          lang === "ar" ? "تم رفع كامل كود المصدر والمشروع إلى GitHub بنجاح! جاهز للربط في Vercel 🚀💻" : "Fabulous! Entire React project uploaded to GitHub. Ready for instant Vercel link! 🚀💻",
          "success"
        );
      } else {
        const errJson = await refUpdateRes.json().catch(() => ({ message: "Reference update failed" }));
        throw new Error(errJson.message || "Failed to update branch reference HEAD");
      }
    } catch (err) {
      console.error("Codebase Push Failed:", err);
      fireToast(
        lang === "ar" ? `عذراً، فشل رفع الكود لـ GitHub: ${err.message || "يرجى مراجعة الرمز وصلاحيات التوكين"}` : `Project push ended with error: ${err.message || "Check PAT permissions / Repository format"}`,
        "error"
      );
    } finally {
      setIsPushingProject(false);
      setProjectPushStep("");
    }
  };
  function scoreRoleLabel(role) {
    if (lang === "ar") {
      if (role === "Admin") return "مشرف رئيسي";
      if (role === "Manager") return "مدير أسطول";
      return "فريق عمل منسق";
    }
    return role;
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-md overflow-hidden admin-panel-root", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "fixed top-5 right-5 z-80 space-y-2 max-w-sm pointer-events-none", children: /* @__PURE__ */ jsxDEV(AnimatePresence, { children: toasts.map((t2) => /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { scale: 0.9, opacity: 0, y: -20 },
        animate: { scale: 1, opacity: 1, y: 0 },
        exit: { scale: 0.9, opacity: 0, x: 50 },
        className: `p-3.5 rounded-xl border flex items-center gap-2.5 shadow-xl backdrop-blur-md pointer-events-auto ${t2.type === "success" ? "bg-green-950/80 border-green-500/40 text-green-400" : t2.type === "error" ? "bg-red-950/80 border-red-500/40 text-red-400" : "bg-indigo-950/80 border-indigo-500/40 text-indigo-400"}`,
        children: [
          /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 shrink-0" }, void 0, false, {
            fileName: "/app/applet/src/components/AdminPanel.tsx",
            lineNumber: 1611,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-medium", children: t2.text }, void 0, false, {
            fileName: "/app/applet/src/components/AdminPanel.tsx",
            lineNumber: 1612,
            columnNumber: 15
          }, this)
        ]
      },
      t2.id,
      true,
      {
        fileName: "/app/applet/src/components/AdminPanel.tsx",
        lineNumber: 1598,
        columnNumber: 13
      },
      this
    )) }, void 0, false, {
      fileName: "/app/applet/src/components/AdminPanel.tsx",
      lineNumber: 1596,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/AdminPanel.tsx",
      lineNumber: 1595,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { scale: 0.97, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.97, opacity: 0 },
        className: "w-full max-w-6xl h-[94vh] glass-panel border border-[#6366F1]/30 rounded-3xl overflow-hidden flex flex-col relative shadow-2xl box-glow-indigo text-white uppercase",
        dir,
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary z-20" }, void 0, false, {
            fileName: "/app/applet/src/components/AdminPanel.tsx",
            lineNumber: 1627,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/[0.08] p-4 bg-[#0B0F1A]/90 z-10", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-brand-primary/10 border border-brand-primary/30", children: /* @__PURE__ */ jsxDEV(Database, { className: "w-5 h-5 text-[#22D3EE] animate-pulse" }, void 0, false, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1633,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1632,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir, children: [
                /* @__PURE__ */ jsxDEV("h2", { className: "text-sm sm:text-base font-extrabold tracking-widest font-mono", children: t("admin_title") }, void 0, false, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1636,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 mt-0.5", dir: "ltr", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" }, void 0, false, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1640,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-gray-500 font-mono tracking-widest", children: sessionUser ? `ACTIVE NODE: ${sessionUser.username} | ${sessionUser.role.toUpperCase()}` : "SECURE GPRS SHELL TERMINAL | OFFLINE" }, void 0, false, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1641,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1639,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1635,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AdminPanel.tsx",
              lineNumber: 1631,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              sessionUser && /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleLogout,
                  className: "px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-[9px] rounded-lg transition-all flex items-center gap-1.5 hover:scale-[1.03]",
                  children: [
                    /* @__PURE__ */ jsxDEV(LogOut, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1654,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "فصل المشترك" : "DISCONNECT" }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1655,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1650,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: onClose,
                  className: "p-1.5 rounded-lg border border-white/5 bg-white/[0.03] text-gray-400 hover:text-white transition-colors cursor-pointer",
                  children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1663,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1659,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AdminPanel.tsx",
              lineNumber: 1648,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AdminPanel.tsx",
            lineNumber: 1630,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-hidden flex flex-col md:flex-row bg-[#080B13]/95", children: !sessionUser ? /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col items-center justify-center p-6 text-center max-w-sm mx-auto space-y-6", dir, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  animate: { rotate: [0, -5, 5, 0] },
                  transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
                  className: "w-14 h-14 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30 flex items-center justify-center mx-auto text-brand-accent shadow-lg shadow-brand-accent/5",
                  children: /* @__PURE__ */ jsxDEV(Lock, { className: "w-6 h-6" }, void 0, false, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1681,
                    columnNumber: 19
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1676,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold font-mono tracking-wider", children: lang === "ar" ? "بوابة التحقق المشفرة" : "OPERATOR IDENTITY PORTAL" }, void 0, false, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1684,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500 normal-case leading-normal font-sans", children: lang === "ar" ? "الوصول محدود للأعضاء المصرح لهم فقط. يرجى تزويد رمز الدخول لإعطاء التفويض." : "Access is limited to verified personnel only. Enter your credentials to initialize GPRS link." }, void 0, false, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1687,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "p-3 border border-indigo-500/20 bg-indigo-950/20 rounded-xl text-[10px] font-mono text-gray-400 leading-normal text-left capitalize font-semibold tracking-wide", children: [
                "⚡ ",
                lang === "ar" ? "أعضاء الأوتوماتيكي الافتراضيون:" : "Default Demo Node:",
                /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1695,
                  columnNumber: 95
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent", children: "HOSNY1995" }, void 0, false, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1696,
                  columnNumber: 19
                }, this),
                " | Code: ",
                /* @__PURE__ */ jsxDEV("span", { className: "text-brand-primary", children: "Hhrm0101995ELelkholy" }, void 0, false, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1696,
                  columnNumber: 80
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1694,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AdminPanel.tsx",
              lineNumber: 1675,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("form", { onSubmit: handleLoginSubmit, className: "w-full space-y-3.5 text-left font-mono text-xs max-w-[320px]", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 tracking-wider text-[10px]", children: [
                  lang === "ar" ? "اسم المستخدم للمشغل" : "OPERATOR ACCOUNT NAME",
                  ":"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1702,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    required: true,
                    value: usernameInput,
                    onChange: (e) => setUsernameInput(e.target.value),
                    placeholder: lang === "ar" ? "أدخل اسم المستخدم" : "Enter Username Identity",
                    className: "w-full bg-black/60 border border-white/[0.08] focus:border-indigo-400 text-white rounded-xl px-4 py-2.5 focus:outline-none"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1703,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1701,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 tracking-wider text-[10px]", children: [
                  lang === "ar" ? "كلمة المرور" : "ACCESS CODE KEY",
                  ":"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1714,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "relative flex items-center", children: [
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: showPassword ? "text" : "password",
                      required: true,
                      value: passwordInput,
                      onChange: (e) => setPasswordInput(e.target.value),
                      placeholder: "••••••••••••",
                      className: "w-full bg-black/60 border border-white/[0.08] focus:border-indigo-400 text-white rounded-xl px-4 py-2.5 focus:outline-none pr-10"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1716,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowPassword(!showPassword),
                      className: "absolute right-3.5 text-gray-500 hover:text-white",
                      children: showPassword ? /* @__PURE__ */ jsxDEV(EyeOff, { className: "w-4 h-4" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1729,
                        columnNumber: 39
                      }, this) : /* @__PURE__ */ jsxDEV(Eye, { className: "w-4 h-4" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1729,
                        columnNumber: 72
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1724,
                      columnNumber: 21
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1715,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1713,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  type: "submit",
                  className: "w-full py-2.5 bg-gradient-to-r from-brand-primary to-brand-accent text-[#0B0F1A] font-black tracking-widest rounded-xl hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5 text-[11px]",
                  children: [
                    /* @__PURE__ */ jsxDEV(Key, { className: "w-4 h-4" }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1738,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تسجيل دخول المحطة" : "INITIALIZE LINK" }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1739,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1734,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AdminPanel.tsx",
              lineNumber: 1700,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AdminPanel.tsx",
            lineNumber: 1673,
            columnNumber: 13
          }, this) : (
            // ===================== VIEW B: LOGGED IN WORKSTATION =====================
            /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col md:flex-row overflow-hidden relative z-10 h-full", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-full md:w-56 bg-black/30 border-b md:border-b-0 md:border-r border-white/[0.05] flex md:flex-col gap-1.5 p-3 shrink-0", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "hidden md:block text-[9px] text-gray-500 font-mono tracking-widest uppercase mb-2 p-1.5", children: lang === "ar" ? "أقسام الواجهة" : "WORKSPACE TERMINALS" }, void 0, false, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1751,
                  columnNumber: 17
                }, this),
                canAccess("dashboard") && /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setActiveTab("dashboard"),
                    className: `flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 px-4 py-2 rounded-xl font-mono text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${activeTab === "dashboard" ? "bg-gradient-to-r from-brand-primary/15 to-transparent border border-brand-primary/35 text-white shadow-md" : "text-gray-400 hover:text-white hover:bg-white/[0.01]"}`,
                    children: [
                      /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4 text-[#22D3EE]" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1765,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "لوحة القيادة" : "DASHBOARD" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1766,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1757,
                    columnNumber: 19
                  },
                  this
                ),
                canAccess("motorcycles") && /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setActiveTab("motorcycles"),
                    className: `flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 px-4 py-2 rounded-xl font-mono text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${activeTab === "motorcycles" ? "bg-gradient-to-r from-brand-primary/15 to-transparent border border-brand-primary/35 text-white shadow-md" : "text-gray-400 hover:text-white hover:bg-white/[0.01]"}`,
                    children: [
                      /* @__PURE__ */ jsxDEV(Database, { className: "w-4 h-4 text-brand-accent" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1780,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "أسطول الدراجات" : "MOTORCYCLES" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1781,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1772,
                    columnNumber: 19
                  },
                  this
                ),
                canAccess("store") && /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setActiveTab("store"),
                    className: `flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 px-4 py-2 rounded-xl font-mono text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${activeTab === "store" ? "bg-gradient-to-r from-brand-primary/15 to-transparent border border-brand-primary/35 text-white shadow-md" : "text-gray-400 hover:text-white hover:bg-white/[0.01]"}`,
                    children: [
                      /* @__PURE__ */ jsxDEV(Database, { className: "w-4 h-4 text-green-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1795,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "المتجر الإلكتروني" : "STORE" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1796,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1787,
                    columnNumber: 19
                  },
                  this
                ),
                canAccess("users") && /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setActiveTab("users"),
                    className: `flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 px-4 py-2 rounded-xl font-mono text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${activeTab === "users" ? "bg-gradient-to-r from-brand-primary/15 to-transparent border border-brand-primary/35 text-white shadow-md" : "text-gray-400 hover:text-white hover:bg-white/[0.01]"}`,
                    children: [
                      /* @__PURE__ */ jsxDEV(Users, { className: "w-4 h-4 text-brand-secondary" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1810,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "المشرفون والأسماء" : "USERS LIST" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1811,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1802,
                    columnNumber: 19
                  },
                  this
                ),
                canAccess("settings") && /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setActiveTab("settings"),
                    className: `flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 px-4 py-2 rounded-xl font-mono text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${activeTab === "settings" ? "bg-gradient-to-r from-brand-primary/15 to-transparent border border-brand-primary/35 text-white shadow-md" : "text-gray-400 hover:text-white hover:bg-white/[0.01]"}`,
                    children: [
                      /* @__PURE__ */ jsxDEV(Settings, { className: "w-4 h-4 text-white" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1825,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "إعدادات المعرض" : "SETTINGS" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1826,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1817,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1750,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-4 sm:p-5 text-left relative z-10", children: [
                activeTab === "dashboard" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-5 animate-fade-in", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "border-b border-white/5 pb-3", children: [
                    /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold tracking-widest font-mono", children: lang === "ar" ? "بيانات أداء المعرض" : "HQ COMMAND AND ANALYTICS" }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1838,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-gray-500 normal-case leading-normal font-sans", children: lang === "ar" ? "معلومات عامة متكاملة ومؤشرات أداء المعرض والزوار." : "Real-time telemetry oversight of booking nodes, brand capital flow, and operator statistics." }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1841,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1837,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-3.5", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-brand-accent/20 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "قيمة الأسطول" : "BRAND ASSETS" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1851,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(Coins, { className: "w-4 h-4 text-brand-accent" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1852,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1850,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: [
                          "$",
                          fleetValue.toLocaleString()
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1855,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-green-400 font-sans tracking-widest leading-none", children: "⚡ MILLION VALUE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1856,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1854,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1849,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-brand-primary/20 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "مركبات المعرض" : "FLEET MACHINES" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1863,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(Database, { className: "w-4 h-4 text-brand-primary" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1864,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1862,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: motorcycles.length }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1867,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-brand-accent font-sans tracking-widest leading-none", children: "● ACTIVE BIKES" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1868,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1866,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1861,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-brand-secondary/20 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "المشرفون" : "CURATORS" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1875,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(Users, { className: "w-4 h-4 text-brand-secondary" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1876,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1874,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: users.length }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1879,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-gray-400 font-sans tracking-widest leading-none", children: "👤 CODES/KEYS" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1880,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1878,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1873,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-white/10 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "الحجوزات المعلقة" : "RESERVATIONS" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1887,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(MessageSquare, { className: "w-4 h-4 text-red-500 animate-pulse" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1888,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1886,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: bookings.length }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1891,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-red-400 font-mono tracking-widest leading-none", children: "📱 WHATSAPP" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1892,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1890,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1885,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-indigo-500/15 flex flex-col justify-between hover:border-indigo-400/20 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "مبيعات الموتوسيكلات" : "MOTORS REVENUE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1899,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(TrendingUp, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1900,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1898,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: [
                          motorsTotalSalesValue.toLocaleString(),
                          " ",
                          lang === "ar" ? "ج.م" : "EGP"
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1903,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-indigo-400 font-mono tracking-widest leading-none", children: "🏍️ SALES VALUE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1904,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1902,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1897,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-indigo-500/15 flex flex-col justify-between hover:border-indigo-400/25 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "الدراجات المباعة" : "BIKES SOLD" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1911,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-indigo-300" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1912,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1910,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: motorsTotalSoldCount }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1915,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-indigo-300 font-mono tracking-widest leading-none", children: "🏁 SOLD UNITS" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1916,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1914,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1909,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-emerald-500/20 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "مبيعات المتجر" : "STORE SALES" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1923,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1924,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1922,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: [
                          storeTotalRevenue.toLocaleString(),
                          " ",
                          lang === "ar" ? "ج.م" : "EGP"
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1927,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-emerald-400 font-mono tracking-widest leading-none", children: "🛒 REVENUE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1928,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1926,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1921,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-cyan-500/20 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "القطع المباعة" : "ITEMS SOLD" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1935,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(Package, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1936,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1934,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: storeTotalItemsSold.toLocaleString() }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1939,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-cyan-400 font-mono tracking-widest leading-none", children: "📦 PIECES" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1940,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1938,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1933,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1847,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-4.5 rounded-2xl bg-[#0F1422]/70 border border-indigo-500/10 space-y-3.5", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/5 pb-2", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold tracking-wider", children: lang === "ar" ? "نسب توزيع المركبات عبر الفئات" : "VEHICLE CLASS DISTRIBUTION" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1948,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-[#22D3EE] font-mono", children: "CALIBRATION CAP: 100%" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1949,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1947,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[9px] font-mono text-gray-400 mb-1 leading-none", children: [
                          /* @__PURE__ */ jsxDEV("span", { children: "SPORT CLASS A" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 1957,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white", children: [
                            catA_Count,
                            " (",
                            Math.round(catA_Count / (motorcycles.length || 1) * 100),
                            "%)"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 1958,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1956,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1.5 bg-black/60 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV(
                          motion.div,
                          {
                            initial: { width: 0 },
                            animate: { width: `${catA_Count / (motorcycles.length || 1) * 100}%` },
                            transition: { duration: 1.2 },
                            className: "h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 1961,
                            columnNumber: 29
                          },
                          this
                        ) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1960,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1955,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[9px] font-mono text-gray-400 mb-1 leading-none", children: [
                          /* @__PURE__ */ jsxDEV("span", { children: "CRUISER CLASS B" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 1973,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white", children: [
                            catB_Count,
                            " (",
                            Math.round(catB_Count / (motorcycles.length || 1) * 100),
                            "%)"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 1974,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1972,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1.5 bg-black/60 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV(
                          motion.div,
                          {
                            initial: { width: 0 },
                            animate: { width: `${catB_Count / (motorcycles.length || 1) * 100}%` },
                            transition: { duration: 1.2 },
                            className: "h-full rounded-full bg-gradient-to-r from-brand-secondary to-[#A855F7]"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 1977,
                            columnNumber: 29
                          },
                          this
                        ) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1976,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1971,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[9px] font-mono text-gray-400 mb-1 leading-none", children: [
                          /* @__PURE__ */ jsxDEV("span", { children: "ADVENTURE CLASS C" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 1989,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white", children: [
                            catC_Count,
                            " (",
                            Math.round(catC_Count / (motorcycles.length || 1) * 100),
                            "%)"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 1990,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1988,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1.5 bg-black/60 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV(
                          motion.div,
                          {
                            initial: { width: 0 },
                            animate: { width: `${catC_Count / (motorcycles.length || 1) * 100}%` },
                            transition: { duration: 1.2 },
                            className: "h-full rounded-full bg-gradient-to-r from-brand-accent to-[#06B6D4]"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 1993,
                            columnNumber: 29
                          },
                          this
                        ) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1992,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1987,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[9px] font-mono text-gray-400 mb-1 leading-none", children: [
                          /* @__PURE__ */ jsxDEV("span", { children: "SCOOTER CLASS S" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2005,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white", children: [
                            catS_Count,
                            " (",
                            Math.round(catS_Count / (motorcycles.length || 1) * 100),
                            "%)"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2006,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2004,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1.5 bg-black/60 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV(
                          motion.div,
                          {
                            initial: { width: 0 },
                            animate: { width: `${catS_Count / (motorcycles.length || 1) * 100}%` },
                            transition: { duration: 1.2 },
                            className: "h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2009,
                            columnNumber: 29
                          },
                          this
                        ) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2008,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2003,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1953,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1946,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-4.5 rounded-2xl bg-[#0B0F1A]/85 border border-[#6366F1]/15 space-y-3", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/5 pb-2.5", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4.5 h-4.5 text-brand-accent shrink-0 animate-pulse" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2024,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold tracking-wider", children: lang === "ar" ? "طابور رصد اتصالات الحجز" : "ACTIVE CHRONOS SHOWROOM RESERVATIONS" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2025,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2023,
                        columnNumber: 25
                      }, this),
                      sessionUser.role === "Admin" && bookings.length > 0 && /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          onClick: handleClearBookings,
                          className: "px-2 py-1 bg-red-600/10 hover:bg-red-500 text-red-400 hover:text-white rounded border border-red-500/20 transition-all font-mono text-[9px] cursor-pointer",
                          children: lang === "ar" ? "تفريغ السجل" : "PURGE LEADS"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2028,
                          columnNumber: 27
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2022,
                      columnNumber: 23
                    }, this),
                    bookings.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-center py-8 text-gray-600 font-mono text-[10px] space-y-1.5 select-none text-transform: lowercase", children: [
                      /* @__PURE__ */ jsxDEV(MessageSquare, { className: "w-8 h-8 text-gray-700 mx-auto opacity-40" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2039,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "tracking-widest uppercase text-gray-500", children: lang === "ar" ? "لا حواسب ولا حجوزات مسجلة بعد" : "NO SPOOLED BOOKINGS RECIEVED" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2040,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-400 normal-case font-sans", children: "Submit a reserve ticket using any Book Now button to populate real leads here." }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2041,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2038,
                      columnNumber: 25
                    }, this) : /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto max-h-[220px] scrollbar-thin", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left border-collapse font-mono text-[10px] sm:text-[11px]", dir, children: [
                      /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "border-b border-white/5 text-gray-500 text-[9px] tracking-widest", children: [
                        /* @__PURE__ */ jsxDEV("th", { className: "pb-2 text-right", children: lang === "ar" ? "العميل" : "CLIENT" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2048,
                          columnNumber: 33
                        }, this),
                        /* @__PURE__ */ jsxDEV("th", { className: "pb-2 text-right", children: lang === "ar" ? "الماكينة" : "MACHINE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2049,
                          columnNumber: 33
                        }, this),
                        /* @__PURE__ */ jsxDEV("th", { className: "pb-2 text-right", children: lang === "ar" ? "الهاتف" : "PHONE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2050,
                          columnNumber: 33
                        }, this),
                        /* @__PURE__ */ jsxDEV("th", { className: "pb-2 text-right", children: lang === "ar" ? "تاريخ الحجز" : "RESERVE DATE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2051,
                          columnNumber: 33
                        }, this),
                        /* @__PURE__ */ jsxDEV("th", { className: "pb-2 text-right", children: lang === "ar" ? "المبيعات / الحالة" : "STATUS / SALE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2052,
                          columnNumber: 33
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2047,
                        columnNumber: 31
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2046,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV("tbody", { children: bookings.map((b) => /* @__PURE__ */ jsxDEV("tr", { className: "border-b border-white/[0.03] hover:bg-white/[0.01] text-gray-300", children: [
                        /* @__PURE__ */ jsxDEV("td", { className: "py-2.5 font-sans font-bold text-white transition-colors", children: [
                          b.name,
                          /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] font-mono text-gray-500 normal-case", children: b.email }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2060,
                            columnNumber: 37
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2058,
                          columnNumber: 35
                        }, this),
                        /* @__PURE__ */ jsxDEV("td", { className: "py-2.5 text-indigo-400 text-right", children: b.motorcycleName }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2062,
                          columnNumber: 35
                        }, this),
                        /* @__PURE__ */ jsxDEV("td", { className: "py-2.5 text-right font-bold text-brand-accent", children: /* @__PURE__ */ jsxDEV(
                          "a",
                          {
                            href: `https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`,
                            target: "_blank",
                            rel: "noreferrer",
                            className: "hover:underline flex items-center justify-end gap-1 shrink-0",
                            children: [
                              /* @__PURE__ */ jsxDEV("span", { children: b.phone }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2070,
                                columnNumber: 39
                              }, this),
                              /* @__PURE__ */ jsxDEV(ArrowUpRight, { className: "w-3 h-3 text-green-400 shrink-0" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2071,
                                columnNumber: 39
                              }, this)
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2064,
                            columnNumber: 37
                          },
                          this
                        ) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2063,
                          columnNumber: 35
                        }, this),
                        /* @__PURE__ */ jsxDEV("td", { className: "py-2.5 text-right font-sans italic text-gray-400", children: b.date }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2074,
                          columnNumber: 35
                        }, this),
                        /* @__PURE__ */ jsxDEV("td", { className: "py-2.5 text-right font-sans", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-end gap-2", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: `px-1.5 py-0.5 rounded text-[8.5px] font-bold ${(b.status || "sold") === "sold" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"}`, children: (b.status || "sold") === "sold" ? lang === "ar" ? "تم البيع" : "SOLD" : lang === "ar" ? "انتظار" : "PENDING" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2077,
                            columnNumber: 39
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              onClick: () => handleToggleBookingStatus(b.id, b.status || "sold"),
                              className: "px-1.5 py-0.5 rounded bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white border border-brand-primary/20 transition-all text-[8px] font-bold cursor-pointer font-mono",
                              children: lang === "ar" ? "تعديل" : "TOGGLE"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2087,
                              columnNumber: 39
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2076,
                          columnNumber: 37
                        }, this) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2075,
                          columnNumber: 35
                        }, this)
                      ] }, b.id, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2057,
                        columnNumber: 33
                      }, this)) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2055,
                        columnNumber: 29
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2045,
                      columnNumber: 27
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2044,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 2021,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-4.5 rounded-2xl bg-[#090D16] border border-green-500/10 space-y-4", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/5 pb-3", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "p-1.5 bg-green-500/10 rounded-lg text-green-400", children: /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2108,
                        columnNumber: 29
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2107,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold font-sans tracking-wide text-white", children: lang === "ar" ? "مستخرج التقارير المحاسبية (Excel)" : "COMPREHENSIVE EXCEL EXPORT TERMINAL" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2111,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-500 leading-normal font-mono normal-case", children: lang === "ar" ? "تصدير كامل تفاصيل مبيعات المتجر والحجوزات والمبالغ." : "Compile, filter, and stream ledger accounts for all products and heavy showroom vehicles." }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2114,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2110,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2106,
                      columnNumber: 25
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2105,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-end", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 text-left", dir, children: [
                        /* @__PURE__ */ jsxDEV("label", { className: "block text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider", children: lang === "ar" ? "نطاق استخراج البيانات:" : "SELECT EXPORT PERIOD:" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2124,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(
                          "select",
                          {
                            value: exportRangeType,
                            onChange: (e) => setExportRangeType(e.target.value),
                            className: "w-full px-3.5 py-2 sm:py-2.5 bg-[#0B0F19] text-white border border-white/5 hover:border-white/10 rounded-xl font-mono text-xs focus:outline-none focus:ring-1 focus:ring-green-500 tracking-wide cursor-pointer",
                            children: [
                              /* @__PURE__ */ jsxDEV("option", { value: "today", children: lang === "ar" ? "بيانات اليوم" : "Today (Real-time)" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2132,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("option", { value: "week", children: lang === "ar" ? "آخر أسبوع" : "Last Week" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2133,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("option", { value: "month", children: lang === "ar" ? "آخر شهر" : "Last Month" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2134,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("option", { value: "3months", children: lang === "ar" ? "آخر ٣ أشهر" : "Last 3 Months" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2135,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("option", { value: "6months", children: lang === "ar" ? "آخر ٦ أشهر" : "Last 6 Months" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2136,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("option", { value: "year", children: lang === "ar" ? "آخر سنة كاملة" : "Last 12 Months" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2137,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("option", { value: "custom", children: lang === "ar" ? "تحديد فترة زمينة مخصصة" : "Custom Date Range" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2138,
                                columnNumber: 29
                              }, this)
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2127,
                            columnNumber: 27
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2123,
                        columnNumber: 25
                      }, this),
                      exportRangeType === "custom" && /* @__PURE__ */ jsxDEV(Fragment, { children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 text-left", dir, children: [
                          /* @__PURE__ */ jsxDEV("label", { className: "block text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxDEV(Calendar, { className: "w-3.5 h-3.5 text-blue-400" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2147,
                              columnNumber: 33
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "من تاريخ:" : "START DATE/TIME:" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2148,
                              columnNumber: 33
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2146,
                            columnNumber: 31
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
                            /* @__PURE__ */ jsxDEV(
                              "input",
                              {
                                type: "datetime-local",
                                value: exportStartDate,
                                onChange: (e) => setExportStartDate(e.target.value),
                                className: "w-full pl-9 pr-3.5 rtl:pr-9 rtl:pl-3.5 py-2 sm:py-2.5 bg-[#0B0F19] text-white border border-blue-500/25 hover:border-blue-500/40 rounded-xl font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer [&::-webkit-calendar-picker-indicator]:invert-[44%] [&::-webkit-calendar-picker-indicator]:sepia-[95%] [&::-webkit-calendar-picker-indicator]:saturate-[1800%] [&::-webkit-calendar-picker-indicator]:hue-rotate-[195deg]"
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2151,
                                columnNumber: 33
                              },
                              this
                            ),
                            /* @__PURE__ */ jsxDEV(Calendar, { className: "absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2157,
                              columnNumber: 33
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2150,
                            columnNumber: 31
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2145,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 text-left", dir, children: [
                          /* @__PURE__ */ jsxDEV("label", { className: "block text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxDEV(Calendar, { className: "w-3.5 h-3.5 text-blue-400" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2163,
                              columnNumber: 33
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "إلى تاريخ:" : "END DATE/TIME:" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2164,
                              columnNumber: 33
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2162,
                            columnNumber: 31
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
                            /* @__PURE__ */ jsxDEV(
                              "input",
                              {
                                type: "datetime-local",
                                value: exportEndDate,
                                onChange: (e) => setExportEndDate(e.target.value),
                                className: "w-full pl-9 pr-3.5 rtl:pr-9 rtl:pl-3.5 py-2 sm:py-2.5 bg-[#0B0F19] text-white border border-blue-500/25 hover:border-blue-500/40 rounded-xl font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer [&::-webkit-calendar-picker-indicator]:invert-[44%] [&::-webkit-calendar-picker-indicator]:sepia-[95%] [&::-webkit-calendar-picker-indicator]:saturate-[1800%] [&::-webkit-calendar-picker-indicator]:hue-rotate-[195deg]"
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2167,
                                columnNumber: 33
                              },
                              this
                            ),
                            /* @__PURE__ */ jsxDEV(Calendar, { className: "absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2173,
                              columnNumber: 33
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2166,
                            columnNumber: 31
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2161,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2144,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: `sm:col-span-1 ${exportRangeType !== "custom" ? "lg:col-span-3" : ""}`, children: /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          onClick: handleExportExcel,
                          className: "w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500/85 to-emerald-600/95 hover:from-green-500 hover:to-emerald-600 text-white font-mono font-bold text-[10.5px] uppercase tracking-widest rounded-xl cursor-pointer transition-all border border-green-500/20 active:scale-98 shadow-md hover:shadow-green-500/10",
                          children: [
                            /* @__PURE__ */ jsxDEV(FileText, { className: "w-4 h-4 text-emerald-100" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2185,
                              columnNumber: 29
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تحميل البيانات بصيغة اكسل 📊" : "Compile & Export Spreadsheet 📊" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2186,
                              columnNumber: 29
                            }, this)
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2181,
                          columnNumber: 27
                        },
                        this
                      ) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2180,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2121,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 2104,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1836,
                  columnNumber: 19
                }, this),
                activeTab === "motorcycles" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 animate-fade-in", children: !isAddingNew && !editingBike ? (
                  // Grid list displays of active cycles
                  /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/5 pb-3", children: [
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold font-mono tracking-wider", children: lang === "ar" ? `قائمة الأسطول الحالية (${motorcycles.length})` : `FLEET COMPOSITION GRID (${motorcycles.length})` }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2203,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-gray-500 normal-case leading-normal font-sans", children: lang === "ar" ? "تفويض دراجات إلكترونية جديدة، تحديث مقاييس الدفع الحصانية أو التعديل والمسح." : "Review, register, modify specifications, or purge extreme dynamic cycles from Egypt showrooms." }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2206,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2202,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          onClick: handleAddNewClick,
                          className: "flex items-center gap-1.5 px-3.5 py-2 bg-brand-accent text-[#0B0F1A] hover:bg-[#18b5cc] font-mono text-[10.5px] font-black rounded-xl transition-all cursor-pointer shadow-md shadow-brand-accent/15",
                          children: [
                            /* @__PURE__ */ jsxDEV(Plus, { className: "w-4 h-4" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2215,
                              columnNumber: 29
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "إضافة آلة" : "COMMISSION NEW BIKE" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2216,
                              columnNumber: 29
                            }, this)
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2211,
                          columnNumber: 27
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2201,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 bg-[#0E1322]/80 p-3 rounded-2xl border border-white/[0.04]", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex border border-white/5 bg-black/40 p-1 rounded-xl w-fit max-w-full overflow-x-auto gap-1 select-none font-mono text-[10px]", children: ["All", "A", "B", "C", "S"].map((cat) => {
                        const isActive = dashCategoryFilter === cat;
                        const label = cat === "All" ? lang === "ar" ? "الكل 🌐" : "Show All" : cat === "A" ? lang === "ar" ? "A سبورت ⚡" : "A - Sport" : cat === "B" ? lang === "ar" ? "B كروزر 🛋️" : "B - Cruiser" : cat === "C" ? lang === "ar" ? "C مغامرات 🧭" : "C - Touring" : lang === "ar" ? "S سكوتر 🔋" : "S - Scooter";
                        return /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            type: "button",
                            onClick: () => setDashCategoryFilter(cat),
                            className: `px-3 py-1.5 rounded-lg font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${isActive ? "bg-brand-accent text-[#0B0F1A] shadow-md shadow-brand-accent/25 font-black" : "text-gray-400 hover:text-white hover:bg-white/5"}`,
                            children: label
                          },
                          cat,
                          false,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2234,
                            columnNumber: 33
                          },
                          this
                        );
                      }) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2223,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "relative flex-1 md:max-w-xs xl:max-w-md", children: [
                        /* @__PURE__ */ jsxDEV(
                          "input",
                          {
                            type: "text",
                            value: bikeSearchTerm,
                            onChange: (e) => setBikeSearchTerm(e.target.value),
                            placeholder: lang === "ar" ? "البحث بالاسم أو كود الموتوسيكل..." : "Search by name or bike code...",
                            className: "w-full bg-[#070A11] border border-white/10 rounded-xl pl-9 pr-8 rtl:pr-9 rtl:pl-8 py-2 text-xs text-white focus:border-brand-accent outline-none placeholder:text-gray-500 transition-all font-mono"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2252,
                            columnNumber: 29
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV(Search, { className: "absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2259,
                          columnNumber: 29
                        }, this),
                        bikeSearchTerm && /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            onClick: () => setBikeSearchTerm(""),
                            className: "absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-[10px] cursor-pointer font-bold font-mono transition-colors",
                            children: "✕"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2261,
                            columnNumber: 31
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2251,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2221,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: dashFilteredBikes.length > 0 ? dashFilteredBikes.map((bike) => /* @__PURE__ */ jsxDEV(
                      "div",
                      {
                        className: "p-4 bg-[#111624]/80 border border-white/[0.04] hover:border-brand-primary/20 rounded-2xl flex items-center gap-4 transition-all",
                        children: [
                          /* @__PURE__ */ jsxDEV(
                            "img",
                            {
                              src: bike.image,
                              alt: bike.name,
                              referrerPolicy: "no-referrer",
                              className: "w-16 h-16 object-contain bg-black/40 rounded-xl p-1 shrink-0"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2278,
                              columnNumber: 31
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0 text-left", dir, children: [
                            /* @__PURE__ */ jsxDEV("span", { className: `px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${bike.category === "A" ? "bg-indigo-950/80 border border-indigo-400/20 text-indigo-400" : bike.category === "B" ? "bg-purple-950/85 border border-purple-400/20 text-brand-secondary" : bike.category === "C" ? "bg-[#0f2125] border border-cyan-400/20 text-[#22D3EE]" : "bg-emerald-950 border border-emerald-400/20 text-emerald-400"}`, children: [
                              bike.categoryName,
                              " Class (",
                              bike.category,
                              ")"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2285,
                              columnNumber: 33
                            }, this),
                            /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-extrabold text-white tracking-wide truncate mt-1", children: bike.name }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2293,
                              columnNumber: 33
                            }, this),
                            /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-brand-accent font-bold text-[11px] mt-0.5", children: bike.price }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2296,
                              columnNumber: 33
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2284,
                            columnNumber: 31
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1.5 shrink-0 select-none items-center", children: [
                            /* @__PURE__ */ jsxDEV(
                              "div",
                              {
                                onClick: () => handleDownloadAndCopyQRCode(bike),
                                className: "bg-white p-1 rounded-md mb-1 cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-md shadow-black/45",
                                title: lang === "ar" ? "انقر لنسخ الكود وتحميل الرمز" : "Click to copy code & download QR",
                                children: /* @__PURE__ */ jsxDEV(QRCodeSVG, { id: `qr-${bike.id}`, value: bike.serialCode || bike.id, size: 40 }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2305,
                                  columnNumber: 37
                                }, this)
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2300,
                                columnNumber: 33
                              },
                              this
                            ),
                            sessionUser.role !== "Staff" ? /* @__PURE__ */ jsxDEV(
                              "button",
                              {
                                onClick: () => handleEditBikeClick(bike),
                                className: "p-1 px-2 pointer-events-auto cursor-pointer bg-indigo-500/15 hover:bg-brand-primary border border-indigo-500/10 text-brand-accent hover:text-white rounded-lg transition-all flex items-center justify-center gap-1 font-mono text-[9px] tracking-wider",
                                title: "Upgrade Machine Parameters",
                                children: [
                                  /* @__PURE__ */ jsxDEV(Edit2, { className: "w-3 h-3" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 2313,
                                    columnNumber: 37
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تعديل" : "UPGRADE" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 2314,
                                    columnNumber: 37
                                  }, this)
                                ]
                              },
                              void 0,
                              true,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2308,
                                columnNumber: 35
                              },
                              this
                            ) : /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] text-gray-600 font-mono italic leading-none text-right", children: "LOCKED NODES" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2317,
                              columnNumber: 35
                            }, this),
                            sessionUser.role === "Admin" && /* @__PURE__ */ jsxDEV(
                              "button",
                              {
                                onClick: () => handleDeleteBike(bike.id),
                                className: "p-1 px-2 pointer-events-auto cursor-pointer bg-red-500/10 hover:bg-red-500 border border-red-500/10 text-red-400 hover:text-white rounded-lg transition-all flex items-center justify-center gap-1 font-mono text-[9px] tracking-wider",
                                title: "Decommission Heavy Cycle",
                                children: [
                                  /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3 h-3" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 2326,
                                    columnNumber: 37
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "شطب" : "DELETE" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 2327,
                                    columnNumber: 37
                                  }, this)
                                ]
                              },
                              void 0,
                              true,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2321,
                                columnNumber: 35
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2299,
                            columnNumber: 31
                          }, this)
                        ]
                      },
                      bike.id,
                      true,
                      {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2274,
                        columnNumber: 29
                      },
                      this
                    )) : /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12 border border-white/5 bg-black/20 rounded-2xl col-span-1 sm:col-span-2 select-none font-mono text-[11px] text-gray-500 w-full", children: lang === "ar" ? "لا توجد مركبات مسجلة في هذا الفئة بعد" : "No commissioned designs in this category segment." }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2334,
                      columnNumber: 29
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2271,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 2200,
                    columnNumber: 23
                  }, this)
                ) : (
                  // Full Commission / Edit form screen
                  /* @__PURE__ */ jsxDEV("form", { onSubmit: handleFormSubmit, className: "space-y-4 max-w-2xl mx-auto text-left", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/5 pb-2", children: [
                      /* @__PURE__ */ jsxDEV("h3", { className: "text-xs font-mono font-bold tracking-widest text-brand-accent uppercase", children: isAddingNew ? lang === "ar" ? "تسجيل مركبة كهرومغناطيسية جديدة" : "COMMISSION NEW CYBER VEHICLE" : `${lang === "ar" ? "تحوير مقاييس" : "RECONFIG MACHINE"}: ${bikeForm.name}` }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2344,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setIsAddingNew(false);
                            setEditingBike(null);
                          },
                          className: "text-gray-400 hover:text-white text-[10px] font-mono cursor-pointer uppercase tracking-widest inline-flex items-center gap-1 text-right",
                          children: [
                            "< ",
                            lang === "ar" ? "تراجع للسياق" : "DISCARD SHELL"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2347,
                          columnNumber: 27
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2343,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex border-b border-white/5 pb-1 gap-2 overflow-x-auto select-none font-mono text-[10px] sm:text-[11px]", children: [
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          type: "button",
                          onClick: () => setFormSubTab("basic"),
                          className: `pb-1.5 px-1.5 border-b-2 font-bold uppercase transition-all tracking-wider cursor-pointer ${formSubTab === "basic" ? "border-brand-accent text-brand-accent" : "border-transparent text-gray-400 hover:text-white"}`,
                          children: [
                            "📁 ",
                            lang === "ar" ? "البيانات الأساسية" : "Basic Info"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2358,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          type: "button",
                          onClick: () => setFormSubTab("pricing"),
                          className: `pb-1.5 px-1.5 border-b-2 font-bold uppercase transition-all tracking-wider cursor-pointer ${formSubTab === "pricing" ? "border-brand-accent text-brand-accent" : "border-transparent text-gray-400 hover:text-white"}`,
                          children: [
                            "💰 ",
                            lang === "ar" ? "العروض والتسعير" : "Pricing & Offers"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2369,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          type: "button",
                          onClick: () => setFormSubTab("catalog"),
                          className: `pb-1.5 px-1.5 border-b-2 font-bold uppercase transition-all tracking-wider cursor-pointer ${formSubTab === "catalog" ? "border-brand-accent text-brand-accent" : "border-transparent text-gray-400 hover:text-white"}`,
                          children: [
                            "📄 ",
                            lang === "ar" ? "كتالوج PDF" : "Catalog Document"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2380,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          type: "button",
                          onClick: () => setFormSubTab("addons"),
                          className: `pb-1.5 px-1.5 border-b-2 font-bold uppercase transition-all tracking-wider cursor-pointer whitespace-nowrap ${formSubTab === "addons" ? "border-brand-accent text-brand-accent" : "border-transparent text-gray-400 hover:text-white"}`,
                          children: [
                            "🛠️ ",
                            lang === "ar" ? "الإضافات" : "Add-ons"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2391,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          type: "button",
                          onClick: () => setFormSubTab("related"),
                          className: `pb-1.5 px-1.5 border-b-2 font-bold uppercase transition-all tracking-wider cursor-pointer whitespace-nowrap ${formSubTab === "related" ? "border-brand-accent text-brand-accent" : "border-transparent text-gray-400 hover:text-white"}`,
                          children: [
                            "🔗 ",
                            lang === "ar" ? "منتجات المتجر" : "Store Related"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2402,
                          columnNumber: 27
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2357,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "mt-3", children: [
                      formSubTab === "basic" && /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left font-mono animate-fade-in", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                            lang === "ar" ? "اسم المحفز الدقيق" : "MACHINE IDENTIFIER NAME",
                            ":"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2422,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            "input",
                            {
                              type: "text",
                              required: true,
                              value: bikeForm.name,
                              onChange: (e) => setBikeForm({ ...bikeForm, name: e.target.value }),
                              className: "w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2423,
                              columnNumber: 33
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2421,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                            lang === "ar" ? "تصنيف الفئة الأفقية" : "SERIES COMPOSITION CLASSIFICATION",
                            ":"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2433,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            "select",
                            {
                              value: bikeForm.category,
                              onChange: (e) => setBikeForm({ ...bikeForm, category: e.target.value }),
                              className: "w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none",
                              children: [
                                /* @__PURE__ */ jsxDEV("option", { value: "A", children: "SPORT CLASS A (⚡ Speed Master)" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2439,
                                  columnNumber: 35
                                }, this),
                                /* @__PURE__ */ jsxDEV("option", { value: "B", children: "CRUISER CLASS B (🛋️ Low-Slung Custom)" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2440,
                                  columnNumber: 35
                                }, this),
                                /* @__PURE__ */ jsxDEV("option", { value: "C", children: "ADVENTURE CLASS C (🧭 Offgrid Nomad)" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2441,
                                  columnNumber: 35
                                }, this),
                                /* @__PURE__ */ jsxDEV("option", { value: "S", children: "SCOOTER CLASS S (🔋 Urban Hub)" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2442,
                                  columnNumber: 35
                                }, this)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2434,
                              columnNumber: 33
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2432,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                            lang === "ar" ? "السيريال/الكود المميز" : "UNIQUE SERIAL/CODE",
                            ":"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2447,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            "input",
                            {
                              type: "text",
                              required: true,
                              value: bikeForm.serialCode,
                              onChange: (e) => setBikeForm({ ...bikeForm, serialCode: e.target.value }),
                              className: "w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2448,
                              columnNumber: 33
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2446,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                            lang === "ar" ? "الشعار السلوكي الفرعي" : "CHASSIS SLOGAN SYNOPSIS",
                            ":"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2458,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            "input",
                            {
                              type: "text",
                              value: bikeForm.tagline,
                              onChange: (e) => setBikeForm({ ...bikeForm, tagline: e.target.value }),
                              className: "w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2459,
                              columnNumber: 33
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2457,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-t border-white/5 pt-3", children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 text-left", children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                              lang === "ar" ? "صورة المركبة هولوجرام" : "REACTIVE IMAGE URL / BASE64 ENCODING",
                              ":"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2469,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV(
                              "input",
                              {
                                type: "text",
                                value: bikeForm.image,
                                onChange: (e) => setBikeForm({ ...bikeForm, image: e.target.value }),
                                placeholder: "Paste clean direct image url links here...",
                                className: "w-full bg-[#111827]/75 border border-white/[0.08] text-white rounded-xl px-4 py-2 text-xs focus:outline-none"
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2470,
                                columnNumber: 35
                              },
                              this
                            ),
                            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("label", { className: "flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-lg cursor-pointer hover:bg-white/10 text-[9px] font-black transition-colors", children: [
                              /* @__PURE__ */ jsxDEV(Upload, { className: "w-3.5 h-3.5 text-brand-accent" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2479,
                                columnNumber: 39
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "رفع ملف صورة مشفرة" : "UPLOAD CHASSIS FILE" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2480,
                                columnNumber: 39
                              }, this),
                              /* @__PURE__ */ jsxDEV(
                                "input",
                                {
                                  type: "file",
                                  accept: "image/*",
                                  onChange: handleFormImageUpload,
                                  className: "hidden"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2481,
                                  columnNumber: 39
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2478,
                              columnNumber: 37
                            }, this) }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2477,
                              columnNumber: 35
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2468,
                            columnNumber: 33
                          }, this),
                          bikeForm.image && /* @__PURE__ */ jsxDEV("div", { className: "p-2 border border-white/[0.04] bg-black/40 rounded-2xl flex items-center justify-center max-h-[110px] overflow-hidden select-none", children: /* @__PURE__ */ jsxDEV(
                            "img",
                            {
                              src: bikeForm.image,
                              alt: "Payload preview card",
                              className: "max-h-20 object-contain drop-shadow",
                              referrerPolicy: "no-referrer"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2493,
                              columnNumber: 37
                            },
                            this
                          ) }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2492,
                            columnNumber: 35
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2467,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "col-span-1 sm:col-span-2 border-t border-white/5 pt-3 space-y-2.5 text-left", children: [
                          /* @__PURE__ */ jsxDEV("h4", { className: "text-[10px] text-gray-400 font-black tracking-widest uppercase flex items-center gap-1", children: [
                            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4.5 h-4.5 text-brand-accent animate-pulse" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2505,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "المواصفات الهندسية الدقيقة" : "CORE TELEMETRY AND SPECS MATRIX" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2506,
                              columnNumber: 35
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2504,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-2.5", children: [
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-500 font-bold", children: "1. Propulsion core" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2511,
                                columnNumber: 37
                              }, this),
                              /* @__PURE__ */ jsxDEV(
                                "input",
                                {
                                  type: "text",
                                  value: bikeForm.specs.engine,
                                  onChange: (e) => setBikeForm({ ...bikeForm, specs: { ...bikeForm.specs, engine: e.target.value } }),
                                  className: "w-full bg-black/40 border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-accent"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2512,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2510,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-500 font-bold", children: "2. top velocity" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2521,
                                columnNumber: 37
                              }, this),
                              /* @__PURE__ */ jsxDEV(
                                "input",
                                {
                                  type: "text",
                                  value: bikeForm.specs.topSpeed,
                                  onChange: (e) => setBikeForm({ ...bikeForm, specs: { ...bikeForm.specs, topSpeed: e.target.value } }),
                                  className: "w-full bg-black/40 border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-accent"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2522,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2520,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-500 font-bold", children: "3. output energy" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2531,
                                columnNumber: 37
                              }, this),
                              /* @__PURE__ */ jsxDEV(
                                "input",
                                {
                                  type: "text",
                                  value: bikeForm.specs.power,
                                  onChange: (e) => setBikeForm({ ...bikeForm, specs: { ...bikeForm.specs, power: e.target.value } }),
                                  className: "w-full bg-black/40 border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-accent"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2532,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2530,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-500 font-bold", children: "4. consumption rating" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2541,
                                columnNumber: 37
                              }, this),
                              /* @__PURE__ */ jsxDEV(
                                "input",
                                {
                                  type: "text",
                                  value: bikeForm.specs.fuelConsumption,
                                  onChange: (e) => setBikeForm({ ...bikeForm, specs: { ...bikeForm.specs, fuelConsumption: e.target.value } }),
                                  className: "w-full bg-black/40 border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-accent"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2542,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2540,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-500 font-bold", children: "5. vehicle net weight" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2551,
                                columnNumber: 37
                              }, this),
                              /* @__PURE__ */ jsxDEV(
                                "input",
                                {
                                  type: "text",
                                  value: bikeForm.specs.weight,
                                  onChange: (e) => setBikeForm({ ...bikeForm, specs: { ...bikeForm.specs, weight: e.target.value } }),
                                  className: "w-full bg-black/40 border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-accent"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2552,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2550,
                              columnNumber: 35
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2508,
                            columnNumber: 33
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2503,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "col-span-1 sm:col-span-2 space-y-1 text-left", children: [
                          /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                            lang === "ar" ? "الوصف المقتضب للبطاقة" : "SHOWROOM GRID OVERVIEW COPY",
                            ":"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2563,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            "textarea",
                            {
                              rows: 2,
                              value: bikeForm.shortDesc,
                              onChange: (e) => setBikeForm({ ...bikeForm, shortDesc: e.target.value }),
                              className: "w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none font-sans"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2564,
                              columnNumber: 33
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2562,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "col-span-1 sm:col-span-2 space-y-1 text-left", children: [
                          /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                            lang === "ar" ? "البيان الوصفي الهندسي الكامل للPDF" : "HOLOMESH HOLOGRAPHIC HISTORIC SPECTRUM MANIFESTO (LONG DETAILS)",
                            ":"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2573,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            "textarea",
                            {
                              rows: 3,
                              value: bikeForm.longDesc,
                              onChange: (e) => setBikeForm({ ...bikeForm, longDesc: e.target.value }),
                              className: "w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none font-sans"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2574,
                              columnNumber: 33
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2572,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "col-span-1 sm:col-span-2 pt-1 border-b border-white/5 pb-3 text-left", children: /* @__PURE__ */ jsxDEV("label", { className: "flex items-center gap-2.5 cursor-pointer select-none", children: [
                          /* @__PURE__ */ jsxDEV(
                            "input",
                            {
                              type: "checkbox",
                              checked: bikeForm.isPopular,
                              onChange: (e) => setBikeForm({ ...bikeForm, isPopular: e.target.checked }),
                              className: "w-4 h-4 rounded border-[#6366F1]/40 bg-[#111827] focus:ring-brand-primary"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2584,
                              columnNumber: 35
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono font-bold text-white uppercase flex items-center gap-1.5 leading-none", children: [
                            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-red-500 shrink-0" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2591,
                              columnNumber: 37
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "ترشيح كعرض مميز وشائع بقوة بالواجهة" : "ANCHOR AND PIN AS AN ACTIVE FLAGSHIP MOTORCYCLE" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2592,
                              columnNumber: 37
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2590,
                            columnNumber: 35
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2583,
                          columnNumber: 33
                        }, this) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2582,
                          columnNumber: 31
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2420,
                        columnNumber: 29
                      }, this),
                      formSubTab === "pricing" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-left font-mono animate-fade-in", dir, children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                              lang === "ar" ? "السعر الأصلي (جنيه)" : "ORIGINAL LIST PRICE (EGP)",
                              ":"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2604,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV(
                              "input",
                              {
                                type: "number",
                                required: true,
                                value: bikeForm.originalPrice || "",
                                onChange: (e) => setBikeForm({ ...bikeForm, originalPrice: parseInt(e.target.value, 10) || 0 }),
                                className: "w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none"
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2605,
                                columnNumber: 35
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2603,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                              lang === "ar" ? "نوع الخصم" : "DISCOUNT TYPE",
                              ":"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2615,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV(
                              "select",
                              {
                                value: bikeForm.discountType,
                                onChange: (e) => setBikeForm({ ...bikeForm, discountType: e.target.value }),
                                className: "w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none",
                                children: [
                                  /* @__PURE__ */ jsxDEV("option", { value: "percentage", children: "% Percentage" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 2621,
                                    columnNumber: 37
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("option", { value: "fixed", children: lang === "ar" ? "جنيه قيمة ثابتة" : "EGP Fixed Amount" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 2622,
                                    columnNumber: 37
                                  }, this)
                                ]
                              },
                              void 0,
                              true,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2616,
                                columnNumber: 35
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2614,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                              lang === "ar" ? "قيمة الخصم" : "DISCOUNT VALUE",
                              ":"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2627,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV(
                              "input",
                              {
                                type: "number",
                                value: bikeForm.discount || "",
                                onChange: (e) => setBikeForm({ ...bikeForm, discount: parseInt(e.target.value, 10) || 0 }),
                                placeholder: lang === "ar" ? "أدخل قيمة الخصم (مثل 15 لـ 15% أو 5000 لـ 5000 جنيه)" : "Enter 15 for 15% or 5000 for EGP 5,000",
                                className: "w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none"
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2628,
                                columnNumber: 35
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2626,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                              lang === "ar" ? "ملصق العرض الرياضي" : "OFFER PROMO BADGE LABEL",
                              ":"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2638,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV(
                              "input",
                              {
                                type: "text",
                                value: bikeForm.offerLabel,
                                onChange: (e) => setBikeForm({ ...bikeForm, offerLabel: e.target.value }),
                                placeholder: 'e.g. "HOT DEAL 🔥", "LIMITED OFFER"',
                                className: "w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none"
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2639,
                                columnNumber: 35
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2637,
                            columnNumber: 33
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2602,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-brand-primary/10 border border-brand-primary/30 rounded-2xl flex items-center justify-between", children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] text-gray-400 uppercase tracking-wider", children: lang === "ar" ? "السعر النهائي المحسوب وتأثير الخصم" : "CALCULATED RETAIL VALUE AFTER PROMOTIONS" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2652,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-black text-brand-secondary", children: [
                              (() => {
                                let price = Number(bikeForm.originalPrice !== void 0 ? bikeForm.originalPrice : bikeForm.priceNum || 45e3);
                                const disc = Number(bikeForm.discount || 0);
                                if (disc > 0 && bikeForm.originalPrice) {
                                  if (bikeForm.discountType === "percentage") {
                                    price = Math.round(bikeForm.originalPrice * (1 - disc / 100));
                                  } else {
                                    price = Math.round(Math.max(0, bikeForm.originalPrice - disc));
                                  }
                                }
                                return price;
                              })().toLocaleString(),
                              " ",
                              lang === "ar" ? "جنيه" : "EGP"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2653,
                              columnNumber: 35
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2651,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "text-right text-[10px] text-gray-500 max-w-[200px]", dir, children: lang === "ar" ? "يقوم المعالج بحساب السعر لجميع أرجاء المنصة تلقائياً فور كتابة الأرقام" : "Numerical calibrations update showrooms and catalogs instantaneously." }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2668,
                            columnNumber: 33
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2650,
                          columnNumber: 31
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2601,
                        columnNumber: 29
                      }, this),
                      formSubTab === "catalog" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-left font-mono animate-fade-in", dir, children: [
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-gray-400 leading-normal font-sans", dir, children: lang === "ar" ? "مرفقات الكتالوج الرقمية بصيغة PDF تجعل المشتري يتصفح الدليل الفني بلمسة من واجهة المعاينة." : "Introduce digital telemetry guides. Upload high-fidelity PDF documents that attach directly to showroom card flips." }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2678,
                          columnNumber: 31
                        }, this),
                        bikeForm.catalogFileName ? /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-brand-primary/10 border border-brand-primary/35 rounded-2xl space-y-3", children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
                            /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-brand-accent/10 border border-brand-accent/25 rounded-lg text-brand-accent shrink-0", children: /* @__PURE__ */ jsxDEV(FileText, { className: "w-6 h-6 shrink-0" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2686,
                              columnNumber: 39
                            }, this) }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2685,
                              columnNumber: 37
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0", children: [
                              /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] text-gray-500 uppercase font-bold tracking-widest", children: "ACTIVE CATALOG GUIDE File" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2689,
                                columnNumber: 39
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-black text-white truncate block mt-0.5", children: bikeForm.catalogFileName }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2690,
                                columnNumber: 39
                              }, this)
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2688,
                              columnNumber: 37
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2684,
                            columnNumber: 35
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              type: "button",
                              onClick: () => {
                                setBikeForm((prev) => ({ ...prev, catalogFileName: "", catalogFileContent: "" }));
                                fireToast(lang === "ar" ? "تم فصل الكتالوج" : "Digital brochure detached", "info");
                              },
                              className: "p-2 w-full text-center border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer transition-colors",
                              children: lang === "ar" ? "مسح وحذف الملف الحالي" : "DETACH AND REMOVE PDF BROCHURE"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2694,
                              columnNumber: 35
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2683,
                          columnNumber: 33
                        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-2 border-dashed border-white/10 hover:border-brand-accent/40 bg-black/40 rounded-2xl text-center space-y-3.5 transition-all", children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-gray-400", children: /* @__PURE__ */ jsxDEV(Upload, { className: "w-6 h-6 text-gray-500 shrink-0" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2708,
                            columnNumber: 37
                          }, this) }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2707,
                            columnNumber: 35
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] font-bold text-white uppercase", children: lang === "ar" ? "حدد ملف الكتالوج بصيغة PDF" : "NO TELEMETRY CATALOG ATTACHED" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2711,
                              columnNumber: 37
                            }, this),
                            /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-500 lowercase font-sans", children: "pdf file sizes up to 5mb. auto-encodes to base64 buffer matrix." }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2712,
                              columnNumber: 37
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2710,
                            columnNumber: 35
                          }, this),
                          /* @__PURE__ */ jsxDEV("label", { className: "inline-flex items-center gap-1.5 px-4 py-2 bg-brand-accent hover:bg-[#18b5cc] text-[#0B0F1A] font-extrabold rounded-xl cursor-pointer text-[10.5px] uppercase transition-all shadow-md shadow-brand-accent/15", children: [
                            /* @__PURE__ */ jsxDEV(Upload, { className: "w-3.5 h-3.5" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2716,
                              columnNumber: 37
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "رفع الكتالوج الرقمي PDF" : "UPLOAD CATALOG PDF" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2717,
                              columnNumber: 37
                            }, this),
                            /* @__PURE__ */ jsxDEV(
                              "input",
                              {
                                type: "file",
                                accept: "application/pdf",
                                className: "hidden",
                                onChange: (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    if (file.type !== "application/pdf") {
                                      fireToast(lang === "ar" ? "يرجى رفع ملف PDF فقط" : "Only PDF specs brochures are supported", "error");
                                      return;
                                    }
                                    if (file.size > 5 * 1024 * 1024) {
                                      fireToast(lang === "ar" ? "أقصى حجم للملف هو 5 ميجابايت" : "PDF size restricted to 5MB", "error");
                                      return;
                                    }
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                      if (typeof reader.result === "string") {
                                        setBikeForm((prev) => ({
                                          ...prev,
                                          catalogFileName: file.name,
                                          catalogFileContent: reader.result
                                        }));
                                        fireToast(lang === "ar" ? "تم تخزين الكتالوج وحفظه مشفراً في آلة المعالجة" : "PDF catalog guidance uploaded successfully", "success");
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2718,
                                columnNumber: 37
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2715,
                            columnNumber: 35
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2706,
                          columnNumber: 33
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2677,
                        columnNumber: 29
                      }, this),
                      formSubTab === "addons" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-left font-mono animate-fade-in", dir, children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-black/50 border border-white/[0.04] rounded-2xl space-y-3", children: [
                          /* @__PURE__ */ jsxDEV("h4", { className: "text-[10px] font-black text-brand-secondary tracking-widest uppercase flex items-center gap-1.5 border-b border-white/5 pb-1.5", children: [
                            /* @__PURE__ */ jsxDEV(Plus, { className: "w-4 h-4 text-brand-secondary shrink-0" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2761,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تعريف ملحق وأكسسوار إضافي جديد" : "INTEGRATE NEW DYNAMIC ADD-ON" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2762,
                              columnNumber: 35
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2760,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: [
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-400 font-bold uppercase", children: "Name (EN):" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2767,
                                columnNumber: 37
                              }, this),
                              /* @__PURE__ */ jsxDEV(
                                "input",
                                {
                                  type: "text",
                                  value: newAddOn.name,
                                  onChange: (e) => setNewAddOn({ ...newAddOn, name: e.target.value }),
                                  placeholder: "Titanium Exhaust System",
                                  className: "w-full bg-[#111827] border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-secondary focus:outline-none"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2768,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2766,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-400 font-bold uppercase", children: "Name (AR - Optional):" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2777,
                                columnNumber: 37
                              }, this),
                              /* @__PURE__ */ jsxDEV(
                                "input",
                                {
                                  type: "text",
                                  value: newAddOn.nameAr || "",
                                  onChange: (e) => setNewAddOn({ ...newAddOn, nameAr: e.target.value }),
                                  placeholder: "شكمان تيتانيوم رياضي",
                                  className: "w-full bg-[#111827] border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-secondary focus:outline-none text-right"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2778,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2776,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-400 font-bold uppercase", children: [
                                lang === "ar" ? "سعر التجزئة (جنيه)" : "Retail Price (EGP)",
                                ":"
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2787,
                                columnNumber: 37
                              }, this),
                              /* @__PURE__ */ jsxDEV(
                                "input",
                                {
                                  type: "number",
                                  value: newAddOn.price || "",
                                  onChange: (e) => setNewAddOn({ ...newAddOn, price: parseInt(e.target.value, 10) || 0 }),
                                  className: "w-full bg-[#111827] border border-white/10 text-brand-secondary rounded-lg p-2 text-xs focus:border-brand-secondary focus:outline-none font-black"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2788,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2786,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-400 font-bold uppercase", children: "Image Illustration URL:" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2796,
                                columnNumber: 37
                              }, this),
                              /* @__PURE__ */ jsxDEV(
                                "input",
                                {
                                  type: "text",
                                  value: newAddOn.image,
                                  onChange: (e) => setNewAddOn({ ...newAddOn, image: e.target.value }),
                                  className: "w-full bg-[#111827] border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-secondary focus:outline-none"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2797,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2795,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 sm:col-span-2", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-400 font-bold uppercase", children: "Description (EN):" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2805,
                                columnNumber: 37
                              }, this),
                              /* @__PURE__ */ jsxDEV(
                                "input",
                                {
                                  type: "text",
                                  value: newAddOn.description,
                                  onChange: (e) => setNewAddOn({ ...newAddOn, description: e.target.value }),
                                  className: "w-full bg-[#111827] border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-secondary focus:outline-none font-sans"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2806,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2804,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 sm:col-span-2", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-400 font-bold uppercase", children: "Description (AR - Optional):" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2814,
                                columnNumber: 37
                              }, this),
                              /* @__PURE__ */ jsxDEV(
                                "input",
                                {
                                  type: "text",
                                  value: newAddOn.descAr || "",
                                  onChange: (e) => setNewAddOn({ ...newAddOn, descAr: e.target.value }),
                                  className: "w-full bg-[#111827] border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-secondary focus:outline-none text-right font-sans"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2815,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2813,
                              columnNumber: 35
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2765,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              type: "button",
                              onClick: (e) => {
                                e.preventDefault();
                                if (!newAddOn.name || newAddOn.price <= 0) {
                                  fireToast(lang === "ar" ? "الرجاء إدخال اسم الملحق وسعر صالح" : "Please input a name and valid price", "error");
                                  return;
                                }
                                const addonObj = {
                                  ...newAddOn,
                                  id: `addon-${Date.now()}`
                                };
                                setBikeForm((prev) => ({
                                  ...prev,
                                  addOns: [...prev.addOns || [], addonObj]
                                }));
                                setNewAddOn({
                                  id: "",
                                  name: "",
                                  nameAr: "",
                                  image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=150",
                                  description: "",
                                  descAr: "",
                                  price: 0
                                });
                                fireToast(lang === "ar" ? "تمت إضافة الأكسسوار بنجاح للآلة" : "Accessory integrated into model spec array", "success");
                              },
                              className: "w-full py-2 cursor-pointer bg-brand-secondary hover:bg-amber-400 text-[#0B0F1A] font-black tracking-widest text-[9.5px] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all",
                              children: lang === "ar" ? "دمج الأكسسوار بالنموذج" : "PULL ACCESSORY INTO MOTORCYCLE SPEC"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2824,
                              columnNumber: 33
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2759,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
                          /* @__PURE__ */ jsxDEV("h4", { className: "text-[10px] text-gray-500 font-bold uppercase tracking-wider", children: lang === "ar" ? `المرفقات الحالية (${bikeForm.addOns?.length || 0})` : `ATTACHED ACCESSORIES (${bikeForm.addOns?.length || 0})` }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2859,
                            columnNumber: 33
                          }, this),
                          !bikeForm.addOns || bikeForm.addOns.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] text-center text-gray-500 font-sans italic text-[10px]", dir, children: lang === "ar" ? "لا توجد أكسسوارات مخصصة لهذه الدراجة" : "No specialized performance add-ons attached to this chassis yet." }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2864,
                            columnNumber: 35
                          }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 max-h-[220px] overflow-y-auto scrollbar-thin", children: bikeForm.addOns.map((add, idx) => /* @__PURE__ */ jsxDEV("div", { className: "p-2 border border-white/5 bg-black/40 rounded-xl flex items-center gap-3", children: [
                            /* @__PURE__ */ jsxDEV("img", { src: add.image, className: "w-8 h-8 object-cover rounded-lg shrink-0 bg-white/5" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2871,
                              columnNumber: 41
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0 text-left", children: [
                              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                                /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-black truncate", children: lang === "ar" && add.nameAr ? add.nameAr : add.name }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2874,
                                  columnNumber: 45
                                }, this),
                                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-brand-secondary font-black font-mono", children: [
                                  add.price.toLocaleString(),
                                  " ",
                                  lang === "ar" ? "جنيه" : "EGP"
                                ] }, void 0, true, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2875,
                                  columnNumber: 45
                                }, this)
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2873,
                                columnNumber: 43
                              }, this),
                              /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-400 font-sans truncate", children: lang === "ar" && add.descAr ? add.descAr : add.description }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2877,
                                columnNumber: 43
                              }, this)
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2872,
                              columnNumber: 41
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 shrink-0 select-none", children: [
                              /* @__PURE__ */ jsxDEV(
                                "button",
                                {
                                  type: "button",
                                  disabled: idx === 0,
                                  onClick: () => {
                                    const list = [...bikeForm.addOns];
                                    const temp = list[idx];
                                    list[idx] = list[idx - 1];
                                    list[idx - 1] = temp;
                                    setBikeForm((prev) => ({ ...prev, addOns: list }));
                                  },
                                  className: "p-1 px-1.5 text-gray-400 hover:text-white disabled:opacity-30 bg-white/5 rounded pointer-events-auto cursor-pointer text-[9px] transition-colors",
                                  children: "▲"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2880,
                                  columnNumber: 43
                                },
                                this
                              ),
                              /* @__PURE__ */ jsxDEV(
                                "button",
                                {
                                  type: "button",
                                  disabled: idx === bikeForm.addOns.length - 1,
                                  onClick: () => {
                                    const list = [...bikeForm.addOns];
                                    const temp = list[idx];
                                    list[idx] = list[idx + 1];
                                    list[idx + 1] = temp;
                                    setBikeForm((prev) => ({ ...prev, addOns: list }));
                                  },
                                  className: "p-1 px-1.5 text-gray-400 hover:text-white disabled:opacity-30 bg-white/5 rounded pointer-events-auto cursor-pointer text-[9px] transition-colors",
                                  children: "▼"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2894,
                                  columnNumber: 43
                                },
                                this
                              ),
                              /* @__PURE__ */ jsxDEV(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => {
                                    setBikeForm((prev) => ({ ...prev, addOns: prev.addOns.filter((a) => a.id !== add.id) }));
                                    fireToast(lang === "ar" ? "تم فصل الأكسسوار" : "Detached accessory", "info");
                                  },
                                  className: "p-1 text-red-400 hover:text-white hover:bg-red-500 rounded pointer-events-auto cursor-pointer text-[9px] transition-colors shrink-0",
                                  children: "✕"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2908,
                                  columnNumber: 43
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2879,
                              columnNumber: 41
                            }, this)
                          ] }, add.id, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2870,
                            columnNumber: 39
                          }, this)) }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2868,
                            columnNumber: 35
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2858,
                          columnNumber: 31
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2756,
                        columnNumber: 29
                      }, this),
                      formSubTab === "related" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-left font-mono animate-fade-in", dir, children: /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-black/50 border border-white/[0.04] rounded-2xl space-y-4", children: [
                        /* @__PURE__ */ jsxDEV("h4", { className: "text-[10px] font-black text-brand-secondary tracking-widest uppercase mb-2", children: lang === "ar" ? "حدد المنتجات ذات الصلة بالموديل" : "Attach Related Store Products" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2931,
                          columnNumber: 33
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 mb-4", children: [
                          /* @__PURE__ */ jsxDEV(
                            "input",
                            {
                              type: "text",
                              placeholder: lang === "ar" ? "بحث..." : "Search...",
                              className: "flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white text-xs",
                              value: searchTerm,
                              onChange: (e) => setSearchTerm(e.target.value)
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2936,
                              columnNumber: 35
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV(
                            "select",
                            {
                              className: "bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white text-xs",
                              value: selectedCategory,
                              onChange: (e) => setSelectedCategory(e.target.value),
                              children: [
                                /* @__PURE__ */ jsxDEV("option", { value: "ALL", children: lang === "ar" ? "الكل" : "All" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2948,
                                  columnNumber: 37
                                }, this),
                                ["Oils", "Safety", "Smart", "Parts", "Lifestyle"].map((cat) => /* @__PURE__ */ jsxDEV("option", { value: cat, children: cat }, cat, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2950,
                                  columnNumber: 39
                                }, this))
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2943,
                              columnNumber: 35
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2935,
                          columnNumber: 33
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar", children: [
                          storeProducts?.filter(
                            (product) => (selectedCategory === "ALL" || product.category === selectedCategory) && (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.nameAr.includes(searchTerm) || product.id.toLowerCase().includes(searchTerm.toLowerCase()))
                          ).map((product) => {
                            const isSelected = (bikeForm.relatedProductIds || []).includes(product.id);
                            return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 p-2 border border-white/5 bg-white/5 rounded-xl", children: [
                              /* @__PURE__ */ jsxDEV(
                                "input",
                                {
                                  type: "checkbox",
                                  className: "cursor-pointer text-brand-primary bg-black border-white/20 rounded",
                                  checked: isSelected,
                                  onChange: (e) => {
                                    const current = bikeForm.relatedProductIds || [];
                                    let newRelated = current;
                                    let newAddOns = [...bikeForm.addOns || []];
                                    if (e.target.checked) {
                                      newRelated = [...current, product.id];
                                      const newAddon = {
                                        id: `addon-${product.id}`,
                                        name: product.name,
                                        nameAr: product.nameAr,
                                        price: parseInt(String(product.price).replace(/[^0-9]/g, ""), 10) || 0,
                                        image: product.image,
                                        description: product.description || "",
                                        descAr: product.descriptionAr || ""
                                      };
                                      newAddOns.push(newAddon);
                                    } else {
                                      newRelated = current.filter((id) => id !== product.id);
                                      newAddOns = newAddOns.filter((a) => a.id !== `addon-${product.id}`);
                                    }
                                    setBikeForm({ ...bikeForm, relatedProductIds: newRelated, addOns: newAddOns });
                                  }
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2963,
                                  columnNumber: 41
                                },
                                this
                              ),
                              /* @__PURE__ */ jsxDEV("img", { src: product.image, className: "w-8 h-8 rounded bg-black/50 object-contain p-1" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2991,
                                columnNumber: 41
                              }, this),
                              /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0 pr-2", children: [
                                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-white truncate", children: lang === "ar" ? product.nameAr : product.name }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2993,
                                  columnNumber: 44
                                }, this),
                                /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-gray-400 font-mono tracking-widest", children: [
                                  product.id,
                                  " • ",
                                  product.price,
                                  " EGP"
                                ] }, void 0, true, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2994,
                                  columnNumber: 44
                                }, this)
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2992,
                                columnNumber: 41
                              }, this)
                            ] }, product.id, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2962,
                              columnNumber: 39
                            }, this);
                          }),
                          (!storeProducts || storeProducts.length === 0) && /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-gray-500 italic p-4 text-center", children: "No products in store to link." }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3e3,
                            columnNumber: 37
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2955,
                          columnNumber: 33
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2930,
                        columnNumber: 31
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2929,
                        columnNumber: 29
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2416,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-white/5 flex justify-end gap-3 font-mono", children: [
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setIsAddingNew(false);
                            setEditingBike(null);
                          },
                          className: "px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold cursor-pointer text-xs uppercase",
                          children: lang === "ar" ? "تراجع" : "DISCARD CHANGES"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3010,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          type: "submit",
                          className: "px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-[#22D3EE] text-[#0B0F1A] font-extrabold uppercase hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer text-xs",
                          children: [
                            /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3021,
                              columnNumber: 29
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تثبيت الآلة وحفظها" : "AUTHORIZE INVENTORY WRITE" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3022,
                              columnNumber: 29
                            }, this)
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3017,
                          columnNumber: 27
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3009,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 2342,
                    columnNumber: 23
                  }, this)
                ) }, void 0, false, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 2196,
                  columnNumber: 19
                }, this),
                activeTab === "store" && /* @__PURE__ */ jsxDEV("div", { className: "animate-fade-in text-left min-h-[600px]", children: /* @__PURE__ */ jsxDEV(
                  StoreAdminPanel,
                  {
                    storeProducts,
                    onUpdateStoreProducts
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 3034,
                    columnNumber: 22
                  },
                  this
                ) }, void 0, false, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 3033,
                  columnNumber: 19
                }, this),
                activeTab === "users" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-5 animate-fade-in", dir, children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "border-b border-white/5 pb-2 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold tracking-widest font-mono", children: lang === "ar" ? "مشغلو العقد وجلسات العمل" : "NODE OPERATORS SECURITY DIRECTORY" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3046,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-gray-500 normal-case leading-normal font-sans", children: lang === "ar" ? "إنشاء حسابات جديدة وتعيين مستويات الوصول (مشرف، مدير، مشغل)" : "Authorize secondary credentials, assign access rights, and revoke node keys safely." }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3049,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3045,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 bg-brand-primary/10 border border-brand-primary/20 text-[#22D3EE] font-mono text-[9px] px-2 py-1 rounded", children: [
                      /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3055,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "MASTER SYSOPS SECURITY ACTS v2.26" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3056,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3054,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 3044,
                    columnNumber: 21
                  }, this),
                  sessionUser.role !== "Admin" ? (
                    // Unauthorized overlay for Manager & Staff
                    /* @__PURE__ */ jsxDEV("div", { className: "p-8 text-center border border-red-500/20 bg-red-950/15 rounded-2xl space-y-3 font-mono tracking-wider max-w-md mx-auto my-6 shadow-lg shadow-red-500/5", children: [
                      /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-12 h-12 text-red-500 mx-auto animate-bounce shrink-0" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3063,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("p", { className: "text-red-400 font-black text-xs uppercase", children: lang === "ar" ? "لوائح الأمان: الوصول مرفوض!" : "SECURITY BREACH WARNING: ACCESS DENIED" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3065,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-500 lowercase mt-1 normal-case font-sans", children: lang === "ar" ? "رخص كبار المطورين تتطلب صلاحيات المشرف التام (Admin). مشغلك الحالي محروم من الدخول." : "Curation of Operator Nodes requires Core administrator authorization. Credentials logged." }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3066,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3064,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3062,
                      columnNumber: 23
                    }, this)
                  ) : (
                    // Full User configuration page
                    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-5 font-mono text-xs", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 p-4 border border-white/[0.04] bg-[#111622]/80 rounded-2xl space-y-4 shadow-sm", dir, children: [
                        /* @__PURE__ */ jsxDEV("h4", { className: "text-brand-secondary font-black border-b border-white/5 pb-1.5 tracking-wider uppercase flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxDEV(Plus, { className: "w-4 h-4 text-brand-secondary" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3078,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تفويض مشغل فرعي جديد" : "DELEGATE NEW OPERATOR" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3079,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3077,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("form", { onSubmit: handleAddUserSubmit, className: "space-y-3", children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", dir, children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wide uppercase", children: [
                              lang === "ar" ? "الاسم المعرف" : "NODE USERNAME IDENTITY",
                              ":"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3084,
                              columnNumber: 31
                            }, this),
                            /* @__PURE__ */ jsxDEV(
                              "input",
                              {
                                type: "text",
                                required: true,
                                value: newUsername,
                                onChange: (e) => setNewUsername(e.target.value),
                                placeholder: "operator_id",
                                className: "w-full bg-black/60 border border-white/[0.08] focus:border-brand-secondary text-white rounded-xl px-3 py-2 text-xs focus:outline-none py-2.5 lowercase font-semibold"
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3085,
                                columnNumber: 31
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3083,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", dir, children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wide uppercase", children: [
                              lang === "ar" ? "الرمز المشفر للدخول" : "SECURE DELEGATION CODE",
                              ":"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3096,
                              columnNumber: 31
                            }, this),
                            /* @__PURE__ */ jsxDEV(
                              "input",
                              {
                                type: "text",
                                required: true,
                                value: newPassword,
                                onChange: (e) => setNewPassword(e.target.value),
                                placeholder: "••••••••••••",
                                className: "w-full bg-black/60 border border-white/[0.08] focus:border-brand-secondary text-white rounded-xl px-3 py-2 text-xs focus:outline-none py-2.5 font-bold"
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3097,
                                columnNumber: 31
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3095,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", dir, children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wide uppercase", children: [
                              lang === "ar" ? "رتبة الوصول والشبكة" : "ACCESS SPECTRUM ROLE",
                              ":"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3108,
                              columnNumber: 31
                            }, this),
                            /* @__PURE__ */ jsxDEV(
                              "select",
                              {
                                value: newRole,
                                onChange: (e) => setNewRole(e.target.value),
                                className: "w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-secondary text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none",
                                children: [
                                  /* @__PURE__ */ jsxDEV("option", { value: "Admin", children: lang === "ar" ? "مشرف رئيسي (Admin)" : "CORE ADMIN (Full Writes + Users)" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 3114,
                                    columnNumber: 33
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("option", { value: "Manager", children: lang === "ar" ? "مدير أسطول (Manager)" : "MANAGER NODE (Add & Edit Fleet only)" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 3115,
                                    columnNumber: 33
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("option", { value: "Staff", children: lang === "ar" ? "فريق عمل/مشغل (Staff Operator)" : "Staff Operator (Only Add Motorcycles)" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 3116,
                                    columnNumber: 33
                                  }, this)
                                ]
                              },
                              void 0,
                              true,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3109,
                                columnNumber: 31
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3107,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              type: "submit",
                              className: "w-full py-2.5 mt-2 bg-brand-secondary text-white font-extrabold tracking-widest rounded-xl hover:brightness-110 active:scale-95 transition-all text-[11px] cursor-pointer uppercase flex items-center justify-center gap-1.5",
                              children: [
                                /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3124,
                                  columnNumber: 31
                                }, this),
                                /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تفعيل رمز المشغل" : "DELEGATE NODE" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3125,
                                  columnNumber: 31
                                }, this)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3120,
                              columnNumber: 29
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3082,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3076,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 p-4 border border-white/[0.04] bg-[#0E121E]/90 rounded-2xl space-y-3.5 shadow-sm", children: [
                        /* @__PURE__ */ jsxDEV("h4", { className: "text-brand-accent font-black border-b border-white/5 pb-1.5 tracking-wider uppercase flex items-center justify-between", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxDEV(Users, { className: "w-4 h-4 text-brand-accent" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3134,
                              columnNumber: 31
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "المشرفون المسجلون" : "ONLINE WORKERS REGISTRY" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3135,
                              columnNumber: 31
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3133,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-gray-500", children: [
                            users.length,
                            " active operators"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3137,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3132,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2.5 max-h-[300px] overflow-y-auto scrollbar-thin", children: users.map((item) => /* @__PURE__ */ jsxDEV(
                          "div",
                          {
                            className: "p-3 bg-black/40 border border-white/[0.03] rounded-xl flex items-center justify-between hover:border-white/10 transition-all font-mono",
                            children: [
                              /* @__PURE__ */ jsxDEV("div", { children: [
                                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                                  /* @__PURE__ */ jsxDEV("span", { className: "font-extrabold text-white text-xs tracking-wide", children: item.username }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 3148,
                                    columnNumber: 37
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("span", { className: `px-1 rounded text-[8px] font-bold ${item.role === "Admin" ? "bg-indigo-950/80 border border-indigo-400/20 text-indigo-400" : item.role === "Manager" ? "bg-purple-950/80 border border-purple-400/20 text-brand-secondary" : "bg-emerald-950/80 border border-emerald-400/20 text-emerald-400"}`, children: item.role.toUpperCase() }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 3149,
                                    columnNumber: 37
                                  }, this)
                                ] }, void 0, true, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3147,
                                  columnNumber: 35
                                }, this),
                                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 mt-1 text-[9px] text-gray-500 leading-none", children: [
                                  /* @__PURE__ */ jsxDEV("span", { children: "KEY:" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 3158,
                                    columnNumber: 37
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-gray-400 tracking-wider", children: "••••••••" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 3159,
                                    columnNumber: 37
                                  }, this)
                                ] }, void 0, true, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3157,
                                  columnNumber: 35
                                }, this)
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3146,
                                columnNumber: 33
                              }, this),
                              item.username.toUpperCase() !== "HOSNY1995" && item.username !== sessionUser.username ? /* @__PURE__ */ jsxDEV(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => handleDeleteUser(item.username),
                                  className: "p-1.5 pointer-events-auto cursor-pointer bg-red-600/10 hover:bg-red-600 hover:text-white border border-red-500/20 text-red-100 rounded-lg transition-all",
                                  title: "Revoke operator credentials",
                                  children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 3170,
                                    columnNumber: 37
                                  }, this)
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3164,
                                  columnNumber: 35
                                },
                                this
                              ) : /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] text-gray-600 italic tracking-widest font-black uppercase font-mono", children: "CORE_LOCKED" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3173,
                                columnNumber: 35
                              }, this)
                            ]
                          },
                          item.username,
                          true,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3142,
                            columnNumber: 31
                          },
                          this
                        )) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3140,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3131,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3073,
                      columnNumber: 23
                    }, this)
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 3043,
                  columnNumber: 19
                }, this),
                activeTab === "settings" && /* @__PURE__ */ jsxDEV("div", { className: "p-1 animate-fade-in text-left space-y-6", children: [
                  /* @__PURE__ */ jsxDEV(
                    HomepagePageBuilder,
                    {
                      homepageConfig,
                      onUpdateHomepageConfig: onUpdateHomepageConfig || (() => {
                      }),
                      lang,
                      dir,
                      customText,
                      onUpdateCustomText,
                      fireToast: (msg, type) => fireToast(msg, type)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3188,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-4.5 rounded-2xl bg-[#090D16] border border-blue-500/10 space-y-2 mt-4", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/5 pb-3", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "p-1.5 bg-blue-500/10 rounded-lg text-blue-400 font-bold shrink-0", children: /* @__PURE__ */ jsxDEV(Database, { className: "w-4 h-4 animate-pulse" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3203,
                        columnNumber: 29
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3202,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold font-sans tracking-wide text-white", children: lang === "ar" ? "مركز إدارة النسخ الاحتياطي (ZIP)" : "ZIP ARCHIVE BACKUP & RESTORE CONSOLE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3206,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-400 leading-normal font-mono normal-case", children: lang === "ar" ? "تحميل كامل قاعدة بيانات وملفات وعناصر الموقع كملف مضغوط وتنزيله لحمايته قبل القيام بأي تعديلات." : "Compile, archive, and download entire system databases and templates as a ZIP file to local storage." }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3209,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3205,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3201,
                      columnNumber: 25
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3200,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-left", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 bg-[#0B0F1A] border border-white/[0.03] hover:border-blue-500/20 rounded-xl transition-all space-y-3 flex flex-col justify-between", children: [
                        /* @__PURE__ */ jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] uppercase font-bold text-gray-400 font-mono tracking-widest block mb-1", children: lang === "ar" ? "تنزيل نسخة احتياطية" : "GENERATE BACKUP" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3222,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("p", { className: "text-[10.5px] text-gray-500 leading-relaxed font-sans", children: lang === "ar" ? "يقوم هذا الخيار بضغط وحفظ جميع منتجات المتجر، الدراجات، إعدادات المعاينة، الترجمات، والحجوزات الحالية في ملف ZIP مشفر وآمن." : "Package all active fleet cycles, shop products, visual custom texts, and user accounts inside a secured ZIP backup archive." }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3225,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3221,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            onClick: handleDownloadBackup,
                            className: "w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500/85 to-indigo-600/95 hover:from-blue-500 hover:to-indigo-600 text-white font-mono font-bold text-[10.5px] uppercase tracking-widest rounded-xl cursor-pointer transition-all border border-blue-500/20 active:scale-98 shadow-md hover:shadow-blue-500/10",
                            children: [
                              /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4 text-blue-100" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3235,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تحميل النسخة الاحتياطية (ZIP) 📦" : "Generate & Download ZIP 📦" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3236,
                                columnNumber: 29
                              }, this)
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3231,
                            columnNumber: 27
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3220,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 bg-[#0B0F1A] border border-white/[0.03] hover:border-blue-500/20 rounded-xl transition-all space-y-3 flex flex-col justify-between", children: [
                        /* @__PURE__ */ jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] uppercase font-bold text-gray-400 font-mono tracking-widest block mb-1", children: lang === "ar" ? "استعادة نسخة سابقة" : "RESTORE BACKUP" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3243,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("p", { className: "text-[10.5px] text-gray-500 leading-relaxed font-sans", children: lang === "ar" ? "قم برفع ملف الـ ZIP المضغوط الذي قمت بتنزيله مسبقاً لاسترجاع كامل بيانات الموقع السابقة بلمسة واحدة." : "Upload a previously generated system ZIP backup file. Restores and overwrites state variables immediately." }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3246,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3242,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
                          /* @__PURE__ */ jsxDEV(
                            "input",
                            {
                              type: "file",
                              accept: ".zip",
                              onChange: handleRestoreBackup,
                              id: "restore-zip-setting-input",
                              className: "hidden",
                              disabled: sessionUser?.role !== "Admin"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3254,
                              columnNumber: 29
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV(
                            "label",
                            {
                              htmlFor: "restore-zip-setting-input",
                              className: `w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono font-bold text-[10.5px] uppercase tracking-widest transition-all border shadow-md ${sessionUser?.role === "Admin" ? "bg-[#0B0F19] hover:bg-indigo-950/15 border-indigo-500/40 hover:border-indigo-500 text-indigo-300 cursor-pointer" : "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"}`,
                              children: [
                                /* @__PURE__ */ jsxDEV(Upload, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3270,
                                  columnNumber: 31
                                }, this),
                                /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "رفع واستعادة ملف احتياطي 🔄" : "Upload & Restore ZIP 🔄" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3271,
                                  columnNumber: 31
                                }, this)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3262,
                              columnNumber: 29
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3253,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3241,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3218,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 3199,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-4.5 rounded-2xl bg-[#090D16] border border-white/5 space-y-4 mt-4 text-left", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/5 pb-3", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "p-1.5 bg-white/5 rounded-lg text-white shrink-0", children: /* @__PURE__ */ jsxDEV(Github, { className: "w-4 h-4" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3283,
                        columnNumber: 29
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3282,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold font-sans tracking-wide text-white uppercase", children: lang === "ar" ? "بوابة المزامنة ومستودعات GitHub" : "GITHUB CLOUD SYNCHRONIZATION GATE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3286,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-400 leading-normal font-mono normal-case", children: lang === "ar" ? "مزامنة وتصدير ملفات وبيانات المعرض مباشرةً لحساب GitHub الخاص بك، أو استعادتها بلمسة واحدة من خلال رابط مباشر." : "Establish direct link with your GitHub repos to commit complete backups, or load snapshot states by link resolved." }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3289,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3285,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3281,
                      columnNumber: 25
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3280,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 p-4 bg-[#0B0F1A] border border-white/[0.03] hover:border-white/10 rounded-xl transition-all", children: [
                        /* @__PURE__ */ jsxDEV("h5", { className: "text-[10.5px] uppercase font-bold text-gray-300 font-mono tracking-wider flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxDEV(Upload, { className: "w-3.5 h-3.5 text-blue-400" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3302,
                            columnNumber: 29
                          }, this),
                          lang === "ar" ? "تصدير وحفظ المستودع (GitHub Export)" : "PUSH DATA TO GITHUB"
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3301,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 text-xs", children: [
                          /* @__PURE__ */ jsxDEV("div", { children: [
                            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-gray-400 block font-mono uppercase font-semibold", children: lang === "ar" ? "رمز الوصول الشخصي (GitHub PAT)" : "GitHub Personal Access Token" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3310,
                                columnNumber: 33
                              }, this),
                              /* @__PURE__ */ jsxDEV(
                                "a",
                                {
                                  href: "https://github.com/settings/tokens/new?description=ElKholy%20Motors%20Backup%20Key&scopes=repo",
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  className: "text-[10px] text-blue-400 hover:underline hover:text-blue-350 cursor-pointer font-bold transition-all flex items-center gap-1 font-mono",
                                  children: [
                                    "🔑 ",
                                    lang === "ar" ? "إنشاء الرمز تلقائياً" : "Generate Token Automatically"
                                  ]
                                },
                                void 0,
                                true,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3313,
                                  columnNumber: 33
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3309,
                              columnNumber: 31
                            }, this),
                            /* @__PURE__ */ jsxDEV(
                              "input",
                              {
                                type: "password",
                                value: githubToken,
                                onChange: (e) => {
                                  setGithubToken(e.target.value);
                                  localStorage.setItem("elkholy_github_token", e.target.value);
                                },
                                placeholder: "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxx",
                                className: "w-full bg-[#070A11] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-gray-650 focus:border-blue-500 outline-none font-mono"
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3322,
                                columnNumber: 31
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3308,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [
                            /* @__PURE__ */ jsxDEV("div", { children: [
                              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-1", children: [
                                /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-gray-400 block font-mono uppercase font-semibold", children: lang === "ar" ? "مستودع GitHub" : "Repository (owner/repo)" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3338,
                                  columnNumber: 35
                                }, this),
                                /* @__PURE__ */ jsxDEV(
                                  "a",
                                  {
                                    href: "https://github.com/new",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "text-[10px] text-emerald-400 hover:underline hover:text-emerald-350 cursor-pointer font-bold transition-all flex items-center gap-1 font-mono",
                                    children: [
                                      "📁 ",
                                      lang === "ar" ? "إنشاء مستودع جديد" : "Create New Repo"
                                    ]
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 3341,
                                    columnNumber: 35
                                  },
                                  this
                                )
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3337,
                                columnNumber: 33
                              }, this),
                              /* @__PURE__ */ jsxDEV(
                                "input",
                                {
                                  type: "text",
                                  value: githubRepo,
                                  onChange: (e) => {
                                    setGithubRepo(e.target.value);
                                    localStorage.setItem("elkholy_github_repo", e.target.value);
                                  },
                                  placeholder: "username/my-repo",
                                  className: "w-full bg-[#070A11] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-gray-650 focus:border-blue-500 outline-none font-mono"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3350,
                                  columnNumber: 33
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3336,
                              columnNumber: 31
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-gray-400 block mb-1 font-mono uppercase font-semibold", children: lang === "ar" ? "اسم الملف" : "File Name/Path" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3364,
                                columnNumber: 33
                              }, this),
                              /* @__PURE__ */ jsxDEV(
                                "input",
                                {
                                  type: "text",
                                  value: githubPath,
                                  onChange: (e) => {
                                    setGithubPath(e.target.value);
                                    localStorage.setItem("elkholy_github_path", e.target.value);
                                  },
                                  placeholder: "elkholy_backup.json",
                                  className: "w-full bg-[#070A11] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-blue-500 outline-none font-mono"
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3367,
                                  columnNumber: 33
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3363,
                              columnNumber: 31
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3334,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-gray-400 block mb-1 font-mono uppercase font-semibold", children: lang === "ar" ? "الفرع المستهدف" : "Target Branch" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3382,
                              columnNumber: 31
                            }, this),
                            /* @__PURE__ */ jsxDEV(
                              "input",
                              {
                                type: "text",
                                value: githubBranch,
                                onChange: (e) => {
                                  setGithubBranch(e.target.value);
                                  localStorage.setItem("elkholy_github_branch", e.target.value);
                                },
                                placeholder: "main",
                                className: "w-full bg-[#070A11] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-blue-500 outline-none font-mono"
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3385,
                                columnNumber: 31
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3381,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3306,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            type: "button",
                            onClick: handleExportToGitHub,
                            disabled: isGithubExporting,
                            className: `w-full mt-2 py-2 flex items-center justify-center gap-2 rounded-xl text-[10px] font-mono tracking-widest font-bold uppercase transition-all ${isGithubExporting ? "bg-white/5 text-gray-550 cursor-not-allowed border border-white/5" : "bg-white text-black hover:bg-gray-100 cursor-pointer active:scale-98 shadow-md hover:shadow-white/5"}`,
                            children: [
                              /* @__PURE__ */ jsxDEV(Github, { className: "w-4 h-4 text-black" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3408,
                                columnNumber: 29
                              }, this),
                              isGithubExporting ? lang === "ar" ? "جاري الفحص والرفع... ⏳" : "COMMITTING SNAPSHOT... ⏳" : lang === "ar" ? "حفظ وتصدير إلى GitHub 🚀" : "PUSH TO GITHUB REPO 🚀"
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3398,
                            columnNumber: 27
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3300,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 p-4 bg-[#0B0F1A] border border-white/[0.03] hover:border-white/10 rounded-xl transition-all flex flex-col justify-between", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsxDEV("h5", { className: "text-[10.5px] uppercase font-bold text-gray-300 font-mono tracking-wider flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxDEV(Link, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3419,
                              columnNumber: 31
                            }, this),
                            lang === "ar" ? "استيراد فوري من رابط ملف خارجي / Gist" : "IMPORT DIRECTLY FROM URL / GIST"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3418,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("p", { className: "text-[10.5px] text-gray-500 leading-relaxed font-sans mt-1", children: lang === "ar" ? "يقوم هذا الخيار بجلب وتنزيل ملف نسخة احتياطية من أي رابط مباشر (رابط خام من GitHub أو Gist أو أي خادم خارجي) وتطبيقه كلحظة استعادة فورية للموقع." : "Restore complete status variables by inputting raw URL pointing to JSON catalog structure (e.g. raw.githubusercontent or raw Gist)." }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3423,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5", children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-gray-400 block font-mono uppercase font-semibold", children: lang === "ar" ? "رابط ملف الـ JSON المباشر" : "Direct JSON Backup URL" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3430,
                              columnNumber: 31
                            }, this),
                            /* @__PURE__ */ jsxDEV(
                              "input",
                              {
                                type: "text",
                                value: githubImportUrl,
                                onChange: (e) => setGithubImportUrl(e.target.value),
                                placeholder: "https://raw.githubusercontent.com/owner/repo/main/elkholy_backup.json",
                                className: "w-full bg-[#070A11] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:border-emerald-500 outline-none font-mono"
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3433,
                                columnNumber: 31
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3429,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3417,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            type: "button",
                            onClick: handleImportByUrl,
                            disabled: isGithubImporting || sessionUser?.role !== "Admin",
                            className: `w-full py-2.5 flex items-center justify-center gap-2 rounded-xl text-[10px] font-mono tracking-widest font-bold uppercase transition-all ${isGithubImporting || sessionUser?.role !== "Admin" ? "bg-white/5 text-gray-550 cursor-not-allowed border border-white/5" : "bg-[#0E1524] hover:bg-[#121c32] border border-emerald-500/30 hover:border-emerald-500 text-emerald-300 cursor-pointer active:scale-98 shadow-md"}`,
                            children: [
                              /* @__PURE__ */ jsxDEV(RefreshCw, { className: `w-3.5 h-3.5 ${isGithubImporting ? "animate-spin" : ""}` }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3453,
                                columnNumber: 29
                              }, this),
                              isGithubImporting ? lang === "ar" ? "جاري الاتصال والتحميل... ⏳" : "FETCHING DATA NODES... ⏳" : lang === "ar" ? "استيراد ومزامنة البيانات 🔄" : "FETCH & INTEGRATE DATA 🔄"
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3443,
                            columnNumber: 27
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3416,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3298,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4.5 bg-[#0B0F1A] border border-white/[0.03] hover:border-white/10 rounded-2xl transition-all space-y-3.5 mt-4 text-left", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 border-b border-white/5 pb-2", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "p-1 px-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg", children: /* @__PURE__ */ jsxDEV(Code, { className: "w-3.5 h-3.5" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3465,
                          columnNumber: 29
                        }, this) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3464,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDEV("h5", { className: "text-[11px] uppercase font-bold text-gray-200 font-mono tracking-wider", children: lang === "ar" ? "رفع كود المصدر والمشروع بالكامل للربط بـ Vercel" : "PUSH ENTIRE REACT CODEBASE FOR VERCEL DEPLOYMENT" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3468,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-550 font-mono italic", children: lang === "ar" ? "قم برفع جميع ملفات التطبيق والمشاريع للاتصال بفركل مباشرة" : "Push complete workspace structure to deploy on Vercel or Netlify dynamically" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3471,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3467,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3463,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-[10.5px] text-gray-400 leading-relaxed font-sans", children: lang === "ar" ? 'هذا القسم يتيح لك تصدير "كامل الكود البرمجي للموقع" مع جميع الإعدادات ولحظات المعرض والصور الثنائية مباشرة إلى مستودع GitHub الخاص بك. بعد إتمام الرفع، يمكنك الدخول لحساب Vercel وربط المستودع، وسيتم إطلاق موقعك الخاص فوراً وبشكل مستقل تماماً ودائم مجاناً!' : "This module fetches every single active component, translation layout, package module, assets folder, and binary picture, then processes them as a single tree commit on GitHub. Easily hook this repository into Vercel or Netlify to compile and deliver your custom storefront instantly!" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3477,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#070A11] rounded-xl border border-white/5 font-mono", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-[10px] text-gray-400", children: [
                          /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "المستودع الهدف:" : "TARGET REPOSITORY:" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3485,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold tracking-wide", children: githubRepo || (lang === "ar" ? "لم يحدد" : "Not specified") }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3486,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3484,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-[10px] text-gray-400", children: [
                          /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "الفرع المستهدف:" : "TARGET BRANCH:" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3489,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-blue-400 font-bold tracking-wide", children: githubBranch || "main" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3490,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3488,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3483,
                        columnNumber: 25
                      }, this),
                      isPushingProject && /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-indigo-950/20 border border-indigo-500/15 rounded-xl space-y-2 text-center", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 justify-center", children: [
                          /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-3.5 h-3.5 text-indigo-400 animate-spin" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3497,
                            columnNumber: 31
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[10.5px] font-mono text-indigo-300 font-bold uppercase tracking-widest", children: lang === "ar" ? "جاري تجهيز وتصدير المشروع... ⏳" : "PUSHING SYSTEM FILES... ⏳" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3498,
                            columnNumber: 31
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3496,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] font-mono text-gray-400 leading-relaxed", children: projectPushStep }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3502,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3495,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          type: "button",
                          onClick: handlePushEntireProjectToGitHub,
                          disabled: isPushingProject || !githubRepo.trim() || !githubToken.trim(),
                          className: `w-full py-3 flex items-center justify-center gap-2 rounded-xl text-[10.5px] font-mono tracking-widest font-extrabold uppercase transition-all ${isPushingProject || !githubRepo.trim() || !githubToken.trim() ? "bg-white/5 text-gray-550 border border-white/5 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-550 hover:to-indigo-550 text-white cursor-pointer active:scale-98 shadow-md hover:shadow-indigo-500/10"}`,
                          children: [
                            /* @__PURE__ */ jsxDEV(Github, { className: "w-4 h-4 text-white" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3518,
                              columnNumber: 27
                            }, this),
                            isPushingProject ? lang === "ar" ? "جاري الرفع... 🚀" : "EXECUTING ATOMIC COMMIT... 🚀" : lang === "ar" ? "إطلاق ورفع كود الموقع بالكامل إلى GitHub 🚀💻" : "PUSH FULL REACTION ENGINE TO GITHUB 🚀💻"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3508,
                          columnNumber: 25
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3462,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 3279,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 3187,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1832,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AdminPanel.tsx",
              lineNumber: 1747,
              columnNumber: 13
            }, this)
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/AdminPanel.tsx",
            lineNumber: 1669,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/AdminPanel.tsx",
        lineNumber: 1619,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/AdminPanel.tsx",
    lineNumber: 1592,
    columnNumber: 5
  }, this);
}
const MOCK_HISTORICAL_SALES = [
  // January 2026 (Month 1)
  {
    id: "HIST-M1-01",
    code: "sport-cybersport-v4",
    name: "ElKholy CyberSport V4",
    type: "motorcycle",
    customerName: "أحمد محمود العاصي",
    customerPhone: "01099887766",
    quantity: 1,
    unitPrice: 45e3,
    totalPrice: 45e3,
    date: "2026-01-12"
  },
  {
    id: "HIST-M1-02",
    code: "PRD-MTL710",
    name: "زيت موتول 7100 10W40 تخليقي 1 لتر",
    type: "product",
    customerName: "محمد عبد الله",
    customerPhone: "01122334455",
    quantity: 3,
    unitPrice: 850,
    totalPrice: 2550,
    date: "2026-01-18"
  },
  {
    id: "HIST-M1-03",
    code: "PRD-AGVK1S",
    name: "خوذة أي جي في K1 S الرياضية الأصلية",
    type: "product",
    customerName: "كريم أشرف",
    customerPhone: "01233445566",
    quantity: 1,
    unitPrice: 11500,
    totalPrice: 11500,
    date: "2026-01-25"
  },
  // February 2026 (Month 2)
  {
    id: "HIST-M2-01",
    code: "cruiser-cybercruiser-x1",
    name: "ElKholy CyberCruiser X1",
    type: "motorcycle",
    customerName: "محمود الصاوي",
    customerPhone: "01566778899",
    quantity: 1,
    unitPrice: 38e3,
    totalPrice: 38e3,
    date: "2026-02-05"
  },
  {
    id: "HIST-M2-02",
    code: "PRD-SPCPRO",
    name: "حامل جوال إس بي كونكت برو للدراجات",
    type: "product",
    customerName: "سامح غالي",
    customerPhone: "01011223344",
    quantity: 2,
    unitPrice: 2200,
    totalPrice: 4400,
    date: "2026-02-14"
  },
  {
    id: "HIST-M2-03",
    code: "PRD-CRDPTK",
    name: "انتركوم كاردو باك توك ايدج ثنائي أصلي",
    type: "product",
    customerName: "وائل عزت",
    customerPhone: "01155443322",
    quantity: 1,
    unitPrice: 18900,
    totalPrice: 18900,
    date: "2026-02-22"
  },
  // March 2026 (Month 3)
  {
    id: "HIST-M3-01",
    code: "scooter-cyberscooter-s2",
    name: "ElKholy CyberScooter S2",
    type: "motorcycle",
    customerName: "ياسر الطوخي",
    customerPhone: "01288776655",
    quantity: 1,
    unitPrice: 16e3,
    totalPrice: 16e3,
    date: "2026-03-08"
  },
  {
    id: "HIST-M3-02",
    code: "PRD-NGKIRD",
    name: "بوجيه ان جي كي ايريديوم رياضي فائق الأداء",
    type: "product",
    customerName: "عمرو أديب",
    customerPhone: "01022334455",
    quantity: 4,
    unitPrice: 450,
    totalPrice: 1800,
    date: "2026-03-15"
  },
  {
    id: "HIST-M3-03",
    code: "PRD-YASBAT",
    name: "بطارية يواسا اليابانية أصلية خالية من الصيانة",
    type: "product",
    customerName: "هاني شاكر",
    customerPhone: "01144332211",
    quantity: 1,
    unitPrice: 2400,
    totalPrice: 2400,
    date: "2026-03-29"
  },
  // April 2026 (Month 4)
  {
    id: "HIST-M4-01",
    code: "touring-cyberadventure-v8",
    name: "ElKholy CyberAdventure V8",
    type: "motorcycle",
    customerName: "خالد الجندي",
    customerPhone: "01599887766",
    quantity: 1,
    unitPrice: 52e3,
    totalPrice: 52e3,
    date: "2026-04-10"
  },
  {
    id: "HIST-M4-02",
    code: "PRD-LQM4T1",
    name: "زيت ليكوي مولي الألماني 10W50 للطرقات 1 لتر",
    type: "product",
    customerName: "أشرف زكي",
    customerPhone: "01066554433",
    quantity: 5,
    unitPrice: 780,
    totalPrice: 3900,
    date: "2026-04-18"
  },
  {
    id: "HIST-M4-03",
    code: "PRD-XIAAIR",
    name: "منفاخ إطارات شاومي الكهربائي المحمول 2",
    type: "product",
    customerName: "إسلام صبحي",
    customerPhone: "01277665544",
    quantity: 2,
    unitPrice: 1850,
    totalPrice: 3700,
    date: "2026-04-26"
  },
  // May 2026 (Month 5)
  {
    id: "HIST-M5-01",
    code: "sport-cybersport-v4",
    name: "ElKholy CyberSport V4",
    type: "motorcycle",
    customerName: "أيمن نور",
    customerPhone: "01188990011",
    quantity: 1,
    unitPrice: 45e3,
    totalPrice: 45e3,
    date: "2026-05-02"
  },
  {
    id: "HIST-M5-02",
    code: "PRD-ALPGLV",
    name: "قفازات البين ستارز GP Pro V2 جلد سباقات الكاربون",
    type: "product",
    customerName: "هشام عباس",
    customerPhone: "01544332211",
    quantity: 1,
    unitPrice: 4800,
    totalPrice: 4800,
    date: "2026-05-15"
  },
  {
    id: "HIST-M5-03",
    code: "PRD-MCHRD6",
    name: "إطار كاوتش ميشلان رود 6 أمامي استيراد",
    type: "product",
    customerName: "حسن شاكوش",
    customerPhone: "01011335577",
    quantity: 2,
    unitPrice: 6800,
    totalPrice: 13600,
    date: "2026-05-24"
  },
  // June 2026 (Month 6)
  {
    id: "HIST-M6-01",
    code: "scooter-cyberscooter-s2",
    name: "ElKholy CyberScooter S2",
    type: "motorcycle",
    customerName: "بهاء سلطان",
    customerPhone: "01244556677",
    quantity: 1,
    unitPrice: 16e3,
    totalPrice: 16e3,
    date: "2026-06-01"
  },
  {
    id: "HIST-M6-02",
    code: "PRD-DNSR4J",
    name: "جاكيت دانيز ريسينج 4 جلدي فاخر - أسود وذهبي",
    type: "product",
    customerName: "تامر حسني",
    customerPhone: "01177665544",
    quantity: 1,
    unitPrice: 18500,
    totalPrice: 18500,
    date: "2026-06-03"
  },
  {
    id: "HIST-M6-03",
    code: "PRD-MTLCHL",
    name: "اسبراي مشحم جنزير موتول C2 حجم 400 مل",
    type: "product",
    customerName: "عمرو دياب",
    customerPhone: "01020304050",
    quantity: 4,
    unitPrice: 450,
    totalPrice: 1800,
    date: "2026-06-04"
  }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFkbWluUGFuZWwudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBcbiAgWCwgTG9jaywgS2V5LCBTaGllbGRDaGVjaywgRGF0YWJhc2UsIFVwbG9hZCwgRXllLCBFeWVPZmYsIEZpbGVUZXh0LCBQbHVzLCBUcmFzaDIsIFxuICBFZGl0MiwgQ2hlY2ssIFNwYXJrbGVzLCBGb2xkZXJPcGVuLCBVc2VycywgU2V0dGluZ3MsIEFsZXJ0Q2lyY2xlLCBUcmVuZGluZ1VwLCBcbiAgQ29pbnMsIEFjdGl2aXR5LCBDYWxlbmRhciwgTWVzc2FnZVNxdWFyZSwgQXJyb3dVcFJpZ2h0LCBDaGVja0NpcmNsZTIsXG4gIFRyYXNoLCBMb2dPdXQsIFNoaWVsZEFsZXJ0LCBTaG9wcGluZ0JhZywgUGFja2FnZSwgRG93bmxvYWQsIFNlYXJjaCwgR2l0aHViLCBMaW5rLCBSZWZyZXNoQ3csIENvZGVcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IE1vdG9yY3ljbGUsIENhdGVnb3J5U2x1ZywgVXNlclJvbGUsIFVzZXJBY2NvdW50LCBBZGRPbiwgSG9tZXBhZ2VDb25maWcsIFN0b3JlUHJvZHVjdCwgU3RvcmVDYXRlZ29yeSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHVzZUxhbmd1YWdlIH0gZnJvbSAnLi4vY29udGV4dC9MYW5ndWFnZUNvbnRleHQnO1xuaW1wb3J0IHsgREVGQVVMVF9IT01FUEFHRV9DT05GSUcgfSBmcm9tICcuLi9kYXRhJztcbmltcG9ydCBIb21lcGFnZVBhZ2VCdWlsZGVyIGZyb20gJy4vSG9tZXBhZ2VQYWdlQnVpbGRlcic7XG5pbXBvcnQgU3RvcmVBZG1pblBhbmVsIGZyb20gJy4vU3RvcmVBZG1pblBhbmVsJztcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi4vbGliL2ZpcmViYXNlJztcbmltcG9ydCB7IGNvbGxlY3Rpb24sIGRvYywgc2V0RG9jLCBkZWxldGVEb2MsIGdldERvY3MgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xuaW1wb3J0ICogYXMgWExTWCBmcm9tICd4bHN4JztcbmltcG9ydCB7IFFSQ29kZVNWRyB9IGZyb20gJ3FyY29kZS5yZWFjdCc7XG5pbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnO1xuXG5pbnRlcmZhY2UgQWRtaW5QYW5lbFByb3BzIHtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgbW90b3JjeWNsZXM6IE1vdG9yY3ljbGVbXTtcbiAgb25VcGRhdGVNb3RvcmN5Y2xlczogKHVwZGF0ZWRCaWtlczogTW90b3JjeWNsZVtdKSA9PiB2b2lkO1xuICBzdG9yZVByb2R1Y3RzPzogU3RvcmVQcm9kdWN0W107XG4gIG9uVXBkYXRlU3RvcmVQcm9kdWN0cz86ICh1cGRhdGVkOiBTdG9yZVByb2R1Y3RbXSkgPT4gdm9pZDtcbiAgY3VzdG9tVGV4dDogYW55O1xuICBvblVwZGF0ZUN1c3RvbVRleHQ6ICh0ZXh0OiBhbnkpID0+IHZvaWQ7XG4gIGhvbWVwYWdlQ29uZmlnPzogSG9tZXBhZ2VDb25maWc7XG4gIG9uVXBkYXRlSG9tZXBhZ2VDb25maWc/OiAoY29uZmlnOiBIb21lcGFnZUNvbmZpZykgPT4gdm9pZDtcbn1cblxuaW50ZXJmYWNlIFRvYXN0TWVzc2FnZSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgdHlwZTogJ3N1Y2Nlc3MnIHwgJ2Vycm9yJyB8ICdpbmZvJztcbn1cblxuY29uc3QgREVGQVVMVF9VU0VSUzogVXNlckFjY291bnRbXSA9IFtcbiAgeyB1c2VybmFtZTogJ0hPU05ZMTk5NScsIHBhc3N3b3JkOiAnSGhybTAxMDE5OTVFTGVsa2hvbHknLCByb2xlOiAnQWRtaW4nIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFkbWluUGFuZWwoe1xuICBvbkNsb3NlLFxuICBtb3RvcmN5Y2xlcyxcbiAgb25VcGRhdGVNb3RvcmN5Y2xlcyxcbiAgc3RvcmVQcm9kdWN0cyA9IFtdLFxuICBvblVwZGF0ZVN0b3JlUHJvZHVjdHMsXG4gIGN1c3RvbVRleHQsXG4gIG9uVXBkYXRlQ3VzdG9tVGV4dCxcbiAgaG9tZXBhZ2VDb25maWcgPSBERUZBVUxUX0hPTUVQQUdFX0NPTkZJRyxcbiAgb25VcGRhdGVIb21lcGFnZUNvbmZpZyxcbn06IEFkbWluUGFuZWxQcm9wcykge1xuICBjb25zdCB7IGxhbmcsIGRpciwgdCB9ID0gdXNlTGFuZ3VhZ2UoKTtcblxuICAvLyBBdXRoZW50aWNhdGlvbiAmIENvcmUgU2Vzc2lvbiBTdGF0ZVxuICBjb25zdCBbc2Vzc2lvblVzZXIsIHNldFNlc3Npb25Vc2VyXSA9IHVzZVN0YXRlPFVzZXJBY2NvdW50IHwgbnVsbD4oKCkgPT4ge1xuICAgIGNvbnN0IHNhdmVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Vsa2hvbHlfc2Vzc2lvbl91c2VyJyk7XG4gICAgcmV0dXJuIHNhdmVkID8gSlNPTi5wYXJzZShzYXZlZCkgOiBudWxsO1xuICB9KTtcblxuICBjb25zdCBbdXNlcm5hbWVJbnB1dCwgc2V0VXNlcm5hbWVJbnB1dF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtwYXNzd29yZElucHV0LCBzZXRQYXNzd29yZElucHV0XSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3Nob3dQYXNzd29yZCwgc2V0U2hvd1Bhc3N3b3JkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBVc2VyIEFjY291bnRzIFN0YXRlIChwZXJzaXN0ZWQgaW5zaWRlIGxvY2FsU3RvcmFnZSlcbiAgY29uc3QgW3VzZXJzLCBzZXRVc2Vyc10gPSB1c2VTdGF0ZTxVc2VyQWNjb3VudFtdPigoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZWxraG9seV91c2VycycpO1xuICAgIGlmIChzYXZlZCkgcmV0dXJuIEpTT04ucGFyc2Uoc2F2ZWQpO1xuICAgIC8vIFBlcnNpc3QgZGVmYXVsdHMgb24gZmlyc3QgcnVuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfdXNlcnMnLCBKU09OLnN0cmluZ2lmeShERUZBVUxUX1VTRVJTKSk7XG4gICAgcmV0dXJuIERFRkFVTFRfVVNFUlM7XG4gIH0pO1xuXG4gIC8vIFNpZGViYXIgbmF2aWdhdGlvbiBwYW5lbDogJ2Rhc2hib2FyZCcgfCAnbW90b3JjeWNsZXMnIHwgJ3N0b3JlJyB8ICd1c2VycycgfCAnc2V0dGluZ3MnIHwgJ2hvbWVfZWRpdG9yJ1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGU8J2Rhc2hib2FyZCcgfCAnbW90b3JjeWNsZXMnIHwgJ3N0b3JlJyB8ICd1c2VycycgfCAnc2V0dGluZ3MnIHwgJ2hvbWVfZWRpdG9yJz4oJ2Rhc2hib2FyZCcpO1xuXG4gIGNvbnN0IGNhbkFjY2VzcyA9ICh0YWI6IHN0cmluZykgPT4ge1xuICAgIGlmIChzZXNzaW9uVXNlcj8ucm9sZSA9PT0gJ0FkbWluJykgcmV0dXJuIHRydWU7XG4gICAgaWYgKHNlc3Npb25Vc2VyPy5yb2xlID09PSAnTWFuYWdlcicpIHJldHVybiBbJ2Rhc2hib2FyZCcsICdtb3RvcmN5Y2xlcycsICdzdG9yZSddLmluY2x1ZGVzKHRhYik7XG4gICAgaWYgKHNlc3Npb25Vc2VyPy5yb2xlID09PSAnU3RhZmYnKSByZXR1cm4gWydtb3RvcmN5Y2xlcycsICdzdG9yZSddLmluY2x1ZGVzKHRhYik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8vIEVuc3VyZSBhY3RpdmUgbm9kZSByb2xlIGlzIGFwcHJvcHJpYXRlIGFmdGVyIHNlc3Npb24gbG9hZCBpZiB1c2VyIGlzIHJlc3RyaWN0ZWRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoc2Vzc2lvblVzZXIgJiYgIWNhbkFjY2VzcyhhY3RpdmVUYWIpKSB7XG4gICAgICBpZiAoc2Vzc2lvblVzZXIucm9sZSA9PT0gJ01hbmFnZXInKSBzZXRBY3RpdmVUYWIoJ2Rhc2hib2FyZCcpO1xuICAgICAgZWxzZSBzZXRBY3RpdmVUYWIoJ21vdG9yY3ljbGVzJyk7XG4gICAgfVxuICB9LCBbc2Vzc2lvblVzZXIsIGFjdGl2ZVRhYl0pO1xuXG4gIC8vIEJvb2tpbmdzIHF1ZXVlIHN0YXRlXG4gIGNvbnN0IFtib29raW5ncywgc2V0Qm9va2luZ3NdID0gdXNlU3RhdGU8YW55W10+KCgpID0+IHtcbiAgICBjb25zdCBzYXZlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbGtob2x5X2Jvb2tpbmdzJyk7XG4gICAgcmV0dXJuIHNhdmVkID8gSlNPTi5wYXJzZShzYXZlZCkgOiBbXTtcbiAgfSk7XG5cbiAgLy8gVG9hc3RzIGxpc3Qgc3RhdGVcbiAgY29uc3QgW3RvYXN0cywgc2V0VG9hc3RzXSA9IHVzZVN0YXRlPFRvYXN0TWVzc2FnZVtdPihbXSk7XG5cbiAgLy8gR2l0SHViIEludGVncmF0aW9uIFN0YXRlc1xuICBjb25zdCBbZ2l0aHViVG9rZW4sIHNldEdpdGh1YlRva2VuXSA9IHVzZVN0YXRlKCgpID0+IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbGtob2x5X2dpdGh1Yl90b2tlbicpIHx8ICcnKTtcbiAgY29uc3QgW2dpdGh1YlJlcG8sIHNldEdpdGh1YlJlcG9dID0gdXNlU3RhdGUoKCkgPT4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Vsa2hvbHlfZ2l0aHViX3JlcG8nKSB8fCAnJyk7XG4gIGNvbnN0IFtnaXRodWJCcmFuY2gsIHNldEdpdGh1YkJyYW5jaF0gPSB1c2VTdGF0ZSgoKSA9PiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZWxraG9seV9naXRodWJfYnJhbmNoJykgfHwgJ21haW4nKTtcbiAgY29uc3QgW2dpdGh1YlBhdGgsIHNldEdpdGh1YlBhdGhdID0gdXNlU3RhdGUoKCkgPT4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Vsa2hvbHlfZ2l0aHViX3BhdGgnKSB8fCAnZWxraG9seV9iYWNrdXAuanNvbicpO1xuICBjb25zdCBbZ2l0aHViSW1wb3J0VXJsLCBzZXRHaXRodWJJbXBvcnRVcmxdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbaXNHaXRodWJFeHBvcnRpbmcsIHNldElzR2l0aHViRXhwb3J0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzR2l0aHViSW1wb3J0aW5nLCBzZXRJc0dpdGh1YkltcG9ydGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc1B1c2hpbmdQcm9qZWN0LCBzZXRJc1B1c2hpbmdQcm9qZWN0XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Byb2plY3RQdXNoU3RlcCwgc2V0UHJvamVjdFB1c2hTdGVwXSA9IHVzZVN0YXRlKCcnKTtcblxuICAvLyBEYXNoYm9hcmQgY2F0ZWdvcnkgZmlsdGVyXG4gIGNvbnN0IFtkYXNoQ2F0ZWdvcnlGaWx0ZXIsIHNldERhc2hDYXRlZ29yeUZpbHRlcl0gPSB1c2VTdGF0ZTwnQWxsJyB8ICdBJyB8ICdCJyB8ICdDJyB8ICdTJz4oJ0FsbCcpO1xuICAvLyBEYXNoYm9hcmQgbW90b3JjeWNsZSBzZWFyY2ggdGVybVxuICBjb25zdCBbYmlrZVNlYXJjaFRlcm0sIHNldEJpa2VTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKCcnKTtcblxuICAvLyBNdWx0aS10YWIgc3ViLWxheW91dCBzdGF0ZSBmb3IgRWRpdC9BZGQgZm9ybXNcbiAgY29uc3QgW2Zvcm1TdWJUYWIsIHNldEZvcm1TdWJUYWJdID0gdXNlU3RhdGU8J2Jhc2ljJyB8ICdwcmljaW5nJyB8ICdjYXRhbG9nJyB8ICdhZGRvbnMnIHwgJ3JlbGF0ZWQnPignYmFzaWMnKTtcblxuICAvLyBOZXcgYWNjZXNzb3J5IGNyZWF0aW9uIHRlbXAgc3RhdGVcbiAgY29uc3QgW25ld0FkZE9uLCBzZXROZXdBZGRPbl0gPSB1c2VTdGF0ZTxBZGRPbj4oe1xuICAgIGlkOiAnJyxcbiAgICBuYW1lOiAnJyxcbiAgICBuYW1lQXI6ICcnLFxuICAgIGltYWdlOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NTg5ODE4MDYtZWM1MjdmYTg0YzM5P2F1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAmdz0xNTAnLFxuICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICBkZXNjQXI6ICcnLFxuICAgIHByaWNlOiAwXG4gIH0pO1xuXG4gIC8vIEJpa2UgRm9ybSBTdGF0ZXNcbiAgY29uc3QgW2VkaXRpbmdCaWtlLCBzZXRFZGl0aW5nQmlrZV0gPSB1c2VTdGF0ZTxNb3RvcmN5Y2xlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc0FkZGluZ05ldywgc2V0SXNBZGRpbmdOZXddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYmlrZUZvcm0sIHNldEJpa2VGb3JtXSA9IHVzZVN0YXRlKHtcbiAgICBpZDogJycsXG4gICAgbmFtZTogJycsXG4gICAgY2F0ZWdvcnk6ICdBJyBhcyBDYXRlZ29yeVNsdWcsXG4gICAgY2F0ZWdvcnlOYW1lOiAnU3BvcnQnLFxuICAgIHByaWNlOiAnJDQ1LDAwMCcsXG4gICAgcHJpY2VOdW06IDQ1MDAwLFxuICAgIGltYWdlOiAnJyxcbiAgICB0YWdsaW5lOiAnUmlkZSB0aGUgRnV0dXJlJyxcbiAgICBzaG9ydERlc2M6ICcnLFxuICAgIGxvbmdEZXNjOiAnJyxcbiAgICBpc1BvcHVsYXI6IGZhbHNlLFxuICAgIHNwZWNzOiB7XG4gICAgICBlbmdpbmU6ICcxMjAwY2MgU29saWQtU3RhdGUgSHViJyxcbiAgICAgIHRvcFNwZWVkOiAnMzIwIGttL2gnLFxuICAgICAgZnVlbENvbnN1bXB0aW9uOiAnMC4wIEwvMTAwa20nLFxuICAgICAgcG93ZXI6ICcxOTAgaHAnLFxuICAgICAgd2VpZ2h0OiAnMTcwIGtnJ1xuICAgIH0sXG4gICAgaXNDdXN0b206IHRydWUsXG4gICAgY2F0YWxvZ0ZpbGVOYW1lOiAnJyxcbiAgICBjYXRhbG9nRmlsZUNvbnRlbnQ6ICcnLFxuICAgIG9yaWdpbmFsUHJpY2U6IDQ1MDAwIGFzIG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBkaXNjb3VudDogMCBhcyBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgZGlzY291bnRUeXBlOiAncGVyY2VudGFnZScgYXMgJ3BlcmNlbnRhZ2UnIHwgJ2ZpeGVkJyxcbiAgICBvZmZlckxhYmVsOiAnJyxcbiAgICBhZGRPbnM6IFtdIGFzIEFkZE9uW10sXG4gICAgc2VyaWFsQ29kZTogJycsXG4gIH0pO1xuXG4gIGNvbnN0IFtzZWFyY2hUZXJtLCBzZXRTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3NlbGVjdGVkQ2F0ZWdvcnksIHNldFNlbGVjdGVkQ2F0ZWdvcnldID0gdXNlU3RhdGU8U3RvcmVDYXRlZ29yeSB8ICdBTEwnPignQUxMJyk7XG5cbiAgLy8gVXNlcnMgY3JlYXRpb24gc3RhdGVcbiAgY29uc3QgW25ld1VzZXJuYW1lLCBzZXROZXdVc2VybmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtuZXdQYXNzd29yZCwgc2V0TmV3UGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbmV3Um9sZSwgc2V0TmV3Um9sZV0gPSB1c2VTdGF0ZTxVc2VyUm9sZT4oJ1N0YWZmJyk7XG5cbiAgLy8gSG9tZSBkZXRhaWxzIHRleHQgZm9ybVxuICBjb25zdCBbdGV4dEZvcm0sIHNldFRleHRGb3JtXSA9IHVzZVN0YXRlKHtcbiAgICBhclRpdGxlOiBjdXN0b21UZXh0Py5hclRpdGxlIHx8ICfYp9mE2K7ZiNmE2YonLFxuICAgIGFyVGl0bGVBY2NlbnQ6IGN1c3RvbVRleHQ/LmFyVGl0bGVBY2NlbnQgfHwgJ9mF2YjYqtmI2LHYsicsXG4gICAgZW5UaXRsZTogY3VzdG9tVGV4dD8uZW5UaXRsZSB8fCAnRUxLSE9MWScsXG4gICAgZW5UaXRsZUFjY2VudDogY3VzdG9tVGV4dD8uZW5UaXRsZUFjY2VudCB8fCAnTU9UT1JTJyxcbiAgICBhclNsb2dhbjogY3VzdG9tVGV4dD8uYXJTbG9nYW4gfHwgJ9iz2KfYqNmCINmF2Lkg2KfZhNmF2LPYqtmC2KjZhCcsXG4gICAgZW5TbG9nYW46IGN1c3RvbVRleHQ/LmVuU2xvZ2FuIHx8ICdSaWRlIHRoZSBGdXR1cmUnLFxuICAgIGFySGVyb0Rlc2M6IGN1c3RvbVRleHQ/LmFySGVyb0Rlc2MgfHwgJ9in2YbYttmFINil2YTZiSDYudin2YTZhSDYp9mE2LrYry4g2KrZgtiv2YUg2KfZhNiu2YjZhNmKINmF2YjYqtmI2LHYsiDYo9mC2YjZiSDYp9mE2YXZiNiq2YjYs9mK2YPZhNin2Kog2YjYp9mE2KfYs9mD2YjYqtix2KfYqiDZgdin2KbZgtipINin2YTYo9iv2KfYoSDZhNmE2YXYs9iq2YLYqNmELiDYp9iz2KrZg9i02YEg2YPYqtin2YTZiNis2KfYqtmG2KfYjCDZiNin2YLYsdijINin2YTZhdmI2KfYtdmB2KfYqiDZiNin2K3YrNiyINix2K3ZhNiq2YMg2YXYqNin2LTYsdipLicsXG4gICAgZW5IZXJvRGVzYzogY3VzdG9tVGV4dD8uZW5IZXJvRGVzYyB8fCAnU3RlcCBpbnNpZGUgdGhlIHZpcnR1YWwgZ3JpZC4gRWxLaG9seSBNb3RvcnMgaW50cm9kdWNlcyBleHRyZW1lLW91dHB1dCBzb2xpZC1zdGF0ZSBwZXJmb3JtYW5jZSBiaWtlcywgcGxhc21hIHRvdXJpbmcgYWR2ZW50dXJlcnMsIGFuZCBoaWdoLWZpZGVsaXR5IHNtYXJ0IHVyYmFuIHNjb290ZXJzIGRlc2lnbmVkIGluIDIwMjYuIEV4cGxvcmUgb3VyIGNhdGFsb2csIHJldmlldyBibHVlcHJpbnRzLCBhbmQgYm9vayBhIHNlY3VyZSByaWRlIGRpcmVjdGx5LicsXG4gICAgYXJCYWRnZTogY3VzdG9tVGV4dD8uYXJCYWRnZSB8fCAn2KPZiNmEINmF2LnYsdi2INmD2KjYp9ixINin2YTYtNiu2LXZitin2Kog2KjZhdi12LEnLFxuICAgIGVuQmFkZ2U6IGN1c3RvbVRleHQ/LmVuQmFkZ2UgfHwgXCJFR1lQVCdTIEZJUlNUIENIUk9OT1MgU0hPV1JPT01cIixcbiAgfSk7XG5cbiAgLy8gRHluYW1pYyBwYWdlIGJ1aWxkZXIgc3RhdGUgbWFuYWdlbWVudFxuICBjb25zdCBbYnVpbGRlckNvbmZpZywgc2V0QnVpbGRlckNvbmZpZ10gPSB1c2VTdGF0ZTxIb21lcGFnZUNvbmZpZz4oaG9tZXBhZ2VDb25maWcpO1xuICBjb25zdCBbaGlzdG9yeSwgc2V0SGlzdG9yeV0gPSB1c2VTdGF0ZTxIb21lcGFnZUNvbmZpZ1tdPihbaG9tZXBhZ2VDb25maWddKTtcbiAgY29uc3QgW2hpc3RvcnlJbmRleCwgc2V0SGlzdG9yeUluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbdGVtcGxhdGVzLCBzZXRUZW1wbGF0ZXNdID0gdXNlU3RhdGU8e25hbWU6IHN0cmluZywgY29uZmlnOiBIb21lcGFnZUNvbmZpZ31bXT4oKCkgPT4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbGtob2x5X3RlbXBsYXRlcycpO1xuICAgIHJldHVybiBsb2FkZWQgPyBKU09OLnBhcnNlKGxvYWRlZCkgOiBbXTtcbiAgfSk7XG4gIGNvbnN0IFtuZXdUZW1wbGF0ZU5hbWUsIHNldE5ld1RlbXBsYXRlTmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFthY3RpdmVCdWlsZGVyVGFiLCBzZXRBY3RpdmVCdWlsZGVyVGFiXSA9IHVzZVN0YXRlPCdmb250cycgfCAndGhlbWUnIHwgJ2hlYWRlcicgfCAnbWFpbicgfCAnZm9vdGVyJyB8ICd0ZW1wbGF0ZXMnPignaGVhZGVyJyk7XG5cbiAgLy8gU3luYyBzdGF0ZSBpZiBvdXR3YXJkIHByb3AgY2hhbmdlc1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChob21lcGFnZUNvbmZpZykge1xuICAgICAgc2V0QnVpbGRlckNvbmZpZyhob21lcGFnZUNvbmZpZyk7XG4gICAgfVxuICB9LCBbaG9tZXBhZ2VDb25maWddKTtcblxuICAvLyBNdWx0aS1zdGF0ZSBjb25maWd1cmF0aW9uIHVwZGF0ZSBoZWxwZXJcbiAgY29uc3QgdXBkYXRlQnVpbGRlckNvbmZpZyA9IChuZXdDb25maWc6IEhvbWVwYWdlQ29uZmlnKSA9PiB7XG4gICAgY29uc3QgbmV4dEhpc3RvcnkgPSBoaXN0b3J5LnNsaWNlKDAsIGhpc3RvcnlJbmRleCArIDEpO1xuICAgIG5leHRIaXN0b3J5LnB1c2gobmV3Q29uZmlnKTtcbiAgICBzZXRIaXN0b3J5KG5leHRIaXN0b3J5KTtcbiAgICBzZXRIaXN0b3J5SW5kZXgobmV4dEhpc3RvcnkubGVuZ3RoIC0gMSk7XG4gICAgc2V0QnVpbGRlckNvbmZpZyhuZXdDb25maWcpO1xuICAgIGlmIChvblVwZGF0ZUhvbWVwYWdlQ29uZmlnKSB7XG4gICAgICBvblVwZGF0ZUhvbWVwYWdlQ29uZmlnKG5ld0NvbmZpZyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVVuZG8gPSAoKSA9PiB7XG4gICAgaWYgKGhpc3RvcnlJbmRleCA+IDApIHtcbiAgICAgIGNvbnN0IHByZXZJbmRleCA9IGhpc3RvcnlJbmRleCAtIDE7XG4gICAgICBzZXRIaXN0b3J5SW5kZXgocHJldkluZGV4KTtcbiAgICAgIHNldEJ1aWxkZXJDb25maWcoaGlzdG9yeVtwcmV2SW5kZXhdKTtcbiAgICAgIGlmIChvblVwZGF0ZUhvbWVwYWdlQ29uZmlnKSB7XG4gICAgICAgIG9uVXBkYXRlSG9tZXBhZ2VDb25maWcoaGlzdG9yeVtwcmV2SW5kZXhdKTtcbiAgICAgIH1cbiAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YUg2KfZhNiq2LHYp9is2Lkg2LnZhiDYp9mE2KrYudiv2YrZhCcgOiAnRGVzaWduIHVuZG9uZSBzdWNjZXNzZnVsbHknLCAnaW5mbycpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZWRvID0gKCkgPT4ge1xuICAgIGlmIChoaXN0b3J5SW5kZXggPCBoaXN0b3J5Lmxlbmd0aCAtIDEpIHtcbiAgICAgIGNvbnN0IG5leHRJbmRleCA9IGhpc3RvcnlJbmRleCArIDE7XG4gICAgICBzZXRIaXN0b3J5SW5kZXgobmV4dEluZGV4KTtcbiAgICAgIHNldEJ1aWxkZXJDb25maWcoaGlzdG9yeVtuZXh0SW5kZXhdKTtcbiAgICAgIGlmIChvblVwZGF0ZUhvbWVwYWdlQ29uZmlnKSB7XG4gICAgICAgIG9uVXBkYXRlSG9tZXBhZ2VDb25maWcoaGlzdG9yeVtuZXh0SW5kZXhdKTtcbiAgICAgIH1cbiAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YXYqiDYpdi52KfYr9ipINiq2LfYqNmK2YIg2KfZhNiq2LnYr9mK2YQnIDogJ0Rlc2lnbiByZWRvbmUgc3VjY2Vzc2Z1bGx5JywgJ2luZm8nKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2F2ZVRlbXBsYXRlID0gKCkgPT4ge1xuICAgIGlmICghbmV3VGVtcGxhdGVOYW1lLnRyaW0oKSkge1xuICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2YrYsdis2Ykg2KXYr9iu2KfZhCDYp9iz2YUg2KfZhNmC2KfZhNioINij2YjZhNin2YsnIDogJ1RlbXBsYXRlIG5hbWUgY2Fubm90IGJlIGVtcHR5JywgJ2Vycm9yJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHVwZGF0ZWQgPSBbLi4udGVtcGxhdGVzLCB7IG5hbWU6IG5ld1RlbXBsYXRlTmFtZS50cmltKCksIGNvbmZpZzogYnVpbGRlckNvbmZpZyB9XTtcbiAgICBzZXRUZW1wbGF0ZXModXBkYXRlZCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfdGVtcGxhdGVzJywgSlNPTi5zdHJpbmdpZnkodXBkYXRlZCkpO1xuICAgIHNldE5ld1RlbXBsYXRlTmFtZSgnJyk7XG4gICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDYrdmB2Lgg2YfYsNinINin2YTYqtmF2YjYtti5INmB2Yog2YLYp9im2YXYqSDZgtmI2KfZhNio2YMg2KjZhtis2KfYrSEnIDogJ0N1cnJlbnQgbWF0cml4IHNhdmVkIGFzIGN1c3RvbSB0ZW1wbGF0ZSEnLCAnc3VjY2VzcycpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFwcGx5VGVtcGxhdGUgPSAoY29uZmlnOiBIb21lcGFnZUNvbmZpZykgPT4ge1xuICAgIHVwZGF0ZUJ1aWxkZXJDb25maWcoY29uZmlnKTtcbiAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmFINiq2K3ZhdmK2YQg2KfZhNmC2KfZhNioINmI2KrYq9io2YrYqtmHIScgOiAnVGVtcGxhdGUgZGVwbG95ZWQgYXMgYWN0aXZlIG1hdHJpeCEnLCAnc3VjY2VzcycpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlbW92ZVRlbXBsYXRlID0gKGlkeDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgdXBkYXRlZCA9IHRlbXBsYXRlcy5maWx0ZXIoKF8sIGkpID0+IGkgIT09IGlkeCk7XG4gICAgc2V0VGVtcGxhdGVzKHVwZGF0ZWQpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X3RlbXBsYXRlcycsIEpTT04uc3RyaW5naWZ5KHVwZGF0ZWQpKTtcbiAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmFINit2LDZgSDYp9mE2YLYp9mE2Kgg2KfZhNmF2K7Yqtin2LEnIDogJ1NlbGVjdGVkIHRlbXBsYXRlIGRlbGV0ZWQnLCAnaW5mbycpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlc2V0VG9EZWZhdWx0ID0gKCkgPT4ge1xuICAgIHVwZGF0ZUJ1aWxkZXJDb25maWcoREVGQVVMVF9IT01FUEFHRV9DT05GSUcpO1xuICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YXYqiDYpdi52KfYr9ipINiq2YfZitim2Kkg2KfZhNmF2LnYp9mK2YbYqSDZhNmE2LPZhdin2Kog2KfZhNin2YHYqtix2KfYttmK2Kkg2YTZhNmF2LnYsdi2JyA6ICdSZXNldCBpbnRlcmFjdGl2ZSBzaG93Y2FzZSBzdHlsZSBkZWNrJywgJ2luZm8nKTtcbiAgfTtcblxuICAvLyBGaXJlIGEgZHluYW1pYyB0b2FzdFxuICBjb25zdCBmaXJlVG9hc3QgPSAodGV4dDogc3RyaW5nLCB0eXBlOiAnc3VjY2VzcycgfCAnZXJyb3InIHwgJ2luZm8nID0gJ3N1Y2Nlc3MnKSA9PiB7XG4gICAgY29uc3QgbmV3VG9hc3Q6IFRvYXN0TWVzc2FnZSA9IHsgaWQ6IGB0b2FzdC0ke0RhdGUubm93KCl9YCwgdGV4dCwgdHlwZSB9O1xuICAgIHNldFRvYXN0cygocHJldikgPT4gWy4uLnByZXYsIG5ld1RvYXN0XSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRUb2FzdHMoKHByZXYpID0+IHByZXYuZmlsdGVyKCh0KSA9PiB0LmlkICE9PSBuZXdUb2FzdC5pZCkpO1xuICAgIH0sIDQ1MDApO1xuICB9O1xuXG4gIC8vIFN5bmNocm9uaXplIGR5bmFtaWMgYm9va2luZ3MgcXVldWUgdXBkYXRlcyBmcm9tIHN0b3JhZ2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVTdG9yYWdlQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgY29uc3Qgc2F2ZWRCb29raW5ncyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbGtob2x5X2Jvb2tpbmdzJyk7XG4gICAgICBpZiAoc2F2ZWRCb29raW5ncykge1xuICAgICAgICBzZXRCb29raW5ncyhKU09OLnBhcnNlKHNhdmVkQm9va2luZ3MpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzdG9yYWdlJywgaGFuZGxlU3RvcmFnZUNoYW5nZSk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzdG9yYWdlJywgaGFuZGxlU3RvcmFnZUNoYW5nZSk7XG4gIH0sIFtdKTtcblxuICAvLyBTeW5jIHVzZXJzIHRvIHN0b3JhZ2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZWxraG9seV91c2VycycsIEpTT04uc3RyaW5naWZ5KHVzZXJzKSk7XG4gIH0sIFt1c2Vyc10pO1xuXG4gIC8vIExvYWQgYm9va2luZ3MgYW5kIHVzZXJzIGZyb20gRmlyZXN0b3JlIG9uIGFkbWluIGF1dGhvcml6YXRpb25cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBhc3luYyBmdW5jdGlvbiBsb2FkQ2xvdWREYXRhKCkge1xuICAgICAgaWYgKCFzZXNzaW9uVXNlcikgcmV0dXJuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYm9va2luZ3NTbmFwID0gYXdhaXQgZ2V0RG9jcyhjb2xsZWN0aW9uKGRiLCAnYm9va2luZ3MnKSk7XG4gICAgICAgIGlmICghYm9va2luZ3NTbmFwLmVtcHR5KSB7XG4gICAgICAgICAgY29uc3QgbGlzdDogYW55W10gPSBbXTtcbiAgICAgICAgICBib29raW5nc1NuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKTtcbiAgICAgICAgICAgIGxpc3QucHVzaCh7XG4gICAgICAgICAgICAgIGlkOiBkb2MuaWQsXG4gICAgICAgICAgICAgIG1vdG9yY3ljbGVJZDogZGF0YS5tb3RvcmN5Y2xlSWQsXG4gICAgICAgICAgICAgIG1vdG9yY3ljbGVOYW1lOiBkYXRhLm1vdG9yY3ljbGVOYW1lLFxuICAgICAgICAgICAgICBjYXRlZ29yeTogZGF0YS5jYXRlZ29yeSB8fCAnQScsXG4gICAgICAgICAgICAgIHByaWNlOiBkYXRhLnRvdGFsUHJpY2UgPyBgJHtkYXRhLnRvdGFsUHJpY2UudG9Mb2NhbGVTdHJpbmcoKX0gRUdQYCA6IChkYXRhLnByaWNlIHx8ICcwIEVHUCcpLFxuICAgICAgICAgICAgICBuYW1lOiBkYXRhLmN1c3RvbWVyTmFtZSB8fCBkYXRhLm5hbWUgfHwgJ0Fub255bW91cyBVc2VyJyxcbiAgICAgICAgICAgICAgcGhvbmU6IGRhdGEuY3VzdG9tZXJQaG9uZSB8fCBkYXRhLnBob25lIHx8ICcwMDAwMDAwMDAnLFxuICAgICAgICAgICAgICBlbWFpbDogZGF0YS5jdXN0b21lckVtYWlsIHx8IGRhdGEuZW1haWwgfHwgJ0d1ZXN0IChDbG91ZCknLFxuICAgICAgICAgICAgICBkYXRlOiBkYXRhLmRhdGUgfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0sXG4gICAgICAgICAgICAgIHRpbWVzdGFtcDogZGF0YS50aW1lc3RhbXAgfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICBzdGF0dXM6IGRhdGEuc3RhdHVzIHx8ICdzb2xkJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGlzdC5zb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShiLnRpbWVzdGFtcCkuZ2V0VGltZSgpIC0gbmV3IERhdGUoYS50aW1lc3RhbXApLmdldFRpbWUoKSk7XG4gICAgICAgICAgc2V0Qm9va2luZ3MobGlzdCk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfYm9va2luZ3MnLCBKU09OLnN0cmluZ2lmeShsaXN0KSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gZmV0Y2ggYm9va2luZ3MgZnJvbSBGaXJlc3RvcmU6XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVzZXJzU25hcCA9IGF3YWl0IGdldERvY3MoY29sbGVjdGlvbihkYiwgJ3VzZXJzJykpO1xuICAgICAgICBpZiAoIXVzZXJzU25hcC5lbXB0eSkge1xuICAgICAgICAgIGNvbnN0IGxpc3Q6IFVzZXJBY2NvdW50W10gPSBbXTtcbiAgICAgICAgICB1c2Vyc1NuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgICAgICBsaXN0LnB1c2goZG9jLmRhdGEoKSBhcyBVc2VyQWNjb3VudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2V0VXNlcnMobGlzdCk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfdXNlcnMnLCBKU09OLnN0cmluZ2lmeShsaXN0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU3luYyBleGlzdGluZyBkZWZhdWx0cyB0byBGaXJlc3RvcmVcbiAgICAgICAgICBmb3IgKGNvbnN0IHVzZXIgb2YgREVGQVVMVF9VU0VSUykge1xuICAgICAgICAgICAgYXdhaXQgc2V0RG9jKGRvYyhkYiwgJ3VzZXJzJywgdXNlci51c2VybmFtZSksIHVzZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBmZXRjaCB1c2VycyBmcm9tIEZpcmVzdG9yZTpcIiwgZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9hZENsb3VkRGF0YSgpO1xuICB9LCBbc2Vzc2lvblVzZXJdKTtcblxuICAvLyBBdXRoIFN1Ym1pdFxuICBjb25zdCBoYW5kbGVMb2dpblN1Ym1pdCA9IChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgY2xlYW5Vc2VyID0gdXNlcm5hbWVJbnB1dC50cmltKCk7XG4gICAgLy8gVmFsaWRhdGUgY3JlZGVudGlhbHMgYWdhaW5zdCBzdG9yZWQgbGlzdFxuICAgIGNvbnN0IGZvdW5kID0gdXNlcnMuZmluZCh1ID0+IHUudXNlcm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gY2xlYW5Vc2VyLnRvTG93ZXJDYXNlKCkgJiYgdS5wYXNzd29yZCA9PT0gcGFzc3dvcmRJbnB1dCk7XG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICBzZXRTZXNzaW9uVXNlcihmb3VuZCk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZWxraG9seV9zZXNzaW9uX3VzZXInLCBKU09OLnN0cmluZ2lmeShmb3VuZCkpO1xuICAgICAgc2V0VXNlcm5hbWVJbnB1dCgnJyk7XG4gICAgICBzZXRQYXNzd29yZElucHV0KCcnKTtcbiAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gYNmF2LHYrdio2KfZiyDYqNmDINmF2KzYr9iv2KfZiyAke3Njb3JlUm9sZUxhYmVsKGZvdW5kLnJvbGUpfWAgOiBgV2VsY29tZSBiYWNrICR7Zm91bmQucm9sZX0gb3BlcmF0b3JgLCAnc3VjY2VzcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYp9mE2KjZiNin2KjYqSDYp9mE2YXYutmE2YLYqTog2KjZitin2YbYp9iqINiv2K7ZiNmEINiu2KfYt9im2KknIDogJ0dhdGV3YXkgUmVmdXNlZDogSW5jb3JyZWN0IGNyZWRlbnRpYWxzJywgJ2Vycm9yJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUxvZ291dCA9ICgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZWxraG9seV9zZXNzaW9uX3VzZXInKTtcbiAgICBzZXRTZXNzaW9uVXNlcihudWxsKTtcbiAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmFINmB2LXZhCDYp9mE2KzZhNiz2Kkg2KjYo9mF2KfZhicgOiAnU2Vzc2lvbiB0ZXJtaW5hdGVkIHNlY3VyZWx5JywgJ2luZm8nKTtcbiAgfTtcblxuICAvLyBNZW1vaXplZCBmaWx0ZXJlZCBtb3RvcmN5Y2xlcyBmb3IgRGFzaCBwYW5lbCB2aWV3XG4gIGNvbnN0IGRhc2hGaWx0ZXJlZEJpa2VzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgbGV0IGZpbHRlcmVkID0gbW90b3JjeWNsZXM7XG4gICAgaWYgKGRhc2hDYXRlZ29yeUZpbHRlciAhPT0gJ0FsbCcpIHtcbiAgICAgIGZpbHRlcmVkID0gZmlsdGVyZWQuZmlsdGVyKGIgPT4gYi5jYXRlZ29yeSA9PT0gZGFzaENhdGVnb3J5RmlsdGVyKTtcbiAgICB9XG4gICAgaWYgKGJpa2VTZWFyY2hUZXJtLnRyaW0oKSkge1xuICAgICAgY29uc3QgcXVlcnkgPSBiaWtlU2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgICAgIGZpbHRlcmVkID0gZmlsdGVyZWQuZmlsdGVyKGIgPT4gXG4gICAgICAgIGIubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KSB8fCBcbiAgICAgICAgKGIuaWQgJiYgYi5pZC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KSkgfHxcbiAgICAgICAgKGIuc2VyaWFsQ29kZSAmJiBiLnNlcmlhbENvZGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSkpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZmlsdGVyZWQ7XG4gIH0sIFttb3RvcmN5Y2xlcywgZGFzaENhdGVnb3J5RmlsdGVyLCBiaWtlU2VhcmNoVGVybV0pO1xuXG4gIC8vIEltYWdlIEJhc2U2NCBVcGxvYWRlclxuICBjb25zdCBoYW5kbGVGb3JtSW1hZ2VVcGxvYWQgPSAoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXM/LlswXTtcbiAgICBpZiAoZmlsZSkge1xuICAgICAgaWYgKGZpbGUuc2l6ZSA+IDIgKiAxMDI0ICogMTAyNCkge1xuICAgICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYp9mE2K3YryDYp9mE2KPZgti12Ykg2YTYrdis2YUg2KfZhNmF2YTZgSDZh9mIIDIg2YXZitis2KfYqNin2YrYqicgOiAnTWF4IGF0dGFjaG1lbnQgbGltaXQgaXMgMk1CJywgJ2Vycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHJlYWRlci5yZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgc2V0QmlrZUZvcm0oKHByZXYpID0+ICh7IC4uLnByZXYsIGltYWdlOiByZWFkZXIucmVzdWx0IGFzIHN0cmluZyB9KSk7XG4gICAgICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDYqti02YHZitixINin2YTYtdmI2LHYqSDZiNil2LHZgdin2YLZh9inINio2YbYrNin2K0nIDogJ1Jlc291cmNlIGltYWdlIGF0dGFjaGVkIGFuZCBiYXNlNjQgZW5jb2RlZCcsICdzdWNjZXNzJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQmlrZSBBY3Rpb25zXG4gIGNvbnN0IGhhbmRsZUVkaXRCaWtlQ2xpY2sgPSAoYmlrZTogTW90b3JjeWNsZSkgPT4ge1xuICAgIC8vIFJvbGUgY2hlY2s6IFN0YWZmIGNhbm5vdCBlZGl0IG9yIGRlbGV0ZVxuICAgIGlmIChzZXNzaW9uVXNlcj8ucm9sZSA9PT0gJ1N0YWZmJykge1xuICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2LXZhNin2K3Zitin2Kog2YXZhtiu2YHYttipOiDZhNinINmK2YXZg9mG2YMg2KrYudiv2YrZhCDYp9mE2YXYsdmD2KjYp9iqJyA6ICdMb3cgUHJpdmlsZWdlIE5vZGU6IFN0YWZmIGNhbm5vdCBtb2RpZnkgbWFjaGluZXMnLCAnZXJyb3InKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0RWRpdGluZ0Jpa2UoYmlrZSk7XG4gICAgc2V0SXNBZGRpbmdOZXcoZmFsc2UpO1xuICAgIHNldEZvcm1TdWJUYWIoJ2Jhc2ljJyk7XG4gICAgc2V0QmlrZUZvcm0oe1xuICAgICAgaWQ6IGJpa2UuaWQsXG4gICAgICBuYW1lOiBiaWtlLm5hbWUsXG4gICAgICBjYXRlZ29yeTogYmlrZS5jYXRlZ29yeSxcbiAgICAgIGNhdGVnb3J5TmFtZTogYmlrZS5jYXRlZ29yeU5hbWUsXG4gICAgICBwcmljZTogYmlrZS5wcmljZSxcbiAgICAgIHByaWNlTnVtOiBiaWtlLnByaWNlTnVtIHx8IDQ1MDAwLFxuICAgICAgaW1hZ2U6IGJpa2UuaW1hZ2UsXG4gICAgICB0YWdsaW5lOiBiaWtlLnRhZ2xpbmUgfHwgJ0FwZXggUGVyZm9ybWFuY2UnLFxuICAgICAgc2hvcnREZXNjOiBiaWtlLnNob3J0RGVzYyxcbiAgICAgIGxvbmdEZXNjOiBiaWtlLmxvbmdEZXNjIHx8ICcnLFxuICAgICAgaXNQb3B1bGFyOiAhIWJpa2UuaXNQb3B1bGFyLFxuICAgICAgc3BlY3M6IHsgLi4uYmlrZS5zcGVjcyB9LFxuICAgICAgaXNDdXN0b206IHRydWUsXG4gICAgICBjYXRhbG9nRmlsZU5hbWU6IGJpa2UuY2F0YWxvZ0ZpbGVOYW1lIHx8ICcnLFxuICAgICAgY2F0YWxvZ0ZpbGVDb250ZW50OiBiaWtlLmNhdGFsb2dGaWxlQ29udGVudCB8fCAnJyxcbiAgICAgIG9yaWdpbmFsUHJpY2U6IGJpa2Uub3JpZ2luYWxQcmljZSAhPT0gdW5kZWZpbmVkID8gYmlrZS5vcmlnaW5hbFByaWNlIDogKGJpa2UucHJpY2VOdW0gfHwgNDUwMDApLFxuICAgICAgZGlzY291bnQ6IGJpa2UuZGlzY291bnQgfHwgMCxcbiAgICAgIGRpc2NvdW50VHlwZTogYmlrZS5kaXNjb3VudFR5cGUgfHwgJ3BlcmNlbnRhZ2UnLFxuICAgICAgb2ZmZXJMYWJlbDogYmlrZS5vZmZlckxhYmVsIHx8ICcnLFxuICAgICAgYWRkT25zOiBiaWtlLmFkZE9ucyA/IFsuLi5iaWtlLmFkZE9uc10gOiBbXSxcbiAgICAgIHNlcmlhbENvZGU6IGJpa2Uuc2VyaWFsQ29kZSB8fCAnJyxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGROZXdDbGljayA9ICgpID0+IHtcbiAgICBzZXRJc0FkZGluZ05ldyh0cnVlKTtcbiAgICBzZXRFZGl0aW5nQmlrZShudWxsKTtcbiAgICBzZXRGb3JtU3ViVGFiKCdiYXNpYycpO1xuICAgIHNldEJpa2VGb3JtKHtcbiAgICAgIGlkOiBgY3VzdG9tLWJpa2UtJHtEYXRlLm5vdygpfWAsXG4gICAgICBuYW1lOiAnTkVXIEFQRVggTUFDSElORSBWNCcsXG4gICAgICBjYXRlZ29yeTogJ0EnLFxuICAgICAgY2F0ZWdvcnlOYW1lOiAnU3BvcnQnLFxuICAgICAgcHJpY2U6ICckNDUsMDAwJyxcbiAgICAgIHByaWNlTnVtOiA0NTAwMCxcbiAgICAgIGltYWdlOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NTg5ODE4MDYtZWM1MjdmYTg0YzM5P2F1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAmdz02MDAnLFxuICAgICAgdGFnbGluZTogJ0RlZnlpbmcgSHlicmlkIFByb3B1bHNpb24gR3Jhdml0eScsXG4gICAgICBzaG9ydERlc2M6ICdTdGF0ZS1vZi10aGUtYXJ0IGZ1dHVyaXN0aWMgbW90b3JjeWNsZSBwcm90b3R5cGUgYnVpbHQgZm9yIHRvcCBzcGVlZCBhbmQgbHV4dXJ5LicsXG4gICAgICBsb25nRGVzYzogJ0VuZ2luZWVyZWQgd2l0aCBkb3VibGUgYWVyby1keW5hbWljcywgcGxhc21hIHRocnVzdCBjb250cm9scywgYWRhcHRpdmUgdmlzdWFsIEhVRCBwYW5lbHMsIGFuZCBsaWdodHdlaWdodCBzb2xpZC1zdGF0ZSBsaXRoaXVtIGNlbGxzIGZvciBjb250aW51b3VzIHBvd2VyIG91dHB1dC4nLFxuICAgICAgaXNQb3B1bGFyOiBmYWxzZSxcbiAgICAgIHNwZWNzOiB7XG4gICAgICAgIGVuZ2luZTogJzEyMDBjYyBRdWFkLVB1bHNlIFNvbGlkJyxcbiAgICAgICAgdG9wU3BlZWQ6ICczNDAga20vaCcsXG4gICAgICAgIGZ1ZWxDb25zdW1wdGlvbjogJzAuMCBMLzEwMGttJyxcbiAgICAgICAgcG93ZXI6ICcyMTAgSFAnLFxuICAgICAgICB3ZWlnaHQ6ICcxNzIga2cnXG4gICAgICB9LFxuICAgICAgaXNDdXN0b206IHRydWUsXG4gICAgICBjYXRhbG9nRmlsZU5hbWU6ICcnLFxuICAgICAgY2F0YWxvZ0ZpbGVDb250ZW50OiAnJyxcbiAgICAgIG9yaWdpbmFsUHJpY2U6IDQ1MDAwLFxuICAgICAgZGlzY291bnQ6IDAsXG4gICAgICBkaXNjb3VudFR5cGU6ICdwZXJjZW50YWdlJyxcbiAgICAgIG9mZmVyTGFiZWw6ICcnLFxuICAgICAgYWRkT25zOiBbXSxcbiAgICAgIHNlcmlhbENvZGU6ICdNT1RPLScgKyBEYXRlLm5vdygpLFxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUZvcm1TdWJtaXQgPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKCFiaWtlRm9ybS5uYW1lIHx8ICFiaWtlRm9ybS5pbWFnZSkge1xuICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KfZhNix2KzYp9ihINil2K/Yrtin2YQg2KfYs9mFINin2YTZhdix2YPYqNipINmI2LXZiNix2Kkg2LXYp9mE2K3YqScgOiAnTWFjaGluZSBuYW1lIGFuZCB2aXN1YWwgYXJlIGJvdGggbWFuZGF0b3J5JywgJ2Vycm9yJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2F0TmFtZXMgPSB7IEE6ICdTcG9ydCcsIEI6ICdDcnVpc2VyJywgQzogJ0FkdmVudHVyZScsIFM6ICdTY29vdGVyJyB9O1xuICAgIFxuICAgIC8vIER5bmFtaWNhbGx5IGNhbGN1bGF0ZSBmaW5hbCBwcmljZSBmcm9tIG9yaWdpbmFsUHJpY2UgYW5kIGRpc2NvdW50XG4gICAgbGV0IGNhbGN1bGF0ZWRQcmljZU51bSA9IE51bWJlcihiaWtlRm9ybS5vcmlnaW5hbFByaWNlICE9PSB1bmRlZmluZWQgPyBiaWtlRm9ybS5vcmlnaW5hbFByaWNlIDogKGJpa2VGb3JtLnByaWNlTnVtIHx8IDQ1MDAwKSk7XG4gICAgY29uc3QgZGlzY1ZhbCA9IE51bWJlcihiaWtlRm9ybS5kaXNjb3VudCB8fCAwKTtcbiAgICBpZiAoZGlzY1ZhbCA+IDAgJiYgYmlrZUZvcm0ub3JpZ2luYWxQcmljZSkge1xuICAgICAgaWYgKGJpa2VGb3JtLmRpc2NvdW50VHlwZSA9PT0gJ3BlcmNlbnRhZ2UnKSB7XG4gICAgICAgIGNhbGN1bGF0ZWRQcmljZU51bSA9IE1hdGgucm91bmQoYmlrZUZvcm0ub3JpZ2luYWxQcmljZSAqICgxIC0gZGlzY1ZhbCAvIDEwMCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsY3VsYXRlZFByaWNlTnVtID0gTWF0aC5yb3VuZChNYXRoLm1heCgwLCBiaWtlRm9ybS5vcmlnaW5hbFByaWNlIC0gZGlzY1ZhbCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNvbXBsZXRlZEZvcm06IE1vdG9yY3ljbGUgPSB7XG4gICAgICAuLi5iaWtlRm9ybSxcbiAgICAgIHByaWNlTnVtOiBjYWxjdWxhdGVkUHJpY2VOdW0sXG4gICAgICBjYXRlZ29yeU5hbWU6IGNhdE5hbWVzW2Jpa2VGb3JtLmNhdGVnb3J5XSxcbiAgICAgIHByaWNlOiBgJHtjYWxjdWxhdGVkUHJpY2VOdW0udG9Mb2NhbGVTdHJpbmcoKX0g2KzZhtmK2YdgLFxuICAgIH07XG5cbiAgICBsZXQgbmV4dEJpa2VzOiBNb3RvcmN5Y2xlW10gPSBbXTtcbiAgICBpZiAoaXNBZGRpbmdOZXcpIHtcbiAgICAgIG5leHRCaWtlcyA9IFtjb21wbGV0ZWRGb3JtLCAuLi5tb3RvcmN5Y2xlc107XG4gICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmF2Kog2KXYttin2YHYqSDYotmE2Kkg2KzYr9mK2K/YqSDZhNmE2KPYs9i32YjZhCEnIDogJ05ldyBoZWF2eSBtYWNoaW5lIGNvbW1pc3Npb25lZCBzdWNjZXNzZnVsbHkhJywgJ3N1Y2Nlc3MnKTtcbiAgICB9IGVsc2UgaWYgKGVkaXRpbmdCaWtlKSB7XG4gICAgICBpZiAoc2Vzc2lvblVzZXI/LnJvbGUgPT09ICdTdGFmZicpIHtcbiAgICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2K7Yt9ijINmB2Yog2KfZhNiq2LHYrtmK2LU6INmE2Kcg2KrZhdmE2YMg2K3ZgiDYp9mE2KrYudiv2YrZhCcgOiAnU3RhZmYgbm9kZSB1bmF1dGhvcml6ZWQgZm9yIHdyaXRlcycsICdlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBuZXh0QmlrZXMgPSBtb3RvcmN5Y2xlcy5tYXAoKGIpID0+IChiLmlkID09PSBlZGl0aW5nQmlrZS5pZCA/IGNvbXBsZXRlZEZvcm0gOiBiKSk7XG4gICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmFINiq2K3Yr9mK2Ksg2KjZitin2YbYp9iqINin2YTZhdi52KfZitix2Kkg2KjZhtis2KfYrSEnIDogJ01hY2hpbmUgcGFyYW1ldGVycyB1cGRhdGVkIGluIHNob3dyb29tcyEnLCAnc3VjY2VzcycpO1xuICAgIH1cblxuICAgIG9uVXBkYXRlTW90b3JjeWNsZXMobmV4dEJpa2VzKTtcbiAgICBzZXRFZGl0aW5nQmlrZShudWxsKTtcbiAgICBzZXRJc0FkZGluZ05ldyhmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlQmlrZSA9IChiaWtlSWQ6IHN0cmluZykgPT4ge1xuICAgIC8vIE9ubHkgQWRtaW4gY2FuIGRlbGV0ZVxuICAgIGlmIChzZXNzaW9uVXNlcj8ucm9sZSAhPT0gJ0FkbWluJykge1xuICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KfZhNi52YXZhNmK2Kkg2YXYsdmB2YjYttipOiDYp9mE2YXYs9ik2YjZhNmI2YYg2YHZgti3INmK2YXZg9mG2YfZhSDYp9mE2K3YsNmBJyA6ICdQcml2aWxlZ2UgQnJlYWNoOiBPbmx5IGNvcmUgYWRtaW5zIGNhbiBkZWNvbW1pc3Npb24gZXF1aXBtZW50JywgJ2Vycm9yJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHRCaWtlcyA9IG1vdG9yY3ljbGVzLmZpbHRlcigoYikgPT4gYi5pZCAhPT0gYmlrZUlkKTtcbiAgICBvblVwZGF0ZU1vdG9yY3ljbGVzKG5leHRCaWtlcyk7XG4gICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDYtNi32Kgg2YjYpdiy2KfZhNipINin2YTZhdix2YPYqNipINmF2YYg2YLYp9i52K/YqSDYp9mE2KjZitin2YbYp9iqJyA6ICdIZWF2eSBjeWNsZSBkZWNvbW1pc3Npb25lZCBzdWNjZXNzZnVsbHknLCAnc3VjY2VzcycpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURvd25sb2FkQW5kQ29weVFSQ29kZSA9IChiaWtlOiBNb3RvcmN5Y2xlKSA9PiB7XG4gICAgY29uc3QgcXJDb2RlVGV4dCA9IGJpa2Uuc2VyaWFsQ29kZSB8fCBiaWtlLmlkO1xuICAgIFxuICAgIC8vIDEuIENvcHkgdG8gY2xpcGJvYXJkXG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQocXJDb2RlVGV4dCkudGhlbigoKSA9PiB7XG4gICAgICBmaXJlVG9hc3QoXG4gICAgICAgIGxhbmcgPT09ICdhcicgXG4gICAgICAgICAgPyBg2KrZhSDZhtiz2K4g2KfZhNmD2YjYryDYqNmG2KzYp9itOiAke3FyQ29kZVRleHR9YCBcbiAgICAgICAgICA6IGBDb2RlIGNvcGllZCBzdWNjZXNzZnVsbHk6ICR7cXJDb2RlVGV4dH1gLCBcbiAgICAgICAgJ3N1Y2Nlc3MnXG4gICAgICApO1xuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUud2FybihcIkZhaWxlZCB0byBjb3B5XCIsIGVycik7XG4gICAgfSk7XG5cbiAgICAvLyAyLiBMb2NhdGUgU1ZHIGFuZCBpbml0aWF0ZSBpbWFnZSBkb3dubG9hZFxuICAgIGNvbnN0IHN2Z0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcXItJHtiaWtlLmlkfWApO1xuICAgIGlmICghc3ZnRWxlbWVudCkge1xuICAgICAgY29uc29sZS53YXJuKGBTVkcgZWxlbWVudCBxci0ke2Jpa2UuaWR9IG5vdCBmb3VuZGApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdmdTdHJpbmcgPSBuZXcgWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKHN2Z0VsZW1lbnQpO1xuICAgICAgY29uc3Qgc3ZnQmxvYiA9IG5ldyBCbG9iKFtzdmdTdHJpbmddLCB7IHR5cGU6ICdpbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmLTgnIH0pO1xuICAgICAgY29uc3QgYmxvYlVSTCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHN2Z0Jsb2IpO1xuXG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gMjU2O1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gMjU2O1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgLy8gRmlsbCBiYWNrZ3JvdW5kIHdoaXRlXG4gICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnI0ZGRkZGRic7XG4gICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCAyNTYsIDI1Nik7XG4gICAgICAgICAgLy8gRHJhdyBRUiBvbiB0b3BcbiAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMTYsIDE2LCAyMjQsIDIyNCk7XG4gICAgICAgICAgXG4gICAgICAgICAgY29uc3QgcG5nVVJMID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gICAgICAgICAgY29uc3QgZGxMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgIGRsTGluay5ocmVmID0gcG5nVVJMO1xuICAgICAgICAgIGRsTGluay5kb3dubG9hZCA9IGBRUl8ke2Jpa2UubmFtZS5yZXBsYWNlKC9cXHMrL2csICdfJyl9XyR7cXJDb2RlVGV4dH0ucG5nYDtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRsTGluayk7XG4gICAgICAgICAgZGxMaW5rLmNsaWNrKCk7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkbExpbmspO1xuICAgICAgICAgIFxuICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGJsb2JVUkwpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaW1hZ2Uub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgLy8gRmFsbGJhY2sgdG8gU1ZHIGRvd25sb2FkIGluIGNhc2UgaW1hZ2UgZHJhd2luZyBpcyBibG9ja2VkIGJ5IHNhbmRib3ggY29uc3RyYWludHNcbiAgICAgICAgY29uc3QgZGxMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBkbExpbmsuaHJlZiA9IGJsb2JVUkw7XG4gICAgICAgIGRsTGluay5kb3dubG9hZCA9IGBRUl8ke2Jpa2UubmFtZS5yZXBsYWNlKC9cXHMrL2csICdfJyl9XyR7cXJDb2RlVGV4dH0uc3ZnYDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkbExpbmspO1xuICAgICAgICBkbExpbmsuY2xpY2soKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkbExpbmspO1xuICAgICAgfTtcbiAgICAgIGltYWdlLnNyYyA9IGJsb2JVUkw7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGdlbmVyYXRlIGRvd25sb2FkOlwiLCBlcnIpO1xuICAgIH1cbiAgfTtcblxuICAvLyBVc2VyIEFjdGlvbnMgKENvcmUgQWRtaW4gT25seSlcbiAgY29uc3QgaGFuZGxlQWRkVXNlclN1Ym1pdCA9IGFzeW5jIChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHNlc3Npb25Vc2VyPy5yb2xlICE9PSAnQWRtaW4nKSB7XG4gICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYtdmE2KfYrdmK2KfYqiDZg9in2YHZitipINmB2YLYtyDZhNmE2YXYtNix2YEg2KfZhNix2KbZitiz2YonIDogJ01hc3RlciBhZG1pbmlzdHJhdG9yIGtleSByZXF1aXJlZCBmb3Igbm9kZXMgY3VyYXRpb24nLCAnZXJyb3InKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjbGVhblVzZXJuYW1lID0gbmV3VXNlcm5hbWUudHJpbSgpO1xuICAgIGlmICghY2xlYW5Vc2VybmFtZSB8fCAhbmV3UGFzc3dvcmQpIHtcbiAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iu2LfYozog2YrYsdis2Ykg2YXZhNihINmD2KfZgdipINiu2KfZhtin2Kog2KfZhNmF2LTYsdmB2YrZhicgOiAnTm9kZSB1c2VybmFtZSBhbmQgY29kZSBrZXkgYXJlIHJlcXVpcmVkJywgJ2Vycm9yJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdXNlckV4aXN0cyA9IHVzZXJzLnNvbWUodSA9PiB1LnVzZXJuYW1lLnRvTG93ZXJDYXNlKCkgPT09IGNsZWFuVXNlcm5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgaWYgKHVzZXJFeGlzdHMpIHtcbiAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9mH2LDYpyDYp9mE2K3Ys9in2Kgg2YXYs9is2YQg2KjYp9mE2YHYudmEINmB2Yog2KfZhNij2KrZhdiq2KknIDogJ09wZXJhdG9yIG5vZGUgaWRlbnRpdHkga2V5IGFscmVhZHkgb25saW5lJywgJ2Vycm9yJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV3VXNlcjogVXNlckFjY291bnQgPSB7XG4gICAgICB1c2VybmFtZTogY2xlYW5Vc2VybmFtZSxcbiAgICAgIHBhc3N3b3JkOiBuZXdQYXNzd29yZCxcbiAgICAgIHJvbGU6IG5ld1JvbGVcbiAgICB9O1xuXG4gICAgY29uc3QgbmV4dFVzZXJzID0gWy4uLnVzZXJzLCBuZXdVc2VyXTtcbiAgICBzZXRVc2VycyhuZXh0VXNlcnMpO1xuICAgIHNldE5ld1VzZXJuYW1lKCcnKTtcbiAgICBzZXROZXdQYXNzd29yZCgnJyk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHNldERvYyhkb2MoZGIsICd1c2VycycsIGNsZWFuVXNlcm5hbWUpLCBuZXdVc2VyKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBzeW5jIG5ldyB1c2VyIHRvIEZpcmVzdG9yZTpcIiwgZXJyKTtcbiAgICB9XG4gICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDYqtmB2YjZiti2INin2YTZhdi02LrZhCDYp9mE2KzYr9mK2K8g2KjZhtis2KfYrSEnIDogYE9wZXJhdG9yIG5vZGUgZGVsZWdhdGVkOiAke2NsZWFuVXNlcm5hbWV9IFske25ld1JvbGV9XWAsICdzdWNjZXNzJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlVXNlciA9IGFzeW5jICh1c2VybmFtZVRvRGVsZXRlOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoc2Vzc2lvblVzZXI/LnJvbGUgIT09ICdBZG1pbicpIHtcbiAgICAgIGZpcmVUb2FzdCgnQ29yZSBhZG1pbiBhdXRob3JpemF0aW9uIHJlcXVpcmVkJywgJ2Vycm9yJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUHJvdGVjdCBtYXN0ZXIgSE9TTlkxOTk1IGZyb20gZGVsZXRpb24gbG9ja291dFxuICAgIGlmICh1c2VybmFtZVRvRGVsZXRlLnRvVXBwZXJDYXNlKCkgPT09ICdIT1NOWTE5OTUnKSB7XG4gICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfZhNmI2KfYptitINin2YTYo9mF2KfZhjog2YTYpyDZitmF2YPZhiDYrdiw2YEg2K3Ys9in2Kgg2KfZhNmF2KfZhNmDINin2YTYsdim2YrYs9mKJyA6ICdTZWN1cml0eSBEaXJlY3RpdmU6IExvY2tlZCBub2RlIFtIT1NOWTE5OTVdIGNhbm5vdCBiZSBlcmFzZWQnLCAnZXJyb3InKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBQcm90ZWN0IGN1cnJlbnQgc2VsZiBmcm9tIGRlbGV0aW9uXG4gICAgaWYgKHVzZXJuYW1lVG9EZWxldGUgPT09IHNlc3Npb25Vc2VyLnVzZXJuYW1lKSB7XG4gICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfZhNmI2KfYptitINin2YTYo9mF2KfZhjog2YTYpyDZitmF2YPZhiDYrdiw2YEg2YXYtNi62YQg2KfZhNis2YTYs9ipINin2YTYrdin2YTZiicgOiAnU2VjdXJpdHkgRGlyZWN0aXZlOiBZb3UgY2Fubm90IGRlbGV0ZSB5b3VyIG93biBzZXNzaW9uIG5vZGUnLCAnZXJyb3InKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0ID0gdXNlcnMuZmlsdGVyKHUgPT4gdS51c2VybmFtZSAhPT0gdXNlcm5hbWVUb0RlbGV0ZSk7XG4gICAgc2V0VXNlcnMobmV4dCk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRlbGV0ZURvYyhkb2MoZGIsICd1c2VycycsIHVzZXJuYW1lVG9EZWxldGUpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBzeW5jIGRlbGV0ZWQgdXNlciBmcm9tIEZpcmVzdG9yZTpcIiwgZXJyKTtcbiAgICB9XG4gICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDYs9it2Kgg2LXZhNin2K3Zitin2Kog2KfZhNmF2LTYutmEINio2YbYrNin2K0nIDogYFByaXZpbGVnZXMgcmV2b2tlZCBmb3Igbm9kZTogJHt1c2VybmFtZVRvRGVsZXRlfWAsICdzdWNjZXNzJyk7XG4gIH07XG5cbiAgLy8gVXBkYXRlIFNldHRpbmdzIGhvbWVwYWdlIFRleHQgQ29udGVudFxuICBjb25zdCBoYW5kbGVDb250ZW50U3VibWl0ID0gKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoc2Vzc2lvblVzZXI/LnJvbGUgIT09ICdBZG1pbicpIHtcbiAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9i12YTYp9it2YrYp9iqINmF2YbYrtmB2LbYqTog2KfZhNmF2LTYsdmB2YjZhiDZgdmC2Lcg2YrYrdmCINmE2YfZhSDYqti52K/ZitmEINin2YTZhdit2KrZiNmJINin2YTZhdin2YTZiiDZiNin2YTZiNi12YHZiicgOiAnRm9yYmlkZGVuOiBIb21lcGFnZSBsYXlvdXRzIHJlc3RyaWN0ZWQgdG8gQWRtaW4gb3BlcmF0b3JzJywgJ2Vycm9yJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uVXBkYXRlQ3VzdG9tVGV4dCh0ZXh0Rm9ybSk7XG4gICAgaWYgKG9uVXBkYXRlSG9tZXBhZ2VDb25maWcpIHtcbiAgICAgIG9uVXBkYXRlSG9tZXBhZ2VDb25maWcoYnVpbGRlckNvbmZpZyk7XG4gICAgfVxuICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YUg2K3Zgdi4INmI2KrYt9mI2YrYsSDYqti12YXZitmFINi12YHYrdipINin2YTZhdi52LHYtiDYqNmG2KzYp9itIScgOiAnQWR2YW5jZWQgbGF5b3V0IGNvbmZpZ3VyYXRpb24gZGVwbG95ZWQgc3VjY2Vzc2Z1bGx5IScsICdzdWNjZXNzJyk7XG4gIH07XG5cbiAgLy8gQ2xlYXIgYm9va2luZ3MgcXVldWUgbG9ncyAoQWRtaW4gcHJpdmlsZWdlKVxuICBjb25zdCBoYW5kbGVDbGVhckJvb2tpbmdzID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChzZXNzaW9uVXNlcj8ucm9sZSAhPT0gJ0FkbWluJykge1xuICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KfZhNmI2LXZiNmEINmF2LHZgdmI2LY6INin2YTYpdiv2KfYsdmK2YjZhiDZgdmC2Lcg2YrYrdmCINmE2YfZhSDYp9mE2K3YsNmBJyA6ICdQcml2aWxlZ2UgQnJlYWNoOiBPbmx5IGFkbWlucyBjYW4gY2xlYW4gbG9ncycsICdlcnJvcicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZWxraG9seV9ib29raW5ncycpO1xuICAgIHNldEJvb2tpbmdzKFtdKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcVNuYXAgPSBhd2FpdCBnZXREb2NzKGNvbGxlY3Rpb24oZGIsICdib29raW5ncycpKTtcbiAgICAgIGZvciAoY29uc3QgZCBvZiBxU25hcC5kb2NzKSB7XG4gICAgICAgIGF3YWl0IGRlbGV0ZURvYyhkb2MoZGIsICdib29raW5ncycsIGQuaWQpKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBjbGVhciBib29raW5ncyBmcm9tIEZpcmVzdG9yZTpcIiwgZXJyKTtcbiAgICB9XG4gICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDYqtmB2LHZiti6INi32KfYqNmI2LEg2KfZhNit2KzZiNiy2KfYqiDZhtmH2KfYptmK2KfZiycgOiAnSG9sb2dyYXBoaWMgbGVhZCBxdWV1ZSBwdXJnZWQgc3VjY2Vzc2Z1bGx5JywgJ2luZm8nKTtcbiAgfTtcblxuICAvLyBUb2dnbGUgYm9va2luZydzIHN0YXR1cyBiZXR3ZWVuIHNvbGQgYW5kIHBlbmRpbmdcbiAgY29uc3QgaGFuZGxlVG9nZ2xlQm9va2luZ1N0YXR1cyA9IGFzeW5jIChib29raW5nSWQ6IHN0cmluZywgY3VycmVudFN0YXR1czogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgbmV4dFN0YXR1cyA9IGN1cnJlbnRTdGF0dXMgPT09ICdzb2xkJyA/ICdwZW5kaW5nJyA6ICdzb2xkJztcbiAgICBcbiAgICAvLyB1cGRhdGUgc3RhdGVcbiAgICBjb25zdCB1cGRhdGVkID0gYm9va2luZ3MubWFwKGIgPT4gYi5pZCA9PT0gYm9va2luZ0lkID8geyAuLi5iLCBzdGF0dXM6IG5leHRTdGF0dXMgfSA6IGIpO1xuICAgIHNldEJvb2tpbmdzKHVwZGF0ZWQpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X2Jvb2tpbmdzJywgSlNPTi5zdHJpbmdpZnkodXBkYXRlZCkpO1xuICAgIFxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBzZXREb2MoZG9jKGRiLCAnYm9va2luZ3MnLCBib29raW5nSWQpLCB7XG4gICAgICAgIHN0YXR1czogbmV4dFN0YXR1c1xuICAgICAgfSwgeyBtZXJnZTogdHJ1ZSB9KTtcbiAgICAgIGZpcmVUb2FzdChcbiAgICAgICAgbGFuZyA9PT0gJ2FyJyA/ICfYqtmFINiq2K3Yr9mK2Ksg2K3Yp9mE2Kkg2KfZhNio2YrYuSDZhNmE2K/Ysdin2KzYqSDYqNmG2KzYp9itJyA6ICdNb3RvcmN5Y2xlIHN0YXR1cyB1cGRhdGVkIHN1Y2Nlc3NmdWxseScsXG4gICAgICAgICdzdWNjZXNzJ1xuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBzeW5jIGJvb2tpbmcgc3RhdHVzIGluIGNsb3VkOlwiLCBlcnIpO1xuICAgIH1cbiAgfTtcblxuICAvLyBTY29yZSBzdGF0cyB2YWx1ZXNcbiAgY29uc3QgZmxlZXRWYWx1ZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBtb3RvcmN5Y2xlcy5yZWR1Y2UoKGFjYywgY3VycmVudCkgPT4gYWNjICsgKGN1cnJlbnQucHJpY2VOdW0gfHwgNDUwMDApLCAwKTtcbiAgfSwgW21vdG9yY3ljbGVzXSk7XG5cbiAgY29uc3QgY2F0QV9Db3VudCA9IHVzZU1lbW8oKCkgPT4gbW90b3JjeWNsZXMuZmlsdGVyKGIgPT4gYi5jYXRlZ29yeSA9PT0gJ0EnKS5sZW5ndGgsIFttb3RvcmN5Y2xlc10pO1xuICBjb25zdCBjYXRCX0NvdW50ID0gdXNlTWVtbygoKSA9PiBtb3RvcmN5Y2xlcy5maWx0ZXIoYiA9PiBiLmNhdGVnb3J5ID09PSAnQicpLmxlbmd0aCwgW21vdG9yY3ljbGVzXSk7XG4gIGNvbnN0IGNhdENfQ291bnQgPSB1c2VNZW1vKCgpID0+IG1vdG9yY3ljbGVzLmZpbHRlcihiID0+IGIuY2F0ZWdvcnkgPT09ICdDJykubGVuZ3RoLCBbbW90b3JjeWNsZXNdKTtcbiAgY29uc3QgY2F0U19Db3VudCA9IHVzZU1lbW8oKCkgPT4gbW90b3JjeWNsZXMuZmlsdGVyKGIgPT4gYi5jYXRlZ29yeSA9PT0gJ1MnKS5sZW5ndGgsIFttb3RvcmN5Y2xlc10pO1xuXG4gIC8vIE1vdG9yY3ljbGUgc2FsZXMgYW5kIHNvbGQgY291bnQgY2FsY3VsYXRpb24gKEJhc2VkIG9uIGJvb2tpbmdzIGhhdmluZyBzdGF0dXMgIT09ICdwZW5kaW5nJylcbiAgY29uc3QgbW90b3JzVG90YWxTYWxlc1ZhbHVlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGJvb2tpbmdzLnJlZHVjZSgoYWNjLCBiKSA9PiB7XG4gICAgICBjb25zdCBzdGF0dXMgPSBiLnN0YXR1cyB8fCAnc29sZCc7XG4gICAgICBpZiAoc3RhdHVzICE9PSAnc29sZCcpIHJldHVybiBhY2M7XG4gICAgICBcbiAgICAgIGxldCBudW1lcmljUHJpY2UgPSA0NTAwMDsgLy8gZGVmYXVsdFxuICAgICAgaWYgKGIucHJpY2UpIHtcbiAgICAgICAgY29uc3QgY2xlYW5lZCA9IGIucHJpY2UucmVwbGFjZSgvW14wLTldL2csICcnKTtcbiAgICAgICAgaWYgKGNsZWFuZWQpIHtcbiAgICAgICAgICBudW1lcmljUHJpY2UgPSBOdW1iZXIoY2xlYW5lZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2MgKyBudW1lcmljUHJpY2U7XG4gICAgfSwgMCk7XG4gIH0sIFtib29raW5nc10pO1xuXG4gIGNvbnN0IG1vdG9yc1RvdGFsU29sZENvdW50ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGJvb2tpbmdzLmZpbHRlcihiID0+IChiLnN0YXR1cyB8fCAnc29sZCcpID09PSAnc29sZCcpLmxlbmd0aDtcbiAgfSwgW2Jvb2tpbmdzXSk7XG5cbiAgLy8gRS1jb21tZXJjZSBTdG9yZSBzdGF0aXN0aWNzIGNhbGN1bGF0aW9uc1xuICBjb25zdCBzdG9yZVRvdGFsUmV2ZW51ZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiAoc3RvcmVQcm9kdWN0cyB8fCBbXSkucmVkdWNlKChhY2MsIHApID0+IGFjYyArICgocC5wcmljZSB8fCAwKSAqIChwLnNvbGRDb3VudCB8fCAwKSksIDApO1xuICB9LCBbc3RvcmVQcm9kdWN0c10pO1xuXG4gIGNvbnN0IHN0b3JlVG90YWxJdGVtc1NvbGQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gKHN0b3JlUHJvZHVjdHMgfHwgW10pLnJlZHVjZSgoYWNjLCBwKSA9PiBhY2MgKyAocC5zb2xkQ291bnQgfHwgMCksIDApO1xuICB9LCBbc3RvcmVQcm9kdWN0c10pO1xuXG4gIC8vIC0tLSBFeGNlbCBFeHBvcnQgJiBTYWxlcyBSZXBvcnRzIFByb2Nlc3NpbmcgU3RhdGVzIC0tLVxuICBjb25zdCBbZXhwb3J0UmFuZ2VUeXBlLCBzZXRFeHBvcnRSYW5nZVR5cGVdID0gdXNlU3RhdGU8J3RvZGF5JyB8ICd3ZWVrJyB8ICdtb250aCcgfCAnM21vbnRocycgfCAnNm1vbnRocycgfCAneWVhcicgfCAnY3VzdG9tJz4oJ21vbnRoJyk7XG4gIGNvbnN0IFtleHBvcnRTdGFydERhdGUsIHNldEV4cG9ydFN0YXJ0RGF0ZV0gPSB1c2VTdGF0ZTxzdHJpbmc+KG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxNikpO1xuICBjb25zdCBbZXhwb3J0RW5kRGF0ZSwgc2V0RXhwb3J0RW5kRGF0ZV0gPSB1c2VTdGF0ZTxzdHJpbmc+KG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxNikpO1xuXG4gIGNvbnN0IGhhbmRsZUV4cG9ydEV4Y2VsID0gKCkgPT4ge1xuICAgIC8vIDEuIEdhdGhlciBhbGwgZGF0YSBzb3VyY2VzXG4gICAgLy8gUmVhbCBib29raW5nc1xuICAgIGNvbnN0IHBhcnNlZFJlYWxCb29raW5ncyA9IGJvb2tpbmdzLm1hcCgoYikgPT4ge1xuICAgICAgLy8gc2FmZSBudW1lcmljIHByaWNlIHBhcnNpbmdcbiAgICAgIGxldCBudW1lcmljUHJpY2UgPSA0NTAwMDsgLy8gZGVmYXVsdFxuICAgICAgaWYgKGIucHJpY2UpIHtcbiAgICAgICAgY29uc3QgY2xlYW5lZCA9IGIucHJpY2UucmVwbGFjZSgvW14wLTldL2csICcnKTtcbiAgICAgICAgaWYgKGNsZWFuZWQpIHtcbiAgICAgICAgICBudW1lcmljUHJpY2UgPSBOdW1iZXIoY2xlYW5lZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgbGV0IGRhdGVTdHIgPSBiLmRhdGUgfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XG4gICAgICBpZiAoYi50aW1lc3RhbXApIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkYXRlU3RyID0gYi50aW1lc3RhbXAuc3BsaXQoJ1QnKVswXTtcbiAgICAgICAgfSBjYXRjaChlKXt9XG4gICAgICB9XG4gICAgICBcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBiLmlkLFxuICAgICAgICBjb2RlOiBiLm1vdG9yY3ljbGVJZCB8fCAnTU9UTy1HRU4nLFxuICAgICAgICBuYW1lOiBiLm1vdG9yY3ljbGVOYW1lLFxuICAgICAgICB0eXBlOiBsYW5nID09PSAnYXInID8gJ9iv2LHYp9is2Kkg2YbYp9ix2YrYqScgOiAnTW90b3JjeWNsZScsXG4gICAgICAgIGN1c3RvbWVyTmFtZTogYi5uYW1lIHx8ICdBbm9ueW1vdXMnLFxuICAgICAgICBjdXN0b21lclBob25lOiBiLnBob25lIHx8ICctJyxcbiAgICAgICAgcXVhbnRpdHk6IDEsXG4gICAgICAgIHVuaXRQcmljZTogbnVtZXJpY1ByaWNlLFxuICAgICAgICB0b3RhbFByaWNlOiBudW1lcmljUHJpY2UsXG4gICAgICAgIGRhdGU6IGRhdGVTdHJcbiAgICAgIH07XG4gICAgfSk7XG4gICAgXG4gICAgLy8gTWVyZ2UgcmVhbCBib29raW5ncyBhbmQgbW9jayBoaXN0b3JpY2FsIHRyYW5zYWN0aW9uc1xuICAgIGNvbnN0IGFsbFNhbGVzID0gWy4uLnBhcnNlZFJlYWxCb29raW5nc107XG4gICAgXG4gICAgLy8gRmlsdGVyIGJ5IGNob3NlbiB0aW1lZnJhbWUvcGVyaW9kIChDdXJyZW50IFNpbXVsYXRlZCBEYXRlOiBKdW5lIDQsIDIwMjYpXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoMjAyNiwgNSwgNCk7XG4gICAgXG4gICAgY29uc3QgZmlsdGVyZWRTYWxlcyA9IGFsbFNhbGVzLmZpbHRlcigoc2FsZSkgPT4ge1xuICAgICAgY29uc3Qgc2FsZURhdGUgPSBuZXcgRGF0ZShzYWxlLmRhdGUpO1xuICAgICAgaWYgKGlzTmFOKHNhbGVEYXRlLmdldFRpbWUoKSkpIHJldHVybiB0cnVlO1xuICAgICAgXG4gICAgICBjb25zdCBkaWZmVGltZSA9IG5vdy5nZXRUaW1lKCkgLSBzYWxlRGF0ZS5nZXRUaW1lKCk7XG4gICAgICBjb25zdCBkaWZmRGF5cyA9IGRpZmZUaW1lIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpO1xuICAgICAgXG4gICAgICBpZiAoZXhwb3J0UmFuZ2VUeXBlID09PSAndG9kYXknKSB7XG4gICAgICAgIHJldHVybiBzYWxlRGF0ZS50b0RhdGVTdHJpbmcoKSA9PT0gbm93LnRvRGF0ZVN0cmluZygpO1xuICAgICAgfVxuICAgICAgaWYgKGV4cG9ydFJhbmdlVHlwZSA9PT0gJ3dlZWsnKSB7XG4gICAgICAgIHJldHVybiBkaWZmRGF5cyA+PSAwICYmIGRpZmZEYXlzIDw9IDc7XG4gICAgICB9XG4gICAgICBpZiAoZXhwb3J0UmFuZ2VUeXBlID09PSAnbW9udGgnKSB7XG4gICAgICAgIHJldHVybiBkaWZmRGF5cyA+PSAwICYmIGRpZmZEYXlzIDw9IDMwO1xuICAgICAgfVxuICAgICAgaWYgKGV4cG9ydFJhbmdlVHlwZSA9PT0gJzNtb250aHMnKSB7XG4gICAgICAgIHJldHVybiBkaWZmRGF5cyA+PSAwICYmIGRpZmZEYXlzIDw9IDkwO1xuICAgICAgfVxuICAgICAgaWYgKGV4cG9ydFJhbmdlVHlwZSA9PT0gJzZtb250aHMnKSB7XG4gICAgICAgIHJldHVybiBkaWZmRGF5cyA+PSAwICYmIGRpZmZEYXlzIDw9IDE4MDtcbiAgICAgIH1cbiAgICAgIGlmIChleHBvcnRSYW5nZVR5cGUgPT09ICd5ZWFyJykge1xuICAgICAgICByZXR1cm4gZGlmZkRheXMgPj0gMCAmJiBkaWZmRGF5cyA8PSAzNjU7XG4gICAgICB9XG4gICAgICBpZiAoZXhwb3J0UmFuZ2VUeXBlID09PSAnY3VzdG9tJykge1xuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKGV4cG9ydFN0YXJ0RGF0ZSkuZ2V0VGltZSgpO1xuICAgICAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZShleHBvcnRFbmREYXRlKS5nZXRUaW1lKCk7XG4gICAgICAgIGNvbnN0IHNhbGVUaW1lID0gc2FsZURhdGUuZ2V0VGltZSgpO1xuICAgICAgICByZXR1cm4gc2FsZVRpbWUgPj0gc3RhcnQgJiYgc2FsZVRpbWUgPD0gZW5kO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICBpZiAoZmlsdGVyZWRTYWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGZpcmVUb2FzdChcbiAgICAgICAgbGFuZyA9PT0gJ2FyJyBcbiAgICAgICAgICA/ICfZhNinINiq2YjYrNivINmF2KjZiti52KfYqiDYo9mIINit2KzZiNiy2KfYqiDZhdiq2YjZgdix2Kkg2YHZiiDYp9mE2YbYt9in2YIg2KfZhNmF2K3Yr9ivIScgXG4gICAgICAgICAgOiAnTm8gc2FsZXMgb3IgYm9va2luZyBlbnRyaWVzIGV4aXN0IGluIHRoaXMgZHVyYXRpb24nLCBcbiAgICAgICAgJ2Vycm9yJ1xuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUcmFuc2xhdGUgaXRlbXMgdG8gYmVhdXRpZnVsIEFyYWJpYy9FbmdsaXNoIGV4Y2VsIGhlYWRlcnNcbiAgICBjb25zdCB4bHNEYXRhID0gZmlsdGVyZWRTYWxlcy5tYXAoKHNhbGUsIGluZGV4KSA9PiB7XG4gICAgICBpZiAobGFuZyA9PT0gJ2FyJykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICfZhSc6IGluZGV4ICsgMSxcbiAgICAgICAgICAn2YPZiNivINin2YTYs9mE2LnYqS/Yp9mE2K7Yr9mF2KknOiBzYWxlLmNvZGUsXG4gICAgICAgICAgJ9in2YTYp9iz2YUgLyDYp9mE2YXZiNiv2YrZhCc6IHNhbGUubmFtZSxcbiAgICAgICAgICAn2KfZhNiq2LXZhtmK2YEnOiBzYWxlLnR5cGUsXG4gICAgICAgICAgJ9in2LPZhSDYp9mE2LnZhdmK2YQnOiBzYWxlLmN1c3RvbWVyTmFtZSxcbiAgICAgICAgICAn2LHZgtmFINin2YTZh9in2KrZgSc6IHNhbGUuY3VzdG9tZXJQaG9uZSxcbiAgICAgICAgICAn2KfZhNmD2YXZitipINin2YTZhdio2KfYudipJzogc2FsZS5xdWFudGl0eSxcbiAgICAgICAgICAn2LPYudixINin2YTZiNit2K/YqSAo2Kwu2YUpJzogc2FsZS51bml0UHJpY2UsXG4gICAgICAgICAgJ9in2YTYpdis2YXYp9mE2Yog2YPZhNmKICjYrC7ZhSknOiBzYWxlLnRvdGFsUHJpY2UsXG4gICAgICAgICAgJ9iq2KfYsdmK2K4g2KfZhNin2LPYqtit2YLYp9mCL9iq2KfYsdmK2K4g2KfZhNio2YrYuSc6IHNhbGUuZGF0ZVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAnTm8nOiBpbmRleCArIDEsXG4gICAgICAgICAgJ0l0ZW0gQ29kZSc6IHNhbGUuY29kZSxcbiAgICAgICAgICAnTmFtZSAvIE1vZGVsJzogc2FsZS5uYW1lLFxuICAgICAgICAgICdDYXRlZ29yeSBUeXBlJzogc2FsZS50eXBlLFxuICAgICAgICAgICdDdXN0b21lciBOYW1lJzogc2FsZS5jdXN0b21lck5hbWUsXG4gICAgICAgICAgJ1Bob25lIFJlZmVyZW5jZSc6IHNhbGUuY3VzdG9tZXJQaG9uZSxcbiAgICAgICAgICAnUXVhbnRpdHknOiBzYWxlLnF1YW50aXR5LFxuICAgICAgICAgICdVbml0IFByaWNlIChFR1ApJzogc2FsZS51bml0UHJpY2UsXG4gICAgICAgICAgJ0FnZ3JlZ2F0ZSBUb3RhbCAoRUdQKSc6IHNhbGUudG90YWxQcmljZSxcbiAgICAgICAgICAnVHJhbnNhY3Rpb24gRGF0ZSc6IHNhbGUuZGF0ZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gR2VuZXJhdGUgU3ByZWFkc2hlZXQgd29ya3NoZWV0XG4gICAgY29uc3Qgd29ya3NoZWV0ID0gWExTWC51dGlscy5qc29uX3RvX3NoZWV0KHhsc0RhdGEpO1xuICAgIGNvbnN0IHdvcmtib29rID0gWExTWC51dGlscy5ib29rX25ldygpO1xuICAgIFhMU1gudXRpbHMuYm9va19hcHBlbmRfc2hlZXQod29ya2Jvb2ssIHdvcmtzaGVldCwgbGFuZyA9PT0gJ2FyJyA/ICfYs9is2YQg2KfZhNij2LHYqNin2K0g2YjYp9mE2YXYqNmK2LnYp9iqJyA6ICdTYWxlcyBKb3VybmFsJyk7XG4gICAgXG4gICAgWExTWC53cml0ZUZpbGUod29ya2Jvb2ssIGBFbEtob2x5X01vdG9yc19TYWxlc19SZXBvcnRfMjAyNi54bHN4YCk7XG4gICAgXG4gICAgZmlyZVRvYXN0KFxuICAgICAgbGFuZyA9PT0gJ2FyJyBcbiAgICAgICAgPyBg2KrZhSDYqtis2YXZiti5INmI2KrYtdiv2YrYsSDYp9mE2KrZgtix2YrYsSDYqNmG2KzYp9itISAoJHtmaWx0ZXJlZFNhbGVzLmxlbmd0aH0g2K3YsdmD2Kkg2KjZiti5L9it2KzYsilgIFxuICAgICAgICA6IGBTdWNjZXNzZnVsbHkgZXhwb3J0ZWQgcmVwb3J0IGNvbnRhaW5pbmcgJHtmaWx0ZXJlZFNhbGVzLmxlbmd0aH0gdHJhbnNhY3Rpb25zLmAsIFxuICAgICAgJ3N1Y2Nlc3MnXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZEJhY2t1cCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgemlwID0gbmV3IEpTWmlwKCk7XG4gICAgICBcbiAgICAgIC8vIDEuIE1vdG9yY3ljbGVzXG4gICAgICB6aXAuZmlsZShcIm1vdG9yY3ljbGVzX2JhY2t1cC5qc29uXCIsIEpTT04uc3RyaW5naWZ5KG1vdG9yY3ljbGVzLCBudWxsLCAyKSk7XG4gICAgICBcbiAgICAgIC8vIDIuIFN0b3JlIFByb2R1Y3RzXG4gICAgICB6aXAuZmlsZShcInN0b3JlX3Byb2R1Y3RzX2JhY2t1cC5qc29uXCIsIEpTT04uc3RyaW5naWZ5KHN0b3JlUHJvZHVjdHMgfHwgW10sIG51bGwsIDIpKTtcbiAgICAgIFxuICAgICAgLy8gMy4gQ3VzdG9tIFRleHRcbiAgICAgIHppcC5maWxlKFwiY3VzdG9tX3RleHRfYmFja3VwLmpzb25cIiwgSlNPTi5zdHJpbmdpZnkoY3VzdG9tVGV4dCB8fCB7fSwgbnVsbCwgMikpO1xuICAgICAgXG4gICAgICAvLyA0LiBIb21lcGFnZSBDb25maWdcbiAgICAgIHppcC5maWxlKFwiaG9tZXBhZ2VfY29uZmlnX2JhY2t1cC5qc29uXCIsIEpTT04uc3RyaW5naWZ5KGJ1aWxkZXJDb25maWcgfHwgREVGQVVMVF9IT01FUEFHRV9DT05GSUcsIG51bGwsIDIpKTtcbiAgICAgIFxuICAgICAgLy8gNS4gQm9va2luZ3NcbiAgICAgIHppcC5maWxlKFwiYm9va2luZ3NfYmFja3VwLmpzb25cIiwgSlNPTi5zdHJpbmdpZnkoYm9va2luZ3MgfHwgW10sIG51bGwsIDIpKTtcbiAgICAgIFxuICAgICAgLy8gNi4gVXNlcnNcbiAgICAgIHppcC5maWxlKFwidXNlcnNfYmFja3VwLmpzb25cIiwgSlNPTi5zdHJpbmdpZnkodXNlcnMgfHwgW10sIG51bGwsIDIpKTtcbiAgICAgIFxuICAgICAgLy8gTWV0YWRhdGEvUmVhZG1lXG4gICAgICB6aXAuZmlsZShcIlJFQURNRV9CQUNLVVAudHh0XCIsIGBFTEtIT0xZIE1PVE9SUyBDT01QTEVURSBTWVNURU0gQkFDS1VQXG5HZW5lcmF0ZWQ6ICR7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfVxuVGltZXN0YW1wOiAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX1cblxuVGhpcyBaSVAgZmlsZSBjb250YWlucyBjb21wbGV0ZSBzeXN0ZW0gZmlsZXMgYW5kIGRhdGFiYXNlIGNvbmZpZ3VyYXRpb25zIChNb3RvcmN5Y2xlcywgU3RvcmUgcHJvZHVjdHMsIEN1c3RvbWl6ZSBsYXlvdXRzLCByZXNlcnZhdGlvbnMsIGFuZCBhZG1pbiBhY2NvdW50cykuIFxuRG8gTk9UIGVkaXQgb3IgcmVuYW1lIHRoZSBqc29uIGZpbGVzIGluc2lkZSB0aGlzIGFyY2hpdmUgdG8gZW5zdXJlIGZsYXdsZXNzIHN5bmNocm9uaXphdGlvbiB3aGVuIHJlc3RvcmluZyBpbiB0aGUgZnV0dXJlLmApO1xuXG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgemlwLmdlbmVyYXRlQXN5bmMoeyB0eXBlOiBcImJsb2JcIiB9KTtcbiAgICAgIGNvbnN0IGRsVVJMID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoY29udGVudCk7XG4gICAgICBjb25zdCB0ZW1wTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgdGVtcExpbmsuaHJlZiA9IGRsVVJMO1xuICAgICAgdGVtcExpbmsuZG93bmxvYWQgPSBgZWxraG9seV9zaXRlX2JhY2t1cF8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCl9LnppcGA7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRlbXBMaW5rKTtcbiAgICAgIHRlbXBMaW5rLmNsaWNrKCk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRlbXBMaW5rKTtcbiAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGRsVVJMKTtcblxuICAgICAgZmlyZVRvYXN0KFxuICAgICAgICBsYW5nID09PSAnYXInXG4gICAgICAgICAgPyAn2KrZhSDYpdmG2LTYp9ihINmG2LPYrtipINin2K3YqtmK2KfYt9mK2Kkg2YPYp9mF2YTYqSDZhNmE2YXZiNmC2Lkg2YjYqtit2YXZitmE2YfYpyDZg9mF2YTZgSDZhdi22LrZiNi3INio2YbYrNin2K0hIPCfk6YnXG4gICAgICAgICAgOiAnQ29tcGxldGUgc2l0ZSBiYWNrdXAgZ2VuZXJhdGVkIGFuZCBkb3dubG9hZGVkIHN1Y2Nlc3NmdWxseSEg8J+TpicsXG4gICAgICAgICdzdWNjZXNzJ1xuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJCYWNrdXAgZ2VuZXJhdGlvbiBmYWlsZWQ6XCIsIGVycik7XG4gICAgICBmaXJlVG9hc3QoXG4gICAgICAgIGxhbmcgPT09ICdhcicgPyAn2YHYtNmEINil2YbYtNin2KEg2YXZhNmBINin2YTZhtiz2K7YqSDYp9mE2KfYrdiq2YrYp9i32YrYqSEnIDogJ0ZhaWxlZCB0byBnZW5lcmF0ZSBhcmNoaXZlIGJhY2t1cCEnLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZXN0b3JlQmFja3VwID0gYXN5bmMgKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgaWYgKCFmaWxlKSByZXR1cm47XG5cbiAgICBpZiAoc2Vzc2lvblVzZXI/LnJvbGUgIT09ICdBZG1pbicpIHtcbiAgICAgIGZpcmVUb2FzdChcbiAgICAgICAgbGFuZyA9PT0gJ2FyJyA/ICfYudiw2LHYp9mLISDYp9mE2LXZhNin2K3ZitipINi62YrYsSDZg9in2YHZitipINmE2LnZhdmEINin2LPYqti52KfYr9ipINmE2YTZhdmI2YLYuS4nIDogJ1ByaXZpbGVnZSBCcmVhY2g6IE9ubHkgTWFzdGVyIEFkbWluaXN0cmF0b3JzIGNhbiByZXN0b3JlIGJhY2t1cCBhcmNoaXZlcycsXG4gICAgICAgICdlcnJvcidcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25sb2FkID0gYXN5bmMgKGV2dCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYnVmZmVyID0gZXZ0LnRhcmdldD8ucmVzdWx0IGFzIEFycmF5QnVmZmVyO1xuICAgICAgICBjb25zdCB6aXAgPSBhd2FpdCBKU1ppcC5sb2FkQXN5bmMoYnVmZmVyKTtcblxuICAgICAgICAvLyBUcmFjayB3aGF0IHdlIHJlY292ZXJlZFxuICAgICAgICBsZXQgcmVzdG9yZWRDb3VudCA9IDA7XG5cbiAgICAgICAgLy8gMS4gTW90b3JjeWNsZXNcbiAgICAgICAgY29uc3QgYmlrZXNGaWxlID0gemlwLmZpbGUoXCJtb3RvcmN5Y2xlc19iYWNrdXAuanNvblwiKTtcbiAgICAgICAgaWYgKGJpa2VzRmlsZSkge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBiaWtlc0ZpbGUuYXN5bmMoXCJzdHJpbmdcIik7XG4gICAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJzZWQpKSB7XG4gICAgICAgICAgICBvblVwZGF0ZU1vdG9yY3ljbGVzKHBhcnNlZCk7XG4gICAgICAgICAgICByZXN0b3JlZENvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gMi4gU3RvcmUgcHJvZHVjdHNcbiAgICAgICAgY29uc3QgcHJvZHVjdHNGaWxlID0gemlwLmZpbGUoXCJzdG9yZV9wcm9kdWN0c19iYWNrdXAuanNvblwiKTtcbiAgICAgICAgaWYgKHByb2R1Y3RzRmlsZSAmJiBvblVwZGF0ZVN0b3JlUHJvZHVjdHMpIHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgcHJvZHVjdHNGaWxlLmFzeW5jKFwic3RyaW5nXCIpO1xuICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyc2VkKSkge1xuICAgICAgICAgICAgb25VcGRhdGVTdG9yZVByb2R1Y3RzKHBhcnNlZCk7XG4gICAgICAgICAgICByZXN0b3JlZENvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gMy4gQ3VzdG9tIHRyYW5zbGF0aW9uIHNldHRpbmdzXG4gICAgICAgIGNvbnN0IHRleHRGaWxlID0gemlwLmZpbGUoXCJjdXN0b21fdGV4dF9iYWNrdXAuanNvblwiKTtcbiAgICAgICAgaWYgKHRleHRGaWxlKSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRleHRGaWxlLmFzeW5jKFwic3RyaW5nXCIpO1xuICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICAgICAgb25VcGRhdGVDdXN0b21UZXh0KHBhcnNlZCk7XG4gICAgICAgICAgcmVzdG9yZWRDb3VudCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gNC4gSG9tZXBhZ2UgY29uZmlnXG4gICAgICAgIGNvbnN0IGNvbmZpZ0ZpbGUgPSB6aXAuZmlsZShcImhvbWVwYWdlX2NvbmZpZ19iYWNrdXAuanNvblwiKTtcbiAgICAgICAgaWYgKGNvbmZpZ0ZpbGUpIHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgY29uZmlnRmlsZS5hc3luYyhcInN0cmluZ1wiKTtcbiAgICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgICAgICAgIHNldEJ1aWxkZXJDb25maWcocGFyc2VkKTtcbiAgICAgICAgICBvblVwZGF0ZUhvbWVwYWdlQ29uZmlnKHBhcnNlZCk7XG4gICAgICAgICAgcmVzdG9yZWRDb3VudCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gNS4gQm9va2luZ3NcbiAgICAgICAgY29uc3QgYm9va2luZ3NGaWxlID0gemlwLmZpbGUoXCJib29raW5nc19iYWNrdXAuanNvblwiKTtcbiAgICAgICAgaWYgKGJvb2tpbmdzRmlsZSkge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBib29raW5nc0ZpbGUuYXN5bmMoXCJzdHJpbmdcIik7XG4gICAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJzZWQpKSB7XG4gICAgICAgICAgICBzZXRCb29raW5ncyhwYXJzZWQpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfYm9va2luZ3MnLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgICAgICAgICAgIHJlc3RvcmVkQ291bnQrKztcblxuICAgICAgICAgICAgLy8gQ2xvdWQgRmlyZXN0b3JlIFN5bmMgKG9wdGlvbmFsL2dyYWNlZnVsKVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBiIG9mIHBhcnNlZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHNldERvYyhkb2MoZGIsICdib29raW5ncycsIGIuaWQpLCBiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBzeW5jIHJlc3RvcmVkIGJvb2tpbmdzIHRvIEZpcmVzdG9yZTpcIiwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gNi4gVXNlcnMgYWNjb3VudHNcbiAgICAgICAgY29uc3QgdXNlcnNGaWxlID0gemlwLmZpbGUoXCJ1c2Vyc19iYWNrdXAuanNvblwiKTtcbiAgICAgICAgaWYgKHVzZXJzRmlsZSkge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB1c2Vyc0ZpbGUuYXN5bmMoXCJzdHJpbmdcIik7XG4gICAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJzZWQpKSB7XG4gICAgICAgICAgICBzZXRVc2VycyhwYXJzZWQpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfdXNlcnMnLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgICAgICAgICAgIHJlc3RvcmVkQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdG9yZWRDb3VudCA+IDApIHtcbiAgICAgICAgICBmaXJlVG9hc3QoXG4gICAgICAgICAgICBsYW5nID09PSAnYXInXG4gICAgICAgICAgICAgID8gJ9iq2YXYqiDYp9iz2KrYudin2K/YqSDYp9mE2YbYs9iu2Kkg2KfZhNin2K3YqtmK2KfYt9mK2Kkg2YjYqti32KjZitmC2YfYpyDYudmE2Ykg2K7ZiNin2K/ZhSDYp9mE2YXZiNmC2Lkg2KjZhtis2KfYrSEg8J+agPCflIQnXG4gICAgICAgICAgICAgIDogJ1Jlc3RvcmUgc2VxdWVuY2Ugc3VjY2Vzc2Z1bCEgQWxsIGRhdGFiYXNlcyB1cGRhdGVkIGluIHJlYWwtdGltZS4g8J+agPCflIQnLFxuICAgICAgICAgICAgJ3N1Y2Nlc3MnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaXJlVG9hc3QoXG4gICAgICAgICAgICBsYW5nID09PSAnYXInXG4gICAgICAgICAgICAgID8gJ9mE2YUg2YrYqtmFINin2YTYudir2YjYsSDYudmE2Ykg2YXZhNmB2KfYqiDYp9it2KrZitin2LfZitipINi12KfZhNit2Kkg2K/Yp9iu2YQg2KfZhNij2LHYtNmK2YEg2KfZhNmF2LbYutmI2LchJ1xuICAgICAgICAgICAgICA6ICdTZWxlY3RlZCBaSVAgZG9lcyBub3QgY29udGFpbiBjb21wbGlhbnQgRWxLaG9seSBKU09OIGRhdGFiYXNlIGJhY2t1cHMhJyxcbiAgICAgICAgICAgICdlcnJvcidcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVzZXQgaW5wdXQgZWxlbWVudFxuICAgICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXN0b3JlIGZhaWxlZDpcIiwgZXJyKTtcbiAgICAgICAgZmlyZVRvYXN0KFxuICAgICAgICAgIGxhbmcgPT09ICdhcidcbiAgICAgICAgICAgID8gJ9iu2LfYoyDYutmK2LEg2YXYqtmI2YLYuSDYo9ir2YbYp9ihINin2LPYqtiu2LHYp9isINin2YTZhtiz2K7YqSDYp9mE2KfYrdiq2YrYp9i32YrYqSEnXG4gICAgICAgICAgICA6ICdVbnJlY29nbml6ZWQgc3RydWN0dXJlISBVbnppcCBvcGVyYXRpb24gdGVybWluYXRlZCB1bmV4cGVjdGVkbHkuJyxcbiAgICAgICAgICAnZXJyb3InXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlKTtcbiAgfTtcblxuICBjb25zdCBnZW5lcmF0ZVVuaWZpZWRCYWNrdXBEYXRhID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBcImVsa2hvbHlfYmFja3VwX2pzb25cIixcbiAgICAgIHZlcnNpb246IFwiMS4wXCIsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIG1vdG9yY3ljbGVzOiBtb3RvcmN5Y2xlcyB8fCBbXSxcbiAgICAgIHN0b3JlUHJvZHVjdHM6IHN0b3JlUHJvZHVjdHMgfHwgW10sXG4gICAgICBjdXN0b21UZXh0OiBjdXN0b21UZXh0IHx8IHt9LFxuICAgICAgaG9tZXBhZ2VDb25maWc6IGJ1aWxkZXJDb25maWcgfHwgREVGQVVMVF9IT01FUEFHRV9DT05GSUcsXG4gICAgICBib29raW5nczogYm9va2luZ3MgfHwgW10sXG4gICAgICB1c2VyczogdXNlcnMgfHwgW11cbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IGFwcGx5VW5pZmllZEJhY2t1cERhdGEgPSAoZGF0YTogYW55KSA9PiB7XG4gICAgaWYgKCFkYXRhIHx8IGRhdGEudHlwZSAhPT0gXCJlbGtob2x5X2JhY2t1cF9qc29uXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYmFja3VwIGZvcm1hdFwiKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdG9yZWRDb3VudCA9IDA7XG5cbiAgICAvLyAxLiBNb3RvcmN5Y2xlc1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEubW90b3JjeWNsZXMpKSB7XG4gICAgICBvblVwZGF0ZU1vdG9yY3ljbGVzKGRhdGEubW90b3JjeWNsZXMpO1xuICAgICAgcmVzdG9yZWRDb3VudCsrO1xuICAgIH1cblxuICAgIC8vIDIuIFN0b3JlIFByb2R1Y3RzXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YS5zdG9yZVByb2R1Y3RzKSAmJiBvblVwZGF0ZVN0b3JlUHJvZHVjdHMpIHtcbiAgICAgIG9uVXBkYXRlU3RvcmVQcm9kdWN0cyhkYXRhLnN0b3JlUHJvZHVjdHMpO1xuICAgICAgcmVzdG9yZWRDb3VudCsrO1xuICAgIH1cblxuICAgIC8vIDMuIEN1c3RvbSBUZXh0XG4gICAgaWYgKGRhdGEuY3VzdG9tVGV4dCkge1xuICAgICAgb25VcGRhdGVDdXN0b21UZXh0KGRhdGEuY3VzdG9tVGV4dCk7XG4gICAgICByZXN0b3JlZENvdW50Kys7XG4gICAgfVxuXG4gICAgLy8gNC4gSG9tZXBhZ2UgQ29uZmlnXG4gICAgaWYgKGRhdGEuaG9tZXBhZ2VDb25maWcpIHtcbiAgICAgIHNldEJ1aWxkZXJDb25maWcoZGF0YS5ob21lcGFnZUNvbmZpZyk7XG4gICAgICBvblVwZGF0ZUhvbWVwYWdlQ29uZmlnKGRhdGEuaG9tZXBhZ2VDb25maWcpO1xuICAgICAgcmVzdG9yZWRDb3VudCsrO1xuICAgIH1cblxuICAgIC8vIDUuIEJvb2tpbmdzXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YS5ib29raW5ncykpIHtcbiAgICAgIHNldEJvb2tpbmdzKGRhdGEuYm9va2luZ3MpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfYm9va2luZ3MnLCBKU09OLnN0cmluZ2lmeShkYXRhLmJvb2tpbmdzKSk7XG4gICAgICByZXN0b3JlZENvdW50Kys7XG4gICAgICAvLyBTeW5jIHRvIGZpcmVzdG9yZSBnZW50bHlcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEuYm9va2luZ3MuZm9yRWFjaCgoYjogYW55KSA9PiB7XG4gICAgICAgICAgc2V0RG9jKGRvYyhkYiwgJ2Jvb2tpbmdzJywgYi5pZCksIGIpLmNhdGNoKGVyciA9PiBjb25zb2xlLndhcm4oXCJTeW5jIGZhaWxlZCBmb3IgYm9va2luZ1wiLCBiLmlkKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBzeW5jIHJlc3RvcmVkIGJvb2tpbmdzIHRvIEZpcmVzdG9yZTpcIiwgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyA2LiBVc2Vyc1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEudXNlcnMpKSB7XG4gICAgICBzZXRVc2VycyhkYXRhLnVzZXJzKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X3VzZXJzJywgSlNPTi5zdHJpbmdpZnkoZGF0YS51c2VycykpO1xuICAgICAgcmVzdG9yZWRDb3VudCsrO1xuICAgIH1cblxuICAgIHJldHVybiByZXN0b3JlZENvdW50O1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUV4cG9ydFRvR2l0SHViID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghZ2l0aHViVG9rZW4udHJpbSgpKSB7XG4gICAgICBmaXJlVG9hc3QoXG4gICAgICAgIGxhbmcgPT09ICdhcicgPyAn2YrYsdis2Ykg2KXYr9iu2KfZhCDYsdmF2LIg2KfZhNmI2LXZiNmEINin2YTYtNiu2LXZiiAoVG9rZW4pINmE2K3Ys9in2KggR2l0SHViJyA6ICdQbGVhc2UgcHJvdmlkZSBhIEdpdEh1YiBQZXJzb25hbCBBY2Nlc3MgVG9rZW4nLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWdpdGh1YlJlcG8udHJpbSgpIHx8ICFnaXRodWJSZXBvLmluY2x1ZGVzKCcvJykpIHtcbiAgICAgIGZpcmVUb2FzdChcbiAgICAgICAgbGFuZyA9PT0gJ2FyJyA/ICfZitix2KzZiSDYpdiv2K7Yp9mEINmF2LPYp9ixINin2YTZhdiz2KrZiNiv2Lkg2KjYp9mE2LTZg9mEINin2YTYtdit2YrYrSAodXNlcm5hbWUvcmVwbyknIDogJ0ludmFsaWQgcmVwb3NpdG9yeSBwYXRoLiBVc2UgZm9ybWF0OiB1c2VybmFtZS9yZXBvLW5hbWUnLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldElzR2l0aHViRXhwb3J0aW5nKHRydWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJhY2t1cERhdGEgPSBnZW5lcmF0ZVVuaWZpZWRCYWNrdXBEYXRhKCk7XG4gICAgICBjb25zdCBjb250ZW50U3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoYmFja3VwRGF0YSwgbnVsbCwgMik7XG4gICAgICBcbiAgICAgIC8vIFdlIG11c3QgZW5jb2RlIHRoZSBjb250ZW50IHRvIFVURi04IEJhc2U2NC5cbiAgICAgIC8vIGJ0b2Egd2l0aCB1bmVzY2FwZSBoYW5kbGVzIG11bHRpLWJ5dGUgKEFyYWJpYykgY2hhcmFjdGVycyBjb3JyZWN0bHkhXG4gICAgICBjb25zdCBjb250ZW50QmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoY29udGVudFN0cmluZykpKTtcblxuICAgICAgY29uc3QgY2xlYW5SZXBvID0gZ2l0aHViUmVwby50cmltKCk7XG4gICAgICBjb25zdCBjbGVhbkJyYW5jaCA9IGdpdGh1YkJyYW5jaC50cmltKCkgfHwgJ21haW4nO1xuICAgICAgY29uc3QgY2xlYW5QYXRoID0gZ2l0aHViUGF0aC50cmltKCkgfHwgJ2Vsa2hvbHlfYmFja3VwLmpzb24nO1xuXG4gICAgICAvLyAxLiBDaGVjayBpZiB0aGUgZmlsZSBhbHJlYWR5IGV4aXN0cyB0byBnZXQgaXRzIFNIQVxuICAgICAgbGV0IGZpbGVTaGE6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2hlY2tSZXMgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgICBgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8ke2NsZWFuUmVwb30vY29udGVudHMvJHtjbGVhblBhdGh9P3JlZj0ke2NsZWFuQnJhbmNofWAsXG4gICAgICAgICAge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGB0b2tlbiAke2dpdGh1YlRva2VuLnRyaW0oKX1gLFxuICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL3ZuZC5naXRodWIudjMranNvbidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGlmIChjaGVja1Jlcy5vaykge1xuICAgICAgICAgIGNvbnN0IGNoZWNrRGF0YSA9IGF3YWl0IGNoZWNrUmVzLmpzb24oKTtcbiAgICAgICAgICBmaWxlU2hhID0gY2hlY2tEYXRhLnNoYTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSBkb2VzIG5vdCBleGlzdCB5ZXQgb3IgZXJyb3IgZ2V0dGluZyBTSEEsIHByb2NlZWRpbmcgd2l0aG91dCBTSEE6XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIC8vIDIuIFBlcmZvcm0gdGhlIFBVVCByZXF1ZXN0XG4gICAgICBjb25zdCBwdXRCb2R5OiBhbnkgPSB7XG4gICAgICAgIG1lc3NhZ2U6IGBFbEtob2x5IE1vdG9ycyBhdXRvbWF0aWMgc3lzdGVtIGJhY2t1cCAtICR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfWAsXG4gICAgICAgIGNvbnRlbnQ6IGNvbnRlbnRCYXNlNjQsXG4gICAgICAgIGJyYW5jaDogY2xlYW5CcmFuY2hcbiAgICAgIH07XG4gICAgICBpZiAoZmlsZVNoYSkge1xuICAgICAgICBwdXRCb2R5LnNoYSA9IGZpbGVTaGE7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHB1dFJlcyA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8ke2NsZWFuUmVwb30vY29udGVudHMvJHtjbGVhblBhdGh9YCxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgdG9rZW4gJHtnaXRodWJUb2tlbi50cmltKCl9YCxcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vdm5kLmdpdGh1Yi52Mytqc29uJyxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHB1dEJvZHkpXG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIGlmIChwdXRSZXMub2spIHtcbiAgICAgICAgLy8gU2F2ZSBjb25maWcgaW4gbG9jYWxTdG9yYWdlXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X2dpdGh1Yl90b2tlbicsIGdpdGh1YlRva2VuLnRyaW0oKSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X2dpdGh1Yl9yZXBvJywgY2xlYW5SZXBvKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfZ2l0aHViX2JyYW5jaCcsIGNsZWFuQnJhbmNoKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfZ2l0aHViX3BhdGgnLCBjbGVhblBhdGgpO1xuXG4gICAgICAgIGZpcmVUb2FzdChcbiAgICAgICAgICBsYW5nID09PSAnYXInXG4gICAgICAgICAgICA/ICfYqtmFINiq2LXYr9mK2LEg2KfZhNmG2LPYrtipINin2YTYp9it2KrZitin2LfZitipINio2YbYrNin2K0g2KXZhNmJINmF2LPYqtmI2K/YuSBHaXRIdWIhIPCfmoDwn5OCJ1xuICAgICAgICAgICAgOiAnT3BlcmF0aW9uYWwgY2F0YWxvZyBkYXRhIHB1c2hlZCBzdWNjZXNzZnVsbHkgdG8gR2l0SHViIHJlcG9zaXRvcnkhIPCfmoDwn5OCJyxcbiAgICAgICAgICAnc3VjY2VzcydcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVyckpzb24gPSBhd2FpdCBwdXRSZXMuanNvbigpLmNhdGNoKCgpID0+ICh7IG1lc3NhZ2U6ICdVbmtub3duIGVycm9yJyB9KSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJKc29uLm1lc3NhZ2UgfHwgYEhUVFAgJHtwdXRSZXMuc3RhdHVzfWApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiR2l0SHViIEV4cG9ydCBGYWlsZWQ6XCIsIGVycik7XG4gICAgICBmaXJlVG9hc3QoXG4gICAgICAgIGxhbmcgPT09ICdhcidcbiAgICAgICAgICA/IGDYudiw2LHYp9mL2Iwg2YHYtNmEINin2YTYqti12K/ZitixINmE2YAgR2l0SHViOiAke2Vyci5tZXNzYWdlIHx8ICfYqtij2YPYryDZhdmGINin2YTYsdmF2LIg2YjYtdit2Kkg2KfZhNmF2LPYqtmI2K/YuSd9YFxuICAgICAgICAgIDogYEdpdEh1YiBjb25uZWN0aW9uIHRlcm1pbmF0aW9uOiAke2Vyci5tZXNzYWdlIHx8ICdJbnZhbGlkIFBBVC9SZXBvIFBlcm1pc3Npb25zJ31gLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0dpdGh1YkV4cG9ydGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUltcG9ydEJ5VXJsID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghZ2l0aHViSW1wb3J0VXJsLnRyaW0oKSkge1xuICAgICAgZmlyZVRvYXN0KFxuICAgICAgICBsYW5nID09PSAnYXInID8gJ9mK2LHYrNmJINil2K/Yrtin2YQg2LHYp9io2Lcg2YXZhNmBINin2YTZhtiz2K7YqSDYp9mE2KfYrdiq2YrYp9i32YrYqSDYp9mE2YXYqNin2LTYsScgOiAnUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBkaXJlY3QgYmFja3VwIFVSTCcsXG4gICAgICAgICdlcnJvcidcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHNlc3Npb25Vc2VyPy5yb2xlICE9PSAnQWRtaW4nKSB7XG4gICAgICBmaXJlVG9hc3QoXG4gICAgICAgIGxhbmcgPT09ICdhcicgPyAn2LnYsNix2KfZiyEg2KfZhNi12YTYp9it2YrYqSDYutmK2LEg2YPYp9mB2YrYqSDZhNi52YXZhCDYp9iz2KrYudin2K/YqSDZhNmE2YXZiNmC2LkuJyA6ICdQcml2aWxlZ2UgQnJlYWNoOiBPbmx5IE1hc3RlciBBZG1pbmlzdHJhdG9ycyBjYW4gcmVzdG9yZSBiYWNrdXAgYXJjaGl2ZXMnLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldElzR2l0aHViSW1wb3J0aW5nKHRydWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIERpcmVjdCByYXcgbGluayByZXNvbHZlcjogaWYgZ2l0aHViLmNvbSBpcyBwcm92aWRlZCBidXQgbm90IHJhdy5naXRodWJ1c2VyY29udGVudC5jb20sIHRyeSB0byBmcmllbmRseSBjb252ZXJ0IGl0IVxuICAgICAgbGV0IHJlc29sdmVkVXJsID0gZ2l0aHViSW1wb3J0VXJsLnRyaW0oKTtcbiAgICAgIGlmIChyZXNvbHZlZFVybC5pbmNsdWRlcygnZ2l0aHViLmNvbScpICYmICFyZXNvbHZlZFVybC5pbmNsdWRlcygncmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbScpICYmIHJlc29sdmVkVXJsLmluY2x1ZGVzKCcvYmxvYi8nKSkge1xuICAgICAgICByZXNvbHZlZFVybCA9IHJlc29sdmVkVXJsXG4gICAgICAgICAgLnJlcGxhY2UoJ2dpdGh1Yi5jb20nLCAncmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbScpXG4gICAgICAgICAgLnJlcGxhY2UoJy9ibG9iLycsICcvJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHJlc29sdmVkVXJsKTtcbiAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoIGZpbGUgKEhUVFAgJHtyZXMuc3RhdHVzfSlgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmFja3VwRGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgICBjb25zdCBjb3VudCA9IGFwcGx5VW5pZmllZEJhY2t1cERhdGEoYmFja3VwRGF0YSk7XG5cbiAgICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgICAgZmlyZVRvYXN0KFxuICAgICAgICAgIGxhbmcgPT09ICdhcidcbiAgICAgICAgICAgID8gJ9iq2YUg2KzZhNioINmI2KfYs9iq2LnYp9iv2Kkg2KfZhNio2YrYp9mG2KfYqiDZhdmGINin2YTYsdin2KjYtyDYqNmG2KzYp9itISDwn5qA8J+UhCdcbiAgICAgICAgICAgIDogJ0RhdGEgaW1wb3J0ZWQgYW5kIHN5c3RlbSBtb2R1bGVzIHN5bmNocm9uaXplZCBmcm9tIHJlbW90ZSBVUkwhIPCfmoDwn5SEJyxcbiAgICAgICAgICAnc3VjY2VzcydcbiAgICAgICAgKTtcbiAgICAgICAgc2V0R2l0aHViSW1wb3J0VXJsKCcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGNvbXBhdGlibGUgdGFibGVzIHJlc3RvcmVkXCIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiUmVtb3RlIEltcG9ydCBGYWlsZWQ6XCIsIGVycik7XG4gICAgICBmaXJlVG9hc3QoXG4gICAgICAgIGxhbmcgPT09ICdhcidcbiAgICAgICAgICA/IGDYudiw2LHYp9mL2Iwg2YHYtNmEINis2YTYqCDYp9mE2KjZitin2YbYp9iqOiAke2Vyci5tZXNzYWdlIHx8ICfYqtij2YPYryDZhdmGINi12YTYp9it2YrYqSDYp9mE2LHYp9io2Lcg2YjZhdmE2YEg2KfZhNmAIEpTT04nfWBcbiAgICAgICAgICA6IGBJbXBvcnQgZmFpbGVkOiAke2Vyci5tZXNzYWdlIHx8ICdFbnN1cmUgVVJMIHBvaW50cyB0byBhIHB1YmxpYywgdmFsaWQgYmFja3VwIEpTT04nfWAsXG4gICAgICAgICdlcnJvcidcbiAgICAgICk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzR2l0aHViSW1wb3J0aW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUHVzaEVudGlyZVByb2plY3RUb0dpdEh1YiA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWdpdGh1YlRva2VuLnRyaW0oKSkge1xuICAgICAgZmlyZVRvYXN0KFxuICAgICAgICBsYW5nID09PSAnYXInID8gJ9mK2LHYrNmJINil2K/Yrtin2YQg2LHZhdiyINin2YTZiNi12YjZhCDYp9mE2LTYrti12YogKFRva2VuKSDZhNit2LPYp9ioIEdpdEh1YicgOiAnUGxlYXNlIHByb3ZpZGUgYSBHaXRIdWIgUGVyc29uYWwgQWNjZXNzIFRva2VuJyxcbiAgICAgICAgJ2Vycm9yJ1xuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFnaXRodWJSZXBvLnRyaW0oKSB8fCAhZ2l0aHViUmVwby5pbmNsdWRlcygnLycpKSB7XG4gICAgICBmaXJlVG9hc3QoXG4gICAgICAgIGxhbmcgPT09ICdhcicgPyAn2YrYsdis2Ykg2KXYr9iu2KfZhCDZhdiz2KfYsSDYp9mE2YXYs9iq2YjYr9i5INio2KfZhNi02YPZhCDYp9mE2LXYrdmK2K0gKHVzZXJuYW1lL3JlcG8pJyA6ICdJbnZhbGlkIHJlcG9zaXRvcnkgcGF0aC4gVXNlIGZvcm1hdDogdXNlcm5hbWUvcmVwby1uYW1lJyxcbiAgICAgICAgJ2Vycm9yJ1xuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRJc1B1c2hpbmdQcm9qZWN0KHRydWUpO1xuICAgIHNldFByb2plY3RQdXNoU3RlcChsYW5nID09PSAnYXInID8gJ9in2YTYqNiv2KEg2YjYqtis2YfZitiyINin2YTYrdiy2YUuLi4nIDogJ0luaXRpYWxpemluZyBwYWNrYWdlIGRhdGEuLi4nKTtcblxuICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICAnQXV0aG9yaXphdGlvbic6IGB0b2tlbiAke2dpdGh1YlRva2VuLnRyaW0oKX1gLFxuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi92bmQuZ2l0aHViLnYzK2pzb24nLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgIH07XG5cbiAgICBjb25zdCBjbGVhblJlcG8gPSBnaXRodWJSZXBvLnRyaW0oKTtcbiAgICBjb25zdCBjbGVhbkJyYW5jaCA9IGdpdGh1YkJyYW5jaC50cmltKCkgfHwgJ21haW4nO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIDEuIEdldCByZWZlcmVuY2UgdG8gdGFyZ2V0IGJyYW5jaFxuICAgICAgc2V0UHJvamVjdFB1c2hTdGVwKGxhbmcgPT09ICdhcicgPyAn2KzYp9ix2Yog2KfZhNin2KrYtdin2YQg2KjZgCBHaXRIdWIg2YjYrNmE2Kgg2KLYrtixINin2YTYqtiy2KfZhS4uLicgOiAnQ29ubmVjdGluZyB0byBHaXRIdWIgJiBmZXRjaGluZyB0YXJnZXQgcmVmLi4uJyk7XG4gICAgICBjb25zdCByZWZSZXMgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8ke2NsZWFuUmVwb30vZ2l0L3JlZi9oZWFkcy8ke2NsZWFuQnJhbmNofWAsIHsgaGVhZGVycyB9KTtcbiAgICAgIFxuICAgICAgbGV0IHBhcmVudENvbW1pdFNoYSA9ICcnO1xuICAgICAgbGV0IGJhc2VUcmVlU2hhID0gJyc7XG4gICAgICBsZXQgaGFzRXhpc3RpbmdCcmFuY2ggPSByZWZSZXMub2s7XG5cbiAgICAgIGlmIChoYXNFeGlzdGluZ0JyYW5jaCkge1xuICAgICAgICBjb25zdCByZWZEYXRhID0gYXdhaXQgcmVmUmVzLmpzb24oKTtcbiAgICAgICAgcGFyZW50Q29tbWl0U2hhID0gcmVmRGF0YS5vYmplY3Quc2hhO1xuXG4gICAgICAgIC8vIEdldCBjb21taXQgZGV0YWlscyB0byByZXNvbHZlIGl0cyB0cmVlIFNIQVxuICAgICAgICBjb25zdCBjb21taXRSZXMgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8ke2NsZWFuUmVwb30vZ2l0L2NvbW1pdHMvJHtwYXJlbnRDb21taXRTaGF9YCwgeyBoZWFkZXJzIH0pO1xuICAgICAgICBpZiAoY29tbWl0UmVzLm9rKSB7XG4gICAgICAgICAgY29uc3QgY29tbWl0RGF0YSA9IGF3YWl0IGNvbW1pdFJlcy5qc29uKCk7XG4gICAgICAgICAgYmFzZVRyZWVTaGEgPSBjb21taXREYXRhLnRyZWUuc2hhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIDIuIFByZXBhcmUgZmlsZXMgY29tcGlsYXRpb25cbiAgICAgIGNvbnN0IGZpbGVzVG9VcGxvYWQgPSBbXG4gICAgICAgICdwYWNrYWdlLmpzb24nLFxuICAgICAgICAndHNjb25maWcuanNvbicsXG4gICAgICAgICd2aXRlLmNvbmZpZy50cycsXG4gICAgICAgICdpbmRleC5odG1sJyxcbiAgICAgICAgJy5naXRpZ25vcmUnLFxuICAgICAgICAnLmVudi5leGFtcGxlJyxcbiAgICAgICAgJ3NyYy9tYWluLnRzeCcsXG4gICAgICAgICdzcmMvQXBwLnRzeCcsXG4gICAgICAgICdzcmMvaW5kZXguY3NzJyxcbiAgICAgICAgJ3NyYy90eXBlcy50cycsXG4gICAgICAgICdzcmMvdHJhbnNsYXRpb25zLnRzJyxcbiAgICAgICAgJ3NyYy9kYXRhLnRzJyxcbiAgICAgICAgJ3NyYy9kYXRhU3RvcmVNb2NrLnRzJyxcbiAgICAgICAgJ3NyYy92aXRlLWVudi5kLnRzJyxcbiAgICAgICAgJ3NyYy9jb250ZXh0L0xhbmd1YWdlQ29udGV4dC50c3gnLFxuICAgICAgICAnc3JjL2xpYi9maXJlYmFzZS50cycsXG4gICAgICAgICdzcmMvY29tcG9uZW50cy9BZG1pblBhbmVsLnRzeCcsXG4gICAgICAgICdzcmMvY29tcG9uZW50cy9Cb29raW5nTW9kYWwudHN4JyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL0NhcnREcmF3ZXIudHN4JyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL0NvbnRhY3RGb290ZXIudHN4JyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL0ZpbHRlclNlY3Rpb24udHN4JyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL0hvbWVwYWdlUGFnZUJ1aWxkZXIudHN4JyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL01vdG9yY3ljbGVDYXJkLnRzeCcsXG4gICAgICAgICdzcmMvY29tcG9uZW50cy9OYXZiYXIudHN4JyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL1BkZk1vZGFsLnRzeCcsXG4gICAgICAgICdzcmMvY29tcG9uZW50cy9TdG9yZUFkbWluUGFuZWwudHN4JyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL1N0b3JlUHJvZHVjdENhcmQudHN4JyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL1N0b3JlVmlldy50c3gnXG4gICAgICBdO1xuXG4gICAgICBjb25zdCBiaW5hcnlJbWFnZXMgPSBbXG4gICAgICAgICdzcmMvYXNzZXRzL2ltYWdlcy9lbGtob2x5X2FkdmVudHVyZV9iaWtlXzE3ODAzOTQwMTY0OTgucG5nJyxcbiAgICAgICAgJ3NyYy9hc3NldHMvaW1hZ2VzL2Vsa2hvbHlfY3J1aXNlcl9iaWtlXzE3ODAzOTM5OTgwNzkucG5nJyxcbiAgICAgICAgJ3NyYy9hc3NldHMvaW1hZ2VzL2Vsa2hvbHlfaGVyb19iYW5uZXJfMTc4MDM5Mzk2MTA0MS5wbmcnLFxuICAgICAgICAnc3JjL2Fzc2V0cy9pbWFnZXMvZWxraG9seV9zY29vdGVyXzE3ODAzOTQwMzYwMjIucG5nJyxcbiAgICAgICAgJ3NyYy9hc3NldHMvaW1hZ2VzL2Vsa2hvbHlfc3BvcnRfYmlrZV8xNzgwMzkzOTc5ODE1LnBuZydcbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IHRyZWVJdGVtczogYW55W10gPSBbXTtcblxuICAgICAgLy8gQS4gTG9hZCBhbmQgbG9hZCB0ZXh0IGZpbGVzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzVG9VcGxvYWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IGZpbGVzVG9VcGxvYWRbaV07XG4gICAgICAgIHNldFByb2plY3RQdXNoU3RlcChcbiAgICAgICAgICBsYW5nID09PSAnYXInIFxuICAgICAgICAgICAgPyBg2KzYp9ix2Yog2KrYrdi22YrYsSDYp9mE2YXZhNmBINin2YTZhti12YogKCR7aSArIDF9LyR7ZmlsZXNUb1VwbG9hZC5sZW5ndGh9KTogJHtwYXRofWBcbiAgICAgICAgICAgIDogYFByZXBhcmluZyBzb3VyY2UgZmlsZSAoJHtpICsgMX0vJHtmaWxlc1RvVXBsb2FkLmxlbmd0aH0pOiAke3BhdGh9YFxuICAgICAgICApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGZpbGVSZXMgPSBhd2FpdCBmZXRjaCgnLycgKyBwYXRoKTtcbiAgICAgICAgICBpZiAoIWZpbGVSZXMub2spIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZldGNoICR7cGF0aH1gKTtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgZmlsZVJlcy50ZXh0KCk7XG4gICAgICAgICAgdHJlZUl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgIG1vZGU6ICcxMDA2NDQnLFxuICAgICAgICAgICAgdHlwZTogJ2Jsb2InLFxuICAgICAgICAgICAgY29udGVudDogY29udGVudFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYEZpbGUgZmFsbGJhY2sgYWN0aXZlIG9yIGZhaWxlZCB0byBsb2FkOiAke3BhdGh9YCwgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBCLiBMb2FkIGFuZCB1cGxvYWQgYmluYXJ5IGZpbGVzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmFyeUltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBpbWdQYXRoID0gYmluYXJ5SW1hZ2VzW2ldO1xuICAgICAgICBzZXRQcm9qZWN0UHVzaFN0ZXAoXG4gICAgICAgICAgbGFuZyA9PT0gJ2FyJ1xuICAgICAgICAgICAgPyBg2KzYp9ix2Yog2LHZgdi5INi12YjYsdipINin2YTZhdi52LHYtiDYp9mE2KvZhtin2KbZitipICgke2kgKyAxfS8ke2JpbmFyeUltYWdlcy5sZW5ndGh9KTogJHtpbWdQYXRoLnNwbGl0KCcvJykucG9wKCl9YFxuICAgICAgICAgICAgOiBgVXBsb2FkaW5nIGFzc2V0cyBub2RlICgke2kgKyAxfS8ke2JpbmFyeUltYWdlcy5sZW5ndGh9KTogJHtpbWdQYXRoLnNwbGl0KCcvJykucG9wKCl9YFxuICAgICAgICApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGltZ1JlcyA9IGF3YWl0IGZldGNoKCcvJyArIGltZ1BhdGgpO1xuICAgICAgICAgIGlmICghaW1nUmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoYEltYWdlIGZldGNoIGZhaWxlZDogJHtpbWdQYXRofWApO1xuICAgICAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCBpbWdSZXMuYmxvYigpO1xuXG4gICAgICAgICAgLy8gUmVhZCBibG9iIGFzIGJhc2U2NFxuICAgICAgICAgIGNvbnN0IHNoYSA9IGF3YWl0IG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGJhc2U2NHN0ciA9IChyZWFkZXIucmVzdWx0IGFzIHN0cmluZykuc3BsaXQoJywnKVsxXTtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9iUmVzID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvJHtjbGVhblJlcG99L2dpdC9ibG9ic2AsIHtcbiAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogYmFzZTY0c3RyLFxuICAgICAgICAgICAgICAgICAgICBlbmNvZGluZzogJ2Jhc2U2NCdcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFibG9iUmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBlcnJvclRleHQgPSBhd2FpdCBibG9iUmVzLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQmxvYiBjcmVhdGlvbiBmYWlsZWQ6ICR7ZXJyb3JUZXh0fWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBibG9iRGF0YSA9IGF3YWl0IGJsb2JSZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoYmxvYkRhdGEuc2hhKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlYWRlci5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0cmVlSXRlbXMucHVzaCh7XG4gICAgICAgICAgICBwYXRoOiBpbWdQYXRoLFxuICAgICAgICAgICAgbW9kZTogJzEwMDY0NCcsXG4gICAgICAgICAgICB0eXBlOiAnYmxvYicsXG4gICAgICAgICAgICBzaGE6IHNoYVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYEJpbmFyeSB1cGxvYWQgZmFpbGVkIG9yIHNraXBwZWQgZm9yOiAke2ltZ1BhdGh9YCwgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyAzLiBDcmVhdGUgR2l0IFRyZWUgb24gR2l0SHViXG4gICAgICBzZXRQcm9qZWN0UHVzaFN0ZXAobGFuZyA9PT0gJ2FyJyA/ICfYrNin2LHZiiDYqNmG2KfYoSDYrtix2YrYt9ipINmF2LPYqtmI2K/YuSBHaXRIdWIuLi4nIDogJ0RlcGxveWluZyBuZXcgZmlsZXMgdHJlZSBtYXAgb24gR2l0SHViLi4uJyk7XG4gICAgICBjb25zdCB0cmVlQm9keTogYW55ID0ge1xuICAgICAgICB0cmVlOiB0cmVlSXRlbXNcbiAgICAgIH07XG4gICAgICBpZiAoYmFzZVRyZWVTaGEpIHtcbiAgICAgICAgdHJlZUJvZHkuYmFzZV90cmVlID0gYmFzZVRyZWVTaGE7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRyZWVQb3N0UmVzID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvJHtjbGVhblJlcG99L2dpdC90cmVlc2AsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRyZWVCb2R5KVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghdHJlZVBvc3RSZXMub2spIHtcbiAgICAgICAgY29uc3QgZXJySnNvbiA9IGF3YWl0IHRyZWVQb3N0UmVzLmpzb24oKS5jYXRjaCgoKSA9PiAoeyBtZXNzYWdlOiAnVHJlZSBjcmVhdGlvbiBmYWlsZWQnIH0pKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVyckpzb24ubWVzc2FnZSB8fCAnRmFpbGVkIHRvIGNyYWZ0IHJlcG9zaXRvcnkgbWFwIHRyZWUnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyZWVQb3N0RGF0YSA9IGF3YWl0IHRyZWVQb3N0UmVzLmpzb24oKTtcbiAgICAgIGNvbnN0IG5ld1RyZWVTaGEgPSB0cmVlUG9zdERhdGEuc2hhO1xuXG4gICAgICAvLyA0LiBDcmVhdGUgQ29tbWl0IG9uIEdpdEh1YlxuICAgICAgc2V0UHJvamVjdFB1c2hTdGVwKGxhbmcgPT09ICdhcicgPyAn2KzYp9ix2Yog2KrYs9is2YrZhCDYp9mE2KrYstin2YUg2KfZhNmD2YjYryAoQ29tbWl0KS4uLicgOiAnQ29tbWl0dGluZyBjb2RlYmFzZSBtb2RpZmljYXRpb25zLi4uJyk7XG4gICAgICBjb25zdCBjb21taXRCb2R5OiBhbnkgPSB7XG4gICAgICAgIG1lc3NhZ2U6IGBBdXRvbWF0aWMgbGl2ZSBiYWNrdXAgZGVwbG95IC0gVmVyY2VsIGNvbXBhdGlibGUgLSAke25ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKX1gLFxuICAgICAgICB0cmVlOiBuZXdUcmVlU2hhXG4gICAgICB9O1xuICAgICAgaWYgKHBhcmVudENvbW1pdFNoYSkge1xuICAgICAgICBjb21taXRCb2R5LnBhcmVudHMgPSBbcGFyZW50Q29tbWl0U2hhXTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29tbWl0UG9zdFJlcyA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zLyR7Y2xlYW5SZXBvfS9naXQvY29tbWl0c2AsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbW1pdEJvZHkpXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFjb21taXRQb3N0UmVzLm9rKSB7XG4gICAgICAgIGNvbnN0IGVyckpzb24gPSBhd2FpdCBjb21taXRQb3N0UmVzLmpzb24oKS5jYXRjaCgoKSA9PiAoeyBtZXNzYWdlOiAnQ29tbWl0IGNyZWF0aW9uIGZhaWxlZCcgfSkpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJySnNvbi5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gY3JlYXRlIEdpdCBjb21taXQgbm9kZScpO1xuICAgICAgfVxuICAgICAgY29uc3QgY29tbWl0UG9zdERhdGEgPSBhd2FpdCBjb21taXRQb3N0UmVzLmpzb24oKTtcbiAgICAgIGNvbnN0IG5ld0NvbW1pdFNoYSA9IGNvbW1pdFBvc3REYXRhLnNoYTtcblxuICAgICAgLy8gNS4gVXBkYXRlIG9yIENyZWF0ZSByZWZlcmVuY2VcbiAgICAgIHNldFByb2plY3RQdXNoU3RlcChsYW5nID09PSAnYXInID8gJ9is2KfYsdmKINiq2K3Yr9mK2Ksg2YHYsdi5INin2YTZhdiz2KrZiNiv2Lkg2KfZhNix2KbZitiz2YouLi4nIDogJ1VwZGF0aW5nIEdpdEh1YiBicmFuY2ggcmVmZXJlbmNlIEhFQUQuLi4nKTtcbiAgICAgIGxldCByZWZVcGRhdGVSZXM7XG4gICAgICBpZiAoaGFzRXhpc3RpbmdCcmFuY2gpIHtcbiAgICAgICAgcmVmVXBkYXRlUmVzID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvJHtjbGVhblJlcG99L2dpdC9yZWZzL2hlYWRzLyR7Y2xlYW5CcmFuY2h9YCwge1xuICAgICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHNoYTogbmV3Q29tbWl0U2hhLFxuICAgICAgICAgICAgZm9yY2U6IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlZlVwZGF0ZVJlcyA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zLyR7Y2xlYW5SZXBvfS9naXQvcmVmc2AsIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHJlZjogYHJlZnMvaGVhZHMvJHtjbGVhbkJyYW5jaH1gLFxuICAgICAgICAgICAgc2hhOiBuZXdDb21taXRTaGFcbiAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlZlVwZGF0ZVJlcy5vaykge1xuICAgICAgICAvLyBTYXZlIGNvbmZpZyBpbiBsb2NhbFN0b3JhZ2VcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfZ2l0aHViX3Rva2VuJywgZ2l0aHViVG9rZW4udHJpbSgpKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfZ2l0aHViX3JlcG8nLCBjbGVhblJlcG8pO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZWxraG9seV9naXRodWJfYnJhbmNoJywgY2xlYW5CcmFuY2gpO1xuXG4gICAgICAgIGZpcmVUb2FzdChcbiAgICAgICAgICBsYW5nID09PSAnYXInXG4gICAgICAgICAgICA/ICfYqtmFINix2YHYuSDZg9in2YXZhCDZg9mI2K8g2KfZhNmF2LXYr9ixINmI2KfZhNmF2LTYsdmI2Lkg2KXZhNmJIEdpdEh1YiDYqNmG2KzYp9itISDYrNin2YfYsiDZhNmE2LHYqNi3INmB2YogVmVyY2VsIPCfmoDwn5K7J1xuICAgICAgICAgICAgOiAnRmFidWxvdXMhIEVudGlyZSBSZWFjdCBwcm9qZWN0IHVwbG9hZGVkIHRvIEdpdEh1Yi4gUmVhZHkgZm9yIGluc3RhbnQgVmVyY2VsIGxpbmshIPCfmoDwn5K7JyxcbiAgICAgICAgICAnc3VjY2VzcydcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVyckpzb24gPSBhd2FpdCByZWZVcGRhdGVSZXMuanNvbigpLmNhdGNoKCgpID0+ICh7IG1lc3NhZ2U6ICdSZWZlcmVuY2UgdXBkYXRlIGZhaWxlZCcgfSkpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJySnNvbi5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gdXBkYXRlIGJyYW5jaCByZWZlcmVuY2UgSEVBRCcpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiQ29kZWJhc2UgUHVzaCBGYWlsZWQ6XCIsIGVycik7XG4gICAgICBmaXJlVG9hc3QoXG4gICAgICAgIGxhbmcgPT09ICdhcidcbiAgICAgICAgICA/IGDYudiw2LHYp9mL2Iwg2YHYtNmEINix2YHYuSDYp9mE2YPZiNivINmE2YAgR2l0SHViOiAke2Vyci5tZXNzYWdlIHx8ICfZitix2KzZiSDZhdix2KfYrNi52Kkg2KfZhNix2YXYsiDZiNi12YTYp9it2YrYp9iqINin2YTYqtmI2YPZitmGJ31gXG4gICAgICAgICAgOiBgUHJvamVjdCBwdXNoIGVuZGVkIHdpdGggZXJyb3I6ICR7ZXJyLm1lc3NhZ2UgfHwgJ0NoZWNrIFBBVCBwZXJtaXNzaW9ucyAvIFJlcG9zaXRvcnkgZm9ybWF0J31gLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc1B1c2hpbmdQcm9qZWN0KGZhbHNlKTtcbiAgICAgIHNldFByb2plY3RQdXNoU3RlcCgnJyk7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIHNjb3JlUm9sZUxhYmVsKHJvbGU6IFVzZXJSb2xlKSB7XG4gICAgaWYgKGxhbmcgPT09ICdhcicpIHtcbiAgICAgIGlmIChyb2xlID09PSAnQWRtaW4nKSByZXR1cm4gJ9mF2LTYsdmBINix2KbZitiz2YonO1xuICAgICAgaWYgKHJvbGUgPT09ICdNYW5hZ2VyJykgcmV0dXJuICfZhdiv2YrYsSDYo9iz2LfZiNmEJztcbiAgICAgIHJldHVybiAn2YHYsdmK2YIg2LnZhdmEINmF2YbYs9mCJztcbiAgICB9XG4gICAgcmV0dXJuIHJvbGU7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtMiBzbTpwLTQgYmctYmxhY2svOTUgYmFja2Ryb3AtYmx1ci1tZCBvdmVyZmxvdy1oaWRkZW4gYWRtaW4tcGFuZWwtcm9vdFwiPlxuICAgICAgXG4gICAgICB7LyogVG9hc3QgTm90aWZpY2F0aW9uIExheWVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCB0b3AtNSByaWdodC01IHotODAgc3BhY2UteS0yIG1heC13LXNtIHBvaW50ZXItZXZlbnRzLW5vbmVcIj5cbiAgICAgICAgPEFuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAgICB7dG9hc3RzLm1hcCgodCkgPT4gKFxuICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAga2V5PXt0LmlkfVxuICAgICAgICAgICAgICBpbml0aWFsPXt7IHNjYWxlOiAwLjksIG9wYWNpdHk6IDAsIHk6IC0yMCB9fVxuICAgICAgICAgICAgICBhbmltYXRlPXt7IHNjYWxlOiAxLCBvcGFjaXR5OiAxLCB5OiAwIH19XG4gICAgICAgICAgICAgIGV4aXQ9e3sgc2NhbGU6IDAuOSwgb3BhY2l0eTogMCwgeDogNTAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zLjUgcm91bmRlZC14bCBib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSBzaGFkb3cteGwgYmFja2Ryb3AtYmx1ci1tZCBwb2ludGVyLWV2ZW50cy1hdXRvICR7XG4gICAgICAgICAgICAgICAgdC50eXBlID09PSAnc3VjY2VzcycgXG4gICAgICAgICAgICAgICAgICA/ICdiZy1ncmVlbi05NTAvODAgYm9yZGVyLWdyZWVuLTUwMC80MCB0ZXh0LWdyZWVuLTQwMCcgXG4gICAgICAgICAgICAgICAgICA6IHQudHlwZSA9PT0gJ2Vycm9yJyBcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXJlZC05NTAvODAgYm9yZGVyLXJlZC01MDAvNDAgdGV4dC1yZWQtNDAwJyBcbiAgICAgICAgICAgICAgICAgIDogJ2JnLWluZGlnby05NTAvODAgYm9yZGVyLWluZGlnby01MDAvNDAgdGV4dC1pbmRpZ28tNDAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTQgaC00IHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gZm9udC1tZWRpdW1cIj57dC50ZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1haW4gVGVybWluYWwgU2hlbGwgQm94ICovfVxuICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgaW5pdGlhbD17eyBzY2FsZTogMC45Nywgb3BhY2l0eTogMCB9fVxuICAgICAgICBhbmltYXRlPXt7IHNjYWxlOiAxLCBvcGFjaXR5OiAxIH19XG4gICAgICAgIGV4aXQ9e3sgc2NhbGU6IDAuOTcsIG9wYWNpdHk6IDAgfX1cbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LTZ4bCBoLVs5NHZoXSBnbGFzcy1wYW5lbCBib3JkZXIgYm9yZGVyLVsjNjM2NkYxXS8zMCByb3VuZGVkLTN4bCBvdmVyZmxvdy1oaWRkZW4gZmxleCBmbGV4LWNvbCByZWxhdGl2ZSBzaGFkb3ctMnhsIGJveC1nbG93LWluZGlnbyB0ZXh0LXdoaXRlIHVwcGVyY2FzZVwiXG4gICAgICAgIGRpcj17ZGlyfVxuICAgICAgPlxuICAgICAgICB7LyogSG9sb2dyYXBoaWMgU2lnbmFsIFNjYW4gTGluZSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTAgcmlnaHQtMCBoLVsxLjVweF0gYmctZ3JhZGllbnQtdG8tciBmcm9tLWJyYW5kLXByaW1hcnkgdmlhLWJyYW5kLWFjY2VudCB0by1icmFuZC1zZWNvbmRhcnkgei0yMFwiIC8+XG5cbiAgICAgICAgey8qIEhlYWRlciBSaWJib24gTm9kZSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXdoaXRlL1swLjA4XSBwLTQgYmctWyMwQjBGMUFdLzkwIHotMTBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLWxnIGJnLWJyYW5kLXByaW1hcnkvMTAgYm9yZGVyIGJvcmRlci1icmFuZC1wcmltYXJ5LzMwXCI+XG4gICAgICAgICAgICAgIDxEYXRhYmFzZSBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtWyMyMkQzRUVdIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGVmdFwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtc20gc206dGV4dC1iYXNlIGZvbnQtZXh0cmFib2xkIHRyYWNraW5nLXdpZGVzdCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICB7dCgnYWRtaW5fdGl0bGUnKX1cbiAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IG10LTAuNVwiIGRpcj1cImx0clwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMS41IGgtMS41IHJvdW5kZWQtZnVsbCBiZy1ncmVlbi01MDAgYW5pbWF0ZS1waW5nXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS01MDAgZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdFwiPlxuICAgICAgICAgICAgICAgICAge3Nlc3Npb25Vc2VyID8gYEFDVElWRSBOT0RFOiAke3Nlc3Npb25Vc2VyLnVzZXJuYW1lfSB8ICR7c2Vzc2lvblVzZXIucm9sZS50b1VwcGVyQ2FzZSgpfWAgOiAnU0VDVVJFIEdQUlMgU0hFTEwgVEVSTUlOQUwgfCBPRkZMSU5FJ31cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICB7c2Vzc2lvblVzZXIgJiYgKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTG9nb3V0fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IGJnLXJlZC01MDAvMTAgaG92ZXI6YmctcmVkLTUwMC8yMCBib3JkZXIgYm9yZGVyLXJlZC01MDAvMzAgdGV4dC1yZWQtNDAwIGZvbnQtbW9ubyB0ZXh0LVs5cHhdIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBob3ZlcjpzY2FsZS1bMS4wM11cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPExvZ091dCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2YHYtdmEINin2YTZhdi02KrYsdmDJyA6ICdESVNDT05ORUNUJ308L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXdoaXRlLzUgYmctd2hpdGUvWzAuMDNdIHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBJbnRlcmFjdGl2ZSBTaGVsbCBDb250ZW50ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy1oaWRkZW4gZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBiZy1bIzA4MEIxM10vOTVcIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09IFZJRVcgQTogT0ZGTElORSBMT0NLIFNDUkVFTiA9PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgICAgeyFzZXNzaW9uVXNlciA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNiB0ZXh0LWNlbnRlciBtYXgtdy1zbSBteC1hdXRvIHNwYWNlLXktNlwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgPG1vdGlvbi5kaXYgXG4gICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IHJvdGF0ZTogWzAsIC01LCA1LCAwXSB9fVxuICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyByZXBlYXQ6IEluZmluaXR5LCBkdXJhdGlvbjogMy41LCBlYXNlOiAnZWFzZUluT3V0JyB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xNCBoLTE0IHJvdW5kZWQtZnVsbCBiZy1bIzIyRDNFRV0vMTAgYm9yZGVyIGJvcmRlci1bIzIyRDNFRV0vMzAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbXgtYXV0byB0ZXh0LWJyYW5kLWFjY2VudCBzaGFkb3ctbGcgc2hhZG93LWJyYW5kLWFjY2VudC81XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8TG9jayBjbGFzc05hbWU9XCJ3LTYgaC02XCIgLz5cbiAgICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgZm9udC1tb25vIHRyYWNraW5nLXdpZGVyXCI+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYqNmI2KfYqNipINin2YTYqtit2YLZgiDYp9mE2YXYtNmB2LHYqScgOiAnT1BFUkFUT1IgSURFTlRJVFkgUE9SVEFMJ31cbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwMCBub3JtYWwtY2FzZSBsZWFkaW5nLW5vcm1hbCBmb250LXNhbnNcIj5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInIFxuICAgICAgICAgICAgICAgICAgICA/ICfYp9mE2YjYtdmI2YQg2YXYrdiv2YjYryDZhNmE2KPYudi22KfYoSDYp9mE2YXYtdix2K0g2YTZh9mFINmB2YLYty4g2YrYsdis2Ykg2KrYstmI2YrYryDYsdmF2LIg2KfZhNiv2K7ZiNmEINmE2KXYudi32KfYoSDYp9mE2KrZgdmI2YrYti4nXG4gICAgICAgICAgICAgICAgICAgIDogJ0FjY2VzcyBpcyBsaW1pdGVkIHRvIHZlcmlmaWVkIHBlcnNvbm5lbCBvbmx5LiBFbnRlciB5b3VyIGNyZWRlbnRpYWxzIHRvIGluaXRpYWxpemUgR1BSUyBsaW5rLidcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMjAgYmctaW5kaWdvLTk1MC8yMCByb3VuZGVkLXhsIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWdyYXktNDAwIGxlYWRpbmctbm9ybWFsIHRleHQtbGVmdCBjYXBpdGFsaXplIGZvbnQtc2VtaWJvbGQgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICAgICAg4pqhIHtsYW5nID09PSAnYXInID8gJ9ij2LnYttin2KEg2KfZhNij2YjYqtmI2YXYp9iq2YrZg9mKINin2YTYp9mB2KrYsdin2LbZitmI2YY6JyA6ICdEZWZhdWx0IERlbW8gTm9kZTonfTxiciAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1icmFuZC1hY2NlbnRcIj5IT1NOWTE5OTU8L3NwYW4+IHwgQ29kZTogPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1icmFuZC1wcmltYXJ5XCI+SGhybTAxMDE5OTVFTGVsa2hvbHk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVMb2dpblN1Ym1pdH0gY2xhc3NOYW1lPVwidy1mdWxsIHNwYWNlLXktMy41IHRleHQtbGVmdCBmb250LW1vbm8gdGV4dC14cyBtYXgtdy1bMzIwcHhdXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRyYWNraW5nLXdpZGVyIHRleHQtWzEwcHhdXCI+e2xhbmcgPT09ICdhcicgPyAn2KfYs9mFINin2YTZhdiz2KrYrtiv2YUg2YTZhNmF2LTYutmEJyA6ICdPUEVSQVRPUiBBQ0NPVU5UIE5BTUUnfTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3VzZXJuYW1lSW5wdXR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VXNlcm5hbWVJbnB1dChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtsYW5nID09PSAnYXInID8gJ9ij2K/YrtmEINin2LPZhSDYp9mE2YXYs9iq2K7Yr9mFJyA6ICdFbnRlciBVc2VybmFtZSBJZGVudGl0eSd9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1ibGFjay82MCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBmb2N1czpib3JkZXItaW5kaWdvLTQwMCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcHgtNCBweS0yLjUgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdHJhY2tpbmctd2lkZXIgdGV4dC1bMTBweF1cIj57bGFuZyA9PT0gJ2FyJyA/ICfZg9mE2YXYqSDYp9mE2YXYsdmI2LEnIDogJ0FDQ0VTUyBDT0RFIEtFWSd9OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3Nob3dQYXNzd29yZCA/ICd0ZXh0JyA6ICdwYXNzd29yZCd9XG4gICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cGFzc3dvcmRJbnB1dH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhc3N3b3JkSW5wdXQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCiXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctYmxhY2svNjAgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wOF0gZm9jdXM6Ym9yZGVyLWluZGlnby00MDAgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHB4LTQgcHktMi41IGZvY3VzOm91dGxpbmUtbm9uZSBwci0xMFwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93UGFzc3dvcmQoIXNob3dQYXNzd29yZCl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtMy41IHRleHQtZ3JheS01MDAgaG92ZXI6dGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7c2hvd1Bhc3N3b3JkID8gPEV5ZU9mZiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz4gOiA8RXllIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIuNSBiZy1ncmFkaWVudC10by1yIGZyb20tYnJhbmQtcHJpbWFyeSB0by1icmFuZC1hY2NlbnQgdGV4dC1bIzBCMEYxQV0gZm9udC1ibGFjayB0cmFja2luZy13aWRlc3Qgcm91bmRlZC14bCBob3ZlcjpicmlnaHRuZXNzLTExMCBhY3RpdmU6c2NhbGUtWzAuOThdIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgdGV4dC1bMTFweF1cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxLZXkgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYqtiz2KzZitmEINiv2K7ZiNmEINin2YTZhdit2LfYqScgOiAnSU5JVElBTElaRSBMSU5LJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZm9ybT5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09IFZJRVcgQjogTE9HR0VEIElOIFdPUktTVEFUSU9OID09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBvdmVyZmxvdy1oaWRkZW4gcmVsYXRpdmUgei0xMCBoLWZ1bGxcIj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHsvKiBTaWRlYmFyIFRhYnMgU2VsZWN0b3JzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtZDp3LTU2IGJnLWJsYWNrLzMwIGJvcmRlci1iIG1kOmJvcmRlci1iLTAgbWQ6Ym9yZGVyLXIgYm9yZGVyLXdoaXRlL1swLjA1XSBmbGV4IG1kOmZsZXgtY29sIGdhcC0xLjUgcC0zIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiaGlkZGVuIG1kOmJsb2NrIHRleHQtWzlweF0gdGV4dC1ncmF5LTUwMCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IHVwcGVyY2FzZSBtYi0yIHAtMS41XCI+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYo9mC2LPYp9mFINin2YTZiNin2KzZh9ipJyA6ICdXT1JLU1BBQ0UgVEVSTUlOQUxTJ31cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgey8qIFRhYjogRGFzaGJvYXJkICovfVxuICAgICAgICAgICAgICAgIHtjYW5BY2Nlc3MoJ2Rhc2hib2FyZCcpICYmIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdkYXNoYm9hcmQnKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC0xIG1kOmZsZXgtaW5pdGlhbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtZDpqdXN0aWZ5LXN0YXJ0IGdhcC0yLjUgcHgtNCBweS0yIHJvdW5kZWQteGwgZm9udC1tb25vIHRleHQtWzEwcHhdIHNtOnRleHQtWzExcHhdIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2Rhc2hib2FyZCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1icmFuZC1wcmltYXJ5LzE1IHRvLXRyYW5zcGFyZW50IGJvcmRlciBib3JkZXItYnJhbmQtcHJpbWFyeS8zNSB0ZXh0LXdoaXRlIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy13aGl0ZS9bMC4wMV0nXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LVsjMjJEM0VFXVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9mE2YjYrdipINin2YTZgtmK2KfYr9ipJyA6ICdEQVNIQk9BUkQnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7LyogVGFiOiBGbGVldCBNYW5hZ2VyICovfVxuICAgICAgICAgICAgICAgIHtjYW5BY2Nlc3MoJ21vdG9yY3ljbGVzJykgJiYgKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ21vdG9yY3ljbGVzJyl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBtZDpmbGV4LWluaXRpYWwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWQ6anVzdGlmeS1zdGFydCBnYXAtMi41IHB4LTQgcHktMiByb3VuZGVkLXhsIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XSBzbTp0ZXh0LVsxMXB4XSBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdtb3RvcmN5Y2xlcydcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1icmFuZC1wcmltYXJ5LzE1IHRvLXRyYW5zcGFyZW50IGJvcmRlciBib3JkZXItYnJhbmQtcHJpbWFyeS8zNSB0ZXh0LXdoaXRlIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy13aGl0ZS9bMC4wMV0nXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8RGF0YWJhc2UgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWJyYW5kLWFjY2VudFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9ij2LPYt9mI2YQg2KfZhNiv2LHYp9is2KfYqicgOiAnTU9UT1JDWUNMRVMnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7LyogVGFiOiBTdG9yZSBNYW5hZ2VyICovfVxuICAgICAgICAgICAgICAgIHtjYW5BY2Nlc3MoJ3N0b3JlJykgJiYgKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ3N0b3JlJyl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBtZDpmbGV4LWluaXRpYWwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWQ6anVzdGlmeS1zdGFydCBnYXAtMi41IHB4LTQgcHktMiByb3VuZGVkLXhsIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XSBzbTp0ZXh0LVsxMXB4XSBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdzdG9yZSdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1icmFuZC1wcmltYXJ5LzE1IHRvLXRyYW5zcGFyZW50IGJvcmRlciBib3JkZXItYnJhbmQtcHJpbWFyeS8zNSB0ZXh0LXdoaXRlIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy13aGl0ZS9bMC4wMV0nXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8RGF0YWJhc2UgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWdyZWVuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9in2YTZhdiq2KzYsSDYp9mE2KXZhNmD2KrYsdmI2YbZiicgOiAnU1RPUkUnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7LyogVGFiOiBPcGVyYXRvcnMgTm9kZSBTZXR0aW5ncyAqL31cbiAgICAgICAgICAgICAgICB7Y2FuQWNjZXNzKCd1c2VycycpICYmIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCd1c2VycycpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4LTEgbWQ6ZmxleC1pbml0aWFsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1kOmp1c3RpZnktc3RhcnQgZ2FwLTIuNSBweC00IHB5LTIgcm91bmRlZC14bCBmb250LW1vbm8gdGV4dC1bMTBweF0gc206dGV4dC1bMTFweF0gZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAndXNlcnMnXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tYnJhbmQtcHJpbWFyeS8xNSB0by10cmFuc3BhcmVudCBib3JkZXIgYm9yZGVyLWJyYW5kLXByaW1hcnkvMzUgdGV4dC13aGl0ZSBzaGFkb3ctbWQnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctd2hpdGUvWzAuMDFdJ1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFVzZXJzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1icmFuZC1zZWNvbmRhcnlcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YXYtNix2YHZiNmGINmI2KfZhNij2LPZhdin2KEnIDogJ1VTRVJTIExJU1QnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7LyogVGFiOiBBcHBsaWNhdGlvbiBDdXN0b21pemF0aW9uICovfVxuICAgICAgICAgICAgICAgIHtjYW5BY2Nlc3MoJ3NldHRpbmdzJykgJiYgKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ3NldHRpbmdzJyl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBtZDpmbGV4LWluaXRpYWwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWQ6anVzdGlmeS1zdGFydCBnYXAtMi41IHB4LTQgcHktMiByb3VuZGVkLXhsIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XSBzbTp0ZXh0LVsxMXB4XSBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdzZXR0aW5ncydcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1icmFuZC1wcmltYXJ5LzE1IHRvLXRyYW5zcGFyZW50IGJvcmRlciBib3JkZXItYnJhbmQtcHJpbWFyeS8zNSB0ZXh0LXdoaXRlIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy13aGl0ZS9bMC4wMV0nXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8U2V0dGluZ3MgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXdoaXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2KXYudiv2KfYr9in2Kog2KfZhNmF2LnYsdi2JyA6ICdTRVRUSU5HUyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIER5bmFtaWMgQ29uc29sZSBEZXNrIFNjcmVlbiAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIHAtNCBzbTpwLTUgdGV4dC1sZWZ0IHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBUQUIgMTogU0FBUyBEQVNIQk9BUkQgSFVCID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ2Rhc2hib2FyZCcgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTUgYW5pbWF0ZS1mYWRlLWluXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItM1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVzdCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9io2YrYp9mG2KfYqiDYo9iv2KfYoSDYp9mE2YXYudix2LYnIDogJ0hRIENPTU1BTkQgQU5EIEFOQUxZVElDUyd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LWdyYXktNTAwIG5vcm1hbC1jYXNlIGxlYWRpbmctbm9ybWFsIGZvbnQtc2Fuc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2YXYudmE2YjZhdin2Kog2LnYp9mF2Kkg2YXYqtmD2KfZhdmE2Kkg2YjZhdik2LTYsdin2Kog2KPYr9in2KEg2KfZhNmF2LnYsdi2INmI2KfZhNiy2YjYp9ixLicgOiAnUmVhbC10aW1lIHRlbGVtZXRyeSBvdmVyc2lnaHQgb2YgYm9va2luZyBub2RlcywgYnJhbmQgY2FwaXRhbCBmbG93LCBhbmQgb3BlcmF0b3Igc3RhdGlzdGljcy4nfVxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgIHsvKiBTdGF0IENhcmRzIE1hdHJpeCBHcmlkICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTMgbWQ6Z3JpZC1jb2xzLTQgeGw6Z3JpZC1jb2xzLTggZ2FwLTMuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBNZXRyaWMgQTogVmFsICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctWyMxMTE4MjddLzYwIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDRdIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGhvdmVyOmJvcmRlci1icmFuZC1hY2NlbnQvMjAgdHJhbnNpdGlvbi1hbGwgZmxleC0xIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTUwMCBmb250LW1vbm8gZm9udC1ib2xkXCI+e2xhbmcgPT09ICdhcicgPyAn2YLZitmF2Kkg2KfZhNij2LPYt9mI2YQnIDogJ0JSQU5EIEFTU0VUUyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29pbnMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWJyYW5kLWFjY2VudFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC1sZyBmb250LWJsYWNrIGZvbnQtbW9ubyB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlXCI+JHtmbGVldFZhbHVlLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVs4cHhdIG10LTAuNSB0ZXh0LWdyZWVuLTQwMCBmb250LXNhbnMgdHJhY2tpbmctd2lkZXN0IGxlYWRpbmctbm9uZVwiPuKaoSBNSUxMSU9OIFZBTFVFPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogTWV0cmljIEI6IEN5Y2xlIG5vZGVzICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctWyMxMTE4MjddLzYwIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDRdIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGhvdmVyOmJvcmRlci1icmFuZC1wcmltYXJ5LzIwIHRyYW5zaXRpb24tYWxsIGZsZXgtMSBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JheS01MDAgZm9udC1tb25vIGZvbnQtYm9sZFwiPntsYW5nID09PSAnYXInID8gJ9mF2LHZg9io2KfYqiDYp9mE2YXYudix2LYnIDogJ0ZMRUVUIE1BQ0hJTkVTJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxEYXRhYmFzZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYnJhbmQtcHJpbWFyeVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC1sZyBmb250LWJsYWNrIGZvbnQtbW9ubyB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlXCI+e21vdG9yY3ljbGVzLmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzhweF0gbXQtMC41IHRleHQtYnJhbmQtYWNjZW50IGZvbnQtc2FucyB0cmFja2luZy13aWRlc3QgbGVhZGluZy1ub25lXCI+4pePIEFDVElWRSBCSUtFUzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgey8qIE1ldHJpYyBDOiBPcGVyYXRvciBOb2RlcyAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLVsjMTExODI3XS82MCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA0XSBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBob3Zlcjpib3JkZXItYnJhbmQtc2Vjb25kYXJ5LzIwIHRyYW5zaXRpb24tYWxsIGZsZXgtMSBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JheS01MDAgZm9udC1tb25vIGZvbnQtYm9sZFwiPntsYW5nID09PSAnYXInID8gJ9in2YTZhdi02LHZgdmI2YYnIDogJ0NVUkFUT1JTJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxVc2VycyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYnJhbmQtc2Vjb25kYXJ5XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZSBzbTp0ZXh0LWxnIGZvbnQtYmxhY2sgZm9udC1tb25vIHRyYWNraW5nLXRpZ2h0IHRleHQtd2hpdGVcIj57dXNlcnMubGVuZ3RofTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1bOHB4XSBtdC0wLjUgdGV4dC1ncmF5LTQwMCBmb250LXNhbnMgdHJhY2tpbmctd2lkZXN0IGxlYWRpbmctbm9uZVwiPvCfkaQgQ09ERVMvS0VZUzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgey8qIE1ldHJpYyBEOiBCb29raW5ncyBMZWFkcyAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLVsjMTExODI3XS82MCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA0XSBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBob3Zlcjpib3JkZXItd2hpdGUvMTAgdHJhbnNpdGlvbi1hbGwgZmxleC0xIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTUwMCBmb250LW1vbm8gZm9udC1ib2xkXCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNit2KzZiNiy2KfYqiDYp9mE2YXYudmE2YLYqScgOiAnUkVTRVJWQVRJT05TJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlU3F1YXJlIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1yZWQtNTAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1iYXNlIHNtOnRleHQtbGcgZm9udC1ibGFjayBmb250LW1vbm8gdHJhY2tpbmctdGlnaHQgdGV4dC13aGl0ZVwiPntib29raW5ncy5sZW5ndGh9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVs4cHhdIG10LTAuNSB0ZXh0LXJlZC00MDAgZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCBsZWFkaW5nLW5vbmVcIj7wn5OxIFdIQVRTQVBQPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogTkVXIE1ldHJpYzogTW90b3JjeWNsZSBTYWxlcyBWYWx1ZSAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLVsjMTExODI3XS82MCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMTUgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gaG92ZXI6Ym9yZGVyLWluZGlnby00MDAvMjAgdHJhbnNpdGlvbi1hbGwgZmxleC0xIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTUwMCBmb250LW1vbm8gZm9udC1ib2xkXCI+e2xhbmcgPT09ICdhcicgPyAn2YXYqNmK2LnYp9iqINin2YTZhdmI2KrZiNiz2YrZg9mE2KfYqicgOiAnTU9UT1JTIFJFVkVOVUUnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPFRyZW5kaW5nVXAgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1iYXNlIHNtOnRleHQtbGcgZm9udC1ibGFjayBmb250LW1vbm8gdHJhY2tpbmctdGlnaHQgdGV4dC13aGl0ZVwiPnttb3RvcnNUb3RhbFNhbGVzVmFsdWUudG9Mb2NhbGVTdHJpbmcoKX0ge2xhbmcgPT09ICdhcicgPyAn2Kwu2YUnIDogJ0VHUCd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVs4cHhdIG10LTAuNSB0ZXh0LWluZGlnby00MDAgZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCBsZWFkaW5nLW5vbmVcIj7wn4+N77iPIFNBTEVTIFZBTFVFPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogTkVXIE1ldHJpYzogTW90b3JjeWNsZXMgU29sZCBDb3VudCAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLVsjMTExODI3XS82MCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMTUgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gaG92ZXI6Ym9yZGVyLWluZGlnby00MDAvMjUgdHJhbnNpdGlvbi1hbGwgZmxleC0xIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTUwMCBmb250LW1vbm8gZm9udC1ib2xkXCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNiv2LHYp9is2KfYqiDYp9mE2YXYqNin2LnYqScgOiAnQklLRVMgU09MRCd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1pbmRpZ28tMzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZSBzbTp0ZXh0LWxnIGZvbnQtYmxhY2sgZm9udC1tb25vIHRyYWNraW5nLXRpZ2h0IHRleHQtd2hpdGVcIj57bW90b3JzVG90YWxTb2xkQ291bnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVs4cHhdIG10LTAuNSB0ZXh0LWluZGlnby0zMDAgZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCBsZWFkaW5nLW5vbmVcIj7wn4+BIFNPTEQgVU5JVFM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBNZXRyaWMgRTogU3RvcmUgUmV2ZW51ZSAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLVsjMTExODI3XS82MCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA0XSBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBob3Zlcjpib3JkZXItZW1lcmFsZC01MDAvMjAgdHJhbnNpdGlvbi1hbGwgZmxleC0xIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTUwMCBmb250LW1vbm8gZm9udC1ib2xkXCI+e2xhbmcgPT09ICdhcicgPyAn2YXYqNmK2LnYp9iqINin2YTZhdiq2KzYsScgOiAnU1RPUkUgU0FMRVMnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPFNob3BwaW5nQmFnIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC1sZyBmb250LWJsYWNrIGZvbnQtbW9ubyB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlXCI+e3N0b3JlVG90YWxSZXZlbnVlLnRvTG9jYWxlU3RyaW5nKCl9IHtsYW5nID09PSAnYXInID8gJ9isLtmFJyA6ICdFR1AnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1bOHB4XSBtdC0wLjUgdGV4dC1lbWVyYWxkLTQwMCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IGxlYWRpbmctbm9uZVwiPvCfm5IgUkVWRU5VRTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgey8qIE1ldHJpYyBGOiBJdGVtcyBTb2xkICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctWyMxMTE4MjddLzYwIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDRdIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGhvdmVyOmJvcmRlci1jeWFuLTUwMC8yMCB0cmFuc2l0aW9uLWFsbCBmbGV4LTEgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ubyBmb250LWJvbGRcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YLYt9i5INin2YTZhdio2KfYudipJyA6ICdJVEVNUyBTT0xEJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxQYWNrYWdlIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC1sZyBmb250LWJsYWNrIGZvbnQtbW9ubyB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlXCI+e3N0b3JlVG90YWxJdGVtc1NvbGQudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzhweF0gbXQtMC41IHRleHQtY3lhbi00MDAgZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCBsZWFkaW5nLW5vbmVcIj7wn5OmIFBJRUNFUzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogQ2F0ZWdvcnkgQnJlYWtkb3duICYgQWxsb2NhdGlvbiBWaXN1YWxpemVyICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNC41IHJvdW5kZWQtMnhsIGJnLVsjMEYxNDIyXS83MCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMTAgc3BhY2UteS0zLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItd2hpdGUvNSBwYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXJcIj57bGFuZyA9PT0gJ2FyJyA/ICfZhtiz2Kgg2KrZiNiy2YrYuSDYp9mE2YXYsdmD2KjYp9iqINi52KjYsSDYp9mE2YHYptin2KonIDogJ1ZFSElDTEUgQ0xBU1MgRElTVFJJQlVUSU9OJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtWyMyMkQzRUVdIGZvbnQtbW9ub1wiPkNBTElCUkFUSU9OIENBUDogMTAwJTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBWaXN1YWwgR3JhZGllbnQgQmFyIGFsbG9jYXRpb25zIChTbGVlayBDU1MgQ2hhcnRpbmcpICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogU3BvcnQgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQtWzlweF0gZm9udC1tb25vIHRleHQtZ3JheS00MDAgbWItMSBsZWFkaW5nLW5vbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5TUE9SVCBDTEFTUyBBPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+e2NhdEFfQ291bnR9ICh7TWF0aC5yb3VuZChjYXRBX0NvdW50IC8gKG1vdG9yY3ljbGVzLmxlbmd0aCB8fCAxKSAqIDEwMCl9JSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLTEuNSBiZy1ibGFjay82MCByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsPXt7IHdpZHRoOiAwIH19IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyB3aWR0aDogYCR7KGNhdEFfQ291bnQgLyAobW90b3JjeWNsZXMubGVuZ3RoIHx8IDEpKSAqIDEwMH0lYCB9fSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDEuMiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC1mdWxsIHJvdW5kZWQtZnVsbCBiZy1ncmFkaWVudC10by1yIGZyb20taW5kaWdvLTUwMCB0by1pbmRpZ28tNDAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogQ3J1aXNlciAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bOXB4XSBmb250LW1vbm8gdGV4dC1ncmF5LTQwMCBtYi0xIGxlYWRpbmctbm9uZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNSVUlTRVIgQ0xBU1MgQjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC13aGl0ZVwiPntjYXRCX0NvdW50fSAoe01hdGgucm91bmQoY2F0Ql9Db3VudCAvIChtb3RvcmN5Y2xlcy5sZW5ndGggfHwgMSkgKiAxMDApfSUpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0xLjUgYmctYmxhY2svNjAgcm91bmRlZC1mdWxsIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbD17eyB3aWR0aDogMCB9fSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgd2lkdGg6IGAkeyhjYXRCX0NvdW50IC8gKG1vdG9yY3ljbGVzLmxlbmd0aCB8fCAxKSkgKiAxMDB9JWAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDEuMiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC1mdWxsIHJvdW5kZWQtZnVsbCBiZy1ncmFkaWVudC10by1yIGZyb20tYnJhbmQtc2Vjb25kYXJ5IHRvLVsjQTg1NUY3XVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIEFkdmVudHVyZSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bOXB4XSBmb250LW1vbm8gdGV4dC1ncmF5LTQwMCBtYi0xIGxlYWRpbmctbm9uZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkFEVkVOVFVSRSBDTEFTUyBDPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+e2NhdENfQ291bnR9ICh7TWF0aC5yb3VuZChjYXRDX0NvdW50IC8gKG1vdG9yY3ljbGVzLmxlbmd0aCB8fCAxKSAqIDEwMCl9JSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLTEuNSBiZy1ibGFjay82MCByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsPXt7IHdpZHRoOiAwIH19IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyB3aWR0aDogYCR7KGNhdENfQ291bnQgLyAobW90b3JjeWNsZXMubGVuZ3RoIHx8IDEpKSAqIDEwMH0lYCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMS4yIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgcm91bmRlZC1mdWxsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1icmFuZC1hY2NlbnQgdG8tWyMwNkI2RDRdXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogU2Nvb3RlciAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bOXB4XSBmb250LW1vbm8gdGV4dC1ncmF5LTQwMCBtYi0xIGxlYWRpbmctbm9uZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlNDT09URVIgQ0xBU1MgUzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC13aGl0ZVwiPntjYXRTX0NvdW50fSAoe01hdGgucm91bmQoY2F0U19Db3VudCAvIChtb3RvcmN5Y2xlcy5sZW5ndGggfHwgMSkgKiAxMDApfSUpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0xLjUgYmctYmxhY2svNjAgcm91bmRlZC1mdWxsIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbD17eyB3aWR0aDogMCB9fSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgd2lkdGg6IGAkeyhjYXRTX0NvdW50IC8gKG1vdG9yY3ljbGVzLmxlbmd0aCB8fCAxKSkgKiAxMDB9JWAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDEuMiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC1mdWxsIHJvdW5kZWQtZnVsbCBiZy1ncmFkaWVudC10by1yIGZyb20tZW1lcmFsZC01MDAgdG8tZW1lcmFsZC00MDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBMZWFkcyAmIEJvb2tpbmdzIFF1ZXVlIGxvZyAoQWVzdGhldGljIFN0cmlwZS1zdHlsZWQgVGFibGUpICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNC41IHJvdW5kZWQtMnhsIGJnLVsjMEIwRjFBXS84NSBib3JkZXIgYm9yZGVyLVsjNjM2NkYxXS8xNSBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItd2hpdGUvNSBwYi0yLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctNC41IGgtNC41IHRleHQtYnJhbmQtYWNjZW50IHNocmluay0wIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXJcIj57bGFuZyA9PT0gJ2FyJyA/ICfYt9in2KjZiNixINix2LXYryDYp9iq2LXYp9mE2KfYqiDYp9mE2K3YrNiyJyA6ICdBQ1RJVkUgQ0hST05PUyBTSE9XUk9PTSBSRVNFUlZBVElPTlMnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAge3Nlc3Npb25Vc2VyLnJvbGUgPT09ICdBZG1pbicgJiYgYm9va2luZ3MubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGVhckJvb2tpbmdzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMSBiZy1yZWQtNjAwLzEwIGhvdmVyOmJnLXJlZC01MDAgdGV4dC1yZWQtNDAwIGhvdmVyOnRleHQtd2hpdGUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXJlZC01MDAvMjAgdHJhbnNpdGlvbi1hbGwgZm9udC1tb25vIHRleHQtWzlweF0gY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KrZgdix2YrYuiDYp9mE2LPYrNmEJyA6ICdQVVJHRSBMRUFEUyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIHtib29raW5ncy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHB5LTggdGV4dC1ncmF5LTYwMCBmb250LW1vbm8gdGV4dC1bMTBweF0gc3BhY2UteS0xLjUgc2VsZWN0LW5vbmUgdGV4dC10cmFuc2Zvcm06IGxvd2VyY2FzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZVNxdWFyZSBjbGFzc05hbWU9XCJ3LTggaC04IHRleHQtZ3JheS03MDAgbXgtYXV0byBvcGFjaXR5LTQwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidHJhY2tpbmctd2lkZXN0IHVwcGVyY2FzZSB0ZXh0LWdyYXktNTAwXCI+e2xhbmcgPT09ICdhcicgPyAn2YTYpyDYrdmI2KfYs9ioINmI2YTYpyDYrdis2YjYstin2Kog2YXYs9is2YTYqSDYqNi52K8nIDogJ05PIFNQT09MRUQgQk9PS0lOR1MgUkVDSUVWRUQnfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWdyYXktNDAwIG5vcm1hbC1jYXNlIGZvbnQtc2Fuc1wiPlN1Ym1pdCBhIHJlc2VydmUgdGlja2V0IHVzaW5nIGFueSBCb29rIE5vdyBidXR0b24gdG8gcG9wdWxhdGUgcmVhbCBsZWFkcyBoZXJlLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJmbG93LXgtYXV0byBtYXgtaC1bMjIwcHhdIHNjcm9sbGJhci10aGluXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1sZWZ0IGJvcmRlci1jb2xsYXBzZSBmb250LW1vbm8gdGV4dC1bMTBweF0gc206dGV4dC1bMTFweF1cIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImJvcmRlci1iIGJvcmRlci13aGl0ZS81IHRleHQtZ3JheS01MDAgdGV4dC1bOXB4XSB0cmFja2luZy13aWRlc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBiLTIgdGV4dC1yaWdodFwiPntsYW5nID09PSAnYXInID8gJ9in2YTYudmF2YrZhCcgOiAnQ0xJRU5UJ308L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicGItMiB0ZXh0LXJpZ2h0XCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNmF2KfZg9mK2YbYqScgOiAnTUFDSElORSd9PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBiLTIgdGV4dC1yaWdodFwiPntsYW5nID09PSAnYXInID8gJ9in2YTZh9in2KrZgScgOiAnUEhPTkUnfTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYi0yIHRleHQtcmlnaHRcIj57bGFuZyA9PT0gJ2FyJyA/ICfYqtin2LHZitiuINin2YTYrdis2LInIDogJ1JFU0VSVkUgREFURSd9PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBiLTIgdGV4dC1yaWdodFwiPntsYW5nID09PSAnYXInID8gJ9in2YTZhdio2YrYudin2KogLyDYp9mE2K3Yp9mE2KknIDogJ1NUQVRVUyAvIFNBTEUnfTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jvb2tpbmdzLm1hcCgoYikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtiLmlkfSBjbGFzc05hbWU9XCJib3JkZXItYiBib3JkZXItd2hpdGUvWzAuMDNdIGhvdmVyOmJnLXdoaXRlL1swLjAxXSB0ZXh0LWdyYXktMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIuNSBmb250LXNhbnMgZm9udC1ib2xkIHRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtiLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVs4cHhdIGZvbnQtbW9ubyB0ZXh0LWdyYXktNTAwIG5vcm1hbC1jYXNlXCI+e2IuZW1haWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIuNSB0ZXh0LWluZGlnby00MDAgdGV4dC1yaWdodFwiPntiLm1vdG9yY3ljbGVOYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIuNSB0ZXh0LXJpZ2h0IGZvbnQtYm9sZCB0ZXh0LWJyYW5kLWFjY2VudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e2BodHRwczovL3dhLm1lLyR7Yi5waG9uZS5yZXBsYWNlKC9bXjAtOV0vZywgJycpfWB9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsPVwibm9yZWZlcnJlclwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJob3Zlcjp1bmRlcmxpbmUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmQgZ2FwLTEgc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57Yi5waG9uZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBcnJvd1VwUmlnaHQgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWdyZWVuLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMi41IHRleHQtcmlnaHQgZm9udC1zYW5zIGl0YWxpYyB0ZXh0LWdyYXktNDAwXCI+e2IuZGF0ZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yLjUgdGV4dC1yaWdodCBmb250LXNhbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmQgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtMS41IHB5LTAuNSByb3VuZGVkIHRleHQtWzguNXB4XSBmb250LWJvbGQgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYi5zdGF0dXMgfHwgJ3NvbGQnKSA9PT0gJ3NvbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1ncmVlbi01MDAvMTAgdGV4dC1ncmVlbi00MDAgYm9yZGVyIGJvcmRlci1ncmVlbi01MDAvMjAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy15ZWxsb3ctNTAwLzEwIHRleHQteWVsbG93LTQwMCBib3JkZXIgYm9yZGVyLXllbGxvdy01MDAvMjAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KGIuc3RhdHVzIHx8ICdzb2xkJykgPT09ICdzb2xkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAobGFuZyA9PT0gJ2FyJyA/ICfYqtmFINin2YTYqNmK2LknIDogJ1NPTEQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAobGFuZyA9PT0gJ2FyJyA/ICfYp9mG2KrYuNin2LEnIDogJ1BFTkRJTkcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVRvZ2dsZUJvb2tpbmdTdGF0dXMoYi5pZCwgYi5zdGF0dXMgfHwgJ3NvbGQnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0xLjUgcHktMC41IHJvdW5kZWQgYmctYnJhbmQtcHJpbWFyeS8xMCBob3ZlcjpiZy1icmFuZC1wcmltYXJ5IHRleHQtYnJhbmQtcHJpbWFyeSBob3Zlcjp0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItYnJhbmQtcHJpbWFyeS8yMCB0cmFuc2l0aW9uLWFsbCB0ZXh0LVs4cHhdIGZvbnQtYm9sZCBjdXJzb3ItcG9pbnRlciBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KrYudiv2YrZhCcgOiAnVE9HR0xFJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBFeGNlbCBFeHBvcnQgQ29udHJvbGxlciBQYW5lbCAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQuNSByb3VuZGVkLTJ4bCBiZy1bIzA5MEQxNl0gYm9yZGVyIGJvcmRlci1ncmVlbi01MDAvMTAgc3BhY2UteS00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIuNSBib3JkZXItYiBib3JkZXItd2hpdGUvNSBwYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0xLjUgYmctZ3JlZW4tNTAwLzEwIHJvdW5kZWQtbGcgdGV4dC1ncmVlbi00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCBmb250LXNhbnMgdHJhY2tpbmctd2lkZSB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfZhdiz2KrYrtix2Kwg2KfZhNiq2YLYp9ix2YrYsSDYp9mE2YXYrdin2LPYqNmK2KkgKEV4Y2VsKScgOiAnQ09NUFJFSEVOU0lWRSBFWENFTCBFWFBPUlQgVEVSTUlOQUwnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTUwMCBsZWFkaW5nLW5vcm1hbCBmb250LW1vbm8gbm9ybWFsLWNhc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9iq2LXYr9mK2LEg2YPYp9mF2YQg2KrZgdin2LXZitmEINmF2KjZiti52KfYqiDYp9mE2YXYqtis2LEg2YjYp9mE2K3YrNmI2LLYp9iqINmI2KfZhNmF2KjYp9mE2LouJyA6ICdDb21waWxlLCBmaWx0ZXIsIGFuZCBzdHJlYW0gbGVkZ2VyIGFjY291bnRzIGZvciBhbGwgcHJvZHVjdHMgYW5kIGhlYXZ5IHNob3dyb29tIHZlaGljbGVzLid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC0zLjUgaXRlbXMtZW5kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogRHVyYXRpb24gU2VsZWN0b3IgRHJvcGRvd24gKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IHRleHQtbGVmdFwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWdyYXktNDAwIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfZhti32KfZgiDYp9iz2KrYrtix2KfYrCDYp9mE2KjZitin2YbYp9iqOicgOiAnU0VMRUNUIEVYUE9SVCBQRVJJT0Q6J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtleHBvcnRSYW5nZVR5cGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlOiBhbnkpID0+IHNldEV4cG9ydFJhbmdlVHlwZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMuNSBweS0yIHNtOnB5LTIuNSBiZy1bIzBCMEYxOV0gdGV4dC13aGl0ZSBib3JkZXIgYm9yZGVyLXdoaXRlLzUgaG92ZXI6Ym9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgZm9udC1tb25vIHRleHQteHMgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMSBmb2N1czpyaW5nLWdyZWVuLTUwMCB0cmFja2luZy13aWRlIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ0b2RheVwiPntsYW5nID09PSAnYXInID8gJ9io2YrYp9mG2KfYqiDYp9mE2YrZiNmFJyA6ICdUb2RheSAoUmVhbC10aW1lKSd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIndlZWtcIj57bGFuZyA9PT0gJ2FyJyA/ICfYotiu2LEg2KPYs9io2YjYuScgOiAnTGFzdCBXZWVrJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibW9udGhcIj57bGFuZyA9PT0gJ2FyJyA/ICfYotiu2LEg2LTZh9ixJyA6ICdMYXN0IE1vbnRoJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiM21vbnRoc1wiPntsYW5nID09PSAnYXInID8gJ9ii2K7YsSDZoyDYo9i02YfYsScgOiAnTGFzdCAzIE1vbnRocyd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjZtb250aHNcIj57bGFuZyA9PT0gJ2FyJyA/ICfYotiu2LEg2aYg2KPYtNmH2LEnIDogJ0xhc3QgNiBNb250aHMnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ5ZWFyXCI+e2xhbmcgPT09ICdhcicgPyAn2KLYrtixINiz2YbYqSDZg9in2YXZhNipJyA6ICdMYXN0IDEyIE1vbnRocyd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImN1c3RvbVwiPntsYW5nID09PSAnYXInID8gJ9iq2K3Yr9mK2K8g2YHYqtix2Kkg2LLZhdmK2YbYqSDZhdiu2LXYtdipJyA6ICdDdXN0b20gRGF0ZSBSYW5nZSd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDdXN0b20gUmFuZ2Ugc2VsZWN0IGlucHV0cyAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIHtleHBvcnRSYW5nZVR5cGUgPT09ICdjdXN0b20nICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IHRleHQtbGVmdFwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1ncmF5LTQwMCBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENhbGVuZGFyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYmx1ZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfZhdmGINiq2KfYsdmK2K46JyA6ICdTVEFSVCBEQVRFL1RJTUU6J308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZXhwb3J0U3RhcnREYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RXhwb3J0U3RhcnREYXRlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcGwtOSBwci0zLjUgcnRsOnByLTkgcnRsOnBsLTMuNSBweS0yIHNtOnB5LTIuNSBiZy1bIzBCMEYxOV0gdGV4dC13aGl0ZSBib3JkZXIgYm9yZGVyLWJsdWUtNTAwLzI1IGhvdmVyOmJvcmRlci1ibHVlLTUwMC80MCByb3VuZGVkLXhsIGZvbnQtbW9ubyB0ZXh0LXhzIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTEgZm9jdXM6cmluZy1ibHVlLTUwMCBjdXJzb3ItcG9pbnRlciBbJjo6LXdlYmtpdC1jYWxlbmRhci1waWNrZXItaW5kaWNhdG9yXTppbnZlcnQtWzQ0JV0gWyY6Oi13ZWJraXQtY2FsZW5kYXItcGlja2VyLWluZGljYXRvcl06c2VwaWEtWzk1JV0gWyY6Oi13ZWJraXQtY2FsZW5kYXItcGlja2VyLWluZGljYXRvcl06c2F0dXJhdGUtWzE4MDAlXSBbJjo6LXdlYmtpdC1jYWxlbmRhci1waWNrZXItaW5kaWNhdG9yXTpodWUtcm90YXRlLVsxOTVkZWddXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENhbGVuZGFyIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMyBydGw6bGVmdC1hdXRvIHJ0bDpyaWdodC0zIHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB3LTQgaC00IHRleHQtYmx1ZS01MDAgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgdGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWdyYXktNDAwIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1ibHVlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9il2YTZiSDYqtin2LHZitiuOicgOiAnRU5EIERBVEUvVElNRTonfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtleHBvcnRFbmREYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RXhwb3J0RW5kRGF0ZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHBsLTkgcHItMy41IHJ0bDpwci05IHJ0bDpwbC0zLjUgcHktMiBzbTpweS0yLjUgYmctWyMwQjBGMTldIHRleHQtd2hpdGUgYm9yZGVyIGJvcmRlci1ibHVlLTUwMC8yNSBob3Zlcjpib3JkZXItYmx1ZS01MDAvNDAgcm91bmRlZC14bCBmb250LW1vbm8gdGV4dC14cyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0xIGZvY3VzOnJpbmctYmx1ZS01MDAgY3Vyc29yLXBvaW50ZXIgWyY6Oi13ZWJraXQtY2FsZW5kYXItcGlja2VyLWluZGljYXRvcl06aW52ZXJ0LVs0NCVdIFsmOjotd2Via2l0LWNhbGVuZGFyLXBpY2tlci1pbmRpY2F0b3JdOnNlcGlhLVs5NSVdIFsmOjotd2Via2l0LWNhbGVuZGFyLXBpY2tlci1pbmRpY2F0b3JdOnNhdHVyYXRlLVsxODAwJV0gWyY6Oi13ZWJraXQtY2FsZW5kYXItcGlja2VyLWluZGljYXRvcl06aHVlLXJvdGF0ZS1bMTk1ZGVnXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDYWxlbmRhciBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTMgcnRsOmxlZnQtYXV0byBydGw6cmlnaHQtMyB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdy00IGgtNCB0ZXh0LWJsdWUtNTAwIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIFN1Ym1pdHRpbmcgdHJpZ2dlciBidXR0b24gKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHNtOmNvbC1zcGFuLTEgJHtleHBvcnRSYW5nZVR5cGUgIT09ICdjdXN0b20nID8gJ2xnOmNvbC1zcGFuLTMnIDogJyd9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVFeHBvcnRFeGNlbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yLjUgYmctZ3JhZGllbnQtdG8tciBmcm9tLWdyZWVuLTUwMC84NSB0by1lbWVyYWxkLTYwMC85NSBob3Zlcjpmcm9tLWdyZWVuLTUwMCBob3Zlcjp0by1lbWVyYWxkLTYwMCB0ZXh0LXdoaXRlIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1bMTAuNXB4XSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHJvdW5kZWQteGwgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGwgYm9yZGVyIGJvcmRlci1ncmVlbi01MDAvMjAgYWN0aXZlOnNjYWxlLTk4IHNoYWRvdy1tZCBob3ZlcjpzaGFkb3ctZ3JlZW4tNTAwLzEwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWxlVGV4dCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC0xMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9iq2K3ZhdmK2YQg2KfZhNio2YrYp9mG2KfYqiDYqNi12YrYutipINin2YPYs9mEIPCfk4onIDogJ0NvbXBpbGUgJiBFeHBvcnQgU3ByZWFkc2hlZXQg8J+Tiid9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBUQUIgMjogSU5URVJBQ1RJVkUgRkxFRVQgTUFOQUdFUiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdtb3RvcmN5Y2xlcycgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTQgYW5pbWF0ZS1mYWRlLWluXCI+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB7IWlzQWRkaW5nTmV3ICYmICFlZGl0aW5nQmlrZSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAvLyBHcmlkIGxpc3QgZGlzcGxheXMgb2YgYWN0aXZlIGN5Y2xlc1xuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItd2hpdGUvNSBwYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgZm9udC1tb25vIHRyYWNraW5nLXdpZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/IGDZgtin2KbZhdipINin2YTYo9iz2LfZiNmEINin2YTYrdin2YTZitipICgke21vdG9yY3ljbGVzLmxlbmd0aH0pYCA6IGBGTEVFVCBDT01QT1NJVElPTiBHUklEICgke21vdG9yY3ljbGVzLmxlbmd0aH0pYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtZ3JheS01MDAgbm9ybWFsLWNhc2UgbGVhZGluZy1ub3JtYWwgZm9udC1zYW5zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYqtmB2YjZiti2INiv2LHYp9is2KfYqiDYpdmE2YPYqtix2YjZhtmK2Kkg2KzYr9mK2K/YqdiMINiq2K3Yr9mK2Ksg2YXZgtin2YrZitizINin2YTYr9mB2Lkg2KfZhNit2LXYp9mG2YrYqSDYo9mIINin2YTYqti52K/ZitmEINmI2KfZhNmF2LPYrS4nIDogJ1JldmlldywgcmVnaXN0ZXIsIG1vZGlmeSBzcGVjaWZpY2F0aW9ucywgb3IgcHVyZ2UgZXh0cmVtZSBkeW5hbWljIGN5Y2xlcyBmcm9tIEVneXB0IHNob3dyb29tcy4nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQWRkTmV3Q2xpY2t9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zLjUgcHktMiBiZy1icmFuZC1hY2NlbnQgdGV4dC1bIzBCMEYxQV0gaG92ZXI6YmctWyMxOGI1Y2NdIGZvbnQtbW9ubyB0ZXh0LVsxMC41cHhdIGZvbnQtYmxhY2sgcm91bmRlZC14bCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbWQgc2hhZG93LWJyYW5kLWFjY2VudC8xNVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYpdi22KfZgdipINii2YTYqScgOiAnQ09NTUlTU0lPTiBORVcgQklLRSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogRmlsdGVycyBhbmQgU2VhcmNoIEJhciBSb3cgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLXN0cmV0Y2ggbWQ6aXRlbXMtY2VudGVyIGdhcC0zIGJnLVsjMEUxMzIyXS84MCBwLTMgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wNF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIEludGVyYWN0aXZlIENhdGVnb3J5IEZpbHRlciBUYWJzICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggYm9yZGVyIGJvcmRlci13aGl0ZS81IGJnLWJsYWNrLzQwIHAtMSByb3VuZGVkLXhsIHctZml0IG1heC13LWZ1bGwgb3ZlcmZsb3cteC1hdXRvIGdhcC0xIHNlbGVjdC1ub25lIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoWydBbGwnLCAnQScsICdCJywgJ0MnLCAnUyddIGFzIGNvbnN0KS5tYXAoKGNhdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBkYXNoQ2F0ZWdvcnlGaWx0ZXIgPT09IGNhdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gY2F0ID09PSAnQWxsJyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAobGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YPZhCDwn4yQJyA6ICdTaG93IEFsbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogY2F0ID09PSAnQScgPyAobGFuZyA9PT0gJ2FyJyA/ICdBINiz2KjZiNix2Kog4pqhJyA6ICdBIC0gU3BvcnQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGNhdCA9PT0gJ0InID8gKGxhbmcgPT09ICdhcicgPyAnQiDZg9ix2YjYstixIPCfm4vvuI8nIDogJ0IgLSBDcnVpc2VyJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBjYXQgPT09ICdDJyA/IChsYW5nID09PSAnYXInID8gJ0Mg2YXYutin2YXYsdin2Kog8J+nrScgOiAnQyAtIFRvdXJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IChsYW5nID09PSAnYXInID8gJ1Mg2LPZg9mI2KrYsSDwn5SLJyA6ICdTIC0gU2Nvb3RlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtjYXR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RGFzaENhdGVnb3J5RmlsdGVyKGNhdCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC1sZyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHdoaXRlc3BhY2Utbm93cmFwICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1icmFuZC1hY2NlbnQgdGV4dC1bIzBCMEYxQV0gc2hhZG93LW1kIHNoYWRvdy1icmFuZC1hY2NlbnQvMjUgZm9udC1ibGFjaydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXdoaXRlLzUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIEJlYXV0aWZ1bCBJbnRlcmFjdGl2ZSBTZWFyY2ggaW5wdXQgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleC0xIG1kOm1heC13LXhzIHhsOm1heC13LW1kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YmlrZVNlYXJjaFRlcm19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJpa2VTZWFyY2hUZXJtKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtsYW5nID09PSAnYXInID8gJ9in2YTYqNit2Ksg2KjYp9mE2KfYs9mFINij2Ygg2YPZiNivINin2YTZhdmI2KrZiNiz2YrZg9mELi4uJyA6ICdTZWFyY2ggYnkgbmFtZSBvciBiaWtlIGNvZGUuLi4nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMDcwQTExXSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcGwtOSBwci04IHJ0bDpwci05IHJ0bDpwbC04IHB5LTIgdGV4dC14cyB0ZXh0LXdoaXRlIGZvY3VzOmJvcmRlci1icmFuZC1hY2NlbnQgb3V0bGluZS1ub25lIHBsYWNlaG9sZGVyOnRleHQtZ3JheS01MDAgdHJhbnNpdGlvbi1hbGwgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWFyY2ggY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0zIHJ0bDpsZWZ0LWF1dG8gcnRsOnJpZ2h0LTMgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHctMy41IGgtMy41IHRleHQtZ3JheS00MDAgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jpa2VTZWFyY2hUZXJtICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QmlrZVNlYXJjaFRlcm0oJycpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC0zIHJ0bDpyaWdodC1hdXRvIHJ0bDpsZWZ0LTMgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSB0ZXh0LVsxMHB4XSBjdXJzb3ItcG9pbnRlciBmb250LWJvbGQgZm9udC1tb25vIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pyVXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2Rhc2hGaWx0ZXJlZEJpa2VzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFzaEZpbHRlcmVkQmlrZXMubWFwKChiaWtlKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtiaWtlLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC00IGJnLVsjMTExNjI0XS84MCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA0XSBob3Zlcjpib3JkZXItYnJhbmQtcHJpbWFyeS8yMCByb3VuZGVkLTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2Jpa2UuaW1hZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD17YmlrZS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xNiBoLTE2IG9iamVjdC1jb250YWluIGJnLWJsYWNrLzQwIHJvdW5kZWQteGwgcC0xIHNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0wIHRleHQtbGVmdFwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtMS41IHB5LTAuNSByb3VuZGVkIHRleHQtWzhweF0gZm9udC1tb25vIGZvbnQtYm9sZCB1cHBlcmNhc2UgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaWtlLmNhdGVnb3J5ID09PSAnQScgPyAnYmctaW5kaWdvLTk1MC84MCBib3JkZXIgYm9yZGVyLWluZGlnby00MDAvMjAgdGV4dC1pbmRpZ28tNDAwJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmlrZS5jYXRlZ29yeSA9PT0gJ0InID8gJ2JnLXB1cnBsZS05NTAvODUgYm9yZGVyIGJvcmRlci1wdXJwbGUtNDAwLzIwIHRleHQtYnJhbmQtc2Vjb25kYXJ5JyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmlrZS5jYXRlZ29yeSA9PT0gJ0MnID8gJ2JnLVsjMGYyMTI1XSBib3JkZXIgYm9yZGVyLWN5YW4tNDAwLzIwIHRleHQtWyMyMkQzRUVdJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JnLWVtZXJhbGQtOTUwIGJvcmRlciBib3JkZXItZW1lcmFsZC00MDAvMjAgdGV4dC1lbWVyYWxkLTQwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtiaWtlLmNhdGVnb3J5TmFtZX0gQ2xhc3MgKHtiaWtlLmNhdGVnb3J5fSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWV4dHJhYm9sZCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGUgdHJ1bmNhdGUgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtiaWtlLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LWJyYW5kLWFjY2VudCBmb250LWJvbGQgdGV4dC1bMTFweF0gbXQtMC41XCI+e2Jpa2UucHJpY2V9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMS41IHNocmluay0wIHNlbGVjdC1ub25lIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZURvd25sb2FkQW5kQ29weVFSQ29kZShiaWtlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy13aGl0ZSBwLTEgcm91bmRlZC1tZCBtYi0xIGN1cnNvci1wb2ludGVyIGhvdmVyOnNjYWxlLTExMCBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgc2hhZG93LW1kIHNoYWRvdy1ibGFjay80NVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e2xhbmcgPT09ICdhcicgPyAn2KfZhtmC2LEg2YTZhtiz2K4g2KfZhNmD2YjYryDZiNiq2K3ZhdmK2YQg2KfZhNix2YXYsicgOiAnQ2xpY2sgdG8gY29weSBjb2RlICYgZG93bmxvYWQgUVInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UVJDb2RlU1ZHIGlkPXtgcXItJHtiaWtlLmlkfWB9IHZhbHVlPXtiaWtlLnNlcmlhbENvZGUgfHwgYmlrZS5pZH0gc2l6ZT17NDB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2Vzc2lvblVzZXIucm9sZSAhPT0gJ1N0YWZmJyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVFZGl0QmlrZUNsaWNrKGJpa2UpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHB4LTIgcG9pbnRlci1ldmVudHMtYXV0byBjdXJzb3ItcG9pbnRlciBiZy1pbmRpZ28tNTAwLzE1IGhvdmVyOmJnLWJyYW5kLXByaW1hcnkgYm9yZGVyIGJvcmRlci1pbmRpZ28tNTAwLzEwIHRleHQtYnJhbmQtYWNjZW50IGhvdmVyOnRleHQtd2hpdGUgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSBmb250LW1vbm8gdGV4dC1bOXB4XSB0cmFja2luZy13aWRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlVwZ3JhZGUgTWFjaGluZSBQYXJhbWV0ZXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RWRpdDIgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYqti52K/ZitmEJyA6ICdVUEdSQURFJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOHB4XSB0ZXh0LWdyYXktNjAwIGZvbnQtbW9ubyBpdGFsaWMgbGVhZGluZy1ub25lIHRleHQtcmlnaHRcIj5MT0NLRUQgTk9ERVM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Nlc3Npb25Vc2VyLnJvbGUgPT09ICdBZG1pbicgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZURlbGV0ZUJpa2UoYmlrZS5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgcHgtMiBwb2ludGVyLWV2ZW50cy1hdXRvIGN1cnNvci1wb2ludGVyIGJnLXJlZC01MDAvMTAgaG92ZXI6YmctcmVkLTUwMCBib3JkZXIgYm9yZGVyLXJlZC01MDAvMTAgdGV4dC1yZWQtNDAwIGhvdmVyOnRleHQtd2hpdGUgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSBmb250LW1vbm8gdGV4dC1bOXB4XSB0cmFja2luZy13aWRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIkRlY29tbWlzc2lvbiBIZWF2eSBDeWNsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9i02LfYqCcgOiAnREVMRVRFJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHB5LTEyIGJvcmRlciBib3JkZXItd2hpdGUvNSBiZy1ibGFjay8yMCByb3VuZGVkLTJ4bCBjb2wtc3Bhbi0xIHNtOmNvbC1zcGFuLTIgc2VsZWN0LW5vbmUgZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtZ3JheS01MDAgdy1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfZhNinINiq2YjYrNivINmF2LHZg9io2KfYqiDZhdiz2KzZhNipINmB2Yog2YfYsNinINin2YTZgdim2Kkg2KjYudivJyA6ICdObyBjb21taXNzaW9uZWQgZGVzaWducyBpbiB0aGlzIGNhdGVnb3J5IHNlZ21lbnQuJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIC8vIEZ1bGwgQ29tbWlzc2lvbiAvIEVkaXQgZm9ybSBzY3JlZW5cbiAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlRm9ybVN1Ym1pdH0gY2xhc3NOYW1lPVwic3BhY2UteS00IG1heC13LTJ4bCBteC1hdXRvIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIHRyYWNraW5nLXdpZGVzdCB0ZXh0LWJyYW5kLWFjY2VudCB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNBZGRpbmdOZXcgPyAobGFuZyA9PT0gJ2FyJyA/ICfYqtiz2KzZitmEINmF2LHZg9io2Kkg2YPZh9ix2YjZhdi62YbYp9i32YrYs9mK2Kkg2KzYr9mK2K/YqScgOiAnQ09NTUlTU0lPTiBORVcgQ1lCRVIgVkVISUNMRScpIDogYCR7bGFuZyA9PT0gJ2FyJyA/ICfYqtit2YjZitixINmF2YLYp9mK2YrYsycgOiAnUkVDT05GSUcgTUFDSElORSd9OiAke2Jpa2VGb3JtLm5hbWV9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0SXNBZGRpbmdOZXcoZmFsc2UpOyBzZXRFZGl0aW5nQmlrZShudWxsKTsgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUgdGV4dC1bMTBweF0gZm9udC1tb25vIGN1cnNvci1wb2ludGVyIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtcmlnaHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJmx0OyB7bGFuZyA9PT0gJ2FyJyA/ICfYqtix2KfYrNi5INmE2YTYs9mK2KfZgicgOiAnRElTQ0FSRCBTSEVMTCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBTdWItVGFicyBTZWxlY3RvciBIZWFkZXIgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItMSBnYXAtMiBvdmVyZmxvdy14LWF1dG8gc2VsZWN0LW5vbmUgZm9udC1tb25vIHRleHQtWzEwcHhdIHNtOnRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRGb3JtU3ViVGFiKCdiYXNpYycpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHBiLTEuNSBweC0xLjUgYm9yZGVyLWItMiBmb250LWJvbGQgdXBwZXJjYXNlIHRyYW5zaXRpb24tYWxsIHRyYWNraW5nLXdpZGVyIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtU3ViVGFiID09PSAnYmFzaWMnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1icmFuZC1hY2NlbnQgdGV4dC1icmFuZC1hY2NlbnQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci10cmFuc3BhcmVudCB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDwn5OBIHtsYW5nID09PSAnYXInID8gJ9in2YTYqNmK2KfZhtin2Kog2KfZhNij2LPYp9iz2YrYqScgOiAnQmFzaWMgSW5mbyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Rm9ybVN1YlRhYigncHJpY2luZycpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHBiLTEuNSBweC0xLjUgYm9yZGVyLWItMiBmb250LWJvbGQgdXBwZXJjYXNlIHRyYW5zaXRpb24tYWxsIHRyYWNraW5nLXdpZGVyIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtU3ViVGFiID09PSAncHJpY2luZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLWJyYW5kLWFjY2VudCB0ZXh0LWJyYW5kLWFjY2VudCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLXRyYW5zcGFyZW50IHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIPCfkrAge2xhbmcgPT09ICdhcicgPyAn2KfZhNi52LHZiNi2INmI2KfZhNiq2LPYudmK2LEnIDogJ1ByaWNpbmcgJiBPZmZlcnMnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEZvcm1TdWJUYWIoJ2NhdGFsb2cnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwYi0xLjUgcHgtMS41IGJvcmRlci1iLTIgZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFuc2l0aW9uLWFsbCB0cmFja2luZy13aWRlciBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVN1YlRhYiA9PT0gJ2NhdGFsb2cnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1icmFuZC1hY2NlbnQgdGV4dC1icmFuZC1hY2NlbnQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci10cmFuc3BhcmVudCB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDwn5OEIHtsYW5nID09PSAnYXInID8gJ9mD2KrYp9mE2YjYrCBQREYnIDogJ0NhdGFsb2cgRG9jdW1lbnQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEZvcm1TdWJUYWIoJ2FkZG9ucycpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHBiLTEuNSBweC0xLjUgYm9yZGVyLWItMiBmb250LWJvbGQgdXBwZXJjYXNlIHRyYW5zaXRpb24tYWxsIHRyYWNraW5nLXdpZGVyIGN1cnNvci1wb2ludGVyIHdoaXRlc3BhY2Utbm93cmFwICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtU3ViVGFiID09PSAnYWRkb25zJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdib3JkZXItYnJhbmQtYWNjZW50IHRleHQtYnJhbmQtYWNjZW50J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItdHJhbnNwYXJlbnQgdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg8J+boO+4jyB7bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2KXYttin2YHYp9iqJyA6ICdBZGQtb25zJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRGb3JtU3ViVGFiKCdyZWxhdGVkJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcGItMS41IHB4LTEuNSBib3JkZXItYi0yIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhbnNpdGlvbi1hbGwgdHJhY2tpbmctd2lkZXIgY3Vyc29yLXBvaW50ZXIgd2hpdGVzcGFjZS1ub3dyYXAgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1TdWJUYWIgPT09ICdyZWxhdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdib3JkZXItYnJhbmQtYWNjZW50IHRleHQtYnJhbmQtYWNjZW50J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItdHJhbnNwYXJlbnQgdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg8J+UlyB7bGFuZyA9PT0gJ2FyJyA/ICfZhdmG2KrYrNin2Kog2KfZhNmF2KrYrNixJyA6ICdTdG9yZSBSZWxhdGVkJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIFJlbmRlciBBY3RpdmUgU3ViLVRhYiBMYXlvdXQgQ29udGVudCAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFRBQiBBOiBCQVNJQyBJTkZPICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybVN1YlRhYiA9PT0gJ2Jhc2ljJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC0zLjUgdGV4dC1sZWZ0IGZvbnQtbW9ubyBhbmltYXRlLWZhZGUtaW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtWzEwcHhdIHRyYWNraW5nLXdpZGVyXCI+e2xhbmcgPT09ICdhcicgPyAn2KfYs9mFINin2YTZhdit2YHYsiDYp9mE2K/ZgtmK2YInIDogJ01BQ0hJTkUgSURFTlRJRklFUiBOQU1FJ306PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Jpa2VGb3JtLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCaWtlRm9ybSh7IC4uLmJpa2VGb3JtLCBuYW1lOiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzc1IGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGZvY3VzOmJvcmRlci1icmFuZC1hY2NlbnQgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHB4LTQgcHktMi41IGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdHJhY2tpbmctd2lkZXJcIj57bGFuZyA9PT0gJ2FyJyA/ICfYqti12YbZitmBINin2YTZgdim2Kkg2KfZhNij2YHZgtmK2KknIDogJ1NFUklFUyBDT01QT1NJVElPTiBDTEFTU0lGSUNBVElPTid9OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YmlrZUZvcm0uY2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCaWtlRm9ybSh7IC4uLmJpa2VGb3JtLCBjYXRlZ29yeTogZS50YXJnZXQudmFsdWUgYXMgQ2F0ZWdvcnlTbHVnIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vNzUgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wOF0gZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcHgtNCBweS0yLjUgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJBXCI+U1BPUlQgQ0xBU1MgQSAo4pqhIFNwZWVkIE1hc3Rlcik8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQlwiPkNSVUlTRVIgQ0xBU1MgQiAo8J+bi++4jyBMb3ctU2x1bmcgQ3VzdG9tKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJDXCI+QURWRU5UVVJFIENMQVNTIEMgKPCfp60gT2ZmZ3JpZCBOb21hZCk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiU1wiPlNDT09URVIgQ0xBU1MgUyAo8J+UiyBVcmJhbiBIdWIpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtWzEwcHhdIHRyYWNraW5nLXdpZGVyXCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNiz2YrYsdmK2KfZhC/Yp9mE2YPZiNivINin2YTZhdmF2YrYsicgOiAnVU5JUVVFIFNFUklBTC9DT0RFJ306PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Jpa2VGb3JtLnNlcmlhbENvZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCaWtlRm9ybSh7IC4uLmJpa2VGb3JtLCBzZXJpYWxDb2RlOiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzc1IGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGZvY3VzOmJvcmRlci1icmFuZC1hY2NlbnQgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHB4LTQgcHktMi41IGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdHJhY2tpbmctd2lkZXJcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2LTYudin2LEg2KfZhNiz2YTZiNmD2Yog2KfZhNmB2LHYudmKJyA6ICdDSEFTU0lTIFNMT0dBTiBTWU5PUFNJUyd9OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YmlrZUZvcm0udGFnbGluZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJpa2VGb3JtKHsgLi4uYmlrZUZvcm0sIHRhZ2xpbmU6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vNzUgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wOF0gZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcHgtNCBweS0yLjUgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zcGFuLTEgc206Y29sLXNwYW4tMiBncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC0zLjUgYm9yZGVyLXQgYm9yZGVyLXdoaXRlLzUgcHQtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtWzEwcHhdIHRyYWNraW5nLXdpZGVyXCI+e2xhbmcgPT09ICdhcicgPyAn2LXZiNix2Kkg2KfZhNmF2LHZg9io2Kkg2YfZiNmE2YjYrNix2KfZhScgOiAnUkVBQ1RJVkUgSU1BR0UgVVJMIC8gQkFTRTY0IEVOQ09ESU5HJ306PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtiaWtlRm9ybS5pbWFnZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QmlrZUZvcm0oeyAuLi5iaWtlRm9ybSwgaW1hZ2U6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJQYXN0ZSBjbGVhbiBkaXJlY3QgaW1hZ2UgdXJsIGxpbmtzIGhlcmUuLi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS83NSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcHgtNCBweS0yIHRleHQteHMgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMS41IGJnLXdoaXRlLzUgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCB0ZXh0LWdyYXktMzAwIHJvdW5kZWQtbGcgY3Vyc29yLXBvaW50ZXIgaG92ZXI6Ymctd2hpdGUvMTAgdGV4dC1bOXB4XSBmb250LWJsYWNrIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxVcGxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1icmFuZC1hY2NlbnRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYsdmB2Lkg2YXZhNmBINi12YjYsdipINmF2LTZgdix2KknIDogJ1VQTE9BRCBDSEFTU0lTIEZJTEUnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVGb3JtSW1hZ2VVcGxvYWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtiaWtlRm9ybS5pbWFnZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wNF0gYmctYmxhY2svNDAgcm91bmRlZC0yeGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWF4LWgtWzExMHB4XSBvdmVyZmxvdy1oaWRkZW4gc2VsZWN0LW5vbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtiaWtlRm9ybS5pbWFnZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVwiUGF5bG9hZCBwcmV2aWV3IGNhcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtYXgtaC0yMCBvYmplY3QtY29udGFpbiBkcm9wLXNoYWRvd1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVyUG9saWN5PVwibm8tcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zcGFuLTEgc206Y29sLXNwYW4tMiBib3JkZXItdCBib3JkZXItd2hpdGUvNSBwdC0zIHNwYWNlLXktMi41IHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTQwMCBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVzdCB1cHBlcmNhc2UgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy00LjUgaC00LjUgdGV4dC1icmFuZC1hY2NlbnQgYW5pbWF0ZS1wdWxzZVwiIC8+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9in2YTZhdmI2KfYtdmB2KfYqiDYp9mE2YfZhtiv2LPZitipINin2YTYr9mC2YrZgtipJyA6ICdDT1JFIFRFTEVNRVRSWSBBTkQgU1BFQ1MgTUFUUklYJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBtZDpncmlkLWNvbHMtMyBnYXAtMi41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIHNwZWM6IGVuZ2luZSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTUwMCBmb250LWJvbGRcIj4xLiBQcm9wdWxzaW9uIGNvcmU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Jpa2VGb3JtLnNwZWNzLmVuZ2luZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCaWtlRm9ybSh7IC4uLmJpa2VGb3JtLCBzcGVjczogeyAuLi5iaWtlRm9ybS5zcGVjcywgZW5naW5lOiBlLnRhcmdldC52YWx1ZSB9IH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctYmxhY2svNDAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgcC0yIHRleHQteHMgZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBzcGVjOiBzcGVlZCAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTUwMCBmb250LWJvbGRcIj4yLiB0b3AgdmVsb2NpdHk8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Jpa2VGb3JtLnNwZWNzLnRvcFNwZWVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJpa2VGb3JtKHsgLi4uYmlrZUZvcm0sIHNwZWNzOiB7IC4uLmJpa2VGb3JtLnNwZWNzLCB0b3BTcGVlZDogZS50YXJnZXQudmFsdWUgfSB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLWJsYWNrLzQwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHAtMiB0ZXh0LXhzIGZvY3VzOmJvcmRlci1icmFuZC1hY2NlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Lyogc3BlYzogcG93ZXIgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS01MDAgZm9udC1ib2xkXCI+My4gb3V0cHV0IGVuZXJneTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YmlrZUZvcm0uc3BlY3MucG93ZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QmlrZUZvcm0oeyAuLi5iaWtlRm9ybSwgc3BlY3M6IHsgLi4uYmlrZUZvcm0uc3BlY3MsIHBvd2VyOiBlLnRhcmdldC52YWx1ZSB9IH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctYmxhY2svNDAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgcC0yIHRleHQteHMgZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBzcGVjOiBjb25zdW1wdGlvbiAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTUwMCBmb250LWJvbGRcIj40LiBjb25zdW1wdGlvbiByYXRpbmc8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Jpa2VGb3JtLnNwZWNzLmZ1ZWxDb25zdW1wdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCaWtlRm9ybSh7IC4uLmJpa2VGb3JtLCBzcGVjczogeyAuLi5iaWtlRm9ybS5zcGVjcywgZnVlbENvbnN1bXB0aW9uOiBlLnRhcmdldC52YWx1ZSB9IH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctYmxhY2svNDAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgcC0yIHRleHQteHMgZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBzcGVjOiB3ZWlnaHQgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS01MDAgZm9udC1ib2xkXCI+NS4gdmVoaWNsZSBuZXQgd2VpZ2h0PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtiaWtlRm9ybS5zcGVjcy53ZWlnaHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QmlrZUZvcm0oeyAuLi5iaWtlRm9ybSwgc3BlY3M6IHsgLi4uYmlrZUZvcm0uc3BlY3MsIHdlaWdodDogZS50YXJnZXQudmFsdWUgfSB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLWJsYWNrLzQwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHAtMiB0ZXh0LXhzIGZvY3VzOmJvcmRlci1icmFuZC1hY2NlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc3Bhbi0xIHNtOmNvbC1zcGFuLTIgc3BhY2UteS0xIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0ZXh0LVsxMHB4XSB0cmFja2luZy13aWRlclwiPntsYW5nID09PSAnYXInID8gJ9in2YTZiNi12YEg2KfZhNmF2YLYqti22Kgg2YTZhNio2LfYp9mC2KknIDogJ1NIT1dST09NIEdSSUQgT1ZFUlZJRVcgQ09QWSd9OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9ezJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Jpa2VGb3JtLnNob3J0RGVzY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJpa2VGb3JtKHsgLi4uYmlrZUZvcm0sIHNob3J0RGVzYzogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS83NSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBmb2N1czpib3JkZXItYnJhbmQtYWNjZW50IHRleHQtd2hpdGUgcm91bmRlZC14bCBweC00IHB5LTIuNSBmb2N1czpvdXRsaW5lLW5vbmUgZm9udC1zYW5zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zcGFuLTEgc206Y29sLXNwYW4tMiBzcGFjZS15LTEgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtWzEwcHhdIHRyYWNraW5nLXdpZGVyXCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNio2YrYp9mGINin2YTZiNi12YHZiiDYp9mE2YfZhtiv2LPZiiDYp9mE2YPYp9mF2YQg2YTZhFBERicgOiAnSE9MT01FU0ggSE9MT0dSQVBISUMgSElTVE9SSUMgU1BFQ1RSVU0gTUFOSUZFU1RPIChMT05HIERFVEFJTFMpJ306PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cz17M31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YmlrZUZvcm0ubG9uZ0Rlc2N9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCaWtlRm9ybSh7IC4uLmJpa2VGb3JtLCBsb25nRGVzYzogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS83NSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBmb2N1czpib3JkZXItYnJhbmQtYWNjZW50IHRleHQtd2hpdGUgcm91bmRlZC14bCBweC00IHB5LTIuNSBmb2N1czpvdXRsaW5lLW5vbmUgZm9udC1zYW5zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zcGFuLTEgc206Y29sLXNwYW4tMiBwdC0xIGJvcmRlci1iIGJvcmRlci13aGl0ZS81IHBiLTMgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41IGN1cnNvci1wb2ludGVyIHNlbGVjdC1ub25lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17YmlrZUZvcm0uaXNQb3B1bGFyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCaWtlRm9ybSh7IC4uLmJpa2VGb3JtLCBpc1BvcHVsYXI6IGUudGFyZ2V0LmNoZWNrZWQgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTQgaC00IHJvdW5kZWQgYm9yZGVyLVsjNjM2NkYxXS80MCBiZy1bIzExMTgyN10gZm9jdXM6cmluZy1icmFuZC1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC13aGl0ZSB1cHBlcmNhc2UgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBsZWFkaW5nLW5vbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcmVkLTUwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYqtix2LTZititINmD2LnYsdi2INmF2YXZitiyINmI2LTYp9im2Lkg2KjZgtmI2Kkg2KjYp9mE2YjYp9is2YfYqScgOiAnQU5DSE9SIEFORCBQSU4gQVMgQU4gQUNUSVZFIEZMQUdTSElQIE1PVE9SQ1lDTEUnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogVEFCIEI6IFBSSUNJTkcgJiBPRkZFUlMgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtU3ViVGFiID09PSAncHJpY2luZycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IHRleHQtbGVmdCBmb250LW1vbm8gYW5pbWF0ZS1mYWRlLWluXCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdHJhY2tpbmctd2lkZXJcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2LPYudixINin2YTYo9i12YTZiiAo2KzZhtmK2YcpJyA6ICdPUklHSU5BTCBMSVNUIFBSSUNFIChFR1ApJ306PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtiaWtlRm9ybS5vcmlnaW5hbFByaWNlIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCaWtlRm9ybSh7IC4uLmJpa2VGb3JtLCBvcmlnaW5hbFByaWNlOiBwYXJzZUludChlLnRhcmdldC52YWx1ZSwgMTApIHx8IDAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzc1IGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGZvY3VzOmJvcmRlci1icmFuZC1hY2NlbnQgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHB4LTQgcHktMi41IGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0ZXh0LVsxMHB4XSB0cmFja2luZy13aWRlclwiPntsYW5nID09PSAnYXInID8gJ9mG2YjYuSDYp9mE2K7YtdmFJyA6ICdESVNDT1VOVCBUWVBFJ306PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YmlrZUZvcm0uZGlzY291bnRUeXBlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCaWtlRm9ybSh7IC4uLmJpa2VGb3JtLCBkaXNjb3VudFR5cGU6IGUudGFyZ2V0LnZhbHVlIGFzICdwZXJjZW50YWdlJyB8ICdmaXhlZCcgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzc1IGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGZvY3VzOmJvcmRlci1icmFuZC1hY2NlbnQgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHB4LTQgcHktMi41IGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInBlcmNlbnRhZ2VcIj4lIFBlcmNlbnRhZ2U8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJmaXhlZFwiPntsYW5nID09PSAnYXInID8gJ9is2YbZitmHINmC2YrZhdipINir2KfYqNiq2KknIDogJ0VHUCBGaXhlZCBBbW91bnQnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtWzEwcHhdIHRyYWNraW5nLXdpZGVyXCI+e2xhbmcgPT09ICdhcicgPyAn2YLZitmF2Kkg2KfZhNiu2LXZhScgOiAnRElTQ09VTlQgVkFMVUUnfTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YmlrZUZvcm0uZGlzY291bnQgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJpa2VGb3JtKHsgLi4uYmlrZUZvcm0sIGRpc2NvdW50OiBwYXJzZUludChlLnRhcmdldC52YWx1ZSwgMTApIHx8IDAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17bGFuZyA9PT0gJ2FyJyA/ICfYo9iv2K7ZhCDZgtmK2YXYqSDYp9mE2K7YtdmFICjZhdir2YQgMTUg2YTZgCAxNSUg2KPZiCA1MDAwINmE2YAgNTAwMCDYrNmG2YrZhyknIDogJ0VudGVyIDE1IGZvciAxNSUgb3IgNTAwMCBmb3IgRUdQIDUsMDAwJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vNzUgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wOF0gZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcHgtNCBweS0yLjUgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtWzEwcHhdIHRyYWNraW5nLXdpZGVyXCI+e2xhbmcgPT09ICdhcicgPyAn2YXZhNi12YIg2KfZhNi52LHYtiDYp9mE2LHZitin2LbZiicgOiAnT0ZGRVIgUFJPTU8gQkFER0UgTEFCRUwnfTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Jpa2VGb3JtLm9mZmVyTGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJpa2VGb3JtKHsgLi4uYmlrZUZvcm0sIG9mZmVyTGFiZWw6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J2UuZy4gXCJIT1QgREVBTCDwn5SlXCIsIFwiTElNSVRFRCBPRkZFUlwiJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS83NSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBmb2N1czpib3JkZXItYnJhbmQtYWNjZW50IHRleHQtd2hpdGUgcm91bmRlZC14bCBweC00IHB5LTIuNSBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBMaXZlIER5bmFtaWMgQ2FsY3VsYXRlZCBQcmljZSBEaXNwbGF5ICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYmctYnJhbmQtcHJpbWFyeS8xMCBib3JkZXIgYm9yZGVyLWJyYW5kLXByaW1hcnkvMzAgcm91bmRlZC0yeGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1bOHB4XSB0ZXh0LWdyYXktNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPntsYW5nID09PSAnYXInID8gJ9in2YTYs9i52LEg2KfZhNmG2YfYp9im2Yog2KfZhNmF2K3Ys9mI2Kgg2YjYqtij2KvZitixINin2YTYrti12YUnIDogJ0NBTENVTEFURUQgUkVUQUlMIFZBTFVFIEFGVEVSIFBST01PVElPTlMnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYmxhY2sgdGV4dC1icmFuZC1zZWNvbmRhcnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJpY2UgPSBOdW1iZXIoYmlrZUZvcm0ub3JpZ2luYWxQcmljZSAhPT0gdW5kZWZpbmVkID8gYmlrZUZvcm0ub3JpZ2luYWxQcmljZSA6IChiaWtlRm9ybS5wcmljZU51bSB8fCA0NTAwMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNjID0gTnVtYmVyKGJpa2VGb3JtLmRpc2NvdW50IHx8IDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzYyA+IDAgJiYgYmlrZUZvcm0ub3JpZ2luYWxQcmljZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiaWtlRm9ybS5kaXNjb3VudFR5cGUgPT09ICdwZXJjZW50YWdlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2UgPSBNYXRoLnJvdW5kKGJpa2VGb3JtLm9yaWdpbmFsUHJpY2UgKiAoMSAtIGRpc2MgLyAxMDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2UgPSBNYXRoLnJvdW5kKE1hdGgubWF4KDAsIGJpa2VGb3JtLm9yaWdpbmFsUHJpY2UgLSBkaXNjKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmljZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCkudG9Mb2NhbGVTdHJpbmcoKX0ge2xhbmcgPT09ICdhcicgPyAn2KzZhtmK2YcnIDogJ0VHUCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXJpZ2h0IHRleHQtWzEwcHhdIHRleHQtZ3JheS01MDAgbWF4LXctWzIwMHB4XVwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfZitmC2YjZhSDYp9mE2YXYudin2YTYrCDYqNit2LPYp9ioINin2YTYs9i52LEg2YTYrNmF2YrYuSDYo9ix2KzYp9ihINin2YTZhdmG2LXYqSDYqtmE2YLYp9im2YrYp9mLINmB2YjYsSDZg9iq2KfYqNipINin2YTYo9ix2YLYp9mFJyA6ICdOdW1lcmljYWwgY2FsaWJyYXRpb25zIHVwZGF0ZSBzaG93cm9vbXMgYW5kIGNhdGFsb2dzIGluc3RhbnRhbmVvdXNseS4nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBUQUIgQzogQ0FUQUxPRyBCUk9DSFVSRSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm1TdWJUYWIgPT09ICdjYXRhbG9nJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTQgdGV4dC1sZWZ0IGZvbnQtbW9ubyBhbmltYXRlLWZhZGUtaW5cIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LWdyYXktNDAwIGxlYWRpbmctbm9ybWFsIGZvbnQtc2Fuc1wiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2YXYsdmB2YLYp9iqINin2YTZg9iq2KfZhNmI2Kwg2KfZhNix2YLZhdmK2Kkg2KjYtdmK2LrYqSBQREYg2KrYrNi52YQg2KfZhNmF2LTYqtix2Yog2YrYqti12YHYrSDYp9mE2K/ZhNmK2YQg2KfZhNmB2YbZiiDYqNmE2YXYs9ipINmF2YYg2YjYp9is2YfYqSDYp9mE2YXYudin2YrZhtipLicgOiAnSW50cm9kdWNlIGRpZ2l0YWwgdGVsZW1ldHJ5IGd1aWRlcy4gVXBsb2FkIGhpZ2gtZmlkZWxpdHkgUERGIGRvY3VtZW50cyB0aGF0IGF0dGFjaCBkaXJlY3RseSB0byBzaG93cm9vbSBjYXJkIGZsaXBzLid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtiaWtlRm9ybS5jYXRhbG9nRmlsZU5hbWUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLWJyYW5kLXByaW1hcnkvMTAgYm9yZGVyIGJvcmRlci1icmFuZC1wcmltYXJ5LzM1IHJvdW5kZWQtMnhsIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIGJnLWJyYW5kLWFjY2VudC8xMCBib3JkZXIgYm9yZGVyLWJyYW5kLWFjY2VudC8yNSByb3VuZGVkLWxnIHRleHQtYnJhbmQtYWNjZW50IHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWxlVGV4dCBjbGFzc05hbWU9XCJ3LTYgaC02IHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVs4cHhdIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIGZvbnQtYm9sZCB0cmFja2luZy13aWRlc3RcIj5BQ1RJVkUgQ0FUQUxPRyBHVUlERSBGaWxlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSB0cnVuY2F0ZSBibG9jayBtdC0wLjVcIj57YmlrZUZvcm0uY2F0YWxvZ0ZpbGVOYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCaWtlRm9ybShwcmV2ID0+ICh7IC4uLnByZXYsIGNhdGFsb2dGaWxlTmFtZTogJycsIGNhdGFsb2dGaWxlQ29udGVudDogJycgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmFINmB2LXZhCDYp9mE2YPYqtin2YTZiNisJyA6ICdEaWdpdGFsIGJyb2NodXJlIGRldGFjaGVkJywgJ2luZm8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgdy1mdWxsIHRleHQtY2VudGVyIGJvcmRlciBib3JkZXItcmVkLTUwMC8yMCBiZy1yZWQtNTAwLzUgaG92ZXI6YmctcmVkLTUwMC8xMCB0ZXh0LXJlZC00MDAgaG92ZXI6dGV4dC13aGl0ZSByb3VuZGVkLXhsIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2YXYs9itINmI2K3YsNmBINin2YTZhdmE2YEg2KfZhNit2KfZhNmKJyA6ICdERVRBQ0ggQU5EIFJFTU9WRSBQREYgQlJPQ0hVUkUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IGJvcmRlci0yIGJvcmRlci1kYXNoZWQgYm9yZGVyLXdoaXRlLzEwIGhvdmVyOmJvcmRlci1icmFuZC1hY2NlbnQvNDAgYmctYmxhY2svNDAgcm91bmRlZC0yeGwgdGV4dC1jZW50ZXIgc3BhY2UteS0zLjUgdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTIgaC0xMiBiZy13aGl0ZS81IGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG14LWF1dG8gdGV4dC1ncmF5LTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFVwbG9hZCBjbGFzc05hbWU9XCJ3LTYgaC02IHRleHQtZ3JheS01MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LWJvbGQgdGV4dC13aGl0ZSB1cHBlcmNhc2VcIj57bGFuZyA9PT0gJ2FyJyA/ICfYrdiv2K8g2YXZhNmBINin2YTZg9iq2KfZhNmI2Kwg2KjYtdmK2LrYqSBQREYnIDogJ05PIFRFTEVNRVRSWSBDQVRBTE9HIEFUVEFDSEVEJ308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS01MDAgbG93ZXJjYXNlIGZvbnQtc2Fuc1wiPnBkZiBmaWxlIHNpemVzIHVwIHRvIDVtYi4gYXV0by1lbmNvZGVzIHRvIGJhc2U2NCBidWZmZXIgbWF0cml4LjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC00IHB5LTIgYmctYnJhbmQtYWNjZW50IGhvdmVyOmJnLVsjMThiNWNjXSB0ZXh0LVsjMEIwRjFBXSBmb250LWV4dHJhYm9sZCByb3VuZGVkLXhsIGN1cnNvci1wb2ludGVyIHRleHQtWzEwLjVweF0gdXBwZXJjYXNlIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1tZCBzaGFkb3ctYnJhbmQtYWNjZW50LzE1XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VXBsb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9ix2YHYuSDYp9mE2YPYqtin2YTZiNisINin2YTYsdmC2YXZiiBQREYnIDogJ1VQTE9BRCBDQVRBTE9HIFBERid9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXB0PVwiYXBwbGljYXRpb24vcGRmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLnR5cGUgIT09ICdhcHBsaWNhdGlvbi9wZGYnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9mK2LHYrNmJINix2YHYuSDZhdmE2YEgUERGINmB2YLYtycgOiAnT25seSBQREYgc3BlY3MgYnJvY2h1cmVzIGFyZSBzdXBwb3J0ZWQnLCAnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUgKiAxMDI0ICogMTAyNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYo9mC2LXZiSDYrdis2YUg2YTZhNmF2YTZgSDZh9mIIDUg2YXZitis2KfYqNin2YrYqicgOiAnUERGIHNpemUgcmVzdHJpY3RlZCB0byA1TUInLCAnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVhZGVyLnJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCaWtlRm9ybShwcmV2ID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0YWxvZ0ZpbGVOYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRhbG9nRmlsZUNvbnRlbnQ6IHJlYWRlci5yZXN1bHQgYXMgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YUg2KrYrtiy2YrZhiDYp9mE2YPYqtin2YTZiNisINmI2K3Zgdi42Ycg2YXYtNmB2LHYp9mLINmB2Yog2KLZhNipINin2YTZhdi52KfZhNis2KknIDogJ1BERiBjYXRhbG9nIGd1aWRhbmNlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseScsICdzdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogVEFCIEQ6IEFERC1PTlMgJiBBQ0NFU1NPUklFUyAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm1TdWJUYWIgPT09ICdhZGRvbnMnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCB0ZXh0LWxlZnQgZm9udC1tb25vIGFuaW1hdGUtZmFkZS1pblwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIE5ldyBBY2Nlc3NvcnkgSW50ZWdyYXRpb24gZm9ybSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLWJsYWNrLzUwIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDRdIHJvdW5kZWQtMnhsIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1ibGFjayB0ZXh0LWJyYW5kLXNlY29uZGFyeSB0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBsdXMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWJyYW5kLXNlY29uZGFyeSBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2KrYudix2YrZgSDZhdmE2K3ZgiDZiNij2YPYs9iz2YjYp9ixINil2LbYp9mB2Yog2KzYr9mK2K8nIDogJ0lOVEVHUkFURSBORVcgRFlOQU1JQyBBREQtT04nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWdyYXktNDAwIGZvbnQtYm9sZCB1cHBlcmNhc2VcIj5OYW1lIChFTik6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdBZGRPbi5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE5ld0FkZE9uKHsgLi4ubmV3QWRkT24sIG5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlRpdGFuaXVtIEV4aGF1c3QgU3lzdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRleHQtd2hpdGUgcm91bmRlZC1sZyBwLTIgdGV4dC14cyBmb2N1czpib3JkZXItYnJhbmQtc2Vjb25kYXJ5IGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWdyYXktNDAwIGZvbnQtYm9sZCB1cHBlcmNhc2VcIj5OYW1lIChBUiAtIE9wdGlvbmFsKTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld0FkZE9uLm5hbWVBciB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdBZGRPbih7IC4uLm5ld0FkZE9uLCBuYW1lQXI6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIti02YPZhdin2YYg2KrZitiq2KfZhtmK2YjZhSDYsdmK2KfYttmKXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRleHQtd2hpdGUgcm91bmRlZC1sZyBwLTIgdGV4dC14cyBmb2N1czpib3JkZXItYnJhbmQtc2Vjb25kYXJ5IGZvY3VzOm91dGxpbmUtbm9uZSB0ZXh0LXJpZ2h0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS00MDAgZm9udC1ib2xkIHVwcGVyY2FzZVwiPntsYW5nID09PSAnYXInID8gJ9iz2LnYsSDYp9mE2KrYrNiy2KbYqSAo2KzZhtmK2YcpJyA6ICdSZXRhaWwgUHJpY2UgKEVHUCknfTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3QWRkT24ucHJpY2UgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3QWRkT24oeyAuLi5uZXdBZGRPbiwgcHJpY2U6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlLCAxMCkgfHwgMCB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRleHQtYnJhbmQtc2Vjb25kYXJ5IHJvdW5kZWQtbGcgcC0yIHRleHQteHMgZm9jdXM6Ym9yZGVyLWJyYW5kLXNlY29uZGFyeSBmb2N1czpvdXRsaW5lLW5vbmUgZm9udC1ibGFja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWdyYXktNDAwIGZvbnQtYm9sZCB1cHBlcmNhc2VcIj5JbWFnZSBJbGx1c3RyYXRpb24gVVJMOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3QWRkT24uaW1hZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3QWRkT24oeyAuLi5uZXdBZGRPbiwgaW1hZ2U6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddIGJvcmRlciBib3JkZXItd2hpdGUvMTAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHAtMiB0ZXh0LXhzIGZvY3VzOmJvcmRlci1icmFuZC1zZWNvbmRhcnkgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgc206Y29sLXNwYW4tMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTQwMCBmb250LWJvbGQgdXBwZXJjYXNlXCI+RGVzY3JpcHRpb24gKEVOKTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld0FkZE9uLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE5ld0FkZE9uKHsgLi4ubmV3QWRkT24sIGRlc2NyaXB0aW9uOiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRleHQtd2hpdGUgcm91bmRlZC1sZyBwLTIgdGV4dC14cyBmb2N1czpib3JkZXItYnJhbmQtc2Vjb25kYXJ5IGZvY3VzOm91dGxpbmUtbm9uZSBmb250LXNhbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBzbTpjb2wtc3Bhbi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWdyYXktNDAwIGZvbnQtYm9sZCB1cHBlcmNhc2VcIj5EZXNjcmlwdGlvbiAoQVIgLSBPcHRpb25hbCk6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdBZGRPbi5kZXNjQXIgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3QWRkT24oeyAuLi5uZXdBZGRPbiwgZGVzY0FyOiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRleHQtd2hpdGUgcm91bmRlZC1sZyBwLTIgdGV4dC14cyBmb2N1czpib3JkZXItYnJhbmQtc2Vjb25kYXJ5IGZvY3VzOm91dGxpbmUtbm9uZSB0ZXh0LXJpZ2h0IGZvbnQtc2Fuc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV3QWRkT24ubmFtZSB8fCBuZXdBZGRPbi5wcmljZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9in2YTYsdis2KfYoSDYpdiv2K7Yp9mEINin2LPZhSDYp9mE2YXZhNit2YIg2YjYs9i52LEg2LXYp9mE2K0nIDogJ1BsZWFzZSBpbnB1dCBhIG5hbWUgYW5kIHZhbGlkIHByaWNlJywgJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZG9uT2JqOiBBZGRPbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ubmV3QWRkT24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBgYWRkb24tJHtEYXRlLm5vdygpfWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCaWtlRm9ybShwcmV2ID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZE9uczogWy4uLihwcmV2LmFkZE9ucyB8fCBbXSksIGFkZG9uT2JqXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TmV3QWRkT24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lQXI6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTU4OTgxODA2LWVjNTI3ZmE4NGMzOT9hdXRvPWZvcm1hdCZmaXQ9Y3JvcCZxPTgwJnc9MTUwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjQXI6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmF2Kog2KXYttin2YHYqSDYp9mE2KPZg9iz2LPZiNin2LEg2KjZhtis2KfYrSDZhNmE2KLZhNipJyA6ICdBY2Nlc3NvcnkgaW50ZWdyYXRlZCBpbnRvIG1vZGVsIHNwZWMgYXJyYXknLCAnc3VjY2VzcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIgY3Vyc29yLXBvaW50ZXIgYmctYnJhbmQtc2Vjb25kYXJ5IGhvdmVyOmJnLWFtYmVyLTQwMCB0ZXh0LVsjMEIwRjFBXSBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVzdCB0ZXh0LVs5LjVweF0gcm91bmRlZC14bCBob3ZlcjpicmlnaHRuZXNzLTExMCBhY3RpdmU6c2NhbGUtWzAuOThdIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9iv2YXYrCDYp9mE2KPZg9iz2LPZiNin2LEg2KjYp9mE2YbZhdmI2LDYrCcgOiAnUFVMTCBBQ0NFU1NPUlkgSU5UTyBNT1RPUkNZQ0xFIFNQRUMnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogQ29uZmlndXJlZCBBZGQtb25zIGludmVudG9yeSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/IGDYp9mE2YXYsdmB2YLYp9iqINin2YTYrdin2YTZitipICgke2Jpa2VGb3JtLmFkZE9ucz8ubGVuZ3RoIHx8IDB9KWAgOiBgQVRUQUNIRUQgQUNDRVNTT1JJRVMgKCR7YmlrZUZvcm0uYWRkT25zPy5sZW5ndGggfHwgMH0pYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KCFiaWtlRm9ybS5hZGRPbnMgfHwgYmlrZUZvcm0uYWRkT25zLmxlbmd0aCA9PT0gMCkgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA0XSBiZy13aGl0ZS9bMC4wMl0gdGV4dC1jZW50ZXIgdGV4dC1ncmF5LTUwMCBmb250LXNhbnMgaXRhbGljIHRleHQtWzEwcHhdXCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2YTYpyDYqtmI2KzYryDYo9mD2LPYs9mI2KfYsdin2Kog2YXYrti12LXYqSDZhNmH2LDZhyDYp9mE2K/Ysdin2KzYqScgOiAnTm8gc3BlY2lhbGl6ZWQgcGVyZm9ybWFuY2UgYWRkLW9ucyBhdHRhY2hlZCB0byB0aGlzIGNoYXNzaXMgeWV0Lid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNSBtYXgtaC1bMjIwcHhdIG92ZXJmbG93LXktYXV0byBzY3JvbGxiYXItdGhpblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jpa2VGb3JtLmFkZE9ucy5tYXAoKGFkZCwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXthZGQuaWR9IGNsYXNzTmFtZT1cInAtMiBib3JkZXIgYm9yZGVyLXdoaXRlLzUgYmctYmxhY2svNDAgcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXthZGQuaW1hZ2V9IGNsYXNzTmFtZT1cInctOCBoLTggb2JqZWN0LWNvdmVyIHJvdW5kZWQtbGcgc2hyaW5rLTAgYmctd2hpdGUvNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMCB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ibGFjayB0cnVuY2F0ZVwiPntsYW5nID09PSAnYXInICYmIGFkZC5uYW1lQXIgPyBhZGQubmFtZUFyIDogYWRkLm5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtYnJhbmQtc2Vjb25kYXJ5IGZvbnQtYmxhY2sgZm9udC1tb25vXCI+e2FkZC5wcmljZS50b0xvY2FsZVN0cmluZygpfSB7bGFuZyA9PT0gJ2FyJyA/ICfYrNmG2YrZhycgOiAnRUdQJ308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTQwMCBmb250LXNhbnMgdHJ1bmNhdGVcIj57bGFuZyA9PT0gJ2FyJyAmJiBhZGQuZGVzY0FyID8gYWRkLmRlc2NBciA6IGFkZC5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBzaHJpbmstMCBzZWxlY3Qtbm9uZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lkeCA9PT0gMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBbLi4uYmlrZUZvcm0uYWRkT25zXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wID0gbGlzdFtpZHhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RbaWR4XSA9IGxpc3RbaWR4IC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdFtpZHggLSAxXSA9IHRlbXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QmlrZUZvcm0ocHJldiA9PiAoeyAuLi5wcmV2LCBhZGRPbnM6IGxpc3QgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgcHgtMS41IHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSBkaXNhYmxlZDpvcGFjaXR5LTMwIGJnLXdoaXRlLzUgcm91bmRlZCBwb2ludGVyLWV2ZW50cy1hdXRvIGN1cnNvci1wb2ludGVyIHRleHQtWzlweF0gdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilrJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lkeCA9PT0gYmlrZUZvcm0uYWRkT25zLmxlbmd0aCAtIDF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsaXN0ID0gWy4uLmJpa2VGb3JtLmFkZE9uc107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IGxpc3RbaWR4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0W2lkeF0gPSBsaXN0W2lkeCArIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RbaWR4ICsgMV0gPSB0ZW1wO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEJpa2VGb3JtKHByZXYgPT4gKHsgLi4ucHJldiwgYWRkT25zOiBsaXN0IH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHB4LTEuNSB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUgZGlzYWJsZWQ6b3BhY2l0eS0zMCBiZy13aGl0ZS81IHJvdW5kZWQgcG9pbnRlci1ldmVudHMtYXV0byBjdXJzb3ItcG9pbnRlciB0ZXh0LVs5cHhdIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pa8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCaWtlRm9ybShwcmV2ID0+ICh7IC4uLnByZXYsIGFkZE9uczogcHJldi5hZGRPbnMuZmlsdGVyKGEgPT4gYS5pZCAhPT0gYWRkLmlkKSB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDZgdi12YQg2KfZhNij2YPYs9iz2YjYp9ixJyA6ICdEZXRhY2hlZCBhY2Nlc3NvcnknLCAnaW5mbycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgdGV4dC1yZWQtNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6YmctcmVkLTUwMCByb3VuZGVkIHBvaW50ZXItZXZlbnRzLWF1dG8gY3Vyc29yLXBvaW50ZXIgdGV4dC1bOXB4XSB0cmFuc2l0aW9uLWNvbG9ycyBzaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKclVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogVEFCIEU6IFJFTEFURUQgU1RPUkUgUFJPRFVDVFMgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtU3ViVGFiID09PSAncmVsYXRlZCcgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IHRleHQtbGVmdCBmb250LW1vbm8gYW5pbWF0ZS1mYWRlLWluXCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYmctYmxhY2svNTAgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wNF0gcm91bmRlZC0yeGwgc3BhY2UteS00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHRleHQtYnJhbmQtc2Vjb25kYXJ5IHRyYWNraW5nLXdpZGVzdCB1cHBlcmNhc2UgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9it2K/YryDYp9mE2YXZhtiq2KzYp9iqINiw2KfYqiDYp9mE2LXZhNipINio2KfZhNmF2YjYr9mK2YQnIDogJ0F0dGFjaCBSZWxhdGVkIFN0b3JlIFByb2R1Y3RzJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMiBtYi00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17bGFuZyA9PT0gJ2FyJyA/ICfYqNit2KsuLi4nIDogJ1NlYXJjaC4uLid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgYmctYmxhY2svNTAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHB4LTQgcHktMiB0ZXh0LXdoaXRlIHRleHQteHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFRlcm19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctYmxhY2svNTAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHB4LTQgcHktMiB0ZXh0LXdoaXRlIHRleHQteHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkQ2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlbGVjdGVkQ2F0ZWdvcnkoZS50YXJnZXQudmFsdWUgYXMgU3RvcmVDYXRlZ29yeSB8ICdBTEwnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQUxMXCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNmD2YQnIDogJ0FsbCd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7WydPaWxzJywgJ1NhZmV0eScsICdTbWFydCcsICdQYXJ0cycsICdMaWZlc3R5bGUnXS5tYXAoY2F0ID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2NhdH0gdmFsdWU9e2NhdH0+e2NhdH08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC1oLVszMDBweF0gb3ZlcmZsb3cteS1hdXRvIHNwYWNlLXktMiBwci0yIGN1c3RvbS1zY3JvbGxiYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c3RvcmVQcm9kdWN0cz8uZmlsdGVyKHByb2R1Y3QgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzZWxlY3RlZENhdGVnb3J5ID09PSAnQUxMJyB8fCBwcm9kdWN0LmNhdGVnb3J5ID09PSBzZWxlY3RlZENhdGVnb3J5KSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb2R1Y3QubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSkgfHwgcHJvZHVjdC5uYW1lQXIuaW5jbHVkZXMoc2VhcmNoVGVybSkgfHwgcHJvZHVjdC5pZC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5tYXAoKHByb2R1Y3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSAoYmlrZUZvcm0ucmVsYXRlZFByb2R1Y3RJZHMgfHwgW10pLmluY2x1ZGVzKHByb2R1Y3QuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e3Byb2R1Y3QuaWR9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHAtMiBib3JkZXIgYm9yZGVyLXdoaXRlLzUgYmctd2hpdGUvNSByb3VuZGVkLXhsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjdXJzb3ItcG9pbnRlciB0ZXh0LWJyYW5kLXByaW1hcnkgYmctYmxhY2sgYm9yZGVyLXdoaXRlLzIwIHJvdW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17aXNTZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gYmlrZUZvcm0ucmVsYXRlZFByb2R1Y3RJZHMgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdSZWxhdGVkID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0FkZE9ucyA9IFsuLi4oYmlrZUZvcm0uYWRkT25zIHx8IFtdKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1JlbGF0ZWQgPSBbLi4uY3VycmVudCwgcHJvZHVjdC5pZF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3QWRkb246IEFkZE9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGBhZGRvbi0ke3Byb2R1Y3QuaWR9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHByb2R1Y3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVBcjogcHJvZHVjdC5uYW1lQXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogcGFyc2VJbnQoU3RyaW5nKHByb2R1Y3QucHJpY2UpLnJlcGxhY2UoL1teMC05XS9nLCAnJyksIDEwKSB8fCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IHByb2R1Y3QuaW1hZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogcHJvZHVjdC5kZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NBcjogcHJvZHVjdC5kZXNjcmlwdGlvbkFyIHx8ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdBZGRPbnMucHVzaChuZXdBZGRvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UmVsYXRlZCA9IGN1cnJlbnQuZmlsdGVyKGlkID0+IGlkICE9PSBwcm9kdWN0LmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdBZGRPbnMgPSBuZXdBZGRPbnMuZmlsdGVyKGEgPT4gYS5pZCAhPT0gYGFkZG9uLSR7cHJvZHVjdC5pZH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCaWtlRm9ybSh7IC4uLmJpa2VGb3JtLCByZWxhdGVkUHJvZHVjdElkczogbmV3UmVsYXRlZCwgYWRkT25zOiBuZXdBZGRPbnMgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3Byb2R1Y3QuaW1hZ2V9IGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZCBiZy1ibGFjay81MCBvYmplY3QtY29udGFpbiBwLTFcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTAgcHItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC13aGl0ZSB0cnVuY2F0ZVwiPntsYW5nID09PSAnYXInID8gcHJvZHVjdC5uYW1lQXIgOiBwcm9kdWN0Lm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS00MDAgZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdFwiPntwcm9kdWN0LmlkfSDigKIge3Byb2R1Y3QucHJpY2V9IEVHUDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyghc3RvcmVQcm9kdWN0cyB8fCBzdG9yZVByb2R1Y3RzLmxlbmd0aCA9PT0gMCkgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZ3JheS01MDAgaXRhbGljIHAtNCB0ZXh0LWNlbnRlclwiPk5vIHByb2R1Y3RzIGluIHN0b3JlIHRvIGxpbmsuPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBib3JkZXItdCBib3JkZXItd2hpdGUvNSBmbGV4IGp1c3RpZnktZW5kIGdhcC0zIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRJc0FkZGluZ05ldyhmYWxzZSk7IHNldEVkaXRpbmdCaWtlKG51bGwpOyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMi41IHJvdW5kZWQteGwgYmctd2hpdGUvNSBob3ZlcjpiZy13aGl0ZS8xMCB0ZXh0LWdyYXktMzAwIGZvbnQtYm9sZCBjdXJzb3ItcG9pbnRlciB0ZXh0LXhzIHVwcGVyY2FzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYqtix2KfYrNi5JyA6ICdESVNDQVJEIENIQU5HRVMnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTUgcHktMi41IHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWJyYW5kLXByaW1hcnkgdG8tWyMyMkQzRUVdIHRleHQtWyMwQjBGMUFdIGZvbnQtZXh0cmFib2xkIHVwcGVyY2FzZSBob3ZlcjpicmlnaHRuZXNzLTExMCBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBjdXJzb3ItcG9pbnRlciB0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYqtir2KjZitiqINin2YTYotmE2Kkg2YjYrdmB2LjZh9inJyA6ICdBVVRIT1JJWkUgSU5WRU5UT1JZIFdSSVRFJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gVEFCOiBTVE9SRSBNQU5BR0VNRU5UID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3N0b3JlJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFuaW1hdGUtZmFkZS1pbiB0ZXh0LWxlZnQgbWluLWgtWzYwMHB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgPFN0b3JlQWRtaW5QYW5lbCBcbiAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVQcm9kdWN0cz17c3RvcmVQcm9kdWN0c30gXG4gICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlU3RvcmVQcm9kdWN0cz17b25VcGRhdGVTdG9yZVByb2R1Y3RzIX0gXG4gICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFRBQiAzOiBOT0RFIE9QRVJBVE9SUyBNQU5BR0VNRU5UIChVU0VSUyBMSVNUKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09ICd1c2VycycgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTUgYW5pbWF0ZS1mYWRlLWluXCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlci1iIGJvcmRlci13aGl0ZS81IHBiLTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVzdCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2YXYtNi62YTZiCDYp9mE2LnZgtivINmI2KzZhNiz2KfYqiDYp9mE2LnZhdmEJyA6ICdOT0RFIE9QRVJBVE9SUyBTRUNVUklUWSBESVJFQ1RPUlknfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtZ3JheS01MDAgbm9ybWFsLWNhc2UgbGVhZGluZy1ub3JtYWwgZm9udC1zYW5zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9il2YbYtNin2KEg2K3Ys9in2KjYp9iqINis2K/Zitiv2Kkg2YjYqti52YrZitmGINmF2LPYqtmI2YrYp9iqINin2YTZiNi12YjZhCAo2YXYtNix2YHYjCDZhdiv2YrYsdiMINmF2LTYutmEKScgOiAnQXV0aG9yaXplIHNlY29uZGFyeSBjcmVkZW50aWFscywgYXNzaWduIGFjY2VzcyByaWdodHMsIGFuZCByZXZva2Ugbm9kZSBrZXlzIHNhZmVseS4nfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgYmctYnJhbmQtcHJpbWFyeS8xMCBib3JkZXIgYm9yZGVyLWJyYW5kLXByaW1hcnkvMjAgdGV4dC1bIzIyRDNFRV0gZm9udC1tb25vIHRleHQtWzlweF0gcHgtMiBweS0xIHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5NQVNURVIgU1lTT1BTIFNFQ1VSSVRZIEFDVFMgdjIuMjY8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHtzZXNzaW9uVXNlci5yb2xlICE9PSAnQWRtaW4nID8gKFxuICAgICAgICAgICAgICAgICAgICAgIC8vIFVuYXV0aG9yaXplZCBvdmVybGF5IGZvciBNYW5hZ2VyICYgU3RhZmZcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtOCB0ZXh0LWNlbnRlciBib3JkZXIgYm9yZGVyLXJlZC01MDAvMjAgYmctcmVkLTk1MC8xNSByb3VuZGVkLTJ4bCBzcGFjZS15LTMgZm9udC1tb25vIHRyYWNraW5nLXdpZGVyIG1heC13LW1kIG14LWF1dG8gbXktNiBzaGFkb3ctbGcgc2hhZG93LXJlZC01MDAvNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNoaWVsZEFsZXJ0IGNsYXNzTmFtZT1cInctMTIgaC0xMiB0ZXh0LXJlZC01MDAgbXgtYXV0byBhbmltYXRlLWJvdW5jZSBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXJlZC00MDAgZm9udC1ibGFjayB0ZXh0LXhzIHVwcGVyY2FzZVwiPntsYW5nID09PSAnYXInID8gJ9mE2YjYp9im2K0g2KfZhNij2YXYp9mGOiDYp9mE2YjYtdmI2YQg2YXYsdmB2YjYtiEnIDogJ1NFQ1VSSVRZIEJSRUFDSCBXQVJOSU5HOiBBQ0NFU1MgREVOSUVEJ308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JheS01MDAgbG93ZXJjYXNlIG10LTEgbm9ybWFsLWNhc2UgZm9udC1zYW5zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2LHYrti1INmD2KjYp9ixINin2YTZhdi32YjYsdmK2YYg2KrYqti32YTYqCDYtdmE2KfYrdmK2KfYqiDYp9mE2YXYtNix2YEg2KfZhNiq2KfZhSAoQWRtaW4pLiDZhdi02LrZhNmDINin2YTYrdin2YTZiiDZhdit2LHZiNmFINmF2YYg2KfZhNiv2K7ZiNmELicgOiAnQ3VyYXRpb24gb2YgT3BlcmF0b3IgTm9kZXMgcmVxdWlyZXMgQ29yZSBhZG1pbmlzdHJhdG9yIGF1dGhvcml6YXRpb24uIENyZWRlbnRpYWxzIGxvZ2dlZC4nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAvLyBGdWxsIFVzZXIgY29uZmlndXJhdGlvbiBwYWdlXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNSBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogQ29sdW1uIEE6IFVzZXIgQWRkaXRpb24gUGFuZWwgKDQgU3BhbikgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTUgcC00IGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDRdIGJnLVsjMTExNjIyXS84MCByb3VuZGVkLTJ4bCBzcGFjZS15LTQgc2hhZG93LXNtXCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1icmFuZC1zZWNvbmRhcnkgZm9udC1ibGFjayBib3JkZXItYiBib3JkZXItd2hpdGUvNSBwYi0xLjUgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYnJhbmQtc2Vjb25kYXJ5XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYqtmB2YjZiti2INmF2LTYutmEINmB2LHYudmKINis2K/ZitivJyA6ICdERUxFR0FURSBORVcgT1BFUkFUT1InfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlQWRkVXNlclN1Ym1pdH0gY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgdGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdHJhY2tpbmctd2lkZSB1cHBlcmNhc2VcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2KfYs9mFINin2YTZhdi52LHZgScgOiAnTk9ERSBVU0VSTkFNRSBJREVOVElUWSd9OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3VXNlcm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3VXNlcm5hbWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIm9wZXJhdG9yX2lkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLWJsYWNrLzYwIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGZvY3VzOmJvcmRlci1icmFuZC1zZWNvbmRhcnkgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHB4LTMgcHktMiB0ZXh0LXhzIGZvY3VzOm91dGxpbmUtbm9uZSBweS0yLjUgbG93ZXJjYXNlIGZvbnQtc2VtaWJvbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIHRleHQtbGVmdFwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtWzEwcHhdIHRyYWNraW5nLXdpZGUgdXBwZXJjYXNlXCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNix2YXYsiDYp9mE2YXYtNmB2LEg2YTZhNiv2K7ZiNmEJyA6ICdTRUNVUkUgREVMRUdBVElPTiBDT0RFJ306PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdQYXNzd29yZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdQYXNzd29yZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLWJsYWNrLzYwIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGZvY3VzOmJvcmRlci1icmFuZC1zZWNvbmRhcnkgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHB4LTMgcHktMiB0ZXh0LXhzIGZvY3VzOm91dGxpbmUtbm9uZSBweS0yLjUgZm9udC1ib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSB0ZXh0LWxlZnRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0ZXh0LVsxMHB4XSB0cmFja2luZy13aWRlIHVwcGVyY2FzZVwiPntsYW5nID09PSAnYXInID8gJ9ix2KrYqNipINin2YTZiNi12YjZhCDZiNin2YTYtNio2YPYqScgOiAnQUNDRVNTIFNQRUNUUlVNIFJPTEUnfTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3Um9sZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdSb2xlKGUudGFyZ2V0LnZhbHVlIGFzIFVzZXJSb2xlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS83NSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBmb2N1czpib3JkZXItYnJhbmQtc2Vjb25kYXJ5IHRleHQtd2hpdGUgcm91bmRlZC14bCBweC0zIHB5LTIuNSB0ZXh0LXhzIGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJBZG1pblwiPntsYW5nID09PSAnYXInID8gJ9mF2LTYsdmBINix2KbZitiz2YogKEFkbWluKScgOiAnQ09SRSBBRE1JTiAoRnVsbCBXcml0ZXMgKyBVc2VycyknfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTWFuYWdlclwiPntsYW5nID09PSAnYXInID8gJ9mF2K/ZitixINij2LPYt9mI2YQgKE1hbmFnZXIpJyA6ICdNQU5BR0VSIE5PREUgKEFkZCAmIEVkaXQgRmxlZXQgb25seSknfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiU3RhZmZcIj57bGFuZyA9PT0gJ2FyJyA/ICfZgdix2YrZgiDYudmF2YQv2YXYtNi62YQgKFN0YWZmIE9wZXJhdG9yKScgOiAnU3RhZmYgT3BlcmF0b3IgKE9ubHkgQWRkIE1vdG9yY3ljbGVzKSd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIuNSBtdC0yIGJnLWJyYW5kLXNlY29uZGFyeSB0ZXh0LXdoaXRlIGZvbnQtZXh0cmFib2xkIHRyYWNraW5nLXdpZGVzdCByb3VuZGVkLXhsIGhvdmVyOmJyaWdodG5lc3MtMTEwIGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCB0ZXh0LVsxMXB4XSBjdXJzb3ItcG9pbnRlciB1cHBlcmNhc2UgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2KrZgdi52YrZhCDYsdmF2LIg2KfZhNmF2LTYutmEJyA6ICdERUxFR0FURSBOT0RFJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogQ29sdW1uIEI6IEludGVyYWN0aXZlIFVzZXIgTGlzdHMgKDcgU3BhbikgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTcgcC00IGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDRdIGJnLVsjMEUxMjFFXS85MCByb3VuZGVkLTJ4bCBzcGFjZS15LTMuNSBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtYnJhbmQtYWNjZW50IGZvbnQtYmxhY2sgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItMS41IHRyYWNraW5nLXdpZGVyIHVwcGVyY2FzZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VXNlcnMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWJyYW5kLWFjY2VudFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YXYtNix2YHZiNmGINin2YTZhdiz2KzZhNmI2YYnIDogJ09OTElORSBXT1JLRVJTIFJFR0lTVFJZJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTUwMFwiPnt1c2Vycy5sZW5ndGh9IGFjdGl2ZSBvcGVyYXRvcnM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIuNSBtYXgtaC1bMzAwcHhdIG92ZXJmbG93LXktYXV0byBzY3JvbGxiYXItdGhpblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt1c2Vycy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLnVzZXJuYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTMgYmctYmxhY2svNDAgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wM10gcm91bmRlZC14bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gaG92ZXI6Ym9yZGVyLXdoaXRlLzEwIHRyYW5zaXRpb24tYWxsIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1leHRyYWJvbGQgdGV4dC13aGl0ZSB0ZXh0LXhzIHRyYWNraW5nLXdpZGVcIj57aXRlbS51c2VybmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0xIHJvdW5kZWQgdGV4dC1bOHB4XSBmb250LWJvbGQgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5yb2xlID09PSAnQWRtaW4nID8gJ2JnLWluZGlnby05NTAvODAgYm9yZGVyIGJvcmRlci1pbmRpZ28tNDAwLzIwIHRleHQtaW5kaWdvLTQwMCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnJvbGUgPT09ICdNYW5hZ2VyJyA/ICdiZy1wdXJwbGUtOTUwLzgwIGJvcmRlciBib3JkZXItcHVycGxlLTQwMC8yMCB0ZXh0LWJyYW5kLXNlY29uZGFyeScgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmctZW1lcmFsZC05NTAvODAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTQwMC8yMCB0ZXh0LWVtZXJhbGQtNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5yb2xlLnRvVXBwZXJDYXNlKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBtdC0xIHRleHQtWzlweF0gdGV4dC1ncmF5LTUwMCBsZWFkaW5nLW5vbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPktFWTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1ncmF5LTQwMCB0cmFja2luZy13aWRlclwiPuKAouKAouKAouKAouKAouKAouKAouKAojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0udXNlcm5hbWUudG9VcHBlckNhc2UoKSAhPT0gJ0hPU05ZMTk5NScgJiYgaXRlbS51c2VybmFtZSAhPT0gc2Vzc2lvblVzZXIudXNlcm5hbWUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVEZWxldGVVc2VyKGl0ZW0udXNlcm5hbWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcG9pbnRlci1ldmVudHMtYXV0byBjdXJzb3ItcG9pbnRlciBiZy1yZWQtNjAwLzEwIGhvdmVyOmJnLXJlZC02MDAgaG92ZXI6dGV4dC13aGl0ZSBib3JkZXIgYm9yZGVyLXJlZC01MDAvMjAgdGV4dC1yZWQtMTAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJSZXZva2Ugb3BlcmF0b3IgY3JlZGVudGlhbHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUcmFzaDIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzhweF0gdGV4dC1ncmF5LTYwMCBpdGFsaWMgdHJhY2tpbmctd2lkZXN0IGZvbnQtYmxhY2sgdXBwZXJjYXNlIGZvbnQtbW9ub1wiPkNPUkVfTE9DS0VEPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBUQUIgNDogQURWQU5DRUQgUEFHRSBCVUlMREVSIChIT01FUEFHRSBFRElUT1IpID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3NldHRpbmdzJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMSBhbmltYXRlLWZhZGUtaW4gdGV4dC1sZWZ0IHNwYWNlLXktNlwiPlxuICAgICAgICAgICAgICAgICAgICA8SG9tZXBhZ2VQYWdlQnVpbGRlclxuICAgICAgICAgICAgICAgICAgICAgIGhvbWVwYWdlQ29uZmlnPXtob21lcGFnZUNvbmZpZ31cbiAgICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZUhvbWVwYWdlQ29uZmlnPXtvblVwZGF0ZUhvbWVwYWdlQ29uZmlnIHx8ICgoKSA9PiB7fSl9XG4gICAgICAgICAgICAgICAgICAgICAgbGFuZz17bGFuZ31cbiAgICAgICAgICAgICAgICAgICAgICBkaXI9e2Rpcn1cbiAgICAgICAgICAgICAgICAgICAgICBjdXN0b21UZXh0PXtjdXN0b21UZXh0fVxuICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ3VzdG9tVGV4dD17b25VcGRhdGVDdXN0b21UZXh0fVxuICAgICAgICAgICAgICAgICAgICAgIGZpcmVUb2FzdD17KG1zZywgdHlwZSkgPT4gZmlyZVRvYXN0KG1zZywgdHlwZSl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIFN5c3RlbSBCYWNrdXAgYW5kIFJlc3RvcmUgUGFuZWwgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00LjUgcm91bmRlZC0yeGwgYmctWyMwOTBEMTZdIGJvcmRlciBib3JkZXItYmx1ZS01MDAvMTAgc3BhY2UteS0yIG10LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMi41IGJvcmRlci1iIGJvcmRlci13aGl0ZS81IHBiLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTEuNSBiZy1ibHVlLTUwMC8xMCByb3VuZGVkLWxnIHRleHQtYmx1ZS00MDAgZm9udC1ib2xkIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERhdGFiYXNlIGNsYXNzTmFtZT1cInctNCBoLTQgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCBmb250LXNhbnMgdHJhY2tpbmctd2lkZSB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfZhdix2YPYsiDYpdiv2KfYsdipINin2YTZhtiz2K4g2KfZhNin2K3YqtmK2KfYt9mKIChaSVApJyA6ICdaSVAgQVJDSElWRSBCQUNLVVAgJiBSRVNUT1JFIENPTlNPTEUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTQwMCBsZWFkaW5nLW5vcm1hbCBmb250LW1vbm8gbm9ybWFsLWNhc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICfYqtit2YXZitmEINmD2KfZhdmEINmC2KfYudiv2Kkg2KjZitin2YbYp9iqINmI2YXZhNmB2KfYqiDZiNi52YbYp9i12LEg2KfZhNmF2YjZgti5INmD2YXZhNmBINmF2LbYutmI2Lcg2YjYqtmG2LLZitmE2Ycg2YTYrdmF2KfZitiq2Ycg2YLYqNmEINin2YTZgtmK2KfZhSDYqNij2Yog2KrYudiv2YrZhNin2KouJyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnQ29tcGlsZSwgYXJjaGl2ZSwgYW5kIGRvd25sb2FkIGVudGlyZSBzeXN0ZW0gZGF0YWJhc2VzIGFuZCB0ZW1wbGF0ZXMgYXMgYSBaSVAgZmlsZSB0byBsb2NhbCBzdG9yYWdlLid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC00IHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIERvd25sb2FkIGJhY2t1cCBmaWxlIGJ1dHRvbiAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgYmctWyMwQjBGMUFdIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDNdIGhvdmVyOmJvcmRlci1ibHVlLTUwMC8yMCByb3VuZGVkLXhsIHRyYW5zaXRpb24tYWxsIHNwYWNlLXktMyBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHVwcGVyY2FzZSBmb250LWJvbGQgdGV4dC1ncmF5LTQwMCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IGJsb2NrIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9iq2YbYstmK2YQg2YbYs9iu2Kkg2KfYrdiq2YrYp9i32YrYqScgOiAnR0VORVJBVEUgQkFDS1VQJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTAuNXB4XSB0ZXh0LWdyYXktNTAwIGxlYWRpbmctcmVsYXhlZCBmb250LXNhbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ9mK2YLZiNmFINmH2LDYpyDYp9mE2K7Zitin2LEg2KjYtti62Lcg2YjYrdmB2Lgg2KzZhdmK2Lkg2YXZhtiq2KzYp9iqINin2YTZhdiq2KzYsdiMINin2YTYr9ix2KfYrNin2KrYjCDYpdi52K/Yp9iv2KfYqiDYp9mE2YXYudin2YrZhtip2Iwg2KfZhNiq2LHYrNmF2KfYqtiMINmI2KfZhNit2KzZiNiy2KfYqiDYp9mE2K3Yp9mE2YrYqSDZgdmKINmF2YTZgSBaSVAg2YXYtNmB2LEg2YjYotmF2YYuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdQYWNrYWdlIGFsbCBhY3RpdmUgZmxlZXQgY3ljbGVzLCBzaG9wIHByb2R1Y3RzLCB2aXN1YWwgY3VzdG9tIHRleHRzLCBhbmQgdXNlciBhY2NvdW50cyBpbnNpZGUgYSBzZWN1cmVkIFpJUCBiYWNrdXAgYXJjaGl2ZS4nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEb3dubG9hZEJhY2t1cH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yLjUgYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNTAwLzg1IHRvLWluZGlnby02MDAvOTUgaG92ZXI6ZnJvbS1ibHVlLTUwMCBob3Zlcjp0by1pbmRpZ28tNjAwIHRleHQtd2hpdGUgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LVsxMC41cHhdIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3Qgcm91bmRlZC14bCBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYm9yZGVyLWJsdWUtNTAwLzIwIGFjdGl2ZTpzY2FsZS05OCBzaGFkb3ctbWQgaG92ZXI6c2hhZG93LWJsdWUtNTAwLzEwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYmx1ZS0xMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9iq2K3ZhdmK2YQg2KfZhNmG2LPYrtipINin2YTYp9it2KrZitin2LfZitipIChaSVApIPCfk6YnIDogJ0dlbmVyYXRlICYgRG93bmxvYWQgWklQIPCfk6YnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIFVwbG9hZCAvIFJlc3RvcmUgYmFja3VwIGZpbGUgYnV0dG9uICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSBiZy1bIzBCMEYxQV0gYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wM10gaG92ZXI6Ym9yZGVyLWJsdWUtNTAwLzIwIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgc3BhY2UteS0zIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0ZXh0LWdyYXktNDAwIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3QgYmxvY2sgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KfYs9iq2LnYp9iv2Kkg2YbYs9iu2Kkg2LPYp9io2YLYqScgOiAnUkVTVE9SRSBCQUNLVVAnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMC41cHhdIHRleHQtZ3JheS01MDAgbGVhZGluZy1yZWxheGVkIGZvbnQtc2Fuc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAn2YLZhSDYqNix2YHYuSDZhdmE2YEg2KfZhNmAIFpJUCDYp9mE2YXYtti62YjYtyDYp9mE2LDZiiDZgtmF2Kog2KjYqtmG2LLZitmE2Ycg2YXYs9io2YLYp9mLINmE2KfYs9iq2LHYrNin2Lkg2YPYp9mF2YQg2KjZitin2YbYp9iqINin2YTZhdmI2YLYuSDYp9mE2LPYp9io2YLYqSDYqNmE2YXYs9ipINmI2KfYrdiv2KkuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdVcGxvYWQgYSBwcmV2aW91c2x5IGdlbmVyYXRlZCBzeXN0ZW0gWklQIGJhY2t1cCBmaWxlLiBSZXN0b3JlcyBhbmQgb3ZlcndyaXRlcyBzdGF0ZSB2YXJpYWJsZXMgaW1tZWRpYXRlbHkuJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXB0PVwiLnppcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlUmVzdG9yZUJhY2t1cH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwicmVzdG9yZS16aXAtc2V0dGluZy1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3Nlc3Npb25Vc2VyPy5yb2xlICE9PSAnQWRtaW4nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sRm9yPVwicmVzdG9yZS16aXAtc2V0dGluZy1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yLjUgcm91bmRlZC14bCBmb250LW1vbm8gZm9udC1ib2xkIHRleHQtWzEwLjVweF0gdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCB0cmFuc2l0aW9uLWFsbCBib3JkZXIgc2hhZG93LW1kICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25Vc2VyPy5yb2xlID09PSAnQWRtaW4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctWyMwQjBGMTldIGhvdmVyOmJnLWluZGlnby05NTAvMTUgYm9yZGVyLWluZGlnby01MDAvNDAgaG92ZXI6Ym9yZGVyLWluZGlnby01MDAgdGV4dC1pbmRpZ28tMzAwIGN1cnNvci1wb2ludGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXdoaXRlLzUgYm9yZGVyLXdoaXRlLzEwIHRleHQtZ3JheS01MDAgY3Vyc29yLW5vdC1hbGxvd2VkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFVwbG9hZCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYsdmB2Lkg2YjYp9iz2KrYudin2K/YqSDZhdmE2YEg2KfYrdiq2YrYp9i32Yog8J+UhCcgOiAnVXBsb2FkICYgUmVzdG9yZSBaSVAg8J+UhCd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBHaXRIdWIgSW50ZWdyYXRpb24gUGFuZWwgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00LjUgcm91bmRlZC0yeGwgYmctWyMwOTBEMTZdIGJvcmRlciBib3JkZXItd2hpdGUvNSBzcGFjZS15LTQgbXQtNCB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMi41IGJvcmRlci1iIGJvcmRlci13aGl0ZS81IHBiLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTEuNSBiZy13aGl0ZS81IHJvdW5kZWQtbGcgdGV4dC13aGl0ZSBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxHaXRodWIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCBmb250LXNhbnMgdHJhY2tpbmctd2lkZSB0ZXh0LXdoaXRlIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KjZiNin2KjYqSDYp9mE2YXYstin2YXZhtipINmI2YXYs9iq2YjYr9i52KfYqiBHaXRIdWInIDogJ0dJVEhVQiBDTE9VRCBTWU5DSFJPTklaQVRJT04gR0FURSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNDAwIGxlYWRpbmctbm9ybWFsIGZvbnQtbW9ubyBub3JtYWwtY2FzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ9mF2LLYp9mF2YbYqSDZiNiq2LXYr9mK2LEg2YXZhNmB2KfYqiDZiNio2YrYp9mG2KfYqiDYp9mE2YXYudix2LYg2YXYqNin2LTYsdip2Ysg2YTYrdiz2KfYqCBHaXRIdWIg2KfZhNiu2KfYtSDYqNmD2Iwg2KPZiCDYp9iz2KrYudin2K/YqtmH2Kcg2KjZhNmF2LPYqSDZiNin2K3Yr9ipINmF2YYg2K7ZhNin2YQg2LHYp9io2Lcg2YXYqNin2LTYsS4nIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdFc3RhYmxpc2ggZGlyZWN0IGxpbmsgd2l0aCB5b3VyIEdpdEh1YiByZXBvcyB0byBjb21taXQgY29tcGxldGUgYmFja3Vwcywgb3IgbG9hZCBzbmFwc2hvdCBzdGF0ZXMgYnkgbGluayByZXNvbHZlZC4nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMiBnYXAtNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIENvbHVtbiAxOiBFeHBvcnQgdG8gR2l0SHViIFNldHRpbmdzICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMgcC00IGJnLVsjMEIwRjFBXSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjAzXSBob3Zlcjpib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aDUgY2xhc3NOYW1lPVwidGV4dC1bMTAuNXB4XSB1cHBlcmNhc2UgZm9udC1ib2xkIHRleHQtZ3JheS0zMDAgZm9udC1tb25vIHRyYWNraW5nLXdpZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VXBsb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYmx1ZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9iq2LXYr9mK2LEg2YjYrdmB2Lgg2KfZhNmF2LPYqtmI2K/YuSAoR2l0SHViIEV4cG9ydCknIDogJ1BVU0ggREFUQSBUTyBHSVRIVUInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBUb2tlbiBpbnB1dCAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTQwMCBibG9jayBmb250LW1vbm8gdXBwZXJjYXNlIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYsdmF2LIg2KfZhNmI2LXZiNmEINin2YTYtNiu2LXZiiAoR2l0SHViIFBBVCknIDogJ0dpdEh1YiBQZXJzb25hbCBBY2Nlc3MgVG9rZW4nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3NldHRpbmdzL3Rva2Vucy9uZXc/ZGVzY3JpcHRpb249RWxLaG9seSUyME1vdG9ycyUyMEJhY2t1cCUyMEtleSZzY29wZXM9cmVwb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWJsdWUtNDAwIGhvdmVyOnVuZGVybGluZSBob3Zlcjp0ZXh0LWJsdWUtMzUwIGN1cnNvci1wb2ludGVyIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg8J+UkSB7bGFuZyA9PT0gJ2FyJyA/ICfYpdmG2LTYp9ihINin2YTYsdmF2LIg2KrZhNmC2KfYptmK2KfZiycgOiAnR2VuZXJhdGUgVG9rZW4gQXV0b21hdGljYWxseSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtnaXRodWJUb2tlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0R2l0aHViVG9rZW4oZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X2dpdGh1Yl90b2tlbicsIGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJnaHBfeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwNzBBMTFdIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC1sZyBweC0zIHB5LTEuNSB0ZXh0LXhzIHRleHQtd2hpdGUgcGxhY2Vob2xkZXI6dGV4dC1ncmF5LTY1MCBmb2N1czpib3JkZXItYmx1ZS01MDAgb3V0bGluZS1ub25lIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogUmVwbyBwYXRoICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNDAwIGJsb2NrIGZvbnQtbW9ubyB1cHBlcmNhc2UgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2YXYs9iq2YjYr9i5IEdpdEh1YicgOiAnUmVwb3NpdG9yeSAob3duZXIvcmVwbyknfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL25ld1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWVtZXJhbGQtNDAwIGhvdmVyOnVuZGVybGluZSBob3Zlcjp0ZXh0LWVtZXJhbGQtMzUwIGN1cnNvci1wb2ludGVyIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIPCfk4Ege2xhbmcgPT09ICdhcicgPyAn2KXZhti02KfYoSDZhdiz2KrZiNiv2Lkg2KzYr9mK2K8nIDogJ0NyZWF0ZSBOZXcgUmVwbyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtnaXRodWJSZXBvfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0R2l0aHViUmVwbyhlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZWxraG9seV9naXRodWJfcmVwbycsIGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwidXNlcm5hbWUvbXktcmVwb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMDcwQTExXSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtbGcgcHgtMyBweS0xLjUgdGV4dC14cyB0ZXh0LXdoaXRlIHBsYWNlaG9sZGVyOnRleHQtZ3JheS02NTAgZm9jdXM6Ym9yZGVyLWJsdWUtNTAwIG91dGxpbmUtbm9uZSBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBQYXRoIGZpbGUgbmFtZSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNDAwIGJsb2NrIG1iLTEgZm9udC1tb25vIHVwcGVyY2FzZSBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KfYs9mFINin2YTZhdmE2YEnIDogJ0ZpbGUgTmFtZS9QYXRoJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtnaXRodWJQYXRofVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0R2l0aHViUGF0aChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZWxraG9seV9naXRodWJfcGF0aCcsIGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZWxraG9seV9iYWNrdXAuanNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMDcwQTExXSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtbGcgcHgtMyBweS0xLjUgdGV4dC14cyB0ZXh0LXdoaXRlIGZvY3VzOmJvcmRlci1ibHVlLTUwMCBvdXRsaW5lLW5vbmUgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIEJyYW5jaCBpbnB1dCAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JheS00MDAgYmxvY2sgbWItMSBmb250LW1vbm8gdXBwZXJjYXNlIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KfZhNmB2LHYuSDYp9mE2YXYs9iq2YfYr9mBJyA6ICdUYXJnZXQgQnJhbmNoJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Z2l0aHViQnJhbmNofVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRHaXRodWJCcmFuY2goZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X2dpdGh1Yl9icmFuY2gnLCBlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwibWFpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzA3MEExMV0gYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLWxnIHB4LTMgcHktMS41IHRleHQteHMgdGV4dC13aGl0ZSBmb2N1czpib3JkZXItYmx1ZS01MDAgb3V0bGluZS1ub25lIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRXhwb3J0VG9HaXRIdWJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzR2l0aHViRXhwb3J0aW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBtdC0yIHB5LTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgcm91bmRlZC14bCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzR2l0aHViRXhwb3J0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXdoaXRlLzUgdGV4dC1ncmF5LTU1MCBjdXJzb3Itbm90LWFsbG93ZWQgYm9yZGVyIGJvcmRlci13aGl0ZS81J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy13aGl0ZSB0ZXh0LWJsYWNrIGhvdmVyOmJnLWdyYXktMTAwIGN1cnNvci1wb2ludGVyIGFjdGl2ZTpzY2FsZS05OCBzaGFkb3ctbWQgaG92ZXI6c2hhZG93LXdoaXRlLzUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8R2l0aHViIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1ibGFja1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzR2l0aHViRXhwb3J0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChsYW5nID09PSAnYXInID8gJ9is2KfYsdmKINin2YTZgdit2LUg2YjYp9mE2LHZgdi5Li4uIOKPsycgOiAnQ09NTUlUVElORyBTTkFQU0hPVC4uLiDij7MnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAobGFuZyA9PT0gJ2FyJyA/ICfYrdmB2Lgg2YjYqti12K/ZitixINil2YTZiSBHaXRIdWIg8J+agCcgOiAnUFVTSCBUTyBHSVRIVUIgUkVQTyDwn5qAJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDb2x1bW4gMjogUmVzdG9yZSBmcm9tIFVSTC9HaXRIdWIgUmF3ICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMgcC00IGJnLVsjMEIwRjFBXSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjAzXSBob3Zlcjpib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCB0cmFuc2l0aW9uLWFsbCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzc05hbWU9XCJ0ZXh0LVsxMC41cHhdIHVwcGVyY2FzZSBmb250LWJvbGQgdGV4dC1ncmF5LTMwMCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpbmsgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYp9iz2KrZitix2KfYryDZgdmI2LHZiiDZhdmGINix2KfYqNi3INmF2YTZgSDYrtin2LHYrNmKIC8gR2lzdCcgOiAnSU1QT1JUIERJUkVDVExZIEZST00gVVJMIC8gR0lTVCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oNT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwLjVweF0gdGV4dC1ncmF5LTUwMCBsZWFkaW5nLXJlbGF4ZWQgZm9udC1zYW5zIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ9mK2YLZiNmFINmH2LDYpyDYp9mE2K7Zitin2LEg2KjYrNmE2Kgg2YjYqtmG2LLZitmEINmF2YTZgSDZhtiz2K7YqSDYp9it2KrZitin2LfZitipINmF2YYg2KPZiiDYsdin2KjYtyDZhdio2KfYtNixICjYsdin2KjYtyDYrtin2YUg2YXZhiBHaXRIdWIg2KPZiCBHaXN0INij2Ygg2KPZiiDYrtin2K/ZhSDYrtin2LHYrNmKKSDZiNiq2LfYqNmK2YLZhyDZg9mE2K3YuNipINin2LPYqti52KfYr9ipINmB2YjYsdmK2Kkg2YTZhNmF2YjZgti5LidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnUmVzdG9yZSBjb21wbGV0ZSBzdGF0dXMgdmFyaWFibGVzIGJ5IGlucHV0dGluZyByYXcgVVJMIHBvaW50aW5nIHRvIEpTT04gY2F0YWxvZyBzdHJ1Y3R1cmUgKGUuZy4gcmF3LmdpdGh1YnVzZXJjb250ZW50IG9yIHJhdyBHaXN0KS4nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNDAwIGJsb2NrIGZvbnQtbW9ubyB1cHBlcmNhc2UgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYsdin2KjYtyDZhdmE2YEg2KfZhNmAIEpTT04g2KfZhNmF2KjYp9i02LEnIDogJ0RpcmVjdCBKU09OIEJhY2t1cCBVUkwnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtnaXRodWJJbXBvcnRVcmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0R2l0aHViSW1wb3J0VXJsKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vb3duZXIvcmVwby9tYWluL2Vsa2hvbHlfYmFja3VwLmpzb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwNzBBMTFdIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC14cyB0ZXh0LXdoaXRlIHBsYWNlaG9sZGVyOnRleHQtZ3JheS02MDAgZm9jdXM6Ym9yZGVyLWVtZXJhbGQtNTAwIG91dGxpbmUtbm9uZSBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUltcG9ydEJ5VXJsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0dpdGh1YkltcG9ydGluZyB8fCBzZXNzaW9uVXNlcj8ucm9sZSAhPT0gJ0FkbWluJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgcHktMi41IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHJvdW5kZWQteGwgdGV4dC1bMTBweF0gZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCBmb250LWJvbGQgdXBwZXJjYXNlIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0dpdGh1YkltcG9ydGluZyB8fCBzZXNzaW9uVXNlcj8ucm9sZSAhPT0gJ0FkbWluJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy13aGl0ZS81IHRleHQtZ3JheS01NTAgY3Vyc29yLW5vdC1hbGxvd2VkIGJvcmRlciBib3JkZXItd2hpdGUvNSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctWyMwRTE1MjRdIGhvdmVyOmJnLVsjMTIxYzMyXSBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzMwIGhvdmVyOmJvcmRlci1lbWVyYWxkLTUwMCB0ZXh0LWVtZXJhbGQtMzAwIGN1cnNvci1wb2ludGVyIGFjdGl2ZTpzY2FsZS05OCBzaGFkb3ctbWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT17YHctMy41IGgtMy41ICR7aXNHaXRodWJJbXBvcnRpbmcgPyAnYW5pbWF0ZS1zcGluJyA6ICcnfWB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzR2l0aHViSW1wb3J0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChsYW5nID09PSAnYXInID8gJ9is2KfYsdmKINin2YTYp9iq2LXYp9mEINmI2KfZhNiq2K3ZhdmK2YQuLi4g4o+zJyA6ICdGRVRDSElORyBEQVRBIE5PREVTLi4uIOKPsycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IChsYW5nID09PSAnYXInID8gJ9in2LPYqtmK2LHYp9ivINmI2YXYstin2YXZhtipINin2YTYqNmK2KfZhtin2Kog8J+UhCcgOiAnRkVUQ0ggJiBJTlRFR1JBVEUgREFUQSDwn5SEJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogRnVsbCBDb2RlYmFzZSBEZXBsb3ltZW50IHRvIEdpdEh1YiAoVmVyY2VsIEludGVncmF0aW9uKSAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNC41IGJnLVsjMEIwRjFBXSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjAzXSBob3Zlcjpib3JkZXItd2hpdGUvMTAgcm91bmRlZC0yeGwgdHJhbnNpdGlvbi1hbGwgc3BhY2UteS0zLjUgbXQtNCB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMSBweC0xLjUgYmctcHVycGxlLTUwMC8xMCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvMjAgdGV4dC1wdXJwbGUtNDAwIHJvdW5kZWQtbGdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29kZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB1cHBlcmNhc2UgZm9udC1ib2xkIHRleHQtZ3JheS0yMDAgZm9udC1tb25vIHRyYWNraW5nLXdpZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYsdmB2Lkg2YPZiNivINin2YTZhdi12K/YsSDZiNin2YTZhdi02LHZiNi5INio2KfZhNmD2KfZhdmEINmE2YTYsdio2Lcg2KjZgCBWZXJjZWwnIDogJ1BVU0ggRU5USVJFIFJFQUNUIENPREVCQVNFIEZPUiBWRVJDRUwgREVQTE9ZTUVOVCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oNT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS01NTAgZm9udC1tb25vIGl0YWxpY1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2YLZhSDYqNix2YHYuSDYrNmF2YrYuSDZhdmE2YHYp9iqINin2YTYqti32KjZitmCINmI2KfZhNmF2LTYp9ix2YrYuSDZhNmE2KfYqti12KfZhCDYqNmB2LHZg9mEINmF2KjYp9i02LHYqScgOiAnUHVzaCBjb21wbGV0ZSB3b3Jrc3BhY2Ugc3RydWN0dXJlIHRvIGRlcGxveSBvbiBWZXJjZWwgb3IgTmV0bGlmeSBkeW5hbWljYWxseSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMC41cHhdIHRleHQtZ3JheS00MDAgbGVhZGluZy1yZWxheGVkIGZvbnQtc2Fuc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ9mH2LDYpyDYp9mE2YLYs9mFINmK2KrZititINmE2YMg2KrYtdiv2YrYsSBcItmD2KfZhdmEINin2YTZg9mI2K8g2KfZhNio2LHZhdis2Yog2YTZhNmF2YjZgti5XCIg2YXYuSDYrNmF2YrYuSDYp9mE2KXYudiv2KfYr9in2Kog2YjZhNit2LjYp9iqINin2YTZhdi52LHYtiDZiNin2YTYtdmI2LEg2KfZhNir2YbYp9im2YrYqSDZhdio2KfYtNix2Kkg2KXZhNmJINmF2LPYqtmI2K/YuSBHaXRIdWIg2KfZhNiu2KfYtSDYqNmDLiDYqNi52K8g2KXYqtmF2KfZhSDYp9mE2LHZgdi52Iwg2YrZhdmD2YbZgyDYp9mE2K/YrtmI2YQg2YTYrdiz2KfYqCBWZXJjZWwg2YjYsdio2Lcg2KfZhNmF2LPYqtmI2K/YudiMINmI2LPZitiq2YUg2KXYt9mE2KfZgiDZhdmI2YLYudmDINin2YTYrtin2LUg2YHZiNix2KfZiyDZiNio2LTZg9mEINmF2LPYqtmC2YQg2KrZhdin2YXYp9mLINmI2K/Yp9im2YUg2YXYrNin2YbYp9mLISdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdUaGlzIG1vZHVsZSBmZXRjaGVzIGV2ZXJ5IHNpbmdsZSBhY3RpdmUgY29tcG9uZW50LCB0cmFuc2xhdGlvbiBsYXlvdXQsIHBhY2thZ2UgbW9kdWxlLCBhc3NldHMgZm9sZGVyLCBhbmQgYmluYXJ5IHBpY3R1cmUsIHRoZW4gcHJvY2Vzc2VzIHRoZW0gYXMgYSBzaW5nbGUgdHJlZSBjb21taXQgb24gR2l0SHViLiBFYXNpbHkgaG9vayB0aGlzIHJlcG9zaXRvcnkgaW50byBWZXJjZWwgb3IgTmV0bGlmeSB0byBjb21waWxlIGFuZCBkZWxpdmVyIHlvdXIgY3VzdG9tIHN0b3JlZnJvbnQgaW5zdGFudGx5ISd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBnYXAtMyBwLTMgYmctWyMwNzBBMTFdIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci13aGl0ZS81IGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciB0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2KfZhNmF2LPYqtmI2K/YuSDYp9mE2YfYr9mBOicgOiAnVEFSR0VUIFJFUE9TSVRPUlk6J308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LWJvbGQgdHJhY2tpbmctd2lkZVwiPntnaXRodWJSZXBvIHx8IChsYW5nID09PSAnYXInID8gJ9mE2YUg2YrYrdiv2K8nIDogJ05vdCBzcGVjaWZpZWQnKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciB0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2KfZhNmB2LHYuSDYp9mE2YXYs9iq2YfYr9mBOicgOiAnVEFSR0VUIEJSQU5DSDonfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNDAwIGZvbnQtYm9sZCB0cmFja2luZy13aWRlXCI+e2dpdGh1YkJyYW5jaCB8fCAnbWFpbid9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNQdXNoaW5nUHJvamVjdCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLWluZGlnby05NTAvMjAgYm9yZGVyIGJvcmRlci1pbmRpZ28tNTAwLzE1IHJvdW5kZWQteGwgc3BhY2UteS0yIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJlZnJlc2hDdyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWluZGlnby00MDAgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwLjVweF0gZm9udC1tb25vIHRleHQtaW5kaWdvLTMwMCBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYrNin2LHZiiDYqtis2YfZitiyINmI2KrYtdiv2YrYsSDYp9mE2YXYtNix2YjYuS4uLiDij7MnIDogJ1BVU0hJTkcgU1lTVEVNIEZJTEVTLi4uIOKPsyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtZ3JheS00MDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvamVjdFB1c2hTdGVwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVQdXNoRW50aXJlUHJvamVjdFRvR2l0SHVifVxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNQdXNoaW5nUHJvamVjdCB8fCAhZ2l0aHViUmVwby50cmltKCkgfHwgIWdpdGh1YlRva2VuLnRyaW0oKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHB5LTMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgcm91bmRlZC14bCB0ZXh0LVsxMC41cHhdIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3QgZm9udC1leHRyYWJvbGQgdXBwZXJjYXNlIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQdXNoaW5nUHJvamVjdCB8fCAhZ2l0aHViUmVwby50cmltKCkgfHwgIWdpdGh1YlRva2VuLnRyaW0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctd2hpdGUvNSB0ZXh0LWdyYXktNTUwIGJvcmRlciBib3JkZXItd2hpdGUvNSBjdXJzb3Itbm90LWFsbG93ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1ncmFkaWVudC10by1yIGZyb20tcHVycGxlLTYwMCB0by1pbmRpZ28tNjAwIGhvdmVyOmZyb20tcHVycGxlLTU1MCBob3Zlcjp0by1pbmRpZ28tNTUwIHRleHQtd2hpdGUgY3Vyc29yLXBvaW50ZXIgYWN0aXZlOnNjYWxlLTk4IHNoYWRvdy1tZCBob3ZlcjpzaGFkb3ctaW5kaWdvLTUwMC8xMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxHaXRodWIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXdoaXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2lzUHVzaGluZ1Byb2plY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChsYW5nID09PSAnYXInID8gJ9is2KfYsdmKINin2YTYsdmB2LkuLi4g8J+agCcgOiAnRVhFQ1VUSU5HIEFUT01JQyBDT01NSVQuLi4g8J+agCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAobGFuZyA9PT0gJ2FyJyA/ICfYpdi32YTYp9mCINmI2LHZgdi5INmD2YjYryDYp9mE2YXZiNmC2Lkg2KjYp9mE2YPYp9mF2YQg2KXZhNmJIEdpdEh1YiDwn5qA8J+SuycgOiAnUFVTSCBGVUxMIFJFQUNUSU9OIEVOR0lORSBUTyBHSVRIVUIg8J+agPCfkrsnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvbW90aW9uLmRpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuY29uc3QgTU9DS19ISVNUT1JJQ0FMX1NBTEVTID0gW1xuICAvLyBKYW51YXJ5IDIwMjYgKE1vbnRoIDEpXG4gIHtcbiAgICBpZDogJ0hJU1QtTTEtMDEnLFxuICAgIGNvZGU6ICdzcG9ydC1jeWJlcnNwb3J0LXY0JyxcbiAgICBuYW1lOiAnRWxLaG9seSBDeWJlclNwb3J0IFY0JyxcbiAgICB0eXBlOiAnbW90b3JjeWNsZScsXG4gICAgY3VzdG9tZXJOYW1lOiAn2KPYrdmF2K8g2YXYrdmF2YjYryDYp9mE2LnYp9i12YonLFxuICAgIGN1c3RvbWVyUGhvbmU6ICcwMTA5OTg4Nzc2NicsXG4gICAgcXVhbnRpdHk6IDEsXG4gICAgdW5pdFByaWNlOiA0NTAwMCxcbiAgICB0b3RhbFByaWNlOiA0NTAwMCxcbiAgICBkYXRlOiAnMjAyNi0wMS0xMidcbiAgfSxcbiAge1xuICAgIGlkOiAnSElTVC1NMS0wMicsXG4gICAgY29kZTogJ1BSRC1NVEw3MTAnLFxuICAgIG5hbWU6ICfYstmK2Kog2YXZiNiq2YjZhCA3MTAwIDEwVzQwINiq2K7ZhNmK2YLZiiAxINmE2KrYsScsXG4gICAgdHlwZTogJ3Byb2R1Y3QnLFxuICAgIGN1c3RvbWVyTmFtZTogJ9mF2K3ZhdivINi52KjYryDYp9mE2YTZhycsXG4gICAgY3VzdG9tZXJQaG9uZTogJzAxMTIyMzM0NDU1JyxcbiAgICBxdWFudGl0eTogMyxcbiAgICB1bml0UHJpY2U6IDg1MCxcbiAgICB0b3RhbFByaWNlOiAyNTUwLFxuICAgIGRhdGU6ICcyMDI2LTAxLTE4J1xuICB9LFxuICB7XG4gICAgaWQ6ICdISVNULU0xLTAzJyxcbiAgICBjb2RlOiAnUFJELUFHVksxUycsXG4gICAgbmFtZTogJ9iu2YjYsNipINij2Yog2KzZiiDZgdmKIEsxIFMg2KfZhNix2YrYp9i22YrYqSDYp9mE2KPYtdmE2YrYqScsXG4gICAgdHlwZTogJ3Byb2R1Y3QnLFxuICAgIGN1c3RvbWVyTmFtZTogJ9mD2LHZitmFINij2LTYsdmBJyxcbiAgICBjdXN0b21lclBob25lOiAnMDEyMzM0NDU1NjYnLFxuICAgIHF1YW50aXR5OiAxLFxuICAgIHVuaXRQcmljZTogMTE1MDAsXG4gICAgdG90YWxQcmljZTogMTE1MDAsXG4gICAgZGF0ZTogJzIwMjYtMDEtMjUnXG4gIH0sXG5cbiAgLy8gRmVicnVhcnkgMjAyNiAoTW9udGggMilcbiAge1xuICAgIGlkOiAnSElTVC1NMi0wMScsXG4gICAgY29kZTogJ2NydWlzZXItY3liZXJjcnVpc2VyLXgxJyxcbiAgICBuYW1lOiAnRWxLaG9seSBDeWJlckNydWlzZXIgWDEnLFxuICAgIHR5cGU6ICdtb3RvcmN5Y2xlJyxcbiAgICBjdXN0b21lck5hbWU6ICfZhdit2YXZiNivINin2YTYtdin2YjZiicsXG4gICAgY3VzdG9tZXJQaG9uZTogJzAxNTY2Nzc4ODk5JyxcbiAgICBxdWFudGl0eTogMSxcbiAgICB1bml0UHJpY2U6IDM4MDAwLFxuICAgIHRvdGFsUHJpY2U6IDM4MDAwLFxuICAgIGRhdGU6ICcyMDI2LTAyLTA1J1xuICB9LFxuICB7XG4gICAgaWQ6ICdISVNULU0yLTAyJyxcbiAgICBjb2RlOiAnUFJELVNQQ1BSTycsXG4gICAgbmFtZTogJ9it2KfZhdmEINis2YjYp9mEINil2LMg2KjZiiDZg9mI2YbZg9iqINio2LHZiCDZhNmE2K/Ysdin2KzYp9iqJyxcbiAgICB0eXBlOiAncHJvZHVjdCcsXG4gICAgY3VzdG9tZXJOYW1lOiAn2LPYp9mF2K0g2LrYp9mE2YonLFxuICAgIGN1c3RvbWVyUGhvbmU6ICcwMTAxMTIyMzM0NCcsXG4gICAgcXVhbnRpdHk6IDIsXG4gICAgdW5pdFByaWNlOiAyMjAwLFxuICAgIHRvdGFsUHJpY2U6IDQ0MDAsXG4gICAgZGF0ZTogJzIwMjYtMDItMTQnXG4gIH0sXG4gIHtcbiAgICBpZDogJ0hJU1QtTTItMDMnLFxuICAgIGNvZGU6ICdQUkQtQ1JEUFRLJyxcbiAgICBuYW1lOiAn2KfZhtiq2LHZg9mI2YUg2YPYp9ix2K/ZiCDYqNin2YMg2KrZiNmDINin2YrYr9isINir2YbYp9im2Yog2KPYtdmE2YonLFxuICAgIHR5cGU6ICdwcm9kdWN0JyxcbiAgICBjdXN0b21lck5hbWU6ICfZiNin2KbZhCDYudiy2KonLFxuICAgIGN1c3RvbWVyUGhvbmU6ICcwMTE1NTQ0MzMyMicsXG4gICAgcXVhbnRpdHk6IDEsXG4gICAgdW5pdFByaWNlOiAxODkwMCxcbiAgICB0b3RhbFByaWNlOiAxODkwMCxcbiAgICBkYXRlOiAnMjAyNi0wMi0yMidcbiAgfSxcblxuICAvLyBNYXJjaCAyMDI2IChNb250aCAzKVxuICB7XG4gICAgaWQ6ICdISVNULU0zLTAxJyxcbiAgICBjb2RlOiAnc2Nvb3Rlci1jeWJlcnNjb290ZXItczInLFxuICAgIG5hbWU6ICdFbEtob2x5IEN5YmVyU2Nvb3RlciBTMicsXG4gICAgdHlwZTogJ21vdG9yY3ljbGUnLFxuICAgIGN1c3RvbWVyTmFtZTogJ9mK2KfYs9ixINin2YTYt9mI2K7ZiicsXG4gICAgY3VzdG9tZXJQaG9uZTogJzAxMjg4Nzc2NjU1JyxcbiAgICBxdWFudGl0eTogMSxcbiAgICB1bml0UHJpY2U6IDE2MDAwLFxuICAgIHRvdGFsUHJpY2U6IDE2MDAwLFxuICAgIGRhdGU6ICcyMDI2LTAzLTA4J1xuICB9LFxuICB7XG4gICAgaWQ6ICdISVNULU0zLTAyJyxcbiAgICBjb2RlOiAnUFJELU5HS0lSRCcsXG4gICAgbmFtZTogJ9io2YjYrNmK2Ycg2KfZhiDYrNmKINmD2Yog2KfZitix2YrYr9mK2YjZhSDYsdmK2KfYttmKINmB2KfYptmCINin2YTYo9iv2KfYoScsXG4gICAgdHlwZTogJ3Byb2R1Y3QnLFxuICAgIGN1c3RvbWVyTmFtZTogJ9i52YXYsdmIINij2K/ZitioJyxcbiAgICBjdXN0b21lclBob25lOiAnMDEwMjIzMzQ0NTUnLFxuICAgIHF1YW50aXR5OiA0LFxuICAgIHVuaXRQcmljZTogNDUwLFxuICAgIHRvdGFsUHJpY2U6IDE4MDAsXG4gICAgZGF0ZTogJzIwMjYtMDMtMTUnXG4gIH0sXG4gIHtcbiAgICBpZDogJ0hJU1QtTTMtMDMnLFxuICAgIGNvZGU6ICdQUkQtWUFTQkFUJyxcbiAgICBuYW1lOiAn2KjYt9in2LHZitipINmK2YjYp9iz2Kcg2KfZhNmK2KfYqNin2YbZitipINij2LXZhNmK2Kkg2K7Yp9mE2YrYqSDZhdmGINin2YTYtdmK2KfZhtipJyxcbiAgICB0eXBlOiAncHJvZHVjdCcsXG4gICAgY3VzdG9tZXJOYW1lOiAn2YfYp9mG2Yog2LTYp9mD2LEnLFxuICAgIGN1c3RvbWVyUGhvbmU6ICcwMTE0NDMzMjIxMScsXG4gICAgcXVhbnRpdHk6IDEsXG4gICAgdW5pdFByaWNlOiAyNDAwLFxuICAgIHRvdGFsUHJpY2U6IDI0MDAsXG4gICAgZGF0ZTogJzIwMjYtMDMtMjknXG4gIH0sXG5cbiAgLy8gQXByaWwgMjAyNiAoTW9udGggNClcbiAge1xuICAgIGlkOiAnSElTVC1NNC0wMScsXG4gICAgY29kZTogJ3RvdXJpbmctY3liZXJhZHZlbnR1cmUtdjgnLFxuICAgIG5hbWU6ICdFbEtob2x5IEN5YmVyQWR2ZW50dXJlIFY4JyxcbiAgICB0eXBlOiAnbW90b3JjeWNsZScsXG4gICAgY3VzdG9tZXJOYW1lOiAn2K7Yp9mE2K8g2KfZhNis2YbYr9mKJyxcbiAgICBjdXN0b21lclBob25lOiAnMDE1OTk4ODc3NjYnLFxuICAgIHF1YW50aXR5OiAxLFxuICAgIHVuaXRQcmljZTogNTIwMDAsXG4gICAgdG90YWxQcmljZTogNTIwMDAsXG4gICAgZGF0ZTogJzIwMjYtMDQtMTAnXG4gIH0sXG4gIHtcbiAgICBpZDogJ0hJU1QtTTQtMDInLFxuICAgIGNvZGU6ICdQUkQtTFFNNFQxJyxcbiAgICBuYW1lOiAn2LLZitiqINmE2YrZg9mI2Yog2YXZiNmE2Yog2KfZhNij2YTZhdin2YbZiiAxMFc1MCDZhNmE2LfYsdmC2KfYqiAxINmE2KrYsScsXG4gICAgdHlwZTogJ3Byb2R1Y3QnLFxuICAgIGN1c3RvbWVyTmFtZTogJ9ij2LTYsdmBINiy2YPZiicsXG4gICAgY3VzdG9tZXJQaG9uZTogJzAxMDY2NTU0NDMzJyxcbiAgICBxdWFudGl0eTogNSxcbiAgICB1bml0UHJpY2U6IDc4MCxcbiAgICB0b3RhbFByaWNlOiAzOTAwLFxuICAgIGRhdGU6ICcyMDI2LTA0LTE4J1xuICB9LFxuICB7XG4gICAgaWQ6ICdISVNULU00LTAzJyxcbiAgICBjb2RlOiAnUFJELVhJQUFJUicsXG4gICAgbmFtZTogJ9mF2YbZgdin2K4g2KXYt9in2LHYp9iqINi02KfZiNmF2Yog2KfZhNmD2YfYsdio2KfYptmKINin2YTZhdit2YXZiNmEIDInLFxuICAgIHR5cGU6ICdwcm9kdWN0JyxcbiAgICBjdXN0b21lck5hbWU6ICfYpdiz2YTYp9mFINi12KjYrdmKJyxcbiAgICBjdXN0b21lclBob25lOiAnMDEyNzc2NjU1NDQnLFxuICAgIHF1YW50aXR5OiAyLFxuICAgIHVuaXRQcmljZTogMTg1MCxcbiAgICB0b3RhbFByaWNlOiAzNzAwLFxuICAgIGRhdGU6ICcyMDI2LTA0LTI2J1xuICB9LFxuXG4gIC8vIE1heSAyMDI2IChNb250aCA1KVxuICB7XG4gICAgaWQ6ICdISVNULU01LTAxJyxcbiAgICBjb2RlOiAnc3BvcnQtY3liZXJzcG9ydC12NCcsXG4gICAgbmFtZTogJ0VsS2hvbHkgQ3liZXJTcG9ydCBWNCcsXG4gICAgdHlwZTogJ21vdG9yY3ljbGUnLFxuICAgIGN1c3RvbWVyTmFtZTogJ9ij2YrZhdmGINmG2YjYsScsXG4gICAgY3VzdG9tZXJQaG9uZTogJzAxMTg4OTkwMDExJyxcbiAgICBxdWFudGl0eTogMSxcbiAgICB1bml0UHJpY2U6IDQ1MDAwLFxuICAgIHRvdGFsUHJpY2U6IDQ1MDAwLFxuICAgIGRhdGU6ICcyMDI2LTA1LTAyJ1xuICB9LFxuICB7XG4gICAgaWQ6ICdISVNULU01LTAyJyxcbiAgICBjb2RlOiAnUFJELUFMUEdMVicsXG4gICAgbmFtZTogJ9mC2YHYp9iy2KfYqiDYp9mE2KjZitmGINiz2KrYp9ix2LIgR1AgUHJvIFYyINis2YTYryDYs9io2KfZgtin2Kog2KfZhNmD2KfYsdio2YjZhicsXG4gICAgdHlwZTogJ3Byb2R1Y3QnLFxuICAgIGN1c3RvbWVyTmFtZTogJ9mH2LTYp9mFINi52KjYp9izJyxcbiAgICBjdXN0b21lclBob25lOiAnMDE1NDQzMzIyMTEnLFxuICAgIHF1YW50aXR5OiAxLFxuICAgIHVuaXRQcmljZTogNDgwMCxcbiAgICB0b3RhbFByaWNlOiA0ODAwLFxuICAgIGRhdGU6ICcyMDI2LTA1LTE1J1xuICB9LFxuICB7XG4gICAgaWQ6ICdISVNULU01LTAzJyxcbiAgICBjb2RlOiAnUFJELU1DSFJENicsXG4gICAgbmFtZTogJ9il2LfYp9ixINmD2KfZiNiq2LQg2YXZiti02YTYp9mGINix2YjYryA2INij2YXYp9mF2Yog2KfYs9iq2YrYsdin2K8nLFxuICAgIHR5cGU6ICdwcm9kdWN0JyxcbiAgICBjdXN0b21lck5hbWU6ICfYrdiz2YYg2LTYp9mD2YjYtCcsXG4gICAgY3VzdG9tZXJQaG9uZTogJzAxMDExMzM1NTc3JyxcbiAgICBxdWFudGl0eTogMixcbiAgICB1bml0UHJpY2U6IDY4MDAsXG4gICAgdG90YWxQcmljZTogMTM2MDAsXG4gICAgZGF0ZTogJzIwMjYtMDUtMjQnXG4gIH0sXG5cbiAgLy8gSnVuZSAyMDI2IChNb250aCA2KVxuICB7XG4gICAgaWQ6ICdISVNULU02LTAxJyxcbiAgICBjb2RlOiAnc2Nvb3Rlci1jeWJlcnNjb290ZXItczInLFxuICAgIG5hbWU6ICdFbEtob2x5IEN5YmVyU2Nvb3RlciBTMicsXG4gICAgdHlwZTogJ21vdG9yY3ljbGUnLFxuICAgIGN1c3RvbWVyTmFtZTogJ9io2YfYp9ihINiz2YTYt9in2YYnLFxuICAgIGN1c3RvbWVyUGhvbmU6ICcwMTI0NDU1NjY3NycsXG4gICAgcXVhbnRpdHk6IDEsXG4gICAgdW5pdFByaWNlOiAxNjAwMCxcbiAgICB0b3RhbFByaWNlOiAxNjAwMCxcbiAgICBkYXRlOiAnMjAyNi0wNi0wMSdcbiAgfSxcbiAge1xuICAgIGlkOiAnSElTVC1NNi0wMicsXG4gICAgY29kZTogJ1BSRC1ETlNSNEonLFxuICAgIG5hbWU6ICfYrNin2YPZitiqINiv2KfZhtmK2LIg2LHZitiz2YrZhtisIDQg2KzZhNiv2Yog2YHYp9iu2LEgLSDYo9iz2YjYryDZiNiw2YfYqNmKJyxcbiAgICB0eXBlOiAncHJvZHVjdCcsXG4gICAgY3VzdG9tZXJOYW1lOiAn2KrYp9mF2LEg2K3Ys9mG2YonLFxuICAgIGN1c3RvbWVyUGhvbmU6ICcwMTE3NzY2NTU0NCcsXG4gICAgcXVhbnRpdHk6IDEsXG4gICAgdW5pdFByaWNlOiAxODUwMCxcbiAgICB0b3RhbFByaWNlOiAxODUwMCxcbiAgICBkYXRlOiAnMjAyNi0wNi0wMydcbiAgfSxcbiAge1xuICAgIGlkOiAnSElTVC1NNi0wMycsXG4gICAgY29kZTogJ1BSRC1NVExDSEwnLFxuICAgIG5hbWU6ICfYp9iz2KjYsdin2Yog2YXYtNit2YUg2KzZhtiy2YrYsSDZhdmI2KrZiNmEIEMyINit2KzZhSA0MDAg2YXZhCcsXG4gICAgdHlwZTogJ3Byb2R1Y3QnLFxuICAgIGN1c3RvbWVyTmFtZTogJ9i52YXYsdmIINiv2YrYp9ioJyxcbiAgICBjdXN0b21lclBob25lOiAnMDEwMjAzMDQwNTAnLFxuICAgIHF1YW50aXR5OiA0LFxuICAgIHVuaXRQcmljZTogNDUwLFxuICAgIHRvdGFsUHJpY2U6IDE4MDAsXG4gICAgZGF0ZTogJzIwMjYtMDYtMDQnXG4gIH1cbl07XG4iXSwibWFwcGluZ3MiOiJBQTBrRGMsU0FxaEJZLFVBcmhCWjtBQTFrRGQ7QUFBQTtBQUFBO0FBQUE7QUFLQSxTQUFnQixVQUFVLFdBQVcsZUFBZTtBQUNwRCxTQUFTLFFBQVEsdUJBQXVCO0FBQ3hDO0FBQUEsRUFDRTtBQUFBLEVBQUc7QUFBQSxFQUFNO0FBQUEsRUFBSztBQUFBLEVBQWE7QUFBQSxFQUFVO0FBQUEsRUFBUTtBQUFBLEVBQUs7QUFBQSxFQUFRO0FBQUEsRUFBVTtBQUFBLEVBQU07QUFBQSxFQUMxRTtBQUFBLEVBQU87QUFBQSxFQUFPO0FBQUEsRUFBc0I7QUFBQSxFQUFPO0FBQUEsRUFBdUI7QUFBQSxFQUNsRTtBQUFBLEVBQU87QUFBQSxFQUFVO0FBQUEsRUFBVTtBQUFBLEVBQWU7QUFBQSxFQUFjO0FBQUEsRUFDakQ7QUFBQSxFQUFRO0FBQUEsRUFBYTtBQUFBLEVBQWE7QUFBQSxFQUFTO0FBQUEsRUFBVTtBQUFBLEVBQVE7QUFBQSxFQUFRO0FBQUEsRUFBTTtBQUFBLEVBQVc7QUFBQSxPQUN4RjtBQUVQLFNBQVMsbUJBQW1CO0FBQzVCLFNBQVMsK0JBQStCO0FBQ3hDLE9BQU8seUJBQXlCO0FBQ2hDLE9BQU8scUJBQXFCO0FBQzVCLFNBQVMsVUFBVTtBQUNuQixTQUFTLFlBQVksS0FBSyxRQUFRLFdBQVcsZUFBZTtBQUM1RCxZQUFZLFVBQVU7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