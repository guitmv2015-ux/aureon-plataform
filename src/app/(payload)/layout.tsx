import "@payloadcms/next/css";
import { RootLayout } from "@payloadcms/next/layouts";
// @ts-expect-error - Suprime o erro temporário de tipo antes do Payload injetar o mapa
import { importMap } from "./admin/importMap";
import type { ReactNode } from "react";
import config from "@payload-config";

type Args = {
  children: ReactNode;
};

const mockServerFunction = async (): Promise<unknown> => {
  'use server';
  return null;
};

const Layout = ({ children }: Args) => {
  const layoutProps = {
    config,
    importMap,
    children,
    serverFunction: mockServerFunction
  };

  // Força o componente a aceitar o objeto sem usar a palavra reservada "any"
  return RootLayout(layoutProps as unknown as Parameters<typeof RootLayout>[0]);
};

export default Layout;