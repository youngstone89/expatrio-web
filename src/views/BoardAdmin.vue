<template>
    <div class="container">
        <header class="jumbotron">
            <h3>Customers</h3>
        </header>
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                </div>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <router-link to="/adduser">
                            <font-awesome-icon icon="user-plus" />Add Customer
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <table class="table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody v-for="customer in customers" :key="customers.id" class="">
                <tr>
                    <td>{{customer.username}}</td>
                    <td>{{customer.email}}</td>
                    <td>
                        <a href="" v-on:click.stop.prevent="editUser(customer)">
                        <font-awesome-icon icon="user-edit" />
                        </a>
                    </td>
                    <td>
                        <a href="" v-on:click.stop.prevent="deleteUser(customer)">
                            <font-awesome-icon icon="user-slash" />
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div>
        <modal
                v-show="isModalVisible"
                @close="closeModal"
        />
        </div>
    </div>
</template>

<script>
    import AdminService from '../services/admin.service';
    import modal from '../components/Modal.vue';

    export default {
        name: 'admin',
        components:{
          modal
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        data() {
            return {
                customers: '',
                isModalVisible: false
            };
        },
        mounted() {
            if(this.currentUser){
                AdminService.getCustomers().then(
                    response => {
                        this.customers = response.data;
                    },
                    error => {
                        this.customers = error.response.data.message;
                    }
                );
            }
        },
        methods: {
            showModal() {
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
            },
            deleteUser: function(customer){
                AdminService.deleteUser(customer)
                    .then(()=>{
                        this.$router.go(0);
                    });
            },
            editUser: function(customer){
                this.$router.push({ name: 'edituser', params: { customerId: customer.id } });
            }
        }
    };
</script>