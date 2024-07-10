import React, { useState } from "react";
import { useMutation } from "react-query";
import { deleteRegisteredShip, postRegisterShip } from "../api/api";

function EditModal({ onClickEditButton, parsedShipData }) {
  const shipState =
    parsedShipData && parsedShipData.length > 0
      ? parsedShipData[0]
      : {
          ship_name: "",
          ship_type: "",
          imo_number: "",
          summer_load_dwt: "",
          gross_tonnage: "",
        };

  const [registeredShipState, setRegisteredShipState] = useState({
    vesselName: shipState.ship_name,
    shipType: shipState.ship_type,
    imoNumber: shipState.imo_number,
    summerLoadDwt: shipState.summer_load_dwt,
    grossTonnage: shipState.gross_tonnage,
  });

  // onChangeInput
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisteredShipState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // onClick 등록 버튼
  const registerMutation = useMutation(postRegisterShip, {
    onSuccess: (data) => {
      console.log("success", data);
      //   onClickRegisterButton(); // 모달 닫기
    },
  });

  // onClick 삭제 버튼
  const deleteMutation = useMutation(deleteRegisteredShip, {
    onSuccess: (data) => {
      console.log("success", data);
      onClickEditButton();
      // 모달 닫기 또는 다른 UI 업데이트
    },
  });

  //   console.log(parsedShipData);

  return (
    <div className="bg-white border-rounded w-[512px] h-[453px] p-5 absolute left-[340px] top-64 ">
      {/* 헤더 */}
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">선박 계정 수정</div>
        <div onClick={onClickEditButton} className="cursor-pointer">
          x
        </div>
      </div>

      {/* inputs */}
      <div className="flex flex-col gap-6 mt-10">
        {/* Vessel Name */}
        <div className="flex justify-between items-center">
          <div className="w-1/2 text-757575">Vessel Name</div>
          <div className="w-1/2">
            <input
              type="text"
              name="vesselName"
              value={registeredShipState.vesselName}
              onChange={handleChange}
              className="border-[1px] border-D2D2D2 rounded p-1 w-full"
            />
          </div>
        </div>
        {/* Ship Type */}
        <div className="flex justify-between items-center">
          <div className="w-1/2 text-757575">Ship Type</div>
          <div className="w-1/2">
            <input
              type="text"
              name="shipType"
              value={registeredShipState.shipType}
              onChange={handleChange}
              className="border-[1px] border-D2D2D2 rounded p-1 w-full"
            />
          </div>
        </div>
        {/* IMO Number */}
        <div className="flex justify-between items-center">
          <div className="w-1/2 text-757575">IMO Number</div>
          <div className="w-1/2">
            <input
              type="text"
              name="imoNumber"
              value={registeredShipState.imoNumber}
              onChange={handleChange}
              className="border-[1px] border-D2D2D2 rounded p-1 w-full"
            />
          </div>
        </div>
        {/* DWT at Summer Load Draught */}
        <div className="flex justify-between items-center">
          <div className="w-1/2 text-757575">DWT at Summer Load Draught</div>
          <div className="w-1/2">
            <input
              type="text"
              name="summerLoadDwt"
              value={registeredShipState.summerLoadDwt}
              onChange={handleChange}
              className="border-[1px] border-D2D2D2 rounded p-1 w-full"
            />
          </div>
        </div>
        {/* Gross Tonnage */}
        <div className="flex justify-between items-center">
          <div className="w-1/2 text-757575">Gross Tonnage</div>
          <div className="w-1/2">
            <input
              type="text"
              name="grossTonnage"
              value={registeredShipState.grossTonnage}
              onChange={handleChange}
              className="border-[1px] border-D2D2D2 rounded p-1 w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8 mx-auto w-full text-[16px] ">
        <button
          className="w-1/2 font-medium text-center bg-FF6262 p-2 text-white rounded"
          onClick={() => {
            deleteMutation.mutate(shipState.imo_number);
          }}
        >
          삭제
        </button>
        <button
          className="w-1/2 font-medium text-center bg-68BCF9 p-2 text-white rounded"
          onClick={() => {}}
        >
          수정
        </button>
      </div>
    </div>
  );
}

export default EditModal;
