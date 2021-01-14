import React from 'react';
import {Line} from 'react-chartjs-2';
import Axios_example from './compontents/Axios_example';
import Axios_2 from './compontents/Axios_2';
import Axios_3 from './compontents/Axios_3';
import Nivo_Rocks from './compontents/Nivo_Rocks';

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May',],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56,30,20,20,20]
    }
  ]
}


export default class App extends React.Component {
  render() {
    return (
      <div>
        
        <div> <Axios_example /></div>
      {/* <div><Axios_2 /></div> */}
      <div><Axios_3 /></div>
      <div><Nivo_Rocks /></div>
      </div>
    );
  }
}