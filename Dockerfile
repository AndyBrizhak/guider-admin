FROM node:20.9.0-bullseye-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/.env /usr/share/nginx/html/.env
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]