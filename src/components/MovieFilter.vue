<<template lang="pug">
  div#movie-filter(v-on:check-filter='toggleFilter')
    h2 Movie Filter
    h3 By Time of Day
    div(class='filter-group')
        check-filter(v-for='time in times' 
                     :key='time' 
                     v-bind:title='time' 
                     v-on:check-filter='toggleFilter'
                     category='time')
    h3 By Gener
    div(class='filter-group')
        check-filter(v-for='genre in genres' 
                     :key='genre' 
                     v-bind:title='genre' 
                     v-on:check-filter='toggleFilter'
                     category='genre')

</template>
<script>
import CheckFilter from './CheckFilter.vue';
import genres from '../util/genres';
import times from '../util/times';
export default {
    data() {
        return {
            genres,
            times
        };
    },
    components: {
        CheckFilter
    },
    methods: {
        toggleFilter: function(category, title, checked) {
            this.$emit('check-filter', category, title, checked);
        }
    }
}
</script>