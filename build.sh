#!/bin/bash

docker build -t dockerize-list-app .
docker run -d -p 8080:80 --name=list-app dockerize-list-app