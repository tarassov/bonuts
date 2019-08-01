import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
 import { withTranslation, Trans } from "react-i18next";


export  class Leaderboard extends React.Component{

  render() {
    const {items,t} = this.props;
    const sortedItems = items.sort((a,b)=>{
      if (a.score_total > b.score_total) {
        return -1;
      }
      if (a.score_total < b.score_total) {
        return 1;
      }
   
      return 0;
    })

    const labels = sortedItems.map(item=> item.name)
    const data = {
        labels: labels,
        datasets: [
          {
            label: t('points'),
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: sortedItems.map(item=>{return item.score_total})
            
          }
        ]
      };
      
    return (
      <div>
        <h2><Trans>Leaderboard</Trans></h2>
        <HorizontalBar data={data} />
      </div>
    );
  }
};

export default withTranslation()(Leaderboard)