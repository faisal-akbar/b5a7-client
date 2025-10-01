import GithubIcon from "../../icons/github-icon";
import TwitterIcon from "../../icons/twitter-icon";

import LinkedinIcon from "../../icons/linkedin-icon";

import siteMetadata from "@/app/siteMetaData";
import Link from "next/link";
import MailIcon from "../../icons/mail-icon";

const FooterMenu = ({
  footerMenu,
}: {
  footerMenu: { title: string; href: string }[];
}) => {
  const menu = footerMenu.slice(0);

  return menu.map((menuItem, index) => (
    <li
      className="inline-block cursor-pointer whitespace-nowrap break-words
      bg-transparent leading-6 text-base"
      key={index}
    >
      <Link
        href={menuItem.href}
        className="hover:underline hover:underline-offset-1 focus:outline-offset-2"
      >
        {menuItem.title}
      </Link>
    </li>
  ));
};

function Footer({
  footerMenu,
  twitter,
  github,
  email,
  linkedin,
  copyrights,
}: {
  footerMenu: { title: string; href: string }[];
  twitter?: string;
  github?: string;
  email?: string;
  linkedin?: string;
  copyrights?: string;
}) {
  return (
    <footer
      id="footer"
      className="mt-7 flex flex-wrap justify-between break-words  border-t border-solid border-zinc-300 px-2 pt-4 leading-6 text-neutral-900 text-base focus:outline-offset-2 dark:border-zinc-500 dark:text-neutral-300"
    >
      <ul className="flex flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <FooterMenu footerMenu={footerMenu} />
      </ul>
      <ul className="flex flex-col space-x-0 space-y-5 sm:flex-row sm:space-x-4 sm:space-y-0">
        {linkedin && (
          <li className="">
            <a
              href={linkedin}
              rel="nofollow"
              className="flex items-center gap-2"
            >
              <LinkedinIcon className="h-5 w-5 fill-neutral-900 dark:fill-neutral-300" />
              <span className="block sm:hidden">Linkedin</span>
            </a>
          </li>
        )}
        {github && (
          <li className="">
            <a href={github} rel="nofollow" className="flex items-center gap-2">
              <GithubIcon className="h-5 w-5 fill-neutral-900 dark:fill-neutral-300" />
              <span className="block sm:hidden">GitHub</span>
            </a>
          </li>
        )}

        {twitter && (
          <li className="">
            <a
              href={twitter}
              rel="nofollow"
              className="flex items-center gap-2"
            >
              <TwitterIcon className="h-5 w-5 fill-neutral-900 dark:fill-neutral-300" />
              <span className="block sm:hidden">Twitter</span>
            </a>
          </li>
        )}

        {email && (
          <li className="">
            <a
              href={`mailto:${siteMetadata.email}`}
              rel="nofollow"
              className="flex items-center gap-2"
            >
              <MailIcon className="h-5 w-5 fill-neutral-900 dark:fill-neutral-300" />
              <span className="block sm:hidden">Email</span>
            </a>
          </li>
        )}
      </ul>
      {copyrights && (
        <div className="my-6 w-full space-x-1 leading-5 text-sm focus:outline-offset-2">
          <span>&copy; {new Date().getFullYear()}</span>
          <a
            href="#"
            className="cursor-pointer break-words bg-transparent underline hover:outline-0 focus:outline-offset-2"
          >
            {copyrights}
          </a>
          .<br className="break-words focus:outline-offset-2" />
          Built in Queens, New York.
        </div>
      )}
    </footer>
  );
}

export default Footer;
