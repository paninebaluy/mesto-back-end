# Mesto
## EN
[на русском](#ru)

_v1.2.0 &ndash; completed all required routing scenarios and error handling_

Mesto is a single page project, part of sprint 13 in [Yandex.Praktikum](https://praktikum.yandex.ru/profile/web-developer/) study program.
It's an interactive web page for sharing pictures with short titles.
This project focuses on Mesto's back end. Here Node.js meets Exress.js and a database on MongoDB via Mongoose. 

### How to start using it locally:

    Clone this repository

$> git clone https://github.com/paninebaluy/praktikum13

    Install dependencies

$> npm install

    Install [MongoDB community edition](https://docs.mongodb.com/manual/administration/install-community/) and run it:

$> mongod

_(Win)_
or

$> mongo

or

$> sudo systemctl start mongod

_(Linux and macOS)_

    Run script that starts the local server

$> npm run start

    The webpage will open in your default browser using port 3000 as default: http://localhost:3000/ 

It's way more convenient to test routing scenarios using [Postman](https://www.postman.com/).

#### Backend part of the project includes routing with Express.js + Node.js, and is connected to mestodb database on MongoDB via Mongoose
##### Here's what you can do:

+ Get root of the web site (it's a standalone frontend project for now, disconnected from back end I am developing): http://localhost:3000/
+ Get a JSON with all users from DB: **GET** http://localhost:3000/users
+ Get a JSON with all cards: **GET** http://localhost:3000/cards
+ Get a JSON with data of a specific user: **GET** http://localhost:3000/users/id
+ Create new user: **POST** http://localhost:3000/users *(request body must contain fields: name (str, 2-30 symbols), about (str, 2-30 symbols), avatar (url))*
+ Create a new card: **POST** http://localhost:3000/cards *(request body must contain fields: name (str, 2-30 symbols), link (url))*
+ Delete card, if current user created it: **DELETE** http://localhost:3000/cards/id
+ Update current user's profile: **PATCH** http://localhost:3000/users/me *(request body must contain one or more of fields: name (str, 2-30 symbols), about (str, 2-30 symbols), avatar (url))*
+ Update current user's avatar: **PATCH** http://localhost:3000/users/me/avatar *(request body must contain field: avatar (url))*
+ Add a like to card (added only once): **PUT** http://localhost:3000/cards/:cardId/likes
+ Remove your like from card: **DELETE** http://localhost:3000/cards/:cardId/likes

### Technology used
+ Node.js
+ Express.js
+ MongoDB
+ Mongoose
+ Native JS
+ HTML
+ CSS
+ Git
+ Webpack

[To top/Наверх](#Mesto)

# Mesto
## RU

_v1.2.0 &ndash; реализован роутинг для всех необходимых сценариев и обработка ошибок_

Место &mdash; одностраничный проект, созданный в рамках 13-го спринта учебной программы [Яндекс.Практикума](https://praktikum.yandex.ru/profile/web-developer/). Это интерактивный сайт, пользователи которого могут делиться изображениями с кратким названием.
Этот проект сосредоточен на бэкенде сайта, где роутинг реализован на Node.js и Exress.js, а также подключена база данных на MongoDB посредством Mongoose. 

### Как запустить его локально

    Клонировать репозиторий

$> git clone https://github.com/paninebaluy/praktikum13

    Установить зависимости

$> npm install

    Установить [MongoDB community edition](https://docs.mongodb.com/manual/administration/install-community/) и запустить

$> mongod

_(Win)_
или

$> mongo

или

$> sudo systemctl start mongod

_(Linux и macOS)_

    Вызвать скрипт запуска сервера

$> npm run start

    Сайт будет доступен по адресу http://localhost:3000/ (порт 3000 используется по умолчанию).

Для проверки запросов рекомендую использовать [Postman](https://www.postman.com/).
   
#### В бэкенд-части проекта реализованы роутинг на Express.js + Node.js, а также подключение к базе данных mestodb database на MongoDB через Mongoose
##### Вот что здесь можно делать:

+ Получить страницу в корне сайта (она пока не подключена к разрабатываемому бэкенду): http://localhost:3000/
+ Получить JSON со всеми пользователями из базы данных: **GET** http://localhost:3000/users
+ Получить JSON со всеми карточками: **GET** http://localhost:3000/cards
+ Получить JSON с данными конкретного пользователя: **GET** http://localhost:3000/users/id
+ Создать нового пользователя: **POST** http://localhost:3000/users *(запрос должен содержать поля: name (str, 2-30 символов), about (str, 2-30 символов), avatar (url))*
+ Создать карточку: **POST** http://localhost:3000/cards *(запрос должен содержать поля: name (str, 2-30 символов), link (url))*
+ Удалить карточку, если её создал текущий пользователь: **DELETE** http://localhost:3000/cards/id
+ Обновить профиль текущего пользователя: **PATCH** http://localhost:3000/users/me *(запрос должен содержать одно или несколько ищ полей: name (str, 2-30 символов), about (str, 2-30 символов), avatar (url))*
+ Обновить аватар текущего пользователя: **PATCH** http://localhost:3000/users/me/avatar *(запрос должен содержать поле: avatar (url))*
+ Лайкнуть карточку (добавляет лайк от пользователя только один раз): **PUT** http://localhost:3000/cards/:cardId/likes
+ Удалить свой лайк с карточки: **DELETE** http://localhost:3000/cards/:cardId/likes

### Использованные технологии
+ Node.js
+ Express.js
+ MongoDB
+ Mongoose
+ Нативный JS
+ HTMLEditing praktikum12_README.md at develop-webpack · paninebaluy_praktikum12
+ CSS
+ Git
+ Webpack

[To top/Наверх](#Mesto)
