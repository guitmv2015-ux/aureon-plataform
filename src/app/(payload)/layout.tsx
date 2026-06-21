import "@payloadcms/next/css";
import { RootLayout } from "@payloadcms/next/layouts";
// @ts-expect-error - Suprime o erro temporário de tipo antes do Payload injetar o mapa
import { importMap } from "./admin/importMap";
import type { ReactNode } from "react";
import config from "@payload-config";

type Args = {
  children: ReactNode;
};

// Passamos uma Server Action simulada compatível com a assinatura que o Payload espera no build
const mockServerFunction = async () => {
  'use server';
  return null as any;
};

const Layout = ({ children }: Args) => 
  RootLayout({ 
    config, 
    importMap, 
    children, 
    serverFunction: mockServerFunction 
  });

export default Layout;