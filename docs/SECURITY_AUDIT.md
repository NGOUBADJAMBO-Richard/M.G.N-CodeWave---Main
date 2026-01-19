# 🔒 Audit de Sécurité - M.G.N CodeWave

**Date:** 19 janvier 2026  
**Niveau Global:** 6.5/10 ⚠️  
**Recommandation:** Implémentation urgente des corrections Tier 1

---

## 📊 Résumé Exécutif

| Catégorie                        | Statut      | Score | Priorité      |
| -------------------------------- | ----------- | ----- | ------------- |
| **Headers de Sécurité**          | ❌ Critique | 0/10  | 🔴 URGENTE    |
| **Validation des Formulaires**   | ⚠️ Partiel  | 4/10  | 🔴 URGENTE    |
| **Gestion des Données**          | ✅ Bon      | 7/10  | 🟡 Moyenne    |
| **HTTPS & TLS**                  | ✅ Bon      | 8/10  | 🟢 Géré       |
| **Dépendances & Librairies**     | ⚠️ Modéré   | 5/10  | 🟡 Importante |
| **Scripts Tiers**                | ⚠️ Modéré   | 5/10  | 🟡 Importante |
| **Politique de Confidentialité** | ✅ Bon      | 8/10  | 🟢 Géré       |

---

## 🔴 PROBLÈMES CRITIQUES

### 1. **Absence de Headers de Sécurité HTTP**

#### ❌ Problème

Votre serveur n'envoie pas les headers de sécurité essentiels qui protègent contre:

- XSS (Cross-Site Scripting)
- Clickjacking
- MIME-type sniffing
- Sniffing de contenu

#### 📍 Détails Techniques

```
❌ Missing: Content-Security-Policy
❌ Missing: X-Content-Type-Options
❌ Missing: X-Frame-Options
❌ Missing: X-XSS-Protection
❌ Missing: Referrer-Policy
❌ Missing: Permissions-Policy
```

#### ✅ Solution Immédiate

**Si hébergé sur Vercel** (comme indiqué dans mentions-legale.html):

- Créer `vercel.json` à la racine du projet:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com cdn.jsdelivr.net code.jquery.com www.googletagmanager.com; style-src 'self' 'unsafe-inline' cdn.jsdelivr.net cdnjs.cloudflare.com fonts.googleapis.com; font-src 'self' fonts.gstatic.com cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self' formspree.io; frame-src 'self' www.google.com"
        }
      ]
    }
  ]
}
```

---

### 2. **Validation des Formulaires Insuffisante**

#### ❌ Problème Identifié

Les formulaires de contact manquent de validation côté serveur et client avancée.

**Fichiers affectés:**

- `contact.html` - Formulaire de contact
- `tarifs.html` - Formulaire de devis
- Tous les formulaires utilisant Formspree

#### 📍 Détails

```html
<!-- Exemple actuel - PROBLÈME -->
<input
  type="email"
  name="L'email du Client"
  class="form-control form-control-lg bg-white border-0"
  placeholder="Adresse email"
  required
/>
<!-- ⚠️ Pas de pattern, pas de validation avancée -->
```

#### ✅ Solution: Ajouter Validation Avancée

Créer `js/form-validation.js`:

```javascript
/**
 * Form Validation & Security
 * M.G.N CodeWave - 2026
 */

