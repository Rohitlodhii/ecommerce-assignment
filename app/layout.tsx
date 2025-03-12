import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import { getAuthSession } from "@/config/auth";

const inter = Poppins({
  subsets : ["latin"],
  weight : ['400']
})

export const metadata: Metadata = {
  title: "Cours3x",
  description: "Course generator with Ai",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getAuthSession();


  return (
     <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
     
         <Navbar user={user}/>
        {children}
        
      </body>
    </html>
   
 
    
  );
}
