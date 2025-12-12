// ============================================
// IMPORTS DES FICHIERS DE TRADUCTION
// ============================================
// On importe les fichiers JSON qui contiennent toutes les traductions
// - en.json : toutes les traductions en anglais
// - fr.json : toutes les traductions en français
import enTranslations from "../en.json";
import frTranslations from "../fr.json";

// ============================================
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ============================================
// On attend que toute la page HTML soit chargée avant d'exécuter le code
document.addEventListener("DOMContentLoaded", async () => {
  // La langue par défaut affichée au chargement de la page
  const defaultLang = "fr";

  // ============================================
  // RÉCUPÉRATION DE LA LANGUE SAUVEGARDÉE
  // ============================================
  // On vérifie si l'utilisateur a déjà choisi une langue lors d'une visite précédente
  // localStorage permet de sauvegarder des données dans le navigateur
  // Ces données restent même après avoir fermé le navigateur ou changé de page
  const savedLang = localStorage.getItem("selectedLanguage");

  // Si une langue a été sauvegardée, on l'utilise, sinon on prend la langue par défaut
  const currentLang = savedLang || defaultLang;

  // On récupère tous les boutons qui permettent de changer de langue
  // Ces boutons ont la classe CSS "lang-switch" dans le HTML
  const langSwitcherBtns = document.querySelectorAll(".lang-switch");

  // ============================================
  // FONCTION PRINCIPALE DE TRADUCTION
  // ============================================
  // Cette fonction change la langue de TOUS les éléments traduits de la page
  const useCorrectTranslation = (lang) => {
    // On crée un objet qui fait le lien entre le code langue ("en" ou "fr")
    // et le fichier de traductions correspondant
    const translations_map = {
      en: enTranslations, // Si langue = "en", on utilise enTranslations
      fr: frTranslations, // Si langue = "fr", on utilise frTranslations
    };

    // On récupère le bon fichier de traductions selon la langue demandée
    const translationsData = translations_map[lang];

    // On récupère TOUS les éléments HTML qui ont un attribut "data-translation"
    // Ces éléments sont ceux qui doivent être traduits
    const translations = document.querySelectorAll("[data-translation]");

    // Pour chaque élément à traduire :
    translations.forEach((translation) => {
      // On récupère la clé de traduction (ex: "home.title", "home.description")
      // Cette clé est définie dans l'attribut data-translation du HTML
      const key = translation.dataset.translation;

      // Si cette clé existe dans le fichier de traductions,
      // on remplace le texte de l'élément par la traduction
      if (translationsData[key]) {
        translation.textContent = translationsData[key];
      }
    });
  };

  // ============================================
  // PREMIÈRE TRADUCTION AU CHARGEMENT
  // ============================================
  // On applique la langue sauvegardée (ou par défaut) dès que la page est chargée
  useCorrectTranslation(currentLang);

  // ============================================
  // GESTION DES CLICS SUR LES BOUTONS DE LANGUE
  // ============================================
  // Pour chaque bouton de changement de langue :
  langSwitcherBtns.forEach((btn) => {
    // On ajoute un écouteur d'événement qui réagit au clic
    btn.addEventListener("click", () => {
      // On récupère la langue cible depuis l'attribut "data-lang" du bouton
      // (ex: "fr" ou "en")
      const newLang = btn.dataset.lang;

      // ============================================
      // SAUVEGARDE DU CHOIX DE LANGUE
      // ============================================
      // On sauvegarde la langue choisie dans le localStorage du navigateur
      // Ainsi, quand l'utilisateur navigue vers une autre page ou revient plus tard,
      // sa préférence de langue sera conservée
      localStorage.setItem("selectedLanguage", newLang);

      // On applique les traductions de la nouvelle langue
      useCorrectTranslation(newLang);
    });
  });
});
