import { Input as AntInput, type InputProps } from "antd";
import type { FC } from "react";
import classNames from "classnames";

import cn from "./input.module.less";

type Props = InputProps;

const Input: FC<Props> = ({ className, ...props }) => (
  <AntInput {...props} className={classNames(cn.input, className)} />
);

export { Input };
