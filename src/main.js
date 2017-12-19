import Vue from 'vue';
import './style.scss';
import genres from './util/genres';
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';
//import { MyComponent } from './myComponent';
import VueResouce from 'vue-resource';
Vue.use(VueResouce);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
//Vue.prototype.$moment = moment;
Object.defineProperty(Vue.prototype, '$moment', { get() {return this.$root.moment; }});

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies:[],
        moment,
        day: moment()
    },
    methods: {
        toggleFilter: function(category, title, checked) {
            if(checked) {
                this[category].push(title);
            } else {
                let index = this[category].indexOf(title);
                if( index > -1) {
                    this[category].splice(index, 1);
                }
            }
        }
    },
    components: {
        MovieList,
        MovieFilter
    },
    created() {
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        }, error => {

        });
    }
});
