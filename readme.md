# start
npm start
basic env -> express ejs mysql babel global-config

# build image
ignore node_modules config.js
config.js need to mount

docker build -t node-template . --no-cache
docker run -itd -v ./config.js:/usr/src/app/config.js --name node-template -p 3008:3008 node-template
docker run -itd --name node-template -p 3008:3008 node-template

docker exec -it node-template bash