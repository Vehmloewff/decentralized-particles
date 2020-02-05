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
		let img: HTMLOrSVGImageElement;

		if (isImage(particle.background)) {
			img = document.createElement('img');
			img.src = particle.background;
		}

		drawParticle(particle, img);

		particle.onUpdate(() => drawParticle(particle, img));
	});

	function drawParticle(particle: Particle, img?: HTMLOrSVGImageElement) {
		if (!particle.options.keepAround) ctx.globalAlpha = setAlpha(particle.age, particle.lifespan);

		if (img) {
			ctx.drawImage(img, particle.positionX * width(), particle.positionY * height(), particle.size, particle.size);
		} else {
			ctx.beginPath();
			ctx.arc(particle.positionX * width(), particle.positionY * height(), particle.size / 2, 0, 2 * Math.PI, false);
			ctx.fillStyle = particle.background;
			ctx.fill();
		}
	}

	function setAlpha(age: number, lifespan: number): number {
		if (age < 10) return age * 0.1;

		const cyclesLeft = lifespan - age;
		if (cyclesLeft < 10) return cyclesLeft * 0.1;

		return 1;
	}

	function isImage(background: string) {
		const char1 = background.charAt(0);

		if (char1 === `.` || char1 === `/`) return true;
		if (/^data:image\//.test(background)) return true;
		return false;
	}

	particles.start();

	return particles;
}
