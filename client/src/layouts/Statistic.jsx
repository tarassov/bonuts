import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Leaderboard from 'components/charts/Leaderboard';


const mockItems = [
    {
        name: "Peter",
        score_value:10
    },    
]

export default class Statistic extends Component {
    componentDidMount(){
        this.props.onLoad()
    }
    render() {
       // let items =new Array(100)
       // for (var i = 0;i<100;i++){
        //    items[i] = {name: 'Peter'+i, score_total: Math.random()*100}
       // }
       // console.log(items)
        let items = this.props.profiles.items
        return (
            <div>
                <Leaderboard items = {items} height={items.length*30+100}/>>
            </div>
        )
    }
}
