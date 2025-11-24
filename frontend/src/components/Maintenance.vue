<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Maintenances</h3>
      <div>
        <button class="btn btn-outline-secondary me-2" @click="goBack">Back to Vehicles</button>
        <button class="btn btn-outline-danger" @click="logout">Logout</button>
      </div>
    </div>

    <div class="card p-3 mb-3 shadow-sm">
      <form @submit.prevent="create" class="row g-2 align-items-end">
        <div class="col-md-4">
          <label class="form-label">Vehicle</label>
          <select class="form-select" v-model="form.vehicleId">
            <option value="" disabled>Select vehicle</option>
            <option v-for="v in vehicles" :value="v.id" :key="v.id">{{ v.plate }} - {{ v.type }}</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">Date</label>
          <input class="form-control" type="datetime-local" v-model="form.performedAt" :class="{'is-invalid': errors.performedAt}" />
          <div class="invalid-feedback" v-if="errors.performedAt">{{ errors.performedAt }}</div>
        </div>
        <div class="col-md-3">
          <label class="form-label">Description</label>
          <input class="form-control" placeholder="Description" v-model="form.description" />
        </div>
        <div class="col-md-2 d-grid">
          <button class="btn btn-brand">Add</button>
        </div>
      </form>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="list-group">
          <div v-for="m in maintenances" :key="m.id" class="list-group-item">
            <div class="d-flex justify-content-between">
              <div>
                <div><strong>Vehicle:</strong> {{ vehicleMap[m.vehicle] || m.vehicle }}</div>
                <div class="small-muted"><strong>Date:</strong> {{ formatDate(m.performed_at) }}</div>
                <div class="mt-1">{{ m.description }}</div>
              </div>
              <div class="text-end">
                <div class="small-muted mb-2">Cost: {{ m.cost }}</div>
                <button class="btn btn-sm btn-outline-danger" @click="remove(m.id)">Delete</button>
              </div>
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
    return {
      vehicles: [],
      maintenances: [],
      form: { vehicleId: null, performedAt: '', description: '', cost: '' },
      vehicleMap: {},
      errors: {}
    };
  },
  async created() {
    await this.loadVehicles();
    await this.loadMaintenances();
    // if a vehicleId query param is present, preselect it
    const vid = this.$route.query.vehicleId;
    if (vid) this.form.vehicleId = Number(vid);
  },
  methods: {
    async loadVehicles() {
      try {
        const res = await api.get('/vehicles');
        this.vehicles = res.data;
        this.vehicleMap = {};
        this.vehicles.forEach(v => (this.vehicleMap[v.id] = v.plate));
      } catch (err) {
        console.error(err);
      }
    },
    async loadMaintenances() {
      try {
        const res = await api.get('/maintenances');
        this.maintenances = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    formatDate(s) {
      if (!s) return '';
      const d = new Date(s);
      return d.toLocaleString();
    },
    async create() {
      try {
        this.errors = {};
        if (!this.form.vehicleId || !this.form.performedAt) {
          alert('Vehicle and date are required');
          return;
        }
        // validate year is 4 digits
        // performedAt is expected in the datetime-local format: YYYY-MM-DDTHH:MM
        const datePart = (this.form.performedAt || '').split('T')[0] || '';
        const yearStr = datePart.split('-')[0] || '';
        if (yearStr.length !== 4 || !/^[0-9]{4}$/.test(yearStr)) {
          this.errors.performedAt = 'Year must be a 4-digit value (e.g. 2025)';
          return;
        }
        // convert datetime-local (YYYY-MM-DDTHH:MM) to ISO
        const iso = new Date(this.form.performedAt).toISOString();
        await api.post('/maintenances', {
          vehicleId: this.form.vehicleId,
          performedAt: iso,
          description: this.form.description,
          cost: this.form.cost || null
        });
        this.form = { vehicleId: null, performedAt: '', description: '', cost: '' };
        await this.loadMaintenances();
      } catch (err) {
        console.error(err);
        alert('Error creating maintenance');
      }
    },
    async remove(id) {
      try {
        await api.delete(`/maintenances/${id}`);
        await this.loadMaintenances();
      } catch (err) {
        console.error(err);
      }
    },
    goBack() {
      this.$router.push('/vehicles');
    },
    async logout() {
      try { await api.post('/auth/logout'); } catch(e){ console.error(e); }
      try { window.dispatchEvent(new CustomEvent('auth-changed')); } catch(e){}
      this.$router.push('/');
    }
  }
};
</script>
