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

        var first_half = [];
        var second_half = [];
        for (let x = 0; x < cal.length; x++) {
            if (x < 5) {
                first_half.push(cal[x]);
            } else {
                second_half.push(cal[x]);
            }
        }

        return (
            <table>
                <tbody>
                    <tr>
                        {first_half}
                    </tr>
                    <tr>
                        {second_half}
                    </tr>
                </tbody>
            </table>
        )
    } else if (props.art === "gccsj") {
        var gccsj_dates = getDates(new Date(props.start_date), new Date(props.end_date));
        var j_cal = gccsj_dates.map((item, idx) => {
            if (item.getDate() === new Date().getDate()) {
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

        var j_first_half = [];
        var j_second_half = [];
        var j_third_half = [];
        for (let x = 0; x < j_cal.length; x++) {
            if (x < 5) {
                j_first_half.push(j_cal[x]);
            } else if (x >= 5 && x < 10) {
                j_second_half.push(j_cal[x]);
            } else {
                j_third_half.push(j_cal[x]);
            }
        }

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            {j_first_half}
                        </tr>
                        <tr>
                            {j_second_half}
                        </tr>
                        <tr>
                            {j_third_half}
                        </tr>
                    </tbody>
                </table>
            </div>

        )
    }
}
