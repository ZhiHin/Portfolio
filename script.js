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
	// Header name
	setHTML('#header-name', HERO.name);

	// Navbar
	setHTML('#nav-home', TITLE.HOME);
	setHTML('#nav-about', TITLE.ABOUT);
	setHTML('#nav-projects', TITLE.PROJ);
	setHTML('#nav-contact', TITLE.CONTACT);

	// Hero section
	setHTML('#home .text-xl', HERO.greeting);
	setHTML('#home .text-5xl', HERO.name);
	setHTML('#home .roleloop', HERO.role);
	setHTML('#home .text-lg', HERO.description);

	// Buttons
	const btns = HERO.buttons
		.map(btn => `<a href="${btn.href}"${btn.target ? ` target="${btn.target}"` : ''} class="${btn.class}">${btn.text}</a>`)
		.join('');
	setHTML('#home .flex.gap-4.mb-6', btns);

	// Image
	const img = document.querySelector('#home img');
	if (img) {
		img.src = HERO.image.src;
		img.alt = HERO.image.alt;
		img.className = HERO.image.class;
	}

	// ABOUT SECTION
	setHTML('#about .text-4xl', TITLE.ABOUT);
	setHTML('#aboutDesc', ABOUT.LONGMSG);

	// Languages
	setHTML('#languages h3', TITLE.LANG);
	setHTML('#languages ul', ABOUT.languages.map(l => `<li>${l}</li>`).join(''));

	// Skills
	setHTML('#skills h3', TITLE.SKILL);
	setHTML('#skills ul', ABOUT.skills.map(s => `<li>${s}</li>`).join(''));

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
	setHTML('#work ul', ABOUT.work.map(w => `<li>${w}</li>`).join(''));

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
