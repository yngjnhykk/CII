import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    imoNumber: "",
    shipName: "",
    shipType: "",
    dwt: "",
    gt: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(formData);

  return (
    <div className="mx-auto bg-white p-6 rounded-lg">
      <div className="col-start-2 col-span-4 p-2">
        <h2 className="text-2xl font-bold mb-16">[선박 관리] 선박 등록</h2>
        <form className="border border-gray-200 p-6">
          <div className="mb-12 flex border-b-2 pb-6">
            <label
              htmlFor="imoNumber"
              className="block text-gray-700 text-xl font-bold mb-2 w-full"
            >
              IMO Number
            </label>
            <input
              type="text"
              id="imoNumber"
              name="imoNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.imoNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-12 flex border-b-2 pb-6">
            <label
              htmlFor="shipName"
              className="block text-gray-700 text-xl font-bold mb-2 w-full"
            >
              선박명
            </label>
            <input
              type="text"
              id="shipName"
              name="shipName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.shipName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-12 flex border-b-2 pb-6">
            <label
              htmlFor="shipType"
              className="block text-gray-700 text-xl font-bold mb-2 w-full"
            >
              선박 종류
            </label>
            <select
              id="shipType"
              name="shipType"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.shipType}
              onChange={handleChange}
            >
              <option value="">Select Ship Type</option>
              <option value="Bulk Carrier">Bulk Carrier</option>
              <option value="Gas Carrier">Gas Carrier</option>
              <option value="Tanker">Tanker</option>
              <option value="Container Ship">Container Ship</option>
              <option value="Refrigerated Cargo Carrier">
                Refrigerated Cargo Carrier
              </option>
              <option value="Combination Carrier">Combination Carrier</option>
              <option value="LNG Carrier">LNG Carrier</option>
              <option value="Ro-Ro Cargo Ship (Vehicle Carrier)">
                Ro-Ro Cargo Ship (Vehicle Carrier)
              </option>
              <option value="Ro-Ro Cargo Ship">Ro-Ro Cargo Ship</option>
              <option value="Ro-Ro Passenger Ship">Ro-Ro Passenger Ship</option>
              <option value="Cruise Passenger Ship">
                Cruise Passenger Ship
              </option>
            </select>
          </div>
          <div className="mb-12 flex border-b-2 pb-6">
            <label
              htmlFor="dwt"
              className="block text-gray-700 text-xl font-bold mb-2 w-full"
            >
              여름철 최대 중량톤수(DWT)
            </label>
            <input
              type="text"
              id="dwt"
              name="dwt"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.dwt}
              onChange={handleChange}
            />
          </div>
          <div className="mb-12 flex border-b-2 pb-6">
            <label
              htmlFor="gt"
              className="block text-gray-700 text-xl font-bold mb-2 w-full"
            >
              용적톤수(GT)
            </label>
            <input
              type="text"
              id="gt"
              name="gt"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.gt}
              onChange={handleChange}
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
