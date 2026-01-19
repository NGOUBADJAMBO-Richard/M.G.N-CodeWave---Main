# 🔐 Feuille de Route de Correction de Sécurité

**Statut:** En cours ✅  
**Dernière mise à jour:** 19 janvier 2026  
**Responsable:** Équipe Sécurité M.G.N CodeWave

---

## ✅ Actions Déjà Complétées

### 1. ✅ Configuration Vercel (Headers de Sécurité)

- **Fichier:** `vercel.json`
- **Statut:** CRÉÉ
- **Détails:**
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: Restrictions géolocalisation, micro, caméra
  - Content-Security-Policy: Configuration complète
  - HSTS (Strict-Transport-Security): max-age=31536000

**Action:** Déployer le fichier `vercel.json` sur Vercel (mise en production requise)

---

### 2. ✅ Script de Validation des Formulaires

- **Fichier:** `js/form-validation.js`
- **Statut:** CRÉÉ
- **Fonctionnalités:**
  - Validation des emails en temps réel
  - Validation des numéros de téléphone
  - Validation des noms (caractères autorisés)
  - Prévention XSS (détection de patterns dangereux)
  - Sanitization des inputs
  - Messages d'erreur multilingues (FR)
  - Accessibilité (aria-invalid, role="alert")

**Action:** Vérifier que le script charge correctement dans les formulaires

---

### 3. ✅ Mise à Jour des Formulaires

#### Contact (contact.html)

- ✅ Script de validation intégré
- ✅ Skip link fonctionnel
- ✅ id="main" présent

**Actions:**

```html
<!-- Vérifier que ceci est présent avant </body> -->
<script src="js/form-validation.js"></script>
```

#### Tarifs (tarifs.html)

- ✅ Script de validation intégré
- ✅ Skip link AJOUTÉ
- ✅ id="main" AJOUTÉ
- ✅ Redirection sécurisée: `_next` = `/thanks.html` (au lieu de `https://codewave-psi.vercel.app/thanks.html`)

**Actions:**

- Vérifier que le formulaire fonctionne correctement
- Tester la redirection vers `/thanks.html`

---

## ⏳ Actions À Faire - TIER 1 (URGENT)

### 1. Déployer vercel.json

**Priorité:** 🔴 URGENTE  
**Estimation:** 5 minutes

```bash
# Vérifier que vercel.json existe à la racine
ls -la vercel.json

# Pusher les changements
git add vercel.json
git commit -m "feat: add security headers via vercel.json"
git push
```

**Vérification après déploiement:**

- Aller sur: https://observatory.mozilla.org
- Entrer: https://codewave-psi.vercel.app
- Vérifier la note de sécurité (doit augmenter)

---

### 2. Vérifier les CDN - Ajouter SRI (Subresource Integrity)

**Fichiers à mettre à jour:**

- [ ] `contact.html`
- [ ] `tarifs.html`
- [ ] `portfolio.html`
- [ ] Tous les fichiers HTML

**Exemple - AVANT:**

```html
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
```

**Exemple - APRÈS:**

```html
<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-/JqT3SQfawRcv/BIHMnYTOmoO9E2APzvqnY4g4CSlY="
  crossorigin="anonymous"
></script>
```

**Où trouver les SRI?**

- https://www.srihash.org - Service en ligne gratuit
- Cherchez "SRI generator" + le lien CDN

**Ordre prioritaire:**

1. jQuery 3.4.1 (utilisé partout)
2. Bootstrap 5.3.3
3. Font Awesome 5.10.0
4. Toutes les autres librairies CDN

---

### 3. Mettre à Jour jQuery 3.4.1 → 3.7.1

**Pourquoi?** jQuery 3.4.1 date de 2019. Des failles de sécurité ont été corrigées depuis.

**Fichiers concernés:** Tous les fichiers HTML qui chargent jQuery

**Remplacement:**

```html
<!-- AVANT -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<!-- APRÈS -->
<script
  src="https://code.jquery.com/jquery-3.7.1.min.js"
  integrity="sha256-/JqT3SQfawRcv/BIHMnYTOmoO9E2APzvqnY4g4CSlY="
  crossorigin="anonymous"
></script>
```

**Vérification:**

- Tester tous les scripts jQuery (dropdowns, modals, etc.)
- Vérifier que main.js fonctionne toujours
- Tester le portfolio (Isotope)

---

### 4. Tester les Formulaires

**Contact (contact.html):**

- [ ] Soumettre avec un email invalide → Doit refuser
- [ ] Soumettre avec nom < 2 caractères → Doit refuser
- [ ] Soumettre avec pattern XSS `<script>alert('xss')</script>` → Doit être sanitisé
- [ ] Soumettre formulaire correct → Doit aller à Formspree

