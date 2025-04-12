import { LandingPageRaw } from '../types/cms';

export class LandingPage {
  constructor(
    public id: string,
    public title: string,
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
    }[],
    public featuredcases: {
      id: string;
      title: string;
      slug: string;
      gallerie: {
        id: string;
        title: string;
        url: string | null;
      }[];
    }[]
  ) {}

  static fromRaw(raw: LandingPageRaw): LandingPage {
    return new LandingPage(
      raw.id,
      raw.title,
      raw.leadtext,
      raw.motto2,
      raw.story,
      raw.hero3dmodel?.id ?? '',
      raw.services?.map((service) => ({
        id: service.id,
        title: service.title,
        beschreibungKurz: service.beschreibungKurz,
        beschreibungLang: service.beschreibungLang,
        slug: service.slug,
      })) ?? [],
      raw.featuredcases?.map((entry) => ({
        id: entry.id,
        title: entry.title,
        slug: entry.slug,
        gallerie: entry.gallerie?.map((g) => ({
          id: g.id,
          title: g.title,
          url: g.url ?? null,
        })) ?? [],
      })) ?? []
    );
  }
}