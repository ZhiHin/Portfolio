
// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
	link.addEventListener('click', function(e) {
		const href = this.getAttribute('href');
		if (href.startsWith('#')) {
			e.preventDefault();
			document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
		}
	});
});


// Highlight nav on scroll and add navbar shadow
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');
function updateNavbarShadow() {
	if (window.scrollY > 10) {
		navbar.style.boxShadow = '0 4px 24px #8f5fff44';
	} else {
		navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
	}
}
window.addEventListener('scroll', () => {
	let current = '';
	sections.forEach(section => {
		const sectionTop = section.offsetTop - 120;
		if (window.scrollY >= sectionTop) {
			current = section.getAttribute('id');
		}
	});
	navLinks.forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('href') === '#' + current) {
			link.classList.add('active');
		}
	});
	updateNavbarShadow();
});
window.addEventListener('resize', updateNavbarShadow);

// Contact form feedback
const contactForm = document.getElementById('contact-form');
if (contactForm) {
	contactForm.addEventListener('submit', function(e) {
		e.preventDefault();
		alert('Thank you for your message! I will get back to you soon.');
		contactForm.reset();
	});
}
