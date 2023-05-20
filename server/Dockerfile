# Stage 1: Build Stage
FROM node:18.16-alpine as build  

# Set WORKDIR
WORKDIR /app  

# Copy from current directory to WORKDIR
COPY . .  

# Install dependencies
RUN npm install  

# Build the application 
RUN npm run build  

# Stage 2: Final Stage
FROM node:18.16-alpine

# Set WORKDIR
WORKDIR /app

# Copy from current directory to WORKDIR
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env ./

# Install dependencies
RUN npm install --only=production

# Expose port
EXPOSE ${PORT}

# Run the application
CMD ["npm", "run", "start"]