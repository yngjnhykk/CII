import React from "react";
import { useNavigate } from "react-router";

const ships = [
  {
    IMO: "123456",
    name: "ship1234",
    type: "Bulk Carrier",
    GT: "39,052",
    DWT: "69,999",
  },
  {
    IMO: "123456",
    name: "ship1234",
    type: "Bulk Carrier",
    GT: "39,052",
    DWT: "69,999",
  },
];

function List() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mt-8 mb-12">
        <div className="text-3xl font-black mt-8 mb-12">[선박 관리]</div>
        <button
          className="bg-CmainColor hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            navigate("/register");
          }}
        >
          등록
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border-[1px] border-slate-950">
        <table className="w-full text-left table-fixed">
          <thead className="bg-white text-Cgray">
            <tr>
              <th className="px-4 py-2 w-1/6 text-left">IMO Number</th>
              <th className="px-4 py-2 w-1/6 text-left">선박명</th>
              <th className="px-4 py-2 w-1/6 text-left">선박 유형</th>
              <th className="px-4 py-2 w-1/6 text-left">GT</th>
              <th className="px-4 py-2 w-1/6 text-left">DWT</th>
              <th className="px-4 py-2 w-1/6 text-left">수정 / 삭제</th>
            </tr>
          </thead>
          <tbody>
            {ships.map((ship, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 text-left">{ship.IMO}</td>
                <td className="px-4 py-2 text-left">{ship.name}</td>
                <td className="px-4 py-2 text-left">{ship.type}</td>
                <td className="px-4 py-2 text-left">{ship.GT}</td>
                <td className="px-4 py-2 text-left">{ship.DWT}</td>
                <td className="px-4 py-2 text-left">
                  <button className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 border-[1px] rounded">
                    수정
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded">
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
