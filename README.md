<div align="center">

# 🌍 Country Quiz

**¿Cuánto sabes sobre las capitales del mundo?**  
Pon a prueba tu conocimiento geográfico con 10 preguntas aleatorias, contrarreloj y modo oscuro.

<br/>

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-6.26-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)

[![Vitest](https://img.shields.io/badge/Vitest-2.0-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-8.57-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Netlify Status](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://app.netlify.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## 📋 Tabla de contenidos

- [Vista general](#-vista-general)
- [Características](#-características)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Instalación y uso](#-instalación-y-uso)
- [Pruebas unitarias](#-pruebas-unitarias)
- [Flujo de trabajo colaborativo](#-flujo-de-trabajo-colaborativo)
- [Despliegue en Netlify](#-despliegue-en-netlify)
- [API utilizada](#-api-utilizada)
- [Autor](#-autor)

---

## 🎯 Vista general

**Country Quiz** es una aplicación web interactiva basada en el reto [Country Quiz de DevChallenges](https://devchallenges.io/challenge/country-quizz). El usuario responde 10 preguntas sobre capitales del mundo con un temporizador regresivo de 15 segundos por pregunta. La aplicación guarda automáticamente el mejor puntaje histórico y soporta modo oscuro/claro nativo.

> Proyecto desarrollado como parte del **Taller de Competencias Frontend**  
> Universidad del Putumayo · 2025

---

## ✨ Características

| Característica | Descripción |
|---|---|
| 🎯 **Quiz interactivo** | 10 preguntas aleatorias de capitales del mundo con 4 opciones de respuesta |
| ⏱️ **Contrarreloj** | Temporizador regresivo de 15 segundos por pregunta; si llega a 0 cuenta como error |
| 🏆 **Racha máxima** | El mejor puntaje se persiste en `localStorage` y sobrevive recargas de página |
| 🌙 **Modo oscuro/claro** | Switch nativo con clases `dark:` de Tailwind; preferencia guardada en `localStorage` |
| 🔊 **Feedback de audio** | Tonos generados con la Web Audio API: agradable al acertar, disonante al fallar |
| 🗺️ **Datos en vivo** | Banderas y capitales obtenidas en tiempo real desde la REST Countries API |
| 📱 **Diseño responsivo** | Interfaz adaptable a móvil, tablet y escritorio |
| 🚀 **CI/CD automático** | Cada push a `main` dispara un nuevo despliegue en Netlify |

---

## 🛠️ Stack tecnológico

### Frontend
- **[React 18](https://react.dev/)** — Biblioteca de UI con Hooks
- **[TypeScript 5](https://www.typescriptlang.org/)** — Tipado estático
- **[Vite 5](https://vitejs.dev/)** — Build tool y servidor de desarrollo
- **[React Router v6](https://reactrouter.com/)** — Enrutamiento del lado del cliente
- **[Tailwind CSS v3](https://tailwindcss.com/)** — Estilos utilitarios con soporte `dark:`

### Calidad y pruebas
- **[Vitest](https://vitest.dev/)** — Test runner con soporte nativo para Vite
- **[React Testing Library](https://testing-library.com/)** — Pruebas centradas en comportamiento
- **[ESLint](https://eslint.org/)** — Linter con reglas TypeScript y React Hooks

### Infraestructura
- **[Netlify](https://netlify.com/)** — Despliegue continuo desde GitHub
- **[REST Countries API](https://restcountries.com/)** — Datos de países, capitales y banderas

---

## 📁 Estructura del proyecto

```
DevChallengue--Quiz-App/
├── public/
├── src/
│   ├── __tests__/
│   │   ├── Home.test.tsx          # Pruebas de la página de inicio
│   │   ├── Timer.test.tsx         # Pruebas del componente temporizador
│   │   ├── QuizCard.test.tsx      # Pruebas de la tarjeta de pregunta
│   │   └── useHighScore.test.ts   # Pruebas del hook de racha máxima
│   ├── components/
│   │   ├── DarkModeToggle.tsx     # Botón de alternancia de tema
│   │   ├── ProgressBar.tsx        # Barra de progreso de preguntas
│   │   ├── QuizCard.tsx           # Tarjeta con pregunta y opciones
│   │   └── Timer.tsx              # Temporizador visual
│   ├── hooks/
│   │   ├── useDarkMode.ts         # Estado y persistencia del tema
│   │   ├── useHighScore.ts        # Récord en localStorage
│   │   └── useTimer.ts            # Lógica del temporizador regresivo
│   ├── pages/
│   │   ├── Home.tsx               # Pantalla de inicio
│   │   ├── Quiz.tsx               # Pantalla de juego
│   │   └── Results.tsx            # Pantalla de resultados
│   ├── services/
│   │   └── countries.ts           # Llamadas a REST Countries API
│   ├── types/
│   │   └── index.ts               # Interfaces TypeScript globales
│   ├── utils/
│   │   └── audio.ts               # Generación de sonidos con Web Audio API
│   ├── App.tsx                    # Configuración de rutas
│   ├── main.tsx                   # Punto de entrada
│   └── index.css                  # Estilos globales con Tailwind
├── .eslintrc.cjs
├── netlify.toml
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 🚀 Instalación y uso

### Prerrequisitos

- **Node.js** v18 o superior
- **npm** v9 o superior

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/DevChallengue--Quiz-App.git
cd DevChallengue--Quiz-App

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
# → Abre http://localhost:5173
```

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Compilación optimizada para producción |
| `npm run preview` | Vista previa del build de producción |
| `npm run lint` | Análisis estático con ESLint |
| `npm run test` | Ejecución de pruebas unitarias |
| `npm run test:watch` | Pruebas en modo observación |

---

## 🧪 Pruebas unitarias

El proyecto cuenta con **4 suites de prueba** implementadas con Vitest y React Testing Library:

```bash
npm run test
```

```
✓ src/__tests__/Home.test.tsx        (4 pruebas)
✓ src/__tests__/Timer.test.tsx       (4 pruebas)
✓ src/__tests__/QuizCard.test.tsx    (4 pruebas)
✓ src/__tests__/useHighScore.test.ts (4 pruebas)

Test Files  4 passed
Tests       16 passed
```

### Cobertura de pruebas

| Suite | Qué valida |
|---|---|
| `Home.test.tsx` | Renderizado, título, botón de inicio, ausencia del panel de racha cuando es 0 |
| `Timer.test.tsx` | Tiempo mostrado, texto descriptivo, clase de urgencia en ≤ 5 segundos |
| `QuizCard.test.tsx` | Nombre del país, 4 opciones visibles, callback al hacer clic, botones deshabilitados |
| `useHighScore.test.ts` | Inicio en 0, carga desde localStorage, guardado de nuevo récord, no sobreescribe si es menor |

---

## 🤝 Flujo de trabajo colaborativo

El desarrollo se organizó en dos ramas de trabajo con Pull Requests revisados antes del merge:

```
main
├── feature/student-a   →  Setup, Tailwind, Rutas, API, Componentes base
└── feature/student-b   →  Timer, High Score, Audio, Tests, ESLint + Netlify
```

Cada PR recibió una revisión técnica con comentario aprobatorio antes de hacer merge a `main`.

---

## 🌐 Despliegue en Netlify

La aplicación está desplegada con **CI/CD automático**: cualquier push a la rama `main` dispara un nuevo build y despliegue en Netlify.

La configuración está en `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build]
  command = "npm run build"
  publish = "dist"
```

> 🔗 **Demo en vivo:** [Ver aplicación](https://TU-SUBDOMINIO.netlify.app)

---

## 🗺️ API utilizada

**[REST Countries v3.1](https://restcountries.com/)**  
API pública y gratuita que provee información de todos los países del mundo.

Endpoint utilizado:
```
GET https://restcountries.com/v3.1/all?fields=name,capital,flags,region,cca2
```

---

## 👤 Autor

**David** — Estudiante de Tecnología en Sistemas  
Universidad del Putumayo ·

[![GitHub](https://img.shields.io/badge/GitHub-Jhoan-181717?style=flat-square&logo=github)](https://github.com/JDav117)

---

<div align="center">

Desarrollado como parte del **Taller de Competencias Frontend**  
Universidad del Putumayo · 2026

</div>
