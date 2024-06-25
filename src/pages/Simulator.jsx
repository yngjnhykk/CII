// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../App.css';

function App() {
  return (
    <div className="min-h-screen p-4">
      <h6 className={'text-3xl font-black mt-8 mb-12'}>[시뮬레이터]</h6>
      <div className={'grid'}>
        <h2 className="text-2xl font-bold mb-4">입력</h2>
        <div className="max-w-8xl grid grid-cols-4 md:grid-cols-2 gap-4">
          {/* 입력 섹션 */}
          <div className="bg-white p-6 rounded-lg shadow-md">


            {/* 선박 정보 */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">선박 정보 (Ship Information)</h3>
              <select className="w-full p-2 mb-2 border rounded">
                <option>Select Ship Type</option>
                {/* 옵션 추가 */}
              </select>
              <input type="text" placeholder="Enter DWT" className="w-full p-2 mb-2 border rounded"/>
              <input type="text" placeholder="Enter GT" className="w-full p-2 mb-2 border rounded"/>
            </div>

            {/* 연료 정보 */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">연료 정보 (Fuel Information)</h3>
              <div className="mb-2">
                <input type="checkbox" className="mr-2"/> Diesel/Gas Oil
                <input type="text" placeholder="300" className="w-full p-2 mb-2 border rounded"/>
              </div>
              <div className="mb-2">
                <input type="checkbox" className="mr-2"/> Heavy Fuel Oil (HFO)
                <input type="text" placeholder="4000" className="w-full p-2 mb-2 border rounded"/>
              </div>
              {/* 다른 연료 유형들 */}
            </div>

            {/* 항해 정보 */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">항해 정보 (Voyage Information)</h3>
              <select className="w-full p-2 mb-2 border rounded">
                <option>Select Year</option>
                {/* 옵션 추가 */}
              </select>
              <input type="text" placeholder="Enter Distance" className="w-full p-2 mb-2 border rounded"/>
            </div>

            <button className="w-full bg-blue-500 text-white p-2 rounded">실행 (Execute)</button>
          </div>
        </div>
        {/* 출력 섹션 */}
        <div>
          <h2 className="text-2xl font-bold mb-4">출력</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">CII 정보 (CII Information)</h3>
              <div className="mb-2">
                <label className="block">Required CII</label>
                <input type="text" placeholder="17.60" className="w-full p-2 mb-2 border rounded" readOnly/>
              </div>
              <div className="mb-2">
                <label className="block">Attained CII</label>
                <input type="text" placeholder="13.31" className="w-full p-2 mb-2 border rounded" readOnly/>
              </div>
              <div>
                <label className="block">Rating</label>
                <div className="w-full p-2 mb-2 border rounded h-40">
                  {/* 등급 표 (Rating Table) */}
                </div>
              </div>
            </div>
            <div>
              {/* 차트 (Chart) */}
              <div className="w-full p-2 mb-2 border rounded h-64"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
