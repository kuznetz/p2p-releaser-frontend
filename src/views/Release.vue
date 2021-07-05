<template>
  <div style="display: flex; flex: 1">
    <div v-if="release" style="flex: 1; padding: 10px">
      <h3>{{release.name}}</h3>
      <div v-if="release.description">{{release.description}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { releaserApi, releasesModel } from '@/main';
import { IReleaseFull } from '@/assets/releaser-api/models/IReleaseFull'

@Component({
  components: {
  }
})

export default class Release extends Vue {
  //private releaserApi?: ReleaserApi
  @Prop() private id!: string;

  loaded = false
  release : IReleaseFull = { 
    id: 'id',
    name: 'name',
    authorId:'authorId'
  }

  get releasesModel() {
    return releasesModel
  }

  async mounted() {
      await this.reload()
  }  

  async reload() {
      let newRelease = await this.releasesModel.loadRelease(this.id)
      if (newRelease) {
        this.release = newRelease
      }
      this.loaded = true
  }
}
</script>
<style>
</style>

