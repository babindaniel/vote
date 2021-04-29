import axios from 'axios';
import * as actionTypes from './actionTypes';

export const get_userlist = (loginCredentials) => {
    return dispatch => {
        axios.get(`https://6081567d73292b0017cdd50e.mockapi.io/user/userlist`)
            .then(response => {     
                console.log('userlist-->',response)                                       
                dispatch(userlistSuccess(loginCredentials,response.data));
            })
            .catch(error => {
                dispatch(userlistFailure(error));
            });
    }
};

export const userlistSuccess = (loginCredentials,data) => {

    for(let i=0; i<data.length; i++) {
        
        if(data[i].email == loginCredentials.email && data[i].password == loginCredentials.password) {
          
          if(data[i].role === 'admin') {
            //Navigate to Admin Dashboard
            return {
                type: actionTypes.GET_USERLIST,
                userData: data,
                isLoggedIn : true,
                role: 'admin'
            };
          } else {
            return {
                type: actionTypes.GET_USERLIST,
                userData: data,
                isLoggedIn : true,
                role: 'user',
                user_id: data[i].id,
                isVoted: data[i].isVoted
            };
          }
        } else {
            if (i == data.length - 1) {
                return {
                    type: actionTypes.GET_USERLIST,
                    userData: data,
                    isLoggedIn : false,
                    role: 'invalid',
                    isVoted: data[i].isVoted
                };
            }
            
        }
      }

};

export const userlistFailure = () => {
    console.log('userlist failed')
}

export const add_user = (data) => {
    return dispatch => {
       
        axios.post('https://6081567d73292b0017cdd50e.mockapi.io/user/userlist', data)
            .then(response => {
                console.log('adduser-->',response)
                dispatch(addUserSuccess(response));
            })
            .catch(error => {
                console.log('failed')
            });        
    };
};
export const addUserSuccess = (data) => {

    if(data.status === 200 || data.status === 201) {        
        return {
            type: actionTypes.ADD_USER,
            isUpdated : true,
            msg: `${data.data.name} added successfully`
        }
    }   else {
       
    } 
};

export const addFailure = (error) => {
    console.log(error)
};


export const update_user_status = (id) => {
    return dispatch => {
        let data = {
            isVoted: true
        }
        axios.put(`https://6081567d73292b0017cdd50e.mockapi.io/user/userlist/${id}`, data)
            .then(response => {                                            
                // dispatch(editSuccess(response.data));
                console.log('voted success')
            })
            .catch(error => {
                // dispatch(editFailure(error));
                console.log('voted fails')
            });
    }
};

export const update_user = (data,id) => {
    return dispatch => {
        axios.put(`https://6081567d73292b0017cdd50e.mockapi.io/user/userlist/${id}`, data)
            .then(response => {                                            
                dispatch(editSuccess(response.data));
            })
            .catch(error => {
                dispatch(editFailure(error));
            });
    }
};
export const editSuccess = (data) => {
    
    return {
        type: actionTypes.EDIT_SUCCESS,
        userData: data,
        isUpdated : true,
        msg: `${data.name} updated successfully`
    };
};

export const editFailure = (error) => {
    console.log('edit error->',error)
};

export const fetch_user = (id) => {
    return dispatch => {
        axios.get(`https://6081567d73292b0017cdd50e.mockapi.io/user/userlist/${id}`)
            .then(response => {                
                let resArray = [];
                resArray.push(response.data);                            
                dispatch(fetchSuccess(resArray));
            })
            .catch(error => {
                dispatch(fetchFailure(error));
            });
    }
};
export const fetchSuccess = (data) => {
    console.log('after success')
    return {
        type: actionTypes.FETCH_DATA,
        userData: data
    };
};

export const fetchFailure = (error) => {
    console.log('edit error->',error)
};

export const remove_user = (id) => {
    
    return dispatch => {        
        axios.delete(`https://6081567d73292b0017cdd50e.mockapi.io/user/userlist/${id}`)
            .then(response => {                
                if(response.status === 200) {
                    dispatch(removeSuccess(response.data.name));
                } else {
                    console.log("Some error occured!");
                }
               
            })
    };   

};
export const removeSuccess = (data) => {
    
    return {
        type: actionTypes.REMOVE_USER,
        Removed: true,
        msg: `${data} deleted successfully`
    };
    
};

export const get_allData = () => {
    return dispatch => {
        axios.get('https://6081567d73292b0017cdd50e.mockapi.io/user/userlist')        
            .then(response => {
                dispatch(dataSuccess(response.data));
            })
            .catch(error => {
                dispatch(dataFailure(error));
            });        
    };
};

export const dataSuccess = (data) => {
    return {
        type: actionTypes.GET_DATA,
        userData: data
    };
};

export const dataFailure = (error) => {
    console.log(error)
};

