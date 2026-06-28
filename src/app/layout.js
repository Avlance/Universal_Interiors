import "./globals.css";
import RootLayout from "@/components/layout/RootLayout";

export const metadata = {
  title: "Universal Interiors - Transform Your Space",
  description: "Expert interior design services for homes and offices. Get free consultation and transform your space today.",
};

import StyledComponentsRegistry from "@/lib/registry";

import { Suspense } from "react";

export default function AppLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <StyledComponentsRegistry>
          <Suspense fallback={null}>
            <RootLayout>
              {children}
            </RootLayout>
          </Suspense>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
