import React, { useState, useEffect } from 'react';
// import consumer from '../../channels/consumer'
// Custom dashboards:
import DashBoard from './Dash/DashBoard'

function DashboardApp() {

  const [formLayout, setFormLayout] = useState({   "forms":[
    {
      "page_name":"Plant1",
      "module_name":"Form_Plant1",
      "rows":[{
        "row_name":"Inputs",
        "show_names":"true",
        "item_names":[
           "Volume",
           "Total"],
        "items":[
           "Volume_Agua_E",
           "Volume_Agua_A_E"]},{  
        "row_name":"Outputs",
        "show_names":"false",
        "item_names":[
          "VolumeS",
          "TotalS"],
        "items":[
           "Volume_Agua_S",
           "Volume_Agua_A_E"]}]},
    { 
      "page_name":"Plant2",
      "module_name":"Form_Plant2",
      "rows":[{
        "row_name":"Inputs",
        "show_names":"true",
        "item_names":[
           "Volume2",
           "Total2"],
        "items":[
           "Volume_Agua_E2",
           "Volume_Agua_A_E2"]},{  
        "row_name":"Outputs",
        "show_names":"false",
        "item_names":[
          "VolumeS2",
          "TotalS2"],
        "items":[
           "Volume_Agua_S2",
           "Volume_Agua_A_E2"
  ]}]}]}
)  
  
  return (
    <div className = "container pb-5" key = {"screenkey"}>
        <DashBoard 
          key = {'dashboard'}
          formLayout = {formLayout}
        />
    </div>
  );
}

export default DashboardApp;
