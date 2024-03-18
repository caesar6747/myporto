FROM node:20-alpine

WORKDIR /astro

COPY . .
RUN npm install
RUN npm run build
COPY db.sqlite3 /astro/dist/server/
RUN mkdir /astro/dist/server/drizzle
COPY drizzle /astro/dist/server/drizzle

EXPOSE 8080

CMD ["node", "app.js"]

