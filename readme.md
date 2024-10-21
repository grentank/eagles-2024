# Подготовка к лекции по авторизации

## Как запустить

1. Выполни установку зависимостей в папках `client` и `server`
2. Заполни переменные окружения `.env` на сервере на основе файла `.env.example`
   1. Можно заполнить DB_USER, DB_PASS, DB_NAME, DB_HOST
   2. Можно также заполнить только DB_URL
3. Накати миграции и сиды
4. Запусти клиент через `npm run dev` и сервер через `npm run dev`

Обязательно изучи компоненты, страницы и разметку на клиенте. Загляни в модели, миграции и
роуты на сервере. Возникшие вопросы либо спроси ChatGPT, либо уточни на лекции