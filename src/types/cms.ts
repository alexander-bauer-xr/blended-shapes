export interface LandingPageEntry {
    id: string;
    leadtext: string;
    motto2: string;
    story: string;
    hero3dmodel: {
        id: string;
    } | null;
    services: {
        id: string;
        title: string;
        beschreibungKurz: string;
        beschreibungLang: string;
        slug: string;
    }[];
    casepreview?: {
        id: string;
        beschreibung: string;
        gallerie: {
            id: string;
            url: string | null;
        }[];
    }[];
}

export interface CaseRaw {
    id: string;
    title: string;
    beschreibungKurz: string;
    beschreibungLang: string;
    gallerie: { url: string; title: string; filename: string }[];
}

export interface StoryRaw {
    id: string;
    title: string;
    beschreibungKurz: string;
    beschreibungLang: string;
    personen: {
        id: string;
        personenname: string;
        bio: string;
        profilbild: {
            id: string;
            filename: string;
            srcset: string;
        };
    }[];
}