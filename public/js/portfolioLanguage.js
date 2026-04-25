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
      quick_nav_featured: 'Selected Projects',
      quick_nav_graphic: 'Graphic Design',
      quick_nav_web: 'Web Design',
      quick_nav_software: 'Software Development',
      quick_nav_process: 'Process',
      quick_nav_skills: 'Skills &amp; Tools',
      quick_nav_timeline: 'Timeline',
      quick_nav_contact: 'Contact',
      featured_title: 'Selected Projects',
      featured_intro:
        'Add your strongest case studies here. Keep each entry outcome-focused with links to visuals, repositories or live builds.',
      project_1_title: 'Alfa Bergsprengning Logo',
      project_1_role: '<strong>Role:</strong> Visual Design, Logo Design',
      project_1_desc:
        'In 2024, through CC Solutions AS, I was given responsibility for creating a logo for what is now Alfa Bergsprengning AS in Os. I was given creative freedom to explore visual directions, and after several iterations and close collaboration with the client, we landed on a logo that attracts attention while signaling an innovative company.',
      project_1_desc2:
        'Today, the logo is used on the website, workwear, company vehicles, and various machines.',
      project_1_gallery_caption_1: 'Primary logo version on dark background.',
      project_1_gallery_caption_2: 'Primary logo version on light background.',
      project_1_gallery_caption_3: 'Logo on company vehicle.',
      project_1_gallery_caption_4: 'Logo on drilling rig.',
      project_1_gallery_caption_5:
        'Concept iterations showing the development process.',
      project_1_link_1: 'Live Demo',
      project_1_link_2: 'Case Study',
      project_1_link_3: 'Source Code',
      project_2_title: 'grafixmusic.co.uk - Website for Music Artist',
      project_2_role:
        '<strong>Role:</strong> Visual Identity, Web Design System, Development',
      project_2_desc:
        'In 2021, I collaborated with Grafix (Josh Jackson), a UK-based drum and bass producer and DJ, to develop a new visual identity and website design.',
      project_2_desc2:
        'The goal was to create a cohesive brand system for digital platforms and merchandise, and a website that clearly presented music releases, tour dates, and news updates.',
      project_2_visit_site: 'Visit Website',
      project_2_link_1: 'Visual Breakdown',
      project_2_link_2: 'Prototype',
      project_2_link_3: 'Read More',
      graphic_title: 'Graphic Design',
      graphic_intro: 'Album covers, posters, key visuals.',
      graphic_item_1: 'Brand identities and logomarks',
      graphic_item_2: 'Campaign and event visuals',
      graphic_item_3: 'Illustrative key art',
      graphic_item_4: 'Social media and marketing design systems',
      graphic_gallery_caption_1: 'Personal logo concept.',
      graphic_gallery_caption_2:
        'Album artwork for Rameses B with atmospheric color palette.',
      graphic_gallery_caption_3:
        'Primary logo version for Riisoen Kaffi on dark background.',
      graphic_gallery_caption_4:
        'Typography and branding composition for C. Sundtsgate 19.',
      graphic_gallery_caption_5:
        'Album cover for the Skybreak x CloudNone collaboration.',
      graphic_gallery_caption_6:
        'Logo exploration for the visual identity of null.no.',
      web_title: 'Web Design',
      web_intro:
        'Use this section for UX flows, component libraries, responsive layouts and accessibility decisions.',
      web_item_1: 'Information architecture and content structure',
      web_item_2: 'Wireframes, prototypes and UI systems',
      web_item_3: 'Responsive design for desktop and mobile',
      web_item_4: 'Design-to-code implementation notes',
      web_gallery_caption_1:
        'Style guide for the Bergen Technical Museum project.',
      web_gallery_caption_2:
        'Wireframe and prototype for the Bergen Technical Museum project.',
      web_gallery_caption_3:
        'Visual presentation of the iBluu web portal. Presented to the client and collaborators.',
      web_gallery_caption_4: 'Mobile homepage prototype. Personal project.',
      web_gallery_caption_5: 'Style guide for a personal website.',
      web_gallery_caption_6:
        'Visual presentation of the iBluu mobile app. Presented to the client and collaborators.',
      software_title: 'Software Development',
      software_intro:
        'Present engineering work that supports product goals. Emphasize architecture, maintainability and outcomes.',
      software_item_1: 'Frontend applications and reusable components',
      software_item_2: 'API integrations and data handling',
      software_item_3: 'Performance and accessibility improvements',
      software_item_4: 'Tooling, testing and deployment workflows',
      software_ibl_title: 'iBluu Mobile App',
      software_ibl_role:
        '<strong>Role:</strong> Product Design, Frontend Development, Platform Structure',
      software_ibl_desc:
        'iBluu is an IT platform for IT products and services. The mobile app is designed for end users in the Microsoft Service Provider ecosystem.',
      software_ibl_desc_2:
        'The app is built with React Native via Expo, with an architecture that supports both iOS and Android from a shared codebase. It is designed to handle complex data relationships between products, services, and support requests while maintaining an intuitive and fast user experience.',
      software_ibl_item_1:
        'Structured product and service records with fast search and filtering.',
      software_ibl_item_2:
        'End users can submit inquiries and support tickets related to products and services.',
      software_ibl_item_3:
        'Mobile-first UI patterns designed for quick operational tasks.',
      software_ibl_gallery_caption_1:
        'iBluu mobile interface overview for product and service administration.',
      software_ibl_gallery_caption_2:
        'Admin platform view for managing service requests and operational data.',
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
      skills_design_td: 'Figma, Adobe Photoshop, Adobe Illustrator',
      skills_frontend_th: 'Frontend',
      skills_frontend_td:
        'HTML, CSS/SCSS, JavaScript/TypeScript, responsive UI, React/React Native, AI engineering, accessibility',
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
      crumb_portfolio: 'Portefølje',
      page_title: 'Portefølje',
      intro_p1:
        'Denne siden er eit grunnlag for ein kombinert kreativ og teknisk portefølje. Den er strukturert for å vise visuell kvalitet, produkttenkning og teknisk gjennomforing pa ett sted.',
      intro_p2:
        'Hovedfokus: <strong>Grafisk design</strong>, <strong>Webdesign</strong> og <strong>Programvareutvikling</strong>.',
      quick_nav_title: 'Hurtignavigasjon',
      quick_nav_featured: 'Utvalgte prosjekter',
      quick_nav_graphic: 'Grafisk design',
      quick_nav_web: 'Webdesign',
      quick_nav_software: 'Programvareutvikling',
      quick_nav_process: 'Prosess',
      quick_nav_skills: 'Ferdigheter og verktøy',
      quick_nav_timeline: 'Tidslinje',
      quick_nav_contact: 'Kontakt',
      featured_title: 'Utvalgte prosjekter',
      featured_intro:
        'Legg inn de sterkeste casene dine her. Hold hvert prosjekt resultatorientert med lenker til visuelle leveranser, repositories eller live versjoner.',
      project_1_title: 'Alfa Bergsprengning Logo',
      project_1_role: '<strong>Rolle:</strong> Visuell design, logodesign',
      project_1_desc:
        'I 2024, gjennom CC Solutions AS, vart eg gjeven ansvaret for å lage ein logo for det som i dag er Alfa Bergsprengning AS i Os. Eg vart gjeven frie tøyler til å utforske visuelle retninger, og etter fleire iterasjoner og samarbeid med kunden, landa vi på ein logo som vekker oppmerksomhet, samt signaliserer ein nyskapande bedrift.',
      project_1_desc2:
        'Per i dag er logoen i bruk på nettside, arbeidsklær, firmabiler og diverse maskiner.',
      project_1_gallery_caption_1: 'Primær logo-versjon pa mørk bakgrunn.',
      project_1_gallery_caption_2: 'Primær logo-versjon pa lys bakgrunn.',
      project_1_gallery_caption_3: 'Logo på firmabil.',
      project_1_gallery_caption_4: 'Logo på borerigg.',
      project_1_gallery_caption_5:
        'Konseptiterasjoner som viser utviklingsprosessen.',

      project_2_title: 'grafixmusic.co.uk - Nettside til musikkartist',
      project_2_role:
        '<strong>Rolle:</strong> Visuell identitet, webdesignsystem, utvikling',
      project_2_desc:
        'I 2021 samarbeidet jeg med Grafix (Josh Jackson), en UK-basert drum and bass-produsent og DJ, om ny visuell identitet og nettsidedesign.',
      project_2_desc2:
        'Målet var å utvikle et helhetlig designsystem for digitale flater og merch, samt en nettside som tydelig presenterte musikkutgivelser, turnédatoer og nyhetsoppdateringer.',
      project_2_visit_site: 'Besok nettsiden',
      project_2_link_1: 'Visuell gjennomgang',
      project_2_link_2: 'Prototype',
      project_2_link_3: 'Les mer',
      graphic_title: 'Grafisk design',
      graphic_intro: 'Albumcover, plakater, key visuals.',
      graphic_item_1: 'Visuelle identiteter og logomerker',
      graphic_item_2: 'Kampanje- og eventvisuals',
      graphic_item_3: 'Illustrativ key art',
      graphic_item_4: 'Designsystemer for sosiale medier og markedsforing',
      graphic_gallery_caption_1: 'Personlig logo konsept.',
      graphic_gallery_caption_2:
        'Albumdesign for Rameses B med atmosferisk fargepalett og typografi.',
      graphic_gallery_caption_3:
        'Primar logo-versjon for Riisøen Kaffi på mørk bakgrunn.',
      graphic_gallery_caption_4:
        'Typografi- og merkevaresammensetning for C. Sundtsgate 19.',
      graphic_gallery_caption_5:
        'Albumcover for Skybreak x CloudNone-samarbeidet.',
      graphic_gallery_caption_6:
        'Logoutforskning for den visuelle identiteten til null.no.',
      web_title: 'Webdesign',
      web_intro:
        'Bruk denne seksjonen for UX-flyt, komponentbiblioteker, responsive layouts og tilgjengelighetsvalg.',
      web_item_1: 'Informasjonsarkitektur og innholdsstruktur',
      web_item_2: 'Wireframes, prototyper og UI-systemer',
      web_item_3: 'Responsivt design for desktop og mobil',
      web_item_4: 'Notater fra design-til-kode implementering',
      web_gallery_caption_1:
        'Style guide for Bergens Tekniske Museum. Prosjekt.',
      web_gallery_caption_2:
        'Wireframe og prototype for Bergens Tekniske Museum. Prosjekt.',
      web_gallery_caption_3:
        'Visuell framstilling av web portalen iBluu. Presentert til kunde og samarbeidspartnere.',
      web_gallery_caption_4:
        'Mobile prototype av hjemmeside. Personlig prosjekt.',
      web_gallery_caption_5: 'Style guide for personlig hjemmeside.',
      web_gallery_caption_6:
        'visuell fremstilling av mobil app iBluu. Presentert til kunde og samarbeidspartnere.',
      software_title: 'Programvareutvikling',
      software_intro:
        'Presenter teknisk arbeid som stotter produktmal. Legg vekt pa arkitektur, vedlikeholdbarhet og resultater.',
      software_item_1: 'Frontend-applikasjoner og gjenbrukbare komponenter',
      software_item_2: 'API-integrasjoner og datahandtering',
      software_item_3: 'Ytelses- og tilgjengelighetsforbedringer',
      software_item_4: 'Tooling, testing og deploy-flyt',
      software_ibl_title: 'iBluu mobilapp',
      software_ibl_role:
        '<strong>Rolle:</strong> Produktdesign, frontend-utvikling, plattformstruktur',
      software_ibl_desc:
        'iBluu er en IT-plattform for IT produkter og tjenester. Mobilappen er ment for sluttbrukere i Microsoft Service Providers økosystemet.',
      software_ibl_desc_2:
        'Appen er bygget med React Native gjennom Expo, og har en arkitektur som støtter både iOS og Android med delt kodebase. Den er designet for å håndtere komplekse datarelasjoner mellom produkter, tjenester og supporthenvendelser, samtidig som den opprettholder en intuitiv og rask brukeropplevelse.',
      software_ibl_item_1:
        'Strukturerte produkt- og tjenesteposter med rask søking og filtrering.',
      software_ibl_item_2:
        'Sluttbruker kan sende in henvendelser og support tickets iht. produkter og tjenester.',
      software_ibl_item_3:
        'Mobil-forst UI-monstre designet for raske operative oppgaver.',
      software_ibl_gallery_caption_1:
        'Oversikt over iBluu-mobilgrensesnitt for administrasjon av produkter og tjenester.',
      software_ibl_gallery_caption_2:
        'Adminvisning for handtering av servicehenvendelser og operative data.',
      process_title: 'Prosess',
      process_item_1: 'Oppdage: krav, malgruppe og rammer.',
      process_item_2:
        'Designe: konsept, iterasjon, visuell retning og interaksjonsplan.',
      process_item_3:
        'Bygge: implementering, gjennomgang, testing og optimalisering.',
      process_item_4: 'Levere: lanseringsstotte, dokumentasjon og oppfolging.',
      skills_title: 'Ferdigheter og verktøy',
      skills_design_th: 'Design',
      skills_design_td: 'Figma, Adobe Photoshop, Adobe Illustrator',
      skills_frontend_th: 'Frontend',
      skills_frontend_td:
        'HTML, CSS/SCSS, JavaScript/TypeScript, responsive grensesnitt, React/React Native, AI-utvikling, tilgjengelighet',
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
