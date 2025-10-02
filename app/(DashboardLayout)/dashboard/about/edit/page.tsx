import AboutForm from "@/components/modules/dashboard/AboutForm";
import { getAbout } from "@/services/About";

export default async function EditAboutPage() {
  const about = await getAbout();

  return <AboutForm about={about?.data} />;
}
