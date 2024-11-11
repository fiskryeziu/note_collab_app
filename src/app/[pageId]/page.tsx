import CustomPagesInput from "@/components/custom-pages/custom-pages-input";
import { PartialBlock } from "@blocknote/core";

/*
 NOTE:: the type  how's gonna look the data. 
 right know using type TResContentPage
  type PartialBlock = {
  id?: string;
  type?: string;
  props?: Partial<Record<string, any>>; // exact type depends on "type"
  content?: string | InlineContent[] | TableContent;
  children?: PartialBlock[];
}; 
*/

type ContentItem = {
  type: string;
  content: string;
};

type TResContentPage = {
  id: string;
  title: string;
  cover: string;
  data: ContentItem[];
};
export default async function Page({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const pageId = (await params).pageId;

  const response = await fetch("http://localhost:3001/page-content", {
    cache: "no-store",
  });
  const data = (await response.json()) as TResContentPage[];

  const pageContent = data.filter((x) => x.id === pageId).map((x) => x.data)[0];

  // WARNING: carefull of the typing for the data you get.

  // FIX:: typing of initialContent because it will be dynamic
  //  it can hold table, heading, ordered list etc...

  // NOTE: on drag & drop rearrange of the elems,
  // the type will change in most cases and for that we'll use the PartialBlock type
  <>
  return (
      <CustomPagesInput initialContent={pageContent} />
    </>
  );
}
