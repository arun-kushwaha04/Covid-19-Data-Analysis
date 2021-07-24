export const AxisLeft = ({yScale,yTickOffSet}) =>{
    return yScale.domain().map((tickValue,i) => (
     <g
       className="tick"
       key={`bottomeAxis${i}`}
       transform={`translate(-10,0)`}
     >
       <text 
         style={{ textAnchor: 'end' }} 
         dy={yTickOffSet} y={yScale(tickValue)}
       >   
         {tickValue}    
       </text>
     </g>
   ))
  }