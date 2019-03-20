import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import './index.css';
import './styles/table.css'
import { data } from './pi5.js';
// import GitHubIssueCount from './GitHub';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      program_increment: "",
      iteration: "",
      current_date: "",
      // iteration_day: "",
      color: true,
      date_range: [],
      current_month: "",
    }
  }

  componentDidMount() {

    var today = new Date().toLocaleDateString();
    var dates = [];
    for (var i = 0; i < data.length; i++) {
      var mydate = new Date(data[i].current_date).toLocaleDateString();
      dates.push(data[i].current_date)
      if (today === mydate) {
        // date match
        this.setState({
          program_increment: data[i].program_increment,
          iteration: data[i].iteration,
          current_date: data[i].current_date,
          // iteration_day: data[i].iteration_day,
          current_month: new Date().toLocaleString('en-us', { month: 'long' })
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
              </div>
            </div>
            <div className="col">
              <div className="blart-header">GCCS-J Agile Release Train<br />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col"><hr /></div>
          </div>

          <div className="row">
            <div className="col">
              <div className="blart-blue blart-title">
                {this.state.program_increment} - {this.state.iteration}
              </div>
              <div>
                {this.state.current_month}

                <Table art="blart" />

              </div>
              <div style={{
                "paddingTop": '50px'
              }}></div>
              {/* <GitHubIssueCount owner="BluestoneLogic" repository="methods" authKey="" /> */}
              <div>
                <h3>Active Projects</h3>
                <ul>
                  <li>C4PM Development</li>
                  <li>ITaaS</li>
                </ul>
              </div>
              <div style={{
                "paddingTop": '150px'
              }}></div>
            </div>
            {/* GCCS-J */}
            <div className="col">
              <div className="blart-purple blart-title">
                {/* {this.state.program_increment} - {this.state.iteration} */}
                PI 1 - Iteration 1.4
                {/* <br />"Innovation and Planning" */}
              </div>
              <div>
                {this.state.current_month}

                <Table art="gccsj" />

              </div>
              <div style={{
                "paddingTop": '50px'
              }}></div>
              {/* <GitHubIssueCount owner="BluestoneLogic" repository="methods" authKey="" /> */}
              <div>
                <h3>Active Projects</h3>
                <ul>
                  <li>Comms Topology</li>
                  <li>DevOps</li>
                </ul>
              </div>
              <div style={{
                "paddingTop": '150px'
              }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
