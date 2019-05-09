# art-dashboard

This project is a single page webapp/dashboard made in React for displaying data related to Agile Release Train (ART) activities. The ART Dashboard was originally developed for BluestoneLogic's cross-functional Scaled-Agile-Framework teams and designed to be displayed on our large TV in the office bullpen. 

Typically with cross-functional teams operating on separate Program Increments, it's easy to fall out of sync with each team's release schedule and cadence. This dashboard was intended to help make that easier - so far so good. There is room for improvement, such as adding GitHub API stats or marking special events that each team has coming up. 

_Note: This is a copy of my work hosted on our private organization repository. Names of teams and actual project names were removed and replaced with placeholder values._

![CodeBuild](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoicTZRUWdzUE5TVFNSNTd3UEhXTkdrVTYyUzlFY0ZxOHAzTXpya3NuTHFoQ3lRbU5hVmFtNXdESVkvT2ZYRlpRZkdma29RR0VWSGFQR1JYWkZldWJVQ2RRPSIsIml2UGFyYW1ldGVyU3BlYyI6ImtwaFMwMENSV3E5SDNYaGQiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

## How to run the dashboard

1. Clone this repo
2. Assuming you have the latest Node and/or Yarn installed: Start the dev server with `yarn start` from the `art-dashboard/` directory.

## Production Deployment

1. At BluestoneLogic, we use AWS CodeBuild to trigger the `npm build` command that compiles our code into production-ready / deployment-ready files. Commits to the repo will automatically trigger the build and deployment.

Typical order of operations is:

1. Developer commits a change to the GitHub repo.
2. AWS CodeBuild is triggered to grab the latest source code from this repo and build it — producing a deployable build artifact.
3. CodeBuild will place the build artifact into our "art-dashboard" S3 bucket.
4. AWS CloudFront will grab that build artifact, write invalidations to its existing caches, and deploy the build artifact.
   1. Note: Developers are ***not*** writing new build artifacts to the S3 bucket directly. Permissions are restricted to just a virtual CloudFront user. This is a fully automated process. All you have to do is commit a code change to this repo. 
5. AWS SNS will listen for events (Build In Progress / Build Success / Build Failure) and report them in a formatted message to our Slack #dev-it-internal-feed channel (private - please ask for an invite).
6. After about 2 minutes, the changes will be live on the CloudFront-served site.

![Screenshot of ART Dashboard](https://github.com/BluestoneLogic/art-dashboard/blob/master/art_dashboard_screenshot.png)
