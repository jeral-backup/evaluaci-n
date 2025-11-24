<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Vehicles</h3>
      <div>
        <button class="btn btn-outline-secondary me-2" @click="$router.push('/maintenances')">Maintenances</button>
        <button class="btn btn-outline-danger" @click="logout">Logout</button>
      </div>
    </div>

    <div class="card card-brand p-3 mb-3 shadow-sm">
      <form @submit.prevent="create" class="row g-2 align-items-end">
        <div class="col-md-4">
          <label class="form-label">Plate</label>
          <input class="form-control" placeholder="Plate" v-model="form.plate" />
        </div>
        <div class="col-md-3">
          <label class="form-label">Type</label>
          <input class="form-control" placeholder="Type" v-model="form.type" />
        </div>
        <div class="col-md-3">
          <label class="form-label">Model</label>
          <input class="form-control" placeholder="Model" v-model="form.model" />
        </div>
        <div class="col-md-2 d-grid">
          <button class="btn btn-brand">Add</button>
        </div>
      </form>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="list-group">
          <div v-for="v in vehicles" :key="v.id" class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <div><strong>{{ v.plate }}</strong> <small class="small-muted">— {{ v.type }}</small></div>
              <div class="small-muted">{{ v.model }}</div>
            </div>
            <div>
              <button class="btn btn-sm btn-outline-primary me-2" @click="viewMaint(v.id)">Maintenances</button>
              <button class="btn btn-sm btn-outline-danger" @click="remove(v.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return { vehicles: [], form: { plate: '', type: '', model: '' } };
  },
  async created() {
    await this.load();
  },
  methods: {
    async load() {
      try {
        const res = await api.get('/vehicles');
        this.vehicles = res.data;
      } catch (err) {
        alert('Not authorized or server error');
        this.$router.push('/');
      }
    },
    async create() {
      await api.post('/vehicles', this.form);
      this.form = { plate: '', type: '', model: '' };
      await this.load();
    },
    async remove(id) {
      await api.delete(`/vehicles/${id}`);
      await this.load();
    },
    viewMaint(id) {
      this.$router.push({ path: '/maintenances', query: { vehicleId: id } });
    },
    async logout() {
      try { await api.post('/auth/logout'); } catch(e){ console.error(e); }
      try { window.dispatchEvent(new CustomEvent('auth-changed')); } catch(e){}
      this.$router.push('/');
    }
  }
};
</script>
