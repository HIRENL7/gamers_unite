FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY backend/package.json ./backend/package.json
COPY gamers-unite/package.json ./gamers-unite/package.json
RUN pnpm install --filter backend... --frozen-lockfile || pnpm install --filter backend...

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY package.json pnpm-workspace.yaml ./
COPY backend ./backend
WORKDIR /app/backend
RUN pnpm build

FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/package.json ./package.json
COPY --from=deps /app/backend/node_modules ./node_modules
EXPOSE 4000
CMD ["node", "dist/server.js"]
