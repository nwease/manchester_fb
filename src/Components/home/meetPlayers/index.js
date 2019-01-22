import React, {Component} from 'react';
import Stripes from '../../../Resources/images/stripes.png';
import { Tag } from '../../ui/miscellaneous';

class MeetPlayers extends Component {

    state = {

    };

    render() {
        return (
            <div
                className='home_meet_players'
                style={{
                    background: `#fff url(${Stripes})`
                }}
            >
                <div className="container">
                    <div className="home_meet_players_wrapper">
                        <div className="home_card_wrapper">
                            CARD
                        </div>

                        <div className='home_text_wrapper'>
                            <div>
                                <Tag bck='#0e1731'
                                     size='100px'
                                     color='#fff'
                                     add={{
                                         display: 'inline-block',
                                         marginBottom: '20px'}}>
                                    Meet
                                </Tag>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MeetPlayers;