# === 1. Build stage ===
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# === 2. Deploy stage (Nginx) ===
FROM nginx:alpine

# Удаляем дефолтный конфиг
RUN rm /etc/nginx/conf.d/default.conf

# Копируем свой
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем билд фронтенда
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
