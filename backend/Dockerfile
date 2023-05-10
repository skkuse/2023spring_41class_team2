FROM node:18-alpine As dev


# Create Directory for the Container
WORKDIR /app

# Only copy the package.json file to work directory
COPY package*.json ./
RUN npm install


COPY . .

RUN apk add --no-cache bash
COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

RUN npx prisma generate

RUN npm run build

CMD /app/wait-for-it.sh mysql:3306 -- npx prisma migrate deploy




FROM node:18-alpine As prod

COPY --from=dev /app/node_modules ./node_modules
COPY --from=dev /app/package*.json ./
COPY --from=dev /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]