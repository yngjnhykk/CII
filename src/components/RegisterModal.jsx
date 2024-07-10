import React, { useState } from "react";
import { useMutation } from "react-query";
import { postRegisterShip } from "../api/api";

function RegisterModal({ onClickRegisterButton }) {
  const [newShipState, setNewShipState] = useState({
    vesselName: "",
    shipType: "",
    imoNumber: "",
    summerLoadDwt: "",
    grossTonnage: "",
  });

  // onChangeInput
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewShipState((prevData) => ({
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

  return (
    <div className="bg-white border-rounded w-[512px] h-[453px] p-5 absolute left-[340px] top-64 ">
      {/* 헤더 */}
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">선박 계정 추가</div>
        <div onClick={onClickRegisterButton} className="cursor-pointer">
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
              value={newShipState.vesselName}
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
              value={newShipState.shipType}
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
              value={newShipState.imoNumber}
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
              value={newShipState.summerLoadDwt}
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
              value={newShipState.grossTonnage}
              onChange={handleChange}
              className="border-[1px] border-D2D2D2 rounded p-1 w-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 mx-auto w-full text-[16px] font-medium text-center bg-68BCF9 p-2 text-white rounded">
        <button
          onClick={() => {
            registerMutation.mutate(newShipState);
          }}
        >
          새 계정 등록
        </button>
      </div>
    </div>
  );
}

export default RegisterModal;
