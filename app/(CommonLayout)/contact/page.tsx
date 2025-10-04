import ContactForm from "@/components/modules/ContactForm";
import { Container } from "@/components/modules/Container";
import { Heading } from "@/components/modules/Heading";

export default function ContactPage() {
  return (
    <Container className="mt-10 px-3">
      <div className="space-y-6">
        <Heading className="text-left font-bold tracking-tight text-zinc-800 text-4xl  dark:text-zinc-100 sm:text-3xl mr-3">
          Contact
        </Heading>
        <p className="text-left  tracking-tight md:text-zinc-600 dark:text-zinc-400 text-3xl mr-3">
          Get in touch with me. I&#39;m always interested in hearing about new
          opportunities and interesting projects.
        </p>

        <div>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="max-w-4xl mx-auto mt-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
