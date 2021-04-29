import * as actionTypes from '../Actions/actionTypes';

const initialState = {
    candidateData:[],
    
};

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const getcandidateData = ( state, action ) => {
    return updateObject( state, { candidateData: action.candidateData, isUpdated: action.isUpdated} );
};
const geteditcandidateData = ( state, action ) => {
    // return updateObject( state, { candidateData: action.candidateData, isUpdated: action.isUpdated} );
    return updateObject( state, { isUpdated: action.isUpdated, msg: action.msg} );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_CANDIDATELIST: return getcandidateData( state, action );
        case actionTypes.GET_EDITCANDIDATELIST: return geteditcandidateData( state, action );        
        
        default: return state;
    }
};

export default reducer;
