import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { EmojiCompProps } from "../../types";

const EmojiPicker = ({ show, add }: EmojiCompProps) => {
  return <div>{show && <Picker data={data} onEmojiSelect={add} />}</div>;
};

export default EmojiPicker;
