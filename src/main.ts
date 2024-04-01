import { createApp } from 'vue';
import App from '@/App.vue';
import { registerPlugins } from '@core/utils/plugins';
import { toast } from 'vue3-toastify'; // Importez toast
import 'vue3-toastify/dist/index.css';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
// Styles
import '@core/scss/template/index.scss';
import '@layouts/styles/index.scss';

// Créez l'application Vue
const app = createApp(App);
app.use(ToastPlugin);

// Enregistrez les plugins
registerPlugins(app);

// Montez l'application Vue
app.mount('#app');

// Ajoutez toast au prototype de Vue
app.config.globalProperties.$toast = toast;
