# Sistema de gestion de libros

Aplicación web full stack para gestionar un catálogo de libros y sus editoriales. Proyecto de la materia **Desarrollo de Software** (UTN FRC, 2025).

## Qué hace

- Alta, baja, modificación y consulta de libros (CRUD).
- Listado paginado y filtrado de libros.
- Gestión de editoriales asociadas a cada libro.
- Validaciones de negocio en el servidor:
  - ISBN-13 con 13 dígitos, dígito verificador correcto y valor único.
  - Año de publicación entre 1900 y el año actual.
  - Puntuación y copias vendidas válidas.

## Tecnologías

| Capa | Tecnologías |
| --- | --- |
| Backend | Node.js, Express, Sequelize (ORM) |
| Base de datos | SQLite |
| Frontend | React 19, Vite, react-router-dom, react-hook-form, axios |

## Arquitectura

El backend está organizado en capas, cada una con una responsabilidad:

```
api/
├── routes/         # Endpoints HTTP
├── services/       # Lógica y validaciones de negocio
├── repositories/   # Acceso a datos (incluye un repositorio base reutilizable)
├── models/         # Modelos de Sequelize (Libro, Editorial)
├── middlewares/    # Logger de requests
└── data/           # Base de datos SQLite
```

El frontend vive en `frontend/` y consume la API a través de servicios con axios.

## Cómo ejecutarlo

Requisitos: Node.js 18 o superior.

**1. Backend** (puerto 3000)

```bash
cd api
npm install
npm run dev
```

**2. Frontend** (puerto 5173)

```bash
cd frontend
npm install
npm run dev
```

Abrí `http://localhost:5173` en el navegador.

## Endpoints principales

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/libros` | Lista paginada (`pagina`, `limite`) |
| GET | `/api/libros/filtrar` | Búsqueda con filtros |
| POST | `/api/libros` | Crear un libro |
| PUT | `/api/libros/:id` | Modificar un libro |
| DELETE | `/api/libros/:id` | Eliminar un libro |
| GET | `/api/editoriales` | Listar editoriales |

## Créditos

La consigna y el archivo `package.json` fueron provistos por la cátedra de Desarrollo de Software (UTN FRC). El resto del código fue desarrollado por María Pía Ittig.
