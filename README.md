# automation-qa-playwright
automation-qa-playwright training project


# Create docker image
+ Created on the basis of Dockerfile in current directory
+ additionally file .dockerignore have a list of files which Must not be included into image

**docker build -t aqa-pw-2025:v0.0.8 .**   
 - docker build - main command
 - -t aqa-pw-2025:v0.0.8 - name of image and version
 - '.' - dot at the end means to find Dockerfile in current directory

# Create container and run tests in it
**docker run -v ./playwright-report:pw-tests/playwright-report --name playwright-tests aqa-pw-2025:v0.0.8**
 - docker run - main command
 - -v ./playwright-report:pw-tests/playwright-report  (where to save report : FROM where to save the report)
 - --name playwright-tests - give a name to container in Docker
 - aqa-pw-2025:v0.0.8 - image and version to use to create a container
