import { gql } from 'graphql-request';
import { client } from '../api/client';
import { LandingPage } from '../models/LandingPage';
import { CaseEntry } from '../models/CaseEntry';
import { StoryEntry } from '../models/StoryEntry';
import { CaseRaw, StoryRaw, LandingPageEntry } from '../types/cms';

export const getLandingPage = async (): Promise<LandingPage[]> => {
  const query = gql`
    query LandingPage {
      entries(section: "landingPage") {
        ... on landingpagecontent_Entry {
          id
          hero3dmodel {
            id
          }
          leadtext
          motto2
          story
          services {
            ... on services_Entry {
              id
              title
              beschreibungKurz
              beschreibungLang
              slug
            }
          }
          motto2
          gallerie {
            ... on bilder_Asset {
              id
              path
              filename
              url
            }
          }
        }
      }
    }
  `;
  const data = await client.request<{ entries: LandingPageEntry[] }>(query);
  return data.entries.map(LandingPage.fromRaw);
};

export const getCases = async (): Promise<CaseEntry[]> => {
  const query = gql`
    query Cases {
      projekteEntries {
        ... on cases_Entry {
          id
          title
          beschreibungKurz
          beschreibungLang
          gallerie {
            url
            title
            filename
          }
        }
      }
    }
  `;
  const data = await client.request<{ projekteEntries: CaseRaw[] }>(query);
  return data.projekteEntries.map(CaseEntry.fromRaw);
};

export const getStories = async (): Promise<StoryEntry[]> => {
  const query = gql`
    query Story {
      storyEntries {
        ... on story_Entry {
          id
          title
          beschreibungKurz
          beschreibungLang
          personen {
            ... on personen_Entry {
              id
              personenname
              bio
              profilbild {
                id
                filename
                srcset(sizes: "1024")
              }
            }
          }
        }
      }
    }
  `;
  const data = await client.request<{ storyEntries: StoryRaw[] }>(query);
  return data.storyEntries.map(StoryEntry.fromRaw);
};