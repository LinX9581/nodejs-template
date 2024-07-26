# GCP_PROJECT_NAME=analytics
# AR_PROJECT_NAME=nodejs-repo
# PROJECT_NAME=nodejs-template
# APP_VERSION=1.8
# CLOUDRUN_SERVICE=my-service1

# gcloud auth activate-service-account --key-file $PROJECT_NAME.json
gcloud config set project $GCP_PROJECT_NAME
gcloud auth configure-docker $AR_TARGET
# gcloud artifacts repositories create $AR_PROJECT_NAME --repository-format=docker --location=asia --description="Docker repository"
docker build -t asia-docker.pkg.dev/$GCP_PROJECT_NAME/$AR_PROJECT_NAME/$PROJECT_NAME:$APP_VERSION .
docker images
docker push asia-docker.pkg.dev/$GCP_PROJECT_NAME/$AR_PROJECT_NAME/$PROJECT_NAME:$APP_VERSION
gcloud run deploy $CLOUDRUN_SERVICE \
    --image=asia-docker.pkg.dev/$GCP_PROJECT_NAME/$AR_PROJECT_NAME/$PROJECT_NAME:$APP_VERSION \
    --region=asia-east1 \
    --platform=managed \
    --allow-unauthenticated \
    --memory=512Mi \
    --cpu=1 \
    --max-instances=3 \
    --timeout=10m \
    --concurrency=1 \
    --set-env-vars=db_user=dev,db_password=00000000


# gcloud run services delete my-service5 --platform=managed --region=asia-east1