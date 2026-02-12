/**
 * i18n.ts - Sistema de internacionalización para Life Stats
 *
 * Soporta 5 idiomas: English, Español, Português, हिन्दी (Hindi), Français
 * Todas las traducciones están centralizadas aquí para facilitar mantenimiento.
 */

export type Locale = "en" | "es" | "pt" | "hi" | "fr";

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export const DEFAULT_LOCALE: Locale = "en";

// ============================================================
// ESTRUCTURA DE TRADUCCIONES
// ============================================================

export interface Translations {
  // SEO / Metadata (usado en layout)
  meta: {
    title: string;
    description: string;
  };

  // Landing Page
  landing: {
    heroEmoji: string;
    title: string;
    subtitle: string;
    subtitleHighlight: string;
    description: string;
    teaserHeartbeats: string;
    teaserBreaths: string;
    teaserSpace: string;
    teaserWeeks: string;
    features: string[];
  };

  // Date Input
  dateInput: {
    label: string;
    placeholder: string;
    submit: string;
    loading: string;
    privacy: string;
    errorEmpty: string;
    errorFuture: string;
    errorInvalid: string;
  };

  // Stats Page
  stats: {
    title: string;
    bornOn: string;
    youAre: string;
    yearsMonthsDays: (y: number, m: number, d: number) => string;
    old: string;
    noDateTitle: string;
    noDateDescription: string;
    goBack: string;
    loadingMessage: string;
  };

  // Live Counter
  liveCounter: {
    prefix: string;
    suffix: string;
    live: string;
  };

  // Body Stats Section
  bodyStats: {
    sectionTitle: string;
    heartbeats: string;
    heartbeatsDesc: string;
    breaths: string;
    breathsDesc: string;
    blinks: string;
    blinksDesc: string;
    sleepYears: string;
    sleepYearsDesc: (hours: string) => string;
    meals: string;
    mealsDesc: string;
    water: string;
    waterDesc: string;
  };

  // Journey Section
  journey: {
    sectionTitle: string;
    spaceKm: string;
    spaceKmDesc: string;
    walked: string;
    walkedDesc: (steps: string) => string;
    sunrises: string;
    sunrisesDesc: string;
    fullMoons: string;
    fullMoonsDesc: string;
    laughs: string;
    laughsDesc: string;
    dreams: string;
    dreamsDesc: string;
  };

  // Life Grid
  lifeGrid: {
    title: string;
    description: (lived: string, total: string) => string;
    born: string;
    eightyYears: string;
    weeksLived: string;
    weeksRemaining: string;
    youAreHere: string;
    decade: string;
    yearLabel: (n: number) => string;
    weeksPerYear: string;
  };

  // Time Perspective
  timePerspective: {
    title: string;
    daysLived: string;
    daysRemaining: string;
    lifeCompleted: string;
    lifeAhead: string;
    disclaimer: string;
  };

  // Fun Facts
  funFacts: {
    title: string;
    moonTrips: (n: string) => string;
    sunTrips: (n: string) => string;
    heartBillion: (n: string) => string;
    heartMillion: (n: string) => string;
    books: (n: string) => string;
    pizza: (n: string) => string;
    hair: (n: string) => string;
    nails: (n: string) => string;
    words: (n: string) => string;
  };

  // Share
  share: {
    shareButton: string;
    generating: string;
    downloadImage: string;
    shareToSocial: string;
    copyLink: string;
    cancel: string;
    linkCopied: string;
    shareTitle: string;
    shareText: string;
    tryAnother: string;
  };

  // Shareable Card
  shareableCard: {
    title: string;
    born: string;
    heartbeats: string;
    breaths: string;
    spaceKm: string;
    daysLived: string;
    sleepYears: string;
    fullMoons: string;
    lifeProgress: string;
    ageText: (y: number, m: number, d: number) => string;
    watermark: string;
  };

  // Footer
  footer: {
    tagline: string;
    shareWithFriends: string;
    madeWith: string;
  };
}

// ============================================================
// ENGLISH
// ============================================================

