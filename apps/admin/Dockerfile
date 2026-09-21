FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY apps/admin/package*.json ./apps/admin/
COPY packages/ ./packages/

RUN npm install --workspaces

COPY apps/admin/ ./apps/admin/

ENV NODE_ENV=production
RUN npm run build --workspace=admin

FROM caddy:2-alpine
COPY --from=builder /app/apps/admin/dist /usr/share/caddy
EXPOSE 80
CMD ["caddy", "file-server", "--root", "/usr/share/caddy", "--listen", ":80"]
