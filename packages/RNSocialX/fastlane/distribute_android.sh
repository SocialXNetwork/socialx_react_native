#!/usr/bin/env bash

export ANDROID_VERSION_STRING="0.4.1"
export ANDROID_VERSION_CODE=41

export $(egrep -v '^#' .env | xargs)

bundle exec fastlane android release \
	--env development \
	version_string:${ANDROID_VERSION_STRING} \
	version_code:${ANDROID_VERSION_CODE}
