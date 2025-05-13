FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

COPY ./src/infraestructure/prisma ./prisma/

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]
