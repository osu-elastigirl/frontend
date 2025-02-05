FROM node:23 AS node

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json file
COPY package-lock.json /usr/src/app/

COPY . /usr/src/app/

RUN npm install -g npm@latest

RUN npm install -g @angular/cli@latest

RUN npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]