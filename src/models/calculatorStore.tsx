import { createContext, type FC, type ReactNode, useContext, useMemo } from "react";
import { action, computed, makeObservable, observable, reaction, runInAction } from "mobx";

import { type CategoryTermsType, getCategoryTerms } from "../services/terms";

const TERM_COUNTS: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
] as const;

const CONTACTS_INFO = {
  phoneNumber: "+7 (960) 440-26-56",
  address: "улица Вахи Алиева, 12Б, Грозный",
} as const;

type TariffKeysType = "light" | "small" | "medium" | "large";

type valueOf<T> = T[keyof T];

const TARIFFS: Record<
  TariffKeysType,
  { guarantor: number; maxCount: number; term: [number, number]; withoutFee: boolean }
> = {
  light: { guarantor: 0, maxCount: 50_000, term: [3, 12], withoutFee: true },
  small: { guarantor: 1, maxCount: 100_000, term: [3, 12], withoutFee: true },
  medium: { guarantor: 1, maxCount: 200_000, term: [3, 12], withoutFee: false },
  large: { guarantor: 2, maxCount: 1_000_000, term: [3, 12], withoutFee: false },
};

type TermType = (typeof TERM_COUNTS)[number];

const percentToValue = (n: number) => n / 100;

class CalculatorStore {
  public data?: CategoryTermsType[];
  public activeCategoryId?: number;

  public cost: number = 0; //Стоимость товара
  public initialFee: number = 0; //Первоначальный взнос
  public term: TermType = 3; //Срок рассрочки

  constructor() {
    makeObservable(this, {
      activeCategoryId: observable,
      initialFee: observable,
      data: observable,
      cost: observable,
      term: observable,
      minMaxTerm: computed,
      category: computed,
      disabled: computed,
      isLoading: computed,
      monthsFee: computed,
      withoutFee: computed,
      debtAmount: computed,
      categories: computed,
      monthMargin: computed,
      minMaxAmount: computed,
      activeTariff: computed,
      minInitialFee: computed,
      activeTariffKey: computed,
      disabledTooltip: computed,
      monthCoefficient: computed,
      guarantorsCount: computed,
      minInitialFeeForMinInput: computed,
      isCostAboveMaxLoanAmountWithoutInitialFee: computed,
      setActiveCategoryId: action,
      setInitialFee: action,
      setCost: action,
      setTerm: action,
      setData: action,
    });

    this.getData();

    reaction(
      () => [this.cost, this.term],
      () => this.setMinInitialFee()
    );
  }

  public getData = () => {
    const slug = location.pathname.slice(1) || "default";
    getCategoryTerms(slug).then(({ data }) => {
      this.setData(data);
      const categoryDefault = data.find((el) => el.isDefault);
      if (categoryDefault !== undefined) {
        this.setActiveCategoryId(categoryDefault.id);
        this.setMinInitialFee();
        this.setCost(categoryDefault.minLoanAmount);
      }
    });
  };

  public get guarantorsCount(): number | string {
    if (!this.category) return "Без поручителя";
    const { twoGuarantorLoanAmount, oneGuarantorLoanAmount } = this.category;
    if (this.cost < oneGuarantorLoanAmount) return "Без поручителя";
    if (this.cost >= oneGuarantorLoanAmount && this.cost < twoGuarantorLoanAmount) return 1;
    return this.cost >= twoGuarantorLoanAmount ? 2 : "Без поручителя";
  }

  public get phoneNumber() {
    return CONTACTS_INFO.phoneNumber;
  }

  public get address() {
    return CONTACTS_INFO.address;
  }

  public get disabled() {
    return !this.activeCategoryId || this.data?.find((el) => el.id === this.activeCategoryId)?.terms.length === 0;
  }

  public get disabledTooltip(): string | undefined {
    if (!this.activeCategoryId) return "Не подгружены данные или возможно не выбрана категория по умолчанию";
    if (this.data?.find((el) => el.id === this.activeCategoryId)?.terms.length === 0) {
      return "Не подгружены данные, не заполнены данные по месяцам";
    }
    return undefined;
  }

  private setMinInitialFee = () => {
    this.setInitialFee(Math.round(this.cost * percentToValue(this.minInitialFee)));
  };

  public get category() {
    if (!this.data) return;
    if (!this.activeCategoryId) return this.data[0];
    return this.at(this.activeCategoryId);
  }

