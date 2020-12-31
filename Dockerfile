FROM node:12-alpine
WORKDIR /recipes-back
COPY . .
RUN npm i
CMD ["npm", "start"]