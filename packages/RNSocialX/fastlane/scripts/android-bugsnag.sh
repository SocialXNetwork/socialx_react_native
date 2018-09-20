#!/usr/bin/env bash

API_KEY='73245fce110f157e3c5ba0c2ac7154ae'

ANDROID_BUNDLE_NAME='index.android.bundle' # look for 'bundleAssetName' in android/app/build.gradle
ANDROID_MAP_NAME='index.android.bundle.map' # look for '--sourcemap-output' in android/app/build.gradle

MINIFIED_FILE="./android/app/build/intermediates/assets/release/${ANDROID_BUNDLE_NAME}"
SOURCE_MAP_FILE="./android/app/${ANDROID_MAP_NAME}"

./node_modules/bugsnag-sourcemaps/cli.js upload \
        --api-key ${API_KEY} \
        --minified-file ${MINIFIED_FILE} \
        --source-map ${SOURCE_MAP_FILE} \
        --minified-url index.android.bundle \
        --app-version ${1} \
        --upload-sources