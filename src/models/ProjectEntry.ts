// models/ProjectEntry.ts
import { ProjectRaw } from '../types/cms';

export class ProjectEntry {
  constructor(
    public id: string,
    public title: string,
    public slug: string,
    public tags: {
      id: string;
      title: string;
    }[],
    public gallerie: {
      id: string;
      url: string;
    }[]
  ) {}

  static fromRaw(raw: ProjectRaw): ProjectEntry {
    return new ProjectEntry(
      raw.id,
      raw.title,
      raw.slug,
      raw.tags ?? [],
      raw.gallerie ?? []
    );
  }
}
