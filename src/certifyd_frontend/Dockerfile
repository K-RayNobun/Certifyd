# Stage 1: Build the frontend React application with Vite
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy the root package.json and project workspace definitions
# Using wildcard to gracefully handle lockfiles
COPY package*.json ./
COPY src/certifyd_frontend/package*.json ./src/certifyd_frontend/

# Install all workspace dependencies
RUN npm install

# Copy the entire mono-repo context to allow the Vite build to access declarations and configs
COPY . .

# Build the frontend assets specifically in the frontend workspace
WORKDIR /app/src/certifyd_frontend
RUN npm run build

# Stage 2: Serve the optimized production build using an Nginx runner
FROM nginx:alpine AS runner

# Remove default nginx static assets to prevent conflicts
RUN rm -rf /usr/share/nginx/html/*

# Copy built artifacts from the builder stage
# Vite outputs to `dist`
COPY --from=builder /app/src/certifyd_frontend/dist /usr/share/nginx/html

# Expose standard web traffic port
EXPOSE 80

# Run nginx in foreground daemon-mode
CMD ["nginx", "-g", "daemon off;"]
