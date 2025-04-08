// models/LandingPage.ts
import { LandingPageEntry } from '../types/cms';

export class LandingPage {
    constructor(
        public id: string,
        public leadtext: string,
        public motto2: string,
        public story: string,
        public hero3dmodelId: string,
        public services: {
            id: string;
            title: string;
            beschreibungKurz: string;
            beschreibungLang: string;
            slug: string;
            gallerie: { id: string }[];
        }[]
    ) { }

    static fromRaw(entry: LandingPageEntry): LandingPage {
        return new LandingPage(
            entry.id,
            entry.leadtext,
            entry.motto2,
            entry.story,
            entry.hero3dmodel?.id ?? '',
            entry.services.map((service: LandingPageEntry['services'][number]) => ({
                id: service.id,
                title: service.title,
                beschreibungKurz: service.beschreibungKurz,
                beschreibungLang: service.beschreibungLang,
                slug: service.slug,
                gallerie: service.gallerie.map(g => ({ id: g.id })),
            }))
        );
    }
}  