# nodejs-template

## Startup

```sh
npx degit Vehmloewff/nodejs-template#typescript nodejs-app
# or the javascript branch
cd nodejs-app
npm i
```

## Running the tests

```sh
npm test
# or
npm test -- -w
```

## Linting

```sh
npm run lint
# or
npm run lint:test
```

_Delete this line and everything above it_

---

# todo

TODO: Add a description

## Installation

```sh
npm i todo
```

## Usage

```js
const todo = require('todo');

todo(options);
```

## API

### todo(options: object) => void

Valid options are:

-   `todoCreate: boolean` Marks the ne project as a `todo`. Deafult is `false`
-   `delay: number` The amount of time to delay the cone. Default is `0`

## Contributing?

**Sure!**

```sh
# fork repo
git clone https://github.com/[your_username]/todo
cd todo
npm i
npm test -- -w
```

Pull Requests are always welcome!

_PS: Don't forget to `npm run lint`!_ :wink:

## License

[MIT](/LICENSE)
