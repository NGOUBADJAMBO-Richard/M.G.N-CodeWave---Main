# 🚀 M.G.N CodeWave - Site Web Principal

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/MGNCodeWave)
[![Gabon](https://img.shields.io/badge/Made%20in-Gabon%20🇬🇦-green.svg)](https://mgncodewave.com)

Bienvenue sur le dépôt officiel du **site web principal de M.G.N CodeWave**, l'agence digitale de référence au Gabon. Ce site présente notre entreprise, nos services, notre portfolio et facilite la prise de contact avec nos clients potentiels.

## 📋 Table des Matières

- [À Propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Structure du Projet](#-structure-du-projet)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Déploiement](#-déploiement)
- [Contact](#-contact)

## 🎯 À Propos

M.G.N CodeWave est une agence Full-Stack basée à Libreville, Gabon. Nous aidons les PME, startups et indépendants à transformer leurs idées en produits numériques performants.

### Nos Services

- 💼 **Sites Vitrines** - À partir de 100 000 FCFA
- 🛒 **E-Commerce** - À partir de 300 000 FCFA
- 📝 **Blogs & Portfolios** - À partir de 80 000 FCFA
- 🔧 **Maintenance & Support**
- 📈 **SEO & Référencement**

### Notre Mission

Permettre aux entreprises gabonaises de réussir en ligne avec des solutions accessibles, performantes et durables.

## ✨ Fonctionnalités

### Pages Principales

- **🏠 Accueil (index.html)**

  - Hero section avec carousel dynamique
  - Section "À Propos" avec statistiques
  - Services détaillés avec prix
  - Témoignages clients
  - Call-to-Action puissants

- **👥 À Propos (about.html)**

  - Histoire de l'entreprise
  - Mission, Vision & Valeurs
  - Stack technique
  - Pourquoi nous choisir

- **⚙️ Services (service.html)**

  - Catalogue complet des services
  - Détails techniques
  - Tarifs indicatifs

- **🎨 Portfolio (portfolio.html)**

  - Projets réalisés
  - Filtres par catégorie
  - Détails des projets

- **💰 Tarifs (tarifs.html)**

  - Grilles tarifaires détaillées
  - Comparaison des packs
  - Formulaire de devis

- **📞 Contact (contact.html)**
  - Formulaire de contact (Formspree)
  - Bouton WhatsApp direct
  - Carte Google Maps
  - Coordonnées complètes

### Fonctionnalités Techniques

- ✅ **Design Responsive** - Compatible mobile, tablette, desktop
- ✅ **SEO Optimisé** - Meta tags, sitemaps, rich snippets
- ✅ **Performance** - Chargement rapide, images optimisées
- ✅ **Accessibilité** - ARIA labels, navigation au clavier
- ✅ **Widget WhatsApp Flottant** - Visible sur toutes les pages
- ✅ **Animations WOW.js** - Effets visuels au scroll
- ✅ **Carousel Owl** - Diaporama fluide
- ✅ **Compteurs Animés** - Statistiques dynamiques

## 🛠 Technologies

### Frontend

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec Flexbox/Grid
- **Bootstrap 5** - Framework CSS responsive
- **JavaScript ES6** - Interactivité

### Librairies & Plugins

- **jQuery 3.4.1** - Manipulation DOM
- **Bootstrap 5.0** - Composants UI
- **WOW.js** - Animations au scroll
- **Owl Carousel** - Carrousel d'images
- **CountUp.js** - Compteurs animés
- **Waypoints** - Déclencheurs de scroll
- **Easing** - Animations fluides

### Outils

- **Font Awesome 5** - Icônes
- **Bootstrap Icons** - Icônes supplémentaires
- **Google Fonts** - Typographie (Nunito, Rubik)
- **Formspree** - Gestion des formulaires
- **Google Maps** - Intégration carte

## 📁 Structure du Projet

```
M.G.N-CodeWave/
│
├── index.html                 # Page d'accueil principale
├── about.html                 # À propos de l'entreprise
├── service.html              # Catalogue des services
├── portfolio.html            # Portfolio des projets
├── tarifs.html               # Grilles tarifaires
├── contact.html              # Page de contact
├── mentions-legale.html      # Mentions légales
├── cgu.html                  # Conditions générales
├── politique_confidentialite.html  # Politique de confidentialité
│
├── css/
│   ├── bootstrap.min.css     # Framework Bootstrap
│   ├── style.css             # Styles principaux
│   └── improvements.css      # Améliorations custom
│
├── js/
│   ├── main.js               # Scripts principaux
│   ├── enhancements.js       # Améliorations JS
│   └── whatsapp-widget.js    # Widget WhatsApp flottant
│
├── img/
│   ├── logo/                 # Logos de l'entreprise
│   └── portfolio/            # Images du portfolio
│
├── lib/
│   ├── animate/              # Animations CSS
│   ├── counterup/            # Compteurs animés
│   ├── easing/               # Effets d'easing
│   ├── owlcarousel/          # Carousel d'images
│   ├── waypoints/            # Déclencheurs scroll
│   └── wow/                  # Animations WOW
│
└── README.md                 # Documentation du projet
```

## 🚀 Installation

### Prérequis

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Un serveur web local (optionnel) : Live Server, XAMPP, WAMP, ou Python SimpleHTTPServer

### Installation Locale

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/MGNCodeWave/mgn-codewave-website.git
   cd mgn-codewave-website
   ```

2. **Ouvrir avec Live Server** (VS Code)

   - Installer l'extension "Live Server" dans VS Code
   - Clic droit sur `index.html` > "Open with Live Server"

3. **Ou utiliser Python**

   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

4. **Accéder au site**
   - Ouvrir votre navigateur : `http://localhost:8000`

## ⚙️ Configuration

### Modifier les Coordonnées

Éditer les fichiers HTML pour mettre à jour :

- **Téléphone** : +241 66 19 89 18
- **Email** : ngoubadjambo18@gmail.com
- **WhatsApp** : Lien avec message pré-rempli
- **Réseaux sociaux** : Facebook, LinkedIn, GitHub

### Formulaire de Contact

Le formulaire utilise Formspree. Pour le configurer :

1. Créer un compte sur [Formspree.io](https://formspree.io)
2. Créer un nouveau formulaire
3. Remplacer l'URL dans `contact.html` :
   ```html
   <form action="https://formspree.io/f/VOTRE_ID" method="POST"></form>
   ```

### Widget WhatsApp

Modifier les paramètres dans [js/whatsapp-widget.js](js/whatsapp-widget.js) :

```javascript
const config = {
  phoneNumber: "24166198918",
  message: "Bonjour, je souhaite discuter d'un projet web",
  position: "bottom-right",
  backgroundColor: "#25D366",
};
```

## 🌐 Déploiement

### Vercel (Recommandé)

1. Installer Vercel CLI

   ```bash
   npm install -g vercel
   ```

2. Déployer
   ```bash
   vercel
   ```

### Netlify

1. Drag & drop le dossier sur [Netlify Drop](https://app.netlify.com/drop)
2. Ou connecter votre repo GitHub

### GitHub Pages

1. Créer un repo sur GitHub
2. Push le code
3. Activer GitHub Pages dans Settings > Pages

## 📊 Performance

- ⚡ **Lighthouse Score** : 90+
- 📱 **Mobile-Friendly** : 100%
- 🎯 **SEO Score** : 95+
- ♿ **Accessibility** : 90+

## 🔐 Sécurité

- HTTPS obligatoire en production
- Protection CSRF sur les formulaires
- Validation côté client et serveur
- Sanitisation des inputs

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

**M.G.N CodeWave**

- 🌐 Site Web : [mgncodewave.com](https://mgncodewave.com)
- 📧 Email : ngoubadjambo18@gmail.com
- 📱 Téléphone : +241 66 19 89 18
- 💬 WhatsApp : [Contactez-nous](https://wa.me/24166198918)
- 🔗 LinkedIn : [M.G.N CodeWave](https://linkedin.com/company/mgn-codewave)
- 💻 GitHub : [@MGNCodeWave](https://github.com/MGNCodeWave)
- 👥 Facebook : [M.G.N CodeWave](https://facebook.com/mgncodewave)

---

<div align="center">
  
  **🇬🇦 Made with ❤️ in Libreville, Gabon**
  
  © 2026 M.G.N CodeWave. Tous droits réservés.
  
</div>
