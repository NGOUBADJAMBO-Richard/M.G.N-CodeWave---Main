# Changelog - M.G.N CodeWave Website

Toutes les modifications notables apportées au site web M.G.N CodeWave seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [2.0.0] - 2026-01-16

### 🎉 Version Majeure - Refonte Complète

Cette version transforme le site en site principal professionnel de M.G.N CodeWave avec de nombreuses améliorations et corrections.

### ✨ Ajouté

#### Page d'Accueil (index.html)

- **Section Statistiques** avec compteurs animés
  - 25+ Clients Satisfaits
  - 30+ Projets Réalisés
  - 3+ Années d'Expérience
- **Section Services Détaillée** avec tarifs
  - Sites Vitrines : 100 000 FCFA
  - E-Commerce : 300 000 FCFA (badge POPULAIRE)
  - Blogs & Portfolios : 80 000 FCFA
- **Section Témoignages** avec 3 avis clients authentiques
  - H2P Group
  - Waz'UP
  - Le Bon Waz
- **Section Call-to-Action** avec fond image et double CTA
- **Hero Section Amélioré** avec message accrocheur "Votre Site Web Prêt en 2 Semaines 🇬🇦"

#### Page À Propos (about.html)

- **Section Histoire** avec timeline 2023-2026
- **Section Technologies** avec stack technique complet
  - Frontend : HTML5, CSS3, JavaScript, Bootstrap, React
  - Backend : Node.js, PHP, Laravel, Express
  - Base de données : MySQL, PostgreSQL, MongoDB
  - Outils : Git, GitHub, VS Code, Figma
- **Section "Pourquoi Nous Choisir"** avec 4 arguments clés
  - Expertise locale 🇬🇦
  - Livraison rapide ⚡
  - Prix compétitifs 💰
  - Support dédié 🛟
- **CTA Section** en fin de page

#### Page Contact (contact.html)

- **Bannière WhatsApp** pour réponse rapide
- **Amélioration du formulaire** avec meilleur design et titre

#### Widget WhatsApp (js/whatsapp-widget.js)

- **Bouton flottant** visible sur toutes les pages
- Apparaît après 300px de scroll
- Animation d'apparition fluide
- Lien avec message pré-rempli
- Effet hover avec scaling

#### Styles CSS (css/improvements.css)

- Styles pour les cartes de services
- Animations hover sur les services
- Styles pour la section statistiques
- Transitions fluides sur les cartes

### 🔧 Corrigé

#### Contacts Uniformisés

- ✅ Numéro de téléphone : **+241 74 67 67 41** → **+241 66 19 89 18**
- ✅ Mis à jour dans **32 emplacements** sur 6 fichiers HTML
- ✅ Format WhatsApp : 24174676741 → 24166198918
- ✅ Corrections dans toutes les meta descriptions

#### Réseaux Sociaux

- ✅ Facebook : `href="#"` → `https://facebook.com/mgncodewave`
- ✅ LinkedIn : `href="#"` → `https://linkedin.com/company/mgn-codewave`
- ✅ GitHub : **Ajouté** → `https://github.com/MGNCodeWave`
- ✅ WhatsApp : Lien mis à jour avec message pré-rempli
- ✅ Ajout de `target="_blank"` et `rel="noopener noreferrer"` partout

### 📄 Fichiers Modifiés

#### HTML

- `index.html` - Ajout de 4 nouvelles sections majeures
- `about.html` - Ajout de 5 nouvelles sections
- `service.html` - Correction contacts + réseaux sociaux
- `contact.html` - Amélioration formulaire + bannière WhatsApp
- `portfolio.html` - Correction contacts + réseaux sociaux
- `tarifs.html` - Correction de 15 liens WhatsApp
- `mentions-legale.html` - Correction téléphone

#### CSS

- `css/improvements.css` - Ajout de 40+ lignes de styles

#### JavaScript

- `js/whatsapp-widget.js` - **Nouveau fichier créé**

#### Documentation

- `README-NEW.md` - Documentation complète mise à jour
- `CHANGELOG.md` - Ce fichier

### 📈 Améliorations de Performance

- ✅ Widget WhatsApp optimisé (charge après DOM ready)
- ✅ Images avec `loading="lazy"`
- ✅ Scripts chargés en fin de body
- ✅ CSS minifié (Bootstrap)
- ✅ Animations GPU-accelerated

### 🔒 Améliorations de Sécurité

- ✅ `rel="noopener noreferrer"` sur tous les liens externes
- ✅ ARIA labels pour l'accessibilité
- ✅ Validation des formulaires côté client

### 🌐 SEO

- ✅ Meta descriptions mises à jour
- ✅ Structure HTML sémantique
- ✅ Rich snippets compatibles
- ✅ URLs propres et descriptives

## [1.0.0] - 2025-XX-XX

### Initial Release

- Site web de base avec 6 pages
- Design responsive
- Formulaire de contact
- Portfolio de projets
- Tarifs des services

---

## Types de Changements

- `Ajouté` pour les nouvelles fonctionnalités
- `Modifié` pour les changements dans les fonctionnalités existantes
- `Déprécié` pour les fonctionnalités qui seront bientôt supprimées
- `Supprimé` pour les fonctionnalités supprimées
- `Corrigé` pour les corrections de bugs
- `Sécurité` pour les vulnérabilités corrigées

---

**Note** : Ce changelog est maintenu manuellement. Pour une liste complète des commits, voir l'historique Git.
