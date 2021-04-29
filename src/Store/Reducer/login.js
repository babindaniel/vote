import * as actionTypes from '../Actions/actionTypes';

const initialState = {
    userData:[],
    isLoggedIn: false,
    role: '',
    isUpdated:null,
    msg: '',
    is_voted: false
};

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const getData = ( state, action ) => {
    return updateObject( state, { userData: action.userData, isUpdated: false, isDeleted: false} );
};
const userlistData = ( state, action ) => {
    return updateObject( state, { userData: action.userData, isLoggedIn: action.isLoggedIn, role: action.role, user_id: action.user_id, isVoted: action.isVoted} );
};
const addUser = ( state, action ) => {
    return updateObject( state, { isUpdated: action.isUpdated, msg: action.msg} );
};
const editData = ( state, action ) => {
    return updateObject( state, { isUpdated: action.Added} );
};

const removeUser = ( state, action ) => {
    return updateObject( state, { isDeleted: action.Removed, msg: action.msg} );
};
const editSuccess = ( state, action ) => {
    return updateObject( state, { isUpdated: action.isUpdated, msg: action.msg} );
};
const fetchData = ( state, action ) => {    
    return updateObject( state, { userData: action.userData} );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_DATA: return getData( state, action );
        case actionTypes.GET_USERLIST: return userlistData( state, action );
        case actionTypes.ADD_USER: return addUser( state, action );
        case actionTypes.REMOVE_USER: return removeUser( state, action );
        case actionTypes.FETCH_DATA: return fetchData( state, action );
        case actionTypes.EDIT_USER: return editData( state, action );
        case actionTypes.EDIT_SUCCESS: return editSuccess( state, action );

        default: return state;
    }
};

export default reducer;
