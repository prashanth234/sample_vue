<template>
  <div>
    <draggable v-model="allTasks" @change="writeToDB('drag')" animation="600" handle=".cursor-move" class="pa-3 pt-4">
      <v-row no-gutters v-for="(task, index) in tasks" :key="`${task.date}-${index}`" align="center" class="py-1">
        <v-col cols="auto" class="pr-3">
          <v-icon class="cursor-move">mdi-drag-horizontal</v-icon>
        </v-col>
        <v-col v-if="!hidecheckbox" cols="auto" class="pr-2">
          <v-checkbox hide-details color="primary" class="mt-0 pt-0" v-model="task.done" @change="writeToDB()"></v-checkbox>
        </v-col>
        <v-col align-self="end" class="text--primary text-subtitle-1">
          <content-editor class="contenteditor" :key="index" v-model="task.message" @change="writeToDB()" :done="task.done"></content-editor>
        </v-col>
      </v-row>
    </draggable>
  </div>
</template>

<script>
import contentEditor from '@/components/contentEditor'
import draggable from 'vuedraggable'

export default {
  props: ['tasks', 'hidecheckbox'],
  components: {
    contentEditor,
    draggable
  },
  data () {
    return {
      allTasks: []
    }
  },
  methods: {
    writeToDB (value) {
      this.$emit('writeToDB', value, this.allTasks)
    }
  },
  beforeMount () {
    this.allTasks = this.tasks
  }
}
</script>

<style scoped>
  .contenteditor {
    align-self: center;
  }
  .cursor-move {
    cursor: move;
  }
</style>