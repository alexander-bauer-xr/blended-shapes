import { CaseRaw } from '../types/cms';

export class CaseEntry {
  constructor(
    public id: string,
    public title: string,
    public shortDesc: string,
    public longDesc: string,
    public gallery: { url: string; title: string; filename: string }[]
  ) {}

  static fromRaw(raw: CaseRaw): CaseEntry {
    return new CaseEntry(
      raw.id,
      raw.title,
      raw.beschreibungKurz,
      raw.beschreibungLang,
      raw.gallerie
    );
  }
}