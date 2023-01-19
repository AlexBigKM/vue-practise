<template>
  <div v-if="posts.length > 0">
    <h3>LIST</h3>
    <TransitionGroup name="posts-list">
      <PostItem 
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
      />
    </TransitionGroup>
  </div>
  <h2 v-else style="color: red;">No posts</h2>
</template>

<script>
import PostItem from '@/components/PostItem.vue'
import { TransitionGroup } from 'vue';
  export default {
    components: { PostItem, TransitionGroup },
    props: {
      posts: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>
.posts-list-item {
  display: inline-block;
  margin-right: 10px;
}
.posts-list-enter-active,
.posts-list-leave-active {
  transition: all 0.4s ease;
}
.posts-list-enter-from,
.posts-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.posts-list-move {
  transition: transform 0.4s ease;
}
</style>