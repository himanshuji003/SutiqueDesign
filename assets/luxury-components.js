/**
 * Luxury Components - JavaScript utilities for the premium ethnic wear theme
 * Handles interactive components like wishlist toggles, carousels, and animations
 */

document.addEventListener("DOMContentLoaded", function () {
  // ============================================================================
  // Wishlist Toggle Functionality
  // ============================================================================
  const wishlistButtons = document.querySelectorAll(".product-card-wishlist");

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.toggle("active");

      // Get product ID from data attribute if available
      const productId =
        this.closest(".product-card")?.dataset.productId || null;

      // Update wishlist in localStorage
      if (productId) {
        updateWishlist(productId, this.classList.contains("active"));
      }
    });
  });

  // ============================================================================
  // Wishlist Storage (localStorage-based)
  // ============================================================================
  function updateWishlist(productId, isAdded) {
    let wishlist = JSON.parse(localStorage.getItem("ethnara-wishlist") || "[]");

    if (isAdded) {
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
      }
    } else {
      wishlist = wishlist.filter((id) => id !== productId);
    }

    localStorage.setItem("ethnara-wishlist", JSON.stringify(wishlist));
  }

  function restoreWishlist() {
    const wishlist = JSON.parse(
      localStorage.getItem("ethnara-wishlist") || "[]",
    );

    wishlistButtons.forEach((button) => {
      const productId = button.closest(".product-card")?.dataset.productId;
      if (productId && wishlist.includes(productId)) {
        button.classList.add("active");
      }
    });
  }

  // Restore wishlist state on page load
  restoreWishlist();

  // ============================================================================
  // Smooth Scroll Behavior
  // ============================================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // ============================================================================
  // Intersection Observer for Fade-In Animations
  // ============================================================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fadeIn");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply observer to product cards and testimonials
  document
    .querySelectorAll(".product-card, .testimonial-card, .collection-card")
    .forEach((element) => {
      observer.observe(element);
    });

  // ============================================================================
  // Mobile Menu Toggle (if header has hamburger)
  // ============================================================================
  const hamburger = document.querySelector("[data-hamburger]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      this.classList.toggle("active");
    });

    // Close menu when link is clicked
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  // ============================================================================
  // Newsletter Form Submission
  // ============================================================================
  const newsletterForms = document.querySelectorAll(".newsletter-input-group");

  newsletterForms.forEach((form) => {
    const button = form.querySelector("button");
    const input = form.querySelector('input[type="email"]');

    if (button && input) {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        if (input.value && input.checkValidity()) {
          // Show success message
          const successMsg = document.createElement("div");
          successMsg.textContent = "Thank you for subscribing!";
          successMsg.style.cssText =
            "color: #d4af37; font-size: 0.875rem; margin-top: 8px;";
          form.parentNode.appendChild(successMsg);

          // Reset form
          input.value = "";

          // Remove success message after 3 seconds
          setTimeout(() => successMsg.remove(), 3000);
        }
      });
    }
  });

  // ============================================================================
  // Product Card Quick View
  // ============================================================================
  const viewProductButtons = document.querySelectorAll(".product-card-btn");

  viewProductButtons.forEach((button) => {
    button.addEventListener("mouseover", function () {
      this.style.transition = "all 0.3s ease";
    });
  });

  // ============================================================================
  // Sticky Header on Scroll
  // ============================================================================
  const header = document.querySelector("header-component");

  if (header) {
    let lastScrollTop = 0;

    window.addEventListener("scroll", function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100) {
        header.style.boxShadow = "var(--shadow-md)";
      } else {
        header.style.boxShadow = "none";
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }

  // ============================================================================
  // Image Lazy Loading (if not natively supported)
  // ============================================================================
  if (!("loading" in HTMLImageElement.prototype)) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("loading");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  // ============================================================================
  // Trust Badges Counter Animation
  // ============================================================================
  function animateCounter(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(interval);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // Trigger counter animation when trust badges come into view
  const trustBadges = document.querySelectorAll(".trust-badge");
  if (trustBadges.length > 0) {
    const badgeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // You can add counter animation here if needed
          badgeObserver.unobserve(entry.target);
        }
      });
    });

    trustBadges.forEach((badge) => badgeObserver.observe(badge));
  }

  // ============================================================================
  // Form Input Focus Effects
  // ============================================================================
  const formInputs = document.querySelectorAll("input, textarea, select");

  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement?.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      this.parentElement?.classList.remove("focused");
    });
  });

  // ============================================================================
  // Parallax Scrolling Effect (Optional Premium Feature)
  // ============================================================================
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  if (parallaxElements.length > 0) {
    window.addEventListener("scroll", function () {
      parallaxElements.forEach((element) => {
        const scrollPosition = window.pageYOffset;
        const elementPosition = element.offsetTop;
        const scrollAmount = (scrollPosition - elementPosition) * 0.5;

        element.style.transform = `translateY(${scrollAmount}px)`;
      });
    });
  }

  // ============================================================================
  // Cart Icon Badge Update
  // ============================================================================
  function updateCartBadge() {
    // This will integrate with Shopify's cart object
    if (typeof Shopify !== "undefined" && Shopify.cart) {
      const cartBadge = document.querySelector("[data-cart-badge]");
      if (cartBadge) {
        const itemCount = Shopify.cart.item_count || 0;
        cartBadge.textContent = itemCount;
        cartBadge.style.display = itemCount > 0 ? "flex" : "none";
      }
    }
  }

  // Update cart badge on page load
  updateCartBadge();

  // ============================================================================
  // Handle View Transitions API (if supported)
  // ============================================================================
  if (document.startViewTransition) {
    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function (e) {
        // Only apply to internal links
        if (this.href.startsWith(window.location.origin)) {
          document.startViewTransition(() => {
            // Navigation happens here
          });
        }
      });
    });
  }
});

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format price for display
 */
function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(price);
}

/**
 * Add to cart function
 */
function addToCart(variantId, quantity = 1) {
  if (typeof fetch !== "undefined") {
    fetch("/cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            id: variantId,
            quantity: quantity,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Dispatch custom event for cart update
        window.dispatchEvent(new CustomEvent("cartUpdated", { detail: data }));
      })
      .catch((error) => console.error("Error:", error));
  }
}

// ============================================================================
// Export for module usage (if needed)
// ============================================================================
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    debounce,
    formatPrice,
    addToCart,
  };
}
