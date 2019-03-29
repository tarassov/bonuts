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
                "Confirm": "Confirm email",
                "Registration Confirmation": "Registration Confirmation",
                "Log in": "Log in",
                "Recover password":"Recover password"
            }
        },
        ru: {
            translations: {
                //A
                "Account": "Аккаунт",
                "Add": "Добавить",

                //B
                "Balance": "Баланс",

                //C
                "Change password" :"Сменить пароль",
                "Confirm": "Подтвердить почтовый адрес",
                "Confirmation email was sent to": "Подтвердите адрес электронной почты ",

                //D
                "Dashboard": "Лента",
                "Delete": "Удалить",
                "Details": "Подробнее",
                "Distrib account": "Могу отдать",
                "Donut name": "Название приза",

                //E
                "Edit": "Редактирвоать",
                "Events": "События",
                "Expiration date": "Дата окончания",


                //F

                //G
                "Go to shop": "Магазин",
                "Goods": "Товары",

                //H
                "Home": "Главная",

                //I

                //J

                //K

                //L
                "Log in": "Войти",


                //M

                //N
                "new password": "новый пароль",

                //O

                //P
                "point_0": "балл",
                "point_1": "балла",
                "point_2": "баллов",
                "Price":"Цена",
                //Q

                //R
                "Registration Confirmation": "Подтверждение регистрации",
                "Recover password":"Восстановить пароль",

                //S
                "Self account":"Могу потратить",
                "Share": "Поделиться",
                "Share dialog": "Окно подарков",
                "Store item": "Элемент магазина",

                //T

                //U

                //V

                //W

                //X

                //Y

                //Z

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
