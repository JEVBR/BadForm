import React, { useState, useEffect } from 'react';
// import DashTextElement from './DashTextElement'
//import DashTimeElement from '../elements/DashTimeElement'
// import DashOnOffElement from '../elements/DashOnOffElement'
// import DashBarElement from '../elements/DashBarElement'
// import DashDigitalElement from '../elements/DashDigitalElement'
// import DashAnalogElement from '../elements/DashAnalogElement'
// import DashGraphElement from './ETAF1DashGraphElement'

import DashManualElement from '../elements/DashManualElement'
// import DashTextElement from '../elements/DashTextElement'
import DashLastMsgElement from '../elements/DashLastMsgElement'

// import axios from 'axios'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export const GraphContext = React.createContext()


export const ManualInputContext = React.createContext()

export default function DashBoard ({ channels, lastEntry, formLayout })  {
  const ONE_DAY = 86400000;
  const now = new Date().valueOf()

  const aDayAgo = now - ONE_DAY

  const [timeSpan, setTimeSpan] = useState([aDayAgo, now]) // 1 day = default, and then set by user selection 
  // const [slotCount, setSlotCount] = useState(144)
  const [data, setData] = useState([]) 
  const [loading, setLoading] = useState([])
  
  const [manualInput, setManualInput] = useState([])
  const [postResultMessage, setPostResultMessage] = useState("")
  const [lastResultMessage, setLastResultMessage] = useState([])

  //const [user, setUser] = useState(null)
  // const [userSessionToken, setUserSessionToken] = useState(null) 

  const [animating, setAnimating] = useState(false)

  useEffect(() => {
      setPostResultMessage("(•_•)")
      console.log("Dash1App")
    return () => {
      console.log("exit Dash1App")
    }
  }, [])

  useEffect(() => {
    if (!animating) { setPostResultMessage("(•_•)")}
  }, [animating])

  // useEffect(() => { //Get user here
  //   setLoading(true)
  //   let cancel
  //   axios.get("/check_for_user",{
  //     cancelToken: new axios.CancelToken(c => cancel = c)
  //   }).then(res => {
  //     if (res.data.message) {
  //       setUser(res.data.message.email)
  //       setUserSessionToken(res.data.token)
  //       console.log(res.data)
  //     } else {
  //       setUser(null)
  //     }
  //   }).catch(err => {
  //     console.log(err)
  //   })

  //   // TODO do some error handling here also
  //   return () => cancel()
  // }, [])

  // useEffect(() => {
  //   console.log(new Date(timeSpan[0]))
  //   console.log(new Date(timeSpan[1]))
  //   let cancel
  //   const site_id = document.querySelector("[data-site-id]").dataset.siteId // Used to subscibe to correct site channel
  //   axios.get(`/api/v1/processed_entries?site_id=${site_id}&begin=${timeSpan[0]}&end=${timeSpan[1]}`,{
  //     cancelToken: new axios.CancelToken(c => cancel = c)
  //   }).then(res => {
  //     setData(organizeData(res.data.processed_entries.map(p => p), timeSpan, slotCount))
  //     setLoading(false)   
      
  //   }).catch(err => {
  //     console.log(err)
  //   })
  //   // TODO: do some error handling here also ?
  //   return () => cancel()
  // }, [timeSpan, user])

  useEffect(() => { 
    console.log('---------------------------- DATA -----------------------------------')
    console.log(data)
    console.log('---------------------------------------------------------------------')
  },[data]);


  useEffect(() => { 
    console.log('---------------------------- manualInput -----------------------------------')
    console.log(manualInput)
    console.log('---------------------------------------------------------------------')
  },[manualInput]);

  function organizeData(Entries, Span, count){
    const dataArray = []
    const length = (Span[1] - Span[0]) / count  
    for (var i = 0; i < count; i++) {
      const beginSlot = Span[0] + (length * i)
      const endSlot = Span[0] + (length * (i +1))
      const entry = { 
        id: i,
        start : beginSlot,
        stop : endSlot,
        data : entriesBetween(Entries, beginSlot , endSlot)
      }
      dataArray.push(entry)
     }
    return dataArray
  }

  function entriesBetween(entries, begin, end){ 
    const result = {"dataQty": 0 }
    entries.forEach((entry) => {
      let ts = Date.parse(bugFixTimeStamp(entry.timestamp))
      if (ts >= (begin-10800000) && ts < (end-10800000) ) { // slam into result if within window, may overwrite if more than one
        Object.assign(result, entry);
        result["dataQty"]++
      }
    });
    return result
  }

  function bugFixTimeStamp(ts) { // TODO : ETAF BUGFIX, timestamp = 2020-4-8T10:25:39:693P , has to be 2020-04-08T10:25:39.693Z 
    ts = ts.replace(/(^|\D)(\d)(?!\d)/g, '$10$2') // will add leading zeros to all lonely, single digits
    ts = ts.slice(0, -1) + 'Z';
    if (ts.slice(-5,-4) === ':') {
      ts = ts.replace(/:([^:]*)$/, "." + '$1')
    }
    return ts
  }

  // Create a context for children

  const manualInputContextValue = {
    handleEntryPost,
    handleManualInputChange
  }

  // Handles:

  function handleManualInputChange(changes) {
    Object.keys(changes).forEach( (key) => {
      console.log(key)
      if (key !="time"){
        changes[key] = changes[key].replace(',', '.')
      }
    })   
    setManualInput({...manualInput, ...changes })
    console.log(manualInput)
    setPostResultMessage("(•‿•)")
  }

  function removeEmptysFromManualInput() {
        let inputs = manualInput
    Object.keys(inputs).forEach( (key) => {
      if (inputs[key] == ''){
        delete inputs[key]
      } 
    });
    setManualInput(inputs)
  }

  function handleEntryPost(module) { 
    // SEND POST TO API (removed)
      removeEmptysFromManualInput()
      clearAllInputFields()
      setAnimating(true);
      const timer = setTimeout(() => setAnimating(false), 1000);
      setPostResultMessage(`Message has been send to the API, all field shoud be clear now`)
  }

  function clearAllInputFields() {
    const cleared = {}
    Object.keys(formLayout.forms).map(key => {
      let arrayKey = formLayout.forms[key]
      arrayKey.rows.forEach((row) => {console.log(row.items)
        row.items.forEach( (item) => {
          cleared[item] = "" 
        })
      })
    })
    setManualInput(cleared)
  }

  const showLastResultMessage = Object.keys(lastResultMessage).map(key => {
    return < DashLastMsgElement 
      key = { lastResultMessage[key] }
      message = { lastResultMessage[key]}
    />
  })

  const manualForms = Object.keys(formLayout.forms).map(index => { 
    for (let [key, value] of Object.entries(formLayout.forms[index])) {
      return (
        <Tab key = {`${value}`} eventKey={`Dados ${value}`} title={`Dados ${value}`}>
          <ManualInputContext.Provider value={manualInputContextValue}>
            <div className = "row">  
              <div className = "col-lg-12">    
                <DashManualElement
                    key = {`elm${value}`}
                    manualInput = { manualInput }
                    animating = {animating}
                    formLayout = {formLayout.forms[index]}
                  />  
              </div>  
              
              <div className = "col-lg-12">
                { postResultMessage }
              </div>

              <div className = "col-lg-12">
                { showLastResultMessage }
              </div>
            </div>  
          </ManualInputContext.Provider>
        </Tab>
      )
    }
  })

   return (
    <>
        <Tabs justify defaultActiveKey="tests" id="tests">
          { manualForms }
        </Tabs>
    </>
  )
}
