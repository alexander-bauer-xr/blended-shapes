// src/services/cmsClient.ts

import { gql } from 'graphql-request';
import { client } from '../api/client';
import { LandingPage } from '../models/LandingPage';
import { CaseEntry } from '../models/CaseEntry';
import { StoryEntry } from '../models/StoryEntry';
import { CaseRaw, StoryRaw, LandingPageRaw } from '../types/cms';

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
            casepreview {
              ... on media_Entry {
                id
                beschreibung
                gallerie {
                  id
                  url
                }
              }
            }
          }
        }
      }
  `;
  const data = await client.request<{ entries: LandingPageRaw[] }>(query);
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
          slug
          tags {
            title
          }
          casespreviews {
            id
            ... on media_Entry {
              id
              beschreibung
              cssStyle
              gallerie {
                id
                url
              }
            }
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
                url
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