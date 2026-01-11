import type { FC } from "react";

import { Header } from "./features/header/header";
import { Calculator } from "./features/calculator/calculator";
import { Footer } from "./features/footer/footer";
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
        <Footer />
      </div>
    </CalculatorStoreContextProvider>
  );
};

export default App;
