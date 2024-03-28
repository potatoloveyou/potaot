<template>
  <footer>
    <p>{{ unfinishedQuantity }} itmes left</p>
    <ul>
      <li
        v-for="condition in conditions"
        :key="condition"
        :class="{ active: condition === currentCondition }"
        @click="$emit('change-condition', condition)">
        {{ condition }}
      </li>
    </ul>
    <button @click="$emit('delete-Completed-Task')">delete-Completed-Task</button>
  </footer>
</template>

<script>
export default {
  props: {
    conditions: Array,
    unfinishedQuantity: Number,
    currentCondition: String,
  },
};
</script>

<style lang="less" scoped>
.active {
  color: red;
}
</style>
