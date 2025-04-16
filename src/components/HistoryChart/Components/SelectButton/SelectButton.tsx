import { MouseEventHandler, ReactNode } from "react";
import "./SelectButton.scss";

const SelectButton: React.FunctionComponent<{
  selected: boolean;
  onClick: MouseEventHandler<HTMLSpanElement>;
  children: ReactNode;
}> = ({ children, selected, onClick }) => {
  return (
    <span
      onClick={onClick}
      className={`select-button 
    ${selected ? "select-button--active " : ""}`}
    >
      {children}
    </span>
  );
};

export default SelectButton;
