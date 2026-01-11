import React, { useState, type FC } from "react";
import { Divider } from "antd";

import Icon from "@ant-design/icons";

import { Select } from "../../../elements/inputs/select/select";
import { useCalculator } from "../../../models/calculatorStore";

import { checkIcon } from "./checkIcon";

import cn from "./category.module.less";

const Category: FC = () => {
  const [open, setOpen] = useState(false);

  const calculator = useCalculator();

  const handleClick = (id: number) => {
    calculator.setActiveCategoryId(id);
    setOpen(false);
  };

  return (
    <Select
      placeholder="Выберите категорию"
      className={cn.categorySelect}
      loading={calculator.isLoading}
      value={calculator.activeCategoryId}
      options={calculator.categories}
      classNames={{ root: cn.categoryPopupWrap }}
      open={open}
      onOpenChange={setOpen}
      popupRender={() => (
        <div className={cn.customPopup} onMouseLeave={() => setOpen(false)}>
          {calculator.categories.map((category, index) => (
            <React.Fragment key={category.label}>
              <div className={cn.categoryWrap} onClick={() => handleClick(category.value)}>
                <div className={cn.categoryTitle}>{category.label}</div>
                {category.value === calculator.activeCategoryId && (
                  <Icon className={cn.categoryIcon} component={checkIcon} />
                )}
              </div>
              {calculator.categories.length - 1 !== index && <Divider />}
            </React.Fragment>
          ))}
        </div>
      )}
    />
  );
};

export { Category };
