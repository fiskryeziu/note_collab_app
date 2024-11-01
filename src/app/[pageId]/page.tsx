import CustomPagesInput from "@/components/custom-pages/custom-pages-input";

export default async function Page({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;
  console.log(pageId);
  return (
    <>
      {/*
       * InputPages will have props which based on the id will
       * get the data
       */}

      <CustomPagesInput />
    </>
  );
}
