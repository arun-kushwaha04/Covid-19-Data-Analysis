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
}) => {
  return stackedData.map((field, i) => {
    return field.map((data, j) => {
      return (
        <rect
          x={xScale(data[0])}
          y={yScale(data.data.State)}
          height={yScale.bandwidth()}
          width={xScale(data[1] - data[0])}
          fill={colorScale(i)}
          onMouseOver={() =>
            setToolTipFun(
              setToolTipData,
              data.data.State,
              data.data.Confirmed,
              data[1] - data[0],
              Math.round((data.data.Deaths / data.data.Confirmed) * 100) / 100,
              Math.round((data.data.Recovered / data.data.Confirmed) * 100) /
                100,
              fields[i]
            )
          }
        />
      );
    });
  });
};
