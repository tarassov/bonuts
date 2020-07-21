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
                "Recover password":"Recover password",

                //CONSTS 
                "CONST_GREETINGS":     "Fast and simple way to   encourage your colleagues and thank them for their patience and help."
            }
        },
        ru: {
            translations: {
                //CONSTS
                "CONST_GREETINGS": "Простой и быстрый способ поблагодарить ваших коллег за отличную работу.",
                //A
                "Account": "Аккаунт",
                "Add": "Добавить",
                "Activate": "Активировать",
                "Already used regards": "Уже использованные награды",
                "Activate regard code":"Активация кода награды",
                "Already activated": "Уже активировано",
                "Activated requests" : "Активированные запросы",
                "All users":"Все пользователи",
                //B
                "Balance": "Баланс",
                "Buy": "Купить",
                "Burn old points":"Списать неиспользованных баллов",

                //C
                "Cancel": "Отмена",
                "Caption":"Название",
                "Can not be empty":"Не может быть пустым",
                "Change password" :"Сменить пароль",
                "Confirm": "Подтвердить почтовый адрес",
                "Confirmation email was sent to": "Подтвердите адрес электронной почты ",
                "Confirm your email first": "Для продолжнеия подтвердите адрес электронной почты ",
                "Connect to space":"Присоединиться к пространству",
                "code": "код",
                "Comment":"Комментарий",
                "Comment saved":"Комментарий сохранен",
                "Click to select files": "Нажмите, чтобы выбрать фото",
                "Close":"Закрыть",
                "created": "создан(а)",

                //D
                "department": "подразделение",
                "Day of month": "День месяца",
                "Dashboard": "Лента",
                "Delete": "Удалить",
                "Departments": "Отделы",
                "Department": "Отдел",
                "Details": "Подробнее",
                "department chief": "руководитель подразделения",
                "Distrib account": "Могу отдать",
                "Donut name": "Название плюшки",
                "Donut added": "Пончик добавлен",
                "Share donuts": "Перевести пончики",
                "Donuts":"Гайки и плюшки",
                "donuts": "пончики",
                "donut_0": "пончик",
                "donut_1": "пончика",
                "donut_2": "пончиков",                
                "Domain not found": "Не найден почтовый домен",
                "Domain": "Домен",

                //E
                "Edit": "Редактировать",
                'Error while updating': 'Ошибка во время обновления',
                "Events": "События",
                "Expiration date": "Дата окончания",


                //F
                 "forbidden": "запрещено",
                 "for": "для",
                 "from": "от",
                //G
                "Go to shop": "Магазин",
                "Goods": "Товары",

                //H
                "History":"История",
                "Home": "Главная",

                //I
                "Incoming requests": "Входящие запросы",
                //J

                //K

                //L
                "Log in": "Войти",
                "Log Out": "Выйти",
                


                //M
                "Max donuts":"Макисмальное количество пончиков",
                "message": "сообщение",
                "My regards": "Мои награды",
                "More":"Ещё",
                //N
                "new password": "новый пароль",
                "New points for all users":"Новые баллы для всех пользователей",
                "Name": "Имя",
                "name": "название",

                //O
                "Only you can see it": "Только вы это видите",
                //P
                "People":"Сотрудники",
                "Please confirm your email":"Пожалуйста, подтвердите почтовый адрес",
                "points": "баллы",
                "point_0": "балл",
                "point_1": "балла",
                "point_2": "баллов",
                "position":"должность",
                "Position":"Должность",
                "Price":"Цена",
                "Profile":"Профиль",
                "pts": "$",
                "place":"место",
                "Purchase": "Покупка",
                //Q

                //R
                "Registration Confirmation": "Подтверждение регистрации",
                "Recover password":"Восстановить пароль",
                "Regards i can use": "Награды, которые могу использовать",
                'Regard activated': "Награда активирована",
                'Required': 'Обязательное поле',
                'Requests':'Запросы',
                

                //S
                "saved":"сохранено",
                "Save changes": "Сохранить изменения",
                "Self account":"Могу потратить",
                "Share": "Поделиться",
                "Share dialog": "Окно подарков",
                "Show only mine": "Показывать только мои",
                "Store item": "Элемент магазина",
                "Send":"Отправить",
                "Send to all": "Отправить всем",
                "Send again": "Отправить еще раз",
                "Settings": "Настройки",
                "Schedule": "Расписание",
                "Statistic": "Статистика",
                "start typing": "начните ввод",
                "Store":"Магазин",
                "Store admin": "Администратор магазина",
                "Something went wrong.":"Что-то пошло не так.",
                "Surname": "Фамилия",

                //T
                 "Team settings":"Настройки команды"   ,
                //U

                //V

                //W
                "Without depratment":"Без подразделения",
                'Wrong credetialis': 'Не удалось войти с этим именем и паролем',
                "Withdrawl error. Not enough points" : "Ошибка. Недостаточно баллов",
                //X

                //Y
                'you have to be admin': 'Вы должны иметь полномочия администратора',
                "You have successfully bought a new donut":"Вы успешно купили плюшку",
                "your comment": "ваш комментарий",
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
