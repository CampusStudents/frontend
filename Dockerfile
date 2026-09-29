FROM node:24.13.0-alpine AS build

WORKDIR /app

ENV HUSKY=0

COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY . .

ARG VITE_API_URL=http://localhost
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM nginx:1.27-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
