import React, { useState, useMemo } from "react";
import { stack, scalePow, format, scaleBand, max } from "d3";
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
const initalFields = [
  "Delta_Deaths",
  "Delta_Recovered",
  "Delta_Confirmed",
  "Migrated_Other",
  "Active",
  "Deaths",
  "Recovered",
];
const colorScale = {
  Delta_Deaths: "#BD2D28",
  Delta_Recovered: "teal",
  Delta_Confirmed: "purple",
  Migrated_Other: "yellow",
  Active: "orange",
  Deaths: "#ff1919",
  Recovered: "green",
};

export const BarChart = ({ data }) => {
  const [toolTipVisibility, setToolTipVisibility] = useState(false);
  const [toolTipData, setToolTipData] = useState({
    State: "India",
    Confirmed: 11111,
    Value: 1111,
    DeathRatio: 0.1,
    RecoveryRate: 0.9,
  });
  const [fields, setFields] = useState(initalFields);

  const stackedData = useMemo(() => stack().keys(fields)(data), [data, fields]);
  // console.log(stackedData);

  const yScale = useMemo(() => {
    const yDomain = data.map((d) => d.State);
    return scaleBand().domain(yDomain).range([0, innerHeight]).padding(0.2);
  }, [data]);

  const xScale = useMemo(() => {
    const maxXDomain = max(stackedData, (d) => max(d, (d2) => d2[0] + d2[1]));
    const xDomain = [0, maxXDomain];
    return scalePow().exponent(0.4).range([0, innerWidth]).domain(xDomain);
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
            setToolTipVisibility={setToolTipVisibility}
          />
          <AxisLeft yScale={yScale} yTickOffSet={yTickOffSet} />
        </g>
      </svg>
      <Legend
        initalFields={initalFields}
        fields={fields}
        setFields={setFields}
        colorScale={colorScale}
      />
      <ToolTip
        toolTipData={toolTipData}
        toolTipVisibility={toolTipVisibility}
      />
    </>
  );
};
