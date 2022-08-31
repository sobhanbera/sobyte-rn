<div align="center">
  <img alt="Sobyte Logo" src="./.github_src/named_logo.png" width="400px" />

**Let's Feel The Music.**

</div>

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0.0-blue.svg?cacheSeconds=2592000" />
  <!-- <a href="https://github.com/sobhanbera/sobyte" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a> -->
</p>

## Table of Contents

<ol>
<li>
    <a href="#app-features-">App Features</a>
</li>
<li>
    <a href="#environment-setup-">Environment Setup</a>
</li>
<li>
    <a href="#commands-">Available Commands</a>
</li>
<li>
    <a href="#file-structure-">File Structure</a>
</li>
<li>
    <a href="#author-">Author</a>
</li>
<li>
    <a href="#contact-">Connect with me!</a>
</li>
</ol>

## App Features ✨

-   Full-Fledged Music Streaming
-   Theme Mechanism (Dark/Light)
-   Colorscheme System
-   Extremely easy to use
-   Minimilastic and Attractive UI
-   Language support (i18n)
-   Offline Capabilities
-   Customizable features.

## Environment Setup ❤️

1. Install Packages

```sh
yarn install
```

2. This step is crucial and important too.

    - Change the code in files `Blob.js`, `Fetch.js`, `FileReader.js`, `XMLHttpRequest.js` as shown below :-

    ```diff
    -   import RNFetchBlob from '../index.js'
    +   import {NativeModules} from 'react-native';
    +   const RNFetchBlob = NativeModules.RNFetchBlob
    ```

    This will resolve the warning -
    `Require cycle: node_modules/rn-fetch-blob/index.js -> node_modules/rn-fetch-blob/polyfill/index.js -> node_modules/rn-fetch-blob/polyfill/Blob.js -> node_modules/rn-fetch-blob/index.js`

3. And finally start the server:

```sh
yarn start
```

## Commands 🖥️

1. Install Packages

```sh
yarn install
```

2. Start server

```sh
yarn start
```

3. Unit testing with jest

```sh
yarn test
```

4. Start server after clearing server's cache

```sh
yarn reset
```

5. Run on android device

```sh
yarn android
```

6. Run on IOS

```sh
yarn ios
```

7. Build the project for android

```sh
yarn build
```

8. Project linting

```sh
yarn lint
```

9. Check for proper file format

```sh
yarn prettier-check
```

10. Format files using prettier

```sh
yarn prettier-format
```

## File Structure 📁

<details>
  <summary>Root Project Source</summary>

