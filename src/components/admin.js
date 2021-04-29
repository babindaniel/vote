
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
import { useHistory } from "react-router-dom";

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

const Admin = (props) => {

    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [editpopup, openEdit] = React.useState(false);
    const [select, setSelection] = useState([]);
    const [post, setPost] = useState({});
    const [name, setUsername] = useState("");
    const [email, setUseremail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [removePOpUpOpen, setremovePOpUpOpen] = useState(false);
    const [selectPOpUpOpen, setselectPOpUpOpen] = useState(false);

    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editAddress, setEditAddresse] = useState("");
    const [editPhone, setEditPhone] = useState("");

    const nameinputsHandler = (event) => {
        setUsername(event.target.value);
    };

    const emailinputsHandler = (event) => {
        setUseremail(event.target.value);
    };

    const addressinputsHandler = (event) => {
        setPassword(event.target.value);
    };

    const phoneinputsHandler = (event) => {
        setPhone(event.target.value);
    };
    const nameinputsHandlerEdit = (event) => {
        setEditName(event.target.value);
    };

    const emailinputsHandlerEdit = (event) => {
        setEditEmail(event.target.value);
    };

    const addressinputsHandlerEdit = (event) => {
        setEditAddresse(event.target.value);
    };

    const phoneinputsHandlerEdit = (event) => {
        setEditPhone(event.target.value);
    };

    const rows = props.userData;
    console.log('rows data-->',rows);
    const columns = [
        { field: 'id', headerName: 'Id', width: 130 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'mobile', headerName: 'Phone', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'password', headerName: 'Password', width: 130 },
        {
            field: "",
            headerName: "Action",
            width: 150,
            disableClickEventBubbling: true,
            renderCell: (params: CellParams) => {
                const deleteClick = (event) => {
                    const api: GridApi = params.api;
                    const fields = api
                        .getAllColumns()
                        .map((c) => c.field)
                        .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};
                    fields.forEach((f) => {
                        thisRow[f] = params.getValue(f);
                    });

                    setSelection([thisRow.id]);
                    setremovePOpUpOpen(true);
                };
                const editClick = (event) => {

                    const api: GridApi = params.api;
                    const fields = api
                        .getAllColumns()
                        .map((c) => c.field)
                        .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};
                    fields.forEach((f) => {
                        thisRow[f] = params.getValue(f);
                    });

                    setSelection([thisRow.id]);



                    setEditName(params.row.name);
                    setEditEmail(params.row.email);
                    setEditAddresse(params.row.address);
                    setEditPhone(params.row.phone);
                    props.fetchUser(params.id);
                    props.getData();
                    // setOpen(true);
                    openEdit(true);
                }
                return (
                    <div>
                        <Button><EditIcon onClick={editClick} color="secondary" /></Button>
                        <Button><DeleteIcon onClick={deleteClick} color="secondary" /></Button>
                    </div>
                );
            }
        }
    ];

    const resetVote = () => {

        props.resetVote();
    }
    const voteDetails = () => {
        history.push('./votedetails');
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpenEdit = () => {
        openEdit(true);
    };
    const handleClose = () => {
        setPost({});
        setOpen(false);
    };

    const handleCloseEdit = () => {
        setPost({});
        openEdit(false);
    };
    const handleremovePOpUpOpen = () => {
        if (select.length == 0) {
            handleselectPOpUpOpen(true);
        } else {
            setremovePOpUpOpen(true);
        }
    };

    const handleremovePOpUpClose = () => {
        setremovePOpUpOpen(false);
    };

    const handleselectPOpUpOpen = () => {
        setselectPOpUpOpen(true);
    };

    const handleselectPOpUpClose = () => {
        setselectPOpUpOpen(false);
    };

    useEffect(() => {
        props.getData()
    }, [])

    const addEmployee = (event) => {
        const data = {
            "name": name,
            "email": email,
            "password": password,
            "mobile": phone,
            "role": 'user',
            "isVoted": false
        }
        props.add_Employee(data);
        // props.getData();
        handleClose();
        console.log("Form Data", data);
    }

    const updateEmployee = (event) => {
        var updateId = select.map(Number);
        console.log('Select id', updateId);
        const editdata = {
            "name": editName,
            "email": editEmail,
            "address": editAddress,
            "phone": editPhone
        }
        props.update_Employee(editdata, updateId);
        openEdit(false);
        console.log("edit Form Data", editdata);
    }

    const removeEmployee = () => {
        var selectedId = select.map(Number);
        console.log('Select id', selectedId);
        // return false;
        props.remove_Employee(selectedId);
        props.getData();
        handleremovePOpUpClose();
    }
    if (props.isDeleted) {
        alert(props.msg);
        props.getData();
    } else {
        // alert('not deleted')
    }
    if (props.isUpdated) {
        alert(props.msg);
        props.getData();
    }

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
                <div className="" >
                                       
                    <Button variant="contained" color="secondary" onClick={voteDetails}>Vote Details</Button>
                    <Button className="btn-success" variant="contained" color="primary" onClick={handleClickOpen}>Add New Employee</Button>
                </div>
            </div>
            <div className="dataTable">
                <DataGrid rows={rows} columns={columns} pageSize={10} />
                {/* <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection onSelectionModelChange={(newSelection) => {
                    setSelection((newSelection.selectionModel));
                }} /> */}
            </div>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Employee
                </DialogTitle>
                <DialogContent dividers>
                    <form>
                        <Input placeholder="Name" fullWidth inputProps={{ 'aria-label': 'description' }} defaultValue={post.name} onChange={nameinputsHandler} />
                        <Input placeholder="Phone" fullWidth inputProps={{ 'aria-label': 'description' }} defaultValue={post.phone} onChange={phoneinputsHandler} />
                        <Input placeholder="Email" fullWidth inputProps={{ 'aria-label': 'description' }} defaultValue={post.email} onChange={emailinputsHandler} />
                        <Input placeholder="Password" fullWidth inputProps={{ 'aria-label': 'description' }} defaultValue={post.password} onChange={addressinputsHandler} />
                        {/* <Input placeholder="Phone" fullWidth inputProps={{ 'aria-label': 'description' }} defaultValue={post.phone} onChange={phoneinputsHandler} /> */}

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" autoFocus onClick={addEmployee}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* for updating popup */}

            <Dialog onClose={handleCloseEdit} aria-labelledby="customized-dialog-title" open={editpopup}>
                <DialogTitle id="popup" onClose={handleCloseEdit}>
                    Edit Employee
                </DialogTitle>
                <DialogContent dividers>
                    <form>
                        <Input placeholder="Name" fullWidth inputProps={{ 'aria-label': 'description' }} value={editName} onChange={nameinputsHandlerEdit} />
                        <Input placeholder="Email" fullWidth inputProps={{ 'aria-label': 'description' }} value={editEmail} onChange={emailinputsHandlerEdit} />
                        <Input placeholder="Address" fullWidth inputProps={{ 'aria-label': 'description' }} value={editAddress} onChange={addressinputsHandlerEdit} />
                        <Input placeholder="Phone" fullWidth inputProps={{ 'aria-label': 'description' }} value={editPhone} onChange={phoneinputsHandlerEdit} />
                        {/* <Input placeholder="Phone" fullWidth inputProps={{ 'aria-label': 'description' }} defaultValue={post.phone} onChange={phoneinputsHandler} /> */}

                    </form>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={handleCloseEdit}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" autoFocus onClick={updateEmployee}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>



            <Dialog
                open={removePOpUpOpen}
                onClose={handleremovePOpUpClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle className="DialogTitle" id="alert-dialog-title">Delete Employee</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete these Records?<br />
                        <span className="muted-text Highlight">This action cannot be undone</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleremovePOpUpClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={removeEmployee} color="primary" autoFocus>
                        Delete User
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={selectPOpUpOpen}
                onClose={handleremovePOpUpClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle className="DialogTitle" id="alert-dialog-title">Select Employee</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please select any of the row(s)
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleselectPOpUpClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

const mapStateToProps = state => {
    return {
        userData: state.loginReducer.userData,
        isDeleted: state.loginReducer.isDeleted,
        msg: state.loginReducer.msg,
        isUpdated: state.loginReducer.isUpdated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getData: () => dispatch(actions.get_allData()),

        // get_userlist
        add_Employee: (data) => dispatch(actions.add_user(data)),
        update_Employee: (data, updateId) => dispatch(actions.update_user(data, updateId)),
        remove_Employee: (selectedId) => dispatch(actions.remove_user(selectedId)),
        fetchUser: (id) => dispatch(actions.fetch_user(id)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
