# TCIT Challenge — Posts

Aplicación de posts con **React**, **Redux Toolkit** y backend **Node.js** (Express) + **PostgreSQL**. CRUD vía API JSON; el filtrado por nombre es solo en cliente.

## Stack

| Parte | Tecnología |
|-------|------------|
| Frontend | React 19, Vite 8, TypeScript, Redux Toolkit, Tailwind CSS 4 |
| Backend | Express, TypeScript, `pg` |
| Datos | PostgreSQL (tabla creada al arrancar el servidor) |

## Requisitos

- **Node.js** 18 o superior (también puedes usar [Bun](https://bun.sh) como en los ejemplos)
- **PostgreSQL** en ejecución

## Puesta en marcha

### 1. Base de datos

Crea la base (el nombre debe coincidir con `DB_NAME`):

```bash
createdb tcit_challenge
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edita .env con usuario, contraseña y nombre de BD correctos
npm install   # o: bun install
npm run dev   # o: bun dev
```

Servidor: `http://localhost:3001` (configurable con `PORT` en `.env`).

Al iniciar se ejecuta `initDatabase()` y se crea la tabla `posts` si no existe.

### 3. Frontend

En otra terminal:

```bash
cd frontend
npm install   # o: bun install
npm run dev   # o: bun dev
```

App: `http://localhost:3000` (Vite; el proxy no está configurado: el cliente llama a `http://localhost:3001`).

## Variables de entorno (backend)

Copia `backend/.env.example` a `backend/.env`. Ejemplo:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=tcit_challenge
DB_PASSWORD=tu_password
DB_PORT=5432
PORT=3001
```

## API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/posts` | Lista todos los posts |
| `POST` | `/api/posts` | Crea un post (body JSON: `name`, `description`) |
| `DELETE` | `/api/posts/:id` | Elimina un post |

Respuestas en **camelCase** en JSON; en base de datos las columnas usan **snake_case** (`created_at` → `createdAt` en la API).

## Comportamiento del cliente (challenge)

- La lista completa se obtiene con **un solo** `GET /api/posts` al cargar la vista principal.
- Crear y eliminar usan POST/DELETE; el estado de Redux se actualiza con la respuesta, sin volver a pedir la lista completa solo por esas acciones.

## Estructura del repo

```
backend/
  src/
    index.ts                 # Express + arranque
    config/database.ts       # Pool pg + init tabla posts
    controllers/postController.ts
    routes/postRoutes.ts
    models/post.ts           # Tipos y mapeo fila → JSON

frontend/
  src/
    main.tsx
    App.tsx
    store/
      index.ts               # Store Redux
      hooks.ts
      postsSlice.ts          # Thunks y estado de posts
    components/
      PostForm.tsx
      PostFilter.tsx
      PostList.tsx
    types/types.ts
```

## Scripts útiles

| Directorio | Comando | Acción |
|------------|---------|--------|
| `backend` | `npm run build` | Compila TypeScript a `dist/` |
| `backend` | `npm start` | Ejecuta `node dist/index.js` (tras build) |
| `frontend` | `npm run build` | Build de producción |
| `frontend` | `npm run preview` | Sirve el build localmente |
