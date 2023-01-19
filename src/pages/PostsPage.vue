<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/counter">Counter</router-link>
  </nav>
  <router-view /> -->
  <div class="home">
    <MyInput
      v-model="searchQuery"
      placeholder="Search..."
      v-focus
    />
    <div class="home__btns">
      <MyButton
        @click="showDialogue"
      >
        Create post
      </MyButton>
      <MySelect 
        v-model="selectedSort"
        :options="sortOptions"
      />
    </div>
    
    <MyDialogue v-model:show="dialogueVisible">
      <PostForm
        @create="createPost"
      />
    </MyDialogue>
    <PostList
      v-if="!isPostsLoading" 
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
    />
    <div v-else>Loading...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <div class="pagination__wrapper">
      <div 
        v-for="pageNumber in totalPages" 
        :key="pageNumber" 
        class="page__pagination" 
        :class="{'current-page': page === pageNumber}"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
// import MyDialogue from '@/components/ui/MyDialogue.vue'
import MyButton from '@/components/ui/MyButton.vue'
import MySelect from '@/components/ui/MySelect.vue'
import axios from 'axios';
import MyInput from '@/components/ui/MyInput.vue';

export default {
  components: {
    PostForm,
    PostList,
    // MyDialogue,
    MyButton,
    MySelect,
    MyInput
},
  data() {
    return {
      posts: [],
      dialogueVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limitPosts: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'By name'},
        {value: 'body', name: 'By description'},
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogueVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialogue() {
      this.dialogueVisible = true;
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limitPosts
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limitPosts)
        this.posts = response.data; 
      } catch(e) {
        alert('Error')
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limitPosts
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limitPosts)
        this.posts = [...this.posts, ...response.data]; 
      } catch(e) {
        alert('Error')
      }
    }
  },
  mounted() {
      this.fetchPosts();
      // let options = {
      //     rootMargin: '0px',
      //     threshold: 1.0
      // }

      // let callback = (entries, observer) => {
      //     if (entries[0].isIntersecting && this.page < this.totalPages) {
      //       this.loadMorePosts();
      //     }
      // }

      // let observer = new IntersectionObserver(callback, options)
      // observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // selectedSort(newValue) {
    //   this.posts.sort((post1, post2) => {
    //     return post1[newValue]?.localeCompare(post2[newValue])
    //   })
    // }
    // page() {
    //   this.fetchPosts();
    // }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.home__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.pagination__wrapper {
  display: flex;
  margin-top: 15px;
}
.page__pagination {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}
.current-page {
  border: 2px solid teal;
}
.observer {
  height: 30px;
}
</style>
