# [Mesto](https://mestamno.ga/)
## EN
[на русском](#ru)

_v3.1.0 &ndash; added validation with celebrate_

Mesto is a single page project, part of sprints 13, 14 and 15 in [Yandex.Praktikum](https://praktikum.yandex.ru/profile/web-developer/) study program.
It's an interactive web page for sharing pictures with short titles.
This project focuses on Mesto's back end. Here Node.js meets Exress.js and a database on MongoDB via Mongoose. 
JWT tokens are stored in http request cookies.
Server-side validation is handled with celebrate library, requests and errors are logged with winston.

## Availability

Front end part of this web site may be found here: https://mestamno.ga/
Back end API: https://api.mestamno.ga/
Public back end server IP address: https://84.201.133.185/

### How to start using it locally:

    Clone this repository

$> git clone https://github.com/paninebaluy/mesto-back-end

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

    The webpage will open in your default browser using port 3000 as default: https://api.mestamno.ga/ 

It's way more convenient to test routing scenarios using [Postman](https://www.postman.com/).

#### Back end part of the project includes routing with Express.js + Node.js, and is connected to mestodb database on MongoDB via Mongoose
##### Here's what you can do:

+ Create new user: **POST** https://api.mestamno.ga/signup *(request body must contain fields: name (str, 2-30 symbols), about (str, 2-30 symbols), avatar (url), email, password (>= 8 symbols))*
+ Login: **POST** https://api.mestamno.ga/signin *(request body must contain fields: email, password (>= 8 symbols))*
  |the following actions are available only for authorized users     
+ Get a JSON with all users from DB: **GET** https://api.mestamno.ga/users
+ Get a JSON with all cards: **GET** https://api.mestamno.ga/cards
+ Get a JSON with data of a specific user: **GET** https://api.mestamno.ga/users/id
+ Create a new card: **POST** https://api.mestamno.ga/cards *(request body must contain fields: name (str, 2-30 symbols), link (url))*
+ Delete card, if current user created it: **DELETE** https://api.mestamno.ga/cards/id
+ Update current user's profile: **PATCH** https://api.mestamno.ga/users/me *(request body must contain one or more of fields: name (str, 2-30 symbols), about (str, 2-30 symbols), avatar (url))*
+ Update current user's avatar: **PATCH** https://api.mestamno.ga/users/me/avatar *(request body must contain field: avatar (url))*
+ Add a like to card (added only once): **PUT** https://api.mestamno.ga/cards/:cardId/likes
+ Remove your like from card: **DELETE** https://api.mestamno.ga/cards/:cardId/likes

### Technology used
+ Node.js
+ Express.js
+ MongoDB
+ Mongoose
+ HTML 5
+ CSS
+ Vanilla JS

[To top/Наверх](#Mesto)

# [Mesto](https://mestamno.ga/)
## RU

_v3.1.0 добавлена валидация при помощи celebrate_

Место &mdash; одностраничный проект, созданный в рамках 13-го, 14-го и 15-го спринтов учебной программы [Яндекс.Практикума](https://praktikum.yandex.ru/profile/web-developer/). Это интерактивный сайт, пользователи которого могут делиться изображениями с кратким названием.
Этот проект сосредоточен на бэкенде сайта, где роутинг реализован на Node.js и Exress.js, а также подключена база данных на MongoDB посредством Mongoose.
JWT-токен хранится в http-куках запроса. 
Серверная валидация обрабатывается библиотекой celebrate, логи запросов и ошибок записываются при помощи winston.

## Доступность

Фронтенд с сайтом находится по адресу: https://mestamno.ga/
Бэкенд и API доступны: https://api.mestamno.ga/
Публичный IP-адрес бэкенд-сервера: https://84.201.133.185/

### Как запустить его локально

    Клонировать репозиторий

$> git clone https://github.com/paninebaluy/mesto-back-end

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

    Сайт будет доступен по адресу https://api.mestamno.ga/ (порт 3000 используется по умолчанию).

Для проверки запросов рекомендую использовать [Postman](https://www.postman.com/).
   
#### В бэкенд-части проекта реализованы роутинг на Express.js + Node.js, а также подключение к базе данных mestodb database на MongoDB через Mongoose
##### Вот что здесь можно делать:

+ Зарегистрировать нового пользователя: **POST** https://api.mestamno.ga/signup *(запрос должен содержать поля: name (str, 2-30 символов), about (str, 2-30 символов), avatar (url), email, password (>= 8 символов))*
+ Залогиниться: **POST** https://api.mestamno.ga/signin *(запрос должен содержать поля: email, password (>= 8 символов))*
  | следующие действия доступны только для авторизованных пользователей
+ Получить JSON со всеми пользователями из базы данных: **GET** https://api.mestamno.ga/users
+ Получить JSON со всеми карточками: **GET** https://api.mestamno.ga/cards
+ Получить JSON с данными конкретного пользователя: **GET** https://api.mestamno.ga/users/id
+ Создать карточку: **POST** https://api.mestamno.ga/cards *(запрос должен содержать поля: name (str, 2-30 символов), link (url))*
+ Удалить карточку, если её создал текущий пользователь: **DELETE** https://api.mestamno.ga/cards/id
+ Обновить профиль текущего пользователя: **PATCH** https://api.mestamno.ga/users/me *(запрос должен содержать одно или несколько ищ полей: name (str, 2-30 символов), about (str, 2-30 символов), avatar (url))*
+ Обновить аватар текущего пользователя: **PATCH** https://api.mestamno.ga/users/me/avatar *(запрос должен содержать поле: avatar (url))*
+ Лайкнуть карточку (добавляет лайк от пользователя только один раз): **PUT** https://api.mestamno.ga/cards/:cardId/likes
+ Удалить свой лайк с карточки: **DELETE** https://api.mestamno.ga/cards/:cardId/likes

### Использованные технологии
+ Node.js
+ Express.js
+ MongoDB
+ Mongoose
+ HTML 5
+ CSS
+ Vanilla JS

[To top/Наверх](#Mesto)
