# Blended Shapes – React + Vite Frontend

This project is a modern React frontend that pulls content from a **CraftCMS backend** using the **GraphQL API**.  
It serves as the foundation for a portfolio site with a clear focus on performance, structure, and design. This branch shows a significantly improved version of the project by solving the **Moonshiner Fachaufgabe**.

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

| Field Name      | Type                             | Description                                         |
| --------------- | -------------------------------- | --------------------------------------------------- |
| `leadtext`      | Plain Text                       | Introductory text                                   |
| `motto2`        | Plain Text                       | Optional secondary title                            |
| `story`         | Plain Text                       | Main story text                                     |
| `services`      | Entries (relation to `services`) | Linked services with titles, descriptions, and tags |
| `featuredcases` | Relation to `cases`              | Featured projects from the `cases` section          |
| `motto2`        | Plain Text                       | (Duplicated field in schema, used optionally)       |

---

### `services` (Section: _Structure_)

| Field Name         | Type                         | Description                    |
| ------------------ | ---------------------------- | ------------------------------ |
| `title`            | Plain Text                   | Title of the service           |
| `beschreibungKurz` | Plain Text                   | Short description              |
| `beschreibungLang` | Rich Text                    | Detailed description           |
| `slug`             | Slug                         | URL-friendly name              |
| `assignedtags`     | Entries (relation to `tags`) | Tags that classify the service |

---

### `cases` (Section: _Channel_ or _Structure_)

| Field Name         | Type                         | Description                         |
| ------------------ | ---------------------------- | ----------------------------------- |
| `title`            | Plain Text                   | Project title                       |
| `beschreibungKurz` | Plain Text                   | Intro text                          |
| `beschreibungLang` | Rich Text                    | Detailed description                |
| `slug`             | Slug                         | URL identifier                      |
| `tags`             | Categories / Entry Reference | Tags assigned to the case           |
| `casespreviews`    | Relation to `media`          | Gallery preview including CSS style |

---

### `media` (Entry Type or Section)

| Field Name     | Type          | Description                            |
| -------------- | ------------- | -------------------------------------- |
| `beschreibung` | Plain Text    | Description for the preview item       |
| `cssStyle`     | Plain Text    | Optional styling information           |
| `gallerie`     | Asset (Image) | Image gallery used in project previews |

---

### `story` (Section: _Channel_)

| Field Name         | Type                   | Description                        |
| ------------------ | ---------------------- | ---------------------------------- |
| `title`            | Plain Text             | Story title                        |
| `beschreibungKurz` | Plain Text             | Short teaser                       |
| `beschreibungLang` | Rich Text              | Full story content                 |
| `personen`         | Relation to `personen` | Linked contributors / team members |

---

### `personen` (Entry Type)

| Field Name     | Type          | Description        |
| -------------- | ------------- | ------------------ |
| `personenname` | Plain Text    | Name of the person |
| `bio`          | Rich Text     | Short biography    |
| `profilbild`   | Asset (Image) | Profile picture    |

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
## Moonshiners Coding Challenge Integration

This project was significantly improved by solving the **Moonshiners Fachaufgabe**, as provided before the interview. Below is a breakdown of each task and its implementation.

---

### ✅ Task 1: "Click on outside" to close the menu

The mobile menu now closes when the user clicks outside or navigates to another page.

```tsx
// src/components/Menu.tsx

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeMenu(); // resets icon rotation + closes menu
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

useEffect(() => {
  closeMenu(); // closes menu on route change
}, [location]);
```

The `closeMenu()` function resets the icon class and closes the dropdown, ensuring visual and functional consistency.

---

### ✅ Task 2: Filter cases based on category

Cases can be filtered on the `/services` page by clicking on tags that represent service categories.

```tsx
// src/pages/Services.tsx

const filteredProjects = useMemo(() => {
  if (!data) return [];
  if (activeTagIds.length === 0) return data.projects;

  return data.projects.filter((project) =>
    project.tags.some((tag) => activeTagIds.includes(tag.id))
  );
}, [activeTagIds, data]);
```

Tag buttons are generated dynamically from the CraftCMS `assignedtags` field and can be toggled interactively.

---

### ✅ Task 3: Clicking on a tag links to prefiltered service page

On the landing page, users can click on a tag below a service. This redirects them to `/services?tags=XYZ` and auto-activates the filter on load.

```tsx
// src/components/Services.tsx

const handleTagClick = (tag: string) => {
  navigate(`/services?tags=${encodeURIComponent(tag)}`);
};
```

```tsx
// src/pages/Services.tsx

useEffect(() => {
  if (!data) return;

  const tagTitleFromQuery = searchParams.get('tags');
  if (!tagTitleFromQuery) return;

  const matchedTag = data.services
    .flatMap((service) => service.assignedtags)
    .find((tag) => tag.title.toLowerCase() === tagTitleFromQuery.toLowerCase());

  if (matchedTag) {
    setActiveTagIds([matchedTag.id]);
  }
}, [data, searchParams]);
```

In addition, the same pattern was applied to each **individual case detail view** (`/cases/:slug`), where tags are now rendered as real `<button>` elements and fully functional. Clicking a tag in a case opens the `/services` page with the respective filter pre-activated:

```tsx
// src/pages/CaseCarousel.tsx

const handleTagClick = (tag: string) => {
  navigate(`/services?tags=${encodeURIComponent(tag)}`);
};

// ...
// Case data is fetched and the current case is selected
// ...

{current.tags.map((tag, i) => (
  <button key={i} onClick={() => handleTagClick(tag)}>{tag}</button>
))}
```

This enables **cross-page communication** via query parameters and ensures a seamless user experience and ensures that all tag buttons throughout the site are semantically valid, accessible, and fully interactive — as expected from the task description.

---

### ✅ Task 4: Cases on the homepage are clickable

The featured cases section on the landing page includes links that route directly to the case detail view.

```tsx
// src/components/CasesPreview.tsx

<Link to={`/cases/${item.slug}`} className="grid-link">
    <img src={item.gallerie[0].url} alt={item.gallerie[0].title ?? item.title} />
</Link>
```

This ensures that featured projects are fully navigable and improve UX and SEO structure.

---

## ToDos

- [ ] Complete or improve PHP proxy logic (backend/proxy.php)
- [ ] Finish contact form
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