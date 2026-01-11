import { Input, type InputProps } from "antd";
import type { FC } from "react";
import { NumericFormat } from "react-number-format";

type Props = Omit<InputProps, "prefix" | "suffix" | "type" | "value" | "defaultValue" | "onChange"> & {
  suffix?: string;
  prefix?: string;
  type?: "text" | "password" | "tel";
  value?: string | number | null;
  defaultValue?: string | number | null;
  onChange?: (v: number | null) => void;
};

const InputNumberCurrency: FC<Props> = ({ value, onChange, ...props }) => {
  return (
    <NumericFormat
      customInput={Input}
      thousandSeparator=" "
      decimalSeparator=","
      decimalScale={0}
      suffix={props.suffix ?? " руб."}
      allowNegative={false}
      valueIsNumericString={true}
      onValueChange={(values, sourceInfo) => {
        if (sourceInfo.source === "event") {
          onChange?.(values.floatValue ?? null);
        }
      }}
      value={value}
      {...props}
    />
  );
};

export { InputNumberCurrency };
