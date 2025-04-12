// models/ServicesEntry.ts
import { ServiceRaw } from '../types/cms';

export class ServicesEntry {
  constructor(
    public id: string,
    public title: string,
    public slug: string,
    public assignedtags: {
      id: string;
      title: string;
    }[]
  ) {}

  static fromRaw(raw: ServiceRaw): ServicesEntry {
    return new ServicesEntry(
      raw.id,
      raw.title,
      raw.slug,
      raw.assignedtags?.map(tag => ({
        id: tag.id,
        title: tag.title,
      })) ?? []
    );
  }
}