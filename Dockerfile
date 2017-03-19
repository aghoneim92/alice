FROM node

RUN apt-get -y update

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN yarn global add node-gyp

COPY ./ /home

WORKDIR /home

RUN yarn

ENV NODE_ENV=production

RUN npm run build

CMD npm run start-server

EXPOSE 4000
