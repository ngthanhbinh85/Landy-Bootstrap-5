/*
 * Landy - Bootstrap 5 Version
 * Updated & Maintained by Binh Nguyen (https://www.binhnguyensoft.com)
 * Based on the original Landy template by Paolo Tripodi (https://dribbble.com/shots/1409072-Landy-HTML-Template)
 */

document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('mainNav');

    const updateNavbar = () => {
	    navbar?.classList.toggle('is-visible', window.scrollY > 80);
    };

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
    
	const revealGroups = [
		{ selector: 'header', effect: '' },
		{ selector: '.carousel-iphone', effect: 'reveal--fade-left' },
		{ selector: '.payoff h1', effect: 'reveal--fade-left' },
		{ selector: '.purchase .app-badge', effect: 'reveal--pulse' },
		{ selector: '.features .col-md-4', effect: 'reveal--flip' },
		{ selector: '.social .col-lg-8', effect: 'reveal--fade-left' },
		{ selector: '.get-it .app-badge', effect: 'reveal--pulse' }
	];

	const revealElements = revealGroups.flatMap(({ selector, effect }) =>
		Array.from(document.querySelectorAll(selector), element => {
			element.classList.add('reveal');
			if (effect) element.classList.add(effect);
			return element;
		})
	);

	const reveal = element => element.classList.add('is-visible');

	if ('IntersectionObserver' in window) {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (!entry.isIntersecting) return;
				reveal(entry.target);
				observer.unobserve(entry.target);
			});
		}, {
			rootMargin: '0px 0px -12% 0px',
			threshold: 0.05
		});

		revealElements.forEach(element => observer.observe(element));
	} else {
		revealElements.forEach(reveal);
	}

	const navCollapse = document.getElementById('navbarLandyNav');
	if (navCollapse && window.bootstrap?.Collapse) {
		navCollapse.querySelectorAll('.nav-link').forEach(link => {
			link.addEventListener('click', () => {
				if (!navCollapse.classList.contains('show')) return;
				bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
			});
		});
	}

	const payoff = document.querySelector('.payoff');
	const social = document.querySelector('.social');
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
		|| (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
	let parallaxFrame = null;

	const updateParallax = () => {
		parallaxFrame = null;

		if (window.innerWidth <= 560 || isIOS || reducedMotion.matches) {
			payoff?.style.removeProperty('background-position');
			social?.style.removeProperty('background-position');
			return;
		}

		const offset = -window.scrollY / 3;
		if (payoff) payoff.style.backgroundPosition = `center ${offset - 150}px`;
		if (social) social.style.backgroundPosition = `center ${offset + 200}px`;
	};

	const scheduleParallax = () => {
		if (parallaxFrame !== null) return;
		parallaxFrame = window.requestAnimationFrame(updateParallax);
	};

	window.addEventListener('scroll', scheduleParallax, { passive: true });
	window.addEventListener('resize', scheduleParallax, { passive: true });
	reducedMotion.addEventListener?.('change', scheduleParallax);
	scheduleParallax();
});
