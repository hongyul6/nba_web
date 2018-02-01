import React from 'react';
import {SearchBar} from './SearchBar';
import nba from 'nba';
import {Profile} from './Profile';
import {DataViewContainer} from './DataViewContainer';

export class Main extends React.Component{
    state = {
        playerInfo: {},
    }
    componentDidMount(){
        this.loadPlayerInfo('Stephen Curry');
    }

    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId}).then((info) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            console.log(playerInfo);
            this.setState({playerInfo: playerInfo});
        });
    }

    handleSelectPlayer = (playerName) => {
        this.loadPlayerInfo(playerName);
    }

    render(){
        return (
            <div className="main">
                <SearchBar handleSelectPlayer={this.handleSelectPlayer}/>
                <div className="player">
                    <Profile playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>

            </div>
        );
    }
}