<template>
  <div class="navbar">
    <div class="logo" @click="$router.push('/')">VUE3</div>
    <div class="navbar__btns">
      <router-link to="/posts" class="link">Posts</router-link>
      <router-link to="/about" class="link">About</router-link>
      <router-link to="/store" class="link">Store</router-link>
      <router-link to="/composition" class="link">Composition API</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: teal;
  box-shadow: 2px 2px 4px teal;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
.logo {
  text-transform: uppercase;
  color: white;
  cursor: pointer;
}
.link {
  margin: 0 10px;
  text-decoration: none;
  color: white;
  text-transform: uppercase;
}
</style>