const en: Translations = {
  meta: {
    title: "Life Stats - Your Life in Numbers | See Your Life Statistics",
    description:
      "Discover surprising statistics about your life. See your age in seconds, heartbeats, and more. Share your life stats!",
  },
  landing: {
    heroEmoji: "🧬",
    title: "Life Stats",
    subtitle: "Your life in",
    subtitleHighlight: "surprising numbers",
    description:
      "How many times has your heart beaten? How far have you traveled through space? Enter your birth date and discover the incredible statistics of your existence.",
    teaserHeartbeats: "Heartbeats",
    teaserBreaths: "Breaths",
    teaserSpace: "KM in Space",
    teaserWeeks: "Weeks Lived",
    features: [
      "📊 Detailed Statistics",
      "🗓️ Life in Weeks Grid",
      "📤 Shareable Image",
      "🔒 100% Private",
      "⚡ Instant Results",
      "📱 Mobile Friendly",
    ],
  },
  dateInput: {
    label: "📅 Enter your birth date",
    placeholder: "Select date",
    submit: "✨ Show My Life Stats",
    loading: "Calculating your life...",
    privacy: "🔒 Your data stays in your browser. We don't store anything.",
    errorEmpty: "Please select your birth date",
    errorFuture: "Birth date cannot be in the future!",
    errorInvalid: "Please enter a valid birth date",
  },
  stats: {
    title: "Your Life in Numbers",
    bornOn: "Born on",
    youAre: "— You are",
    yearsMonthsDays: (y, m, d) => `${y} years, ${m} months, and ${d} days`,
    old: "old.",
    noDateTitle: "No birth date provided",
    noDateDescription:
      "We need your birth date to calculate your life stats. Go back and enter your date of birth.",
    goBack: "← Go Back",
    loadingMessage: "Calculating your life stats...",
  },
  liveCounter: {
    prefix: "⏱️ You've been alive for",
    suffix: "seconds and counting...",
    live: "Live",
  },
  bodyStats: {
    sectionTitle: "📊 Your Body Stats",
    heartbeats: "Heartbeats",
    heartbeatsDesc: "Your heart never stops working for you",
    breaths: "Breaths Taken",
    breathsDesc: "Every breath is a gift",
    blinks: "Eye Blinks",
    blinksDesc: "~28,800 blinks per day",
    sleepYears: "Years Sleeping",
    sleepYearsDesc: (hours) => `That's ${hours} hours in bed!`,
    meals: "Meals Eaten",
    mealsDesc: "3 meals a day keeps you going",
    water: "Liters of Water",
    waterDesc: "Staying hydrated since day one",
  },
  journey: {
    sectionTitle: "🚀 Your Journey",
    spaceKm: "KM Through Space",
    spaceKmDesc: "Earth travels at ~107,000 km/h around the Sun",
    walked: "KM Walked",
    walkedDesc: (steps) => `That's ${steps} steps!`,
    sunrises: "Sunrises",
    sunrisesDesc: "Each one a new opportunity",
    fullMoons: "Full Moons",
    fullMoonsDesc: "Lunar cycle: ~29.5 days",
    laughs: "Times Laughed",
    laughsDesc: "~15 laughs per day on average",
    dreams: "Dreams Had",
    dreamsDesc: "~4-6 dreams per night",
  },
  lifeGrid: {
    title: "🗓️ Your Life in Weeks",
    description: (lived, total) => `Each square = 1 week. You've lived ${lived} of ${total} weeks.`,
    born: "Born",
    eightyYears: "80 years",
    weeksLived: "Weeks lived",
    weeksRemaining: "Weeks remaining",
    youAreHere: "You are here",
    decade: "Decade",
    yearLabel: (n) => `${n}y`,
    weeksPerYear: "Each row = 1 year (52 weeks)",
  },
  timePerspective: {
    title: "⏳ Time Perspective",
    daysLived: "Days Lived",
    daysRemaining: "Days Remaining*",
    lifeCompleted: "Life Completed",
    lifeAhead: "Life Ahead*",
    disclaimer: "* Based on average life expectancy of 80 years. Make every day count! 💪",
  },
  funFacts: {
    title: "🎲 Fun Facts About Your Life",
    moonTrips: (n) => `You've traveled ${n} times the distance to the Moon through space! 🌙`,
    sunTrips: (n) => `That's ${n} round trips to the Sun! ☀️`,
    heartBillion: (n) => `Your heart has beaten over ${n} BILLION times! ❤️`,
    heartMillion: (n) => `Your heart has beaten ${n} million times! ❤️`,
    books: (n) => `If you read 1 book per week, you could've read ${n} books! 📚`,
    pizza: (n) => `You've probably eaten around ${n} slices of pizza! 🍕`,
    hair: (n) => `Your hair has grown approximately ${n} meters total! 💇`,
    nails: (n) => `Your nails have grown about ${n} cm! 💅`,
    words: (n) => `You've spoken approximately ${n} million words! 🗣️`,
  },
  share: {
    shareButton: "📤 Share My Stats",
    generating: "Generating...",
    downloadImage: "📥 Download as Image",
    shareToSocial: "📲 Share to Social Media",
    copyLink: "🔗 Copy Link",
    cancel: "✕ Cancel",
    linkCopied: "Link copied to clipboard! 🎉",
    shareTitle: "My Life Stats",
    shareText: "Check out my life statistics! 🧬✨",
    tryAnother: "🔄 Try Another Date",
  },
  shareableCard: {
    title: "✨ Life Stats ✨",
    born: "Born",
    heartbeats: "Heartbeats",
    breaths: "Breaths",
    spaceKm: "KM in Space",
    daysLived: "Days Lived",
    sleepYears: "Years Sleeping",
    fullMoons: "Full Moons",
    lifeProgress: "Life Progress",
    ageText: (y, m, d) => `${y} years, ${m} months, ${d} days old`,
    watermark: "🌐 lifestats.app — Discover your life in numbers",
  },
  footer: {
    tagline: "Your life is more amazing than you think. ✨",
    shareWithFriends: "Share with friends",
    madeWith: "Made with ❤️",
  },
};

// ============================================================
// ESPAÑOL
// ============================================================