**Tarifs (tarifs.html):**

- [ ] Soumettre sans remplir → Doit refuser
- [ ] Tester le téléphone au format: +241 66 19 89 18 → Doit accepter
- [ ] Soumettre avec données valides → Redirection vers `/thanks.html`

---

## 🟡 Actions À Faire - TIER 2 (IMPORTANT)

### 1. Ajouter reCAPTCHA v3 (Anti-bot)

**Étapes:**

1. Aller sur https://www.google.com/recaptcha/admin
2. Créer un nouveau site (Type: reCAPTCHA v3)
3. Ajouter ces domaines:
   - codewave-psi.vercel.app
   - localhost
   - Tout domaine personnalisé utilisé
4. Copier la "Site Key" et "Secret Key"

**Intégrer dans contact.html et tarifs.html:**

```html
<!-- Dans <head> -->
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>

<!-- Avant le </form> -->
<script>
  document.querySelector("form").addEventListener("submit", function (e) {
    grecaptcha.ready(function () {
      grecaptcha
        .execute("YOUR_SITE_KEY", { action: "submit" })
        .then(function (token) {
          document.getElementById("g-recaptcha-response").value = token;
        });
    });
  });
</script>

<!-- Dans le formulaire (input caché) -->
<input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" />
```

**Configuration Formspree:**

- Les réponses reCAPTCHA sont automatiquement validées par Formspree

---

### 2. Mettre à Jour Font Awesome 5.10.0 → 6.5.1

**Raison:** Version plus récente, meilleures icônes, meilleure sécurité

**Remplacer:**

```html
<!-- AVANT -->
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
  rel="stylesheet"
/>

<!-- APRÈS -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  integrity="sha512-DTOQO9RWCH3H90sNLKN2PN2QrfRvH1BLjoU862iK50uaf3jlco7Sy0M2p9dbbtE1Iq0Vv7Pg56sUYVQoMoqvDA=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
```

**Vérification:** Vérifier que toutes les icônes affichent correctement

---

### 3. Audit des Scripts Tiers

**Vérifier si d'autres scripts tiers sont chargés:**

1. Ouvrir DevTools (F12)
2. Aller dans "Network" tab
3. Recharger la page
4. Chercher tous les scripts `.js` chargés
5. Pour chaque script externe, vérifier:
   - Est-ce nécessaire?
   - Vient-il de source fiable?
   - A-t-il un SRI?
   - Peut-on l'utiliser en version plus récente?

---

## 🟢 Actions À Faire - TIER 3 (RECOMMANDÉ)

### 1. Ajouter Rate Limiting

Via Vercel ou un middleware:

```json
{
  "routes": [
    {
      "src": "/api/contact",
      "methods": ["POST"],
      "headers": {
        "X-Rate-Limit": "10/h"
      }
    }
  ]
}
```

### 2. Monitoring et Alertes

Intégrer Sentry pour les erreurs JS:

```html
<script src="https://browser.sentry-cdn.com/6.19.7/bundle.min.js"></script>
<script>
  Sentry.init({
    dsn: "YOUR_SENTRY_DSN",
    environment: "production",
    tracesSampleRate: 0.1,
  });
</script>
```

### 3. Cookie Consent Banner

Ajouter un banner pour RGPD (si Google Analytics utilisé):

```html
<!-- Avant </body> -->
<script>
  if (!localStorage.getItem("cookie-consent")) {
    // Afficher le banner
  }
</script>
```

---

## 📋 Checklist de Validation Finale

- [ ] `vercel.json` déployé et headers actifs
- [ ] Tous les CDN ont SRI
- [ ] jQuery mis à jour (3.7.1)
- [ ] Contact.html formulaire valide
- [ ] Tarifs.html formulaire valide + redirection correcte
- [ ] Pas d'erreurs dans DevTools
- [ ] Formulaires rejettent les XSS
- [ ] Mozilla Observatory score > 50/100
- [ ] Tests de régression OK (tous les JS fonctionne)

---

## 🚀 Commandes Rapides

```bash
# Vérifier les changements
git status
git diff

# Valider les fichiers HTML (optionnel)
npx html-validate *.html

# Committer les changements
git add .
git commit -m "security: improve form validation and add security headers"
git push

# Voir le déploiement sur Vercel
# Aller sur: https://vercel.com/dashboard
```

---

## 📞 Support

- **Questions sécurité?** Consulter OWASP: https://owasp.org
- **CDN issues?** Utiliser https://www.srihash.org
- **Headers test?** Utiliser https://observatory.mozilla.org
- **Formspree docs?** https://formspree.io/docs

---

**Dernier audité:** 19 janvier 2026  
**Prochaine révision:** Dans 3 mois ou après nouveau déploiement
