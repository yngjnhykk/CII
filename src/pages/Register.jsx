// eslint-disable-next-line no-unused-vars
import React from "react";

function Register() {
  return (
    <div className="grid grid-cols-6 gap-4 mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className={"col-start-2 col-span-4 p-2"}>
        <h2 className="text-2xl font-bold mb-16">[선박 관리] 선박 등록</h2>
        <form className={'border border-gray-200 p-6'}>
          <div className="mb-12 flex border-b-2 pb-6">
            <label className="block text-gray-700 text-xl font-bold mb-2 w-full" htmlFor="imoNumber">
              IMO Number
            </label>
            <input
              type="text"
              id="imoNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-12 flex border-b-2 pb-6">
            <label className="block text-gray-700 text-xl font-bold mb-2 w-full" htmlFor="shipName">
              선박명
            </label>
            <input
              type="text"
              id="shipName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-12 flex border-b-2 pb-6">
            <label className="block text-gray-700 text-xl font-bold mb-2 w-full" htmlFor="shipType">
              선박 종류
            </label>
            <select
              id="shipType"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">선택하세요</option>
              {/* Add more options here */}
            </select>
          </div>
          <div className="mb-12 flex border-b-2 pb-6">
            <label className="block text-gray-700 text-xl font-bold mb-2 w-full" htmlFor="dwt">
              여름철 최대 중량톤수(DWT)
            </label>
            <input
              type="text"
              id="dwt"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-12 flex border-b-2 pb-6">
            <label className="block text-gray-700 text-xl font-bold mb-2 w-full" htmlFor="gt">
              용적톤수(GT)
            </label>
            <input
              type="text"
              id="gt"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
