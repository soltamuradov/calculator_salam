import { observer } from "mobx-react-lite";
import { useState, type FC } from "react";
import { Button } from "antd";
import useNotification from "antd/es/notification/useNotification";

import { useCalculator, type TermType } from "../../models/calculatorStore";
import { SliderCost } from "../../elements/inputs/slider/sliderCost";
import { Slider } from "../../elements/inputs/slider/slider";
import { getPluralText } from "../../lib/getPluralText";
import { formatNumberCurrency } from "../../lib/formatNumberCurrency";

import { SummaryBlock } from "./summaryBlock/summaryBlock";
import { Contacts } from "./contacts/contacts";
import { Category } from "./category/category";
import { ProposalModal } from "./proposalModal/proposalModal";
import { Terms } from "./terms/terms";

import cn from "./calculator.module.less";

const Calculator: FC = observer(() => {
  const [showModal, setShowModal] = useState(false);

  const [api, contextHolder] = useNotification();

  const openNotification = (type: "success" | "error") => {
    api[type]({
      message: type === "success" ? "Заявка отправлена. С вами свяжется наш менеджер." : "Запрос не выполнен",
      placement: "topRight",
    });
  };

  const calc = useCalculator();

  return (
    <div className={cn.calculatorWrapper}>
      {contextHolder}
      <div className={cn.calculatorContentWrapper}>
        <div className={cn.calculatorTitle}>Рассчитайте рассрочку</div>
        <div className={cn.calculatorContent}>
          <div className={cn.leftBlock}>
            <Category />
            <div className={cn.slidersBlock}>
              <SliderCost
                title="Стоимость товара"
                unit={calc.cost > 0 ? " ₽" : undefined}
                min={calc.minMaxAmount[0]}
                max={calc.minMaxAmount[1]}
                value={calc.cost}
                setValue={calc.setCost}
                disabled={calc.disabled}
                tooltip={calc.disabledTooltip}
              />
              <SliderCost
                title="Первоначальный взнос"
                value={calc.initialFee}
                unit={calc.initialFee > 0 ? " ₽" : undefined}
                min={calc.minInitialFeeForMinInput}
                max={calc.cost * 0.9}
                setValue={calc.setInitialFee}
                disabled={calc.disabled}
                tooltip={calc.disabledTooltip}
              />
              <Slider
                title="Срок рассрочки"
                min={calc.minMaxTerm[0]}
                max={calc.minMaxTerm[1]}
                unit={calc.term > 0 ? getPluralText(calc.term, [" месяц", " месяца", " месяцев"]) : undefined}
                value={calc.term}
                setValue={(v) => calc.setTerm(v as TermType)}
                disabled={calc.disabled}
                tooltip={calc.disabledTooltip}
              />
            </div>
          </div>

          <div className={cn.rightBlock}>
            <SummaryBlock />
            <div className={cn.resultInfo}>
              *Поручители: {calc.guarantorsCount}, Максимальная сумма:{" "}
              {formatNumberCurrency(calc.minMaxAmount[1], undefined, "руб,")} Срок: от {calc.minMaxTerm[0]} до{" "}
              {calc.minMaxTerm[1]} месяцев
            </div>
            <Button className={cn.submitBtn} onClick={() => setShowModal(true)}>
              Оформить
            </Button>
          </div>
        </div>
      </div>
      <Terms />
      <Contacts />
      <ProposalModal show={showModal} close={() => setShowModal(false)} openNotification={openNotification} />
    </div>
  );
});

export { Calculator };
