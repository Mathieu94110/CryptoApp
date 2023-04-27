import { MouseEventHandler, ReactNode } from "react";
import "./SelectButton.scss";

const SelectButton = ({
  children,
  selected,
  onClick,
}: {
  children: ReactNode;
  selected: boolean;
  onClick: MouseEventHandler<HTMLSpanElement>;
}) => {
  return (
    <span
      onClick={onClick}
      className={`select-button 
    ${selected ? "select-active " : ""}`}
    >
      {children}
    </span>
  );
};

export default SelectButton;
