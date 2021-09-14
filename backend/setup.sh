#!/bin/bash
#mongod stays running all the time for me and I have to restart it then run it otherwise it cries at me and i dont know why, so i use this as a simple fix
sudo systemctl stop mongodb.service
sudo mongod & node ./server.js
