FROM node:7.7.4

RUN apt-get -y update

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN yarn global add node-gyp

WORKDIR /tmp
COPY package.json /tmp
RUN yarn
RUN cp -rp node_modules /home

COPY . /home

WORKDIR /home

ENV NODE_ENV=production
ENV HOME=/home

RUN npm run build

CMD npm run start-server

EXPOSE 443
