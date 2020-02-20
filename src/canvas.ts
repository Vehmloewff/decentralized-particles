import { ConfigOptions } from './interfaces';
import { ParticleOptions, Particle } from './particle';
import { DecentralizedParticles } from './core';
import { Segment } from './segment';

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
	particles.createSegment(segment => {
		drawSegment(segment);

		segment.onUpdate(() => drawSegment(segment));
	});

	function drawParticle(particle: Particle, img?: HTMLOrSVGImageElement) {
		if (img) {
			ctx.drawImage(img, particle.positionX * width(), particle.positionY * height(), particle.size, particle.size);
		} else {
			ctx.beginPath();
			ctx.arc(particle.positionX * width(), particle.positionY * height(), particle.size / 2, 0, 2 * Math.PI, false);
			ctx.fillStyle = particle.background;
			ctx.fill();
		}
	}

	function drawSegment(segment: Segment) {
		ctx.beginPath();

		ctx.moveTo(segment.positionX1 * width(), segment.positionY1 * height());
		ctx.lineTo(segment.positionX2 * width(), segment.positionY2 * height());
		ctx.strokeStyle = segment.stroke;
		ctx.lineWidth = segment.width;
		ctx.stroke();
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
