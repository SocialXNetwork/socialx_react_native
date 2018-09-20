#!/usr/bin/env bash

export ANDROID_VERSION_STRING="0.0.5"
export ANDROID_VERSION_CODE=5

bundle exec fastlane android release version_string:${ANDROID_VERSION_STRING} version_code:${ANDROID_VERSION_CODE}