```.text
src
├── api
│   ├── index.ts
│   └── music
│       └── index.ts
├── assets
│   ├── anims
│   ├── audios
│   ├── fonts
│   │   ├── Circular-Black.otf
│   │   ├── Circular-Bold.otf
│   │   ├── Circular-Light.otf
│   │   ├── Circular-Medium.otf
│   │   └── Circular-Regular.otf
│   ├── images
│   │   ├── icons
│   │   │   ├── backwardb.png
│   │   │   ├── backward.png
│   │   │   ├── forwardb.png
│   │   │   ├── forward.png
│   │   │   ├── pause.png
│   │   │   └── play.png
│   │   └── logos
│   │       ├── named.png
│   │       └── sobyte_white.png
│   └── videos
├── components
│   ├── BluredImageBackgroundRenderer.tsx
│   ├── BluredImageBackground.tsx
│   ├── BottomPaddingComponent.tsx
│   ├── index.ts
│   ├── SobyteMarquee.tsx
│   ├── SobyteTextView.tsx
│   ├── TrackControls.tsx
│   ├── TrackPlayerDescriptionRenderer.tsx
│   ├── TrackPlayerDescription.tsx
│   ├── TrackPlayerFooter.tsx
│   ├── TrackPlayerHeader.tsx
│   ├── TrackPlayerImage.tsx
│   ├── TrackPlayerQueueTrack.tsx
│   └── TrackPlayerVolumeChangerMenu.tsx
├── configs
│   ├── apicodes.ts
│   ├── constants.ts
│   ├── endpoints.ts
│   ├── index.ts
│   ├── limits.ts
│   ├── redux.ts
│   ├── regex.ts
│   ├── screens.ts
│   ├── searchqueries.ts
│   ├── storage.ts
│   └── tempmail.ts
├── containers
│   ├── app
│   │   ├── index.ts
│   │   ├── SobytePlayerInterface.tsx
│   │   └── TrackPlayerQueueScreen.tsx
│   ├── auth
│   │   ├── ForgotPass.tsx
│   │   ├── index.ts
│   │   ├── Landing.tsx
│   │   ├── OTPScreen.tsx
│   │   ├── SignIn.tsx
│   │   └── SignUp.tsx
│   └── index.ts
├── deeplinks
│   └── index.ts
├── error
│   ├── ErrorBoundary.tsx
│   └── FallbackComponent.tsx
├── export
│   └── index.tsx
├── hooks
│   ├── index.ts
│   ├── useMusic.ts
│   ├── useTheme.ts
│   └── useTrackPlayer.ts
├── i18n
│   ├── index.ts
│   └── resources
│       ├── bn.ts
│       ├── en.ts
│       ├── hi.ts
│       ├── index.ts
│       ├── mr.ts
│       └── template.d.ts
├── navigators
│   ├── AppNavigator.tsx
│   ├── AppStackNavigator.tsx
│   ├── AuthStackNavigator.tsx
│   └── index.ts
├── rules
│   └── index.ts
├── schemas
│   ├── index.ts
│   └── music.d.ts
├── services
│   ├── index.ts
│   ├── playerservices.ts
│   └── SobyteTrackPlayer.tsx
├── state
│   ├── index.ts
│   ├── reducers
│   │   ├── index.ts
│   │   ├── MusicConfig.ts
│   │   ├── PlayerData.ts
│   │   ├── Theme.ts
│   │   └── TrackURLData.ts
│   └── store.ts
├── theme
│   ├── index.ts
│   ├── styles
│   │   └── index.ts
│   ├── theme.d.ts
│   ├── themes
│   │   ├── common.ts
│   │   ├── darktheme.ts
│   │   ├── index.ts
│   │   └── lighttheme.ts
│   └── vars
│       ├── fonts.ts
│       ├── gutters.ts
│       ├── index.ts
│       ├── layouts.ts
│       └── variables.ts
└── utils
    ├── colors.ts
    ├── index.ts
    ├── musicparser.ts
    ├── music.ts
    ├── objects.ts
    └── storage.ts
```

</details>

## Author 👤

**Sobhan Bera**

-   Website: https://sobhanbera.github.io
-   Twitter: [@sobhanbera\_](https://twitter.com/sobhanbera_)
-   Github: [@sobhanbera](https://github.com/sobhanbera)
-   LinkedIn: [@sobhanbera](https://linkedin.com/in/sobhanbera)

## Contact 📱

</br>
<p align='center'>
  <a href="https://www.linkedin.com/in/sobhanbera">
    <img style="border-radius:25px" src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>&nbsp;&nbsp;
  <a href="https://www.instagram.com/sobhanbera_">
    <img  style="border-radius:25px"src="https://img.shields.io/badge/instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white" />
  </a>&nbsp;&nbsp;
</p>

<p align='center'>
  <a href="https://www.facebook.com/sobhanberaos">
    <img style="border-radius:25px" src="https://img.shields.io/badge/sobhanbera-%233b5998.svg?&style=for-the-badge&logo=facebook&logoColor=white" />
  </a>&nbsp;&nbsp;
  <a href="https://twitter.com/BeraSobhan">
    <img style="border-radius:25px" src="https://img.shields.io/badge/twitter-%2300acee.svg?&style=for-the-badge&logo=twitter&logoColor=white" />
  </a>&nbsp;&nbsp;
  <a href="mailto:sobhanbera258@gmail.com">
    <img style="border-radius:25px" src="https://img.shields.io/badge/-sobhanbera258-c14438?style=for-the-badge&logo=Gmail&logoColor=white&link=mailto:sobhanbera258@gmail.com" />
  </a>&nbsp;&nbsp;
</p>

<br />

<div align="center">
  <img alt="Sobyte Logo" src="./.github_src/named_logo.png" width="400px" />

**Let's Feel The Music.**

</div>
