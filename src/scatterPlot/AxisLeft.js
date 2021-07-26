export const AxisLeft = ({
  yScale,
  innerWidth,
  tickOffset = -3,
  logScale,
  tickFormatter,
}) => {
  if (logScale) {
    let tickValue = 0;
    let i = 0;
    let arr = [];
    while (tickValue < yScale.domain()[1]) {
      tickValue = Math.pow(10, i);
      i++;
      if (tickValue === 1) tickValue = 0;
      tickValue = Math.min(tickValue, yScale.domain()[1]);
      arr.push(tickValue);
    }
    return arr.map((tickValue) => {
      return (
        <>
          <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
            <line x2={innerWidth} />
            <text style={{ textAnchor: "end" }} x={tickOffset} dy=".32em">
              {tickFormatter(tickValue)}
            </text>
          </g>
        </>
      );
    });
  } else {
    return yScale.ticks().map((tickValue) => (
      <>
        <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
          <line x2={innerWidth} />
          <text style={{ textAnchor: "end" }} x={tickOffset} dy=".32em">
            {tickFormatter(tickValue)}
          </text>
        </g>
      </>
    ));
  }
};
