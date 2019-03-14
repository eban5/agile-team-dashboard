import React, { Component } from 'react'

export default class GitHubIssueCount extends Component {
    static defaultProps = {
        interval: 1000 * 60 * 5,
        title: 'GitHub'
    }

    state = {
        count: 0,
        repo_name: "",
        repo_url: "",
        error: false,
        loading: true
    }

    componentDidMount() {
        const opts = { headers: process.env.REACT_APP_TOKEN }
        const { authKey, owner, repository } = this.props

        fetch(`https://api.github.com/repos/${owner}/${repository}`, opts)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    count: data.open_issues_count,
                    repo_name: data.name,
                    repo_url: data.html_url,
                    error: false,
                    loading: false
                })
            })
            .catch(error => this.setState({ error, loading: false }));
    }

    render() {
        const { count, repo_name, repo_url, error, loading } = this.state
        const { title } = this.props
        return (
            <div>
                <strong>{title}</strong>
                <p>
                    {loading}
                    {error}
                    Issue Count: {count}
                </p>
                <p>
                    <a href={repo_url}>{repo_name}</a>
                </p>

            </div>
        )
    }
}
