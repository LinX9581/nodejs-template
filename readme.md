# start
npm start
* basic env
express ejs mysql babel global-config docker

# build image
ignore node_modules config.js
config.js need to mount

* build image
docker build -t node-template . --no-cache
* image to container
cd /nodejs-template
docker run -itd -v ./config.js:/usr/src/app/config.js --name node-template -p 3008:3008 node-template
* ssh to container
docker exec -it node-template bash
* get container realtime logs
docker logs --follow node-template