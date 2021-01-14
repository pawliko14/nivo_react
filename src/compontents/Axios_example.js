import React,{Component} from 'react';



export default class Axios_example extends Component {
  
    state = {
      joke: ""
    };
  
    componentDidMount() {
      this.getJoke();
      this.interval = setInterval(() => {
        this.getJoke();
      }, 5000);
    }
  
    getJoke() {
      fetch("https://api.chucknorris.io/jokes/random")
        .then(res => {
          return res.json();
        })
        .then(res => {
          this.setState({
            joke: res.value
          });
        });
    }
  
   componentWillUnmount() {
     clearInterval(this.interval);
   }
  
    render() {
      return <p>{this.state.joke}</p>;
    }
  }
  
