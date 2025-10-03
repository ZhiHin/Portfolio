// main.js
import { HERO, ABOUT, CONTACT, TITLE, MSG } from './constants.js';

// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
	link.addEventListener('click', function (e) {
		const href = this.getAttribute('href');
		if (href.startsWith('#')) {
			e.preventDefault();
			document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
		}
	});
});

// Helper
function setHTML(selector, html) {
	const el = document.querySelector(selector);
	if (el) el.innerHTML = html;
}

// HERO SECTION
document.addEventListener('DOMContentLoaded', () => {
	// Responsive header name
	setHTML('#header-name-full', HERO.name);
	setHTML('#header-name', 'ZH');

	// Navbar
	setHTML('#nav-home', TITLE.HOME);
	setHTML('#nav-about', TITLE.ABOUT);
	setHTML('#nav-projects', TITLE.PROJ);
	setHTML('#nav-contact', TITLE.CONTACT);

	// Burger menu logic
	const burger = document.getElementById('burger-menu');
	const navLinks = document.getElementById('nav-links');
	burger.addEventListener('click', () => {
		navLinks.classList.toggle('hidden');
	});
	// Hide nav links on resize to md+
	window.addEventListener('resize', () => {
		if (window.innerWidth >= 768) {
			navLinks.classList.remove('hidden');
		} else {
			navLinks.classList.add('hidden');
		}
	});

	// Hero section
	setHTML('#home .text-xl', HERO.greeting);
	setHTML('#home .text-5xl, #home .text-4xl', HERO.name);
	setHTML('#home .roleloop', HERO.role);
	setHTML('#home .text-lg, #home .text-base', HERO.description);

	// Buttons
	const btns = HERO.buttons
		.map(btn => `<a href="${btn.href}"${btn.target ? ` target="${btn.target}"` : ''} class="${btn.class}">${btn.text}</a>`)
		.join('');
	setHTML('#heroButtons', btns);

	// Image
	const img = document.getElementById('hero-img');
	if (img) {
		img.src = HERO.image.src;
		img.alt = HERO.image.alt;
		img.className = HERO.image.class;
	}

	// ABOUT SECTION
	setHTML('#aboutTitle', TITLE.ABOUT);
	setHTML('#aboutDesc', ABOUT.LONGMSG);

	// Languages
setHTML('#languages h3', TITLE.LANG);
setHTML('#languages .language-list', ABOUT.languages.map(l => `<li>${l}</li>`).join(''));

// Skills
setHTML('#skills h3', TITLE.SKILL);
setHTML('#skills .skill-list', ABOUT.skills.map(s => `<li>${s}</li>`).join(''));

// Education
setHTML('#education h3', TITLE.EDU);
setHTML('#education .education-list', ABOUT.education.map(e => `
<p class="mb-4">
  <span class="font-bold">${e.degree}</span><br>
  ${e.school}<br>
  ${e.years}<br>
  CGPA: ${e.cgpa}
</p>
`).join(''));

// Work
setHTML('#work h3', TITLE.WORK);
setHTML('#work .work-list', ABOUT.work.map(w => `<li>${w}</li>`).join(''));

	// CONTACT SECTION
	setHTML('#contact-title', CONTACT.TITLE);
	setHTML('#contact-desc', CONTACT.DESC);
	setHTML('#contact-desc1', CONTACT.DESC1);
	setHTML('#contact-content', CONTACT.CONTENT);
	setHTML('#emailTitle', TITLE.EMAIL);
	setHTML('#phoneTitle', TITLE.PHONE);
	setHTML('#locationTitle', TITLE.LOC);
	setHTML('#email', CONTACT.EMAIL);
	setHTML('#phone', CONTACT.PHONE);
	setHTML('#location', CONTACT.LOCATION);
	setHTML('#contactMsg', MSG.SNDAMSG);
	setHTML('#contactSubmitBtn', MSG.SNDMSG);
});

// Typing and cycling animation for hero subtitle
document.addEventListener('DOMContentLoaded', () => {
	const subtitle = document.querySelector('.roleloop');
	if (!subtitle) return;
	const roles = [
		'Software Engineer',
		'UI/UX Designer',
		'Full Stack Developer',
		'Problem Solver'
	];
	let roleIndex = 0;
	let charIndex = 0;
	let typing = true;
	function typeRole() {
		const currentRole = roles[roleIndex];
		if (typing) {
			if (charIndex <= currentRole.length) {
				subtitle.textContent = currentRole.slice(0, charIndex);
				charIndex++;
				setTimeout(typeRole, 80);
			} else {
				typing = false;
				setTimeout(typeRole, 1200);
			}
		} else {
			if (charIndex > 0) {
				subtitle.textContent = currentRole.slice(0, charIndex - 1);
				charIndex--;
				setTimeout(typeRole, 40);
			} else {
				typing = true;
				roleIndex = (roleIndex + 1) % roles.length;
				setTimeout(typeRole, 400);
			}
		}
	}
	typeRole();
});


// Place in your script.js or a <script> tag after the section
const images = [
	'Image/project/fyp_dashboard.png',
	'Image/project/fyp_document.png',
	'Image/project/fyp_history.png',
	'Image/project/fyp_shareDocument.png',
	'Image/project/fyp_translate.png',
	'Image/project/fyp_txtSummarizer.png'
];
let current = 0;
const imgEl = document.getElementById('carousel-img');
const prevBtn = document.getElementById('prev-img');
const nextBtn = document.getElementById('next-img');
const carousel = document.getElementById('project-carousel');

function showImg(idx) {
	imgEl.src = images[idx];
}
prevBtn.onclick = () => {
	current = (current - 1 + images.length) % images.length;
	showImg(current);
};
nextBtn.onclick = () => {
	current = (current + 1) % images.length;
	showImg(current);
};
// Auto change every 3s
setInterval(() => {
	current = (current + 1) % images.length;
	showImg(current);
}, 3000);

// Hide buttons by default, show on hover (desktop) or tap (mobile)
function showButtons() {
	prevBtn.classList.remove('hidden');
	nextBtn.classList.remove('hidden');
}
function hideButtons() {
	prevBtn.classList.add('hidden');
	nextBtn.classList.add('hidden');
}
// Desktop: show on hover
carousel.addEventListener('mouseenter', showButtons);
carousel.addEventListener('mouseleave', hideButtons);
// Mobile: show on tap for 2s
carousel.addEventListener('touchstart', function() {
	showButtons();
	setTimeout(hideButtons, 2000);
});

// Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;
carousel.addEventListener('touchstart', function(e) {
	touchStartX = e.changedTouches[0].screenX;
});
carousel.addEventListener('touchend', function(e) {
	touchEndX = e.changedTouches[0].screenX;
	if (touchEndX < touchStartX - 40) {
		// Swipe left
		nextBtn.click();
	} else if (touchEndX > touchStartX + 40) {
		// Swipe right
		prevBtn.click();
	}
});
