<template>
  <v-container fluid class="px-8">

    <v-row class="py-3">
      <v-col cols="12" md="8" sm="8" lg="8" xl="8">
        <v-text-field
          label="Add Task"
          v-model="message"
          hide-details
          class="pt-3"
          outlined
          @keydown.enter="addTask"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4" sm="4" lg="4" xl="4">
        <v-menu
          v-model="dateMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="formattedDate"
              label="Date"
              prepend-icon="mdi-calendar"
              hide-details
              readonly
              outlined
              class="pt-2"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="taskDate" @input="ontaskDateChange"></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-row>
      <v-col xl="6" lg="6" md="6" sm="6" cols="12">
        <v-card shaped elevation="5">
          <v-card-text>
            <v-row align="center" justify="start">
              <v-col cols="auto" class="mt-5">
                <h2 class="heading app-grey--text">
                  <v-fade-transition leave-absolute>
                    <span :key="`tasks-${tasks.length}`">
                      {{ tasks.length }}
                    </span>
                  </v-fade-transition>
                  Tasks on {{new Date(this.taskDate).toDateString()}}
                </h2>

                <!-- <v-divider class="mt-4"></v-divider> -->

                <v-row
                  class="mb-2 mt-3"
                  align="center"
                >
                  <strong class="mx-4 info--text text--darken-2">
                    Remaining: {{ tasks.length - completedTasks.number }}
                  </strong>

                  <v-divider vertical></v-divider>

                  <strong class="mx-4 success--text text--darken-2">
                    Completed: {{ completedTasks.number }}
                  </strong>

                </v-row>

              </v-col>
              <v-col cols="auto" class="ml-auto" :class="{'mx-auto' : $vuetify.breakpoint.xs}">
                <v-progress-circular
                  :rotate="360"
                  :size="100"
                  :width="15"
                  :value="completedTasks.percentage"
                  :color="getColor(completedTasks)"
                >
                  {{ isNaN(completedTasks.percentage) ? '%' : `${completedTasks.percentage}%`}}
                </v-progress-circular>
              </v-col>
            </v-row>

            <v-divider class="mt-4"></v-divider>
            <v-progress-linear indeterminate v-if="loading"></v-progress-linear>

            <task-list v-else :key="update" :tasks="tasks" @writeToDB="writeToDB" />
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import TaskList from './taskList.vue'

export default {
  components: { TaskList },
  data () {
    return {
      tasks: [],
      message: null,
      taskSnapshot: {},

      taskDate: new Date().toISOString().substr(0, 10),
      dateMenu: false,

      loading: true,

      update: 1
    }
  },
  computed: {
    formattedDate: function () {
      if (this.taskDate) {
        return this.formatDate(this.taskDate)
      }
      return ''
    },
    completedTasks: function () {
      const done = this.tasks.filter(task => task.done).length
      return {percentage: Math.round(done/this.tasks.length*100), number: done}
    },
  },
  methods: {
    getColor ({percentage}) {
      if (percentage === 100) {
        return 'primary'
      } else if (percentage < 50) {
        return 'error'
      } else if (percentage >= 50) {
        return 'success'
      }
    },
    writeToDB (drag, tasks) {
      if (tasks) { this.tasks = tasks }

      if (!drag) {
        this.taskSnapshot[this.taskDate] = {}
        this.taskSnapshot[this.taskDate].allTasks = this.tasks
      }
    },
    formatDate: function (date) {
      return date.split('-').reverse().join('-')
    },
    ontaskDateChange: function () {
      this.dateMenu = false
      this.tasks = this.taskSnapshot[this.taskDate]?.allTasks || []
    },
    addTask: function () {
      let task = { message: this.message, done: false, date: new Date().toString() }
      this.tasks.push(task)
      this.update++
      this.message = null
      this.writeToDB()
    },
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  } 
}
</script>

<style scoped>
.heading {
  /* font-family: "Bradley Hand", cursive; */
  font-size: 21px;
  font-weight: 500;
}
</style>
