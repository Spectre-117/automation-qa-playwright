FROM mcr.microsoft.com/playwright:v1.56.1-jammy

# copy application files to specified directory - 2 params '.' - all files '/pw-tests' - directory where to copy
COPY . /pw-tests

# set and navigate to working directory
WORKDIR /pw-tests

# Install dependencies ('ci' force to install dependencies from package-lock.json - faster install)
RUN npm ci

# run tests
CMD ["npm","run","test"]




