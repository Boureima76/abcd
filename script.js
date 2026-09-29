// ===== MENU RESPONSIVE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu après clic sur un lien
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== DONNÉES DES DESTINATIONS (page index uniquement) =====
const destinationsData = {
    cascades: {
        title: "Cascades de Banfora",
        image: "image/image2.jpg",
        description: "Les Cascades de Banfora sont l'une des merveilles naturelles les plus spectaculaires du Burkina Faso. Situées à environ 10 km de la ville de Banfora, ces chutes d'eau majestueuses se jettent dans un bassin naturel entouré d'une végétation luxuriante. C'est un lieu idéal pour la baignade, la détente et la photographie.",
        info: [
            { icon: "fa-map-marker-alt", text: "À 10 km de Banfora, région des Cascades" },
            { icon: "fa-clock", text: "Ouvert tous les jours de 8h à 18h" },
            { icon: "fa-ticket-alt", text: "Entrée : 1 000 - 2 000 FCFA" },
            { icon: "fa-water", text: "Hauteur des chutes : environ 15 mètres" },
            { icon: "fa-camera", text: "Site idéal pour la photographie et la baignade" }
        ]
    },
    domes: {
        title: "Dômes de Fabédougou",
        image: "image/image1.jpg",
        description: "Les Dômes de Fabédougou sont des formations rocheuses calcaires uniques au monde, sculptées par l'érosion pendant des millions d'années. Ces dômes aux formes arrondies et aux couleurs ocre créent un paysage lunaire fascinant. Le site est classé monument naturel et attire de nombreux visiteurs et géologues.",
        info: [
            { icon: "fa-map-marker-alt", text: "À 17 km de Banfora, près de Fabédougou" },
            { icon: "fa-clock", text: "Visite guidée recommandée (1h30)" },
            { icon: "fa-ticket-alt", text: "Entrée : 1 000 FCFA + guide" },
            { icon: "fa-mountain", text: "Formations calcaires âgées de millions d'années" },
            { icon: "fa-sun", text: "Meilleure période : novembre à février" }
        ]
    },
    sindou: {
        title: "Pics de Sindou",
        image: "image/image3.jpg",
        description: "Les Pics de Sindou sont un ensemble impressionnant de formations rocheuses en grès qui s'élèvent comme des cathédrales naturelles. Ce site mystérieux est chargé d'histoire et de légendes locales. Les pics offrent une vue panoramique exceptionnelle sur la région et sont particulièrement spectaculaires au coucher du soleil.",
        info: [
            { icon: "fa-map-marker-alt", text: "À 40 km de Banfora, près de Sindou" },
            { icon: "fa-clock", text: "Visite : 2h minimum recommandé" },
            { icon: "fa-ticket-alt", text: "Entrée : 1 500 FCFA + guide local" },
            { icon: "fa-mountain", text: "Formations de grès aux formes uniques" },
            { icon: "fa-sun", text: "Coucher de soleil spectaculaire" },
            { icon: "fa-hiking", text: "Sentiers de randonnée disponibles" }
        ]
    }
};

// ===== MODAL DÉTAILS DESTINATION (page index uniquement) =====
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalInfo = document.getElementById('modal-info');
const closeModal = document.querySelector('.close-modal');

if (modal && closeModal) {
    // Ouvrir le modal au clic sur une carte destination
    document.querySelectorAll('.destination-card').forEach(card => {
        card.addEventListener('click', () => {
            const destinationKey = card.getAttribute('data-destination');
            const data = destinationsData[destinationKey];
            
            if (data) {
                modalImg.src = data.image;
                modalImg.alt = data.title;
                modalTitle.textContent = data.title;
                modalDescription.textContent = data.description;
                
                modalInfo.innerHTML = data.info.map(item => 
                    `<li><i class="fas ${item.icon}"></i> ${item.text}</li>`
                ).join('');
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModalFunc() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeModal.addEventListener('click', closeModalFunc);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFunc();
        }
    });
}

// ===== GALERIE PERSONNALISÉE (page index uniquement) =====
const gallery = document.getElementById('gallery');
const photoInput = document.getElementById('photo-input');
const addPhotoBtn = document.getElementById('add-photo-btn');
const clearGalleryBtn = document.getElementById('clear-gallery-btn');

if (gallery && photoInput && addPhotoBtn && clearGalleryBtn) {
    addPhotoBtn.addEventListener('click', () => {
        photoInput.click();
    });

    photoInput.addEventListener('change', (e) => {
        const files = e.target.files;
        
        if (files.length === 0) return;
        
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `<img src="${event.target.result}" alt="Photo ajoutée">`;
                gallery.appendChild(galleryItem);
            };
            reader.readAsDataURL(file);
        });
        
        photoInput.value = '';
    });

    clearGalleryBtn.addEventListener('click', () => {
        if (confirm('Voulez-vous vraiment effacer toutes les photos de la galerie ?')) {
            gallery.innerHTML = '';
        }
    });

    // Zoom lightbox
    gallery.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (!galleryItem) return;
        
        const img = galleryItem.querySelector('img');
        if (!img) return;
        
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
            cursor: zoom-out;
            animation: fadeIn 0.3s;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 0 50px rgba(0,0,0,0.5);
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', () => {
            lightbox.remove();
        });
        
        document.addEventListener('keydown', function closeLightbox(e) {
            if (e.key === 'Escape') {
                lightbox.remove();
                document.removeEventListener('keydown', closeLightbox);
            }
        });
    });
}

// ===== FORMULAIRE DE CONTACT (page contact uniquement) =====
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nom = document.getElementById('nom').value.trim();
        const email = document.getElementById('email').value.trim();
        const sujet = document.getElementById('sujet').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!nom || !email || !sujet || !message) {
            formMessage.textContent = 'Veuillez remplir tous les champs.';
            formMessage.style.display = 'block';
            formMessage.style.background = '#f8d7da';
            formMessage.style.color = '#721c24';
            formMessage.style.border = '1px solid #f5c6cb';
            return;
        }
        
        formMessage.textContent = `Merci ${nom} ! Votre message a bien été envoyé. Nous vous répondrons à ${email} dans les plus brefs délais.`;
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        formMessage.style.background = '';
        formMessage.style.color = '';
        formMessage.style.border = '';
        
        contactForm.reset();
        
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
        }, 6000);
    });
}

// ===== SMOOTH SCROLL (uniquement pour les ancres de la page courante) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId.length <= 1) return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMATION AU SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.destination-card, .plat-card, .highlight, .stat-card, .mission-card, .contact-info-card, .why-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});