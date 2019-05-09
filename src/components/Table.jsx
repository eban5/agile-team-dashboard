import React from 'react';
import '../styles/table.css';

export default function Table(props) {
    if (props.art === "team1") {
        var team1_date_range = Array.from(props.date_range)
        var cal = team1_date_range.map((item, idx) => {
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
    } else if (props.art === "team2") {
        var team2_date_range = Array.from(props.date_range)
        var j_cal = team2_date_range.map((item, idx) => {
            // if (idx === 0) {
            //     return (<td className="td-blank" key={idx}></td>)
            // }
            // else if (item.getDay() === 1) {
            //     return (<td key={idx}>{item.getDate()}</td>)
            // }
            if (item.getDate() === props.today.getDate()) {
                return (<td className="today_team2" key={idx}>{item.getDate()}</td>)
            }
            else {
                return (<td key={idx}>{item.getDate()}</td>)
            }

        })
        j_cal.unshift(<td className="td-blank" key={"empty"}></td>) // in GCCS-J's PIs, they begin on a Tuesday and 

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
