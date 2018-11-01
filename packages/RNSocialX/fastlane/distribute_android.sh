#!/usr/bin/env bash

export ANDROID_VERSION_STRING="0.1.5"
export ANDROID_VERSION_CODE=15

export FASTLANE_PASSWORD=""

bundle exec fastlane android release version_string:${ANDROID_VERSION_STRING} version_code:${ANDROID_VERSION_CODE}
