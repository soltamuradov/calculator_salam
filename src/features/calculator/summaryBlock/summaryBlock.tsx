import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { type FC } from "react";
import { Divider } from "antd";

import cn from "./summaryBlock.module.less";

import { useCalculator } from "../../../models/calculatorStore";
import { formatNumberCurrency } from "../../../lib/formatNumberCurrency";

const SummaryBlock: FC = observer(() => {
  const { debtAmount, monthMargin, monthsFee } = useCalculator();
  return (
    <div className={cn.summaryWrapper}>
      <div className={cn.summaryItem}>
        <div className={cn.title}>Ежемесячный платеж</div>
        <div className={cn.value}>{formatNumberCurrency(monthsFee, undefined, "₽")}</div>
      </div>
      <Divider />
      <div className={cn.summaryItem}>
        <div className={cn.title}>Торговая наценка в месяц</div>
        <div className={cn.value}>{formatNumberCurrency(monthMargin, undefined, "₽")}</div>
      </div>
      <Divider />
      <div className={cn.summaryItem}>
        <div className={cn.title}>Всего</div>
        <div className={classNames(cn.value, cn.sumValue)}>
          {formatNumberCurrency(debtAmount, undefined, "₽")}
        </div>
      </div>
    </div>
  );
});

export { SummaryBlock };
