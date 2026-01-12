import { type FC, type PropsWithChildren } from "react";

import styles from "../calculator.module.less";

import cn from "./terms.module.less";

type TermType = {
  id: number;
  title: string;
};

const terms: TermType[] = [
  { id: 1, title: "Наличие паспорта" },
  { id: 2, title: "Поручитель" },
  { id: 3, title: "Прописка по ЧР" },
  { id: 4, title: "Гибкий взнос" },
  { id: 5, title: "Возраст от 20 лет" },
] as const;

type Props = {};

const Term: FC<Partial<TermType> & PropsWithChildren> = ({ children }) => {
  return (
    <div className={cn.termWrap}>
      <div>{children}</div>
    </div>
  );
};

const Terms: FC<Props> = () => {
  return (
    <div className={cn.termsWrap}>
      <div className={styles.calculatorTitle}>Условия</div>
      <div className={cn.terms}>
        {terms.map((term) => (
          <Term key={term.id}>{term.title}</Term>
        ))}
      </div>
    </div>
  );
};

export { Terms };
