#!/bin/bash -x

# stop if we have some error
set -e

WS=`pwd`

VERSION=${BUILD_NUMBER}
BRANCH=${GIT_BRANCH};

REPOSITORY=/local/repository/tonyfindeisen.de
REPO=${REPOSITORY}/${VERSION};

if [ -z BRANCH ]; then
    # branch not set from jenkins, get it from the git commandline
    BRANCH=`git status | grep "On branch" | cut -d' '  -f 4`
fi

echo "BRANCH: $BRANCH";

git reset --hard HEAD > /dev/null
# git pull master master

npm install > /dev/null

#sass --update scss/app.scss:css/style.css
grunt build

mkdir -p ${REPO}
tar -czf ${REPO}/tonyfindeisen.de.tar.gz _site

rm -f ${REPOSITORY}/latest
ln -s ${REPO} ${REPOSITORY}/latest

echo ${VERSION} > /local/version/tonyfindeisen.de.version

if [ ${USER} == "jenkins" ]; then
    sudo /local/www/tonyfindeisen.de/bin/updateSite bwta ${VERSION}
fi

