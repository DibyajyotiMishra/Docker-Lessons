# Set the base image
FROM node:16    

# Specify working directory 
WORKDIR /app

# Copy files from source to destination
COPY package.json .

# argument passed into docker during the execution of build command
ARG NODE_ENV

# run the required command durng build time
# check node env and run the commands accordingly; for development only install the dev-dependencies but skip it in production
RUN if [ "$NODE_ENV" = "development" ]; \ 
    then npm install; \
    else npm install --only=production; \
    fi

# copy rest of the files [this is done for caching or rather an optimisation technique]
COPY . ./

# referencing environment varaibles
ENV PORT=8080

# expose a port for your image
EXPOSE ${PORT}

# run the required command durng run time
CMD ["node", "index.js"]