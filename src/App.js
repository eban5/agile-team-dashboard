import React, { Component } from 'react';
import Table from './components/Table';
import './styles/App.css';
import './styles/index.css';
import './styles/table.css';
import blart_dates from './data/blart_pi_dates';
import gccsj_dates from './data/gccsj_pi_dates';
// import GitHubIssueCount from './GitHub';

//eslint-disable-next-line
Date.prototype.addDays = function (days) {
  var dat = new Date(this.valueOf())
  dat.setDate(dat.getDate() + days);
  return dat;
}

function getWeekdays(startDate, stopDate) {
  var dateArray = [];
  var thisDate = startDate;
  while (thisDate <= stopDate) {
    // skip weekends
    if (thisDate.getDay() !== 0 && thisDate.getDay() !== 6) {
      dateArray.push(thisDate)
    }
    thisDate = thisDate.addDays(1);
  }
  return dateArray;
}

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
      blart_date_range: "",
      gccsj_program_increment: "",
      gccsj_start_date: "",
      gccsj_end_date: "",
      gccsj_sprint: "",
      gccsj_current_month: "",
      gccsj_date_range: "",
    }
  }

  componentDidMount() {
    //find out what today is
    var today = new Date();
    this.setState({ today: today })

    //iterate through both ARTs date sets
    for (let x = 0; x < blart_dates.length; x++) {
      for (let y = 0; y < blart_dates[x].sprints.length; y++) {
        let sprint_start_date = new Date(blart_dates[x].sprints[y].sprint_start_date);
        let sprint_end_date = new Date(blart_dates[x].sprints[y].sprint_end_date);

        if (today >= sprint_start_date && today <= sprint_end_date) {
          // get the weekdays in each range
          var blart_date_range = getWeekdays(sprint_start_date, sprint_end_date);
          this.setState({
            blart_program_increment: blart_dates[x].program_increment,
            blart_sprint: blart_dates[x].sprints[y].current_sprint,
            blart_start_date: sprint_start_date,
            blart_end_date: sprint_end_date,
            blart_current_month: today.toLocaleString('en-us', { month: 'long' }),
            blart_date_range: blart_date_range
          })
        }
      }
    }

    for (let x = 0; x < gccsj_dates.length; x++) {
      for (let y = 0; y < gccsj_dates[x].sprints.length; y++) {
        let sprint_start_date = new Date(gccsj_dates[x].sprints[y].sprint_start_date);
        let sprint_end_date = new Date(gccsj_dates[x].sprints[y].sprint_end_date);
        if (today >= sprint_start_date && today <= sprint_end_date) {
          // get the weekdays in each range
          var gccsj_date_range = getWeekdays(sprint_start_date, sprint_end_date);
          this.setState({
            gccsj_program_increment: gccsj_dates[x].program_increment,
            gccsj_sprint: gccsj_dates[x].sprints[y].current_sprint,
            gccsj_start_date: sprint_start_date,
            gccsj_end_date: sprint_end_date,
            gccsj_current_month: today.toLocaleString('en-us', { month: 'long' }),
            gccsj_date_range: gccsj_date_range
          })
        }
      }
    }
  }
  //send the appropriate date ranges to each Table component
  render() {
    const { today,
      blart_program_increment,
      blart_sprint,
      blart_start_date,
      blart_end_date,
      blart_current_month,
      blart_date_range,
      gccsj_program_increment,
      gccsj_sprint,
      gccsj_start_date,
      gccsj_end_date,
      gccsj_current_month,
      gccsj_date_range } = this.state;

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
                  {blart_program_increment} - {blart_sprint}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div>
                  {blart_current_month}
                  <Table
                    art="blart"
                    start_date={blart_start_date}
                    end_date={blart_end_date}
                    today={today}
                    date_range={blart_date_range}
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
                  {gccsj_program_increment} - {gccsj_sprint}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div>
                  {gccsj_current_month}

                  <Table
                    art="gccsj"
                    start_date={gccsj_start_date}
                    end_date={gccsj_end_date}
                    today={today}
                    sprint={gccsj_sprint}
                    date_range={gccsj_date_range}
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
