#!/usr/bin/env bash

export IOS_VERSION_STRING="0.0.6"
export IOS_VERSION_CODE=6

bundle exec fastlane ios release version_string:${IOS_VERSION_STRING} version_code:${IOS_VERSION_CODE}
