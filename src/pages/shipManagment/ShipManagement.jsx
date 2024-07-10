import React, { useState } from "react";
import ShipAccountList from "./ShipAccountList";
import Chart from "./Chart";
import MonitoringTable from "./MonitoringTable";
import { useQuery } from "react-query";
import { getShipDataAPI } from "../../api/api";
import RegisterModal from "../../components/RegisterModal";
import EditModal from "../../components/EditModal";

function ShipManagement() {
  const [shipState, setShipState] = useState(null);
  const [showRegisterModal, setShowRegisterModalModal] = useState(false);
  const [showEditModal, setShowEditModalModal] = useState(false);

  // 선박 하나 조회
  const { data: shipData } = useQuery(
    ["shipData", shipState],
    () => getShipDataAPI(shipState),
    {
      enabled: !!shipState,
    }
  );

  const onClickRegisterButton = () => {
    setShowRegisterModalModal(!showRegisterModal);
  };

  const onClickEditButton = () => {
    setShowEditModalModal(!showEditModal);
  };

  // shipData 파싱
  const parsedShipData = shipData
    ? shipData.map((item) => ({
        ...item,
        chart_data: JSON.parse(item.chart_data || "[]"),
        fuels: JSON.parse(item.fuels || "[]"),
        rating: JSON.parse(item.rating || "{}"),
      }))
    : null;

  console.log(parsedShipData);

  return (
    <>
      <div className={`px-6 relative`}>
        {showRegisterModal && (
          <>
            <div
              className="absolute top-0 left-0 w-full h-full bg-D2D2D2 opacity-50"
              // style={{ backdropFilter: "blur(1px)" }}
            />
            <RegisterModal onClickRegisterButton={onClickRegisterButton} />
          </>
        )}
        {showEditModal && (
          <>
            <div
              className="absolute top-0 left-0 w-full h-full bg-D2D2D2 opacity-50"
              // style={{ backdropFilter: "blur(1px)" }}
            />
            <EditModal
              parsedShipData={parsedShipData}
              onClickEditButton={onClickEditButton}
            />
          </>
        )}
        <div className="text-[32px] font-semibold">Ship Management</div>
        <div className="text-[20px] font-medium mt-8">선박 탄소강도 관리</div>
        <div className="text-[16px] font-medium mt-4 text-757575 ">
          Verssel CII Tracker
        </div>
        <div className="text-[14px] font-light mt-4 ">
          선박 탄소 강도 관리 시스템은 선박의 탄소 배출 효율성을 실시간으로
          추적하고 분석하는 플랫폼을 제공합니다. 이를 통해 해운 업체는 환경
          규제에 능동적으로 대응하고, 지속 가능한 해양 환경을 위한 전략을 개발할
          수 있습니다.
        </div>
        <div className="grid grid-cols-8 mt-6 gap-4">
          <div className="col-span-2">
            <ShipAccountList
              setShipState={setShipState}
              onClickRegisterButton={onClickRegisterButton}
              onClickEditButton={onClickEditButton}
            />
          </div>
          <div className="col-span-6 flex flex-row gap-8">
            {/*  1, 2 */}
            <div className="w-[50%]">
              {/* 1. 선박 기본 정보 */}
              <div>
                <div className="text-[16px]">
                  1. 선박 기본 정보(Ship Particulars)
                </div>
                <div className="mt-4 border-y-[1px] border-y-BEBEBE text-[14px]">
                  <div className="border-b-[1px] border-b-E3E3E3 font-medium flex">
                    <div className="w-[55%] bg-F5F5F5 p-2 ">Vessel Name</div>
                    <div className="flex items-center justify-center p-2">
                      {shipData && shipData[0]?.ship_name}
                    </div>
                  </div>
                  <div className="border-b-[1px] border-b-E3E3E3 font-medium flex">
                    <div className="w-[55%] bg-F5F5F5 p-2">Ship Type</div>
                    <div className="flex items-center justify-center p-2">
                      {shipData && shipData[0]?.ship_type}
                    </div>
                  </div>
                  <div className="border-b-[1px] border-b-E3E3E3 font-medium flex">
                    <div className="w-[55%] bg-F5F5F5 p-2">IMO Number</div>
                    <div className="flex items-center justify-center p-2">
                      {shipData && shipData[0]?.imo_number}
                    </div>
                  </div>
                  <div className="border-b-[1px] border-b-E3E3E3 font-medium flex">
                    <div className="w-[55%] bg-F5F5F5 p-2">
                      DWT at Summer Load Draught
                    </div>
                    <div className="flex items-center justify-center p-2">
                      {shipData && shipData[0]?.summer_load_dwt}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-[55%] bg-F5F5F5 p-2 font-medium">
                      Gross Tonnage
                    </div>
                    <div className="flex items-center justify-center p-2">
                      {shipData && shipData[0]?.gross_tonnage}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. 선박 운항정보 집계 */}
              <div className="mt-20">
                <div className="text-[16px]">
                  2. 선박 운항정보 집계(Aggregated Collection Data)
                </div>
                <div className="mt-4 border-y-[1px] border-y-BEBEBE text-[14px]">
                  <div className="border-b-[1px] border-b-E3E3E3 font-medium flex">
                    <div className="w-[55%] bg-F5F5F5 p-2 ">운항거리(N.M)</div>
                    <div className="flex items-center justify-center p-2">
                      {shipData && shipData[0]?.total_distance_travelled}
                    </div>
                  </div>

                  <div className="flex">
                    {/* key */}
                    <div className="w-[55%] bg-F5F5F5 flex flex-row">
                      <div className="w-[33%] p-2 m-auto ">
                        연료유 사용량 (M/T)
                      </div>
                      <div className="border-l-[1px] border-l-E3E3E3">
                        <div className="border-b-[1px] border-b-E3E3E3 font-medium flex">
                          <div className="bg-F5F5F5 p-2">
                            경유/가스오일(DO/GO)
                          </div>
                        </div>
                        <div className="border-b-[1px] border-b-E3E3E3 font-medium">
                          <div className="bg-F5F5F5 p-2">경질중유(LFO)</div>
                          <div className=""></div>
                        </div>
                        <div className="border-b-[1px] border-b-E3E3E3 font-medium">
                          <div className="bg-F5F5F5 p-2">중질중유(HFO)</div>
                        </div>
                        <div>
                          <div className="border-b-[1px] bg-F5F5F5 p-2 font-medium">
                            프로판(LPG(P))
                          </div>
                        </div>
                        <div>
                          <div className="border-b-[1px] bg-F5F5F5 p-2 font-medium">
                            부탄(LPG(B))
                          </div>
                        </div>
                        <div>
                          <div className="border-b-[1px] bg-F5F5F5 p-2 font-medium">
                            액화천연가스(LNG)
                          </div>
                        </div>
                        <div>
                          <div className="border-b-[1px] bg-F5F5F5 p-2 font-medium">
                            메탄올(Methanol)
                          </div>
                        </div>
                        <div>
                          <div className="border-b-[1px] bg-F5F5F5 p-2 font-medium">
                            에탄올(Ethanol)
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* value */}

                    <div className="w-[45%]">
                      <div className=" p-2 border-b-[1px] border-b-E3E3E3">
                        {parsedShipData
                          ? parsedShipData[0].fuels.diesel_gas_oil_consumption
                          : 0}
                      </div>
                      <div className=" p-2 border-b-[1px] border-b-E3E3E3">
                        {parsedShipData &&
                        parsedShipData[0].fuels.light_fuel_oil_consumption
                          ? parsedShipData[0].fuels.light_fuel_oil_consumption
                          : 0}
                      </div>
                      <div className=" p-2 border-b-[1px] border-b-E3E3E3">
                        {parsedShipData &&
                        parsedShipData[0].fuels.heavy_fuel_oil_consumption
                          ? parsedShipData[0].fuels.heavy_fuel_oil_consumption
                          : 0}
                      </div>
                      <div className=" p-2 border-b-[1px] border-b-E3E3E3">
                        {parsedShipData &&
                        parsedShipData[0].fuels.lpg_propane_consumption
                          ? parsedShipData[0].fuels.lpg_propane_consumption
                          : 0}
                      </div>
                      <div className=" p-2 border-b-[1px] border-b-E3E3E3">
                        {parsedShipData &&
                        parsedShipData[0].fuels.lpg_butane_consumption
                          ? parsedShipData[0].fuels.lpg_butane_consumption
                          : 0}
                      </div>
                      <div className=" p-2 border-b-[1px] border-b-E3E3E3">
                        {parsedShipData &&
                        parsedShipData[0].fuels.lng_consumption
                          ? parsedShipData[0].fuels.lng_consumption
                          : 0}
                      </div>
                      <div className=" p-2 border-b-[1px] border-b-E3E3E3">
                        {parsedShipData &&
                        parsedShipData[0].fuels.methanol_consumption
                          ? parsedShipData[0].fuels.methanol_consumption
                          : 0}
                      </div>
                      <div className=" p-2 border-b-[1px] border-b-E3E3E3">
                        {parsedShipData &&
                        parsedShipData[0].fuels.ethanol_consumption
                          ? parsedShipData[0].fuels.ethanol_consumption
                          : 0}
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
                <div className="text-[16px]">
                  3. 등급별 경계값(Rating boundaring)
                </div>
                <div className="mt-4 border-y-[1px] border-y-BEBEBE text-[14px]">
                  <div className="border-b-[1px] border-b-E3E3E3  flex">
                    <div className="w-[45%] bg-F5F5F5 p-2 font-medium">A</div>
                    <div className="flex items-center justify-center p-2">
                      {parsedShipData && parsedShipData[0].rating.A}
                    </div>
                  </div>
                  <div className="border-b-[1px] border-b-E3E3E3  flex">
                    <div className="w-[45%] bg-F5F5F5 p-2 font-medium">B</div>
                    <div className="flex items-center justify-center p-2">
                      {parsedShipData && parsedShipData[0].rating.B}
                    </div>
                  </div>
                  <div className="border-b-[1px] border-b-E3E3E3  flex">
                    <div className="w-[45%] bg-F5F5F5 p-2 font-medium">C</div>
                    <div className="flex items-center justify-center p-2">
                      {parsedShipData && parsedShipData[0].rating.C}
                    </div>
                  </div>
                  <div className="border-b-[1px] border-b-E3E3E3  flex">
                    <div className="w-[45%] bg-F5F5F5 p-2 font-medium">D </div>
                    <div className="flex items-center justify-center p-2">
                      {parsedShipData && parsedShipData[0].rating.D}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-[45%] bg-F5F5F5 p-2 font-medium ">E </div>
                    <div className="flex items-center justify-center p-2">
                      {parsedShipData && parsedShipData[0].rating.E}
                    </div>
                  </div>
                </div>
              </div>
              {/* 4. 운항탄소집약도지수 */}
              <div className="mt-20">
                <div className="text-[16px]">4. 운항탄소집약도지수</div>
                <div className="mt-4 border-y-[1px] border-y-BEBEBE text-[14px]">
                  <div className="border-b-[1px] border-b-E3E3E3 font-medium flex">
                    <div className="w-[45%] bg-F5F5F5 p-2 ">
                      CII 요구값(Required CII)
                    </div>
                    <div className="flex items-center justify-center p-2">
                      {shipData && shipData[0]?.required_cii}
                    </div>
                  </div>
                  <div className="border-b-[1px] border-b-E3E3E3 font-medium flex">
                    <div className="w-[45%] bg-F5F5F5 p-2">
                      CII 계산 값(Attained CII)
                    </div>
                    <div className="flex items-center justify-center p-2">
                      {shipData && shipData[0]?.attained_cii}
                    </div>
                  </div>
                  <div className="border-b-[1px] border-b-E3E3E3 font-medium flex">
                    <div className="w-[45%] bg-F5F5F5 p-2">CII 등급(Grade)</div>
                    <div className="flex items-center justify-center p-2">
                      {shipData && shipData[0]?.cii_grade}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Chart parsedShipData={parsedShipData} />
        <MonitoringTable parsedShipData={parsedShipData} />
      </div>
    </>
  );
}

export default ShipManagement;
