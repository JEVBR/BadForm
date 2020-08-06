import React, { useState, useEffect } from 'react';

export default function DashLastMsgElement ( { message } )  {
  const [animating, setAnimating] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [messageStatus, setMessageStatus] = useState("BAD")

  useEffect(() => {
    setMessageText(JSON.stringify(JSON.parse(message)["msg"]))
    setMessageStatus(JSON.stringify(JSON.parse(message)["status"]))
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [message])

  return (
    <div className= {animating ? "dash_last_text_element-transition" : "dash_last_text_element-transition2"}>
     { `${messageStatus} - ${messageText}` }
    </div>
  )
}
