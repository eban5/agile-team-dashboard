import React, { Component } from 'react';
import './App.css';
import './index.css';
import data from './pi5.js'
import GitHubIssueCount from './GitHub';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      program_increment: "",
      iteration: "",
      current_date: "",
      iteration_day: "",
    }
  }

  componentDidMount() {


    var today = new Date().toLocaleDateString();
    // console.log(today);

    for (var i = 0; i < data.length; i++) {
      var mydate = new Date(data[i].current_date).toLocaleDateString();
      if (today === mydate) {
        // date match
        this.setState({
          program_increment: data[i].program_increment,
          iteration: data[i].iteration,
          current_date: data[i].current_date,
          iteration_day: data[i].iteration_day
        })
      }
    }

  }


  render() {

    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="blart-header">BluestoneLogic Agile Release Train<br />
                <hr />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="blart-blue blart-title">
                {this.state.program_increment} - {this.state.iteration} - Day {this.state.iteration_day} of 10
                </div>
              <div>
                <p>Start Date: March 4, 2019</p>
                <p>End Date: March 15, 2019</p>
              </div>
              <div style={{
                "paddingTop": '50px'
              }}></div>
              <GitHubIssueCount owner="BluestoneLogic" repository="web-design-standards" authKey="" />
              <div>
                <h3>Active Projects</h3>
                <ul>

                  <li>C4PM Development</li>
                  <li>ITaaS</li>
                </ul>
              </div>
            </div>
            <div className="col">
              <img alt={'background'} className="blart-background" src="blart-background.png" />
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
