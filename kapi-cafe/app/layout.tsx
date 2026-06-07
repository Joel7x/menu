import type { Metadata } from "next";
import "./globals.css";
import { OrderProvider } from "@/lib/OrderContext";

export const metadata: Metadata = {
  title: "Kapi Cafe – Crafted Coffee. Curated Experiences.",
  description:
    "Premium digital menu for Kapi Cafe Ravet. Explore our handcrafted coffees, refreshing beverages, sandwiches, burgers, desserts and more.",
  keywords: "Kapi Cafe, Ravet, coffee, menu, cafe, Pune",
  openGraph: {
    title: "Kapi Cafe – Crafted Coffee. Curated Experiences.",
    description: "Explore the premium digital menu of Kapi Cafe Ravet.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OrderProvider>
          {children}
        </OrderProvider>
      </body>
    </html>
  );
}
