


aws configure set region ap-northeast-1

# 建立 ecr repo
aws ecr create-repository --repository-name nodejs-template

# 取的帳戶ID
aws sts get-caller-identity --query Account --output text

# 登入 ecr
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 234398048709.dkr.ecr.ap-northeast-1.amazonaws.com

# 下 tag
docker tag nodejs-template:1.5 234398048709.dkr.ecr.ap-northeast-1.amazonaws.com/nodejs-template:1.5

# push to ecr
docker push 234398048709.dkr.ecr.ap-northeast-1.amazonaws.com/nodejs-template:1.5

# 步驟 1: 創建 ECS 任務執行角色
aws iam create-role --role-name ecsTaskExecutionRole --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'

# 步驟 2: 附加必要的策略到角色
aws iam attach-role-policy --role-name ecsTaskExecutionRole --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

# 步驟 3: 獲取角色 ARN
aws iam get-role --role-name ecsTaskExecutionRole --query Role.Arn --output text

aws ecs register-task-definition --cli-input-json '{
  "family": "nodejs-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::234398048709:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "nodejs-container",
      "image": "234398048709.dkr.ecr.ap-northeast-1.amazonaws.com/nodejs-template:1.5",
      "portMappings": [
        {
          "containerPort": 3005,
          "hostPort": 80,
          "protocol": "tcp"
        }
      ],
      "essential": true
    }
  ]
}'

# 步骤 6: 创建 ECS 集群（如果还没有的话）
aws ecs create-cluster --cluster-name nodejs-cluster

# 步骤 7: 创建 Fargate 服务
aws ecs create-service \
    --cluster nodejs-cluster \
    --service-name nodejs-service \
    --task-definition nodejs-task:1 \
    --desired-count 1 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[subnet-0608151647dd901f7],securityGroups=[sg-0120b6a0fc92b60ce],assignPublicIp=ENABLED}"


## GET Public IP
# 步驟 4: 描述特定任務
TASK_ARN=$(aws ecs list-tasks --cluster nodejs-cluster --service-name nodejs-service --query 'taskArns[0]' --output text)
aws ecs describe-tasks --cluster nodejs-cluster --tasks $TASK_ARN

# 步驟 5: 獲取任務的網絡接口 ID
ENI_ID=$(aws ecs describe-tasks --cluster nodejs-cluster --tasks $TASK_ARN --query 'tasks[0].attachments[0].details[?name==`networkInterfaceId`].value' --output text)

# 步驟 6: 獲取公共 IP 地址
aws ec2 describe-network-interfaces --network-interface-ids $ENI_ID --query 'NetworkInterfaces[0].Association.PublicIp' --output text

## UPDATE

# 有更新 json 的話
TASK_REVISION=$(aws ecs describe-task-definition --task-definition nodejs-task \
    --query 'taskDefinition.revision' --output text)


aws ecs update-service \
    --cluster nodejs-cluster \
    --service nodejs-service \
    --task-definition nodejs-task:$TASK_REVISION