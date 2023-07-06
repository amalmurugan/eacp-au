
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import DataFeed from '../DataFeed/DataFeed.json';

function Eacp() {
  const didMount = useDidMount();
  // const [data, setData] = useState([]);
  // if (didMount) {
  //   axios.get(`https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals`)
  //   .then(response => {
  // setData(response.data);
  //   })
  // }
  //DataFeed data being used as was facing cors issue with the api
  let data = DataFeed;


  function displayBands(bandName, recordLabel, i, festivals, output) {
    output.push({ 'recordLabel': recordLabel, 'bandName': bandName, 'festivals': festivals })
  }

  function displayData(festivals, bands, index, output) {
    return bands.map((bands, i) => ((displayBands(bands.name, bands.recordLabel, i, festivals, output))))
  }

  let output = []
  data.map((data, index) => ((displayData(data.name, data.bands, index, output))))


  output.forEach((value, index) => {
    if (value.recordLabel == '' || value.recordLabel == undefined) {
      delete output[index];
    }
  });
  
  output.sort((a, b) => a.recordLabel.localeCompare(b.recordLabel));
  let tempRecordLabel = ''
  let result = []
  let bands = []
  output.forEach((element, index) => {
    if ((tempRecordLabel != element.recordLabel) && index > 0) {
      result.push({ 'recordLabel': element.recordLabel, 'bands': bands })
      bands = []
    }
    bands.push({ 'bandName': element.bandName, 'festivals': element.festivals })
    tempRecordLabel = element.recordLabel
  });

  const displayResponse = (recordLabel, bands, index) => (
    <React.Fragment key={index} >
      <div>{recordLabel}</div>
      <div>
        {bands.map((bands, i) => ((displayOutput(bands.bandName, bands.festivals, i))))}
      </div>
    </React.Fragment >
  );

  const displayOutput = (bandName, festivals, i) => (
    <React.Fragment key={i}>
      <div className='ml40'>{bandName}</div>
      <div className='ml80'>{festivals}</div>
    </React.Fragment>
  );
  return (result.map((result, index) => ((displayResponse(result.recordLabel, result.bands, index)))))

}

function useDidMount() {
  const didMountRef = useRef(true);
  useEffect(() => {
    didMountRef.current = false;
  }, []);
  return didMountRef.current;
};

export default Eacp;