// types/cms.ts
export interface LandingPageRaw {
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

// types/cms.ts
export interface CaseRaw {
    id: string;
    title: string;
    beschreibungKurz: string;
    beschreibungLang: string;
    tags: {
        title: string;
    }[];
    casespreviews: {
        id: string;
        beschreibung: string;
        cssStyle: string;
        gallerie: {
            id: string;
            url: string;
        }[];
    }[];
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
            url: string;
        }[];
    }[];
}  