This project was build using Playwright v1.48.0 with Typescript.

For test execution, you need to have and Node.JS installed in order to install dependencies.
Check how to download in the [official documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

After checking into the project main folder, follow the steps:
- Replace credentials data in .env with valid credentials for login.
- To install dependencies run either of the following (NPM is preferred because it was the choice for this project development):

```console
npm install
yarn install
```

- To run this project execute the following command:

```console
npx playwright test
```

- To run in windowed mode with Playwright interface, run the following command:

```console
npx playwright test --ui 
```

- To run only a specific test tag, use the following:

```console
npx playwright test --grep @login
```

Check [the official documentation](https://playwright.dev/docs/test-annotations) for more tagging options available for execution.

Reports will be generated automatically after executions.
- To see reports, run the following command:

```console
npx playwright show-report
```
Reports will be stored inside folder playwright-report and can be accessed at any time by manually opening the index.html file.

Tests might fail running in parallel because there is only one user available. This can be updated to have more users, but due to the small size of the project, it wasn't implemented.
Make sure to run tests one by one to ensure there will be no failures due to action override in the same user.

NOTE: In case you are experience protocol errors during execution, switch browsers to firefox.
Chromium has an issue loading the page.