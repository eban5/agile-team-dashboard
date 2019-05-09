import React, { Component } from 'react';
import Table from './components/Table';
import ProjectList from "./components/ProjectList";
import './styles/App.css';
import './styles/index.css';
import './styles/table.css';
import team1_dates from './data/team1_pi_dates';
import team2_dates from './data/team2_pi_dates';

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
      team1_program_increment: "",
      team1_start_date: "",
      team1_end_date: "",
      team1_sprint: "",
      team1_current_month: "",
      team1_date_range: "",
      team2_program_increment: "",
      team2_start_date: "",
      team2_end_date: "",
      team2_sprint: "",
      team2_current_month: "",
      team2_date_range: "",
    }
  }

  componentDidMount() {
    //find out what today is
    var today = new Date();
    this.setState({ today: today })

    //iterate through both ARTs date sets
    for (let x = 0; x < team1_dates.length; x++) {
      for (let y = 0; y < team1_dates[x].sprints.length; y++) {
        let sprint_start_date = new Date(team1_dates[x].sprints[y].sprint_start_date);
        let sprint_end_date = new Date(team1_dates[x].sprints[y].sprint_end_date);
        /*  
          we check for end_date + 1 day as the array end bounds because new Javascript Date objects 
          include full timestamps set to 00:00:00, so if its 11AM on 4-12, this falls out of range.
          Since it doesn't fall into a date range ending in 4-12 or the next range starting 4-13, 
          the table shows up blank on the dashboard.
        */
        if (today >= sprint_start_date && today <= sprint_end_date.addDays(1)) {
          // get the weekdays in each range
          var team1_date_range = getWeekdays(sprint_start_date, sprint_end_date);
          this.setState({
            team1_program_increment: team1_dates[x].program_increment,
            team1_sprint: team1_dates[x].sprints[y].current_sprint,
            team1_start_date: sprint_start_date,
            team1_end_date: sprint_end_date,
            team1_current_month: today.toLocaleString('en-us', { month: 'long' }),
            team1_date_range: team1_date_range
          })
        }
      }
    }

    for (let x = 0; x < team2_dates.length; x++) {
      for (let y = 0; y < team2_dates[x].sprints.length; y++) {
        let sprint_start_date = new Date(team2_dates[x].sprints[y].sprint_start_date);
        let sprint_end_date = new Date(team2_dates[x].sprints[y].sprint_end_date);
        if (today >= sprint_start_date && today <= sprint_end_date.addDays(1)) {
          // get the weekdays in each range
          var team2_date_range = getWeekdays(sprint_start_date, sprint_end_date);
          this.setState({
            team2_program_increment: team2_dates[x].program_increment,
            team2_sprint: team2_dates[x].sprints[y].current_sprint,
            team2_start_date: sprint_start_date,
            team2_end_date: sprint_end_date,
            team2_current_month: today.toLocaleString('en-us', { month: 'long' }),
            team2_date_range: team2_date_range
          })
        }
      }
    }
  }
  //send the appropriate date ranges to each Table component
  render() {
    const { today,
      team1_program_increment,
      team1_sprint,
      team1_start_date,
      team1_end_date,
      team1_current_month,
      team1_date_range,
      team2_program_increment,
      team2_sprint,
      team2_start_date,
      team2_end_date,
      team2_current_month,
      team2_date_range } = this.state;

    return (
      <div className="App">
        <div className="container-fluid">
          <div className="art-block">
            <div className="row">
              <div className="col">
                <div className="team1-header">Team 1 Agile Release Train<br />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col"><hr /></div>
            </div>
            <div className="row">
              <div className="col">
                <div className="team1-blue team1-title">
                  {team1_program_increment} - {team1_sprint}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div>
                  {team1_current_month}
                  <Table
                    art="team1"
                    start_date={team1_start_date}
                    end_date={team1_end_date}
                    today={today}
                    date_range={team1_date_range}
                  />
                </div>

              </div>
              <div className="col projects">
                <ProjectList art="team1" />
              </div>
            </div>
          </div>
          {/* --------- GCCS-J  ----------- */}
          <div className="art-block">
            <div className="row">
              <div className="col">
                <div className="team1-header">Team 2 Agile Release Train<br /></div>
              </div>
            </div>
            <div className="row">
              <div className="col"><hr /></div>
            </div>
            {/* --------- GCCS-J  ----------- */}
            <div className="row">
              <div className="col">
                <div className="team1-purple team1-title">
                  {team2_program_increment} - {team2_sprint}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div>
                  {team2_current_month}

                  <Table
                    art="team2"
                    start_date={team2_start_date}
                    end_date={team2_end_date}
                    today={today}
                    sprint={team2_sprint}
                    date_range={team2_date_range}
                  />
                </div>
              </div>
              <div className="col projects">
                <ProjectList art="team2" />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
