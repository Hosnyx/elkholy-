import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=905fa188"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=905fa188"; const createContext = __vite__cjsImport1_react["createContext"]; const useContext = __vite__cjsImport1_react["useContext"]; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import { TRANSLATIONS } from "/src/translations.ts";
const LanguageContext = createContext(void 0);
export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem("elkholy_lang");
    return saved === "ar" || saved === "en" ? saved : "ar";
  });
  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem("elkholy_lang", newLang);
  };
  const dir = lang === "ar" ? "rtl" : "ltr";
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);
  const t = (key, replacements) => {
    const section = TRANSLATIONS[lang];
    let text = section[key] || key;
    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, val]) => {
        text = text.replace(`{${placeholder}}`, String(val));
      });
    }
    return text;
  };
  return /* @__PURE__ */ jsxDEV(LanguageContext.Provider, { value: { lang, setLang, dir, t }, children: /* @__PURE__ */ jsxDEV("div", { dir, className: lang === "ar" ? "font-sans" : "font-sans", children }, void 0, false, {
    fileName: "/app/applet/src/context/LanguageContext.tsx",
    lineNumber: 52,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/context/LanguageContext.tsx",
    lineNumber: 51,
    columnNumber: 5
  }, this);
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxhbmd1YWdlQ29udGV4dC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFRSQU5TTEFUSU9OUyB9IGZyb20gJy4uL3RyYW5zbGF0aW9ucyc7XG5cbnR5cGUgTGFuZ3VhZ2UgPSAnYXInIHwgJ2VuJztcblxuaW50ZXJmYWNlIExhbmd1YWdlQ29udGV4dFByb3BzIHtcbiAgbGFuZzogTGFuZ3VhZ2U7XG4gIHNldExhbmc6IChsYW5nOiBMYW5ndWFnZSkgPT4gdm9pZDtcbiAgZGlyOiAncnRsJyB8ICdsdHInO1xuICB0OiAoa2V5OiBzdHJpbmcsIHJlcGxhY2VtZW50cz86IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IG51bWJlcj4pID0+IHN0cmluZztcbn1cblxuY29uc3QgTGFuZ3VhZ2VDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxMYW5ndWFnZUNvbnRleHRQcm9wcyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcblxuZXhwb3J0IGZ1bmN0aW9uIExhbmd1YWdlUHJvdmlkZXIoeyBjaGlsZHJlbiB9OiB7IGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICBjb25zdCBbbGFuZywgc2V0TGFuZ1N0YXRlXSA9IHVzZVN0YXRlPExhbmd1YWdlPigoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZWxraG9seV9sYW5nJyk7XG4gICAgcmV0dXJuIChzYXZlZCA9PT0gJ2FyJyB8fCBzYXZlZCA9PT0gJ2VuJyA/IHNhdmVkIDogJ2FyJykgYXMgTGFuZ3VhZ2U7XG4gIH0pO1xuXG4gIGNvbnN0IHNldExhbmcgPSAobmV3TGFuZzogTGFuZ3VhZ2UpID0+IHtcbiAgICBzZXRMYW5nU3RhdGUobmV3TGFuZyk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Vsa2hvbHlfbGFuZycsIG5ld0xhbmcpO1xuICB9O1xuXG4gIGNvbnN0IGRpciA9IGxhbmcgPT09ICdhcicgPyAncnRsJyA6ICdsdHInO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRpciA9IGRpcjtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyA9IGxhbmc7XG4gIH0sIFtsYW5nLCBkaXJdKTtcblxuICBjb25zdCB0ID0gKGtleTogc3RyaW5nLCByZXBsYWNlbWVudHM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBudW1iZXI+KTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBzZWN0aW9uID0gVFJBTlNMQVRJT05TW2xhbmddIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gICAgbGV0IHRleHQgPSBzZWN0aW9uW2tleV0gfHwga2V5O1xuICAgIFxuICAgIGlmIChyZXBsYWNlbWVudHMpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKHJlcGxhY2VtZW50cykuZm9yRWFjaCgoW3BsYWNlaG9sZGVyLCB2YWxdKSA9PiB7XG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoYHske3BsYWNlaG9sZGVyfX1gLCBTdHJpbmcodmFsKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8TGFuZ3VhZ2VDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IGxhbmcsIHNldExhbmcsIGRpciwgdCB9fT5cbiAgICAgIDxkaXYgZGlyPXtkaXJ9IGNsYXNzTmFtZT17bGFuZyA9PT0gJ2FyJyA/ICdmb250LXNhbnMnIDogJ2ZvbnQtc2Fucyd9PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICA8L0xhbmd1YWdlQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUxhbmd1YWdlKCkge1xuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChMYW5ndWFnZUNvbnRleHQpO1xuICBpZiAoIWNvbnRleHQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZUxhbmd1YWdlIG11c3QgYmUgdXNlZCB3aXRoaW4gYSBMYW5ndWFnZVByb3ZpZGVyJyk7XG4gIH1cbiAgcmV0dXJuIGNvbnRleHQ7XG59XG4iXSwibWFwcGluZ3MiOiJBQW1ETTtBQW5ETjtBQUFBO0FBQUE7QUFBQTtBQUtBLFNBQWdCLGVBQWUsWUFBWSxVQUFVLGlCQUFpQjtBQUN0RSxTQUFTLG9CQUFvQjtBQVc3QixNQUFNLGtCQUFrQixjQUFnRCxNQUFTO0FBRTFFLGdCQUFTLGlCQUFpQixFQUFFLFNBQVMsR0FBa0M7QUFDNUUsUUFBTSxDQUFDLE1BQU0sWUFBWSxJQUFJLFNBQW1CLE1BQU07QUFDcEQsVUFBTSxRQUFRLGFBQWEsUUFBUSxjQUFjO0FBQ2pELFdBQVEsVUFBVSxRQUFRLFVBQVUsT0FBTyxRQUFRO0FBQUEsRUFDckQsQ0FBQztBQUVELFFBQU0sVUFBVSxDQUFDLFlBQXNCO0FBQ3JDLGlCQUFhLE9BQU87QUFDcEIsaUJBQWEsUUFBUSxnQkFBZ0IsT0FBTztBQUFBLEVBQzlDO0FBRUEsUUFBTSxNQUFNLFNBQVMsT0FBTyxRQUFRO0FBRXBDLFlBQVUsTUFBTTtBQUNkLGFBQVMsZ0JBQWdCLE1BQU07QUFDL0IsYUFBUyxnQkFBZ0IsT0FBTztBQUFBLEVBQ2xDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQztBQUVkLFFBQU0sSUFBSSxDQUFDLEtBQWEsaUJBQTJEO0FBQ2pGLFVBQU0sVUFBVSxhQUFhLElBQUk7QUFDakMsUUFBSSxPQUFPLFFBQVEsR0FBRyxLQUFLO0FBRTNCLFFBQUksY0FBYztBQUNoQixhQUFPLFFBQVEsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDLGFBQWEsR0FBRyxNQUFNO0FBQzNELGVBQU8sS0FBSyxRQUFRLElBQUksV0FBVyxLQUFLLE9BQU8sR0FBRyxDQUFDO0FBQUEsTUFDckQsQ0FBQztBQUFBLElBQ0g7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQ0UsdUJBQUMsZ0JBQWdCLFVBQWhCLEVBQXlCLE9BQU8sRUFBRSxNQUFNLFNBQVMsS0FBSyxFQUFFLEdBQ3ZELGlDQUFDLFNBQUksS0FBVSxXQUFXLFNBQVMsT0FBTyxjQUFjLGFBQ3JELFlBREg7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUVBLEtBSEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUlBO0FBRUo7QUFFTyxnQkFBUyxjQUFjO0FBQzVCLFFBQU0sVUFBVSxXQUFXLGVBQWU7QUFDMUMsTUFBSSxDQUFDLFNBQVM7QUFDWixVQUFNLElBQUksTUFBTSxvREFBb0Q7QUFBQSxFQUN0RTtBQUNBLFNBQU87QUFDVDsiLCJuYW1lcyI6W119