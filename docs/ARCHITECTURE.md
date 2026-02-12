# Life Stats - Architecture & File Guide

## 📁 Estructura del Proyecto

```
life-stats/
├── docs/                          # Documentación del proyecto
│   ├── PROJECT_SPEC.md            # Especificación original del proyecto
│   ├── ARCHITECTURE.md            # Este archivo - guía de arquitectura
│   └── CHANGELOG.md               # Log de cambios
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Layout global (metadata SEO, fuentes, footer)
│   │   ├── page.tsx               # Landing page (hero + date input)
│   │   ├── globals.css            # Estilos globales (gradientes, animaciones, grid)
│   │   └── stats/
│   │       └── page.tsx           # Página de resultados (recibe ?birth=YYYY-MM-DD)
│   │
│   ├── components/                # Componentes React reutilizables
│   │   ├── DateInput.tsx          # Input de fecha con validación
│   │   ├── StatCard.tsx           # Card individual de estadística con animación
│   │   ├── StatsDisplay.tsx       # Orquestador de todas las secciones de stats
│   │   ├── LifeGrid.tsx           # Cuadrícula visual de semanas de vida
│   │   ├── LiveCounter.tsx        # Contador en tiempo real de segundos vividos
│   │   ├── FunFacts.tsx           # Datos curiosos aleatorios
│   │   ├── ShareButton.tsx        # Botón de compartir con html2canvas
│   │   └── ShareableCard.tsx      # Tarjeta oculta optimizada para captura
│   │
│   └── lib/                       # Lógica de negocio
│       └── calculations.ts        # TODAS las fórmulas y cálculos
│
├── public/                        # Archivos estáticos
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🔄 Flujo de la Aplicación

```
Landing (/)
  │
  ├── Usuario ingresa fecha de nacimiento
  ├── DateInput.tsx valida la fecha
  └── Navega a /stats?birth=YYYY-MM-DD
        │
        ├── stats/page.tsx lee query parameter
        ├── Llama a calculateLifeStats() del lib
        ├── Pasa los resultados a StatsDisplay
        └── StatsDisplay distribuye datos a:
              ├── LiveCounter (segundos en tiempo real)
              ├── StatCard × N (cards con conteo animado)
              ├── LifeGrid (cuadrícula de semanas)
              ├── FunFacts (datos curiosos)
              └── ShareButton → ShareableCard (imagen)
```

## 🧩 Componentes

### DateInput

- **Ubicación**: `src/components/DateInput.tsx`
- **Tipo**: Client component
- **Responsabilidad**: Capturar y validar fecha de nacimiento
- **Navegación**: Redirige a `/stats?birth=YYYY-MM-DD`

### StatCard

- **Ubicación**: `src/components/StatCard.tsx`
- **Tipo**: Client component
- **Responsabilidad**: Mostrar una estadística con animación de conteo
- **Props**: value, label, icon, description, format, suffix, delay, accentColor
- **Features**: IntersectionObserver para animación on-scroll, easing cubic

### StatsDisplay

- **Ubicación**: `src/components/StatsDisplay.tsx`
- **Tipo**: Client component
- **Responsabilidad**: Orquestar y organizar todas las secciones de stats
- **Secciones**: Header, LiveCounter, Body Stats, Journey, LifeGrid, Time Perspective, FunFacts, Share

### LifeGrid

- **Ubicación**: `src/components/LifeGrid.tsx`
- **Tipo**: Client component
- **Responsabilidad**: Renderizar cuadrícula 52×80 de semanas de vida
- **Features**: Animación progresiva de llenado, barra de progreso, hover en cada celda

### LiveCounter

- **Ubicación**: `src/components/LiveCounter.tsx`
- **Tipo**: Client component
- **Responsabilidad**: Mostrar edad en segundos actualizándose cada segundo

### FunFacts

- **Ubicación**: `src/components/FunFacts.tsx`
- **Tipo**: Client component
- **Responsabilidad**: Mostrar datos curiosos con animación stagger

### ShareButton

- **Ubicación**: `src/components/ShareButton.tsx`
- **Tipo**: Client component
- **Responsabilidad**: Generar imagen con html2canvas, descargar o compartir
- **Features**: Web Share API, fallback a descarga, copy link

### ShareableCard

- **Ubicación**: `src/components/ShareableCard.tsx`
- **Tipo**: Client component
- **Responsabilidad**: Tarjeta oculta con estilos inline optimizados para html2canvas

## 📐 Lib: calculations.ts

### Constantes

| Constante                | Valor       | Fuente              |
| ------------------------ | ----------- | ------------------- |
| HEARTBEATS_PER_DAY       | 100,000     | Promedio médico     |
| BREATHS_PER_DAY          | 20,000      | Promedio médico     |
| BLINKS_PER_DAY           | 28,800      | ~1,200/hora × 16h   |
| EARTH_TRAVEL_KM_PER_YEAR | 940,000,000 | NASA                |
| LIFE_EXPECTANCY_YEARS    | 80          | OMS promedio global |

### Funciones exportadas

- `calculateLifeStats(birthDateString: string): LifeStats` — Función principal
- `formatNumber(num: number): string` — Formato con separadores
- `formatCompact(num: number): string` — Formato compacto (1.5M, 2.3B)

## 🎨 Sistema de Diseño (globals.css)

### Colores

- Primary: `#8b5cf6` (Purple)
- Secondary: `#ec4899` (Pink)
- Accent: `#06b6d4` (Cyan)
- Background: `#0a0a1a` (Dark)

### Clases CSS reutilizables

- `.gradient-text` — Texto con gradiente purple→pink→cyan
- `.gradient-bg` — Background con gradiente purple→pink
- `.glass-card` — Efecto glass morphism
- `.glow` — Efecto de brillo alrededor
- `.animate-fade-in-up` — Animación de entrada
- `.animate-pulse-glow` — Brillo pulsante
- `.animate-float` — Flotación suave
- `.stagger-1` a `.stagger-8` — Delays de animación

## 🚀 Deploy

```bash
# Desarrollo
yarn dev

# Build de producción
yarn build

# Iniciar en producción
yarn start

# Deploy en Vercel
# Conectar repo de GitHub y Vercel hace el deploy automáticamente
```

## 💰 Monetización (futura)

Los espacios para ads están marcados con comentarios `{/* AD SPACE */}` en:

- `StatsDisplay.tsx` — 3 posiciones: top banner, mid content, bottom banner
- `globals.css` — Clase `.ad-space` lista para descomentar

## 📈 Ideas para Extensión

1. **Eventos históricos**: API de Wikipedia para eventos durante tu vida
2. **Celebridades**: Personas famosas nacidas el mismo día
3. **Zodíaco**: Signo zodiacal y características
4. **Comparación por país**: Ajustar expectativa de vida por país
5. **Modo oscuro/claro**: Toggle de tema
6. **i18n**: Soporte multi-idioma
7. **PWA**: Convertir en Progressive Web App
8. **Analytics**: Google Analytics o Plausible para tracking
