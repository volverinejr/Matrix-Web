FROM node:14-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/Matrix-Web /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# ng build
# docker build -t volverinejr/matrix-web:v1 .
# docker run -d -p 4200:80 --name app-matrix volverinejr/matrix-web:v1
# docker push volverinejr/matrix-web:v1
