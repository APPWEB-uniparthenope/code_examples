FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
#COPY server.js /usr/src/app
EXPOSE 8888
CMD ["node", "/usr/src/app/server.js"]
