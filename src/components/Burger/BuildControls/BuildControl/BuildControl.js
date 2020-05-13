import React from "react"
import classes from "./BuildControl.module.css"

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button className={classes.Less} onClick={props.removed} disabled={props.disabled}><i class="fas fa-minus"></i></button>
    <div style={{width: "60px"}}>{props.igValue} {props.igValue === 1 ? "unit" : "units"}</div>
    <button className={classes.More} onClick={props.added}><i class="fas fa-plus"></i></button>
  </div>
)

export default buildControl