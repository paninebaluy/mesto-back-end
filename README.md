# Mesto
## EN
[на русском](#ru)

_v2.0.2 - updated route format, fixed syntax_

Mesto is a single page project, part of sprint 12 in [Yandex.Praktikum](https://praktikum.yandex.ru/profile/web-developer/) study program.
It's an interactive web page for sharing pictures with short titles.

### How to start using it locally:

    Clone this repository

$> git clone https://github.com/paninebaluy/praktikum12

    Run script that starts the local server

$> npm run start

    The webpage will open in your default browser using port 3000 as default: http://localhost:3000/ 

### Front end pat of the project includes
1. A profile section with user's name and information, as well as a changeable avatar (for now, it may be changed with a function only).
2. A popup with form for changing user data.
3. A popup with form for adding custom cards.
4. Cards downloaded from the server. Cards can be:
  +  liked/unliked
  +  deleted (only cards created by user)

Changes made to user info and card list are immediately committed to server.
Pictures on cards may be opened and4854 6301 5854 6906
11:57
 closed as separate popups (one at a time).

#### Backend part of the project includes routing with Express.js

+ Root of the web site: http://localhost:3000/
+ JSON with all users: http://localhost:3000/users
+ JSON with all cards: http://localhost:3000/cards
+ JSON with data of specific user: http://localhost:3000/users/id (user id needs to be taken from JSON http://localhost:3000/users)
+ Non-existent pages return an error message and status code 404. Non-existent user pages (e.g. /users/invalidId) return a different error message.

### Technology used
+ Node.js
+ Express.js
+ Native JS
+ HTML
+ CSS
+ Git
+ Webpack
+ GitHub Pages

### This web site on GH Pages (front end only)
https://paninebaluy.github.io/praktikum12/

### Further plans
+ Create a popup with a form for loading an avatar picture to server (API function ready)

[To top/Наверх](#Mesto)

# Mesto
## RU

_v2.0.2 - исправлен роутинг, добавлены изменения в синтаксисе для соответствия стилю linter/airbnb_

Место &mdash; одностраничный проект, созданный в рамках спринта 12-й учебной программы [Яндекс.Практикума](https://praktikum.yandex.ru/profile/web-developer/).
Это интерактивный сайт, пользователи которого могут делиться изображениями с кратким названием.

### Как запустить его локально

    Клонировать репозиторий

$> git clone https://github.com/paninebaluy/praktikum12

    Запустить скрипт запуска сервера

$> npm run start

    Сайт будет доступен по адресу http://localhost:3000/ (порт 3000 используется по умолчанию)
   
### Фронтенд-часть проекта имеет такие возможности
1. Профиль пользователя с именем и информацией, а также аватаром, который можно менять (пока лишь функцией).
2. Попап с формой для изменения данных о пользователе. 
3. Попап с формой для добавления собственной карточки на сервер. 
4. Карточки, загруженные с сервера. Их можно:
  +  лайкать/снимать лайк
  +  удалять (но только те карточки, которые загрузил сам пользователь)


Изменения в профиле и в карточках (добавление, удаление, лайк) сразу поступают на сервер.
Картинки в карточках можно открывать и закрывать как отдельные попапы (по одной).

#### Бэкендовая часть проекта включает роутинг, реализованный на Express.js

+ По адресу http://localhost:3000/ доступен корень сайта.
+ По адресу http://localhost:3000/users возвращается JSON с пользователями.
+ По адресу http://localhost:3000/cards возвращается JSON с карточками.
+ По адресу http://localhost:3000/users/id (использовать id пользователя из JSON http://localhost:3000/users) возвращается JSON с данными конкретного пользователя
+ По несуществующем адресу возвращается статус-код 404 и сообщение об ошибке, по адресу с несуществующим id пользователя возвращается другое сообщение об ошибке и статус-код 404.

### Использованные технологии
+ Node.js
+ Express.js
+ Нативный JS
+ HTMLEditing praktikum12_README.md at develop-webpack · paninebaluy_praktikum12
+ CSS
+ Git
+ Webpack
+ GitHub Pages

### Ссылка на сайт на GH-Pages (только фронтенд)
https://paninebaluy.github.io/praktikum12/

### Ближайшие планы
+ Сверстать попап с формой для загрузки изображения для аватара (готова функция в классе API).

[To top/Наверх](#Mesto)
