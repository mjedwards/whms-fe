import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/providers/TanstackProvider";

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
		<html lang='en'>
			<body className={`bg-gray-800 ${inter.className}`}>
				<TanstackProvider>{children}</TanstackProvider>
			</body>
		</html>
	);
}
