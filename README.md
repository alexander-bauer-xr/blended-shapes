# Blended Shapes – React + Vite Frontend

Dieses Projekt ist ein modernes React-Frontend, das Inhalte aus einem **CraftCMS-Backend** über die **GraphQL API** bezieht.  
Es dient als Grundlage für eine Portfolioseite, mit einem klaren Fokus auf Performance, Struktur und Design.

---

## Tech Stack

- **React 18**
- **Vite**
- **TypeScript**
- **SCSS**
- **CraftCMS (Headless, via GraphQL)**
- **Axios**
- **Three.js** (experimentell für 3D-Features)

---

## Projekt starten

```bash
npm install
npm run dev
```

Die Anwendung läuft anschließend unter: [http://localhost:5173](http://localhost:5173)

---

### API-Client-Konfiguration

Der GraphQL-Client für den Zugriff auf CraftCMS befindet sich in:

```ts
// src/api/client.ts
import { GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient('https://blended-shapes.com/cms-blended-shapes/web/api', {
  headers: {
    Authorization: 'Bearer --TOKEN--',
  },
});
```

> ⚠️ Ohne gültigen Token funktionieren keine Inhalte.  
> Bei Bedarf können Testdaten über ein separates CMS bereitgestellt werden.
> Für die Entwicklung ist es 

---

### CraftCMS Setup-Voraussetzungen

Damit das Frontend korrekt funktioniert, muss das CraftCMS wie folgt konfiguriert sein:

### Allgemeine Anforderungen

- **GraphQL muss aktiviert sein**
- Ein gültiges **Access Token (Bearer)** muss erstellt werden
- Inhalte müssen in folgenden **Sections** und **Entry Types** angelegt werden

---

### `landingPage` (Section: _Single_)

| Feldname         | Typ                    | Beschreibung                                           |
|------------------|-------------------------|--------------------------------------------------------|
| `hero3dmodel`    | Asset (GLB, JPG etc)    | Haupt-3D-Modell                                        |
| `leadtext`       | Plain Text              | Einleitungstext                                        |
| `motto2`         | Plain Text              | Optionaler zweiter Titel                               |
| `story`          | Plain Text              | Hauptstory-Text                                        |
| `services`       | Entries (Relation zu `services`) | Liste verknüpfter Dienstleistungen          |
| `casepreview`    | Relation zu `media`     | Mediale Vorschau mit Galerie und Beschreibung          |

---

### `services` (Section: _Structure_)

| Feldname             | Typ         | Beschreibung                  |
|----------------------|-------------|-------------------------------|
| `title`              | Plain Text  | Titel der Dienstleistung      |
| `beschreibungKurz`   | Plain Text  | Kurze Beschreibung            |
| `beschreibungLang`   | Rich Text   | Ausführliche Beschreibung     |
| `slug`               | Slug        | URL-kompatibler Name          |

---

### `cases` (Section: _Channel_ oder _Structure_)

| Feldname             | Typ         | Beschreibung                      |
|----------------------|-------------|-----------------------------------|
| `title`              | Plain Text  | Projekttitel                      |
| `beschreibungKurz`   | Plain Text  | Intro-Text                        |
| `beschreibungLang`   | Rich Text   | Detailbeschreibung                |
| `tags`               | Kategorie / Entry Reference | Thematische Tags      |
| `casespreviews`      | Relation zu `media` | Galerie + Beschreibung + CSS-Style |

---

###  `story` (Section: _Channel_)

| Feldname             | Typ         | Beschreibung                      |
|----------------------|-------------|-----------------------------------|
| `title`              | Plain Text  | Titel der Geschichte              |
| `beschreibungKurz`   | Plain Text  | Kurzer Teaser                     |
| `beschreibungLang`   | Rich Text   | Vollständige Story                |
| `personen`           | Relation zu `personen` | Beteiligte Personen         |

#### `personen` (Eintragstyp)

| Feldname       | Typ         | Beschreibung                |
|----------------|-------------|-----------------------------|
| `personenname` | Plain Text  | Name der Person             |
| `bio`          | Rich Text   | Biografie                   |
| `profilbild`   | Asset (Bild)| Bild der Person             |

---

## CraftCMS installieren

Die vollständige Anleitung zur Installation von CraftCMS findest du in der offiziellen Dokumentation:

[CraftCMS Installationsanleitung](https://craftcms.com/docs/4.x/installation.html)

---

## Struktur-Überblick

```text
react-page/
├── .env
├── backend/proxy.php
├── public/                # Statische Dateien für Vite
├── dist/                  # Build-Ausgabe
├── src/
│   ├── components/        # UI-Komponenten
│   ├── pages/             # Home, Cases, Story
│   ├── api/               # API-Client
│   ├── services/          # CMS-Verbindung
│   ├── models/            # Datenmodell-Abbildung
│   ├── js/                # Logik & visuelle Helfer
│   ├── styles/            # SCSS (Modular + Global)
│   ├── assets/            # Bilder, Fonts, Videos
│   └── types/             # Erweiterte Typdefinitionen
├── vite.config.ts
├── tsconfig*.json
└── README.md
```

---

## ToDos

- [ ] PHP-Proxy-Logik vervollständigen oder verbessern (backend/proxy.php)
- [ ] Kontaktformular implementieren
- [ ] Bessere Frontend-Animationen und sanfte Übergänge
- [ ] Optimierung des responsiven Designs und typografischen Feinschliffs

## Weiterführend

- Alle Daten werden beim Initial-Load aus dem CraftCMS geladen
- Die Abfragen sind in `src/services/cmsClient.ts` definiert
- Die zugehörigen Modelle in `src/models/` und `src/types/`
- Das Styling basiert auf SCSS und ist in Module gegliedert

---

## Lizenz

Interne Entwicklungsbasis von **Blended Shapes**  
Nicht zur öffentlichen Nutzung bestimmt.