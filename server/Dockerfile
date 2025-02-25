# Use official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend code into the container
COPY . .

# Expose the port that your app will run on (for example 3000)
EXPOSE 3000

# Run the app using nodemon
CMD ["npm", "start"]
