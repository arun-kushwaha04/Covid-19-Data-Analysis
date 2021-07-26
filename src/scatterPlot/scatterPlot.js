import React, { useState } from "react";
import { useData } from "./getData";
import { scaleLinear, timeFormat, max, scaleTime, scaleSymlog } from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import "./index.css";
// import ReactDropdown from "react-dropdown";

const attributes = [
  { value: "intensity", label: "Intensity" },
  { value: "likelihood", label: "Likelihood" },
  { value: "relevance", label: "Relevance" },
  { value: "impact", label: "Impact" },
];

const height = window.innerHeight;
const width = window.innerWidth;
const margin = { top: "50", right: "350", bottom: "200", left: "150" };

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const ScatterPlot = () => {
  const list = useData();

  const [value, setValue] = useState("totalconfirmed");

  if (!list) return <pre>Loading ...</pre>;
  const yValue = (d, value) => d["totalconfirmed"];
  const xAxisLabel = "Year";
  const yAxisLabel = "Cases";
  console.log(list[list.length - 1].dateymd);
  const xValue = (d) => {
    return d.dateymd;
  };
  const xScale = scaleTime()
    .domain([
      new Date(list[0].dateymd),
      new Date(list[list.length - 1].dateymd),
    ])
    .range([0, innerWidth])
    .nice();

  const yScale = scaleSymlog()
    .domain([0, max(list, (d) => d.totalconfirmed)])
    .range([innerHeight, 0])
    .nice();

  const scaleRadius = (a, b) =>
    scaleLinear()
      .domain([0, max(list, (d) => d.totalconfirmed)])
      .range([a, b]);

  const xAxisTickFormat = timeFormat("%d-%B-%Y");
  console.log(yScale.domain(), yScale.range(), yScale(0));
  return (
    <>
      {/* <div className="menus-container">
        <span className="dropdown-label">Y</span>
        <ReactDropdown
          options={attributes}
          value={value}
          onChange={({ value }) => setValue(value)}
        />
      </div> */}
      <svg height={height} width={width} className="graph">
        <g transform={`translate(${margin.left},${margin.left})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickOffset={5}
            tickFormat={xAxisTickFormat}
          />
          <text
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset},${
              innerHeight / 2
            }) rotate(-90)`}>
            {yAxisLabel}
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
          {/* <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle">
            {xAxisLabel}
          </text> */}
          <Marks
            value={value}
            data={list}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            circleRadius={scaleRadius(5, 5)}
          />
        </g>
      </svg>
    </>
  );
};

export default ScatterPlot;
