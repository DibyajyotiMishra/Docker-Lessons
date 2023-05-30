# Set the base image
FROM node:16    

# Specify working directory 
WORKDIR /app

# Copy files from source to destination
COPY package.json .

# run the required command durng build time
RUN npm install

# copy rest of the files [this is done for caching or rather an optimisation technique]
COPY . ./

# referencing environment varaibles
ENV PORT=8080

# expose a port for your image
EXPOSE ${PORT}

# run the required command durng run time
CMD ["npm", "run", "dev"]