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
  // ============================================
  // DÉTECTION DE LA LANGUE DU NAVIGATEUR
  // ============================================
  // On récupère la langue préférée de l'utilisateur depuis son navigateur
  // navigator.language retourne une chaîne de caractères comme "en-US" ou "fr-FR"
  const userLang = navigator.language || navigator.userLanguage;
  let defaultLang = "";

  // On détermine la langue par défaut à utiliser
  // Si la langue du navigateur commence par "fr", on choisit le français
  // Sinon, on choisit l'anglais
  if (userLang.startsWith("fr")) {
    defaultLang = "fr";
  } else {
    defaultLang = "en";
  }

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
    // On vérifie si ce bouton correspond à la langue courante
    if (btn.dataset.lang === currentLang) {
      btn.classList.add("current");
    } else {
      btn.classList.remove("current");
    }
    // On ajoute un écouteur d'événement qui réagit au clic
    btn.addEventListener("click", () => {
      // On récupère la langue cible depuis l'attribut "data-lang" du bouton
      // (ex: "fr" ou "en")
      const newLang = btn.dataset.lang;

      // On enlève la classe current de tout les buttons
      langSwitcherBtns.forEach((button) => {
        button.classList.remove("current");
      });

      // et on la rajoute au bon button
      btn.classList.add("current");

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

// __________________________________________________________________________________________________

// Burger menu

var burger = document.querySelector(".menu-burger");
var menu = document.querySelector(".menu");
var menuItems = document.querySelectorAll(".menu .menu-item");

function toggleMenu() {
  menu.classList.toggle("is-active");
  burger.classList.toggle("is-active");
}
burger.addEventListener("click", toggleMenu);
menuItems.forEach(function (menuItem) {
  menuItem.addEventListener("click", toggleMenu);
});

// // __________________________________________________________________________________________________

// Tabs

const tabs = document.querySelector(".tabs");
if (tabs) {
  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-target]");
    if (!btn) return;

    const target = btn.dataset.target;

    document
      .querySelectorAll("[data-target]")
      .forEach((b) => b.classList.remove("tabs-slide-active"));

    document
      .querySelectorAll(".tabs-slide")
      .forEach((p) => p.classList.remove("tabs-slide-active"));

    btn.classList.add("tabs-slide-active");
    document.getElementById(target).classList.add("tabs-slide-active");
  });
}

// // __________________________________________________________________________________________________

// Dynamic filters

const cards = document.querySelectorAll(".project-card");
const filters = document.querySelectorAll("input[name='type']");

const styleElements = (elements) => {
  elements.forEach((element) => {
    element
      .querySelector(".project-item")
      .classList.remove("project-item-left");
  });

  const visibleElements = Array.from(elements).filter((element) => {
    return !element.classList.contains("hide");
  });

  visibleElements.forEach((element, index) => {
    if (index % 2 === 1) {
      element.querySelector(".project-item").classList.add("project-item-left");
    }
  });
};

filters.forEach((filter) => {
  filter.addEventListener("click", function () {
    const value = filter.value;

    cards.forEach((card) => {
      const type = card.getAttribute("data-type");

      if (value === "") {
        card.classList.remove("hide");
      } else {
        if (type === value) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      }
    });

    styleElements(cards);
  });
});
