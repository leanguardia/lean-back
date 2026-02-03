# Build stage
FROM node:22-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build && pnpm prune --prod

# Production stage
FROM node:22-alpine AS runner

RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy package manifests and production node_modules from builder
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs && \
    chown -R nestjs:nodejs /app
USER nestjs

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
