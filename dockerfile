# Dockerfile for the server
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Install bcrypt dependencies
RUN npm rebuild bcrypt --build-from-source

EXPOSE 5000

CMD ["npm", "run", "dev"]
