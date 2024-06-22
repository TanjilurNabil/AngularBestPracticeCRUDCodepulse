FROM node:20.11.0-bullseye
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
RUN npm install -g @angular/cli
EXPOSE 5000
COPY . /app
CMD ["ng", "serve", "--host", "0.0.0.0"]