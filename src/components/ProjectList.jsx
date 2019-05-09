import React, { Component } from 'react'

export default class ProjectList extends Component {
    render() {
        if (this.props.art === "team1") {
            return (
                <div>
                    <h2>Active Projects</h2>
                    <ul>
                        <li>Project 1</li>
                        <li>Project 2</li>
                        <li>Project 3</li>
                        <li>Project 4</li>

                    </ul>
                </div>
            )
        } else if (this.props.art === "team2") {
            return (
                <div>
                    <h2>Active Projects</h2>
                    <ul>
                        <li>Project 1</li>
                        <li>Project 2</li>
                        <li>Project 3</li>
                        <li>Project 4</li>
                    </ul>
                </div>
            )
        }
    }
}
