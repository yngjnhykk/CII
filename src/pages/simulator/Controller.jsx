import React, { useEffect, useMemo, useState } from "react";
import Chart from "../shipManagment/Chart";
import { useMutation } from "react-query";
import { postInputDataAPI } from "../../api/api";

function Controller({ inputState, handleInputChange }) {
  const [resultData, setResultData] = useState(null);
  const [chartData, setChartData] = useState([]);

  // state 가공
  const inputData = useMemo(
    () => ({
      ship_type: inputState.shipType,
      summer_load_dwt: +inputState.dwt,
      gross_tonnage: +inputState.grossTonnage,
      total_distance_travelled: +inputState.totalDistanceTravelled,
      reduction_factor: +inputState.dataCollectingYear,
      fuels: {
        diesel_gas_oil_consumption: +inputState.dieselGasOilConsumption,
        light_fuel_oil_consumption: +inputState.lightFuelOilConsumption,
        heavy_fuel_oil_consumption: +inputState.heavyFuelOilConsumption,

        lpg_propane_consumption: +inputState.lpgPropaneConsumption,
        lpg_butane_consumption: +inputState.lpgButaneConsumption,
        lng_consumption: +inputState.lngConsumption,
        methanol_consumption: +inputState.methanolConsumption,
        ethanol_consumption: +inputState.ethanolConsumption,
      },
    }),
    [inputState]
  );

  // CII 연산
  const simulateCii = useMutation((data) => postInputDataAPI(data), {
    onSuccess: (data) => {
      console.log(`cii 연산 결과입니다.`);
      console.log(data);
      setResultData(data);
      setChartData(data.chartData);
    },
  });

  useEffect(() => {
    console.log("inputData 변경");
    simulateCii.mutate(inputData);
  }, [inputData]);

  return (
    <div className="border-[1px] border-CDCDCD rounded w-full mt-10 px-10 py-10">
      <div className="w-full flex gap-16">
        <div className="w-1/2">
          <div className="text-[24px] font-semibold">CII Controller</div>
          <div className="text-[14px] font-light text-757575">
            실제 데이터가 아닌 사용자가 임의로 데이터를 조작하여 cii 결과값을 볼
            수 있습니다.
          </div>
        </div>
        {/* Ship Account */}
        <div className="w-1/2 flex gap-4">
          <div className="w-2/6">
            <div className="font-light text-[14px] mb-1">Ship Account</div>
            <select
              className="w-[100%] border py-1 text-center rounded border-3B82F6"
              name="shipAccount"
              value={inputState.shipAccount}
              onChange={handleInputChange}
            >
              <option value=""></option>
            </select>
          </div>
          {/* IMO DCS 정보수집연도(Data collecting year) */}
          <div className="w-4/6">
            <div className="font-light text-[14px] mb-1">
              IMO DCS 정보수집연도(Data collecting year)
            </div>
            <select
              className="w-[100%] border py-1 text-center rounded border-3B82F6"
              name="dataCollectingYear"
              value={inputState.dataCollectingYear}
              onChange={handleInputChange}
            >
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-12">
        {/* 1, 2 */}
        <div className="w-[100%] flex gap-16">
          <div className="w-[50%]">
            {/* 1. 선박 기본 정보 */}
            <div>
              <div className="text-[16px] mb-[38px]">1. 선박 기본 정보</div>
              <div className="flex flex-col gap-7">
                {/* Ship Type */}
                <div className="flex items-center">
                  <div className="w-[50%] text-[14px] font-medium">
                    Ship Type
                  </div>
                  <div className="w-[50%] font-light">
                    <select
                      className="w-[100%] border py-1 text-center rounded border-3B82F6"
                      name="shipType"
                      value={inputState.shipType}
                      onChange={handleInputChange}
                    >
                      <option value="Bulk Carrier">Bulk Carrier</option>
                      <option value="Gas Carrier">Gas Carrier</option>
                      <option value="Tanker">Tanker</option>
                      <option value="Container Ship">Container Ship</option>
                      <option value="General Cargo Ship">
                        General Cargo Ship
                      </option>
                      <option value="Refrigerated Carrier">
                        Refrigerated Carrier
                      </option>
                      <option value="Combination Carrier">
                        Combination Carrier
                      </option>
                      <option value="LNG Carrier">LNG Carrier</option>
                      <option value="Ro-Ro Cargo Ship (Vehicle Carrier)">
                        Ro-Ro Cargo Ship (Vehicle Carrier)
                      </option>
                      <option value="Ro-Ro Cargo Ship">Ro-Ro Cargo Ship</option>
                      <option value="Ro-Ro Passenger Ship">
                        Ro-Ro Passenger Ship
                      </option>
                      <option value="Cruise Passenger Ship">
                        Cruise Passenger Ship
                      </option>
                    </select>
                  </div>
                </div>
                {/* DWT */}
                <div className="flex items-center">
                  <div className="w-[50%] text-[14px] font-medium">
                    DWT at Summer Load Draught
                  </div>
                  <div className="w-[50%]">
                    <input
                      type="text"
                      className="w-[100%] border py-1 text-center rounded border-3B82F6"
                      name="dwt"
                      value={inputState.dwt}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                {/* Gross Tonnage */}
                <div className="flex items-center">
                  <div className="w-[50%] text-[14px] font-medium">
                    Gross Tonnage
                  </div>
                  <div className="w-[50%]">
                    <input
                      type="text"
                      className="w-[100%] border py-1 text-center rounded border-3B82F6"
                      name="grossTonnage"
                      value={inputState.grossTonnage}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 2. 선박 운항정보 집계 */}
            <div className="mt-24">
              <div className="text-[16px]  mb-[38px]">
                2. 선박 운항정보 집계
              </div>
              <div className="flex flex-col gap-7">
                {/* 운항거리 */}
                <div className="flex items-center">
                  <div className="w-[50%] text-[14px] font-medium">
                    운항거리(N.M)
                  </div>
                  <div className="w-[50%] font-light">
                    <input
                      type="text"
                      className="w-[100%] border py-1 text-center rounded border-3B82F6"
                      name="totalDistanceTravelled"
                      value={inputState.totalDistanceTravelled}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* 연료 사용량 */}
                <div className="w-[50%] text-[14px] font-medium">
                  연료유 사용량(M/T)
                </div>
                {/* 연료 정보 */}
                <div className="flex flex-col">
                  <div className="mt-6 flex items-center">
                    <div className="w-[50%] text-[14px] font-medium">
                      경유/가스오일(DO/GO)
                    </div>
                    <div className="w-[50%] font-light">
                      <input
                        type="text"
                        className="w-[100%] border py-1 text-center rounded border-3B82F6"
                        name="dieselGasOilConsumption"
                        value={inputState.dieselGasOilConsumption}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center">
                    <div className="w-[50%] text-[14px] font-medium">
                      경질중유(LFO)
                    </div>
                    <div className="w-[50%] font-light">
                      <input
                        type="text"
                        className="w-[100%] border py-1 text-center rounded border-3B82F6"
                        name="lightFuelOilConsumption"
                        value={inputState.lightFuelOilConsumption}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center">
                    <div className="w-[50%] text-[14px] font-medium">
                      중질중유(HFO)
                    </div>
                    <div className="w-[50%] font-light">
                      <input
                        type="text"
                        className="w-[100%] border py-1 text-center rounded border-3B82F6"
                        name="heavyFuelOilConsumption"
                        value={inputState.heavyFuelOilConsumption}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center">
                    <div className="w-[50%] text-[14px] font-medium">
                      프로판(LPG(P))
                    </div>
                    <div className="w-[50%] font-light">
                      <input
                        type="text"
                        className="w-[100%] border py-1 text-center rounded border-3B82F6"
                        name="lpgPropaneConsumption"
                        value={inputState.lpgPropaneConsumption}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center">
                    <div className="w-[50%] text-[14px] font-medium">
                      부탄(LPG(B))
                    </div>
                    <div className="w-[50%] font-light">
                      <input
                        type="text"
                        className="w-[100%] border py-1 text-center rounded border-3B82F6"
                        name="lpgButaneConsumption"
                        value={inputState.lpgButaneConsumption}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center">
                    <div className="w-[50%] text-[14px] font-medium">
                      액화천연가스(LNG)
                    </div>
                    <div className="w-[50%] font-light">
                      <input
                        type="text"
                        className="w-[100%] border py-1 text-center rounded border-3B82F6"
                        name="lngConsumption"
                        value={inputState.lngConsumption}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center">
                    <div className="w-[50%] text-[14px] font-medium">
                      메탄올(Methanol)
                    </div>
                    <div className="w-[50%] font-light">
                      <input
                        type="text"
                        className="w-[100%] border py-1 text-center rounded border-3B82F6"
                        name="methanolConsumption"
                        value={inputState.methanolConsumption}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center">
                    <div className="w-[50%] text-[14px] font-medium">
                      에탄올(Ethanol)
                    </div>
                    <div className="w-[50%] font-light">
                      <input
                        type="text"
                        className="w-[100%] border py-1 text-center rounded border-3B82F6"
                        name="ethanolConsumption"
                        value={inputState.ethanolConsumption}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3, 4 */}
          <div className="w-[50%]">
            {/* 3. 등급별 경계값 */}
            <div>
              <div className="mb-6">3. 등급별 경계값</div>

              <div className="w-full border-y-[1px] border-BEBEBE">
                {["A", "B", "C", "D", "E"].map((grade) => (
                  <div
                    key={grade}
                    className="w-full flex border-b-[1px] border-E3E3E3"
                  >
                    <div className="w-1/2 bg-EFF6FF p-2 text-[14px] font-medium">
                      {grade}
                    </div>
                    <div className="w-1/2 p-2">
                      {resultData && resultData.rating
                        ? resultData.rating[grade]
                        : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. 운항탄소집약도 지수*/}
            <div className="mt-12">
              <div>4. 운항탄소집약도 지수</div>

              <div className="w-full border-y-[1px] border-BEBEBE">
                <div className="w-full flex border-b-[1px] border-E3E3E3">
                  <div className="w-1/2 bg-EFF6FF p-2 text-[14px] font-medium">
                    CII 요구값(Required CII)
                  </div>
                  <div className="w-1/2 p-2">
                    {resultData ? resultData.required_cii : ""}
                  </div>
                </div>
                <div className="w-full flex border-b-[1px] border-E3E3E3">
                  <div className="w-1/2 bg-EFF6FF p-2 text-[14px] font-medium">
                    CII 계산 값(Attained CII)
                  </div>
                  <div className="w-1/2 p-2">
                    {resultData ? resultData.attained_cii : ""}
                  </div>
                </div>
                <div className="w-full flex border-b-[1px] border-E3E3E3">
                  <div className="w-1/2 bg-EFF6FF p-2 text-[14px] font-medium">
                    CII 등급(Grade)
                  </div>
                  <div className="w-1/2 p-2">
                    {resultData ? resultData.grade : ""}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. 선박운항탄소집약도 그래프 */}
            <Chart chartData={chartData} />
            {/* <button onClick={() => simulateCii.mutate(inputData)}> 전송</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controller;
