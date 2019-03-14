import React, { Component } from 'react'
// import fetch from 'isomorphic-unfetch'
// import { object, string, number } from 'yup'
// import Widget from '../../widget'
// import Counter from '../../counter'
// import { basicAuthHeader } from '../../../lib/auth'

// const schema = object().shape({
//   owner: string().required(),
//   repository: string().required(),
//   interval: number(),
//   title: string(),
//   authKey: string()
// })

export default class GitHubIssueCount extends Component {
    static defaultProps = {
        interval: 1000 * 60 * 5,
        title: 'GitHub Issue Count'
    }

    state = {
        count: 0,
        error: false,
        loading: true
    }

    componentDidMount() {
        const opts = { headers: process.env.REACT_APP_TOKEN }
        console.log("TOKEN");
        console.log(opts)
        console.log(process.env.NODE_ENV);
        console.log(process.env.REACT_APP_TOKEN)
        // console.log(authKey)
        // schema.validate(this.props)
        //   .then(() => this.fetchInformation())
        //   .catch((err) => {
        //     console.error(`${err.name} @ ${this.constructor.name}`, err.errors)
        //     this.setState({ error: true, loading: false })
        //   })
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    async fetchInformation() {
        const { authKey, owner, repository } = this.props
        // const opts = authKey ? { headers: basicAuthHeader(authKey) } : {}
        console.log(authKey)
        const opts = { headers: process.env.REACT_APP_TOKEN }

        try {
            const res = await fetch(`https://api.github.com/repos/${owner}/${repository}`, opts)
            const json = await res.json()

            this.setState({ count: json.open_issues_count, error: false, loading: false })
        } catch (error) {
            this.setState({ error: true, loading: false })
        } finally {
            this.timeout = setTimeout(() => this.fetchInformation(), this.props.interval)
        }
    }

    render() {
        const { count, error, loading } = this.state
        const { title } = this.props
        return (
            <div>
                {title}
                {loading}
                {error}
                Count: {count}
            </div>
            //   <Widget title={title} loading={loading} error={error}>
            //     <Counter value={count} />
            //   </Widget>
        )
    }
}