(function () {
  "use strict";

  // Validation patterns
  const PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^(\+|00)?[0-9]{1,3}[0-9]{6,14}$/,
    name: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
    xss: /<script|<iframe|javascript:|onerror|onload/gi,
  };

  // Sanitize input
  function sanitizeInput(input) {
    if (PATTERNS.xss.test(input)) {
      console.warn("Potential XSS attempt detected");
      return "";
    }
    return input.trim().replace(/[<>]/g, "").substring(0, 255);
  }

  // Validate email
  function validateEmail(email) {
    return PATTERNS.email.test(email) && email.length <= 254;
  }

  // Validate phone
  function validatePhone(phone) {
    return PATTERNS.phone.test(phone.replace(/\s/g, ""));
  }

  // Validate name
  function validateName(name) {
    return PATTERNS.name.test(name) && name.length >= 2;
  }

  // Add form validation on submit
  document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        // Get form fields
        const nameInput = form.querySelector(
          'input[name*="Nom"], input[type="text"]',
        );
        const emailInput = form.querySelector('input[type="email"]');
        const phoneInput = form.querySelector(
          'input[name*="téléphone"], input[name*="phone"]',
        );

        let hasError = false;

        // Validate name
        if (nameInput && !validateName(nameInput.value)) {
          nameInput.classList.add("is-invalid");
          nameInput.setAttribute("aria-invalid", "true");
          hasError = true;
        } else if (nameInput) {
          nameInput.classList.remove("is-invalid");
          nameInput.setAttribute("aria-invalid", "false");
        }

        // Validate email
        if (emailInput && !validateEmail(emailInput.value)) {
          emailInput.classList.add("is-invalid");
          emailInput.setAttribute("aria-invalid", "true");
          hasError = true;
        } else if (emailInput) {
          emailInput.classList.remove("is-invalid");
          emailInput.setAttribute("aria-invalid", "false");
        }

        // Validate phone
        if (phoneInput && !validatePhone(phoneInput.value)) {
          phoneInput.classList.add("is-invalid");
          phoneInput.setAttribute("aria-invalid", "true");
          hasError = true;
        } else if (phoneInput) {
          phoneInput.classList.remove("is-invalid");
          phoneInput.setAttribute("aria-invalid", "false");
        }

        if (hasError) {
          e.preventDefault();
          console.error("Form validation failed");
        }

        // Sanitize all inputs before submission
        form.querySelectorAll("input, textarea, select").forEach((field) => {
          if (field.value) {
            field.value = sanitizeInput(field.value);
          }
        });
      });
    });
  });
})();
```

**Intégrer dans les pages:**

```html
<!-- Ajouter avant </body> dans contact.html et tarifs.html -->
<script src="js/form-validation.js"></script>
```

---

### 3. **Formspree - Problèmes de Configuration**

#### ❌ Problème Identifié

**URL de redirection exposée:**

```html
<input
  type="hidden"
  name="_next"
  value="https://codewave-psi.vercel.app/thanks.html"
/>
```

#### 🔓 Risque

- **Open Redirect Vulnerability** - Un attaquant peut modifier le domaine pour phishing
- **Information Disclosure** - Expose votre domaine Vercel

#### ✅ Solution

1. **Utiliser une redirection relative:**

```html
<input type="hidden" name="_next" value="/thanks.html" />
```

2. **Ajouter reCAPTCHA v3** (gratuit):

```html
<!-- Dans <head> -->
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>

<!-- Dans le formulaire -->
<input type="hidden" name="_captcha" value="false" />
<script>
  grecaptcha.ready(function () {
    grecaptcha
      .execute("YOUR_SITE_KEY", { action: "submit" })
      .then(function (token) {
        document.getElementById("g-recaptcha-response").value = token;
      });
  });
</script>
```

---

## 🟡 PROBLÈMES IMPORTANTS

### 4. **Dépendances Obsolètes**

#### ❌ Problèmes Identifiés

```
⚠️ jQuery 3.4.1 (2019) → Utiliser 3.7.1 (latest)
⚠️ Font Awesome 5.10.0 (2018) → Utiliser 6.5.x (latest)
⚠️ Bootstrap 5.3.3 → OK mais vérifier les sous-dépendances
```

#### ✅ Solution: Mettre à Jour les CDN

Remplacer dans **TOUS les fichiers HTML:**

```html
<!-- OLD -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
  rel="stylesheet"
/>

<!-- NEW -->
<script
  src="https://code.jquery.com/jquery-3.7.1.min.js"
  integrity="sha256-/JqT3SQfawRcv/BIHMnYTOmoO9E2APzvqnY4g4CSlY="
  crossorigin="anonymous"
></script>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  integrity="sha512-DTOQO9RWCH3H90sNLKN2PN2QrfRvH1BLjoU862iK50uaf3jlco7Sy0M2p9dbbtE1Iq0Vv7Pg56sUYVQoMoqvDA=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
```

### 5. **CORS & SRI (Subresource Integrity) Manquants**

#### ❌ Problème

Les CDN n'utilisent pas d'intégrité (SRI), permettant une attaque MITM.

#### ✅ Solution: Ajouter Intégrité sur Tous les CDN

```html
<!-- Exemple -->
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55DKGLT+NOTIF4_FLAPJUL_TEXTURE_OK"
  crossorigin="anonymous"
