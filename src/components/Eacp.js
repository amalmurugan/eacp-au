
import React, { useState } from 'react';
// import axios from 'axios';
import dataFeed from '../dataFeed/dataFeed.json';
import './Eacp.css';

function Eacp() {
  // const didMount = <useDidMount/>;
  // const [data, setData] = useState([]);
  // if (didMount) {
  //   axios.get(`https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals`)
  //   .then(response => {
  // setData(response.data);
  //   })
  // }
  //DataFeed data being used as was facing cors issue with the api
  let data = dataFeed;

  function displayBands(bandName, recordLabel, i, festivals, output) {
    output.push({ 'recordLabel': recordLabel, 'bandName': bandName, 'festivals': festivals })
  }

  function displayData(festivals, bands, index, output) {
    return bands.map((bands, i) => ((displayBands(bands.name, bands.recordLabel, i, festivals, output))))
  }

  let output = []
  data.map((data, index) => ((displayData(data.name, data.bands, index, output))))
  output.forEach((value, index) => {
    if (value.recordLabel === '' || value.recordLabel === undefined) {
      delete output[index];
    }
  });

  output.sort((a, b) => a.recordLabel.localeCompare(b.recordLabel));
  let tempRecordLabel = ''
  let result = []
  let bands = []
  output.forEach((element, index) => {
    if ((tempRecordLabel !== element.recordLabel) && index > 0) {
      result.push({ 'recordLabel': element.recordLabel, 'bands': bands })
      bands = []
    }
    bands.push({ 'bandName': element.bandName, 'festivals': element.festivals })
    tempRecordLabel = element.recordLabel
  });

  const displayResponse = (recordLabel, bands, index) => (
    <React.Fragment key={index} >
      <div className="content">
        <div className='record'>{recordLabel}</div>
        <div>
          {bands.map((bands, i) => ((displayOutput(bands.bandName, bands.festivals, i))))}
        </div>
      </div>
    </React.Fragment >
  );

  const displayOutput = (bandName, festivals, i) => (
    <React.Fragment key={i}>
      <div className='band'>{bandName}</div>
      <div className='festival'>{festivals}</div>
    </React.Fragment>
  );
  return (result.map((result, index) => ((displayResponse(result.recordLabel, result.bands, index)))))
}
export default Eacp;