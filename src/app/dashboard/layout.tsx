'use client';
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header/Header";
import MobileHeader from "@/components/Header/MobileHeader";
import SideNav from "@/components/Navigation/SideNav";
import MarginWidthWrapper from "@/components/Wrappers/MarginWidthWrapper";
import PageWrapper from "@/components/Wrappers/PageWrapper";
import FooterNav from "@/components/Navigation/FooterNav";
import isAuth from "@/components/isAuth/isAuth";


const inter = Inter({ subsets: ["latin"] });

function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
  
	return (
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
	);
}
export default isAuth(DashboardLayout);
