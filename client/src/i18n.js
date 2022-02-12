import { Description } from "@material-ui/icons";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        Events: "Events",
        
        Balance: "Balance",
        
        
        "Confirmation email was sent to": "Confirmation email was sent to",
        Confirm: "Confirm email",

        Dashboard: "Dashboard",

        
        "invitation added": "Invitation added",
        "Registration Confirmation": "Registration Confirmation",
        "regard added": "New donuts has been bought",
        "name has been taken": "NAME HAS BEEN TAKEN",
        "Log in": "Log in",
        Sign_In: "Sign In",
        Sign_Up: "Sign Up",
        "Recover password": "Recover password",

        //CONSTS
        CONST_GREETINGS:
          "Fast and simple way to   encourage your colleagues and thank them for their patience and help.",
      },
    },
    ru: {
      translations: {
        //CONSTS
        CONST_GREETINGS:
          "Простой и быстрый способ поблагодарить ваших коллег за отличную работу.",
        //A
        Account: "Аккаунт",
        Amount: "Количество",
        Add: "Добавить",
        Activate: "Активировать",
        Active: "Активен",
        "Already used regards": "Уже использованные награды",
        "Activate regard code": "Активация кода награды",
        "Already activated": "Уже активировано",
        "Accepted requests": "Активированные запросы",
        "All users": "Все пользователи",
        //B
        "Back to store": "Назад в магазин",
        Balance: "Баланс",
        Buy: "Купить",
        "Burn old points": "Списывать неиспользованные баллы",
        "Burn old donuts": "Списывать неиспользованные пончики",

        //C
        Cancel: "Отмена",
        Caption: "Название",
        Change: "Изменить",
        "Can not be empty": "Не может быть пустым",
        "Change password": "Сменить пароль",
        Confirm: "Подтвердить почтовый адрес",
        "Confirmation dialog": "Подтверждение",
        "Confirmation email was sent to":
          "Подтвердите адрес электронной почты ",
        "Confirm your email first":
          "Для продолжнеия подтвердите адрес электронной почты ",
        "Connect to space": "Присоединиться к пространству",
        code: "код",
        Comment: "Комментарий",
        "Comment saved": "Комментарий сохранен",
        "Click to select files": "Нажмите, чтобы выбрать фото",
        "Closed requests":"Завершенные запросы",
        Close: "Закрыть",
        created: "создан(а)",

        //D
        department: "подразделение",
        "Day of month": "День месяца",
        DEMO: "Демо",
        Dashboard: "Лента",
        Delete: "Удалить",
        "delivery days": "через сколько дней будет",
        Departments: "Отделы",
        Department: "Отдел",
        Description: "Описание",
        Details: "Подробнее",
        "department chief": "руководитель подразделения",
        "Distrib account": "Могу отдать",
        "Donut name": "Название плюшки",
        "Donut added": "Пончик добавлен",
        "Share donuts": "Перевести пончики",
        Donut: "Пончик",
        Donuts: "Пончики",
        "Donut description": "Описание пончика",
        donuts: "пончики",
        donut_0: "пончик",
        donut_1: "пончика",
        donut_2: "пончиков",
        "Domain not found": "Не найден почтовый домен",
        Domain: "Домен",

        //E
        Edit: "Редактировать",
        "Edit donut": "Редактировать пончик",
        "Error while updating": "Ошибка во время обновления",
        Events: "События",
        "Expiration date": "Дата окончания",

        //F
        forbidden: "запрещено",
        for: "для",
        from: "от",
        //G
        "Go to shop": "В магазин",
        "Go to": "Перейти",
        Goods: "Товары",

        //H
        History: "История",
        Home: "Главная",
        "How many points do you want to send":"Сколько баллов вы хотите отправить",
        "How many donuts do you want to send":"Сколько пончиков вы хотите отправить",
        "Hide snow": "Убрать снег",

        //I
        "Incoming requests": "Входящие запросы",
        "invitation added": "Приглашение отправлено",
        //J
        Join: "Присоединиться",

        //K

        //L
        "Log in": "Войти",
        "Log Out": "Выйти",

        //M
        "Max donuts": "Макисмальное количество пончиков",
        message: "сообщение",
        "My Requests": "Мои запросы",
        "My spaces": "Мои команды",
        "My teams": "Мои команды",
        More: "Ещё",
        //N
        "new password": "новый пароль",
        "New points for all users": "Новые баллы для всех пользователей",
        Name: "Имя",
        "name has been taken": "Имя уже занято",
        name: "название",
        "New item": "Новый элемент",
        "newest":"самые новые",
        "Next": "Вперед",

        //O
        "on stock":"в наличии",
        "Only you can see it": "Только вы это видите",
        //P
        Page: "Страница",
        People: "Сотрудники",
        "Please confirm your email": "Пожалуйста, подтвердите почтовый адрес",
        points: "баллы",
        point_0: "балл",
        point_1: "балла",
        point_2: "баллов",
        position: "должность",
        Position: "Должность",
        Plugins:"Плагины",
        Price: "Цена",
        "price asc": "сначала самые дешевые",
        "price desc": "сначала самые дорогие",
        Profile: "Профиль",
        pts: "$",
        place: "место",
        Previous: "Назад",
        Purchase: "Покупка",
        //Q

        //R
        "regard added": "Покупка успешно совершена",
        "Registration Confirmation": "Подтверждение регистрации",
        "Recover password": "Восстановить пароль",
        "Requests in progress": "Запросы в работе",
        Refund: "Возврат",
        Required: "Обязательное поле",
        Requests: "Запросы",
        Register: "Зарегистрировать",
        Remove: "Удалить",
        records: "записей",
        "Refresh or activate":"Обновить или активировать",
        Rollback: "Вернуть",
        rows: "строк",
        //S
        saved: "сохранено",
        "Save changes": "Сохранить изменения",
        "Self account": "Могу потратить",
        Search: "Поиск",
        Share: "Поделиться",
        "Share dialog": "Окно подарков",
        "Show only mine": "Показывать только мои",
        "Show snow": "Включить снег",
        "sort by alphabet": "сортировать по алфавиту",
        "Store item": "Элемент магазина",
        Send: "Отправить",
        "Send to all": "Отправить всем",
        "Send again": "Отправить еще раз",
        "Select image": "Выбрать картинку",
        Settings: "Настройки",
        Schedule: "Расписание",
        Schedulers:"Расписания",
        Sign_In: "Войти",
        Sign_Up: "Регистрация",
        Statistic: "Статистика",
        "start typing": "начните ввод",
        Store: "Магазин",
        "Store admin": "Администратор магазина",
        "Something went wrong.": "Что-то пошло не так.",
        Surname: "Фамилия",
        "Submit values": "Отправить",

        //T
        "Team settings": "Настройки команды",
        "Teams I can join":"Команды, к которым могу присоединиться",
        //U
        "Update donut":"Обновить пончик",
        "Update": "Обновить",
        "Update is available": "Обновление доступно",
        //V

        //W
        "Welcome points": "Приветственные баллы",
        "Welcome donutss": "Приветственные пончики",
        "Without depratment": "Без подразделения",
        "Wrong credetialis": "Не удалось войти с этим именем и паролем",
        "Withdrawl error. Not enough points": "Ошибка. Недостаточно баллов",
        //X

        //Y
        "you have to be admin": "Вы должны иметь полномочия администратора",
        "You have successfully bought a new donut": "Вы успешно купили плюшку",
        "your comment": "ваш комментарий",
        //Z
      },
    },
  },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ",",
  },

  react: {
    wait: true,
  },
});

export default i18n;
