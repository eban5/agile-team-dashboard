import React, { Component } from 'react';
import './App.css';
import './index.css';
import { data } from './pi5.js';
// import GitHubIssueCount from './GitHub';

Date.prototype.addDays = function (days) {
  var dat = new Date(this.valueOf())
  dat.setDate(dat.getDate() + days);
  return dat;
}

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    // skip weekends
    if (currentDate.getDay() !== 0 || currentDate.getDay() !== 6) {
      dateArray.push(currentDate)
      currentDate = currentDate.addDays(1);
    }
  }
  return dateArray;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      program_increment: "",
      iteration: "",
      current_date: "",
      iteration_day: "",
      color: true,
      start_date: "",
      end_date: "",
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
          iteration_day: data[i].iteration_day,
          current_month: new Date().toLocaleString('en-us', { month: 'long' })
        })
      }
    }

    var dateArray = getDates(new Date('03/18/2019'), (new Date()).addDays(10));
    this.setState({
      date_range: dateArray,
      start_date: dateArray[0].toDateString(),
      end_date: dateArray[dateArray.length - 1].toDateString()
    })

  }


  render() {
    var { date_range } = this.state;
    var cal = date_range.map((item, idx) => {
      if (item.getDate() === new Date().getDate()) {
        return (<td className="today" key={idx}>
          {item.getDate()}<div className="day"></div>
        </td>)

      } else {
        return (
          <td key={idx}>
            {item.getDate()}
            <div className="day"></div>
          </td>)
      }
    })
    var first_half = cal.splice(0, (cal.length / 2) - 1);
    var second_half = cal.splice((cal.length / 2) - 1);

    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="blart-header">BluestoneLogic Agile Release Train<br />
              </div>
            </div>
            {/* <div className="col">
              <div className="blart-header">GCCS-J Agile Release Train<br />
              </div>
            </div> */}
          </div>
          <div className="row">
            <div className="col"><hr /></div>
          </div>

          <div className="row">
            <div className="img-container">
              <div className="col">
                <div className="blart-blue blart-title">
                  {this.state.program_increment} - {this.state.iteration}
                </div>
                <div>
                  <strong>{this.state.current_month}</strong>
                  <table style={{ border: '1px solid white' }}>
                    <tbody>
                      <tr style={{ border: '1px solid white' }}>
                        {first_half}
                      </tr>
                      <tr>
                        {second_half}
                      </tr>
                    </tbody>
                  </table>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
