# VietLogis Demo Scaffold

This workspace contains a minimal scaffold for a React frontend and Node.js (Express) backend using MySQL. It's intended as a starting point so you can edit the navbar order and pages.

## What I created
- `backend/` - Express API that serves navigation items from a MySQL table.
- `frontend/` - Minimal React app (Router + Navbar) that fetches nav order from backend.
- `backend/schema.sql` - SQL to create `vietlogis_demo` DB and `navigation` table with correct order.

## Setup (local)

1. MySQL: open MySQL Workbench and run `backend/schema.sql` to create the database and sample nav rows.
2. Backend:

```bash
cd backend
# copy .env.example -> .env and fill DB credentials
npm install
node server.js
```

By default the backend runs on port 4000 and exposes `/api/nav`.

3. Frontend (Vite):

```bash
cd frontend
# install dependencies
npm install
# run dev server (Vite) - opens at http://localhost:3000 by default
npm run dev
```

The React app fetches navigation order from `http://localhost:4000/api/nav`.

## Notes
- I deleted the two demo static files you asked removed.
- If you want I can:
  - Create a full `create-react-app` or Vite project here.
  - Add Docker compose for MySQL + backend + frontend.

Tell me which next step you want. If you want to run it now, tell me whether to create a Vite app in `frontend/` or use CRA, and whether to add a simple `npm start` script that runs a dev server.
