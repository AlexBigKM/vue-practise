<template>
  <div class="home">
    <MyInput
      v-model="searchQuery"
      placeholder="Search..."
      v-focus
    />
    <div class="home__btns">
      <MyButton
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
      />
    </MyDialogue>
    <PostList
      v-if="!isPostsLoading" 
      :posts="sortedAndSearchedPosts"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyButton from '@/components/ui/MyButton.vue'
import MySelect from '@/components/ui/MySelect.vue'
import axios from 'axios';
import MyInput from '@/components/ui/MyInput.vue'
import { ref } from 'vue'
import {usePosts} from "@/hooks/usePosts"
import useSortedPosts from "@/hooks/useSortedPosts"
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts"

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
      sortOptions: [
        {value: 'title', name: 'By name'},
        {value: 'body', name: 'By description'},
      ]
    }
  },
  setup(props) {
    const {posts, totalPages, isPostsLoading} = usePosts(10);
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);

    return {
      posts, 
      totalPages, 
      isPostsLoading, 
      sortedPosts, 
      selectedSort, 
      searchQuery, 
      sortedAndSearchedPosts
    }
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
