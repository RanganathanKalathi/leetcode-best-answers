const path = require('path')
const posts = require('./posts.json').posts


const app = new Vue({
  el: '#app',
  data: {
    posts: [],
    searchText: ''
  },
  computed: {
    filteredPosts: function() {
      if (!this.searchText) {
        return this.posts
      }
      let searchText = this.searchText.toLowerCase()
      return this.posts.filter(post => {
        return post.title.toLowerCase().indexOf(searchText) !== -1 || post.tags.some(tag => {
          return tag.toLowerCase().indexOf(searchText) !== -1
        })
      })
    }
  },
  mounted: function() {
      this.posts = posts
  }
})

Vue.component('awesome-post', {
  props: ['post'],
  computed: {
    tags: function() {
      return this.post.tags
    }
  },
  template: '#post',
  methods: {
    openProblem: function() {
      const title = this.post.title.trim().replace(/\s+/g, '-')
      const url = path.join(__dirname, `html/${this.post.number}-${title}.html`)
      window.open(url)
    }
  }
})
