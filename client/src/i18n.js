import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    // we init with resources
    resources: {
        en: {
            translations: {
                "Events": "Events",
                "Balance": "Balance",
                "Dashboard": "Dashboard",
                "Confirmation email was sent to": "Confirmation email was sent to",
                "Confirm": "Confirm email"
            }
        },
        ru: {
            translations: {
                "Events": "События",
                "Balance": "Баланс",
                "Dashboard": "Лента",
                "Account": "Аккаунт",
                "Home": "Главная",
                "point_0": "балл",
                "point_1": "балла",
                "point_2": "баллов",
                "Share": "Поделиться",
                "Go to shop": "Магазин",
                "Details": "Подробнее",
                "Self account":"Могу потратить",
                "Distrib account": "Могу отдать",
                "Confirmation email was sent to": "Подтвердите адрес электронной почты ",
                "Confirm": "Подтвердить почтовый адрес"
            }
        }
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default i18n;
