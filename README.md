# DOCKER LESSONS

#### Important Docker Commands.
- ***To build an image:*** docker build -t imageName:semantic-versioning.RELEASE path-to-dockerfile

    <u>example:</u>
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

- ***To delete docker containers and associated volumes:*** docker rm nameOfContainer -fv

    example:
    ```console
    docker rm my-dockerized-container -fv
    ```



