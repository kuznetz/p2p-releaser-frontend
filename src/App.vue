<template>
<div style="height: 100vh; display: flex; flex-direction: column;">

  <ul class="nav nav-pills" style="padding: 5px; background: #ddd">
    <li class="nav-item">
      <router-link class="nav-link" exact-active-class="active" to="/">releases</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" exact-active-class="active" to="/peers">peers</router-link>
    </li>
  </ul>

  <div style="flex: 1; display: flex"><router-view/></div>

</div>
</template>

<style lang="sass">
  @import "node_modules/bootstrap/scss/bootstrap";
  @import "node_modules/inspire-tree-dom/dist/inspire-tree-light";
</style>
<style>
</style>
