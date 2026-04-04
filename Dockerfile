FROM node:24-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json tsconfig.json ./
COPY lib/api-spec/package.json lib/api-spec/
COPY lib/api-zod/package.json lib/api-zod/
COPY lib/api-client-react/package.json lib/api-client-react/
COPY lib/db/package.json lib/db/
COPY artifacts/api-server/package.json artifacts/api-server/
COPY artifacts/websiteuptest/package.json artifacts/websiteuptest/
RUN pnpm install --no-frozen-lockfile

FROM deps AS builder
COPY . .
RUN pnpm --filter @workspace/api-spec run codegen
RUN pnpm --filter @workspace/api-server run build
RUN pnpm --filter @workspace/websiteuptest run build

FROM node:24-alpine AS api
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY --from=builder /app/artifacts/api-server/dist ./dist
COPY --from=builder /app/node_modules/.pnpm ./node_modules/.pnpm
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/artifacts/api-server/package.json ./package.json
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080
CMD ["node", "--enable-source-maps", "./dist/index.mjs"]

FROM nginx:alpine AS web
COPY --from=builder /app/artifacts/websiteuptest/dist/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
