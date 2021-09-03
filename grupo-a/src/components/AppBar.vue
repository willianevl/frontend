<template>
  <v-container>
        <v-navigation-drawer v-model="drawer"
      app>
      <v-list-item >
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Módulo Acadêmico
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to='item.to'
          link
        >
          <v-list-item-icon>
            <v-icon color="#00acb4">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="#383738"
      dark
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title width="400" class="ml-0 pl-4">
          <v-img id="logo"  @click="Home" src="@/assets/white-logo.png" alt="Grupo A" width="70"></v-img>
      </v-toolbar-title>
    </v-app-bar>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      items: [
          { title: 'Alunos', icon: 'mdi-account-circle', to:'/' },
          { title: 'Cadastrar Alunos', icon: 'mdi-account-arrow-right', to:'/student/create' },
      ], 
    }),
    methods: {
    Home() {
      this.$router.push("/student/list");
    },
  }
  }
</script>

<style scoped>
#logo{
  cursor: pointer;
}
</style>
