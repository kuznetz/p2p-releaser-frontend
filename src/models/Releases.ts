import { Component, Prop, Vue } from 'vue-property-decorator';
import { releaserApi } from '@/main';
import { IReleaseFull } from '@/assets/releaser-api/models/IReleaseFull'

/*interface ReleasesModelItem {
  id: string,
  release?: IReleaseFull
}*/

@Component({})
export default class ReleasesModel extends Vue {
  
  public releases:IReleaseFull[] = []

  async created() {

  }

  async loadRelease(id: string): Promise<IReleaseFull|undefined> {
    let result = this.releases.find( r => r.id === id )
    if (!result) {
      result = await releaserApi.innerReleasesControllerGetById({id})
      this.releases.push(result)      
    }
    return result
  }

}


