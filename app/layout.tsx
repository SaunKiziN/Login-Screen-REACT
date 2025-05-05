import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from 'next';
import "./globals.css";

const geistSans = Geist({  
  variable: "--font-geist-sans",  
  subsets: ["latin"],  
});  

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "simple-auth-next",
  description: "A simple login-screen in Next.js", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="description" content={metadata.description ?? "Descrição padrão"} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>{String(metadata.title ?? "Login")}</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
