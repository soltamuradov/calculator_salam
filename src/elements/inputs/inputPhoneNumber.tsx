import { type FC } from "react";
import { PatternFormat } from "react-number-format";
import { Input, type InputProps } from "antd";

type Props = Omit<InputProps, "prefix" | "suffix" | "type" | "value" | "defaultValue"> & {
  suffix?: string;
  prefix?: string;
  type?: "text" | "password" | "tel";
  value?: string | number | null;
  defaultValue?: string | number | null;
};

const InputPhoneNumber: FC<Props> = ({ value, ...props }) => {
  return (
    <PatternFormat
      {...props}
      value={value}
      format="+7 (###) ### ## ##"
      allowEmptyFormatting
      mask="_"
      customInput={Input}
    />
  );
};

export { InputPhoneNumber };
