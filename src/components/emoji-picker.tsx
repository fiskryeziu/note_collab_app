import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { EmojiCompProps } from "../../types";

const EmojiPicker = ({ toggle, show, add, value }: EmojiCompProps) => {
  return (
    <div>
      <button onClick={toggle}>{show ? "Close Picker" : "Open Picker"}</button>
      {show && <Picker data={data} onEmojiSelect={add} />}
      <h1 className="text-7xl">{value}</h1>
    </div>
  );
};

export default EmojiPicker;
