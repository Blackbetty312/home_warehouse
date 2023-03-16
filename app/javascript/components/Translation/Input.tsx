import React, { useState } from "react";

interface InputProps {
    placeholder: string,
    inputText: string,
    onEnter: (newVal: string) => void
  }
  

const Input = (props: InputProps) => {
  const [inputText, setInputText] = useState(props.inputText);

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      props.onEnter(inputText);
    }
  };

  return (
    <input
      className="w-full text-gray-900"
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
    //   onBlur={() => props.onEnter(inputText)}
      onKeyPress={handleKeypress}
      placeholder={props.placeholder}
      autoFocus
    ></input>
  );
};

export default Input;
