FROM node:22-bookworm-slim
WORKDIR /app
COPY package.json ./
COPY worker ./worker
COPY drizzle ./drizzle
COPY server.mjs ./server.mjs
ENV PORT=8080
ENV EMS_DB_PATH=/data/lectro-ems.sqlite
VOLUME ["/data"]
EXPOSE 8080
CMD ["node", "--experimental-sqlite", "server.mjs"]
