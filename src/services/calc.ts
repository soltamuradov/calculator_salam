import { objectToCamel, objectToSnake } from "ts-case-convert";
import type { AxiosPromise } from "axios";

import { http } from "./base";

type ParamsType = {
  surname: string;
  firstName: string;
  telephone: string;
  term: number;
  initialFee: number;
  debtAmount: number;
  costPrice: number;
};

const calc = async (params: ParamsType): AxiosPromise<any> => {
  try {
    const response = await http.post(`calc/`, objectToSnake(params));
    return {
      ...response,
      data: objectToCamel(response.data),
    };
  } catch (errors) {
    throw objectToCamel(errors as any);
  }
};

export { calc as calcService };
