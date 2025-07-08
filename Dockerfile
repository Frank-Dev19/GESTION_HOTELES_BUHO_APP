# Etapa 1: Construcción
FROM node:18 as build-stage

WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# Etapa 2: Servidor estático
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
