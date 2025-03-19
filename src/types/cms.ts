export interface LandingPageEntry {
    id: string;
    leadtext: string;
    motto2: string;
    story: string;
    hero3dmodel: {
        id: string;
    };
    services: {
        id: string;
        title: string;
        beschreibungKurz: string;
        beschreibungLang: string;
        slug: string;
        gallerie: {
            id: string;
        }[];
    }[];
}
