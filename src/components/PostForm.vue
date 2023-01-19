<template>
  <form @submit.prevent>
      <h4>Create a post</h4>
      <MyInput 
        v-focus
        v-model="post.title" 
        type="text" 
        placeholder="Name" 
      />
      <MyInput 
        v-model="post.body" 
        type="text" 
        placeholder="Description" 
      />
      <MyButton 
        @click="createPost"
        style="align-self: flex-end; margin-top: 15px;"
      >
        Create
      </MyButton>
    </form>
</template>

<script>
  export default {
    data() {
      return {
        post: {
          title: '',
          body: ''
        }
      }
    },
    methods: {
      createPost() {
        this.post.id = Date.now();
        this.$emit('create', this.post)
        this.post = {
          title: '',
          body: ''
        }
        
        }
    }
  }
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>