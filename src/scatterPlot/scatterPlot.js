import React, { useState, useMemo } from "react";
import { scaleLinear, timeFormat, scaleTime, scaleSymlog, format } from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import "./index.css";
import ReactDropdown from "react-dropdown";

const attributes = [
  {
    label: "Confirmed",
    value: "totalconfirmed",
    yLabel: "Total Coronavirus Cases",
  },
  { label: "Deaths", value: "totaldeceased", yLabel: "Total Deaths" },
  { label: "Recovered", value: "totalrecovered", yLabel: "Total Recovered" },
];

const height = window.innerHeight - 100;
const width = window.innerWidth - 10;
const margin = { top: "50", right: "150", bottom: "70", left: "150" };

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const yAxisLabelOffset = 80;

const siFormat = format(".2s");
const yAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

const xValue = (d) => {
  return d.dateymd;
};
const yValue = (d, value) => d[value];
const xAxisTickFormat = timeFormat("%d-%B-%Y");

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};
let yAxisLabel;

const ScatterPlot = ({ list }) => {
  const [value, setValue] = useState("totalconfirmed");
  const [showLogScale, setShowLogScale] = useState(false);

  attributes.forEach((val) => {
    if (val.value === value) {
      yAxisLabel = val.yLabel;
    }
  });
  const xScale = useMemo(
    () =>
      list &&
      scaleTime()
        .domain([
          new Date(list[0].dateymd),
          new Date(list[list.length - 1].dateymd),
        ])
        .range([0, innerWidth])
        .nice(),
    [list]
  );

  const yScale = useMemo(
    () =>
      list &&
      (showLogScale
        ? scaleSymlog()
            .domain([0, list[list.length - 1][value]])
            .range([innerHeight, 0])
            .nice()
        : scaleLinear()
            .domain([0, list[list.length - 1][value]])
            .range([innerHeight, 0])
            .nice()),
    [list, value, showLogScale]
  );

  if (!list) return <pre>Loading ...</pre>;
  console.log(yScale.domain());
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
            yScale={yScale}
            innerWidth={innerWidth}
            tickOffset={-5}
            tickFormatter={yAxisTickFormat}
          />
          <Marks
            value={value}
            data={list}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
          />
        </g>
      </svg>
    </>
  );
};

export default ScatterPlot;
