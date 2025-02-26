# Use Node.js image as the base image for React/Vite
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend code into the container
COPY . .

# Expose the port that your app will run on (for example, 5173 for Vite)
EXPOSE 5173

# Run the app using vite and expose it to all interfaces
CMD ["npm", "run", "dev", "--", "--host"]
