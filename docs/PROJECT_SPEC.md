# Life Stats - Tu vida en números sorprendentes

## OBJETIVO

Sitio web simple y rápido donde el usuario ingresa su fecha de nacimiento y ve estadísticas sorprendentes sobre su vida que den ganas de compartir en redes sociales.

## STACK TÉCNICO

- Next.js 14+ con App Router
- TypeScript
- Tailwind CSS
- Recharts para gráficas
- html2canvas para generar imágenes compartibles
- Vercel para deploy

## ESTRUCTURA DEL PROYECTO

```
life-stats/
├── app/
│   ├── page.tsx (landing + input fecha)
│   ├── stats/page.tsx (página de resultados)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── DateInput.tsx
│   ├── StatsDisplay.tsx
│   ├── LifeGrid.tsx (cuadrícula de semanas)
│   ├── ShareButton.tsx
│   └── StatCard.tsx
├── lib/
│   └── calculations.ts (todas las fórmulas)
└── public/
```

## FUNCIONALIDADES PRINCIPALES

### 1. INPUT DE FECHA

- Landing page simple con título llamativo
- Input de fecha de nacimiento (date picker)
- Botón grande "Show My Life Stats"
- Diseño atractivo y moderno

### 2. CÁLCULOS A MOSTRAR (en lib/calculations.ts)

- Edad exacta en: años, meses, días, horas, minutos, segundos
- Latidos del corazón (promedio 100,000 latidos/día)
- Respiraciones (promedio 20,000/día)
- Parpadeos (promedio 28,800/día)
- Distancia viajada en el espacio (la Tierra viaja 940 millones km/año)
- Días vividos vs días promedio restantes (expectativa 80 años)
- Porcentaje de vida vivida

### 3. VISUALIZACIONES

- Cards con números grandes y animaciones
- Gráfica de "Tu vida en semanas": cuadrícula 52 columnas x 90 filas
  - Semanas vividas: color primario
  - Semanas restantes (asumiendo 80 años): color gris claro
- Barra de progreso de vida
- Comparaciones interesantes ("Eso es más que X")

### 4. FEATURE DE COMPARTIR

- Botón "Share My Stats"
- Genera imagen bonita con html2canvas con:
  - Tu edad en segundos
  - La visualización de semanas
  - Logo del sitio
  - Marca de agua sutil con URL
- Permite descargar o compartir directo

### 5. DISEÑO

- Colores: Gradientes modernos (tipo purple-blue o orange-pink)
- Fuente: Inter o similar moderna
- Animaciones sutiles al cargar cada stat (fade in, count up)
- Mobile-first, totalmente responsive
- Dark mode opcional

### 6. SEO BÁSICO

- Metadata correcta
- Title: "Life Stats - Your Life in Numbers | See Your Life Statistics"
- Description: "Discover surprising statistics about your life. See your age in seconds, heartbeats, and more. Share your life stats!"
- OG image para compartir en redes

## FEATURES EXTRA (si hay tiempo)

- Eventos históricos durante tu vida (opcional)
- Comparación con celebridades de tu edad
- "Fun facts" aleatorios basados en tu edad

## NOTAS IMPORTANTES

- Priorizar velocidad de desarrollo
- Código limpio y comentado
- Componentes reutilizables
- Fácil de extender después
- Sin base de datos necesaria (todo client-side)

## MONETIZACIÓN (para después)

- Espacio para Google AdSense (sidebar en desktop, entre stats en mobile)
- Comentar en código dónde irían los ads

## PASOS PARA EMPEZAR

1. Crear proyecto Next.js con TypeScript y Tailwind
2. Setup básico de layout y estilos globales
3. Crear componente de input de fecha
4. Implementar todas las funciones de cálculo
5. Crear componentes de visualización
6. Implementar feature de compartir
7. Pulir diseño y animaciones
8. Preparar para deploy en Vercel

## COMANDOS DE DESARROLLO

```bash
npx create-next-app@latest life-stats --typescript --tailwind --app
cd life-stats
yarn add recharts html2canvas
yarn dev
```

## DEPLOY

```bash
yarn build
# Deploy en Vercel: conectar repo de GitHub
```

**PRIORIDAD:** Hacer que funcione rápido > perfección. Podemos iterar después.
