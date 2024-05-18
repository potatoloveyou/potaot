<template>
  <div id="app">
    <nav>
      <router-link to="/">HomeView</router-link>
      |
      <router-link to="/AboutView">AboutView</router-link>
      

      <hr />
      <router-link to="/UserView">UserView</router-link>
      |
      <router-link to="/UserView?id=123">UserView123</router-link>
      |
      <router-link to="/UserView?id=456">UserView456</router-link>
      

      <hr />
      <router-link to="/PostView">PostView</router-link>
      |
      <router-link to="/PostView/123">PostView/123</router-link>
      |
      <router-link to="/PostView/456">PostView/456</router-link>
      |
      <router-link to="/PostView/test">PostView/test</router-link>
      
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
