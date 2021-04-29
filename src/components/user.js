import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DataGrid } from "@material-ui/data-grid";
import Button from '@material-ui/core/Button';
import * as actions from './../Store/Actions/index';
import classes from './style.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const User = (props) => {

    useEffect(() => {
        
        console.log('location state-->',props.location.state);
        props.getCandidates()
    }, [])

    if(props.isUpdated) {
        alert(props.msg)
        props.getCandidates()
    }
    const rows = props.candidateData;
    console.log('candidate data-->',rows)
    const columns = [
        { field: 'id', headerName: 'Id', width: 130 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'mobile', headerName: 'Phone', width: 130 },
        { field: 'teamname', headerName: 'Team', width: 130 },  
        { field: 'votecount', headerName: 'Count', width: 130 },        
        {
            field: "",
            headerName: "Action",
            width: 150,
            disableClickEventBubbling: true,
            renderCell: (params: CellParams) => {
                const voteClick = (event) => {
                    const api: GridApi = params.api;
                    const fields = api
                        .getAllColumns()
                        .map((c) => c.field)
                        .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};
                    fields.forEach((f) => {
                        thisRow[f] = params.getValue(f);
                    });

                    const editdata = {
                        "votecount": params.row.votecount + 1                        
                    }
                    let updateId = thisRow.id;
                    console.log('upd id-->',updateId)
                    console.log('params id-->',params.row.id)
                    props.update_candidate(editdata, params.row.id);
                    props.updateUserStatus(props.location.state.userId)
                    // setSelection([thisRow.id]);
                    // setremovePOpUpOpen(true);
                };                
                return (
                    <div>
                        <Button disabled = {props.location.state.isVoted} onClick={voteClick}>Vote</Button>
                        
                    </div>
                );
            }
        }
    ];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        // handleMobileMenuClose();
    };
    const menuId = 'primary-search-account-menu';
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
    return(
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
          <div className="dataTable">
                <DataGrid rows={rows} columns={columns} pageSize={10} />                
            </div>
        </div>
      )
}

const mapStateToProps = state => {

    return {
        candidateData: state.userReducer.candidateData,  
        isUpdated: state.userReducer.isUpdated,
        msg: state.userReducer.msg      
    };
}

const mapDispatchToProps = dispatch => {

    return {
        getCandidates: () => dispatch(actions.get_allCandidates()),
        update_candidate: (data,id) => dispatch(actions.update_candidate(data,id)),
        updateUserStatus:(id) => dispatch(actions.update_user_status(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
