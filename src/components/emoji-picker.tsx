import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { EmojiCompProps } from "../../types";

const EmojiPicker = ({ show, add, setShow }: EmojiCompProps) => {
  return (
    <div className="absolute z-50">
      {show && (
        <Picker
          data={data}
          onEmojiSelect={add}
          onClickOutside={() => setShow(false)}
        />
      )}
    </div>
  );
};

export default EmojiPicker;
