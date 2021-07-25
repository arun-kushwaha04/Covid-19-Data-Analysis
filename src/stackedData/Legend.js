const checkForCircleSelected = (fields, val) => {
  let flag = false;
  for (let key in fields) {
    if (fields[key] === val) {
      flag = true;
      break;
    }
  }
  return flag;
};
export const Legend = ({ initalFields, fields, setFields, colorScale }) => {
  return (
    <>
      <svg className="legend-section">
        <text transform={`translate(0,10)`}>Legends</text>
        {initalFields.map((field, i) => {
          return (
            <g transform={`translate(12,${25 * (i + 1)})`}>
              <circle
                className={
                  checkForCircleSelected(fields, initalFields[i])
                    ? "circle-selected"
                    : null
                }
                fill={colorScale[field]}
                r={10}
                onClick={() => {
                  let temp = [];
                  let flag = false;
                  let val = initalFields[i];
                  for (let key in fields) {
                    if (fields[key] === val) {
                      flag = true;
                    } else {
                      temp.push(fields[key]);
                    }
                  }
                  if (!flag) {
                    temp.push(val);
                  }
                  setFields(temp);
                  console.log(fields);
                }}></circle>
              <text transform={`translate(25,0)`} dy="0.32em">
                {field}
              </text>
            </g>
          );
        })}
      </svg>
    </>
  );
};