const es: Translations = {
  meta: {
    title: "Life Stats - Tu Vida en Números | Descubre tus Estadísticas",
    description:
      "Descubre estadísticas sorprendentes sobre tu vida. Mira tu edad en segundos, latidos del corazón y más. ¡Comparte tus stats!",
  },
  landing: {
    heroEmoji: "🧬",
    title: "Life Stats",
    subtitle: "Tu vida en",
    subtitleHighlight: "números sorprendentes",
    description:
      "¿Cuántas veces ha latido tu corazón? ¿Qué tan lejos has viajado por el espacio? Ingresa tu fecha de nacimiento y descubre las estadísticas increíbles de tu existencia.",
    teaserHeartbeats: "Latidos",
    teaserBreaths: "Respiraciones",
    teaserSpace: "KM en el Espacio",
    teaserWeeks: "Semanas Vividas",
    features: [
      "📊 Estadísticas Detalladas",
      "🗓️ Tu Vida en Semanas",
      "📤 Imagen Compartible",
      "🔒 100% Privado",
      "⚡ Resultados Instantáneos",
      "📱 Compatible con Móvil",
    ],
  },
  dateInput: {
    label: "📅 Ingresa tu fecha de nacimiento",
    placeholder: "Selecciona fecha",
    submit: "✨ Ver Mis Estadísticas",
    loading: "Calculando tu vida...",
    privacy: "🔒 Tus datos se quedan en tu navegador. No almacenamos nada.",
    errorEmpty: "Por favor selecciona tu fecha de nacimiento",
    errorFuture: "¡La fecha no puede ser en el futuro!",
    errorInvalid: "Por favor ingresa una fecha válida",
  },
  stats: {
    title: "Tu Vida en Números",
    bornOn: "Nacido/a el",
    youAre: "— Tienes",
    yearsMonthsDays: (y, m, d) => `${y} años, ${m} meses y ${d} días`,
    old: "de vida.",
    noDateTitle: "No se proporcionó fecha",
    noDateDescription:
      "Necesitamos tu fecha de nacimiento para calcular tus estadísticas. Regresa e ingresa tu fecha.",
    goBack: "← Volver",
    loadingMessage: "Calculando tus estadísticas...",
  },
  liveCounter: {
    prefix: "⏱️ Has estado vivo/a por",
    suffix: "segundos y contando...",
    live: "En vivo",
  },
  bodyStats: {
    sectionTitle: "📊 Estadísticas de tu Cuerpo",
    heartbeats: "Latidos del Corazón",
    heartbeatsDesc: "Tu corazón nunca deja de trabajar por ti",
    breaths: "Respiraciones",
    breathsDesc: "Cada respiración es un regalo",
    blinks: "Parpadeos",
    blinksDesc: "~28,800 parpadeos por día",
    sleepYears: "Años Durmiendo",
    sleepYearsDesc: (hours) => `¡Son ${hours} horas en cama!`,
    meals: "Comidas",
    mealsDesc: "3 comidas al día te mantienen en marcha",
    water: "Litros de Agua",
    waterDesc: "Hidratándote desde el día uno",
  },
  journey: {
    sectionTitle: "🚀 Tu Viaje",
    spaceKm: "KM por el Espacio",
    spaceKmDesc: "La Tierra viaja a ~107,000 km/h alrededor del Sol",
    walked: "KM Caminados",
    walkedDesc: (steps) => `¡Son ${steps} pasos!`,
    sunrises: "Amaneceres",
    sunrisesDesc: "Cada uno es una nueva oportunidad",
    fullMoons: "Lunas Llenas",
    fullMoonsDesc: "Ciclo lunar: ~29.5 días",
    laughs: "Veces que Reíste",
    laughsDesc: "~15 risas al día en promedio",
    dreams: "Sueños",
    dreamsDesc: "~4-6 sueños por noche",
  },
  lifeGrid: {
    title: "🗓️ Tu Vida en Semanas",
    description: (lived, total) =>
      `Cada cuadro = 1 semana. Has vivido ${lived} de ${total} semanas.`,
    born: "Nacimiento",
    eightyYears: "80 años",
    weeksLived: "Semanas vividas",
    weeksRemaining: "Semanas restantes",
    youAreHere: "Estás aquí",
    decade: "Década",
    yearLabel: (n) => `${n}a`,
    weeksPerYear: "Cada fila = 1 año (52 semanas)",
  },
  timePerspective: {
    title: "⏳ Perspectiva del Tiempo",
    daysLived: "Días Vividos",
    daysRemaining: "Días Restantes*",
    lifeCompleted: "Vida Completada",
    lifeAhead: "Vida por Delante*",
    disclaimer: "* Basado en expectativa de vida promedio de 80 años. ¡Haz que cada día cuente! 💪",
  },
  funFacts: {
    title: "🎲 Datos Curiosos de tu Vida",
    moonTrips: (n) => `¡Has viajado ${n} veces la distancia a la Luna por el espacio! 🌙`,
    sunTrips: (n) => `¡Son ${n} viajes de ida y vuelta al Sol! ☀️`,
    heartBillion: (n) => `¡Tu corazón ha latido más de ${n} MIL MILLONES de veces! ❤️`,
    heartMillion: (n) => `¡Tu corazón ha latido ${n} millones de veces! ❤️`,
    books: (n) => `Si leyeras 1 libro por semana, ¡habrías leído ${n} libros! 📚`,
    pizza: (n) => `¡Probablemente has comido alrededor de ${n} rebanadas de pizza! 🍕`,
    hair: (n) => `¡Tu cabello ha crecido aproximadamente ${n} metros en total! 💇`,
    nails: (n) => `¡Tus uñas han crecido unos ${n} cm! 💅`,
    words: (n) => `¡Has dicho aproximadamente ${n} millones de palabras! 🗣️`,
  },
  share: {
    shareButton: "📤 Compartir Mis Stats",
    generating: "Generando...",
    downloadImage: "📥 Descargar como Imagen",
    shareToSocial: "📲 Compartir en Redes",
    copyLink: "🔗 Copiar Enlace",
    cancel: "✕ Cancelar",
    linkCopied: "¡Enlace copiado! 🎉",
    shareTitle: "Mis Life Stats",
    shareText: "¡Mira mis estadísticas de vida! 🧬✨",
    tryAnother: "🔄 Probar Otra Fecha",
  },
  shareableCard: {
    title: "✨ Life Stats ✨",
    born: "Nacido/a el",
    heartbeats: "Latidos",
    breaths: "Respiraciones",
    spaceKm: "KM en el Espacio",
    daysLived: "Días Vividos",
    sleepYears: "Años Durmiendo",
    fullMoons: "Lunas Llenas",
    lifeProgress: "Progreso de Vida",
    ageText: (y, m, d) => `${y} años, ${m} meses, ${d} días`,
    watermark: "🌐 lifestats.app — Descubre tu vida en números",
  },
  footer: {
    tagline: "Tu vida es más increíble de lo que piensas. ✨",
    shareWithFriends: "Compartir con amigos",
    madeWith: "Hecho con ❤️",
  },
};

