import { type FC } from "react";
import { Button } from "antd";

import cn from "./widget.module.less";

import phones from "../../assets/phones.png";
import gamepad from "../../assets/gamepad.png";
import robot from "../../assets/robot.png";
import stroy from "../../assets/stroy.png";

const Widget: FC = () => {
  return (
    <div className={cn.widgetWrapper}>
      <div className={cn.textBlock}>
        <div className={cn.title}>SALAM -</div>
        <div className={cn.text}>
          Быстрое и удобное <br /> оформление рассрочки
        </div>
        <Button onClick={() => (location.href = "#calculator")} className={cn.button}>
          Рассчитать рассрочку
        </Button>
      </div>
      <div className={cn.widget}>
        <div className={cn.firstBlock}>
          <div>Смартфоны</div>
          <div>
            <div className={cn.phones}>
              <img src={phones} />
            </div>
            <div className={cn.gamepad}>
              <img src={gamepad} />
            </div>
          </div>
        </div>
        <div className={cn.secondBlock}>
          <div className={cn.subBlock}>
            <div>Стройматериалы</div>
            <div className={cn.stroy}>
              <img src={stroy} />
            </div>
          </div>
          <div className={cn.subBlock}>
            <div>Бытовая электроника</div>
            <div className={cn.robot}>
              <img src={robot} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Widget };
