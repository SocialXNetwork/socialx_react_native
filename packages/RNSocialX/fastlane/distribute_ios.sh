#!/usr/bin/env bash

export IOS_VERSION_STRING="0.0.5"
export IOS_VERSION_CODE=5

bundle exec fastlane ios release version_string:${IOS_VERSION_STRING} version_code:${IOS_VERSION_CODE}
