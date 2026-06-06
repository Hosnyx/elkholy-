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
    const staticConfigs = {
      "package.json": `{
  "name": "react-example",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist server.js",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "@tailwindcss/vite": "^4.1.14",
    "@vitejs/plugin-react": "^5.0.4",
    "dotenv": "^17.2.3",
    "express": "^4.21.2",
    "firebase": "^12.14.0",
    "jszip": "^3.10.1",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "qrcode": "^1.5.4",
    "qrcode.react": "^4.2.0",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "vite": "^6.2.3",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/jszip": "^3.4.0",
    "@types/node": "^22.14.0",
    "@types/qrcode": "^1.5.6",
    "autoprefixer": "^10.4.21",
    "esbuild": "^0.25.0",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.21.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.3"
  }
}`,
      "tsconfig.json": `{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}`,
      "vite.config.ts": `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});`,
      "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Google AI Studio App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"><\/script>
  </body>
</html>`,
      ".gitignore": `node_modules/
build/
dist/
coverage/
.DS_Store
*.log
.env*
!.env.example`,
      ".env.example": `# GEMINI_API_KEY: Required for Gemini AI API calls.
# AI Studio automatically injects this at runtime from user secrets.
# Users configure this via the Secrets panel in the AI Studio UI.
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# APP_URL: The URL where this applet is hosted.
# AI Studio automatically injects this at runtime with the Cloud Run service URL.
# Used for self-referential links, OAuth callbacks, and API endpoints.
APP_URL="MY_APP_URL"`
    };
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
          let content = "";
          if (staticConfigs[path] !== void 0) {
            content = staticConfigs[path];
          } else {
            const fileRes = await fetch("/" + path);
            if (!fileRes.ok) throw new Error(`Could not fetch ${path}`);
            content = await fileRes.text();
          }
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
            lineNumber: 1739,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-medium", children: t2.text }, void 0, false, {
            fileName: "/app/applet/src/components/AdminPanel.tsx",
            lineNumber: 1740,
            columnNumber: 15
          }, this)
        ]
      },
      t2.id,
      true,
      {
        fileName: "/app/applet/src/components/AdminPanel.tsx",
        lineNumber: 1726,
        columnNumber: 13
      },
      this
    )) }, void 0, false, {
      fileName: "/app/applet/src/components/AdminPanel.tsx",
      lineNumber: 1724,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/AdminPanel.tsx",
      lineNumber: 1723,
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
            lineNumber: 1755,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/[0.08] p-4 bg-[#0B0F1A]/90 z-10", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-brand-primary/10 border border-brand-primary/30", children: /* @__PURE__ */ jsxDEV(Database, { className: "w-5 h-5 text-[#22D3EE] animate-pulse" }, void 0, false, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1761,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1760,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-left", dir, children: [
                /* @__PURE__ */ jsxDEV("h2", { className: "text-sm sm:text-base font-extrabold tracking-widest font-mono", children: t("admin_title") }, void 0, false, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1764,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 mt-0.5", dir: "ltr", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" }, void 0, false, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1768,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-gray-500 font-mono tracking-widest", children: sessionUser ? `ACTIVE NODE: ${sessionUser.username} | ${sessionUser.role.toUpperCase()}` : "SECURE GPRS SHELL TERMINAL | OFFLINE" }, void 0, false, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1769,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1767,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1763,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AdminPanel.tsx",
              lineNumber: 1759,
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
                      lineNumber: 1782,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "فصل المشترك" : "DISCONNECT" }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1783,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1778,
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
                    lineNumber: 1791,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1787,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AdminPanel.tsx",
              lineNumber: 1776,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AdminPanel.tsx",
            lineNumber: 1758,
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
                    lineNumber: 1809,
                    columnNumber: 19
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1804,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold font-mono tracking-wider", children: lang === "ar" ? "بوابة التحقق المشفرة" : "OPERATOR IDENTITY PORTAL" }, void 0, false, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1812,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-500 normal-case leading-normal font-sans", children: lang === "ar" ? "الوصول محدود للأعضاء المصرح لهم فقط. يرجى تزويد رمز الدخول لإعطاء التفويض." : "Access is limited to verified personnel only. Enter your credentials to initialize GPRS link." }, void 0, false, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1815,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "p-3 border border-indigo-500/20 bg-indigo-950/20 rounded-xl text-[10px] font-mono text-gray-400 leading-normal text-left capitalize font-semibold tracking-wide", children: [
                "⚡ ",
                lang === "ar" ? "أعضاء الأوتوماتيكي الافتراضيون:" : "Default Demo Node:",
                /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1823,
                  columnNumber: 95
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent", children: "HOSNY1995" }, void 0, false, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1824,
                  columnNumber: 19
                }, this),
                " | Code: ",
                /* @__PURE__ */ jsxDEV("span", { className: "text-brand-primary", children: "Hhrm0101995ELelkholy" }, void 0, false, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1824,
                  columnNumber: 80
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1822,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AdminPanel.tsx",
              lineNumber: 1803,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("form", { onSubmit: handleLoginSubmit, className: "w-full space-y-3.5 text-left font-mono text-xs max-w-[320px]", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 tracking-wider text-[10px]", children: [
                  lang === "ar" ? "اسم المستخدم للمشغل" : "OPERATOR ACCOUNT NAME",
                  ":"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1830,
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
                    lineNumber: 1831,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1829,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 tracking-wider text-[10px]", children: [
                  lang === "ar" ? "كلمة المرور" : "ACCESS CODE KEY",
                  ":"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1842,
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
                      lineNumber: 1844,
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
                        lineNumber: 1857,
                        columnNumber: 39
                      }, this) : /* @__PURE__ */ jsxDEV(Eye, { className: "w-4 h-4" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1857,
                        columnNumber: 72
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1852,
                      columnNumber: 21
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1843,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1841,
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
                      lineNumber: 1866,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تسجيل دخول المحطة" : "INITIALIZE LINK" }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1867,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1862,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AdminPanel.tsx",
              lineNumber: 1828,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AdminPanel.tsx",
            lineNumber: 1801,
            columnNumber: 13
          }, this) : (
            // ===================== VIEW B: LOGGED IN WORKSTATION =====================
            /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col md:flex-row overflow-hidden relative z-10 h-full", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-full md:w-56 bg-black/30 border-b md:border-b-0 md:border-r border-white/[0.05] flex md:flex-col gap-1.5 p-3 shrink-0", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "hidden md:block text-[9px] text-gray-500 font-mono tracking-widest uppercase mb-2 p-1.5", children: lang === "ar" ? "أقسام الواجهة" : "WORKSPACE TERMINALS" }, void 0, false, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1879,
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
                        lineNumber: 1893,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "لوحة القيادة" : "DASHBOARD" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1894,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1885,
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
                        lineNumber: 1908,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "أسطول الدراجات" : "MOTORCYCLES" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1909,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1900,
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
                        lineNumber: 1923,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "المتجر الإلكتروني" : "STORE" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1924,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1915,
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
                        lineNumber: 1938,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "المشرفون والأسماء" : "USERS LIST" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1939,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1930,
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
                        lineNumber: 1953,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "إعدادات المعرض" : "SETTINGS" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1954,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1945,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1878,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-4 sm:p-5 text-left relative z-10", children: [
                activeTab === "dashboard" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-5 animate-fade-in", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "border-b border-white/5 pb-3", children: [
                    /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold tracking-widest font-mono", children: lang === "ar" ? "بيانات أداء المعرض" : "HQ COMMAND AND ANALYTICS" }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1966,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-gray-500 normal-case leading-normal font-sans", children: lang === "ar" ? "معلومات عامة متكاملة ومؤشرات أداء المعرض والزوار." : "Real-time telemetry oversight of booking nodes, brand capital flow, and operator statistics." }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1969,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1965,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-3.5", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-brand-accent/20 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "قيمة الأسطول" : "BRAND ASSETS" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1979,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(Coins, { className: "w-4 h-4 text-brand-accent" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1980,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1978,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: [
                          "$",
                          fleetValue.toLocaleString()
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1983,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-green-400 font-sans tracking-widest leading-none", children: "⚡ MILLION VALUE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1984,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1982,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1977,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-brand-primary/20 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "مركبات المعرض" : "FLEET MACHINES" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1991,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(Database, { className: "w-4 h-4 text-brand-primary" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1992,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1990,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: motorcycles.length }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1995,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-brand-accent font-sans tracking-widest leading-none", children: "● ACTIVE BIKES" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 1996,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 1994,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 1989,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-brand-secondary/20 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "المشرفون" : "CURATORS" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2003,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(Users, { className: "w-4 h-4 text-brand-secondary" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2004,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2002,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: users.length }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2007,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-gray-400 font-sans tracking-widest leading-none", children: "👤 CODES/KEYS" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2008,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2006,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2001,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-white/10 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "الحجوزات المعلقة" : "RESERVATIONS" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2015,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(MessageSquare, { className: "w-4 h-4 text-red-500 animate-pulse" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2016,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2014,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: bookings.length }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2019,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-red-400 font-mono tracking-widest leading-none", children: "📱 WHATSAPP" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2020,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2018,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2013,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-indigo-500/15 flex flex-col justify-between hover:border-indigo-400/20 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "مبيعات الموتوسيكلات" : "MOTORS REVENUE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2027,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(TrendingUp, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2028,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2026,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: [
                          motorsTotalSalesValue.toLocaleString(),
                          " ",
                          lang === "ar" ? "ج.م" : "EGP"
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2031,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-indigo-400 font-mono tracking-widest leading-none", children: "🏍️ SALES VALUE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2032,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2030,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2025,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-indigo-500/15 flex flex-col justify-between hover:border-indigo-400/25 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "الدراجات المباعة" : "BIKES SOLD" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2039,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-indigo-300" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2040,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2038,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: motorsTotalSoldCount }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2043,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-indigo-300 font-mono tracking-widest leading-none", children: "🏁 SOLD UNITS" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2044,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2042,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2037,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-emerald-500/20 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "مبيعات المتجر" : "STORE SALES" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2051,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2052,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2050,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: [
                          storeTotalRevenue.toLocaleString(),
                          " ",
                          lang === "ar" ? "ج.م" : "EGP"
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2055,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-emerald-400 font-mono tracking-widest leading-none", children: "🛒 REVENUE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2056,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2054,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2049,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-cyan-500/20 transition-all flex-1 shadow-sm", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-gray-500 font-mono font-bold", children: lang === "ar" ? "القطع المباعة" : "ITEMS SOLD" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2063,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV(Package, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2064,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2062,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "mt-2", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white", children: storeTotalItemsSold.toLocaleString() }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2067,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] mt-0.5 text-cyan-400 font-mono tracking-widest leading-none", children: "📦 PIECES" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2068,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2066,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2061,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 1975,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-4.5 rounded-2xl bg-[#0F1422]/70 border border-indigo-500/10 space-y-3.5", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/5 pb-2", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold tracking-wider", children: lang === "ar" ? "نسب توزيع المركبات عبر الفئات" : "VEHICLE CLASS DISTRIBUTION" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2076,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-[#22D3EE] font-mono", children: "CALIBRATION CAP: 100%" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2077,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2075,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[9px] font-mono text-gray-400 mb-1 leading-none", children: [
                          /* @__PURE__ */ jsxDEV("span", { children: "SPORT CLASS A" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2085,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white", children: [
                            catA_Count,
                            " (",
                            Math.round(catA_Count / (motorcycles.length || 1) * 100),
                            "%)"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2086,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2084,
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
                            lineNumber: 2089,
                            columnNumber: 29
                          },
                          this
                        ) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2088,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2083,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[9px] font-mono text-gray-400 mb-1 leading-none", children: [
                          /* @__PURE__ */ jsxDEV("span", { children: "CRUISER CLASS B" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2101,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white", children: [
                            catB_Count,
                            " (",
                            Math.round(catB_Count / (motorcycles.length || 1) * 100),
                            "%)"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2102,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2100,
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
                            lineNumber: 2105,
                            columnNumber: 29
                          },
                          this
                        ) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2104,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2099,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[9px] font-mono text-gray-400 mb-1 leading-none", children: [
                          /* @__PURE__ */ jsxDEV("span", { children: "ADVENTURE CLASS C" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2117,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white", children: [
                            catC_Count,
                            " (",
                            Math.round(catC_Count / (motorcycles.length || 1) * 100),
                            "%)"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2118,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2116,
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
                            lineNumber: 2121,
                            columnNumber: 29
                          },
                          this
                        ) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2120,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2115,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[9px] font-mono text-gray-400 mb-1 leading-none", children: [
                          /* @__PURE__ */ jsxDEV("span", { children: "SCOOTER CLASS S" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2133,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white", children: [
                            catS_Count,
                            " (",
                            Math.round(catS_Count / (motorcycles.length || 1) * 100),
                            "%)"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2134,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2132,
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
                            lineNumber: 2137,
                            columnNumber: 29
                          },
                          this
                        ) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2136,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2131,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2081,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 2074,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-4.5 rounded-2xl bg-[#0B0F1A]/85 border border-[#6366F1]/15 space-y-3", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/5 pb-2.5", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4.5 h-4.5 text-brand-accent shrink-0 animate-pulse" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2152,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold tracking-wider", children: lang === "ar" ? "طابور رصد اتصالات الحجز" : "ACTIVE CHRONOS SHOWROOM RESERVATIONS" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2153,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2151,
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
                          lineNumber: 2156,
                          columnNumber: 27
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2150,
                      columnNumber: 23
                    }, this),
                    bookings.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-center py-8 text-gray-600 font-mono text-[10px] space-y-1.5 select-none text-transform: lowercase", children: [
                      /* @__PURE__ */ jsxDEV(MessageSquare, { className: "w-8 h-8 text-gray-700 mx-auto opacity-40" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2167,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "tracking-widest uppercase text-gray-500", children: lang === "ar" ? "لا حواسب ولا حجوزات مسجلة بعد" : "NO SPOOLED BOOKINGS RECIEVED" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2168,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-400 normal-case font-sans", children: "Submit a reserve ticket using any Book Now button to populate real leads here." }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2169,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2166,
                      columnNumber: 25
                    }, this) : /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto max-h-[220px] scrollbar-thin", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left border-collapse font-mono text-[10px] sm:text-[11px]", dir, children: [
                      /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "border-b border-white/5 text-gray-500 text-[9px] tracking-widest", children: [
                        /* @__PURE__ */ jsxDEV("th", { className: "pb-2 text-right", children: lang === "ar" ? "العميل" : "CLIENT" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2176,
                          columnNumber: 33
                        }, this),
                        /* @__PURE__ */ jsxDEV("th", { className: "pb-2 text-right", children: lang === "ar" ? "الماكينة" : "MACHINE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2177,
                          columnNumber: 33
                        }, this),
                        /* @__PURE__ */ jsxDEV("th", { className: "pb-2 text-right", children: lang === "ar" ? "الهاتف" : "PHONE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2178,
                          columnNumber: 33
                        }, this),
                        /* @__PURE__ */ jsxDEV("th", { className: "pb-2 text-right", children: lang === "ar" ? "تاريخ الحجز" : "RESERVE DATE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2179,
                          columnNumber: 33
                        }, this),
                        /* @__PURE__ */ jsxDEV("th", { className: "pb-2 text-right", children: lang === "ar" ? "المبيعات / الحالة" : "STATUS / SALE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2180,
                          columnNumber: 33
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2175,
                        columnNumber: 31
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2174,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV("tbody", { children: bookings.map((b) => /* @__PURE__ */ jsxDEV("tr", { className: "border-b border-white/[0.03] hover:bg-white/[0.01] text-gray-300", children: [
                        /* @__PURE__ */ jsxDEV("td", { className: "py-2.5 font-sans font-bold text-white transition-colors", children: [
                          b.name,
                          /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] font-mono text-gray-500 normal-case", children: b.email }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2188,
                            columnNumber: 37
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2186,
                          columnNumber: 35
                        }, this),
                        /* @__PURE__ */ jsxDEV("td", { className: "py-2.5 text-indigo-400 text-right", children: b.motorcycleName }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2190,
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
                                lineNumber: 2198,
                                columnNumber: 39
                              }, this),
                              /* @__PURE__ */ jsxDEV(ArrowUpRight, { className: "w-3 h-3 text-green-400 shrink-0" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2199,
                                columnNumber: 39
                              }, this)
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2192,
                            columnNumber: 37
                          },
                          this
                        ) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2191,
                          columnNumber: 35
                        }, this),
                        /* @__PURE__ */ jsxDEV("td", { className: "py-2.5 text-right font-sans italic text-gray-400", children: b.date }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2202,
                          columnNumber: 35
                        }, this),
                        /* @__PURE__ */ jsxDEV("td", { className: "py-2.5 text-right font-sans", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-end gap-2", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: `px-1.5 py-0.5 rounded text-[8.5px] font-bold ${(b.status || "sold") === "sold" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"}`, children: (b.status || "sold") === "sold" ? lang === "ar" ? "تم البيع" : "SOLD" : lang === "ar" ? "انتظار" : "PENDING" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2205,
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
                              lineNumber: 2215,
                              columnNumber: 39
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2204,
                          columnNumber: 37
                        }, this) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2203,
                          columnNumber: 35
                        }, this)
                      ] }, b.id, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2185,
                        columnNumber: 33
                      }, this)) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2183,
                        columnNumber: 29
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2173,
                      columnNumber: 27
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2172,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 2149,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-4.5 rounded-2xl bg-[#090D16] border border-green-500/10 space-y-4", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/5 pb-3", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "p-1.5 bg-green-500/10 rounded-lg text-green-400", children: /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2236,
                        columnNumber: 29
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2235,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold font-sans tracking-wide text-white", children: lang === "ar" ? "مستخرج التقارير المحاسبية (Excel)" : "COMPREHENSIVE EXCEL EXPORT TERMINAL" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2239,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-500 leading-normal font-mono normal-case", children: lang === "ar" ? "تصدير كامل تفاصيل مبيعات المتجر والحجوزات والمبالغ." : "Compile, filter, and stream ledger accounts for all products and heavy showroom vehicles." }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2242,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2238,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2234,
                      columnNumber: 25
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2233,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-end", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 text-left", dir, children: [
                        /* @__PURE__ */ jsxDEV("label", { className: "block text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider", children: lang === "ar" ? "نطاق استخراج البيانات:" : "SELECT EXPORT PERIOD:" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2252,
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
                                lineNumber: 2260,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("option", { value: "week", children: lang === "ar" ? "آخر أسبوع" : "Last Week" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2261,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("option", { value: "month", children: lang === "ar" ? "آخر شهر" : "Last Month" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2262,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("option", { value: "3months", children: lang === "ar" ? "آخر ٣ أشهر" : "Last 3 Months" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2263,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("option", { value: "6months", children: lang === "ar" ? "آخر ٦ أشهر" : "Last 6 Months" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2264,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("option", { value: "year", children: lang === "ar" ? "آخر سنة كاملة" : "Last 12 Months" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2265,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("option", { value: "custom", children: lang === "ar" ? "تحديد فترة زمينة مخصصة" : "Custom Date Range" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2266,
                                columnNumber: 29
                              }, this)
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2255,
                            columnNumber: 27
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2251,
                        columnNumber: 25
                      }, this),
                      exportRangeType === "custom" && /* @__PURE__ */ jsxDEV(Fragment, { children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 text-left", dir, children: [
                          /* @__PURE__ */ jsxDEV("label", { className: "block text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxDEV(Calendar, { className: "w-3.5 h-3.5 text-blue-400" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2275,
                              columnNumber: 33
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "من تاريخ:" : "START DATE/TIME:" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2276,
                              columnNumber: 33
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2274,
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
                                lineNumber: 2279,
                                columnNumber: 33
                              },
                              this
                            ),
                            /* @__PURE__ */ jsxDEV(Calendar, { className: "absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2285,
                              columnNumber: 33
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2278,
                            columnNumber: 31
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2273,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 text-left", dir, children: [
                          /* @__PURE__ */ jsxDEV("label", { className: "block text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxDEV(Calendar, { className: "w-3.5 h-3.5 text-blue-400" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2291,
                              columnNumber: 33
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "إلى تاريخ:" : "END DATE/TIME:" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2292,
                              columnNumber: 33
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2290,
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
                                lineNumber: 2295,
                                columnNumber: 33
                              },
                              this
                            ),
                            /* @__PURE__ */ jsxDEV(Calendar, { className: "absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2301,
                              columnNumber: 33
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2294,
                            columnNumber: 31
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2289,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2272,
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
                              lineNumber: 2313,
                              columnNumber: 29
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تحميل البيانات بصيغة اكسل 📊" : "Compile & Export Spreadsheet 📊" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2314,
                              columnNumber: 29
                            }, this)
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2309,
                          columnNumber: 27
                        },
                        this
                      ) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2308,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2249,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 2232,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 1964,
                  columnNumber: 19
                }, this),
                activeTab === "motorcycles" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 animate-fade-in", children: !isAddingNew && !editingBike ? (
                  // Grid list displays of active cycles
                  /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/5 pb-3", children: [
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold font-mono tracking-wider", children: lang === "ar" ? `قائمة الأسطول الحالية (${motorcycles.length})` : `FLEET COMPOSITION GRID (${motorcycles.length})` }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2331,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-gray-500 normal-case leading-normal font-sans", children: lang === "ar" ? "تفويض دراجات إلكترونية جديدة، تحديث مقاييس الدفع الحصانية أو التعديل والمسح." : "Review, register, modify specifications, or purge extreme dynamic cycles from Egypt showrooms." }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2334,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2330,
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
                              lineNumber: 2343,
                              columnNumber: 29
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "إضافة آلة" : "COMMISSION NEW BIKE" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2344,
                              columnNumber: 29
                            }, this)
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2339,
                          columnNumber: 27
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2329,
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
                            lineNumber: 2362,
                            columnNumber: 33
                          },
                          this
                        );
                      }) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2351,
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
                            lineNumber: 2380,
                            columnNumber: 29
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV(Search, { className: "absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2387,
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
                            lineNumber: 2389,
                            columnNumber: 31
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2379,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2349,
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
                              lineNumber: 2406,
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
                              lineNumber: 2413,
                              columnNumber: 33
                            }, this),
                            /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-extrabold text-white tracking-wide truncate mt-1", children: bike.name }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2421,
                              columnNumber: 33
                            }, this),
                            /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-brand-accent font-bold text-[11px] mt-0.5", children: bike.price }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2424,
                              columnNumber: 33
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2412,
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
                                  lineNumber: 2433,
                                  columnNumber: 37
                                }, this)
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2428,
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
                                    lineNumber: 2441,
                                    columnNumber: 37
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تعديل" : "UPGRADE" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 2442,
                                    columnNumber: 37
                                  }, this)
                                ]
                              },
                              void 0,
                              true,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2436,
                                columnNumber: 35
                              },
                              this
                            ) : /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] text-gray-600 font-mono italic leading-none text-right", children: "LOCKED NODES" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2445,
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
                                    lineNumber: 2454,
                                    columnNumber: 37
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "شطب" : "DELETE" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 2455,
                                    columnNumber: 37
                                  }, this)
                                ]
                              },
                              void 0,
                              true,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2449,
                                columnNumber: 35
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2427,
                            columnNumber: 31
                          }, this)
                        ]
                      },
                      bike.id,
                      true,
                      {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2402,
                        columnNumber: 29
                      },
                      this
                    )) : /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12 border border-white/5 bg-black/20 rounded-2xl col-span-1 sm:col-span-2 select-none font-mono text-[11px] text-gray-500 w-full", children: lang === "ar" ? "لا توجد مركبات مسجلة في هذا الفئة بعد" : "No commissioned designs in this category segment." }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2462,
                      columnNumber: 29
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2399,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 2328,
                    columnNumber: 23
                  }, this)
                ) : (
                  // Full Commission / Edit form screen
                  /* @__PURE__ */ jsxDEV("form", { onSubmit: handleFormSubmit, className: "space-y-4 max-w-2xl mx-auto text-left", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/5 pb-2", children: [
                      /* @__PURE__ */ jsxDEV("h3", { className: "text-xs font-mono font-bold tracking-widest text-brand-accent uppercase", children: isAddingNew ? lang === "ar" ? "تسجيل مركبة كهرومغناطيسية جديدة" : "COMMISSION NEW CYBER VEHICLE" : `${lang === "ar" ? "تحوير مقاييس" : "RECONFIG MACHINE"}: ${bikeForm.name}` }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2472,
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
                          lineNumber: 2475,
                          columnNumber: 27
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2471,
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
                          lineNumber: 2486,
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
                          lineNumber: 2497,
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
                          lineNumber: 2508,
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
                          lineNumber: 2519,
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
                          lineNumber: 2530,
                          columnNumber: 27
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2485,
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
                            lineNumber: 2550,
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
                              lineNumber: 2551,
                              columnNumber: 33
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2549,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                            lang === "ar" ? "تصنيف الفئة الأفقية" : "SERIES COMPOSITION CLASSIFICATION",
                            ":"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2561,
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
                                  lineNumber: 2567,
                                  columnNumber: 35
                                }, this),
                                /* @__PURE__ */ jsxDEV("option", { value: "B", children: "CRUISER CLASS B (🛋️ Low-Slung Custom)" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2568,
                                  columnNumber: 35
                                }, this),
                                /* @__PURE__ */ jsxDEV("option", { value: "C", children: "ADVENTURE CLASS C (🧭 Offgrid Nomad)" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2569,
                                  columnNumber: 35
                                }, this),
                                /* @__PURE__ */ jsxDEV("option", { value: "S", children: "SCOOTER CLASS S (🔋 Urban Hub)" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 2570,
                                  columnNumber: 35
                                }, this)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2562,
                              columnNumber: 33
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2560,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                            lang === "ar" ? "السيريال/الكود المميز" : "UNIQUE SERIAL/CODE",
                            ":"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2575,
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
                              lineNumber: 2576,
                              columnNumber: 33
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2574,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                            lang === "ar" ? "الشعار السلوكي الفرعي" : "CHASSIS SLOGAN SYNOPSIS",
                            ":"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2586,
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
                              lineNumber: 2587,
                              columnNumber: 33
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2585,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-t border-white/5 pt-3", children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 text-left", children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                              lang === "ar" ? "صورة المركبة هولوجرام" : "REACTIVE IMAGE URL / BASE64 ENCODING",
                              ":"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2597,
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
                                lineNumber: 2598,
                                columnNumber: 35
                              },
                              this
                            ),
                            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("label", { className: "flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-lg cursor-pointer hover:bg-white/10 text-[9px] font-black transition-colors", children: [
                              /* @__PURE__ */ jsxDEV(Upload, { className: "w-3.5 h-3.5 text-brand-accent" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2607,
                                columnNumber: 39
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "رفع ملف صورة مشفرة" : "UPLOAD CHASSIS FILE" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2608,
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
                                  lineNumber: 2609,
                                  columnNumber: 39
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2606,
                              columnNumber: 37
                            }, this) }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2605,
                              columnNumber: 35
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2596,
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
                              lineNumber: 2621,
                              columnNumber: 37
                            },
                            this
                          ) }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2620,
                            columnNumber: 35
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2595,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "col-span-1 sm:col-span-2 border-t border-white/5 pt-3 space-y-2.5 text-left", children: [
                          /* @__PURE__ */ jsxDEV("h4", { className: "text-[10px] text-gray-400 font-black tracking-widest uppercase flex items-center gap-1", children: [
                            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4.5 h-4.5 text-brand-accent animate-pulse" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2633,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "المواصفات الهندسية الدقيقة" : "CORE TELEMETRY AND SPECS MATRIX" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2634,
                              columnNumber: 35
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2632,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-2.5", children: [
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-500 font-bold", children: "1. Propulsion core" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2639,
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
                                  lineNumber: 2640,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2638,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-500 font-bold", children: "2. top velocity" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2649,
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
                                  lineNumber: 2650,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2648,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-500 font-bold", children: "3. output energy" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2659,
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
                                  lineNumber: 2660,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2658,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-500 font-bold", children: "4. consumption rating" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2669,
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
                                  lineNumber: 2670,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2668,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-500 font-bold", children: "5. vehicle net weight" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2679,
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
                                  lineNumber: 2680,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2678,
                              columnNumber: 35
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2636,
                            columnNumber: 33
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2631,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "col-span-1 sm:col-span-2 space-y-1 text-left", children: [
                          /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                            lang === "ar" ? "الوصف المقتضب للبطاقة" : "SHOWROOM GRID OVERVIEW COPY",
                            ":"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2691,
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
                              lineNumber: 2692,
                              columnNumber: 33
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2690,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "col-span-1 sm:col-span-2 space-y-1 text-left", children: [
                          /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                            lang === "ar" ? "البيان الوصفي الهندسي الكامل للPDF" : "HOLOMESH HOLOGRAPHIC HISTORIC SPECTRUM MANIFESTO (LONG DETAILS)",
                            ":"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2701,
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
                              lineNumber: 2702,
                              columnNumber: 33
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2700,
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
                              lineNumber: 2712,
                              columnNumber: 35
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono font-bold text-white uppercase flex items-center gap-1.5 leading-none", children: [
                            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-red-500 shrink-0" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2719,
                              columnNumber: 37
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "ترشيح كعرض مميز وشائع بقوة بالواجهة" : "ANCHOR AND PIN AS AN ACTIVE FLAGSHIP MOTORCYCLE" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2720,
                              columnNumber: 37
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2718,
                            columnNumber: 35
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2711,
                          columnNumber: 33
                        }, this) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2710,
                          columnNumber: 31
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2548,
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
                              lineNumber: 2732,
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
                                lineNumber: 2733,
                                columnNumber: 35
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2731,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                              lang === "ar" ? "نوع الخصم" : "DISCOUNT TYPE",
                              ":"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2743,
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
                                    lineNumber: 2749,
                                    columnNumber: 37
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("option", { value: "fixed", children: lang === "ar" ? "جنيه قيمة ثابتة" : "EGP Fixed Amount" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 2750,
                                    columnNumber: 37
                                  }, this)
                                ]
                              },
                              void 0,
                              true,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2744,
                                columnNumber: 35
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2742,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                              lang === "ar" ? "قيمة الخصم" : "DISCOUNT VALUE",
                              ":"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2755,
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
                                lineNumber: 2756,
                                columnNumber: 35
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2754,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wider", children: [
                              lang === "ar" ? "ملصق العرض الرياضي" : "OFFER PROMO BADGE LABEL",
                              ":"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2766,
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
                                lineNumber: 2767,
                                columnNumber: 35
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2765,
                            columnNumber: 33
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2730,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-brand-primary/10 border border-brand-primary/30 rounded-2xl flex items-center justify-between", children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] text-gray-400 uppercase tracking-wider", children: lang === "ar" ? "السعر النهائي المحسوب وتأثير الخصم" : "CALCULATED RETAIL VALUE AFTER PROMOTIONS" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2780,
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
                              lineNumber: 2781,
                              columnNumber: 35
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2779,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "text-right text-[10px] text-gray-500 max-w-[200px]", dir, children: lang === "ar" ? "يقوم المعالج بحساب السعر لجميع أرجاء المنصة تلقائياً فور كتابة الأرقام" : "Numerical calibrations update showrooms and catalogs instantaneously." }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2796,
                            columnNumber: 33
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2778,
                          columnNumber: 31
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2729,
                        columnNumber: 29
                      }, this),
                      formSubTab === "catalog" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-left font-mono animate-fade-in", dir, children: [
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-gray-400 leading-normal font-sans", dir, children: lang === "ar" ? "مرفقات الكتالوج الرقمية بصيغة PDF تجعل المشتري يتصفح الدليل الفني بلمسة من واجهة المعاينة." : "Introduce digital telemetry guides. Upload high-fidelity PDF documents that attach directly to showroom card flips." }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2806,
                          columnNumber: 31
                        }, this),
                        bikeForm.catalogFileName ? /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-brand-primary/10 border border-brand-primary/35 rounded-2xl space-y-3", children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
                            /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-brand-accent/10 border border-brand-accent/25 rounded-lg text-brand-accent shrink-0", children: /* @__PURE__ */ jsxDEV(FileText, { className: "w-6 h-6 shrink-0" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2814,
                              columnNumber: 39
                            }, this) }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2813,
                              columnNumber: 37
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0", children: [
                              /* @__PURE__ */ jsxDEV("span", { className: "block text-[8px] text-gray-500 uppercase font-bold tracking-widest", children: "ACTIVE CATALOG GUIDE File" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2817,
                                columnNumber: 39
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-black text-white truncate block mt-0.5", children: bikeForm.catalogFileName }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2818,
                                columnNumber: 39
                              }, this)
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2816,
                              columnNumber: 37
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2812,
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
                              lineNumber: 2822,
                              columnNumber: 35
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2811,
                          columnNumber: 33
                        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-2 border-dashed border-white/10 hover:border-brand-accent/40 bg-black/40 rounded-2xl text-center space-y-3.5 transition-all", children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-gray-400", children: /* @__PURE__ */ jsxDEV(Upload, { className: "w-6 h-6 text-gray-500 shrink-0" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2836,
                            columnNumber: 37
                          }, this) }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2835,
                            columnNumber: 35
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] font-bold text-white uppercase", children: lang === "ar" ? "حدد ملف الكتالوج بصيغة PDF" : "NO TELEMETRY CATALOG ATTACHED" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2839,
                              columnNumber: 37
                            }, this),
                            /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-500 lowercase font-sans", children: "pdf file sizes up to 5mb. auto-encodes to base64 buffer matrix." }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2840,
                              columnNumber: 37
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2838,
                            columnNumber: 35
                          }, this),
                          /* @__PURE__ */ jsxDEV("label", { className: "inline-flex items-center gap-1.5 px-4 py-2 bg-brand-accent hover:bg-[#18b5cc] text-[#0B0F1A] font-extrabold rounded-xl cursor-pointer text-[10.5px] uppercase transition-all shadow-md shadow-brand-accent/15", children: [
                            /* @__PURE__ */ jsxDEV(Upload, { className: "w-3.5 h-3.5" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2844,
                              columnNumber: 37
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "رفع الكتالوج الرقمي PDF" : "UPLOAD CATALOG PDF" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2845,
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
                                lineNumber: 2846,
                                columnNumber: 37
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2843,
                            columnNumber: 35
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2834,
                          columnNumber: 33
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2805,
                        columnNumber: 29
                      }, this),
                      formSubTab === "addons" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-left font-mono animate-fade-in", dir, children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-black/50 border border-white/[0.04] rounded-2xl space-y-3", children: [
                          /* @__PURE__ */ jsxDEV("h4", { className: "text-[10px] font-black text-brand-secondary tracking-widest uppercase flex items-center gap-1.5 border-b border-white/5 pb-1.5", children: [
                            /* @__PURE__ */ jsxDEV(Plus, { className: "w-4 h-4 text-brand-secondary shrink-0" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2889,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تعريف ملحق وأكسسوار إضافي جديد" : "INTEGRATE NEW DYNAMIC ADD-ON" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2890,
                              columnNumber: 35
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2888,
                            columnNumber: 33
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: [
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-400 font-bold uppercase", children: "Name (EN):" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2895,
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
                                  lineNumber: 2896,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2894,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-400 font-bold uppercase", children: "Name (AR - Optional):" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2905,
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
                                  lineNumber: 2906,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2904,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-400 font-bold uppercase", children: [
                                lang === "ar" ? "سعر التجزئة (جنيه)" : "Retail Price (EGP)",
                                ":"
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2915,
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
                                  lineNumber: 2916,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2914,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-400 font-bold uppercase", children: "Image Illustration URL:" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2924,
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
                                  lineNumber: 2925,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2923,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 sm:col-span-2", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-400 font-bold uppercase", children: "Description (EN):" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2933,
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
                                  lineNumber: 2934,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2932,
                              columnNumber: 35
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 sm:col-span-2", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[9px] text-gray-400 font-bold uppercase", children: "Description (AR - Optional):" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 2942,
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
                                  lineNumber: 2943,
                                  columnNumber: 37
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2941,
                              columnNumber: 35
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2893,
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
                              lineNumber: 2952,
                              columnNumber: 33
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2887,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
                          /* @__PURE__ */ jsxDEV("h4", { className: "text-[10px] text-gray-500 font-bold uppercase tracking-wider", children: lang === "ar" ? `المرفقات الحالية (${bikeForm.addOns?.length || 0})` : `ATTACHED ACCESSORIES (${bikeForm.addOns?.length || 0})` }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2987,
                            columnNumber: 33
                          }, this),
                          !bikeForm.addOns || bikeForm.addOns.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] text-center text-gray-500 font-sans italic text-[10px]", dir, children: lang === "ar" ? "لا توجد أكسسوارات مخصصة لهذه الدراجة" : "No specialized performance add-ons attached to this chassis yet." }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2992,
                            columnNumber: 35
                          }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 max-h-[220px] overflow-y-auto scrollbar-thin", children: bikeForm.addOns.map((add, idx) => /* @__PURE__ */ jsxDEV("div", { className: "p-2 border border-white/5 bg-black/40 rounded-xl flex items-center gap-3", children: [
                            /* @__PURE__ */ jsxDEV("img", { src: add.image, className: "w-8 h-8 object-cover rounded-lg shrink-0 bg-white/5" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 2999,
                              columnNumber: 41
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0 text-left", children: [
                              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                                /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-black truncate", children: lang === "ar" && add.nameAr ? add.nameAr : add.name }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3002,
                                  columnNumber: 45
                                }, this),
                                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-brand-secondary font-black font-mono", children: [
                                  add.price.toLocaleString(),
                                  " ",
                                  lang === "ar" ? "جنيه" : "EGP"
                                ] }, void 0, true, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3003,
                                  columnNumber: 45
                                }, this)
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3001,
                                columnNumber: 43
                              }, this),
                              /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-400 font-sans truncate", children: lang === "ar" && add.descAr ? add.descAr : add.description }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3005,
                                columnNumber: 43
                              }, this)
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3e3,
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
                                  lineNumber: 3008,
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
                                  lineNumber: 3022,
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
                                  lineNumber: 3036,
                                  columnNumber: 43
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3007,
                              columnNumber: 41
                            }, this)
                          ] }, add.id, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2998,
                            columnNumber: 39
                          }, this)) }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 2996,
                            columnNumber: 35
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 2986,
                          columnNumber: 31
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 2884,
                        columnNumber: 29
                      }, this),
                      formSubTab === "related" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-left font-mono animate-fade-in", dir, children: /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-black/50 border border-white/[0.04] rounded-2xl space-y-4", children: [
                        /* @__PURE__ */ jsxDEV("h4", { className: "text-[10px] font-black text-brand-secondary tracking-widest uppercase mb-2", children: lang === "ar" ? "حدد المنتجات ذات الصلة بالموديل" : "Attach Related Store Products" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3059,
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
                              lineNumber: 3064,
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
                                  lineNumber: 3076,
                                  columnNumber: 37
                                }, this),
                                ["Oils", "Safety", "Smart", "Parts", "Lifestyle"].map((cat) => /* @__PURE__ */ jsxDEV("option", { value: cat, children: cat }, cat, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3078,
                                  columnNumber: 39
                                }, this))
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3071,
                              columnNumber: 35
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3063,
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
                                  lineNumber: 3091,
                                  columnNumber: 41
                                },
                                this
                              ),
                              /* @__PURE__ */ jsxDEV("img", { src: product.image, className: "w-8 h-8 rounded bg-black/50 object-contain p-1" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3119,
                                columnNumber: 41
                              }, this),
                              /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0 pr-2", children: [
                                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-white truncate", children: lang === "ar" ? product.nameAr : product.name }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3121,
                                  columnNumber: 44
                                }, this),
                                /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-gray-400 font-mono tracking-widest", children: [
                                  product.id,
                                  " • ",
                                  product.price,
                                  " EGP"
                                ] }, void 0, true, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3122,
                                  columnNumber: 44
                                }, this)
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3120,
                                columnNumber: 41
                              }, this)
                            ] }, product.id, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3090,
                              columnNumber: 39
                            }, this);
                          }),
                          (!storeProducts || storeProducts.length === 0) && /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-gray-500 italic p-4 text-center", children: "No products in store to link." }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3128,
                            columnNumber: 37
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3083,
                          columnNumber: 33
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3058,
                        columnNumber: 31
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3057,
                        columnNumber: 29
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 2544,
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
                          lineNumber: 3138,
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
                              lineNumber: 3149,
                              columnNumber: 29
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تثبيت الآلة وحفظها" : "AUTHORIZE INVENTORY WRITE" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3150,
                              columnNumber: 29
                            }, this)
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3145,
                          columnNumber: 27
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3137,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 2470,
                    columnNumber: 23
                  }, this)
                ) }, void 0, false, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 2324,
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
                    lineNumber: 3162,
                    columnNumber: 22
                  },
                  this
                ) }, void 0, false, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 3161,
                  columnNumber: 19
                }, this),
                activeTab === "users" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-5 animate-fade-in", dir, children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "border-b border-white/5 pb-2 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold tracking-widest font-mono", children: lang === "ar" ? "مشغلو العقد وجلسات العمل" : "NODE OPERATORS SECURITY DIRECTORY" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3174,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-gray-500 normal-case leading-normal font-sans", children: lang === "ar" ? "إنشاء حسابات جديدة وتعيين مستويات الوصول (مشرف، مدير، مشغل)" : "Authorize secondary credentials, assign access rights, and revoke node keys safely." }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3177,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3173,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 bg-brand-primary/10 border border-brand-primary/20 text-[#22D3EE] font-mono text-[9px] px-2 py-1 rounded", children: [
                      /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3183,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "MASTER SYSOPS SECURITY ACTS v2.26" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3184,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3182,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 3172,
                    columnNumber: 21
                  }, this),
                  sessionUser.role !== "Admin" ? (
                    // Unauthorized overlay for Manager & Staff
                    /* @__PURE__ */ jsxDEV("div", { className: "p-8 text-center border border-red-500/20 bg-red-950/15 rounded-2xl space-y-3 font-mono tracking-wider max-w-md mx-auto my-6 shadow-lg shadow-red-500/5", children: [
                      /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-12 h-12 text-red-500 mx-auto animate-bounce shrink-0" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3191,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("p", { className: "text-red-400 font-black text-xs uppercase", children: lang === "ar" ? "لوائح الأمان: الوصول مرفوض!" : "SECURITY BREACH WARNING: ACCESS DENIED" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3193,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-500 lowercase mt-1 normal-case font-sans", children: lang === "ar" ? "رخص كبار المطورين تتطلب صلاحيات المشرف التام (Admin). مشغلك الحالي محروم من الدخول." : "Curation of Operator Nodes requires Core administrator authorization. Credentials logged." }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3194,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3192,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3190,
                      columnNumber: 23
                    }, this)
                  ) : (
                    // Full User configuration page
                    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-5 font-mono text-xs", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 p-4 border border-white/[0.04] bg-[#111622]/80 rounded-2xl space-y-4 shadow-sm", dir, children: [
                        /* @__PURE__ */ jsxDEV("h4", { className: "text-brand-secondary font-black border-b border-white/5 pb-1.5 tracking-wider uppercase flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxDEV(Plus, { className: "w-4 h-4 text-brand-secondary" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3206,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تفويض مشغل فرعي جديد" : "DELEGATE NEW OPERATOR" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3207,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3205,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("form", { onSubmit: handleAddUserSubmit, className: "space-y-3", children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", dir, children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wide uppercase", children: [
                              lang === "ar" ? "الاسم المعرف" : "NODE USERNAME IDENTITY",
                              ":"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3212,
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
                                lineNumber: 3213,
                                columnNumber: 31
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3211,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", dir, children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wide uppercase", children: [
                              lang === "ar" ? "الرمز المشفر للدخول" : "SECURE DELEGATION CODE",
                              ":"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3224,
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
                                lineNumber: 3225,
                                columnNumber: 31
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3223,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-left", dir, children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-gray-400 text-[10px] tracking-wide uppercase", children: [
                              lang === "ar" ? "رتبة الوصول والشبكة" : "ACCESS SPECTRUM ROLE",
                              ":"
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3236,
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
                                    lineNumber: 3242,
                                    columnNumber: 33
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("option", { value: "Manager", children: lang === "ar" ? "مدير أسطول (Manager)" : "MANAGER NODE (Add & Edit Fleet only)" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 3243,
                                    columnNumber: 33
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("option", { value: "Staff", children: lang === "ar" ? "فريق عمل/مشغل (Staff Operator)" : "Staff Operator (Only Add Motorcycles)" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 3244,
                                    columnNumber: 33
                                  }, this)
                                ]
                              },
                              void 0,
                              true,
                              {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3237,
                                columnNumber: 31
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3235,
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
                                  lineNumber: 3252,
                                  columnNumber: 31
                                }, this),
                                /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تفعيل رمز المشغل" : "DELEGATE NODE" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3253,
                                  columnNumber: 31
                                }, this)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3248,
                              columnNumber: 29
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3210,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3204,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 p-4 border border-white/[0.04] bg-[#0E121E]/90 rounded-2xl space-y-3.5 shadow-sm", children: [
                        /* @__PURE__ */ jsxDEV("h4", { className: "text-brand-accent font-black border-b border-white/5 pb-1.5 tracking-wider uppercase flex items-center justify-between", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxDEV(Users, { className: "w-4 h-4 text-brand-accent" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3262,
                              columnNumber: 31
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "المشرفون المسجلون" : "ONLINE WORKERS REGISTRY" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3263,
                              columnNumber: 31
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3261,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-gray-500", children: [
                            users.length,
                            " active operators"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3265,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3260,
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
                                    lineNumber: 3276,
                                    columnNumber: 37
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("span", { className: `px-1 rounded text-[8px] font-bold ${item.role === "Admin" ? "bg-indigo-950/80 border border-indigo-400/20 text-indigo-400" : item.role === "Manager" ? "bg-purple-950/80 border border-purple-400/20 text-brand-secondary" : "bg-emerald-950/80 border border-emerald-400/20 text-emerald-400"}`, children: item.role.toUpperCase() }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 3277,
                                    columnNumber: 37
                                  }, this)
                                ] }, void 0, true, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3275,
                                  columnNumber: 35
                                }, this),
                                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 mt-1 text-[9px] text-gray-500 leading-none", children: [
                                  /* @__PURE__ */ jsxDEV("span", { children: "KEY:" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 3286,
                                    columnNumber: 37
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-gray-400 tracking-wider", children: "••••••••" }, void 0, false, {
                                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                                    lineNumber: 3287,
                                    columnNumber: 37
                                  }, this)
                                ] }, void 0, true, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3285,
                                  columnNumber: 35
                                }, this)
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3274,
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
                                    lineNumber: 3298,
                                    columnNumber: 37
                                  }, this)
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3292,
                                  columnNumber: 35
                                },
                                this
                              ) : /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] text-gray-600 italic tracking-widest font-black uppercase font-mono", children: "CORE_LOCKED" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3301,
                                columnNumber: 35
                              }, this)
                            ]
                          },
                          item.username,
                          true,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3270,
                            columnNumber: 31
                          },
                          this
                        )) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3268,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3259,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3201,
                      columnNumber: 23
                    }, this)
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 3171,
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
                      lineNumber: 3316,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-4.5 rounded-2xl bg-[#090D16] border border-blue-500/10 space-y-2 mt-4", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/5 pb-3", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "p-1.5 bg-blue-500/10 rounded-lg text-blue-400 font-bold shrink-0", children: /* @__PURE__ */ jsxDEV(Database, { className: "w-4 h-4 animate-pulse" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3331,
                        columnNumber: 29
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3330,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold font-sans tracking-wide text-white", children: lang === "ar" ? "مركز إدارة النسخ الاحتياطي (ZIP)" : "ZIP ARCHIVE BACKUP & RESTORE CONSOLE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3334,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-400 leading-normal font-mono normal-case", children: lang === "ar" ? "تحميل كامل قاعدة بيانات وملفات وعناصر الموقع كملف مضغوط وتنزيله لحمايته قبل القيام بأي تعديلات." : "Compile, archive, and download entire system databases and templates as a ZIP file to local storage." }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3337,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3333,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3329,
                      columnNumber: 25
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3328,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-left", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 bg-[#0B0F1A] border border-white/[0.03] hover:border-blue-500/20 rounded-xl transition-all space-y-3 flex flex-col justify-between", children: [
                        /* @__PURE__ */ jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] uppercase font-bold text-gray-400 font-mono tracking-widest block mb-1", children: lang === "ar" ? "تنزيل نسخة احتياطية" : "GENERATE BACKUP" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3350,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("p", { className: "text-[10.5px] text-gray-500 leading-relaxed font-sans", children: lang === "ar" ? "يقوم هذا الخيار بضغط وحفظ جميع منتجات المتجر، الدراجات، إعدادات المعاينة، الترجمات، والحجوزات الحالية في ملف ZIP مشفر وآمن." : "Package all active fleet cycles, shop products, visual custom texts, and user accounts inside a secured ZIP backup archive." }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3353,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3349,
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
                                lineNumber: 3363,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "تحميل النسخة الاحتياطية (ZIP) 📦" : "Generate & Download ZIP 📦" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3364,
                                columnNumber: 29
                              }, this)
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3359,
                            columnNumber: 27
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3348,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 bg-[#0B0F1A] border border-white/[0.03] hover:border-blue-500/20 rounded-xl transition-all space-y-3 flex flex-col justify-between", children: [
                        /* @__PURE__ */ jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] uppercase font-bold text-gray-400 font-mono tracking-widest block mb-1", children: lang === "ar" ? "استعادة نسخة سابقة" : "RESTORE BACKUP" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3371,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("p", { className: "text-[10.5px] text-gray-500 leading-relaxed font-sans", children: lang === "ar" ? "قم برفع ملف الـ ZIP المضغوط الذي قمت بتنزيله مسبقاً لاسترجاع كامل بيانات الموقع السابقة بلمسة واحدة." : "Upload a previously generated system ZIP backup file. Restores and overwrites state variables immediately." }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3374,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3370,
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
                              lineNumber: 3382,
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
                                  lineNumber: 3398,
                                  columnNumber: 31
                                }, this),
                                /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "رفع واستعادة ملف احتياطي 🔄" : "Upload & Restore ZIP 🔄" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3399,
                                  columnNumber: 31
                                }, this)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3390,
                              columnNumber: 29
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3381,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3369,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3346,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 3327,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-4.5 rounded-2xl bg-[#090D16] border border-white/5 space-y-4 mt-4 text-left", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/5 pb-3", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "p-1.5 bg-white/5 rounded-lg text-white shrink-0", children: /* @__PURE__ */ jsxDEV(Github, { className: "w-4 h-4" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3411,
                        columnNumber: 29
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3410,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold font-sans tracking-wide text-white uppercase", children: lang === "ar" ? "بوابة المزامنة ومستودعات GitHub" : "GITHUB CLOUD SYNCHRONIZATION GATE" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3414,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-gray-400 leading-normal font-mono normal-case", children: lang === "ar" ? "مزامنة وتصدير ملفات وبيانات المعرض مباشرةً لحساب GitHub الخاص بك، أو استعادتها بلمسة واحدة من خلال رابط مباشر." : "Establish direct link with your GitHub repos to commit complete backups, or load snapshot states by link resolved." }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3417,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3413,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3409,
                      columnNumber: 25
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3408,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 p-4 bg-[#0B0F1A] border border-white/[0.03] hover:border-white/10 rounded-xl transition-all", children: [
                        /* @__PURE__ */ jsxDEV("h5", { className: "text-[10.5px] uppercase font-bold text-gray-300 font-mono tracking-wider flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxDEV(Upload, { className: "w-3.5 h-3.5 text-blue-400" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3430,
                            columnNumber: 29
                          }, this),
                          lang === "ar" ? "تصدير وحفظ المستودع (GitHub Export)" : "PUSH DATA TO GITHUB"
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3429,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 text-xs", children: [
                          /* @__PURE__ */ jsxDEV("div", { children: [
                            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-1", children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-gray-400 block font-mono uppercase font-semibold", children: lang === "ar" ? "رمز الوصول الشخصي (GitHub PAT)" : "GitHub Personal Access Token" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3438,
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
                                  lineNumber: 3441,
                                  columnNumber: 33
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3437,
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
                                lineNumber: 3450,
                                columnNumber: 31
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3436,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [
                            /* @__PURE__ */ jsxDEV("div", { children: [
                              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center mb-1", children: [
                                /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-gray-400 block font-mono uppercase font-semibold", children: lang === "ar" ? "مستودع GitHub" : "Repository (owner/repo)" }, void 0, false, {
                                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                                  lineNumber: 3466,
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
                                    lineNumber: 3469,
                                    columnNumber: 35
                                  },
                                  this
                                )
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3465,
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
                                  lineNumber: 3478,
                                  columnNumber: 33
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3464,
                              columnNumber: 31
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { children: [
                              /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-gray-400 block mb-1 font-mono uppercase font-semibold", children: lang === "ar" ? "اسم الملف" : "File Name/Path" }, void 0, false, {
                                fileName: "/app/applet/src/components/AdminPanel.tsx",
                                lineNumber: 3492,
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
                                  lineNumber: 3495,
                                  columnNumber: 33
                                },
                                this
                              )
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3491,
                              columnNumber: 31
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3462,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-gray-400 block mb-1 font-mono uppercase font-semibold", children: lang === "ar" ? "الفرع المستهدف" : "Target Branch" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3510,
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
                                lineNumber: 3513,
                                columnNumber: 31
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3509,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3434,
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
                                lineNumber: 3536,
                                columnNumber: 29
                              }, this),
                              isGithubExporting ? lang === "ar" ? "جاري الفحص والرفع... ⏳" : "COMMITTING SNAPSHOT... ⏳" : lang === "ar" ? "حفظ وتصدير إلى GitHub 🚀" : "PUSH TO GITHUB REPO 🚀"
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3526,
                            columnNumber: 27
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3428,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 p-4 bg-[#0B0F1A] border border-white/[0.03] hover:border-white/10 rounded-xl transition-all flex flex-col justify-between", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsxDEV("h5", { className: "text-[10.5px] uppercase font-bold text-gray-300 font-mono tracking-wider flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxDEV(Link, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3547,
                              columnNumber: 31
                            }, this),
                            lang === "ar" ? "استيراد فوري من رابط ملف خارجي / Gist" : "IMPORT DIRECTLY FROM URL / GIST"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3546,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("p", { className: "text-[10.5px] text-gray-500 leading-relaxed font-sans mt-1", children: lang === "ar" ? "يقوم هذا الخيار بجلب وتنزيل ملف نسخة احتياطية من أي رابط مباشر (رابط خام من GitHub أو Gist أو أي خادم خارجي) وتطبيقه كلحظة استعادة فورية للموقع." : "Restore complete status variables by inputting raw URL pointing to JSON catalog structure (e.g. raw.githubusercontent or raw Gist)." }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3551,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5", children: [
                            /* @__PURE__ */ jsxDEV("label", { className: "text-[10px] text-gray-400 block font-mono uppercase font-semibold", children: lang === "ar" ? "رابط ملف الـ JSON المباشر" : "Direct JSON Backup URL" }, void 0, false, {
                              fileName: "/app/applet/src/components/AdminPanel.tsx",
                              lineNumber: 3558,
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
                                lineNumber: 3561,
                                columnNumber: 31
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3557,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3545,
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
                                lineNumber: 3581,
                                columnNumber: 29
                              }, this),
                              isGithubImporting ? lang === "ar" ? "جاري الاتصال والتحميل... ⏳" : "FETCHING DATA NODES... ⏳" : lang === "ar" ? "استيراد ومزامنة البيانات 🔄" : "FETCH & INTEGRATE DATA 🔄"
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3571,
                            columnNumber: 27
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3544,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3426,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "p-4.5 bg-[#0B0F1A] border border-white/[0.03] hover:border-white/10 rounded-2xl transition-all space-y-3.5 mt-4 text-left", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 border-b border-white/5 pb-2", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "p-1 px-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg", children: /* @__PURE__ */ jsxDEV(Code, { className: "w-3.5 h-3.5" }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3593,
                          columnNumber: 29
                        }, this) }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3592,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { children: [
                          /* @__PURE__ */ jsxDEV("h5", { className: "text-[11px] uppercase font-bold text-gray-200 font-mono tracking-wider", children: lang === "ar" ? "رفع كود المصدر والمشروع بالكامل للربط بـ Vercel" : "PUSH ENTIRE REACT CODEBASE FOR VERCEL DEPLOYMENT" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3596,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] text-gray-550 font-mono italic", children: lang === "ar" ? "قم برفع جميع ملفات التطبيق والمشاريع للاتصال بفركل مباشرة" : "Push complete workspace structure to deploy on Vercel or Netlify dynamically" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3599,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3595,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3591,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-[10.5px] text-gray-400 leading-relaxed font-sans", children: lang === "ar" ? 'هذا القسم يتيح لك تصدير "كامل الكود البرمجي للموقع" مع جميع الإعدادات ولحظات المعرض والصور الثنائية مباشرة إلى مستودع GitHub الخاص بك. بعد إتمام الرفع، يمكنك الدخول لحساب Vercel وربط المستودع، وسيتم إطلاق موقعك الخاص فوراً وبشكل مستقل تماماً ودائم مجاناً!' : "This module fetches every single active component, translation layout, package module, assets folder, and binary picture, then processes them as a single tree commit on GitHub. Easily hook this repository into Vercel or Netlify to compile and deliver your custom storefront instantly!" }, void 0, false, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3605,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#070A11] rounded-xl border border-white/5 font-mono", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-[10px] text-gray-400", children: [
                          /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "المستودع الهدف:" : "TARGET REPOSITORY:" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3613,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold tracking-wide", children: githubRepo || (lang === "ar" ? "لم يحدد" : "Not specified") }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3614,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3612,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-[10px] text-gray-400", children: [
                          /* @__PURE__ */ jsxDEV("span", { children: lang === "ar" ? "الفرع المستهدف:" : "TARGET BRANCH:" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3617,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-blue-400 font-bold tracking-wide", children: githubBranch || "main" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3618,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3616,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3611,
                        columnNumber: 25
                      }, this),
                      isPushingProject && /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-indigo-950/20 border border-indigo-500/15 rounded-xl space-y-2 text-center", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 justify-center", children: [
                          /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-3.5 h-3.5 text-indigo-400 animate-spin" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3625,
                            columnNumber: 31
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-[10.5px] font-mono text-indigo-300 font-bold uppercase tracking-widest", children: lang === "ar" ? "جاري تجهيز وتصدير المشروع... ⏳" : "PUSHING SYSTEM FILES... ⏳" }, void 0, false, {
                            fileName: "/app/applet/src/components/AdminPanel.tsx",
                            lineNumber: 3626,
                            columnNumber: 31
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3624,
                          columnNumber: 29
                        }, this),
                        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] font-mono text-gray-400 leading-relaxed", children: projectPushStep }, void 0, false, {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3630,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/AdminPanel.tsx",
                        lineNumber: 3623,
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
                              lineNumber: 3646,
                              columnNumber: 27
                            }, this),
                            isPushingProject ? lang === "ar" ? "جاري الرفع... 🚀" : "EXECUTING ATOMIC COMMIT... 🚀" : lang === "ar" ? "إطلاق ورفع كود الموقع بالكامل إلى GitHub 🚀💻" : "PUSH FULL REACTION ENGINE TO GITHUB 🚀💻"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AdminPanel.tsx",
                          lineNumber: 3636,
                          columnNumber: 25
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AdminPanel.tsx",
                      lineNumber: 3590,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/AdminPanel.tsx",
                    lineNumber: 3407,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/AdminPanel.tsx",
                  lineNumber: 3315,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AdminPanel.tsx",
                lineNumber: 1960,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AdminPanel.tsx",
              lineNumber: 1875,
              columnNumber: 13
            }, this)
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/AdminPanel.tsx",
            lineNumber: 1797,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/AdminPanel.tsx",
        lineNumber: 1747,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/AdminPanel.tsx",
    lineNumber: 1720,
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFkbWluUGFuZWwudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBcbiAgWCwgTG9jaywgS2V5LCBTaGllbGRDaGVjaywgRGF0YWJhc2UsIFVwbG9hZCwgRXllLCBFeWVPZmYsIEZpbGVUZXh0LCBQbHVzLCBUcmFzaDIsIFxuICBFZGl0MiwgQ2hlY2ssIFNwYXJrbGVzLCBGb2xkZXJPcGVuLCBVc2VycywgU2V0dGluZ3MsIEFsZXJ0Q2lyY2xlLCBUcmVuZGluZ1VwLCBcbiAgQ29pbnMsIEFjdGl2aXR5LCBDYWxlbmRhciwgTWVzc2FnZVNxdWFyZSwgQXJyb3dVcFJpZ2h0LCBDaGVja0NpcmNsZTIsXG4gIFRyYXNoLCBMb2dPdXQsIFNoaWVsZEFsZXJ0LCBTaG9wcGluZ0JhZywgUGFja2FnZSwgRG93bmxvYWQsIFNlYXJjaCwgR2l0aHViLCBMaW5rLCBSZWZyZXNoQ3csIENvZGVcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IE1vdG9yY3ljbGUsIENhdGVnb3J5U2x1ZywgVXNlclJvbGUsIFVzZXJBY2NvdW50LCBBZGRPbiwgSG9tZXBhZ2VDb25maWcsIFN0b3JlUHJvZHVjdCwgU3RvcmVDYXRlZ29yeSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHVzZUxhbmd1YWdlIH0gZnJvbSAnLi4vY29udGV4dC9MYW5ndWFnZUNvbnRleHQnO1xuaW1wb3J0IHsgREVGQVVMVF9IT01FUEFHRV9DT05GSUcgfSBmcm9tICcuLi9kYXRhJztcbmltcG9ydCBIb21lcGFnZVBhZ2VCdWlsZGVyIGZyb20gJy4vSG9tZXBhZ2VQYWdlQnVpbGRlcic7XG5pbXBvcnQgU3RvcmVBZG1pblBhbmVsIGZyb20gJy4vU3RvcmVBZG1pblBhbmVsJztcbmltcG9ydCB7IGRiIH0gZnJvbSAnLi4vbGliL2ZpcmViYXNlJztcbmltcG9ydCB7IGNvbGxlY3Rpb24sIGRvYywgc2V0RG9jLCBkZWxldGVEb2MsIGdldERvY3MgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xuaW1wb3J0ICogYXMgWExTWCBmcm9tICd4bHN4JztcbmltcG9ydCB7IFFSQ29kZVNWRyB9IGZyb20gJ3FyY29kZS5yZWFjdCc7XG5pbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnO1xuXG5pbnRlcmZhY2UgQWRtaW5QYW5lbFByb3BzIHtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgbW90b3JjeWNsZXM6IE1vdG9yY3ljbGVbXTtcbiAgb25VcGRhdGVNb3RvcmN5Y2xlczogKHVwZGF0ZWRCaWtlczogTW90b3JjeWNsZVtdKSA9PiB2b2lkO1xuICBzdG9yZVByb2R1Y3RzPzogU3RvcmVQcm9kdWN0W107XG4gIG9uVXBkYXRlU3RvcmVQcm9kdWN0cz86ICh1cGRhdGVkOiBTdG9yZVByb2R1Y3RbXSkgPT4gdm9pZDtcbiAgY3VzdG9tVGV4dDogYW55O1xuICBvblVwZGF0ZUN1c3RvbVRleHQ6ICh0ZXh0OiBhbnkpID0+IHZvaWQ7XG4gIGhvbWVwYWdlQ29uZmlnPzogSG9tZXBhZ2VDb25maWc7XG4gIG9uVXBkYXRlSG9tZXBhZ2VDb25maWc/OiAoY29uZmlnOiBIb21lcGFnZUNvbmZpZykgPT4gdm9pZDtcbn1cblxuaW50ZXJmYWNlIFRvYXN0TWVzc2FnZSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgdHlwZTogJ3N1Y2Nlc3MnIHwgJ2Vycm9yJyB8ICdpbmZvJztcbn1cblxuY29uc3QgREVGQVVMVF9VU0VSUzogVXNlckFjY291bnRbXSA9IFtcbiAgeyB1c2VybmFtZTogJ0hPU05ZMTk5NScsIHBhc3N3b3JkOiAnSGhybTAxMDE5OTVFTGVsa2hvbHknLCByb2xlOiAnQWRtaW4nIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFkbWluUGFuZWwoe1xuICBvbkNsb3NlLFxuICBtb3RvcmN5Y2xlcyxcbiAgb25VcGRhdGVNb3RvcmN5Y2xlcyxcbiAgc3RvcmVQcm9kdWN0cyA9IFtdLFxuICBvblVwZGF0ZVN0b3JlUHJvZHVjdHMsXG4gIGN1c3RvbVRleHQsXG4gIG9uVXBkYXRlQ3VzdG9tVGV4dCxcbiAgaG9tZXBhZ2VDb25maWcgPSBERUZBVUxUX0hPTUVQQUdFX0NPTkZJRyxcbiAgb25VcGRhdGVIb21lcGFnZUNvbmZpZyxcbn06IEFkbWluUGFuZWxQcm9wcykge1xuICBjb25zdCB7IGxhbmcsIGRpciwgdCB9ID0gdXNlTGFuZ3VhZ2UoKTtcblxuICAvLyBBdXRoZW50aWNhdGlvbiAmIENvcmUgU2Vzc2lvbiBTdGF0ZVxuICBjb25zdCBbc2Vzc2lvblVzZXIsIHNldFNlc3Npb25Vc2VyXSA9IHVzZVN0YXRlPFVzZXJBY2NvdW50IHwgbnVsbD4oKCkgPT4ge1xuICAgIGNvbnN0IHNhdmVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Vsa2hvbHlfc2Vzc2lvbl91c2VyJyk7XG4gICAgcmV0dXJuIHNhdmVkID8gSlNPTi5wYXJzZShzYXZlZCkgOiBudWxsO1xuICB9KTtcblxuICBjb25zdCBbdXNlcm5hbWVJbnB1dCwgc2V0VXNlcm5hbWVJbnB1dF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtwYXNzd29yZElucHV0LCBzZXRQYXNzd29yZElucHV0XSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3Nob3dQYXNzd29yZCwgc2V0U2hvd1Bhc3N3b3JkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBVc2VyIEFjY291bnRzIFN0YXRlIChwZXJzaXN0ZWQgaW5zaWRlIGxvY2FsU3RvcmFnZSlcbiAgY29uc3QgW3VzZXJzLCBzZXRVc2Vyc10gPSB1c2VTdGF0ZTxVc2VyQWNjb3VudFtdPigoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZWxraG9seV91c2VycycpO1xuICAgIGlmIChzYXZlZCkgcmV0dXJuIEpTT04ucGFyc2Uoc2F2ZWQpO1xuICAgIC8vIFBlcnNpc3QgZGVmYXVsdHMgb24gZmlyc3QgcnVuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfdXNlcnMnLCBKU09OLnN0cmluZ2lmeShERUZBVUxUX1VTRVJTKSk7XG4gICAgcmV0dXJuIERFRkFVTFRfVVNFUlM7XG4gIH0pO1xuXG4gIC8vIFNpZGViYXIgbmF2aWdhdGlvbiBwYW5lbDogJ2Rhc2hib2FyZCcgfCAnbW90b3JjeWNsZXMnIHwgJ3N0b3JlJyB8ICd1c2VycycgfCAnc2V0dGluZ3MnIHwgJ2hvbWVfZWRpdG9yJ1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGU8J2Rhc2hib2FyZCcgfCAnbW90b3JjeWNsZXMnIHwgJ3N0b3JlJyB8ICd1c2VycycgfCAnc2V0dGluZ3MnIHwgJ2hvbWVfZWRpdG9yJz4oJ2Rhc2hib2FyZCcpO1xuXG4gIGNvbnN0IGNhbkFjY2VzcyA9ICh0YWI6IHN0cmluZykgPT4ge1xuICAgIGlmIChzZXNzaW9uVXNlcj8ucm9sZSA9PT0gJ0FkbWluJykgcmV0dXJuIHRydWU7XG4gICAgaWYgKHNlc3Npb25Vc2VyPy5yb2xlID09PSAnTWFuYWdlcicpIHJldHVybiBbJ2Rhc2hib2FyZCcsICdtb3RvcmN5Y2xlcycsICdzdG9yZSddLmluY2x1ZGVzKHRhYik7XG4gICAgaWYgKHNlc3Npb25Vc2VyPy5yb2xlID09PSAnU3RhZmYnKSByZXR1cm4gWydtb3RvcmN5Y2xlcycsICdzdG9yZSddLmluY2x1ZGVzKHRhYik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8vIEVuc3VyZSBhY3RpdmUgbm9kZSByb2xlIGlzIGFwcHJvcHJpYXRlIGFmdGVyIHNlc3Npb24gbG9hZCBpZiB1c2VyIGlzIHJlc3RyaWN0ZWRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoc2Vzc2lvblVzZXIgJiYgIWNhbkFjY2VzcyhhY3RpdmVUYWIpKSB7XG4gICAgICBpZiAoc2Vzc2lvblVzZXIucm9sZSA9PT0gJ01hbmFnZXInKSBzZXRBY3RpdmVUYWIoJ2Rhc2hib2FyZCcpO1xuICAgICAgZWxzZSBzZXRBY3RpdmVUYWIoJ21vdG9yY3ljbGVzJyk7XG4gICAgfVxuICB9LCBbc2Vzc2lvblVzZXIsIGFjdGl2ZVRhYl0pO1xuXG4gIC8vIEJvb2tpbmdzIHF1ZXVlIHN0YXRlXG4gIGNvbnN0IFtib29raW5ncywgc2V0Qm9va2luZ3NdID0gdXNlU3RhdGU8YW55W10+KCgpID0+IHtcbiAgICBjb25zdCBzYXZlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbGtob2x5X2Jvb2tpbmdzJyk7XG4gICAgcmV0dXJuIHNhdmVkID8gSlNPTi5wYXJzZShzYXZlZCkgOiBbXTtcbiAgfSk7XG5cbiAgLy8gVG9hc3RzIGxpc3Qgc3RhdGVcbiAgY29uc3QgW3RvYXN0cywgc2V0VG9hc3RzXSA9IHVzZVN0YXRlPFRvYXN0TWVzc2FnZVtdPihbXSk7XG5cbiAgLy8gR2l0SHViIEludGVncmF0aW9uIFN0YXRlc1xuICBjb25zdCBbZ2l0aHViVG9rZW4sIHNldEdpdGh1YlRva2VuXSA9IHVzZVN0YXRlKCgpID0+IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbGtob2x5X2dpdGh1Yl90b2tlbicpIHx8ICcnKTtcbiAgY29uc3QgW2dpdGh1YlJlcG8sIHNldEdpdGh1YlJlcG9dID0gdXNlU3RhdGUoKCkgPT4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Vsa2hvbHlfZ2l0aHViX3JlcG8nKSB8fCAnJyk7XG4gIGNvbnN0IFtnaXRodWJCcmFuY2gsIHNldEdpdGh1YkJyYW5jaF0gPSB1c2VTdGF0ZSgoKSA9PiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZWxraG9seV9naXRodWJfYnJhbmNoJykgfHwgJ21haW4nKTtcbiAgY29uc3QgW2dpdGh1YlBhdGgsIHNldEdpdGh1YlBhdGhdID0gdXNlU3RhdGUoKCkgPT4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Vsa2hvbHlfZ2l0aHViX3BhdGgnKSB8fCAnZWxraG9seV9iYWNrdXAuanNvbicpO1xuICBjb25zdCBbZ2l0aHViSW1wb3J0VXJsLCBzZXRHaXRodWJJbXBvcnRVcmxdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbaXNHaXRodWJFeHBvcnRpbmcsIHNldElzR2l0aHViRXhwb3J0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzR2l0aHViSW1wb3J0aW5nLCBzZXRJc0dpdGh1YkltcG9ydGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc1B1c2hpbmdQcm9qZWN0LCBzZXRJc1B1c2hpbmdQcm9qZWN0XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Byb2plY3RQdXNoU3RlcCwgc2V0UHJvamVjdFB1c2hTdGVwXSA9IHVzZVN0YXRlKCcnKTtcblxuICAvLyBEYXNoYm9hcmQgY2F0ZWdvcnkgZmlsdGVyXG4gIGNvbnN0IFtkYXNoQ2F0ZWdvcnlGaWx0ZXIsIHNldERhc2hDYXRlZ29yeUZpbHRlcl0gPSB1c2VTdGF0ZTwnQWxsJyB8ICdBJyB8ICdCJyB8ICdDJyB8ICdTJz4oJ0FsbCcpO1xuICAvLyBEYXNoYm9hcmQgbW90b3JjeWNsZSBzZWFyY2ggdGVybVxuICBjb25zdCBbYmlrZVNlYXJjaFRlcm0sIHNldEJpa2VTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKCcnKTtcblxuICAvLyBNdWx0aS10YWIgc3ViLWxheW91dCBzdGF0ZSBmb3IgRWRpdC9BZGQgZm9ybXNcbiAgY29uc3QgW2Zvcm1TdWJUYWIsIHNldEZvcm1TdWJUYWJdID0gdXNlU3RhdGU8J2Jhc2ljJyB8ICdwcmljaW5nJyB8ICdjYXRhbG9nJyB8ICdhZGRvbnMnIHwgJ3JlbGF0ZWQnPignYmFzaWMnKTtcblxuICAvLyBOZXcgYWNjZXNzb3J5IGNyZWF0aW9uIHRlbXAgc3RhdGVcbiAgY29uc3QgW25ld0FkZE9uLCBzZXROZXdBZGRPbl0gPSB1c2VTdGF0ZTxBZGRPbj4oe1xuICAgIGlkOiAnJyxcbiAgICBuYW1lOiAnJyxcbiAgICBuYW1lQXI6ICcnLFxuICAgIGltYWdlOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NTg5ODE4MDYtZWM1MjdmYTg0YzM5P2F1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAmdz0xNTAnLFxuICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICBkZXNjQXI6ICcnLFxuICAgIHByaWNlOiAwXG4gIH0pO1xuXG4gIC8vIEJpa2UgRm9ybSBTdGF0ZXNcbiAgY29uc3QgW2VkaXRpbmdCaWtlLCBzZXRFZGl0aW5nQmlrZV0gPSB1c2VTdGF0ZTxNb3RvcmN5Y2xlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc0FkZGluZ05ldywgc2V0SXNBZGRpbmdOZXddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYmlrZUZvcm0sIHNldEJpa2VGb3JtXSA9IHVzZVN0YXRlKHtcbiAgICBpZDogJycsXG4gICAgbmFtZTogJycsXG4gICAgY2F0ZWdvcnk6ICdBJyBhcyBDYXRlZ29yeVNsdWcsXG4gICAgY2F0ZWdvcnlOYW1lOiAnU3BvcnQnLFxuICAgIHByaWNlOiAnJDQ1LDAwMCcsXG4gICAgcHJpY2VOdW06IDQ1MDAwLFxuICAgIGltYWdlOiAnJyxcbiAgICB0YWdsaW5lOiAnUmlkZSB0aGUgRnV0dXJlJyxcbiAgICBzaG9ydERlc2M6ICcnLFxuICAgIGxvbmdEZXNjOiAnJyxcbiAgICBpc1BvcHVsYXI6IGZhbHNlLFxuICAgIHNwZWNzOiB7XG4gICAgICBlbmdpbmU6ICcxMjAwY2MgU29saWQtU3RhdGUgSHViJyxcbiAgICAgIHRvcFNwZWVkOiAnMzIwIGttL2gnLFxuICAgICAgZnVlbENvbnN1bXB0aW9uOiAnMC4wIEwvMTAwa20nLFxuICAgICAgcG93ZXI6ICcxOTAgaHAnLFxuICAgICAgd2VpZ2h0OiAnMTcwIGtnJ1xuICAgIH0sXG4gICAgaXNDdXN0b206IHRydWUsXG4gICAgY2F0YWxvZ0ZpbGVOYW1lOiAnJyxcbiAgICBjYXRhbG9nRmlsZUNvbnRlbnQ6ICcnLFxuICAgIG9yaWdpbmFsUHJpY2U6IDQ1MDAwIGFzIG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBkaXNjb3VudDogMCBhcyBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgZGlzY291bnRUeXBlOiAncGVyY2VudGFnZScgYXMgJ3BlcmNlbnRhZ2UnIHwgJ2ZpeGVkJyxcbiAgICBvZmZlckxhYmVsOiAnJyxcbiAgICBhZGRPbnM6IFtdIGFzIEFkZE9uW10sXG4gICAgc2VyaWFsQ29kZTogJycsXG4gIH0pO1xuXG4gIGNvbnN0IFtzZWFyY2hUZXJtLCBzZXRTZWFyY2hUZXJtXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3NlbGVjdGVkQ2F0ZWdvcnksIHNldFNlbGVjdGVkQ2F0ZWdvcnldID0gdXNlU3RhdGU8U3RvcmVDYXRlZ29yeSB8ICdBTEwnPignQUxMJyk7XG5cbiAgLy8gVXNlcnMgY3JlYXRpb24gc3RhdGVcbiAgY29uc3QgW25ld1VzZXJuYW1lLCBzZXROZXdVc2VybmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtuZXdQYXNzd29yZCwgc2V0TmV3UGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbbmV3Um9sZSwgc2V0TmV3Um9sZV0gPSB1c2VTdGF0ZTxVc2VyUm9sZT4oJ1N0YWZmJyk7XG5cbiAgLy8gSG9tZSBkZXRhaWxzIHRleHQgZm9ybVxuICBjb25zdCBbdGV4dEZvcm0sIHNldFRleHRGb3JtXSA9IHVzZVN0YXRlKHtcbiAgICBhclRpdGxlOiBjdXN0b21UZXh0Py5hclRpdGxlIHx8ICfYp9mE2K7ZiNmE2YonLFxuICAgIGFyVGl0bGVBY2NlbnQ6IGN1c3RvbVRleHQ/LmFyVGl0bGVBY2NlbnQgfHwgJ9mF2YjYqtmI2LHYsicsXG4gICAgZW5UaXRsZTogY3VzdG9tVGV4dD8uZW5UaXRsZSB8fCAnRUxLSE9MWScsXG4gICAgZW5UaXRsZUFjY2VudDogY3VzdG9tVGV4dD8uZW5UaXRsZUFjY2VudCB8fCAnTU9UT1JTJyxcbiAgICBhclNsb2dhbjogY3VzdG9tVGV4dD8uYXJTbG9nYW4gfHwgJ9iz2KfYqNmCINmF2Lkg2KfZhNmF2LPYqtmC2KjZhCcsXG4gICAgZW5TbG9nYW46IGN1c3RvbVRleHQ/LmVuU2xvZ2FuIHx8ICdSaWRlIHRoZSBGdXR1cmUnLFxuICAgIGFySGVyb0Rlc2M6IGN1c3RvbVRleHQ/LmFySGVyb0Rlc2MgfHwgJ9in2YbYttmFINil2YTZiSDYudin2YTZhSDYp9mE2LrYry4g2KrZgtiv2YUg2KfZhNiu2YjZhNmKINmF2YjYqtmI2LHYsiDYo9mC2YjZiSDYp9mE2YXZiNiq2YjYs9mK2YPZhNin2Kog2YjYp9mE2KfYs9mD2YjYqtix2KfYqiDZgdin2KbZgtipINin2YTYo9iv2KfYoSDZhNmE2YXYs9iq2YLYqNmELiDYp9iz2KrZg9i02YEg2YPYqtin2YTZiNis2KfYqtmG2KfYjCDZiNin2YLYsdijINin2YTZhdmI2KfYtdmB2KfYqiDZiNin2K3YrNiyINix2K3ZhNiq2YMg2YXYqNin2LTYsdipLicsXG4gICAgZW5IZXJvRGVzYzogY3VzdG9tVGV4dD8uZW5IZXJvRGVzYyB8fCAnU3RlcCBpbnNpZGUgdGhlIHZpcnR1YWwgZ3JpZC4gRWxLaG9seSBNb3RvcnMgaW50cm9kdWNlcyBleHRyZW1lLW91dHB1dCBzb2xpZC1zdGF0ZSBwZXJmb3JtYW5jZSBiaWtlcywgcGxhc21hIHRvdXJpbmcgYWR2ZW50dXJlcnMsIGFuZCBoaWdoLWZpZGVsaXR5IHNtYXJ0IHVyYmFuIHNjb290ZXJzIGRlc2lnbmVkIGluIDIwMjYuIEV4cGxvcmUgb3VyIGNhdGFsb2csIHJldmlldyBibHVlcHJpbnRzLCBhbmQgYm9vayBhIHNlY3VyZSByaWRlIGRpcmVjdGx5LicsXG4gICAgYXJCYWRnZTogY3VzdG9tVGV4dD8uYXJCYWRnZSB8fCAn2KPZiNmEINmF2LnYsdi2INmD2KjYp9ixINin2YTYtNiu2LXZitin2Kog2KjZhdi12LEnLFxuICAgIGVuQmFkZ2U6IGN1c3RvbVRleHQ/LmVuQmFkZ2UgfHwgXCJFR1lQVCdTIEZJUlNUIENIUk9OT1MgU0hPV1JPT01cIixcbiAgfSk7XG5cbiAgLy8gRHluYW1pYyBwYWdlIGJ1aWxkZXIgc3RhdGUgbWFuYWdlbWVudFxuICBjb25zdCBbYnVpbGRlckNvbmZpZywgc2V0QnVpbGRlckNvbmZpZ10gPSB1c2VTdGF0ZTxIb21lcGFnZUNvbmZpZz4oaG9tZXBhZ2VDb25maWcpO1xuICBjb25zdCBbaGlzdG9yeSwgc2V0SGlzdG9yeV0gPSB1c2VTdGF0ZTxIb21lcGFnZUNvbmZpZ1tdPihbaG9tZXBhZ2VDb25maWddKTtcbiAgY29uc3QgW2hpc3RvcnlJbmRleCwgc2V0SGlzdG9yeUluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbdGVtcGxhdGVzLCBzZXRUZW1wbGF0ZXNdID0gdXNlU3RhdGU8e25hbWU6IHN0cmluZywgY29uZmlnOiBIb21lcGFnZUNvbmZpZ31bXT4oKCkgPT4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbGtob2x5X3RlbXBsYXRlcycpO1xuICAgIHJldHVybiBsb2FkZWQgPyBKU09OLnBhcnNlKGxvYWRlZCkgOiBbXTtcbiAgfSk7XG4gIGNvbnN0IFtuZXdUZW1wbGF0ZU5hbWUsIHNldE5ld1RlbXBsYXRlTmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFthY3RpdmVCdWlsZGVyVGFiLCBzZXRBY3RpdmVCdWlsZGVyVGFiXSA9IHVzZVN0YXRlPCdmb250cycgfCAndGhlbWUnIHwgJ2hlYWRlcicgfCAnbWFpbicgfCAnZm9vdGVyJyB8ICd0ZW1wbGF0ZXMnPignaGVhZGVyJyk7XG5cbiAgLy8gU3luYyBzdGF0ZSBpZiBvdXR3YXJkIHByb3AgY2hhbmdlc1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChob21lcGFnZUNvbmZpZykge1xuICAgICAgc2V0QnVpbGRlckNvbmZpZyhob21lcGFnZUNvbmZpZyk7XG4gICAgfVxuICB9LCBbaG9tZXBhZ2VDb25maWddKTtcblxuICAvLyBNdWx0aS1zdGF0ZSBjb25maWd1cmF0aW9uIHVwZGF0ZSBoZWxwZXJcbiAgY29uc3QgdXBkYXRlQnVpbGRlckNvbmZpZyA9IChuZXdDb25maWc6IEhvbWVwYWdlQ29uZmlnKSA9PiB7XG4gICAgY29uc3QgbmV4dEhpc3RvcnkgPSBoaXN0b3J5LnNsaWNlKDAsIGhpc3RvcnlJbmRleCArIDEpO1xuICAgIG5leHRIaXN0b3J5LnB1c2gobmV3Q29uZmlnKTtcbiAgICBzZXRIaXN0b3J5KG5leHRIaXN0b3J5KTtcbiAgICBzZXRIaXN0b3J5SW5kZXgobmV4dEhpc3RvcnkubGVuZ3RoIC0gMSk7XG4gICAgc2V0QnVpbGRlckNvbmZpZyhuZXdDb25maWcpO1xuICAgIGlmIChvblVwZGF0ZUhvbWVwYWdlQ29uZmlnKSB7XG4gICAgICBvblVwZGF0ZUhvbWVwYWdlQ29uZmlnKG5ld0NvbmZpZyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVVuZG8gPSAoKSA9PiB7XG4gICAgaWYgKGhpc3RvcnlJbmRleCA+IDApIHtcbiAgICAgIGNvbnN0IHByZXZJbmRleCA9IGhpc3RvcnlJbmRleCAtIDE7XG4gICAgICBzZXRIaXN0b3J5SW5kZXgocHJldkluZGV4KTtcbiAgICAgIHNldEJ1aWxkZXJDb25maWcoaGlzdG9yeVtwcmV2SW5kZXhdKTtcbiAgICAgIGlmIChvblVwZGF0ZUhvbWVwYWdlQ29uZmlnKSB7XG4gICAgICAgIG9uVXBkYXRlSG9tZXBhZ2VDb25maWcoaGlzdG9yeVtwcmV2SW5kZXhdKTtcbiAgICAgIH1cbiAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YUg2KfZhNiq2LHYp9is2Lkg2LnZhiDYp9mE2KrYudiv2YrZhCcgOiAnRGVzaWduIHVuZG9uZSBzdWNjZXNzZnVsbHknLCAnaW5mbycpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZWRvID0gKCkgPT4ge1xuICAgIGlmIChoaXN0b3J5SW5kZXggPCBoaXN0b3J5Lmxlbmd0aCAtIDEpIHtcbiAgICAgIGNvbnN0IG5leHRJbmRleCA9IGhpc3RvcnlJbmRleCArIDE7XG4gICAgICBzZXRIaXN0b3J5SW5kZXgobmV4dEluZGV4KTtcbiAgICAgIHNldEJ1aWxkZXJDb25maWcoaGlzdG9yeVtuZXh0SW5kZXhdKTtcbiAgICAgIGlmIChvblVwZGF0ZUhvbWVwYWdlQ29uZmlnKSB7XG4gICAgICAgIG9uVXBkYXRlSG9tZXBhZ2VDb25maWcoaGlzdG9yeVtuZXh0SW5kZXhdKTtcbiAgICAgIH1cbiAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YXYqiDYpdi52KfYr9ipINiq2LfYqNmK2YIg2KfZhNiq2LnYr9mK2YQnIDogJ0Rlc2lnbiByZWRvbmUgc3VjY2Vzc2Z1bGx5JywgJ2luZm8nKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2F2ZVRlbXBsYXRlID0gKCkgPT4ge1xuICAgIGlmICghbmV3VGVtcGxhdGVOYW1lLnRyaW0oKSkge1xuICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2YrYsdis2Ykg2KXYr9iu2KfZhCDYp9iz2YUg2KfZhNmC2KfZhNioINij2YjZhNin2YsnIDogJ1RlbXBsYXRlIG5hbWUgY2Fubm90IGJlIGVtcHR5JywgJ2Vycm9yJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHVwZGF0ZWQgPSBbLi4udGVtcGxhdGVzLCB7IG5hbWU6IG5ld1RlbXBsYXRlTmFtZS50cmltKCksIGNvbmZpZzogYnVpbGRlckNvbmZpZyB9XTtcbiAgICBzZXRUZW1wbGF0ZXModXBkYXRlZCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfdGVtcGxhdGVzJywgSlNPTi5zdHJpbmdpZnkodXBkYXRlZCkpO1xuICAgIHNldE5ld1RlbXBsYXRlTmFtZSgnJyk7XG4gICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDYrdmB2Lgg2YfYsNinINin2YTYqtmF2YjYtti5INmB2Yog2YLYp9im2YXYqSDZgtmI2KfZhNio2YMg2KjZhtis2KfYrSEnIDogJ0N1cnJlbnQgbWF0cml4IHNhdmVkIGFzIGN1c3RvbSB0ZW1wbGF0ZSEnLCAnc3VjY2VzcycpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFwcGx5VGVtcGxhdGUgPSAoY29uZmlnOiBIb21lcGFnZUNvbmZpZykgPT4ge1xuICAgIHVwZGF0ZUJ1aWxkZXJDb25maWcoY29uZmlnKTtcbiAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmFINiq2K3ZhdmK2YQg2KfZhNmC2KfZhNioINmI2KrYq9io2YrYqtmHIScgOiAnVGVtcGxhdGUgZGVwbG95ZWQgYXMgYWN0aXZlIG1hdHJpeCEnLCAnc3VjY2VzcycpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlbW92ZVRlbXBsYXRlID0gKGlkeDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgdXBkYXRlZCA9IHRlbXBsYXRlcy5maWx0ZXIoKF8sIGkpID0+IGkgIT09IGlkeCk7XG4gICAgc2V0VGVtcGxhdGVzKHVwZGF0ZWQpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X3RlbXBsYXRlcycsIEpTT04uc3RyaW5naWZ5KHVwZGF0ZWQpKTtcbiAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmFINit2LDZgSDYp9mE2YLYp9mE2Kgg2KfZhNmF2K7Yqtin2LEnIDogJ1NlbGVjdGVkIHRlbXBsYXRlIGRlbGV0ZWQnLCAnaW5mbycpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlc2V0VG9EZWZhdWx0ID0gKCkgPT4ge1xuICAgIHVwZGF0ZUJ1aWxkZXJDb25maWcoREVGQVVMVF9IT01FUEFHRV9DT05GSUcpO1xuICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YXYqiDYpdi52KfYr9ipINiq2YfZitim2Kkg2KfZhNmF2LnYp9mK2YbYqSDZhNmE2LPZhdin2Kog2KfZhNin2YHYqtix2KfYttmK2Kkg2YTZhNmF2LnYsdi2JyA6ICdSZXNldCBpbnRlcmFjdGl2ZSBzaG93Y2FzZSBzdHlsZSBkZWNrJywgJ2luZm8nKTtcbiAgfTtcblxuICAvLyBGaXJlIGEgZHluYW1pYyB0b2FzdFxuICBjb25zdCBmaXJlVG9hc3QgPSAodGV4dDogc3RyaW5nLCB0eXBlOiAnc3VjY2VzcycgfCAnZXJyb3InIHwgJ2luZm8nID0gJ3N1Y2Nlc3MnKSA9PiB7XG4gICAgY29uc3QgbmV3VG9hc3Q6IFRvYXN0TWVzc2FnZSA9IHsgaWQ6IGB0b2FzdC0ke0RhdGUubm93KCl9YCwgdGV4dCwgdHlwZSB9O1xuICAgIHNldFRvYXN0cygocHJldikgPT4gWy4uLnByZXYsIG5ld1RvYXN0XSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRUb2FzdHMoKHByZXYpID0+IHByZXYuZmlsdGVyKCh0KSA9PiB0LmlkICE9PSBuZXdUb2FzdC5pZCkpO1xuICAgIH0sIDQ1MDApO1xuICB9O1xuXG4gIC8vIFN5bmNocm9uaXplIGR5bmFtaWMgYm9va2luZ3MgcXVldWUgdXBkYXRlcyBmcm9tIHN0b3JhZ2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVTdG9yYWdlQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgY29uc3Qgc2F2ZWRCb29raW5ncyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbGtob2x5X2Jvb2tpbmdzJyk7XG4gICAgICBpZiAoc2F2ZWRCb29raW5ncykge1xuICAgICAgICBzZXRCb29raW5ncyhKU09OLnBhcnNlKHNhdmVkQm9va2luZ3MpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzdG9yYWdlJywgaGFuZGxlU3RvcmFnZUNoYW5nZSk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzdG9yYWdlJywgaGFuZGxlU3RvcmFnZUNoYW5nZSk7XG4gIH0sIFtdKTtcblxuICAvLyBTeW5jIHVzZXJzIHRvIHN0b3JhZ2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZWxraG9seV91c2VycycsIEpTT04uc3RyaW5naWZ5KHVzZXJzKSk7XG4gIH0sIFt1c2Vyc10pO1xuXG4gIC8vIExvYWQgYm9va2luZ3MgYW5kIHVzZXJzIGZyb20gRmlyZXN0b3JlIG9uIGFkbWluIGF1dGhvcml6YXRpb25cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBhc3luYyBmdW5jdGlvbiBsb2FkQ2xvdWREYXRhKCkge1xuICAgICAgaWYgKCFzZXNzaW9uVXNlcikgcmV0dXJuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYm9va2luZ3NTbmFwID0gYXdhaXQgZ2V0RG9jcyhjb2xsZWN0aW9uKGRiLCAnYm9va2luZ3MnKSk7XG4gICAgICAgIGlmICghYm9va2luZ3NTbmFwLmVtcHR5KSB7XG4gICAgICAgICAgY29uc3QgbGlzdDogYW55W10gPSBbXTtcbiAgICAgICAgICBib29raW5nc1NuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gZG9jLmRhdGEoKTtcbiAgICAgICAgICAgIGxpc3QucHVzaCh7XG4gICAgICAgICAgICAgIGlkOiBkb2MuaWQsXG4gICAgICAgICAgICAgIG1vdG9yY3ljbGVJZDogZGF0YS5tb3RvcmN5Y2xlSWQsXG4gICAgICAgICAgICAgIG1vdG9yY3ljbGVOYW1lOiBkYXRhLm1vdG9yY3ljbGVOYW1lLFxuICAgICAgICAgICAgICBjYXRlZ29yeTogZGF0YS5jYXRlZ29yeSB8fCAnQScsXG4gICAgICAgICAgICAgIHByaWNlOiBkYXRhLnRvdGFsUHJpY2UgPyBgJHtkYXRhLnRvdGFsUHJpY2UudG9Mb2NhbGVTdHJpbmcoKX0gRUdQYCA6IChkYXRhLnByaWNlIHx8ICcwIEVHUCcpLFxuICAgICAgICAgICAgICBuYW1lOiBkYXRhLmN1c3RvbWVyTmFtZSB8fCBkYXRhLm5hbWUgfHwgJ0Fub255bW91cyBVc2VyJyxcbiAgICAgICAgICAgICAgcGhvbmU6IGRhdGEuY3VzdG9tZXJQaG9uZSB8fCBkYXRhLnBob25lIHx8ICcwMDAwMDAwMDAnLFxuICAgICAgICAgICAgICBlbWFpbDogZGF0YS5jdXN0b21lckVtYWlsIHx8IGRhdGEuZW1haWwgfHwgJ0d1ZXN0IChDbG91ZCknLFxuICAgICAgICAgICAgICBkYXRlOiBkYXRhLmRhdGUgfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0sXG4gICAgICAgICAgICAgIHRpbWVzdGFtcDogZGF0YS50aW1lc3RhbXAgfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICBzdGF0dXM6IGRhdGEuc3RhdHVzIHx8ICdzb2xkJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGlzdC5zb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShiLnRpbWVzdGFtcCkuZ2V0VGltZSgpIC0gbmV3IERhdGUoYS50aW1lc3RhbXApLmdldFRpbWUoKSk7XG4gICAgICAgICAgc2V0Qm9va2luZ3MobGlzdCk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfYm9va2luZ3MnLCBKU09OLnN0cmluZ2lmeShsaXN0KSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJVbmFibGUgdG8gZmV0Y2ggYm9va2luZ3MgZnJvbSBGaXJlc3RvcmU6XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVzZXJzU25hcCA9IGF3YWl0IGdldERvY3MoY29sbGVjdGlvbihkYiwgJ3VzZXJzJykpO1xuICAgICAgICBpZiAoIXVzZXJzU25hcC5lbXB0eSkge1xuICAgICAgICAgIGNvbnN0IGxpc3Q6IFVzZXJBY2NvdW50W10gPSBbXTtcbiAgICAgICAgICB1c2Vyc1NuYXAuZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgICAgICBsaXN0LnB1c2goZG9jLmRhdGEoKSBhcyBVc2VyQWNjb3VudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2V0VXNlcnMobGlzdCk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfdXNlcnMnLCBKU09OLnN0cmluZ2lmeShsaXN0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU3luYyBleGlzdGluZyBkZWZhdWx0cyB0byBGaXJlc3RvcmVcbiAgICAgICAgICBmb3IgKGNvbnN0IHVzZXIgb2YgREVGQVVMVF9VU0VSUykge1xuICAgICAgICAgICAgYXdhaXQgc2V0RG9jKGRvYyhkYiwgJ3VzZXJzJywgdXNlci51c2VybmFtZSksIHVzZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBmZXRjaCB1c2VycyBmcm9tIEZpcmVzdG9yZTpcIiwgZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9hZENsb3VkRGF0YSgpO1xuICB9LCBbc2Vzc2lvblVzZXJdKTtcblxuICAvLyBBdXRoIFN1Ym1pdFxuICBjb25zdCBoYW5kbGVMb2dpblN1Ym1pdCA9IChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgY2xlYW5Vc2VyID0gdXNlcm5hbWVJbnB1dC50cmltKCk7XG4gICAgLy8gVmFsaWRhdGUgY3JlZGVudGlhbHMgYWdhaW5zdCBzdG9yZWQgbGlzdFxuICAgIGNvbnN0IGZvdW5kID0gdXNlcnMuZmluZCh1ID0+IHUudXNlcm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gY2xlYW5Vc2VyLnRvTG93ZXJDYXNlKCkgJiYgdS5wYXNzd29yZCA9PT0gcGFzc3dvcmRJbnB1dCk7XG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICBzZXRTZXNzaW9uVXNlcihmb3VuZCk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZWxraG9seV9zZXNzaW9uX3VzZXInLCBKU09OLnN0cmluZ2lmeShmb3VuZCkpO1xuICAgICAgc2V0VXNlcm5hbWVJbnB1dCgnJyk7XG4gICAgICBzZXRQYXNzd29yZElucHV0KCcnKTtcbiAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gYNmF2LHYrdio2KfZiyDYqNmDINmF2KzYr9iv2KfZiyAke3Njb3JlUm9sZUxhYmVsKGZvdW5kLnJvbGUpfWAgOiBgV2VsY29tZSBiYWNrICR7Zm91bmQucm9sZX0gb3BlcmF0b3JgLCAnc3VjY2VzcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYp9mE2KjZiNin2KjYqSDYp9mE2YXYutmE2YLYqTog2KjZitin2YbYp9iqINiv2K7ZiNmEINiu2KfYt9im2KknIDogJ0dhdGV3YXkgUmVmdXNlZDogSW5jb3JyZWN0IGNyZWRlbnRpYWxzJywgJ2Vycm9yJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUxvZ291dCA9ICgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZWxraG9seV9zZXNzaW9uX3VzZXInKTtcbiAgICBzZXRTZXNzaW9uVXNlcihudWxsKTtcbiAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmFINmB2LXZhCDYp9mE2KzZhNiz2Kkg2KjYo9mF2KfZhicgOiAnU2Vzc2lvbiB0ZXJtaW5hdGVkIHNlY3VyZWx5JywgJ2luZm8nKTtcbiAgfTtcblxuICAvLyBNZW1vaXplZCBmaWx0ZXJlZCBtb3RvcmN5Y2xlcyBmb3IgRGFzaCBwYW5lbCB2aWV3XG4gIGNvbnN0IGRhc2hGaWx0ZXJlZEJpa2VzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgbGV0IGZpbHRlcmVkID0gbW90b3JjeWNsZXM7XG4gICAgaWYgKGRhc2hDYXRlZ29yeUZpbHRlciAhPT0gJ0FsbCcpIHtcbiAgICAgIGZpbHRlcmVkID0gZmlsdGVyZWQuZmlsdGVyKGIgPT4gYi5jYXRlZ29yeSA9PT0gZGFzaENhdGVnb3J5RmlsdGVyKTtcbiAgICB9XG4gICAgaWYgKGJpa2VTZWFyY2hUZXJtLnRyaW0oKSkge1xuICAgICAgY29uc3QgcXVlcnkgPSBiaWtlU2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgICAgIGZpbHRlcmVkID0gZmlsdGVyZWQuZmlsdGVyKGIgPT4gXG4gICAgICAgIGIubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KSB8fCBcbiAgICAgICAgKGIuaWQgJiYgYi5pZC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KSkgfHxcbiAgICAgICAgKGIuc2VyaWFsQ29kZSAmJiBiLnNlcmlhbENvZGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSkpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZmlsdGVyZWQ7XG4gIH0sIFttb3RvcmN5Y2xlcywgZGFzaENhdGVnb3J5RmlsdGVyLCBiaWtlU2VhcmNoVGVybV0pO1xuXG4gIC8vIEltYWdlIEJhc2U2NCBVcGxvYWRlclxuICBjb25zdCBoYW5kbGVGb3JtSW1hZ2VVcGxvYWQgPSAoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXM/LlswXTtcbiAgICBpZiAoZmlsZSkge1xuICAgICAgaWYgKGZpbGUuc2l6ZSA+IDIgKiAxMDI0ICogMTAyNCkge1xuICAgICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYp9mE2K3YryDYp9mE2KPZgti12Ykg2YTYrdis2YUg2KfZhNmF2YTZgSDZh9mIIDIg2YXZitis2KfYqNin2YrYqicgOiAnTWF4IGF0dGFjaG1lbnQgbGltaXQgaXMgMk1CJywgJ2Vycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHJlYWRlci5yZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgc2V0QmlrZUZvcm0oKHByZXYpID0+ICh7IC4uLnByZXYsIGltYWdlOiByZWFkZXIucmVzdWx0IGFzIHN0cmluZyB9KSk7XG4gICAgICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDYqti02YHZitixINin2YTYtdmI2LHYqSDZiNil2LHZgdin2YLZh9inINio2YbYrNin2K0nIDogJ1Jlc291cmNlIGltYWdlIGF0dGFjaGVkIGFuZCBiYXNlNjQgZW5jb2RlZCcsICdzdWNjZXNzJyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQmlrZSBBY3Rpb25zXG4gIGNvbnN0IGhhbmRsZUVkaXRCaWtlQ2xpY2sgPSAoYmlrZTogTW90b3JjeWNsZSkgPT4ge1xuICAgIC8vIFJvbGUgY2hlY2s6IFN0YWZmIGNhbm5vdCBlZGl0IG9yIGRlbGV0ZVxuICAgIGlmIChzZXNzaW9uVXNlcj8ucm9sZSA9PT0gJ1N0YWZmJykge1xuICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2LXZhNin2K3Zitin2Kog2YXZhtiu2YHYttipOiDZhNinINmK2YXZg9mG2YMg2KrYudiv2YrZhCDYp9mE2YXYsdmD2KjYp9iqJyA6ICdMb3cgUHJpdmlsZWdlIE5vZGU6IFN0YWZmIGNhbm5vdCBtb2RpZnkgbWFjaGluZXMnLCAnZXJyb3InKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0RWRpdGluZ0Jpa2UoYmlrZSk7XG4gICAgc2V0SXNBZGRpbmdOZXcoZmFsc2UpO1xuICAgIHNldEZvcm1TdWJUYWIoJ2Jhc2ljJyk7XG4gICAgc2V0QmlrZUZvcm0oe1xuICAgICAgaWQ6IGJpa2UuaWQsXG4gICAgICBuYW1lOiBiaWtlLm5hbWUsXG4gICAgICBjYXRlZ29yeTogYmlrZS5jYXRlZ29yeSxcbiAgICAgIGNhdGVnb3J5TmFtZTogYmlrZS5jYXRlZ29yeU5hbWUsXG4gICAgICBwcmljZTogYmlrZS5wcmljZSxcbiAgICAgIHByaWNlTnVtOiBiaWtlLnByaWNlTnVtIHx8IDQ1MDAwLFxuICAgICAgaW1hZ2U6IGJpa2UuaW1hZ2UsXG4gICAgICB0YWdsaW5lOiBiaWtlLnRhZ2xpbmUgfHwgJ0FwZXggUGVyZm9ybWFuY2UnLFxuICAgICAgc2hvcnREZXNjOiBiaWtlLnNob3J0RGVzYyxcbiAgICAgIGxvbmdEZXNjOiBiaWtlLmxvbmdEZXNjIHx8ICcnLFxuICAgICAgaXNQb3B1bGFyOiAhIWJpa2UuaXNQb3B1bGFyLFxuICAgICAgc3BlY3M6IHsgLi4uYmlrZS5zcGVjcyB9LFxuICAgICAgaXNDdXN0b206IHRydWUsXG4gICAgICBjYXRhbG9nRmlsZU5hbWU6IGJpa2UuY2F0YWxvZ0ZpbGVOYW1lIHx8ICcnLFxuICAgICAgY2F0YWxvZ0ZpbGVDb250ZW50OiBiaWtlLmNhdGFsb2dGaWxlQ29udGVudCB8fCAnJyxcbiAgICAgIG9yaWdpbmFsUHJpY2U6IGJpa2Uub3JpZ2luYWxQcmljZSAhPT0gdW5kZWZpbmVkID8gYmlrZS5vcmlnaW5hbFByaWNlIDogKGJpa2UucHJpY2VOdW0gfHwgNDUwMDApLFxuICAgICAgZGlzY291bnQ6IGJpa2UuZGlzY291bnQgfHwgMCxcbiAgICAgIGRpc2NvdW50VHlwZTogYmlrZS5kaXNjb3VudFR5cGUgfHwgJ3BlcmNlbnRhZ2UnLFxuICAgICAgb2ZmZXJMYWJlbDogYmlrZS5vZmZlckxhYmVsIHx8ICcnLFxuICAgICAgYWRkT25zOiBiaWtlLmFkZE9ucyA/IFsuLi5iaWtlLmFkZE9uc10gOiBbXSxcbiAgICAgIHNlcmlhbENvZGU6IGJpa2Uuc2VyaWFsQ29kZSB8fCAnJyxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGROZXdDbGljayA9ICgpID0+IHtcbiAgICBzZXRJc0FkZGluZ05ldyh0cnVlKTtcbiAgICBzZXRFZGl0aW5nQmlrZShudWxsKTtcbiAgICBzZXRGb3JtU3ViVGFiKCdiYXNpYycpO1xuICAgIHNldEJpa2VGb3JtKHtcbiAgICAgIGlkOiBgY3VzdG9tLWJpa2UtJHtEYXRlLm5vdygpfWAsXG4gICAgICBuYW1lOiAnTkVXIEFQRVggTUFDSElORSBWNCcsXG4gICAgICBjYXRlZ29yeTogJ0EnLFxuICAgICAgY2F0ZWdvcnlOYW1lOiAnU3BvcnQnLFxuICAgICAgcHJpY2U6ICckNDUsMDAwJyxcbiAgICAgIHByaWNlTnVtOiA0NTAwMCxcbiAgICAgIGltYWdlOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NTg5ODE4MDYtZWM1MjdmYTg0YzM5P2F1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAmdz02MDAnLFxuICAgICAgdGFnbGluZTogJ0RlZnlpbmcgSHlicmlkIFByb3B1bHNpb24gR3Jhdml0eScsXG4gICAgICBzaG9ydERlc2M6ICdTdGF0ZS1vZi10aGUtYXJ0IGZ1dHVyaXN0aWMgbW90b3JjeWNsZSBwcm90b3R5cGUgYnVpbHQgZm9yIHRvcCBzcGVlZCBhbmQgbHV4dXJ5LicsXG4gICAgICBsb25nRGVzYzogJ0VuZ2luZWVyZWQgd2l0aCBkb3VibGUgYWVyby1keW5hbWljcywgcGxhc21hIHRocnVzdCBjb250cm9scywgYWRhcHRpdmUgdmlzdWFsIEhVRCBwYW5lbHMsIGFuZCBsaWdodHdlaWdodCBzb2xpZC1zdGF0ZSBsaXRoaXVtIGNlbGxzIGZvciBjb250aW51b3VzIHBvd2VyIG91dHB1dC4nLFxuICAgICAgaXNQb3B1bGFyOiBmYWxzZSxcbiAgICAgIHNwZWNzOiB7XG4gICAgICAgIGVuZ2luZTogJzEyMDBjYyBRdWFkLVB1bHNlIFNvbGlkJyxcbiAgICAgICAgdG9wU3BlZWQ6ICczNDAga20vaCcsXG4gICAgICAgIGZ1ZWxDb25zdW1wdGlvbjogJzAuMCBMLzEwMGttJyxcbiAgICAgICAgcG93ZXI6ICcyMTAgSFAnLFxuICAgICAgICB3ZWlnaHQ6ICcxNzIga2cnXG4gICAgICB9LFxuICAgICAgaXNDdXN0b206IHRydWUsXG4gICAgICBjYXRhbG9nRmlsZU5hbWU6ICcnLFxuICAgICAgY2F0YWxvZ0ZpbGVDb250ZW50OiAnJyxcbiAgICAgIG9yaWdpbmFsUHJpY2U6IDQ1MDAwLFxuICAgICAgZGlzY291bnQ6IDAsXG4gICAgICBkaXNjb3VudFR5cGU6ICdwZXJjZW50YWdlJyxcbiAgICAgIG9mZmVyTGFiZWw6ICcnLFxuICAgICAgYWRkT25zOiBbXSxcbiAgICAgIHNlcmlhbENvZGU6ICdNT1RPLScgKyBEYXRlLm5vdygpLFxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUZvcm1TdWJtaXQgPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKCFiaWtlRm9ybS5uYW1lIHx8ICFiaWtlRm9ybS5pbWFnZSkge1xuICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KfZhNix2KzYp9ihINil2K/Yrtin2YQg2KfYs9mFINin2YTZhdix2YPYqNipINmI2LXZiNix2Kkg2LXYp9mE2K3YqScgOiAnTWFjaGluZSBuYW1lIGFuZCB2aXN1YWwgYXJlIGJvdGggbWFuZGF0b3J5JywgJ2Vycm9yJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2F0TmFtZXMgPSB7IEE6ICdTcG9ydCcsIEI6ICdDcnVpc2VyJywgQzogJ0FkdmVudHVyZScsIFM6ICdTY29vdGVyJyB9O1xuICAgIFxuICAgIC8vIER5bmFtaWNhbGx5IGNhbGN1bGF0ZSBmaW5hbCBwcmljZSBmcm9tIG9yaWdpbmFsUHJpY2UgYW5kIGRpc2NvdW50XG4gICAgbGV0IGNhbGN1bGF0ZWRQcmljZU51bSA9IE51bWJlcihiaWtlRm9ybS5vcmlnaW5hbFByaWNlICE9PSB1bmRlZmluZWQgPyBiaWtlRm9ybS5vcmlnaW5hbFByaWNlIDogKGJpa2VGb3JtLnByaWNlTnVtIHx8IDQ1MDAwKSk7XG4gICAgY29uc3QgZGlzY1ZhbCA9IE51bWJlcihiaWtlRm9ybS5kaXNjb3VudCB8fCAwKTtcbiAgICBpZiAoZGlzY1ZhbCA+IDAgJiYgYmlrZUZvcm0ub3JpZ2luYWxQcmljZSkge1xuICAgICAgaWYgKGJpa2VGb3JtLmRpc2NvdW50VHlwZSA9PT0gJ3BlcmNlbnRhZ2UnKSB7XG4gICAgICAgIGNhbGN1bGF0ZWRQcmljZU51bSA9IE1hdGgucm91bmQoYmlrZUZvcm0ub3JpZ2luYWxQcmljZSAqICgxIC0gZGlzY1ZhbCAvIDEwMCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsY3VsYXRlZFByaWNlTnVtID0gTWF0aC5yb3VuZChNYXRoLm1heCgwLCBiaWtlRm9ybS5vcmlnaW5hbFByaWNlIC0gZGlzY1ZhbCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNvbXBsZXRlZEZvcm06IE1vdG9yY3ljbGUgPSB7XG4gICAgICAuLi5iaWtlRm9ybSxcbiAgICAgIHByaWNlTnVtOiBjYWxjdWxhdGVkUHJpY2VOdW0sXG4gICAgICBjYXRlZ29yeU5hbWU6IGNhdE5hbWVzW2Jpa2VGb3JtLmNhdGVnb3J5XSxcbiAgICAgIHByaWNlOiBgJHtjYWxjdWxhdGVkUHJpY2VOdW0udG9Mb2NhbGVTdHJpbmcoKX0g2KzZhtmK2YdgLFxuICAgIH07XG5cbiAgICBsZXQgbmV4dEJpa2VzOiBNb3RvcmN5Y2xlW10gPSBbXTtcbiAgICBpZiAoaXNBZGRpbmdOZXcpIHtcbiAgICAgIG5leHRCaWtlcyA9IFtjb21wbGV0ZWRGb3JtLCAuLi5tb3RvcmN5Y2xlc107XG4gICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmF2Kog2KXYttin2YHYqSDYotmE2Kkg2KzYr9mK2K/YqSDZhNmE2KPYs9i32YjZhCEnIDogJ05ldyBoZWF2eSBtYWNoaW5lIGNvbW1pc3Npb25lZCBzdWNjZXNzZnVsbHkhJywgJ3N1Y2Nlc3MnKTtcbiAgICB9IGVsc2UgaWYgKGVkaXRpbmdCaWtlKSB7XG4gICAgICBpZiAoc2Vzc2lvblVzZXI/LnJvbGUgPT09ICdTdGFmZicpIHtcbiAgICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2K7Yt9ijINmB2Yog2KfZhNiq2LHYrtmK2LU6INmE2Kcg2KrZhdmE2YMg2K3ZgiDYp9mE2KrYudiv2YrZhCcgOiAnU3RhZmYgbm9kZSB1bmF1dGhvcml6ZWQgZm9yIHdyaXRlcycsICdlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBuZXh0QmlrZXMgPSBtb3RvcmN5Y2xlcy5tYXAoKGIpID0+IChiLmlkID09PSBlZGl0aW5nQmlrZS5pZCA/IGNvbXBsZXRlZEZvcm0gOiBiKSk7XG4gICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmFINiq2K3Yr9mK2Ksg2KjZitin2YbYp9iqINin2YTZhdi52KfZitix2Kkg2KjZhtis2KfYrSEnIDogJ01hY2hpbmUgcGFyYW1ldGVycyB1cGRhdGVkIGluIHNob3dyb29tcyEnLCAnc3VjY2VzcycpO1xuICAgIH1cblxuICAgIG9uVXBkYXRlTW90b3JjeWNsZXMobmV4dEJpa2VzKTtcbiAgICBzZXRFZGl0aW5nQmlrZShudWxsKTtcbiAgICBzZXRJc0FkZGluZ05ldyhmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlQmlrZSA9IChiaWtlSWQ6IHN0cmluZykgPT4ge1xuICAgIC8vIE9ubHkgQWRtaW4gY2FuIGRlbGV0ZVxuICAgIGlmIChzZXNzaW9uVXNlcj8ucm9sZSAhPT0gJ0FkbWluJykge1xuICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KfZhNi52YXZhNmK2Kkg2YXYsdmB2YjYttipOiDYp9mE2YXYs9ik2YjZhNmI2YYg2YHZgti3INmK2YXZg9mG2YfZhSDYp9mE2K3YsNmBJyA6ICdQcml2aWxlZ2UgQnJlYWNoOiBPbmx5IGNvcmUgYWRtaW5zIGNhbiBkZWNvbW1pc3Npb24gZXF1aXBtZW50JywgJ2Vycm9yJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHRCaWtlcyA9IG1vdG9yY3ljbGVzLmZpbHRlcigoYikgPT4gYi5pZCAhPT0gYmlrZUlkKTtcbiAgICBvblVwZGF0ZU1vdG9yY3ljbGVzKG5leHRCaWtlcyk7XG4gICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDYtNi32Kgg2YjYpdiy2KfZhNipINin2YTZhdix2YPYqNipINmF2YYg2YLYp9i52K/YqSDYp9mE2KjZitin2YbYp9iqJyA6ICdIZWF2eSBjeWNsZSBkZWNvbW1pc3Npb25lZCBzdWNjZXNzZnVsbHknLCAnc3VjY2VzcycpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURvd25sb2FkQW5kQ29weVFSQ29kZSA9IChiaWtlOiBNb3RvcmN5Y2xlKSA9PiB7XG4gICAgY29uc3QgcXJDb2RlVGV4dCA9IGJpa2Uuc2VyaWFsQ29kZSB8fCBiaWtlLmlkO1xuICAgIFxuICAgIC8vIDEuIENvcHkgdG8gY2xpcGJvYXJkXG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQocXJDb2RlVGV4dCkudGhlbigoKSA9PiB7XG4gICAgICBmaXJlVG9hc3QoXG4gICAgICAgIGxhbmcgPT09ICdhcicgXG4gICAgICAgICAgPyBg2KrZhSDZhtiz2K4g2KfZhNmD2YjYryDYqNmG2KzYp9itOiAke3FyQ29kZVRleHR9YCBcbiAgICAgICAgICA6IGBDb2RlIGNvcGllZCBzdWNjZXNzZnVsbHk6ICR7cXJDb2RlVGV4dH1gLCBcbiAgICAgICAgJ3N1Y2Nlc3MnXG4gICAgICApO1xuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUud2FybihcIkZhaWxlZCB0byBjb3B5XCIsIGVycik7XG4gICAgfSk7XG5cbiAgICAvLyAyLiBMb2NhdGUgU1ZHIGFuZCBpbml0aWF0ZSBpbWFnZSBkb3dubG9hZFxuICAgIGNvbnN0IHN2Z0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcXItJHtiaWtlLmlkfWApO1xuICAgIGlmICghc3ZnRWxlbWVudCkge1xuICAgICAgY29uc29sZS53YXJuKGBTVkcgZWxlbWVudCBxci0ke2Jpa2UuaWR9IG5vdCBmb3VuZGApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdmdTdHJpbmcgPSBuZXcgWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKHN2Z0VsZW1lbnQpO1xuICAgICAgY29uc3Qgc3ZnQmxvYiA9IG5ldyBCbG9iKFtzdmdTdHJpbmddLCB7IHR5cGU6ICdpbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmLTgnIH0pO1xuICAgICAgY29uc3QgYmxvYlVSTCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHN2Z0Jsb2IpO1xuXG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gMjU2O1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gMjU2O1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgLy8gRmlsbCBiYWNrZ3JvdW5kIHdoaXRlXG4gICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnI0ZGRkZGRic7XG4gICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCAyNTYsIDI1Nik7XG4gICAgICAgICAgLy8gRHJhdyBRUiBvbiB0b3BcbiAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMTYsIDE2LCAyMjQsIDIyNCk7XG4gICAgICAgICAgXG4gICAgICAgICAgY29uc3QgcG5nVVJMID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gICAgICAgICAgY29uc3QgZGxMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgIGRsTGluay5ocmVmID0gcG5nVVJMO1xuICAgICAgICAgIGRsTGluay5kb3dubG9hZCA9IGBRUl8ke2Jpa2UubmFtZS5yZXBsYWNlKC9cXHMrL2csICdfJyl9XyR7cXJDb2RlVGV4dH0ucG5nYDtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRsTGluayk7XG4gICAgICAgICAgZGxMaW5rLmNsaWNrKCk7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkbExpbmspO1xuICAgICAgICAgIFxuICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGJsb2JVUkwpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaW1hZ2Uub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgLy8gRmFsbGJhY2sgdG8gU1ZHIGRvd25sb2FkIGluIGNhc2UgaW1hZ2UgZHJhd2luZyBpcyBibG9ja2VkIGJ5IHNhbmRib3ggY29uc3RyYWludHNcbiAgICAgICAgY29uc3QgZGxMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBkbExpbmsuaHJlZiA9IGJsb2JVUkw7XG4gICAgICAgIGRsTGluay5kb3dubG9hZCA9IGBRUl8ke2Jpa2UubmFtZS5yZXBsYWNlKC9cXHMrL2csICdfJyl9XyR7cXJDb2RlVGV4dH0uc3ZnYDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkbExpbmspO1xuICAgICAgICBkbExpbmsuY2xpY2soKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkbExpbmspO1xuICAgICAgfTtcbiAgICAgIGltYWdlLnNyYyA9IGJsb2JVUkw7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGdlbmVyYXRlIGRvd25sb2FkOlwiLCBlcnIpO1xuICAgIH1cbiAgfTtcblxuICAvLyBVc2VyIEFjdGlvbnMgKENvcmUgQWRtaW4gT25seSlcbiAgY29uc3QgaGFuZGxlQWRkVXNlclN1Ym1pdCA9IGFzeW5jIChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHNlc3Npb25Vc2VyPy5yb2xlICE9PSAnQWRtaW4nKSB7XG4gICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYtdmE2KfYrdmK2KfYqiDZg9in2YHZitipINmB2YLYtyDZhNmE2YXYtNix2YEg2KfZhNix2KbZitiz2YonIDogJ01hc3RlciBhZG1pbmlzdHJhdG9yIGtleSByZXF1aXJlZCBmb3Igbm9kZXMgY3VyYXRpb24nLCAnZXJyb3InKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjbGVhblVzZXJuYW1lID0gbmV3VXNlcm5hbWUudHJpbSgpO1xuICAgIGlmICghY2xlYW5Vc2VybmFtZSB8fCAhbmV3UGFzc3dvcmQpIHtcbiAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iu2LfYozog2YrYsdis2Ykg2YXZhNihINmD2KfZgdipINiu2KfZhtin2Kog2KfZhNmF2LTYsdmB2YrZhicgOiAnTm9kZSB1c2VybmFtZSBhbmQgY29kZSBrZXkgYXJlIHJlcXVpcmVkJywgJ2Vycm9yJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdXNlckV4aXN0cyA9IHVzZXJzLnNvbWUodSA9PiB1LnVzZXJuYW1lLnRvTG93ZXJDYXNlKCkgPT09IGNsZWFuVXNlcm5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgaWYgKHVzZXJFeGlzdHMpIHtcbiAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9mH2LDYpyDYp9mE2K3Ys9in2Kgg2YXYs9is2YQg2KjYp9mE2YHYudmEINmB2Yog2KfZhNij2KrZhdiq2KknIDogJ09wZXJhdG9yIG5vZGUgaWRlbnRpdHkga2V5IGFscmVhZHkgb25saW5lJywgJ2Vycm9yJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV3VXNlcjogVXNlckFjY291bnQgPSB7XG4gICAgICB1c2VybmFtZTogY2xlYW5Vc2VybmFtZSxcbiAgICAgIHBhc3N3b3JkOiBuZXdQYXNzd29yZCxcbiAgICAgIHJvbGU6IG5ld1JvbGVcbiAgICB9O1xuXG4gICAgY29uc3QgbmV4dFVzZXJzID0gWy4uLnVzZXJzLCBuZXdVc2VyXTtcbiAgICBzZXRVc2VycyhuZXh0VXNlcnMpO1xuICAgIHNldE5ld1VzZXJuYW1lKCcnKTtcbiAgICBzZXROZXdQYXNzd29yZCgnJyk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHNldERvYyhkb2MoZGIsICd1c2VycycsIGNsZWFuVXNlcm5hbWUpLCBuZXdVc2VyKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBzeW5jIG5ldyB1c2VyIHRvIEZpcmVzdG9yZTpcIiwgZXJyKTtcbiAgICB9XG4gICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDYqtmB2YjZiti2INin2YTZhdi02LrZhCDYp9mE2KzYr9mK2K8g2KjZhtis2KfYrSEnIDogYE9wZXJhdG9yIG5vZGUgZGVsZWdhdGVkOiAke2NsZWFuVXNlcm5hbWV9IFske25ld1JvbGV9XWAsICdzdWNjZXNzJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlVXNlciA9IGFzeW5jICh1c2VybmFtZVRvRGVsZXRlOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoc2Vzc2lvblVzZXI/LnJvbGUgIT09ICdBZG1pbicpIHtcbiAgICAgIGZpcmVUb2FzdCgnQ29yZSBhZG1pbiBhdXRob3JpemF0aW9uIHJlcXVpcmVkJywgJ2Vycm9yJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUHJvdGVjdCBtYXN0ZXIgSE9TTlkxOTk1IGZyb20gZGVsZXRpb24gbG9ja291dFxuICAgIGlmICh1c2VybmFtZVRvRGVsZXRlLnRvVXBwZXJDYXNlKCkgPT09ICdIT1NOWTE5OTUnKSB7XG4gICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfZhNmI2KfYptitINin2YTYo9mF2KfZhjog2YTYpyDZitmF2YPZhiDYrdiw2YEg2K3Ys9in2Kgg2KfZhNmF2KfZhNmDINin2YTYsdim2YrYs9mKJyA6ICdTZWN1cml0eSBEaXJlY3RpdmU6IExvY2tlZCBub2RlIFtIT1NOWTE5OTVdIGNhbm5vdCBiZSBlcmFzZWQnLCAnZXJyb3InKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBQcm90ZWN0IGN1cnJlbnQgc2VsZiBmcm9tIGRlbGV0aW9uXG4gICAgaWYgKHVzZXJuYW1lVG9EZWxldGUgPT09IHNlc3Npb25Vc2VyLnVzZXJuYW1lKSB7XG4gICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfZhNmI2KfYptitINin2YTYo9mF2KfZhjog2YTYpyDZitmF2YPZhiDYrdiw2YEg2YXYtNi62YQg2KfZhNis2YTYs9ipINin2YTYrdin2YTZiicgOiAnU2VjdXJpdHkgRGlyZWN0aXZlOiBZb3UgY2Fubm90IGRlbGV0ZSB5b3VyIG93biBzZXNzaW9uIG5vZGUnLCAnZXJyb3InKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0ID0gdXNlcnMuZmlsdGVyKHUgPT4gdS51c2VybmFtZSAhPT0gdXNlcm5hbWVUb0RlbGV0ZSk7XG4gICAgc2V0VXNlcnMobmV4dCk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRlbGV0ZURvYyhkb2MoZGIsICd1c2VycycsIHVzZXJuYW1lVG9EZWxldGUpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBzeW5jIGRlbGV0ZWQgdXNlciBmcm9tIEZpcmVzdG9yZTpcIiwgZXJyKTtcbiAgICB9XG4gICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDYs9it2Kgg2LXZhNin2K3Zitin2Kog2KfZhNmF2LTYutmEINio2YbYrNin2K0nIDogYFByaXZpbGVnZXMgcmV2b2tlZCBmb3Igbm9kZTogJHt1c2VybmFtZVRvRGVsZXRlfWAsICdzdWNjZXNzJyk7XG4gIH07XG5cbiAgLy8gVXBkYXRlIFNldHRpbmdzIGhvbWVwYWdlIFRleHQgQ29udGVudFxuICBjb25zdCBoYW5kbGVDb250ZW50U3VibWl0ID0gKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoc2Vzc2lvblVzZXI/LnJvbGUgIT09ICdBZG1pbicpIHtcbiAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9i12YTYp9it2YrYp9iqINmF2YbYrtmB2LbYqTog2KfZhNmF2LTYsdmB2YjZhiDZgdmC2Lcg2YrYrdmCINmE2YfZhSDYqti52K/ZitmEINin2YTZhdit2KrZiNmJINin2YTZhdin2YTZiiDZiNin2YTZiNi12YHZiicgOiAnRm9yYmlkZGVuOiBIb21lcGFnZSBsYXlvdXRzIHJlc3RyaWN0ZWQgdG8gQWRtaW4gb3BlcmF0b3JzJywgJ2Vycm9yJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9uVXBkYXRlQ3VzdG9tVGV4dCh0ZXh0Rm9ybSk7XG4gICAgaWYgKG9uVXBkYXRlSG9tZXBhZ2VDb25maWcpIHtcbiAgICAgIG9uVXBkYXRlSG9tZXBhZ2VDb25maWcoYnVpbGRlckNvbmZpZyk7XG4gICAgfVxuICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YUg2K3Zgdi4INmI2KrYt9mI2YrYsSDYqti12YXZitmFINi12YHYrdipINin2YTZhdi52LHYtiDYqNmG2KzYp9itIScgOiAnQWR2YW5jZWQgbGF5b3V0IGNvbmZpZ3VyYXRpb24gZGVwbG95ZWQgc3VjY2Vzc2Z1bGx5IScsICdzdWNjZXNzJyk7XG4gIH07XG5cbiAgLy8gQ2xlYXIgYm9va2luZ3MgcXVldWUgbG9ncyAoQWRtaW4gcHJpdmlsZWdlKVxuICBjb25zdCBoYW5kbGVDbGVhckJvb2tpbmdzID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChzZXNzaW9uVXNlcj8ucm9sZSAhPT0gJ0FkbWluJykge1xuICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KfZhNmI2LXZiNmEINmF2LHZgdmI2LY6INin2YTYpdiv2KfYsdmK2YjZhiDZgdmC2Lcg2YrYrdmCINmE2YfZhSDYp9mE2K3YsNmBJyA6ICdQcml2aWxlZ2UgQnJlYWNoOiBPbmx5IGFkbWlucyBjYW4gY2xlYW4gbG9ncycsICdlcnJvcicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZWxraG9seV9ib29raW5ncycpO1xuICAgIHNldEJvb2tpbmdzKFtdKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcVNuYXAgPSBhd2FpdCBnZXREb2NzKGNvbGxlY3Rpb24oZGIsICdib29raW5ncycpKTtcbiAgICAgIGZvciAoY29uc3QgZCBvZiBxU25hcC5kb2NzKSB7XG4gICAgICAgIGF3YWl0IGRlbGV0ZURvYyhkb2MoZGIsICdib29raW5ncycsIGQuaWQpKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBjbGVhciBib29raW5ncyBmcm9tIEZpcmVzdG9yZTpcIiwgZXJyKTtcbiAgICB9XG4gICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDYqtmB2LHZiti6INi32KfYqNmI2LEg2KfZhNit2KzZiNiy2KfYqiDZhtmH2KfYptmK2KfZiycgOiAnSG9sb2dyYXBoaWMgbGVhZCBxdWV1ZSBwdXJnZWQgc3VjY2Vzc2Z1bGx5JywgJ2luZm8nKTtcbiAgfTtcblxuICAvLyBUb2dnbGUgYm9va2luZydzIHN0YXR1cyBiZXR3ZWVuIHNvbGQgYW5kIHBlbmRpbmdcbiAgY29uc3QgaGFuZGxlVG9nZ2xlQm9va2luZ1N0YXR1cyA9IGFzeW5jIChib29raW5nSWQ6IHN0cmluZywgY3VycmVudFN0YXR1czogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgbmV4dFN0YXR1cyA9IGN1cnJlbnRTdGF0dXMgPT09ICdzb2xkJyA/ICdwZW5kaW5nJyA6ICdzb2xkJztcbiAgICBcbiAgICAvLyB1cGRhdGUgc3RhdGVcbiAgICBjb25zdCB1cGRhdGVkID0gYm9va2luZ3MubWFwKGIgPT4gYi5pZCA9PT0gYm9va2luZ0lkID8geyAuLi5iLCBzdGF0dXM6IG5leHRTdGF0dXMgfSA6IGIpO1xuICAgIHNldEJvb2tpbmdzKHVwZGF0ZWQpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X2Jvb2tpbmdzJywgSlNPTi5zdHJpbmdpZnkodXBkYXRlZCkpO1xuICAgIFxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBzZXREb2MoZG9jKGRiLCAnYm9va2luZ3MnLCBib29raW5nSWQpLCB7XG4gICAgICAgIHN0YXR1czogbmV4dFN0YXR1c1xuICAgICAgfSwgeyBtZXJnZTogdHJ1ZSB9KTtcbiAgICAgIGZpcmVUb2FzdChcbiAgICAgICAgbGFuZyA9PT0gJ2FyJyA/ICfYqtmFINiq2K3Yr9mK2Ksg2K3Yp9mE2Kkg2KfZhNio2YrYuSDZhNmE2K/Ysdin2KzYqSDYqNmG2KzYp9itJyA6ICdNb3RvcmN5Y2xlIHN0YXR1cyB1cGRhdGVkIHN1Y2Nlc3NmdWxseScsXG4gICAgICAgICdzdWNjZXNzJ1xuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBzeW5jIGJvb2tpbmcgc3RhdHVzIGluIGNsb3VkOlwiLCBlcnIpO1xuICAgIH1cbiAgfTtcblxuICAvLyBTY29yZSBzdGF0cyB2YWx1ZXNcbiAgY29uc3QgZmxlZXRWYWx1ZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBtb3RvcmN5Y2xlcy5yZWR1Y2UoKGFjYywgY3VycmVudCkgPT4gYWNjICsgKGN1cnJlbnQucHJpY2VOdW0gfHwgNDUwMDApLCAwKTtcbiAgfSwgW21vdG9yY3ljbGVzXSk7XG5cbiAgY29uc3QgY2F0QV9Db3VudCA9IHVzZU1lbW8oKCkgPT4gbW90b3JjeWNsZXMuZmlsdGVyKGIgPT4gYi5jYXRlZ29yeSA9PT0gJ0EnKS5sZW5ndGgsIFttb3RvcmN5Y2xlc10pO1xuICBjb25zdCBjYXRCX0NvdW50ID0gdXNlTWVtbygoKSA9PiBtb3RvcmN5Y2xlcy5maWx0ZXIoYiA9PiBiLmNhdGVnb3J5ID09PSAnQicpLmxlbmd0aCwgW21vdG9yY3ljbGVzXSk7XG4gIGNvbnN0IGNhdENfQ291bnQgPSB1c2VNZW1vKCgpID0+IG1vdG9yY3ljbGVzLmZpbHRlcihiID0+IGIuY2F0ZWdvcnkgPT09ICdDJykubGVuZ3RoLCBbbW90b3JjeWNsZXNdKTtcbiAgY29uc3QgY2F0U19Db3VudCA9IHVzZU1lbW8oKCkgPT4gbW90b3JjeWNsZXMuZmlsdGVyKGIgPT4gYi5jYXRlZ29yeSA9PT0gJ1MnKS5sZW5ndGgsIFttb3RvcmN5Y2xlc10pO1xuXG4gIC8vIE1vdG9yY3ljbGUgc2FsZXMgYW5kIHNvbGQgY291bnQgY2FsY3VsYXRpb24gKEJhc2VkIG9uIGJvb2tpbmdzIGhhdmluZyBzdGF0dXMgIT09ICdwZW5kaW5nJylcbiAgY29uc3QgbW90b3JzVG90YWxTYWxlc1ZhbHVlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGJvb2tpbmdzLnJlZHVjZSgoYWNjLCBiKSA9PiB7XG4gICAgICBjb25zdCBzdGF0dXMgPSBiLnN0YXR1cyB8fCAnc29sZCc7XG4gICAgICBpZiAoc3RhdHVzICE9PSAnc29sZCcpIHJldHVybiBhY2M7XG4gICAgICBcbiAgICAgIGxldCBudW1lcmljUHJpY2UgPSA0NTAwMDsgLy8gZGVmYXVsdFxuICAgICAgaWYgKGIucHJpY2UpIHtcbiAgICAgICAgY29uc3QgY2xlYW5lZCA9IGIucHJpY2UucmVwbGFjZSgvW14wLTldL2csICcnKTtcbiAgICAgICAgaWYgKGNsZWFuZWQpIHtcbiAgICAgICAgICBudW1lcmljUHJpY2UgPSBOdW1iZXIoY2xlYW5lZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2MgKyBudW1lcmljUHJpY2U7XG4gICAgfSwgMCk7XG4gIH0sIFtib29raW5nc10pO1xuXG4gIGNvbnN0IG1vdG9yc1RvdGFsU29sZENvdW50ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGJvb2tpbmdzLmZpbHRlcihiID0+IChiLnN0YXR1cyB8fCAnc29sZCcpID09PSAnc29sZCcpLmxlbmd0aDtcbiAgfSwgW2Jvb2tpbmdzXSk7XG5cbiAgLy8gRS1jb21tZXJjZSBTdG9yZSBzdGF0aXN0aWNzIGNhbGN1bGF0aW9uc1xuICBjb25zdCBzdG9yZVRvdGFsUmV2ZW51ZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiAoc3RvcmVQcm9kdWN0cyB8fCBbXSkucmVkdWNlKChhY2MsIHApID0+IGFjYyArICgocC5wcmljZSB8fCAwKSAqIChwLnNvbGRDb3VudCB8fCAwKSksIDApO1xuICB9LCBbc3RvcmVQcm9kdWN0c10pO1xuXG4gIGNvbnN0IHN0b3JlVG90YWxJdGVtc1NvbGQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gKHN0b3JlUHJvZHVjdHMgfHwgW10pLnJlZHVjZSgoYWNjLCBwKSA9PiBhY2MgKyAocC5zb2xkQ291bnQgfHwgMCksIDApO1xuICB9LCBbc3RvcmVQcm9kdWN0c10pO1xuXG4gIC8vIC0tLSBFeGNlbCBFeHBvcnQgJiBTYWxlcyBSZXBvcnRzIFByb2Nlc3NpbmcgU3RhdGVzIC0tLVxuICBjb25zdCBbZXhwb3J0UmFuZ2VUeXBlLCBzZXRFeHBvcnRSYW5nZVR5cGVdID0gdXNlU3RhdGU8J3RvZGF5JyB8ICd3ZWVrJyB8ICdtb250aCcgfCAnM21vbnRocycgfCAnNm1vbnRocycgfCAneWVhcicgfCAnY3VzdG9tJz4oJ21vbnRoJyk7XG4gIGNvbnN0IFtleHBvcnRTdGFydERhdGUsIHNldEV4cG9ydFN0YXJ0RGF0ZV0gPSB1c2VTdGF0ZTxzdHJpbmc+KG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxNikpO1xuICBjb25zdCBbZXhwb3J0RW5kRGF0ZSwgc2V0RXhwb3J0RW5kRGF0ZV0gPSB1c2VTdGF0ZTxzdHJpbmc+KG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxNikpO1xuXG4gIGNvbnN0IGhhbmRsZUV4cG9ydEV4Y2VsID0gKCkgPT4ge1xuICAgIC8vIDEuIEdhdGhlciBhbGwgZGF0YSBzb3VyY2VzXG4gICAgLy8gUmVhbCBib29raW5nc1xuICAgIGNvbnN0IHBhcnNlZFJlYWxCb29raW5ncyA9IGJvb2tpbmdzLm1hcCgoYikgPT4ge1xuICAgICAgLy8gc2FmZSBudW1lcmljIHByaWNlIHBhcnNpbmdcbiAgICAgIGxldCBudW1lcmljUHJpY2UgPSA0NTAwMDsgLy8gZGVmYXVsdFxuICAgICAgaWYgKGIucHJpY2UpIHtcbiAgICAgICAgY29uc3QgY2xlYW5lZCA9IGIucHJpY2UucmVwbGFjZSgvW14wLTldL2csICcnKTtcbiAgICAgICAgaWYgKGNsZWFuZWQpIHtcbiAgICAgICAgICBudW1lcmljUHJpY2UgPSBOdW1iZXIoY2xlYW5lZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgbGV0IGRhdGVTdHIgPSBiLmRhdGUgfHwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XG4gICAgICBpZiAoYi50aW1lc3RhbXApIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkYXRlU3RyID0gYi50aW1lc3RhbXAuc3BsaXQoJ1QnKVswXTtcbiAgICAgICAgfSBjYXRjaChlKXt9XG4gICAgICB9XG4gICAgICBcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBiLmlkLFxuICAgICAgICBjb2RlOiBiLm1vdG9yY3ljbGVJZCB8fCAnTU9UTy1HRU4nLFxuICAgICAgICBuYW1lOiBiLm1vdG9yY3ljbGVOYW1lLFxuICAgICAgICB0eXBlOiBsYW5nID09PSAnYXInID8gJ9iv2LHYp9is2Kkg2YbYp9ix2YrYqScgOiAnTW90b3JjeWNsZScsXG4gICAgICAgIGN1c3RvbWVyTmFtZTogYi5uYW1lIHx8ICdBbm9ueW1vdXMnLFxuICAgICAgICBjdXN0b21lclBob25lOiBiLnBob25lIHx8ICctJyxcbiAgICAgICAgcXVhbnRpdHk6IDEsXG4gICAgICAgIHVuaXRQcmljZTogbnVtZXJpY1ByaWNlLFxuICAgICAgICB0b3RhbFByaWNlOiBudW1lcmljUHJpY2UsXG4gICAgICAgIGRhdGU6IGRhdGVTdHJcbiAgICAgIH07XG4gICAgfSk7XG4gICAgXG4gICAgLy8gTWVyZ2UgcmVhbCBib29raW5ncyBhbmQgbW9jayBoaXN0b3JpY2FsIHRyYW5zYWN0aW9uc1xuICAgIGNvbnN0IGFsbFNhbGVzID0gWy4uLnBhcnNlZFJlYWxCb29raW5nc107XG4gICAgXG4gICAgLy8gRmlsdGVyIGJ5IGNob3NlbiB0aW1lZnJhbWUvcGVyaW9kIChDdXJyZW50IFNpbXVsYXRlZCBEYXRlOiBKdW5lIDQsIDIwMjYpXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoMjAyNiwgNSwgNCk7XG4gICAgXG4gICAgY29uc3QgZmlsdGVyZWRTYWxlcyA9IGFsbFNhbGVzLmZpbHRlcigoc2FsZSkgPT4ge1xuICAgICAgY29uc3Qgc2FsZURhdGUgPSBuZXcgRGF0ZShzYWxlLmRhdGUpO1xuICAgICAgaWYgKGlzTmFOKHNhbGVEYXRlLmdldFRpbWUoKSkpIHJldHVybiB0cnVlO1xuICAgICAgXG4gICAgICBjb25zdCBkaWZmVGltZSA9IG5vdy5nZXRUaW1lKCkgLSBzYWxlRGF0ZS5nZXRUaW1lKCk7XG4gICAgICBjb25zdCBkaWZmRGF5cyA9IGRpZmZUaW1lIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpO1xuICAgICAgXG4gICAgICBpZiAoZXhwb3J0UmFuZ2VUeXBlID09PSAndG9kYXknKSB7XG4gICAgICAgIHJldHVybiBzYWxlRGF0ZS50b0RhdGVTdHJpbmcoKSA9PT0gbm93LnRvRGF0ZVN0cmluZygpO1xuICAgICAgfVxuICAgICAgaWYgKGV4cG9ydFJhbmdlVHlwZSA9PT0gJ3dlZWsnKSB7XG4gICAgICAgIHJldHVybiBkaWZmRGF5cyA+PSAwICYmIGRpZmZEYXlzIDw9IDc7XG4gICAgICB9XG4gICAgICBpZiAoZXhwb3J0UmFuZ2VUeXBlID09PSAnbW9udGgnKSB7XG4gICAgICAgIHJldHVybiBkaWZmRGF5cyA+PSAwICYmIGRpZmZEYXlzIDw9IDMwO1xuICAgICAgfVxuICAgICAgaWYgKGV4cG9ydFJhbmdlVHlwZSA9PT0gJzNtb250aHMnKSB7XG4gICAgICAgIHJldHVybiBkaWZmRGF5cyA+PSAwICYmIGRpZmZEYXlzIDw9IDkwO1xuICAgICAgfVxuICAgICAgaWYgKGV4cG9ydFJhbmdlVHlwZSA9PT0gJzZtb250aHMnKSB7XG4gICAgICAgIHJldHVybiBkaWZmRGF5cyA+PSAwICYmIGRpZmZEYXlzIDw9IDE4MDtcbiAgICAgIH1cbiAgICAgIGlmIChleHBvcnRSYW5nZVR5cGUgPT09ICd5ZWFyJykge1xuICAgICAgICByZXR1cm4gZGlmZkRheXMgPj0gMCAmJiBkaWZmRGF5cyA8PSAzNjU7XG4gICAgICB9XG4gICAgICBpZiAoZXhwb3J0UmFuZ2VUeXBlID09PSAnY3VzdG9tJykge1xuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKGV4cG9ydFN0YXJ0RGF0ZSkuZ2V0VGltZSgpO1xuICAgICAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZShleHBvcnRFbmREYXRlKS5nZXRUaW1lKCk7XG4gICAgICAgIGNvbnN0IHNhbGVUaW1lID0gc2FsZURhdGUuZ2V0VGltZSgpO1xuICAgICAgICByZXR1cm4gc2FsZVRpbWUgPj0gc3RhcnQgJiYgc2FsZVRpbWUgPD0gZW5kO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICBpZiAoZmlsdGVyZWRTYWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGZpcmVUb2FzdChcbiAgICAgICAgbGFuZyA9PT0gJ2FyJyBcbiAgICAgICAgICA/ICfZhNinINiq2YjYrNivINmF2KjZiti52KfYqiDYo9mIINit2KzZiNiy2KfYqiDZhdiq2YjZgdix2Kkg2YHZiiDYp9mE2YbYt9in2YIg2KfZhNmF2K3Yr9ivIScgXG4gICAgICAgICAgOiAnTm8gc2FsZXMgb3IgYm9va2luZyBlbnRyaWVzIGV4aXN0IGluIHRoaXMgZHVyYXRpb24nLCBcbiAgICAgICAgJ2Vycm9yJ1xuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUcmFuc2xhdGUgaXRlbXMgdG8gYmVhdXRpZnVsIEFyYWJpYy9FbmdsaXNoIGV4Y2VsIGhlYWRlcnNcbiAgICBjb25zdCB4bHNEYXRhID0gZmlsdGVyZWRTYWxlcy5tYXAoKHNhbGUsIGluZGV4KSA9PiB7XG4gICAgICBpZiAobGFuZyA9PT0gJ2FyJykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICfZhSc6IGluZGV4ICsgMSxcbiAgICAgICAgICAn2YPZiNivINin2YTYs9mE2LnYqS/Yp9mE2K7Yr9mF2KknOiBzYWxlLmNvZGUsXG4gICAgICAgICAgJ9in2YTYp9iz2YUgLyDYp9mE2YXZiNiv2YrZhCc6IHNhbGUubmFtZSxcbiAgICAgICAgICAn2KfZhNiq2LXZhtmK2YEnOiBzYWxlLnR5cGUsXG4gICAgICAgICAgJ9in2LPZhSDYp9mE2LnZhdmK2YQnOiBzYWxlLmN1c3RvbWVyTmFtZSxcbiAgICAgICAgICAn2LHZgtmFINin2YTZh9in2KrZgSc6IHNhbGUuY3VzdG9tZXJQaG9uZSxcbiAgICAgICAgICAn2KfZhNmD2YXZitipINin2YTZhdio2KfYudipJzogc2FsZS5xdWFudGl0eSxcbiAgICAgICAgICAn2LPYudixINin2YTZiNit2K/YqSAo2Kwu2YUpJzogc2FsZS51bml0UHJpY2UsXG4gICAgICAgICAgJ9in2YTYpdis2YXYp9mE2Yog2YPZhNmKICjYrC7ZhSknOiBzYWxlLnRvdGFsUHJpY2UsXG4gICAgICAgICAgJ9iq2KfYsdmK2K4g2KfZhNin2LPYqtit2YLYp9mCL9iq2KfYsdmK2K4g2KfZhNio2YrYuSc6IHNhbGUuZGF0ZVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAnTm8nOiBpbmRleCArIDEsXG4gICAgICAgICAgJ0l0ZW0gQ29kZSc6IHNhbGUuY29kZSxcbiAgICAgICAgICAnTmFtZSAvIE1vZGVsJzogc2FsZS5uYW1lLFxuICAgICAgICAgICdDYXRlZ29yeSBUeXBlJzogc2FsZS50eXBlLFxuICAgICAgICAgICdDdXN0b21lciBOYW1lJzogc2FsZS5jdXN0b21lck5hbWUsXG4gICAgICAgICAgJ1Bob25lIFJlZmVyZW5jZSc6IHNhbGUuY3VzdG9tZXJQaG9uZSxcbiAgICAgICAgICAnUXVhbnRpdHknOiBzYWxlLnF1YW50aXR5LFxuICAgICAgICAgICdVbml0IFByaWNlIChFR1ApJzogc2FsZS51bml0UHJpY2UsXG4gICAgICAgICAgJ0FnZ3JlZ2F0ZSBUb3RhbCAoRUdQKSc6IHNhbGUudG90YWxQcmljZSxcbiAgICAgICAgICAnVHJhbnNhY3Rpb24gRGF0ZSc6IHNhbGUuZGF0ZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gR2VuZXJhdGUgU3ByZWFkc2hlZXQgd29ya3NoZWV0XG4gICAgY29uc3Qgd29ya3NoZWV0ID0gWExTWC51dGlscy5qc29uX3RvX3NoZWV0KHhsc0RhdGEpO1xuICAgIGNvbnN0IHdvcmtib29rID0gWExTWC51dGlscy5ib29rX25ldygpO1xuICAgIFhMU1gudXRpbHMuYm9va19hcHBlbmRfc2hlZXQod29ya2Jvb2ssIHdvcmtzaGVldCwgbGFuZyA9PT0gJ2FyJyA/ICfYs9is2YQg2KfZhNij2LHYqNin2K0g2YjYp9mE2YXYqNmK2LnYp9iqJyA6ICdTYWxlcyBKb3VybmFsJyk7XG4gICAgXG4gICAgWExTWC53cml0ZUZpbGUod29ya2Jvb2ssIGBFbEtob2x5X01vdG9yc19TYWxlc19SZXBvcnRfMjAyNi54bHN4YCk7XG4gICAgXG4gICAgZmlyZVRvYXN0KFxuICAgICAgbGFuZyA9PT0gJ2FyJyBcbiAgICAgICAgPyBg2KrZhSDYqtis2YXZiti5INmI2KrYtdiv2YrYsSDYp9mE2KrZgtix2YrYsSDYqNmG2KzYp9itISAoJHtmaWx0ZXJlZFNhbGVzLmxlbmd0aH0g2K3YsdmD2Kkg2KjZiti5L9it2KzYsilgIFxuICAgICAgICA6IGBTdWNjZXNzZnVsbHkgZXhwb3J0ZWQgcmVwb3J0IGNvbnRhaW5pbmcgJHtmaWx0ZXJlZFNhbGVzLmxlbmd0aH0gdHJhbnNhY3Rpb25zLmAsIFxuICAgICAgJ3N1Y2Nlc3MnXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZEJhY2t1cCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgemlwID0gbmV3IEpTWmlwKCk7XG4gICAgICBcbiAgICAgIC8vIDEuIE1vdG9yY3ljbGVzXG4gICAgICB6aXAuZmlsZShcIm1vdG9yY3ljbGVzX2JhY2t1cC5qc29uXCIsIEpTT04uc3RyaW5naWZ5KG1vdG9yY3ljbGVzLCBudWxsLCAyKSk7XG4gICAgICBcbiAgICAgIC8vIDIuIFN0b3JlIFByb2R1Y3RzXG4gICAgICB6aXAuZmlsZShcInN0b3JlX3Byb2R1Y3RzX2JhY2t1cC5qc29uXCIsIEpTT04uc3RyaW5naWZ5KHN0b3JlUHJvZHVjdHMgfHwgW10sIG51bGwsIDIpKTtcbiAgICAgIFxuICAgICAgLy8gMy4gQ3VzdG9tIFRleHRcbiAgICAgIHppcC5maWxlKFwiY3VzdG9tX3RleHRfYmFja3VwLmpzb25cIiwgSlNPTi5zdHJpbmdpZnkoY3VzdG9tVGV4dCB8fCB7fSwgbnVsbCwgMikpO1xuICAgICAgXG4gICAgICAvLyA0LiBIb21lcGFnZSBDb25maWdcbiAgICAgIHppcC5maWxlKFwiaG9tZXBhZ2VfY29uZmlnX2JhY2t1cC5qc29uXCIsIEpTT04uc3RyaW5naWZ5KGJ1aWxkZXJDb25maWcgfHwgREVGQVVMVF9IT01FUEFHRV9DT05GSUcsIG51bGwsIDIpKTtcbiAgICAgIFxuICAgICAgLy8gNS4gQm9va2luZ3NcbiAgICAgIHppcC5maWxlKFwiYm9va2luZ3NfYmFja3VwLmpzb25cIiwgSlNPTi5zdHJpbmdpZnkoYm9va2luZ3MgfHwgW10sIG51bGwsIDIpKTtcbiAgICAgIFxuICAgICAgLy8gNi4gVXNlcnNcbiAgICAgIHppcC5maWxlKFwidXNlcnNfYmFja3VwLmpzb25cIiwgSlNPTi5zdHJpbmdpZnkodXNlcnMgfHwgW10sIG51bGwsIDIpKTtcbiAgICAgIFxuICAgICAgLy8gTWV0YWRhdGEvUmVhZG1lXG4gICAgICB6aXAuZmlsZShcIlJFQURNRV9CQUNLVVAudHh0XCIsIGBFTEtIT0xZIE1PVE9SUyBDT01QTEVURSBTWVNURU0gQkFDS1VQXG5HZW5lcmF0ZWQ6ICR7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfVxuVGltZXN0YW1wOiAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX1cblxuVGhpcyBaSVAgZmlsZSBjb250YWlucyBjb21wbGV0ZSBzeXN0ZW0gZmlsZXMgYW5kIGRhdGFiYXNlIGNvbmZpZ3VyYXRpb25zIChNb3RvcmN5Y2xlcywgU3RvcmUgcHJvZHVjdHMsIEN1c3RvbWl6ZSBsYXlvdXRzLCByZXNlcnZhdGlvbnMsIGFuZCBhZG1pbiBhY2NvdW50cykuIFxuRG8gTk9UIGVkaXQgb3IgcmVuYW1lIHRoZSBqc29uIGZpbGVzIGluc2lkZSB0aGlzIGFyY2hpdmUgdG8gZW5zdXJlIGZsYXdsZXNzIHN5bmNocm9uaXphdGlvbiB3aGVuIHJlc3RvcmluZyBpbiB0aGUgZnV0dXJlLmApO1xuXG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgemlwLmdlbmVyYXRlQXN5bmMoeyB0eXBlOiBcImJsb2JcIiB9KTtcbiAgICAgIGNvbnN0IGRsVVJMID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoY29udGVudCk7XG4gICAgICBjb25zdCB0ZW1wTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgdGVtcExpbmsuaHJlZiA9IGRsVVJMO1xuICAgICAgdGVtcExpbmsuZG93bmxvYWQgPSBgZWxraG9seV9zaXRlX2JhY2t1cF8ke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCl9LnppcGA7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRlbXBMaW5rKTtcbiAgICAgIHRlbXBMaW5rLmNsaWNrKCk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRlbXBMaW5rKTtcbiAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGRsVVJMKTtcblxuICAgICAgZmlyZVRvYXN0KFxuICAgICAgICBsYW5nID09PSAnYXInXG4gICAgICAgICAgPyAn2KrZhSDYpdmG2LTYp9ihINmG2LPYrtipINin2K3YqtmK2KfYt9mK2Kkg2YPYp9mF2YTYqSDZhNmE2YXZiNmC2Lkg2YjYqtit2YXZitmE2YfYpyDZg9mF2YTZgSDZhdi22LrZiNi3INio2YbYrNin2K0hIPCfk6YnXG4gICAgICAgICAgOiAnQ29tcGxldGUgc2l0ZSBiYWNrdXAgZ2VuZXJhdGVkIGFuZCBkb3dubG9hZGVkIHN1Y2Nlc3NmdWxseSEg8J+TpicsXG4gICAgICAgICdzdWNjZXNzJ1xuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJCYWNrdXAgZ2VuZXJhdGlvbiBmYWlsZWQ6XCIsIGVycik7XG4gICAgICBmaXJlVG9hc3QoXG4gICAgICAgIGxhbmcgPT09ICdhcicgPyAn2YHYtNmEINil2YbYtNin2KEg2YXZhNmBINin2YTZhtiz2K7YqSDYp9mE2KfYrdiq2YrYp9i32YrYqSEnIDogJ0ZhaWxlZCB0byBnZW5lcmF0ZSBhcmNoaXZlIGJhY2t1cCEnLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZXN0b3JlQmFja3VwID0gYXN5bmMgKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgaWYgKCFmaWxlKSByZXR1cm47XG5cbiAgICBpZiAoc2Vzc2lvblVzZXI/LnJvbGUgIT09ICdBZG1pbicpIHtcbiAgICAgIGZpcmVUb2FzdChcbiAgICAgICAgbGFuZyA9PT0gJ2FyJyA/ICfYudiw2LHYp9mLISDYp9mE2LXZhNin2K3ZitipINi62YrYsSDZg9in2YHZitipINmE2LnZhdmEINin2LPYqti52KfYr9ipINmE2YTZhdmI2YLYuS4nIDogJ1ByaXZpbGVnZSBCcmVhY2g6IE9ubHkgTWFzdGVyIEFkbWluaXN0cmF0b3JzIGNhbiByZXN0b3JlIGJhY2t1cCBhcmNoaXZlcycsXG4gICAgICAgICdlcnJvcidcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25sb2FkID0gYXN5bmMgKGV2dCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYnVmZmVyID0gZXZ0LnRhcmdldD8ucmVzdWx0IGFzIEFycmF5QnVmZmVyO1xuICAgICAgICBjb25zdCB6aXAgPSBhd2FpdCBKU1ppcC5sb2FkQXN5bmMoYnVmZmVyKTtcblxuICAgICAgICAvLyBUcmFjayB3aGF0IHdlIHJlY292ZXJlZFxuICAgICAgICBsZXQgcmVzdG9yZWRDb3VudCA9IDA7XG5cbiAgICAgICAgLy8gMS4gTW90b3JjeWNsZXNcbiAgICAgICAgY29uc3QgYmlrZXNGaWxlID0gemlwLmZpbGUoXCJtb3RvcmN5Y2xlc19iYWNrdXAuanNvblwiKTtcbiAgICAgICAgaWYgKGJpa2VzRmlsZSkge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBiaWtlc0ZpbGUuYXN5bmMoXCJzdHJpbmdcIik7XG4gICAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJzZWQpKSB7XG4gICAgICAgICAgICBvblVwZGF0ZU1vdG9yY3ljbGVzKHBhcnNlZCk7XG4gICAgICAgICAgICByZXN0b3JlZENvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gMi4gU3RvcmUgcHJvZHVjdHNcbiAgICAgICAgY29uc3QgcHJvZHVjdHNGaWxlID0gemlwLmZpbGUoXCJzdG9yZV9wcm9kdWN0c19iYWNrdXAuanNvblwiKTtcbiAgICAgICAgaWYgKHByb2R1Y3RzRmlsZSAmJiBvblVwZGF0ZVN0b3JlUHJvZHVjdHMpIHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgcHJvZHVjdHNGaWxlLmFzeW5jKFwic3RyaW5nXCIpO1xuICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyc2VkKSkge1xuICAgICAgICAgICAgb25VcGRhdGVTdG9yZVByb2R1Y3RzKHBhcnNlZCk7XG4gICAgICAgICAgICByZXN0b3JlZENvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gMy4gQ3VzdG9tIHRyYW5zbGF0aW9uIHNldHRpbmdzXG4gICAgICAgIGNvbnN0IHRleHRGaWxlID0gemlwLmZpbGUoXCJjdXN0b21fdGV4dF9iYWNrdXAuanNvblwiKTtcbiAgICAgICAgaWYgKHRleHRGaWxlKSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRleHRGaWxlLmFzeW5jKFwic3RyaW5nXCIpO1xuICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICAgICAgb25VcGRhdGVDdXN0b21UZXh0KHBhcnNlZCk7XG4gICAgICAgICAgcmVzdG9yZWRDb3VudCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gNC4gSG9tZXBhZ2UgY29uZmlnXG4gICAgICAgIGNvbnN0IGNvbmZpZ0ZpbGUgPSB6aXAuZmlsZShcImhvbWVwYWdlX2NvbmZpZ19iYWNrdXAuanNvblwiKTtcbiAgICAgICAgaWYgKGNvbmZpZ0ZpbGUpIHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgY29uZmlnRmlsZS5hc3luYyhcInN0cmluZ1wiKTtcbiAgICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgICAgICAgIHNldEJ1aWxkZXJDb25maWcocGFyc2VkKTtcbiAgICAgICAgICBvblVwZGF0ZUhvbWVwYWdlQ29uZmlnKHBhcnNlZCk7XG4gICAgICAgICAgcmVzdG9yZWRDb3VudCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gNS4gQm9va2luZ3NcbiAgICAgICAgY29uc3QgYm9va2luZ3NGaWxlID0gemlwLmZpbGUoXCJib29raW5nc19iYWNrdXAuanNvblwiKTtcbiAgICAgICAgaWYgKGJvb2tpbmdzRmlsZSkge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBib29raW5nc0ZpbGUuYXN5bmMoXCJzdHJpbmdcIik7XG4gICAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJzZWQpKSB7XG4gICAgICAgICAgICBzZXRCb29raW5ncyhwYXJzZWQpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfYm9va2luZ3MnLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgICAgICAgICAgIHJlc3RvcmVkQ291bnQrKztcblxuICAgICAgICAgICAgLy8gQ2xvdWQgRmlyZXN0b3JlIFN5bmMgKG9wdGlvbmFsL2dyYWNlZnVsKVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBiIG9mIHBhcnNlZCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHNldERvYyhkb2MoZGIsICdib29raW5ncycsIGIuaWQpLCBiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBzeW5jIHJlc3RvcmVkIGJvb2tpbmdzIHRvIEZpcmVzdG9yZTpcIiwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gNi4gVXNlcnMgYWNjb3VudHNcbiAgICAgICAgY29uc3QgdXNlcnNGaWxlID0gemlwLmZpbGUoXCJ1c2Vyc19iYWNrdXAuanNvblwiKTtcbiAgICAgICAgaWYgKHVzZXJzRmlsZSkge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB1c2Vyc0ZpbGUuYXN5bmMoXCJzdHJpbmdcIik7XG4gICAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJzZWQpKSB7XG4gICAgICAgICAgICBzZXRVc2VycyhwYXJzZWQpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfdXNlcnMnLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgICAgICAgICAgIHJlc3RvcmVkQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdG9yZWRDb3VudCA+IDApIHtcbiAgICAgICAgICBmaXJlVG9hc3QoXG4gICAgICAgICAgICBsYW5nID09PSAnYXInXG4gICAgICAgICAgICAgID8gJ9iq2YXYqiDYp9iz2KrYudin2K/YqSDYp9mE2YbYs9iu2Kkg2KfZhNin2K3YqtmK2KfYt9mK2Kkg2YjYqti32KjZitmC2YfYpyDYudmE2Ykg2K7ZiNin2K/ZhSDYp9mE2YXZiNmC2Lkg2KjZhtis2KfYrSEg8J+agPCflIQnXG4gICAgICAgICAgICAgIDogJ1Jlc3RvcmUgc2VxdWVuY2Ugc3VjY2Vzc2Z1bCEgQWxsIGRhdGFiYXNlcyB1cGRhdGVkIGluIHJlYWwtdGltZS4g8J+agPCflIQnLFxuICAgICAgICAgICAgJ3N1Y2Nlc3MnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaXJlVG9hc3QoXG4gICAgICAgICAgICBsYW5nID09PSAnYXInXG4gICAgICAgICAgICAgID8gJ9mE2YUg2YrYqtmFINin2YTYudir2YjYsSDYudmE2Ykg2YXZhNmB2KfYqiDYp9it2KrZitin2LfZitipINi12KfZhNit2Kkg2K/Yp9iu2YQg2KfZhNij2LHYtNmK2YEg2KfZhNmF2LbYutmI2LchJ1xuICAgICAgICAgICAgICA6ICdTZWxlY3RlZCBaSVAgZG9lcyBub3QgY29udGFpbiBjb21wbGlhbnQgRWxLaG9seSBKU09OIGRhdGFiYXNlIGJhY2t1cHMhJyxcbiAgICAgICAgICAgICdlcnJvcidcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVzZXQgaW5wdXQgZWxlbWVudFxuICAgICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXN0b3JlIGZhaWxlZDpcIiwgZXJyKTtcbiAgICAgICAgZmlyZVRvYXN0KFxuICAgICAgICAgIGxhbmcgPT09ICdhcidcbiAgICAgICAgICAgID8gJ9iu2LfYoyDYutmK2LEg2YXYqtmI2YLYuSDYo9ir2YbYp9ihINin2LPYqtiu2LHYp9isINin2YTZhtiz2K7YqSDYp9mE2KfYrdiq2YrYp9i32YrYqSEnXG4gICAgICAgICAgICA6ICdVbnJlY29nbml6ZWQgc3RydWN0dXJlISBVbnppcCBvcGVyYXRpb24gdGVybWluYXRlZCB1bmV4cGVjdGVkbHkuJyxcbiAgICAgICAgICAnZXJyb3InXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlKTtcbiAgfTtcblxuICBjb25zdCBnZW5lcmF0ZVVuaWZpZWRCYWNrdXBEYXRhID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBcImVsa2hvbHlfYmFja3VwX2pzb25cIixcbiAgICAgIHZlcnNpb246IFwiMS4wXCIsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIG1vdG9yY3ljbGVzOiBtb3RvcmN5Y2xlcyB8fCBbXSxcbiAgICAgIHN0b3JlUHJvZHVjdHM6IHN0b3JlUHJvZHVjdHMgfHwgW10sXG4gICAgICBjdXN0b21UZXh0OiBjdXN0b21UZXh0IHx8IHt9LFxuICAgICAgaG9tZXBhZ2VDb25maWc6IGJ1aWxkZXJDb25maWcgfHwgREVGQVVMVF9IT01FUEFHRV9DT05GSUcsXG4gICAgICBib29raW5nczogYm9va2luZ3MgfHwgW10sXG4gICAgICB1c2VyczogdXNlcnMgfHwgW11cbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IGFwcGx5VW5pZmllZEJhY2t1cERhdGEgPSAoZGF0YTogYW55KSA9PiB7XG4gICAgaWYgKCFkYXRhIHx8IGRhdGEudHlwZSAhPT0gXCJlbGtob2x5X2JhY2t1cF9qc29uXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYmFja3VwIGZvcm1hdFwiKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdG9yZWRDb3VudCA9IDA7XG5cbiAgICAvLyAxLiBNb3RvcmN5Y2xlc1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEubW90b3JjeWNsZXMpKSB7XG4gICAgICBvblVwZGF0ZU1vdG9yY3ljbGVzKGRhdGEubW90b3JjeWNsZXMpO1xuICAgICAgcmVzdG9yZWRDb3VudCsrO1xuICAgIH1cblxuICAgIC8vIDIuIFN0b3JlIFByb2R1Y3RzXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YS5zdG9yZVByb2R1Y3RzKSAmJiBvblVwZGF0ZVN0b3JlUHJvZHVjdHMpIHtcbiAgICAgIG9uVXBkYXRlU3RvcmVQcm9kdWN0cyhkYXRhLnN0b3JlUHJvZHVjdHMpO1xuICAgICAgcmVzdG9yZWRDb3VudCsrO1xuICAgIH1cblxuICAgIC8vIDMuIEN1c3RvbSBUZXh0XG4gICAgaWYgKGRhdGEuY3VzdG9tVGV4dCkge1xuICAgICAgb25VcGRhdGVDdXN0b21UZXh0KGRhdGEuY3VzdG9tVGV4dCk7XG4gICAgICByZXN0b3JlZENvdW50Kys7XG4gICAgfVxuXG4gICAgLy8gNC4gSG9tZXBhZ2UgQ29uZmlnXG4gICAgaWYgKGRhdGEuaG9tZXBhZ2VDb25maWcpIHtcbiAgICAgIHNldEJ1aWxkZXJDb25maWcoZGF0YS5ob21lcGFnZUNvbmZpZyk7XG4gICAgICBvblVwZGF0ZUhvbWVwYWdlQ29uZmlnKGRhdGEuaG9tZXBhZ2VDb25maWcpO1xuICAgICAgcmVzdG9yZWRDb3VudCsrO1xuICAgIH1cblxuICAgIC8vIDUuIEJvb2tpbmdzXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YS5ib29raW5ncykpIHtcbiAgICAgIHNldEJvb2tpbmdzKGRhdGEuYm9va2luZ3MpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfYm9va2luZ3MnLCBKU09OLnN0cmluZ2lmeShkYXRhLmJvb2tpbmdzKSk7XG4gICAgICByZXN0b3JlZENvdW50Kys7XG4gICAgICAvLyBTeW5jIHRvIGZpcmVzdG9yZSBnZW50bHlcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEuYm9va2luZ3MuZm9yRWFjaCgoYjogYW55KSA9PiB7XG4gICAgICAgICAgc2V0RG9jKGRvYyhkYiwgJ2Jvb2tpbmdzJywgYi5pZCksIGIpLmNhdGNoKGVyciA9PiBjb25zb2xlLndhcm4oXCJTeW5jIGZhaWxlZCBmb3IgYm9va2luZ1wiLCBiLmlkKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBzeW5jIHJlc3RvcmVkIGJvb2tpbmdzIHRvIEZpcmVzdG9yZTpcIiwgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyA2LiBVc2Vyc1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEudXNlcnMpKSB7XG4gICAgICBzZXRVc2VycyhkYXRhLnVzZXJzKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X3VzZXJzJywgSlNPTi5zdHJpbmdpZnkoZGF0YS51c2VycykpO1xuICAgICAgcmVzdG9yZWRDb3VudCsrO1xuICAgIH1cblxuICAgIHJldHVybiByZXN0b3JlZENvdW50O1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUV4cG9ydFRvR2l0SHViID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghZ2l0aHViVG9rZW4udHJpbSgpKSB7XG4gICAgICBmaXJlVG9hc3QoXG4gICAgICAgIGxhbmcgPT09ICdhcicgPyAn2YrYsdis2Ykg2KXYr9iu2KfZhCDYsdmF2LIg2KfZhNmI2LXZiNmEINin2YTYtNiu2LXZiiAoVG9rZW4pINmE2K3Ys9in2KggR2l0SHViJyA6ICdQbGVhc2UgcHJvdmlkZSBhIEdpdEh1YiBQZXJzb25hbCBBY2Nlc3MgVG9rZW4nLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWdpdGh1YlJlcG8udHJpbSgpIHx8ICFnaXRodWJSZXBvLmluY2x1ZGVzKCcvJykpIHtcbiAgICAgIGZpcmVUb2FzdChcbiAgICAgICAgbGFuZyA9PT0gJ2FyJyA/ICfZitix2KzZiSDYpdiv2K7Yp9mEINmF2LPYp9ixINin2YTZhdiz2KrZiNiv2Lkg2KjYp9mE2LTZg9mEINin2YTYtdit2YrYrSAodXNlcm5hbWUvcmVwbyknIDogJ0ludmFsaWQgcmVwb3NpdG9yeSBwYXRoLiBVc2UgZm9ybWF0OiB1c2VybmFtZS9yZXBvLW5hbWUnLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldElzR2l0aHViRXhwb3J0aW5nKHRydWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJhY2t1cERhdGEgPSBnZW5lcmF0ZVVuaWZpZWRCYWNrdXBEYXRhKCk7XG4gICAgICBjb25zdCBjb250ZW50U3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoYmFja3VwRGF0YSwgbnVsbCwgMik7XG4gICAgICBcbiAgICAgIC8vIFdlIG11c3QgZW5jb2RlIHRoZSBjb250ZW50IHRvIFVURi04IEJhc2U2NC5cbiAgICAgIC8vIGJ0b2Egd2l0aCB1bmVzY2FwZSBoYW5kbGVzIG11bHRpLWJ5dGUgKEFyYWJpYykgY2hhcmFjdGVycyBjb3JyZWN0bHkhXG4gICAgICBjb25zdCBjb250ZW50QmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoY29udGVudFN0cmluZykpKTtcblxuICAgICAgY29uc3QgY2xlYW5SZXBvID0gZ2l0aHViUmVwby50cmltKCk7XG4gICAgICBjb25zdCBjbGVhbkJyYW5jaCA9IGdpdGh1YkJyYW5jaC50cmltKCkgfHwgJ21haW4nO1xuICAgICAgY29uc3QgY2xlYW5QYXRoID0gZ2l0aHViUGF0aC50cmltKCkgfHwgJ2Vsa2hvbHlfYmFja3VwLmpzb24nO1xuXG4gICAgICAvLyAxLiBDaGVjayBpZiB0aGUgZmlsZSBhbHJlYWR5IGV4aXN0cyB0byBnZXQgaXRzIFNIQVxuICAgICAgbGV0IGZpbGVTaGE6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY2hlY2tSZXMgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgICBgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8ke2NsZWFuUmVwb30vY29udGVudHMvJHtjbGVhblBhdGh9P3JlZj0ke2NsZWFuQnJhbmNofWAsXG4gICAgICAgICAge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGB0b2tlbiAke2dpdGh1YlRva2VuLnRyaW0oKX1gLFxuICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL3ZuZC5naXRodWIudjMranNvbidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGlmIChjaGVja1Jlcy5vaykge1xuICAgICAgICAgIGNvbnN0IGNoZWNrRGF0YSA9IGF3YWl0IGNoZWNrUmVzLmpzb24oKTtcbiAgICAgICAgICBmaWxlU2hhID0gY2hlY2tEYXRhLnNoYTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSBkb2VzIG5vdCBleGlzdCB5ZXQgb3IgZXJyb3IgZ2V0dGluZyBTSEEsIHByb2NlZWRpbmcgd2l0aG91dCBTSEE6XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIC8vIDIuIFBlcmZvcm0gdGhlIFBVVCByZXF1ZXN0XG4gICAgICBjb25zdCBwdXRCb2R5OiBhbnkgPSB7XG4gICAgICAgIG1lc3NhZ2U6IGBFbEtob2x5IE1vdG9ycyBhdXRvbWF0aWMgc3lzdGVtIGJhY2t1cCAtICR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfWAsXG4gICAgICAgIGNvbnRlbnQ6IGNvbnRlbnRCYXNlNjQsXG4gICAgICAgIGJyYW5jaDogY2xlYW5CcmFuY2hcbiAgICAgIH07XG4gICAgICBpZiAoZmlsZVNoYSkge1xuICAgICAgICBwdXRCb2R5LnNoYSA9IGZpbGVTaGE7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHB1dFJlcyA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8ke2NsZWFuUmVwb30vY29udGVudHMvJHtjbGVhblBhdGh9YCxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgdG9rZW4gJHtnaXRodWJUb2tlbi50cmltKCl9YCxcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vdm5kLmdpdGh1Yi52Mytqc29uJyxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHB1dEJvZHkpXG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIGlmIChwdXRSZXMub2spIHtcbiAgICAgICAgLy8gU2F2ZSBjb25maWcgaW4gbG9jYWxTdG9yYWdlXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X2dpdGh1Yl90b2tlbicsIGdpdGh1YlRva2VuLnRyaW0oKSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X2dpdGh1Yl9yZXBvJywgY2xlYW5SZXBvKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfZ2l0aHViX2JyYW5jaCcsIGNsZWFuQnJhbmNoKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfZ2l0aHViX3BhdGgnLCBjbGVhblBhdGgpO1xuXG4gICAgICAgIGZpcmVUb2FzdChcbiAgICAgICAgICBsYW5nID09PSAnYXInXG4gICAgICAgICAgICA/ICfYqtmFINiq2LXYr9mK2LEg2KfZhNmG2LPYrtipINin2YTYp9it2KrZitin2LfZitipINio2YbYrNin2K0g2KXZhNmJINmF2LPYqtmI2K/YuSBHaXRIdWIhIPCfmoDwn5OCJ1xuICAgICAgICAgICAgOiAnT3BlcmF0aW9uYWwgY2F0YWxvZyBkYXRhIHB1c2hlZCBzdWNjZXNzZnVsbHkgdG8gR2l0SHViIHJlcG9zaXRvcnkhIPCfmoDwn5OCJyxcbiAgICAgICAgICAnc3VjY2VzcydcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVyckpzb24gPSBhd2FpdCBwdXRSZXMuanNvbigpLmNhdGNoKCgpID0+ICh7IG1lc3NhZ2U6ICdVbmtub3duIGVycm9yJyB9KSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJKc29uLm1lc3NhZ2UgfHwgYEhUVFAgJHtwdXRSZXMuc3RhdHVzfWApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiR2l0SHViIEV4cG9ydCBGYWlsZWQ6XCIsIGVycik7XG4gICAgICBmaXJlVG9hc3QoXG4gICAgICAgIGxhbmcgPT09ICdhcidcbiAgICAgICAgICA/IGDYudiw2LHYp9mL2Iwg2YHYtNmEINin2YTYqti12K/ZitixINmE2YAgR2l0SHViOiAke2Vyci5tZXNzYWdlIHx8ICfYqtij2YPYryDZhdmGINin2YTYsdmF2LIg2YjYtdit2Kkg2KfZhNmF2LPYqtmI2K/YuSd9YFxuICAgICAgICAgIDogYEdpdEh1YiBjb25uZWN0aW9uIHRlcm1pbmF0aW9uOiAke2Vyci5tZXNzYWdlIHx8ICdJbnZhbGlkIFBBVC9SZXBvIFBlcm1pc3Npb25zJ31gLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0dpdGh1YkV4cG9ydGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUltcG9ydEJ5VXJsID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghZ2l0aHViSW1wb3J0VXJsLnRyaW0oKSkge1xuICAgICAgZmlyZVRvYXN0KFxuICAgICAgICBsYW5nID09PSAnYXInID8gJ9mK2LHYrNmJINil2K/Yrtin2YQg2LHYp9io2Lcg2YXZhNmBINin2YTZhtiz2K7YqSDYp9mE2KfYrdiq2YrYp9i32YrYqSDYp9mE2YXYqNin2LTYsScgOiAnUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBkaXJlY3QgYmFja3VwIFVSTCcsXG4gICAgICAgICdlcnJvcidcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHNlc3Npb25Vc2VyPy5yb2xlICE9PSAnQWRtaW4nKSB7XG4gICAgICBmaXJlVG9hc3QoXG4gICAgICAgIGxhbmcgPT09ICdhcicgPyAn2LnYsNix2KfZiyEg2KfZhNi12YTYp9it2YrYqSDYutmK2LEg2YPYp9mB2YrYqSDZhNi52YXZhCDYp9iz2KrYudin2K/YqSDZhNmE2YXZiNmC2LkuJyA6ICdQcml2aWxlZ2UgQnJlYWNoOiBPbmx5IE1hc3RlciBBZG1pbmlzdHJhdG9ycyBjYW4gcmVzdG9yZSBiYWNrdXAgYXJjaGl2ZXMnLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldElzR2l0aHViSW1wb3J0aW5nKHRydWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIERpcmVjdCByYXcgbGluayByZXNvbHZlcjogaWYgZ2l0aHViLmNvbSBpcyBwcm92aWRlZCBidXQgbm90IHJhdy5naXRodWJ1c2VyY29udGVudC5jb20sIHRyeSB0byBmcmllbmRseSBjb252ZXJ0IGl0IVxuICAgICAgbGV0IHJlc29sdmVkVXJsID0gZ2l0aHViSW1wb3J0VXJsLnRyaW0oKTtcbiAgICAgIGlmIChyZXNvbHZlZFVybC5pbmNsdWRlcygnZ2l0aHViLmNvbScpICYmICFyZXNvbHZlZFVybC5pbmNsdWRlcygncmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbScpICYmIHJlc29sdmVkVXJsLmluY2x1ZGVzKCcvYmxvYi8nKSkge1xuICAgICAgICByZXNvbHZlZFVybCA9IHJlc29sdmVkVXJsXG4gICAgICAgICAgLnJlcGxhY2UoJ2dpdGh1Yi5jb20nLCAncmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbScpXG4gICAgICAgICAgLnJlcGxhY2UoJy9ibG9iLycsICcvJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHJlc29sdmVkVXJsKTtcbiAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoIGZpbGUgKEhUVFAgJHtyZXMuc3RhdHVzfSlgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmFja3VwRGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgICBjb25zdCBjb3VudCA9IGFwcGx5VW5pZmllZEJhY2t1cERhdGEoYmFja3VwRGF0YSk7XG5cbiAgICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgICAgZmlyZVRvYXN0KFxuICAgICAgICAgIGxhbmcgPT09ICdhcidcbiAgICAgICAgICAgID8gJ9iq2YUg2KzZhNioINmI2KfYs9iq2LnYp9iv2Kkg2KfZhNio2YrYp9mG2KfYqiDZhdmGINin2YTYsdin2KjYtyDYqNmG2KzYp9itISDwn5qA8J+UhCdcbiAgICAgICAgICAgIDogJ0RhdGEgaW1wb3J0ZWQgYW5kIHN5c3RlbSBtb2R1bGVzIHN5bmNocm9uaXplZCBmcm9tIHJlbW90ZSBVUkwhIPCfmoDwn5SEJyxcbiAgICAgICAgICAnc3VjY2VzcydcbiAgICAgICAgKTtcbiAgICAgICAgc2V0R2l0aHViSW1wb3J0VXJsKCcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGNvbXBhdGlibGUgdGFibGVzIHJlc3RvcmVkXCIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiUmVtb3RlIEltcG9ydCBGYWlsZWQ6XCIsIGVycik7XG4gICAgICBmaXJlVG9hc3QoXG4gICAgICAgIGxhbmcgPT09ICdhcidcbiAgICAgICAgICA/IGDYudiw2LHYp9mL2Iwg2YHYtNmEINis2YTYqCDYp9mE2KjZitin2YbYp9iqOiAke2Vyci5tZXNzYWdlIHx8ICfYqtij2YPYryDZhdmGINi12YTYp9it2YrYqSDYp9mE2LHYp9io2Lcg2YjZhdmE2YEg2KfZhNmAIEpTT04nfWBcbiAgICAgICAgICA6IGBJbXBvcnQgZmFpbGVkOiAke2Vyci5tZXNzYWdlIHx8ICdFbnN1cmUgVVJMIHBvaW50cyB0byBhIHB1YmxpYywgdmFsaWQgYmFja3VwIEpTT04nfWAsXG4gICAgICAgICdlcnJvcidcbiAgICAgICk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzR2l0aHViSW1wb3J0aW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUHVzaEVudGlyZVByb2plY3RUb0dpdEh1YiA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWdpdGh1YlRva2VuLnRyaW0oKSkge1xuICAgICAgZmlyZVRvYXN0KFxuICAgICAgICBsYW5nID09PSAnYXInID8gJ9mK2LHYrNmJINil2K/Yrtin2YQg2LHZhdiyINin2YTZiNi12YjZhCDYp9mE2LTYrti12YogKFRva2VuKSDZhNit2LPYp9ioIEdpdEh1YicgOiAnUGxlYXNlIHByb3ZpZGUgYSBHaXRIdWIgUGVyc29uYWwgQWNjZXNzIFRva2VuJyxcbiAgICAgICAgJ2Vycm9yJ1xuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFnaXRodWJSZXBvLnRyaW0oKSB8fCAhZ2l0aHViUmVwby5pbmNsdWRlcygnLycpKSB7XG4gICAgICBmaXJlVG9hc3QoXG4gICAgICAgIGxhbmcgPT09ICdhcicgPyAn2YrYsdis2Ykg2KXYr9iu2KfZhCDZhdiz2KfYsSDYp9mE2YXYs9iq2YjYr9i5INio2KfZhNi02YPZhCDYp9mE2LXYrdmK2K0gKHVzZXJuYW1lL3JlcG8pJyA6ICdJbnZhbGlkIHJlcG9zaXRvcnkgcGF0aC4gVXNlIGZvcm1hdDogdXNlcm5hbWUvcmVwby1uYW1lJyxcbiAgICAgICAgJ2Vycm9yJ1xuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRJc1B1c2hpbmdQcm9qZWN0KHRydWUpO1xuICAgIHNldFByb2plY3RQdXNoU3RlcChsYW5nID09PSAnYXInID8gJ9in2YTYqNiv2KEg2YjYqtis2YfZitiyINin2YTYrdiy2YUuLi4nIDogJ0luaXRpYWxpemluZyBwYWNrYWdlIGRhdGEuLi4nKTtcblxuICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICAnQXV0aG9yaXphdGlvbic6IGB0b2tlbiAke2dpdGh1YlRva2VuLnRyaW0oKX1gLFxuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi92bmQuZ2l0aHViLnYzK2pzb24nLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgIH07XG5cbiAgICBjb25zdCBjbGVhblJlcG8gPSBnaXRodWJSZXBvLnRyaW0oKTtcbiAgICBjb25zdCBjbGVhbkJyYW5jaCA9IGdpdGh1YkJyYW5jaC50cmltKCkgfHwgJ21haW4nO1xuXG4gICAgLy8gT2ZmbGluZSBkZWZpbml0aW9ucyB0byBwcmV2ZW50IFZpdGUgRlMgYWxsb3dsaXN0IHdhcm5pbmcgbm9pc2Ugb24gY29uZmlnIGZpbGVzXG4gICAgY29uc3Qgc3RhdGljQ29uZmlnczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAgICdwYWNrYWdlLmpzb24nOiBge1xuICBcIm5hbWVcIjogXCJyZWFjdC1leGFtcGxlXCIsXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxuICBcInZlcnNpb25cIjogXCIwLjAuMFwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGUgLS1wb3J0PTMwMDAgLS1ob3N0PTAuMC4wLjBcIixcbiAgICBcImJ1aWxkXCI6IFwidml0ZSBidWlsZFwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwiY2xlYW5cIjogXCJybSAtcmYgZGlzdCBzZXJ2ZXIuanNcIixcbiAgICBcImxpbnRcIjogXCJ0c2MgLS1ub0VtaXRcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAZ29vZ2xlL2dlbmFpXCI6IFwiXjIuNC4wXCIsXG4gICAgXCJAdGFpbHdpbmRjc3Mvdml0ZVwiOiBcIl40LjEuMTRcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI6IFwiXjUuMC40XCIsXG4gICAgXCJkb3RlbnZcIjogXCJeMTcuMi4zXCIsXG4gICAgXCJleHByZXNzXCI6IFwiXjQuMjEuMlwiLFxuICAgIFwiZmlyZWJhc2VcIjogXCJeMTIuMTQuMFwiLFxuICAgIFwianN6aXBcIjogXCJeMy4xMC4xXCIsXG4gICAgXCJsdWNpZGUtcmVhY3RcIjogXCJeMC41NDYuMFwiLFxuICAgIFwibW90aW9uXCI6IFwiXjEyLjIzLjI0XCIsXG4gICAgXCJxcmNvZGVcIjogXCJeMS41LjRcIixcbiAgICBcInFyY29kZS5yZWFjdFwiOiBcIl40LjIuMFwiLFxuICAgIFwicmVhY3RcIjogXCJeMTkuMC4xXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTkuMC4xXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjYuMi4zXCIsXG4gICAgXCJ4bHN4XCI6IFwiXjAuMTguNVwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB0eXBlcy9leHByZXNzXCI6IFwiXjQuMTcuMjFcIixcbiAgICBcIkB0eXBlcy9qc3ppcFwiOiBcIl4zLjQuMFwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjIuMTQuMFwiLFxuICAgIFwiQHR5cGVzL3FyY29kZVwiOiBcIl4xLjUuNlwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMjFcIixcbiAgICBcImVzYnVpbGRcIjogXCJeMC4yNS4wXCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl40LjEuMTRcIixcbiAgICBcInRzeFwiOiBcIl40LjIxLjBcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJ+NS44LjJcIixcbiAgICBcInZpdGVcIjogXCJeNi4yLjNcIlxuICB9XG59YCxcbiAgICAgICd0c2NvbmZpZy5qc29uJzogYHtcbiAgXCJjb21waWxlck9wdGlvbnNcIjoge1xuICAgIFwidGFyZ2V0XCI6IFwiRVMyMDIyXCIsXG4gICAgXCJleHBlcmltZW50YWxEZWNvcmF0b3JzXCI6IHRydWUsXG4gICAgXCJ1c2VEZWZpbmVGb3JDbGFzc0ZpZWxkc1wiOiBmYWxzZSxcbiAgICBcIm1vZHVsZVwiOiBcIkVTTmV4dFwiLFxuICAgIFwibGliXCI6IFtcbiAgICAgIFwiRVMyMDIyXCIsXG4gICAgICBcIkRPTVwiLFxuICAgICAgXCJET00uSXRlcmFibGVcIlxuICAgIF0sXG4gICAgXCJza2lwTGliQ2hlY2tcIjogdHJ1ZSxcbiAgICBcIm1vZHVsZVJlc29sdXRpb25cIjogXCJidW5kbGVyXCIsXG4gICAgXCJpc29sYXRlZE1vZHVsZXNcIjogdHJ1ZSxcbiAgICBcIm1vZHVsZURldGVjdGlvblwiOiBcImZvcmNlXCIsXG4gICAgXCJhbGxvd0pzXCI6IHRydWUsXG4gICAgXCJqc3hcIjogXCJyZWFjdC1qc3hcIixcbiAgICBcInBhdGhzXCI6IHtcbiAgICAgIFwiQC8qXCI6IFtcbiAgICAgICAgXCIuLypcIlxuICAgICAgXVxuICAgIH0sXG4gICAgXCJhbGxvd0ltcG9ydGluZ1RzRXh0ZW5zaW9uc1wiOiB0cnVlLFxuICAgIFwibm9FbWl0XCI6IHRydWVcbiAgfVxufWAsXG4gICAgICAndml0ZS5jb25maWcudHMnOiBgaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ0B0YWlsd2luZGNzcy92aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7ZGVmaW5lQ29uZmlnfSBmcm9tICd2aXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbcmVhY3QoKSwgdGFpbHdpbmRjc3MoKV0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLicpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgLy8gSE1SIGlzIGRpc2FibGVkIGluIEFJIFN0dWRpbyB2aWEgRElTQUJMRV9ITVIgZW52IHZhci5cbiAgICAgIC8vIERvIG5vdCBtb2RpZnnigJRmaWxlIHdhdGNoaW5nIGlzIGRpc2FibGVkIHRvIHByZXZlbnQgZmxpY2tlcmluZyBkdXJpbmcgYWdlbnQgZWRpdHMuXG4gICAgICBobXI6IHByb2Nlc3MuZW52LkRJU0FCTEVfSE1SICE9PSAndHJ1ZScsXG4gICAgICAvLyBEaXNhYmxlIGZpbGUgd2F0Y2hpbmcgd2hlbiBESVNBQkxFX0hNUiBpcyB0cnVlIHRvIHNhdmUgQ1BVIGR1cmluZyBhZ2VudCBlZGl0cy5cbiAgICAgIHdhdGNoOiBwcm9jZXNzLmVudi5ESVNBQkxFX0hNUiA9PT0gJ3RydWUnID8gbnVsbCA6IHt9LFxuICAgIH0sXG4gIH07XG59KTtgLFxuICAgICAgJ2luZGV4Lmh0bWwnOiBgPCFkb2N0eXBlIGh0bWw+XG48aHRtbCBsYW5nPVwiZW5cIj5cbiAgPGhlYWQ+XG4gICAgPG1ldGEgY2hhcnNldD1cIlVURi04XCIgLz5cbiAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiIC8+XG4gICAgPHRpdGxlPk15IEdvb2dsZSBBSSBTdHVkaW8gQXBwPC90aXRsZT5cbiAgPC9oZWFkPlxuICA8Ym9keT5cbiAgICA8ZGl2IGlkPVwicm9vdFwiPjwvZGl2PlxuICAgIDxzY3JpcHQgdHlwZT1cIm1vZHVsZVwiIHNyYz1cIi9zcmMvbWFpbi50c3hcIj48L3NjcmlwdD5cbiAgPC9ib2R5PlxuPC9odG1sPmAsXG4gICAgICAnLmdpdGlnbm9yZSc6IGBub2RlX21vZHVsZXMvXG5idWlsZC9cbmRpc3QvXG5jb3ZlcmFnZS9cbi5EU19TdG9yZVxuKi5sb2dcbi5lbnYqXG4hLmVudi5leGFtcGxlYCxcbiAgICAgICcuZW52LmV4YW1wbGUnOiBgIyBHRU1JTklfQVBJX0tFWTogUmVxdWlyZWQgZm9yIEdlbWluaSBBSSBBUEkgY2FsbHMuXG4jIEFJIFN0dWRpbyBhdXRvbWF0aWNhbGx5IGluamVjdHMgdGhpcyBhdCBydW50aW1lIGZyb20gdXNlciBzZWNyZXRzLlxuIyBVc2VycyBjb25maWd1cmUgdGhpcyB2aWEgdGhlIFNlY3JldHMgcGFuZWwgaW4gdGhlIEFJIFN0dWRpbyBVSS5cbkdFTUlOSV9BUElfS0VZPVwiTVlfR0VNSU5JX0FQSV9LRVlcIlxuXG4jIEFQUF9VUkw6IFRoZSBVUkwgd2hlcmUgdGhpcyBhcHBsZXQgaXMgaG9zdGVkLlxuIyBBSSBTdHVkaW8gYXV0b21hdGljYWxseSBpbmplY3RzIHRoaXMgYXQgcnVudGltZSB3aXRoIHRoZSBDbG91ZCBSdW4gc2VydmljZSBVUkwuXG4jIFVzZWQgZm9yIHNlbGYtcmVmZXJlbnRpYWwgbGlua3MsIE9BdXRoIGNhbGxiYWNrcywgYW5kIEFQSSBlbmRwb2ludHMuXG5BUFBfVVJMPVwiTVlfQVBQX1VSTFwiYFxuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgLy8gMS4gR2V0IHJlZmVyZW5jZSB0byB0YXJnZXQgYnJhbmNoXG4gICAgICBzZXRQcm9qZWN0UHVzaFN0ZXAobGFuZyA9PT0gJ2FyJyA/ICfYrNin2LHZiiDYp9mE2KfYqti12KfZhCDYqNmAIEdpdEh1YiDZiNis2YTYqCDYotiu2LEg2KfZhNiq2LLYp9mFLi4uJyA6ICdDb25uZWN0aW5nIHRvIEdpdEh1YiAmIGZldGNoaW5nIHRhcmdldCByZWYuLi4nKTtcbiAgICAgIGNvbnN0IHJlZlJlcyA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zLyR7Y2xlYW5SZXBvfS9naXQvcmVmL2hlYWRzLyR7Y2xlYW5CcmFuY2h9YCwgeyBoZWFkZXJzIH0pO1xuICAgICAgXG4gICAgICBsZXQgcGFyZW50Q29tbWl0U2hhID0gJyc7XG4gICAgICBsZXQgYmFzZVRyZWVTaGEgPSAnJztcbiAgICAgIGxldCBoYXNFeGlzdGluZ0JyYW5jaCA9IHJlZlJlcy5vaztcblxuICAgICAgaWYgKGhhc0V4aXN0aW5nQnJhbmNoKSB7XG4gICAgICAgIGNvbnN0IHJlZkRhdGEgPSBhd2FpdCByZWZSZXMuanNvbigpO1xuICAgICAgICBwYXJlbnRDb21taXRTaGEgPSByZWZEYXRhLm9iamVjdC5zaGE7XG5cbiAgICAgICAgLy8gR2V0IGNvbW1pdCBkZXRhaWxzIHRvIHJlc29sdmUgaXRzIHRyZWUgU0hBXG4gICAgICAgIGNvbnN0IGNvbW1pdFJlcyA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zLyR7Y2xlYW5SZXBvfS9naXQvY29tbWl0cy8ke3BhcmVudENvbW1pdFNoYX1gLCB7IGhlYWRlcnMgfSk7XG4gICAgICAgIGlmIChjb21taXRSZXMub2spIHtcbiAgICAgICAgICBjb25zdCBjb21taXREYXRhID0gYXdhaXQgY29tbWl0UmVzLmpzb24oKTtcbiAgICAgICAgICBiYXNlVHJlZVNoYSA9IGNvbW1pdERhdGEudHJlZS5zaGE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gMi4gUHJlcGFyZSBmaWxlcyBjb21waWxhdGlvblxuICAgICAgY29uc3QgZmlsZXNUb1VwbG9hZCA9IFtcbiAgICAgICAgJ3BhY2thZ2UuanNvbicsXG4gICAgICAgICd0c2NvbmZpZy5qc29uJyxcbiAgICAgICAgJ3ZpdGUuY29uZmlnLnRzJyxcbiAgICAgICAgJ2luZGV4Lmh0bWwnLFxuICAgICAgICAnLmdpdGlnbm9yZScsXG4gICAgICAgICcuZW52LmV4YW1wbGUnLFxuICAgICAgICAnc3JjL21haW4udHN4JyxcbiAgICAgICAgJ3NyYy9BcHAudHN4JyxcbiAgICAgICAgJ3NyYy9pbmRleC5jc3MnLFxuICAgICAgICAnc3JjL3R5cGVzLnRzJyxcbiAgICAgICAgJ3NyYy90cmFuc2xhdGlvbnMudHMnLFxuICAgICAgICAnc3JjL2RhdGEudHMnLFxuICAgICAgICAnc3JjL2RhdGFTdG9yZU1vY2sudHMnLFxuICAgICAgICAnc3JjL3ZpdGUtZW52LmQudHMnLFxuICAgICAgICAnc3JjL2NvbnRleHQvTGFuZ3VhZ2VDb250ZXh0LnRzeCcsXG4gICAgICAgICdzcmMvbGliL2ZpcmViYXNlLnRzJyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL0FkbWluUGFuZWwudHN4JyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL0Jvb2tpbmdNb2RhbC50c3gnLFxuICAgICAgICAnc3JjL2NvbXBvbmVudHMvQ2FydERyYXdlci50c3gnLFxuICAgICAgICAnc3JjL2NvbXBvbmVudHMvQ29udGFjdEZvb3Rlci50c3gnLFxuICAgICAgICAnc3JjL2NvbXBvbmVudHMvRmlsdGVyU2VjdGlvbi50c3gnLFxuICAgICAgICAnc3JjL2NvbXBvbmVudHMvSG9tZXBhZ2VQYWdlQnVpbGRlci50c3gnLFxuICAgICAgICAnc3JjL2NvbXBvbmVudHMvTW90b3JjeWNsZUNhcmQudHN4JyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL05hdmJhci50c3gnLFxuICAgICAgICAnc3JjL2NvbXBvbmVudHMvUGRmTW9kYWwudHN4JyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL1N0b3JlQWRtaW5QYW5lbC50c3gnLFxuICAgICAgICAnc3JjL2NvbXBvbmVudHMvU3RvcmVQcm9kdWN0Q2FyZC50c3gnLFxuICAgICAgICAnc3JjL2NvbXBvbmVudHMvU3RvcmVWaWV3LnRzeCdcbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IGJpbmFyeUltYWdlcyA9IFtcbiAgICAgICAgJ3NyYy9hc3NldHMvaW1hZ2VzL2Vsa2hvbHlfYWR2ZW50dXJlX2Jpa2VfMTc4MDM5NDAxNjQ5OC5wbmcnLFxuICAgICAgICAnc3JjL2Fzc2V0cy9pbWFnZXMvZWxraG9seV9jcnVpc2VyX2Jpa2VfMTc4MDM5Mzk5ODA3OS5wbmcnLFxuICAgICAgICAnc3JjL2Fzc2V0cy9pbWFnZXMvZWxraG9seV9oZXJvX2Jhbm5lcl8xNzgwMzkzOTYxMDQxLnBuZycsXG4gICAgICAgICdzcmMvYXNzZXRzL2ltYWdlcy9lbGtob2x5X3Njb290ZXJfMTc4MDM5NDAzNjAyMi5wbmcnLFxuICAgICAgICAnc3JjL2Fzc2V0cy9pbWFnZXMvZWxraG9seV9zcG9ydF9iaWtlXzE3ODAzOTM5Nzk4MTUucG5nJ1xuICAgICAgXTtcblxuICAgICAgY29uc3QgdHJlZUl0ZW1zOiBhbnlbXSA9IFtdO1xuXG4gICAgICAvLyBBLiBMb2FkIGFuZCBsb2FkIHRleHQgZmlsZXMgKHdpdGggc3RhdGljIGxvb2t1cCBmYWxsYmFjayB0byBwcmV2ZW50IFZpdGUgc2VydmluZyBhbGxvd2xpc3Qgd2FybmluZ3MpXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzVG9VcGxvYWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IGZpbGVzVG9VcGxvYWRbaV07XG4gICAgICAgIHNldFByb2plY3RQdXNoU3RlcChcbiAgICAgICAgICBsYW5nID09PSAnYXInIFxuICAgICAgICAgICAgPyBg2KzYp9ix2Yog2KrYrdi22YrYsSDYp9mE2YXZhNmBINin2YTZhti12YogKCR7aSArIDF9LyR7ZmlsZXNUb1VwbG9hZC5sZW5ndGh9KTogJHtwYXRofWBcbiAgICAgICAgICAgIDogYFByZXBhcmluZyBzb3VyY2UgZmlsZSAoJHtpICsgMX0vJHtmaWxlc1RvVXBsb2FkLmxlbmd0aH0pOiAke3BhdGh9YFxuICAgICAgICApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxldCBjb250ZW50ID0gJyc7XG4gICAgICAgICAgaWYgKHN0YXRpY0NvbmZpZ3NbcGF0aF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29udGVudCA9IHN0YXRpY0NvbmZpZ3NbcGF0aF07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVSZXMgPSBhd2FpdCBmZXRjaCgnLycgKyBwYXRoKTtcbiAgICAgICAgICAgIGlmICghZmlsZVJlcy5vaykgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmV0Y2ggJHtwYXRofWApO1xuICAgICAgICAgICAgY29udGVudCA9IGF3YWl0IGZpbGVSZXMudGV4dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0cmVlSXRlbXMucHVzaCh7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgbW9kZTogJzEwMDY0NCcsXG4gICAgICAgICAgICB0eXBlOiAnYmxvYicsXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNvbnNvbGUud2FybihgRmlsZSBmYWxsYmFjayBhY3RpdmUgb3IgZmFpbGVkIHRvIGxvYWQ6ICR7cGF0aH1gLCBlcnIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEIuIExvYWQgYW5kIHVwbG9hZCBiaW5hcnkgZmlsZXNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluYXJ5SW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGltZ1BhdGggPSBiaW5hcnlJbWFnZXNbaV07XG4gICAgICAgIHNldFByb2plY3RQdXNoU3RlcChcbiAgICAgICAgICBsYW5nID09PSAnYXInXG4gICAgICAgICAgICA/IGDYrNin2LHZiiDYsdmB2Lkg2LXZiNix2Kkg2KfZhNmF2LnYsdi2INin2YTYq9mG2KfYptmK2KkgKCR7aSArIDF9LyR7YmluYXJ5SW1hZ2VzLmxlbmd0aH0pOiAke2ltZ1BhdGguc3BsaXQoJy8nKS5wb3AoKX1gXG4gICAgICAgICAgICA6IGBVcGxvYWRpbmcgYXNzZXRzIG5vZGUgKCR7aSArIDF9LyR7YmluYXJ5SW1hZ2VzLmxlbmd0aH0pOiAke2ltZ1BhdGguc3BsaXQoJy8nKS5wb3AoKX1gXG4gICAgICAgICk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgaW1nUmVzID0gYXdhaXQgZmV0Y2goJy8nICsgaW1nUGF0aCk7XG4gICAgICAgICAgaWYgKCFpbWdSZXMub2spIHRocm93IG5ldyBFcnJvcihgSW1hZ2UgZmV0Y2ggZmFpbGVkOiAke2ltZ1BhdGh9YCk7XG4gICAgICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IGltZ1Jlcy5ibG9iKCk7XG5cbiAgICAgICAgICAvLyBSZWFkIGJsb2IgYXMgYmFzZTY0XG4gICAgICAgICAgY29uc3Qgc2hhID0gYXdhaXQgbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgYmFzZTY0c3RyID0gKHJlYWRlci5yZXN1bHQgYXMgc3RyaW5nKS5zcGxpdCgnLCcpWzFdO1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2JSZXMgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8ke2NsZWFuUmVwb30vZ2l0L2Jsb2JzYCwge1xuICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBiYXNlNjRzdHIsXG4gICAgICAgICAgICAgICAgICAgIGVuY29kaW5nOiAnYmFzZTY0J1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIWJsb2JSZXMub2spIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yVGV4dCA9IGF3YWl0IGJsb2JSZXMudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBCbG9iIGNyZWF0aW9uIGZhaWxlZDogJHtlcnJvclRleHR9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2JEYXRhID0gYXdhaXQgYmxvYlJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShibG9iRGF0YS5zaGEpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRyZWVJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIHBhdGg6IGltZ1BhdGgsXG4gICAgICAgICAgICBtb2RlOiAnMTAwNjQ0JyxcbiAgICAgICAgICAgIHR5cGU6ICdibG9iJyxcbiAgICAgICAgICAgIHNoYTogc2hhXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNvbnNvbGUud2FybihgQmluYXJ5IHVwbG9hZCBmYWlsZWQgb3Igc2tpcHBlZCBmb3I6ICR7aW1nUGF0aH1gLCBlcnIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIDMuIENyZWF0ZSBHaXQgVHJlZSBvbiBHaXRIdWJcbiAgICAgIHNldFByb2plY3RQdXNoU3RlcChsYW5nID09PSAnYXInID8gJ9is2KfYsdmKINio2YbYp9ihINiu2LHZiti32Kkg2YXYs9iq2YjYr9i5IEdpdEh1Yi4uLicgOiAnRGVwbG95aW5nIG5ldyBmaWxlcyB0cmVlIG1hcCBvbiBHaXRIdWIuLi4nKTtcbiAgICAgIGNvbnN0IHRyZWVCb2R5OiBhbnkgPSB7XG4gICAgICAgIHRyZWU6IHRyZWVJdGVtc1xuICAgICAgfTtcbiAgICAgIGlmIChiYXNlVHJlZVNoYSkge1xuICAgICAgICB0cmVlQm9keS5iYXNlX3RyZWUgPSBiYXNlVHJlZVNoYTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdHJlZVBvc3RSZXMgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8ke2NsZWFuUmVwb30vZ2l0L3RyZWVzYCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodHJlZUJvZHkpXG4gICAgICB9KTtcblxuICAgICAgaWYgKCF0cmVlUG9zdFJlcy5vaykge1xuICAgICAgICBjb25zdCBlcnJKc29uID0gYXdhaXQgdHJlZVBvc3RSZXMuanNvbigpLmNhdGNoKCgpID0+ICh7IG1lc3NhZ2U6ICdUcmVlIGNyZWF0aW9uIGZhaWxlZCcgfSkpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJySnNvbi5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gY3JhZnQgcmVwb3NpdG9yeSBtYXAgdHJlZScpO1xuICAgICAgfVxuICAgICAgY29uc3QgdHJlZVBvc3REYXRhID0gYXdhaXQgdHJlZVBvc3RSZXMuanNvbigpO1xuICAgICAgY29uc3QgbmV3VHJlZVNoYSA9IHRyZWVQb3N0RGF0YS5zaGE7XG5cbiAgICAgIC8vIDQuIENyZWF0ZSBDb21taXQgb24gR2l0SHViXG4gICAgICBzZXRQcm9qZWN0UHVzaFN0ZXAobGFuZyA9PT0gJ2FyJyA/ICfYrNin2LHZiiDYqtiz2KzZitmEINin2YTYqtiy2KfZhSDYp9mE2YPZiNivIChDb21taXQpLi4uJyA6ICdDb21taXR0aW5nIGNvZGViYXNlIG1vZGlmaWNhdGlvbnMuLi4nKTtcbiAgICAgIGNvbnN0IGNvbW1pdEJvZHk6IGFueSA9IHtcbiAgICAgICAgbWVzc2FnZTogYEF1dG9tYXRpYyBsaXZlIGJhY2t1cCBkZXBsb3kgLSBWZXJjZWwgY29tcGF0aWJsZSAtICR7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfWAsXG4gICAgICAgIHRyZWU6IG5ld1RyZWVTaGFcbiAgICAgIH07XG4gICAgICBpZiAocGFyZW50Q29tbWl0U2hhKSB7XG4gICAgICAgIGNvbW1pdEJvZHkucGFyZW50cyA9IFtwYXJlbnRDb21taXRTaGFdO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb21taXRQb3N0UmVzID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvJHtjbGVhblJlcG99L2dpdC9jb21taXRzYCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29tbWl0Qm9keSlcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWNvbW1pdFBvc3RSZXMub2spIHtcbiAgICAgICAgY29uc3QgZXJySnNvbiA9IGF3YWl0IGNvbW1pdFBvc3RSZXMuanNvbigpLmNhdGNoKCgpID0+ICh7IG1lc3NhZ2U6ICdDb21taXQgY3JlYXRpb24gZmFpbGVkJyB9KSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJKc29uLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBjcmVhdGUgR2l0IGNvbW1pdCBub2RlJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb21taXRQb3N0RGF0YSA9IGF3YWl0IGNvbW1pdFBvc3RSZXMuanNvbigpO1xuICAgICAgY29uc3QgbmV3Q29tbWl0U2hhID0gY29tbWl0UG9zdERhdGEuc2hhO1xuXG4gICAgICAvLyA1LiBVcGRhdGUgb3IgQ3JlYXRlIHJlZmVyZW5jZVxuICAgICAgc2V0UHJvamVjdFB1c2hTdGVwKGxhbmcgPT09ICdhcicgPyAn2KzYp9ix2Yog2KrYrdiv2YrYqyDZgdix2Lkg2KfZhNmF2LPYqtmI2K/YuSDYp9mE2LHYptmK2LPZii4uLicgOiAnVXBkYXRpbmcgR2l0SHViIGJyYW5jaCByZWZlcmVuY2UgSEVBRC4uLicpO1xuICAgICAgbGV0IHJlZlVwZGF0ZVJlcztcbiAgICAgIGlmIChoYXNFeGlzdGluZ0JyYW5jaCkge1xuICAgICAgICByZWZVcGRhdGVSZXMgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9yZXBvcy8ke2NsZWFuUmVwb30vZ2l0L3JlZnMvaGVhZHMvJHtjbGVhbkJyYW5jaH1gLCB7XG4gICAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgc2hhOiBuZXdDb21taXRTaGEsXG4gICAgICAgICAgICBmb3JjZTogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVmVXBkYXRlUmVzID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvJHtjbGVhblJlcG99L2dpdC9yZWZzYCwge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgcmVmOiBgcmVmcy9oZWFkcy8ke2NsZWFuQnJhbmNofWAsXG4gICAgICAgICAgICBzaGE6IG5ld0NvbW1pdFNoYVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVmVXBkYXRlUmVzLm9rKSB7XG4gICAgICAgIC8vIFNhdmUgY29uZmlnIGluIGxvY2FsU3RvcmFnZVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZWxraG9seV9naXRodWJfdG9rZW4nLCBnaXRodWJUb2tlbi50cmltKCkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZWxraG9seV9naXRodWJfcmVwbycsIGNsZWFuUmVwbyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X2dpdGh1Yl9icmFuY2gnLCBjbGVhbkJyYW5jaCk7XG5cbiAgICAgICAgZmlyZVRvYXN0KFxuICAgICAgICAgIGxhbmcgPT09ICdhcidcbiAgICAgICAgICAgID8gJ9iq2YUg2LHZgdi5INmD2KfZhdmEINmD2YjYryDYp9mE2YXYtdiv2LEg2YjYp9mE2YXYtNix2YjYuSDYpdmE2YkgR2l0SHViINio2YbYrNin2K0hINis2KfZh9iyINmE2YTYsdio2Lcg2YHZiiBWZXJjZWwg8J+agPCfkrsnXG4gICAgICAgICAgICA6ICdGYWJ1bG91cyEgRW50aXJlIFJlYWN0IHByb2plY3QgdXBsb2FkZWQgdG8gR2l0SHViLiBSZWFkeSBmb3IgaW5zdGFudCBWZXJjZWwgbGluayEg8J+agPCfkrsnLFxuICAgICAgICAgICdzdWNjZXNzJ1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXJySnNvbiA9IGF3YWl0IHJlZlVwZGF0ZVJlcy5qc29uKCkuY2F0Y2goKCkgPT4gKHsgbWVzc2FnZTogJ1JlZmVyZW5jZSB1cGRhdGUgZmFpbGVkJyB9KSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJKc29uLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGRhdGUgYnJhbmNoIHJlZmVyZW5jZSBIRUFEJyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb2RlYmFzZSBQdXNoIEZhaWxlZDpcIiwgZXJyKTtcbiAgICAgIGZpcmVUb2FzdChcbiAgICAgICAgbGFuZyA9PT0gJ2FyJ1xuICAgICAgICAgID8gYNi52LDYsdin2YvYjCDZgdi02YQg2LHZgdi5INin2YTZg9mI2K8g2YTZgCBHaXRIdWI6ICR7ZXJyLm1lc3NhZ2UgfHwgJ9mK2LHYrNmJINmF2LHYp9is2LnYqSDYp9mE2LHZhdiyINmI2LXZhNin2K3Zitin2Kog2KfZhNiq2YjZg9mK2YYnfWBcbiAgICAgICAgICA6IGBQcm9qZWN0IHB1c2ggZW5kZWQgd2l0aCBlcnJvcjogJHtlcnIubWVzc2FnZSB8fCAnQ2hlY2sgUEFUIHBlcm1pc3Npb25zIC8gUmVwb3NpdG9yeSBmb3JtYXQnfWAsXG4gICAgICAgICdlcnJvcidcbiAgICAgICk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzUHVzaGluZ1Byb2plY3QoZmFsc2UpO1xuICAgICAgc2V0UHJvamVjdFB1c2hTdGVwKCcnKTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gc2NvcmVSb2xlTGFiZWwocm9sZTogVXNlclJvbGUpIHtcbiAgICBpZiAobGFuZyA9PT0gJ2FyJykge1xuICAgICAgaWYgKHJvbGUgPT09ICdBZG1pbicpIHJldHVybiAn2YXYtNix2YEg2LHYptmK2LPZiic7XG4gICAgICBpZiAocm9sZSA9PT0gJ01hbmFnZXInKSByZXR1cm4gJ9mF2K/ZitixINij2LPYt9mI2YQnO1xuICAgICAgcmV0dXJuICfZgdix2YrZgiDYudmF2YQg2YXZhtiz2YInO1xuICAgIH1cbiAgICByZXR1cm4gcm9sZTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC0yIHNtOnAtNCBiZy1ibGFjay85NSBiYWNrZHJvcC1ibHVyLW1kIG92ZXJmbG93LWhpZGRlbiBhZG1pbi1wYW5lbC1yb290XCI+XG4gICAgICBcbiAgICAgIHsvKiBUb2FzdCBOb3RpZmljYXRpb24gTGF5ZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIHRvcC01IHJpZ2h0LTUgei04MCBzcGFjZS15LTIgbWF4LXctc20gcG9pbnRlci1ldmVudHMtbm9uZVwiPlxuICAgICAgICA8QW5pbWF0ZVByZXNlbmNlPlxuICAgICAgICAgIHt0b2FzdHMubWFwKCh0KSA9PiAoXG4gICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICBrZXk9e3QuaWR9XG4gICAgICAgICAgICAgIGluaXRpYWw9e3sgc2NhbGU6IDAuOSwgb3BhY2l0eTogMCwgeTogLTIwIH19XG4gICAgICAgICAgICAgIGFuaW1hdGU9e3sgc2NhbGU6IDEsIG9wYWNpdHk6IDEsIHk6IDAgfX1cbiAgICAgICAgICAgICAgZXhpdD17eyBzY2FsZTogMC45LCBvcGFjaXR5OiAwLCB4OiA1MCB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTMuNSByb3VuZGVkLXhsIGJvcmRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41IHNoYWRvdy14bCBiYWNrZHJvcC1ibHVyLW1kIHBvaW50ZXItZXZlbnRzLWF1dG8gJHtcbiAgICAgICAgICAgICAgICB0LnR5cGUgPT09ICdzdWNjZXNzJyBcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWdyZWVuLTk1MC84MCBib3JkZXItZ3JlZW4tNTAwLzQwIHRleHQtZ3JlZW4tNDAwJyBcbiAgICAgICAgICAgICAgICAgIDogdC50eXBlID09PSAnZXJyb3InIFxuICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTk1MC84MCBib3JkZXItcmVkLTUwMC80MCB0ZXh0LXJlZC00MDAnIFxuICAgICAgICAgICAgICAgICAgOiAnYmctaW5kaWdvLTk1MC84MCBib3JkZXItaW5kaWdvLTUwMC80MCB0ZXh0LWluZGlnby00MDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctNCBoLTQgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyBmb250LW1lZGl1bVwiPnt0LnRleHR9PC9zcGFuPlxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICkpfVxuICAgICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTWFpbiBUZXJtaW5hbCBTaGVsbCBCb3ggKi99XG4gICAgICA8bW90aW9uLmRpdlxuICAgICAgICBpbml0aWFsPXt7IHNjYWxlOiAwLjk3LCBvcGFjaXR5OiAwIH19XG4gICAgICAgIGFuaW1hdGU9e3sgc2NhbGU6IDEsIG9wYWNpdHk6IDEgfX1cbiAgICAgICAgZXhpdD17eyBzY2FsZTogMC45Nywgb3BhY2l0eTogMCB9fVxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctNnhsIGgtWzk0dmhdIGdsYXNzLXBhbmVsIGJvcmRlciBib3JkZXItWyM2MzY2RjFdLzMwIHJvdW5kZWQtM3hsIG92ZXJmbG93LWhpZGRlbiBmbGV4IGZsZXgtY29sIHJlbGF0aXZlIHNoYWRvdy0yeGwgYm94LWdsb3ctaW5kaWdvIHRleHQtd2hpdGUgdXBwZXJjYXNlXCJcbiAgICAgICAgZGlyPXtkaXJ9XG4gICAgICA+XG4gICAgICAgIHsvKiBIb2xvZ3JhcGhpYyBTaWduYWwgU2NhbiBMaW5lICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIGxlZnQtMCByaWdodC0wIGgtWzEuNXB4XSBiZy1ncmFkaWVudC10by1yIGZyb20tYnJhbmQtcHJpbWFyeSB2aWEtYnJhbmQtYWNjZW50IHRvLWJyYW5kLXNlY29uZGFyeSB6LTIwXCIgLz5cblxuICAgICAgICB7LyogSGVhZGVyIFJpYmJvbiBOb2RlICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItd2hpdGUvWzAuMDhdIHAtNCBiZy1bIzBCMEYxQV0vOTAgei0xMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQtbGcgYmctYnJhbmQtcHJpbWFyeS8xMCBib3JkZXIgYm9yZGVyLWJyYW5kLXByaW1hcnkvMzBcIj5cbiAgICAgICAgICAgICAgPERhdGFiYXNlIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1bIzIyRDNFRV0gYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1zbSBzbTp0ZXh0LWJhc2UgZm9udC1leHRyYWJvbGQgdHJhY2tpbmctd2lkZXN0IGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIHt0KCdhZG1pbl90aXRsZScpfVxuICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgbXQtMC41XCIgZGlyPVwibHRyXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLWdyZWVuLTUwMCBhbmltYXRlLXBpbmdcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTUwMCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0XCI+XG4gICAgICAgICAgICAgICAgICB7c2Vzc2lvblVzZXIgPyBgQUNUSVZFIE5PREU6ICR7c2Vzc2lvblVzZXIudXNlcm5hbWV9IHwgJHtzZXNzaW9uVXNlci5yb2xlLnRvVXBwZXJDYXNlKCl9YCA6ICdTRUNVUkUgR1BSUyBTSEVMTCBURVJNSU5BTCB8IE9GRkxJTkUnfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIHtzZXNzaW9uVXNlciAmJiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVMb2dvdXR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgYmctcmVkLTUwMC8xMCBob3ZlcjpiZy1yZWQtNTAwLzIwIGJvcmRlciBib3JkZXItcmVkLTUwMC8zMCB0ZXh0LXJlZC00MDAgZm9udC1tb25vIHRleHQtWzlweF0gcm91bmRlZC1sZyB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGhvdmVyOnNjYWxlLVsxLjAzXVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8TG9nT3V0IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfZgdi12YQg2KfZhNmF2LTYqtix2YMnIDogJ0RJU0NPTk5FQ1QnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItd2hpdGUvNSBiZy13aGl0ZS9bMC4wM10gdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEludGVyYWN0aXZlIFNoZWxsIENvbnRlbnQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LWhpZGRlbiBmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IGJnLVsjMDgwQjEzXS85NVwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT0gVklFVyBBOiBPRkZMSU5FIExPQ0sgU0NSRUVOID09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgICB7IXNlc3Npb25Vc2VyID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC02IHRleHQtY2VudGVyIG1heC13LXNtIG14LWF1dG8gc3BhY2UteS02XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICA8bW90aW9uLmRpdiBcbiAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgcm90YXRlOiBbMCwgLTUsIDUsIDBdIH19XG4gICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IHJlcGVhdDogSW5maW5pdHksIGR1cmF0aW9uOiAzLjUsIGVhc2U6ICdlYXNlSW5PdXQnIH19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTE0IGgtMTQgcm91bmRlZC1mdWxsIGJnLVsjMjJEM0VFXS8xMCBib3JkZXIgYm9yZGVyLVsjMjJEM0VFXS8zMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBteC1hdXRvIHRleHQtYnJhbmQtYWNjZW50IHNoYWRvdy1sZyBzaGFkb3ctYnJhbmQtYWNjZW50LzVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxMb2NrIGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPlxuICAgICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9io2YjYp9io2Kkg2KfZhNiq2K3ZgtmCINin2YTZhdi02YHYsdipJyA6ICdPUEVSQVRPUiBJREVOVElUWSBQT1JUQUwnfVxuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWdyYXktNTAwIG5vcm1hbC1jYXNlIGxlYWRpbmctbm9ybWFsIGZvbnQtc2Fuc1wiPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgXG4gICAgICAgICAgICAgICAgICAgID8gJ9in2YTZiNi12YjZhCDZhdit2K/ZiNivINmE2YTYo9i52LbYp9ihINin2YTZhdi12LHYrSDZhNmH2YUg2YHZgti3LiDZitix2KzZiSDYqtiy2YjZitivINix2YXYsiDYp9mE2K/YrtmI2YQg2YTYpdi52LfYp9ihINin2YTYqtmB2YjZiti2LidcbiAgICAgICAgICAgICAgICAgICAgOiAnQWNjZXNzIGlzIGxpbWl0ZWQgdG8gdmVyaWZpZWQgcGVyc29ubmVsIG9ubHkuIEVudGVyIHlvdXIgY3JlZGVudGlhbHMgdG8gaW5pdGlhbGl6ZSBHUFJTIGxpbmsuJ1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8yMCBiZy1pbmRpZ28tOTUwLzIwIHJvdW5kZWQteGwgdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtZ3JheS00MDAgbGVhZGluZy1ub3JtYWwgdGV4dC1sZWZ0IGNhcGl0YWxpemUgZm9udC1zZW1pYm9sZCB0cmFja2luZy13aWRlXCI+XG4gICAgICAgICAgICAgICAgICDimqEge2xhbmcgPT09ICdhcicgPyAn2KPYudi22KfYoSDYp9mE2KPZiNiq2YjZhdin2KrZitmD2Yog2KfZhNin2YHYqtix2KfYttmK2YjZhjonIDogJ0RlZmF1bHQgRGVtbyBOb2RlOid9PGJyIC8+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJyYW5kLWFjY2VudFwiPkhPU05ZMTk5NTwvc3Bhbj4gfCBDb2RlOiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJyYW5kLXByaW1hcnlcIj5IaHJtMDEwMTk5NUVMZWxraG9seTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZUxvZ2luU3VibWl0fSBjbGFzc05hbWU9XCJ3LWZ1bGwgc3BhY2UteS0zLjUgdGV4dC1sZWZ0IGZvbnQtbW9ubyB0ZXh0LXhzIG1heC13LVszMjBweF1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdHJhY2tpbmctd2lkZXIgdGV4dC1bMTBweF1cIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9iz2YUg2KfZhNmF2LPYqtiu2K/ZhSDZhNmE2YXYtNi62YQnIDogJ09QRVJBVE9SIEFDQ09VTlQgTkFNRSd9OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dXNlcm5hbWVJbnB1dH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRVc2VybmFtZUlucHV0KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2xhbmcgPT09ICdhcicgPyAn2KPYr9iu2YQg2KfYs9mFINin2YTZhdiz2KrYrtiv2YUnIDogJ0VudGVyIFVzZXJuYW1lIElkZW50aXR5J31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLWJsYWNrLzYwIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGZvY3VzOmJvcmRlci1pbmRpZ28tNDAwIHRleHQtd2hpdGUgcm91bmRlZC14bCBweC00IHB5LTIuNSBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0cmFja2luZy13aWRlciB0ZXh0LVsxMHB4XVwiPntsYW5nID09PSAnYXInID8gJ9mD2YTZhdipINin2YTZhdix2YjYsScgOiAnQUNDRVNTIENPREUgS0VZJ306PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT17c2hvd1Bhc3N3b3JkID8gJ3RleHQnIDogJ3Bhc3N3b3JkJ31cbiAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwYXNzd29yZElucHV0fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGFzc3dvcmRJbnB1dChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLigKLigKLigKLigKLigKLigKLigKLigKLigKLigKLigKLigKJcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1ibGFjay82MCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBmb2N1czpib3JkZXItaW5kaWdvLTQwMCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcHgtNCBweS0yLjUgZm9jdXM6b3V0bGluZS1ub25lIHByLTEwXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dQYXNzd29yZCghc2hvd1Bhc3N3b3JkKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC0zLjUgdGV4dC1ncmF5LTUwMCBob3Zlcjp0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtzaG93UGFzc3dvcmQgPyA8RXllT2ZmIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiA6IDxFeWUgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+fVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMi41IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1icmFuZC1wcmltYXJ5IHRvLWJyYW5kLWFjY2VudCB0ZXh0LVsjMEIwRjFBXSBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVzdCByb3VuZGVkLXhsIGhvdmVyOmJyaWdodG5lc3MtMTEwIGFjdGl2ZTpzY2FsZS1bMC45OF0gdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNSB0ZXh0LVsxMXB4XVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPEtleSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9iq2LPYrNmK2YQg2K/YrtmI2YQg2KfZhNmF2K3Yt9ipJyA6ICdJTklUSUFMSVpFIExJTksnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9mb3JtPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT0gVklFVyBCOiBMT0dHRUQgSU4gV09SS1NUQVRJT04gPT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IG92ZXJmbG93LWhpZGRlbiByZWxhdGl2ZSB6LTEwIGgtZnVsbFwiPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgey8qIFNpZGViYXIgVGFicyBTZWxlY3RvcnMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1kOnctNTYgYmctYmxhY2svMzAgYm9yZGVyLWIgbWQ6Ym9yZGVyLWItMCBtZDpib3JkZXItciBib3JkZXItd2hpdGUvWzAuMDVdIGZsZXggbWQ6ZmxleC1jb2wgZ2FwLTEuNSBwLTMgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJoaWRkZW4gbWQ6YmxvY2sgdGV4dC1bOXB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlIG1iLTIgcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9ij2YLYs9in2YUg2KfZhNmI2KfYrNmH2KknIDogJ1dPUktTUEFDRSBURVJNSU5BTFMnfVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7LyogVGFiOiBEYXNoYm9hcmQgKi99XG4gICAgICAgICAgICAgICAge2NhbkFjY2VzcygnZGFzaGJvYXJkJykgJiYgKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2Rhc2hib2FyZCcpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4LTEgbWQ6ZmxleC1pbml0aWFsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1kOmp1c3RpZnktc3RhcnQgZ2FwLTIuNSBweC00IHB5LTIgcm91bmRlZC14bCBmb250LW1vbm8gdGV4dC1bMTBweF0gc206dGV4dC1bMTFweF0gZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnZGFzaGJvYXJkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLWJyYW5kLXByaW1hcnkvMTUgdG8tdHJhbnNwYXJlbnQgYm9yZGVyIGJvcmRlci1icmFuZC1wcmltYXJ5LzM1IHRleHQtd2hpdGUgc2hhZG93LW1kJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXdoaXRlL1swLjAxXSdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxBY3Rpdml0eSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtWyMyMkQzRUVdXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2YTZiNit2Kkg2KfZhNmC2YrYp9iv2KknIDogJ0RBU0hCT0FSRCd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHsvKiBUYWI6IEZsZWV0IE1hbmFnZXIgKi99XG4gICAgICAgICAgICAgICAge2NhbkFjY2VzcygnbW90b3JjeWNsZXMnKSAmJiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignbW90b3JjeWNsZXMnKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC0xIG1kOmZsZXgtaW5pdGlhbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtZDpqdXN0aWZ5LXN0YXJ0IGdhcC0yLjUgcHgtNCBweS0yIHJvdW5kZWQteGwgZm9udC1tb25vIHRleHQtWzEwcHhdIHNtOnRleHQtWzExcHhdIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ21vdG9yY3ljbGVzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLWJyYW5kLXByaW1hcnkvMTUgdG8tdHJhbnNwYXJlbnQgYm9yZGVyIGJvcmRlci1icmFuZC1wcmltYXJ5LzM1IHRleHQtd2hpdGUgc2hhZG93LW1kJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXdoaXRlL1swLjAxXSdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxEYXRhYmFzZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYnJhbmQtYWNjZW50XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2KPYs9i32YjZhCDYp9mE2K/Ysdin2KzYp9iqJyA6ICdNT1RPUkNZQ0xFUyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHsvKiBUYWI6IFN0b3JlIE1hbmFnZXIgKi99XG4gICAgICAgICAgICAgICAge2NhbkFjY2Vzcygnc3RvcmUnKSAmJiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignc3RvcmUnKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC0xIG1kOmZsZXgtaW5pdGlhbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtZDpqdXN0aWZ5LXN0YXJ0IGdhcC0yLjUgcHgtNCBweS0yIHJvdW5kZWQteGwgZm9udC1tb25vIHRleHQtWzEwcHhdIHNtOnRleHQtWzExcHhdIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ3N0b3JlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLWJyYW5kLXByaW1hcnkvMTUgdG8tdHJhbnNwYXJlbnQgYm9yZGVyIGJvcmRlci1icmFuZC1wcmltYXJ5LzM1IHRleHQtd2hpdGUgc2hhZG93LW1kJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXdoaXRlL1swLjAxXSdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxEYXRhYmFzZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZ3JlZW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2KfZhNmF2KrYrNixINin2YTYpdmE2YPYqtix2YjZhtmKJyA6ICdTVE9SRSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHsvKiBUYWI6IE9wZXJhdG9ycyBOb2RlIFNldHRpbmdzICovfVxuICAgICAgICAgICAgICAgIHtjYW5BY2Nlc3MoJ3VzZXJzJykgJiYgKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ3VzZXJzJyl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBtZDpmbGV4LWluaXRpYWwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWQ6anVzdGlmeS1zdGFydCBnYXAtMi41IHB4LTQgcHktMiByb3VuZGVkLXhsIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XSBzbTp0ZXh0LVsxMXB4XSBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICd1c2VycydcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1icmFuZC1wcmltYXJ5LzE1IHRvLXRyYW5zcGFyZW50IGJvcmRlciBib3JkZXItYnJhbmQtcHJpbWFyeS8zNSB0ZXh0LXdoaXRlIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy13aGl0ZS9bMC4wMV0nXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8VXNlcnMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWJyYW5kLXNlY29uZGFyeVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9in2YTZhdi02LHZgdmI2YYg2YjYp9mE2KPYs9mF2KfYoScgOiAnVVNFUlMgTElTVCd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHsvKiBUYWI6IEFwcGxpY2F0aW9uIEN1c3RvbWl6YXRpb24gKi99XG4gICAgICAgICAgICAgICAge2NhbkFjY2Vzcygnc2V0dGluZ3MnKSAmJiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignc2V0dGluZ3MnKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC0xIG1kOmZsZXgtaW5pdGlhbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtZDpqdXN0aWZ5LXN0YXJ0IGdhcC0yLjUgcHgtNCBweS0yIHJvdW5kZWQteGwgZm9udC1tb25vIHRleHQtWzEwcHhdIHNtOnRleHQtWzExcHhdIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ3NldHRpbmdzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLWJyYW5kLXByaW1hcnkvMTUgdG8tdHJhbnNwYXJlbnQgYm9yZGVyIGJvcmRlci1icmFuZC1wcmltYXJ5LzM1IHRleHQtd2hpdGUgc2hhZG93LW1kJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXdoaXRlL1swLjAxXSdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxTZXR0aW5ncyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYpdi52K/Yp9iv2KfYqiDYp9mE2YXYudix2LYnIDogJ1NFVFRJTkdTJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogRHluYW1pYyBDb25zb2xlIERlc2sgU2NyZWVuICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy15LWF1dG8gcC00IHNtOnAtNSB0ZXh0LWxlZnQgcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFRBQiAxOiBTQUFTIERBU0hCT0FSRCBIVUIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSAnZGFzaGJvYXJkJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNSBhbmltYXRlLWZhZGUtaW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXItYiBib3JkZXItd2hpdGUvNSBwYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdHJhY2tpbmctd2lkZXN0IGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KjZitin2YbYp9iqINij2K/Yp9ihINin2YTZhdi52LHYticgOiAnSFEgQ09NTUFORCBBTkQgQU5BTFlUSUNTJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtZ3JheS01MDAgbm9ybWFsLWNhc2UgbGVhZGluZy1ub3JtYWwgZm9udC1zYW5zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfZhdi52YTZiNmF2KfYqiDYudin2YXYqSDZhdiq2YPYp9mF2YTYqSDZiNmF2KTYtNix2KfYqiDYo9iv2KfYoSDYp9mE2YXYudix2LYg2YjYp9mE2LLZiNin2LEuJyA6ICdSZWFsLXRpbWUgdGVsZW1ldHJ5IG92ZXJzaWdodCBvZiBib29raW5nIG5vZGVzLCBicmFuZCBjYXBpdGFsIGZsb3csIGFuZCBvcGVyYXRvciBzdGF0aXN0aWNzLid9XG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgey8qIFN0YXQgQ2FyZHMgTWF0cml4IEdyaWQgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtMyBtZDpncmlkLWNvbHMtNCB4bDpncmlkLWNvbHMtOCBnYXAtMy41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgey8qIE1ldHJpYyBBOiBWYWwgKi99XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1bIzExMTgyN10vNjAgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wNF0gZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gaG92ZXI6Ym9yZGVyLWJyYW5kLWFjY2VudC8yMCB0cmFuc2l0aW9uLWFsbCBmbGV4LTEgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ubyBmb250LWJvbGRcIj57bGFuZyA9PT0gJ2FyJyA/ICfZgtmK2YXYqSDYp9mE2KPYs9i32YjZhCcgOiAnQlJBTkQgQVNTRVRTJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxDb2lucyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYnJhbmQtYWNjZW50XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZSBzbTp0ZXh0LWxnIGZvbnQtYmxhY2sgZm9udC1tb25vIHRyYWNraW5nLXRpZ2h0IHRleHQtd2hpdGVcIj4ke2ZsZWV0VmFsdWUudG9Mb2NhbGVTdHJpbmcoKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzhweF0gbXQtMC41IHRleHQtZ3JlZW4tNDAwIGZvbnQtc2FucyB0cmFja2luZy13aWRlc3QgbGVhZGluZy1ub25lXCI+4pqhIE1JTExJT04gVkFMVUU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBNZXRyaWMgQjogQ3ljbGUgbm9kZXMgKi99XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1bIzExMTgyN10vNjAgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wNF0gZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gaG92ZXI6Ym9yZGVyLWJyYW5kLXByaW1hcnkvMjAgdHJhbnNpdGlvbi1hbGwgZmxleC0xIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTUwMCBmb250LW1vbm8gZm9udC1ib2xkXCI+e2xhbmcgPT09ICdhcicgPyAn2YXYsdmD2KjYp9iqINin2YTZhdi52LHYticgOiAnRkxFRVQgTUFDSElORVMnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPERhdGFiYXNlIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1icmFuZC1wcmltYXJ5XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZSBzbTp0ZXh0LWxnIGZvbnQtYmxhY2sgZm9udC1tb25vIHRyYWNraW5nLXRpZ2h0IHRleHQtd2hpdGVcIj57bW90b3JjeWNsZXMubGVuZ3RofTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1bOHB4XSBtdC0wLjUgdGV4dC1icmFuZC1hY2NlbnQgZm9udC1zYW5zIHRyYWNraW5nLXdpZGVzdCBsZWFkaW5nLW5vbmVcIj7il48gQUNUSVZFIEJJS0VTPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogTWV0cmljIEM6IE9wZXJhdG9yIE5vZGVzICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctWyMxMTE4MjddLzYwIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDRdIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGhvdmVyOmJvcmRlci1icmFuZC1zZWNvbmRhcnkvMjAgdHJhbnNpdGlvbi1hbGwgZmxleC0xIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTUwMCBmb250LW1vbm8gZm9udC1ib2xkXCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNmF2LTYsdmB2YjZhicgOiAnQ1VSQVRPUlMnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPFVzZXJzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1icmFuZC1zZWNvbmRhcnlcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1iYXNlIHNtOnRleHQtbGcgZm9udC1ibGFjayBmb250LW1vbm8gdHJhY2tpbmctdGlnaHQgdGV4dC13aGl0ZVwiPnt1c2Vycy5sZW5ndGh9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVs4cHhdIG10LTAuNSB0ZXh0LWdyYXktNDAwIGZvbnQtc2FucyB0cmFja2luZy13aWRlc3QgbGVhZGluZy1ub25lXCI+8J+RpCBDT0RFUy9LRVlTPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogTWV0cmljIEQ6IEJvb2tpbmdzIExlYWRzICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctWyMxMTE4MjddLzYwIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDRdIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGhvdmVyOmJvcmRlci13aGl0ZS8xMCB0cmFuc2l0aW9uLWFsbCBmbGV4LTEgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ubyBmb250LWJvbGRcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2K3YrNmI2LLYp9iqINin2YTZhdi52YTZgtipJyA6ICdSRVNFUlZBVElPTlMnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VTcXVhcmUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXJlZC01MDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC1sZyBmb250LWJsYWNrIGZvbnQtbW9ubyB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlXCI+e2Jvb2tpbmdzLmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzhweF0gbXQtMC41IHRleHQtcmVkLTQwMCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IGxlYWRpbmctbm9uZVwiPvCfk7EgV0hBVFNBUFA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBORVcgTWV0cmljOiBNb3RvcmN5Y2xlIFNhbGVzIFZhbHVlICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctWyMxMTE4MjddLzYwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8xNSBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBob3Zlcjpib3JkZXItaW5kaWdvLTQwMC8yMCB0cmFuc2l0aW9uLWFsbCBmbGV4LTEgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ubyBmb250LWJvbGRcIj57bGFuZyA9PT0gJ2FyJyA/ICfZhdio2YrYudin2Kog2KfZhNmF2YjYqtmI2LPZitmD2YTYp9iqJyA6ICdNT1RPUlMgUkVWRU5VRSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8VHJlbmRpbmdVcCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC1sZyBmb250LWJsYWNrIGZvbnQtbW9ubyB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlXCI+e21vdG9yc1RvdGFsU2FsZXNWYWx1ZS50b0xvY2FsZVN0cmluZygpfSB7bGFuZyA9PT0gJ2FyJyA/ICfYrC7ZhScgOiAnRUdQJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzhweF0gbXQtMC41IHRleHQtaW5kaWdvLTQwMCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IGxlYWRpbmctbm9uZVwiPvCfj43vuI8gU0FMRVMgVkFMVUU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBORVcgTWV0cmljOiBNb3RvcmN5Y2xlcyBTb2xkIENvdW50ICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctWyMxMTE4MjddLzYwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8xNSBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBob3Zlcjpib3JkZXItaW5kaWdvLTQwMC8yNSB0cmFuc2l0aW9uLWFsbCBmbGV4LTEgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ubyBmb250LWJvbGRcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2K/Ysdin2KzYp9iqINin2YTZhdio2KfYudipJyA6ICdCSUtFUyBTT0xEJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWluZGlnby0zMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1iYXNlIHNtOnRleHQtbGcgZm9udC1ibGFjayBmb250LW1vbm8gdHJhY2tpbmctdGlnaHQgdGV4dC13aGl0ZVwiPnttb3RvcnNUb3RhbFNvbGRDb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzhweF0gbXQtMC41IHRleHQtaW5kaWdvLTMwMCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IGxlYWRpbmctbm9uZVwiPvCfj4EgU09MRCBVTklUUzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgey8qIE1ldHJpYyBFOiBTdG9yZSBSZXZlbnVlICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctWyMxMTE4MjddLzYwIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDRdIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGhvdmVyOmJvcmRlci1lbWVyYWxkLTUwMC8yMCB0cmFuc2l0aW9uLWFsbCBmbGV4LTEgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtbW9ubyBmb250LWJvbGRcIj57bGFuZyA9PT0gJ2FyJyA/ICfZhdio2YrYudin2Kog2KfZhNmF2KrYrNixJyA6ICdTVE9SRSBTQUxFUyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8U2hvcHBpbmdCYWcgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZSBzbTp0ZXh0LWxnIGZvbnQtYmxhY2sgZm9udC1tb25vIHRyYWNraW5nLXRpZ2h0IHRleHQtd2hpdGVcIj57c3RvcmVUb3RhbFJldmVudWUudG9Mb2NhbGVTdHJpbmcoKX0ge2xhbmcgPT09ICdhcicgPyAn2Kwu2YUnIDogJ0VHUCd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVs4cHhdIG10LTAuNSB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3QgbGVhZGluZy1ub25lXCI+8J+bkiBSRVZFTlVFPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogTWV0cmljIEY6IEl0ZW1zIFNvbGQgKi99XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1bIzExMTgyN10vNjAgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wNF0gZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gaG92ZXI6Ym9yZGVyLWN5YW4tNTAwLzIwIHRyYW5zaXRpb24tYWxsIGZsZXgtMSBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JheS01MDAgZm9udC1tb25vIGZvbnQtYm9sZFwiPntsYW5nID09PSAnYXInID8gJ9in2YTZgti32Lkg2KfZhNmF2KjYp9i52KknIDogJ0lURU1TIFNPTEQnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPFBhY2thZ2UgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZSBzbTp0ZXh0LWxnIGZvbnQtYmxhY2sgZm9udC1tb25vIHRyYWNraW5nLXRpZ2h0IHRleHQtd2hpdGVcIj57c3RvcmVUb3RhbEl0ZW1zU29sZC50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1bOHB4XSBtdC0wLjUgdGV4dC1jeWFuLTQwMCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IGxlYWRpbmctbm9uZVwiPvCfk6YgUElFQ0VTPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBDYXRlZ29yeSBCcmVha2Rvd24gJiBBbGxvY2F0aW9uIFZpc3VhbGl6ZXIgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00LjUgcm91bmRlZC0yeGwgYmctWyMwRjE0MjJdLzcwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8xMCBzcGFjZS15LTMuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci13aGl0ZS81IHBiLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCB0cmFja2luZy13aWRlclwiPntsYW5nID09PSAnYXInID8gJ9mG2LPYqCDYqtmI2LLZiti5INin2YTZhdix2YPYqNin2Kog2LnYqNixINin2YTZgdim2KfYqicgOiAnVkVISUNMRSBDTEFTUyBESVNUUklCVVRJT04nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1bIzIyRDNFRV0gZm9udC1tb25vXCI+Q0FMSUJSQVRJT04gQ0FQOiAxMDAlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgey8qIFZpc3VhbCBHcmFkaWVudCBCYXIgYWxsb2NhdGlvbnMgKFNsZWVrIENTUyBDaGFydGluZykgKi99XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBTcG9ydCAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bOXB4XSBmb250LW1vbm8gdGV4dC1ncmF5LTQwMCBtYi0xIGxlYWRpbmctbm9uZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlNQT1JUIENMQVNTIEE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtd2hpdGVcIj57Y2F0QV9Db3VudH0gKHtNYXRoLnJvdW5kKGNhdEFfQ291bnQgLyAobW90b3JjeWNsZXMubGVuZ3RoIHx8IDEpICogMTAwKX0lKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtMS41IGJnLWJsYWNrLzYwIHJvdW5kZWQtZnVsbCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmRpdiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgd2lkdGg6IDAgfX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IHdpZHRoOiBgJHsoY2F0QV9Db3VudCAvIChtb3RvcmN5Y2xlcy5sZW5ndGggfHwgMSkpICogMTAwfSVgIH19IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMS4yIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgcm91bmRlZC1mdWxsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNTAwIHRvLWluZGlnby00MDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDcnVpc2VyICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LVs5cHhdIGZvbnQtbW9ubyB0ZXh0LWdyYXktNDAwIG1iLTEgbGVhZGluZy1ub25lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q1JVSVNFUiBDTEFTUyBCPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+e2NhdEJfQ291bnR9ICh7TWF0aC5yb3VuZChjYXRCX0NvdW50IC8gKG1vdG9yY3ljbGVzLmxlbmd0aCB8fCAxKSAqIDEwMCl9JSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLTEuNSBiZy1ibGFjay82MCByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsPXt7IHdpZHRoOiAwIH19IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyB3aWR0aDogYCR7KGNhdEJfQ291bnQgLyAobW90b3JjeWNsZXMubGVuZ3RoIHx8IDEpKSAqIDEwMH0lYCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMS4yIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgcm91bmRlZC1mdWxsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1icmFuZC1zZWNvbmRhcnkgdG8tWyNBODU1RjddXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogQWR2ZW50dXJlICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LVs5cHhdIGZvbnQtbW9ubyB0ZXh0LWdyYXktNDAwIG1iLTEgbGVhZGluZy1ub25lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+QURWRU5UVVJFIENMQVNTIEM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtd2hpdGVcIj57Y2F0Q19Db3VudH0gKHtNYXRoLnJvdW5kKGNhdENfQ291bnQgLyAobW90b3JjeWNsZXMubGVuZ3RoIHx8IDEpICogMTAwKX0lKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtMS41IGJnLWJsYWNrLzYwIHJvdW5kZWQtZnVsbCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmRpdiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgd2lkdGg6IDAgfX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IHdpZHRoOiBgJHsoY2F0Q19Db3VudCAvIChtb3RvcmN5Y2xlcy5sZW5ndGggfHwgMSkpICogMTAwfSVgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAxLjIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtZnVsbCByb3VuZGVkLWZ1bGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWJyYW5kLWFjY2VudCB0by1bIzA2QjZENF1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBTY29vdGVyICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LVs5cHhdIGZvbnQtbW9ubyB0ZXh0LWdyYXktNDAwIG1iLTEgbGVhZGluZy1ub25lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+U0NPT1RFUiBDTEFTUyBTPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+e2NhdFNfQ291bnR9ICh7TWF0aC5yb3VuZChjYXRTX0NvdW50IC8gKG1vdG9yY3ljbGVzLmxlbmd0aCB8fCAxKSAqIDEwMCl9JSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLTEuNSBiZy1ibGFjay82MCByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsPXt7IHdpZHRoOiAwIH19IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyB3aWR0aDogYCR7KGNhdFNfQ291bnQgLyAobW90b3JjeWNsZXMubGVuZ3RoIHx8IDEpKSAqIDEwMH0lYCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMS4yIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgcm91bmRlZC1mdWxsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1lbWVyYWxkLTUwMCB0by1lbWVyYWxkLTQwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIExlYWRzICYgQm9va2luZ3MgUXVldWUgbG9nIChBZXN0aGV0aWMgU3RyaXBlLXN0eWxlZCBUYWJsZSkgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00LjUgcm91bmRlZC0yeGwgYmctWyMwQjBGMUFdLzg1IGJvcmRlciBib3JkZXItWyM2MzY2RjFdLzE1IHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci13aGl0ZS81IHBiLTIuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy00LjUgaC00LjUgdGV4dC1icmFuZC1hY2NlbnQgc2hyaW5rLTAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCB0cmFja2luZy13aWRlclwiPntsYW5nID09PSAnYXInID8gJ9i32KfYqNmI2LEg2LHYtdivINin2KrYtdin2YTYp9iqINin2YTYrdis2LInIDogJ0FDVElWRSBDSFJPTk9TIFNIT1dST09NIFJFU0VSVkFUSU9OUyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2Vzc2lvblVzZXIucm9sZSA9PT0gJ0FkbWluJyAmJiBib29raW5ncy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNsZWFyQm9va2luZ3N9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0xIGJnLXJlZC02MDAvMTAgaG92ZXI6YmctcmVkLTUwMCB0ZXh0LXJlZC00MDAgaG92ZXI6dGV4dC13aGl0ZSByb3VuZGVkIGJvcmRlciBib3JkZXItcmVkLTUwMC8yMCB0cmFuc2l0aW9uLWFsbCBmb250LW1vbm8gdGV4dC1bOXB4XSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYqtmB2LHZiti6INin2YTYs9is2YQnIDogJ1BVUkdFIExFQURTJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAge2Jvb2tpbmdzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgcHktOCB0ZXh0LWdyYXktNjAwIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XSBzcGFjZS15LTEuNSBzZWxlY3Qtbm9uZSB0ZXh0LXRyYW5zZm9ybTogbG93ZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlU3F1YXJlIGNsYXNzTmFtZT1cInctOCBoLTggdGV4dC1ncmF5LTcwMCBteC1hdXRvIG9wYWNpdHktNDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlIHRleHQtZ3JheS01MDBcIj57bGFuZyA9PT0gJ2FyJyA/ICfZhNinINit2YjYp9iz2Kgg2YjZhNinINit2KzZiNiy2KfYqiDZhdiz2KzZhNipINio2LnYrycgOiAnTk8gU1BPT0xFRCBCT09LSU5HUyBSRUNJRVZFRCd9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS00MDAgbm9ybWFsLWNhc2UgZm9udC1zYW5zXCI+U3VibWl0IGEgcmVzZXJ2ZSB0aWNrZXQgdXNpbmcgYW55IEJvb2sgTm93IGJ1dHRvbiB0byBwb3B1bGF0ZSByZWFsIGxlYWRzIGhlcmUuPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cteC1hdXRvIG1heC1oLVsyMjBweF0gc2Nyb2xsYmFyLXRoaW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgYm9yZGVyLWNvbGxhcHNlIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XSBzbTp0ZXh0LVsxMXB4XVwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwiYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgdGV4dC1ncmF5LTUwMCB0ZXh0LVs5cHhdIHRyYWNraW5nLXdpZGVzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicGItMiB0ZXh0LXJpZ2h0XCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNi52YXZitmEJyA6ICdDTElFTlQnfTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYi0yIHRleHQtcmlnaHRcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YXYp9mD2YrZhtipJyA6ICdNQUNISU5FJ308L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicGItMiB0ZXh0LXJpZ2h0XCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNmH2KfYqtmBJyA6ICdQSE9ORSd9PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBiLTIgdGV4dC1yaWdodFwiPntsYW5nID09PSAnYXInID8gJ9iq2KfYsdmK2K4g2KfZhNit2KzYsicgOiAnUkVTRVJWRSBEQVRFJ308L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicGItMiB0ZXh0LXJpZ2h0XCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNmF2KjZiti52KfYqiAvINin2YTYrdin2YTYqScgOiAnU1RBVFVTIC8gU0FMRSd9PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Ym9va2luZ3MubWFwKChiKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2IuaWR9IGNsYXNzTmFtZT1cImJvcmRlci1iIGJvcmRlci13aGl0ZS9bMC4wM10gaG92ZXI6Ymctd2hpdGUvWzAuMDFdIHRleHQtZ3JheS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMi41IGZvbnQtc2FucyBmb250LWJvbGQgdGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2IubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzhweF0gZm9udC1tb25vIHRleHQtZ3JheS01MDAgbm9ybWFsLWNhc2VcIj57Yi5lbWFpbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMi41IHRleHQtaW5kaWdvLTQwMCB0ZXh0LXJpZ2h0XCI+e2IubW90b3JjeWNsZU5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMi41IHRleHQtcmlnaHQgZm9udC1ib2xkIHRleHQtYnJhbmQtYWNjZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj17YGh0dHBzOi8vd2EubWUvJHtiLnBob25lLnJlcGxhY2UoL1teMC05XS9nLCAnJyl9YH0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWw9XCJub3JlZmVycmVyXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhvdmVyOnVuZGVybGluZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZCBnYXAtMSBzaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntiLnBob25lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFycm93VXBSaWdodCBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtZ3JlZW4tNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0yLjUgdGV4dC1yaWdodCBmb250LXNhbnMgaXRhbGljIHRleHQtZ3JheS00MDBcIj57Yi5kYXRlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTIuNSB0ZXh0LXJpZ2h0IGZvbnQtc2Fuc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0xLjUgcHktMC41IHJvdW5kZWQgdGV4dC1bOC41cHhdIGZvbnQtYm9sZCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChiLnN0YXR1cyB8fCAnc29sZCcpID09PSAnc29sZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyZWVuLTUwMC8xMCB0ZXh0LWdyZWVuLTQwMCBib3JkZXIgYm9yZGVyLWdyZWVuLTUwMC8yMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXllbGxvdy01MDAvMTAgdGV4dC15ZWxsb3ctNDAwIGJvcmRlciBib3JkZXIteWVsbG93LTUwMC8yMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoYi5zdGF0dXMgfHwgJ3NvbGQnKSA9PT0gJ3NvbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChsYW5nID09PSAnYXInID8gJ9iq2YUg2KfZhNio2YrYuScgOiAnU09MRCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IChsYW5nID09PSAnYXInID8gJ9in2YbYqti42KfYsScgOiAnUEVORElORycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlVG9nZ2xlQm9va2luZ1N0YXR1cyhiLmlkLCBiLnN0YXR1cyB8fCAnc29sZCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTEuNSBweS0wLjUgcm91bmRlZCBiZy1icmFuZC1wcmltYXJ5LzEwIGhvdmVyOmJnLWJyYW5kLXByaW1hcnkgdGV4dC1icmFuZC1wcmltYXJ5IGhvdmVyOnRleHQtd2hpdGUgYm9yZGVyIGJvcmRlci1icmFuZC1wcmltYXJ5LzIwIHRyYW5zaXRpb24tYWxsIHRleHQtWzhweF0gZm9udC1ib2xkIGN1cnNvci1wb2ludGVyIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYqti52K/ZitmEJyA6ICdUT0dHTEUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIEV4Y2VsIEV4cG9ydCBDb250cm9sbGVyIFBhbmVsICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNC41IHJvdW5kZWQtMnhsIGJnLVsjMDkwRDE2XSBib3JkZXIgYm9yZGVyLWdyZWVuLTUwMC8xMCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMi41IGJvcmRlci1iIGJvcmRlci13aGl0ZS81IHBiLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTEuNSBiZy1ncmVlbi01MDAvMTAgcm91bmRlZC1sZyB0ZXh0LWdyZWVuLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIGZvbnQtc2FucyB0cmFja2luZy13aWRlIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9mF2LPYqtiu2LHYrCDYp9mE2KrZgtin2LHZitixINin2YTZhdit2KfYs9io2YrYqSAoRXhjZWwpJyA6ICdDT01QUkVIRU5TSVZFIEVYQ0VMIEVYUE9SVCBURVJNSU5BTCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIGxlYWRpbmctbm9ybWFsIGZvbnQtbW9ubyBub3JtYWwtY2FzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KrYtdiv2YrYsSDZg9in2YXZhCDYqtmB2KfYtdmK2YQg2YXYqNmK2LnYp9iqINin2YTZhdiq2KzYsSDZiNin2YTYrdis2YjYstin2Kog2YjYp9mE2YXYqNin2YTYui4nIDogJ0NvbXBpbGUsIGZpbHRlciwgYW5kIHN0cmVhbSBsZWRnZXIgYWNjb3VudHMgZm9yIGFsbCBwcm9kdWN0cyBhbmQgaGVhdnkgc2hvd3Jvb20gdmVoaWNsZXMuJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTMuNSBpdGVtcy1lbmRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBEdXJhdGlvbiBTZWxlY3RvciBEcm9wZG93biAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgdGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtZ3JheS00MDAgZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9mG2LfYp9mCINin2LPYqtiu2LHYp9isINin2YTYqNmK2KfZhtin2Ko6JyA6ICdTRUxFQ1QgRVhQT1JUIFBFUklPRDonfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2V4cG9ydFJhbmdlVHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGU6IGFueSkgPT4gc2V0RXhwb3J0UmFuZ2VUeXBlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMy41IHB5LTIgc206cHktMi41IGJnLVsjMEIwRjE5XSB0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItd2hpdGUvNSBob3Zlcjpib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBmb250LW1vbm8gdGV4dC14cyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0xIGZvY3VzOnJpbmctZ3JlZW4tNTAwIHRyYWNraW5nLXdpZGUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInRvZGF5XCI+e2xhbmcgPT09ICdhcicgPyAn2KjZitin2YbYp9iqINin2YTZitmI2YUnIDogJ1RvZGF5IChSZWFsLXRpbWUpJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwid2Vla1wiPntsYW5nID09PSAnYXInID8gJ9ii2K7YsSDYo9iz2KjZiNi5JyA6ICdMYXN0IFdlZWsnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJtb250aFwiPntsYW5nID09PSAnYXInID8gJ9ii2K7YsSDYtNmH2LEnIDogJ0xhc3QgTW9udGgnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIzbW9udGhzXCI+e2xhbmcgPT09ICdhcicgPyAn2KLYrtixINmjINij2LTZh9ixJyA6ICdMYXN0IDMgTW9udGhzJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNm1vbnRoc1wiPntsYW5nID09PSAnYXInID8gJ9ii2K7YsSDZpiDYo9i02YfYsScgOiAnTGFzdCA2IE1vbnRocyd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInllYXJcIj57bGFuZyA9PT0gJ2FyJyA/ICfYotiu2LEg2LPZhtipINmD2KfZhdmE2KknIDogJ0xhc3QgMTIgTW9udGhzJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY3VzdG9tXCI+e2xhbmcgPT09ICdhcicgPyAn2KrYrdiv2YrYryDZgdiq2LHYqSDYstmF2YrZhtipINmF2K7Ytdi12KknIDogJ0N1c3RvbSBEYXRlIFJhbmdlJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIEN1c3RvbSBSYW5nZSBzZWxlY3QgaW5wdXRzICovfVxuICAgICAgICAgICAgICAgICAgICAgICAge2V4cG9ydFJhbmdlVHlwZSA9PT0gJ2N1c3RvbScgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgdGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWdyYXktNDAwIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1ibHVlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9mF2YYg2KrYp9ix2YrYrjonIDogJ1NUQVJUIERBVEUvVElNRTonfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtleHBvcnRTdGFydERhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFeHBvcnRTdGFydERhdGUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwbC05IHByLTMuNSBydGw6cHItOSBydGw6cGwtMy41IHB5LTIgc206cHktMi41IGJnLVsjMEIwRjE5XSB0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItYmx1ZS01MDAvMjUgaG92ZXI6Ym9yZGVyLWJsdWUtNTAwLzQwIHJvdW5kZWQteGwgZm9udC1tb25vIHRleHQteHMgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMSBmb2N1czpyaW5nLWJsdWUtNTAwIGN1cnNvci1wb2ludGVyIFsmOjotd2Via2l0LWNhbGVuZGFyLXBpY2tlci1pbmRpY2F0b3JdOmludmVydC1bNDQlXSBbJjo6LXdlYmtpdC1jYWxlbmRhci1waWNrZXItaW5kaWNhdG9yXTpzZXBpYS1bOTUlXSBbJjo6LXdlYmtpdC1jYWxlbmRhci1waWNrZXItaW5kaWNhdG9yXTpzYXR1cmF0ZS1bMTgwMCVdIFsmOjotd2Via2l0LWNhbGVuZGFyLXBpY2tlci1pbmRpY2F0b3JdOmh1ZS1yb3RhdGUtWzE5NWRlZ11cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0zIHJ0bDpsZWZ0LWF1dG8gcnRsOnJpZ2h0LTMgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHctNCBoLTQgdGV4dC1ibHVlLTUwMCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNSB0ZXh0LWxlZnRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtZ3JheS00MDAgZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDYWxlbmRhciBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWJsdWUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2KXZhNmJINiq2KfYsdmK2K46JyA6ICdFTkQgREFURS9USU1FOid9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJkYXRldGltZS1sb2NhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2V4cG9ydEVuZERhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFeHBvcnRFbmREYXRlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcGwtOSBwci0zLjUgcnRsOnByLTkgcnRsOnBsLTMuNSBweS0yIHNtOnB5LTIuNSBiZy1bIzBCMEYxOV0gdGV4dC13aGl0ZSBib3JkZXIgYm9yZGVyLWJsdWUtNTAwLzI1IGhvdmVyOmJvcmRlci1ibHVlLTUwMC80MCByb3VuZGVkLXhsIGZvbnQtbW9ubyB0ZXh0LXhzIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTEgZm9jdXM6cmluZy1ibHVlLTUwMCBjdXJzb3ItcG9pbnRlciBbJjo6LXdlYmtpdC1jYWxlbmRhci1waWNrZXItaW5kaWNhdG9yXTppbnZlcnQtWzQ0JV0gWyY6Oi13ZWJraXQtY2FsZW5kYXItcGlja2VyLWluZGljYXRvcl06c2VwaWEtWzk1JV0gWyY6Oi13ZWJraXQtY2FsZW5kYXItcGlja2VyLWluZGljYXRvcl06c2F0dXJhdGUtWzE4MDAlXSBbJjo6LXdlYmtpdC1jYWxlbmRhci1waWNrZXItaW5kaWNhdG9yXTpodWUtcm90YXRlLVsxOTVkZWddXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENhbGVuZGFyIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMyBydGw6bGVmdC1hdXRvIHJ0bDpyaWdodC0zIHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB3LTQgaC00IHRleHQtYmx1ZS01MDAgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogU3VibWl0dGluZyB0cmlnZ2VyIGJ1dHRvbiAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgc206Y29sLXNwYW4tMSAke2V4cG9ydFJhbmdlVHlwZSAhPT0gJ2N1c3RvbScgPyAnbGc6Y29sLXNwYW4tMycgOiAnJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUV4cG9ydEV4Y2VsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBweC00IHB5LTIuNSBiZy1ncmFkaWVudC10by1yIGZyb20tZ3JlZW4tNTAwLzg1IHRvLWVtZXJhbGQtNjAwLzk1IGhvdmVyOmZyb20tZ3JlZW4tNTAwIGhvdmVyOnRvLWVtZXJhbGQtNjAwIHRleHQtd2hpdGUgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LVsxMC41cHhdIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3Qgcm91bmRlZC14bCBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYm9yZGVyLWdyZWVuLTUwMC8yMCBhY3RpdmU6c2NhbGUtOTggc2hhZG93LW1kIGhvdmVyOnNoYWRvdy1ncmVlbi01MDAvMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZpbGVUZXh0IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTEwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2KrYrdmF2YrZhCDYp9mE2KjZitin2YbYp9iqINio2LXZiti62Kkg2KfZg9iz2YQg8J+TiicgOiAnQ29tcGlsZSAmIEV4cG9ydCBTcHJlYWRzaGVldCDwn5OKJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFRBQiAyOiBJTlRFUkFDVElWRSBGTEVFVCBNQU5BR0VSID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ21vdG9yY3ljbGVzJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCBhbmltYXRlLWZhZGUtaW5cIj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHshaXNBZGRpbmdOZXcgJiYgIWVkaXRpbmdCaWtlID8gKFxuICAgICAgICAgICAgICAgICAgICAgIC8vIEdyaWQgbGlzdCBkaXNwbGF5cyBvZiBhY3RpdmUgY3ljbGVzXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci13aGl0ZS81IHBiLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gYNmC2KfYptmF2Kkg2KfZhNij2LPYt9mI2YQg2KfZhNit2KfZhNmK2KkgKCR7bW90b3JjeWNsZXMubGVuZ3RofSlgIDogYEZMRUVUIENPTVBPU0lUSU9OIEdSSUQgKCR7bW90b3JjeWNsZXMubGVuZ3RofSlgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1ncmF5LTUwMCBub3JtYWwtY2FzZSBsZWFkaW5nLW5vcm1hbCBmb250LXNhbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9iq2YHZiNmK2LYg2K/Ysdin2KzYp9iqINil2YTZg9iq2LHZiNmG2YrYqSDYrNiv2YrYr9ip2Iwg2KrYrdiv2YrYqyDZhdmC2KfZitmK2LMg2KfZhNiv2YHYuSDYp9mE2K3Ytdin2YbZitipINij2Ygg2KfZhNiq2LnYr9mK2YQg2YjYp9mE2YXYs9itLicgOiAnUmV2aWV3LCByZWdpc3RlciwgbW9kaWZ5IHNwZWNpZmljYXRpb25zLCBvciBwdXJnZSBleHRyZW1lIGR5bmFtaWMgY3ljbGVzIGZyb20gRWd5cHQgc2hvd3Jvb21zLid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVBZGROZXdDbGlja31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMuNSBweS0yIGJnLWJyYW5kLWFjY2VudCB0ZXh0LVsjMEIwRjFBXSBob3ZlcjpiZy1bIzE4YjVjY10gZm9udC1tb25vIHRleHQtWzEwLjVweF0gZm9udC1ibGFjayByb3VuZGVkLXhsIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHNoYWRvdy1tZCBzaGFkb3ctYnJhbmQtYWNjZW50LzE1XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQbHVzIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9il2LbYp9mB2Kkg2KLZhNipJyA6ICdDT01NSVNTSU9OIE5FVyBCSUtFJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBGaWx0ZXJzIGFuZCBTZWFyY2ggQmFyIFJvdyAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtc3RyZXRjaCBtZDppdGVtcy1jZW50ZXIgZ2FwLTMgYmctWyMwRTEzMjJdLzgwIHAtMyByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA0XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogSW50ZXJhY3RpdmUgQ2F0ZWdvcnkgRmlsdGVyIFRhYnMgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBib3JkZXIgYm9yZGVyLXdoaXRlLzUgYmctYmxhY2svNDAgcC0xIHJvdW5kZWQteGwgdy1maXQgbWF4LXctZnVsbCBvdmVyZmxvdy14LWF1dG8gZ2FwLTEgc2VsZWN0LW5vbmUgZm9udC1tb25vIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyhbJ0FsbCcsICdBJywgJ0InLCAnQycsICdTJ10gYXMgY29uc3QpLm1hcCgoY2F0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGRhc2hDYXRlZ29yeUZpbHRlciA9PT0gY2F0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBjYXQgPT09ICdBbGwnIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChsYW5nID09PSAnYXInID8gJ9in2YTZg9mEIPCfjJAnIDogJ1Nob3cgQWxsJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBjYXQgPT09ICdBJyA/IChsYW5nID09PSAnYXInID8gJ0Eg2LPYqNmI2LHYqiDimqEnIDogJ0EgLSBTcG9ydCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogY2F0ID09PSAnQicgPyAobGFuZyA9PT0gJ2FyJyA/ICdCINmD2LHZiNiy2LEg8J+bi++4jycgOiAnQiAtIENydWlzZXInKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGNhdCA9PT0gJ0MnID8gKGxhbmcgPT09ICdhcicgPyAnQyDZhdi62KfZhdix2KfYqiDwn6etJyA6ICdDIC0gVG91cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKGxhbmcgPT09ICdhcicgPyAnUyDYs9mD2YjYqtixIPCflIsnIDogJ1MgLSBTY29vdGVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2NhdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXREYXNoQ2F0ZWdvcnlGaWx0ZXIoY2F0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSByb3VuZGVkLWxnIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgd2hpdGVzcGFjZS1ub3dyYXAgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWJyYW5kLWFjY2VudCB0ZXh0LVsjMEIwRjFBXSBzaGFkb3ctbWQgc2hhZG93LWJyYW5kLWFjY2VudC8yNSBmb250LWJsYWNrJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctd2hpdGUvNSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogQmVhdXRpZnVsIEludGVyYWN0aXZlIFNlYXJjaCBpbnB1dCAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4LTEgbWQ6bWF4LXcteHMgeGw6bWF4LXctbWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtiaWtlU2VhcmNoVGVybX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QmlrZVNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2xhbmcgPT09ICdhcicgPyAn2KfZhNio2K3YqyDYqNin2YTYp9iz2YUg2KPZiCDZg9mI2K8g2KfZhNmF2YjYqtmI2LPZitmD2YQuLi4nIDogJ1NlYXJjaCBieSBuYW1lIG9yIGJpa2UgY29kZS4uLid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwNzBBMTFdIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBwbC05IHByLTggcnRsOnByLTkgcnRsOnBsLTggcHktMiB0ZXh0LXhzIHRleHQtd2hpdGUgZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudCBvdXRsaW5lLW5vbmUgcGxhY2Vob2xkZXI6dGV4dC1ncmF5LTUwMCB0cmFuc2l0aW9uLWFsbCBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlYXJjaCBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTMgcnRsOmxlZnQtYXV0byBydGw6cmlnaHQtMyB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdy0zLjUgaC0zLjUgdGV4dC1ncmF5LTQwMCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YmlrZVNlYXJjaFRlcm0gJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRCaWtlU2VhcmNoVGVybSgnJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTMgcnRsOnJpZ2h0LWF1dG8gcnRsOmxlZnQtMyB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHRleHQtWzEwcHhdIGN1cnNvci1wb2ludGVyIGZvbnQtYm9sZCBmb250LW1vbm8gdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDinJVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGFzaEZpbHRlcmVkQmlrZXMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXNoRmlsdGVyZWRCaWtlcy5tYXAoKGJpa2UpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2Jpa2UuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTQgYmctWyMxMTE2MjRdLzgwIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDRdIGhvdmVyOmJvcmRlci1icmFuZC1wcmltYXJ5LzIwIHJvdW5kZWQtMnhsIGZsZXggaXRlbXMtY2VudGVyIGdhcC00IHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17YmlrZS5pbWFnZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PXtiaWtlLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVyUG9saWN5PVwibm8tcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTE2IGgtMTYgb2JqZWN0LWNvbnRhaW4gYmctYmxhY2svNDAgcm91bmRlZC14bCBwLTEgc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTAgdGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0xLjUgcHktMC41IHJvdW5kZWQgdGV4dC1bOHB4XSBmb250LW1vbm8gZm9udC1ib2xkIHVwcGVyY2FzZSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpa2UuY2F0ZWdvcnkgPT09ICdBJyA/ICdiZy1pbmRpZ28tOTUwLzgwIGJvcmRlciBib3JkZXItaW5kaWdvLTQwMC8yMCB0ZXh0LWluZGlnby00MDAnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaWtlLmNhdGVnb3J5ID09PSAnQicgPyAnYmctcHVycGxlLTk1MC84NSBib3JkZXIgYm9yZGVyLXB1cnBsZS00MDAvMjAgdGV4dC1icmFuZC1zZWNvbmRhcnknIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaWtlLmNhdGVnb3J5ID09PSAnQycgPyAnYmctWyMwZjIxMjVdIGJvcmRlciBib3JkZXItY3lhbi00MDAvMjAgdGV4dC1bIzIyRDNFRV0nIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYmctZW1lcmFsZC05NTAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTQwMC8yMCB0ZXh0LWVtZXJhbGQtNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jpa2UuY2F0ZWdvcnlOYW1lfSBDbGFzcyAoe2Jpa2UuY2F0ZWdvcnl9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtZXh0cmFib2xkIHRleHQtd2hpdGUgdHJhY2tpbmctd2lkZSB0cnVuY2F0ZSBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jpa2UubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtYnJhbmQtYWNjZW50IGZvbnQtYm9sZCB0ZXh0LVsxMXB4XSBtdC0wLjVcIj57YmlrZS5wcmljZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0xLjUgc2hyaW5rLTAgc2VsZWN0LW5vbmUgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlRG93bmxvYWRBbmRDb3B5UVJDb2RlKGJpa2UpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXdoaXRlIHAtMSByb3VuZGVkLW1kIG1iLTEgY3Vyc29yLXBvaW50ZXIgaG92ZXI6c2NhbGUtMTEwIGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctbWQgc2hhZG93LWJsYWNrLzQ1XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17bGFuZyA9PT0gJ2FyJyA/ICfYp9mG2YLYsSDZhNmG2LPYriDYp9mE2YPZiNivINmI2KrYrdmF2YrZhCDYp9mE2LHZhdiyJyA6ICdDbGljayB0byBjb3B5IGNvZGUgJiBkb3dubG9hZCBRUid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxRUkNvZGVTVkcgaWQ9e2Bxci0ke2Jpa2UuaWR9YH0gdmFsdWU9e2Jpa2Uuc2VyaWFsQ29kZSB8fCBiaWtlLmlkfSBzaXplPXs0MH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzZXNzaW9uVXNlci5yb2xlICE9PSAnU3RhZmYnID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUVkaXRCaWtlQ2xpY2soYmlrZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgcHgtMiBwb2ludGVyLWV2ZW50cy1hdXRvIGN1cnNvci1wb2ludGVyIGJnLWluZGlnby01MDAvMTUgaG92ZXI6YmctYnJhbmQtcHJpbWFyeSBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMTAgdGV4dC1icmFuZC1hY2NlbnQgaG92ZXI6dGV4dC13aGl0ZSByb3VuZGVkLWxnIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIGZvbnQtbW9ubyB0ZXh0LVs5cHhdIHRyYWNraW5nLXdpZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiVXBncmFkZSBNYWNoaW5lIFBhcmFtZXRlcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFZGl0MiBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9iq2LnYr9mK2YQnIDogJ1VQR1JBREUnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs4cHhdIHRleHQtZ3JheS02MDAgZm9udC1tb25vIGl0YWxpYyBsZWFkaW5nLW5vbmUgdGV4dC1yaWdodFwiPkxPQ0tFRCBOT0RFUzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2Vzc2lvblVzZXIucm9sZSA9PT0gJ0FkbWluJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlRGVsZXRlQmlrZShiaWtlLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMSBweC0yIHBvaW50ZXItZXZlbnRzLWF1dG8gY3Vyc29yLXBvaW50ZXIgYmctcmVkLTUwMC8xMCBob3ZlcjpiZy1yZWQtNTAwIGJvcmRlciBib3JkZXItcmVkLTUwMC8xMCB0ZXh0LXJlZC00MDAgaG92ZXI6dGV4dC13aGl0ZSByb3VuZGVkLWxnIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIGZvbnQtbW9ubyB0ZXh0LVs5cHhdIHRyYWNraW5nLXdpZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiRGVjb21taXNzaW9uIEhlYXZ5IEN5Y2xlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2LTYt9ioJyA6ICdERUxFVEUnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgcHktMTIgYm9yZGVyIGJvcmRlci13aGl0ZS81IGJnLWJsYWNrLzIwIHJvdW5kZWQtMnhsIGNvbC1zcGFuLTEgc206Y29sLXNwYW4tMiBzZWxlY3Qtbm9uZSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1ncmF5LTUwMCB3LWZ1bGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9mE2Kcg2KrZiNis2K8g2YXYsdmD2KjYp9iqINmF2LPYrNmE2Kkg2YHZiiDZh9iw2Kcg2KfZhNmB2KbYqSDYqNi52K8nIDogJ05vIGNvbW1pc3Npb25lZCBkZXNpZ25zIGluIHRoaXMgY2F0ZWdvcnkgc2VnbWVudC4nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgLy8gRnVsbCBDb21taXNzaW9uIC8gRWRpdCBmb3JtIHNjcmVlblxuICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVGb3JtU3VibWl0fSBjbGFzc05hbWU9XCJzcGFjZS15LTQgbWF4LXctMnhsIG14LWF1dG8gdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItd2hpdGUvNSBwYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgdHJhY2tpbmctd2lkZXN0IHRleHQtYnJhbmQtYWNjZW50IHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc0FkZGluZ05ldyA/IChsYW5nID09PSAnYXInID8gJ9iq2LPYrNmK2YQg2YXYsdmD2KjYqSDZg9mH2LHZiNmF2LrZhtin2LfZitiz2YrYqSDYrNiv2YrYr9ipJyA6ICdDT01NSVNTSU9OIE5FVyBDWUJFUiBWRUhJQ0xFJykgOiBgJHtsYW5nID09PSAnYXInID8gJ9iq2K3ZiNmK2LEg2YXZgtin2YrZitizJyA6ICdSRUNPTkZJRyBNQUNISU5FJ306ICR7YmlrZUZvcm0ubmFtZX1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRJc0FkZGluZ05ldyhmYWxzZSk7IHNldEVkaXRpbmdCaWtlKG51bGwpOyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSB0ZXh0LVsxMHB4XSBmb250LW1vbm8gY3Vyc29yLXBvaW50ZXIgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC1yaWdodFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmbHQ7IHtsYW5nID09PSAnYXInID8gJ9iq2LHYp9is2Lkg2YTZhNiz2YrYp9mCJyA6ICdESVNDQVJEIFNIRUxMJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIFN1Yi1UYWJzIFNlbGVjdG9yIEhlYWRlciAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBib3JkZXItYiBib3JkZXItd2hpdGUvNSBwYi0xIGdhcC0yIG92ZXJmbG93LXgtYXV0byBzZWxlY3Qtbm9uZSBmb250LW1vbm8gdGV4dC1bMTBweF0gc206dGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEZvcm1TdWJUYWIoJ2Jhc2ljJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcGItMS41IHB4LTEuNSBib3JkZXItYi0yIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhbnNpdGlvbi1hbGwgdHJhY2tpbmctd2lkZXIgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1TdWJUYWIgPT09ICdiYXNpYydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLWJyYW5kLWFjY2VudCB0ZXh0LWJyYW5kLWFjY2VudCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLXRyYW5zcGFyZW50IHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIPCfk4Ege2xhbmcgPT09ICdhcicgPyAn2KfZhNio2YrYp9mG2KfYqiDYp9mE2KPYs9in2LPZitipJyA6ICdCYXNpYyBJbmZvJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRGb3JtU3ViVGFiKCdwcmljaW5nJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcGItMS41IHB4LTEuNSBib3JkZXItYi0yIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhbnNpdGlvbi1hbGwgdHJhY2tpbmctd2lkZXIgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1TdWJUYWIgPT09ICdwcmljaW5nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdib3JkZXItYnJhbmQtYWNjZW50IHRleHQtYnJhbmQtYWNjZW50J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItdHJhbnNwYXJlbnQgdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg8J+SsCB7bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2LnYsdmI2LYg2YjYp9mE2KrYs9i52YrYsScgOiAnUHJpY2luZyAmIE9mZmVycyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Rm9ybVN1YlRhYignY2F0YWxvZycpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHBiLTEuNSBweC0xLjUgYm9yZGVyLWItMiBmb250LWJvbGQgdXBwZXJjYXNlIHRyYW5zaXRpb24tYWxsIHRyYWNraW5nLXdpZGVyIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtU3ViVGFiID09PSAnY2F0YWxvZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLWJyYW5kLWFjY2VudCB0ZXh0LWJyYW5kLWFjY2VudCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLXRyYW5zcGFyZW50IHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIPCfk4Qge2xhbmcgPT09ICdhcicgPyAn2YPYqtin2YTZiNisIFBERicgOiAnQ2F0YWxvZyBEb2N1bWVudCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Rm9ybVN1YlRhYignYWRkb25zJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcGItMS41IHB4LTEuNSBib3JkZXItYi0yIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhbnNpdGlvbi1hbGwgdHJhY2tpbmctd2lkZXIgY3Vyc29yLXBvaW50ZXIgd2hpdGVzcGFjZS1ub3dyYXAgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1TdWJUYWIgPT09ICdhZGRvbnMnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1icmFuZC1hY2NlbnQgdGV4dC1icmFuZC1hY2NlbnQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci10cmFuc3BhcmVudCB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDwn5ug77iPIHtsYW5nID09PSAnYXInID8gJ9in2YTYpdi22KfZgdin2KonIDogJ0FkZC1vbnMnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEZvcm1TdWJUYWIoJ3JlbGF0ZWQnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwYi0xLjUgcHgtMS41IGJvcmRlci1iLTIgZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFuc2l0aW9uLWFsbCB0cmFja2luZy13aWRlciBjdXJzb3ItcG9pbnRlciB3aGl0ZXNwYWNlLW5vd3JhcCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVN1YlRhYiA9PT0gJ3JlbGF0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1icmFuZC1hY2NlbnQgdGV4dC1icmFuZC1hY2NlbnQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci10cmFuc3BhcmVudCB0ZXh0LWdyYXktNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICDwn5SXIHtsYW5nID09PSAnYXInID8gJ9mF2YbYqtis2KfYqiDYp9mE2YXYqtis2LEnIDogJ1N0b3JlIFJlbGF0ZWQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogUmVuZGVyIEFjdGl2ZSBTdWItVGFiIExheW91dCBDb250ZW50ICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogVEFCIEE6IEJBU0lDIElORk8gKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtU3ViVGFiID09PSAnYmFzaWMnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTMuNSB0ZXh0LWxlZnQgZm9udC1tb25vIGFuaW1hdGUtZmFkZS1pblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdHJhY2tpbmctd2lkZXJcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9iz2YUg2KfZhNmF2K3ZgdiyINin2YTYr9mC2YrZgicgOiAnTUFDSElORSBJREVOVElGSUVSIE5BTUUnfTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YmlrZUZvcm0ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJpa2VGb3JtKHsgLi4uYmlrZUZvcm0sIG5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vNzUgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wOF0gZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcHgtNCBweS0yLjUgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0ZXh0LVsxMHB4XSB0cmFja2luZy13aWRlclwiPntsYW5nID09PSAnYXInID8gJ9iq2LXZhtmK2YEg2KfZhNmB2KbYqSDYp9mE2KPZgdmC2YrYqScgOiAnU0VSSUVTIENPTVBPU0lUSU9OIENMQVNTSUZJQ0FUSU9OJ306PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtiaWtlRm9ybS5jYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJpa2VGb3JtKHsgLi4uYmlrZUZvcm0sIGNhdGVnb3J5OiBlLnRhcmdldC52YWx1ZSBhcyBDYXRlZ29yeVNsdWcgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS83NSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBmb2N1czpib3JkZXItYnJhbmQtYWNjZW50IHRleHQtd2hpdGUgcm91bmRlZC14bCBweC00IHB5LTIuNSBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkFcIj5TUE9SVCBDTEFTUyBBICjimqEgU3BlZWQgTWFzdGVyKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJCXCI+Q1JVSVNFUiBDTEFTUyBCICjwn5uL77iPIExvdy1TbHVuZyBDdXN0b20pPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkNcIj5BRFZFTlRVUkUgQ0xBU1MgQyAo8J+nrSBPZmZncmlkIE5vbWFkKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJTXCI+U0NPT1RFUiBDTEFTUyBTICjwn5SLIFVyYmFuIEh1Yik8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdHJhY2tpbmctd2lkZXJcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2LPZitix2YrYp9mEL9in2YTZg9mI2K8g2KfZhNmF2YXZitiyJyA6ICdVTklRVUUgU0VSSUFML0NPREUnfTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YmlrZUZvcm0uc2VyaWFsQ29kZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJpa2VGb3JtKHsgLi4uYmlrZUZvcm0sIHNlcmlhbENvZGU6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vNzUgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wOF0gZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcHgtNCBweS0yLjUgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0ZXh0LVsxMHB4XSB0cmFja2luZy13aWRlclwiPntsYW5nID09PSAnYXInID8gJ9in2YTYtNi52KfYsSDYp9mE2LPZhNmI2YPZiiDYp9mE2YHYsdi52YonIDogJ0NIQVNTSVMgU0xPR0FOIFNZTk9QU0lTJ306PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtiaWtlRm9ybS50YWdsaW5lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QmlrZUZvcm0oeyAuLi5iaWtlRm9ybSwgdGFnbGluZTogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS83NSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBmb2N1czpib3JkZXItYnJhbmQtYWNjZW50IHRleHQtd2hpdGUgcm91bmRlZC14bCBweC00IHB5LTIuNSBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNwYW4tMSBzbTpjb2wtc3Bhbi0yIGdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTMuNSBib3JkZXItdCBib3JkZXItd2hpdGUvNSBwdC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdHJhY2tpbmctd2lkZXJcIj57bGFuZyA9PT0gJ2FyJyA/ICfYtdmI2LHYqSDYp9mE2YXYsdmD2KjYqSDZh9mI2YTZiNis2LHYp9mFJyA6ICdSRUFDVElWRSBJTUFHRSBVUkwgLyBCQVNFNjQgRU5DT0RJTkcnfTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Jpa2VGb3JtLmltYWdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCaWtlRm9ybSh7IC4uLmJpa2VGb3JtLCBpbWFnZTogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlBhc3RlIGNsZWFuIGRpcmVjdCBpbWFnZSB1cmwgbGlua3MgaGVyZS4uLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzc1IGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIHRleHQtd2hpdGUgcm91bmRlZC14bCBweC00IHB5LTIgdGV4dC14cyBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xLjUgYmctd2hpdGUvNSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRleHQtZ3JheS0zMDAgcm91bmRlZC1sZyBjdXJzb3ItcG9pbnRlciBob3ZlcjpiZy13aGl0ZS8xMCB0ZXh0LVs5cHhdIGZvbnQtYmxhY2sgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFVwbG9hZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWJyYW5kLWFjY2VudFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9ix2YHYuSDZhdmE2YEg2LXZiNix2Kkg2YXYtNmB2LHYqScgOiAnVVBMT0FEIENIQVNTSVMgRklMRSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUZvcm1JbWFnZVVwbG9hZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jpa2VGb3JtLmltYWdlICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA0XSBiZy1ibGFjay80MCByb3VuZGVkLTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtYXgtaC1bMTEwcHhdIG92ZXJmbG93LWhpZGRlbiBzZWxlY3Qtbm9uZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2Jpa2VGb3JtLmltYWdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJQYXlsb2FkIHByZXZpZXcgY2FyZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1heC1oLTIwIG9iamVjdC1jb250YWluIGRyb3Atc2hhZG93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZXJQb2xpY3k9XCJuby1yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNwYW4tMSBzbTpjb2wtc3Bhbi0yIGJvcmRlci10IGJvcmRlci13aGl0ZS81IHB0LTMgc3BhY2UteS0yLjUgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNDAwIGZvbnQtYmxhY2sgdHJhY2tpbmctd2lkZXN0IHVwcGVyY2FzZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQuNSBoLTQuNSB0ZXh0LWJyYW5kLWFjY2VudCBhbmltYXRlLXB1bHNlXCIgLz4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2KfZhNmF2YjYp9i12YHYp9iqINin2YTZh9mG2K/Ys9mK2Kkg2KfZhNiv2YLZitmC2KknIDogJ0NPUkUgVEVMRU1FVFJZIEFORCBTUEVDUyBNQVRSSVgnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIG1kOmdyaWQtY29scy0zIGdhcC0yLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Lyogc3BlYzogZW5naW5lICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtYm9sZFwiPjEuIFByb3B1bHNpb24gY29yZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YmlrZUZvcm0uc3BlY3MuZW5naW5lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJpa2VGb3JtKHsgLi4uYmlrZUZvcm0sIHNwZWNzOiB7IC4uLmJpa2VGb3JtLnNwZWNzLCBlbmdpbmU6IGUudGFyZ2V0LnZhbHVlIH0gfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1ibGFjay80MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRleHQtd2hpdGUgcm91bmRlZC1sZyBwLTIgdGV4dC14cyBmb2N1czpib3JkZXItYnJhbmQtYWNjZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIHNwZWM6IHNwZWVkICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtYm9sZFwiPjIuIHRvcCB2ZWxvY2l0eTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YmlrZUZvcm0uc3BlY3MudG9wU3BlZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QmlrZUZvcm0oeyAuLi5iaWtlRm9ybSwgc3BlY3M6IHsgLi4uYmlrZUZvcm0uc3BlY3MsIHRvcFNwZWVkOiBlLnRhcmdldC52YWx1ZSB9IH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctYmxhY2svNDAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgcC0yIHRleHQteHMgZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBzcGVjOiBwb3dlciAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTUwMCBmb250LWJvbGRcIj4zLiBvdXRwdXQgZW5lcmd5PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtiaWtlRm9ybS5zcGVjcy5wb3dlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCaWtlRm9ybSh7IC4uLmJpa2VGb3JtLCBzcGVjczogeyAuLi5iaWtlRm9ybS5zcGVjcywgcG93ZXI6IGUudGFyZ2V0LnZhbHVlIH0gfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1ibGFjay80MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRleHQtd2hpdGUgcm91bmRlZC1sZyBwLTIgdGV4dC14cyBmb2N1czpib3JkZXItYnJhbmQtYWNjZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIHNwZWM6IGNvbnN1bXB0aW9uICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWdyYXktNTAwIGZvbnQtYm9sZFwiPjQuIGNvbnN1bXB0aW9uIHJhdGluZzwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YmlrZUZvcm0uc3BlY3MuZnVlbENvbnN1bXB0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJpa2VGb3JtKHsgLi4uYmlrZUZvcm0sIHNwZWNzOiB7IC4uLmJpa2VGb3JtLnNwZWNzLCBmdWVsQ29uc3VtcHRpb246IGUudGFyZ2V0LnZhbHVlIH0gfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1ibGFjay80MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRleHQtd2hpdGUgcm91bmRlZC1sZyBwLTIgdGV4dC14cyBmb2N1czpib3JkZXItYnJhbmQtYWNjZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIHNwZWM6IHdlaWdodCAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTUwMCBmb250LWJvbGRcIj41LiB2ZWhpY2xlIG5ldCB3ZWlnaHQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Jpa2VGb3JtLnNwZWNzLndlaWdodH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRCaWtlRm9ybSh7IC4uLmJpa2VGb3JtLCBzcGVjczogeyAuLi5iaWtlRm9ybS5zcGVjcywgd2VpZ2h0OiBlLnRhcmdldC52YWx1ZSB9IH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctYmxhY2svNDAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgcC0yIHRleHQteHMgZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zcGFuLTEgc206Y29sLXNwYW4tMiBzcGFjZS15LTEgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtWzEwcHhdIHRyYWNraW5nLXdpZGVyXCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNmI2LXZgSDYp9mE2YXZgtiq2LbYqCDZhNmE2KjYt9in2YLYqScgOiAnU0hPV1JPT00gR1JJRCBPVkVSVklFVyBDT1BZJ306PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cz17Mn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YmlrZUZvcm0uc2hvcnREZXNjfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QmlrZUZvcm0oeyAuLi5iaWtlRm9ybSwgc2hvcnREZXNjOiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzc1IGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGZvY3VzOmJvcmRlci1icmFuZC1hY2NlbnQgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHB4LTQgcHktMi41IGZvY3VzOm91dGxpbmUtbm9uZSBmb250LXNhbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNwYW4tMSBzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMSB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdHJhY2tpbmctd2lkZXJcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2KjZitin2YYg2KfZhNmI2LXZgdmKINin2YTZh9mG2K/Ys9mKINin2YTZg9in2YXZhCDZhNmEUERGJyA6ICdIT0xPTUVTSCBIT0xPR1JBUEhJQyBISVNUT1JJQyBTUEVDVFJVTSBNQU5JRkVTVE8gKExPTkcgREVUQUlMUyknfTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPXszfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtiaWtlRm9ybS5sb25nRGVzY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJpa2VGb3JtKHsgLi4uYmlrZUZvcm0sIGxvbmdEZXNjOiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzc1IGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGZvY3VzOmJvcmRlci1icmFuZC1hY2NlbnQgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHB4LTQgcHktMi41IGZvY3VzOm91dGxpbmUtbm9uZSBmb250LXNhbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNwYW4tMSBzbTpjb2wtc3Bhbi0yIHB0LTEgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItMyB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjUgY3Vyc29yLXBvaW50ZXIgc2VsZWN0LW5vbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtiaWtlRm9ybS5pc1BvcHVsYXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJpa2VGb3JtKHsgLi4uYmlrZUZvcm0sIGlzUG9wdWxhcjogZS50YXJnZXQuY2hlY2tlZCB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNCBoLTQgcm91bmRlZCBib3JkZXItWyM2MzY2RjFdLzQwIGJnLVsjMTExODI3XSBmb2N1czpyaW5nLWJyYW5kLXByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIHVwcGVyY2FzZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGxlYWRpbmctbm9uZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1yZWQtNTAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9iq2LHYtNmK2K0g2YPYudix2LYg2YXZhdmK2LIg2YjYtNin2KbYuSDYqNmC2YjYqSDYqNin2YTZiNin2KzZh9ipJyA6ICdBTkNIT1IgQU5EIFBJTiBBUyBBTiBBQ1RJVkUgRkxBR1NISVAgTU9UT1JDWUNMRSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBUQUIgQjogUFJJQ0lORyAmIE9GRkVSUyAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm1TdWJUYWIgPT09ICdwcmljaW5nJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTQgdGV4dC1sZWZ0IGZvbnQtbW9ubyBhbmltYXRlLWZhZGUtaW5cIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0ZXh0LVsxMHB4XSB0cmFja2luZy13aWRlclwiPntsYW5nID09PSAnYXInID8gJ9in2YTYs9i52LEg2KfZhNij2LXZhNmKICjYrNmG2YrZhyknIDogJ09SSUdJTkFMIExJU1QgUFJJQ0UgKEVHUCknfTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Jpa2VGb3JtLm9yaWdpbmFsUHJpY2UgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJpa2VGb3JtKHsgLi4uYmlrZUZvcm0sIG9yaWdpbmFsUHJpY2U6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlLCAxMCkgfHwgMCB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vNzUgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wOF0gZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcHgtNCBweS0yLjUgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtWzEwcHhdIHRyYWNraW5nLXdpZGVyXCI+e2xhbmcgPT09ICdhcicgPyAn2YbZiNi5INin2YTYrti12YUnIDogJ0RJU0NPVU5UIFRZUEUnfTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtiaWtlRm9ybS5kaXNjb3VudFR5cGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEJpa2VGb3JtKHsgLi4uYmlrZUZvcm0sIGRpc2NvdW50VHlwZTogZS50YXJnZXQudmFsdWUgYXMgJ3BlcmNlbnRhZ2UnIHwgJ2ZpeGVkJyB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10vNzUgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wOF0gZm9jdXM6Ym9yZGVyLWJyYW5kLWFjY2VudCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcHgtNCBweS0yLjUgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicGVyY2VudGFnZVwiPiUgUGVyY2VudGFnZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImZpeGVkXCI+e2xhbmcgPT09ICdhcicgPyAn2KzZhtmK2Ycg2YLZitmF2Kkg2KvYp9io2KrYqScgOiAnRUdQIEZpeGVkIEFtb3VudCd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdHJhY2tpbmctd2lkZXJcIj57bGFuZyA9PT0gJ2FyJyA/ICfZgtmK2YXYqSDYp9mE2K7YtdmFJyA6ICdESVNDT1VOVCBWQUxVRSd9OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtiaWtlRm9ybS5kaXNjb3VudCB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QmlrZUZvcm0oeyAuLi5iaWtlRm9ybSwgZGlzY291bnQ6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlLCAxMCkgfHwgMCB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtsYW5nID09PSAnYXInID8gJ9ij2K/YrtmEINmC2YrZhdipINin2YTYrti12YUgKNmF2KvZhCAxNSDZhNmAIDE1JSDYo9mIIDUwMDAg2YTZgCA1MDAwINis2YbZitmHKScgOiAnRW50ZXIgMTUgZm9yIDE1JSBvciA1MDAwIGZvciBFR1AgNSwwMDAnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMTExODI3XS83NSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA4XSBmb2N1czpib3JkZXItYnJhbmQtYWNjZW50IHRleHQtd2hpdGUgcm91bmRlZC14bCBweC00IHB5LTIuNSBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdHJhY2tpbmctd2lkZXJcIj57bGFuZyA9PT0gJ2FyJyA/ICfZhdmE2LXZgiDYp9mE2LnYsdi2INin2YTYsdmK2KfYttmKJyA6ICdPRkZFUiBQUk9NTyBCQURHRSBMQUJFTCd9OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YmlrZUZvcm0ub2ZmZXJMYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QmlrZUZvcm0oeyAuLi5iaWtlRm9ybSwgb2ZmZXJMYWJlbDogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj0nZS5nLiBcIkhPVCBERUFMIPCflKVcIiwgXCJMSU1JVEVEIE9GRkVSXCInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzc1IGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGZvY3VzOmJvcmRlci1icmFuZC1hY2NlbnQgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHB4LTQgcHktMi41IGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIExpdmUgRHluYW1pYyBDYWxjdWxhdGVkIFByaWNlIERpc3BsYXkgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBiZy1icmFuZC1wcmltYXJ5LzEwIGJvcmRlciBib3JkZXItYnJhbmQtcHJpbWFyeS8zMCByb3VuZGVkLTJ4bCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVs4cHhdIHRleHQtZ3JheS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCI+e2xhbmcgPT09ICdhcicgPyAn2KfZhNiz2LnYsSDYp9mE2YbZh9in2KbZiiDYp9mE2YXYrdiz2YjYqCDZiNiq2KPYq9mK2LEg2KfZhNiu2LXZhScgOiAnQ0FMQ1VMQVRFRCBSRVRBSUwgVkFMVUUgQUZURVIgUFJPTU9USU9OUyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ibGFjayB0ZXh0LWJyYW5kLXNlY29uZGFyeVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcmljZSA9IE51bWJlcihiaWtlRm9ybS5vcmlnaW5hbFByaWNlICE9PSB1bmRlZmluZWQgPyBiaWtlRm9ybS5vcmlnaW5hbFByaWNlIDogKGJpa2VGb3JtLnByaWNlTnVtIHx8IDQ1MDAwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc2MgPSBOdW1iZXIoYmlrZUZvcm0uZGlzY291bnQgfHwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXNjID4gMCAmJiBiaWtlRm9ybS5vcmlnaW5hbFByaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJpa2VGb3JtLmRpc2NvdW50VHlwZSA9PT0gJ3BlcmNlbnRhZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZSA9IE1hdGgucm91bmQoYmlrZUZvcm0ub3JpZ2luYWxQcmljZSAqICgxIC0gZGlzYyAvIDEwMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZSA9IE1hdGgucm91bmQoTWF0aC5tYXgoMCwgYmlrZUZvcm0ub3JpZ2luYWxQcmljZSAtIGRpc2MpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByaWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKS50b0xvY2FsZVN0cmluZygpfSB7bGFuZyA9PT0gJ2FyJyA/ICfYrNmG2YrZhycgOiAnRUdQJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHQgdGV4dC1bMTBweF0gdGV4dC1ncmF5LTUwMCBtYXgtdy1bMjAwcHhdXCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9mK2YLZiNmFINin2YTZhdi52KfZhNisINio2K3Ys9in2Kgg2KfZhNiz2LnYsSDZhNis2YXZiti5INij2LHYrNin2KEg2KfZhNmF2YbYtdipINiq2YTZgtin2KbZitin2Ysg2YHZiNixINmD2KrYp9io2Kkg2KfZhNij2LHZgtin2YUnIDogJ051bWVyaWNhbCBjYWxpYnJhdGlvbnMgdXBkYXRlIHNob3dyb29tcyBhbmQgY2F0YWxvZ3MgaW5zdGFudGFuZW91c2x5Lid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFRBQiBDOiBDQVRBTE9HIEJST0NIVVJFICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybVN1YlRhYiA9PT0gJ2NhdGFsb2cnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCB0ZXh0LWxlZnQgZm9udC1tb25vIGFuaW1hdGUtZmFkZS1pblwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtZ3JheS00MDAgbGVhZGluZy1ub3JtYWwgZm9udC1zYW5zXCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfZhdix2YHZgtin2Kog2KfZhNmD2KrYp9mE2YjYrCDYp9mE2LHZgtmF2YrYqSDYqNi12YrYutipIFBERiDYqtis2LnZhCDYp9mE2YXYtNiq2LHZiiDZitiq2LXZgditINin2YTYr9mE2YrZhCDYp9mE2YHZhtmKINio2YTZhdiz2Kkg2YXZhiDZiNin2KzZh9ipINin2YTZhdi52KfZitmG2KkuJyA6ICdJbnRyb2R1Y2UgZGlnaXRhbCB0ZWxlbWV0cnkgZ3VpZGVzLiBVcGxvYWQgaGlnaC1maWRlbGl0eSBQREYgZG9jdW1lbnRzIHRoYXQgYXR0YWNoIGRpcmVjdGx5IHRvIHNob3dyb29tIGNhcmQgZmxpcHMuJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jpa2VGb3JtLmNhdGFsb2dGaWxlTmFtZSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYmctYnJhbmQtcHJpbWFyeS8xMCBib3JkZXIgYm9yZGVyLWJyYW5kLXByaW1hcnkvMzUgcm91bmRlZC0yeGwgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgYmctYnJhbmQtYWNjZW50LzEwIGJvcmRlciBib3JkZXItYnJhbmQtYWNjZW50LzI1IHJvdW5kZWQtbGcgdGV4dC1icmFuZC1hY2NlbnQgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZpbGVUZXh0IGNsYXNzTmFtZT1cInctNiBoLTYgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzhweF0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVzdFwiPkFDVElWRSBDQVRBTE9HIEdVSURFIEZpbGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ibGFjayB0ZXh0LXdoaXRlIHRydW5jYXRlIGJsb2NrIG10LTAuNVwiPntiaWtlRm9ybS5jYXRhbG9nRmlsZU5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEJpa2VGb3JtKHByZXYgPT4gKHsgLi4ucHJldiwgY2F0YWxvZ0ZpbGVOYW1lOiAnJywgY2F0YWxvZ0ZpbGVDb250ZW50OiAnJyB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YUg2YHYtdmEINin2YTZg9iq2KfZhNmI2KwnIDogJ0RpZ2l0YWwgYnJvY2h1cmUgZGV0YWNoZWQnLCAnaW5mbycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiB3LWZ1bGwgdGV4dC1jZW50ZXIgYm9yZGVyIGJvcmRlci1yZWQtNTAwLzIwIGJnLXJlZC01MDAvNSBob3ZlcjpiZy1yZWQtNTAwLzEwIHRleHQtcmVkLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHJvdW5kZWQteGwgdGV4dC1bMTBweF0gZm9udC1ibGFjayB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfZhdiz2K0g2YjYrdiw2YEg2KfZhNmF2YTZgSDYp9mE2K3Yp9mE2YonIDogJ0RFVEFDSCBBTkQgUkVNT1ZFIFBERiBCUk9DSFVSRSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgYm9yZGVyLTIgYm9yZGVyLWRhc2hlZCBib3JkZXItd2hpdGUvMTAgaG92ZXI6Ym9yZGVyLWJyYW5kLWFjY2VudC80MCBiZy1ibGFjay80MCByb3VuZGVkLTJ4bCB0ZXh0LWNlbnRlciBzcGFjZS15LTMuNSB0cmFuc2l0aW9uLWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMiBoLTEyIGJnLXdoaXRlLzUgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbXgtYXV0byB0ZXh0LWdyYXktNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VXBsb2FkIGNsYXNzTmFtZT1cInctNiBoLTYgdGV4dC1ncmF5LTUwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIHVwcGVyY2FzZVwiPntsYW5nID09PSAnYXInID8gJ9it2K/YryDZhdmE2YEg2KfZhNmD2KrYp9mE2YjYrCDYqNi12YrYutipIFBERicgOiAnTk8gVEVMRU1FVFJZIENBVEFMT0cgQVRUQUNIRUQnfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTUwMCBsb3dlcmNhc2UgZm9udC1zYW5zXCI+cGRmIGZpbGUgc2l6ZXMgdXAgdG8gNW1iLiBhdXRvLWVuY29kZXMgdG8gYmFzZTY0IGJ1ZmZlciBtYXRyaXguPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTQgcHktMiBiZy1icmFuZC1hY2NlbnQgaG92ZXI6YmctWyMxOGI1Y2NdIHRleHQtWyMwQjBGMUFdIGZvbnQtZXh0cmFib2xkIHJvdW5kZWQteGwgY3Vyc29yLXBvaW50ZXIgdGV4dC1bMTAuNXB4XSB1cHBlcmNhc2UgdHJhbnNpdGlvbi1hbGwgc2hhZG93LW1kIHNoYWRvdy1icmFuZC1hY2NlbnQvMTVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxVcGxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2LHZgdi5INin2YTZg9iq2KfZhNmI2Kwg2KfZhNix2YLZhdmKIFBERicgOiAnVVBMT0FEIENBVEFMT0cgUERGJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQ9XCJhcHBsaWNhdGlvbi9wZGZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXM/LlswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUudHlwZSAhPT0gJ2FwcGxpY2F0aW9uL3BkZicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2YrYsdis2Ykg2LHZgdi5INmF2YTZgSBQREYg2YHZgti3JyA6ICdPbmx5IFBERiBzcGVjcyBicm9jaHVyZXMgYXJlIHN1cHBvcnRlZCcsICdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZS5zaXplID4gNSAqIDEwMjQgKiAxMDI0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9ij2YLYtdmJINit2KzZhSDZhNmE2YXZhNmBINmH2YggNSDZhdmK2KzYp9io2KfZitiqJyA6ICdQREYgc2l6ZSByZXN0cmljdGVkIHRvIDVNQicsICdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWFkZXIucmVzdWx0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEJpa2VGb3JtKHByZXYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRhbG9nRmlsZU5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGFsb2dGaWxlQ29udGVudDogcmVhZGVyLnJlc3VsdCBhcyBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KrZhSDYqtiu2LLZitmGINin2YTZg9iq2KfZhNmI2Kwg2YjYrdmB2LjZhyDZhdi02YHYsdin2Ysg2YHZiiDYotmE2Kkg2KfZhNmF2LnYp9mE2KzYqScgOiAnUERGIGNhdGFsb2cgZ3VpZGFuY2UgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5JywgJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBUQUIgRDogQURELU9OUyAmIEFDQ0VTU09SSUVTICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybVN1YlRhYiA9PT0gJ2FkZG9ucycgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IHRleHQtbGVmdCBmb250LW1vbm8gYW5pbWF0ZS1mYWRlLWluXCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogTmV3IEFjY2Vzc29yeSBJbnRlZ3JhdGlvbiBmb3JtICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYmctYmxhY2svNTAgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wNF0gcm91bmRlZC0yeGwgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHRleHQtYnJhbmQtc2Vjb25kYXJ5IHRyYWNraW5nLXdpZGVzdCB1cHBlcmNhc2UgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBib3JkZXItYiBib3JkZXItd2hpdGUvNSBwYi0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYnJhbmQtc2Vjb25kYXJ5IHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYqti52LHZitmBINmF2YTYrdmCINmI2KPZg9iz2LPZiNin2LEg2KXYttin2YHZiiDYrNiv2YrYrycgOiAnSU5URUdSQVRFIE5FVyBEWU5BTUlDIEFERC1PTid9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2g0PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBnYXAtMi41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS00MDAgZm9udC1ib2xkIHVwcGVyY2FzZVwiPk5hbWUgKEVOKTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld0FkZE9uLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3QWRkT24oeyAuLi5uZXdBZGRPbiwgbmFtZTogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVGl0YW5pdW0gRXhoYXVzdCBTeXN0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddIGJvcmRlciBib3JkZXItd2hpdGUvMTAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHAtMiB0ZXh0LXhzIGZvY3VzOmJvcmRlci1icmFuZC1zZWNvbmRhcnkgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS00MDAgZm9udC1ib2xkIHVwcGVyY2FzZVwiPk5hbWUgKEFSIC0gT3B0aW9uYWwpOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3QWRkT24ubmFtZUFyIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE5ld0FkZE9uKHsgLi4ubmV3QWRkT24sIG5hbWVBcjogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi2LTZg9mF2KfZhiDYqtmK2KrYp9mG2YrZiNmFINix2YrYp9i22YpcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddIGJvcmRlciBib3JkZXItd2hpdGUvMTAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHAtMiB0ZXh0LXhzIGZvY3VzOmJvcmRlci1icmFuZC1zZWNvbmRhcnkgZm9jdXM6b3V0bGluZS1ub25lIHRleHQtcmlnaHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTQwMCBmb250LWJvbGQgdXBwZXJjYXNlXCI+e2xhbmcgPT09ICdhcicgPyAn2LPYudixINin2YTYqtis2LLYptipICjYrNmG2YrZhyknIDogJ1JldGFpbCBQcmljZSAoRUdQKSd9OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdBZGRPbi5wcmljZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdBZGRPbih7IC4uLm5ld0FkZE9uLCBwcmljZTogcGFyc2VJbnQoZS50YXJnZXQudmFsdWUsIDEwKSB8fCAwIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddIGJvcmRlciBib3JkZXItd2hpdGUvMTAgdGV4dC1icmFuZC1zZWNvbmRhcnkgcm91bmRlZC1sZyBwLTIgdGV4dC14cyBmb2N1czpib3JkZXItYnJhbmQtc2Vjb25kYXJ5IGZvY3VzOm91dGxpbmUtbm9uZSBmb250LWJsYWNrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS00MDAgZm9udC1ib2xkIHVwcGVyY2FzZVwiPkltYWdlIElsbHVzdHJhdGlvbiBVUkw6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdBZGRPbi5pbWFnZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdBZGRPbih7IC4uLm5ld0FkZE9uLCBpbWFnZTogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzExMTgyN10gYm9yZGVyIGJvcmRlci13aGl0ZS8xMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgcC0yIHRleHQteHMgZm9jdXM6Ym9yZGVyLWJyYW5kLXNlY29uZGFyeSBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBzbTpjb2wtc3Bhbi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWdyYXktNDAwIGZvbnQtYm9sZCB1cHBlcmNhc2VcIj5EZXNjcmlwdGlvbiAoRU4pOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3QWRkT24uZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3QWRkT24oeyAuLi5uZXdBZGRPbiwgZGVzY3JpcHRpb246IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddIGJvcmRlciBib3JkZXItd2hpdGUvMTAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHAtMiB0ZXh0LXhzIGZvY3VzOmJvcmRlci1icmFuZC1zZWNvbmRhcnkgZm9jdXM6b3V0bGluZS1ub25lIGZvbnQtc2Fuc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIHNtOmNvbC1zcGFuLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtZ3JheS00MDAgZm9udC1ib2xkIHVwcGVyY2FzZVwiPkRlc2NyaXB0aW9uIChBUiAtIE9wdGlvbmFsKTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld0FkZE9uLmRlc2NBciB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdBZGRPbih7IC4uLm5ld0FkZE9uLCBkZXNjQXI6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddIGJvcmRlciBib3JkZXItd2hpdGUvMTAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHAtMiB0ZXh0LXhzIGZvY3VzOmJvcmRlci1icmFuZC1zZWNvbmRhcnkgZm9jdXM6b3V0bGluZS1ub25lIHRleHQtcmlnaHQgZm9udC1zYW5zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXdBZGRPbi5uYW1lIHx8IG5ld0FkZE9uLnByaWNlIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZVRvYXN0KGxhbmcgPT09ICdhcicgPyAn2KfZhNix2KzYp9ihINil2K/Yrtin2YQg2KfYs9mFINin2YTZhdmE2K3ZgiDZiNiz2LnYsSDYtdin2YTYrScgOiAnUGxlYXNlIGlucHV0IGEgbmFtZSBhbmQgdmFsaWQgcHJpY2UnLCAnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkb25PYmo6IEFkZE9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5uZXdBZGRPbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGBhZGRvbi0ke0RhdGUubm93KCl9YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEJpa2VGb3JtKHByZXYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkT25zOiBbLi4uKHByZXYuYWRkT25zIHx8IFtdKSwgYWRkb25PYmpdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdBZGRPbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVBcjogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NTg5ODE4MDYtZWM1MjdmYTg0YzM5P2F1dG89Zm9ybWF0JmZpdD1jcm9wJnE9ODAmdz0xNTAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NBcjogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVUb2FzdChsYW5nID09PSAnYXInID8gJ9iq2YXYqiDYpdi22KfZgdipINin2YTYo9mD2LPYs9mI2KfYsSDYqNmG2KzYp9itINmE2YTYotmE2KknIDogJ0FjY2Vzc29yeSBpbnRlZ3JhdGVkIGludG8gbW9kZWwgc3BlYyBhcnJheScsICdzdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMiBjdXJzb3ItcG9pbnRlciBiZy1icmFuZC1zZWNvbmRhcnkgaG92ZXI6YmctYW1iZXItNDAwIHRleHQtWyMwQjBGMUFdIGZvbnQtYmxhY2sgdHJhY2tpbmctd2lkZXN0IHRleHQtWzkuNXB4XSByb3VuZGVkLXhsIGhvdmVyOmJyaWdodG5lc3MtMTEwIGFjdGl2ZTpzY2FsZS1bMC45OF0gdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2K/ZhdisINin2YTYo9mD2LPYs9mI2KfYsSDYqNin2YTZhtmF2YjYsNisJyA6ICdQVUxMIEFDQ0VTU09SWSBJTlRPIE1PVE9SQ1lDTEUgU1BFQyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDb25maWd1cmVkIEFkZC1vbnMgaW52ZW50b3J5ICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JheS01MDAgZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gYNin2YTZhdix2YHZgtin2Kog2KfZhNit2KfZhNmK2KkgKCR7YmlrZUZvcm0uYWRkT25zPy5sZW5ndGggfHwgMH0pYCA6IGBBVFRBQ0hFRCBBQ0NFU1NPUklFUyAoJHtiaWtlRm9ybS5hZGRPbnM/Lmxlbmd0aCB8fCAwfSlgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2g0PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoIWJpa2VGb3JtLmFkZE9ucyB8fCBiaWtlRm9ybS5hZGRPbnMubGVuZ3RoID09PSAwKSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDRdIGJnLXdoaXRlL1swLjAyXSB0ZXh0LWNlbnRlciB0ZXh0LWdyYXktNTAwIGZvbnQtc2FucyBpdGFsaWMgdGV4dC1bMTBweF1cIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfZhNinINiq2YjYrNivINij2YPYs9iz2YjYp9ix2KfYqiDZhdiu2LXYtdipINmE2YfYsNmHINin2YTYr9ix2KfYrNipJyA6ICdObyBzcGVjaWFsaXplZCBwZXJmb3JtYW5jZSBhZGQtb25zIGF0dGFjaGVkIHRvIHRoaXMgY2hhc3NpcyB5ZXQuJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IG1heC1oLVsyMjBweF0gb3ZlcmZsb3cteS1hdXRvIHNjcm9sbGJhci10aGluXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YmlrZUZvcm0uYWRkT25zLm1hcCgoYWRkLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2FkZC5pZH0gY2xhc3NOYW1lPVwicC0yIGJvcmRlciBib3JkZXItd2hpdGUvNSBiZy1ibGFjay80MCByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2FkZC5pbWFnZX0gY2xhc3NOYW1lPVwidy04IGgtOCBvYmplY3QtY292ZXIgcm91bmRlZC1sZyBzaHJpbmstMCBiZy13aGl0ZS81XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0wIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJsYWNrIHRydW5jYXRlXCI+e2xhbmcgPT09ICdhcicgJiYgYWRkLm5hbWVBciA/IGFkZC5uYW1lQXIgOiBhZGQubmFtZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1icmFuZC1zZWNvbmRhcnkgZm9udC1ibGFjayBmb250LW1vbm9cIj57YWRkLnByaWNlLnRvTG9jYWxlU3RyaW5nKCl9IHtsYW5nID09PSAnYXInID8gJ9is2YbZitmHJyA6ICdFR1AnfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWdyYXktNDAwIGZvbnQtc2FucyB0cnVuY2F0ZVwiPntsYW5nID09PSAnYXInICYmIGFkZC5kZXNjQXIgPyBhZGQuZGVzY0FyIDogYWRkLmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHNocmluay0wIHNlbGVjdC1ub25lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aWR4ID09PSAwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IFsuLi5iaWtlRm9ybS5hZGRPbnNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlbXAgPSBsaXN0W2lkeF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdFtpZHhdID0gbGlzdFtpZHggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0W2lkeCAtIDFdID0gdGVtcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCaWtlRm9ybShwcmV2ID0+ICh7IC4uLnByZXYsIGFkZE9uczogbGlzdCB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMSBweC0xLjUgdGV4dC1ncmF5LTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGRpc2FibGVkOm9wYWNpdHktMzAgYmctd2hpdGUvNSByb3VuZGVkIHBvaW50ZXItZXZlbnRzLWF1dG8gY3Vyc29yLXBvaW50ZXIgdGV4dC1bOXB4XSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKWslxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aWR4ID09PSBiaWtlRm9ybS5hZGRPbnMubGVuZ3RoIC0gMX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBbLi4uYmlrZUZvcm0uYWRkT25zXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wID0gbGlzdFtpZHhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RbaWR4XSA9IGxpc3RbaWR4ICsgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdFtpZHggKyAxXSA9IHRlbXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QmlrZUZvcm0ocHJldiA9PiAoeyAuLi5wcmV2LCBhZGRPbnM6IGxpc3QgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgcHgtMS41IHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSBkaXNhYmxlZDpvcGFjaXR5LTMwIGJnLXdoaXRlLzUgcm91bmRlZCBwb2ludGVyLWV2ZW50cy1hdXRvIGN1cnNvci1wb2ludGVyIHRleHQtWzlweF0gdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilrxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEJpa2VGb3JtKHByZXYgPT4gKHsgLi4ucHJldiwgYWRkT25zOiBwcmV2LmFkZE9ucy5maWx0ZXIoYSA9PiBhLmlkICE9PSBhZGQuaWQpIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlVG9hc3QobGFuZyA9PT0gJ2FyJyA/ICfYqtmFINmB2LXZhCDYp9mE2KPZg9iz2LPZiNin2LEnIDogJ0RldGFjaGVkIGFjY2Vzc29yeScsICdpbmZvJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMSB0ZXh0LXJlZC00MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy1yZWQtNTAwIHJvdW5kZWQgcG9pbnRlci1ldmVudHMtYXV0byBjdXJzb3ItcG9pbnRlciB0ZXh0LVs5cHhdIHRyYW5zaXRpb24tY29sb3JzIHNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pyVXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBUQUIgRTogUkVMQVRFRCBTVE9SRSBQUk9EVUNUUyAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm1TdWJUYWIgPT09ICdyZWxhdGVkJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTQgdGV4dC1sZWZ0IGZvbnQtbW9ubyBhbmltYXRlLWZhZGUtaW5cIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBiZy1ibGFjay81MCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjA0XSByb3VuZGVkLTJ4bCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtYmxhY2sgdGV4dC1icmFuZC1zZWNvbmRhcnkgdHJhY2tpbmctd2lkZXN0IHVwcGVyY2FzZSBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2K3Yr9ivINin2YTZhdmG2KrYrNin2Kog2LDYp9iqINin2YTYtdmE2Kkg2KjYp9mE2YXZiNiv2YrZhCcgOiAnQXR0YWNoIFJlbGF0ZWQgU3RvcmUgUHJvZHVjdHMnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yIG1iLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtsYW5nID09PSAnYXInID8gJ9io2K3Yqy4uLicgOiAnU2VhcmNoLi4uJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBiZy1ibGFjay81MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcHgtNCBweS0yIHRleHQtd2hpdGUgdGV4dC14c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNoVGVybX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoVGVybShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ibGFjay81MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcHgtNCBweS0yIHRleHQtd2hpdGUgdGV4dC14c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDYXRlZ29yeX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VsZWN0ZWRDYXRlZ29yeShlLnRhcmdldC52YWx1ZSBhcyBTdG9yZUNhdGVnb3J5IHwgJ0FMTCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJBTExcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YPZhCcgOiAnQWxsJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtbJ09pbHMnLCAnU2FmZXR5JywgJ1NtYXJ0JywgJ1BhcnRzJywgJ0xpZmVzdHlsZSddLm1hcChjYXQgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17Y2F0fSB2YWx1ZT17Y2F0fT57Y2F0fTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LWgtWzMwMHB4XSBvdmVyZmxvdy15LWF1dG8gc3BhY2UteS0yIHByLTIgY3VzdG9tLXNjcm9sbGJhclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzdG9yZVByb2R1Y3RzPy5maWx0ZXIocHJvZHVjdCA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNlbGVjdGVkQ2F0ZWdvcnkgPT09ICdBTEwnIHx8IHByb2R1Y3QuY2F0ZWdvcnkgPT09IHNlbGVjdGVkQ2F0ZWdvcnkpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHJvZHVjdC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKSB8fCBwcm9kdWN0Lm5hbWVBci5pbmNsdWRlcyhzZWFyY2hUZXJtKSB8fCBwcm9kdWN0LmlkLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLm1hcCgocHJvZHVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IChiaWtlRm9ybS5yZWxhdGVkUHJvZHVjdElkcyB8fCBbXSkuaW5jbHVkZXMocHJvZHVjdC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17cHJvZHVjdC5pZH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgcC0yIGJvcmRlciBib3JkZXItd2hpdGUvNSBiZy13aGl0ZS81IHJvdW5kZWQteGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImN1cnNvci1wb2ludGVyIHRleHQtYnJhbmQtcHJpbWFyeSBiZy1ibGFjayBib3JkZXItd2hpdGUvMjAgcm91bmRlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtpc1NlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBiaWtlRm9ybS5yZWxhdGVkUHJvZHVjdElkcyB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1JlbGF0ZWQgPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3QWRkT25zID0gWy4uLihiaWtlRm9ybS5hZGRPbnMgfHwgW10pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UmVsYXRlZCA9IFsuLi5jdXJyZW50LCBwcm9kdWN0LmlkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdBZGRvbjogQWRkT24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogYGFkZG9uLSR7cHJvZHVjdC5pZH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZUFyOiBwcm9kdWN0Lm5hbWVBcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiBwYXJzZUludChTdHJpbmcocHJvZHVjdC5wcmljZSkucmVwbGFjZSgvW14wLTldL2csICcnKSwgMTApIHx8IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogcHJvZHVjdC5pbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwcm9kdWN0LmRlc2NyaXB0aW9uIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY0FyOiBwcm9kdWN0LmRlc2NyaXB0aW9uQXIgfHwgJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0FkZE9ucy5wdXNoKG5ld0FkZG9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSZWxhdGVkID0gY3VycmVudC5maWx0ZXIoaWQgPT4gaWQgIT09IHByb2R1Y3QuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0FkZE9ucyA9IG5ld0FkZE9ucy5maWx0ZXIoYSA9PiBhLmlkICE9PSBgYWRkb24tJHtwcm9kdWN0LmlkfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEJpa2VGb3JtKHsgLi4uYmlrZUZvcm0sIHJlbGF0ZWRQcm9kdWN0SWRzOiBuZXdSZWxhdGVkLCBhZGRPbnM6IG5ld0FkZE9ucyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17cHJvZHVjdC5pbWFnZX0gY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkIGJnLWJsYWNrLzUwIG9iamVjdC1jb250YWluIHAtMVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMCBwci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIHRydW5jYXRlXCI+e2xhbmcgPT09ICdhcicgPyBwcm9kdWN0Lm5hbWVBciA6IHByb2R1Y3QubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTQwMCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0XCI+e3Byb2R1Y3QuaWR9IOKAoiB7cHJvZHVjdC5wcmljZX0gRUdQPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KCFzdG9yZVByb2R1Y3RzIHx8IHN0b3JlUHJvZHVjdHMubGVuZ3RoID09PSAwKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1ncmF5LTUwMCBpdGFsaWMgcC00IHRleHQtY2VudGVyXCI+Tm8gcHJvZHVjdHMgaW4gc3RvcmUgdG8gbGluay48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIGJvcmRlci10IGJvcmRlci13aGl0ZS81IGZsZXgganVzdGlmeS1lbmQgZ2FwLTMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHNldElzQWRkaW5nTmV3KGZhbHNlKTsgc2V0RWRpdGluZ0Jpa2UobnVsbCk7IH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yLjUgcm91bmRlZC14bCBiZy13aGl0ZS81IGhvdmVyOmJnLXdoaXRlLzEwIHRleHQtZ3JheS0zMDAgZm9udC1ib2xkIGN1cnNvci1wb2ludGVyIHRleHQteHMgdXBwZXJjYXNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9iq2LHYp9is2LknIDogJ0RJU0NBUkQgQ0hBTkdFUyd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNSBweS0yLjUgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tYnJhbmQtcHJpbWFyeSB0by1bIzIyRDNFRV0gdGV4dC1bIzBCMEYxQV0gZm9udC1leHRyYWJvbGQgdXBwZXJjYXNlIGhvdmVyOmJyaWdodG5lc3MtMTEwIGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGN1cnNvci1wb2ludGVyIHRleHQteHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9iq2KvYqNmK2Kog2KfZhNii2YTYqSDZiNit2YHYuNmH2KcnIDogJ0FVVEhPUklaRSBJTlZFTlRPUlkgV1JJVEUnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBUQUI6IFNUT1JFIE1BTkFHRU1FTlQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSAnc3RvcmUnICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5pbWF0ZS1mYWRlLWluIHRleHQtbGVmdCBtaW4taC1bNjAwcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICA8U3RvcmVBZG1pblBhbmVsIFxuICAgICAgICAgICAgICAgICAgICAgICBzdG9yZVByb2R1Y3RzPXtzdG9yZVByb2R1Y3RzfSBcbiAgICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVTdG9yZVByb2R1Y3RzPXtvblVwZGF0ZVN0b3JlUHJvZHVjdHMhfSBcbiAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gVEFCIDM6IE5PREUgT1BFUkFUT1JTIE1BTkFHRU1FTlQgKFVTRVJTIExJU1QpID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3VzZXJzJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNSBhbmltYXRlLWZhZGUtaW5cIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItMiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdHJhY2tpbmctd2lkZXN0IGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfZhdi02LrZhNmIINin2YTYudmC2K8g2YjYrNmE2LPYp9iqINin2YTYudmF2YQnIDogJ05PREUgT1BFUkFUT1JTIFNFQ1VSSVRZIERJUkVDVE9SWSd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1ncmF5LTUwMCBub3JtYWwtY2FzZSBsZWFkaW5nLW5vcm1hbCBmb250LXNhbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KXZhti02KfYoSDYrdiz2KfYqNin2Kog2KzYr9mK2K/YqSDZiNiq2LnZitmK2YYg2YXYs9iq2YjZitin2Kog2KfZhNmI2LXZiNmEICjZhdi02LHZgdiMINmF2K/Zitix2Iwg2YXYtNi62YQpJyA6ICdBdXRob3JpemUgc2Vjb25kYXJ5IGNyZWRlbnRpYWxzLCBhc3NpZ24gYWNjZXNzIHJpZ2h0cywgYW5kIHJldm9rZSBub2RlIGtleXMgc2FmZWx5Lid9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBiZy1icmFuZC1wcmltYXJ5LzEwIGJvcmRlciBib3JkZXItYnJhbmQtcHJpbWFyeS8yMCB0ZXh0LVsjMjJEM0VFXSBmb250LW1vbm8gdGV4dC1bOXB4XSBweC0yIHB5LTEgcm91bmRlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPk1BU1RFUiBTWVNPUFMgU0VDVVJJVFkgQUNUUyB2Mi4yNjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAge3Nlc3Npb25Vc2VyLnJvbGUgIT09ICdBZG1pbicgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgLy8gVW5hdXRob3JpemVkIG92ZXJsYXkgZm9yIE1hbmFnZXIgJiBTdGFmZlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC04IHRleHQtY2VudGVyIGJvcmRlciBib3JkZXItcmVkLTUwMC8yMCBiZy1yZWQtOTUwLzE1IHJvdW5kZWQtMnhsIHNwYWNlLXktMyBmb250LW1vbm8gdHJhY2tpbmctd2lkZXIgbWF4LXctbWQgbXgtYXV0byBteS02IHNoYWRvdy1sZyBzaGFkb3ctcmVkLTUwMC81XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U2hpZWxkQWxlcnQgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHRleHQtcmVkLTUwMCBteC1hdXRvIGFuaW1hdGUtYm91bmNlIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtcmVkLTQwMCBmb250LWJsYWNrIHRleHQteHMgdXBwZXJjYXNlXCI+e2xhbmcgPT09ICdhcicgPyAn2YTZiNin2KbYrSDYp9mE2KPZhdin2YY6INin2YTZiNi12YjZhCDZhdix2YHZiNi2IScgOiAnU0VDVVJJVFkgQlJFQUNIIFdBUk5JTkc6IEFDQ0VTUyBERU5JRUQnfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTUwMCBsb3dlcmNhc2UgbXQtMSBub3JtYWwtY2FzZSBmb250LXNhbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYsdiu2LUg2YPYqNin2LEg2KfZhNmF2LfZiNix2YrZhiDYqtiq2LfZhNioINi12YTYp9it2YrYp9iqINin2YTZhdi02LHZgSDYp9mE2KrYp9mFIChBZG1pbikuINmF2LTYutmE2YMg2KfZhNit2KfZhNmKINmF2K3YsdmI2YUg2YXZhiDYp9mE2K/YrtmI2YQuJyA6ICdDdXJhdGlvbiBvZiBPcGVyYXRvciBOb2RlcyByZXF1aXJlcyBDb3JlIGFkbWluaXN0cmF0b3IgYXV0aG9yaXphdGlvbi4gQ3JlZGVudGlhbHMgbG9nZ2VkLid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIC8vIEZ1bGwgVXNlciBjb25maWd1cmF0aW9uIHBhZ2VcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC01IGZvbnQtbW9ubyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDb2x1bW4gQTogVXNlciBBZGRpdGlvbiBQYW5lbCAoNCBTcGFuKSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSBwLTQgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wNF0gYmctWyMxMTE2MjJdLzgwIHJvdW5kZWQtMnhsIHNwYWNlLXktNCBzaGFkb3ctc21cIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LWJyYW5kLXNlY29uZGFyeSBmb250LWJsYWNrIGJvcmRlci1iIGJvcmRlci13aGl0ZS81IHBiLTEuNSB0cmFja2luZy13aWRlciB1cHBlcmNhc2UgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQbHVzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1icmFuZC1zZWNvbmRhcnlcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9iq2YHZiNmK2LYg2YXYtNi62YQg2YHYsdi52Yog2KzYr9mK2K8nIDogJ0RFTEVHQVRFIE5FVyBPUEVSQVRPUid9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2g0PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVBZGRVc2VyU3VibWl0fSBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSB0ZXh0LWxlZnRcIiBkaXI9e2Rpcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0ZXh0LVsxMHB4XSB0cmFja2luZy13aWRlIHVwcGVyY2FzZVwiPntsYW5nID09PSAnYXInID8gJ9in2YTYp9iz2YUg2KfZhNmF2LnYsdmBJyA6ICdOT0RFIFVTRVJOQU1FIElERU5USVRZJ306PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdVc2VybmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdVc2VybmFtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwib3BlcmF0b3JfaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctYmxhY2svNjAgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wOF0gZm9jdXM6Ym9yZGVyLWJyYW5kLXNlY29uZGFyeSB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcHgtMyBweS0yIHRleHQteHMgZm9jdXM6b3V0bGluZS1ub25lIHB5LTIuNSBsb3dlcmNhc2UgZm9udC1zZW1pYm9sZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgdGV4dC1sZWZ0XCIgZGlyPXtkaXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtZ3JheS00MDAgdGV4dC1bMTBweF0gdHJhY2tpbmctd2lkZSB1cHBlcmNhc2VcIj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2LHZhdiyINin2YTZhdi02YHYsSDZhNmE2K/YrtmI2YQnIDogJ1NFQ1VSRSBERUxFR0FUSU9OIENPREUnfTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld1Bhc3N3b3JkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE5ld1Bhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLigKLigKLigKLigKLigKLigKLigKLigKLigKLigKLigKLigKJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctYmxhY2svNjAgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wOF0gZm9jdXM6Ym9yZGVyLWJyYW5kLXNlY29uZGFyeSB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgcHgtMyBweS0yIHRleHQteHMgZm9jdXM6b3V0bGluZS1ub25lIHB5LTIuNSBmb250LWJvbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIHRleHQtbGVmdFwiIGRpcj17ZGlyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtWzEwcHhdIHRyYWNraW5nLXdpZGUgdXBwZXJjYXNlXCI+e2xhbmcgPT09ICdhcicgPyAn2LHYqtio2Kkg2KfZhNmI2LXZiNmEINmI2KfZhNi02KjZg9ipJyA6ICdBQ0NFU1MgU1BFQ1RSVU0gUk9MRSd9OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdSb2xlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE5ld1JvbGUoZS50YXJnZXQudmFsdWUgYXMgVXNlclJvbGUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMxMTE4MjddLzc1IGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDhdIGZvY3VzOmJvcmRlci1icmFuZC1zZWNvbmRhcnkgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHB4LTMgcHktMi41IHRleHQteHMgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkFkbWluXCI+e2xhbmcgPT09ICdhcicgPyAn2YXYtNix2YEg2LHYptmK2LPZiiAoQWRtaW4pJyA6ICdDT1JFIEFETUlOIChGdWxsIFdyaXRlcyArIFVzZXJzKSd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJNYW5hZ2VyXCI+e2xhbmcgPT09ICdhcicgPyAn2YXYr9mK2LEg2KPYs9i32YjZhCAoTWFuYWdlciknIDogJ01BTkFHRVIgTk9ERSAoQWRkICYgRWRpdCBGbGVldCBvbmx5KSd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJTdGFmZlwiPntsYW5nID09PSAnYXInID8gJ9mB2LHZitmCINi52YXZhC/Zhdi02LrZhCAoU3RhZmYgT3BlcmF0b3IpJyA6ICdTdGFmZiBPcGVyYXRvciAoT25seSBBZGQgTW90b3JjeWNsZXMpJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMi41IG10LTIgYmctYnJhbmQtc2Vjb25kYXJ5IHRleHQtd2hpdGUgZm9udC1leHRyYWJvbGQgdHJhY2tpbmctd2lkZXN0IHJvdW5kZWQteGwgaG92ZXI6YnJpZ2h0bmVzcy0xMTAgYWN0aXZlOnNjYWxlLTk1IHRyYW5zaXRpb24tYWxsIHRleHQtWzExcHhdIGN1cnNvci1wb2ludGVyIHVwcGVyY2FzZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYqtmB2LnZitmEINix2YXYsiDYp9mE2YXYtNi62YQnIDogJ0RFTEVHQVRFIE5PREUnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDb2x1bW4gQjogSW50ZXJhY3RpdmUgVXNlciBMaXN0cyAoNyBTcGFuKSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNyBwLTQgYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wNF0gYmctWyMwRTEyMUVdLzkwIHJvdW5kZWQtMnhsIHNwYWNlLXktMy41IHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1icmFuZC1hY2NlbnQgZm9udC1ibGFjayBib3JkZXItYiBib3JkZXItd2hpdGUvNSBwYi0xLjUgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxVc2VycyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYnJhbmQtYWNjZW50XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9in2YTZhdi02LHZgdmI2YYg2KfZhNmF2LPYrNmE2YjZhicgOiAnT05MSU5FIFdPUktFUlMgUkVHSVNUUlknfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWdyYXktNTAwXCI+e3VzZXJzLmxlbmd0aH0gYWN0aXZlIG9wZXJhdG9yczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMi41IG1heC1oLVszMDBweF0gb3ZlcmZsb3cteS1hdXRvIHNjcm9sbGJhci10aGluXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3VzZXJzLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0udXNlcm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMyBiZy1ibGFjay80MCBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjAzXSByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBob3Zlcjpib3JkZXItd2hpdGUvMTAgdHJhbnNpdGlvbi1hbGwgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWV4dHJhYm9sZCB0ZXh0LXdoaXRlIHRleHQteHMgdHJhY2tpbmctd2lkZVwiPntpdGVtLnVzZXJuYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTEgcm91bmRlZCB0ZXh0LVs4cHhdIGZvbnQtYm9sZCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnJvbGUgPT09ICdBZG1pbicgPyAnYmctaW5kaWdvLTk1MC84MCBib3JkZXIgYm9yZGVyLWluZGlnby00MDAvMjAgdGV4dC1pbmRpZ28tNDAwJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucm9sZSA9PT0gJ01hbmFnZXInID8gJ2JnLXB1cnBsZS05NTAvODAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNDAwLzIwIHRleHQtYnJhbmQtc2Vjb25kYXJ5JyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiZy1lbWVyYWxkLTk1MC84MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNDAwLzIwIHRleHQtZW1lcmFsZC00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnJvbGUudG9VcHBlckNhc2UoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIG10LTEgdGV4dC1bOXB4XSB0ZXh0LWdyYXktNTAwIGxlYWRpbmctbm9uZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+S0VZOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWdyYXktNDAwIHRyYWNraW5nLXdpZGVyXCI+4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCiPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS51c2VybmFtZS50b1VwcGVyQ2FzZSgpICE9PSAnSE9TTlkxOTk1JyAmJiBpdGVtLnVzZXJuYW1lICE9PSBzZXNzaW9uVXNlci51c2VybmFtZSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZURlbGV0ZVVzZXIoaXRlbS51c2VybmFtZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSBwb2ludGVyLWV2ZW50cy1hdXRvIGN1cnNvci1wb2ludGVyIGJnLXJlZC02MDAvMTAgaG92ZXI6YmctcmVkLTYwMCBob3Zlcjp0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItcmVkLTUwMC8yMCB0ZXh0LXJlZC0xMDAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlJldm9rZSBvcGVyYXRvciBjcmVkZW50aWFsc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOHB4XSB0ZXh0LWdyYXktNjAwIGl0YWxpYyB0cmFja2luZy13aWRlc3QgZm9udC1ibGFjayB1cHBlcmNhc2UgZm9udC1tb25vXCI+Q09SRV9MT0NLRUQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IFRBQiA0OiBBRFZBTkNFRCBQQUdFIEJVSUxERVIgKEhPTUVQQUdFIEVESVRPUikgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSAnc2V0dGluZ3MnICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0xIGFuaW1hdGUtZmFkZS1pbiB0ZXh0LWxlZnQgc3BhY2UteS02XCI+XG4gICAgICAgICAgICAgICAgICAgIDxIb21lcGFnZVBhZ2VCdWlsZGVyXG4gICAgICAgICAgICAgICAgICAgICAgaG9tZXBhZ2VDb25maWc9e2hvbWVwYWdlQ29uZmlnfVxuICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlSG9tZXBhZ2VDb25maWc9e29uVXBkYXRlSG9tZXBhZ2VDb25maWcgfHwgKCgpID0+IHt9KX1cbiAgICAgICAgICAgICAgICAgICAgICBsYW5nPXtsYW5nfVxuICAgICAgICAgICAgICAgICAgICAgIGRpcj17ZGlyfVxuICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVRleHQ9e2N1c3RvbVRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVDdXN0b21UZXh0PXtvblVwZGF0ZUN1c3RvbVRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgZmlyZVRvYXN0PXsobXNnLCB0eXBlKSA9PiBmaXJlVG9hc3QobXNnLCB0eXBlKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICB7LyogU3lzdGVtIEJhY2t1cCBhbmQgUmVzdG9yZSBQYW5lbCAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQuNSByb3VuZGVkLTJ4bCBiZy1bIzA5MEQxNl0gYm9yZGVyIGJvcmRlci1ibHVlLTUwMC8xMCBzcGFjZS15LTIgbXQtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yLjUgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMS41IGJnLWJsdWUtNTAwLzEwIHJvdW5kZWQtbGcgdGV4dC1ibHVlLTQwMCBmb250LWJvbGQgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGF0YWJhc2UgY2xhc3NOYW1lPVwidy00IGgtNCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIGZvbnQtc2FucyB0cmFja2luZy13aWRlIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9mF2LHZg9iyINil2K/Yp9ix2Kkg2KfZhNmG2LPYriDYp9mE2KfYrdiq2YrYp9i32YogKFpJUCknIDogJ1pJUCBBUkNISVZFIEJBQ0tVUCAmIFJFU1RPUkUgQ09OU09MRSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNDAwIGxlYWRpbmctbm9ybWFsIGZvbnQtbW9ubyBub3JtYWwtY2FzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ9iq2K3ZhdmK2YQg2YPYp9mF2YQg2YLYp9i52K/YqSDYqNmK2KfZhtin2Kog2YjZhdmE2YHYp9iqINmI2LnZhtin2LXYsSDYp9mE2YXZiNmC2Lkg2YPZhdmE2YEg2YXYtti62YjYtyDZiNiq2YbYstmK2YTZhyDZhNit2YXYp9mK2KrZhyDZgtio2YQg2KfZhNmC2YrYp9mFINio2KPZiiDYqti52K/ZitmE2KfYqi4nIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdDb21waWxlLCBhcmNoaXZlLCBhbmQgZG93bmxvYWQgZW50aXJlIHN5c3RlbSBkYXRhYmFzZXMgYW5kIHRlbXBsYXRlcyBhcyBhIFpJUCBmaWxlIHRvIGxvY2FsIHN0b3JhZ2UuJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTQgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogRG93bmxvYWQgYmFja3VwIGZpbGUgYnV0dG9uICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSBiZy1bIzBCMEYxQV0gYm9yZGVyIGJvcmRlci13aGl0ZS9bMC4wM10gaG92ZXI6Ym9yZGVyLWJsdWUtNTAwLzIwIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgc3BhY2UteS0zIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0ZXh0LWdyYXktNDAwIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3QgYmxvY2sgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KrZhtiy2YrZhCDZhtiz2K7YqSDYp9it2KrZitin2LfZitipJyA6ICdHRU5FUkFURSBCQUNLVVAnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMC41cHhdIHRleHQtZ3JheS01MDAgbGVhZGluZy1yZWxheGVkIGZvbnQtc2Fuc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAn2YrZgtmI2YUg2YfYsNinINin2YTYrtmK2KfYsSDYqNi22LrYtyDZiNit2YHYuCDYrNmF2YrYuSDZhdmG2KrYrNin2Kog2KfZhNmF2KrYrNix2Iwg2KfZhNiv2LHYp9is2KfYqtiMINil2LnYr9in2K/Yp9iqINin2YTZhdi52KfZitmG2KnYjCDYp9mE2KrYsdis2YXYp9iq2Iwg2YjYp9mE2K3YrNmI2LLYp9iqINin2YTYrdin2YTZitipINmB2Yog2YXZhNmBIFpJUCDZhdi02YHYsSDZiNii2YXZhi4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ1BhY2thZ2UgYWxsIGFjdGl2ZSBmbGVldCBjeWNsZXMsIHNob3AgcHJvZHVjdHMsIHZpc3VhbCBjdXN0b20gdGV4dHMsIGFuZCB1c2VyIGFjY291bnRzIGluc2lkZSBhIHNlY3VyZWQgWklQIGJhY2t1cCBhcmNoaXZlLid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkQmFja3VwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBweC00IHB5LTIuNSBiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS01MDAvODUgdG8taW5kaWdvLTYwMC85NSBob3Zlcjpmcm9tLWJsdWUtNTAwIGhvdmVyOnRvLWluZGlnby02MDAgdGV4dC13aGl0ZSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQtWzEwLjVweF0gdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCByb3VuZGVkLXhsIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsIGJvcmRlciBib3JkZXItYmx1ZS01MDAvMjAgYWN0aXZlOnNjYWxlLTk4IHNoYWRvdy1tZCBob3ZlcjpzaGFkb3ctYmx1ZS01MDAvMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1ibHVlLTEwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdhcicgPyAn2KrYrdmF2YrZhCDYp9mE2YbYs9iu2Kkg2KfZhNin2K3YqtmK2KfYt9mK2KkgKFpJUCkg8J+TpicgOiAnR2VuZXJhdGUgJiBEb3dubG9hZCBaSVAg8J+Tpid9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogVXBsb2FkIC8gUmVzdG9yZSBiYWNrdXAgZmlsZSBidXR0b24gKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IGJnLVsjMEIwRjFBXSBib3JkZXIgYm9yZGVyLXdoaXRlL1swLjAzXSBob3Zlcjpib3JkZXItYmx1ZS01MDAvMjAgcm91bmRlZC14bCB0cmFuc2l0aW9uLWFsbCBzcGFjZS15LTMgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgZm9udC1ib2xkIHRleHQtZ3JheS00MDAgZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCBibG9jayBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYp9iz2KrYudin2K/YqSDZhtiz2K7YqSDYs9in2KjZgtipJyA6ICdSRVNUT1JFIEJBQ0tVUCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwLjVweF0gdGV4dC1ncmF5LTUwMCBsZWFkaW5nLXJlbGF4ZWQgZm9udC1zYW5zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICfZgtmFINio2LHZgdi5INmF2YTZgSDYp9mE2YAgWklQINin2YTZhdi22LrZiNi3INin2YTYsNmKINmC2YXYqiDYqNiq2YbYstmK2YTZhyDZhdiz2KjZgtin2Ysg2YTYp9iz2KrYsdis2KfYuSDZg9in2YXZhCDYqNmK2KfZhtin2Kog2KfZhNmF2YjZgti5INin2YTYs9in2KjZgtipINio2YTZhdiz2Kkg2YjYp9it2K/YqS4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ1VwbG9hZCBhIHByZXZpb3VzbHkgZ2VuZXJhdGVkIHN5c3RlbSBaSVAgYmFja3VwIGZpbGUuIFJlc3RvcmVzIGFuZCBvdmVyd3JpdGVzIHN0YXRlIHZhcmlhYmxlcyBpbW1lZGlhdGVseS4nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQ9XCIuemlwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVSZXN0b3JlQmFja3VwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJyZXN0b3JlLXppcC1zZXR0aW5nLWlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17c2Vzc2lvblVzZXI/LnJvbGUgIT09ICdBZG1pbid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9XCJyZXN0b3JlLXppcC1zZXR0aW5nLWlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBweC00IHB5LTIuNSByb3VuZGVkLXhsIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1bMTAuNXB4XSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRyYW5zaXRpb24tYWxsIGJvcmRlciBzaGFkb3ctbWQgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblVzZXI/LnJvbGUgPT09ICdBZG1pbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1bIzBCMEYxOV0gaG92ZXI6YmctaW5kaWdvLTk1MC8xNSBib3JkZXItaW5kaWdvLTUwMC80MCBob3Zlcjpib3JkZXItaW5kaWdvLTUwMCB0ZXh0LWluZGlnby0zMDAgY3Vyc29yLXBvaW50ZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctd2hpdGUvNSBib3JkZXItd2hpdGUvMTAgdGV4dC1ncmF5LTUwMCBjdXJzb3Itbm90LWFsbG93ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VXBsb2FkIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAnYXInID8gJ9ix2YHYuSDZiNin2LPYqti52KfYr9ipINmF2YTZgSDYp9it2KrZitin2LfZiiDwn5SEJyA6ICdVcGxvYWQgJiBSZXN0b3JlIFpJUCDwn5SEJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIEdpdEh1YiBJbnRlZ3JhdGlvbiBQYW5lbCAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQuNSByb3VuZGVkLTJ4bCBiZy1bIzA5MEQxNl0gYm9yZGVyIGJvcmRlci13aGl0ZS81IHNwYWNlLXktNCBtdC00IHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yLjUgYm9yZGVyLWIgYm9yZGVyLXdoaXRlLzUgcGItM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMS41IGJnLXdoaXRlLzUgcm91bmRlZC1sZyB0ZXh0LXdoaXRlIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEdpdGh1YiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIGZvbnQtc2FucyB0cmFja2luZy13aWRlIHRleHQtd2hpdGUgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYqNmI2KfYqNipINin2YTZhdiy2KfZhdmG2Kkg2YjZhdiz2KrZiNiv2LnYp9iqIEdpdEh1YicgOiAnR0lUSFVCIENMT1VEIFNZTkNIUk9OSVpBVElPTiBHQVRFJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JheS00MDAgbGVhZGluZy1ub3JtYWwgZm9udC1tb25vIG5vcm1hbC1jYXNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAn2YXYstin2YXZhtipINmI2KrYtdiv2YrYsSDZhdmE2YHYp9iqINmI2KjZitin2YbYp9iqINin2YTZhdi52LHYtiDZhdio2KfYtNix2KnZiyDZhNit2LPYp9ioIEdpdEh1YiDYp9mE2K7Yp9i1INio2YPYjCDYo9mIINin2LPYqti52KfYr9iq2YfYpyDYqNmE2YXYs9ipINmI2KfYrdiv2Kkg2YXZhiDYrtmE2KfZhCDYsdin2KjYtyDZhdio2KfYtNixLicgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ0VzdGFibGlzaCBkaXJlY3QgbGluayB3aXRoIHlvdXIgR2l0SHViIHJlcG9zIHRvIGNvbW1pdCBjb21wbGV0ZSBiYWNrdXBzLCBvciBsb2FkIHNuYXBzaG90IHN0YXRlcyBieSBsaW5rIHJlc29sdmVkLid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0yIGdhcC01XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogQ29sdW1uIDE6IEV4cG9ydCB0byBHaXRIdWIgU2V0dGluZ3MgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyBwLTQgYmctWyMwQjBGMUFdIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDNdIGhvdmVyOmJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHRyYW5zaXRpb24tYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzc05hbWU9XCJ0ZXh0LVsxMC41cHhdIHVwcGVyY2FzZSBmb250LWJvbGQgdGV4dC1ncmF5LTMwMCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxVcGxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1ibHVlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcicgPyAn2KrYtdiv2YrYsSDZiNit2YHYuCDYp9mE2YXYs9iq2YjYr9i5IChHaXRIdWIgRXhwb3J0KScgOiAnUFVTSCBEQVRBIFRPIEdJVEhVQid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFRva2VuIGlucHV0ICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNDAwIGJsb2NrIGZvbnQtbW9ubyB1cHBlcmNhc2UgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9ix2YXYsiDYp9mE2YjYtdmI2YQg2KfZhNi02K7YtdmKIChHaXRIdWIgUEFUKScgOiAnR2l0SHViIFBlcnNvbmFsIEFjY2VzcyBUb2tlbid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vc2V0dGluZ3MvdG9rZW5zL25ldz9kZXNjcmlwdGlvbj1FbEtob2x5JTIwTW90b3JzJTIwQmFja3VwJTIwS2V5JnNjb3Blcz1yZXBvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtYmx1ZS00MDAgaG92ZXI6dW5kZXJsaW5lIGhvdmVyOnRleHQtYmx1ZS0zNTAgY3Vyc29yLXBvaW50ZXIgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDwn5SRIHtsYW5nID09PSAnYXInID8gJ9il2YbYtNin2KEg2KfZhNix2YXYsiDYqtmE2YLYp9im2YrYp9mLJyA6ICdHZW5lcmF0ZSBUb2tlbiBBdXRvbWF0aWNhbGx5J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2dpdGh1YlRva2VufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRHaXRodWJUb2tlbihlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfZ2l0aHViX3Rva2VuJywgZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImdocF94eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzA3MEExMV0gYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLWxnIHB4LTMgcHktMS41IHRleHQteHMgdGV4dC13aGl0ZSBwbGFjZWhvbGRlcjp0ZXh0LWdyYXktNjUwIGZvY3VzOmJvcmRlci1ibHVlLTUwMCBvdXRsaW5lLW5vbmUgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBSZXBvIHBhdGggKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JheS00MDAgYmxvY2sgZm9udC1tb25vIHVwcGVyY2FzZSBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfZhdiz2KrZiNiv2LkgR2l0SHViJyA6ICdSZXBvc2l0b3J5IChvd25lci9yZXBvKSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vbmV3XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZW1lcmFsZC00MDAgaG92ZXI6dW5kZXJsaW5lIGhvdmVyOnRleHQtZW1lcmFsZC0zNTAgY3Vyc29yLXBvaW50ZXIgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg8J+TgSB7bGFuZyA9PT0gJ2FyJyA/ICfYpdmG2LTYp9ihINmF2LPYqtmI2K/YuSDYrNiv2YrYrycgOiAnQ3JlYXRlIE5ldyBSZXBvJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2dpdGh1YlJlcG99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRHaXRodWJSZXBvKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X2dpdGh1Yl9yZXBvJywgZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ1c2VybmFtZS9teS1yZXBvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwNzBBMTFdIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC1sZyBweC0zIHB5LTEuNSB0ZXh0LXhzIHRleHQtd2hpdGUgcGxhY2Vob2xkZXI6dGV4dC1ncmF5LTY1MCBmb2N1czpib3JkZXItYmx1ZS01MDAgb3V0bGluZS1ub25lIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFBhdGggZmlsZSBuYW1lICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JheS00MDAgYmxvY2sgbWItMSBmb250LW1vbm8gdXBwZXJjYXNlIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYp9iz2YUg2KfZhNmF2YTZgScgOiAnRmlsZSBOYW1lL1BhdGgnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2dpdGh1YlBhdGh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRHaXRodWJQYXRoKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbGtob2x5X2dpdGh1Yl9wYXRoJywgZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlbGtob2x5X2JhY2t1cC5qc29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwNzBBMTFdIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC1sZyBweC0zIHB5LTEuNSB0ZXh0LXhzIHRleHQtd2hpdGUgZm9jdXM6Ym9yZGVyLWJsdWUtNTAwIG91dGxpbmUtbm9uZSBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogQnJhbmNoIGlucHV0ICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1ncmF5LTQwMCBibG9jayBtYi0xIGZvbnQtbW9ubyB1cHBlcmNhc2UgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YHYsdi5INin2YTZhdiz2KrZh9iv2YEnIDogJ1RhcmdldCBCcmFuY2gnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtnaXRodWJCcmFuY2h9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEdpdGh1YkJyYW5jaChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfZ2l0aHViX2JyYW5jaCcsIGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJtYWluXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMDcwQTExXSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtbGcgcHgtMyBweS0xLjUgdGV4dC14cyB0ZXh0LXdoaXRlIGZvY3VzOmJvcmRlci1ibHVlLTUwMCBvdXRsaW5lLW5vbmUgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVFeHBvcnRUb0dpdEh1Yn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNHaXRodWJFeHBvcnRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIG10LTIgcHktMiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiByb3VuZGVkLXhsIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0cmFja2luZy13aWRlc3QgZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNHaXRodWJFeHBvcnRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctd2hpdGUvNSB0ZXh0LWdyYXktNTUwIGN1cnNvci1ub3QtYWxsb3dlZCBib3JkZXIgYm9yZGVyLXdoaXRlLzUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXdoaXRlIHRleHQtYmxhY2sgaG92ZXI6YmctZ3JheS0xMDAgY3Vyc29yLXBvaW50ZXIgYWN0aXZlOnNjYWxlLTk4IHNoYWRvdy1tZCBob3ZlcjpzaGFkb3ctd2hpdGUvNSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxHaXRodWIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWJsYWNrXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNHaXRodWJFeHBvcnRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKGxhbmcgPT09ICdhcicgPyAn2KzYp9ix2Yog2KfZhNmB2K3YtSDZiNin2YTYsdmB2LkuLi4g4o+zJyA6ICdDT01NSVRUSU5HIFNOQVBTSE9ULi4uIOKPsycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IChsYW5nID09PSAnYXInID8gJ9it2YHYuCDZiNiq2LXYr9mK2LEg2KXZhNmJIEdpdEh1YiDwn5qAJyA6ICdQVVNIIFRPIEdJVEhVQiBSRVBPIPCfmoAnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIENvbHVtbiAyOiBSZXN0b3JlIGZyb20gVVJML0dpdEh1YiBSYXcgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyBwLTQgYmctWyMwQjBGMUFdIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDNdIGhvdmVyOmJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHRyYW5zaXRpb24tYWxsIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT1cInRleHQtWzEwLjVweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0ZXh0LWdyYXktMzAwIGZvbnQtbW9ubyB0cmFja2luZy13aWRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGluayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9in2LPYqtmK2LHYp9ivINmB2YjYsdmKINmF2YYg2LHYp9io2Lcg2YXZhNmBINiu2KfYsdis2YogLyBHaXN0JyA6ICdJTVBPUlQgRElSRUNUTFkgRlJPTSBVUkwgLyBHSVNUJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2g1PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTAuNXB4XSB0ZXh0LWdyYXktNTAwIGxlYWRpbmctcmVsYXhlZCBmb250LXNhbnMgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdhcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAn2YrZgtmI2YUg2YfYsNinINin2YTYrtmK2KfYsSDYqNis2YTYqCDZiNiq2YbYstmK2YQg2YXZhNmBINmG2LPYrtipINin2K3YqtmK2KfYt9mK2Kkg2YXZhiDYo9mKINix2KfYqNi3INmF2KjYp9i02LEgKNix2KfYqNi3INiu2KfZhSDZhdmGIEdpdEh1YiDYo9mIIEdpc3Qg2KPZiCDYo9mKINiu2KfYr9mFINiu2KfYsdis2YopINmI2KrYt9io2YrZgtmHINmD2YTYrdi42Kkg2KfYs9iq2LnYp9iv2Kkg2YHZiNix2YrYqSDZhNmE2YXZiNmC2LkuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdSZXN0b3JlIGNvbXBsZXRlIHN0YXR1cyB2YXJpYWJsZXMgYnkgaW5wdXR0aW5nIHJhdyBVUkwgcG9pbnRpbmcgdG8gSlNPTiBjYXRhbG9nIHN0cnVjdHVyZSAoZS5nLiByYXcuZ2l0aHVidXNlcmNvbnRlbnQgb3IgcmF3IEdpc3QpLid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZ3JheS00MDAgYmxvY2sgZm9udC1tb25vIHVwcGVyY2FzZSBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9ix2KfYqNi3INmF2YTZgSDYp9mE2YAgSlNPTiDYp9mE2YXYqNin2LTYsScgOiAnRGlyZWN0IEpTT04gQmFja3VwIFVSTCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2dpdGh1YkltcG9ydFVybH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRHaXRodWJJbXBvcnRVcmwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9vd25lci9yZXBvL21haW4vZWxraG9seV9iYWNrdXAuanNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzA3MEExMV0gYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXhzIHRleHQtd2hpdGUgcGxhY2Vob2xkZXI6dGV4dC1ncmF5LTYwMCBmb2N1czpib3JkZXItZW1lcmFsZC01MDAgb3V0bGluZS1ub25lIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlSW1wb3J0QnlVcmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzR2l0aHViSW1wb3J0aW5nIHx8IHNlc3Npb25Vc2VyPy5yb2xlICE9PSAnQWRtaW4nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBweS0yLjUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgcm91bmRlZC14bCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdHJhY2tpbmctd2lkZXN0IGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzR2l0aHViSW1wb3J0aW5nIHx8IHNlc3Npb25Vc2VyPy5yb2xlICE9PSAnQWRtaW4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXdoaXRlLzUgdGV4dC1ncmF5LTU1MCBjdXJzb3Itbm90LWFsbG93ZWQgYm9yZGVyIGJvcmRlci13aGl0ZS81J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1bIzBFMTUyNF0gaG92ZXI6YmctWyMxMjFjMzJdIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvMzAgaG92ZXI6Ym9yZGVyLWVtZXJhbGQtNTAwIHRleHQtZW1lcmFsZC0zMDAgY3Vyc29yLXBvaW50ZXIgYWN0aXZlOnNjYWxlLTk4IHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSZWZyZXNoQ3cgY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgJHtpc0dpdGh1YkltcG9ydGluZyA/ICdhbmltYXRlLXNwaW4nIDogJyd9YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNHaXRodWJJbXBvcnRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKGxhbmcgPT09ICdhcicgPyAn2KzYp9ix2Yog2KfZhNin2KrYtdin2YQg2YjYp9mE2KrYrdmF2YrZhC4uLiDij7MnIDogJ0ZFVENISU5HIERBVEEgTk9ERVMuLi4g4o+zJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKGxhbmcgPT09ICdhcicgPyAn2KfYs9iq2YrYsdin2K8g2YjZhdiy2KfZhdmG2Kkg2KfZhNio2YrYp9mG2KfYqiDwn5SEJyA6ICdGRVRDSCAmIElOVEVHUkFURSBEQVRBIPCflIQnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBGdWxsIENvZGViYXNlIERlcGxveW1lbnQgdG8gR2l0SHViIChWZXJjZWwgSW50ZWdyYXRpb24pICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00LjUgYmctWyMwQjBGMUFdIGJvcmRlciBib3JkZXItd2hpdGUvWzAuMDNdIGhvdmVyOmJvcmRlci13aGl0ZS8xMCByb3VuZGVkLTJ4bCB0cmFuc2l0aW9uLWFsbCBzcGFjZS15LTMuNSBtdC00IHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBib3JkZXItYiBib3JkZXItd2hpdGUvNSBwYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0xIHB4LTEuNSBiZy1wdXJwbGUtNTAwLzEwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC8yMCB0ZXh0LXB1cnBsZS00MDAgcm91bmRlZC1sZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb2RlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHVwcGVyY2FzZSBmb250LWJvbGQgdGV4dC1ncmF5LTIwMCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9ix2YHYuSDZg9mI2K8g2KfZhNmF2LXYr9ixINmI2KfZhNmF2LTYsdmI2Lkg2KjYp9mE2YPYp9mF2YQg2YTZhNix2KjYtyDYqNmAIFZlcmNlbCcgOiAnUFVTSCBFTlRJUkUgUkVBQ1QgQ09ERUJBU0UgRk9SIFZFUkNFTCBERVBMT1lNRU5UJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1ncmF5LTU1MCBmb250LW1vbm8gaXRhbGljXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ2FyJyA/ICfZgtmFINio2LHZgdi5INis2YXZiti5INmF2YTZgdin2Kog2KfZhNiq2LfYqNmK2YIg2YjYp9mE2YXYtNin2LHZiti5INmE2YTYp9iq2LXYp9mEINio2YHYsdmD2YQg2YXYqNin2LTYsdipJyA6ICdQdXNoIGNvbXBsZXRlIHdvcmtzcGFjZSBzdHJ1Y3R1cmUgdG8gZGVwbG95IG9uIFZlcmNlbCBvciBOZXRsaWZ5IGR5bmFtaWNhbGx5J31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwLjVweF0gdGV4dC1ncmF5LTQwMCBsZWFkaW5nLXJlbGF4ZWQgZm9udC1zYW5zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAn2YfYsNinINin2YTZgtiz2YUg2YrYqtmK2K0g2YTZgyDYqti12K/ZitixIFwi2YPYp9mF2YQg2KfZhNmD2YjYryDYp9mE2KjYsdmF2KzZiiDZhNmE2YXZiNmC2LlcIiDZhdi5INis2YXZiti5INin2YTYpdi52K/Yp9iv2KfYqiDZiNmE2K3YuNin2Kog2KfZhNmF2LnYsdi2INmI2KfZhNi12YjYsSDYp9mE2KvZhtin2KbZitipINmF2KjYp9i02LHYqSDYpdmE2Ykg2YXYs9iq2YjYr9i5IEdpdEh1YiDYp9mE2K7Yp9i1INio2YMuINio2LnYryDYpdiq2YXYp9mFINin2YTYsdmB2LnYjCDZitmF2YPZhtmDINin2YTYr9iu2YjZhCDZhNit2LPYp9ioIFZlcmNlbCDZiNix2KjYtyDYp9mE2YXYs9iq2YjYr9i52Iwg2YjYs9mK2KrZhSDYpdi32YTYp9mCINmF2YjZgti52YMg2KfZhNiu2KfYtSDZgdmI2LHYp9mLINmI2KjYtNmD2YQg2YXYs9iq2YLZhCDYqtmF2KfZhdin2Ysg2YjYr9in2KbZhSDZhdis2KfZhtin2YshJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ1RoaXMgbW9kdWxlIGZldGNoZXMgZXZlcnkgc2luZ2xlIGFjdGl2ZSBjb21wb25lbnQsIHRyYW5zbGF0aW9uIGxheW91dCwgcGFja2FnZSBtb2R1bGUsIGFzc2V0cyBmb2xkZXIsIGFuZCBiaW5hcnkgcGljdHVyZSwgdGhlbiBwcm9jZXNzZXMgdGhlbSBhcyBhIHNpbmdsZSB0cmVlIGNvbW1pdCBvbiBHaXRIdWIuIEVhc2lseSBob29rIHRoaXMgcmVwb3NpdG9yeSBpbnRvIFZlcmNlbCBvciBOZXRsaWZ5IHRvIGNvbXBpbGUgYW5kIGRlbGl2ZXIgeW91ciBjdXN0b20gc3RvcmVmcm9udCBpbnN0YW50bHkhJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC0zIHAtMyBiZy1bIzA3MEExMV0gcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXdoaXRlLzUgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHRleHQtWzEwcHhdIHRleHQtZ3JheS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YXYs9iq2YjYr9i5INin2YTZh9iv2YE6JyA6ICdUQVJHRVQgUkVQT1NJVE9SWTonfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0cmFja2luZy13aWRlXCI+e2dpdGh1YlJlcG8gfHwgKGxhbmcgPT09ICdhcicgPyAn2YTZhSDZitit2K/YrycgOiAnTm90IHNwZWNpZmllZCcpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHRleHQtWzEwcHhdIHRleHQtZ3JheS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ2FyJyA/ICfYp9mE2YHYsdi5INin2YTZhdiz2KrZh9iv2YE6JyA6ICdUQVJHRVQgQlJBTkNIOid9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDAgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVcIj57Z2l0aHViQnJhbmNoIHx8ICdtYWluJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpc1B1c2hpbmdQcm9qZWN0ICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctaW5kaWdvLTk1MC8yMCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMTUgcm91bmRlZC14bCBzcGFjZS15LTIgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtaW5kaWdvLTQwMCBhbmltYXRlLXNwaW5cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTAuNXB4XSBmb250LW1vbm8gdGV4dC1pbmRpZ28tMzAwIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAnYXInID8gJ9is2KfYsdmKINiq2KzZh9mK2LIg2YjYqti12K/ZitixINin2YTZhdi02LHZiNi5Li4uIOKPsycgOiAnUFVTSElORyBTWVNURU0gRklMRVMuLi4g4o+zJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1ncmF5LTQwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9qZWN0UHVzaFN0ZXB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVB1c2hFbnRpcmVQcm9qZWN0VG9HaXRIdWJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc1B1c2hpbmdQcm9qZWN0IHx8ICFnaXRodWJSZXBvLnRyaW0oKSB8fCAhZ2l0aHViVG9rZW4udHJpbSgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgcHktMyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiByb3VuZGVkLXhsIHRleHQtWzEwLjVweF0gZm9udC1tb25vIHRyYWNraW5nLXdpZGVzdCBmb250LWV4dHJhYm9sZCB1cHBlcmNhc2UgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1B1c2hpbmdQcm9qZWN0IHx8ICFnaXRodWJSZXBvLnRyaW0oKSB8fCAhZ2l0aHViVG9rZW4udHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy13aGl0ZS81IHRleHQtZ3JheS01NTAgYm9yZGVyIGJvcmRlci13aGl0ZS81IGN1cnNvci1ub3QtYWxsb3dlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNjAwIHRvLWluZGlnby02MDAgaG92ZXI6ZnJvbS1wdXJwbGUtNTUwIGhvdmVyOnRvLWluZGlnby01NTAgdGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlciBhY3RpdmU6c2NhbGUtOTggc2hhZG93LW1kIGhvdmVyOnNoYWRvdy1pbmRpZ28tNTAwLzEwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEdpdGh1YiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNQdXNoaW5nUHJvamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKGxhbmcgPT09ICdhcicgPyAn2KzYp9ix2Yog2KfZhNix2YHYuS4uLiDwn5qAJyA6ICdFWEVDVVRJTkcgQVRPTUlDIENPTU1JVC4uLiDwn5qAJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IChsYW5nID09PSAnYXInID8gJ9il2LfZhNin2YIg2YjYsdmB2Lkg2YPZiNivINin2YTZhdmI2YLYuSDYqNin2YTZg9in2YXZhCDYpdmE2YkgR2l0SHViIPCfmoDwn5K7JyA6ICdQVVNIIEZVTEwgUkVBQ1RJT04gRU5HSU5FIFRPIEdJVEhVQiDwn5qA8J+SuycpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9tb3Rpb24uZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5jb25zdCBNT0NLX0hJU1RPUklDQUxfU0FMRVMgPSBbXG4gIC8vIEphbnVhcnkgMjAyNiAoTW9udGggMSlcbiAge1xuICAgIGlkOiAnSElTVC1NMS0wMScsXG4gICAgY29kZTogJ3Nwb3J0LWN5YmVyc3BvcnQtdjQnLFxuICAgIG5hbWU6ICdFbEtob2x5IEN5YmVyU3BvcnQgVjQnLFxuICAgIHR5cGU6ICdtb3RvcmN5Y2xlJyxcbiAgICBjdXN0b21lck5hbWU6ICfYo9it2YXYryDZhdit2YXZiNivINin2YTYudin2LXZiicsXG4gICAgY3VzdG9tZXJQaG9uZTogJzAxMDk5ODg3NzY2JyxcbiAgICBxdWFudGl0eTogMSxcbiAgICB1bml0UHJpY2U6IDQ1MDAwLFxuICAgIHRvdGFsUHJpY2U6IDQ1MDAwLFxuICAgIGRhdGU6ICcyMDI2LTAxLTEyJ1xuICB9LFxuICB7XG4gICAgaWQ6ICdISVNULU0xLTAyJyxcbiAgICBjb2RlOiAnUFJELU1UTDcxMCcsXG4gICAgbmFtZTogJ9iy2YrYqiDZhdmI2KrZiNmEIDcxMDAgMTBXNDAg2KrYrtmE2YrZgtmKIDEg2YTYqtixJyxcbiAgICB0eXBlOiAncHJvZHVjdCcsXG4gICAgY3VzdG9tZXJOYW1lOiAn2YXYrdmF2K8g2LnYqNivINin2YTZhNmHJyxcbiAgICBjdXN0b21lclBob25lOiAnMDExMjIzMzQ0NTUnLFxuICAgIHF1YW50aXR5OiAzLFxuICAgIHVuaXRQcmljZTogODUwLFxuICAgIHRvdGFsUHJpY2U6IDI1NTAsXG4gICAgZGF0ZTogJzIwMjYtMDEtMTgnXG4gIH0sXG4gIHtcbiAgICBpZDogJ0hJU1QtTTEtMDMnLFxuICAgIGNvZGU6ICdQUkQtQUdWSzFTJyxcbiAgICBuYW1lOiAn2K7ZiNiw2Kkg2KPZiiDYrNmKINmB2YogSzEgUyDYp9mE2LHZitin2LbZitipINin2YTYo9i12YTZitipJyxcbiAgICB0eXBlOiAncHJvZHVjdCcsXG4gICAgY3VzdG9tZXJOYW1lOiAn2YPYsdmK2YUg2KPYtNix2YEnLFxuICAgIGN1c3RvbWVyUGhvbmU6ICcwMTIzMzQ0NTU2NicsXG4gICAgcXVhbnRpdHk6IDEsXG4gICAgdW5pdFByaWNlOiAxMTUwMCxcbiAgICB0b3RhbFByaWNlOiAxMTUwMCxcbiAgICBkYXRlOiAnMjAyNi0wMS0yNSdcbiAgfSxcblxuICAvLyBGZWJydWFyeSAyMDI2IChNb250aCAyKVxuICB7XG4gICAgaWQ6ICdISVNULU0yLTAxJyxcbiAgICBjb2RlOiAnY3J1aXNlci1jeWJlcmNydWlzZXIteDEnLFxuICAgIG5hbWU6ICdFbEtob2x5IEN5YmVyQ3J1aXNlciBYMScsXG4gICAgdHlwZTogJ21vdG9yY3ljbGUnLFxuICAgIGN1c3RvbWVyTmFtZTogJ9mF2K3ZhdmI2K8g2KfZhNi12KfZiNmKJyxcbiAgICBjdXN0b21lclBob25lOiAnMDE1NjY3Nzg4OTknLFxuICAgIHF1YW50aXR5OiAxLFxuICAgIHVuaXRQcmljZTogMzgwMDAsXG4gICAgdG90YWxQcmljZTogMzgwMDAsXG4gICAgZGF0ZTogJzIwMjYtMDItMDUnXG4gIH0sXG4gIHtcbiAgICBpZDogJ0hJU1QtTTItMDInLFxuICAgIGNvZGU6ICdQUkQtU1BDUFJPJyxcbiAgICBuYW1lOiAn2K3Yp9mF2YQg2KzZiNin2YQg2KXYsyDYqNmKINmD2YjZhtmD2Kog2KjYsdmIINmE2YTYr9ix2KfYrNin2KonLFxuICAgIHR5cGU6ICdwcm9kdWN0JyxcbiAgICBjdXN0b21lck5hbWU6ICfYs9in2YXYrSDYutin2YTZiicsXG4gICAgY3VzdG9tZXJQaG9uZTogJzAxMDExMjIzMzQ0JyxcbiAgICBxdWFudGl0eTogMixcbiAgICB1bml0UHJpY2U6IDIyMDAsXG4gICAgdG90YWxQcmljZTogNDQwMCxcbiAgICBkYXRlOiAnMjAyNi0wMi0xNCdcbiAgfSxcbiAge1xuICAgIGlkOiAnSElTVC1NMi0wMycsXG4gICAgY29kZTogJ1BSRC1DUkRQVEsnLFxuICAgIG5hbWU6ICfYp9mG2KrYsdmD2YjZhSDZg9in2LHYr9mIINio2KfZgyDYqtmI2YMg2KfZitiv2Kwg2KvZhtin2KbZiiDYo9i12YTZiicsXG4gICAgdHlwZTogJ3Byb2R1Y3QnLFxuICAgIGN1c3RvbWVyTmFtZTogJ9mI2KfYptmEINi52LLYqicsXG4gICAgY3VzdG9tZXJQaG9uZTogJzAxMTU1NDQzMzIyJyxcbiAgICBxdWFudGl0eTogMSxcbiAgICB1bml0UHJpY2U6IDE4OTAwLFxuICAgIHRvdGFsUHJpY2U6IDE4OTAwLFxuICAgIGRhdGU6ICcyMDI2LTAyLTIyJ1xuICB9LFxuXG4gIC8vIE1hcmNoIDIwMjYgKE1vbnRoIDMpXG4gIHtcbiAgICBpZDogJ0hJU1QtTTMtMDEnLFxuICAgIGNvZGU6ICdzY29vdGVyLWN5YmVyc2Nvb3Rlci1zMicsXG4gICAgbmFtZTogJ0VsS2hvbHkgQ3liZXJTY29vdGVyIFMyJyxcbiAgICB0eXBlOiAnbW90b3JjeWNsZScsXG4gICAgY3VzdG9tZXJOYW1lOiAn2YrYp9iz2LEg2KfZhNi32YjYrtmKJyxcbiAgICBjdXN0b21lclBob25lOiAnMDEyODg3NzY2NTUnLFxuICAgIHF1YW50aXR5OiAxLFxuICAgIHVuaXRQcmljZTogMTYwMDAsXG4gICAgdG90YWxQcmljZTogMTYwMDAsXG4gICAgZGF0ZTogJzIwMjYtMDMtMDgnXG4gIH0sXG4gIHtcbiAgICBpZDogJ0hJU1QtTTMtMDInLFxuICAgIGNvZGU6ICdQUkQtTkdLSVJEJyxcbiAgICBuYW1lOiAn2KjZiNis2YrZhyDYp9mGINis2Yog2YPZiiDYp9mK2LHZitiv2YrZiNmFINix2YrYp9i22Yog2YHYp9im2YIg2KfZhNij2K/Yp9ihJyxcbiAgICB0eXBlOiAncHJvZHVjdCcsXG4gICAgY3VzdG9tZXJOYW1lOiAn2LnZhdix2Ygg2KPYr9mK2KgnLFxuICAgIGN1c3RvbWVyUGhvbmU6ICcwMTAyMjMzNDQ1NScsXG4gICAgcXVhbnRpdHk6IDQsXG4gICAgdW5pdFByaWNlOiA0NTAsXG4gICAgdG90YWxQcmljZTogMTgwMCxcbiAgICBkYXRlOiAnMjAyNi0wMy0xNSdcbiAgfSxcbiAge1xuICAgIGlkOiAnSElTVC1NMy0wMycsXG4gICAgY29kZTogJ1BSRC1ZQVNCQVQnLFxuICAgIG5hbWU6ICfYqNi32KfYsdmK2Kkg2YrZiNin2LPYpyDYp9mE2YrYp9io2KfZhtmK2Kkg2KPYtdmE2YrYqSDYrtin2YTZitipINmF2YYg2KfZhNi12YrYp9mG2KknLFxuICAgIHR5cGU6ICdwcm9kdWN0JyxcbiAgICBjdXN0b21lck5hbWU6ICfZh9in2YbZiiDYtNin2YPYsScsXG4gICAgY3VzdG9tZXJQaG9uZTogJzAxMTQ0MzMyMjExJyxcbiAgICBxdWFudGl0eTogMSxcbiAgICB1bml0UHJpY2U6IDI0MDAsXG4gICAgdG90YWxQcmljZTogMjQwMCxcbiAgICBkYXRlOiAnMjAyNi0wMy0yOSdcbiAgfSxcblxuICAvLyBBcHJpbCAyMDI2IChNb250aCA0KVxuICB7XG4gICAgaWQ6ICdISVNULU00LTAxJyxcbiAgICBjb2RlOiAndG91cmluZy1jeWJlcmFkdmVudHVyZS12OCcsXG4gICAgbmFtZTogJ0VsS2hvbHkgQ3liZXJBZHZlbnR1cmUgVjgnLFxuICAgIHR5cGU6ICdtb3RvcmN5Y2xlJyxcbiAgICBjdXN0b21lck5hbWU6ICfYrtin2YTYryDYp9mE2KzZhtiv2YonLFxuICAgIGN1c3RvbWVyUGhvbmU6ICcwMTU5OTg4Nzc2NicsXG4gICAgcXVhbnRpdHk6IDEsXG4gICAgdW5pdFByaWNlOiA1MjAwMCxcbiAgICB0b3RhbFByaWNlOiA1MjAwMCxcbiAgICBkYXRlOiAnMjAyNi0wNC0xMCdcbiAgfSxcbiAge1xuICAgIGlkOiAnSElTVC1NNC0wMicsXG4gICAgY29kZTogJ1BSRC1MUU00VDEnLFxuICAgIG5hbWU6ICfYstmK2Kog2YTZitmD2YjZiiDZhdmI2YTZiiDYp9mE2KPZhNmF2KfZhtmKIDEwVzUwINmE2YTYt9ix2YLYp9iqIDEg2YTYqtixJyxcbiAgICB0eXBlOiAncHJvZHVjdCcsXG4gICAgY3VzdG9tZXJOYW1lOiAn2KPYtNix2YEg2LLZg9mKJyxcbiAgICBjdXN0b21lclBob25lOiAnMDEwNjY1NTQ0MzMnLFxuICAgIHF1YW50aXR5OiA1LFxuICAgIHVuaXRQcmljZTogNzgwLFxuICAgIHRvdGFsUHJpY2U6IDM5MDAsXG4gICAgZGF0ZTogJzIwMjYtMDQtMTgnXG4gIH0sXG4gIHtcbiAgICBpZDogJ0hJU1QtTTQtMDMnLFxuICAgIGNvZGU6ICdQUkQtWElBQUlSJyxcbiAgICBuYW1lOiAn2YXZhtmB2KfYriDYpdi32KfYsdin2Kog2LTYp9mI2YXZiiDYp9mE2YPZh9ix2KjYp9im2Yog2KfZhNmF2K3ZhdmI2YQgMicsXG4gICAgdHlwZTogJ3Byb2R1Y3QnLFxuICAgIGN1c3RvbWVyTmFtZTogJ9il2LPZhNin2YUg2LXYqNit2YonLFxuICAgIGN1c3RvbWVyUGhvbmU6ICcwMTI3NzY2NTU0NCcsXG4gICAgcXVhbnRpdHk6IDIsXG4gICAgdW5pdFByaWNlOiAxODUwLFxuICAgIHRvdGFsUHJpY2U6IDM3MDAsXG4gICAgZGF0ZTogJzIwMjYtMDQtMjYnXG4gIH0sXG5cbiAgLy8gTWF5IDIwMjYgKE1vbnRoIDUpXG4gIHtcbiAgICBpZDogJ0hJU1QtTTUtMDEnLFxuICAgIGNvZGU6ICdzcG9ydC1jeWJlcnNwb3J0LXY0JyxcbiAgICBuYW1lOiAnRWxLaG9seSBDeWJlclNwb3J0IFY0JyxcbiAgICB0eXBlOiAnbW90b3JjeWNsZScsXG4gICAgY3VzdG9tZXJOYW1lOiAn2KPZitmF2YYg2YbZiNixJyxcbiAgICBjdXN0b21lclBob25lOiAnMDExODg5OTAwMTEnLFxuICAgIHF1YW50aXR5OiAxLFxuICAgIHVuaXRQcmljZTogNDUwMDAsXG4gICAgdG90YWxQcmljZTogNDUwMDAsXG4gICAgZGF0ZTogJzIwMjYtMDUtMDInXG4gIH0sXG4gIHtcbiAgICBpZDogJ0hJU1QtTTUtMDInLFxuICAgIGNvZGU6ICdQUkQtQUxQR0xWJyxcbiAgICBuYW1lOiAn2YLZgdin2LLYp9iqINin2YTYqNmK2YYg2LPYqtin2LHYsiBHUCBQcm8gVjIg2KzZhNivINiz2KjYp9mC2KfYqiDYp9mE2YPYp9ix2KjZiNmGJyxcbiAgICB0eXBlOiAncHJvZHVjdCcsXG4gICAgY3VzdG9tZXJOYW1lOiAn2YfYtNin2YUg2LnYqNin2LMnLFxuICAgIGN1c3RvbWVyUGhvbmU6ICcwMTU0NDMzMjIxMScsXG4gICAgcXVhbnRpdHk6IDEsXG4gICAgdW5pdFByaWNlOiA0ODAwLFxuICAgIHRvdGFsUHJpY2U6IDQ4MDAsXG4gICAgZGF0ZTogJzIwMjYtMDUtMTUnXG4gIH0sXG4gIHtcbiAgICBpZDogJ0hJU1QtTTUtMDMnLFxuICAgIGNvZGU6ICdQUkQtTUNIUkQ2JyxcbiAgICBuYW1lOiAn2KXYt9in2LEg2YPYp9mI2KrYtCDZhdmK2LTZhNin2YYg2LHZiNivIDYg2KPZhdin2YXZiiDYp9iz2KrZitix2KfYrycsXG4gICAgdHlwZTogJ3Byb2R1Y3QnLFxuICAgIGN1c3RvbWVyTmFtZTogJ9it2LPZhiDYtNin2YPZiNi0JyxcbiAgICBjdXN0b21lclBob25lOiAnMDEwMTEzMzU1NzcnLFxuICAgIHF1YW50aXR5OiAyLFxuICAgIHVuaXRQcmljZTogNjgwMCxcbiAgICB0b3RhbFByaWNlOiAxMzYwMCxcbiAgICBkYXRlOiAnMjAyNi0wNS0yNCdcbiAgfSxcblxuICAvLyBKdW5lIDIwMjYgKE1vbnRoIDYpXG4gIHtcbiAgICBpZDogJ0hJU1QtTTYtMDEnLFxuICAgIGNvZGU6ICdzY29vdGVyLWN5YmVyc2Nvb3Rlci1zMicsXG4gICAgbmFtZTogJ0VsS2hvbHkgQ3liZXJTY29vdGVyIFMyJyxcbiAgICB0eXBlOiAnbW90b3JjeWNsZScsXG4gICAgY3VzdG9tZXJOYW1lOiAn2KjZh9in2KEg2LPZhNi32KfZhicsXG4gICAgY3VzdG9tZXJQaG9uZTogJzAxMjQ0NTU2Njc3JyxcbiAgICBxdWFudGl0eTogMSxcbiAgICB1bml0UHJpY2U6IDE2MDAwLFxuICAgIHRvdGFsUHJpY2U6IDE2MDAwLFxuICAgIGRhdGU6ICcyMDI2LTA2LTAxJ1xuICB9LFxuICB7XG4gICAgaWQ6ICdISVNULU02LTAyJyxcbiAgICBjb2RlOiAnUFJELUROU1I0SicsXG4gICAgbmFtZTogJ9is2KfZg9mK2Kog2K/Yp9mG2YrYsiDYsdmK2LPZitmG2KwgNCDYrNmE2K/ZiiDZgdin2K7YsSAtINij2LPZiNivINmI2LDZh9io2YonLFxuICAgIHR5cGU6ICdwcm9kdWN0JyxcbiAgICBjdXN0b21lck5hbWU6ICfYqtin2YXYsSDYrdiz2YbZiicsXG4gICAgY3VzdG9tZXJQaG9uZTogJzAxMTc3NjY1NTQ0JyxcbiAgICBxdWFudGl0eTogMSxcbiAgICB1bml0UHJpY2U6IDE4NTAwLFxuICAgIHRvdGFsUHJpY2U6IDE4NTAwLFxuICAgIGRhdGU6ICcyMDI2LTA2LTAzJ1xuICB9LFxuICB7XG4gICAgaWQ6ICdISVNULU02LTAzJyxcbiAgICBjb2RlOiAnUFJELU1UTENITCcsXG4gICAgbmFtZTogJ9in2LPYqNix2KfZiiDZhdi02K3ZhSDYrNmG2LLZitixINmF2YjYqtmI2YQgQzIg2K3YrNmFIDQwMCDZhdmEJyxcbiAgICB0eXBlOiAncHJvZHVjdCcsXG4gICAgY3VzdG9tZXJOYW1lOiAn2LnZhdix2Ygg2K/Zitin2KgnLFxuICAgIGN1c3RvbWVyUGhvbmU6ICcwMTAyMDMwNDA1MCcsXG4gICAgcXVhbnRpdHk6IDQsXG4gICAgdW5pdFByaWNlOiA0NTAsXG4gICAgdG90YWxQcmljZTogMTgwMCxcbiAgICBkYXRlOiAnMjAyNi0wNi0wNCdcbiAgfVxuXTtcbiJdLCJtYXBwaW5ncyI6IkFBMHNEYyxTQXFoQlksVUFyaEJaO0FBMXNEZDtBQUFBO0FBQUE7QUFBQTtBQUtBLFNBQWdCLFVBQVUsV0FBVyxlQUFlO0FBQ3BELFNBQVMsUUFBUSx1QkFBdUI7QUFDeEM7QUFBQSxFQUNFO0FBQUEsRUFBRztBQUFBLEVBQU07QUFBQSxFQUFLO0FBQUEsRUFBYTtBQUFBLEVBQVU7QUFBQSxFQUFRO0FBQUEsRUFBSztBQUFBLEVBQVE7QUFBQSxFQUFVO0FBQUEsRUFBTTtBQUFBLEVBQzFFO0FBQUEsRUFBTztBQUFBLEVBQU87QUFBQSxFQUFzQjtB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