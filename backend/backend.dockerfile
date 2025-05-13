FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

COPY ./src/infraestructure/prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
