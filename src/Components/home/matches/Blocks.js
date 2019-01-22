import React, {Component} from 'react';
import { firebaseMatches } from "../../../firebase";
import { firebaseLoop, reverseArray } from "../../ui/miscellaneous";
import MatchesBlock from "../../ui/matches_block";

class Blocks extends Component {

    state = {
        matches: []
    };

    componentDidMount() {
        firebaseMatches.limitToLast(6).once('value').then((snapshot) => {
            const matches = firebaseLoop(snapshot);

            this.setState({
                matches: reverseArray(matches)
            })
        })
    }

    showMatches = (matches) => (
        matches ?
            matches.map((match) => (
                <div className='item' key={match}>
                    <div className='wrapper' key={matches}>
                        <MatchesBlock match={match} />
                    </div>
                </div>
            ))
        :null
    );

    render() {
        console.log(this.state);
        return (
            <div className='home_matches'>
                {this.showMatches(this.state.matches)}
            </div>
        );
    }
}

export default Blocks;