import React, { Component } from 'react'

export default class ProjectList extends Component {
    render() {
        if (this.props.art === "blart") {
            return (
                <div>
                    <h2>Active Projects</h2>
                    <ul>
                        <li>ISMS</li>
                        <li>CleanSlate Framework Development</li>
                        <li>C4PM Cyber Range Source Code Review</li>
                        <li>ITaaS</li>
                        {/* <li class="pill blue-pill">C4PM Development</li>
                  <li class="pill blue-pill">ITaaS</li> */}
                    </ul>
                </div>
            )
        } else if (this.props.art === "gccsj") {
            return (
                <div>
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
            )
        }
    }
}
