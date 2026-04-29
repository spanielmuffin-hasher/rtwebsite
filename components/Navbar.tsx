"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import { ScrambleText } from "@/components/ScrambleText";
import { MagneticButton } from "@/components/MagneticButton";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Activities", href: "/our-activities" },
  { label: "Our Team", href: "/our-team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Bulletins", href: "/bulletins" },
  { label: "Contact us", href: "/contact-us" },
];

const mobileMenuVariants = {
  closed: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  open: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

const menuItemVariants = {
  closed: { y: 28, opacity: 0 },
  open: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.12 + i * 0.065,
    },
  }),
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      if (y > lastScrollY.current && y > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass shadow-glass border-b border-white/30"
            : "bg-transparent"
        )}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={
          prefersReduced
            ? { duration: 0 }
            : { duration: 0.38, ease: [0.16, 1, 0.3, 1] }
        }
      >
        <div className="container-wide section-padding">
          <div className="flex items-center justify-between h-[4.5rem]">
            {/* Logo */}
            <MagneticButton
              as="a"
              href="/"
              aria-label="Rotaract Crystals Home"
              strength={0.25}
              className="flex items-center"
            >
              <Image
                src="/crystalslogo.png"
                alt="Rotaract Club of Coimbatore Crystals"
                width={260}
                height={80}
                className="object-contain w-[140px] sm:w-[180px] lg:w-[220px]"
                priority
              />
            </MagneticButton>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <NavLink key={link.href} href={link.href} active={isActive}>
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <MagneticButton
                as="a"
                href="/contact-us"
                strength={0.35}
                className="hidden sm:inline-flex btn-primary text-sm py-2 px-5"
              >
                Join Us
              </MagneticButton>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <motion.span
                  className="block w-6 h-[1.5px] bg-neutral-900 origin-center"
                  animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="block w-6 h-[1.5px] bg-neutral-900 origin-center"
                  animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white flex flex-col pt-[4.5rem]"
            variants={prefersReduced ? undefined : mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <nav className="flex flex-col px-6 pt-10 gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={prefersReduced ? undefined : menuItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={link.href}
                      className={clsx(
                        "block py-4 text-3xl font-display font-bold border-b border-neutral-100 transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-neutral-900 hover:text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              className="mt-auto px-6 pb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.4 }}
            >
              <Link
                href="/contact-us"
                className="btn-primary w-full justify-center text-base py-4"
              >
                Join Rotaract Crystals
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "relative px-3 py-2 text-sm font-medium rounded-md group transition-colors duration-200",
        active ? "text-primary" : "text-neutral-700 hover:text-neutral-900"
      )}
    >
      <ScrambleText
        text={children}
        className={clsx(
          "transition-colors duration-200",
          active ? "text-primary" : "group-hover:text-neutral-900"
        )}
      />
      <span
        className={clsx(
          "absolute bottom-1 left-3 right-3 h-[1.5px] bg-primary rounded-full origin-left transition-transform duration-300",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
      />
    </Link>
  );
}
