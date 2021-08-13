FROM node:12

# RUN useradd -d /home/ubuntu -ms /bin/bash -g root -G sudo -p ubuntu ubuntu
ENV WORK_DIR /usr/src/app
RUN  mkdir -p $WORK_DIR
RUN chmod 777 /usr/local/bin
RUN mkdir -p /data/db  

RUN apt-get update || : && apt-get install python -y

WORKDIR ${WORK_DIR}

RUN  curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
RUN  chmod a+rx /usr/local/bin/youtube-dl


# RUN npm install -g ts-node
# RUN npm install -g migrate 

# ENV YOUTUBE_DL_DIR /usr/local/bin/
# COPY package*.json ./
# # Install nest cli
# RUN yarn add global @nestjs/cli
# # Install dependencies.
# RUN yarn

# COPY . .

# Run the web service on container startup
# CMD [ "yarn", "start:dev" ]