  public get minMaxAmount(): [min: number, max: number] {
    const max = this.category?.maxLoanAmount ?? 1_000_000;
    const min = this.category?.minLoanAmount ?? 3000;
    return [min, max];
  }

  public get minMaxTerm(): [min: number, max: number] {
    const max = this.category?.maxLoanTerm ?? 3;
    const min = this.category?.minLoanTerm ?? 12;
    return [min, max];
  }

  public get activeTariffKey(): TariffKeysType {
    if (this.cost <= 50_000) {
      return "light";
    } else if (this.cost > 50_000 && this.cost <= 100_000) {
      return "small";
    } else if (this.cost > 100_000 && this.cost <= 200_000) {
      return "medium";
    } else if (this.cost > 200_000) {
      return "large";
    }
    return "large";
  }

  public get activeTariff(): valueOf<typeof TARIFFS> {
    return TARIFFS[this.activeTariffKey];
  }

  public setData = (v: CategoryTermsType[]) => {
    this.data = v;
  };

  public get categories() {
    return (this.data ?? []).map(({ id: value, name: label }) => ({
      value,
      label,
    }));
  }

  public get isLoading() {
    return this.data === undefined;
  }

  //процент минимального ПВ
  public get minInitialFee() {
    if (this.data === undefined || this.activeCategoryId === undefined) return 0;
    const item = this.data.find((el) => el.id === this.activeCategoryId);
    if (item === undefined) return 0;
    return item.terms.find((el) => el.month === this.term)?.minInitialFee ?? 0;
  }

  public get monthCoefficient() {
    if (!this.data) return;
    const activeCategoryId = this.activeCategoryId ?? this.data[0].id;
    return CalculatorStore.formatData(this.at(activeCategoryId));
  }

  static formatData = (data: CategoryTermsType | undefined) => {
    const coefficientMap = new Map<TermType, number>();
    for (const item of data?.terms ?? []) {
      if (TERM_COUNTS.includes(item.month as TermType)) {
        coefficientMap.set(item.month as TermType, item.charge);
        // coefficientMap.set(item.month as TermType, isInitialFee ? item.chargeWithInitialFee : item.charge);
      }
    }
    return coefficientMap;
  };

  public at = (id: number) => {
    if (!this.data) return;
    return this.data.find((el) => el.id === id);
  };

  //Общая сумма рассрочки
  public get debtAmount() {
    const { cost, initialFee, term } = this;
    if (!this.monthCoefficient) return 0;
    const coefficient = this.monthCoefficient.get(term) ?? 1;
    const charge = percentToValue(coefficient);
    return Math.round(charge * (cost - initialFee) + cost);
  }

  //Ежемесячный платеж
  public get monthsFee() {
    return Math.round((this.debtAmount - this.initialFee) / this.term);
  }

  //Торговая наценка
  public get monthMargin() {
    return Math.round((this.debtAmount - this.cost) / this.term);
  }

  public get withoutFee() {
    return this.initialFee === 0;
  }

  public get isCostAboveMaxLoanAmountWithoutInitialFee() {
    return this.cost >= (this.category?.maxLoanAmountWithoutInitialFee ?? 0);
  }

  public get minInitialFeeForMinInput() {
    return percentToValue(this.isCostAboveMaxLoanAmountWithoutInitialFee ? this.minInitialFee : 0) * this.cost;
  }

  public setCost = (v: number) => {
    this.cost = v;
  };

  public setInitialFee = (v: number) => {
    this.initialFee = v;
  };
  public setTerm = (v: TermType) => {
    this.term = v;
  };

  public setActiveCategoryId = (id: number) => {
    this.activeCategoryId = id;
    this.clearData();
  };

  private clearData = () => {
    runInAction(() => {
      this.cost = this.minMaxAmount[0];
      this.initialFee = 0;
      this.term = 3;
    });
  };
}

const CalculatorStoreContext = createContext<{ calculator: CalculatorStore } | null>(null);

const useCalculator = () => {
  const context = useContext(CalculatorStoreContext);
  console.assert(!!context, "Использование контекста вне контекста");
  return context!.calculator;
};

const CalculatorStoreContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const calculator = useMemo(() => new CalculatorStore(), []);
  return <CalculatorStoreContext.Provider value={{ calculator }}>{children}</CalculatorStoreContext.Provider>;
};

export { CalculatorStoreContextProvider, useCalculator, CalculatorStore, type TermType };
