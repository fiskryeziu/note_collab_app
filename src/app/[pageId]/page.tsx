import CustomPagesInput from "@/components/custom-pages/custom-pages-input";
import { getContentByPagesId } from "@/lib/data";
import { PartialBlock } from "@blocknote/core";

export default async function Page({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const pageId = (await params).pageId;
  const content = (await getContentByPagesId(pageId)) as PartialBlock[];
  return (
    <>
      <CustomPagesInput initialContent={content} />
    </>
  );
}
