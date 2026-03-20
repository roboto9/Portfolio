// Gestion du header au scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu burger pour mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            // Changer l'icône du menu
            const icon = this.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        });
    }
    
    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        });
    });
    
    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', function(event) {
        if (!navbar.contains(event.target) && !menuToggle.contains(event.target)) {
            navbar.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        }
    });
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Détection de la section active au scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== GESTION DU FORMULAIRE DE CONTACT =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        // Ajouter les classes CSS pour le formulaire
        contactForm.classList.add('contact-form');
        
        // Ajouter les classes CSS aux éléments existants
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.type !== 'hidden' && input.type !== 'submit') {
                input.parentElement?.classList.add('form-group');
                const parent = input.parentElement;
                if (parent && parent.tagName === 'FORM') {
                    // Si l'input est directement dans le formulaire, créer une div form-group
                    const div = document.createElement('div');
                    div.className = 'form-group';
                    const label = contactForm.querySelector(`label[for="${input.id}"]`);
                    if (label) {
                        div.appendChild(label.cloneNode(true));
                        label.remove();
                    }
                    div.appendChild(input.cloneNode(true));
                    input.remove();
                    contactForm.insertBefore(div, contactForm.querySelector('button'));
                }
            }
        });
        
        // Styliser le bouton
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.add('submit-btn');
            submitBtn.textContent = 'Envoyer le message';
        }
        
        // Styliser les labels et inputs restants
        const labels = contactForm.querySelectorAll('label');
        labels.forEach(label => {
            label.style.display = 'block';
            label.style.marginBottom = '8px';
            label.style.fontSize = '16px';
            label.style.fontWeight = '500';
            label.style.color = '#fff';
        });
        
        const textInputs = contactForm.querySelectorAll('input:not([type="hidden"]), textarea');
        textInputs.forEach(input => {
            input.style.width = '100%';
            input.style.padding = '12px 18px';
            input.style.background = 'rgba(12, 16, 34, 0.8)';
            input.style.border = '1px solid rgba(51, 204, 255, 0.3)';
            input.style.borderRadius = '12px';
            input.style.fontSize = '16px';
            input.style.color = '#fff';
            input.style.fontFamily = '"Poppins", sans-serif';
            input.style.transition = 'all 0.3s ease';
            
            input.addEventListener('focus', function() {
                this.style.outline = 'none';
                this.style.borderColor = '#3cf';
                this.style.boxShadow = '0 0 10px rgba(51, 204, 255, 0.3)';
                this.style.background = 'rgba(12, 16, 34, 1)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = 'rgba(51, 204, 255, 0.3)';
                this.style.boxShadow = 'none';
                this.style.background = 'rgba(12, 16, 34, 0.8)';
            });
        });
        
        // Ajouter la structure des divs form-group correctement
        const formHtml = contactForm.innerHTML;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = formHtml;
        
        // Nettoyer et restructurer
        const usernameField = document.querySelector('#username');
        const emailField = document.querySelector('#email');
        const messageField = document.querySelector('#message');
        const usernameLabel = document.querySelector('label[for="username"]');
        const emailLabel = document.querySelector('label[for="email"]');
        const messageLabel = document.querySelector('label[for="message"]');
        
        if (usernameField && usernameLabel) {
            const usernameDiv = document.createElement('div');
            usernameDiv.className = 'form-group';
            usernameDiv.appendChild(usernameLabel.cloneNode(true));
            usernameDiv.appendChild(usernameField.cloneNode(true));
            usernameLabel.remove();
            usernameField.remove();
            contactForm.insertBefore(usernameDiv, contactForm.querySelector('button'));
        }
        
        if (emailField && emailLabel) {
            const emailDiv = document.createElement('div');
            emailDiv.className = 'form-group';
            emailDiv.appendChild(emailLabel.cloneNode(true));
            emailDiv.appendChild(emailField.cloneNode(true));
            emailLabel.remove();
            emailField.remove();
            contactForm.insertBefore(emailDiv, contactForm.querySelector('button'));
        }
        
        if (messageField && messageLabel) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'form-group';
            messageDiv.appendChild(messageLabel.cloneNode(true));
            messageDiv.appendChild(messageField.cloneNode(true));
            messageLabel.remove();
            messageField.remove();
            contactForm.insertBefore(messageDiv, contactForm.querySelector('button'));
        }
        
        // Supprimer les <br> restants
        const brElements = contactForm.querySelectorAll('br');
        brElements.forEach(br => br.remove());
        
        // Gestion de l'envoi du formulaire
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Désactiver le bouton pendant l'envoi
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
            
            // Récupérer les données du formulaire
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    // Message de succès
                    showNotification('success', 'Message envoyé !', 'Votre message a bien été envoyé. Je vous répondrai dans les plus brefs délais.');
                    contactForm.reset();
                    
                    // Rediriger vers l'accueil après 3 secondes
                    setTimeout(() => {
                        window.location.href = '#home';
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 3000);
                } else {
                    throw new Error('Erreur lors de l\'envoi');
                }
            } catch (error) {
                // Message d'erreur
                showNotification('error', 'Erreur d\'envoi', 'Une erreur est survenue. Veuillez réessayer plus tard.');
            } finally {
                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
});

// Fonction pour afficher une notification
function showNotification(type, title, message) {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconClass = type === 'success' ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill';
    const iconColor = type === 'success' ? 'success' : 'error';
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon ${iconColor}">
                <i class="${iconClass}"></i>
            </div>
            <div class="notification-message">
                <strong>${title}</strong>
                <p>${message}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer la notification après 5 secondes
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}