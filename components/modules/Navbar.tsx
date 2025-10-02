"use client";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { Container } from "./Container";

import { protectedRoutes } from "@/constants";
import { useUser } from "@/context/UserContext";
import { CloseIcon, HamburgerIcon } from "@/icons/general";
import { cn } from "@/lib/utils";
import { logout } from "@/services/AuthService";
import { IUser } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../Logo";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";

const items = [
  {
    title: "Blogs",
    href: "/blogs",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const Navbar = () => {
  const { user, setUser, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    setUser(null);
    setIsLoading(false);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <Container as="nav" className="">
      {/* <FloatingNav items={items} /> */}
      <DesktopNav items={items} user={user} handleLogOut={handleLogOut} />
      <MobileNav items={items} user={user} handleLogOut={handleLogOut} />
    </Container>
  );
};

const MobileNav = ({
  items,
  user,
  handleLogOut,
}: {
  items: { title: string; href: string }[];
  user: IUser | null;
  handleLogOut: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="relative flex items-center justify-between p-2 md:hidden">
      <Link href="/">
        <Logo />
      </Link>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="shadow-sm hover:shadow-md transition-shadow flex size-6 flex-col items-center justify-center rounded-md"
        aria-label="Toggle menu"
      >
        <HamburgerIcon className="size-4 shrink-0 text-gray-600" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] h-full w-full bg-white shadow-lg dark:bg-neutral-900"
          >
            <div className="absolute right-4 bottom-4">
              <ModeToggle />
            </div>

            <div className="flex items-center justify-between p-2">
              <Logo />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="shadow-aceternity flex size-6 flex-col items-center justify-center rounded-md"
                aria-label="Toggle menu"
              >
                <CloseIcon className="size-4 shrink-0 text-gray-600" />
              </button>
            </div>
            <div className="divide-divide border-divide mt-6 flex flex-col divide-y border-t">
              {items.map((item, index) => (
                <Link
                  href={item.href}
                  key={item.title}
                  className="px-4 py-2 font-medium text-gray-600 transition duration-200 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-neutral-300"
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                  >
                    {item.title}
                  </motion.div>
                </Link>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: items.length * 0.1 }}
              ></motion.div>

              <div className="mt-4 p-4 space-y-3">
                {user && (
                  <Button asChild className="w-full" variant={"outline"}>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                )}
                {user ? (
                  <Button onClick={handleLogOut} className="w-full">
                    Logout
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                    <Link href="/login">Login</Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DesktopNav = ({
  items,
  user,
  handleLogOut,
}: {
  items: { title: string; href: string }[];
  user: IUser | null;
  handleLogOut: () => void;
}) => {
  const pathname = usePathname();

  return (
    <div className="hidden items-center justify-between px-4 py-4 md:flex">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex items-center gap-10">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              className={cn(
                "font-medium transition duration-200 px-3 py-2 rounded-md",
                "text-gray-600 hover:text-neutral-900 hover:bg-gray-100",
                "dark:text-gray-300 dark:hover:text-neutral-300 dark:hover:bg-neutral-800",
                isActive &&
                  "bg-gray-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-300"
              )}
              href={item.href}
              key={item.title}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        {user && (
          <Button asChild variant={"outline"}>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        )}
        {user ? (
          <Button onClick={handleLogOut}>Logout</Button>
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

// const FloatingNav = ({
//   items,
// }: {
//   items: { title: string; href: string }[];
// }) => {
//   const { scrollY } = useScroll();
//   const springConfig = {
//     stiffness: 300,
//     damping: 30,
//   };
//   const y = useSpring(
//     useTransform(scrollY, [100, 120], [-100, 10]),
//     springConfig,
//   );
//   return (
//     <motion.div
//       style={{ y }}
//       className="shadow-aceternity fixed inset-x-0 top-0 z-50 mx-auto hidden max-w-[calc(80rem-4rem)] items-center justify-between bg-white/80 px-2 py-2 backdrop-blur-sm md:flex xl:rounded-2xl dark:bg-neutral-900/80 dark:shadow-[0px_2px_0px_0px_var(--color-neutral-800),0px_-2px_0px_0px_var(--color-neutral-800)]"
//     >
//       <Logo />
//       <div className="flex items-center gap-10">
//         {items.map((item) => (
//           <Link
//             className="font-medium text-gray-600 transition duration-200 hover:text-neutral-900 dark:text-gray-300 dark:hover:text-neutral-300"
//             href={item.href}
//             key={item.title}
//           >
//             {item.title}
//           </Link>
//         ))}
//       </div>
//       <div className="flex items-center gap-2">
//         <ModeToggle />
//         <Button asChild>
//           <Link href="/login">
//             Login
//           </Link>
//         </Button>
//       </div>
//     </motion.div>
//   );
// };
