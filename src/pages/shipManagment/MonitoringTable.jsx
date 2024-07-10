import React from "react";

function MonitoringTable({ parsedShipData }) {
  const dailyData = parsedShipData && parsedShipData ? parsedShipData : [];

  console.log(dailyData);

  return (
    <div className="mt-20">
      <div className="text-[16px]">6. 선박 CII 모니터링</div>
      <div>
        <div className="mt-5 border-y-[1px] border-y-BEBEBE text-[14px]">
          <div className="grid grid-cols-7 gap-4 text-center bg-gray-100 p-2">
            <div className="font-medium text-left">IMO Number</div>
            <div className="font-medium text-left">날짜</div>
            <div className="font-medium text-left col-span-2">
              Total CO2 Emissions [MT]
            </div>
            <div className="font-medium text-left">운항거리 [N.M]</div>
            <div className="font-medium text-left">Attained CII</div>
            <div className="font-medium text-left">CII Grade</div>
          </div>

          {dailyData &&
            dailyData.map((item) => (
              <div className="grid grid-cols-7 gap-4 text-left px-2 border-t-[1px] border-E3E3E3">
                <div className="py-2 text-left">{item.imo_number}</div>
                <div className="py-2 text-left">{item.record_date}</div>
                <div className="py-2 text-left col-span-2">
                  {item.total_co2_emissions}
                </div>
                <div className="py-2 text-left">
                  {item.total_distance_travelled}
                </div>
                <div className="py-2 text-left">{item.attained_cii}</div>
                <div className="py-2 text-left">{item.cii_grade}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MonitoringTable;
