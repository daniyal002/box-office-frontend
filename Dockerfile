# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Установим зависимости
COPY package.json package-lock.json /app/
RUN npm install

# Копируем исходный код
COPY . /app

# Построим production билд
RUN npm run build

# Экспонируем порт
EXPOSE 3000

# Запускаем Next.js в режиме production
CMD ["npm", "run", "start"]