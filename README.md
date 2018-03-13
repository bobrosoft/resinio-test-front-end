Based on my [angular4-webpack-starter](https://github.com/bobrosoft/angular4-webpack-starter)

## Notes
- all things covered with unit-tests with 100% coverage
- app uses NgRx for state management (Angular's Redux-like concept) and immutability
- I didn't divide all into modules for that small app (because there will be only one module), but can be done
- I didn't use i18n external module to store text copy/translations for that small app, but can be done
- methods mostly haven't JSDocs added to them because proper component-based event-driven
approach allows to write clean self-explanatory code using proper method naming

## Prerequisites
- Node 6+

## Installation
- `git clone https://github.com/bobrosoft/resinio-test-front-end.git`
- `cd resinio-test-front-end`
- `yarn` or `npm install`

## Run the app
- `yarn server` or `npm run server`

## Run tests
- `yarn test` or `npm run test`