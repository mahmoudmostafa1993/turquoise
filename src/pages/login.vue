<template>
  <v-container
    id="regular-tables"
    class="login"
  >
    <v-card>
      <div class="header">
        <img
          src="../assets/logos.png"
          alt="logo"
        >
        <h2 class="text-center">
          Welcome To Turquoise
        </h2>
      </div>
      <template v-if="loginErrorMessage">
        <v-alert
          type="error"
          color="#ff5252"
        >
          {{ loginErrorMessage }}
        </v-alert>
      </template>
      <v-form @submit.prevent="loginSubmit()">
        <v-text-field
          v-model="userLogin.email"
          type="email"
          outlined
          rounded
          :rules="[rules.required]"
          :placeholder="$t('login.userName')"
        />
        <v-text-field
          v-model="userLogin.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          counter
          outlined
          rounded
          minlength="8"
          :placeholder="$t('login.password')"
          @click:append="show1 = !show1"
        />
      </v-form>
      <v-card-actions>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mr-4 submit"
              v-bind="attrs"
              :class="{'is-loading': isLoading}"
              :disabled="formValid"
              v-on="on"
              @click="loginSubmit"
            >
              {{ $t('login.login') }}
            </v-btn>
          </template>
          <span>{{ $t('login.login') }}</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import { required, email, password } from 'vuelidate/lib/validators'
  export default {
    validations: {
      email: { required, email },
      password: { required, password },
    },
    data () {
      return {
        formValid: false,
        isValid: true,
        show1: false,
        userLogin: {
          email: 'habiba.k1997@gmail.com',
          password: 'BIBABIBA.1',
        },
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        },
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.login.isLoading,
        loginErrorMessage: state => state.login.loginErrorMessage,
        loginSuccessful: state => state.login.loggingIn,
      }),
    },
    watch: {
      userLogin: {
        handler (val) {
          if (this.userLogin.email && this.userLogin.password) {
            this.formValid = false
          } else {
            this.formValid = true
          }
        },
        deep: true,
      },
    },
    methods: {
      gotohomepage () {
        window.location.href = '/'
      },
      ...mapActions([
        'doLogin',
      ]),
      loginSubmit () {
        if (!this.formValid) {
          this.doLogin({
            email: this.userLogin.email,
            password: this.userLogin.password,
          })
        }
      },
    },
  }
</script>
<style lang="scss">
.admin-container{
  background-color: #262f3d;
  height: 100vh
}
  .v-card{
    box-shadow: 0px 0px 20px 9px rgb(255 247 247 / 22%), 0px 2px 2px 0px rgb(255 255 255 / 14%), 0px 1px 5px 0px rgb(255 250 250 / 12%) !important;
    margin: auto;
    padding: 15px;
    height: -webkit-fill-available;
    background-color: #F5F5F5 !important;
    width: 50%;
    transform: translate(0%, 30%);
    .submit{
      left: 50%;
      transform: translate(-50%, 0%);
      background-color: #262f3d !important;
      color: #fff;
    }
    .header{
    width: 100%;
    text-align: center;
    }
    .d-flex{
      justify-content: space-between;
      display: flex;
    }
    .v-form{
      padding: 20px;
      input{
        min-height: 40px !important;
      }
      .vue-tel-input{
        margin: 15px 0;
        &:focus-within{
            box-shadow: unset !important;
            border-color: unset !important;
        }
      }
      v-text-field{
        border-radius: 3px;
        border: 1px solid #bbb;
        text-align: left;
      }
      // .v-input{
      //   &:focus{
      //       box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
      //       border-color: #66afe9;
      //   }
      // }
      .v-text-field--outlined.v-input--has-state fieldset{
        border: 1px solid #bbb;
        &:focus{
          outline: none;
        }
      }
      .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot, .v-text-field.v-text-field--enclosed .v-text-field__details{
        &:focus{
          border: 1px solid #bbb;
              outline: none;
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
            border-color: #66afe9;
        }
      }
      .v-label{
          left: 0px !important;
          right: auto !important;
        }
    }
    input:-internal-autofill-selected {
      background-color: #fff !important;
    }
    .v-list-item{
      background-color: #00000008;
      padding:10px 20px;
    }
    .v-avatar{
      margin: 0 15px;
    }
  }
</style>
