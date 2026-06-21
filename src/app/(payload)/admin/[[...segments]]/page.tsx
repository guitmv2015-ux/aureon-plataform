import type { Metadata } from "next";
import config from "@payload-config";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";
// @ts-expect-error - Suprime o erro temporário de tipo antes do Payload injetar o mapa
import { importMap } from "../importMap";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams, importMap });

export default Page;
