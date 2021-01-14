import React from 'react';

import axios from 'axios';
import {Line} from 'react-chartjs-2';

export default class PersonList extends React.Component {
    chartReference = {};
    constructor(props)
    {
        super(props);
        this.chartReference = React.createRef();
    }
    state = {
        joke: "",
        value: 1
      };

       line = {
        labels: ['January'],
     datasets: [
         {
         label: 'Rainfall',
         backgroundColor: 'rgba(75,192,192,1)',
         borderColor: 'rgba(0,0,0,1)',
         borderWidth: 2,
         data: [this.state.value]
         }
     ]
    };

    
    
      componentDidMount() {

        console.log(this.chartReference); // returns a Chart.js instance reference


        this.getJoke();
        this.interval = setInterval(() => {
          this.getJoke()
        }, 1000);

        this.interval = setInterval(() =>
        {
            this.increaseValue();
        },1000
        );

        let lineChart = this.reference.chartInstance
        this.interval = setInterval(() =>
        {      
            lineChart.update();
        },1000
        );

      }
    
      increaseValue()
      {
        this.setState({value: this.state.value+1})
      }

      getJoke() {
        fetch("http://worldclockapi.com/api/json/utc/now")
          .then(res => {
            return res.json();
          })
          .then(res => {
            this.setState({  
                joke: res.currentFileTime,    
               
            });
          });
      }
    
     componentWillUnmount() {
       clearInterval(this.interval);
     }
    
      render() {
        return (
        
       <div>
           <Line 
               ref = {(reference) => this.reference = reference}
                data={this.line}
                options={{
                title:{
                    display:true,
                    text:'Average Rainfall per month',
                    fontSize:20
                },
                legend:{
                    display:true,
                    position:'right'
                }
                }}
               

           />
            <p>{this.state.joke}</p>;
            <p>{this.state.value}</p>;
       </div>
       
        );

      }
    }
    
  