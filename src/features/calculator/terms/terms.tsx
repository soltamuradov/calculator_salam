import React, { type FC, type PropsWithChildren } from "react";
import Icon from "@ant-design/icons";

import { moonIcon, likeIcon, userIcon, mapIcon, walletIcon, notifyIcon } from "./icons";

import cn from "./terms.module.less";

type TermType = {
  id: number;
  title: string;
  icon: () => React.JSX.Element;
};

const terms: TermType[] = [
  { id: 1, title: "Рассрочка без банка, по принципам Ислама", icon: moonIcon },
  { id: 2, title: "Без штрафов и пеней, не начисляем проценты", icon: likeIcon },
  { id: 3, title: "Рассрочка предоставляется лицам старше 21 г.", icon: userIcon },
  { id: 4, title: "Необходима прописка в Чеченской республике", icon: mapIcon },
  { id: 5, title: "Платежеспособность", icon: walletIcon },
  { id: 6, title: "Уведомление одного из родных", icon: notifyIcon },
] as const;

type Props = {};

const Term: FC<Partial<TermType> & PropsWithChildren> = ({ icon, children }) => {
  return (
    <div className={cn.termWrap}>
      <Icon component={icon} />
      <div>{children}</div>
    </div>
  );
};

const Terms: FC<Props> = () => {
  return (
    <div className={cn.termsWrap}>
      {terms.map((term) => (
        <Term key={term.id} icon={term.icon}>
          {term.title}
        </Term>
      ))}
    </div>
  );
};

export { Terms };
