FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src/infraestructure/prisma ./prisma/

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]
