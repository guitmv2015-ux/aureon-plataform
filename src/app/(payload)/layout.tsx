import config from "@payload-config";
import "@payloadcms/next/css";
import { RootLayout } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap";
import type { ReactNode } from "react";

/**
 * Layout isolado para o admin do Payload — não herda o layout institucional
 * (fontes/CSS do marketing site) para que o painel do CMS renderize com seu
 * próprio design system, como esperado pelo Payload.
 */
const PayloadLayout = ({ children }: { children: ReactNode }) => (
  <RootLayout config={config} importMap={importMap}>
    {children}
  </RootLayout>
);

export default PayloadLayout;