// ============================================================
// PORTUGUÊS
// ============================================================

const pt: Translations = {
  meta: {
    title: "Life Stats - Sua Vida em Números | Veja Suas Estatísticas de Vida",
    description:
      "Descubra estatísticas surpreendentes sobre sua vida. Veja sua idade em segundos, batimentos cardíacos e mais. Compartilhe suas stats!",
  },
  landing: {
    heroEmoji: "🧬",
    title: "Life Stats",
    subtitle: "Sua vida em",
    subtitleHighlight: "números surpreendentes",
    description:
      "Quantas vezes seu coração bateu? Quão longe você viajou pelo espaço? Insira sua data de nascimento e descubra as estatísticas incríveis da sua existência.",
    teaserHeartbeats: "Batimentos",
    teaserBreaths: "Respirações",
    teaserSpace: "KM no Espaço",
    teaserWeeks: "Semanas Vividas",
    features: [
      "📊 Estatísticas Detalhadas",
      "🗓️ Vida em Semanas",
      "📤 Imagem Compartilhável",
      "🔒 100% Privado",
      "⚡ Resultados Instantâneos",
      "📱 Compatível com Celular",
    ],
  },
  dateInput: {
    label: "📅 Insira sua data de nascimento",
    placeholder: "Selecione a data",
    submit: "✨ Ver Minhas Estatísticas",
    loading: "Calculando sua vida...",
    privacy: "🔒 Seus dados ficam no seu navegador. Não armazenamos nada.",
    errorEmpty: "Por favor selecione sua data de nascimento",
    errorFuture: "A data não pode ser no futuro!",
    errorInvalid: "Por favor insira uma data válida",
  },
  stats: {
    title: "Sua Vida em Números",
    bornOn: "Nascido/a em",
    youAre: "— Você tem",
    yearsMonthsDays: (y, m, d) => `${y} anos, ${m} meses e ${d} dias`,
    old: "de vida.",
    noDateTitle: "Data não fornecida",
    noDateDescription:
      "Precisamos da sua data de nascimento para calcular suas estatísticas. Volte e insira sua data.",
    goBack: "← Voltar",
    loadingMessage: "Calculando suas estatísticas...",
  },
  liveCounter: {
    prefix: "⏱️ Você está vivo/a há",
    suffix: "segundos e contando...",
    live: "Ao vivo",
  },
  bodyStats: {
    sectionTitle: "📊 Estatísticas do Corpo",
    heartbeats: "Batimentos Cardíacos",
    heartbeatsDesc: "Seu coração nunca para de trabalhar por você",
    breaths: "Respirações",
    breathsDesc: "Cada respiração é um presente",
    blinks: "Piscadas",
    blinksDesc: "~28.800 piscadas por dia",
    sleepYears: "Anos Dormindo",
    sleepYearsDesc: (hours) => `São ${hours} horas na cama!`,
    meals: "Refeições",
    mealsDesc: "3 refeições por dia te mantêm ativo",
    water: "Litros de Água",
    waterDesc: "Se hidratando desde o primeiro dia",
  },
  journey: {
    sectionTitle: "🚀 Sua Jornada",
    spaceKm: "KM pelo Espaço",
    spaceKmDesc: "A Terra viaja a ~107.000 km/h ao redor do Sol",
    walked: "KM Caminhados",
    walkedDesc: (steps) => `São ${steps} passos!`,
    sunrises: "Nascer do Sol",
    sunrisesDesc: "Cada um é uma nova oportunidade",
    fullMoons: "Luas Cheias",
    fullMoonsDesc: "Ciclo lunar: ~29,5 dias",
    laughs: "Vezes que Riu",
    laughsDesc: "~15 risadas por dia em média",
    dreams: "Sonhos",
    dreamsDesc: "~4-6 sonhos por noite",
  },
  lifeGrid: {
    title: "🗓️ Sua Vida em Semanas",
    description: (lived, total) =>
      `Cada quadrado = 1 semana. Você viveu ${lived} de ${total} semanas.`,
    born: "Nascimento",
    eightyYears: "80 anos",
    weeksLived: "Semanas vividas",
    weeksRemaining: "Semanas restantes",
    youAreHere: "Você está aqui",
    decade: "Década",
    yearLabel: (n) => `${n}a`,
    weeksPerYear: "Cada linha = 1 ano (52 semanas)",
  },
  timePerspective: {
    title: "⏳ Perspectiva do Tempo",
    daysLived: "Dias Vividos",
    daysRemaining: "Dias Restantes*",
    lifeCompleted: "Vida Completa",
    lifeAhead: "Vida pela Frente*",
    disclaimer: "* Baseado na expectativa de vida média de 80 anos. Faça cada dia valer! 💪",
  },
  funFacts: {
    title: "🎲 Curiosidades da Sua Vida",
    moonTrips: (n) => `Você viajou ${n} vezes a distância até a Lua pelo espaço! 🌙`,
    sunTrips: (n) => `São ${n} viagens de ida e volta ao Sol! ☀️`,
    heartBillion: (n) => `Seu coração bateu mais de ${n} BILHÕES de vezes! ❤️`,
    heartMillion: (n) => `Seu coração bateu ${n} milhões de vezes! ❤️`,
    books: (n) => `Se lesse 1 livro por semana, teria lido ${n} livros! 📚`,
    pizza: (n) => `Você provavelmente comeu cerca de ${n} fatias de pizza! 🍕`,
    hair: (n) => `Seu cabelo cresceu aproximadamente ${n} metros no total! 💇`,
    nails: (n) => `Suas unhas cresceram cerca de ${n} cm! 💅`,
    words: (n) => `Você falou aproximadamente ${n} milhões de palavras! 🗣️`,
  },
  share: {
    shareButton: "📤 Compartilhar",
    generating: "Gerando...",
    downloadImage: "📥 Baixar como Imagem",
    shareToSocial: "📲 Compartilhar nas Redes",
    copyLink: "🔗 Copiar Link",
    cancel: "✕ Cancelar",
    linkCopied: "Link copiado! 🎉",
    shareTitle: "Minhas Life Stats",
    shareText: "Veja minhas estatísticas de vida! 🧬✨",
    tryAnother: "🔄 Tentar Outra Data",
  },
  shareableCard: {
    title: "✨ Life Stats ✨",
    born: "Nascido/a em",
    heartbeats: "Batimentos",
    breaths: "Respirações",
    spaceKm: "KM no Espaço",
    daysLived: "Dias Vividos",
    sleepYears: "Anos Dormindo",
    fullMoons: "Luas Cheias",
    lifeProgress: "Progresso de Vida",
    ageText: (y, m, d) => `${y} anos, ${m} meses, ${d} dias`,
    watermark: "🌐 lifestats.app — Descubra sua vida em números",
  },
  footer: {
    tagline: "Sua vida é mais incrível do que você imagina. ✨",
    shareWithFriends: "Compartilhar com amigos",
    madeWith: "Feito com ❤️",
  },
};

