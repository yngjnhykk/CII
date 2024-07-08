// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

function App() {
  // 선박 종류
  const shipType = [
    "Bulk Carrier",
    "Gas Carrier",
    "Tanker",
    "Container Ship",
    "Refrigerated Cargo Carrier",
    "Combination Carrier",
    "LNG Carrier",
    "Ro-Ro Cargo Ship (Vehicle Carrier)",
    "Ro-Ro Cargo Ship",
    "Ro-Ro Passenger Ship",
    "Cruise Passenger Ship",
  ];

  // 연료 체크박스
  const [fuelConsumption, setFuelConsumption] = useState({
    dieselGasOil: false,
    lightFuelOil: false,
    heavyFuelOil: false,
    lpgPropane: false,
    lpgButane: false,
    lng: false,
    methanol: false,
    ethanol: false,
  });

  // 감축 계수
  const reductionFactor = {
    2019: 0,
    2020: 0.01,
    2021: 0.02,
    2022: 0.03,
    2023: 0.05,
    2024: 0.07,
    2025: 0.09,
    2026: 0.1,
  };

  // 체크박스 이벤트
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFuelConsumption({
      ...fuelConsumption,
      [name]: checked,
    });
  };

  // api 요청 양식 초기화
  const [data, setData] = useState({
    imo_number: 1234568,
    ship_type: "Select Ship Type",
    summer_load_dwt: 0,
    gross_tonnage: 0,
    total_distance_travelled: 0,
    reduction_factor: 0,
    fuels: {
      diesel_gas_oil_consumption: 0,
      heavy_fuel_oil_consumption: 0,
      light_fuel_oil_consumption: 0,
      lpg_propane_consumption: 0,
      lpg_butane_consumption: 0,
      lng_consumption: 0,
      methanol_consumption: 0,
      ethanol_consumption: 0,
    },
  });

  // 차트용 데이터
  const [chartData, setChartData] = useState([]);

  // cii 감축계수
  const [rf, setRf] = useState(0);

  // cii 결과
  const [ciiResult, setCiiResult] = useState({
    required_cii: 0,
    attained_cii: 0,
    cii_grade: "",
    rate: { A: 0, B: 0, D: 0, E: 0 },
    rateLine: {},
    a: 0,
    b: 0,
  });

  // cii 결과 변경시(실행시)
  useEffect(() => {
    // 차트 데이터 초기화
    setChartData([]);

    // 라인 생성을 위한 임시 데이터
    const tempData = [];

    for (let i = -10; i <= 10; i++) {
      const reference = {};
      if (
        data.ship_type === "Ro-Ro Cargo Ship (Vehicle Carrier)" ||
        data.ship_type === "Ro-Ro Passenger Ship" ||
        data.ship_type === "Cruise Passenger Ship"
      ) {
        reference.Capacity =
          data.gross_tonnage + (data.gross_tonnage / 110) * i;
      } else {
        reference.Capacity = Math.round(
          +data.summer_load_dwt + Math.floor(data.summer_load_dwt / 110) * i
        );
        reference.A = +(
          (1 - rf) *
          ciiResult.a *
          reference.Capacity ** -ciiResult.c *
          ciiResult.rateLine.A
        ).toFixed(2);
        reference.B = +(
          (1 - rf) *
          ciiResult.a *
          reference.Capacity ** -ciiResult.c *
          ciiResult.rateLine.B
        ).toFixed(2);
        reference.C = +(
          (1 - rf) *
          ciiResult.a *
          reference.Capacity ** -ciiResult.c
        ).toFixed(2);
        reference.D = +(
          (1 - rf) *
          ciiResult.a *
          reference.Capacity ** -ciiResult.c *
          ciiResult.rateLine.D
        ).toFixed(2);
        reference.E = +(
          (1 - rf) *
          ciiResult.a *
          reference.Capacity ** -ciiResult.c *
          ciiResult.rateLine.E
        ).toFixed(2);
      }
      if (i === 0) {
        reference.required_cii = ciiResult.required_cii;
        reference.attained_cii = ciiResult.attained_cii;
      }

      tempData.push(reference);
    }
    setChartData(tempData);
  }, [ciiResult]);

  // form change 이벤트
  const dataHandler = (e) => {
    const { name, value } = e.target;
    if (name in data.fuels) {
      setData((prevData) => ({
        ...prevData,
        fuels: {
          ...prevData.fuels,
          [name]: value,
        },
      }));
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  // reduction_factor 이벤트 핸들러
  const reductionFactorHandler = (e) => {
    setRf(e.target.value);
    setData({ ...data, reduction_factor: e.target.value });
  };

  // 실행
  const execute = () => {
    axios
      .post("http://118.129.145.21:1882/cii_simulator", data)
      .then((res) => {
        if (Object.entries(res.data.data).length > 1) {
          setCiiResult(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(chartData);

  return (
    <div className={"p-4"}>
      <h6 className={"text-3xl font-black mt-8 mb-12"}>[시뮬레이터]</h6>
      <div className={"grid grid-cols-12 gap-4 mb-20"}>
        <div className={"col-span-6"}>
          <h2 className="text-2xl font-bold mb-4">입력</h2>
          {/* 입력 섹션 */}
          <div className="bg-white  border border-black px-6 py-8 rounded-lg">
            {/* 선박 정보 */}
            <div className="mb-4">
              <h3 className="text-2xl font-semibold mb-4">
                선박 정보 (Ship Information)
              </h3>
              <div className={"flex mb-2"}>
                <label className={"w-1/2 my-auto"}>선박 종류</label>
                <select
                  name="ship_type"
                  value={data.ship_type}
                  onChange={dataHandler}
                  className="w-1/2 py-2 ps-1 border rounded"
                >
                  <option disabled hidden selected>
                    Select Ship Type
                  </option>
                  {shipType.map((item, idx) => (
                    <option key={idx}>{item}</option>
                  ))}
                </select>
              </div>
              <div className={"flex mb-2"}>
                <label className={"w-1/2 my-auto"}>
                  여름철 최대 중량톤수 (DWT)
                </label>
                <input
                  type="text"
                  name="summer_load_dwt"
                  value={data.summer_load_dwt}
                  onChange={dataHandler}
                  className="w-1/2 p-2  border rounded text-right"
                />
              </div>

              <div className={"flex mb-2"}>
                <label className={"w-1/2 my-auto"}>용적톤수 (GT)</label>
                <input
                  type="text"
                  name="gross_tonnage"
                  value={data.gross_tonnage}
                  onChange={dataHandler}
                  className="w-1/2 p-2 text-right border rounded"
                />
              </div>
            </div>

            {/* 연료 정보 */}
            <div className="mb-4">
              <h3 className="text-2xl font-semibold mt-10 mb-4">
                연료 정보 (Fuel Information)
              </h3>
              <div className="flex mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  name="dieselGasOil"
                  checked={fuelConsumption.dieselGasOil}
                  onChange={handleCheckboxChange}
                />
                <span className="w-1/2 my-auto">Diesel/Gas Oil</span>
                <input
                  type="text"
                  name="diesel_gas_oil_consumption"
                  value={data.fuels.diesel_gas_oil_consumption}
                  onChange={dataHandler}
                  placeholder="0"
                  className="text-right w-1/2 p-2 border rounded"
                  disabled={!fuelConsumption.dieselGasOil}
                />
              </div>
              <div className="flex mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  name="lightFuelOil"
                  checked={fuelConsumption.lightFuelOil}
                  onChange={handleCheckboxChange}
                />
                <span className="w-1/2 my-auto">Light Fuel Oil (LFO)</span>
                <input
                  type="text"
                  name="light_fuel_oil_consumption"
                  value={data.fuels.light_fuel_oil_consumption}
                  onChange={dataHandler}
                  placeholder="0"
                  className="text-right w-1/2 p-2 border rounded"
                  disabled={!fuelConsumption.lightFuelOil}
                />
              </div>
              <div className="flex mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  name="heavyFuelOil"
                  checked={fuelConsumption.heavyFuelOil}
                  onChange={handleCheckboxChange}
                />
                <span className="w-1/2 my-auto">Heavy Fuel Oil (HFO)</span>
                <input
                  type="text"
                  name="heavy_fuel_oil_consumption"
                  value={data.fuels.heavy_fuel_oil_consumption}
                  onChange={dataHandler}
                  placeholder="0"
                  className="text-right w-1/2 p-2 border rounded"
                  disabled={!fuelConsumption.heavyFuelOil}
                />
              </div>
              <div className="flex mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  name="lpgPropane"
                  checked={fuelConsumption.lpgPropane}
                  onChange={handleCheckboxChange}
                />
                <span className="w-1/2 my-auto">
                  Liquefied Petroleum Gas (LPG)-Propane
                </span>
                <input
                  type="text"
                  name="lpg_propane_consumption"
                  value={data.fuels.lpg_propane_consumption}
                  onChange={dataHandler}
                  placeholder="0"
                  className="text-right w-1/2 p-2 border rounded"
                  disabled={!fuelConsumption.lpgPropane}
                />
              </div>
              <div className="flex mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  name="lpgButane"
                  checked={fuelConsumption.lpgButane}
                  onChange={handleCheckboxChange}
                />
                <span className="w-1/2 my-auto">
                  Liquefied Petroleum Gas (LPG)-Butane
                </span>
                <input
                  type="text"
                  name="lpg_butane_consumption"
                  value={data.fuels.lpg_butane_consumption}
                  onChange={dataHandler}
                  placeholder="0"
                  className="text-right w-1/2 p-2 border rounded"
                  disabled={!fuelConsumption.lpgButane}
                />
              </div>
              <div className="flex mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  name="lng"
                  checked={fuelConsumption.lng}
                  onChange={handleCheckboxChange}
                />
                <span className="w-1/2 my-auto">
                  Liquefied Natural Gas (LNG)
                </span>
                <input
                  type="text"
                  name="lng_consumption"
                  value={data.fuels.lng_consumption}
                  onChange={dataHandler}
                  placeholder="0"
                  className="text-right w-1/2 p-2 border rounded"
                  disabled={!fuelConsumption.lng}
                />
              </div>
              <div className="flex mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  name="methanol"
                  checked={fuelConsumption.methanol}
                  onChange={handleCheckboxChange}
                />
                <span className="w-1/2 my-auto">Methanol</span>
                <input
                  type="text"
                  name="methanol_consumption"
                  value={data.fuels.methanol_consumption}
                  onChange={dataHandler}
                  placeholder="0"
                  className="text-right w-1/2 p-2 border rounded"
                  disabled={!fuelConsumption.methanol}
                />
              </div>
              <div className="flex mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  name="ethanol"
                  checked={fuelConsumption.ethanol}
                  onChange={handleCheckboxChange}
                />
                <span className="w-1/2 my-auto">Ethanol</span>
                <input
                  type="text"
                  name="ethanol_consumption"
                  value={data.fuels.ethanol_consumption}
                  onChange={dataHandler}
                  placeholder="0"
                  className="text-right w-1/2 p-2 border rounded"
                  disabled={!fuelConsumption.ethanol}
                />
              </div>
            </div>

            {/* 항해 정보 */}
            <div className="mb-4">
              <h3 className="text-2xl font-semibold mt-10 mb-4">
                항해 정보 (Voyage Information)
              </h3>
              <div className={"flex mb-2"}>
                <label className={"my-auto w-1/2"}>
                  감축 계수 연도 (Reduction Factor)
                </label>
                <select
                  className="w-1/2 py-2 ps-1 mb-2 border rounded"
                  onChange={reductionFactorHandler}
                >
                  <option disabled hidden selected>
                    Select Year
                  </option>
                  {Object.entries(reductionFactor).map(([k, v], idx) => (
                    <option key={idx} value={v}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
              <div className={"flex mb-2"}>
                <label className={"my-auto w-1/2"}>
                  이동거리 (Distance Travelled)
                </label>
                <input
                  type="text"
                  name="total_distance_travelled"
                  value={data.total_distance_travelled}
                  onChange={dataHandler}
                  className="w-1/2 p-2 mb-2 border rounded text-right"
                />
              </div>
            </div>

            <div className={"flex mt-5"}>
              <button
                onClick={execute}
                className="w-1/2 mx-auto text-xl bg-gray-800 text-white p-2 rounded"
              >
                실 행
              </button>
            </div>
          </div>
        </div>
        {/* 출력 섹션 */}
        <div className={"col-span-6"}>
          <h2 className="text-2xl font-bold mb-4">출력</h2>
          <div className="bg-white px-6 py-8 rounded-lg border border-black">
            <div className="mb-4">
              <h3 className="text-2xl font-black mb-2">
                CII 정보 (CII Information)
              </h3>
              <div className="mb-2">
                <label className="block">Required CII</label>
                <input
                  type="text"
                  value={ciiResult.required_cii ? ciiResult.required_cii : 0}
                  className="w-full p-2 mb-2 border rounded text-center"
                  readOnly
                />
              </div>
              <div className="mb-2">
                <label className="block">Attained CII</label>
                <input
                  type="text"
                  value={ciiResult.attained_cii ? ciiResult.attained_cii : 0}
                  className="w-full p-2 mb-2 border rounded text-center"
                  readOnly
                />
              </div>

              {/* 레이팅 */}
              <div>
                <label className="block">Rating</label>
                <div className="w-full mb-2 border rounded grid grid-cols-12 text-center">
                  <div
                    className={`col-span-4 ${
                      ciiResult.cii_grade === "A"
                        ? "bg-green-500 text-white font-black"
                        : "bg-green-100"
                    } py-3 border`}
                  >
                    A
                  </div>
                  <div
                    className={`col-span-8 ${
                      ciiResult.cii_grade === "A"
                        ? "bg-green-500 text-white font-black"
                        : ""
                    } py-3 border`}
                  >
                    {ciiResult.rate.A}
                  </div>
                  <div
                    className={`col-span-4 ${
                      ciiResult.cii_grade === "B"
                        ? "bg-blue-500 text-white font-black"
                        : "bg-blue-100"
                    } py-3 border`}
                  >
                    B
                  </div>
                  <div
                    className={`col-span-8 ${
                      ciiResult.cii_grade === "B"
                        ? "bg-blue-500 text-white font-black"
                        : ""
                    } py-3 border`}
                  >
                    {ciiResult.rate.B}
                  </div>
                  <div
                    className={`col-span-4 ${
                      ciiResult.cii_grade === "C"
                        ? "bg-amber-500 text-white font-black"
                        : "bg-amber-100"
                    } py-3 border`}
                  >
                    C
                  </div>
                  <div
                    className={`col-span-8 ${
                      ciiResult.cii_grade === "C"
                        ? "bg-amber-500 text-white font-black"
                        : ""
                    } py-3 border`}
                  >
                    {ciiResult.required_cii}
                  </div>
                  <div
                    className={`col-span-4 ${
                      ciiResult.cii_grade === "D"
                        ? "bg-rose-300 text-white font-black"
                        : "bg-rose-100"
                    } py-3 border`}
                  >
                    D
                  </div>
                  <div
                    className={`col-span-8 ${
                      ciiResult.cii_grade === "D"
                        ? "bg-rose-300 text-white font-black"
                        : ""
                    } py-3 border`}
                  >
                    {ciiResult.rate.D}
                  </div>
                  <div
                    className={`col-span-4 ${
                      ciiResult.cii_grade === "E"
                        ? "bg-red-500 text-white font-black"
                        : "bg-red-200"
                    } py-3 border`}
                  >
                    E
                  </div>
                  <div
                    className={`col-span-8 ${
                      ciiResult.cii_grade === "E"
                        ? "bg-red-500 text-white font-black"
                        : ""
                    } py-3 border`}
                  >
                    {ciiResult.rate.E}
                  </div>
                </div>
              </div>
            </div>
            <div>
              {/* 차트 (Chart) */}
              <div
                className="w-full mb-2 border rounded"
                style={{ height: "46vh" }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    {/* 격자선 설정 */}
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* X축 설정 */}
                    <XAxis
                      dataKey="Capacity"
                      label={{
                        value: "Capacity",
                        position: "insideBottom",
                        offset: -5,
                        dx: -300,
                        dy: 10,
                      }}
                    />
                    {/* Y축 범위 설정 */}
                    <YAxis
                      domain={0}
                      label={{
                        value: "Attained CII",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    {/* 범례 설정 */}
                    <Legend iconType="circle" />
                    {/* 데이터 라인 설정 (A, B, C, D, E 각기 다른 색상) */}
                    <Line
                      type="monotone"
                      dataKey="A"
                      stroke="#22C55E"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="B"
                      stroke="#3B82F6"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="C"
                      stroke="#F59E0B"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="D"
                      stroke="#FDA4AF"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="E"
                      stroke="#EF4444"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="required_cii"
                      stroke="#f08605"
                    />

                    {/* cii_grade에 따라 색상 변경*/}
                    <Line
                      type="monotone"
                      dataKey="attained_cii"
                      stroke={`${
                        ciiResult.cii_grade === "A"
                          ? "#22C55E"
                          : ciiResult.cii_grade === "B"
                          ? "#3B82F6"
                          : ciiResult.cii_grade === "C"
                          ? "#F59E0B"
                          : ciiResult.cii_grade === "D"
                          ? "#FDA4AF"
                          : "#EF4444"
                      }`}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
