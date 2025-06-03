// Scroll nav active class switching
const sections = document.querySelectorAll('section, header.hero');
const navLinks = document.querySelectorAll('nav ul li a');

function onScrollActive() {
    let scrollPos = window.scrollY + 90; // 90px for nav height + padding
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => {
                link.parentElement.classList.remove('active');
                if (link.getAttribute('href') === '#' + section.id) {
                    link.parentElement.classList.add('active');
                }
            });
        }
    });
    // Special for hero (id home)
    if (scrollPos < sections[1].offsetTop) {
        navLinks.forEach(link => link.parentElement.classList.remove('active'));
        navLinks[0].parentElement.classList.add('active'); // Home active
    }
}
window.addEventListener('scroll', onScrollActive);

// Volunteer Form Validation & Submission
const volunteerForm = document.getElementById('volunteerForm');
const nameInput = document.getElementById('nameInput');
const cityInput = document.getElementById('cityInput');
const roleSelect = document.getElementById('roleSelect');
const nameError = document.getElementById('nameError');
const cityError = document.getElementById('cityError');
const roleError = document.getElementById('roleError');
const formMessage = document.getElementById('form-message');

function validateInput() {
    let valid = true;

    // Name Validation
    if (nameInput.value.trim().length < 2) {
        nameError.textContent = "Please enter a valid name";
        valid = false;
    } else {
        nameError.textContent = "";
    }

    // City Validation
    if (cityInput.value.trim().length < 2) {
        cityError.textContent = "Please enter a valid city";
        valid = false;
    } else {
        cityError.textContent = "";
    }

    // Role Check
    if (roleSelect.value === "") {
        roleError.textContent = "Please select a role";
        valid = false;
    } else {
        roleError.textContent = "";
    }
    return valid;
}

volunteerForm.addEventListener('submit', e => {
    e.preventDefault();
    if (validateInput()) {
        formMessage.style.display = 'block';
        formMessage.style.color = '#2e7d32';
        formMessage.textContent = `Thank you, ${nameInput.value.trim()}! You are now a valued volunteer 🐾.`;
        volunteerForm.reset();
        // Bonus: Scroll gently to top of volunteer form after submit
        volunteerForm.scrollIntoView({ behavior: 'smooth' });
    } else {
        formMessage.style.color = '#c62828';
        formMessage.textContent = "Please fix errors above and resubmit.";
    }
});

// Buttons scroll and interactive triggers
document.getElementById('joinBtn').addEventListener('click', () => {
    alert('Thank you for your interest! Please sign up below to join the movement 🐶.');
    document.getElementById('volunteer').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('volunteerBtn').addEventListener('click', () => {
    document.getElementById('volunteer').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('learnBtn').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// Pet adoption carousel data
const pets = [
    {
        name: "Milo",
        desc: "Energetic dog who loves long walks in the park. 🐕",
        img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Luna",
        desc: "Sweet cat who enjoys cuddles and sunbeams. 🐱",
        img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=400&q=80"
    },
    {
        name: "Rocky",
        desc: "Loyal dog and great playmate for kids. 🦴",
        img: "https://www.shutterstock.com/image-photo/lonely-cute-brown-puppy-sitting-600nw-2239428987.jpg"
    },
    {
        name: "Bella",
        desc: "Gentle cat who loves books and quiet spaces. 🐾",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOs6NZfe4DsUL78wLGiNA-8wlKOmVGrMqdWA&s"
    },
    {
        name: "Charlie",
        desc: "Playful pup who never says no to fetch! 🎾",
        img: "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=400&q=80"
    }
];

// Render pet cards in carousel
const carouselTrack = document.getElementById('carouselTrack');
let pawPoints = 0;
const pointsCounter = document.getElementById('points-counter');

function updatePoints() {
    pointsCounter.textContent = `Your Paw Points: ${pawPoints} 🐾`;
}
updatePoints();

function createPetCard(pet, index) {
    const card = document.createElement('div');
    card.className = 'pet-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', 0);
    card.setAttribute('aria-label', `Pet ${pet.name}: ${pet.desc}`);
    card.dataset.index = index;

    card.innerHTML = `
        <img src="${pet.img}" alt="Image of ${pet.name}" class="pet-image" loading="lazy" />
        <div class="pet-content">
            <div class="pet-name">${pet.name}</div>
            <div class="pet-desc">${pet.desc}</div>
            <button class="adopt-btn" aria-label="Adopt ${pet.name}">Adopt me 🐾</button>
        </div>
    `;
    // On click or Enter key on button, increment Paw points and animate card
    const btn = card.querySelector('.adopt-btn');
    btn.addEventListener('click', () => {
        pawPoints++;
        updatePoints();
        animatePetCard(card);
        alert(`Thank you for wanting to adopt ${pet.name}! You earned 1 Paw Point! 🐾`);
    });

    // keyboard accessibility for Pet card container: enter/space triggers adopt button
    card.addEventListener('keydown', (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            btn.click();
        }
    });

    return card;
}
function animatePetCard(card) {
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    card.style.transform = 'scale(1.15)';
    card.style.boxShadow = '0 24px 48px #ff6f0066';
    setTimeout(() => {
        card.style.transform = '';
        card.style.boxShadow = '';
    }, 600);
}

pets.forEach((pet, i) => {
    carouselTrack.appendChild(createPetCard(pet, i));
});


// Enhanced hamburger menu toggle using class-based handling
document.getElementById('menuToggle').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
});

// Auto-close mobile nav when a navigation link is clicked
document.querySelectorAll('#navMenu li a').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.getElementById('navMenu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.getElementById('menuToggle').setAttribute('aria-expanded', false);
        }
    });
});