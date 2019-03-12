# blart-dashboard

Start the dev server with `npm start`

Create a new production build with `npm build`

Deploy that new production build to our AWS S3 bucket via command line tools (requires AWS CLI tools installed on your machine and an existing S3 target bucket with Public read-only policy for Everyone). Use `aws s3 ls` to list the buckets and `aws s3 sync build/ s3://<bucket-name>` to deploy the build.

![Screenshot of BLART Dashboard](https://github.com/BluestoneLogic/blart-dashboard/blob/master/screenshot-blart-dashboard.png)
