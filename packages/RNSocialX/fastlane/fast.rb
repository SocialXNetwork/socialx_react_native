fastlane_version '2.100.1'

APPLE_USER = 'christian@socialx.network'
GOOGLE_JSON_KEY_PATH = "#{Dir.pwd}/android_google_play/gp-api-key.json"

ENV['LC_ALL'] = 'en_US.UTF-8'
ENV['LANG'] = 'en_US.UTF-8'

Dir.chdir("../ios") do
  ENV['EXTRA_PACKAGER_ARGS'] = "--sourcemap-output #{Dir.pwd}/index.ios.map"
end

before_all do
  # ensure_git_branch(branch: 'beta/*') # here can have a regex
  # ensure_git_status_clean
  git_pull
end

desc 'Project install: yarn + pods'
private_lane :install_dev do
  Dir.chdir("../../../") do
    sh('yarn reset && yarn install && yarn build')
  end
  Dir.chdir("../") do
    sh('yarn postinstall')
  end
end

desc 'Check version params are set'
private_lane :check_build_params do |options|
  if !options[:version_code]
    UI.abort_with_message! 'version_code parameter is missing'
  end

  if !options[:version_string]
    UI.abort_with_message! 'version_string parameter is missing'
  end
end

desc 'Update iOS BundleVersion and build number'
private_lane :version_ios do |options|
  set_info_plist_value(path: "./ios/RNSocialX/Info.plist", key: "CFBundleVersion", value: options[:version_code])
  set_info_plist_value(path: "./ios/RNSocialX/Info.plist", key: "CFBundleShortVersionString", value: options[:version_string])
end

desc 'Build the Android application'
private_lane :android_build do |options|
  gradle(
      task: 'clean',
      project_dir: './android',
  )
  gradle(
      task: 'assemble',
      build_type: 'Release',
      project_dir: './android',
      properties: {
        "versionCode" => options[:version_code],
        "versionName" => options[:version_string],
      }
  )
end

desc 'Upload APK to Google Play console, under: Release management -> Artifact library'
private_lane :send_play_store do
  upload_to_play_store(
      track: 'internal', # other options here: 'alpha', 'beta', 'production'
      json_key: "#{GOOGLE_JSON_KEY_PATH}",
      package_name: 'socialx.network',
      apk: './android/app/build/outputs/apk/app-release.apk',
  )
end

desc 'Send Android sources to BugSnag'
private_lane :android_bugsnag do |options|
  Dir.chdir("..") do
    bugsnag_version=options[:version_string].tr('^0-9', '').to_i 
    sh("./fastlane/scripts/android-bugsnag.sh '#{bugsnag_version*10+2}'")
  end
end

desc 'Build the iOS application'
private_lane :ios_build do
  gym(
      verbose: true,
      scheme: 'RNSocialX',
      workspace: './ios/RNSocialX.xcworkspace',
      clean: true,
      export_method: 'app-store',
  )
  # extract anc copy to ios folder main.jsbundle file to have it for bugsnag upload
  sh('unzip -o -j -d ${TMPDIR} ../RNSocialX.ipa Payload/RNSocialX.app/main.jsbundle && cp ${TMPDIR}/main.jsbundle ../ios')
end

desc 'Upload to TestFlight'
private_lane :send_testflight do
  upload_to_testflight(
      username: "#{APPLE_USER}",
      app_identifier: 'socialxnetwork',
      ipa: 'RNSocialX.ipa',
      skip_submission: true,
      skip_waiting_for_build_processing: true,
  )
end

desc 'Send iOS sources to BugSnag'
private_lane :ios_bugsnag do |options|
  Dir.chdir("..") do
    bugsnag_version=options[:version_string].tr('^0-9', '').to_i 
    sh("./fastlane/scripts/ios-bugsnag.sh '#{bugsnag_version*10+1}'")
  end
end

platform :ios do

  desc 'iOS build and upload flow'
  lane :release do |options|
    install_dev
    check_build_params options
    version_ios options
    ios_build
    send_testflight
    ios_bugsnag options
  end

end

platform :android do

  desc 'Android build and upload flow'
  lane :release do |options|
    install_dev
    check_build_params options
    android_build options
    send_play_store
    android_bugsnag options
  end

end

desc 'Android+iOS build and upload flow + Bugsnag'
lane :release do |options|
  install_dev
  check_build_params options
  version_ios options
  ios_build
  send_testflight
  ios_bugsnag options
  android_build options
  send_play_store
  android_bugsnag options
end