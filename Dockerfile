FROM node:14-alpine3.14 as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]