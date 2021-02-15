// export const API_ROOT = "placeholder for production"
export const API_ROOT = "http://localhost:3000/api/v1"

const token = () => localStorage.getItem("token");

const headers = () => {
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token()
    };
};

// data will be nested objects...  ex. {user: {id: ...}}

const login = data => {
    return fetch(`${API_ROOT}/login`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)
    }).then(resp => resp.json());
}

const newUser = data => {
    return fetch(`${API_ROOT}/users`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)
    }).then(resp => resp.json())
}

const getCurrentSession = () => {
    return fetch(`${API_ROOT}/current_session`, {
        headers: headers()
    }).then(resp => resp.json());
};

const updateUser = data => {
    return fetch(`${API_ROOT}/users/${data.user.id}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(data)
    }).then(resp => resp.json());
};

const getUserList = data => {
    return fetch(`${API_ROOT}/users/${data.user.id}/list`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)
    }).then(resp => resp.json())
};

const getUserListByUrl = data => {
    return fetch(`${API_ROOT}/users/public/list`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)
    }).then(resp => resp.json())
};

const editUserListByUrl = data => {
    return fetch(`${API_ROOT}/users/list/${data}/show`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)
    }).then(resp => resp.json())
};

const editListItem = data => {
    return fetch(`${API_ROOT}/listitem/${data.list.id}/update`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)
    }).then(resp => resp.json())
}

const addToUserList = data => {
    return fetch(`${API_ROOT}/users/list/add`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)
    }).then(resp => resp.json())
};

const deleteUser = user_id => {
    return fetch(`${API_ROOT}/users/${user_id}`, {
        method: "DELETE",
        headers: headers(),
    }).then(resp => resp.json());
};

const deleteItem = listitem_id => {
    return fetch(`${API_ROOT}/listitem/${listitem_id}/delete`, {
        method: "DELETE",
        headers: headers(),
    }).then(resp => resp.json())
};

export const api = {
    auth: {
        login,
        getCurrentSession,
    },
    user: {
        newUser,
        updateUser,
        deleteUser,
        getUserList,
    },
    list: {
        getUserList,
        getUserListByUrl,
        editUserListByUrl,
        editListItem,
        addToUserList,
        deleteItem,
    }
}