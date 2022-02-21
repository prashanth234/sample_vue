<template>
  <div>
    <v-app-bar
        app
        color="app-primary"
        dark
      >
        <div class="d-flex align-center pl-2 title">
          Sample
        </div>

        <v-spacer></v-spacer>

        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          @input="edit = false"
          :max-width="350"
          offset-y
          left
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon class="ma-2">mdi-account-circle</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>

                <v-list-item-avatar>
                  <v-icon class="ma-2" large>mdi-account-circle</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ userDetails.email ? userDetails.displayName : 'Guest'}}</v-list-item-title>
                  <v-list-item-subtitle>{{userDetails.email}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                    icon
                    :color="edit ? 'primary' : ''"
                    @click="edit = !edit"
                  >
                    <v-icon >mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-action>

              </v-list-item>
            </v-list>

            <v-divider v-if="edit"></v-divider>

            <v-card-text v-if="edit">
              <v-text-field label="Username" @change="saveProfile(userDetails)" v-model="userDetails.displayName"></v-text-field>
            </v-card-text>

          </v-card>
        </v-menu>

        <v-icon @click="logout" class="mr-2 ml-3">mdi-logout-variant</v-icon>

        <template v-slot:extension>
          <v-tabs
            v-model="tab"
            background-color="app-primary"
            grow
          >
            <v-tabs-slider color="white"></v-tabs-slider>

            <v-tab
              v-for="(item, index) in tabs"
              :key="index"
            >
              <v-icon class="pr-3">{{ item.icon }}</v-icon>
              {{ item.name }}
            </v-tab>
          </v-tabs>
        </template>

      </v-app-bar>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(item, index) in tabs"
          :key="index"
        >
          <component :is="item.value"></component>
        </v-tab-item>
      </v-tabs-items>
  </div>  
</template>

<script>
import remainder from '@/components/remainder'
import tasks from '@/components/tasks'
import notes from '@/components/notes'

export default {
  components: {
    remainder,
    tasks,
    notes
  },
  data () {
    return {
      edit: false,
      userDetails: {},
      menu: false,
      tab: 1,
      tabs: [
        {name: 'Remainder', icon: 'mdi-alarm', value: 'remainder'},{name: 'Tasks', icon: 'mdi-format-list-bulleted', value: 'tasks'},
        {name: 'Notes', icon: 'mdi-notebook', value: 'notes'}
      ],
    }
  },
  methods: {
    logout () {
      this.$router.replace('login')
    },
    saveProfile () {
    }
  },
  mounted () {
  }
}
</script>