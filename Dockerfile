FROM node:20.11.0-alpine as build

WORKDIR /usr/src/poll_frontend

ENV VITE_BACKEND_URL=localhost:5000

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine
COPY --from=build /usr/src/poll_frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]