
const ToolTipDiv = ({master,value}) => {
    return <div>
        <h6>{master} : {value}</h6>
    </div>
}
export const ToolTip = ({toolTipData}) => {
    return <section className="tooltip">
        <header>{toolTipData.State}</header>
        <div className="underline-tooltip"></div>
        <div className="tooltip-info">
            {Object.keys(toolTipData).map((key, idx) => {
                return idx>0 && 
                (<ToolTipDiv master={key} value={toolTipData[key]}/>)
            }) }
        </div>
    </section>
}