import React, {Component} from 'react';
import { firebaseMatches } from "../../../firebase";
import { firebaseLoop, reverseArray } from "../../ui/miscellaneous";

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

    showMatches = () => (
        <div>
            MATCHES
        </div>
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