FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/ ./packages/

RUN npm install --workspaces

COPY apps/web/ ./apps/web/

ENV NODE_ENV=production
RUN npm run build --workspace=web

FROM caddy:2-alpine
COPY --from=builder /app/apps/web/dist /usr/share/caddy
EXPOSE 80
CMD ["caddy", "file-server", "--root", "/usr/share/caddy", "--listen", ":80"]
