const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', function() {
    const isOpen = navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    body.classList.toggle('no-scroll');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      body.classList.remove('no-scroll');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const header = document.querySelector('.header');
let lastScrollY = 0;

window.addEventListener('scroll', function() {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }

  lastScrollY = currentScrollY;
});

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -100px 0px',
  threshold: 0.1
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-up, .scale-in').forEach(el => {
  observer.observe(el);
});

const parallaxElements = document.querySelectorAll('.parallax');

window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;

  parallaxElements.forEach(el => {
    const speed = el.dataset.speed || 0.5;
    const yPos = -(scrollY * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
  const heroImages = heroSection.querySelectorAll('img');
  let currentImageIndex = 0;

  function changeHeroImage() {
    heroImages.forEach((img, index) => {
      img.classList.remove('active');
      if (index === currentImageIndex) {
        img.classList.add('active');
      }
    });
    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
  }

  if (heroImages.length > 1) {
    setInterval(changeHeroImage, 5000);
  }
}

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const target = parseInt(counter.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const updateCounter = function() {
    current += step;
    if (current < target) {
      counter.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target;
    }
  };

  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateCounter();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterObserver.observe(counter);
});

const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.querySelector('.product-overlay')?.classList.add('active');
  });

  card.addEventListener('mouseleave', function() {
    this.querySelector('.product-overlay')?.classList.remove('active');
  });
});

const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
}, { rootMargin: '200px' });

lazyImages.forEach(img => imageObserver.observe(img));

const videoElements = document.querySelectorAll('video[data-src]');

videoElements.forEach(video => {
  const videoObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.src = video.dataset.src;
        video.removeAttribute('data-src');
        videoObserver.unobserve(video);
      }
    });
  }, { rootMargin: '200px' });

  videoObserver.observe(video);
});

const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.remove('active');
    if (i === index) {
      t.classList.add('active');
    }
  });
}

if (testimonials.length > 0) {
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 4000);
}

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (email && email.includes('@')) {
      const successMessage = document.createElement('p');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Merci pour votre inscription !';
      this.appendChild(successMessage);
      emailInput.value = '';
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    } else {
      const errorMessage = document.createElement('p');
      errorMessage.className = 'error-message';
      errorMessage.textContent = 'Veuillez entrer une adresse email valide.';
      this.appendChild(errorMessage);
      setTimeout(() => {
        errorMessage.remove();
      }, 3000);
    }
  });
}

const progressBars = document.querySelectorAll('.progress-bar');

progressBars.forEach(bar => {
  const targetWidth = bar.dataset.progress || '0%';

  const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bar.style.width = targetWidth;
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  progressObserver.observe(bar);
});

const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const header = item.querySelector('.accordion-header');
  const content = item.querySelector('.accordion-content');

  if (header && content) {
    header.addEventListener('click', function() {
      const isOpen = item.classList.contains('active');

      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherContent = otherItem.querySelector('.accordion-content');
        if (otherContent) {
          otherContent.style.maxHeight = '0';
        }
      });

      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  }
});

const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    const target = this.dataset.tab;

    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    this.classList.add('active');
    document.querySelector(`.tab-content[data-tab="${target}"]`)?.classList.add('active');
  });
});

const modals = document.querySelectorAll('.modal');
const modalTriggers = document.querySelectorAll('[data-modal]');
const modalCloseButtons = document.querySelectorAll('.modal-close');

modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', function() {
    const modalId = this.dataset.modal;
    const modal = document.querySelector(`.modal[data-modal="${modalId}"]`);
    if (modal) {
      modal.classList.add('active');
      body.classList.add('no-scroll');
    }
  });
});

modalCloseButtons.forEach(button => {
  button.addEventListener('click', function() {
    const modal = this.closest('.modal');
    if (modal) {
      modal.classList.remove('active');
      body.classList.remove('no-scroll');
    }
  });
});

modals.forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('active');
      body.classList.remove('no-scroll');
    }
  });
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    modals.forEach(modal => {
      if (modal.classList.contains('active')) {
        modal.classList.remove('active');
        body.classList.remove('no-scroll');
      }
    });
  }
});

