import axios from "axios";

// cii 계산
export const postInputDataAPI = async (inputData) => {
  const response = await axios.post(`${import.meta.env.VITE_API_KEY}/cii`, {
    ...inputData,
  });
  return response.data;
};

// 전체 선박 조회
export const getShipDatasAPI = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_KEY}/shipDatas`);
  return response.data;
};

// 선박 조회
export const getShipDataAPI = async (imo_number) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_KEY}/shipData?imo_number=${imo_number}`
  );
  return response.data;
};

// 선박 등록
export const postRegisterShip = async (newShipData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_KEY}/registerShip`,
    { ...newShipData }
  );
  return response.data;
};

// 선박 삭제
export const deleteRegisteredShip = async (imo_number) => {
  console.log(imo_number);
  const response = await axios.delete(
    `${import.meta.env.VITE_API_KEY}/shipAccount?imo_number=${imo_number}`,
    { imo_number }
  );
  return response.data;
};
