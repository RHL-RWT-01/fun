FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install 
COPY . .
# Expose the port the app runs on
EXPOSE 3000
# Start the application
CMD ["npm", "start"]