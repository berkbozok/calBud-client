import React from "react";

import Navigation from "../../components/Navigation";
import PersonalTrainerList from "../../components/Trainer/PersonalTrainerList";
import CalculateBmi from "../../components/BMI/CalculateBmi";

function Bmi() {
  return (
    <div className="navigation-side">
      <Navigation />
      <CalculateBmi gender={"male"} age={0} />
    </div>
  );
}

export default Bmi;
