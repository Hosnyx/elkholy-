/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Lock, Key, ShieldCheck, Database, Upload, Eye, EyeOff, FileText, Plus, Trash2, 
  Edit2, Check, Sparkles, FolderOpen, Users, Settings, AlertCircle, TrendingUp, 
  Coins, Activity, Calendar, MessageSquare, ArrowUpRight, CheckCircle2,
  Trash, LogOut, ShieldAlert, ShoppingBag, Package, Download, Search, Github, Link, RefreshCw, Code
} from 'lucide-react';
import { Motorcycle, CategorySlug, UserRole, UserAccount, AddOn, HomepageConfig, StoreProduct, StoreCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { DEFAULT_HOMEPAGE_CONFIG } from '../data';
import HomepagePageBuilder from './HomepagePageBuilder';
import StoreAdminPanel from './StoreAdminPanel';
import { db } from '../lib/firebase';
import { collection, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import * as XLSX from 'xlsx';
import { QRCodeSVG } from 'qrcode.react';
import JSZip from 'jszip';

interface AdminPanelProps {
  onClose: () => void;
  motorcycles: Motorcycle[];
  onUpdateMotorcycles: (updatedBikes: Motorcycle[]) => void;
  storeProducts?: StoreProduct[];
  onUpdateStoreProducts?: (updated: StoreProduct[]) => void;
  customText: any;
  onUpdateCustomText: (text: any) => void;
  homepageConfig?: HomepageConfig;
  onUpdateHomepageConfig?: (config: HomepageConfig) => void;
}

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info';
}

const DEFAULT_USERS: UserAccount[] = [
  { username: 'HOSNY1995', password: 'Hhrm0101995ELelkholy', role: 'Admin' }
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
  onUpdateHomepageConfig,
}: AdminPanelProps) {
  const { lang, dir, t } = useLanguage();

  // Authentication & Core Session State
  const [sessionUser, setSessionUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('elkholy_session_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // User Accounts State (persisted inside localStorage)
  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('elkholy_users');
    if (saved) return JSON.parse(saved);
    // Persist defaults on first run
    localStorage.setItem('elkholy_users', JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  });

  // Sidebar navigation panel: 'dashboard' | 'motorcycles' | 'store' | 'users' | 'settings' | 'home_editor'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'motorcycles' | 'store' | 'users' | 'settings' | 'home_editor'>('dashboard');

  const canAccess = (tab: string) => {
    if (sessionUser?.role === 'Admin') return true;
    if (sessionUser?.role === 'Manager') return ['dashboard', 'motorcycles', 'store'].includes(tab);
    if (sessionUser?.role === 'Staff') return ['motorcycles', 'store'].includes(tab);
    return false;
  };

  // Ensure active node role is appropriate after session load if user is restricted
  useEffect(() => {
    if (sessionUser && !canAccess(activeTab)) {
      if (sessionUser.role === 'Manager') setActiveTab('dashboard');
      else setActiveTab('motorcycles');
    }
  }, [sessionUser, activeTab]);

  // Bookings queue state
  const [bookings, setBookings] = useState<any[]>(() => {
    const saved = localStorage.getItem('elkholy_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  // Toasts list state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // GitHub Integration States
  const [githubToken, setGithubToken] = useState(() => localStorage.getItem('elkholy_github_token') || '');
  const [githubRepo, setGithubRepo] = useState(() => localStorage.getItem('elkholy_github_repo') || '');
  const [githubBranch, setGithubBranch] = useState(() => localStorage.getItem('elkholy_github_branch') || 'main');
  const [githubPath, setGithubPath] = useState(() => localStorage.getItem('elkholy_github_path') || 'elkholy_backup.json');
  const [githubImportUrl, setGithubImportUrl] = useState('');
  const [isGithubExporting, setIsGithubExporting] = useState(false);
  const [isGithubImporting, setIsGithubImporting] = useState(false);
  const [isPushingProject, setIsPushingProject] = useState(false);
  const [projectPushStep, setProjectPushStep] = useState('');

  // Dashboard category filter
  const [dashCategoryFilter, setDashCategoryFilter] = useState<'All' | 'A' | 'B' | 'C' | 'S'>('All');
  // Dashboard motorcycle search term
  const [bikeSearchTerm, setBikeSearchTerm] = useState('');

  // Multi-tab sub-layout state for Edit/Add forms
  const [formSubTab, setFormSubTab] = useState<'basic' | 'pricing' | 'catalog' | 'addons' | 'related'>('basic');

  // New accessory creation temp state
  const [newAddOn, setNewAddOn] = useState<AddOn>({
    id: '',
    name: '',
    nameAr: '',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=150',
    description: '',
    descAr: '',
    price: 0
  });

  // Bike Form States
  const [editingBike, setEditingBike] = useState<Motorcycle | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [bikeForm, setBikeForm] = useState({
    id: '',
    name: '',
    category: 'A' as CategorySlug,
    categoryName: 'Sport',
    price: '$45,000',
    priceNum: 45000,
    image: '',
    tagline: 'Ride the Future',
    shortDesc: '',
    longDesc: '',
    isPopular: false,
    specs: {
      engine: '1200cc Solid-State Hub',
      topSpeed: '320 km/h',
      fuelConsumption: '0.0 L/100km',
      power: '190 hp',
      weight: '170 kg'
    },
    isCustom: true,
    catalogFileName: '',
    catalogFileContent: '',
    originalPrice: 45000 as number | undefined,
    discount: 0 as number | undefined,
    discountType: 'percentage' as 'percentage' | 'fixed',
    offerLabel: '',
    addOns: [] as AddOn[],
    serialCode: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<StoreCategory | 'ALL'>('ALL');

  // Users creation state
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('Staff');

  // Home details text form
  const [textForm, setTextForm] = useState({
    arTitle: customText?.arTitle || 'الخولي',
    arTitleAccent: customText?.arTitleAccent || 'موتورز',
    enTitle: customText?.enTitle || 'ELKHOLY',
    enTitleAccent: customText?.enTitleAccent || 'MOTORS',
    arSlogan: customText?.arSlogan || 'سابق مع المستقبل',
    enSlogan: customText?.enSlogan || 'Ride the Future',
    arHeroDesc: customText?.arHeroDesc || 'انضم إلى عالم الغد. تقدم الخولي موتورز أقوى الموتوسيكلات والاسكوترات فائقة الأداء للمستقبل. استكشف كتالوجاتنا، واقرأ المواصفات واحجز رحلتك مباشرة.',
    enHeroDesc: customText?.enHeroDesc || 'Step inside the virtual grid. ElKholy Motors introduces extreme-output solid-state performance bikes, plasma touring adventurers, and high-fidelity smart urban scooters designed in 2026. Explore our catalog, review blueprints, and book a secure ride directly.',
    arBadge: customText?.arBadge || 'أول معرض كبار الشخصيات بمصر',
    enBadge: customText?.enBadge || "EGYPT'S FIRST CHRONOS SHOWROOM",
  });

  // Dynamic page builder state management
  const [builderConfig, setBuilderConfig] = useState<HomepageConfig>(homepageConfig);
  const [history, setHistory] = useState<HomepageConfig[]>([homepageConfig]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [templates, setTemplates] = useState<{name: string, config: HomepageConfig}[]>(() => {
    const loaded = localStorage.getItem('elkholy_templates');
    return loaded ? JSON.parse(loaded) : [];
  });
  const [newTemplateName, setNewTemplateName] = useState('');
  const [activeBuilderTab, setActiveBuilderTab] = useState<'fonts' | 'theme' | 'header' | 'main' | 'footer' | 'templates'>('header');

  // Sync state if outward prop changes
  useEffect(() => {
    if (homepageConfig) {
      setBuilderConfig(homepageConfig);
    }
  }, [homepageConfig]);

  // Multi-state configuration update helper
  const updateBuilderConfig = (newConfig: HomepageConfig) => {
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
      fireToast(lang === 'ar' ? 'تم التراجع عن التعديل' : 'Design undone successfully', 'info');
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
      fireToast(lang === 'ar' ? 'تمت إعادة تطبيق التعديل' : 'Design redone successfully', 'info');
    }
  };

  const handleSaveTemplate = () => {
    if (!newTemplateName.trim()) {
      fireToast(lang === 'ar' ? 'يرجى إدخال اسم القالب أولاً' : 'Template name cannot be empty', 'error');
      return;
    }
    const updated = [...templates, { name: newTemplateName.trim(), config: builderConfig }];
    setTemplates(updated);
    localStorage.setItem('elkholy_templates', JSON.stringify(updated));
    setNewTemplateName('');
    fireToast(lang === 'ar' ? 'تم حفظ هذا التموضع في قائمة قوالبك بنجاح!' : 'Current matrix saved as custom template!', 'success');
  };

  const handleApplyTemplate = (config: HomepageConfig) => {
    updateBuilderConfig(config);
    fireToast(lang === 'ar' ? 'تم تحميل القالب وتثبيته!' : 'Template deployed as active matrix!', 'success');
  };

  const handleRemoveTemplate = (idx: number) => {
    const updated = templates.filter((_, i) => i !== idx);
    setTemplates(updated);
    localStorage.setItem('elkholy_templates', JSON.stringify(updated));
    fireToast(lang === 'ar' ? 'تم حذف القالب المختار' : 'Selected template deleted', 'info');
  };

  const handleResetToDefault = () => {
    updateBuilderConfig(DEFAULT_HOMEPAGE_CONFIG);
    fireToast(lang === 'ar' ? 'تمت إعادة تهيئة المعاينة للسمات الافتراضية للمعرض' : 'Reset interactive showcase style deck', 'info');
  };

  // Fire a dynamic toast
  const fireToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const newToast: ToastMessage = { id: `toast-${Date.now()}`, text, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4500);
  };

  // Synchronize dynamic bookings queue updates from storage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedBookings = localStorage.getItem('elkholy_bookings');
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync users to storage
  useEffect(() => {
    localStorage.setItem('elkholy_users', JSON.stringify(users));
  }, [users]);

  // Load bookings and users from Firestore on admin authorization
  useEffect(() => {
    async function loadCloudData() {
      if (!sessionUser) return;
      try {
        const bookingsSnap = await getDocs(collection(db, 'bookings'));
        if (!bookingsSnap.empty) {
          const list: any[] = [];
          bookingsSnap.forEach((doc) => {
            const data = doc.data();
            list.push({
              id: doc.id,
              motorcycleId: data.motorcycleId,
              motorcycleName: data.motorcycleName,
              category: data.category || 'A',
              price: data.totalPrice ? `${data.totalPrice.toLocaleString()} EGP` : (data.price || '0 EGP'),
              name: data.customerName || data.name || 'Anonymous User',
              phone: data.customerPhone || data.phone || '000000000',
              email: data.customerEmail || data.email || 'Guest (Cloud)',
              date: data.date || new Date().toISOString().split('T')[0],
              timestamp: data.timestamp || new Date().toISOString(),
              status: data.status || 'sold'
            });
          });
          list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setBookings(list);
          localStorage.setItem('elkholy_bookings', JSON.stringify(list));
        }
      } catch (err) {
        console.warn("Unable to fetch bookings from Firestore:", err);
      }

      try {
        const usersSnap = await getDocs(collection(db, 'users'));
        if (!usersSnap.empty) {
          const list: UserAccount[] = [];
          usersSnap.forEach((doc) => {
            list.push(doc.data() as UserAccount);
          });
          setUsers(list);
          localStorage.setItem('elkholy_users', JSON.stringify(list));
        } else {
          // Sync existing defaults to Firestore
          for (const user of DEFAULT_USERS) {
            await setDoc(doc(db, 'users', user.username), user);
          }
        }
      } catch (err) {
        console.warn("Unable to fetch users from Firestore:", err);
      }
    }
    loadCloudData();
  }, [sessionUser]);

  // Auth Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = usernameInput.trim();
    // Validate credentials against stored list
    const found = users.find(u => u.username.toLowerCase() === cleanUser.toLowerCase() && u.password === passwordInput);
    if (found) {
      setSessionUser(found);
      localStorage.setItem('elkholy_session_user', JSON.stringify(found));
      setUsernameInput('');
      setPasswordInput('');
      fireToast(lang === 'ar' ? `مرحباً بك مجدداً ${scoreRoleLabel(found.role)}` : `Welcome back ${found.role} operator`, 'success');
    } else {
      fireToast(lang === 'ar' ? 'البوابة المغلقة: بيانات دخول خاطئة' : 'Gateway Refused: Incorrect credentials', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('elkholy_session_user');
    setSessionUser(null);
    fireToast(lang === 'ar' ? 'تم فصل الجلسة بأمان' : 'Session terminated securely', 'info');
  };

  // Memoized filtered motorcycles for Dash panel view
  const dashFilteredBikes = useMemo(() => {
    let filtered = motorcycles;
    if (dashCategoryFilter !== 'All') {
      filtered = filtered.filter(b => b.category === dashCategoryFilter);
    }
    if (bikeSearchTerm.trim()) {
      const query = bikeSearchTerm.toLowerCase().trim();
      filtered = filtered.filter(b => 
        b.name.toLowerCase().includes(query) || 
        (b.id && b.id.toLowerCase().includes(query)) ||
        (b.serialCode && b.serialCode.toLowerCase().includes(query))
      );
    }
    return filtered;
  }, [motorcycles, dashCategoryFilter, bikeSearchTerm]);

  // Image Base64 Uploader
  const handleFormImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        fireToast(lang === 'ar' ? 'الحد الأقصى لحجم الملف هو 2 ميجابايت' : 'Max attachment limit is 2MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setBikeForm((prev) => ({ ...prev, image: reader.result as string }));
          fireToast(lang === 'ar' ? 'تم تشفير الصورة وإرفاقها بنجاح' : 'Resource image attached and base64 encoded', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Bike Actions
  const handleEditBikeClick = (bike: Motorcycle) => {
    // Role check: Staff cannot edit or delete
    if (sessionUser?.role === 'Staff') {
      fireToast(lang === 'ar' ? 'صلاحيات منخفضة: لا يمكنك تعديل المركبات' : 'Low Privilege Node: Staff cannot modify machines', 'error');
      return;
    }
    setEditingBike(bike);
    setIsAddingNew(false);
    setFormSubTab('basic');
    setBikeForm({
      id: bike.id,
      name: bike.name,
      category: bike.category,
      categoryName: bike.categoryName,
      price: bike.price,
      priceNum: bike.priceNum || 45000,
      image: bike.image,
      tagline: bike.tagline || 'Apex Performance',
      shortDesc: bike.shortDesc,
      longDesc: bike.longDesc || '',
      isPopular: !!bike.isPopular,
      specs: { ...bike.specs },
      isCustom: true,
      catalogFileName: bike.catalogFileName || '',
      catalogFileContent: bike.catalogFileContent || '',
      originalPrice: bike.originalPrice !== undefined ? bike.originalPrice : (bike.priceNum || 45000),
      discount: bike.discount || 0,
      discountType: bike.discountType || 'percentage',
      offerLabel: bike.offerLabel || '',
      addOns: bike.addOns ? [...bike.addOns] : [],
      serialCode: bike.serialCode || '',
    });
  };

  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setEditingBike(null);
    setFormSubTab('basic');
    setBikeForm({
      id: `custom-bike-${Date.now()}`,
      name: 'NEW APEX MACHINE V4',
      category: 'A',
      categoryName: 'Sport',
      price: '$45,000',
      priceNum: 45000,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600',
      tagline: 'Defying Hybrid Propulsion Gravity',
      shortDesc: 'State-of-the-art futuristic motorcycle prototype built for top speed and luxury.',
      longDesc: 'Engineered with double aero-dynamics, plasma thrust controls, adaptive visual HUD panels, and lightweight solid-state lithium cells for continuous power output.',
      isPopular: false,
      specs: {
        engine: '1200cc Quad-Pulse Solid',
        topSpeed: '340 km/h',
        fuelConsumption: '0.0 L/100km',
        power: '210 HP',
        weight: '172 kg'
      },
      isCustom: true,
      catalogFileName: '',
      catalogFileContent: '',
      originalPrice: 45000,
      discount: 0,
      discountType: 'percentage',
      offerLabel: '',
      addOns: [],
      serialCode: 'MOTO-' + Date.now(),
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bikeForm.name || !bikeForm.image) {
      fireToast(lang === 'ar' ? 'الرجاء إدخال اسم المركبة وصورة صالحة' : 'Machine name and visual are both mandatory', 'error');
      return;
    }

    const catNames = { A: 'Sport', B: 'Cruiser', C: 'Adventure', S: 'Scooter' };
    
    // Dynamically calculate final price from originalPrice and discount
    let calculatedPriceNum = Number(bikeForm.originalPrice !== undefined ? bikeForm.originalPrice : (bikeForm.priceNum || 45000));
    const discVal = Number(bikeForm.discount || 0);
    if (discVal > 0 && bikeForm.originalPrice) {
      if (bikeForm.discountType === 'percentage') {
        calculatedPriceNum = Math.round(bikeForm.originalPrice * (1 - discVal / 100));
      } else {
        calculatedPriceNum = Math.round(Math.max(0, bikeForm.originalPrice - discVal));
      }
    }

    const completedForm: Motorcycle = {
      ...bikeForm,
      priceNum: calculatedPriceNum,
      categoryName: catNames[bikeForm.category],
      price: `${calculatedPriceNum.toLocaleString()} جنيه`,
    };

    let nextBikes: Motorcycle[] = [];
    if (isAddingNew) {
      nextBikes = [completedForm, ...motorcycles];
      fireToast(lang === 'ar' ? 'تمت إضافة آلة جديدة للأسطول!' : 'New heavy machine commissioned successfully!', 'success');
    } else if (editingBike) {
      if (sessionUser?.role === 'Staff') {
        fireToast(lang === 'ar' ? 'خطأ في الترخيص: لا تملك حق التعديل' : 'Staff node unauthorized for writes', 'error');
        return;
      }
      nextBikes = motorcycles.map((b) => (b.id === editingBike.id ? completedForm : b));
      fireToast(lang === 'ar' ? 'تم تحديث بيانات المعايرة بنجاح!' : 'Machine parameters updated in showrooms!', 'success');
    }

    onUpdateMotorcycles(nextBikes);
    setEditingBike(null);
    setIsAddingNew(false);
  };

  const handleDeleteBike = (bikeId: string) => {
    // Only Admin can delete
    if (sessionUser?.role !== 'Admin') {
      fireToast(lang === 'ar' ? 'العملية مرفوضة: المسؤولون فقط يمكنهم الحذف' : 'Privilege Breach: Only core admins can decommission equipment', 'error');
      return;
    }
    const nextBikes = motorcycles.filter((b) => b.id !== bikeId);
    onUpdateMotorcycles(nextBikes);
    fireToast(lang === 'ar' ? 'تم شطب وإزالة المركبة من قاعدة البيانات' : 'Heavy cycle decommissioned successfully', 'success');
  };

  const handleDownloadAndCopyQRCode = (bike: Motorcycle) => {
    const qrCodeText = bike.serialCode || bike.id;
    
    // 1. Copy to clipboard
    navigator.clipboard.writeText(qrCodeText).then(() => {
      fireToast(
        lang === 'ar' 
          ? `تم نسخ الكود بنجاح: ${qrCodeText}` 
          : `Code copied successfully: ${qrCodeText}`, 
        'success'
      );
    }).catch((err) => {
      console.warn("Failed to copy", err);
    });

    // 2. Locate SVG and initiate image download
    const svgElement = document.getElementById(`qr-${bike.id}`);
    if (!svgElement) {
      console.warn(`SVG element qr-${bike.id} not found`);
      return;
    }

    try {
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const blobURL = window.URL.createObjectURL(svgBlob);

      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');
        if (context) {
          // Fill background white
          context.fillStyle = '#FFFFFF';
          context.fillRect(0, 0, 256, 256);
          // Draw QR on top
          context.drawImage(image, 16, 16, 224, 224);
          
          const pngURL = canvas.toDataURL('image/png');
          const dlLink = document.createElement('a');
          dlLink.href = pngURL;
          dlLink.download = `QR_${bike.name.replace(/\s+/g, '_')}_${qrCodeText}.png`;
          document.body.appendChild(dlLink);
          dlLink.click();
          document.body.removeChild(dlLink);
          
          window.URL.revokeObjectURL(blobURL);
        }
      };
      image.onerror = () => {
        // Fallback to SVG download in case image drawing is blocked by sandbox constraints
        const dlLink = document.createElement('a');
        dlLink.href = blobURL;
        dlLink.download = `QR_${bike.name.replace(/\s+/g, '_')}_${qrCodeText}.svg`;
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
      };
      image.src = blobURL;
    } catch (err) {
      console.error("Failed to generate download:", err);
    }
  };

  // User Actions (Core Admin Only)
  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionUser?.role !== 'Admin') {
      fireToast(lang === 'ar' ? 'صلاحيات كافية فقط للمشرف الرئيسي' : 'Master administrator key required for nodes curation', 'error');
      return;
    }

    const cleanUsername = newUsername.trim();
    if (!cleanUsername || !newPassword) {
      fireToast(lang === 'ar' ? 'خطأ: يرجى ملء كافة خانات المشرفين' : 'Node username and code key are required', 'error');
      return;
    }

    const userExists = users.some(u => u.username.toLowerCase() === cleanUsername.toLowerCase());
    if (userExists) {
      fireToast(lang === 'ar' ? 'هذا الحساب مسجل بالفعل في الأتمتة' : 'Operator node identity key already online', 'error');
      return;
    }

    const newUser: UserAccount = {
      username: cleanUsername,
      password: newPassword,
      role: newRole
    };

    const nextUsers = [...users, newUser];
    setUsers(nextUsers);
    setNewUsername('');
    setNewPassword('');
    try {
      await setDoc(doc(db, 'users', cleanUsername), newUser);
    } catch (err) {
      console.warn("Unable to sync new user to Firestore:", err);
    }
    fireToast(lang === 'ar' ? 'تم تفويض المشغل الجديد بنجاح!' : `Operator node delegated: ${cleanUsername} [${newRole}]`, 'success');
  };

  const handleDeleteUser = async (usernameToDelete: string) => {
    if (sessionUser?.role !== 'Admin') {
      fireToast('Core admin authorization required', 'error');
      return;
    }

    // Protect master HOSNY1995 from deletion lockout
    if (usernameToDelete.toUpperCase() === 'HOSNY1995') {
      fireToast(lang === 'ar' ? 'لوائح الأمان: لا يمكن حذف حساب المالك الرئيسي' : 'Security Directive: Locked node [HOSNY1995] cannot be erased', 'error');
      return;
    }

    // Protect current self from deletion
    if (usernameToDelete === sessionUser.username) {
      fireToast(lang === 'ar' ? 'لوائح الأمان: لا يمكن حذف مشغل الجلسة الحالي' : 'Security Directive: You cannot delete your own session node', 'error');
      return;
    }

    const next = users.filter(u => u.username !== usernameToDelete);
    setUsers(next);
    try {
      await deleteDoc(doc(db, 'users', usernameToDelete));
    } catch (err) {
      console.warn("Unable to sync deleted user from Firestore:", err);
    }
    fireToast(lang === 'ar' ? 'تم سحب صلاحيات المشغل بنجاح' : `Privileges revoked for node: ${usernameToDelete}`, 'success');
  };

  // Update Settings homepage Text Content
  const handleContentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionUser?.role !== 'Admin') {
      fireToast(lang === 'ar' ? 'صلاحيات منخفضة: المشرفون فقط يحق لهم تعديل المحتوى المالي والوصفي' : 'Forbidden: Homepage layouts restricted to Admin operators', 'error');
      return;
    }
    onUpdateCustomText(textForm);
    if (onUpdateHomepageConfig) {
      onUpdateHomepageConfig(builderConfig);
    }
    fireToast(lang === 'ar' ? 'تم حفظ وتطوير تصميم صفحة المعرض بنجاح!' : 'Advanced layout configuration deployed successfully!', 'success');
  };

  // Clear bookings queue logs (Admin privilege)
  const handleClearBookings = async () => {
    if (sessionUser?.role !== 'Admin') {
      fireToast(lang === 'ar' ? 'الوصول مرفوض: الإداريون فقط يحق لهم الحذف' : 'Privilege Breach: Only admins can clean logs', 'error');
      return;
    }
    localStorage.removeItem('elkholy_bookings');
    setBookings([]);
    try {
      const qSnap = await getDocs(collection(db, 'bookings'));
      for (const d of qSnap.docs) {
        await deleteDoc(doc(db, 'bookings', d.id));
      }
    } catch (err) {
      console.warn("Unable to clear bookings from Firestore:", err);
    }
    fireToast(lang === 'ar' ? 'تم تفريغ طابور الحجوزات نهائياً' : 'Holographic lead queue purged successfully', 'info');
  };

  // Toggle booking's status between sold and pending
  const handleToggleBookingStatus = async (bookingId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'sold' ? 'pending' : 'sold';
    
    // update state
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: nextStatus } : b);
    setBookings(updated);
    localStorage.setItem('elkholy_bookings', JSON.stringify(updated));
    
    try {
      await setDoc(doc(db, 'bookings', bookingId), {
        status: nextStatus
      }, { merge: true });
      fireToast(
        lang === 'ar' ? 'تم تحديث حالة البيع للدراجة بنجاح' : 'Motorcycle status updated successfully',
        'success'
      );
    } catch (err) {
      console.warn("Unable to sync booking status in cloud:", err);
    }
  };

  // Score stats values
  const fleetValue = useMemo(() => {
    return motorcycles.reduce((acc, current) => acc + (current.priceNum || 45000), 0);
  }, [motorcycles]);

  const catA_Count = useMemo(() => motorcycles.filter(b => b.category === 'A').length, [motorcycles]);
  const catB_Count = useMemo(() => motorcycles.filter(b => b.category === 'B').length, [motorcycles]);
  const catC_Count = useMemo(() => motorcycles.filter(b => b.category === 'C').length, [motorcycles]);
  const catS_Count = useMemo(() => motorcycles.filter(b => b.category === 'S').length, [motorcycles]);

  // Motorcycle sales and sold count calculation (Based on bookings having status !== 'pending')
  const motorsTotalSalesValue = useMemo(() => {
    return bookings.reduce((acc, b) => {
      const status = b.status || 'sold';
      if (status !== 'sold') return acc;
      
      let numericPrice = 45000; // default
      if (b.price) {
        const cleaned = b.price.replace(/[^0-9]/g, '');
        if (cleaned) {
          numericPrice = Number(cleaned);
        }
      }
      return acc + numericPrice;
    }, 0);
  }, [bookings]);

  const motorsTotalSoldCount = useMemo(() => {
    return bookings.filter(b => (b.status || 'sold') === 'sold').length;
  }, [bookings]);

  // E-commerce Store statistics calculations
  const storeTotalRevenue = useMemo(() => {
    return (storeProducts || []).reduce((acc, p) => acc + ((p.price || 0) * (p.soldCount || 0)), 0);
  }, [storeProducts]);

  const storeTotalItemsSold = useMemo(() => {
    return (storeProducts || []).reduce((acc, p) => acc + (p.soldCount || 0), 0);
  }, [storeProducts]);

  // --- Excel Export & Sales Reports Processing States ---
  const [exportRangeType, setExportRangeType] = useState<'today' | 'week' | 'month' | '3months' | '6months' | 'year' | 'custom'>('month');
  const [exportStartDate, setExportStartDate] = useState<string>(new Date().toISOString().slice(0, 16));
  const [exportEndDate, setExportEndDate] = useState<string>(new Date().toISOString().slice(0, 16));

  const handleExportExcel = () => {
    // 1. Gather all data sources
    // Real bookings
    const parsedRealBookings = bookings.map((b) => {
      // safe numeric price parsing
      let numericPrice = 45000; // default
      if (b.price) {
        const cleaned = b.price.replace(/[^0-9]/g, '');
        if (cleaned) {
          numericPrice = Number(cleaned);
        }
      }
      
      let dateStr = b.date || new Date().toISOString().split('T')[0];
      if (b.timestamp) {
        try {
          dateStr = b.timestamp.split('T')[0];
        } catch(e){}
      }
      
      return {
        id: b.id,
        code: b.motorcycleId || 'MOTO-GEN',
        name: b.motorcycleName,
        type: lang === 'ar' ? 'دراجة نارية' : 'Motorcycle',
        customerName: b.name || 'Anonymous',
        customerPhone: b.phone || '-',
        quantity: 1,
        unitPrice: numericPrice,
        totalPrice: numericPrice,
        date: dateStr
      };
    });
    
    // Merge real bookings and mock historical transactions
    const allSales = [...parsedRealBookings];
    
    // Filter by chosen timeframe/period (Current Simulated Date: June 4, 2026)
    const now = new Date(2026, 5, 4);
    
    const filteredSales = allSales.filter((sale) => {
      const saleDate = new Date(sale.date);
      if (isNaN(saleDate.getTime())) return true;
      
      const diffTime = now.getTime() - saleDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      
      if (exportRangeType === 'today') {
        return saleDate.toDateString() === now.toDateString();
      }
      if (exportRangeType === 'week') {
        return diffDays >= 0 && diffDays <= 7;
      }
      if (exportRangeType === 'month') {
        return diffDays >= 0 && diffDays <= 30;
      }
      if (exportRangeType === '3months') {
        return diffDays >= 0 && diffDays <= 90;
      }
      if (exportRangeType === '6months') {
        return diffDays >= 0 && diffDays <= 180;
      }
      if (exportRangeType === 'year') {
        return diffDays >= 0 && diffDays <= 365;
      }
      if (exportRangeType === 'custom') {
        const start = new Date(exportStartDate).getTime();
        const end = new Date(exportEndDate).getTime();
        const saleTime = saleDate.getTime();
        return saleTime >= start && saleTime <= end;
      }
      return true;
    });

    if (filteredSales.length === 0) {
      fireToast(
        lang === 'ar' 
          ? 'لا توجد مبيعات أو حجوزات متوفرة في النطاق المحدد!' 
          : 'No sales or booking entries exist in this duration', 
        'error'
      );
      return;
    }

    // Translate items to beautiful Arabic/English excel headers
    const xlsData = filteredSales.map((sale, index) => {
      if (lang === 'ar') {
        return {
          'م': index + 1,
          'كود السلعة/الخدمة': sale.code,
          'الاسم / الموديل': sale.name,
          'التصنيف': sale.type,
          'اسم العميل': sale.customerName,
          'رقم الهاتف': sale.customerPhone,
          'الكمية المباعة': sale.quantity,
          'سعر الوحدة (ج.م)': sale.unitPrice,
          'الإجمالي كلي (ج.م)': sale.totalPrice,
          'تاريخ الاستحقاق/تاريخ البيع': sale.date
        };
      } else {
        return {
          'No': index + 1,
          'Item Code': sale.code,
          'Name / Model': sale.name,
          'Category Type': sale.type,
          'Customer Name': sale.customerName,
          'Phone Reference': sale.customerPhone,
          'Quantity': sale.quantity,
          'Unit Price (EGP)': sale.unitPrice,
          'Aggregate Total (EGP)': sale.totalPrice,
          'Transaction Date': sale.date
        };
      }
    });

    // Generate Spreadsheet worksheet
    const worksheet = XLSX.utils.json_to_sheet(xlsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, lang === 'ar' ? 'سجل الأرباح والمبيعات' : 'Sales Journal');
    
    XLSX.writeFile(workbook, `ElKholy_Motors_Sales_Report_2026.xlsx`);
    
    fireToast(
      lang === 'ar' 
        ? `تم تجميع وتصدير التقرير بنجاح! (${filteredSales.length} حركة بيع/حجز)` 
        : `Successfully exported report containing ${filteredSales.length} transactions.`, 
      'success'
    );
  };

  const handleDownloadBackup = async () => {
    try {
      const zip = new JSZip();
      
      // 1. Motorcycles
      zip.file("motorcycles_backup.json", JSON.stringify(motorcycles, null, 2));
      
      // 2. Store Products
      zip.file("store_products_backup.json", JSON.stringify(storeProducts || [], null, 2));
      
      // 3. Custom Text
      zip.file("custom_text_backup.json", JSON.stringify(customText || {}, null, 2));
      
      // 4. Homepage Config
      zip.file("homepage_config_backup.json", JSON.stringify(builderConfig || DEFAULT_HOMEPAGE_CONFIG, null, 2));
      
      // 5. Bookings
      zip.file("bookings_backup.json", JSON.stringify(bookings || [], null, 2));
      
      // 6. Users
      zip.file("users_backup.json", JSON.stringify(users || [], null, 2));
      
      // Metadata/Readme
      zip.file("README_BACKUP.txt", `ELKHOLY MOTORS COMPLETE SYSTEM BACKUP
Generated: ${new Date().toLocaleString()}
Timestamp: ${new Date().toISOString()}

This ZIP file contains complete system files and database configurations (Motorcycles, Store products, Customize layouts, reservations, and admin accounts). 
Do NOT edit or rename the json files inside this archive to ensure flawless synchronization when restoring in the future.`);

      const content = await zip.generateAsync({ type: "blob" });
      const dlURL = window.URL.createObjectURL(content);
      const tempLink = document.createElement("a");
      tempLink.href = dlURL;
      tempLink.download = `elkholy_site_backup_${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(dlURL);

      fireToast(
        lang === 'ar'
          ? 'تم إنشاء نسخة احتياطية كاملة للموقع وتحميلها كملف مضغوط بنجاح! 📦'
          : 'Complete site backup generated and downloaded successfully! 📦',
        'success'
      );
    } catch (err) {
      console.error("Backup generation failed:", err);
      fireToast(
        lang === 'ar' ? 'فشل إنشاء ملف النسخة الاحتياطية!' : 'Failed to generate archive backup!',
        'error'
      );
    }
  };

  const handleRestoreBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (sessionUser?.role !== 'Admin') {
      fireToast(
        lang === 'ar' ? 'عذراً! الصلاحية غير كافية لعمل استعادة للموقع.' : 'Privilege Breach: Only Master Administrators can restore backup archives',
        'error'
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const buffer = evt.target?.result as ArrayBuffer;
        const zip = await JSZip.loadAsync(buffer);

        // Track what we recovered
        let restoredCount = 0;

        // 1. Motorcycles
        const bikesFile = zip.file("motorcycles_backup.json");
        if (bikesFile) {
          const content = await bikesFile.async("string");
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            onUpdateMotorcycles(parsed);
            restoredCount++;
          }
        }

        // 2. Store products
        const productsFile = zip.file("store_products_backup.json");
        if (productsFile && onUpdateStoreProducts) {
          const content = await productsFile.async("string");
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            onUpdateStoreProducts(parsed);
            restoredCount++;
          }
        }

        // 3. Custom translation settings
        const textFile = zip.file("custom_text_backup.json");
        if (textFile) {
          const content = await textFile.async("string");
          const parsed = JSON.parse(content);
          onUpdateCustomText(parsed);
          restoredCount++;
        }

        // 4. Homepage config
        const configFile = zip.file("homepage_config_backup.json");
        if (configFile) {
          const content = await configFile.async("string");
          const parsed = JSON.parse(content);
          setBuilderConfig(parsed);
          onUpdateHomepageConfig(parsed);
          restoredCount++;
        }

        // 5. Bookings
        const bookingsFile = zip.file("bookings_backup.json");
        if (bookingsFile) {
          const content = await bookingsFile.async("string");
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            setBookings(parsed);
            localStorage.setItem('elkholy_bookings', JSON.stringify(parsed));
            restoredCount++;

            // Cloud Firestore Sync (optional/graceful)
            try {
              for (const b of parsed) {
                await setDoc(doc(db, 'bookings', b.id), b);
              }
            } catch(e) {
              console.warn("Unable to sync restored bookings to Firestore:", e);
            }
          }
        }

        // 6. Users accounts
        const usersFile = zip.file("users_backup.json");
        if (usersFile) {
          const content = await usersFile.async("string");
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            setUsers(parsed);
            localStorage.setItem('elkholy_users', JSON.stringify(parsed));
            restoredCount++;
          }
        }

        if (restoredCount > 0) {
          fireToast(
            lang === 'ar'
              ? 'تمت استعادة النسخة الاحتياطية وتطبيقها على خوادم الموقع بنجاح! 🚀🔄'
              : 'Restore sequence successful! All databases updated in real-time. 🚀🔄',
            'success'
          );
        } else {
          fireToast(
            lang === 'ar'
              ? 'لم يتم العثور على ملفات احتياطية صالحة داخل الأرشيف المضغوط!'
              : 'Selected ZIP does not contain compliant ElKholy JSON database backups!',
            'error'
          );
        }

        // Reset input element
        e.target.value = '';
      } catch (err) {
        console.error("Restore failed:", err);
        fireToast(
          lang === 'ar'
            ? 'خطأ غير متوقع أثناء استخراج النسخة الاحتياطية!'
            : 'Unrecognized structure! Unzip operation terminated unexpectedly.',
          'error'
        );
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const generateUnifiedBackupData = () => {
    return {
      type: "elkholy_backup_json",
      version: "1.0",
      timestamp: new Date().toISOString(),
      motorcycles: motorcycles || [],
      storeProducts: storeProducts || [],
      customText: customText || {},
      homepageConfig: builderConfig || DEFAULT_HOMEPAGE_CONFIG,
      bookings: bookings || [],
      users: users || []
    };
  };

  const applyUnifiedBackupData = (data: any) => {
    if (!data || data.type !== "elkholy_backup_json") {
      throw new Error("Invalid backup format");
    }

    let restoredCount = 0;

    // 1. Motorcycles
    if (Array.isArray(data.motorcycles)) {
      onUpdateMotorcycles(data.motorcycles);
      restoredCount++;
    }

    // 2. Store Products
    if (Array.isArray(data.storeProducts) && onUpdateStoreProducts) {
      onUpdateStoreProducts(data.storeProducts);
      restoredCount++;
    }

    // 3. Custom Text
    if (data.customText) {
      onUpdateCustomText(data.customText);
      restoredCount++;
    }

    // 4. Homepage Config
    if (data.homepageConfig) {
      setBuilderConfig(data.homepageConfig);
      onUpdateHomepageConfig(data.homepageConfig);
      restoredCount++;
    }

    // 5. Bookings
    if (Array.isArray(data.bookings)) {
      setBookings(data.bookings);
      localStorage.setItem('elkholy_bookings', JSON.stringify(data.bookings));
      restoredCount++;
      // Sync to firestore gently
      try {
        data.bookings.forEach((b: any) => {
          setDoc(doc(db, 'bookings', b.id), b).catch(err => console.warn("Sync failed for booking", b.id));
        });
      } catch (err) {
        console.warn("Unable to sync restored bookings to Firestore:", err);
      }
    }

    // 6. Users
    if (Array.isArray(data.users)) {
      setUsers(data.users);
      localStorage.setItem('elkholy_users', JSON.stringify(data.users));
      restoredCount++;
    }

    return restoredCount;
  };

  const handleExportToGitHub = async () => {
    if (!githubToken.trim()) {
      fireToast(
        lang === 'ar' ? 'يرجى إدخال رمز الوصول الشخصي (Token) لحساب GitHub' : 'Please provide a GitHub Personal Access Token',
        'error'
      );
      return;
    }
    if (!githubRepo.trim() || !githubRepo.includes('/')) {
      fireToast(
        lang === 'ar' ? 'يرجى إدخال مسار المستودع بالشكل الصحيح (username/repo)' : 'Invalid repository path. Use format: username/repo-name',
        'error'
      );
      return;
    }

    setIsGithubExporting(true);

    try {
      const backupData = generateUnifiedBackupData();
      const contentString = JSON.stringify(backupData, null, 2);
      
      // We must encode the content to UTF-8 Base64.
      // btoa with unescape handles multi-byte (Arabic) characters correctly!
      const contentBase64 = btoa(unescape(encodeURIComponent(contentString)));

      const cleanRepo = githubRepo.trim();
      const cleanBranch = githubBranch.trim() || 'main';
      const cleanPath = githubPath.trim() || 'elkholy_backup.json';

      // 1. Check if the file already exists to get its SHA
      let fileSha: string | null = null;
      try {
        const checkRes = await fetch(
          `https://api.github.com/repos/${cleanRepo}/contents/${cleanPath}?ref=${cleanBranch}`,
          {
            headers: {
              'Authorization': `token ${githubToken.trim()}`,
              'Accept': 'application/vnd.github.v3+json'
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

      // 2. Perform the PUT request
      const putBody: any = {
        message: `ElKholy Motors automatic system backup - ${new Date().toISOString()}`,
        content: contentBase64,
        branch: cleanBranch
      };
      if (fileSha) {
        putBody.sha = fileSha;
      }

      const putRes = await fetch(
        `https://api.github.com/repos/${cleanRepo}/contents/${cleanPath}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${githubToken.trim()}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(putBody)
        }
      );

      if (putRes.ok) {
        // Save config in localStorage
        localStorage.setItem('elkholy_github_token', githubToken.trim());
        localStorage.setItem('elkholy_github_repo', cleanRepo);
        localStorage.setItem('elkholy_github_branch', cleanBranch);
        localStorage.setItem('elkholy_github_path', cleanPath);

        fireToast(
          lang === 'ar'
            ? 'تم تصدير النسخة الاحتياطية بنجاح إلى مستودع GitHub! 🚀📂'
            : 'Operational catalog data pushed successfully to GitHub repository! 🚀📂',
          'success'
        );
      } else {
        const errJson = await putRes.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errJson.message || `HTTP ${putRes.status}`);
      }
    } catch (err: any) {
      console.error("GitHub Export Failed:", err);
      fireToast(
        lang === 'ar'
          ? `عذراً، فشل التصدير لـ GitHub: ${err.message || 'تأكد من الرمز وصحة المستودع'}`
          : `GitHub connection termination: ${err.message || 'Invalid PAT/Repo Permissions'}`,
        'error'
      );
    } finally {
      setIsGithubExporting(false);
    }
  };

  const handleImportByUrl = async () => {
    if (!githubImportUrl.trim()) {
      fireToast(
        lang === 'ar' ? 'يرجى إدخال رابط ملف النسخة الاحتياطية المباشر' : 'Please provide a valid direct backup URL',
        'error'
      );
      return;
    }

    if (sessionUser?.role !== 'Admin') {
      fireToast(
        lang === 'ar' ? 'عذراً! الصلاحية غير كافية لعمل استعادة للموقع.' : 'Privilege Breach: Only Master Administrators can restore backup archives',
        'error'
      );
      return;
    }

    setIsGithubImporting(true);

    try {
      // Direct raw link resolver: if github.com is provided but not raw.githubusercontent.com, try to friendly convert it!
      let resolvedUrl = githubImportUrl.trim();
      if (resolvedUrl.includes('github.com') && !resolvedUrl.includes('raw.githubusercontent.com') && resolvedUrl.includes('/blob/')) {
        resolvedUrl = resolvedUrl
          .replace('github.com', 'raw.githubusercontent.com')
          .replace('/blob/', '/');
      }

      const res = await fetch(resolvedUrl);
      if (!res.ok) {
        throw new Error(`Failed to fetch file (HTTP ${res.status})`);
      }

      const backupData = await res.json();
      const count = applyUnifiedBackupData(backupData);

      if (count > 0) {
        fireToast(
          lang === 'ar'
            ? 'تم جلب واستعادة البيانات من الرابط بنجاح! 🚀🔄'
            : 'Data imported and system modules synchronized from remote URL! 🚀🔄',
          'success'
        );
        setGithubImportUrl('');
      } else {
        throw new Error("No compatible tables restored");
      }
    } catch (err: any) {
      console.error("Remote Import Failed:", err);
      fireToast(
        lang === 'ar'
          ? `عذراً، فشل جلب البيانات: ${err.message || 'تأكد من صلاحية الرابط وملف الـ JSON'}`
          : `Import failed: ${err.message || 'Ensure URL points to a public, valid backup JSON'}`,
        'error'
      );
    } finally {
      setIsGithubImporting(false);
    }
  };

  const handlePushEntireProjectToGitHub = async () => {
    if (!githubToken.trim()) {
      fireToast(
        lang === 'ar' ? 'يرجى إدخال رمز الوصول الشخصي (Token) لحساب GitHub' : 'Please provide a GitHub Personal Access Token',
        'error'
      );
      return;
    }
    if (!githubRepo.trim() || !githubRepo.includes('/')) {
      fireToast(
        lang === 'ar' ? 'يرجى إدخال مسار المستودع بالشكل الصحيح (username/repo)' : 'Invalid repository path. Use format: username/repo-name',
        'error'
      );
      return;
    }

    setIsPushingProject(true);
    setProjectPushStep(lang === 'ar' ? 'البدء وتجهيز الحزم...' : 'Initializing package data...');

    const headers = {
      'Authorization': `token ${githubToken.trim()}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    };

    const cleanRepo = githubRepo.trim();
    const cleanBranch = githubBranch.trim() || 'main';

    // Offline definitions to prevent Vite FS allowlist warning noise on config files
    const staticConfigs: Record<string, string> = {
      'package.json': `{
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
      'tsconfig.json': `{
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
      'vite.config.ts': `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [tailwindcss(), react()],
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
      'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Google AI Studio App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
      '.gitignore': `node_modules/
build/
dist/
coverage/
.DS_Store
*.log
.env*
!.env.example`,
      '.env.example': `# GEMINI_API_KEY: Required for Gemini AI API calls.
# AI Studio automatically injects this at runtime from user secrets.
# Users configure this via the Secrets panel in the AI Studio UI.
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# APP_URL: The URL where this applet is hosted.
# AI Studio automatically injects this at runtime with the Cloud Run service URL.
# Used for self-referential links, OAuth callbacks, and API endpoints.
APP_URL="MY_APP_URL"`
    };

    try {
      // 1. Get reference to target branch
      setProjectPushStep(lang === 'ar' ? 'جاري الاتصال بـ GitHub وجلب آخر التزام...' : 'Connecting to GitHub & fetching target ref...');
      const refRes = await fetch(`https://api.github.com/repos/${cleanRepo}/git/ref/heads/${cleanBranch}`, { headers });
      
      let parentCommitSha = '';
      let baseTreeSha = '';
      let hasExistingBranch = refRes.ok;

      if (hasExistingBranch) {
        const refData = await refRes.json();
        parentCommitSha = refData.object.sha;

        // Get commit details to resolve its tree SHA
        const commitRes = await fetch(`https://api.github.com/repos/${cleanRepo}/git/commits/${parentCommitSha}`, { headers });
        if (commitRes.ok) {
          const commitData = await commitRes.json();
          baseTreeSha = commitData.tree.sha;
        }
      }

      // 2. Prepare files compilation
      const filesToUpload = [
        'package.json',
        'tsconfig.json',
        'vite.config.ts',
        'index.html',
        '.gitignore',
        '.env.example',
        'src/main.tsx',
        'src/App.tsx',
        'src/index.css',
        'src/types.ts',
        'src/translations.ts',
        'src/data.ts',
        'src/dataStoreMock.ts',
        'src/vite-env.d.ts',
        'src/context/LanguageContext.tsx',
        'src/lib/firebase.ts',
        'src/components/AdminPanel.tsx',
        'src/components/BookingModal.tsx',
        'src/components/CartDrawer.tsx',
        'src/components/ContactFooter.tsx',
        'src/components/FilterSection.tsx',
        'src/components/HomepagePageBuilder.tsx',
        'src/components/MotorcycleCard.tsx',
        'src/components/Navbar.tsx',
        'src/components/PdfModal.tsx',
        'src/components/StoreAdminPanel.tsx',
        'src/components/StoreProductCard.tsx',
        'src/components/StoreView.tsx'
      ];

      const binaryImages = [
        'src/assets/images/elkholy_adventure_bike_1780394016498.png',
        'src/assets/images/elkholy_cruiser_bike_1780393998079.png',
        'src/assets/images/elkholy_hero_banner_1780393961041.png',
        'src/assets/images/elkholy_scooter_1780394036022.png',
        'src/assets/images/elkholy_sport_bike_1780393979815.png'
      ];

      const treeItems: any[] = [];

      // A. Load and load text files (with static lookup fallback to prevent Vite serving allowlist warnings)
      for (let i = 0; i < filesToUpload.length; i++) {
        const path = filesToUpload[i];
        setProjectPushStep(
          lang === 'ar' 
            ? `جاري تحضير الملف النصي (${i + 1}/${filesToUpload.length}): ${path}`
            : `Preparing source file (${i + 1}/${filesToUpload.length}): ${path}`
        );
        try {
          let content = '';
          if (staticConfigs[path] !== undefined) {
            content = staticConfigs[path];
          } else {
            const fileRes = await fetch(`/api/raw-file?path=${path}`);
            if (!fileRes.ok) throw new Error(`Could not fetch ${path}`);
            content = await fileRes.text();
          }
          treeItems.push({
            path: path,
            mode: '100644',
            type: 'blob',
            content: content
          });
        } catch (err) {
          console.warn(`File fallback active or failed to load: ${path}`, err);
        }
      }

      // B. Load and upload binary files
      for (let i = 0; i < binaryImages.length; i++) {
        const imgPath = binaryImages[i];
        setProjectPushStep(
          lang === 'ar'
            ? `جاري رفع صورة المعرض الثنائية (${i + 1}/${binaryImages.length}): ${imgPath.split('/').pop()}`
            : `Uploading assets node (${i + 1}/${binaryImages.length}): ${imgPath.split('/').pop()}`
        );
        try {
          const imgRes = await fetch('/' + imgPath);
          if (!imgRes.ok) throw new Error(`Image fetch failed: ${imgPath}`);
          const blob = await imgRes.blob();

          // Read blob as base64
          const sha = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = async () => {
              const base64str = (reader.result as string).split(',')[1];
              try {
                const blobRes = await fetch(`https://api.github.com/repos/${cleanRepo}/git/blobs`, {
                  method: 'POST',
                  headers,
                  body: JSON.stringify({
                    content: base64str,
                    encoding: 'base64'
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
            mode: '100644',
            type: 'blob',
            sha: sha
          });
        } catch (err) {
          console.warn(`Binary upload failed or skipped for: ${imgPath}`, err);
        }
      }

      // 3. Create Git Tree on GitHub
      setProjectPushStep(lang === 'ar' ? 'جاري بناء خريطة مستودع GitHub...' : 'Deploying new files tree map on GitHub...');
      const treeBody: any = {
        tree: treeItems
      };
      if (baseTreeSha) {
        treeBody.base_tree = baseTreeSha;
      }

      const treePostRes = await fetch(`https://api.github.com/repos/${cleanRepo}/git/trees`, {
        method: 'POST',
        headers,
        body: JSON.stringify(treeBody)
      });

      if (!treePostRes.ok) {
        const errJson = await treePostRes.json().catch(() => ({ message: 'Tree creation failed' }));
        throw new Error(errJson.message || 'Failed to craft repository map tree');
      }
      const treePostData = await treePostRes.json();
      const newTreeSha = treePostData.sha;

      // 4. Create Commit on GitHub
      setProjectPushStep(lang === 'ar' ? 'جاري تسجيل التزام الكود (Commit)...' : 'Committing codebase modifications...');
      const commitBody: any = {
        message: `Automatic live backup deploy - Vercel compatible - ${new Date().toLocaleString()}`,
        tree: newTreeSha
      };
      if (parentCommitSha) {
        commitBody.parents = [parentCommitSha];
      }

      const commitPostRes = await fetch(`https://api.github.com/repos/${cleanRepo}/git/commits`, {
        method: 'POST',
        headers,
        body: JSON.stringify(commitBody)
      });

      if (!commitPostRes.ok) {
        const errJson = await commitPostRes.json().catch(() => ({ message: 'Commit creation failed' }));
        throw new Error(errJson.message || 'Failed to create Git commit node');
      }
      const commitPostData = await commitPostRes.json();
      const newCommitSha = commitPostData.sha;

      // 5. Update or Create reference
      setProjectPushStep(lang === 'ar' ? 'جاري تحديث فرع المستودع الرئيسي...' : 'Updating GitHub branch reference HEAD...');
      let refUpdateRes;
      if (hasExistingBranch) {
        refUpdateRes = await fetch(`https://api.github.com/repos/${cleanRepo}/git/refs/heads/${cleanBranch}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            sha: newCommitSha,
            force: true
          })
        });
      } else {
        refUpdateRes = await fetch(`https://api.github.com/repos/${cleanRepo}/git/refs`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            ref: `refs/heads/${cleanBranch}`,
            sha: newCommitSha
          })
        });
      }

      if (refUpdateRes.ok) {
        // Save config in localStorage
        localStorage.setItem('elkholy_github_token', githubToken.trim());
        localStorage.setItem('elkholy_github_repo', cleanRepo);
        localStorage.setItem('elkholy_github_branch', cleanBranch);

        fireToast(
          lang === 'ar'
            ? 'تم رفع كامل كود المصدر والمشروع إلى GitHub بنجاح! جاهز للربط في Vercel 🚀💻'
            : 'Fabulous! Entire React project uploaded to GitHub. Ready for instant Vercel link! 🚀💻',
          'success'
        );
      } else {
        const errJson = await refUpdateRes.json().catch(() => ({ message: 'Reference update failed' }));
        throw new Error(errJson.message || 'Failed to update branch reference HEAD');
      }
    } catch (err: any) {
      console.error("Codebase Push Failed:", err);
      fireToast(
        lang === 'ar'
          ? `عذراً، فشل رفع الكود لـ GitHub: ${err.message || 'يرجى مراجعة الرمز وصلاحيات التوكين'}`
          : `Project push ended with error: ${err.message || 'Check PAT permissions / Repository format'}`,
        'error'
      );
    } finally {
      setIsPushingProject(false);
      setProjectPushStep('');
    }
  };

  function scoreRoleLabel(role: UserRole) {
    if (lang === 'ar') {
      if (role === 'Admin') return 'مشرف رئيسي';
      if (role === 'Manager') return 'مدير أسطول';
      return 'فريق عمل منسق';
    }
    return role;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-md overflow-hidden admin-panel-root">
      
      {/* Toast Notification Layer */}
      <div className="fixed top-5 right-5 z-80 space-y-2 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ scale: 0.9, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: 50 }}
              className={`p-3.5 rounded-xl border flex items-center gap-2.5 shadow-xl backdrop-blur-md pointer-events-auto ${
                t.type === 'success' 
                  ? 'bg-green-950/80 border-green-500/40 text-green-400' 
                  : t.type === 'error' 
                  ? 'bg-red-950/80 border-red-500/40 text-red-400' 
                  : 'bg-indigo-950/80 border-indigo-500/40 text-indigo-400'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="text-xs font-mono font-medium">{t.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Terminal Shell Box */}
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        className="w-full max-w-6xl h-[94vh] glass-panel border border-[#6366F1]/30 rounded-3xl overflow-hidden flex flex-col relative shadow-2xl box-glow-indigo text-white uppercase"
        dir={dir}
      >
        {/* Holographic Signal Scan Line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary z-20" />

        {/* Header Ribbon Node */}
        <div className="flex items-center justify-between border-b border-white/[0.08] p-4 bg-[#0B0F1A]/90 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-brand-primary/10 border border-brand-primary/30">
              <Database className="w-5 h-5 text-[#22D3EE] animate-pulse" />
            </div>
            <div className="text-left" dir={dir}>
              <h2 className="text-sm sm:text-base font-extrabold tracking-widest font-mono">
                {t('admin_title')}
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5" dir="ltr">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                <span className="text-[9px] text-gray-500 font-mono tracking-widest">
                  {sessionUser ? `ACTIVE NODE: ${sessionUser.username} | ${sessionUser.role.toUpperCase()}` : 'SECURE GPRS SHELL TERMINAL | OFFLINE'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {sessionUser && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-[9px] rounded-lg transition-all flex items-center gap-1.5 hover:scale-[1.03]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'فصل المشترك' : 'DISCONNECT'}</span>
              </button>
            )}

            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg border border-white/5 bg-white/[0.03] text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Interactive Shell Content */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-[#080B13]/95">
          
          {/* ===================== VIEW A: OFFLINE LOCK SCREEN ===================== */}
          {!sessionUser ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-sm mx-auto space-y-6" dir={dir}>
              
              <div className="space-y-2">
                <motion.div 
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="w-14 h-14 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30 flex items-center justify-center mx-auto text-brand-accent shadow-lg shadow-brand-accent/5"
                >
                  <Lock className="w-6 h-6" />
                </motion.div>
                
                <h3 className="text-base font-bold font-mono tracking-wider">
                  {lang === 'ar' ? 'بوابة التحقق المشفرة' : 'OPERATOR IDENTITY PORTAL'}
                </h3>
                <p className="text-xs text-gray-500 normal-case leading-normal font-sans">
                  {lang === 'ar' 
                    ? 'الوصول محدود للأعضاء المصرح لهم فقط. يرجى تزويد رمز الدخول لإعطاء التفويض.'
                    : 'Access is limited to verified personnel only. Enter your credentials to initialize GPRS link.'
                  }
                </p>

                <div className="p-3 border border-indigo-500/20 bg-indigo-950/20 rounded-xl text-[10px] font-mono text-gray-400 leading-normal text-left capitalize font-semibold tracking-wide">
                  ⚡ {lang === 'ar' ? 'أعضاء الأوتوماتيكي الافتراضيون:' : 'Default Demo Node:'}<br />
                  <span className="text-brand-accent">HOSNY1995</span> | Code: <span className="text-brand-primary">Hhrm0101995ELelkholy</span>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="w-full space-y-3.5 text-left font-mono text-xs max-w-[320px]">
                <div className="space-y-1">
                  <label className="text-gray-400 tracking-wider text-[10px]">{lang === 'ar' ? 'اسم المستخدم للمشغل' : 'OPERATOR ACCOUNT NAME'}:</label>
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder={lang === 'ar' ? 'أدخل اسم المستخدم' : 'Enter Username Identity'}
                    className="w-full bg-black/60 border border-white/[0.08] focus:border-indigo-400 text-white rounded-xl px-4 py-2.5 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 tracking-wider text-[10px]">{lang === 'ar' ? 'كلمة المرور' : 'ACCESS CODE KEY'}:</label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-black/60 border border-white/[0.08] focus:border-indigo-400 text-white rounded-xl px-4 py-2.5 focus:outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-gray-500 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-brand-primary to-brand-accent text-[#0B0F1A] font-black tracking-widest rounded-xl hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5 text-[11px]"
                >
                  <Key className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تسجيل دخول المحطة' : 'INITIALIZE LINK'}</span>
                </button>
              </form>

            </div>
          ) : (
            
            // ===================== VIEW B: LOGGED IN WORKSTATION =====================
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10 h-full">
              
              {/* Sidebar Tabs Selectors */}
              <div className="w-full md:w-56 bg-black/30 border-b md:border-b-0 md:border-r border-white/[0.05] flex md:flex-col gap-1.5 p-3 shrink-0">
                <p className="hidden md:block text-[9px] text-gray-500 font-mono tracking-widest uppercase mb-2 p-1.5">
                  {lang === 'ar' ? 'أقسام الواجهة' : 'WORKSPACE TERMINALS'}
                </p>
                
                {/* Tab: Dashboard */}
                {canAccess('dashboard') && (
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 px-4 py-2 rounded-xl font-mono text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                      activeTab === 'dashboard'
                        ? 'bg-gradient-to-r from-brand-primary/15 to-transparent border border-brand-primary/35 text-white shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.01]'
                    }`}
                  >
                    <Activity className="w-4 h-4 text-[#22D3EE]" />
                    <span>{lang === 'ar' ? 'لوحة القيادة' : 'DASHBOARD'}</span>
                  </button>
                )}

                {/* Tab: Fleet Manager */}
                {canAccess('motorcycles') && (
                  <button
                    onClick={() => setActiveTab('motorcycles')}
                    className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 px-4 py-2 rounded-xl font-mono text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                      activeTab === 'motorcycles'
                        ? 'bg-gradient-to-r from-brand-primary/15 to-transparent border border-brand-primary/35 text-white shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.01]'
                    }`}
                  >
                    <Database className="w-4 h-4 text-brand-accent" />
                    <span>{lang === 'ar' ? 'أسطول الدراجات' : 'MOTORCYCLES'}</span>
                  </button>
                )}

                {/* Tab: Store Manager */}
                {canAccess('store') && (
                  <button
                    onClick={() => setActiveTab('store')}
                    className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 px-4 py-2 rounded-xl font-mono text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                      activeTab === 'store'
                        ? 'bg-gradient-to-r from-brand-primary/15 to-transparent border border-brand-primary/35 text-white shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.01]'
                    }`}
                  >
                    <Database className="w-4 h-4 text-green-400" />
                    <span>{lang === 'ar' ? 'المتجر الإلكتروني' : 'STORE'}</span>
                  </button>
                )}

                {/* Tab: Operators Node Settings */}
                {canAccess('users') && (
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 px-4 py-2 rounded-xl font-mono text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                      activeTab === 'users'
                        ? 'bg-gradient-to-r from-brand-primary/15 to-transparent border border-brand-primary/35 text-white shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.01]'
                    }`}
                  >
                    <Users className="w-4 h-4 text-brand-secondary" />
                    <span>{lang === 'ar' ? 'المشرفون والأسماء' : 'USERS LIST'}</span>
                  </button>
                )}

                {/* Tab: Application Customization */}
                {canAccess('settings') && (
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 px-4 py-2 rounded-xl font-mono text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                      activeTab === 'settings'
                        ? 'bg-gradient-to-r from-brand-primary/15 to-transparent border border-brand-primary/35 text-white shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.01]'
                    }`}
                  >
                    <Settings className="w-4 h-4 text-white" />
                    <span>{lang === 'ar' ? 'إعدادات المعرض' : 'SETTINGS'}</span>
                  </button>
                )}
              </div>

              {/* Dynamic Console Desk Screen */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 text-left relative z-10">
                
                {/* ================================== TAB 1: SAAS DASHBOARD HUB ================================== */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="border-b border-white/5 pb-3">
                      <h3 className="text-base font-bold tracking-widest font-mono">
                        {lang === 'ar' ? 'بيانات أداء المعرض' : 'HQ COMMAND AND ANALYTICS'}
                      </h3>
                      <p className="text-[11px] text-gray-500 normal-case leading-normal font-sans">
                        {lang === 'ar' ? 'معلومات عامة متكاملة ومؤشرات أداء المعرض والزوار.' : 'Real-time telemetry oversight of booking nodes, brand capital flow, and operator statistics.'}
                      </p>
                    </div>

                     {/* Stat Cards Matrix Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-3.5">
                      {/* Metric A: Val */}
                      <div className="p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-brand-accent/20 transition-all flex-1 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500 font-mono font-bold">{lang === 'ar' ? 'قيمة الأسطول' : 'BRAND ASSETS'}</span>
                          <Coins className="w-4 h-4 text-brand-accent" />
                        </div>
                        <div className="mt-2">
                          <span className="text-base sm:text-lg font-black font-mono tracking-tight text-white">${fleetValue.toLocaleString()}</span>
                          <span className="block text-[8px] mt-0.5 text-green-400 font-sans tracking-widest leading-none">⚡ MILLION VALUE</span>
                        </div>
                      </div>

                      {/* Metric B: Cycle nodes */}
                      <div className="p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-brand-primary/20 transition-all flex-1 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500 font-mono font-bold">{lang === 'ar' ? 'مركبات المعرض' : 'FLEET MACHINES'}</span>
                          <Database className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div className="mt-2">
                          <span className="text-base sm:text-lg font-black font-mono tracking-tight text-white">{motorcycles.length}</span>
                          <span className="block text-[8px] mt-0.5 text-brand-accent font-sans tracking-widest leading-none">● ACTIVE BIKES</span>
                        </div>
                      </div>

                      {/* Metric C: Operator Nodes */}
                      <div className="p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-brand-secondary/20 transition-all flex-1 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500 font-mono font-bold">{lang === 'ar' ? 'المشرفون' : 'CURATORS'}</span>
                          <Users className="w-4 h-4 text-brand-secondary" />
                        </div>
                        <div className="mt-2">
                          <span className="text-base sm:text-lg font-black font-mono tracking-tight text-white">{users.length}</span>
                          <span className="block text-[8px] mt-0.5 text-gray-400 font-sans tracking-widest leading-none">👤 CODES/KEYS</span>
                        </div>
                      </div>

                      {/* Metric D: Bookings Leads */}
                      <div className="p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-white/10 transition-all flex-1 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500 font-mono font-bold">{lang === 'ar' ? 'الحجوزات المعلقة' : 'RESERVATIONS'}</span>
                          <MessageSquare className="w-4 h-4 text-red-500 animate-pulse" />
                        </div>
                        <div className="mt-2">
                          <span className="text-base sm:text-lg font-black font-mono tracking-tight text-white">{bookings.length}</span>
                          <span className="block text-[8px] mt-0.5 text-red-400 font-mono tracking-widest leading-none">📱 WHATSAPP</span>
                        </div>
                      </div>

                      {/* NEW Metric: Motorcycle Sales Value */}
                      <div className="p-4 rounded-xl bg-[#111827]/60 border border-indigo-500/15 flex flex-col justify-between hover:border-indigo-400/20 transition-all flex-1 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500 font-mono font-bold">{lang === 'ar' ? 'مبيعات الموتوسيكلات' : 'MOTORS REVENUE'}</span>
                          <TrendingUp className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div className="mt-2">
                          <span className="text-base sm:text-lg font-black font-mono tracking-tight text-white">{motorsTotalSalesValue.toLocaleString()} {lang === 'ar' ? 'ج.م' : 'EGP'}</span>
                          <span className="block text-[8px] mt-0.5 text-indigo-400 font-mono tracking-widest leading-none">🏍️ SALES VALUE</span>
                        </div>
                      </div>

                      {/* NEW Metric: Motorcycles Sold Count */}
                      <div className="p-4 rounded-xl bg-[#111827]/60 border border-indigo-500/15 flex flex-col justify-between hover:border-indigo-400/25 transition-all flex-1 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500 font-mono font-bold">{lang === 'ar' ? 'الدراجات المباعة' : 'BIKES SOLD'}</span>
                          <CheckCircle2 className="w-4 h-4 text-indigo-300" />
                        </div>
                        <div className="mt-2">
                          <span className="text-base sm:text-lg font-black font-mono tracking-tight text-white">{motorsTotalSoldCount}</span>
                          <span className="block text-[8px] mt-0.5 text-indigo-300 font-mono tracking-widest leading-none">🏁 SOLD UNITS</span>
                        </div>
                      </div>

                      {/* Metric E: Store Revenue */}
                      <div className="p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-emerald-500/20 transition-all flex-1 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500 font-mono font-bold">{lang === 'ar' ? 'مبيعات المتجر' : 'STORE SALES'}</span>
                          <ShoppingBag className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="mt-2">
                          <span className="text-base sm:text-lg font-black font-mono tracking-tight text-white">{storeTotalRevenue.toLocaleString()} {lang === 'ar' ? 'ج.م' : 'EGP'}</span>
                          <span className="block text-[8px] mt-0.5 text-emerald-400 font-mono tracking-widest leading-none">🛒 REVENUE</span>
                        </div>
                      </div>

                      {/* Metric F: Items Sold */}
                      <div className="p-4 rounded-xl bg-[#111827]/60 border border-white/[0.04] flex flex-col justify-between hover:border-cyan-500/20 transition-all flex-1 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-500 font-mono font-bold">{lang === 'ar' ? 'القطع المباعة' : 'ITEMS SOLD'}</span>
                          <Package className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="mt-2">
                          <span className="text-base sm:text-lg font-black font-mono tracking-tight text-white">{storeTotalItemsSold.toLocaleString()}</span>
                          <span className="block text-[8px] mt-0.5 text-cyan-400 font-mono tracking-widest leading-none">📦 PIECES</span>
                        </div>
                      </div>
                    </div>

                    {/* Category Breakdown & Allocation Visualizer */}
                    <div className="p-4.5 rounded-2xl bg-[#0F1422]/70 border border-indigo-500/10 space-y-3.5">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-xs font-mono font-bold tracking-wider">{lang === 'ar' ? 'نسب توزيع المركبات عبر الفئات' : 'VEHICLE CLASS DISTRIBUTION'}</span>
                        <span className="text-[9px] text-[#22D3EE] font-mono">CALIBRATION CAP: 100%</span>
                      </div>

                      {/* Visual Gradient Bar allocations (Sleek CSS Charting) */}
                      <div className="space-y-3">
                        {/* Sport */}
                        <div>
                          <div className="flex justify-between text-[9px] font-mono text-gray-400 mb-1 leading-none">
                            <span>SPORT CLASS A</span>
                            <span className="font-bold text-white">{catA_Count} ({Math.round(catA_Count / (motorcycles.length || 1) * 100)}%)</span>
                          </div>
                          <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: `${(catA_Count / (motorcycles.length || 1)) * 100}%` }} 
                              transition={{ duration: 1.2 }}
                              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400"
                            />
                          </div>
                        </div>

                        {/* Cruiser */}
                        <div>
                          <div className="flex justify-between text-[9px] font-mono text-gray-400 mb-1 leading-none">
                            <span>CRUISER CLASS B</span>
                            <span className="font-bold text-white">{catB_Count} ({Math.round(catB_Count / (motorcycles.length || 1) * 100)}%)</span>
                          </div>
                          <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: `${(catB_Count / (motorcycles.length || 1)) * 100}%` }}
                              transition={{ duration: 1.2 }}
                              className="h-full rounded-full bg-gradient-to-r from-brand-secondary to-[#A855F7]"
                            />
                          </div>
                        </div>

                        {/* Adventure */}
                        <div>
                          <div className="flex justify-between text-[9px] font-mono text-gray-400 mb-1 leading-none">
                            <span>ADVENTURE CLASS C</span>
                            <span className="font-bold text-white">{catC_Count} ({Math.round(catC_Count / (motorcycles.length || 1) * 100)}%)</span>
                          </div>
                          <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: `${(catC_Count / (motorcycles.length || 1)) * 100}%` }}
                              transition={{ duration: 1.2 }}
                              className="h-full rounded-full bg-gradient-to-r from-brand-accent to-[#06B6D4]"
                            />
                          </div>
                        </div>

                        {/* Scooter */}
                        <div>
                          <div className="flex justify-between text-[9px] font-mono text-gray-400 mb-1 leading-none">
                            <span>SCOOTER CLASS S</span>
                            <span className="font-bold text-white">{catS_Count} ({Math.round(catS_Count / (motorcycles.length || 1) * 100)}%)</span>
                          </div>
                          <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: `${(catS_Count / (motorcycles.length || 1)) * 100}%` }}
                              transition={{ duration: 1.2 }}
                              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Leads & Bookings Queue log (Aesthetic Stripe-styled Table) */}
                    <div className="p-4.5 rounded-2xl bg-[#0B0F1A]/85 border border-[#6366F1]/15 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4.5 h-4.5 text-brand-accent shrink-0 animate-pulse" />
                          <span className="text-xs font-mono font-bold tracking-wider">{lang === 'ar' ? 'طابور رصد اتصالات الحجز' : 'ACTIVE CHRONOS SHOWROOM RESERVATIONS'}</span>
                        </div>
                        {sessionUser.role === 'Admin' && bookings.length > 0 && (
                          <button
                            onClick={handleClearBookings}
                            className="px-2 py-1 bg-red-600/10 hover:bg-red-500 text-red-400 hover:text-white rounded border border-red-500/20 transition-all font-mono text-[9px] cursor-pointer"
                          >
                            {lang === 'ar' ? 'تفريغ السجل' : 'PURGE LEADS'}
                          </button>
                        )}
                      </div>

                      {bookings.length === 0 ? (
                        <div className="text-center py-8 text-gray-600 font-mono text-[10px] space-y-1.5 select-none text-transform: lowercase">
                          <MessageSquare className="w-8 h-8 text-gray-700 mx-auto opacity-40" />
                          <p className="tracking-widest uppercase text-gray-500">{lang === 'ar' ? 'لا حواسب ولا حجوزات مسجلة بعد' : 'NO SPOOLED BOOKINGS RECIEVED'}</p>
                          <p className="text-[9px] text-gray-400 normal-case font-sans">Submit a reserve ticket using any Book Now button to populate real leads here.</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto max-h-[220px] scrollbar-thin">
                          <table className="w-full text-left border-collapse font-mono text-[10px] sm:text-[11px]" dir={dir}>
                            <thead>
                              <tr className="border-b border-white/5 text-gray-500 text-[9px] tracking-widest">
                                <th className="pb-2 text-right">{lang === 'ar' ? 'العميل' : 'CLIENT'}</th>
                                <th className="pb-2 text-right">{lang === 'ar' ? 'الماكينة' : 'MACHINE'}</th>
                                <th className="pb-2 text-right">{lang === 'ar' ? 'الهاتف' : 'PHONE'}</th>
                                <th className="pb-2 text-right">{lang === 'ar' ? 'تاريخ الحجز' : 'RESERVE DATE'}</th>
                                <th className="pb-2 text-right">{lang === 'ar' ? 'المبيعات / الحالة' : 'STATUS / SALE'}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bookings.map((b) => (
                                <tr key={b.id} className="border-b border-white/[0.03] hover:bg-white/[0.01] text-gray-300">
                                  <td className="py-2.5 font-sans font-bold text-white transition-colors">
                                    {b.name}
                                    <span className="block text-[8px] font-mono text-gray-500 normal-case">{b.email}</span>
                                  </td>
                                  <td className="py-2.5 text-indigo-400 text-right">{b.motorcycleName}</td>
                                  <td className="py-2.5 text-right font-bold text-brand-accent">
                                    <a 
                                      href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`} 
                                      target="_blank" 
                                      rel="noreferrer" 
                                      className="hover:underline flex items-center justify-end gap-1 shrink-0"
                                    >
                                      <span>{b.phone}</span>
                                      <ArrowUpRight className="w-3 h-3 text-green-400 shrink-0" />
                                    </a>
                                  </td>
                                  <td className="py-2.5 text-right font-sans italic text-gray-400">{b.date}</td>
                                  <td className="py-2.5 text-right font-sans">
                                    <div className="flex items-center justify-end gap-2">
                                      <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold ${
                                        (b.status || 'sold') === 'sold'
                                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                      }`}>
                                        {(b.status || 'sold') === 'sold'
                                          ? (lang === 'ar' ? 'تم البيع' : 'SOLD')
                                          : (lang === 'ar' ? 'انتظار' : 'PENDING')
                                        }
                                      </span>
                                      <button 
                                        onClick={() => handleToggleBookingStatus(b.id, b.status || 'sold')}
                                        className="px-1.5 py-0.5 rounded bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white border border-brand-primary/20 transition-all text-[8px] font-bold cursor-pointer font-mono"
                                      >
                                        {lang === 'ar' ? 'تعديل' : 'TOGGLE'}
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Excel Export Controller Panel */}
                    <div className="p-4.5 rounded-2xl bg-[#090D16] border border-green-500/10 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-green-500/10 rounded-lg text-green-400">
                            <Download className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold font-sans tracking-wide text-white">
                              {lang === 'ar' ? 'مستخرج التقارير المحاسبية (Excel)' : 'COMPREHENSIVE EXCEL EXPORT TERMINAL'}
                            </h4>
                            <p className="text-[10px] text-gray-500 leading-normal font-mono normal-case">
                              {lang === 'ar' ? 'تصدير كامل تفاصيل مبيعات المتجر والحجوزات والمبالغ.' : 'Compile, filter, and stream ledger accounts for all products and heavy showroom vehicles.'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-end">
                        {/* Duration Selector Dropdown */}
                        <div className="space-y-1.5 text-left" dir={dir}>
                          <label className="block text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
                            {lang === 'ar' ? 'نطاق استخراج البيانات:' : 'SELECT EXPORT PERIOD:'}
                          </label>
                          <select
                            value={exportRangeType}
                            onChange={(e: any) => setExportRangeType(e.target.value)}
                            className="w-full px-3.5 py-2 sm:py-2.5 bg-[#0B0F19] text-white border border-white/5 hover:border-white/10 rounded-xl font-mono text-xs focus:outline-none focus:ring-1 focus:ring-green-500 tracking-wide cursor-pointer"
                          >
                            <option value="today">{lang === 'ar' ? 'بيانات اليوم' : 'Today (Real-time)'}</option>
                            <option value="week">{lang === 'ar' ? 'آخر أسبوع' : 'Last Week'}</option>
                            <option value="month">{lang === 'ar' ? 'آخر شهر' : 'Last Month'}</option>
                            <option value="3months">{lang === 'ar' ? 'آخر ٣ أشهر' : 'Last 3 Months'}</option>
                            <option value="6months">{lang === 'ar' ? 'آخر ٦ أشهر' : 'Last 6 Months'}</option>
                            <option value="year">{lang === 'ar' ? 'آخر سنة كاملة' : 'Last 12 Months'}</option>
                            <option value="custom">{lang === 'ar' ? 'تحديد فترة زمينة مخصصة' : 'Custom Date Range'}</option>
                          </select>
                        </div>

                        {/* Custom Range select inputs */}
                        {exportRangeType === 'custom' && (
                          <>
                            <div className="space-y-1.5 text-left" dir={dir}>
                              <label className="block text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                                <span>{lang === 'ar' ? 'من تاريخ:' : 'START DATE/TIME:'}</span>
                              </label>
                              <div className="relative">
                                <input 
                                  type="datetime-local"
                                  value={exportStartDate}
                                  onChange={(e) => setExportStartDate(e.target.value)}
                                  className="w-full pl-9 pr-3.5 rtl:pr-9 rtl:pl-3.5 py-2 sm:py-2.5 bg-[#0B0F19] text-white border border-blue-500/25 hover:border-blue-500/40 rounded-xl font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer [&::-webkit-calendar-picker-indicator]:invert-[44%] [&::-webkit-calendar-picker-indicator]:sepia-[95%] [&::-webkit-calendar-picker-indicator]:saturate-[1800%] [&::-webkit-calendar-picker-indicator]:hue-rotate-[195deg]"
                                />
                                <Calendar className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" />
                              </div>
                            </div>

                            <div className="space-y-1.5 text-left" dir={dir}>
                              <label className="block text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                                <span>{lang === 'ar' ? 'إلى تاريخ:' : 'END DATE/TIME:'}</span>
                              </label>
                              <div className="relative">
                                <input 
                                  type="datetime-local"
                                  value={exportEndDate}
                                  onChange={(e) => setExportEndDate(e.target.value)}
                                  className="w-full pl-9 pr-3.5 rtl:pr-9 rtl:pl-3.5 py-2 sm:py-2.5 bg-[#0B0F19] text-white border border-blue-500/25 hover:border-blue-500/40 rounded-xl font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer [&::-webkit-calendar-picker-indicator]:invert-[44%] [&::-webkit-calendar-picker-indicator]:sepia-[95%] [&::-webkit-calendar-picker-indicator]:saturate-[1800%] [&::-webkit-calendar-picker-indicator]:hue-rotate-[195deg]"
                                />
                                <Calendar className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" />
                              </div>
                            </div>
                          </>
                        )}

                        {/* Submitting trigger button */}
                        <div className={`sm:col-span-1 ${exportRangeType !== 'custom' ? 'lg:col-span-3' : ''}`}>
                          <button
                            onClick={handleExportExcel}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500/85 to-emerald-600/95 hover:from-green-500 hover:to-emerald-600 text-white font-mono font-bold text-[10.5px] uppercase tracking-widest rounded-xl cursor-pointer transition-all border border-green-500/20 active:scale-98 shadow-md hover:shadow-green-500/10"
                          >
                            <FileText className="w-4 h-4 text-emerald-100" />
                            <span>{lang === 'ar' ? 'تحميل البيانات بصيغة اكسل 📊' : 'Compile & Export Spreadsheet 📊'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================================== TAB 2: INTERACTIVE FLEET MANAGER ================================== */}
                {activeTab === 'motorcycles' && (
                  <div className="space-y-4 animate-fade-in">
                    
                    {!isAddingNew && !editingBike ? (
                      // Grid list displays of active cycles
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                          <div>
                            <h3 className="text-base font-bold font-mono tracking-wider">
                              {lang === 'ar' ? `قائمة الأسطول الحالية (${motorcycles.length})` : `FLEET COMPOSITION GRID (${motorcycles.length})`}
                            </h3>
                            <p className="text-[11px] text-gray-500 normal-case leading-normal font-sans">
                              {lang === 'ar' ? 'تفويض دراجات إلكترونية جديدة، تحديث مقاييس الدفع الحصانية أو التعديل والمسح.' : 'Review, register, modify specifications, or purge extreme dynamic cycles from Egypt showrooms.'}
                            </p>
                          </div>
                          
                          <button
                            onClick={handleAddNewClick}
                            className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-accent text-[#0B0F1A] hover:bg-[#18b5cc] font-mono text-[10.5px] font-black rounded-xl transition-all cursor-pointer shadow-md shadow-brand-accent/15"
                          >
                            <Plus className="w-4 h-4" />
                            <span>{lang === 'ar' ? 'إضافة آلة' : 'COMMISSION NEW BIKE'}</span>
                          </button>
                        </div>

                        {/* Filters and Search Bar Row */}
                        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 bg-[#0E1322]/80 p-3 rounded-2xl border border-white/[0.04]">
                          {/* Interactive Category Filter Tabs */}
                          <div className="flex border border-white/5 bg-black/40 p-1 rounded-xl w-fit max-w-full overflow-x-auto gap-1 select-none font-mono text-[10px]">
                            {(['All', 'A', 'B', 'C', 'S'] as const).map((cat) => {
                              const isActive = dashCategoryFilter === cat;
                              const label = cat === 'All' 
                                ? (lang === 'ar' ? 'الكل 🌐' : 'Show All')
                                : cat === 'A' ? (lang === 'ar' ? 'A سبورت ⚡' : 'A - Sport')
                                : cat === 'B' ? (lang === 'ar' ? 'B كروزر 🛋️' : 'B - Cruiser')
                                : cat === 'C' ? (lang === 'ar' ? 'C مغامرات 🧭' : 'C - Touring')
                                : (lang === 'ar' ? 'S سكوتر 🔋' : 'S - Scooter');
                              
                              return (
                                <button
                                  key={cat}
                                  type="button"
                                  onClick={() => setDashCategoryFilter(cat)}
                                  className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
                                    isActive
                                      ? 'bg-brand-accent text-[#0B0F1A] shadow-md shadow-brand-accent/25 font-black'
                                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                                  }`}
                                >
                                  {label}
                                </button>
                              );
                            })}
                          </div>

                          {/* Beautiful Interactive Search input */}
                          <div className="relative flex-1 md:max-w-xs xl:max-w-md">
                            <input
                              type="text"
                              value={bikeSearchTerm}
                              onChange={(e) => setBikeSearchTerm(e.target.value)}
                              placeholder={lang === 'ar' ? 'البحث بالاسم أو كود الموتوسيكل...' : 'Search by name or bike code...'}
                              className="w-full bg-[#070A11] border border-white/10 rounded-xl pl-9 pr-8 rtl:pr-9 rtl:pl-8 py-2 text-xs text-white focus:border-brand-accent outline-none placeholder:text-gray-500 transition-all font-mono"
                            />
                            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                            {bikeSearchTerm && (
                              <button
                                onClick={() => setBikeSearchTerm('')}
                                className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-[10px] cursor-pointer font-bold font-mono transition-colors"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {dashFilteredBikes.length > 0 ? (
                            dashFilteredBikes.map((bike) => (
                            <div
                              key={bike.id}
                              className="p-4 bg-[#111624]/80 border border-white/[0.04] hover:border-brand-primary/20 rounded-2xl flex items-center gap-4 transition-all"
                            >
                              <img
                                src={bike.image}
                                alt={bike.name}
                                referrerPolicy="no-referrer"
                                className="w-16 h-16 object-contain bg-black/40 rounded-xl p-1 shrink-0"
                              />
                              <div className="flex-1 min-w-0 text-left" dir={dir}>
                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                                  bike.category === 'A' ? 'bg-indigo-950/80 border border-indigo-400/20 text-indigo-400' :
                                  bike.category === 'B' ? 'bg-purple-950/85 border border-purple-400/20 text-brand-secondary' :
                                  bike.category === 'C' ? 'bg-[#0f2125] border border-cyan-400/20 text-[#22D3EE]' :
                                  'bg-emerald-950 border border-emerald-400/20 text-emerald-400'
                                }`}>
                                  {bike.categoryName} Class ({bike.category})
                                </span>
                                <h4 className="text-xs font-extrabold text-white tracking-wide truncate mt-1">
                                  {bike.name}
                                </h4>
                                <p className="font-mono text-brand-accent font-bold text-[11px] mt-0.5">{bike.price}</p>
                              </div>

                              <div className="flex flex-col gap-1.5 shrink-0 select-none items-center">
                                <div 
                                  onClick={() => handleDownloadAndCopyQRCode(bike)}
                                  className="bg-white p-1 rounded-md mb-1 cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-md shadow-black/45"
                                  title={lang === 'ar' ? 'انقر لنسخ الكود وتحميل الرمز' : 'Click to copy code & download QR'}
                                >
                                    <QRCodeSVG id={`qr-${bike.id}`} value={bike.serialCode || bike.id} size={40} />
                                </div>
                                {sessionUser.role !== 'Staff' ? (
                                  <button
                                    onClick={() => handleEditBikeClick(bike)}
                                    className="p-1 px-2 pointer-events-auto cursor-pointer bg-indigo-500/15 hover:bg-brand-primary border border-indigo-500/10 text-brand-accent hover:text-white rounded-lg transition-all flex items-center justify-center gap-1 font-mono text-[9px] tracking-wider"
                                    title="Upgrade Machine Parameters"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                    <span>{lang === 'ar' ? 'تعديل' : 'UPGRADE'}</span>
                                  </button>
                                ) : (
                                  <span className="text-[8px] text-gray-600 font-mono italic leading-none text-right">LOCKED NODES</span>
                                )}

                                {sessionUser.role === 'Admin' && (
                                  <button
                                    onClick={() => handleDeleteBike(bike.id)}
                                    className="p-1 px-2 pointer-events-auto cursor-pointer bg-red-500/10 hover:bg-red-500 border border-red-500/10 text-red-400 hover:text-white rounded-lg transition-all flex items-center justify-center gap-1 font-mono text-[9px] tracking-wider"
                                    title="Decommission Heavy Cycle"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    <span>{lang === 'ar' ? 'شطب' : 'DELETE'}</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          ))
                          ) : (
                            <div className="text-center py-12 border border-white/5 bg-black/20 rounded-2xl col-span-1 sm:col-span-2 select-none font-mono text-[11px] text-gray-500 w-full">
                              {lang === 'ar' ? 'لا توجد مركبات مسجلة في هذا الفئة بعد' : 'No commissioned designs in this category segment.'}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // Full Commission / Edit form screen
                      <form onSubmit={handleFormSubmit} className="space-y-4 max-w-2xl mx-auto text-left">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <h3 className="text-xs font-mono font-bold tracking-widest text-brand-accent uppercase">
                            {isAddingNew ? (lang === 'ar' ? 'تسجيل مركبة كهرومغناطيسية جديدة' : 'COMMISSION NEW CYBER VEHICLE') : `${lang === 'ar' ? 'تحوير مقاييس' : 'RECONFIG MACHINE'}: ${bikeForm.name}`}
                          </h3>
                          <button
                            type="button"
                            onClick={() => { setIsAddingNew(false); setEditingBike(null); }}
                            className="text-gray-400 hover:text-white text-[10px] font-mono cursor-pointer uppercase tracking-widest inline-flex items-center gap-1 text-right"
                          >
                            &lt; {lang === 'ar' ? 'تراجع للسياق' : 'DISCARD SHELL'}
                          </button>
                        </div>

                        {/* Sub-Tabs Selector Header */}
                        <div className="flex border-b border-white/5 pb-1 gap-2 overflow-x-auto select-none font-mono text-[10px] sm:text-[11px]">
                          <button
                            type="button"
                            onClick={() => setFormSubTab('basic')}
                            className={`pb-1.5 px-1.5 border-b-2 font-bold uppercase transition-all tracking-wider cursor-pointer ${
                              formSubTab === 'basic'
                                ? 'border-brand-accent text-brand-accent'
                                : 'border-transparent text-gray-400 hover:text-white'
                            }`}
                          >
                            📁 {lang === 'ar' ? 'البيانات الأساسية' : 'Basic Info'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormSubTab('pricing')}
                            className={`pb-1.5 px-1.5 border-b-2 font-bold uppercase transition-all tracking-wider cursor-pointer ${
                              formSubTab === 'pricing'
                                ? 'border-brand-accent text-brand-accent'
                                : 'border-transparent text-gray-400 hover:text-white'
                            }`}
                          >
                            💰 {lang === 'ar' ? 'العروض والتسعير' : 'Pricing & Offers'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormSubTab('catalog')}
                            className={`pb-1.5 px-1.5 border-b-2 font-bold uppercase transition-all tracking-wider cursor-pointer ${
                              formSubTab === 'catalog'
                                ? 'border-brand-accent text-brand-accent'
                                : 'border-transparent text-gray-400 hover:text-white'
                            }`}
                          >
                            📄 {lang === 'ar' ? 'كتالوج PDF' : 'Catalog Document'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormSubTab('addons')}
                            className={`pb-1.5 px-1.5 border-b-2 font-bold uppercase transition-all tracking-wider cursor-pointer whitespace-nowrap ${
                              formSubTab === 'addons'
                                ? 'border-brand-accent text-brand-accent'
                                : 'border-transparent text-gray-400 hover:text-white'
                            }`}
                          >
                            🛠️ {lang === 'ar' ? 'الإضافات' : 'Add-ons'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormSubTab('related')}
                            className={`pb-1.5 px-1.5 border-b-2 font-bold uppercase transition-all tracking-wider cursor-pointer whitespace-nowrap ${
                              formSubTab === 'related'
                                ? 'border-brand-accent text-brand-accent'
                                : 'border-transparent text-gray-400 hover:text-white'
                            }`}
                          >
                            🔗 {lang === 'ar' ? 'منتجات المتجر' : 'Store Related'}
                          </button>
                        </div>

                        {/* Render Active Sub-Tab Layout Content */}
                        <div className="mt-3">
                          
                          {/* TAB A: BASIC INFO */}
                          {formSubTab === 'basic' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left font-mono animate-fade-in">
                              <div className="space-y-1">
                                <label className="text-gray-400 text-[10px] tracking-wider">{lang === 'ar' ? 'اسم المحفز الدقيق' : 'MACHINE IDENTIFIER NAME'}:</label>
                                <input
                                  type="text"
                                  required
                                  value={bikeForm.name}
                                  onChange={(e) => setBikeForm({ ...bikeForm, name: e.target.value })}
                                  className="w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-gray-400 text-[10px] tracking-wider">{lang === 'ar' ? 'تصنيف الفئة الأفقية' : 'SERIES COMPOSITION CLASSIFICATION'}:</label>
                                <select
                                  value={bikeForm.category}
                                  onChange={(e) => setBikeForm({ ...bikeForm, category: e.target.value as CategorySlug })}
                                  className="w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none"
                                >
                                  <option value="A">SPORT CLASS A (⚡ Speed Master)</option>
                                  <option value="B">CRUISER CLASS B (🛋️ Low-Slung Custom)</option>
                                  <option value="C">ADVENTURE CLASS C (🧭 Offgrid Nomad)</option>
                                  <option value="S">SCOOTER CLASS S (🔋 Urban Hub)</option>
                                </select>
                              </div>

                              <div className="space-y-1">
                                <label className="text-gray-400 text-[10px] tracking-wider">{lang === 'ar' ? 'السيريال/الكود المميز' : 'UNIQUE SERIAL/CODE'}:</label>
                                <input
                                  type="text"
                                  required
                                  value={bikeForm.serialCode}
                                  onChange={(e) => setBikeForm({ ...bikeForm, serialCode: e.target.value })}
                                  className="w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-gray-400 text-[10px] tracking-wider">{lang === 'ar' ? 'الشعار السلوكي الفرعي' : 'CHASSIS SLOGAN SYNOPSIS'}:</label>
                                <input
                                  type="text"
                                  value={bikeForm.tagline}
                                  onChange={(e) => setBikeForm({ ...bikeForm, tagline: e.target.value })}
                                  className="w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none"
                                />
                              </div>

                              <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-t border-white/5 pt-3">
                                <div className="space-y-1.5 text-left">
                                  <label className="text-gray-400 text-[10px] tracking-wider">{lang === 'ar' ? 'صورة المركبة هولوجرام' : 'REACTIVE IMAGE URL / BASE64 ENCODING'}:</label>
                                  <input
                                    type="text"
                                    value={bikeForm.image}
                                    onChange={(e) => setBikeForm({ ...bikeForm, image: e.target.value })}
                                    placeholder="Paste clean direct image url links here..."
                                    className="w-full bg-[#111827]/75 border border-white/[0.08] text-white rounded-xl px-4 py-2 text-xs focus:outline-none"
                                  />
                                  <div className="flex items-center gap-2">
                                    <label className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-lg cursor-pointer hover:bg-white/10 text-[9px] font-black transition-colors">
                                      <Upload className="w-3.5 h-3.5 text-brand-accent" />
                                      <span>{lang === 'ar' ? 'رفع ملف صورة مشفرة' : 'UPLOAD CHASSIS FILE'}</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFormImageUpload}
                                        className="hidden"
                                      />
                                    </label>
                                  </div>
                                </div>

                                {bikeForm.image && (
                                  <div className="p-2 border border-white/[0.04] bg-black/40 rounded-2xl flex items-center justify-center max-h-[110px] overflow-hidden select-none">
                                    <img
                                      src={bikeForm.image}
                                      alt="Payload preview card"
                                      className="max-h-20 object-contain drop-shadow"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                )}
                              </div>

                              <div className="col-span-1 sm:col-span-2 border-t border-white/5 pt-3 space-y-2.5 text-left">
                                <h4 className="text-[10px] text-gray-400 font-black tracking-widest uppercase flex items-center gap-1">
                                  <Sparkles className="w-4.5 h-4.5 text-brand-accent animate-pulse" /> 
                                  <span>{lang === 'ar' ? 'المواصفات الهندسية الدقيقة' : 'CORE TELEMETRY AND SPECS MATRIX'}</span>
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                                  {/* spec: engine */}
                                  <div className="space-y-1">
                                    <label className="text-[9px] text-gray-500 font-bold">1. Propulsion core</label>
                                    <input
                                      type="text"
                                      value={bikeForm.specs.engine}
                                      onChange={(e) => setBikeForm({ ...bikeForm, specs: { ...bikeForm.specs, engine: e.target.value } })}
                                      className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-accent"
                                    />
                                  </div>
                                  {/* spec: speed */}
                                  <div className="space-y-1">
                                    <label className="text-[9px] text-gray-500 font-bold">2. top velocity</label>
                                    <input
                                      type="text"
                                      value={bikeForm.specs.topSpeed}
                                      onChange={(e) => setBikeForm({ ...bikeForm, specs: { ...bikeForm.specs, topSpeed: e.target.value } })}
                                      className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-accent"
                                    />
                                  </div>
                                  {/* spec: power */}
                                  <div className="space-y-1">
                                    <label className="text-[9px] text-gray-500 font-bold">3. output energy</label>
                                    <input
                                      type="text"
                                      value={bikeForm.specs.power}
                                      onChange={(e) => setBikeForm({ ...bikeForm, specs: { ...bikeForm.specs, power: e.target.value } })}
                                      className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-accent"
                                    />
                                  </div>
                                  {/* spec: consumption */}
                                  <div className="space-y-1">
                                    <label className="text-[9px] text-gray-500 font-bold">4. consumption rating</label>
                                    <input
                                      type="text"
                                      value={bikeForm.specs.fuelConsumption}
                                      onChange={(e) => setBikeForm({ ...bikeForm, specs: { ...bikeForm.specs, fuelConsumption: e.target.value } })}
                                      className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-accent"
                                    />
                                  </div>
                                  {/* spec: weight */}
                                  <div className="space-y-1">
                                    <label className="text-[9px] text-gray-500 font-bold">5. vehicle net weight</label>
                                    <input
                                      type="text"
                                      value={bikeForm.specs.weight}
                                      onChange={(e) => setBikeForm({ ...bikeForm, specs: { ...bikeForm.specs, weight: e.target.value } })}
                                      className="w-full bg-black/40 border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-accent"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-1 sm:col-span-2 space-y-1 text-left">
                                <label className="text-gray-400 text-[10px] tracking-wider">{lang === 'ar' ? 'الوصف المقتضب للبطاقة' : 'SHOWROOM GRID OVERVIEW COPY'}:</label>
                                <textarea
                                  rows={2}
                                  value={bikeForm.shortDesc}
                                  onChange={(e) => setBikeForm({ ...bikeForm, shortDesc: e.target.value })}
                                  className="w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none font-sans"
                                />
                              </div>

                              <div className="col-span-1 sm:col-span-2 space-y-1 text-left">
                                <label className="text-gray-400 text-[10px] tracking-wider">{lang === 'ar' ? 'البيان الوصفي الهندسي الكامل للPDF' : 'HOLOMESH HOLOGRAPHIC HISTORIC SPECTRUM MANIFESTO (LONG DETAILS)'}:</label>
                                <textarea
                                  rows={3}
                                  value={bikeForm.longDesc}
                                  onChange={(e) => setBikeForm({ ...bikeForm, longDesc: e.target.value })}
                                  className="w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none font-sans"
                                />
                              </div>

                              <div className="col-span-1 sm:col-span-2 pt-1 border-b border-white/5 pb-3 text-left">
                                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={bikeForm.isPopular}
                                    onChange={(e) => setBikeForm({ ...bikeForm, isPopular: e.target.checked })}
                                    className="w-4 h-4 rounded border-[#6366F1]/40 bg-[#111827] focus:ring-brand-primary"
                                  />
                                  <span className="text-[10px] font-mono font-bold text-white uppercase flex items-center gap-1.5 leading-none">
                                    <Sparkles className="w-4 h-4 text-red-500 shrink-0" />
                                    <span>{lang === 'ar' ? 'ترشيح كعرض مميز وشائع بقوة بالواجهة' : 'ANCHOR AND PIN AS AN ACTIVE FLAGSHIP MOTORCYCLE'}</span>
                                  </span>
                                </label>
                              </div>
                            </div>
                          )}

                          {/* TAB B: PRICING & OFFERS */}
                          {formSubTab === 'pricing' && (
                            <div className="space-y-4 text-left font-mono animate-fade-in" dir={dir}>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-gray-400 text-[10px] tracking-wider">{lang === 'ar' ? 'السعر الأصلي (جنيه)' : 'ORIGINAL LIST PRICE (EGP)'}:</label>
                                  <input
                                    type="number"
                                    required
                                    value={bikeForm.originalPrice || ''}
                                    onChange={(e) => setBikeForm({ ...bikeForm, originalPrice: parseInt(e.target.value, 10) || 0 })}
                                    className="w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-gray-400 text-[10px] tracking-wider">{lang === 'ar' ? 'نوع الخصم' : 'DISCOUNT TYPE'}:</label>
                                  <select
                                    value={bikeForm.discountType}
                                    onChange={(e) => setBikeForm({ ...bikeForm, discountType: e.target.value as 'percentage' | 'fixed' })}
                                    className="w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none"
                                  >
                                    <option value="percentage">% Percentage</option>
                                    <option value="fixed">{lang === 'ar' ? 'جنيه قيمة ثابتة' : 'EGP Fixed Amount'}</option>
                                  </select>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-gray-400 text-[10px] tracking-wider">{lang === 'ar' ? 'قيمة الخصم' : 'DISCOUNT VALUE'}:</label>
                                  <input
                                    type="number"
                                    value={bikeForm.discount || ''}
                                    onChange={(e) => setBikeForm({ ...bikeForm, discount: parseInt(e.target.value, 10) || 0 })}
                                    placeholder={lang === 'ar' ? 'أدخل قيمة الخصم (مثل 15 لـ 15% أو 5000 لـ 5000 جنيه)' : 'Enter 15 for 15% or 5000 for EGP 5,000'}
                                    className="w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-gray-400 text-[10px] tracking-wider">{lang === 'ar' ? 'ملصق العرض الرياضي' : 'OFFER PROMO BADGE LABEL'}:</label>
                                  <input
                                    type="text"
                                    value={bikeForm.offerLabel}
                                    onChange={(e) => setBikeForm({ ...bikeForm, offerLabel: e.target.value })}
                                    placeholder='e.g. "HOT DEAL 🔥", "LIMITED OFFER"'
                                    className="w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-accent text-white rounded-xl px-4 py-2.5 focus:outline-none"
                                  />
                                </div>
                              </div>

                              {/* Live Dynamic Calculated Price Display */}
                              <div className="p-4 bg-brand-primary/10 border border-brand-primary/30 rounded-2xl flex items-center justify-between">
                                <div className="space-y-1">
                                  <span className="block text-[8px] text-gray-400 uppercase tracking-wider">{lang === 'ar' ? 'السعر النهائي المحسوب وتأثير الخصم' : 'CALCULATED RETAIL VALUE AFTER PROMOTIONS'}</span>
                                  <span className="text-lg font-black text-brand-secondary">
                                    {(() => {
                                      let price = Number(bikeForm.originalPrice !== undefined ? bikeForm.originalPrice : (bikeForm.priceNum || 45000));
                                      const disc = Number(bikeForm.discount || 0);
                                      if (disc > 0 && bikeForm.originalPrice) {
                                        if (bikeForm.discountType === 'percentage') {
                                          price = Math.round(bikeForm.originalPrice * (1 - disc / 100));
                                        } else {
                                          price = Math.round(Math.max(0, bikeForm.originalPrice - disc));
                                        }
                                      }
                                      return price;
                                    })().toLocaleString()} {lang === 'ar' ? 'جنيه' : 'EGP'}
                                  </span>
                                </div>
                                <div className="text-right text-[10px] text-gray-500 max-w-[200px]" dir={dir}>
                                  {lang === 'ar' ? 'يقوم المعالج بحساب السعر لجميع أرجاء المنصة تلقائياً فور كتابة الأرقام' : 'Numerical calibrations update showrooms and catalogs instantaneously.'}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* TAB C: CATALOG BROCHURE */}
                          {formSubTab === 'catalog' && (
                            <div className="space-y-4 text-left font-mono animate-fade-in" dir={dir}>
                              <p className="text-[11px] text-gray-400 leading-normal font-sans" dir={dir}>
                                {lang === 'ar' ? 'مرفقات الكتالوج الرقمية بصيغة PDF تجعل المشتري يتصفح الدليل الفني بلمسة من واجهة المعاينة.' : 'Introduce digital telemetry guides. Upload high-fidelity PDF documents that attach directly to showroom card flips.'}
                              </p>

                              {bikeForm.catalogFileName ? (
                                <div className="p-4 bg-brand-primary/10 border border-brand-primary/35 rounded-2xl space-y-3">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-brand-accent/10 border border-brand-accent/25 rounded-lg text-brand-accent shrink-0">
                                      <FileText className="w-6 h-6 shrink-0" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className="block text-[8px] text-gray-500 uppercase font-bold tracking-widest">ACTIVE CATALOG GUIDE File</span>
                                      <span className="text-xs font-black text-white truncate block mt-0.5">{bikeForm.catalogFileName}</span>
                                    </div>
                                  </div>
                                  
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setBikeForm(prev => ({ ...prev, catalogFileName: '', catalogFileContent: '' }));
                                      fireToast(lang === 'ar' ? 'تم فصل الكتالوج' : 'Digital brochure detached', 'info');
                                    }}
                                    className="p-2 w-full text-center border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer transition-colors"
                                  >
                                    {lang === 'ar' ? 'مسح وحذف الملف الحالي' : 'DETACH AND REMOVE PDF BROCHURE'}
                                  </button>
                                </div>
                              ) : (
                                <div className="p-6 border-2 border-dashed border-white/10 hover:border-brand-accent/40 bg-black/40 rounded-2xl text-center space-y-3.5 transition-all">
                                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-gray-400">
                                    <Upload className="w-6 h-6 text-gray-500 shrink-0" />
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[11px] font-bold text-white uppercase">{lang === 'ar' ? 'حدد ملف الكتالوج بصيغة PDF' : 'NO TELEMETRY CATALOG ATTACHED'}</p>
                                    <p className="text-[9px] text-gray-500 lowercase font-sans">pdf file sizes up to 5mb. auto-encodes to base64 buffer matrix.</p>
                                  </div>

                                  <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-accent hover:bg-[#18b5cc] text-[#0B0F1A] font-extrabold rounded-xl cursor-pointer text-[10.5px] uppercase transition-all shadow-md shadow-brand-accent/15">
                                    <Upload className="w-3.5 h-3.5" />
                                    <span>{lang === 'ar' ? 'رفع الكتالوج الرقمي PDF' : 'UPLOAD CATALOG PDF'}</span>
                                    <input
                                      type="file"
                                      accept="application/pdf"
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          if (file.type !== 'application/pdf') {
                                            fireToast(lang === 'ar' ? 'يرجى رفع ملف PDF فقط' : 'Only PDF specs brochures are supported', 'error');
                                            return;
                                          }
                                          if (file.size > 5 * 1024 * 1024) {
                                            fireToast(lang === 'ar' ? 'أقصى حجم للملف هو 5 ميجابايت' : 'PDF size restricted to 5MB', 'error');
                                            return;
                                          }
                                          const reader = new FileReader();
                                          reader.onload = () => {
                                            if (typeof reader.result === 'string') {
                                              setBikeForm(prev => ({
                                                ...prev,
                                                catalogFileName: file.name,
                                                catalogFileContent: reader.result as string
                                              }));
                                              fireToast(lang === 'ar' ? 'تم تخزين الكتالوج وحفظه مشفراً في آلة المعالجة' : 'PDF catalog guidance uploaded successfully', 'success');
                                            }
                                          };
                                          reader.readAsDataURL(file);
                                        }
                                      }}
                                    />
                                  </label>
                                </div>
                              )}
                            </div>
                          )}

                          {/* TAB D: ADD-ONS & ACCESSORIES */}
                          {formSubTab === 'addons' && (
                            <div className="space-y-4 text-left font-mono animate-fade-in" dir={dir}>
                              
                              {/* New Accessory Integration form */}
                              <div className="p-4 bg-black/50 border border-white/[0.04] rounded-2xl space-y-3">
                                <h4 className="text-[10px] font-black text-brand-secondary tracking-widest uppercase flex items-center gap-1.5 border-b border-white/5 pb-1.5">
                                  <Plus className="w-4 h-4 text-brand-secondary shrink-0" />
                                  <span>{lang === 'ar' ? 'تعريف ملحق وأكسسوار إضافي جديد' : 'INTEGRATE NEW DYNAMIC ADD-ON'}</span>
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  <div className="space-y-1">
                                    <label className="text-[9px] text-gray-400 font-bold uppercase">Name (EN):</label>
                                    <input
                                      type="text"
                                      value={newAddOn.name}
                                      onChange={(e) => setNewAddOn({ ...newAddOn, name: e.target.value })}
                                      placeholder="Titanium Exhaust System"
                                      className="w-full bg-[#111827] border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-secondary focus:outline-none"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] text-gray-400 font-bold uppercase">Name (AR - Optional):</label>
                                    <input
                                      type="text"
                                      value={newAddOn.nameAr || ''}
                                      onChange={(e) => setNewAddOn({ ...newAddOn, nameAr: e.target.value })}
                                      placeholder="شكمان تيتانيوم رياضي"
                                      className="w-full bg-[#111827] border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-secondary focus:outline-none text-right"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] text-gray-400 font-bold uppercase">{lang === 'ar' ? 'سعر التجزئة (جنيه)' : 'Retail Price (EGP)'}:</label>
                                    <input
                                      type="number"
                                      value={newAddOn.price || ''}
                                      onChange={(e) => setNewAddOn({ ...newAddOn, price: parseInt(e.target.value, 10) || 0 })}
                                      className="w-full bg-[#111827] border border-white/10 text-brand-secondary rounded-lg p-2 text-xs focus:border-brand-secondary focus:outline-none font-black"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] text-gray-400 font-bold uppercase">Image Illustration URL:</label>
                                    <input
                                      type="text"
                                      value={newAddOn.image}
                                      onChange={(e) => setNewAddOn({ ...newAddOn, image: e.target.value })}
                                      className="w-full bg-[#111827] border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-secondary focus:outline-none"
                                    />
                                  </div>
                                  <div className="space-y-1 sm:col-span-2">
                                    <label className="text-[9px] text-gray-400 font-bold uppercase">Description (EN):</label>
                                    <input
                                      type="text"
                                      value={newAddOn.description}
                                      onChange={(e) => setNewAddOn({ ...newAddOn, description: e.target.value })}
                                      className="w-full bg-[#111827] border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-secondary focus:outline-none font-sans"
                                    />
                                  </div>
                                  <div className="space-y-1 sm:col-span-2">
                                    <label className="text-[9px] text-gray-400 font-bold uppercase">Description (AR - Optional):</label>
                                    <input
                                      type="text"
                                      value={newAddOn.descAr || ''}
                                      onChange={(e) => setNewAddOn({ ...newAddOn, descAr: e.target.value })}
                                      className="w-full bg-[#111827] border border-white/10 text-white rounded-lg p-2 text-xs focus:border-brand-secondary focus:outline-none text-right font-sans"
                                    />
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (!newAddOn.name || newAddOn.price <= 0) {
                                      fireToast(lang === 'ar' ? 'الرجاء إدخال اسم الملحق وسعر صالح' : 'Please input a name and valid price', 'error');
                                      return;
                                    }
                                    const addonObj: AddOn = {
                                      ...newAddOn,
                                      id: `addon-${Date.now()}`
                                    };
                                    setBikeForm(prev => ({
                                      ...prev,
                                      addOns: [...(prev.addOns || []), addonObj]
                                    }));
                                    setNewAddOn({
                                      id: '',
                                      name: '',
                                      nameAr: '',
                                      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=150',
                                      description: '',
                                      descAr: '',
                                      price: 0
                                    });
                                    fireToast(lang === 'ar' ? 'تمت إضافة الأكسسوار بنجاح للآلة' : 'Accessory integrated into model spec array', 'success');
                                  }}
                                  className="w-full py-2 cursor-pointer bg-brand-secondary hover:bg-amber-400 text-[#0B0F1A] font-black tracking-widest text-[9.5px] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all"
                                >
                                  {lang === 'ar' ? 'دمج الأكسسوار بالنموذج' : 'PULL ACCESSORY INTO MOTORCYCLE SPEC'}
                                </button>
                              </div>

                              {/* Configured Add-ons inventory */}
                              <div className="space-y-2">
                                <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                  {lang === 'ar' ? `المرفقات الحالية (${bikeForm.addOns?.length || 0})` : `ATTACHED ACCESSORIES (${bikeForm.addOns?.length || 0})`}
                                </h4>

                                {(!bikeForm.addOns || bikeForm.addOns.length === 0) ? (
                                  <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] text-center text-gray-500 font-sans italic text-[10px]" dir={dir}>
                                    {lang === 'ar' ? 'لا توجد أكسسوارات مخصصة لهذه الدراجة' : 'No specialized performance add-ons attached to this chassis yet.'}
                                  </div>
                                ) : (
                                  <div className="space-y-1.5 max-h-[220px] overflow-y-auto scrollbar-thin">
                                    {bikeForm.addOns.map((add, idx) => (
                                      <div key={add.id} className="p-2 border border-white/5 bg-black/40 rounded-xl flex items-center gap-3">
                                        <img src={add.image} className="w-8 h-8 object-cover rounded-lg shrink-0 bg-white/5" />
                                        <div className="flex-1 min-w-0 text-left">
                                          <div className="flex items-center justify-between">
                                            <p className="text-xs font-black truncate">{lang === 'ar' && add.nameAr ? add.nameAr : add.name}</p>
                                            <p className="text-xs text-brand-secondary font-black font-mono">{add.price.toLocaleString()} {lang === 'ar' ? 'جنيه' : 'EGP'}</p>
                                          </div>
                                          <p className="text-[9px] text-gray-400 font-sans truncate">{lang === 'ar' && add.descAr ? add.descAr : add.description}</p>
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0 select-none">
                                          <button
                                            type="button"
                                            disabled={idx === 0}
                                            onClick={() => {
                                              const list = [...bikeForm.addOns];
                                              const temp = list[idx];
                                              list[idx] = list[idx - 1];
                                              list[idx - 1] = temp;
                                              setBikeForm(prev => ({ ...prev, addOns: list }));
                                            }}
                                            className="p-1 px-1.5 text-gray-400 hover:text-white disabled:opacity-30 bg-white/5 rounded pointer-events-auto cursor-pointer text-[9px] transition-colors"
                                          >
                                            ▲
                                          </button>
                                          <button
                                            type="button"
                                            disabled={idx === bikeForm.addOns.length - 1}
                                            onClick={() => {
                                              const list = [...bikeForm.addOns];
                                              const temp = list[idx];
                                              list[idx] = list[idx + 1];
                                              list[idx + 1] = temp;
                                              setBikeForm(prev => ({ ...prev, addOns: list }));
                                            }}
                                            className="p-1 px-1.5 text-gray-400 hover:text-white disabled:opacity-30 bg-white/5 rounded pointer-events-auto cursor-pointer text-[9px] transition-colors"
                                          >
                                            ▼
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setBikeForm(prev => ({ ...prev, addOns: prev.addOns.filter(a => a.id !== add.id) }));
                                              fireToast(lang === 'ar' ? 'تم فصل الأكسسوار' : 'Detached accessory', 'info');
                                            }}
                                            className="p-1 text-red-400 hover:text-white hover:bg-red-500 rounded pointer-events-auto cursor-pointer text-[9px] transition-colors shrink-0"
                                          >
                                            ✕
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* TAB E: RELATED STORE PRODUCTS */}
                          {formSubTab === 'related' && (
                            <div className="space-y-4 text-left font-mono animate-fade-in" dir={dir}>
                              <div className="p-4 bg-black/50 border border-white/[0.04] rounded-2xl space-y-4">
                                <h4 className="text-[10px] font-black text-brand-secondary tracking-widest uppercase mb-2">
                                  {lang === 'ar' ? 'حدد المنتجات ذات الصلة بالموديل' : 'Attach Related Store Products'}
                                </h4>
                                
                                <div className="flex gap-2 mb-4">
                                  <input
                                    type="text"
                                    placeholder={lang === 'ar' ? 'بحث...' : 'Search...'}
                                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white text-xs"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                  />
                                  <select
                                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white text-xs"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value as StoreCategory | 'ALL')}
                                  >
                                    <option value="ALL">{lang === 'ar' ? 'الكل' : 'All'}</option>
                                    {['Oils', 'Safety', 'Smart', 'Parts', 'Lifestyle'].map(cat => (
                                      <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                  </select>
                                </div>

                                <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                  {storeProducts?.filter(product =>
                                    (selectedCategory === 'ALL' || product.category === selectedCategory) &&
                                    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.nameAr.includes(searchTerm) || product.id.toLowerCase().includes(searchTerm.toLowerCase()))
                                  ).map((product) => {
                                    const isSelected = (bikeForm.relatedProductIds || []).includes(product.id);
                                    return (
                                      <div key={product.id} className="flex items-center gap-3 p-2 border border-white/5 bg-white/5 rounded-xl">
                                        <input 
                                          type="checkbox" 
                                          className="cursor-pointer text-brand-primary bg-black border-white/20 rounded"
                                          checked={isSelected}
                                          onChange={(e) => {
                                            const current = bikeForm.relatedProductIds || [];
                                            let newRelated = current;
                                            let newAddOns = [...(bikeForm.addOns || [])];
                                            
                                            if (e.target.checked) {
                                              newRelated = [...current, product.id];
                                              const newAddon: AddOn = {
                                                id: `addon-${product.id}`,
                                                name: product.name,
                                                nameAr: product.nameAr,
                                                price: parseInt(String(product.price).replace(/[^0-9]/g, ''), 10) || 0,
                                                image: product.image,
                                                description: product.description || '',
                                                descAr: product.descriptionAr || ''
                                              };
                                              newAddOns.push(newAddon);
                                            } else {
                                              newRelated = current.filter(id => id !== product.id);
                                              newAddOns = newAddOns.filter(a => a.id !== `addon-${product.id}`);
                                            }
                                            setBikeForm({ ...bikeForm, relatedProductIds: newRelated, addOns: newAddOns });
                                          }}
                                        />
                                        <img src={product.image} className="w-8 h-8 rounded bg-black/50 object-contain p-1" />
                                        <div className="flex-1 min-w-0 pr-2">
                                           <div className="text-xs font-bold text-white truncate">{lang === 'ar' ? product.nameAr : product.name}</div>
                                           <div className="text-[9px] text-gray-400 font-mono tracking-widest">{product.id} • {product.price} EGP</div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                  {(!storeProducts || storeProducts.length === 0) && (
                                    <div className="text-xs text-gray-500 italic p-4 text-center">No products in store to link.</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                        </div>

                        <div className="pt-2 border-t border-white/5 flex justify-end gap-3 font-mono">
                          <button
                            type="button"
                            onClick={() => { setIsAddingNew(false); setEditingBike(null); }}
                            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold cursor-pointer text-xs uppercase"
                          >
                            {lang === 'ar' ? 'تراجع' : 'DISCARD CHANGES'}
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-[#22D3EE] text-[#0B0F1A] font-extrabold uppercase hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer text-xs"
                          >
                            <Check className="w-4 h-4" />
                            <span>{lang === 'ar' ? 'تثبيت الآلة وحفظها' : 'AUTHORIZE INVENTORY WRITE'}</span>
                          </button>
                        </div>
                      </form>
                    )}

                  </div>
                )}

                {/* ================================== TAB: STORE MANAGEMENT ================================== */}
                {activeTab === 'store' && (
                  <div className="animate-fade-in text-left min-h-[600px]">
                     <StoreAdminPanel 
                       storeProducts={storeProducts} 
                       onUpdateStoreProducts={onUpdateStoreProducts!} 
                     />
                  </div>
                )}

                {/* ================================== TAB 3: NODE OPERATORS MANAGEMENT (USERS LIST) ================================== */}
                {activeTab === 'users' && (
                  <div className="space-y-5 animate-fade-in" dir={dir}>
                    <div className="border-b border-white/5 pb-2 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold tracking-widest font-mono">
                          {lang === 'ar' ? 'مشغلو العقد وجلسات العمل' : 'NODE OPERATORS SECURITY DIRECTORY'}
                        </h3>
                        <p className="text-[11px] text-gray-500 normal-case leading-normal font-sans">
                          {lang === 'ar' ? 'إنشاء حسابات جديدة وتعيين مستويات الوصول (مشرف، مدير، مشغل)' : 'Authorize secondary credentials, assign access rights, and revoke node keys safely.'}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1 bg-brand-primary/10 border border-brand-primary/20 text-[#22D3EE] font-mono text-[9px] px-2 py-1 rounded">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>MASTER SYSOPS SECURITY ACTS v2.26</span>
                      </div>
                    </div>

                    {sessionUser.role !== 'Admin' ? (
                      // Unauthorized overlay for Manager & Staff
                      <div className="p-8 text-center border border-red-500/20 bg-red-950/15 rounded-2xl space-y-3 font-mono tracking-wider max-w-md mx-auto my-6 shadow-lg shadow-red-500/5">
                        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto animate-bounce shrink-0" />
                        <div>
                          <p className="text-red-400 font-black text-xs uppercase">{lang === 'ar' ? 'لوائح الأمان: الوصول مرفوض!' : 'SECURITY BREACH WARNING: ACCESS DENIED'}</p>
                          <p className="text-[10px] text-gray-500 lowercase mt-1 normal-case font-sans">
                            {lang === 'ar' ? 'رخص كبار المطورين تتطلب صلاحيات المشرف التام (Admin). مشغلك الحالي محروم من الدخول.' : 'Curation of Operator Nodes requires Core administrator authorization. Credentials logged.'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      // Full User configuration page
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-mono text-xs">
                        
                        {/* Column A: User Addition Panel (4 Span) */}
                        <div className="lg:col-span-5 p-4 border border-white/[0.04] bg-[#111622]/80 rounded-2xl space-y-4 shadow-sm" dir={dir}>
                          <h4 className="text-brand-secondary font-black border-b border-white/5 pb-1.5 tracking-wider uppercase flex items-center gap-1.5">
                            <Plus className="w-4 h-4 text-brand-secondary" />
                            <span>{lang === 'ar' ? 'تفويض مشغل فرعي جديد' : 'DELEGATE NEW OPERATOR'}</span>
                          </h4>

                          <form onSubmit={handleAddUserSubmit} className="space-y-3">
                            <div className="space-y-1 text-left" dir={dir}>
                              <label className="text-gray-400 text-[10px] tracking-wide uppercase">{lang === 'ar' ? 'الاسم المعرف' : 'NODE USERNAME IDENTITY'}:</label>
                              <input
                                type="text"
                                required
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder="operator_id"
                                className="w-full bg-black/60 border border-white/[0.08] focus:border-brand-secondary text-white rounded-xl px-3 py-2 text-xs focus:outline-none py-2.5 lowercase font-semibold"
                              />
                            </div>

                            <div className="space-y-1 text-left" dir={dir}>
                              <label className="text-gray-400 text-[10px] tracking-wide uppercase">{lang === 'ar' ? 'الرمز المشفر للدخول' : 'SECURE DELEGATION CODE'}:</label>
                              <input
                                type="text"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full bg-black/60 border border-white/[0.08] focus:border-brand-secondary text-white rounded-xl px-3 py-2 text-xs focus:outline-none py-2.5 font-bold"
                              />
                            </div>

                            <div className="space-y-1 text-left" dir={dir}>
                              <label className="text-gray-400 text-[10px] tracking-wide uppercase">{lang === 'ar' ? 'رتبة الوصول والشبكة' : 'ACCESS SPECTRUM ROLE'}:</label>
                              <select
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value as UserRole)}
                                className="w-full bg-[#111827]/75 border border-white/[0.08] focus:border-brand-secondary text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none"
                              >
                                <option value="Admin">{lang === 'ar' ? 'مشرف رئيسي (Admin)' : 'CORE ADMIN (Full Writes + Users)'}</option>
                                <option value="Manager">{lang === 'ar' ? 'مدير أسطول (Manager)' : 'MANAGER NODE (Add & Edit Fleet only)'}</option>
                                <option value="Staff">{lang === 'ar' ? 'فريق عمل/مشغل (Staff Operator)' : 'Staff Operator (Only Add Motorcycles)'}</option>
                              </select>
                            </div>

                            <button
                              type="submit"
                              className="w-full py-2.5 mt-2 bg-brand-secondary text-white font-extrabold tracking-widest rounded-xl hover:brightness-110 active:scale-95 transition-all text-[11px] cursor-pointer uppercase flex items-center justify-center gap-1.5"
                            >
                              <Check className="w-4 h-4" />
                              <span>{lang === 'ar' ? 'تفعيل رمز المشغل' : 'DELEGATE NODE'}</span>
                            </button>
                          </form>
                        </div>

                        {/* Column B: Interactive User Lists (7 Span) */}
                        <div className="lg:col-span-7 p-4 border border-white/[0.04] bg-[#0E121E]/90 rounded-2xl space-y-3.5 shadow-sm">
                          <h4 className="text-brand-accent font-black border-b border-white/5 pb-1.5 tracking-wider uppercase flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <Users className="w-4 h-4 text-brand-accent" />
                              <span>{lang === 'ar' ? 'المشرفون المسجلون' : 'ONLINE WORKERS REGISTRY'}</span>
                            </span>
                            <span className="text-[9px] text-gray-500">{users.length} active operators</span>
                          </h4>

                          <div className="space-y-2.5 max-h-[300px] overflow-y-auto scrollbar-thin">
                            {users.map((item) => (
                              <div
                                key={item.username}
                                className="p-3 bg-black/40 border border-white/[0.03] rounded-xl flex items-center justify-between hover:border-white/10 transition-all font-mono"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-extrabold text-white text-xs tracking-wide">{item.username}</span>
                                    <span className={`px-1 rounded text-[8px] font-bold ${
                                      item.role === 'Admin' ? 'bg-indigo-950/80 border border-indigo-400/20 text-indigo-400' :
                                      item.role === 'Manager' ? 'bg-purple-950/80 border border-purple-400/20 text-brand-secondary' :
                                      'bg-emerald-950/80 border border-emerald-400/20 text-emerald-400'
                                    }`}>
                                      {item.role.toUpperCase()}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 mt-1 text-[9px] text-gray-500 leading-none">
                                    <span>KEY:</span>
                                    <span className="font-bold text-gray-400 tracking-wider">••••••••</span>
                                  </div>
                                </div>

                                {item.username.toUpperCase() !== 'HOSNY1995' && item.username !== sessionUser.username ? (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteUser(item.username)}
                                    className="p-1.5 pointer-events-auto cursor-pointer bg-red-600/10 hover:bg-red-600 hover:text-white border border-red-500/20 text-red-100 rounded-lg transition-all"
                                    title="Revoke operator credentials"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                ) : (
                                  <span className="text-[8px] text-gray-600 italic tracking-widest font-black uppercase font-mono">CORE_LOCKED</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                )}

                {/* ================================== TAB 4: ADVANCED PAGE BUILDER (HOMEPAGE EDITOR) ================================== */}
                {activeTab === 'settings' && (
                  <div className="p-1 animate-fade-in text-left space-y-6">
                    <HomepagePageBuilder
                      homepageConfig={homepageConfig}
                      onUpdateHomepageConfig={onUpdateHomepageConfig || (() => {})}
                      lang={lang}
                      dir={dir}
                      customText={customText}
                      onUpdateCustomText={onUpdateCustomText}
                      fireToast={(msg, type) => fireToast(msg, type)}
                    />

                    {/* System Backup and Restore Panel */}
                    <div className="p-4.5 rounded-2xl bg-[#090D16] border border-blue-500/10 space-y-2 mt-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-400 font-bold shrink-0">
                            <Database className="w-4 h-4 animate-pulse" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold font-sans tracking-wide text-white">
                              {lang === 'ar' ? 'مركز إدارة النسخ الاحتياطي (ZIP)' : 'ZIP ARCHIVE BACKUP & RESTORE CONSOLE'}
                            </h4>
                            <p className="text-[10px] text-gray-400 leading-normal font-mono normal-case">
                              {lang === 'ar' 
                                ? 'تحميل كامل قاعدة بيانات وملفات وعناصر الموقع كملف مضغوط وتنزيله لحمايته قبل القيام بأي تعديلات.' 
                                : 'Compile, archive, and download entire system databases and templates as a ZIP file to local storage.'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                        {/* Download backup file button */}
                        <div className="p-3.5 bg-[#0B0F1A] border border-white/[0.03] hover:border-blue-500/20 rounded-xl transition-all space-y-3 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-widest block mb-1">
                              {lang === 'ar' ? 'تنزيل نسخة احتياطية' : 'GENERATE BACKUP'}
                            </span>
                            <p className="text-[10.5px] text-gray-500 leading-relaxed font-sans">
                              {lang === 'ar'
                                ? 'يقوم هذا الخيار بضغط وحفظ جميع منتجات المتجر، الدراجات، إعدادات المعاينة، الترجمات، والحجوزات الحالية في ملف ZIP مشفر وآمن.'
                                : 'Package all active fleet cycles, shop products, visual custom texts, and user accounts inside a secured ZIP backup archive.'}
                            </p>
                          </div>
                          <button
                            onClick={handleDownloadBackup}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500/85 to-indigo-600/95 hover:from-blue-500 hover:to-indigo-600 text-white font-mono font-bold text-[10.5px] uppercase tracking-widest rounded-xl cursor-pointer transition-all border border-blue-500/20 active:scale-98 shadow-md hover:shadow-blue-500/10"
                          >
                            <Download className="w-4 h-4 text-blue-100" />
                            <span>{lang === 'ar' ? 'تحميل النسخة الاحتياطية (ZIP) 📦' : 'Generate & Download ZIP 📦'}</span>
                          </button>
                        </div>

                        {/* Upload / Restore backup file button */}
                        <div className="p-3.5 bg-[#0B0F1A] border border-white/[0.03] hover:border-blue-500/20 rounded-xl transition-all space-y-3 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-widest block mb-1">
                              {lang === 'ar' ? 'استعادة نسخة سابقة' : 'RESTORE BACKUP'}
                            </span>
                            <p className="text-[10.5px] text-gray-500 leading-relaxed font-sans">
                              {lang === 'ar'
                                ? 'قم برفع ملف الـ ZIP المضغوط الذي قمت بتنزيله مسبقاً لاسترجاع كامل بيانات الموقع السابقة بلمسة واحدة.'
                                : 'Upload a previously generated system ZIP backup file. Restores and overwrites state variables immediately.'}
                            </p>
                          </div>
                          
                          <div className="relative">
                            <input
                              type="file"
                              accept=".zip"
                              onChange={handleRestoreBackup}
                              id="restore-zip-setting-input"
                              className="hidden"
                              disabled={sessionUser?.role !== 'Admin'}
                            />
                            <label
                              htmlFor="restore-zip-setting-input"
                              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono font-bold text-[10.5px] uppercase tracking-widest transition-all border shadow-md ${
                                sessionUser?.role === 'Admin'
                                  ? 'bg-[#0B0F19] hover:bg-indigo-950/15 border-indigo-500/40 hover:border-indigo-500 text-indigo-300 cursor-pointer'
                                  : 'bg-white/5 border-white/10 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              <Upload className="w-4 h-4 text-indigo-400" />
                              <span>{lang === 'ar' ? 'رفع واستعادة ملف احتياطي 🔄' : 'Upload & Restore ZIP 🔄'}</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* GitHub Integration Panel */}
                    <div className="p-4.5 rounded-2xl bg-[#090D16] border border-white/5 space-y-4 mt-4 text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-white/5 rounded-lg text-white shrink-0">
                            <Github className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold font-sans tracking-wide text-white uppercase">
                              {lang === 'ar' ? 'بوابة المزامنة ومستودعات GitHub' : 'GITHUB CLOUD SYNCHRONIZATION GATE'}
                            </h4>
                            <p className="text-[10px] text-gray-400 leading-normal font-mono normal-case">
                              {lang === 'ar' 
                                ? 'مزامنة وتصدير ملفات وبيانات المعرض مباشرةً لحساب GitHub الخاص بك، أو استعادتها بلمسة واحدة من خلال رابط مباشر.' 
                                : 'Establish direct link with your GitHub repos to commit complete backups, or load snapshot states by link resolved.'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {/* Column 1: Export to GitHub Settings */}
                        <div className="space-y-3 p-4 bg-[#0B0F1A] border border-white/[0.03] hover:border-white/10 rounded-xl transition-all">
                          <h5 className="text-[10.5px] uppercase font-bold text-gray-300 font-mono tracking-wider flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5 text-blue-400" />
                            {lang === 'ar' ? 'تصدير وحفظ المستودع (GitHub Export)' : 'PUSH DATA TO GITHUB'}
                          </h5>
                          
                          <div className="space-y-2 text-xs">
                            {/* Token input */}
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <label className="text-[10px] text-gray-400 block font-mono uppercase font-semibold">
                                  {lang === 'ar' ? 'رمز الوصول الشخصي (GitHub PAT)' : 'GitHub Personal Access Token'}
                                </label>
                                <a 
                                  href="https://github.com/settings/tokens/new?description=ElKholy%20Motors%20Backup%20Key&scopes=repo"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-blue-400 hover:underline hover:text-blue-350 cursor-pointer font-bold transition-all flex items-center gap-1 font-mono"
                                >
                                  🔑 {lang === 'ar' ? 'إنشاء الرمز تلقائياً' : 'Generate Token Automatically'}
                                </a>
                              </div>
                              <input
                                type="password"
                                value={githubToken}
                                onChange={(e) => {
                                  setGithubToken(e.target.value);
                                  localStorage.setItem('elkholy_github_token', e.target.value);
                                }}
                                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxx"
                                className="w-full bg-[#070A11] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-gray-650 focus:border-blue-500 outline-none font-mono"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {/* Repo path */}
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <label className="text-[10px] text-gray-400 block font-mono uppercase font-semibold">
                                    {lang === 'ar' ? 'مستودع GitHub' : 'Repository (owner/repo)'}
                                  </label>
                                  <a 
                                    href="https://github.com/new"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] text-emerald-400 hover:underline hover:text-emerald-350 cursor-pointer font-bold transition-all flex items-center gap-1 font-mono"
                                  >
                                    📁 {lang === 'ar' ? 'إنشاء مستودع جديد' : 'Create New Repo'}
                                  </a>
                                </div>
                                <input
                                  type="text"
                                  value={githubRepo}
                                  onChange={(e) => {
                                    setGithubRepo(e.target.value);
                                    localStorage.setItem('elkholy_github_repo', e.target.value);
                                  }}
                                  placeholder="username/my-repo"
                                  className="w-full bg-[#070A11] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-gray-650 focus:border-blue-500 outline-none font-mono"
                                />
                              </div>

                              {/* Path file name */}
                              <div>
                                <label className="text-[10px] text-gray-400 block mb-1 font-mono uppercase font-semibold">
                                  {lang === 'ar' ? 'اسم الملف' : 'File Name/Path'}
                                </label>
                                <input
                                  type="text"
                                  value={githubPath}
                                  onChange={(e) => {
                                    setGithubPath(e.target.value);
                                    localStorage.setItem('elkholy_github_path', e.target.value);
                                  }}
                                  placeholder="elkholy_backup.json"
                                  className="w-full bg-[#070A11] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-blue-500 outline-none font-mono"
                                />
                              </div>
                            </div>

                            {/* Branch input */}
                            <div>
                              <label className="text-[10px] text-gray-400 block mb-1 font-mono uppercase font-semibold">
                                {lang === 'ar' ? 'الفرع المستهدف' : 'Target Branch'}
                              </label>
                              <input
                                type="text"
                                value={githubBranch}
                                onChange={(e) => {
                                  setGithubBranch(e.target.value);
                                  localStorage.setItem('elkholy_github_branch', e.target.value);
                                }}
                                placeholder="main"
                                className="w-full bg-[#070A11] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-blue-500 outline-none font-mono"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleExportToGitHub}
                            disabled={isGithubExporting}
                            className={`w-full mt-2 py-2 flex items-center justify-center gap-2 rounded-xl text-[10px] font-mono tracking-widest font-bold uppercase transition-all ${
                              isGithubExporting
                                ? 'bg-white/5 text-gray-550 cursor-not-allowed border border-white/5'
                                : 'bg-white text-black hover:bg-gray-100 cursor-pointer active:scale-98 shadow-md hover:shadow-white/5'
                            }`}
                          >
                            <Github className="w-4 h-4 text-black" />
                            {isGithubExporting
                              ? (lang === 'ar' ? 'جاري الفحص والرفع... ⏳' : 'COMMITTING SNAPSHOT... ⏳')
                              : (lang === 'ar' ? 'حفظ وتصدير إلى GitHub 🚀' : 'PUSH TO GITHUB REPO 🚀')}
                          </button>
                        </div>

                        {/* Column 2: Restore from URL/GitHub Raw */}
                        <div className="space-y-3 p-4 bg-[#0B0F1A] border border-white/[0.03] hover:border-white/10 rounded-xl transition-all flex flex-col justify-between">
                          <div className="space-y-3">
                            <h5 className="text-[10.5px] uppercase font-bold text-gray-300 font-mono tracking-wider flex items-center gap-1.5">
                              <Link className="w-3.5 h-3.5 text-emerald-400" />
                              {lang === 'ar' ? 'استيراد فوري من رابط ملف خارجي / Gist' : 'IMPORT DIRECTLY FROM URL / GIST'}
                            </h5>

                            <p className="text-[10.5px] text-gray-500 leading-relaxed font-sans mt-1">
                              {lang === 'ar'
                                ? 'يقوم هذا الخيار بجلب وتنزيل ملف نسخة احتياطية من أي رابط مباشر (رابط خام من GitHub أو Gist أو أي خادم خارجي) وتطبيقه كلحظة استعادة فورية للموقع.'
                                : 'Restore complete status variables by inputting raw URL pointing to JSON catalog structure (e.g. raw.githubusercontent or raw Gist).'}
                            </p>

                            <div className="space-y-1.5">
                              <label className="text-[10px] text-gray-400 block font-mono uppercase font-semibold">
                                {lang === 'ar' ? 'رابط ملف الـ JSON المباشر' : 'Direct JSON Backup URL'}
                              </label>
                              <input
                                type="text"
                                value={githubImportUrl}
                                onChange={(e) => setGithubImportUrl(e.target.value)}
                                placeholder="https://raw.githubusercontent.com/owner/repo/main/elkholy_backup.json"
                                className="w-full bg-[#070A11] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:border-emerald-500 outline-none font-mono"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleImportByUrl}
                            disabled={isGithubImporting || sessionUser?.role !== 'Admin'}
                            className={`w-full py-2.5 flex items-center justify-center gap-2 rounded-xl text-[10px] font-mono tracking-widest font-bold uppercase transition-all ${
                              isGithubImporting || sessionUser?.role !== 'Admin'
                                ? 'bg-white/5 text-gray-550 cursor-not-allowed border border-white/5'
                                : 'bg-[#0E1524] hover:bg-[#121c32] border border-emerald-500/30 hover:border-emerald-500 text-emerald-300 cursor-pointer active:scale-98 shadow-md'
                            }`}
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isGithubImporting ? 'animate-spin' : ''}`} />
                            {isGithubImporting
                              ? (lang === 'ar' ? 'جاري الاتصال والتحميل... ⏳' : 'FETCHING DATA NODES... ⏳')
                              : (lang === 'ar' ? 'استيراد ومزامنة البيانات 🔄' : 'FETCH & INTEGRATE DATA 🔄')}
                          </button>
                        </div>
                      </div>

                      {/* Full Codebase Deployment to GitHub (Vercel Integration) */}
                      <div className="p-4.5 bg-[#0B0F1A] border border-white/[0.03] hover:border-white/10 rounded-2xl transition-all space-y-3.5 mt-4 text-left">
                        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                          <div className="p-1 px-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg">
                            <Code className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <h5 className="text-[11px] uppercase font-bold text-gray-200 font-mono tracking-wider">
                              {lang === 'ar' ? 'رفع كود المصدر والمشروع بالكامل للربط بـ Vercel' : 'PUSH ENTIRE REACT CODEBASE FOR VERCEL DEPLOYMENT'}
                            </h5>
                            <p className="text-[9px] text-gray-550 font-mono italic">
                              {lang === 'ar' ? 'قم برفع جميع ملفات التطبيق والمشاريع للاتصال بفركل مباشرة' : 'Push complete workspace structure to deploy on Vercel or Netlify dynamically'}
                            </p>
                          </div>
                        </div>

                        <p className="text-[10.5px] text-gray-400 leading-relaxed font-sans">
                          {lang === 'ar'
                            ? 'هذا القسم يتيح لك تصدير "كامل الكود البرمجي للموقع" مع جميع الإعدادات ولحظات المعرض والصور الثنائية مباشرة إلى مستودع GitHub الخاص بك. بعد إتمام الرفع، يمكنك الدخول لحساب Vercel وربط المستودع، وسيتم إطلاق موقعك الخاص فوراً وبشكل مستقل تماماً ودائم مجاناً!'
                            : 'This module fetches every single active component, translation layout, package module, assets folder, and binary picture, then processes them as a single tree commit on GitHub. Easily hook this repository into Vercel or Netlify to compile and deliver your custom storefront instantly!'}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#070A11] rounded-xl border border-white/5 font-mono">
                          <div className="flex justify-between items-center text-[10px] text-gray-400">
                            <span>{lang === 'ar' ? 'المستودع الهدف:' : 'TARGET REPOSITORY:'}</span>
                            <span className="text-white font-bold tracking-wide">{githubRepo || (lang === 'ar' ? 'لم يحدد' : 'Not specified')}</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-gray-400">
                            <span>{lang === 'ar' ? 'الفرع المستهدف:' : 'TARGET BRANCH:'}</span>
                            <span className="text-blue-400 font-bold tracking-wide">{githubBranch || 'main'}</span>
                          </div>
                        </div>

                        {isPushingProject && (
                          <div className="p-3 bg-indigo-950/20 border border-indigo-500/15 rounded-xl space-y-2 text-center">
                            <div className="flex items-center gap-2 justify-center">
                              <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                              <span className="text-[10.5px] font-mono text-indigo-300 font-bold uppercase tracking-widest">
                                {lang === 'ar' ? 'جاري تجهيز وتصدير المشروع... ⏳' : 'PUSHING SYSTEM FILES... ⏳'}
                              </span>
                            </div>
                            <p className="text-[10px] font-mono text-gray-400 leading-relaxed">
                              {projectPushStep}
                            </p>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={handlePushEntireProjectToGitHub}
                          disabled={isPushingProject || !githubRepo.trim() || !githubToken.trim()}
                          className={`w-full py-3 flex items-center justify-center gap-2 rounded-xl text-[10.5px] font-mono tracking-widest font-extrabold uppercase transition-all ${
                            isPushingProject || !githubRepo.trim() || !githubToken.trim()
                              ? 'bg-white/5 text-gray-550 border border-white/5 cursor-not-allowed'
                              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-550 hover:to-indigo-550 text-white cursor-pointer active:scale-98 shadow-md hover:shadow-indigo-500/10'
                          }`}
                        >
                          <Github className="w-4 h-4 text-white" />
                          {isPushingProject
                            ? (lang === 'ar' ? 'جاري الرفع... 🚀' : 'EXECUTING ATOMIC COMMIT... 🚀')
                            : (lang === 'ar' ? 'إطلاق ورفع كود الموقع بالكامل إلى GitHub 🚀💻' : 'PUSH FULL REACTION ENGINE TO GITHUB 🚀💻')}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
}

const MOCK_HISTORICAL_SALES = [
  // January 2026 (Month 1)
  {
    id: 'HIST-M1-01',
    code: 'sport-cybersport-v4',
    name: 'ElKholy CyberSport V4',
    type: 'motorcycle',
    customerName: 'أحمد محمود العاصي',
    customerPhone: '01099887766',
    quantity: 1,
    unitPrice: 45000,
    totalPrice: 45000,
    date: '2026-01-12'
  },
  {
    id: 'HIST-M1-02',
    code: 'PRD-MTL710',
    name: 'زيت موتول 7100 10W40 تخليقي 1 لتر',
    type: 'product',
    customerName: 'محمد عبد الله',
    customerPhone: '01122334455',
    quantity: 3,
    unitPrice: 850,
    totalPrice: 2550,
    date: '2026-01-18'
  },
  {
    id: 'HIST-M1-03',
    code: 'PRD-AGVK1S',
    name: 'خوذة أي جي في K1 S الرياضية الأصلية',
    type: 'product',
    customerName: 'كريم أشرف',
    customerPhone: '01233445566',
    quantity: 1,
    unitPrice: 11500,
    totalPrice: 11500,
    date: '2026-01-25'
  },

  // February 2026 (Month 2)
  {
    id: 'HIST-M2-01',
    code: 'cruiser-cybercruiser-x1',
    name: 'ElKholy CyberCruiser X1',
    type: 'motorcycle',
    customerName: 'محمود الصاوي',
    customerPhone: '01566778899',
    quantity: 1,
    unitPrice: 38000,
    totalPrice: 38000,
    date: '2026-02-05'
  },
  {
    id: 'HIST-M2-02',
    code: 'PRD-SPCPRO',
    name: 'حامل جوال إس بي كونكت برو للدراجات',
    type: 'product',
    customerName: 'سامح غالي',
    customerPhone: '01011223344',
    quantity: 2,
    unitPrice: 2200,
    totalPrice: 4400,
    date: '2026-02-14'
  },
  {
    id: 'HIST-M2-03',
    code: 'PRD-CRDPTK',
    name: 'انتركوم كاردو باك توك ايدج ثنائي أصلي',
    type: 'product',
    customerName: 'وائل عزت',
    customerPhone: '01155443322',
    quantity: 1,
    unitPrice: 18900,
    totalPrice: 18900,
    date: '2026-02-22'
  },

  // March 2026 (Month 3)
  {
    id: 'HIST-M3-01',
    code: 'scooter-cyberscooter-s2',
    name: 'ElKholy CyberScooter S2',
    type: 'motorcycle',
    customerName: 'ياسر الطوخي',
    customerPhone: '01288776655',
    quantity: 1,
    unitPrice: 16000,
    totalPrice: 16000,
    date: '2026-03-08'
  },
  {
    id: 'HIST-M3-02',
    code: 'PRD-NGKIRD',
    name: 'بوجيه ان جي كي ايريديوم رياضي فائق الأداء',
    type: 'product',
    customerName: 'عمرو أديب',
    customerPhone: '01022334455',
    quantity: 4,
    unitPrice: 450,
    totalPrice: 1800,
    date: '2026-03-15'
  },
  {
    id: 'HIST-M3-03',
    code: 'PRD-YASBAT',
    name: 'بطارية يواسا اليابانية أصلية خالية من الصيانة',
    type: 'product',
    customerName: 'هاني شاكر',
    customerPhone: '01144332211',
    quantity: 1,
    unitPrice: 2400,
    totalPrice: 2400,
    date: '2026-03-29'
  },

  // April 2026 (Month 4)
  {
    id: 'HIST-M4-01',
    code: 'touring-cyberadventure-v8',
    name: 'ElKholy CyberAdventure V8',
    type: 'motorcycle',
    customerName: 'خالد الجندي',
    customerPhone: '01599887766',
    quantity: 1,
    unitPrice: 52000,
    totalPrice: 52000,
    date: '2026-04-10'
  },
  {
    id: 'HIST-M4-02',
    code: 'PRD-LQM4T1',
    name: 'زيت ليكوي مولي الألماني 10W50 للطرقات 1 لتر',
    type: 'product',
    customerName: 'أشرف زكي',
    customerPhone: '01066554433',
    quantity: 5,
    unitPrice: 780,
    totalPrice: 3900,
    date: '2026-04-18'
  },
  {
    id: 'HIST-M4-03',
    code: 'PRD-XIAAIR',
    name: 'منفاخ إطارات شاومي الكهربائي المحمول 2',
    type: 'product',
    customerName: 'إسلام صبحي',
    customerPhone: '01277665544',
    quantity: 2,
    unitPrice: 1850,
    totalPrice: 3700,
    date: '2026-04-26'
  },

  // May 2026 (Month 5)
  {
    id: 'HIST-M5-01',
    code: 'sport-cybersport-v4',
    name: 'ElKholy CyberSport V4',
    type: 'motorcycle',
    customerName: 'أيمن نور',
    customerPhone: '01188990011',
    quantity: 1,
    unitPrice: 45000,
    totalPrice: 45000,
    date: '2026-05-02'
  },
  {
    id: 'HIST-M5-02',
    code: 'PRD-ALPGLV',
    name: 'قفازات البين ستارز GP Pro V2 جلد سباقات الكاربون',
    type: 'product',
    customerName: 'هشام عباس',
    customerPhone: '01544332211',
    quantity: 1,
    unitPrice: 4800,
    totalPrice: 4800,
    date: '2026-05-15'
  },
  {
    id: 'HIST-M5-03',
    code: 'PRD-MCHRD6',
    name: 'إطار كاوتش ميشلان رود 6 أمامي استيراد',
    type: 'product',
    customerName: 'حسن شاكوش',
    customerPhone: '01011335577',
    quantity: 2,
    unitPrice: 6800,
    totalPrice: 13600,
    date: '2026-05-24'
  },

  // June 2026 (Month 6)
  {
    id: 'HIST-M6-01',
    code: 'scooter-cyberscooter-s2',
    name: 'ElKholy CyberScooter S2',
    type: 'motorcycle',
    customerName: 'بهاء سلطان',
    customerPhone: '01244556677',
    quantity: 1,
    unitPrice: 16000,
    totalPrice: 16000,
    date: '2026-06-01'
  },
  {
    id: 'HIST-M6-02',
    code: 'PRD-DNSR4J',
    name: 'جاكيت دانيز ريسينج 4 جلدي فاخر - أسود وذهبي',
    type: 'product',
    customerName: 'تامر حسني',
    customerPhone: '01177665544',
    quantity: 1,
    unitPrice: 18500,
    totalPrice: 18500,
    date: '2026-06-03'
  },
  {
    id: 'HIST-M6-03',
    code: 'PRD-MTLCHL',
    name: 'اسبراي مشحم جنزير موتول C2 حجم 400 مل',
    type: 'product',
    customerName: 'عمرو دياب',
    customerPhone: '01020304050',
    quantity: 4,
    unitPrice: 450,
    totalPrice: 1800,
    date: '2026-06-04'
  }
];
