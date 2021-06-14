<template>
  <div></div>
</template>

<script lang="ts">
  import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';
  import {default as InspireTree, NodeConfig, TreeNode} from 'inspire-tree'
  import {default as InspireTreeDom} from 'inspire-tree-dom'

  @Component
  export default class VueInspireTree extends Vue {

    public tree?: InspireTree
    public treeDom?: InspireTreeDom

    private curSelected?: TreeNode
    @Prop() private treeData!: Array<NodeConfig>|Promise<Array<NodeConfig>>
    @Prop() private selectedId!: string

    @Emit() selected() { return this.selected }

    @Watch('treeData') treeDataChanged() {
      this.recreate()
    }

    @Watch('selectedId') selectedIdChanged() {
      if (!this.tree) return
      if (this.curSelected?.toObject().id === this.selectedId) return
      this.curSelected = this.tree.node(this.selectedId)
      if (this.curSelected) {
          this.curSelected.expandParents()
          this.curSelected.select()
      }
    }

    mounted() {
      console.log('tree',this.treeData)
      if (this.treeData) this.recreate();
    }

    recreate() {
        this.tree = new InspireTree({ data:this.treeData })
        this.tree.on('node.selected', (event)=>{
            this.curSelected = event
            this.selected()
        })
        if (this.selectedId) {
            this.curSelected = this.tree.node(this.selectedId)
            if (this.curSelected) {
                this.curSelected.select()
                this.curSelected.expandParents()
            }
        }
        this.treeDom = new InspireTreeDom(this.tree, {
            target: this.$el as HTMLElement
        })
    }

  }


/*
export default {
  name: 'vue-inspire-tree',

  watch: {

  },
  mounted() {
    if (this.data) this.recreate();
  },
  methods: {
    recreate() {
        this.tree = new InspireTree({ data:this.data })
        this.tree.on('node.selected', (event)=>{
            this.selected = event
            this.$emit('selected',event)
        })
        if (this.selectedId) {
            this.selected = this.tree.node(this.selectedId)
            if (this.selected) {
                this.selected.select()
                this.selected.expandParents()
            }
        }
        this.treeDom = new InspireTreeDom(this.tree, {
            target: this.$el
        })
    }
  }
}
*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>