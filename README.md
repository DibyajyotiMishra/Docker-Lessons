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


<br />
<br />

## Docker Compose:

#### Docker Compose file
- Line 1: Specify version of docker-compose
- Line 2: Under `services` put the name of each service that `docker-compose` is going to manage.
- Line 3: Specify the name of each service.
- Line 4: Specify the path of Dockerfile under the `build` command.
- Line 5: Specify the list of ports to be exposed under `ports` section.
- Line 6: Specify the list of environment variables for your application under `environment` section.
- Line 7: Specify the filepath of `.env` if any under `env-file` section.
- Line 8: Add volumes under the `volumes` section.
- Line 9: overwrite buildtime command using the `command` option.

  **Sample docker-compose.yml file:**

  ```console:
  version: '3.8'
  services:
    node-docker-app:
        build: .
        ports:
            - "8080:8080"
        environment:
            - PORT=8080
        volumes:
            - ./:/app:ro
            - /app/node_modules
  ```

  #### Important Docker Compose Commands.

  - ***To build and run using docker-compose:*** 
    ```console
    docker-compose up -d --build
    ```
    `--build` : to rebuild from start everytime.

  - ***To kill running container and associated volumes:***
    ```console
    docker-compose down -v
    ```

  - ***To run from multiple docker-compose configs:*** docker-compose up -f docker-compose-file1.yml -f docker-compose-file2.yml -f docker-compose-file3.yml ... -d --build
  
    ```console
    docker-compose up -f docker-compose.yml -f docker-compose.dev.yml -d --build
    ```

#### Deploy to production using Docker on Ubuntu VM on am EC2 instance:

  - ***Step 1: Setup an instance:*** Head over to console.aws.amazon.com and create an EC2 instance with Ubuntu OS and download the pem key.
  - ***Obtain Permissions to access the pem key:*** Launch the terminal and hit the following command:

    ```console
    chmod 0400 key-name.pem
    ```

  - ***SSH into the instance***: Copy the public IP of the instance and ssh into the instance using the following command.

    ```console
    ssh -i key-name.pem ubuntu@publicip
    ```

   - ***Install docker in the instance***: Copy the following command to get the docker installer script.

    ```console
    curl -fsSL https://get.docker.com -o install-docker.sh
    ```

    Now run the script to install docker on your instance.

    ```console
    sudo sh install-docker.sh
    ```

    Verify installation by running the command ```docker -v```.

   - ***Now install Docker Compose:***  

    download and install docker-compose:

    ```console
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    ```

    obtain permissions:
    
    ```console
    sudo chmod +x /usr/local/bin/docker-compose
    ```

    verify installation:
    
    ```console
    docker-compose -v
    ```
    

