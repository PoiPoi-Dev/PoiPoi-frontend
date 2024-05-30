# senior-project-frontend

## Development

# API Keys
- Retrieve an API from https://protomaps.com/dashboard to be able to fetch map tiles.

# Setting up Firebase Local Emulator Suite
  1. Install firebase with `npm install -g firebase-tools`. To check your current version of firebase, run the command `firebase --version`.
   - The installation is done globally so if an `firebase: command not found` error, be sure to update your PATHS variable on your machine's environmental variables or run `npm exec -- firebase [CLI args]`
  2. Log into firebase with `firebase login` with the account that has the firebase project.
  3. Initialize firebase with `firebase init` and be setup the Authentication emulator.
    - If a .firebaserc file already exits, run the command `firebase init emulators` instead.
  4. Set your firebaseConfig object variables in `.env`. These values can be found in Google Firebase Console: `Project Settings → Your app → SDK setup and configuration`.
  5. Run command `firebase emulators:start`.
  