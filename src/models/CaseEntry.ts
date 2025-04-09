// models/CaseEntry.ts
import { CaseRaw } from '../types/cms';

export class CaseEntry {
  constructor(
    public id: string,
    public title: string,
    public beschreibungKurz: string,
    public beschreibungLang: string,
    public tags: string[],
    public casespreviews: {
      id: string;
      beschreibung: string;
      cssStyle: string;
      gallerie: {
        id: string;
        url: string;
      }[];
    }[]
  ) {}

  static fromRaw(raw: CaseRaw): CaseEntry {
    return new CaseEntry(
      raw.id,
      raw.title,
      raw.beschreibungKurz,
      raw.beschreibungLang,
      raw.tags?.map((tag) => tag.title) ?? [],
      raw.casespreviews.map((preview) => ({
        id: preview.id,
        beschreibung: preview.beschreibung,
        cssStyle: preview.cssStyle,
        gallerie: preview.gallerie.map((img) => ({
          id: img.id,
          url: img.url,
        })),
      }))
    );
  }
}