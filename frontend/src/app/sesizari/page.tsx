import RootLayout from "../layout";
import PageContent from "./PageContent";

export default function PageMap() {
  return (
    <RootLayout centerItems={false}>
      <PageContent />
    </RootLayout>
  );
}
