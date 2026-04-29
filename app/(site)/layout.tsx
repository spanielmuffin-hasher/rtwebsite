import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { PageTransition } from "@/components/PageTransition";
import { InkCursor } from "@/components/InkCursor";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <InkCursor />
      <Preloader />
      <Navbar />
      <PageTransition>
        <main id="main-content">{children}</main>
      </PageTransition>
      <Footer />
    </SmoothScrollProvider>
  );
}
