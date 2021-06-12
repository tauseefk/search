import React, { useEffect, useRef } from "react";
import "./styles.scss";

interface IInputBarProps {
  value: string;
  setValue: (value: string) => void;
  captureFocus: boolean;
  placeholder?: string;
  handleOnKeydown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOnClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBar = ({
  value,
  setValue,
  captureFocus = false,
  placeholder,
  handleOnKeydown,
  handleOnClick,
  handleOnChange,
}: IInputBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef?.current && captureFocus) inputRef.current.focus();
  }, [captureFocus]);

  const clearQuery = (e: React.MouseEvent<HTMLInputElement>) => {
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className="input-container">
      <div onClick={() => {}} className={"icon search"}></div>
      <input
        ref={inputRef}
        value={value}
        onClick={handleOnClick}
        onKeyDown={handleOnKeydown}
        onChange={handleOnChange}
        className="input"
        placeholder={placeholder || "Input text..."}
      />
      <div
        onClick={clearQuery}
        className={value.length ? "icon delete" : "hide icon delete"}
      ></div>
    </div>
  );
};
