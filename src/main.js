import Vue from "vue";
import VueRouter from "vue-router";
import VueMqtt from 'vue-mqtt';

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";
import Maps from "@/views/admin/Maps.vue";

// views for Auth layout

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts

import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
import Index from "@/views/Index.vue";
import IoTControl from "@/views/IoTControl.vue";
import IoTControlFuzzy from "@/views/IoTControlFuzzy.vue";

// routes

const routes = [
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        component: Dashboard,
      },
      {
        path: "/admin/settings",
        component: Settings,
      },
      {
        path: "/admin/tables",
        component: Tables,
      },
      {
        path: "/admin/maps",
        component: Maps,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        component: Login,
      },
      {
        path: "/auth/register",
        component: Register,
      },
    ],
  },
  {
    path: "/landing",
    component: Landing,
  },
  {
    path: "/iot-control",
    component: Index,// IoTControl,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/",
    component: IoTControl,// Index,
  },
  {
    path: "/fuzzy",
    component: IoTControlFuzzy,// Index,
  },
  { path: "*", redirect: "/" },
];

// app config

Vue.config.productionTip = false;

Vue.use(VueRouter);
// Vue.use(VueMqtt, 'mqtt://test.mosquitto.org/:1883', {
//   wsOptions : {},
//   cmd: 'connect',
//   protocolId : 'MQTT',
//   protocolVersion: 4,
//   clean: true, // Can also be false
// });//'wss://test.mosquitto.org:8081');
// Vue.use(VueMqtt, 'wss://test.mosquitto.org:8081', {clientId: 'WebClient-' + parseInt(Math.random() * 100000)});
Vue.use(VueMqtt, 'ws://broker.mqttdashboard.com:8000/mqtt', {clientId: 'WebClient-' + parseInt(Math.random() * 100000)});
const router = new VueRouter({
  routes,
});


new Vue({
  router,
  render: (h) => h(App),
  // mqtt: {
  //   'param/+/+/test': function(val) {
  //     console.log('param/+/+/test '+ val)
  //   },
  //   'param/#': function(val) {
  //     console.log('param/# '+ val)
  //   },
  //   'param/param/param/test': function(val) {
  //     console.log('param/param/param/test '+ val)
  //   },
  //   'template/+' (data, topic) {
  //     if (topic.split('/').pop() === '12345') {
  //       console.log('topic:', 'template/12345')
  //     }
  //   },
  //   'template/+/param/param' (data, topic) {
  //     if (topic.split('/')[1] === '12345') {
  //       console.log('topic:', 'template/12345/param/param')
  //     }
  //   }
  // },
  // methods: {
  //   clickSub: function() {
  //       this.$mqtt.subscribe('param/param/param/test')
  //   },
  //   clickPub: function() {
  //       this.$mqtt.publish('param/param/param/test', 'message')
  //   }
  // }
}).$mount("#app");
