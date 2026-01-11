import { type FC, useCallback, useMemo, useState } from "react";
import { Slider as AntSlider, Tooltip } from "antd";

import { InputNumberCurrency } from "../inputNumberCurrency";

import cn from "./slider.module.less";

type Props = {
  title: string;
  max?: number;
  min?: number;
  unit?: string;
  value?: number;
  tooltip?: string;
  disabled?: boolean;
  setValue?: (v: number) => void;
};

const SliderCost: FC<Props> = ({ title, max, min, unit, value = 0, disabled, tooltip, setValue }) => {
  const [localValue, setLocalValue] = useState<number>(value);
  const [showMinHint, setShowMinHint] = useState(false);

  if (value !== localValue && !showMinHint) {
    setLocalValue(value);
  }

  const handleSliderChange = useCallback(
    (newValue: number) => {
      if (!setValue) return;

      let roundedValue;
      if (newValue < 100000) {
        roundedValue = Math.round(newValue / 500) * 500;
      } else {
        roundedValue = Math.round(newValue / 1000) * 1000;
      }

      if (min !== undefined) roundedValue = Math.max(roundedValue, min);
      if (max !== undefined) roundedValue = Math.min(roundedValue, max);

      setShowMinHint(false);
      setLocalValue(roundedValue);
      setValue(roundedValue);
    },
    [setValue, min, max]
  );

  const handleInputChange = useCallback(
    (v: number | null) => {
      const num = (v as number) ?? 0;
      setLocalValue(num);

      if (min !== undefined && num < min) {
        setShowMinHint(true);
        return;
      }
      if (max !== undefined && num > max) {
        setShowMinHint(true);
        return;
      }

      setShowMinHint(false);
      setValue?.(num);
    },
    [setValue, min, max]
  );

  const handleInputBlur = useCallback(() => {
    if (!setValue || min === undefined) return;

    if (localValue < min) {
      setLocalValue(min);
      setShowMinHint(false);
      setValue(min);
    }

    if (!setValue || max === undefined) return;
    if (localValue > max) {
      setLocalValue(max);
      setShowMinHint(false);
      setValue(max);
    }
  }, [localValue, min, max, setValue]);

  const currentStep = (value || 0) < 100000 ? 500 : 1000;

  const tootlipForInput = useMemo(() => {
    if (!showMinHint && !tooltip) return undefined;
    if (min !== undefined && localValue < min) {
      return `Минимум: ${min.toLocaleString("ru-RU")} ${unit}`;
    }
    if (max !== undefined && localValue > max) {
      return `Максимум: ${max.toLocaleString("ru-RU")} ${unit}`;
    }
    return tooltip;
  }, [showMinHint, tooltip, min, max]);

  return (
    <div className={cn.slider}>
      <div className={cn.sliderTitleWrapper}>
        <div className={cn.sliderTitle}>{title}</div>
        <Tooltip open={!!tootlipForInput} title={tootlipForInput}>
          {" "}
          <InputNumberCurrency
            className={cn.sliderTitleValue}
            suffix={unit}
            value={localValue}
            min={min}
            onChange={(v) => handleInputChange(v as number | null)}
            onBlur={handleInputBlur}
            disabled={disabled}
          />
        </Tooltip>
      </div>
      <Tooltip title={tooltip}>
        {' '}
        <AntSlider
          className={cn.antSlider}
          onChange={handleSliderChange}
          max={max}
          min={min}
          value={value}
          step={currentStep}
          tooltip={{ open: false }}
          disabled={disabled}
        />
      </Tooltip>
    </div>
  );
};

export { SliderCost };
