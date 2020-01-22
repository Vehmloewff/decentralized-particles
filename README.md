[![Active Development](https://img.shields.io/badge/Maintenance%20Level-Actively%20Developed-brightgreen.svg)](https://gist.github.com/cheerfulstoic/d107229326a01ff0f333a1d3476e068d) [![Active Development](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/Vehmloewff/decentralized-particles/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Vehmloewff/decentralized-particles/CI)](https://github.com/Vehmloewff/decentralized-particles/actions)

# decentralized-particles

An unbelievably small and lightweight particles animation engine.

Runs in both node and the browser!

## Installation

### npm

The easiest way to use this package is with `npm` + your favorite javascript bundler:

```sh
npm i decentralized-particles
```

### CDN or direct download

If you prefer the old-school method, you can use the CDN (`https://unpkg.com/decentralized-particles/dist/build.iife.js`),
or you can directly [download](https://unpkg.com/decentralized-particles/dist/build.iife.js) the latest iife build.

```html
<script src="cdn/or/path/to/package/"></script>
```

Both old-school methods expose a `DParticles` object to the window that is equivalent to this:

```js
import * as DParticles from 'decentralized-particles';
```

## Usage

```js
import { createParticlesOnCanvas } from 'decentralized-particles';

createParticlesOnCanvas(canvasElement, { nextFrameCaller: fn => requestAnimationFrame(fn) });
```

The unique thing about this package is that the particles do not have to be drawn on canvas. They can be anything, anywhere! Particles are completly abstract, 100% decentralized. Check out the [DecentralizedParticles example](#decentralizedparticles), or the [official canvas implementation](src/canvas.ts) for more information.

## API

### createParticlesOnCanvas

`(element: HTMLCanvasElement, configOptions:`[`ConfigOptions`](#configoptions)`, particleOptions`[`ParticleOptions`](#particleoptions)`) =>`[`DecentralizedParticles`](#decentralizedparticles)

Implements the particle animation engine on canvas.

Both `configOptions` and `particleOptions` are passed directly into [`DecentralizedParticles`](#decentralizedparticles)

### DecentralizedParticles

This has no link to the GUI. That is for you to do (note the `createParticle` function).

Example:

```js
const parent = document.getElementById('particles');
const particles = new DecentralizedParticles(configOptions, particleOptions);

particles.createParticle(particle => {
	const element = document.createElement('particle');
	parent.appendChild(element);

	setPos();
	particle.onUpdate(setPos);

	function setPos() {
		element.style.left = particle.positionX;
		element.style.top = particle.positionY;
	}

	particle.onDestroy(() => element.remove());
});

particles.start();
```

`particleOptions` should be of type [`ParticleOptions`](#particleoptions), as it is passed directly into [`Particle`](#particle).

`configOptions` must be of type [`ConfigOptions`](#configoptions).

#### createParticle(fn)

`fn` will be called every time a new particle is created. An instance of `Particle` will be passed in as the first and only argument.

#### beforeUpdate(fn)

Calls `fn` before each update.

#### afterUpdate(fn)

Calls `fn` after each update.

#### start()

This starts the animation.

#### pause()

Pauses the animation.

Returns a function that will play the animation when called.

### ConfigOptions

-   `particlesCount` _(optional)_: An object containing the `min` and `max` values. Default is `max: 200, min: 150`
-   `nextFrameCaller` _(optional)_: A function that calls a callback when ready to go to the next frame. Default:
    ```js
    fn => setTimeout(fn, 16);
    ```
    Note: When in the browser, you will want to set this to:
    ```js
    fn => requestAnimationFrame(fn);
    ```

### Particle

```js
new Particle(options);
```

`options` must be of type [`ParticleOptions`](#particleoptions).

#### options

The options passed into [`Particle`](#particle).

#### size: number

A randomly selected number between `options.size.min` and `options.size.max`.

#### background: string

A chosen background based off of `options.background`.

#### lifespan: number

A randomly selected number between `options.lifespan.min` and `options.lifespan.max`.

#### speed: number

A randomly selected number between `options.speed.min` and `options.speed.max`.

The actual speed of the particle will vary though, and this number is just used as a starting point.

#### id: string

A random 20 character string used behind the scenes.

#### age: number

The amount of updates this particle has had. It will automaticly self-destruct when `age` >= `lifespan`.

#### positionX: number

A number between 1 and 0. The current positionX of the particle.

#### positionY: number

A number between 1 and 0. The current positionY of the particle.

#### initialPositionX: number

A number between 1 and 0. The positionX that the particle had when it was created.

#### initialPositionY: number

A number between 1 and 0. The positionY that the particle had when it was created.

#### finalPositionX: number

A number between 1 and 0. The planned positionX that the particle is to reach when `age` === `lifespan`.

#### finalPositionY: number

A number between 1 and 0. The planned positionY that the particle is to reach when `age` === `lifespan`.

#### triggerUpdate()

This will trigger a new update in the particle's lifecycle. Used behind the scenes.

#### onUpdate(fn)

`fn` is called each time a new update is triggered.

#### destroy()

Destroys the particle. This method is called when `age` === `lifespan` or when `positionX` or `positionY` becomes less than 0 or greater than 1.

#### onDestroy(fn)

`fn` is called when the particle is destroyed.

### ParticleOptions

-   `size` _(optional)_: An object containing the `min` and `max` keys. Default is `max: 7, min: 3`.
-   `background` _(optional)_: A string that represents the background, or an array of strings. Default is `#ddd`.
-   `lifespan` _(optional)_: The amount of updates until the particle self-destructs: An object containing the `min` and `max` keys. Default is `max: 400, min: 300`.
-   `speed` _(optional)_: The amount to move each particle per update. Default is `max: 0.0005, min: 0.0009`.

## Contributing?

**Sure!**

```sh
# fork repo
git clone https://github.com/[your_username]/decentralized-particles
cd decentralized-particles
npm i
npm run dev
```

Pull Requests are always welcome!

_PS: Don't forget to `npm run lint`!_ :wink:

## License

[MIT](/LICENSE)
