export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) => {
  let tickValue = 0;
  let i = 0;
  let arr = [];
  while (tickValue < yScale.domain()[1] / 10) {
    tickValue = Math.pow(10, i);
    i++;
    arr.push(tickValue);
  }
  return arr.map((tickValue) => {
    return (
      <>
        <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
          <line x2={innerWidth} />
          <text style={{ textAnchor: "end" }} x={-3} dy=".32em">
            {tickValue}
          </text>
        </g>
      </>
    );
  });
};
