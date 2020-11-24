import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { formatDate } from '../common/filters';

Vue.use(Vuelidate);

Vue.filter('formatDate', (value, format) => {
    return formatDate(value, format);
});
