import React, { useState } from "react";
import ShipIcon from "../../assets/ShipIcon";
import { AiOutlineEdit } from "react-icons/ai";
import { getShipDatasAPI } from "../../api/api";
import { useQuery } from "react-query";

function ShipAccountList({
  setShipState,
  onClickRegisterButton,
  onClickEditButton,
}) {
  const { data: shipDatas } = useQuery("shipData", getShipDatasAPI);

  return (
    <div className="w-full border border-CDCDCD rounded py-5 px-2">
      <div className="text-[24px] font-semibold">ShipAccountList</div>
      <div className="flex justify-between text-[14px] font-light text-757575">
        <div>선박을 선택해 주세요.</div>
        <div>
          <div>count: {shipDatas && shipDatas.length}</div>
          <div>
            <button
              onClick={onClickRegisterButton}
              className="bg-BEBEBE text-white text-[10px] p-[2px] px-2 rounded"
            >
              + 새 계정 등록
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {/* 리스트 */}
        {shipDatas &&
          shipDatas.map((ship) => (
            <div
              className="mt-2 cursor-pointer"
              key={ship.imo_number}
              onClick={() => setShipState(ship.imo_number)}
            >
              <div className="bg-F2F2F2 flex gap-4 px-4 py-3 items-center rounded-md">
                <ShipIcon />
                <div className="w-[80%] flex flex-col ">
                  <div className="text-[15px] text-A5A font-light">
                    {ship.ship_name}
                  </div>
                  <div className="text-[12px] text-A0A0A0 font-light">
                    {ship.imo_number}
                  </div>
                </div>
                <div onClick={onClickEditButton}>
                  <AiOutlineEdit />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ShipAccountList;
