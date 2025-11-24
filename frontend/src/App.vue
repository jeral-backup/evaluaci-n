<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light app-navbar mb-4">
      <div class="container">
        <a class="navbar-brand" href="#">Forest Ops</a>
            <div class="collapse navbar-collapse">
              <ul class="navbar-nav ms-auto align-items-center">
                <li class="nav-item" v-if="!user"><router-link class="nav-link" to="/">Login</router-link></li>
                <li v-else class="nav-item me-3"><span class="nav-link">Hello, <strong>{{ user.username }}</strong></span></li>
                <li class="nav-item"><router-link class="nav-link" to="/vehicles">Vehicles</router-link></li>
                <li class="nav-item"><router-link class="nav-link" to="/maintenances">Maintenances</router-link></li>
                <li class="nav-item" v-if="user"><button class="btn btn-sm btn-outline-light ms-3" @click="logout">Logout</button></li>
              </ul>
            </div>
      </div>
    </nav>

    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
import api from './api';

export default {
  name: 'App',
  data() {
    return { user: null };
  },
  async created() {
    await this.fetchMe();
    // listen for auth changes (login/logout) from child components
    window.addEventListener('auth-changed', this.fetchMe);
  },
  beforeUnmount() {
    try { window.removeEventListener('auth-changed', this.fetchMe); } catch(e){}
  },
  methods: {
    async fetchMe() {
      try {
        const res = await api.get('/auth/me/');
        this.user = res.data;
      } catch (err) {
        this.user = null;
      }
    },
    async logout() {
      try {
        await api.post('/auth/logout/');
      } catch (err) {
        console.error(err);
      }
      this.user = null;
      this.$router.push('/');
    }
  }
};
</script>
