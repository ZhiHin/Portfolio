// main.js
import { HERO, ABOUT, CONTACT, TITLE, MSG, PROJECTS } from './constants.js';

// Footer text constant
export const FOOTER = {
	MAIN: name => `© ${name} ${new Date().getFullYear()}. Built with passion and modern technologies.`,
	SUB: name => `Designed & Developed by ${name}`
};

// Flip card on click logic
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.flip-card').forEach(card => {
		card.addEventListener('click', function (e) {
			// Prevent click from bubbling to parent grid
			e.stopPropagation();
			this.classList.toggle('flipped');
		});
		// Optional: allow keyboard accessibility
		card.setAttribute('tabindex', '0');
		card.addEventListener('keydown', function (e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				this.classList.toggle('flipped');
			}
		});
	});
});

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
	setHTML('#languagesTitle', TITLE.LANG);
	setHTML('#languages h3', TITLE.LANG);
	setHTML('#languageList', ABOUT.languages.map(l => `<li>${l}</li>`).join(''));

	// Skills
	setHTML('#skillsTitle', TITLE.SKILL);
	setHTML('#skills h3', TITLE.SKILL);
	setHTML('#skillList', ABOUT.skills.map(s => `<li>${s}</li>`).join(''));

	// Technical Skills
	setHTML('#techSkillsTitle', TITLE.TECHSKILL);
	setHTML('#techSkills h3', TITLE.TECHSKILL);
	setHTML('#techSkillList', ABOUT.techSkills.map(ts => `<li>${ts}</li>`).join(''));

	// Education
	setHTML('#educationTitle', TITLE.EDU);
	setHTML('#education h3', TITLE.EDU);
	setHTML('#educationList', ABOUT.education.map(e => `
<p class="mb-4">
  <span class="font-bold">${e.degree}</span><br>
  ${e.school}<br>
  ${e.years}<br>
  CGPA: ${e.cgpa}
</p>
`).join(''));

	// Work
	setHTML('#workTitle', TITLE.WORK);
	setHTML('#work h3', TITLE.WORK);
	setHTML('#workList', ABOUT.work.map(w => `<li>${w}</li>`).join(''));

	//project Section (summaSphere)
	setHTML('#projects h2', PROJECTS.TITLE);
	setHTML('#projects p', PROJECTS.DESC);
	const projectImg = document.getElementById('carouselImg');
	if (projectImg) {
		projectImg.src = PROJECTS.IMG.src;
		projectImg.alt = PROJECTS.IMG.alt;
	}
	setHTML('#projectTitle1', PROJECTS.SS);
	setHTML('#projectTitle1 span', PROJECTS.SS2);
	setHTML('#projectDesc1', `
    <span class="font-semibold">${PROJECTS.FYP}</span> — ${PROJECTS.FYP_DESC}
    <span class="font-semibold text-indigo-700">${PROJECTS.FLUTTER}</span>${PROJECTS.AND}
    <span class="font-semibold text-indigo-700">${PROJECTS.DART}</span>,${PROJECTS.WITH}
    <span class="font-semibold text-green-700">${PROJECTS.PYT_REST}</span> ${PROJECTS.AI_SUM}<br>
    <span class="text-gray-600">${PROJECTS.FEATURE}</span> ${PROJECTS.FEATURE_DESC}
`);
	setHTML('#projectTag1_1', PROJECTS.FLUTTER);
	setHTML('#projectTag1_2', PROJECTS.DART);
	setHTML('#projectTag1_3', PROJECTS.PYTHON);
	setHTML('#projectTag1_4', PROJECTS.REST);
	setHTML('#projectTag1_5', PROJECTS.AI);

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

	// FOOTER SECTION
	const name = HERO.name;
	setHTML('#footer-main', FOOTER.MAIN(name));
	setHTML('#footer-sub', FOOTER.SUB(name));
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

const images = [
	'Image/project/fyp_dashboard.png',
	'Image/project/fyp_document.png',
	'Image/project/fyp_history.png',
	'Image/project/fyp_shareDocument.png',
	'Image/project/fyp_translate.png',
	'Image/project/fyp_txtSummarizer.png'
];
let current = 0;
const imgEl = document.getElementById('carouselImg');
const prevBtn = document.getElementById('prev-img');
const nextBtn = document.getElementById('next-img');
const carousel = document.getElementById('project-carousel');
const bullets = document.getElementById('carousel-bullets');

function showImg(idx) {
	imgEl.src = images[idx];
	updateBullets(idx);
}

function updateBullets(idx) {
	if (!bullets) return;
	bullets.innerHTML = images.map((_, i) =>
		`<span class="w-3 h-3 rounded-full mx-1 inline-block transition-all duration-300 ${i === idx ? 'bg-indigo-500 scale-125' : 'bg-gray-300'}"></span>`
	).join('');
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

// Responsive: hide next/prev on mobile, allow swipe only
function updateButtonVisibility() {
	if (window.innerWidth < 640) { // sm breakpoint
		prevBtn.classList.add('hidden');
		nextBtn.classList.add('hidden');
	} else {
		prevBtn.classList.remove('hidden');
		nextBtn.classList.remove('hidden');
	}
}
window.addEventListener('resize', updateButtonVisibility);
document.addEventListener('DOMContentLoaded', updateButtonVisibility);

// Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;
carousel.addEventListener('touchstart', function (e) {
	touchStartX = e.changedTouches[0].screenX;
});
carousel.addEventListener('touchend', function (e) {
	touchEndX = e.changedTouches[0].screenX;
	if (touchEndX < touchStartX - 40) {
		// Swipe left
		current = (current + 1) % images.length;
		showImg(current);
	} else if (touchEndX > touchStartX + 40) {
		// Swipe right
		current = (current - 1 + images.length) % images.length;
		showImg(current);
	}
});

// Initial render
showImg(current);
