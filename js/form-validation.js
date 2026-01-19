/**
 * Form Validation & Security
 * M.G.N CodeWave - 2026
 *
 * Provides client-side validation for contact and tarifs forms
 * Prevents XSS, validates email/phone, sanitizes user input
 */

(function () {
  "use strict";

  // Validation patterns
  const PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^(\+|00)?[0-9]{1,3}[\s\-]?[0-9]{6,14}$/,
    name: /^[a-zA-ZÀ-ÿ\s'.\-]{2,50}$/,
    xss: /<script|<iframe|javascript:|onerror|onload|onclick/gi,
  };

  // Error messages in French
  const ERROR_MESSAGES = {
    name: "Nom invalide (2-50 caractères, lettres uniquement)",
    email: "Email invalide",
    phone: "Téléphone invalide",
    required: "Ce champ est obligatoire",
    xss: "Contenu non autorisé détecté",
  };

  // Sanitize input to prevent XSS
  function sanitizeInput(input) {
    if (!input || typeof input !== "string") return "";

    // Check for XSS patterns
    if (PATTERNS.xss.test(input)) {
      console.warn("Potential XSS attempt detected:", input);
      return input.replace(PATTERNS.xss, "");
    }

    // Trim and limit length
    return input
      .trim()
      .replace(/[<>]/g, "") // Remove angle brackets
      .substring(0, 500); // Max 500 characters
  }

  // Validate email
  function validateEmail(email) {
    const sanitized = sanitizeInput(email);
    return PATTERNS.email.test(sanitized) && sanitized.length <= 254;
  }

  // Validate phone
  function validatePhone(phone) {
    if (!phone) return true; // Optional field
    const sanitized = sanitizeInput(phone);
    return PATTERNS.phone.test(sanitized.replace(/\s/g, ""));
  }

  // Validate name
  function validateName(name) {
    const sanitized = sanitizeInput(name);
    return (
      PATTERNS.name.test(sanitized) &&
      sanitized.length >= 2 &&
      sanitized.length <= 50
    );
  }

  // Show validation error
  function showError(input, message) {
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");

    // Remove existing error message
    const existingError =
      input.parentElement.querySelector(".invalid-feedback");
    if (existingError) {
      existingError.remove();
    }

    // Add new error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "invalid-feedback d-block";
    errorDiv.textContent = message;
    errorDiv.setAttribute("role", "alert");
    input.parentElement.appendChild(errorDiv);
  }

  // Clear validation error
  function clearError(input) {
    input.classList.remove("is-invalid");
    input.setAttribute("aria-invalid", "false");

    const errorDiv = input.parentElement.querySelector(".invalid-feedback");
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  // Real-time validation on input
  function setupRealTimeValidation() {
    document.addEventListener(
      "blur",
      function (e) {
        const input = e.target;

        if (input.type === "email") {
          if (input.value && !validateEmail(input.value)) {
            showError(input, ERROR_MESSAGES.email);
          } else {
            clearError(input);
          }
        } else if (
          input.name.toLowerCase().includes("téléphone") ||
          input.name.toLowerCase().includes("phone")
        ) {
          if (input.value && !validatePhone(input.value)) {
            showError(input, ERROR_MESSAGES.phone);
          } else {
            clearError(input);
          }
        } else if (
          input.name.toLowerCase().includes("nom") ||
          input.type === "text"
        ) {
          if (input.value && !validateName(input.value)) {
            showError(input, ERROR_MESSAGES.name);
          } else {
            clearError(input);
          }
        }
      },
      true,
    );
  }

  // Main form validation on submit
  function setupFormValidation() {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        // Only validate if form submits to Formspree
        if (!form.action || !form.action.includes("formspree.io")) {
          return;
        }

        let hasError = false;

        // Get all form inputs
        const inputs = form.querySelectorAll("input, textarea, select");

        inputs.forEach((input) => {
          // Skip hidden inputs
          if (input.type === "hidden") {
            return;
          }

          const value = input.value;
          const fieldName = input.name.toLowerCase();

          // Check if required
          if (input.hasAttribute("required") && !value.trim()) {
            showError(input, ERROR_MESSAGES.required);
            hasError = true;
            return;
          }

          // Validate specific field types
          if (input.type === "email") {
            if (value && !validateEmail(value)) {
              showError(input, ERROR_MESSAGES.email);
              hasError = true;
              return;
            }
          } else if (
            fieldName.includes("téléphone") ||
            fieldName.includes("phone")
          ) {
            if (value && !validatePhone(value)) {
              showError(input, ERROR_MESSAGES.phone);
              hasError = true;
              return;
            }
          } else if (fieldName.includes("nom") && input.type === "text") {
            if (value && !validateName(value)) {
              showError(input, ERROR_MESSAGES.name);
              hasError = true;
              return;
            }
          }

          // Check for XSS patterns
          if (PATTERNS.xss.test(value)) {
            showError(input, ERROR_MESSAGES.xss);
            hasError = true;
            return;
          }

          // Clear error if validation passes
          clearError(input);
        });

        if (hasError) {
          e.preventDefault();
          console.error("Form validation failed - errors shown to user");
          return false;
        }

        // Sanitize all inputs before submission
        inputs.forEach((input) => {
          if (input.value && input.type !== "hidden") {
            input.value = sanitizeInput(input.value);
          }
        });

        console.log("Form validation passed - submitting to Formspree");
      });
    });
  }

  // Initialize when DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    setupRealTimeValidation();
    setupFormValidation();
  });

  // Export functions for testing (if needed)
  window.FormValidation = {
    validateEmail,
    validatePhone,
    validateName,
    sanitizeInput,
  };
})();
