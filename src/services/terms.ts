import { objectToCamel, type ObjectToSnake } from "ts-case-convert";
import type { AxiosPromise } from "axios";

import { http } from "./base";

type TermType = {
  id: number;
  month: number;
  charge: number;
  minInitialFee: number;
  category: number;
  partner: number;
};

type CategoryTermsType = {
  id: number;
  name: string;
  isDefault: boolean;
  terms: TermType[];
  maxLoanAmount: number;
  minLoanAmount: number;
  maxLoanAmountWithoutInitialFee: number; //Макс.сумма при ПВ === 0
  noGuarantorLoanAmount: number; //сумма при которой не нужен поручитель
  oneGuarantorLoanAmount: number; //сумма при которой нужен один поручитель
  twoGuarantorLoanAmount: number; //сумма при которой нужно два поручителя
  minInitialFee: number; //мин.ПВ в процентах
  minLoanTerm: number;
  maxLoanTerm: number;
};

type PartnerSlugType = {
  slug: string;
  title: string;
  data: CategoryTermsType[];
};

const getCategoryTerms = async (partnerSlug: string): AxiosPromise<CategoryTermsType[]> => {
  try {
    const response = await http.get<ObjectToSnake<PartnerSlugType>>(
      `partners/${partnerSlug}/`
    );
    return {
      ...response,
      data: objectToCamel(response.data.data),
    };
  } catch (errors) {
    throw objectToCamel(errors as any);
  }
};

export { getCategoryTerms, type CategoryTermsType, type TermType };
