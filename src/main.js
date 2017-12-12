import Vue from 'vue';
import './style.scss';
import genres from './util/genres';
//import { MyComponent } from './myComponent';

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: []
    },
    methods: {
        toggleFitler: function(category, title, checked) {
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
        //'my-component': MyComponent
        'movie-list': {
            template: `<div id="movie-list"> 
                            <div v-for="movie in filteredMovies" class="movie">{{ movie.title }}</div>
                       </div>`,
            data: function() {
                return {
                    movies: [
                        { title: 'movie 1', genre: 'Comedy'},
                        { title: 'movie 2', genre: 'Crime'},
                        { title: 'movie 3', genre: 'Drama'}
                    ]
                };
            },
            props: ['genre', 'time'],
            computed: {
                filteredMovies: function() {
                    if(this.genre.length === 0) {
                        return this.movies;
                    }
                    return this.movies.filter((movie) => {
                        return this.genre.indexOf(movie.genre) > -1;
                    });
                }
            }
            // methods: {
            //     toggleFitler: function(category, title, checked) {
            //         console.log("movie list checked:", category, title, checked);
            //     }
            // }
        },
        'movie-filter': {
            data() {
                return {
                    genres
                };
            },
            template: `
                <div id="movie-filter" v-on:check-filter="toggleFitler">
                    <h2>Movie Filter</h2>
                    <div class="filter-group">
                        <check-filter v-for="genre in genres" :key="genre" v-bind:title="genre" v-on:check-filter="toggleFitler"></check-filter>
                    </div>
                </div>
            `,
            components: {
                'check-filter': {
                    data(){
                        return {
                            checked: false
                        }
                    },
                    props: ['title'],
                    template: `
                        <div v-bind:class="{ 'check-filter': true, 'active': checked }" v-on:click="toggleFitler">
                            <span class="checkbox"></span>
                            <span class="check-filter-title">{{ title }}</span>
                        </div>
                    `,
                    methods: {
                        toggleFitler: function () {
                            this.checked = !this.checked;
                            //console.log('check-filter check');
                            this.$emit('check-filter', 'genre', this.title, this.checked);
                        }
                    }
                }
            },
            methods: {
                toggleFitler: function(category, title, checked) {
                    //console.log("movie-filter");
                    this.$emit('check-filter', category, title, checked);
                }
            }
        }
    }
});
