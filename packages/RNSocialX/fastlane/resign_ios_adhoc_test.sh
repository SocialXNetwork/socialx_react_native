#!/usr/bin/env bash

APP_NAME='RNSocialX'
IPA_PATH='../RNSocialX.ipa'
RESIGNED_IPA_FILE='RNSocialX_adHoc.ipa'
PROVISIONING_PROFILE_PATH='./ios_signing_files/SocialX_AdHoc_distribution.mobileprovision'
CERTIFICATE_IDENTITY='iPhone Distribution: SocialX Pte. Ltd (WJ7HBS2562)'

#1. Terminal: Unzip the ipa (it's just a zip file after all)
rm -rf ./tmp
mkdir -p tmp
unzip -q ${IPA_PATH} -d ./tmp

cd ./tmp

ENTITLEMENT_FILE='entitlements.plist'

#1a, You will need to have the entitlements file, this information is needed during signing.
codesign -d --entitlements :${ENTITLEMENT_FILE} "Payload/${APP_NAME}.app"

#2. Terminal: This will produce a `Payload/` directory. Remove the existing code signature.
rm -rf "Payload/${APP_NAME}.app/_CodeSignature"

#3. Terminal: You'll need a valid provisioning profile. Copy this into the payload.
cp ../${PROVISIONING_PROFILE_PATH} "Payload/${APP_NAME}.app/embedded.mobileprovision"

#4. Terminal: Now resign the application with your developer certificate. The CERTIFICATE_IDENTITY needs to match what's listed within Keychain Access.
#/usr/bin/codesign -f -s "${CERTIFICATE_IDENTITY}" Payload/${APP_NAME}.app
/usr/bin/codesign -f -s "${CERTIFICATE_IDENTITY}" --entitlements ${ENTITLEMENT_FILE} Payload/${APP_NAME}.app
#/usr/bin/codesign -f -s "${CERTIFICATE_IDENTITY}" --entitlements ${ENTITLEMENT_FILE} Payload/${APP_NAME}.app/Frameworks/*

#6. Terminal: Rezip the newly signed app
zip -qr "${RESIGNED_IPA_FILE}" Payload/

cd ..