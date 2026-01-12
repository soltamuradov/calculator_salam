import type { FC } from "react";

import { Header } from "./features/header/header";
import { Calculator } from "./features/calculator/calculator";
import { Widget } from "./features/widget/widget";
import { CalculatorStoreContextProvider } from "./models/calculatorStore";

import "./app.less";

const App: FC = () => {
  return (
    <CalculatorStoreContextProvider>
      <div className="app">
        <Header />
        <Widget/>
        <Calculator />
      </div>
    </CalculatorStoreContextProvider>
  );
};

export default App;
