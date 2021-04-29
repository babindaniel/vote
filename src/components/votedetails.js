
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from './../Store/Actions/index';
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import classes from './style.css';
// import DataTable from './DataTable/DataTable';

const Votedetails = (props) => {

    const rows = props.candidateData;
    const columns = [
        { field: 'id', headerName: 'Id', width: 130 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'mobile', headerName: 'Phone', width: 130 },
        { field: 'teamname', headerName: 'Team', width: 130 },  
        { field: 'votecount', headerName: 'Count', width: 130 },
    ]; 
    
    useEffect(() => {
        props.getCandidates()
    }, [])
    
    const menuId = 'primary-search-account-menu';   
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        // handleMobileMenuClose();
    };
    
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to="/">
                <MenuItem >Logout</MenuItem>
            </Link>
        </Menu>
    );
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        React
                    </Typography>
                    <div className="AppBarButton">
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            // aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}

            <div>
                <h2>User Details</h2>
            </div>
            <div>
                
            </div>
            <div className="dataTable">
                <DataGrid rows={rows} columns={columns} pageSize={10} />
            </div>


        </div>
    );
};

const mapStateToProps = state => {
    return {
        candidateData: state.userReducer.candidateData,  
        
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getCandidates: () => dispatch(actions.get_allCandidates()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Votedetails);
