import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Letters to Abroad",
    description: "Letters to Abroad",
};
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}
