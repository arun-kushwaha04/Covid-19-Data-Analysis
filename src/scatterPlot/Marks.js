import { line, curveNatural, curveBasis } from "d3";
export const Marks = ({
  value,
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  circleRadius,
}) =>
  data.map((d) => {
    return (
      <>
        <path
          fill="none"
          stroke="orange"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          d={line()
            .curve(curveBasis)
            .x((d) => xScale(new Date(d.dateymd)))
            .y((d) => yScale(yValue(d, value)))(data)}
        />
        <circle
          key={d.id}
          className={`mark-${value}`}
          cx={xScale(new Date(d.dateymd))}
          cy={yScale(yValue(d, value))}
          r={2}
          fill="orange">
          <title className="tooltip">
            {value}: {yValue(d, value)}, Year: {xValue(d)}&#xA;, Title:{" "}
            {d.title}
          </title>
        </circle>
      </>
    );
  });
