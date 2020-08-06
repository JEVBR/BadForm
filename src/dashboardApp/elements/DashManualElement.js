
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

  // This is where keys go missing? 
  const formRows = formLayout.rows.map( ({ row_name, item_names, show_names, items}) => {
    return <>
      <tr><th key = {row_name}>{row_name}</th></tr>
      {show_names == "true" ? 
        <tr>
          {item_names.map(name => ( 
            <th key = {name} scope="col"> {name} </th>
          ))}
        </tr>
      : 
        <tr>
          <th></th>  
        </tr>
      }  
  
      <tr className= {animating ? "dash-manual-entrada" : "dash-manual-entrada2"}>    
        {items.map(item => (
          <th key ={item}>
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
          </th>
        ))}    
      </tr>
    </>
  })

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
            {formRows}
          </tbody>
        </table>
      </div>
    </div>
  );
}