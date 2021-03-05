
## Overview

This is a conceptual app to show a possible way to allow DHIS2 users to define their own help topics and provide customised help information within their DHIS2 instances. 

## Technical

This project was bootstrapped with [DHIS2 Application Platform](https://github.com/dhis2/app-platform). Redux is used for state management. To run locally, you can fork this repo, run `yarn install` and then `yarn start`. The app was developed running node v14.15.4.

## Design

This project intends to use the DHIS2 design system and native DHIS2 components to be consistent with DHIS2's look and feel.

## Limitations

This project is conceptual and there are a number of limitations:

- limited functionality: app illustrates option for contacting a "help desk", but no messaging is currently configured.
- nonrestricted datastore: datastore items for this app are created with rw permissions and the app does not currently allow refinement of sharing. As such, this app would not be appropriate for instances wishing to restrict information
- insufficient test coverage: a few unit tests have been added to this app for illustrative purposes, but they are not sufficient for full test coverage
- insufficient edge case and error handling: app largely uses a happy path and does not have an appropriate level of messaging for potential failures (for example due to internet connectivity)
- not UCD: this app was developed for explorative purposes and did not involve users in the design process.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner and runs all available tests found in `/src`.<br />

See the section about [running tests](https://platform.dhis2.nu/#/scripts/test) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
A deployable `.zip` file can be found in `build/bundle`!

See the section about [building](https://platform.dhis2.nu/#/scripts/build) for more information.

### `yarn deploy`

Deploys the built app in the `build` folder to a running DHIS2 instance.<br />
This command will prompt you to enter a server URL as well as the username and password of a DHIS2 user with the App Management authority.<br/>
You must run `yarn build` before running `yarn deploy`.<br />

See the section about [deploying](https://platform.dhis2.nu/#/scripts/deploy) for more information.

## Learn More

You can learn more about the platform in the [DHIS2 Application Platform Documentation](https://platform.dhis2.nu/).

You can learn more about the runtime in the [DHIS2 Application Runtime Documentation](https://runtime.dhis2.nu/).

To learn React, check out the [React documentation](https://reactjs.org/).
