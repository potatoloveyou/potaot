<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <StudentModule></StudentModule>
    <SchoolModule></SchoolModule>
  </div>
</template>

<script>
import StudentModule from '@/components/StudentModule.vue';
import SchoolModule from '@/components/SchoolModule.vue';

export default {
  name: 'HomeView',
  components: {
    StudentModule,
    SchoolModule,
  },
  data() {
    return {
      msg: 'APP',
    };
  },
};
</script>
