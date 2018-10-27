#!/usr/bin/env bash

export IOS_VERSION_STRING="0.1.0"
export IOS_VERSION_CODE=1

export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

export FASTLANE_PASSWORD=""

bundle exec fastlane ios release version_string:${IOS_VERSION_STRING} version_code:${IOS_VERSION_CODE}
