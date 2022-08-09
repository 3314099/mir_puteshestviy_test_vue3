<template>
  <select
      class="app-select cursor-pointer"
      v-model="modelValue"
      @change="changeOption"
  >
    <option
      class="app-option"
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
  name: 'AppSelect',
  props: {
    modelValue: { type: [String, Number], required: true },
    options: { type: Array, default: () => [] }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style scoped>
  .app-select {
    @apply
    block
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  }
</style>
