// this component is used to create a collapse component
// recive the childrens who are the ones that will be collapsed

import { ReactNode } from "react";
import { useCollapse } from "react-collapsed";

interface IProps {
  children: ReactNode;
  isOpen: boolean;
}

const Collapse = ({ children, isOpen }: IProps) => {
  const { getCollapseProps, getToggleProps } = useCollapse({
    isExpanded: isOpen,
  });

  return (
    <div>
      <div {...getCollapseProps()}>{children}</div>
    </div>
  );
};

export default Collapse;
