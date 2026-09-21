FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/shared/package*.json ./packages/shared/
COPY packages/config/package*.json ./packages/config/

RUN npm install --workspaces --omit=dev

COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

ENV NODE_ENV=production
EXPOSE 5000

CMD ["npm", "start", "--workspace", "@perfume/api"]
