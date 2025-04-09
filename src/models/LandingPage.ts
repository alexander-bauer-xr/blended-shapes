import { LandingPageRaw } from '../types/cms';

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
    }[],
    public casepreview: {
      id: string;
      beschreibung: string;
      gallerie: {
        id: string;
        url: string | null;
      }[];
    }[]
  ) {}

  static fromRaw(raw: LandingPageRaw): LandingPage {
    return new LandingPage(
      raw.id,
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
      raw.casepreview?.map((preview) => ({
        id: preview.id,
        beschreibung: preview.beschreibung ?? '',
        gallerie: preview.gallerie?.map((g) => ({
          id: g.id,
          url: g.url ?? null,
        })) ?? [],
      })) ?? []
    );
  }
}