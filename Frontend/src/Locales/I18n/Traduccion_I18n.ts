import i18n from 'i18next'
import es from '../Spanish.json'
import en  from '../English.json'
import {initReactI18next} from 'react-i18next'


i18n.use(initReactI18next).init({
  resources: { // los  paquetes que existen
    en: { translation: en },
    es: { translation: es },
  },
  lng: localStorage.getItem("pawkon-lang") || "en", // recuerda el idioma elegido
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React ya escapa por defecto
  },
})


export default i18n