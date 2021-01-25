FROM node:12-alpine
WORKDIR /fake-umbrlla/nest-back-end
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]