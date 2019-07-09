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
                "Activate": "Активировать",
                "Already used regards": "Уже использованные награды",
                "Activate regard code":"Активация кода награды",
                "Already activated": "Уже активировано",
                "All users":"Все пользователи",
                //B
                "Balance": "Баланс",

                //C
                "Change password" :"Сменить пароль",
                "Confirm": "Подтвердить почтовый адрес",
                "Confirmation email was sent to": "Подтвердите адрес электронной почты ",
                "code": "код",
                "Close":"Закрыть",

                //D
                "department": "подразделение",
                "Dashboard": "Лента",
                "Delete": "Удалить",
                "Departments": "Подразделения",
                "Department": "Подразделение",
                "Details": "Подробнее",
                "Distrib account": "Могу отдать",
                "Donut name": "Название приза",

                //E
                "Edit": "Редактирвоать",
                'Error while updating': 'Ошибка во время обновления',
                "Events": "События",
                "Expiration date": "Дата окончания",


                //F
                "forbidden": "запрещено",
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
                "Log Out": "Выйти",


                //M
                "message": "сообщение",
                "My regards": "Мои награды",
                //N
                "new password": "новый пароль",
                "New points for all users":"Новые баллы для всех пользователей",
                "Name": "Имя",

                //O
                "Only you can see it": "Только вы это видите",
                //P
                "People":"Сотрудники",
                "points": "баллы",
                "point_0": "балл",
                "point_1": "балла",
                "point_2": "баллов",
                "position":"должность",
                "Position":"Должность",
                "Price":"Цена",
                //Q

                //R
                "Registration Confirmation": "Подтверждение регистрации",
                "Recover password":"Восстановить пароль",
                "Regards i can use": "Награды, которые могу использовать",
                'Regard activated': "Награда активирована",
                

                //S
                "Save changes": "Сохранить изменения",
                "Self account":"Могу потратить",
                "Share": "Поделиться",
                "Share dialog": "Окно подарков",
                "Store item": "Элемент магазина",
                "Send to all": "Отправить всем",
                "Settings": "Настройки",
                "Store":"Магазин",
                "Surname": "Фамилия",

                //T

                //U

                //V

                //W
                "Without depratment":"Без подразделения",
                'Wrong credetialis': 'Не удалось войти с этим именем и паролем',
                //X

                //Y
                'you have to be admin': 'Вы должны иметь полномочия администратора',
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
