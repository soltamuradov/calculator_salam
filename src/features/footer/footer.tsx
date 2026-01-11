import { observer } from "mobx-react-lite";
import { type FC } from "react";


import logo from "../../assets/logo.png";
import { useCalculator } from "../../models/calculatorStore";

import cn from "./footer.module.less";

const Footer: FC = observer(() => {
  const { phoneNumber } = useCalculator();
  return (
    <div className={cn.footerWrapper}>
      <div className={cn.firstBlock}>
        <div className={cn.logo}>
          <img src={logo} className={cn.logoIcon} />
          <div>
            Salam <br /> Finance
          </div>
        </div>
        <div className={cn.footerInfo}>
          <div className={cn.phone}>{phoneNumber}</div>
          <div className={cn.text}>Ежедневно с 8:00 до 18:00</div>
        </div>
      </div>
    </div>
  );
});

export { Footer };
