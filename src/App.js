import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import './index.css';
import './styles/table.css'
import blart_dates from './blart_pi_dates';
import gccsj_dates from './gccsj_pi_dates';
// import GitHubIssueCount from './GitHub';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blart_program_increment: "",
      blart_start_date: "",
      blart_end_date: "",
      blart_sprint: "",
      current_month: "",
      gccsj_program_increment: "",
      gccsj_start_date: "",
      gccsj_end_date: "",
      gccsj_sprint: "",
    }
  }

  componentDidMount() {
    //find out what today is
    var today = new Date().toLocaleDateString();

    //iterate through both ARTs date sets
    for (let x = 0; x < blart_dates.length; x++) {
      for (let y = 0; y < blart_dates[x].sprints.length; y++) {

        if (today >= blart_dates[x].sprints[y].sprint_start_date && today <= blart_dates[x].sprints[y].sprint_end_date) {
          this.setState({
            blart_program_increment: blart_dates[x].program_increment,
            blart_sprint: blart_dates[x].sprints[y].current_sprint,
            blart_start_date: blart_dates[x].sprints[y].sprint_start_date,
            blart_end_date: blart_dates[x].sprints[y].sprint_end_date,
            current_month: new Date().toLocaleString('en-us', { month: 'long' })
          })
        }
      }
    }

    for (let x = 0; x < gccsj_dates.length; x++) {
      for (let y = 0; y < gccsj_dates[x].sprints.length; y++) {
        if (today >= gccsj_dates[x].sprints[y].sprint_start_date && today <= gccsj_dates[x].sprints[y].sprint_end_date) {
          this.setState({
            gccsj_program_increment: gccsj_dates[x].program_increment,
            gccsj_sprint: gccsj_dates[x].sprints[y].current_sprint,
            gccsj_start_date: gccsj_dates[x].sprints[y].sprint_start_date,
            gccsj_end_date: gccsj_dates[x].sprints[y].sprint_end_date,
          })
        }
      }
    }
  }
  //send the appropriate date ranges to each Table component
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
                {this.state.blart_program_increment} - {this.state.blart_sprint}
              </div>
              <div>
                {this.state.current_month}
                <Table art="blart" start_date={this.state.blart_start_date} end_date={this.state.blart_end_date} />
              </div>
              <div style={{
                "paddingTop": '50px'
              }}></div>
              {/* <GitHubIssueCount owner="BluestoneLogic" repository="methods" authKey="" /> */}
              <div>
                <h4>Active Projects</h4>
                <ul>
                  <li>C4PM Development</li>
                  <li>ITaaS</li>
                  {/* <li class="pill blue-pill">C4PM Development</li>
                  <li class="pill blue-pill">ITaaS</li> */}
                </ul>
              </div>
              <div style={{
                "paddingTop": '150px'
              }}></div>
            </div>
            {/* GCCS-J */}
            <div className="col">
              <div className="blart-purple blart-title">
                {this.state.gccsj_program_increment} - {this.state.gccsj_sprint}
              </div>
              <div>
                {this.state.current_month}

                <Table art="gccsj" start_date={this.state.gccsj_start_date} end_date={this.state.gccsj_end_date} />

              </div>
              <div style={{
                "paddingTop": '50px'
              }}></div>
              {/* <GitHubIssueCount owner="BluestoneLogic" repository="methods" authKey="" /> */}
              <div>
                <h4>Active Projects</h4>
                <ul>
                  <li>JE DevOps Pipeline</li>
                  <li>Comms Topology</li>
                  <li>JE Cyber Security Engineering</li>
                  <li>JE Interface Management</li>
                  <li>JE PMO Strategy</li>
                  <li>JE Continuous Exploration</li>
                  <li>J Central Curation</li>
                  {/* <li class="pill purple-pill">DevOps Pipeline</li>
                  <li class="pill purple-pill">Comms Topology</li> */}
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
