import { ConfigOptions } from './interfaces';
import { ParticleOptions, Particle } from './particle';
import { DecentralizedParticles } from './core';

export function createParticlesOnCanvas(element: HTMLCanvasElement, configOptions?: ConfigOptions, particleOptions?: ParticleOptions) {
	const ctx = element.getContext(`2d`);
	let width = () => element.clientWidth;
	let height = () => element.clientHeight;

	if (window && 'onresize' in window) {
		window.onresize = setDimentions;
	}

	function setDimentions() {
		element.width = width();
		element.height = height();
	}

	setDimentions();

	const particles = new DecentralizedParticles(configOptions, particleOptions);

	particles.beforeUpdate(() => {
		ctx.clearRect(0, 0, width(), height());
	});
	particles.createParticle(particle => {
		drawParticle(particle);

		particle.onUpdate(() => drawParticle(particle));
	});

	function drawParticle(particle: Particle) {
		ctx.globalAlpha = setAlpha(particle.age, particle.lifespan);
		ctx.beginPath();
		ctx.arc(particle.positionX * width(), particle.positionY * height(), particle.size / 2, 0, 2 * Math.PI, false);
		ctx.fillStyle = particle.background;
		ctx.fill();
	}

	function setAlpha(age: number, lifespan: number): number {
		if (age < 10) return age * 0.1;

		const cyclesLeft = lifespan - age;
		if (cyclesLeft < 10) return cyclesLeft * 0.1;

		return 1;
	}

	particles.start();

	return particles;
}
