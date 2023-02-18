# Lalahome

## Tech Stack

ReactNative, Redux Toolkit, NativeBase, Yup, React-Hook-Form, React Navigation

## Documentation

- [Native Base](https://docs.nativebase.io/?utm_source=HomePage&utm_medium=header&utm_campaign=NativeBase_3)
- [App Center Integrate React Native Android](https://learn.microsoft.com/en-us/appcenter/sdk/getting-started/react-native#312-integrate-react-native-android)
- [App Center Integrate React Native iOS](https://learn.microsoft.com/en-us/appcenter/sdk/getting-started/react-native#311-integrate-react-native-ios)

## Run Locally

Clone the project

```bash
  git clone https://gitlab.com/hungnt144/phanminhhome_mobile.git Lalahome
```

Go to the project directory

```bash
  cd Lalahome
```

Install dependencies

```bash
  yarn install
```

Start Android

```bash
  yarn android
```

Start IOS

```bash
  yarn ios
```

Start Website

```bash
  yarn web
```

## Deployment

To deploy this project run

```bash
  yarn build:web
```

## Platform specific code

- Button.tsx (default - **required**)
- Button.android.tsx (Android)
- Button.ios.tsx (IOS)
- Button.web.tsx (Web)
- Button.native.tsx (Android & IOS)

## Call API (Only Native)

- adb reverse tcp:8080 tcp:8080
