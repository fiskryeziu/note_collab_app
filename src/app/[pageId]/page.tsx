import CustomPagesInput from "@/components/custom-pages/custom-pages-input";
import { getContentByPagesId } from "@/lib/data";

export default async function Page({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const pageId = (await params).pageId;
  const content = await getContentByPagesId(pageId);

  return (
    <>
      <CustomPagesInput initialContent={content} />
    </>
  );
}
