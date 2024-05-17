FROM node:latest

WORKDIR /app
COPY package*.json tsconfig.json /app/
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000

ENV DATABASE_URL=postgres://postgres:postgres@postgres-service:5432/bd-pedidos

CMD ["npm", "start"]
