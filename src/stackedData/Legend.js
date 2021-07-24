export const Legend = ({fields,colorScale}) =>{
    return <>
    <svg className='legend-section'  >
        <text transform={`translate(0,10)`}>Legends</text>
        {fields.map((field,i) => {
            return <g transform={`translate(10,${25*(i+1)})`}>
                <circle fill={colorScale(i)} r={10} ></circle>
                <text transform={`translate(25,0)`}  dy="0.32em">{field}</text>
            </g>
        })}
    </svg></>
}