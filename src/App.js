import React, { Component } from 'react';
import Table from './components/Table';
import './styles/App.css';
import './styles/index.css';
import './styles/table.css';
import blart_dates from './data/blart_pi_dates';
import gccsj_dates from './data/gccsj_pi_dates';
// import GitHubIssueCount from './GitHub';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: "",
      blart_program_increment: "",
      blart_start_date: "",
      blart_end_date: "",
      blart_sprint: "",
      blart_current_month: "",
      gccsj_program_increment: "",
      gccsj_start_date: "",
      gccsj_end_date: "",
      gccsj_sprint: "",
      gccsj_current_month: ""
    }
  }

  componentDidMount() {
    //find out what today is
    var today = new Date().toLocaleDateString();
    // var today = new Date('3/5/2019').toLocaleString();
    // console.log(today)
    this.setState({ today: today })

    //iterate through both ARTs date sets
    for (let x = 0; x < blart_dates.length; x++) {
      for (let y = 0; y < blart_dates[x].sprints.length; y++) {
        // console.log(blart_dates[x].sprints[y].sprint_start_date)
        // console.log(today >= blart_dates[x].sprints[y].sprint_start_date)
        if (today >= blart_dates[x].sprints[y].sprint_start_date && today <= blart_dates[x].sprints[y].sprint_end_date) {
          // console.log("Hit")
          this.setState({
            blart_program_increment: blart_dates[x].program_increment,
            blart_sprint: blart_dates[x].sprints[y].current_sprint,
            blart_start_date: blart_dates[x].sprints[y].sprint_start_date,
            blart_end_date: blart_dates[x].sprints[y].sprint_end_date,
            blart_current_month: new Date(today).toLocaleString('en-us', { month: 'long' })
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
            gccsj_current_month: new Date(today).toLocaleString('en-us', { month: 'long' })
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
          <div className="art-block">
            <div className="row">
              <div className="col">
                <div className="blart-header">BluestoneLogic Agile Release Train<br />
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
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div>
                  {this.state.blart_current_month}
                  <Table
                    art="blart"
                    start_date={this.state.blart_start_date}
                    end_date={this.state.blart_end_date}
                    today={this.state.today}
                  />
                </div>

              </div>
              <div className="col projects">
                <h2>Active Projects</h2>
                <ul>
                  <li>C4PM Development</li>
                  <li>ITaaS</li>
                  {/* <li class="pill blue-pill">C4PM Development</li>
                  <li class="pill blue-pill">ITaaS</li> */}
                </ul>
              </div>
            </div>
          </div>
          {/* --------- GCCS-J  ----------- */}
          <div className="art-block">
            <div className="row">
              <div className="col">
                <div className="blart-header">GCCS-J Agile Release Train<br /></div>
              </div>
            </div>
            <div className="row">
              <div className="col"><hr /></div>
            </div>
            {/* --------- GCCS-J  ----------- */}
            <div className="row">
              <div className="col">
                <div className="blart-purple blart-title">
                  {this.state.gccsj_program_increment} - {this.state.gccsj_sprint}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div>
                  {this.state.gccsj_current_month}

                  <Table
                    art="gccsj"
                    start_date={this.state.gccsj_start_date}
                    end_date={this.state.gccsj_end_date}
                    today={this.state.today}
                    sprint={this.state.gccsj_sprint}
                  />
                </div>
              </div>
              <div className="col projects">
                <h2>Active Projects</h2>
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
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
