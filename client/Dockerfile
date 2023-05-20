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
FROM nginx:alpine  

# Copy the built application to the NGINX web server's 
COPY --from=build /app/dist /usr/share/nginx/html  

# Expose port to allow traffic
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]  