# TCIT Challenge - Posts App

Aplicacion de Posts con React + Redux y backend en Node.js + PostgreSQL.

## Requisitos

- Node.js 18+
- PostgreSQL

## Setup

### 1. Base de datos

```bash
createdb tcit_challenge
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

El servidor corre en `http://localhost:3001`.

Variables de entorno opcionales (por defecto conecta a postgres local):

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=tcit_challenge
DB_PASSWORD=postgres
DB_PORT=5432
```

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

La app corre en `http://localhost:3000`.

## API Endpoints

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | /api/posts | Obtener todos los posts |
| POST | /api/posts | Crear un post |
| DELETE | /api/posts/:id | Eliminar un post |

## Estructura

```
backend/
  src/
    index.js          # Entry point + Express server
    db.js             # PostgreSQL connection + init
    routes/posts.js   # CRUD endpoints

frontend/
  src/
    store/
      index.js        # Redux store
      postsSlice.js   # Posts slice (actions, reducers, thunks)
    components/
      PostFilter.js   # Filtro por nombre
      PostList.js     # Tabla de posts
      PostForm.js     # Formulario de creacion
    App.js            # Componente principal
    App.css           # Estilos
    index.js          # Entry point
```
