### Todo
- [ ] Fix RN postinstall scripts (check if postinstall:compat:react-native-vector-icons is needed!)
- [ ] Add fastlane
- [ ] Add bugsnag

---

### Readme
This is a yarn workspaces based mono repo boilerplate where the projects are

- commons
- storage api
- blockchain api
- data api
- react native application

The number of libraries are scoped to these top level structures because the current
implementation's generous approach to defining many top level libs create a mesh
of interdependencies, making it hard to assign library owners and maintain self
enclosed codebases. We should define top level libraries sparingly.

The following android updates have been made based on [this](http://albertgao.xyz/2018/05/30/24-tips-for-react-native-you-probably-want-to-know/)

- 2.2 update js core
- 3.1 update gradle
- 3.2 update versions

For compatibility with [image crop lib](https://github.com/ivpusic/react-native-image-crop-picker) we added:
```
 maven {
            url "https://jitpack.io"
        } 
```
in RNSocialX/android/build.gradle to allprojects.repositories

The following RN packages are linked:
1. react-native-randombytes 
2. react-native-fast-image
3. react-native-vector-icons
4. react-native-fs
5. react-native-image-crop-picker (Podfile)
6. react-native-image-resizer
7. lottie-react-native
8. lottie-ios (iOS only)
9. react-native-linear-gradient
10. react-native-blur
11. react-native-text-gradient
12. react-native-spinkit
13. react-native-device-info
14. react-native-video
15. react-native-photo-view
16. react-native-svg
17. bugsnag-react-native (Podfile)
18. react-native-smart-splash-screen
19. react-native-orientation (Podfile)
20. native-base

Before you begin, make sure you have installed the following tooling

- node >=8.11
- npm >=6.3
- yarn >=1.9 

Make sure you have a valid `packages/RNSocialX/src/app/app.config.json` file,
you can copy `packages/RNSocialX/src/app/app.config.example.json` if you don't
have one. If you have gun connection errors, change `127.0.0.1` to your
computer's local lan IP address.

To begin development, run the following commands

```
$ yarn run install
$ yarn run build
```

The build step must be repeated if modules have changed.

To run the app on the emulator/simulator, run the the following

```
$ yarn run start:database
$ yarn run start:js
$ yarn run start:android
$ yarn run start:ios
```

Use the latest [RN Debugger](https://github.com/jhen0409/react-native-debugger/releases)
in order to avoid compatibility issues with recent react native

There are some open issues that need to be followed

- packages/RNSocialX/src/environment/consts.ts there's a weird problem with asset re-exports
- https://github.com/ds300/react-native-typescript-transformer/issues/74 blocks us from using shared typescript configuration
- https://github.com/facebook/react-native/issues/20415 (blocker for node globals)
- https://github.com/facebook/react-native/issues/19859 (solved with a transform hack)
- https://github.com/facebook/react-native/issues/4968 (requires occasional
`yarn run reset && yarn run install && yarn run build`)
- Since RN migrated to babel7 and [babel7 supports](https://github.com/Microsoft/TypeScript-Babel-Starter)
out of box typescript support, it seems only natural to wire everything as a normal
babel monorepo to avoid all typescript related configuration problems and bugs in
the first place, but it turns out, you still need tsc compiler to both type check
and to output a final build for the dependencies, which defeats the purpose
- postinstall script for `react-native link` outputs errors but it looks like we can ignore
it as long as fastlane or ci don't complain about it. This is due to the nohoist
mechanism used in yarn conflicting with what rn's linking tool operates.
- added two postinstall scripts for react native gradient and vector icons, but they are
hacks for existing issues and they need to be removed as soon as the issues are resolved

Tests and linting are set up as part of the pre-commit hook using husky. Beware, though,
that the style rules in the old repository were conflicting at best, therefore
during the migration, there will be lots of inconsistencies and fixing requirements.
The precommit hook may be disabled if that proves to be a big problem, allowing
for linting to be applied later, but would then be a big bulk project of its own, too.

We should also consider adding `tslint-contrib-microsoft` but it currently has too
many outstanding issues to tackle at this time.

Finally, the current linting rules as well as prettier customizations should be
reviewed to align them with general industry standards and minimize overrides.

Sidenote: Migrating to `flow` should also be considered due to its more relaxed
environment and focus on static type checking, while leaving compilation to
babel, allowing for better tooling integration from the wider javascript community.
This is just a heads up to the possibility, not a definitive recommendation. Both
`flow` and `typescript` have their relative pros and cons.
