#!/usr/bin/env bash

API_KEY='73245fce110f157e3c5ba0c2ac7154ae'

IOS_BUNDLE_NAME='./ios/main.jsbundle'
IOS_MAP_NAME='./ios/index.ios.map'

./node_modules/bugsnag-sourcemaps/cli.js upload \
 --api-key ${API_KEY} \
 --minified-file ${IOS_BUNDLE_NAME} \
 --source-map ${IOS_MAP_NAME} \
 --minified-url main.jsbundle \
 --app-version ${1} \
 --upload-sources