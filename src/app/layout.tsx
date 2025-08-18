import { geistMono, geistSans } from "@/assets/fonts";
import { Toaster } from "@/components/ui/sonner";
import NextAuthProvider from "@/providers/next-auth-provider";
import NuqsProvider from "@/providers/nuqs-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FastDelivery - Kirim Paket Cepat & Aman",
  description:
    "FastDelivery adalah aplikasi pengiriman barang terpercaya dengan layanan cepat, aman, dan terjangkau.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <NuqsProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </NuqsProvider>
        </NextAuthProvider>

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
