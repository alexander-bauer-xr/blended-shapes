# Blended Shapes – React + Vite Frontend

This project is a modern React frontend that pulls content from a **CraftCMS backend** using the **GraphQL API**.  
It serves as the foundation for a portfolio site with a clear focus on performance, structure, and design.

---

## Tech Stack

- **React 18**
- **Vite**
- **TypeScript**
- **SCSS**
- **CraftCMS (Headless, via GraphQL)**
- **Axios**
- **Three.js** (experimental for 3D features)

---

## Getting Started

```bash
npm install
npm run dev
```

The app will then run at: [http://localhost:5173](http://localhost:5173)

---

### API Client Configuration

The GraphQL client used to access CraftCMS is located at:

```ts
// src/api/client.ts
import { GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient('https://blended-shapes.com/cms-blended-shapes/web/api', {
  headers: {
    Authorization: 'Bearer --TOKEN--',
  },
});
```

> ⚠️ No content will work without a valid token.  
> Test data can be provided through a separate CMS if needed.

---

### CraftCMS Setup Requirements

To function correctly, CraftCMS must be configured as follows:

### General Requirements

- **GraphQL must be enabled**
- A valid **Access Token (Bearer)** must be generated
- Content must be created in the following **Sections** and **Entry Types**

---

### `landingPage` (Section: _Single_)

| Field Name       | Type                        | Description                                           |
|------------------|-----------------------------|--------------------------------------------------------|
| `hero3dmodel`    | Asset (GLB, FBX, etc.)      | Main 3D model                                         |
| `leadtext`       | Plain Text                  | Introductory text                                     |
| `motto2`         | Plain Text                  | Optional secondary title                              |
| `story`          | Plain Text                  | Main story text                                       |
| `services`       | Entries (relation to `services`) | List of linked services                       |
| `casepreview`    | Relation to `media`         | Media preview with gallery and description            |

---

### `services` (Section: _Structure_)

| Field Name           | Type         | Description                  |
|----------------------|--------------|------------------------------|
| `title`              | Plain Text   | Title of the service         |
| `beschreibungKurz`   | Plain Text   | Short description            |
| `beschreibungLang`   | Rich Text    | Detailed description         |
| `slug`               | Slug         | URL-friendly name            |

---

### `cases` (Section: _Channel_ or _Structure_)

| Field Name           | Type         | Description                      |
|----------------------|--------------|-----------------------------------|
| `title`              | Plain Text   | Project title                     |
| `beschreibungKurz`   | Plain Text   | Intro text                        |
| `beschreibungLang`   | Rich Text    | Detailed description              |
| `tags`               | Category / Entry Reference | Thematic tags        |
| `casespreviews`      | Relation to `media` | Gallery + description + CSS style |

---

### `story` (Section: _Channel_)

| Field Name           | Type         | Description                      |
|----------------------|--------------|-----------------------------------|
| `title`              | Plain Text   | Story title                       |
| `beschreibungKurz`   | Plain Text   | Short teaser                      |
| `beschreibungLang`   | Rich Text    | Full story                        |
| `personen`           | Relation to `personen` | Involved persons         |

#### `personen` (Entry Type)

| Field Name     | Type          | Description                |
|----------------|---------------|----------------------------|
| `personenname` | Plain Text    | Name of the person         |
| `bio`          | Rich Text     | Biography                  |
| `profilbild`   | Asset (Image) | Picture of the person      |

---

## Install CraftCMS

The full CraftCMS installation guide can be found in the official documentation:

[CraftCMS Installation Guide](https://craftcms.com/docs/4.x/installation.html)

---

## Structure Overview

```text
react-page/
├── public/                # Static files for Vite
├── src/
│   ├── components/        # UI components
│   ├── pages/             # Home, Cases, Story
│   ├── api/               # API client
│   ├── services/          # CMS connection
│   ├── models/            # Data models
│   ├── js/                # Logic & visual helpers
│   ├── styles/            # SCSS (modular + global)
│   ├── assets/            # Images, fonts, videos
│   └── types/             # Extended type definitions
├── vite.config.ts
├── tsconfig*.json
└── README.md
```

---

## ToDos

- [ ] Complete or improve PHP proxy logic (backend/proxy.php)
- [ ] Implement contact form
- [ ] Add improved frontend animations and smooth transitions
- [ ] Optimize responsive design (e.g., return images optimized via `srcset`) and fine-tune typography

## Further Notes

- All data is loaded on initial load from CraftCMS
- Queries are defined in `src/services/cmsClient.ts`
- Corresponding models are in `src/models/` and `src/types/`
- Styling is based on SCSS and organized into modules

---

## License

Internal development base of **Blended Shapes**  
Not intended for public use.