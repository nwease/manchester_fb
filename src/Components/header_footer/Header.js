import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <AppBar
                position="fixed"
                style={{
                    backgroundColor: '#98c5e9',
                    boxShadow: 'none',
                    padding: '10px 0',
                    borderBottom: '2px solid #00285e'
                }}
            >
                <ToolBar style={{display:'flex'}}>
                    <div style={{flexGrow: 1}}>
                        <div className="header_logo">
                            LOGO
                        </div>
                    </div>

                    <Link to='/the_team'>
                        <Button>
                            SOMETHING
                        </Button>
                    </Link>
                    <Link to='/the_matches'>
                        <Button>
                            ALSO HERE
                        </Button>
                    </Link>
                </ToolBar>
            </AppBar>
        );
    }
}

export default Header;