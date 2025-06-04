/*
Author       : themes_master
Template Name: Lalvai - Landing Page HTML Template
Version      : 1.0
*/

// TypeScript-like interfaces for better type safety
/**
 * @typedef {Object} CountryData
 * @property {string} name - Country name
 * @property {string} code - Country ISO code
 * @property {string} dialCode - Country dial code
 * @property {string} flag - Flag emoji or class
 */

/**
 * @typedef {Object} PhoneValidationResult
 * @property {boolean} isValid - Whether the phone number is valid
 * @property {string} message - Validation message
 * @property {string} formattedNumber - Formatted phone number
 */

(function ($) {
  "use strict";

  // Country data with popular countries first
  const COUNTRY_DATA = [
    { name: "مصر", code: "EG", dialCode: "+20", flag: "🇪🇬" },
    { name: "السعودية", code: "SA", dialCode: "+966", flag: "🇸🇦" },
    { name: "الإمارات", code: "AE", dialCode: "+971", flag: "🇦🇪" },
    { name: "الكويت", code: "KW", dialCode: "+965", flag: "🇰🇼" },
    { name: "قطر", code: "QA", dialCode: "+974", flag: "🇶🇦" },
    { name: "البحرين", code: "BH", dialCode: "+973", flag: "🇧🇭" },
    { name: "عمان", code: "OM", dialCode: "+968", flag: "🇴🇲" },
    { name: "الأردن", code: "JO", dialCode: "+962", flag: "🇯🇴" },
    { name: "لبنان", code: "LB", dialCode: "+961", flag: "🇱🇧" },
    { name: "سوريا", code: "SY", dialCode: "+963", flag: "🇸🇾" },
    { name: "العراق", code: "IQ", dialCode: "+964", flag: "🇮🇶" },
    { name: "فلسطين", code: "PS", dialCode: "+970", flag: "🇵🇸" },
    { name: "المغرب", code: "MA", dialCode: "+212", flag: "🇲🇦" },
    { name: "الجزائر", code: "DZ", dialCode: "+213", flag: "🇩🇿" },
    { name: "تونس", code: "TN", dialCode: "+216", flag: "🇹🇳" },
    { name: "ليبيا", code: "LY", dialCode: "+218", flag: "🇱🇾" },
    { name: "السودان", code: "SD", dialCode: "+249", flag: "🇸🇩" },
    { name: "الولايات المتحدة", code: "US", dialCode: "+1", flag: "🇺🇸" },
    { name: "المملكة المتحدة", code: "GB", dialCode: "+44", flag: "🇬🇧" },
    { name: "ألمانيا", code: "DE", dialCode: "+49", flag: "🇩🇪" },
    { name: "فرنسا", code: "FR", dialCode: "+33", flag: "🇫🇷" },
    { name: "إيطاليا", code: "IT", dialCode: "+39", flag: "🇮🇹" },
    { name: "إسبانيا", code: "ES", dialCode: "+34", flag: "🇪🇸" },
    { name: "كندا", code: "CA", dialCode: "+1", flag: "🇨🇦" },
    { name: "أستراليا", code: "AU", dialCode: "+61", flag: "🇦🇺" },
    { name: "اليابان", code: "JP", dialCode: "+81", flag: "🇯🇵" },
    { name: "الصين", code: "CN", dialCode: "+86", flag: "🇨🇳" },
    { name: "الهند", code: "IN", dialCode: "+91", flag: "🇮🇳" },
    { name: "روسيا", code: "RU", dialCode: "+7", flag: "🇷🇺" },
    { name: "البرازيل", code: "BR", dialCode: "+55", flag: "🇧🇷" },
  ];

  // Phone validation patterns for different countries
  const PHONE_PATTERNS = {
    "+20": /^[0-9]{10,11}$/, // Egypt: 10-11 digits
    "+966": /^[0-9]{9}$/, // Saudi Arabia: 9 digits
    "+971": /^[0-9]{9}$/, // UAE: 9 digits
    "+965": /^[0-9]{8}$/, // Kuwait: 8 digits
    "+974": /^[0-9]{8}$/, // Qatar: 8 digits
    "+973": /^[0-9]{8}$/, // Bahrain: 8 digits
    "+968": /^[0-9]{8}$/, // Oman: 8 digits
    "+962": /^[0-9]{9}$/, // Jordan: 9 digits
    "+961": /^[0-9]{8}$/, // Lebanon: 8 digits
    "+1": /^[0-9]{10}$/, // US/Canada: 10 digits
    "+44": /^[0-9]{10,11}$/, // UK: 10-11 digits
    default: /^[0-9]{7,15}$/, // Default: 7-15 digits
  };

  /**
   * Validates phone number based on country code
   * @param {string} phone - Phone number to validate
   * @param {string} countryCode - Country dial code
   * @returns {PhoneValidationResult}
   */
  const validatePhoneNumber = (phone, countryCode) => {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");

    if (!cleanPhone) {
      return {
        isValid: false,
        message: "الرجاء إدخال رقم الهاتف",
        formattedNumber: "",
      };
    }

    const pattern = PHONE_PATTERNS[countryCode] || PHONE_PATTERNS.default;
    const isValid = pattern.test(cleanPhone);

    return {
      isValid,
      message: isValid ? "" : "رقم الهاتف غير صحيح لهذا البلد",
      formattedNumber: isValid ? `${countryCode}${cleanPhone}` : "",
    };
  };

  /**
   * Formats phone number for display
   * @param {string} phone - Phone number to format
   * @param {string} countryCode - Country dial code
   * @returns {string}
   */
  const formatPhoneNumber = (phone, countryCode) => {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");

    // Basic formatting based on country
    switch (countryCode) {
      case "+20": // Egypt
        if (cleanPhone.length === 10) {
          return cleanPhone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
        }
        break;
      case "+966": // Saudi Arabia
        if (cleanPhone.length === 9) {
          return cleanPhone.replace(/(\d{2})(\d{3})(\d{4})/, "$1 $2 $3");
        }
        break;
      case "+1": // US/Canada
        if (cleanPhone.length === 10) {
          return cleanPhone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        }
        break;
      default:
        // Basic formatting for other countries
        if (cleanPhone.length >= 8) {
          const mid = Math.floor(cleanPhone.length / 2);
          return cleanPhone.slice(0, mid) + " " + cleanPhone.slice(mid);
        }
    }

    return cleanPhone;
  };

  jQuery(document).on("ready", function () {
    /*PRELOADER JS*/
    $(window).on("load", function () {
      $(".spinner").fadeOut();
      $(".preloader").delay(350).fadeOut("slow");
    });
    /*END PRELOADER JS*/

    /*START MENU JS*/
    // Navbar Configuration
    const NAVBAR_CONFIG = {
      mobileBreakpoint: 991,
      scrollThreshold: 200,
      fixedThreshold: 100,
      animationDuration: 800,
      scrollOffset: 80,
    };

    // Navbar State Management
    class NavbarManager {
      constructor() {
        this.$navbar = $(".navbar");
        this.$navbarCollapse = $(".navbar-collapse");
        this.$navbarToggler = $(".navbar-toggler");
        this.$navLinks = $(".navbar-nav .nav-link");
        this.$sections = $("section[id]");
        this.$body = $("body");

        this.isMobile = false;
        this.isMenuOpen = false;

        this.init();
      }

      init() {
        this.checkScreenSize();
        this.bindEvents();
        this.initScrollSpy();

        // Initialize navbar colors - start with white
        $(".navbar-nav .nav-link").addClass("nav-white");
        this.updateNavColors();

        console.log(
          "Navbar Manager initialized - CSS handles responsive behavior"
        );
      }

      checkScreenSize() {
        const windowWidth = $(window).width();
        const wasMobile = this.isMobile;
        this.isMobile = windowWidth <= NAVBAR_CONFIG.mobileBreakpoint;

        // Handle screen size change
        if (wasMobile !== this.isMobile) {
          this.handleScreenSizeChange();
        }

        this.adjustNavbarHeight();
      }

      handleScreenSizeChange() {
        // CSS handles the responsive behavior now
        // Just update our internal state tracking
        if (this.isMobile) {
          this.isMenuOpen = this.$navbarCollapse.hasClass("show");
          this.$body.removeClass("mobile-menu-open");
        } else {
          this.isMenuOpen = true; // Always considered "open" on desktop
          this.$body.removeClass("mobile-menu-open");
        }
      }

      adjustNavbarHeight() {
        const windowWidth = $(window).width();
        let minHeight = "";

        if (windowWidth <= 576) {
          minHeight = "60px";
        } else if (windowWidth <= 991) {
          minHeight = "70px";
        }

        this.$navbar.css("min-height", minHeight);
      }

      bindEvents() {
        // Window events
        $(window).on("scroll", () => this.handleScroll());
        $(window).on("resize", () => this.handleResize());

        // Navbar toggler
        this.$navbarToggler.on("click", () => this.toggleMobileMenu());

        // Navigation links
        this.$navLinks.on("click", (e) => this.handleNavLinkClick(e));

        // Bootstrap collapse events
        this.$navbarCollapse.on("show.bs.collapse", () => this.onMenuShow());
        this.$navbarCollapse.on("hide.bs.collapse", () => this.onMenuHide());

        // Outside click (mobile only)
        $(document).on("click", (e) => this.handleOutsideClick(e));

        // Escape key (mobile only)
        $(document).on("keydown", (e) => this.handleEscapeKey(e));
      }

      handleScroll() {
        this.updateNavColors();
        this.updateFixedState();
        this.updateActiveSection();
      }

      handleResize() {
        this.checkScreenSize();
        this.updateNavbarState();
      }

      toggleMobileMenu() {
        if (!this.isMobile) return;

        this.isMenuOpen = !this.isMenuOpen;

        if (this.isMenuOpen) {
          this.$navbarCollapse.collapse("show");
        } else {
          this.$navbarCollapse.collapse("hide");
        }
      }

      handleNavLinkClick(e) {
        const $link = $(e.currentTarget);
        const href = $link.attr("href");

        // Handle smooth scrolling for anchor links
        if (href && href.startsWith("#")) {
          e.preventDefault();
          this.smoothScrollTo(href);

          // Close mobile menu after clicking
          if (this.isMobile && this.isMenuOpen) {
            this.closeMobileMenu();
          }
        }

        // Update active state
        this.setActiveLink($link);
      }

      smoothScrollTo(target) {
        const $target = $(target);
        if ($target.length) {
          const offsetTop = $target.offset().top - NAVBAR_CONFIG.scrollOffset;

          $("html, body").animate(
            {
              scrollTop: offsetTop,
            },
            NAVBAR_CONFIG.animationDuration,
            "swing"
          );
        }
      }

      setActiveLink($activeLink) {
        this.$navLinks.removeClass("active");
        $activeLink.addClass("active");
        setTimeout(() => this.updateNavColors(), 10);
      }

      closeMobileMenu() {
        if (this.isMobile && this.isMenuOpen) {
          this.$navbarCollapse.collapse("hide");
        }
      }

      handleOutsideClick(e) {
        if (!this.isMobile || !this.isMenuOpen) return;

        if (!$(e.target).closest(".navbar").length) {
          this.closeMobileMenu();
        }
      }

      handleEscapeKey(e) {
        if (!this.isMobile || !this.isMenuOpen) return;

        if (e.key === "Escape") {
          this.closeMobileMenu();
        }
      }

      onMenuShow() {
        this.isMenuOpen = true;
        if (this.isMobile) {
          this.$body.addClass("mobile-menu-open");
        }
      }

      onMenuHide() {
        this.isMenuOpen = false;
        this.$body.removeClass("mobile-menu-open");
      }

      updateNavbarState() {
        // Let CSS handle the responsive behavior
        // No manual manipulation needed for desktop vs mobile
        console.log("Navbar state updated - CSS handles responsive behavior");
      }

      updateNavColors() {
        const scrollTop = $(window).scrollTop();
        const shouldAddBg = scrollTop > NAVBAR_CONFIG.scrollThreshold;

        if (shouldAddBg) {
          $(".fixed-top").addClass("menu-bg");
          // Target nav-link elements directly and add custom classes
          $(".navbar-nav .nav-link")
            .removeClass("nav-white")
            .addClass("nav-black");
          // Change logo to dark version when scrolled
          $(".navbar-brand .main-logo").attr("src", "assets/img/logo-two.png");
        } else {
          $(".fixed-top").removeClass("menu-bg");
          // Target nav-link elements directly and add custom classes
          $(".navbar-nav .nav-link")
            .removeClass("nav-black")
            .addClass("nav-white");
          // Change logo back to original when at top
          $(".navbar-brand .main-logo").attr("src", "assets/img/logo.png");
        }
      }

      updateFixedState() {
        const scrollTop = $(window).scrollTop();
        const shouldBeFixed = scrollTop > NAVBAR_CONFIG.fixedThreshold;

        const $elements = $(".site-navigation, .header-white, .header");

        if (shouldBeFixed) {
          $elements.addClass("navbar-fixed");
        } else {
          $elements.removeClass("navbar-fixed");
        }
      }

      initScrollSpy() {
        // Initialize scroll spy functionality
        this.updateActiveSection();
      }

      updateActiveSection() {
        const scrollPos = $(window).scrollTop() + 100;

        this.$sections.each((index, section) => {
          const $section = $(section);
          const sectionTop = $section.offset().top;
          const sectionBottom = sectionTop + $section.outerHeight();
          const sectionId = $section.attr("id");

          if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            const $activeLink = $(
              `.navbar-nav .nav-link[href="#${sectionId}"]`
            );
            if (!$activeLink.hasClass("active")) {
              this.setActiveLink($activeLink);
            }
          }
        });
      }
    }

    // Initialize Navbar Manager
    const navbarManager = new NavbarManager();

    // Legacy support for external calls
    window.updateNavColors = () => navbarManager.updateNavColors();
    /*END MENU JS*/

    /*START FORM VALIDATION JS*/
    const validateName = (name) => {
      // Check if name is not empty and doesn't contain numbers
      return name.trim() && !/\d/.test(name) && name.trim().length >= 2;
    };

    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    const validateForm = () => {
      let isValid = true;
      console.log("Starting form validation...");

      // Validate name
      const name = $("#name").val().trim();
      console.log("Validating name:", name);
      if (!name || !validateName(name)) {
        $("#name").addClass("is-invalid").removeClass("is-valid");
        isValid = false;
        console.log("Name validation failed");
      } else {
        $("#name").removeClass("is-invalid").addClass("is-valid");
        console.log("Name validation passed");
      }

      // Validate phone
      const phone = $("#phone").val().trim();
      const countryCode = $("#country-code").val() || "+20";
      console.log(
        "Validating phone:",
        phone,
        "with country code:",
        countryCode
      );

      if (!phone || !validatePhoneNumber(phone, countryCode).isValid) {
        $("#phone").addClass("is-invalid").removeClass("is-valid");
        isValid = false;
        console.log("Phone validation failed");
      } else {
        $("#phone").removeClass("is-invalid").addClass("is-valid");
        console.log("Phone validation passed");
      }

      // Validate email
      const email = $("#email").val().trim();
      console.log("Validating email:", email);
      if (!email || !validateEmail(email)) {
        $("#email").addClass("is-invalid").removeClass("is-valid");
        isValid = false;
        console.log("Email validation failed");
      } else {
        $("#email").removeClass("is-invalid").addClass("is-valid");
        console.log("Email validation passed");
      }

      // Validate unit type
      const unitType = $("#unitType").val();
      console.log("Validating unit type:", unitType);
      if (!unitType) {
        $("#unitType").addClass("is-invalid").removeClass("is-valid");
        isValid = false;
        console.log("Unit type validation failed");
      } else {
        $("#unitType").removeClass("is-invalid").addClass("is-valid");
        console.log("Unit type validation passed");
      }

      // Validate unit price
      const unitPrice = $("#unitPrice").val();
      console.log("Validating unit price:", unitPrice);
      if (!unitPrice) {
        $("#unitPrice").addClass("is-invalid").removeClass("is-valid");
        isValid = false;
        console.log("Unit price validation failed");
      } else {
        $("#unitPrice").removeClass("is-invalid").addClass("is-valid");
        console.log("Unit price validation passed");
      }

      console.log("Form validation result:", isValid);
      return isValid;
    };

    // Real-time validation on input change
    $(document).on(
      "input change",
      "#registerForm input, #registerForm select",
      function () {
        const $this = $(this);
        const id = $this.attr("id");
        console.log("Real-time validation for:", id);

        if (id === "name") {
          const name = $this.val().trim();
          if (!name || !validateName(name)) {
            $this.addClass("is-invalid").removeClass("is-valid");
          } else {
            $this.removeClass("is-invalid").addClass("is-valid");
          }
        } else if (id === "phone") {
          const phone = $this.val().trim();
          const countryCode = $("#country-code").val() || "+20";
          if (!phone || !validatePhoneNumber(phone, countryCode).isValid) {
            $this.addClass("is-invalid").removeClass("is-valid");
          } else {
            $this.removeClass("is-invalid").addClass("is-valid");
          }
        } else if (id === "email") {
          const email = $this.val().trim();
          if (!email || !validateEmail(email)) {
            $this.addClass("is-invalid").removeClass("is-valid");
          } else {
            $this.removeClass("is-invalid").addClass("is-valid");
          }
        } else if (id === "unitType" || id === "unitPrice") {
          const value = $this.val();
          if (!value) {
            $this.addClass("is-invalid").removeClass("is-valid");
          } else {
            $this.removeClass("is-invalid").addClass("is-valid");
          }
        }
      }
    );

    // Form submission
    $(document).on("submit", "#registerForm", function (e) {
      e.preventDefault();
      console.log("Form submitted");

      if (validateForm()) {
        console.log("Form is valid, showing success message");
        // Form is valid, you can submit the data via AJAX here
        // For now, just show success message
        $("#success-message").fadeIn();

        // Reset form after successful submission
        setTimeout(function () {
          $("#registerForm")[0].reset();
          $("#registerForm input, #registerForm select").removeClass(
            "is-valid is-invalid"
          );
          $("#success-message").fadeOut();
          console.log("Form reset completed");
        }, 3000);
      } else {
        console.log("Form validation failed");
        // Scroll to first invalid field
        const firstInvalid = $("#registerForm .is-invalid").first();
        if (firstInvalid.length) {
          $("html, body").animate(
            {
              scrollTop: firstInvalid.offset().top - 100,
            },
            500
          );
        }
      }
    });
    /*END FORM VALIDATION JS*/

    /*START COUNTRY CODE INITIALIZATION*/
    const initCountrySelector = () => {
      try {
        const countrySelect = $("#country-code");
        const phoneInput = $("#phone");

        // Create custom dropdown HTML
        const customDropdownHtml = `
          <div class="custom-country-dropdown">
            <div class="selected-country" id="selected-country">
              <span class="country-flag">🇪🇬</span>
              <span class="country-code">+20</span>
              <span class="dropdown-arrow">▼</span>
            </div>
            <div class="country-options" id="country-options">
              ${COUNTRY_DATA.map(
                (country) => `
                <div class="country-option" data-code="${country.code}" data-dial="${country.dialCode}">
                  <span class="country-flag">${country.flag}</span>
                  <span class="country-info">
                    <span class="country-name">${country.name}</span>
                    <span class="dial-code">${country.dialCode}</span>
                  </span>
                </div>
              `
              ).join("")}
            </div>
          </div>
        `;

        // Hide original select and add custom dropdown
        countrySelect.hide().after(customDropdownHtml);

        // Set initial value
        countrySelect.val("+20");

        // Cache jQuery objects
        const selectedCountry = $("#selected-country");
        const optionsContainer = $("#country-options");
        const countryOptions = $(".country-option");

        // Handle dropdown toggle
        selectedCountry.on("click", function (e) {
          e.stopPropagation();
          optionsContainer.slideToggle(200);
          $(this).toggleClass("active");
        });

        // Handle option selection
        countryOptions.on("click", function () {
          const code = $(this).data("code");
          const dialCode = $(this).data("dial");
          const flag = $(this).find(".country-flag").text();

          // Update selected display
          selectedCountry.find(".country-flag").text(flag);
          selectedCountry.find(".country-code").text(dialCode);

          // Update hidden select value
          countrySelect.val(dialCode).trigger("change");

          // Hide dropdown
          optionsContainer.slideUp(200);
          selectedCountry.removeClass("active");

          // Revalidate phone number with new country code
          if (phoneInput.val().trim()) {
            const validation = validatePhoneNumber(
              phoneInput.val().trim(),
              dialCode
            );
            if (validation.isValid) {
              phoneInput.removeClass("is-invalid").addClass("is-valid");
            } else {
              phoneInput.addClass("is-invalid").removeClass("is-valid");
            }
          }
        });

        // Close dropdown when clicking outside
        $(document).on("click", function (e) {
          if (!$(e.target).closest(".custom-country-dropdown").length) {
            optionsContainer.slideUp(200);
            selectedCountry.removeClass("active");
          }
        });

        // Add search functionality
        const searchInput = $(`
          <div class="country-search">
            <input type="text" placeholder="البحث عن دولة..." class="form-control" id="country-search">
          </div>
        `);

        optionsContainer.prepend(searchInput);

        $("#country-search").on("input", function () {
          const searchTerm = $(this).val().toLowerCase();
          countryOptions.each(function () {
            const countryName = $(this)
              .find(".country-name")
              .text()
              .toLowerCase();
            const dialCode = $(this).find(".dial-code").text().toLowerCase();

            if (
              countryName.includes(searchTerm) ||
              dialCode.includes(searchTerm)
            ) {
              $(this).show();
            } else {
              $(this).hide();
            }
          });
        });

        // Phone input formatting
        phoneInput.on("input", function () {
          const currentCountryCode = countrySelect.val() || "+20";
          const phoneValue = $(this).val();

          // Don't interfere with the main validation logic
          // Just format the number if it's valid
          if (phoneValue.trim()) {
            const validation = validatePhoneNumber(
              phoneValue,
              currentCountryCode
            );
            if (validation.isValid) {
              const formatted = formatPhoneNumber(
                phoneValue,
                currentCountryCode
              );
              if (
                formatted !== phoneValue &&
                formatted.length <= phoneValue.length + 2
              ) {
                $(this).val(formatted);
              }
            }
          }
        });

        console.log("Country selector initialized successfully");
      } catch (error) {
        console.error("Error initializing country codes:", error);
        // Fallback: populate select with basic options
        const fallbackOptions = COUNTRY_DATA.slice(0, 5)
          .map(
            (country) =>
              `<option value="${country.dialCode}">${country.flag} ${country.dialCode} ${country.name}</option>`
          )
          .join("");
        $("#country-code").html(fallbackOptions).val("+20");
      }
    };

    // Initialize country selector when DOM is ready
    initCountrySelector();
    /*END COUNTRY CODE INITIALIZATION*/

    /*START HOME WATER JS*/
    if (typeof $.fn.ripples == "function") {
      try {
        $(".ripple").ripples({
          resolution: 500,
          perturbance: 0.01,
        });
      } catch (e) {
        $(".error").show().text(e);
      }
    }
    /*END HOME WATER JS*/

    /*START VIDEO JS*/
    $(".video-play").magnificPopup({
      type: "iframe",
    });
    /*END VIDEO JS*/

    /* START JQUERY LIGHTBOX*/
    jQuery(".lightbox").venobox({
      numeratio: true,
      infinigall: true,
    });
    /* END JQUERY LIGHTBOX*/

    /*START PARTNERS SLIDER JS heere*/
    $("#partners-slider").owlCarousel({
      pagination: true,
      navigation: true,
      slideSpeed: 1000,
      autoPlay: 3000,
      loop: true,
      margin: 20,
      responsive: {
        0: {
          items: 2,
          margin: 10,
        },
        768: {
          items: 7,
          margin: 10,
        },
      },
      navigationText: [
        "<i class='fa fa-chevron-left'></i>",
        "<i class='fa fa-chevron-right'></i>",
      ],
    });
    /*END PARTNERS SLIDER JS*/

    /*START TERRACE SLIDER JS*/
    // Multiple initialization attempts to ensure slider works
    const initTerraceSlider = () => {
      console.log("Attempting to initialize Terrace slider...");
      console.log("Terrace slider element found:", $("#terrace-slider").length);
      console.log("Owl Carousel function available:", typeof $.fn.owlCarousel);

      if (
        $("#terrace-slider").length &&
        typeof $.fn.owlCarousel === "function"
      ) {
        try {
          $("#terrace-slider").owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            nav: true,
            dots: true,
            autoplay: true,
            slideSpeed: 1000,
            autoplayTimeout: 2000, // Move every 2 seconds
            autoplayHoverPause: true, // Don't pause on hover to ensure consistent movement
            autoplaySpeed: 1000, // Smooth transition speed
            rtl: true, // Enable RTL support for Arabic
            responsive: {
              0: {
                items: 1,
                nav: false,
                dots: true,
              },
              768: {
                items: 1,
                nav: true,
                dots: true,
              },
              1000: {
                items: 1,
                nav: true,
                dots: true,
              },
            },
            navText: [
              "<i class='fa fa-chevron-right'></i>", // Swapped for RTL
              "<i class='fa fa-chevron-left'></i>", // Swapped for RTL
            ],
            onInitialized: function () {
              console.log("Terrace slider initialized successfully!");
              // Force RTL direction on the slider container
              $("#terrace-slider")
                .closest(".how_we_work_video")
                .css("direction", "ltr");
              $("#terrace-slider .owl-stage-outer").css("direction", "ltr");

              // Ensure autoplay starts immediately
              this.trigger("play.owl.autoplay", [2000]);
            },
            onTranslated: function () {
              console.log("Terrace slider slide changed");
            },
          });

          // Force refresh after initialization and apply RTL fixes
          setTimeout(() => {
            $("#terrace-slider").trigger("refresh.owl.carousel");

            // Additional RTL fixes
            const $slider = $("#terrace-slider");
            $slider.find(".owl-nav").css({
              direction: "ltr",
              "text-align": "center",
            });

            // Ensure proper image display
            $slider.find("img").css({
              width: "100%",
              height: "auto",
              "object-fit": "cover",
            });

            // Fix navigation positioning for RTL
            $slider.find(".owl-prev").css({
              left: "auto",
              right: "10px",
            });

            $slider.find(".owl-next").css({
              right: "auto",
              left: "10px",
            });

            // Restart autoplay to ensure it's working
            $slider.trigger("play.owl.autoplay", [2000]);
          }, 100);

          return true;
        } catch (error) {
          console.error("Error initializing Terrace slider:", error);
          return false;
        }
      } else {
        console.error(
          "Terrace slider initialization failed - element or owlCarousel not found"
        );
        return false;
      }
    };

    // Try immediate initialization
    if (!initTerraceSlider()) {
      // If immediate initialization fails, try after a delay
      setTimeout(() => {
        if (!initTerraceSlider()) {
          // If still fails, try after window load
          $(window).on("load", () => {
            setTimeout(initTerraceSlider, 500);
          });
        }
      }, 1000);
    }
    /*END TERRACE SLIDER JS*/
  });

  /* START PARALLAX JS */
  (function () {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
    } else {
      $(window).stellar({
        horizontalScrolling: false,
        responsive: true,
      });
    }
  })();
  /* END PARALLAX JS  */

  /*START WOW ANIMATION JS*/
  new WOW().init();
  /*END WOW ANIMATION JS*/

  /*START COUNTER ANIMATION JS*/
  // Initialize counter animation when elements come into view
  $(document).ready(function () {
    // Check if counterUp and waypoints are available
    if (
      typeof $.fn.counterUp === "function" &&
      typeof $.fn.waypoint === "function"
    ) {
      $(".counter").waypoint(
        function () {
          $(this.element).counterUp({
            delay: 10,
            time: 2000,
          });
        },
        {
          offset: "75%",
          triggerOnce: true,
        }
      );
    } else {
      // Fallback counter animation if plugins are not loaded
      const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          element.textContent = Math.floor(current);
        }, 16);
      };

      // Use Intersection Observer for better performance
      const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px",
      };

      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !entry.target.classList.contains("animated")
          ) {
            const target = parseInt(entry.target.getAttribute("data-count"));
            entry.target.classList.add("animated");
            animateCounter(entry.target, target);
          }
        });
      }, observerOptions);

      // Observe all counter elements
      document.querySelectorAll(".counter").forEach((counter) => {
        counterObserver.observe(counter);
      });
    }
  });
  /*END COUNTER ANIMATION JS*/
})(jQuery);
