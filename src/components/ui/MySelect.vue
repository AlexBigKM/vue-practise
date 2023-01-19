<template>
  <select :model="modelValue" @change="changeOption" class="select-item">
    <option disabled value="">Choose from list...</option>
    <option 
      v-for="option in options" 
      :key="option.value" 
      :value="option.value"
    >
    {{ option.name }}
    </option>
  </select>
</template>

<script>
  export default {
    name: 'MySelect',
    props: {
      modelValue: {
        type: String
      },
      options: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      changeOption(e) {
        this.$emit('update:modelValue', e.target.value)
      }
    }
  }
</script>

<style scoped>
.select-item {
  text-transform: uppercase;
}
</style>