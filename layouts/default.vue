<template>
  <v-app>
    <v-app-bar app></v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>

    <v-navigation-drawer app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>

        <div>john@vuetifyjs.com</div>
      </v-sheet>
    </v-navigation-drawer>
  </v-app>
</template>