const tooltips = document.querySelectorAll('[data-tooltip]');

tooltips.forEach(element => {
  element.addEventListener('mouseenter', function() {
    const tooltipText = this.dataset.tooltip;
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    this.appendChild(tooltip);
  });

  element.addEventListener('mouseleave', function() {
    const tooltip = this.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  });
});

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  const menu = dropdown.querySelector('.dropdown-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('active');
    });

    document.addEventListener('click', function() {
      dropdown.classList.remove('active');
    });
  }
});

const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevButton = carousel.querySelector('.carousel-prev');
  const nextButton = carousel.querySelector('.carousel-next');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', function() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', function() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }

  if (slides.length > 1) {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }
});

const filterButtons = document.querySelectorAll('.filter-btn');
const filterItems = document.querySelectorAll('.filter-item');

filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    const filter = this.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');

    filterItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

const searchInput = document.querySelector('.search-input');

if (searchInput) {
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    const searchableItems = document.querySelectorAll('[data-search]');

    searchableItems.forEach(item => {
      const text = item.dataset.search.toLowerCase();
      if (text.includes(query)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
}

const ratingStars = document.querySelectorAll('.rating-star');

ratingStars.forEach(star => {
  star.addEventListener('click', function() {
    const rating = parseInt(this.dataset.rating);
    const container = this.closest('.rating');

    container.querySelectorAll('.rating-star').forEach((s, index) => {
      if (index < rating) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });

    const ratingInput = container.querySelector('.rating-value');
    if (ratingInput) {
      ratingInput.value = rating;
    }
  });
});

const quantityInputs = document.querySelectorAll('.quantity-input');

quantityInputs.forEach(input => {
  const decreaseBtn = input.parentElement.querySelector('.quantity-decrease');
  const increaseBtn = input.parentElement.querySelector('.quantity-increase');
  const inputField = input.querySelector('input[type="number"]');

  if (decreaseBtn && inputField) {
    decreaseBtn.addEventListener('click', function() {
      let value = parseInt(inputField.value) || 1;
      if (value > 1) {
        inputField.value = value - 1;
        inputField.dispatchEvent(new Event('change'));
      }
    });
  }

  if (increaseBtn && inputField) {
    increaseBtn.addEventListener('click', function() {
      let value = parseInt(inputField.value) || 1;
      inputField.value = value + 1;
      inputField.dispatchEvent(new Event('change'));
    });
  }
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', function() {
    const productId = this.dataset.productId;
    const productName = this.dataset.productName;
    const productPrice = this.dataset.productPrice;

    const cartItem = {
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${productName} ajouté au panier`;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);

    updateCartCount();
  });
});

function updateCartCount() {
  const cartCountElements = document.querySelectorAll('.cart-count');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCountElements.forEach(el => {
    el.textContent = totalItems;
    if (totalItems > 0) {
      el.classList.add('has-items');
    } else {
      el.classList.remove('has-items');
    }
  });
}

updateCartCount();

const wishlistButtons = document.querySelectorAll('.wishlist-btn');

wishlistButtons.forEach(button => {
  button.addEventListener('click', function() {
    this.classList.toggle('active');
    const productId = this.dataset.productId;

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (this.classList.contains('active')) {
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
      }
    } else {
      wishlist = wishlist.filter(id => id !== productId);
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  });
});

const compareButtons = document.querySelectorAll('.compare-btn');

compareButtons.forEach(button => {
  button.addEventListener('click', function() {
    const productId = this.dataset.productId;
    let compareList = JSON.parse(localStorage.getItem('compareList')) || [];

    if (compareList.includes(productId)) {
      compareList = compareList.filter(id => id !== productId);
      this.classList.remove('active');
    } else {
      if (compareList.length < 4) {
        compareList.push(productId);
        this.classList.add('active');
      } else {
        alert('Vous pouvez comparer jusqu\'à 4 produits maximum.');
      }
    }

    localStorage.setItem('compareList', JSON.stringify(compareList));
  });
});

const zoomImages = document.querySelectorAll('.zoom-image');

zoomImages.forEach(image => {
  image.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y =