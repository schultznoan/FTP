<template>
  <v-app>
    <Header />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from "./components/UI/Header.vue";

export default defineComponent({
  name: 'App',
  components: { Header },
});
</script>
