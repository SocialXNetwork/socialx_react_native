### Todo
- [ ] review installing lottie-react-native. Looks like a core dependency of this package 'lottie-ios' is being 
installed in top level node_modules, even if added to nohoist.
- [ ] Icons from react-native-vector-icons will break the app. 
Maybe related to script 'postinstall:compat:react-native-vector-icons'?
- [ ] Review script 'postinstall:link-native'. Running this global each time, has a side effect: will bring back double 
imported icons for react-native-vector-icons from native-base package, which depends on an older version of 
react-native-vector-icons. I was able to fix this manually but running rn link will add them back. 
Maybe safe to run rn link for a specific package when installed?