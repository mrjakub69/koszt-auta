import { cars } from "@/data/cars";

export default function sitemap() {

  const baseUrl =
    "https://koszt-auta.vercel.app";

  const carUrls = cars.map((car) => ({
    url: `${baseUrl}/koszt/${car.slug}`,
    lastModified: new Date(),
  }));

  return [

    {
      url: baseUrl,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/ranking`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/auta-z-malym-spalaniem`,
      lastModified: new Date(),
    },

    ...carUrls,

  ];

}