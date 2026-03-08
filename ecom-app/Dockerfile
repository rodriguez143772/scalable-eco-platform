# Stage 1: Base — install dependencies
FROM oven/bun:1 AS base
WORKDIR /app
COPY package.json bun.lock turbo.json ./
COPY shared/package.json ./shared/
COPY server/package.json ./server/
COPY client/package.json ./client/
RUN bun install --ignore-scripts
COPY . .

# Stage 2: Build — compile all packages
FROM base AS build
RUN bun run build

# Stage 3: Production — lean server image
FROM oven/bun:1-slim AS production
WORKDIR /app
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/server/package.json ./server/
COPY --from=build /app/shared/dist ./shared/dist
COPY --from=build /app/shared/package.json ./shared/
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
CMD ["bun", "run", "server/dist/index.js"]

# Stage 4: nginx — static file server + reverse proxy
FROM nginx:alpine AS nginx
COPY --from=build /app/client/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
