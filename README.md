# agile-release-train-dashboard

![CodeBuild](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoicTZRUWdzUE5TVFNSNTd3UEhXTkdrVTYyUzlFY0ZxOHAzTXpya3NuTHFoQ3lRbU5hVmFtNXdESVkvT2ZYRlpRZkdma29RR0VWSGFQR1JYWkZldWJVQ2RRPSIsIml2UGFyYW1ldGVyU3BlYyI6ImtwaFMwMENSV3E5SDNYaGQiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

See the dashboard at [https://blart.bluestonelogic.com](https://blart.bluestonelogic.com). Note: We use AWS WAF to enable an IP-based firewall so that only the BluestoneLogic DC office External IP address can see the dashboard. Please ask an admin for permission if you need your IP address added.

## Development

1. Clone this repo
2. Start the dev server with `npm start` from the `blart-dashboard/` directory. 
   1. A browser will automatically launch pointed at the dev server location.
   2. The browser is automatically refreshed each time you save a code change.

## Production Deployment

1. We use AWS CodeBuild to trigger the `npm build` command that compiles our code into production-ready / deployment-ready files. Commits to this repo will automatically trigger the build and deployment.

The order of operations is:
1. Developer commits a change to this GitHub repo.
2. AWS CodeBuild is triggered to grab the latest source code from this repo and build it — producing a deployable build artifact.
3. CodeBuild will place the build artifact into our "blart-dashboard" S3 bucket.
4. AWS CloudFront will grab that build artifact, write invalidations to its existing caches, and deploy the build artifact.
   1. Note: Developers are ***not*** writing new build artifacts to the S3 bucket directly. Permissions are restricted to just a virtual CloudFront user. This is a fully automated process. All you have to do is commit a code change to this repo. 
5. AWS SNS will listen for events (Build In Progress / Build Success / Build Failure) and report them in a formatted message to our Slack #dev-it-internal-feed channel (private - please ask for an invite).
6. After about 2 minutes, the changes will be live on [https://blart.bluestonelogic.com](https://blart.bluestonelogic.com).

![Screenshot of BLART Dashboard](https://github.com/BluestoneLogic/blart-dashboard/blob/master/screenshot-blart-dashboard.png)
