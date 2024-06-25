// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import '../App.css';
import axios from "axios";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";


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
    "Cruise Passenger Ship"
  ]

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
  const reductionFactor = [
    2019, 2020, 2021, 2022, 2023, 2024, 2025
  ]

  const handleCheckboxChange = (e) => {
    const {name, checked} = e.target;
    setFuelConsumption({
      ...fuelConsumption, [name]: checked,
    });
  };

  // api 요청 양식
  const [data, setData] = useState({
    imo_number: 1234568,
    ship_type: "Select Ship Type",
    summer_load_dwt: 0,
    gross_tonnage: 0,
    total_distance_travelled: 0,
    fuels: {
      diesel_gas_oil_consumption: 0,
      heavy_fuel_oil_consumption: 0,
      light_fuel_oil_consumption : 0,
      lpg_propane_consumption : 0,
      lpg_butane_consumption : 0,
      lng_consumption : 0,
      methanol_consumption : 0,
      ethanol_consumption : 0
    }
  })

  const tempData = [
    { Capacity: 6550, A: 16.05, B: 17.54, C: 18.66, D: 19.78, E: 22.02 },
    { Capacity: 6620, A: 15.94, B: 17.43, C: 18.54, D: 19.65, E: 21.88 },
    { Capacity: 6680, A: 15.86, B: 17.33, C: 18.44, D: 19.55, E: 21.76 },
    { Capacity: 6750, A: 15.76, B: 17.22, C: 18.32, D: 19.42, E: 21.62 },
    { Capacity: 6810, A: 15.67, B: 17.13, C: 18.22, D: 19.31, E: 21.50 },
    { Capacity: 6880, A: 15.57, B: 17.01, C: 18.10, D: 19.19, E: 21.36 },
    { Capacity: 6940, A: 15.49, B: 16.93, C: 18.01, D: 19.09, E: 21.25 },
    { Capacity: 7010, A: 15.39, B: 16.82, C: 17.89, D: 18.96, E: 21.11 },
    { Capacity: 7070, A: 15.31, B: 16.73, C: 17.80, D: 18.87, E: 21.00 },
    { Capacity: 7140, A: 15.21, B: 16.63, C: 17.69, D: 18.75, E: 20.87 },
    { Capacity: 7200, A: 15.14, B: 16.54, C: 17.60, D: 18.66, E: 20.77 },
    { Capacity: 7270, A: 15.04, B: 16.44, C: 17.49, D: 18.54, E: 20.64 },
    { Capacity: 7330, A: 14.96, B: 16.36, C: 17.40, D: 18.44, E: 20.53 },
    { Capacity: 7400, A: 14.88, B: 16.26, C: 17.30, D: 18.34, E: 20.41 },
    { Capacity: 7460, A: 14.80, B: 16.18, C: 17.21, D: 18.24, E: 20.31 },
    { Capacity: 7530, A: 14.71, B: 16.08, C: 17.11, D: 18.14, E: 20.19 },
    { Capacity: 7590, A: 14.65, B: 16.01, C: 17.03, D: 18.05, E: 20.10 },
    { Capacity: 7660, A: 14.56, B: 15.91, C: 16.93, D: 17.95, E: 19.98 },
    { Capacity: 7720, A: 14.49, B: 15.84, C: 16.85, D: 17.86, E: 19.88 },
    { Capacity: 7790, A: 14.41, B: 15.75, C: 16.76, D: 17.77, E: 19.78 },
    { Capacity: 7850, A: 14.34, B: 15.68, C: 16.68, D: 17.68, E: 19.68 },
  ];


  // cii 결과
  const [ciiResult, setCiiResult] = useState({ required_cii : 0, attained_cii : 0, cii_grade : "", rate : {A : 0, B : 0, D : 0, E : 0}})

  const dataHandler = (e) => {
    const { name, value } = e.target;
    if (name in data.fuels) {
      setData((prevData) => ({
        ...prevData,
        fuels: {
          ...prevData.fuels,
          [name]: value,
        }
      }));
    } else {
      setData({
        ...data,
        [name]: value
      });
    }
  };

  // 실행
  const execute = () => {

    axios.post('http://118.129.145.21:1882/cii_test', data)
      .then((res) => {
        if(Object.entries(res.data.data).length > 1){
          setCiiResult(res.data.data)
        }
        console.log(ciiResult)
      })
      .catch((err) => {
        console.log(err)
      });

  };


  return (<div className={"p-4"}>
    <h6 className={'text-3xl font-black mt-8 mb-12'}>[시뮬레이터]</h6>
    <div className={'grid grid-cols-12 gap-4'}>
      <div className={'col-span-6'}>
        <h2 className="text-2xl font-bold mb-4">입력</h2>
        {/* 입력 섹션 */}
        <div className="bg-white  border border-black p-6 rounded-lg">
          {/* 선박 정보 */}
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-4">선박 정보 (Ship Information)</h3>
            <div className={'flex mb-2'}>
              <label className={'w-1/2 my-auto'}>선박 종류</label>
              <select name="ship_type" value={data.ship_type} onChange={dataHandler} className="w-1/2 py-2 ps-1 border rounded">
                <option disabled hidden selected>Select Ship Type</option>
                {shipType.map(item => <option>{item}</option>)}
              </select>
            </div>
            <div className={'flex mb-2'}>
              <label className={'w-1/2 my-auto'}>여름철 최대 중량톤수 (DWT)</label>
              <input type="text"  name="summer_load_dwt" value={data.summer_load_dwt} onChange={dataHandler} className="w-1/2 p-2  border rounded text-right"/>
            </div>

            <div className={'flex mb-2'}>
              <label className={'w-1/2 my-auto'}>용적톤수 (GT)</label>
              <input type="text" name="gross_tonnage" value={data.gross_tonnage} onChange={dataHandler} className="w-1/2 p-2 text-right border rounded"/>
            </div>

          </div>

          {/* 연료 정보 */}
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-4">연료 정보 (Fuel Information)</h3>
            <div className="flex mb-2">
              <input type="checkbox" className="mr-2" name="dieselGasOil" checked={fuelConsumption.dieselGasOil}
                     onChange={handleCheckboxChange}/>
              <span className="w-1/2 my-auto">Diesel/Gas Oil</span>
              <input type="text" name="diesel_gas_oil_consumption" value={data.fuels.diesel_gas_oil_consumption} onChange={dataHandler} placeholder="0" className="text-right w-1/2 p-2 border rounded"
                     disabled={!fuelConsumption.dieselGasOil}/>
            </div>
            <div className="flex mb-2">
              <input type="checkbox" className="mr-2" name="lightFuelOil" checked={fuelConsumption.lightFuelOil}
                     onChange={handleCheckboxChange}/>
              <span className="w-1/2 my-auto">Light Fuel Oil (LFO)</span>
              <input type="text" name="light_fuel_oil_consumption" value={data.fuels.light_fuel_oil_consumption} onChange={dataHandler} placeholder="0" className="text-right w-1/2 p-2 border rounded"
                     disabled={!fuelConsumption.lightFuelOil}/>
            </div>
            <div className="flex mb-2">
              <input type="checkbox" className="mr-2" name="heavyFuelOil" checked={fuelConsumption.heavyFuelOil}
                     onChange={handleCheckboxChange}/>
              <span className="w-1/2 my-auto">Heavy Fuel Oil (HFO)</span>
              <input type="text" name="heavy_fuel_oil_consumption" value={data.fuels.heavy_fuel_oil_consumption} onChange={dataHandler} placeholder="0" className="text-right w-1/2 p-2 border rounded"
                     disabled={!fuelConsumption.heavyFuelOil}/>
            </div>
            <div className="flex mb-2">
              <input type="checkbox" className="mr-2" name="lpgPropane" checked={fuelConsumption.lpgPropane}
                     onChange={handleCheckboxChange}/>
              <span className="w-1/2 my-auto">Liquefied Petroleum Gas (LPG)-Propane</span>
              <input type="text" name="lpg_propane_consumption" value={data.fuels.lpg_propane_consumption} onChange={dataHandler} placeholder="0" className="text-right w-1/2 p-2 border rounded"
                     disabled={!fuelConsumption.lpgPropane}/>
            </div>
            <div className="flex mb-2">
              <input type="checkbox" className="mr-2" name="lpgButane" checked={fuelConsumption.lpgButane}
                     onChange={handleCheckboxChange}/>
              <span className="w-1/2 my-auto">Liquefied Petroleum Gas (LPG)-Butane</span>
              <input type="text" name="lpg_butane_consumption" value={data.fuels.lpg_butane_consumption} onChange={dataHandler} placeholder="0" className="text-right w-1/2 p-2 border rounded"
                     disabled={!fuelConsumption.lpgButane}/>
            </div>
            <div className="flex mb-2">
              <input type="checkbox" className="mr-2" name="lng" checked={fuelConsumption.lng}
                     onChange={handleCheckboxChange}/>
              <span className="w-1/2 my-auto">Liquefied Natural Gas (LNG)</span>
              <input type="text" name="lng_consumption" value={data.fuels.lng_consumption} onChange={dataHandler} placeholder="0" className="text-right w-1/2 p-2 border rounded" disabled={!fuelConsumption.lng}/>
            </div>
            <div className="flex mb-2">
              <input type="checkbox" className="mr-2" name="methanol" checked={fuelConsumption.methanol}
                     onChange={handleCheckboxChange}/>
              <span className="w-1/2 my-auto">Methanol</span>
              <input type="text" name="methanol_consumption" value={data.fuels.methanol_consumption} onChange={dataHandler} placeholder="0" className="text-right w-1/2 p-2 border rounded"
                     disabled={!fuelConsumption.methanol}/>
            </div>
            <div className="flex mb-2">
              <input type="checkbox" className="mr-2" name="ethanol" checked={fuelConsumption.ethanol}
                     onChange={handleCheckboxChange}/>
              <span className="w-1/2 my-auto">Ethanol</span>
              <input type="text" name="ethanol_consumption" value={data.fuels.ethanol_consumption} onChange={dataHandler} placeholder="0" className="text-right w-1/2 p-2 border rounded"
                     disabled={!fuelConsumption.ethanol}/>
            </div>
          </div>


          {/* 항해 정보 */}
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-4">항해 정보 (Voyage Information)</h3>
            <div className={'flex mb-2'}>
              <label className={'my-auto w-1/2'}>감축 계수 연도 (Reduction Factor)</label>
              <select className="w-1/2 py-2 ps-1 mb-2 border rounded">
                <option disabled hidden selected>Select Year</option>
                {reductionFactor.map(item => <option>{item}</option>)}
              </select>
            </div>
            <div className={'flex mb-2'}>
              <label className={'my-auto w-1/2'}>이동거리 (Distance Travelled)</label>
              <input type="text" name="total_distance_travelled" value={data.total_distance_travelled} onChange={dataHandler} className="w-1/2 p-2 mb-2 border rounded text-right"/>
            </div>
          </div>

          <div className={'flex mt-5'}>
            <button onClick={execute} className="w-1/2 mx-auto text-xl bg-gray-800 text-white p-2 rounded">실 행</button>
          </div>
        </div>
      </div>
      {/* 출력 섹션 */}
      <div className={'col-span-6'}>
        <h2 className="text-2xl font-bold mb-4">출력</h2>
        <div className="bg-white p-6 rounded-lg border border-black">
          <div className="mb-4">
            <h3 className="text-2xl font-black mb-2">CII 정보 (CII Information)</h3>
            <div className="mb-2">
              <label className="block">Required CII</label>
              <input type="text" value={ciiResult.required_cii ? ciiResult.required_cii : 0} className="w-full p-2 mb-2 border rounded text-center" readOnly/>
            </div>
            <div className="mb-2">
              <label className="block">Attained CII</label>
              <input type="text"  value={ciiResult.attained_cii ? ciiResult.attained_cii : 0} className="w-full p-2 mb-2 border rounded text-center" readOnly/>
            </div>
            <div>
              <label className="block">Rating</label>
              <div className="w-full mb-2 border rounded grid grid-cols-12 text-center">
                <div className={`col-span-4 ${ciiResult.cii_grade === "A" ? "bg-green-500 text-white font-black"  : "bg-green-100"} py-4 border`}>
                  A
                </div>
                <div className={`col-span-8 ${ciiResult.cii_grade === "A" ? "bg-green-500 text-white font-black"  : ""} py-4 border`}>
                  {ciiResult.rate.A}
                </div>
                <div className={`col-span-4 ${ciiResult.cii_grade === "B" ? "bg-blue-500 text-white font-black"  : "bg-blue-100"} py-4 border`}>
                  B
                </div>
                <div className={`col-span-8 ${ciiResult.cii_grade === "B" ? "bg-blue-500 text-white font-black"  : ""} py-4 border`}>
                  {ciiResult.rate.B}
                </div>
                <div className={`col-span-4 ${ciiResult.cii_grade === "C" ? "bg-amber-500 text-white font-black"  : "bg-amber-100"} py-4 border`}>
                C
              </div>
              <div className={`col-span-8 ${ciiResult.cii_grade === "C" ? "bg-amber-500 text-white font-black"  : ""} py-4 border`}>
                  {ciiResult.required_cii}
                </div>
                <div className={`col-span-4 ${ciiResult.cii_grade === "D" ? "bg-rose-300 text-white font-black"  : "bg-rose-100"} py-4 border`}>
                  D
                </div>
                <div className={`col-span-8 ${ciiResult.cii_grade === "D" ? "bg-rose-300 text-white font-black"  : ""} py-4 border`}>
                  {ciiResult.rate.D}
                </div>
                <div
                  className={`col-span-4 ${ciiResult.cii_grade === "E" ? "bg-red-500 text-white font-black"  : "bg-red-200"} py-4 border`}>
                  E
                </div>
                <div className={`col-span-8 ${ciiResult.cii_grade === "E" ? "bg-red-500 text-white font-black"  : ""} py-4 border`}>
                  {ciiResult.rate.E}
                </div>
              </div>
            </div>
          </div>
          <div>
          {/* 차트 (Chart) */}
            <div className="w-full p-2 mb-2 border rounded h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={'100%'}
                  data={tempData}
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
                  <XAxis dataKey="Capacity" label={{ value: 'Capacity', position: 'insideBottom', offset: -5,dx : -200, dy: 10 }} />
                  {/* Y축 범위 설정 */}
                  <YAxis domain={[12, 24]} label={{ value: 'Attained CII', angle: -90, position: 'insideLeft'}} />
                  {/* 범례 설정 */}
                  <Legend iconType="circle" />
                  {/* 데이터 라인 설정 (A, B, C, D, E 각기 다른 색상) */}
                  <Line type="monotone" dataKey="A" stroke="#8884d8" dot={false} />
                  <Line type="monotone" dataKey="B" stroke="#82ca9d" dot={false} />
                  <Line type="monotone" dataKey="C" stroke="#ffc658" dot={false} />
                  <Line type="monotone" dataKey="D" stroke="#ff7300" dot={false} />
                  <Line type="monotone" dataKey="E" stroke="#387908" dot={false} />
                </LineChart>
              </ResponsiveContainer>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>);
}

export default App;
