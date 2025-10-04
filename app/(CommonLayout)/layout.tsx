import { Container } from "@/components/modules/Container";
import Footer from "@/components/modules/Footer";
import { Navbar } from "@/components/modules/Navbar";
import { siteMetadata } from "../siteMetaData";

const footerMenu = [
  { href: "/blogs", title: "Blogs" },
  { href: "/projects", title: "Projects" },
  { href: "/about", title: "About" },
  { href: "/contact", title: "Contact" },
];

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer
        footerMenu={footerMenu}
        twitter={siteMetadata.twitterUrl}
        github={siteMetadata.github}
        email={siteMetadata.email}
        linkedin={siteMetadata.linkedin}
        copyrights={siteMetadata.author}
      />
    </Container>
  );
};

export default CommonLayout;
