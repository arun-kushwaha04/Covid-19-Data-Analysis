import { format } from "d3";
const setToolTipFun = (
  setToolTipData,
  State,
  Confirmed,
  Value,
  DeathRatio,
  RecoveryRate,
  Key
) => {
  setToolTipData({
    State: State === "Total" ? "India" : State,
    Confirmed: Confirmed,
    [Key]: Value,
    DeathRatio: DeathRatio,
    RecoveryRate: RecoveryRate,
  });
};

export const Bar = ({
  stackedData,
  fields,
  xScale,
  yScale,
  colorScale,
  setToolTipData,
  setToolTipVisibility,
}) => {
  return stackedData.map((field, i) => {
    return field.map((data, j) => {
      // if (i === 6) return null;
      return (
        <rect
          x={xScale(data[0])}
          y={yScale(data.data.State)}
          height={yScale.bandwidth()}
          width={xScale(data[1]) - xScale(data[0])}
          fill={colorScale[fields[i]]}
          onMouseOver={() => {
            setToolTipVisibility(true);
            setToolTipFun(
              setToolTipData,
              data.data.State,
              format(",")(data.data.Confirmed),
              format(",")(data[1] - data[0]),
              Math.round((data.data.Deaths / data.data.Confirmed) * 1000) /
                1000,
              Math.round((data.data.Recovered / data.data.Confirmed) * 1000) /
                1000,
              fields[i]
            );
          }}
          onMouseOut={() => {
            setToolTipVisibility(false);
          }}
        />
      );
    });
  });
};
