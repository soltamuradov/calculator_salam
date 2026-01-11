import { observer } from "mobx-react-lite";
import { type FC } from "react";
import Icon from "@ant-design/icons";

import logo from "../../assets/logo.png";
import { useCalculator } from "../../models/calculatorStore";
import { callIcon } from "../../icons";

import cn from "./header.module.less";

const Header: FC = observer(() => {
  const { phoneNumber } = useCalculator();
  return (
    <div className={cn.headerWrapper}>
      <div className={cn.logo}>
        <img src={logo} className={cn.logoIcon} />
      </div>
        <div className={cn.nav}>
          <a href="#">Рассчитать</a>
          <a href="#">Условия</a>
          <a href="#">Контакты</a>
        </div>
      <a className={cn.callIcon} href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`} target="_blank">
        <Icon component={callIcon} />
      </a>
    </div>
  );
});

export { Header };
