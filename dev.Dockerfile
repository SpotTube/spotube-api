FROM node:12

RUN useradd -d /home/ubuntu -ms /bin/bash -g root -G sudo -p ubuntu ubuntu

RUN  mkdir -p /usr/src/app && chown ubuntu /usr/src/app
RUN mkdir -p /data/db && chown ubuntu /data/db 

WORKDIR /usr/src/app
RUN npm install -g ts-node
RUN npm install -g migrate 
RUN npm install -g @nestjs/cli

COPY ["package.json","yarn.lock","tsconfig.json","/usr/src/app/"]
RUN yarn --pure-lockfile

COPY . .
COPY .env.development .env

RUN yarn build

CMD [ "yarn", "start:prod" ]