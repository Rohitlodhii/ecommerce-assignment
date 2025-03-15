import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import { getAuthSession } from "@/config/auth";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/sonner";

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

  const safeUser = await getAuthSession();
  const user = safeUser ? JSON.parse(JSON.stringify(safeUser)) : null;




  return (
     <html lang="en">

      <body
        className={`${inter.className} antialiased`}
        >
     
        <Provider>
         <Navbar username={user?.user.name} useremail={user?.user.email} useravatar={user?.user.image}/>
        {children}
        <Toaster/>
      </Provider>
        
      </body>
    </html>
   
 
    
  );
}
