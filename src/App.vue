<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="#" class="navbar-brand">Expatrio</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link"><font-awesome-icon icon="home" /> Home</router-link>
        </li>
        <li class="nav-item" v-if="showAdminBoard">
            <router-link to="/admin" class="nav-link">
                <font-awesome-icon icon="users" />
                Manage Customers
            </router-link>
        </li>
      </div>

      <div class="navbar-nav ml-auto" v-if="!currentUser">
        <li class="nav-item">
              <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
              </router-link>
        </li>
        <li class="nav-item">
            <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
            </router-link>
        </li>
      </div>

      <div class="navbar-nav ml-auto" v-if="currentUser">
        <li class="nav-item">
            <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{currentUser.username}}
            </router-link>
        </li>
        <li class="nav-item">
          <a href class="nav-link" v-on:click.stop.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>

    export default {
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            showAdminBoard() {
                if (this.currentUser) {
                    return this.currentUser.roles.includes('ROLE_ADMIN');
                }

                return false;
            }
        },
        methods: {
            logOut() {
                this.$store.dispatch('auth/logout');
                this.$router.push('login');
            }
        }
    };
</script>