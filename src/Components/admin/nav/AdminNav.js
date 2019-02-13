import React from 'react';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';

const AdminNav = () => {

    const Links = [
        {
            title: 'Matches',
            linkTo: '/admin_matches'
        },
        {
            title: 'Add Match',
            linkTo: '/admin_matches/edit_match'
        },
        {
            title: 'Players',
            linkTo: '/admin_players'
        },
        {
            title: 'Add Players',
            linkTo: '/admin_players/add_players'
        }
    ];

    const renderItems = () => (
        Links.map(Link => (
            <Link to={Link.linkTo} key={Link.title}>

            </Link>
        ))
    );

    return (
        <div>
            {renderItems()}
        </div>
    );
};

export default AdminNav;
