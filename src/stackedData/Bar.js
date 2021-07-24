export const Bar = ({stackedData,xScale,yScale,colorScale}) => {
    return stackedData.map((field,i) => {
     return (field.map((data,j) => {
       return (
         <rect
           x={xScale(data[0])}
           y={yScale(data.data.State)}
           height = {yScale.bandwidth()}
           width={xScale(data[1]-data[0])}
           fill={colorScale(i)}
          
         />
       )
     }))
   })
  }