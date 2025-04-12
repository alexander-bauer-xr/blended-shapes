// types/cms.ts
export interface LandingPageRaw {
    id: string;
    title: string;
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
    featuredcases?: {
        id: string;
        title: string;
        slug: string;
        gallerie: {
            id: string;
            title: string;
            url: string | null;
        }[];
    }[];
}

export interface CaseRaw {
    id: string;
    title: string;
    beschreibungKurz: string;
    beschreibungLang: string;
    slug: string;
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

export interface ServiceRaw {
    id: string;
    title: string;
    slug: string;
    assignedtags: {
        id: string;
        title: string;
    }[];
}

export interface ProjectRaw {
    id: string;
    title: string;
    slug: string;
    tags: {
        id: string;
        title: string;
    }[];
    gallerie: {
        id: string;
        url: string;
    }[];
}

export interface ServicesPageRaw {
    servicesEntries: ServiceRaw[];
    projekteEntries: ProjectRaw[];
}  