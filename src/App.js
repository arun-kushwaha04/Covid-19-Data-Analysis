import React ,{useState} from 'react';
import {useData} from './getStateData';
import {stack,scaleOrdinal,scalePow,format,scaleBand,max} from 'd3';
import {AxisTop} from './stackedData/AxisTop'
import {Bar} from './stackedData/Bar'
import {AxisLeft} from './stackedData/AxisLeft'
import {Legend} from './stackedData/Legend'
import {ToolTip} from './stackedData/ToolTip'

const height = window.innerHeight*2.5;
const width = window.innerWidth - 100;
const margin = {top:'50',right:'350',bottom:'20',left:'150'};

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const siFormat = format('.2s');
const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');


function App() {
  const data = useData();
  const [toolTipData,setToolTipData] = useState({
    State:"India",
    Confirmed:11111,
    Value:1111,
    DeathRatio:0.1,
    RecoveryRate:0.9
  })

  if(!data) {
    return <pre>Loading...</pre>;
  }

  // const d = data[10];
  // console.log(d);
  // console.log(d.Active+d.Deaths+d.Recovered+d.Delta_Confirmed+d.Delta_Deaths+d.Delta_Recovered+d.Migrated_Other);
  // console.log(d.Confirmed);

  const fields = ['Delta_Deaths','Delta_Recovered','Delta_Confirmed','Migrated_Other','Active','Deaths','Recovered'];
  // const stackedData = fields.map((field) => {
  //   return data.map(stateData => {
  //     return {'state':stateData.State,'value':stateData[field]}
  //   })
  // })

  const stackedData = stack()
      .keys(fields)(data)

  console.log(stackedData)

  const yDomain = data.map(d => d.State)
  const yScale = scaleBand()
    .domain(yDomain)
    .range([0,innerHeight])
    .padding(0.2)

  const maxXDomain = max(stackedData, (d) => (
      max(d, (d2) => (
        d2.data.Confirmed
      ))
  ));
  const xDomain = [0, maxXDomain];
  const xScale = scalePow().exponent(0.1).range([0,innerWidth]).domain(xDomain);

  const colorScale = scaleOrdinal().range(['#BD2D28','teal','purple','yellow','orange','#ff1919','green']);
  const yTickOffSet = (yScale.bandwidth()/2);

  return (
    <>
    <svg height={height} width={width}>
      <g transform={`translate(${margin.left},${margin.top})`}>   
        <AxisTop
          xScale={xScale}
          innerHeight={innerHeight}
          xAxisTickFormat={xAxisTickFormat}
        />
        <Bar
          stackedData={stackedData}
          xScale={xScale}
          yScale={yScale}
          colorScale={colorScale}
        />
        <AxisLeft
          yScale={yScale}
          yTickOffSet={yTickOffSet}
        />
      </g>
    </svg>
      <Legend
        fields={fields}
        colorScale={colorScale}
      />
      <ToolTip
        toolTipData={toolTipData}
      />
    </>
  );
}

export default App;
