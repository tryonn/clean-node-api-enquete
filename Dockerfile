FROM node:15
WORKDIR /usr/src/clean-node-api-enquete
COPY ./package.json ./
RUN npm install --only=prod
## COPY ./dist ./dist	
## nao vai ser utilizado EXPOSE 5000	
## CMD npm start 