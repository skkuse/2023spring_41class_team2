FROM node:18-alpine As dev


# Create Directory for the Container
WORKDIR /app

# Only copy the package.json file to work directory
COPY package*.json ./
RUN npm install


COPY . .

RUN apk add --no-cache bash

RUN npx prisma generate
RUN npm run build

FROM node:18-alpine As prod

COPY --from=dev /app/node_modules ./node_modules
COPY --from=dev /app/package*.json ./
COPY --from=dev /app/dist ./dist
COPY --from=dev /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "start:migrate:prod"]
CMD ["node", "dist/prisma/seed.js"]