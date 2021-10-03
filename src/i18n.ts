import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    debug: false,
    lng: getLanguageFromLocalStorage(),
    fallbackLng: ["us", "de"],

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

function saveLanguageToLocalStorage(key: string) {
  localStorage.setItem("language", key);
}

function getLanguageFromLocalStorage() {
  return localStorage.getItem("language") ?? "us";
}

export default i18n;

export { saveLanguageToLocalStorage };