// ============================================================
// हिन्दी (HINDI)
// ============================================================

const hi: Translations = {
  meta: {
    title: "Life Stats - आपका जीवन संख्याओं में | अपनी जीवन सांख्यिकी देखें",
    description:
      "अपने जीवन के बारे में आश्चर्यजनक आँकड़े खोजें। सेकंड में अपनी उम्र, दिल की धड़कनें और बहुत कुछ देखें।",
  },
  landing: {
    heroEmoji: "🧬",
    title: "Life Stats",
    subtitle: "आपका जीवन",
    subtitleHighlight: "आश्चर्यजनक संख्याओं में",
    description:
      "आपका दिल कितनी बार धड़का है? आपने अंतरिक्ष में कितनी दूर यात्रा की है? अपनी जन्म तिथि दर्ज करें और अपने अस्तित्व के अविश्वसनीय आँकड़े खोजें।",
    teaserHeartbeats: "धड़कनें",
    teaserBreaths: "साँसें",
    teaserSpace: "KM अंतरिक्ष में",
    teaserWeeks: "जीवित सप्ताह",
    features: [
      "📊 विस्तृत आँकड़े",
      "🗓️ सप्ताहों में जीवन",
      "📤 साझा करने योग्य",
      "🔒 100% निजी",
      "⚡ तत्काल परिणाम",
      "📱 मोबाइल फ्रेंडली",
    ],
  },
  dateInput: {
    label: "📅 अपनी जन्म तिथि दर्ज करें",
    placeholder: "तारीख चुनें",
    submit: "✨ मेरे जीवन के आँकड़े दिखाएँ",
    loading: "आपके जीवन की गणना...",
    privacy: "🔒 आपका डेटा आपके ब्राउज़र में रहता है। हम कुछ भी स्टोर नहीं करते।",
    errorEmpty: "कृपया अपनी जन्म तिथि चुनें",
    errorFuture: "जन्म तिथि भविष्य में नहीं हो सकती!",
    errorInvalid: "कृपया एक मान्य जन्म तिथि दर्ज करें",
  },
  stats: {
    title: "आपका जीवन संख्याओं में",
    bornOn: "जन्म",
    youAre: "— आपकी उम्र",
    yearsMonthsDays: (y, m, d) => `${y} साल, ${m} महीने और ${d} दिन`,
    old: "है।",
    noDateTitle: "जन्म तिथि नहीं दी गई",
    noDateDescription:
      "आपके जीवन के आँकड़ों की गणना के लिए हमें आपकी जन्म तिथि चाहिए। वापस जाएँ और अपनी जन्म तिथि दर्ज करें।",
    goBack: "← वापस जाएँ",
    loadingMessage: "आपके जीवन के आँकड़ों की गणना...",
  },
  liveCounter: {
    prefix: "⏱️ आप जीवित हैं",
    suffix: "सेकंड और गिनती जारी...",
    live: "लाइव",
  },
  bodyStats: {
    sectionTitle: "📊 आपके शरीर के आँकड़े",
    heartbeats: "दिल की धड़कनें",
    heartbeatsDesc: "आपका दिल कभी आपके लिए काम करना बंद नहीं करता",
    breaths: "साँसें ली गईं",
    breathsDesc: "हर साँस एक उपहार है",
    blinks: "आँखों की पलकें",
    blinksDesc: "~28,800 पलकें प्रति दिन",
    sleepYears: "सोने के साल",
    sleepYearsDesc: (hours) => `वो ${hours} घंटे बिस्तर में!`,
    meals: "भोजन किए",
    mealsDesc: "दिन में 3 भोजन आपको चलाते हैं",
    water: "लीटर पानी",
    waterDesc: "पहले दिन से हाइड्रेटेड",
  },
  journey: {
    sectionTitle: "🚀 आपकी यात्रा",
    spaceKm: "KM अंतरिक्ष में",
    spaceKmDesc: "पृथ्वी सूर्य के चारों ओर ~107,000 km/h से चलती है",
    walked: "KM चले",
    walkedDesc: (steps) => `वो ${steps} कदम हैं!`,
    sunrises: "सूर्योदय",
    sunrisesDesc: "हर एक नया अवसर",
    fullMoons: "पूर्णिमा",
    fullMoonsDesc: "चंद्र चक्र: ~29.5 दिन",
    laughs: "बार हँसे",
    laughsDesc: "औसतन ~15 बार प्रति दिन",
    dreams: "सपने देखे",
    dreamsDesc: "~4-6 सपने प्रति रात",
  },
  lifeGrid: {
    title: "🗓️ सप्ताहों में आपका जीवन",
    description: (lived, total) =>
      `प्रत्येक वर्ग = 1 सप्ताह। आपने ${total} में से ${lived} सप्ताह जीए हैं।`,
    born: "जन्म",
    eightyYears: "80 साल",
    weeksLived: "जीवित सप्ताह",
    weeksRemaining: "शेष सप्ताह",
    youAreHere: "आप यहाँ हैं",
    decade: "दशक",
    yearLabel: (n) => `${n}व`,
    weeksPerYear: "प्रत्येक पंक्ति = 1 वर्ष (52 सप्ताह)",
  },
  timePerspective: {
    title: "⏳ समय का दृष्टिकोण",
    daysLived: "जीए गए दिन",
    daysRemaining: "शेष दिन*",
    lifeCompleted: "जीवन पूर्ण",
    lifeAhead: "आगे का जीवन*",
    disclaimer: "* 80 वर्ष की औसत जीवन प्रत्याशा पर आधारित। हर दिन को महत्वपूर्ण बनाएँ! 💪",
  },
  funFacts: {
    title: "🎲 आपके जीवन के रोचक तथ्य",
    moonTrips: (n) => `आपने अंतरिक्ष में चंद्रमा की दूरी से ${n} गुना यात्रा की है! 🌙`,
    sunTrips: (n) => `वो सूर्य तक ${n} आने-जाने की यात्राएँ हैं! ☀️`,
    heartBillion: (n) => `आपका दिल ${n} अरब से अधिक बार धड़का है! ❤️`,
    heartMillion: (n) => `आपका दिल ${n} मिलियन बार धड़का है! ❤️`,
    books: (n) => `अगर आप सप्ताह में 1 किताब पढ़ते, तो ${n} किताबें पढ़ चुके होते! 📚`,
    pizza: (n) => `आपने शायद ${n} पिज़्ज़ा स्लाइस खाए हैं! 🍕`,
    hair: (n) => `आपके बाल कुल मिलाकर लगभग ${n} मीटर बढ़े हैं! 💇`,
    nails: (n) => `आपके नाखून लगभग ${n} सेमी बढ़े हैं! 💅`,
    words: (n) => `आपने लगभग ${n} मिलियन शब्द बोले हैं! 🗣️`,
  },
  share: {
    shareButton: "📤 शेयर करें",
    generating: "बन रहा है...",
    downloadImage: "📥 इमेज डाउनलोड करें",
    shareToSocial: "📲 सोशल मीडिया पर शेयर",
    copyLink: "🔗 लिंक कॉपी करें",
    cancel: "✕ रद्द करें",
    linkCopied: "लिंक कॉपी हो गया! 🎉",
    shareTitle: "मेरे Life Stats",
    shareText: "मेरे जीवन के आँकड़े देखें! 🧬✨",
    tryAnother: "🔄 दूसरी तारीख आज़माएँ",
  },
  shareableCard: {
    title: "✨ Life Stats ✨",
    born: "जन्म",
    heartbeats: "धड़कनें",
    breaths: "साँसें",
    spaceKm: "KM अंतरिक्ष में",
    daysLived: "जीए गए दिन",
    sleepYears: "सोने के साल",
    fullMoons: "पूर्णिमाएँ",
    lifeProgress: "जीवन प्रगति",
    ageText: (y, m, d) => `${y} साल, ${m} महीने, ${d} दिन`,
    watermark: "🌐 lifestats.app — अपना जीवन संख्याओं में खोजें",
  },
  footer: {
    tagline: "आपका जीवन आपकी सोच से कहीं अधिक अद्भुत है। ✨",
    shareWithFriends: "दोस्तों के साथ साझा करें",
    madeWith: "❤️ से बना",
  },
};

