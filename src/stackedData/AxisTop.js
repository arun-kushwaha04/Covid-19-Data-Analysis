export const AxisTop = ({xScale,innerHeight,xAxisTickFormat}) =>
{ return xScale.ticks().map((tickValue,i) => (
   <>
   {!(i%3) && <g className="xtick" transform={`translate(${xScale(tickValue)},0)`} >
     <line y2={innerHeight} />
     <text        
       style={{ textAnchor: 'middle' }}    
       dy="0.31em"              
       transform={`translate(0,-20),rotate(-90)`}                
     >       
       {xAxisTickFormat(tickValue)}
     </text>
   </g>}
   </>
 ))
}