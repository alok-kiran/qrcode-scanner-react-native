# qrcode-scanner written in React native

## Getting started
- Clone the repo in your machine
- run `yarn install` in the root directory
- run `cd ios && pod install` for iOS

## How to run
- run `yarn android` for android
- run `yarn ios` for iOS

## More Information
- The screens are made up of common reuseable components
- Every common compoent is written in typescript
- to send the sms with the required data `Linking.openURL` doesn't work correctly on many android device so I have used `react-native-sms` to implement it for both iOS and android
- more features will be added soon
