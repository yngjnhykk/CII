import React, { useState } from "react";
import Controller from "./Controller";

function Simulator() {
  const [inputState, setInputState] = useState({
    shipAccount: "",
    shipType: "Bulk Carrier",
    dwt: "",
    grossTonnage: "",
    totalDistanceTravelled: "",
    dieselGasOilConsumption: "",
    lightFuelOilConsumption: "",
    heavyFuelOilConsumption: "",
    lpgPropaneConsumption: "",
    lpgButaneConsumption: "",
    lngConsumption: "",
    methanolConsumption: "",
    ethanolConsumption: "",
    dataCollectingYear: "2024",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  return (
    <div className="px-6">
      <div className="text-[32px] font-semibold">CII Simulator</div>
      <div className="text-[20px] font-medium mt-8">
        선박운항탄소집약도 시뮬레이터
      </div>
      <div className="text-[16px] font-medium mt-4 text-757575 ">
        Operational carbon intensity indicator simulator
      </div>
      <div className="text-[14px] font-light mt-4 ">
        본 프로그램은 대한민국 국적선사의 CII제도 이행을 돕기위해 MEPC 78차에서
        채택된 결의서(Resolution MEPC 352(78) 등)를 기반으로 제작되었으며, 본
        프로그램의 결과치는 규제 준수 여부를 보장하지 않음을 알립니다.
      </div>

      <Controller
        inputState={inputState}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default Simulator;
