# Build stage
FROM node:18-alpine as builder

WORKDIR /build

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run the production build
RUN npm install -g serve

# Copy the build from builder stage
COPY --from=builder /build/build ./build

# Copy .env file if exists
COPY .env* ./

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

# Run the application
CMD ["serve", "-s", "build", "-l", "3000"]
