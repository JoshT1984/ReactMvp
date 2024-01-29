import "../../../css/ui_bar.css";
import Lives from "../_ThirdLevel/Lives.jsx";
import Currency from "../_ThirdLevel/Currency.jsx";
import Score from "../_ThirdLevel/Score.jsx";

function UI_BAR() {

  return (
    <div id="UI_Bar">
      <Lives />
      <Score />
      <Currency />
    </div>
  );
}

export default UI_BAR;
