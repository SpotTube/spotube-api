FROM node:12

RUN useradd -d /home/ubuntu -ms /bin/bash -g root -G sudo -p ubuntu ubuntu

RUN  mkdir -p /usr/src/app && chown ubuntu /usr/src/app
RUN mkdir -p /data/db && chown ubuntu /data/db 

WORKDIR /usr/src/app
RUN npm install -g ts-node
RUN npm install -g migrate 

COPY package*.json ./
# Install nest cli
RUN yarn add global @nestjs/cli
# Install dependencies.
RUN yarn

COPY . .

RUN yarn build
# Run the web service on container startup
CMD [ "yarn", "start:prod" ]