import React from 'react';
import "@payloadcms/next/css";
import { RootLayout } from "@payloadcms/next/layouts";
// @ts-expect-error - Suprime o erro temporário de tipo antes do Payload injetar o mapa
import { importMap } from "./admin/importMap";
import type { ReactNode } from "react";
import config from "@payload-config";

type Args = {
  children: ReactNode;
};

const Layout = ({ children }: Args) => 
  RootLayout({ config, importMap, children });

export default Layout;
