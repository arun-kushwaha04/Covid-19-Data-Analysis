import React from "react";
import { useData } from "./getStateData";
import { BarChart } from "./stackedData/index";
import ScatterPlot from "./scatterPlot/scatterPlot";

function App() {
  // const data = useData();

  // if (!data) {
  //   return <pre>Loading...</pre>;
  // }
  console.log("Rendering App component");

  // const d = data[10];
  // console.log(d);
  // console.log(d.Active+d.Deaths+d.Recovered+d.Delta_Confirmed+d.Delta_Deaths+d.Delta_Recovered+d.Migrated_Other);
  // console.log(d.Confirmed);

  return (
    <>
      {/* <BarChart data={data} /> */}
      <ScatterPlot />
    </>
  );
}

export default App;
