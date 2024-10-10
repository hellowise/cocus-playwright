This project was built using **Playwright v1.48.0** with **Typescript**.

For test execution, you need to have and **Node.JS** installed in order to install dependencies.
Check how to download in the [official documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

After checking into the project main folder, follow the steps:
- Replace credentials data in .env with valid credentials for login.
- To install dependencies run either of the following (NPM is preferred because it was the choice for this project development):

```console
npm install
yarn install
```

- To install Playwright, execute: 

```console
npx playwright install
```

- To run this project execute the following command:

```console
npx playwright test --workers=1
```

Running with a single worker means tests will not run in parallel, but sequentially.
This is preferred due to the fact that only one account is available, and running in parallel might overwrite actions that result in errors during execution.
Support for parallel can be added for bigger projects, with more accounts available. For more information on parallelism, visit the [official documentation](https://playwright.dev/docs/test-parallel).

- To run in windowed mode with Playwright interface, run the following command:

```console
npx playwright test --ui --workers=1
```

- To run only a specific test tag, use the following:

```console
npx playwright test --grep @login
```

Check the [official documentation](https://playwright.dev/docs/test-annotations) for more tagging options available for execution.

Reports will be generated automatically after executions.
- To see reports, run the following command:

```console
npx playwright show-report
```

Reports will be stored inside folder playwright-report and can be accessed at any time by manually opening the index.html file.
Screenshots will be included in case of failures, and will show the state of the app during that failure. 

I came across some failures that were app-sided, like unexpected errors and something went wrong screens, so in case of failures, please check the screenshots.

Tests might fail running in parallel because there is only one user available. This can be updated to have more users, but due to the small size of the project, it wasn't implemented.
Make sure to run tests one by one to ensure there will be no failures due to action override in the same user.

- **NOTE**: In case you are experience protocol errors during execution, switch browsers to firefox.
Chromium can have an issue loading the page.