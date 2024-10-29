// Block.tsx
import React from "react";
import TextBlock from "./text-block";

interface BlockProps {
  type: string;
  data: any;
}

const BlockMap: { [key: string]: React.ElementType } = {
  text: TextBlock,
};

const Block: React.FC<BlockProps> = ({ type, data }) => {
  const BlockComponent = BlockMap[type];
  return BlockComponent ? (
    <BlockComponent data={data} />
  ) : (
    <div>Unknown block type</div>
  );
};

export default Block;
