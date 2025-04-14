import { StoryRaw } from '../types/cms';

export class StoryEntry {
  constructor(
    public id: string,
    public title: string,
    public shortDesc: string,
    public longDesc: string,
    public people: {
      id: string;
      personenname: string;
      bio: string;
      profilbild?: {
        id: string;
        filename: string;
        url: string;
      };
    }[]
  ) {}

  static fromRaw(raw: StoryRaw): StoryEntry {
    return new StoryEntry(
      raw.id,
      raw.title,
      raw.beschreibungKurz,
      raw.beschreibungLang,
      raw.personen.map(p => ({
        id: p.id,
        personenname: p.personenname,
        bio: p.bio,
        profilbild: p.profilbild?.[0]
      }))
    );
  }  
}