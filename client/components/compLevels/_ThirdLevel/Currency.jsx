import "../../../css/currency.css";
import { useState } from "react";

function Currency() {
  const [currentCurrency, setCurrency] = useState(0);

  return (
    <>
      <div id="currency">
        <img src="../../images/spritesheets/blue_gem.png" alt="blue_gem" />
      </div>
      <div id="currAmount">x {currentCurrency}</div>
    </>
  );
}

export default Currency;
