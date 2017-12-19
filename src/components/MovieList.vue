<<template lang="pug">
  div#movie-list
    div(v-if="filteredMovies.length")
        movie-item(
                v-for="movie in filteredMovies" 
                v-bind:movie="movie.movie" 
                v-bind:sessions="movie.sessions"
                v-bind:day="day",
                v-bind:time="time")
    div.no-results(v-else-if="movies.length") {{ noResultMsg() }}
    div(v-else) Loading...
</template>
<script>
import genres from '../util/genres';
import times from '../util/times';
import MovieItem from './MovieItem.vue';
export default {
  components: {
      MovieItem
  },
  props: ["genre", "time", "movies", "day"],
  methods: {
      moviePassGenreFilter(movie) {
          if (!this.genre.length) {
              return true;
          } else {
              let movieGenres = movie.movie.Genre.split(", ");
              let matched = false;
              this.genre.forEach(genre => {
                  if (movieGenres.indexOf(genre) > -1){
                      matched = true;
                  } 
              });
              return matched;
          }
      },
      sessionPassTimeFilter(session) {
          if(!this.day.isSame(this.$moment(session.time), 'day')) {
              return false;
          } else if (this.time.length === 0 || this.time.length === 2){
              return true;
          } else if (this.time[0] === times.AFTER_6PM) {
              return this.$moment(session.time).hour() >= 18; 
          } else {
              return this.$moment(session.time).hour() < 18; 
          }
      },
      noResultMsg(){
          let times = this.time.join(',');
          let genres = this.genre.join(',');
          return `No results for ${times}${times.length > 0 && genres.length > 0 ? ',' : ''}${genres}`;
      }
  },
  computed: {
    filteredMovies: function() {
      return this.movies.filter(this.moviePassGenreFilter)
                        .filter(movie => movie.sessions.find(this.sessionPassTimeFilter));
    }
  }
};
</script>