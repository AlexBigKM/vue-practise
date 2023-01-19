<template>
  <div class="post">
    <div class="post__wrapper">
      <div>{{ post.id }}</div>
      <div><strong>Name:</strong> {{ post.title }} </div>
      <div><strong>Description:</strong> {{ post.body }} </div>
    </div>
    <div class="post__btns">
      <MyButton
        @click="$router.push(`/posts/${post.id}`)"
      >
      Open
      </MyButton>
      <MyButton
        @click="$emit('remove', post)"
        style="margin-left: 5px;"
      >
      Delete
      </MyButton>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
        post: {
            type: Object,
            required: true,
        }
    },
}
</script>

<style scoped>
.post {
  margin-top: 15px;
  padding: 15px;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__wrapper {
  text-align: left;
  width: 90%;
}
.post__btns {
  display: flex;
}
</style>