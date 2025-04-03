import { GraphQLClient, gql } from 'graphql-request';
import { LandingPageEntry } from '../types/cms';

const endpoint = 'https://blended-shapes.com/cms-blended-shapes/web/api';

const client = new GraphQLClient(endpoint, {
    headers: {
        Authorization: 'Bearer 7h01XBa_Mq9xUdmJRDJgDgUf7GFpZqiG',
    },
});

export const getLandingPageContent = async (): Promise<LandingPageEntry[]> => {
    const query = gql`
      query LandingPage {
        entries(section: "landingPage") {
          ... on landingpagecontent_Entry {
            id
            leadtext
            motto2
            story
            hero3dmodel {
              id
            }
            services {
              ... on services_Entry {
                id
                title
                beschreibungKurz
                beschreibungLang
                slug
                gallerie {
                  id
                }
              }
            }
          }
        }
      }
    `;
    const data = await client.request<{ entries: LandingPageEntry[] }>(query);
    return data.entries;
};
