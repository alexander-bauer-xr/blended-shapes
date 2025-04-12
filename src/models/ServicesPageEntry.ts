// models/ServicesPageEntry.ts
import { ServicesPageRaw } from '../types/cms';
import { ServicesEntry } from './ServicesEntry';
import { ProjectEntry } from './ProjectEntry';

export class ServicesPageEntry {
  constructor(
    public services: ServicesEntry[],
    public projects: ProjectEntry[]
  ) {}

  static fromRaw(raw: ServicesPageRaw): ServicesPageEntry {
    return new ServicesPageEntry(
      raw.servicesEntries.map(ServicesEntry.fromRaw),
      raw.projekteEntries.map(ProjectEntry.fromRaw)
    );
  }
}