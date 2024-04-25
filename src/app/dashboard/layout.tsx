import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header/Header";
import MobileHeader from "@/components/Header/MobileHeader";
import SideNav from "@/components/Navigation/SideNav";
import MarginWidthWrapper from "@/components/Wrappers/MarginWidthWrapper";
import PageWrapper from "@/components/Wrappers/PageWrapper";
import FooterNav from "@/components/Navigation/FooterNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "WHMS Dashboard",
	description: "Dashboard for the whms site.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
    <html lang="en">
      <body className={`bg-white${inter.className}`}>
        <div className="flex">
          <SideNav />
          <main className="flex-1">
            <MarginWidthWrapper>
              <Header />
              <MobileHeader />
              <PageWrapper>{children}</PageWrapper>
              <FooterNav />
            </MarginWidthWrapper>
          </main>
        </div>
      </body>
    </html>
	);
}
