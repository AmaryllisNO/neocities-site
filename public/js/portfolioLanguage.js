(function () {
  var translations = {
    en: {
      crumb_home: 'Home',
      crumb_misc: 'Misc',
      crumb_portfolio: 'Portfolio',
      page_title: 'Portfolio',
      intro_p1:
        'This page is the foundation for a combined creative and technical portfolio. It is structured to showcase visual craft, product thinking and engineering execution in one place.',
      intro_p2:
        'Core focus areas: <strong>Graphic Design</strong>, <strong>Web Design</strong> and <strong>Software Development</strong>.',
      quick_nav_title: 'Quick Navigation',
      quick_nav_featured: 'Featured Work',
      quick_nav_graphic: 'Graphic Design',
      quick_nav_web: 'Web Design',
      quick_nav_software: 'Software Development',
      quick_nav_process: 'Process',
      quick_nav_skills: 'Skills &amp; Tools',
      quick_nav_timeline: 'Timeline',
      quick_nav_contact: 'Contact',
      featured_title: 'Featured Work',
      featured_intro:
        'Add your strongest case studies here. Keep each entry outcome-focused with links to visuals, repositories or live builds.',
      project_1_title: 'Project 01 - Cross-Disciplinary Product Concept',
      project_1_role:
        '<strong>Role:</strong> Visual Design, Frontend Implementation, Product Direction',
      project_1_desc:
        'Replace this with a concise summary of problem, approach, and measurable result.',
      project_1_link_1: 'Live Demo',
      project_1_link_2: 'Case Study',
      project_1_link_3: 'Source Code',
      project_2_title: 'Project 02 - Brand + Website System',
      project_2_role:
        '<strong>Role:</strong> Graphic Identity, Web Design System, Developer Handoff',
      project_2_desc:
        'Replace this with project constraints, visual language choices, and implementation details.',
      project_2_link_1: 'Visual Breakdown',
      project_2_link_2: 'Prototype',
      project_2_link_3: 'Read More',
      graphic_title: 'Graphic Design',
      graphic_intro:
        'Highlight album art, posters, key visuals, logo systems, and styleframes. Include intent, constraints and design rationale.',
      graphic_item_1: 'Brand identities and logomarks',
      graphic_item_2: 'Campaign and event visuals',
      graphic_item_3: 'Illustrative key art',
      graphic_item_4: 'Social media and marketing design systems',
      web_title: 'Web Design',
      web_intro:
        'Use this section for UX flows, component libraries, responsive layouts and accessibility decisions.',
      web_item_1: 'Information architecture and content structure',
      web_item_2: 'Wireframes, prototypes and UI systems',
      web_item_3: 'Responsive design for desktop and mobile',
      web_item_4: 'Design-to-code implementation notes',
      software_title: 'Software Development',
      software_intro:
        'Present engineering work that supports product goals. Emphasize architecture, maintainability and outcomes.',
      software_item_1: 'Frontend applications and reusable components',
      software_item_2: 'API integrations and data handling',
      software_item_3: 'Performance and accessibility improvements',
      software_item_4: 'Tooling, testing and deployment workflows',
      process_title: 'Process',
      process_item_1: 'Discover: requirements, audience and constraints.',
      process_item_2:
        'Design: concepting, iteration, visual direction and interaction planning.',
      process_item_3:
        'Build: implementation, review, testing and optimization.',
      process_item_4:
        'Deliver: launch support, documentation and post-release updates.',
      skills_title: 'Skills &amp; Tools',
      skills_design_th: 'Design',
      skills_design_td:
        'Figma, Adobe Photoshop, Adobe Illustrator, typography, color systems',
      skills_frontend_th: 'Frontend',
      skills_frontend_td:
        'HTML, CSS/SCSS, JavaScript, responsive UI, accessibility',
      skills_dev_th: 'Development',
      skills_dev_td: 'Component-based architecture, APIs, Git workflows',
      skills_collab_th: 'Collaboration',
      skills_collab_td: 'Client communication, briefs, handoff documentation',
      timeline_title: 'Selected Timeline',
      timeline_item_1:
        '<strong>2026:</strong> Add current major projects and collaborations.',
      timeline_item_2:
        '<strong>2025:</strong> Add shipped websites and product releases.',
      timeline_item_3:
        '<strong>2024:</strong> Add foundational creative/technical milestones.',
      contact_title: 'Contact',
      contact_p1:
        'Open to freelance and collaborative projects in visual design, web interfaces and software.',
      contact_p2:
        'Reach out via <a href="mailto:amaryllisno@gmail.com">amaryllisno@gmail.com</a> or socials below.',
    },
    no: {
      crumb_home: 'Hjem',
      crumb_misc: 'Diverse',
      crumb_portfolio: 'Portefolje',
      page_title: 'Portefolje',
      intro_p1:
        'Denne siden er et grunnlag for en kombinert kreativ og teknisk portefolje. Den er strukturert for a vise visuell kvalitet, produkttenkning og teknisk gjennomforing pa ett sted.',
      intro_p2:
        'Hovedfokus: <strong>Grafisk design</strong>, <strong>Webdesign</strong> og <strong>Programvareutvikling</strong>.',
      quick_nav_title: 'Hurtignavigasjon',
      quick_nav_featured: 'Utvalgte prosjekter',
      quick_nav_graphic: 'Grafisk design',
      quick_nav_web: 'Webdesign',
      quick_nav_software: 'Programvareutvikling',
      quick_nav_process: 'Prosess',
      quick_nav_skills: 'Ferdigheter og verktoy',
      quick_nav_timeline: 'Tidslinje',
      quick_nav_contact: 'Kontakt',
      featured_title: 'Utvalgte prosjekter',
      featured_intro:
        'Legg inn de sterkeste casene dine her. Hold hvert prosjekt resultatorientert med lenker til visuelle leveranser, repositories eller live versjoner.',
      project_1_title: 'Prosjekt 01 - Tverrfaglig produktkonsept',
      project_1_role:
        '<strong>Rolle:</strong> Visuell design, frontend-implementering, produktretning',
      project_1_desc:
        'Erstatt dette med en kort oppsummering av problem, tilnaerming og malbart resultat.',
      project_1_link_1: 'Live demo',
      project_1_link_2: 'Case study',
      project_1_link_3: 'Kildekode',
      project_2_title: 'Prosjekt 02 - Brand- og nettsidesystem',
      project_2_role:
        '<strong>Rolle:</strong> Visuell identitet, webdesignsystem, utviklerhandoff',
      project_2_desc:
        'Erstatt dette med prosjektets rammer, visuelle valg og detaljer fra implementeringen.',
      project_2_link_1: 'Visuell gjennomgang',
      project_2_link_2: 'Prototype',
      project_2_link_3: 'Les mer',
      graphic_title: 'Grafisk design',
      graphic_intro:
        'Vis albumcover, plakater, key visuals, logosystemer og styleframes. Inkluder hensikt, rammer og begrunnelse for designvalgene.',
      graphic_item_1: 'Visuelle identiteter og logomerker',
      graphic_item_2: 'Kampanje- og eventvisuals',
      graphic_item_3: 'Illustrativ key art',
      graphic_item_4: 'Designsystemer for sosiale medier og markedsforing',
      web_title: 'Webdesign',
      web_intro:
        'Bruk denne seksjonen for UX-flyt, komponentbiblioteker, responsive layouts og tilgjengelighetsvalg.',
      web_item_1: 'Informasjonsarkitektur og innholdsstruktur',
      web_item_2: 'Wireframes, prototyper og UI-systemer',
      web_item_3: 'Responsivt design for desktop og mobil',
      web_item_4: 'Notater fra design-til-kode implementering',
      software_title: 'Programvareutvikling',
      software_intro:
        'Presenter teknisk arbeid som stotter produktmal. Legg vekt pa arkitektur, vedlikeholdbarhet og resultater.',
      software_item_1: 'Frontend-applikasjoner og gjenbrukbare komponenter',
      software_item_2: 'API-integrasjoner og datahandtering',
      software_item_3: 'Ytelses- og tilgjengelighetsforbedringer',
      software_item_4: 'Tooling, testing og deploy-flyt',
      process_title: 'Prosess',
      process_item_1: 'Oppdage: krav, malgruppe og rammer.',
      process_item_2:
        'Designe: konsept, iterasjon, visuell retning og interaksjonsplan.',
      process_item_3:
        'Bygge: implementering, gjennomgang, testing og optimalisering.',
      process_item_4: 'Levere: lanseringsstotte, dokumentasjon og oppfolging.',
      skills_title: 'Ferdigheter og verktoy',
      skills_design_th: 'Design',
      skills_design_td:
        'Figma, Adobe Photoshop, Adobe Illustrator, typografi, fargesystemer',
      skills_frontend_th: 'Frontend',
      skills_frontend_td:
        'HTML, CSS/SCSS, JavaScript, responsive grensesnitt, tilgjengelighet',
      skills_dev_th: 'Utvikling',
      skills_dev_td: 'Komponentbasert arkitektur, API-er, Git-flyt',
      skills_collab_th: 'Samarbeid',
      skills_collab_td: 'Kundekommunikasjon, brief, handoff-dokumentasjon',
      timeline_title: 'Utvalgt tidslinje',
      timeline_item_1:
        '<strong>2026:</strong> Legg til aktuelle hovedprosjekter og samarbeid.',
      timeline_item_2:
        '<strong>2025:</strong> Legg til lanserte nettsider og produktleveranser.',
      timeline_item_3:
        '<strong>2024:</strong> Legg til grunnleggende kreative og tekniske milepaeler.',
      contact_title: 'Kontakt',
      contact_p1:
        'Apent for freelance og samarbeid innen visuell design, webgrensesnitt og programvare.',
      contact_p2:
        'Ta kontakt via <a href="mailto:amaryllisno@gmail.com">amaryllisno@gmail.com</a> eller sosiale medier under.',
    },
  };

  var languageButtons = document.querySelectorAll(
    '#language-switcher button[data-lang]',
  );
  var translatableElements = document.querySelectorAll('[data-i18n]');
  var storageKey = 'portfolio-lang';

  function applyLanguage(language) {
    var selectedLanguage = translations[language] ? language : 'en';
    var strings = translations[selectedLanguage];

    translatableElements.forEach(function (element) {
      var key = element.getAttribute('data-i18n');
      if (!key || typeof strings[key] === 'undefined') {
        return;
      }
      element.innerHTML = strings[key];
    });

    document.documentElement.lang = selectedLanguage === 'no' ? 'no' : 'en';
    languageButtons.forEach(function (button) {
      var isActive = button.getAttribute('data-lang') === selectedLanguage;
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  languageButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var selectedLanguage = button.getAttribute('data-lang') || 'en';
      applyLanguage(selectedLanguage);
      try {
        localStorage.setItem(storageKey, selectedLanguage);
      } catch (error) {
        // Ignore storage issues (for private mode or blocked storage).
      }
    });
  });

  var initialLanguage = 'no';
  try {
    initialLanguage = localStorage.getItem(storageKey) || 'no';
  } catch (error) {
    initialLanguage = 'en';
  }
  applyLanguage(initialLanguage);
})();
