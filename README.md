# React Study Project
[![Build Status](https://travis-ci.org/nikolay-borzov/react-mentoring.svg?branch=master)](https://travis-ci.org/nikolay-borzov/react-mentoring)
[![Coverage Status](https://coveralls.io/repos/github/nikolay-borzov/react-mentoring/badge.svg?branch=master)](https://coveralls.io/github/nikolay-borzov/react-mentoring?branch=master)

# Development

To start dev server
```
npm start
```

To build using dev config
```
npm build
```

# Production

To run server (will build beforehand)
```
npm run start:prod
```

To build
```
npm run build:prod
```

# Tests

```
npm run test
```

# Configuration
In order to set API URL create `.env` in the root of the project directory.
```
# Example
API_URL=https://moviedb.net/api
```

Then run `build` or `start` command

# Query string params

 - `throwError=1`: throws error to test error boundaries
 - `limit=50`: sets displayed results count


# Attributions
 - Favicon by [Nick Roach](http://www.elegantthemes.com/)
 - Titillium Web font by Accademia di Belle Arti di Urbino and students of MA course of Visual design
 - Spinner animations by [tobiasahlin](https://github.com/tobiasahlin/SpinKit)