# DOCKER LESSONS

#### Dockerfile

- Line 1: base image 
- Line 2: specify working directory
- Line 3: COPY package.json to working directory.
- Line 4: Build time commands.
- Line 5: Copy rest of the files to working directory
-  Line 6: Expose Port numbers
-  Line 7: Run time commands.
   <br/>

    **Sample Dockerfile**:

    ```console
    FROM node:16
    WORKDIR /app
    COPY package.json .
    RUN npm install
    COPY . ./
    EXPOSE 8080
    CMD ["node", "index.js"]
    ```

#### Important Docker Commands.
- ***To build an image:*** docker build -t imageName:semantic-versioning.RELEASE path-to-dockerfile

    example:
    ```console
    docker build -t dibyajyotimishra/dockerized-app:0.0.1.RELEASE .
     ```
     
    <br />

- ***To delete an image:*** 
  
    ```console
    docker rm image_id
    ```

- ***To view all images:*** 
   ```console
   docker image ls
   ```

- ***To run a docker app:*** docker run -d -p portOnHostMachine:portOnContainer --name=name-of-container imageName

    example:
    ```console
    docker run -d -p 8080:8081 --name=my-dockerized-container dibyajyotimishra/dockerized-app:0.0.1.RELEASE
    ```

- ***To see all running containers:*** 
    ```console
    docker ps
    ```

- ***To check contents of docker app***:
    ```console
    docker exec -it my-dockerized-container bash
    ```

- ***To create volumes to preserve data:*** docker run -v path-to-folder-on-host-machine:path-to-folder-on-docker-container -p port-on-host-machine:port-on-docker-container -d --name=name-of-container imageName

    example:
    ```console
    docker run -v $(pwd):/app -v /app/node_modules -p 8080:8081 --name=my-dockerized-container dibyajyotimishra/dockerized-app:0.0.1.RELEASE
    ```

- ***To load environment variables:*** docker run -v path-to-folder-on-host-machine:path-to-folder-on-docker-container -p port-on-host-machine:port-on-docker-container --env KEY=VALUE -d --name=name-of-container imageName

    example:
    ```console
    docker run -v $(pwd):/app -v /app/node_modules --env PORT=8082 -p 8080:8082 --name=my-dockerized-container dibyajyotimishra/dockerized-app:0.0.1.RELEASE
    ```

- ***To load environment variables from file:*** docker run -v path-to-folder-on-host-machine:path-to-folder-on-docker-container -p port-on-host-machine:port-on-docker-container --env-file path-to-environment-variables-file -d --name=name-of-container imageName

    example:
    ```console
    docker run -v $(pwd):/app -v /app/node_modules --env-file ./.env -p 8080:8082 --name=my-dockerized-container dibyajyotimishra/dockerized-app:0.0.1.RELEASE
    ```

- ***To delete docker containers and associated volumes:*** docker rm nameOfContainer -fv

    example:
    ```console
    docker rm my-dockerized-container -fv
    ```



