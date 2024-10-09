This project was build using Playwright v1.48.0 with Typescript.

To install dependencies run either of the following (NPM is preferred simply because it was the choice for this project development):

```console
npx install
yarn install
```

To run this project execute the following command:

```console
npx playwright test
```

To run in windowed mode with Playwright interface, run the following command:

```console
npx playwright test --ui 
```

Tests might fail running in parallel because there is only one user available. This can be updated to have more users, but due to the small size of the project, it wasn't implemented.
Make sure to run tests one by one to ensure there will be no failures due to action override in the same user.

NOTE: In case you are experience protocol errors during execution, switch browsers to firefox.
Chromium has an issue loading the page.