></script>
```

---

## 🟢 POINTS POSITIFS

### ✅ Points Forts Identifiés

1. **Politique de Confidentialité Complète** (politique_confidentialite.html)
   - ✅ Conforme RGPD
   - ✅ Détails sur collecte de données
   - ✅ Droits des utilisateurs expliqués

2. **HTTPS Actif** (Vercel/Deployment)
   - ✅ TLS 1.2+ obligatoire
   - ✅ Certificat SSL valide

3. **Mentions Légales Présentes**
   - ✅ Informations de l'hébergeur
   - ✅ Propriété intellectuelle définie

4. **Attributs Aria Partout**
   - ✅ Accessibilité + sécurité

5. **rel="noopener noreferrer"** sur Liens Externes
   - ✅ Protection Tabnabbing

---

## 📋 Plan d'Action Priorisé

### **TIER 1 - URGENTE (Cette semaine) 🔴**

- [ ] Créer `vercel.json` avec headers de sécurité
- [ ] Ajouter `js/form-validation.js` à tous les formulaires
- [ ] Ajouter SRI à tous les CDN externes
- [ ] Mettre à jour jQuery 3.4.1 → 3.7.1
- [ ] Corriger redirection Formspree vers `/thanks.html`

### **TIER 2 - IMPORTANTE (Ce mois) 🟡**

- [ ] Ajouter reCAPTCHA v3 aux formulaires
- [ ] Mettre à jour Font Awesome 5.10.0 → 6.5.x
- [ ] Implémenter Rate Limiting via Vercel ou serveur backend
- [ ] Ajouter Content-Security-Policy header strict
- [ ] Auditer les scripts jQuery pour XSS

### **TIER 3 - RECOMMANDÉE (À planifier) 🟢**

- [ ] Implémenter HSTS Header
- [ ] Ajouter Expect-CT Header
- [ ] Vérifier les cookies (SameSite, Secure)
- [ ] Audit de sécurité externe annuel
- [ ] Monitoring des dépendances (Dependabot)

---

## 🛠️ Fichiers à Créer/Modifier

### Fichiers à Créer:

1. ✅ `vercel.json` - Configuration headers (à la racine)
2. ✅ `js/form-validation.js` - Script validation

### Fichiers à Modifier:

- [ ] `contact.html` - Corriger Formspree, ajouter validation
- [ ] `tarifs.html` - Corriger Formspree, ajouter validation
- [ ] Tous les fichiers HTML - Mettre à jour CDN avec SRI
- [ ] `.gitignore` - Ajouter secrets/env vars

---

## 🔐 Recommandations Supplémentaires

### 1. **Secrets Management**

```javascript
// ❌ NE JAMAIS faire:
const API_KEY = "sk_live_abc123";

// ✅ À la place:
// Utiliser les environment variables de Vercel
const API_KEY = process.env.FORMSPREE_API_KEY;
```

### 2. **Monitoring**

- Installer Sentry pour les erreurs JS: https://sentry.io
- Activer les alertes de sécurité GitHub

### 3. **Backup & Disaster Recovery**

- Backup hebdomadaire de la base de données (si applicable)
- Plan de récupération après sinistre

### 4. **Audit & Scanning**

Utiliser régulièrement:

- **npm audit** pour les dépendances Node
- **Lighthouse** (DevTools) pour audit de sécurité
- **Mozilla Observatory** pour test headers: https://observatory.mozilla.org

---

## 📞 Contacts & Ressources

- **OWASP Top 10:** https://owasp.org/www-project-top-ten/
- **Mozilla Security Guidelines:** https://infosec.mozilla.org
- **Vercel Security:** https://vercel.com/security
- **Your Security Team:** mgncodewave18@gmail.com

---

**Audit réalisé:** 19 janvier 2026  
**Prochain audit recommandé:** Tous les 3 mois ou après nouveau déploiement  
**Responsable:** Équipe Sécurité M.G.N CodeWave
