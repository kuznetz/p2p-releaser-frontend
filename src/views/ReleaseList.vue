<template>
  <div style="display: flex; flex: 1">
    <div style="width: 200px">
      <Tree :treeData="tagsTree" selectedId="qwe" />
    </div>
    <div style="flex: 1">
      <h3>Releases</h3>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Author</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="release in releasesDisplay" :key="release.id" >
            <td><router-link :to="{ name: 'Release', params: { id: release.release.id }}">
              {{release.id}}
            </router-link></td>
            <td>{{release.name}}</td>
            <td>{{release.author}}</td>
          </tr>
        </tbody>
      </table>

      <!--div>
        <button type="button" class="btn btn-primary">Primary</button>
      </div-->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {NodeConfig} from 'inspire-tree'
import { releaserApi, releasesModel } from '@/main';
import { TagResponse } from '@/assets/releaser-api/models/TagResponse'
import { IReleaseFull } from '@/assets/releaser-api/models/IReleaseFull'

type ReleaseViewData = {
  name: string,
  id: string,
  author: string
}

function shortStr(str: string):string {
  if (str.length <= 12) return str
  return str.substring(0, 6)+'...'+str.substring(str.length - 6)
}

@Component({
  components: {
    Tree: () => import(/* webpackChunkName: "Tree" */ '../components/vue-inspire-tree.vue')
  }
})
export default class ReleaseList extends Vue {
  //private releaserApi?: ReleaserApi
  //@Prop() private msg!: string;

  tags : TagResponse[] = []
  releasesIds : string[] = []
  releases : IReleaseFull[] = []

  /*
  treeData:NodeConfig[] = [
      {text: 'Item 1'},
      {text: 'Item 2', id:'qwerty'},
      {text: 'Item 3', children: [
        {text: 'Item 3.1', id:'asd'},
        {text: 'Item 3.2'}
      ]}
  ]
  */

  get tagsTree():NodeConfig[] {
      return this.tagsTreeRecursive()
  }

  get releasesDisplay():ReleaseViewData[] {
    return this.releases.map<ReleaseViewData>( rel => ({
      id: shortStr(rel.id),
      name: rel.name,
      author: shortStr(rel.authorId),
      release: rel
    }) )
 }

  get releasesModel() {
    return releasesModel
  }

  tagsTreeRecursive(parentId?: string):NodeConfig[] {
      return this.tags
        .filter(tag => tag.parentId === parentId)
        .map<NodeConfig>(tag => {
          let children = this.tagsTreeRecursive(tag.id)
          return {
            id: tag.id,
            text: tag.name,
            children: children.length? children: undefined
          }
        })
  }

  async mounted() {
      this.tags = await releaserApi.innerReleasesControllerGetTags()
      await this.reload()
  }  

  async reload() {
      this.releases = []
      this.releasesIds = await releaserApi.innerReleasesControllerList({})
      console.log('this.releasesIds',this.releasesIds)
      await Promise.all<void>( this.releasesIds.map<Promise<void>>( async (id:string) => {
        let release = await this.releasesModel.loadRelease(id)
        if (release) {
          this.releases.push(release)
        }
      } ) )

  }
}
</script>
<style>
</style>

