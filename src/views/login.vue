<template>
  <v-row no-gutters align="center" justify="center" align-content="center" class="app-primary" style="height: 100%">
    <v-col cols="12" class="text-center pb-6 text-h4 font-weight-regular app-secondary--text" style="font-family: cursive !important">Sample</v-col>
    <v-col xl="4" lg="4" md="8" sm="11" cols="11">
      <v-card class="pa-4 pt-6">
        <v-card-text>
          <v-form ref="form" v-model="form">
            <v-row>
              <v-col cols="12" class="pt-3">
                <v-text-field ref="email" label="Email" v-model="email" type="email" @keyup.enter="signIn" outlined :rules="emailRules"></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                label="Password" ref="password" v-model="password" @keyup.enter="signIn" outlined :rules="[v => !!v || 'Required', v => (v && v.length > 7) || 'Minimum 8 characters']"></v-text-field>
              </v-col>
              <v-col cols="12" class="pt-0" v-if="alert.message">
                <v-alert :type="alert.type" class="mb-0"  text dense>
                  {{alert.message}}
                </v-alert>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn color="primary" @click="signIn" :loading="loading.signIn" :disabled="!form || loading.signUp || loading.guest || loading.forgotPassword" class="mr-3">Sign In</v-btn>
              <v-btn color="success" @click="signUp" :loading="loading.signUp" :disabled="loading.signIn || loading.guest || loading.forgotPassword" class="mr-3">Sign Up</v-btn>
              <v-btn color="cancel" @click="guest" :loading="loading.guest" :disabled="loading.signIn || loading.signUp || loading.forgotPassword" >Guest</v-btn>
            </v-col>
            <v-col cols="12" class="pa-0"></v-col>
            <v-col cols="auto">
              <v-btn color="primary" text @click="forgotPassword" :loading="loading.forgotPassword" :disabled="loading.signIn || loading.guest || loading.signUp" class="mr-3">Forgot Password</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  data () {
    return {
      loading: {
        signUp: false,
        signIn: false,
        forgotPassword: false,
        guest: false
      },
      form: false,
      email: '',
      password: '',
      alert: {message: '', type: ''},
      show: false,
      emailRules: [
        v => !!v || 'Required',
        v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'Please enter a valid email'
        }
      ],
    }
  },
  methods: {
    signIn () {
      this.$router.replace('home')
    },
    signUp() {
      this.$router.replace('home')
    },
    guest () {
      this.$refs.form.reset()
      this.$router.replace('home')
    },
    forgotPassword () {
      this.password = ''
      this.$refs.password.reset(true)
    },
    setAlert (message, type, loginType) {
      this.alert.message = message
      this.alert.type = type
      this.loading[loginType] = false
    }
  }
};
</script>
