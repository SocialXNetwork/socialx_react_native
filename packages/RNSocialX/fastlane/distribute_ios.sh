#!/usr/bin/env bash

export IOS_VERSION_STRING="0.1.9"
export IOS_VERSION_CODE=19

export $(egrep -v '^#' .env | xargs) # use env variables from .env file

bundle exec fastlane ios release \
	--env development \
	version_string:${IOS_VERSION_STRING} \
	version_code:${IOS_VERSION_CODE}
