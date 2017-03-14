FROM node

COPY ./ /alice

RUN mkdir -p /alice/dist/.well-known/acme-challenge

WORKDIR /alice/dist

RUN printf "%s" BXAhgXiu68rQsS3GXrCTT6KT9k30V69fXOcr8nrzsHM.lNh0V_VVFOPyKQpCSchXeJCGS-HafZx4pOABEOkf5sM > .well-known/acme-challenge/BXAhgXiu68rQsS3GXrCTT6KT9k30V69fXOcr8nrzsHM

WORKDIR /alice
RUN npm i
RUN NODE_ENV=production npm run build

CMD NODE_ENV=production npm run start-server
