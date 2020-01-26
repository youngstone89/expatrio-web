<template>
    <div class="col-md-12">
        <div class="card card-container">
            <form name="form" @submit.prevent="handleSaveChanges">
                <div>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input
                                type="text"
                                class="form-control"
                                name="username"
                                v-model="customer.username"

                        />
                        <!--v-validate="'required|min:3|max:20'"-->
                        <div
                                class="alert-danger"
                                v-if="submitted && errors.has('username')"
                        >{{errors.first('username')}}</div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input  v-bind:readonly="is_readonly"
                                type="email"
                                class="form-control"
                                name="email"
                                v-model="customer.email"

                        />
                        <!--v-validate="'required|email|max:50'"-->
                        <div
                                class="alert-danger"
                                v-if="submitted && errors.has('email')"
                        >{{errors.first('email')}}</div>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                                type="password"
                                class="form-control"
                                name="password"
                                v-model="customer.password"

                        />
                        <!--v-validate="'required|min:6|max:40'"-->
                        <div
                                class="alert-danger"
                                v-if="submitted && errors.has('password')"
                        >{{errors.first('password')}}</div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block">Save Changes</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import AdminService from '../services/admin.service';
import User from '../models/user';
    export default {
        name: "edituser",
        data: function () {
            return {
                customer: new User('','','','',''),
                is_readonly: true,
                role: []

            }
        },
        computed: {
            getCustomerId: function () {
                return this.customer.id = this.$route.params.customerId
            }
        },
        mounted(){
            if(this.getCustomerId){
                AdminService.getCustomer(this.customer.id)
                    .then(res =>{
                        this.customer = res.data;
                    })
            }
        },
        methods: {
            handleSaveChanges() {
                this.$validator.validate().then(valid => {
                    if (valid) {
                        AdminService.updateUser(this.customer)
                            .then(()=>{
                                this.$router.push('/admin')
                            })
                    }
                });
            }
        },
        watch: {

        }
    }
</script>

<style scoped>

</style>