# Node Todo Frontend

This is a sample all for the docker development labs.

You can run this site with the following:

`PORT=3000 node server`

## Dockerization

To create the image.

`docker build -t node-todo-frontend .`

To run the image.

`docker run -p 7501:7002 node-todo-frontend`
