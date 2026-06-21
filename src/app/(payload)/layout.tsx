import "@payloadcms/next/css";
import { RootLayout } from "@payloadcms/next/layouts";
// @ts-expect-error - Suprime o erro temporário de tipo antes do Payload injetar o mapa
import { importMap } from "./admin/importMap";
import type { ReactNode } from "react";
import config from "@payload-config";
import { serverFunction } from "@payloadcms/next/views";

type Args = {
  children: ReactNode;
};

const Layout = ({ children }: Args) => 
  RootLayout({ config, importMap, children, serverFunction });

export default Layout;