// ============================================================
// FRANÇAIS
// ============================================================

const fr: Translations = {
  meta: {
    title: "Life Stats - Votre Vie en Chiffres | Découvrez Vos Statistiques",
    description:
      "Découvrez des statistiques surprenantes sur votre vie. Voyez votre âge en secondes, battements de cœur et plus. Partagez vos stats!",
  },
  landing: {
    heroEmoji: "🧬",
    title: "Life Stats",
    subtitle: "Votre vie en",
    subtitleHighlight: "chiffres surprenants",
    description:
      "Combien de fois votre cœur a-t-il battu ? Quelle distance avez-vous parcourue dans l'espace ? Entrez votre date de naissance et découvrez les statistiques incroyables de votre existence.",
    teaserHeartbeats: "Battements",
    teaserBreaths: "Respirations",
    teaserSpace: "KM dans l'Espace",
    teaserWeeks: "Semaines Vécues",
    features: [
      "📊 Statistiques Détaillées",
      "🗓️ Vie en Semaines",
      "📤 Image Partageable",
      "🔒 100% Privé",
      "⚡ Résultats Instantanés",
      "📱 Compatible Mobile",
    ],
  },
  dateInput: {
    label: "📅 Entrez votre date de naissance",
    placeholder: "Sélectionnez la date",
    submit: "✨ Voir Mes Statistiques",
    loading: "Calcul de votre vie...",
    privacy: "🔒 Vos données restent dans votre navigateur. Nous ne stockons rien.",
    errorEmpty: "Veuillez sélectionner votre date de naissance",
    errorFuture: "La date ne peut pas être dans le futur !",
    errorInvalid: "Veuillez entrer une date valide",
  },
  stats: {
    title: "Votre Vie en Chiffres",
    bornOn: "Né(e) le",
    youAre: "— Vous avez",
    yearsMonthsDays: (y, m, d) => `${y} ans, ${m} mois et ${d} jours`,
    old: ".",
    noDateTitle: "Aucune date fournie",
    noDateDescription:
      "Nous avons besoin de votre date de naissance pour calculer vos statistiques. Retournez et entrez votre date.",
    goBack: "← Retour",
    loadingMessage: "Calcul de vos statistiques...",
  },
  liveCounter: {
    prefix: "⏱️ Vous êtes en vie depuis",
    suffix: "secondes et ça continue...",
    live: "En direct",
  },
  bodyStats: {
    sectionTitle: "📊 Statistiques Corporelles",
    heartbeats: "Battements de Cœur",
    heartbeatsDesc: "Votre cœur ne cesse jamais de travailler pour vous",
    breaths: "Respirations",
    breathsDesc: "Chaque respiration est un cadeau",
    blinks: "Clignements",
    blinksDesc: "~28 800 clignements par jour",
    sleepYears: "Années à Dormir",
    sleepYearsDesc: (hours) => `C'est ${hours} heures au lit !`,
    meals: "Repas Pris",
    mealsDesc: "3 repas par jour pour avancer",
    water: "Litres d'Eau",
    waterDesc: "Hydraté(e) depuis le premier jour",
  },
  journey: {
    sectionTitle: "🚀 Votre Voyage",
    spaceKm: "KM dans l'Espace",
    spaceKmDesc: "La Terre voyage à ~107 000 km/h autour du Soleil",
    walked: "KM Marchés",
    walkedDesc: (steps) => `C'est ${steps} pas !`,
    sunrises: "Levers de Soleil",
    sunrisesDesc: "Chacun est une nouvelle opportunité",
    fullMoons: "Pleines Lunes",
    fullMoonsDesc: "Cycle lunaire : ~29,5 jours",
    laughs: "Fois Ri",
    laughsDesc: "~15 rires par jour en moyenne",
    dreams: "Rêves Faits",
    dreamsDesc: "~4-6 rêves par nuit",
  },
  lifeGrid: {
    title: "🗓️ Votre Vie en Semaines",
    description: (lived, total) =>
      `Chaque carré = 1 semaine. Vous avez vécu ${lived} sur ${total} semaines.`,
    born: "Naissance",
    eightyYears: "80 ans",
    weeksLived: "Semaines vécues",
    weeksRemaining: "Semaines restantes",
    youAreHere: "Vous êtes ici",
    decade: "Décennie",
    yearLabel: (n) => `${n}a`,
    weeksPerYear: "Chaque ligne = 1 an (52 semaines)",
  },
  timePerspective: {
    title: "⏳ Perspective Temporelle",
    daysLived: "Jours Vécus",
    daysRemaining: "Jours Restants*",
    lifeCompleted: "Vie Accomplie",
    lifeAhead: "Vie Devant*",
    disclaimer:
      "* Basé sur une espérance de vie moyenne de 80 ans. Faites compter chaque jour ! 💪",
  },
  funFacts: {
    title: "🎲 Faits Amusants sur Votre Vie",
    moonTrips: (n) => `Vous avez parcouru ${n} fois la distance jusqu'à la Lune dans l'espace ! 🌙`,
    sunTrips: (n) => `C'est ${n} allers-retours vers le Soleil ! ☀️`,
    heartBillion: (n) => `Votre cœur a battu plus de ${n} MILLIARDS de fois ! ❤️`,
    heartMillion: (n) => `Votre cœur a battu ${n} millions de fois ! ❤️`,
    books: (n) => `Si vous lisiez 1 livre par semaine, vous auriez lu ${n} livres ! 📚`,
    pizza: (n) => `Vous avez probablement mangé environ ${n} parts de pizza ! 🍕`,
    hair: (n) => `Vos cheveux ont poussé d'environ ${n} mètres au total ! 💇`,
    nails: (n) => `Vos ongles ont poussé d'environ ${n} cm ! 💅`,
    words: (n) => `Vous avez prononcé environ ${n} millions de mots ! 🗣️`,
  },
  share: {
    shareButton: "📤 Partager Mes Stats",
    generating: "Génération...",
    downloadImage: "📥 Télécharger l'Image",
    shareToSocial: "📲 Partager sur les Réseaux",
    copyLink: "🔗 Copier le Lien",
    cancel: "✕ Annuler",
    linkCopied: "Lien copié ! 🎉",
    shareTitle: "Mes Life Stats",
    shareText: "Découvrez mes statistiques de vie ! 🧬✨",
    tryAnother: "🔄 Essayer une Autre Date",
  },
  shareableCard: {
    title: "✨ Life Stats ✨",
    born: "Né(e) le",
    heartbeats: "Battements",
    breaths: "Respirations",
    spaceKm: "KM dans l'Espace",
    daysLived: "Jours Vécus",
    sleepYears: "Années de Sommeil",
    fullMoons: "Pleines Lunes",
    lifeProgress: "Progression de Vie",
    ageText: (y, m, d) => `${y} ans, ${m} mois, ${d} jours`,
    watermark: "🌐 lifestats.app — Découvrez votre vie en chiffres",
  },
  footer: {
    tagline: "Votre vie est plus incroyable que vous ne le pensez. ✨",
    shareWithFriends: "Partager avec des amis",
    madeWith: "Fait avec ❤️",
  },
};

// ============================================================
// MAP DE TRADUCCIONES
// ============================================================

const translations: Record<Locale, Translations> = { en, es, pt, hi, fr };

/**
 * Obtiene las traducciones para un locale dado.
 * Si el locale no existe, regresa inglés por defecto.
 */
export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations[DEFAULT_LOCALE];
}

/**
 * Detecta el idioma preferido del navegador y lo mapea a un locale soportado.
 * Revisa navigator.languages (lista completa) y navigator.language (principal).
 * Si ninguno coincide con los idiomas soportados, retorna inglés por defecto.
 */
export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;

  const supported: Locale[] = ["es", "pt", "hi", "fr", "en"];

  // Revisar la lista completa de idiomas preferidos del navegador
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];

  for (const lang of languages) {
    const lower = lang?.toLowerCase() || "";
    for (const loc of supported) {
      if (lower.startsWith(loc)) return loc;
    }
  }

  return DEFAULT_LOCALE;
}
