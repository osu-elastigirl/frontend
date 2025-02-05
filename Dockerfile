FROM node:latest as node

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json file
COPY . /usr/src/app/

RUN npm install -g @angular/cli

RUN npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]