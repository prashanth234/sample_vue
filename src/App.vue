<template>
  <v-app>

    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
  }),

  methods: {
  },

  mounted () {
  }
};
</script>

<style>

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>
