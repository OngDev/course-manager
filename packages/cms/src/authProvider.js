import axios from './axios.js';
const authProvider = {
    login: async ({username, password}) => {
        return axios.post('/auth/login',{username, password}).then((res) => {
            if(res.status < 200 || res.status >= 300) {
                throw new Error(res.statusText)
            }
            localStorage.setItem('user', JSON.stringify(res.data))
        }).catch(() => {
            throw new Error('Network error')
        })
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('user');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    getIdentity: () => {
        try {
            const { id, fullName } = JSON.parse(localStorage.getItem('user'));
            return Promise.resolve({ id, fullName });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    checkAuth: async (...params) => {
        try {
            const res = await axios.get('/auth/isLoggedIn');
            console.log(res.data)
            return res.data
        } catch (error) {
            throw Error('User is not logged in')
        }
    },
    getPermissions: () => {
        return Promise.resolve();
    },
    logout: async () => {
        try {
            const res = await axios.get('/auth/logout');
            if (res.status < 200 || res.status >= 300) {
                throw new Error(res.statusText);
            }
            localStorage.removeItem('user');
        } catch (e) {
            throw new Error('Network error');
        }
    },
}

export default authProvider;