import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  return [
    {
      url: url + '/',
      priority: 1.0,
    },
    {
      url: url + '/behandlingar',
      priority: 0.8,
    },
    {
      url: url + '/yinyoga',
      priority: 0.8,
    },
    {
      url: url + '/kurser',
      priority: 0.8,
    },
    {
      url: url + '/om-mig',
      priority: 0.8,
    },
    {
      url: url + '/galleri',
      priority: 0.8,
    },
    {
      url: url + '/kontakt',
      priority: 0.8,
    },
  ];
}
