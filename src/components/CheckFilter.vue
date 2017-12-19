<<template lang="pug">
  div(v-bind:class="{ 'check-filter': true, 'active': checked }" v-on:click="toggleFilter")
    span(class="checkbox")
    span(class="check-filter-title") {{ title }}
</template>
<script>
export default {
    data(){
        return {
            checked: false
        }
    },
    props: ['title', 'category'],
    methods: {
        toggleFilter: function () {
            this.checked = !this.checked;
            this.$emit('check-filter', this.category, this.title, this.checked);
        }
    }
};
</script>
