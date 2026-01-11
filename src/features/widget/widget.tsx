import { type FC } from "react";

import cn from "./widget.module.less";

import phones from "../../assets/phones.png";
import gamepad from "../../assets/gamepad.png";
import stroi1 from "../../assets/stroi1.png";
import stroi2 from "../../assets/stroi2.png";
import robot from "../../assets/robot.png";

const Widget: FC = () => {
  return (
    <div className={cn.widget}>
      <div className={cn.firstBlock}>
        <div>Смартфоны</div>
        <div>
          <img className={cn.phones} src={phones} />
          <img className={cn.gamepad} src={gamepad} />
        </div>
      </div>
      <div className={cn.secondBlock}>
        <div className={cn.subBlock}>
          <div>Стройматериалы</div>
          <div>
            <img src={stroi1} className={cn.stroi1} />
            <img src={stroi2} className={cn.stroi2} />
          </div>
        </div>
        <div className={cn.subBlock}>
          <div>Бытовая электроника</div>
          <img src={robot} className={cn.robot} />
        </div>
      </div>
    </div>
  );
};

export { Widget };
