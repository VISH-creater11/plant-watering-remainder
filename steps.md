Setup Instructions
Step 1 — Login to AWS

Login to the AWS Console.
If needed, download Access Keys from IAM → Security Credentials → Create access key.

Step 2 — Create an S3 Bucket (Frontend Hosting)

Create a working folder:

mkdir plant-water-reminder
cd plant-water-reminder


Create S3 bucket:

Open AWS Console → search for S3

Click Create bucket

Enter bucket name: plant-water-reminder-bucket

Enable public access

Click Create bucket

Enable static hosting:

Open bucket → Properties

Scroll to Static website hosting

Enable

Set index document name:

index.html


Save

Upload project files:

index.html  
styles.css  
script.js  
sapling.jpg


(Optional) Upload via CLI:

aws s3 cp ./ s3://plant-water-reminder-bucket/ --recursive


Copy the S3 website endpoint — this is your website link.

Step 3 — Create AWS Lambda Function

Open AWS Console → Search Lambda

Click Create function

Select Author from scratch

Name: PlantReminderManager

Runtime: Python / Node.js

Create or assign execution role

Open function code → paste your Lambda code → click Deploy

Lambda handles:

Storing plant details temporarily

Calculating due/overdue watering

Triggering notifications

Step 4 — Configure Amazon EventBridge Scheduler

Open AWS Console → search EventBridge

Click Create rule

Name: PlantReminderRule

Type: Schedule

Set pattern: rate(1 day)

Target: PlantReminderManager Lambda

Click Create

This will automatically check plants every day.

Step 5 — Set Up Amazon SNS Notifications

Search AWS Console for SNS

Click Create Topic

Select Standard

Name: PlantReminderTopic

Create

Create subscription:

Open topic → Create Subscription

Protocol: Email

Enter your email

Confirm subscription via email link

SNS will now send watering alerts.

Step 6 — Connect Frontend to AWS

Enable Lambda public URL:

Go to Lambda function

Select Function URL

Enable

Copy URL

Update script.js:


This connects the webpage to AWS Lambda.
