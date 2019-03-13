import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebaseMatches } from '../../firebase';
import { firebaseLoop, reverseArray } from '../ui/miscellaneous';
import LeagueTable from './table';
import MatchesList from './matchesList';

class TheMatches extends Component {

    state = {
        loading: true,
        matches: [],
        filterMatches: [],
        playerFilter: 'All',
        resultFilter: 'All'
    };

    componentDidMount() {
        firebaseMatches.once('value').then(snapshot => {
            const matches = firebaseLoop(snapshot);

            this.setState({
                loading: false,
                matches: reverseArray(matches),
                filterMatches: reverseArray(matches)
            })
        })
    }

    showPlayed = (Played) => {
        const list = this.state.matches.filter((match) => {
            return match.final === Played
        });

        this.setState({
            filterMatches: Played === 'ALL' ? this.state.matches : list,
            playerFilter: Played,
            resultFilter: 'All'
        })
    };

    render() {
        const state = this.state;
        return (
            <div className='the_matches_container'>
                <div className='the_matches_wrapper'>
                    <div className='left'>
                        <div className='match_filters'>
                            <div className='match_filters_box'>
                                <div className='tag'>
                                    SHOW MATCH
                                </div>

                                <div className='container'>
                                    <div className={`option`}
                                         onClick={() => this.showPlayed('All')}>
                                        All
                                    </div>

                                    <div className={`option`}
                                         onClick={() => this.showPlayed('Yes')}>
                                        Played
                                    </div>

                                    <div className={`option`} onClick={() => this.showPlayed('No')}>
                                        Not Played
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MatchesList matches={state.filterMatches}/>
                    </div>

                    <div className='right'>
                        <LeagueTable/>
                    </div>
                </div>
            </div>
        );
    }
}

export default TheMatches;