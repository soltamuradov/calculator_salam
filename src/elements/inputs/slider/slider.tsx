import { type FC } from "react";
import { Slider as AntSlider, Tooltip } from "antd";

import { InputNumberCurrency } from "../inputNumberCurrency";

import cn from "./slider.module.less";

type Props = {
  title: string;
  infoBlockClassName?: string;
  sliderClassName?: string;
  max?: number;
  min?: number;
  unit?: string;
  value?: number;
  setValue?: (v: number) => void;
  tooltip?: string;
  disabled?: boolean;
};

const Slider: FC<Props> = ({ title, max, min, unit, value = 0, disabled, tooltip, setValue }) => {
  return (
    <div className={cn.slider}>
      <div className={cn.sliderTitleWrapper}>
        <div className={cn.sliderTitle}>{title}</div>
        <Tooltip title={tooltip}>
          {' '}
          <InputNumberCurrency
            className={cn.sliderTitleValue}
            suffix={unit}
            value={value}
            readOnly
            disabled={disabled}
          />
        </Tooltip>
      </div>
      <Tooltip title={tooltip}>
        {' '}
        <AntSlider onChange={setValue} max={max} min={min} tooltip={{ open: false }} disabled={disabled} />
      </Tooltip>
    </div>
  );
};

export { Slider };
