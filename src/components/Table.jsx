import React from 'react';
import '../styles/table.css';

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        // skip weekends
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            dateArray.push(currentDate)
        }
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

export default function Table(props) {
    if (props.art === "blart") {
        var blart_dates = getDates(new Date(props.start_date), new Date(props.end_date));
        var cal = blart_dates.map((item, idx) => {
            if (item.getDate() === new Date(props.today).getDate()) {
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

        var first_row = [];
        var second_row = [];
        for (let x = 0; x < cal.length; x++) {
            if (x < 5) {
                first_row.push(cal[x]);
            } else {
                second_row.push(cal[x]);
            }
        }

        return (
            <table>
                <tbody>
                    <tr>
                        {first_row}
                    </tr>
                    <tr>
                        {second_row}
                    </tr>
                </tbody>
            </table>
        )
    } else if (props.art === "gccsj") {
        var gccsj_dates = getDates(new Date(props.start_date), new Date(props.end_date));
        var j_cal = gccsj_dates.map((item, idx) => {
            if (item.getDate() === new Date(props.today).getDate()) {
                return (<td className="today_gccsj" key={idx}>
                    {item.getDate()}
                </td>)

            } else if (idx === 0) {
                return (<td className="td-blank" key={idx}></td>)
            }
            else {
                return (
                    <td key={idx}>
                        {item.getDate()}
                    </td>)
            }
        })

        var j_first_row = [];
        var j_second_row = [];
        var j_third_row = [];
        var j_fourth_row = [];

        for (let x = 0; x < j_cal.length; x++) {
            if (x < 5) {
                j_first_row.push(j_cal[x]);
            } else if (x >= 5 && x < 10) {
                j_second_row.push(j_cal[x]);
            } else if (x >= 10 && x < 15) {
                j_third_row.push(j_cal[x]);
            } else {
                if (props.sprint !== "Sprint 4") {
                    //Sprint 4 is the only 2 week Sprint
                    j_fourth_row.push(j_cal[x]);
                }
            }
        }

        if (props.sprint !== "Sprint 4") {
            return (
                <div>
                    <table>
                        <tbody>
                            <tr>
                                {j_first_row}
                            </tr>
                            <tr>
                                {j_second_row}
                            </tr>
                            <tr>
                                {j_third_row}
                            </tr>
                            <tr>
                                {j_fourth_row}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div>
                    <table>
                        <tbody>
                            <tr>
                                {j_first_row}
                            </tr>
                            <tr>
                                {j_second_row}
                            </tr>
                            <tr>
                                {j_third_row}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }



    }
}
