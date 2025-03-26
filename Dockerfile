FROM node:23 AS node
RUN useradd -ms /bin/sh -u 1001 app

# Set the working directory
WORKDIR /usr/src/app

COPY --chown=app:app . /usr/src/app

RUN npm install -g npm@latest

RUN npm install -g @angular/cli@latest

RUN npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]