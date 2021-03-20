import React, {useState} from "react"
import ReactDOM from "react-dom"
import Octadground from "react-octadground/octadground"
import "react-octadground/dist/styles/octadground.css"
import "./index.css";

export const Demo = () => {
    const [ofen, setOfen] = useState("ppkn/4/4/NKPP w NCFncf - 0 1")

    return (
        <div className="view-container">
            <Octadground
                ofen={ofen}
                width="38vw"
                height="38vw"
            />
        </div>
    )
}

ReactDOM.render(<Demo/>, document.getElementById("root"))
