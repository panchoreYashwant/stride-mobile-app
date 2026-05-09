# Stride Mobile App

Production-focused Expo prebuild app in JavaScript with:
- Persistent login using Zustand + AsyncStorage
- Auth flow (`Login`) and app flow (`Home`, `Settings`, `Profile`) tabs
- Searchable, virtualized `FlatList` with API-backed data
- Axios API client with request/response interceptors and transient retry
- Quality gates via lint/test and GitHub Actions CI

## 1) Install and run

```bash
npm install
npm run prebuild
npm run ios
# or
npm run android
```

### iOS: Xcode build failed?

Expo prebuild generates native iOS code that depends on **CocoaPods**. You must install pods once, then open the **workspace** (not the raw project file).

1. Install CocoaPods if you do not have it yet (pick one):
   - Homebrew: `brew install cocoapods`
   - Or Expo helper from project root: `npx pod-install`
2. From the project root:
   - `npm run pod`  
   - or: `cd ios && pod install`
3. In Finder or Terminal, open **`ios/Stride.xcworkspace`** (double-click it, or `open ios/Stride.xcworkspace`).
4. In Xcode, pick a simulator and press **Run** (`Cmd + R`).
5. Keep Metro running in a terminal: `npm run start`

If you open **`Stride.xcodeproj`** instead of **`Stride.xcworkspace`**, the build usually fails with missing React Native / Expo native modules.

#### `pod install` fails: `xcodebuild requires Xcode` / `SDK "iphoneos" cannot be located`

macOS is using **Command Line Tools** as the active developer directory. React Native pods need the **full Xcode.app** (with iOS SDKs).

1. Install **Xcode** from the App Store (not only Command Line Tools).
2. Point the developer directory at Xcode (path may differ if Xcode is elsewhere):

   ```bash
   sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
   ```

3. Accept the license and finish first-launch setup in the Xcode app once.
4. Verify:

   ```bash
   xcodebuild -version
   xcrun --sdk iphoneos --show-sdk-path
   ```

5. Clean the failed pod state and reinstall:

   ```bash
   cd /Users/yashwant/stride-mobile-app/ios
   rm -rf Pods Podfile.lock build
   cd ..
   npm run pod
   ```

## 2) Environment config

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set:
- `EXPO_PUBLIC_API_BASE_URL`

## 3) Project structure

- `src/navigation`: Auth stack + tabs + root switching
- `src/store`: Zustand stores (`authStore`, `settingsStore`)
- `src/services`: API client and feature services
- `src/screens`: Login/Home/Settings/Profile screens
- `src/components`: Shared UI components
- `src/providers`: Error boundary

## 4) Production checklist

- Replace local demo login with backend auth/token flow
- Move sensitive auth artifacts to secure storage if required
- Add real permission handlers in settings
- Add app icons/splash assets before release
- Configure EAS credentials and run preview/prod builds
