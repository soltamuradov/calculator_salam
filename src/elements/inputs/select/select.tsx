import { type SelectProps, Select as AntSelect } from "antd";
import classNames from "classnames";
import type { FC } from "react";

import cn from "./select.module.less";

const SuffixIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 12L16 20L24 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type Props = SelectProps;

const Select: FC<Props> = ({ className, ...props }) => {
  return <AntSelect {...props} className={classNames(cn.defaultClass, className)} suffixIcon={<SuffixIcon/>} />;
};

export { Select };
