import React, { useState } from "react";
import { useData } from "./getData";
import {
  scaleLinear,
  timeFormat,
  max,
  scaleTime,
  scaleSymlog,
  format,
} from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import "./index.css";
import ReactDropdown from "react-dropdown";

const attributes = [
  { label: "Confirmed", value: "totalconfirmed" },
  { label: "Deaths", value: "totaldeceased" },
  { label: "Recovered", value: "totalrecovered" },
];

const height = window.innerHeight - 100;
const width = window.innerWidth - 10;
const margin = { top: "50", right: "150", bottom: "70", left: "150" };

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const yAxisLabelOffset = 80;

const siFormat = format(".2s");
const yAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

const ScatterPlot = () => {
  const list = useData();
  const [value, setValue] = useState("totalconfirmed");
  const [showLogScale, setShowLogScale] = useState(false);

  if (!list) return <pre>Loading ...</pre>;

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

  const yValue = (d, value) => d[value];
  const yAxisLabel = "Cases";

  const yScaleLinear = scaleLinear()
    .domain([0, max(list, (d) => d[value])])
    .range([innerHeight, 0])
    .nice();

  const yScaleLog = scaleSymlog()
    .domain([0, max(list, (d) => d[value])])
    .range([innerHeight, 0])
    .nice();

  const xAxisTickFormat = timeFormat("%d-%B-%Y");

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };
  return (
    <>
      <div className="menus-container">
        <span className="dropdown-label">Y</span>
        <ReactDropdown
          options={attributes}
          value={value}
          onChange={({ value }) => setValue(value)}
        />
        <Checkbox
          label="Logarithmic Scale"
          value={showLogScale}
          onChange={() => setShowLogScale(!showLogScale)}
        />
      </div>
      <svg height={height} width={width} className="graph">
        <g transform={`translate(${margin.left},${margin.top})`}>
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
          <AxisLeft
            logScale={showLogScale}
            yScale={showLogScale ? yScaleLog : yScaleLinear}
            innerWidth={innerWidth}
            tickOffset={-5}
            tickFormatter={yAxisTickFormat}
          />

          <Marks
            value={value}
            data={list}
            xScale={xScale}
            yScale={showLogScale ? yScaleLog : yScaleLinear}
            xValue={xValue}
            yValue={yValue}
          />
        </g>
      </svg>
    </>
  );
};

export default ScatterPlot;
