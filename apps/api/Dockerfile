FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build
COPY . .
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=build /app/dist ./dist
COPY drizzle ./drizzle
# Seed images are bundled outside the uploads volume and synced into it on every start,
# so new demo images reach existing deployments (the volume shadows /app/uploads).
COPY uploads/seed ./seed-assets
EXPOSE 4000
CMD ["sh", "-c", "mkdir -p uploads/seed && cp -rn seed-assets/. uploads/seed/ && node dist/main.js"]
