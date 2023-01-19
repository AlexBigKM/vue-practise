<!--SAME COMPONENT BUT WITH VUEX-->
<template>
  <div class="home">
    <MyInput
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
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
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
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
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyButton from '@/components/ui/MyButton.vue'
import MySelect from '@/components/ui/MySelect.vue'
import axios from 'axios';
import MyInput from '@/components/ui/MyInput.vue'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  components: {
    PostForm,
    PostList,
    MyButton,
    MySelect,
    MyInput
},
  data() {
    return {
      dialogueVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
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
  },
  mounted() {
   this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limitPosts: state => state.post.limitPosts,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },
  watch: {
   
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
