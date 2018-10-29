#!/usr/bin/env bash

export ANDROID_VERSION_STRING="0.1.1"
export ANDROID_VERSION_CODE=11

export FASTLANE_PASSWORD=""

bundle exec fastlane android release version_string:${ANDROID_VERSION_STRING} version_code:${ANDROID_VERSION_CODE}
