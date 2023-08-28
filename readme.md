# start
```
git clone https://github.com/LinX9581/nodejs-template.git
cd nodejs-template
echo -e "db_host=172.16.200.6\ndb_user=docker\ndb_password=00000000" > .env
yarn install
npm start
```
* basic env
express ejs mysql babel global-config docker gitlabci

## Docker
* build image
```
docker build -t nodejs-template:1.0 . --no-cache
```
* image to container
```
cd /nodejs-template
docker run -itd -v ./config.js:/usr/src/app/config.js --name nodejs-template -p 3005:3005 nodejs-template:1.0
```
* ssh to container
```
docker exec -it nodejs-template bash
```
* get container realtime logs
```
docker logs --follow nodejs-template
```
* image push to docker hub
```
docker login
docker tag nodejs-template:1.0 linx9581/nodejs-template:1.0
docker push linx9581/nodejs-template:1.0
```
## push image to gcr
```
gcloud config set project phonic-entity-320408
gcloud auth activate-service-account --key-file json
gcloud auth configure-docker

docker tag linx9581/nodejs-template:1.0 asia.gcr.io/phonic-entity-320408/linx9581/nodejs-template:1.0
docker tag [SOURCE_IMAGE] [HOSTNAME]/[PROJECT-ID]/[IMAGE]:[TAG]

docker push asia.gcr.io/phonic-entity-320408/linx9581/nodejs-template:1.0
docker push [HOSTNAME]/[PROJECT-ID]/[IMAGE]:[TAG]

```

## Build Private Registry
```
docker run -d -p 3008:5000 -v /docker/registry:/var/lib/registry --name registry registry:2
cat>/etc/docker/daemon.json<<EOF
{ "insecure-registries":["IP:3008"] }
EOF
systemctl restart docker

docker tag nodejs-template IP:3008/nodejs-template:1.1
docker push IP:3008/nodejs-template:1.1
docker pull IP:3008/nodejs-template:1.1

curl -X GET IP:3008/v2/_catalog
curl -X GET IP:3008/v2/mytomcat/tags/list

docker run -d -p 3009:8080 --name registry-web --link registry -e REGISTRY_URL=http://IP:3008/v2 hyper/docker-registry-web
```