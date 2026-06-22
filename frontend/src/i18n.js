import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        menu: "Food Menu",
        cart: "Cart",
        orders: "My Orders",
        admin: "Admin",
        login: "Login",
        addToCart: "Add To Cart",
      },
    },
    ar: {
      translation: {
        menu: "قائمة الطعام",
        cart: "السلة",
        orders: "طلباتي",
        admin: "لوحة التحكم",
        login: "تسجيل الدخول",
        addToCart: "أضف إلى السلة",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;