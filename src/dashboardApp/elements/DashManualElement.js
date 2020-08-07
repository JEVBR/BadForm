
import React, { useContext, useState, useEffect } from 'react';
import { ManualInputContext } from '../Dash/DashBoard'
// import DatePicker  from 'react-datepicker'

export default function DashManualElement ( {manualInput, animating, formLayout } )  {
  const { handleEntryPost, handleManualInputChange } = useContext(ManualInputContext)
  const [startDate, setStartDate] = useState(new Date())
  const [formName, setFormName] = useState({})

  useEffect(() => {
    setStartDate(new Date())
  }, [animating])

  function handlePost() { 
    handleEntryPost(formLayout.module_name)
  }

  function handleChange(changes) {
    handleManualInputChange (changes)
  }

  function RowName(props) {
    return (
      <tr><th>{props.row_name}</th></tr>
    )
  }

  function ShowNames(props){
    return (
      <tr>
        {props.value.map(name => ( 
          <th key = {name} scope="col"> {name} </th>
        ))}
      </tr>
    )
  }

  function ShowNoNames(){
    return (
      <tr>
        <th></th>  
      </tr>
    ) 
  }

  function ManualInputs (props){
    const formField = props.value.map(item => 
      
        <td>
          { item ? 
            <input 
              type="text"
              name={item}
              id={item}
              value={manualInput.item}
              onChange={e => handleChange({ [item]: e.target.value})}
              className="post-edit__input" 
            /> 
          :
            <div></div>
          }     
        </td>
    )
    return (
       formField 
    )
  }
// <tr key= {item} className= {animating ? "dash-manual-entrada" : "dash-manual-entrada2"}>
  function FormRows() {
    const formRows = formLayout.rows.map( ({ row_name, item_names, show_names, items}) => 
      <React.Fragment key={`Fragment${row_name}`}>
        < RowName key = {row_name} value={row_name} />
        { show_names === "true" ? < ShowNames key = {item_names} value={item_names}/> : <ShowNoNames key = {item_names}/> }
        <tr>
          < ManualInputs key ={items} value= {items} />
        </tr>
      </React.Fragment>
    )
      console.log(formRows)
      return (
         formRows 
      )
  }

  const submitButton = 
    <button
      className="btn btn--primary mr-1"
      onClick={() => handlePost()}
      >
     SEND
    </button>

  return (
    <div>
      <div className="dash-overflow">
        <table className="table">
          <tbody>
            <tr> 
              <th>
                { submitButton }
              </th>
            </tr>
          </tbody>
        </table>

        <table className="table-striped table-bordered">
          <tbody>
            {FormRows() }
          </tbody>
        </table>
      </div>
    </div>
  );
}