FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

COPY . .

RUN  npx prisma generate

EXPOSE 6000

CMD ["npm", "run", "dev"]