// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";  // This automatically adds a default container
import { ThemeProvider } from "@/components/theme-provider";

export const revalidate = 0;


export const metadata = {
  title: "AAW-Tech",
  description: "Field Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
       
      <body
        className={`antialiased overflow-hidden bg-slate-200`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  );
}
