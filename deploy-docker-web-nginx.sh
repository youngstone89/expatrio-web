#!/bin/zsh
echo "Checking environments to build and run docker containers.."
docker=$(which docker)

if [ -e $docker ]; then
	echo "docker is installed on your machine in $docker, get ready to roll out"
else 
	echo "install docker please!"
fi

echo "Started..."

echo 'Buildling docker image of web'
DOCKER_IMAGE=expatrio-web-nginx-image

echo "Image Name: $DOCKER_IMAGE"
docker build -t $DOCKER_IMAGE .
docker image ls $DOCKER_IMAGE

echo 'run the container'
CONTAINER_NAME=expatrio-web-nginx
echo "Container Name: $CONTAINER_NAME"

docker run -it -p 80:80 --rm --name $CONTAINER_NAME $DOCKER_IMAGE
