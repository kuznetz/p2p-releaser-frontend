<template>
  <div style="display: flex; flex: 1">
    <div style="width: 200px">
      <Tree :treeData="treeData" selectedId="qwe" />
    </div>
    <div style="flex: 1">
      <h1>Releases</h1>
      CONT
      <div>
        <button type="button" class="btn btn-primary">Primary</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {NodeConfig} from 'inspire-tree'
import { Configuration as ApiConfiguration } from '@/assets/releaser-api/runtime';
import { DefaultApi as ReleaserApi } from '@/assets/releaser-api/apis';

@Component({
  components: {
    Tree: () => import(/* webpackChunkName: "Tree" */ '../components/vue-inspire-tree.vue')
  }
})
export default class Releases extends Vue {
  private releaserApi?: ReleaserApi
  //@Prop() private msg!: string;

  treeData:NodeConfig[] = [
      {text: 'Item 1'},
      {text: 'Item 2', id:'qwerty'},
      {text: 'Item 3', children: [
        {text: 'Item 3.1', id:'asd'},
        {text: 'Item 3.2'}
      ]}
  ]

  async mounted() {
    let conf = new ApiConfiguration({
      basePath: 'http://localhost:3000'
    })
    console.log('ApiConfiguration',conf,ApiConfiguration)
    console.log('ReleaserApi',ReleaserApi)
    
    this.releaserApi = new ReleaserApi(new ApiConfiguration({
      basePath: 'http://localhost:3000'
    }))
    let result = await this.releaserApi.innerReleasesControllerList({})
    console.log('result',result)
  }  
}
</script>
<style>
</style>

