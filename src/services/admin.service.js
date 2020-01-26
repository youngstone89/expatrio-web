import axios from 'axios';
import authHeader from "./auth.header";

const API_URL = 'http://localhost:8080/api/admin/';

class AdminService {
    getCustomer(id) {
        return axios
            .get(API_URL + 'customer',{
                params: {
                    id: id
                },
                headers: authHeader()
            })
            .then(this.handleResponse)
            .then(response => {
                return response.data;
            });
    }
    getCustomers() {
        return axios
            .get(API_URL + 'customers',{ headers: authHeader()})
            .then(this.handleResponse)
            .then(response => {
                return response.data;
            });
    }
    createUser(user) {
        return axios
            .post(API_URL + 'customer'
                ,{
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role
                },
                {
                headers: authHeader()
                })
            .then(this.handleResponse)
            .then(response =>{
                return response.data;
            })
    }
    updateUser(user) {
        return axios
            .put(API_URL + 'customer'
                ,{
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role
                },
                {
                    headers: authHeader()
                })
            .then(this.handleResponse)
            .then(response =>{
                return response.data;
            })
    }
    deleteUser(user) {
        return axios.
            delete(API_URL + 'customer'
                ,{
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    role: user.role
                        },
                headers: authHeader()
                }
                )
            .then(this.handleResponse)
            .then(response =>{
                return response.data;
            })
    }
    handleResponse(response) {
        if (response.status === 401) {
            this.logout();
            location.reload(true);

            const error = response.data && response.data.message;
            return Promise.reject(error);
        }

        return Promise.resolve(response);
    }
}

export default new AdminService();
