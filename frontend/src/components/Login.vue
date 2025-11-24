<template>
  <div class="center-screen">
    <div class="card p-4 shadow-sm" style="max-width:420px; width:100%">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="mb-0">Welcome</h4>
        <small class="small-muted">Forest Ops</small>
      </div>

      <form @submit.prevent="doLogin">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input class="form-control" v-model="username" />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input class="form-control" type="password" v-model="password" />
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-brand flex-grow-1" type="submit">Login</button>
          <button class="btn btn-outline-secondary" type="button" @click="doRegister">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../api';
export default {
  data() {
    return { username: '', password: '' };
  },
  methods: {
    async doLogin() {
      try {
        await api.post('/auth/login/', { username: this.username, password: this.password });
        // inform app that auth state changed
        try { window.dispatchEvent(new CustomEvent('auth-changed')); } catch(e){}
        this.$router.push('/vehicles');
      } catch (err) {
        alert(err.response?.data?.error || 'Login failed');
      }
    },
    async doRegister() {
      try {
        await api.post('/auth/register/', { username: this.username, password: this.password });
        try { window.dispatchEvent(new CustomEvent('auth-changed')); } catch(e){}
        this.$router.push('/vehicles');
      } catch (err) {
        alert(err.response?.data?.error || 'Register failed');
      }
    }
  }
};
</script>
