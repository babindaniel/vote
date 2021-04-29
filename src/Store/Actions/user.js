import axios from 'axios';
import * as actionTypes from './actionTypes';

export const get_allCandidates = () => {
    return dispatch => {
        axios.get(`https://6081567d73292b0017cdd50e.mockapi.io/user/candidatelist`)
            .then(response => {     
                dispatch(candidatelistSuccess(response.data));
            })
            .catch(error => {
                console.log('candidate list failed');
            });
    }
};

export const candidatelistSuccess = (response) => {
    console.log('candidate list success 17-->,',response)
    return {
        type: actionTypes.GET_CANDIDATELIST,
        candidateData: response,
        isUpdated: false
    }
}

export const update_candidate = (data, id) => {

    return dispatch => {
      
        axios.put(`https://6081567d73292b0017cdd50e.mockapi.io/user/candidatelist/${id}`, data)
            .then(response => {     
                dispatch(candidateEditSuccess(response.data));
            })
            .catch(error => {
                console.log('candidate edit failed');
            });
    }
}

export const candidateEditSuccess = (response) => {
    console.log('candidateEditSuccess list success 40 -->,',response)
    return {
        type: actionTypes.GET_EDITCANDIDATELIST,
        candidateData: response,
        isUpdated: true,
        msg: `${response.name} updated successfully`
    }
}