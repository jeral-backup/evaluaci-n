import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Vehicles from './components/Vehicles.vue';
import Maintenance from './components/Maintenance.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/vehicles', component: Vehicles },
  { path: '/maintenances', component: Maintenance }
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
