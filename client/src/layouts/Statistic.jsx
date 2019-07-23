import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Leaderboard from 'components/charts/Leaderboard';

export default class Statistic extends Component {
    componentDidMount(){
        this.props.onLoad()
    }
    render() {
        return (
            <div>
                <Leaderboard items={this.props.profiles.items}/>>
            </div>
        )
    }
}
