FROM node:10

COPY interviews /usr/src/app/


WORKDIR /usr/src/app/front
RUN npm install

RUN npm run build &

WORKDIR /usr/src/app/back
COPY wait-for.sh .
COPY environment .env
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
