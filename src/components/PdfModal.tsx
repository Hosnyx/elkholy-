import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d4a02cea"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=d4a02cea"; const useState = __vite__cjsImport1_react["useState"];
import { motion } from "/node_modules/.vite/deps/motion_react.js?v=f1f188c8";
import { X, Download, FileText, Printer, Shield, BadgeCheck } from "/node_modules/.vite/deps/lucide-react.js?v=1004c77f";
export default function PdfModal({ bike, onClose }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      const fileContent = `========================================================================
            E L K H O L Y   M O T O R S   -   C A T A L O G   2 0 2 6
                      " R I D E   T H E   F U T U R E "
========================================================================

VEHICLE CLASSIFICATION: ${bike.categoryName.toUpperCase()} SERIES
MACHINE MODEL: ${bike.name.toUpperCase()}
SLOGAN DIRECTIVE: "${bike.tagline.toUpperCase()}"
ESTIMATED DEALER COST: ${bike.price}

------------------------------------------------------------------------
                       PRODUCT BRIEF & SYNOPSIS
------------------------------------------------------------------------
${bike.longDesc}

------------------------------------------------------------------------
                  ENGINE & PROPULSION SPECIFICATIONS
------------------------------------------------------------------------
* DRIVE POWERPLANT: ${bike.specs.engine}
* REGISTERED TOP SPEED: ${bike.specs.topSpeed}
* POWER CAP: ${bike.specs.power}
* HYBRID CO-PROPULSION FUEL / ELEC CONSUMPTION: ${bike.specs.fuelConsumption}
* CHASSIS KERB WEIGHT: ${bike.specs.weight}

------------------------------------------------------------------------
                       CHASSIS & INTEGRATIONS
------------------------------------------------------------------------
* High-integrity carbon-monocoque weight-distribution frame.
* Smart neural smartphone linkages and HUD helmet diagnostics.
* 3-Year Unlimited Mile Electric Powertrain Cairo-Warrantee.

========================================================================
REGISTER YOUR INTERACTIVE ORDER ONLINE OR VIA SECURE WHATSAPP PORTAL
              Plot 18, Royal Zone, Fifth Settlement, Cairo
========================================================================`;
      const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ElKholy_Motors_Catalog_${bike.name.replace(/\s+/g, "_")}.text`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloading(false);
      setDownloadComplete(true);
    }, 1500);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md", children: /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      className: "w-full max-w-4xl h-[90vh] glass-panel border border-brand-accent/30 rounded-3xl overflow-hidden flex flex-col shadow-2xl relative",
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-white/[0.08] p-5 bg-[#0B0F1A]/80 z-10", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxDEV(FileText, { className: "w-5 h-5 text-brand-accent animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/PdfModal.tsx",
              lineNumber: 91,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-mono text-white tracking-widest font-bold uppercase", children: [
                "HOLOGRAPHIC ",
                /* @__PURE__ */ jsxDEV("span", { className: "text-brand-accent", children: "PDF VIEWER" }, void 0, false, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 94,
                  columnNumber: 29
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 93,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[10px] text-gray-500 uppercase", children: [
                "DOC ID: EM-CATALOG-",
                bike.id.toUpperCase(),
                "-2026"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 96,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PdfModal.tsx",
              lineNumber: 92,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PdfModal.tsx",
            lineNumber: 90,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleDownload,
                disabled: downloading,
                className: `px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-widest cursor-pointer hover:brightness-110 active:scale-95 transition-all text-black bg-brand-accent flex items-center gap-2 ${downloading ? "opacity-80 animate-pulse" : ""}`,
                children: downloading ? /* @__PURE__ */ jsxDEV("span", { children: "DOWNLOADING..." }, void 0, false, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 110,
                  columnNumber: 17
                }, this) : downloadComplete ? /* @__PURE__ */ jsxDEV("span", { className: "text-[#0B0F1A] flex items-center gap-1", children: "✔ DOWNLOADED" }, void 0, false, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 112,
                  columnNumber: 17
                }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                  /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 115,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "DOWNLOAD CATALOG" }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 116,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 114,
                  columnNumber: 17
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 102,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onClose,
                className: "p-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-gray-400 hover:text-white transition-colors cursor-pointer",
                children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 125,
                  columnNumber: 15
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 121,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PdfModal.tsx",
            lineNumber: 101,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PdfModal.tsx",
          lineNumber: 89,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-6 md:p-10 bg-[#0F172A]/40 flex justify-center items-start", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-2xl bg-white text-slate-900 rounded-2xl p-6 md:p-12 shadow-2xl relative border border-slate-300 font-sans overflow-hidden min-h-[900px] flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 pointer-events-none border-[12px] border-slate-100/50 rounded-2xl" }, void 0, false, {
            fileName: "/app/applet/src/components/PdfModal.tsx",
            lineNumber: 135,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 font-mono text-[4rem] text-slate-100 font-black tracking-[0.5em] select-none pointer-events-none uppercase", children: "ELKHOLY" }, void 0, false, {
            fileName: "/app/applet/src/components/PdfModal.tsx",
            lineNumber: 138,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-start border-b border-slate-200 pb-5 mb-8", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("h4", { className: "text-2xl font-black tracking-tight text-slate-800", children: "ELKHOLY MOTORS" }, void 0, false, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 146,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[9px] font-mono tracking-[0.3em] font-bold text-indigo-600 uppercase", children: "Ride the Future" }, void 0, false, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 147,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-1", children: "Plot 18, Fifth Settlement, New Cairo, Egypt" }, void 0, false, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 148,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 145,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-right font-mono text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 leading-tight", children: [
                /* @__PURE__ */ jsxDEV("p", { className: "font-bold text-slate-800", children: "SPEC SUMMARY" }, void 0, false, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 151,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { children: [
                  "CLASS: ",
                  bike.categoryName.toUpperCase()
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 152,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { children: "YEAR CODE: 2026-SYS" }, void 0, false, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 153,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { children: "STATUS: VERIFIED" }, void 0, false, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 154,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 150,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PdfModal.tsx",
              lineNumber: 144,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 mb-8", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "px-3 py-1 bg-indigo-50 text-indigo-700 rounded text-[10px] font-mono font-bold tracking-widest uppercase", children: "TECHNICAL SPECIFICATION BROCHURE" }, void 0, false, {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 160,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("h1", { className: "text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight mt-1", children: bike.name }, void 0, false, {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 163,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-semibold italic text-indigo-600 font-mono", children: [
                '"',
                bike.tagline,
                '"'
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 166,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PdfModal.tsx",
              lineNumber: 159,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "w-full h-56 bg-slate-50 rounded-xl mb-8 flex items-center justify-center border border-slate-200 p-4 relative overflow-hidden group", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 left-2 px-2 py-0.5 bg-slate-200 text-slate-600 text-[9px] font-mono rounded", children: "HOLOGRAPHIC VECTOR EMBED" }, void 0, false, {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 173,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "img",
                {
                  src: bike.image,
                  alt: bike.name,
                  referrerPolicy: "no-referrer",
                  className: "h-full object-contain filter grayscale saturate-50 contrast-125"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 176,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PdfModal.tsx",
              lineNumber: 172,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 mb-8", children: [
              /* @__PURE__ */ jsxDEV("h5", { className: "font-mono text-xs font-bold text-slate-800 tracking-wider uppercase border-b border-slate-200 pb-1", children: "1. PROPULSION & ENGINES MATRIX" }, void 0, false, {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 186,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-y-2 text-xs", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex border-b border-slate-100 py-1.5 justify-between pr-3", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 font-medium", children: "Core Drive Engine:" }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 191,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-slate-800", children: bike.specs.engine }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 192,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 190,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex border-b border-slate-100 py-1.5 justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 font-medium", children: "Guaranteed Top Velocity:" }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 195,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-slate-800", children: bike.specs.topSpeed }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 196,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 194,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex border-b border-slate-100 py-1.5 justify-between pr-3", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 font-medium", children: "Power Rating / Torque:" }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 199,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-slate-800", children: bike.specs.power }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 200,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 198,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex border-b border-slate-100 py-1.5 justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 font-medium", children: "Fuel / Energy Cost:" }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 203,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-slate-800", children: bike.specs.fuelConsumption }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 204,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 202,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "col-span-2 flex border-b border-slate-100 py-1.5 justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 font-medium", children: "Net Vehicle Chassis Mass:" }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 207,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-slate-800", children: bike.specs.weight }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 208,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 206,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 189,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PdfModal.tsx",
              lineNumber: 185,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 mb-8", children: [
              /* @__PURE__ */ jsxDEV("h5", { className: "font-mono text-xs font-bold text-slate-800 tracking-wider uppercase border-b border-slate-200 pb-1", children: "2. DESIGN OBJECTIVES & CORE UTILITY" }, void 0, false, {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 215,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-600 leading-relaxed font-sans", children: bike.longDesc }, void 0, false, {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 218,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PdfModal.tsx",
              lineNumber: 214,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-4 mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxDEV(Shield, { className: "w-5 h-5 text-indigo-600 shrink-0 mt-0.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 226,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold block text-slate-800", children: "3-Year Cyber Warrantee" }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 228,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Guarantees complete state-of-the-art power pack replacements." }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 229,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 227,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 225,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxDEV(BadgeCheck, { className: "w-5 h-5 text-indigo-600 shrink-0 mt-0.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 233,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold block text-slate-800", children: "Holographic Telemetry" }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 235,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Fully synced telemetry telemetry system with legal HUD display link." }, void 0, false, {
                    fileName: "/app/applet/src/components/PdfModal.tsx",
                    lineNumber: 236,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 234,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PdfModal.tsx",
                lineNumber: 232,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PdfModal.tsx",
              lineNumber: 224,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PdfModal.tsx",
            lineNumber: 143,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "border-t border-slate-200 pt-5 mt-8 flex justify-between items-center text-[10px] font-mono text-slate-400", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "ELKHOLY MOTORS INC. 2026" }, void 0, false, {
              fileName: "/app/applet/src/components/PdfModal.tsx",
              lineNumber: 245,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "PAGE 1 OF 1 SPEC SHEET" }, void 0, false, {
              fileName: "/app/applet/src/components/PdfModal.tsx",
              lineNumber: 246,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-indigo-600 font-bold", children: "STAMP SIGNED OFF" }, void 0, false, {
              fileName: "/app/applet/src/components/PdfModal.tsx",
              lineNumber: 247,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PdfModal.tsx",
            lineNumber: 244,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PdfModal.tsx",
          lineNumber: 132,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/PdfModal.tsx",
          lineNumber: 131,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-[#070A11] p-4 text-center text-xs font-mono border-t border-white/[0.08] text-gray-500 flex justify-between items-center px-6", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "* Specifications list represents simulated 2026 technical guidelines." }, void 0, false, {
            fileName: "/app/applet/src/components/PdfModal.tsx",
            lineNumber: 255,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => window.print(),
              className: "text-brand-accent hover:text-white transition-colors flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxDEV(Printer, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 260,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "PRINT THIS HOLOGRAPHE" }, void 0, false, {
                  fileName: "/app/applet/src/components/PdfModal.tsx",
                  lineNumber: 261,
                  columnNumber: 13
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PdfModal.tsx",
              lineNumber: 256,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PdfModal.tsx",
          lineNumber: 254,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/PdfModal.tsx",
      lineNumber: 81,
      columnNumber: 7
    },
    this
  ) }, void 0, false, {
    fileName: "/app/applet/src/components/PdfModal.tsx",
    lineNumber: 78,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBkZk1vZGFsLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG1vdGlvbiwgQW5pbWF0ZVByZXNlbmNlIH0gZnJvbSAnbW90aW9uL3JlYWN0JztcbmltcG9ydCB7IFgsIERvd25sb2FkLCBGaWxlVGV4dCwgUHJpbnRlciwgU2hpZWxkLCBCYWRnZUNoZWNrLCBaYXAsIEdhdWdlLCBBd2FyZCwgRXllIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IE1vdG9yY3ljbGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmludGVyZmFjZSBQZGZNb2RhbFByb3BzIHtcbiAgYmlrZTogTW90b3JjeWNsZTtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGRmTW9kYWwoeyBiaWtlLCBvbkNsb3NlIH06IFBkZk1vZGFsUHJvcHMpIHtcbiAgY29uc3QgW2Rvd25sb2FkaW5nLCBzZXREb3dubG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtkb3dubG9hZENvbXBsZXRlLCBzZXREb3dubG9hZENvbXBsZXRlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZCA9ICgpID0+IHtcbiAgICBzZXREb3dubG9hZGluZyh0cnVlKTtcbiAgICBcbiAgICAvLyBTaW11bGF0ZSBoaWdoLXNwZWVkIG1pbGl0YXJ5IHNhdGVsbGl0ZSBkb3dubGluayBvZiBkb2N1bWVudFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gQnVpbGQgdGV4dCBjYXRhbG9nIHJlcHJlc2VudGF0aW9uXG4gICAgICBjb25zdCBmaWxlQ29udGVudCA9IGA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICAgIEUgTCBLIEggTyBMIFkgICBNIE8gVCBPIFIgUyAgIC0gICBDIEEgVCBBIEwgTyBHICAgMiAwIDIgNlxuICAgICAgICAgICAgICAgICAgICAgIFwiIFIgSSBEIEUgICBUIEggRSAgIEYgVSBUIFUgUiBFIFwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuVkVISUNMRSBDTEFTU0lGSUNBVElPTjogJHtiaWtlLmNhdGVnb3J5TmFtZS50b1VwcGVyQ2FzZSgpfSBTRVJJRVNcbk1BQ0hJTkUgTU9ERUw6ICR7YmlrZS5uYW1lLnRvVXBwZXJDYXNlKCl9XG5TTE9HQU4gRElSRUNUSVZFOiBcIiR7YmlrZS50YWdsaW5lLnRvVXBwZXJDYXNlKCl9XCJcbkVTVElNQVRFRCBERUFMRVIgQ09TVDogJHtiaWtlLnByaWNlfVxuXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICAgICAgICAgUFJPRFVDVCBCUklFRiAmIFNZTk9QU0lTXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiR7YmlrZS5sb25nRGVzY31cblxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICAgICAgICBFTkdJTkUgJiBQUk9QVUxTSU9OIFNQRUNJRklDQVRJT05TXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiogRFJJVkUgUE9XRVJQTEFOVDogJHtiaWtlLnNwZWNzLmVuZ2luZX1cbiogUkVHSVNURVJFRCBUT1AgU1BFRUQ6ICR7YmlrZS5zcGVjcy50b3BTcGVlZH1cbiogUE9XRVIgQ0FQOiAke2Jpa2Uuc3BlY3MucG93ZXJ9XG4qIEhZQlJJRCBDTy1QUk9QVUxTSU9OIEZVRUwgLyBFTEVDIENPTlNVTVBUSU9OOiAke2Jpa2Uuc3BlY3MuZnVlbENvbnN1bXB0aW9ufVxuKiBDSEFTU0lTIEtFUkIgV0VJR0hUOiAke2Jpa2Uuc3BlY3Mud2VpZ2h0fVxuXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgICAgICAgICAgQ0hBU1NJUyAmIElOVEVHUkFUSU9OU1xuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qIEhpZ2gtaW50ZWdyaXR5IGNhcmJvbi1tb25vY29xdWUgd2VpZ2h0LWRpc3RyaWJ1dGlvbiBmcmFtZS5cbiogU21hcnQgbmV1cmFsIHNtYXJ0cGhvbmUgbGlua2FnZXMgYW5kIEhVRCBoZWxtZXQgZGlhZ25vc3RpY3MuXG4qIDMtWWVhciBVbmxpbWl0ZWQgTWlsZSBFbGVjdHJpYyBQb3dlcnRyYWluIENhaXJvLVdhcnJhbnRlZS5cblxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5SRUdJU1RFUiBZT1VSIElOVEVSQUNUSVZFIE9SREVSIE9OTElORSBPUiBWSUEgU0VDVVJFIFdIQVRTQVBQIFBPUlRBTFxuICAgICAgICAgICAgICBQbG90IDE4LCBSb3lhbCBab25lLCBGaWZ0aCBTZXR0bGVtZW50LCBDYWlyb1xuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09YDtcblxuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtmaWxlQ29udGVudF0sIHsgdHlwZTogJ3RleHQvcGxhaW47Y2hhcnNldD11dGYtOCcgfSk7XG4gICAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICAgIGxpbmsuZG93bmxvYWQgPSBgRWxLaG9seV9Nb3RvcnNfQ2F0YWxvZ18ke2Jpa2UubmFtZS5yZXBsYWNlKC9cXHMrL2csICdfJyl9LnRleHRgO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG5cbiAgICAgIHNldERvd25sb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldERvd25sb2FkQ29tcGxldGUodHJ1ZSk7XG4gICAgfSwgMTUwMCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgYmctYmxhY2svODUgYmFja2Ryb3AtYmx1ci1tZFwiPlxuICAgICAgXG4gICAgICB7LyogT3V0ZXIgd3JhcHBlciAqL31cbiAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgc2NhbGU6IDAuOTUgfX1cbiAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCBzY2FsZTogMSB9fVxuICAgICAgICBleGl0PXt7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjk1IH19XG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy00eGwgaC1bOTB2aF0gZ2xhc3MtcGFuZWwgYm9yZGVyIGJvcmRlci1icmFuZC1hY2NlbnQvMzAgcm91bmRlZC0zeGwgb3ZlcmZsb3ctaGlkZGVuIGZsZXggZmxleC1jb2wgc2hhZG93LTJ4bCByZWxhdGl2ZVwiXG4gICAgICA+XG4gICAgICAgIFxuICAgICAgICB7LyogR2xvdyBoYWxvIGhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXdoaXRlL1swLjA4XSBwLTUgYmctWyMwQjBGMUFdLzgwIHotMTBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjVcIj5cbiAgICAgICAgICAgIDxGaWxlVGV4dCBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtYnJhbmQtYWNjZW50IGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tb25vIHRleHQtd2hpdGUgdHJhY2tpbmctd2lkZXN0IGZvbnQtYm9sZCB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICBIT0xPR1JBUEhJQyA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJyYW5kLWFjY2VudFwiPlBERiBWSUVXRVI8L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVsxMHB4XSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZVwiPkRPQyBJRDogRU0tQ0FUQUxPRy17YmlrZS5pZC50b1VwcGVyQ2FzZSgpfS0yMDI2PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQWN0aW9uIEh1YiAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZG93bmxvYWRpbmd9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLXhsIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCB0cmFja2luZy13aWRlc3QgY3Vyc29yLXBvaW50ZXIgaG92ZXI6YnJpZ2h0bmVzcy0xMTAgYWN0aXZlOnNjYWxlLTk1IHRyYW5zaXRpb24tYWxsIHRleHQtYmxhY2sgYmctYnJhbmQtYWNjZW50IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yICR7XG4gICAgICAgICAgICAgICAgZG93bmxvYWRpbmcgPyAnb3BhY2l0eS04MCBhbmltYXRlLXB1bHNlJyA6ICcnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7ZG93bmxvYWRpbmcgPyAoXG4gICAgICAgICAgICAgICAgPHNwYW4+RE9XTkxPQURJTkcuLi48L3NwYW4+XG4gICAgICAgICAgICAgICkgOiBkb3dubG9hZENvbXBsZXRlID8gKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWyMwQjBGMUFdIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+4pyUIERPV05MT0FERUQ8L3NwYW4+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkRPV05MT0FEIENBVEFMT0c8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItd2hpdGUvMTAgYmctd2hpdGUvWzAuMDJdIHRleHQtZ3JheS00MDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTY3JvbGxhYmxlIFZpcnR1YWwgUERGIFBhcGVyIEJvZHkgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LXktYXV0byBwLTYgbWQ6cC0xMCBiZy1bIzBGMTcyQV0vNDAgZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1zdGFydFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LTJ4bCBiZy13aGl0ZSB0ZXh0LXNsYXRlLTkwMCByb3VuZGVkLTJ4bCBwLTYgbWQ6cC0xMiBzaGFkb3ctMnhsIHJlbGF0aXZlIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIGZvbnQtc2FucyBvdmVyZmxvdy1oaWRkZW4gbWluLWgtWzkwMHB4XSBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogSG9sb2dyYXBoaWMgZ3JpZCBzY2FuIGxpbmVzIG9uIHBhcGVyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHBvaW50ZXItZXZlbnRzLW5vbmUgYm9yZGVyLVsxMnB4XSBib3JkZXItc2xhdGUtMTAwLzUwIHJvdW5kZWQtMnhsXCIgLz5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgey8qIHdhdGVybWFyayAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTEvMiBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIC10cmFuc2xhdGUteS0xLzIgLXJvdGF0ZS00NSBmb250LW1vbm8gdGV4dC1bNHJlbV0gdGV4dC1zbGF0ZS0xMDAgZm9udC1ibGFjayB0cmFja2luZy1bMC41ZW1dIHNlbGVjdC1ub25lIHBvaW50ZXItZXZlbnRzLW5vbmUgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgIEVMS0hPTFlcbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogRG9jdW1lbnQgSGVhZGVyICovfVxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1zdGFydCBib3JkZXItYiBib3JkZXItc2xhdGUtMjAwIHBiLTUgbWItOFwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayB0cmFja2luZy10aWdodCB0ZXh0LXNsYXRlLTgwMFwiPkVMS0hPTFkgTU9UT1JTPC9oND5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1tb25vIHRyYWNraW5nLVswLjNlbV0gZm9udC1ib2xkIHRleHQtaW5kaWdvLTYwMCB1cHBlcmNhc2VcIj5SaWRlIHRoZSBGdXR1cmU8L3A+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTFcIj5QbG90IDE4LCBGaWZ0aCBTZXR0bGVtZW50LCBOZXcgQ2Fpcm8sIEVneXB0PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodCBmb250LW1vbm8gdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgYmctc2xhdGUtNTAgcC0yIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS0xMDAgbGVhZGluZy10aWdodFwiPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtc2xhdGUtODAwXCI+U1BFQyBTVU1NQVJZPC9wPlxuICAgICAgICAgICAgICAgICAgPHA+Q0xBU1M6IHtiaWtlLmNhdGVnb3J5TmFtZS50b1VwcGVyQ2FzZSgpfTwvcD5cbiAgICAgICAgICAgICAgICAgIDxwPllFQVIgQ09ERTogMjAyNi1TWVM8L3A+XG4gICAgICAgICAgICAgICAgICA8cD5TVEFUVVM6IFZFUklGSUVEPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogVGl0bGUgU2VjdGlvbiAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMgbWItOFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTMgcHktMSBiZy1pbmRpZ28tNTAgdGV4dC1pbmRpZ28tNzAwIHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICBURUNITklDQUwgU1BFQ0lGSUNBVElPTiBCUk9DSFVSRVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC0zeGwgZm9udC1ibGFjayB0ZXh0LXNsYXRlLTkwMCB0cmFja2luZy10aWdodCB1cHBlcmNhc2UgbGVhZGluZy10aWdodCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICB7YmlrZS5uYW1lfVxuICAgICAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkIGl0YWxpYyB0ZXh0LWluZGlnby02MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICBcIntiaWtlLnRhZ2xpbmV9XCJcbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBQaG90byByZXByZXNlbnRhdGlvbiBpbiBjYXRhbG9nICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLTU2IGJnLXNsYXRlLTUwIHJvdW5kZWQteGwgbWItOCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBwLTQgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuIGdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMiBsZWZ0LTIgcHgtMiBweS0wLjUgYmctc2xhdGUtMjAwIHRleHQtc2xhdGUtNjAwIHRleHQtWzlweF0gZm9udC1tb25vIHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICAgIEhPTE9HUkFQSElDIFZFQ1RPUiBFTUJFRFxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHNyYz17YmlrZS5pbWFnZX1cbiAgICAgICAgICAgICAgICAgIGFsdD17YmlrZS5uYW1lfVxuICAgICAgICAgICAgICAgICAgcmVmZXJyZXJQb2xpY3k9XCJuby1yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgb2JqZWN0LWNvbnRhaW4gZmlsdGVyIGdyYXlzY2FsZSBzYXR1cmF0ZS01MCBjb250cmFzdC0xMjVcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTcGVjcyBkZXRhaWxlZCBncmlkICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCBtYi04XCI+XG4gICAgICAgICAgICAgICAgPGg1IGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTgwMCB0cmFja2luZy13aWRlciB1cHBlcmNhc2UgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMCBwYi0xXCI+XG4gICAgICAgICAgICAgICAgICAxLiBQUk9QVUxTSU9OICYgRU5HSU5FUyBNQVRSSVhcbiAgICAgICAgICAgICAgICA8L2g1PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAteS0yIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBib3JkZXItYiBib3JkZXItc2xhdGUtMTAwIHB5LTEuNSBqdXN0aWZ5LWJldHdlZW4gcHItM1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBmb250LW1lZGl1bVwiPkNvcmUgRHJpdmUgRW5naW5lOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTgwMFwiPntiaWtlLnNwZWNzLmVuZ2luZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBib3JkZXItYiBib3JkZXItc2xhdGUtMTAwIHB5LTEuNSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgZm9udC1tZWRpdW1cIj5HdWFyYW50ZWVkIFRvcCBWZWxvY2l0eTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1zbGF0ZS04MDBcIj57YmlrZS5zcGVjcy50b3BTcGVlZH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBib3JkZXItYiBib3JkZXItc2xhdGUtMTAwIHB5LTEuNSBqdXN0aWZ5LWJldHdlZW4gcHItM1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBmb250LW1lZGl1bVwiPlBvd2VyIFJhdGluZyAvIFRvcnF1ZTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1zbGF0ZS04MDBcIj57YmlrZS5zcGVjcy5wb3dlcn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBib3JkZXItYiBib3JkZXItc2xhdGUtMTAwIHB5LTEuNSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgZm9udC1tZWRpdW1cIj5GdWVsIC8gRW5lcmd5IENvc3Q6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ib2xkIHRleHQtc2xhdGUtODAwXCI+e2Jpa2Uuc3BlY3MuZnVlbENvbnN1bXB0aW9ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc3Bhbi0yIGZsZXggYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTEwMCBweS0xLjUganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGZvbnQtbWVkaXVtXCI+TmV0IFZlaGljbGUgQ2hhc3NpcyBNYXNzOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTgwMFwiPntiaWtlLnNwZWNzLndlaWdodH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIExvbmcgRGVzY3JpcHRpb24gYW5kIEJyYW5kIFdhcnJhbnR5IHN1bW1hcnkgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIG1iLThcIj5cbiAgICAgICAgICAgICAgICA8aDUgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtODAwIHRyYWNraW5nLXdpZGVyIHVwcGVyY2FzZSBib3JkZXItYiBib3JkZXItc2xhdGUtMjAwIHBiLTFcIj5cbiAgICAgICAgICAgICAgICAgIDIuIERFU0lHTiBPQkpFQ1RJVkVTICYgQ09SRSBVVElMSVRZXG4gICAgICAgICAgICAgICAgPC9oNT5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNjAwIGxlYWRpbmctcmVsYXhlZCBmb250LXNhbnNcIj5cbiAgICAgICAgICAgICAgICAgIHtiaWtlLmxvbmdEZXNjfVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEd1YXJhbnRlZXMgcm93IGluIGdyaWQgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNCBtdC00IHAtNCBiZy1zbGF0ZS01MCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMTAwIHRleHQteHMgdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxTaGllbGQgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWluZGlnby02MDAgc2hyaW5rLTAgbXQtMC41XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCBibG9jayB0ZXh0LXNsYXRlLTgwMFwiPjMtWWVhciBDeWJlciBXYXJyYW50ZWU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkd1YXJhbnRlZXMgY29tcGxldGUgc3RhdGUtb2YtdGhlLWFydCBwb3dlciBwYWNrIHJlcGxhY2VtZW50cy48L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxCYWRnZUNoZWNrIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1pbmRpZ28tNjAwIHNocmluay0wIG10LTAuNVwiIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgYmxvY2sgdGV4dC1zbGF0ZS04MDBcIj5Ib2xvZ3JhcGhpYyBUZWxlbWV0cnk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkZ1bGx5IHN5bmNlZCB0ZWxlbWV0cnkgdGVsZW1ldHJ5IHN5c3RlbSB3aXRoIGxlZ2FsIEhVRCBkaXNwbGF5IGxpbmsuPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIERvY3VtZW50IEZvb3RlciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTIwMCBwdC01IG10LTggZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICA8c3Bhbj5FTEtIT0xZIE1PVE9SUyBJTkMuIDIwMjY8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPlBBR0UgMSBPRiAxIFNQRUMgU0hFRVQ8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtaW5kaWdvLTYwMCBmb250LWJvbGRcIj5TVEFNUCBTSUdORUQgT0ZGPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEZsb2F0aW5nIHByaW50IHNpbXVsYXRpb24gcHJvbXB0IGhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1bIzA3MEExMV0gcC00IHRleHQtY2VudGVyIHRleHQteHMgZm9udC1tb25vIGJvcmRlci10IGJvcmRlci13aGl0ZS9bMC4wOF0gdGV4dC1ncmF5LTUwMCBmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgcHgtNlwiPlxuICAgICAgICAgIDxzcGFuPiogU3BlY2lmaWNhdGlvbnMgbGlzdCByZXByZXNlbnRzIHNpbXVsYXRlZCAyMDI2IHRlY2huaWNhbCBndWlkZWxpbmVzLjwvc3Bhbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB3aW5kb3cucHJpbnQoKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtYnJhbmQtYWNjZW50IGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFByaW50ZXIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+UFJJTlQgVEhJUyBIT0xPR1JBUEhFPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9tb3Rp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