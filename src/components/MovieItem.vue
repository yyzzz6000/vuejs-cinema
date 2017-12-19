<<template lang="pug">
    div(class="movie") 
        div(class="movie-col-left")
            img(:src="movie.Poster")
        div(class="movie-col-right")
            div(class="movie-title")
                h2 {{movie.Title}}
                span(class="movie-rating") {{movie.Rated}}
            div(class="movie-sessions")
                div.session-time-wrapper(v-for="session in sessionPassTimeFilter(filterByDate(sessions))") 
                    div.session-time {{ formatSessionTime(session.time) }}
</template>
<script>
import times from '../util/times';
    export default{
        props: ["movie", "sessions", "day", "time"],
        methods: {
            formatSessionTime(time){
                 return this.$moment(time).format('hh:mm a');
            },
            filterByDate(sessions) {
                return sessions.filter( session => {
                    return this.$moment(session.time).isSame(this.day, 'day');
                });
            },
            sessionPassTimeFilter(sessions) {
                return sessions.filter( session => {
                    if (this.time.length === 0 || this.time.length === 2){
                        return true;
                    } else if (this.time[0] === times.AFTER_6PM) {
                        return this.$moment(session.time).hour() >= 18; 
                    } else {
                        return this.$moment(session.time).hour() < 18; 
                    }
                        return true;
                });
            }
        }
    }
</script>