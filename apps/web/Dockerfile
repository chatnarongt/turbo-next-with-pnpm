# syntax=docker/dockerfile:1

# Base image with Bun
FROM node:24-alpine AS base
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable pnpm
# Update and upgrade packages to fix vulnerabilities (CVE-2025-46394, CVE-2024-58251)
RUN apk update && apk upgrade --no-cache
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app

# ---
FROM base AS prepare
# Install turbo globally
RUN pnpm add --global turbo@^2
COPY . .
# Generate a partial monorepo with a pruned lockfile for a target workspace
# Assuming "web" is the name in the project's package.json: { name: "web" }
RUN turbo prune web --docker

# ---
FROM base AS builder
# First install the dependencies (as they change less often)
COPY --from=prepare /app/out/json/ .
RUN pnpm install --frozen-lockfile

# Build the project
COPY --from=prepare /app/out/full/ .

# 👇 ADD NEXT_PUBLIC_* VARIABLES HERE (before build)
ARG NEXT_PUBLIC_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

# Build the Next.js application
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm run build

# ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ARG NEXT_PUBLIC_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH

HEALTHCHECK \
  --interval=30s \
  --timeout=5s \
  --start-period=5s \
  --retries=3 \
  CMD node -e " \
    fetch('http://localhost:3000${NEXT_PUBLIC_BASE_PATH}/api/v1/liveness') \
      .then(r => { if (!r.ok) process.exit(1) }) \
      .catch(() => process.exit(1)) \
  " || exit 1

# Run the application using Bun
CMD ["node", "apps/web/server.js"]
