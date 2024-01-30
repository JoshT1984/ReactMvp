import "../../../css/gem_currency.css";
import React from "react";
import { useState } from "react";

const Gem_Currency = ({ currency, updateCurrency }) => {
  const updateCurrencyLocal = (newCurrency) => {
    updateCurrency(newCurrency);
  };
  return (
    <>
      <div id="currency">
        <img src="../../images/spritesheets/blue_gem.png" alt="blue_gem" />
      </div>
      <div id="currAmount">x {currency} </div>;
    </>
  );
};

export default Gem_Currency;
