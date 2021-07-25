import React, { useState, useMemo } from "react";
import { stack, scaleOrdinal, scalePow, format, scaleBand, max } from "d3";
import { AxisTop } from "./AxisTop";
import { Bar } from "./Bar";
import { AxisLeft } from "./AxisLeft";
import { Legend } from "./Legend";
import { ToolTip } from "./ToolTip";

const height = window.innerHeight * 2.5;
const width = window.innerWidth - 100;
const margin = { top: "50", right: "350", bottom: "20", left: "150" };

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const siFormat = format(".2s");
const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");
const fields = [
  "Delta_Deaths",
  "Delta_Recovered",
  "Delta_Confirmed",
  "Migrated_Other",
  "Active",
  "Deaths",
  "Recovered",
];
const colorScale = scaleOrdinal().range([
  "#BD2D28",
  "teal",
  "purple",
  "yellow",
  "orange",
  "#ff1919",
  "green",
]);

export const BarChart = ({ data }) => {
  const [toolTipData, setToolTipData] = useState({
    State: "India",
    Confirmed: 11111,
    Value: 1111,
    DeathRatio: 0.1,
    RecoveryRate: 0.9,
  });

  const stackedData = useMemo(() => stack().keys(fields)(data), [data]);
  console.log(stackedData);

  const yScale = useMemo(() => {
    const yDomain = data.map((d) => d.State);
    return scaleBand().domain(yDomain).range([0, innerHeight]).padding(0.2);
  }, [data]);

  const xScale = useMemo(() => {
    console.log("xScale rendering");
    const maxXDomain = max(stackedData, (d) =>
      max(d, (d2) => d2.data.Confirmed)
    );
    const xDomain = [0, maxXDomain];
    return scalePow().exponent(0.1).range([0, innerWidth]).domain(xDomain);
  }, [stackedData]);

  const yTickOffSet = yScale.bandwidth() / 2;

  // const stackedData = fields.map((field) => {
  //   return data.map(stateData => {
  //     return {'state':stateData.State,'value':stateData[field]}
  //   })
  // })

  return (
    <>
      <svg height={height} width={width}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisTop
            xScale={xScale}
            innerHeight={innerHeight}
            xAxisTickFormat={xAxisTickFormat}
          />
          <Bar
            stackedData={stackedData}
            fields={fields}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            setToolTipData={setToolTipData}
          />
          <AxisLeft yScale={yScale} yTickOffSet={yTickOffSet} />
        </g>
      </svg>
      <Legend fields={fields} colorScale={colorScale} />
      <ToolTip toolTipData={toolTipData} />
    </>
  );
};
