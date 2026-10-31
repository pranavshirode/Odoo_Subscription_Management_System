# Brightloop

A subscription and billing management dashboard built with **React 19, Vite, Tailwind CSS v4, React Router, Recharts, React Hook Form and Zod**.

It ships with a demo admin workspace and a customer portal. All data is sample data kept in the browser (`localStorage`); no real payment processing happens.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the production build
```

## Demo logins

| Role     | Email                       | Password            |
| -------- | --------------------------- | ------------------- |
| Admin    | `admin@brightloop.in`       | any (prefilled)     |
| Customer | `customer@orbitworks.in`    | any                 |

Any email containing the word `customer` signs in to the customer portal.

## Project structure

```
brightloop/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx              # entry point (Router + provider)
    ├── App.jsx               # routes and role guards
    ├── index.css             # Tailwind import + design tokens + app styles
    ├── components/
    │   └── ui.jsx            # Button, Input, Modal, Badge, Pagination, ...
    ├── context/
    │   └── AppContext.jsx    # theme, data store, auth user, toasts
    ├── layouts/
    │   └── AppLayout.jsx     # sidebar, topbar, outlet
    ├── pages/
    │   ├── Auth.jsx          # login, register, forgot password
    │   ├── Dashboard.jsx     # admin + customer dashboards
    │   ├── EntityPage.jsx    # generic CRUD table for every resource
    │   ├── Reports.jsx       # revenue reports and subscription analytics
    │   └── Settings.jsx      # settings and profile
    ├── services/
    │   └── api.js            # axios client (not wired up yet)
    ├── data/
    │   └── mockData.js       # sample data
    └── utils/
        └── calculations.js   # currency formatting, CSV export
```

## Connecting a real backend

`src/services/api.js` already exposes `createResourceService('customers')` and friends. Replace the `localStorage` reducers in `AppContext.jsx` with calls to these services when your API is ready.
