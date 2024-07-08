import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { Capacity: 63640, A: 3.9, B: 4.27, C: 4.54, D: 4.81, E: 5.36 },
  { Capacity: 64280, A: 3.88, B: 4.24, C: 4.51, D: 4.78, E: 5.32 },
  { Capacity: 64910, A: 3.85, B: 4.22, C: 4.48, D: 4.75, E: 5.29 },
  { Capacity: 65550, A: 3.83, B: 4.18, C: 4.45, D: 4.72, E: 5.25 },
  { Capacity: 66180, A: 3.81, B: 4.16, C: 4.43, D: 4.7, E: 5.23 },
  { Capacity: 66820, A: 3.8, B: 4.14, C: 4.4, D: 4.66, E: 5.19 },
  { Capacity: 67460, A: 3.78, B: 4.12, C: 4.38, D: 4.64, E: 5.17 },
  { Capacity: 68090, A: 3.77, B: 4.09, C: 4.35, D: 4.61, E: 5.13 },
  { Capacity: 68730, A: 3.74, B: 4.07, C: 4.33, D: 4.59, E: 5.11 },
  { Capacity: 69360, A: 3.72, B: 4.04, C: 4.3, D: 4.56, E: 5.07 },
  {
    Capacity: 70000,
    A: 3.7,
    B: 4.04,
    C: 4.3,
    D: 4.56,
    E: 5.07,
    required_cii: 4.28,
    attained_cii: 4.14,
  },
  { Capacity: 70640, A: 3.68, B: 4.02, C: 4.28, D: 4.54, E: 5.05 },
  { Capacity: 71270, A: 3.66, B: 4.0, C: 4.25, D: 4.51, E: 5.02 },
  { Capacity: 71910, A: 3.64, B: 3.98, C: 4.23, D: 4.48, E: 4.99 },
  { Capacity: 72540, A: 3.62, B: 3.96, C: 4.21, D: 4.46, E: 4.97 },
  { Capacity: 73180, A: 3.59, B: 3.93, C: 4.18, D: 4.43, E: 4.93 },
  { Capacity: 73820, A: 3.58, B: 3.91, C: 4.16, D: 4.41, E: 4.91 },
  { Capacity: 74450, A: 3.56, B: 3.89, C: 4.14, D: 4.39, E: 4.89 },
  { Capacity: 75090, A: 3.54, B: 3.87, C: 4.12, D: 4.37, E: 4.86 },
  { Capacity: 75720, A: 3.52, B: 3.8, C: 4.09, D: 4.34, E: 4.83 },
  { Capacity: 76360, A: 3.5, B: 3.83, C: 4.07, D: 4.31, E: 4.8 },
];
function Chart() {
  return (
    <div className="mt-20">
      <div className="text-[16px] mb-10">5. 선박운항탄소집약도 그래프</div>
      <div className="ml-[-50px]">
        <ResponsiveContainer width="103%" height={250}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 50, left: 50, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="Capacity"
              label={{
                value: "Deadweight or G/T",
                position: "insideBottom",
                offset: 0,
              }}
            />
            <YAxis
              label={{
                value: "Attained CII",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
            <Line type="monotone" dataKey="A" stroke="#8884d8" />
            <Line type="monotone" dataKey="B" stroke="#82ca9d" />
            <Line type="monotone" dataKey="C" stroke="#ffc658" />
            <Line type="monotone" dataKey="D" stroke="#ff7300" />
            <Line type="monotone" dataKey="E" stroke="#387908" />
            <Line name="Required CII" dataKey="required_cii" stroke="#F59E0B" />
            <Line name="Attained CII" dataKey="attained_cii" stroke="#10B981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Chart;
