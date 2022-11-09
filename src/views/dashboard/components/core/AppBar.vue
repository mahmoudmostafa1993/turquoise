<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    flat
    height="75"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light mx-2"
    />
    <v-menu
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <h2
          class="px-2"
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar
            size="56"
          >
            <img
              src="@/assets/userLogo.png"
              alt="profile image"
            >
          </v-avatar>
          {{ userName }}
          <v-icon color="#262f3d">
            fa-angle-down
          </v-icon>
        </h2>
      </template>
      <v-list>
        <v-list-item>
          <v-btn
            class="ml-2"
            min-width="0"
            text
            @click="logout()"
          >
            {{ $t('navbar.logout') }} <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-spacer />
    <div class="mx-3" />
    <v-menu
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <h5
          class="px-2"
          outlined
          v-bind="attrs"
          v-on="on"
        >
          <v-icon color="#262f3d">
            fa-angle-down
          </v-icon>
          {{ selected }}
          <v-icon
            class="px-2"
            color="#262f3d"
          >
            fa-globe
          </v-icon>
        </h5>
      </template>
      <v-list>
        <v-list-item>
          <v-btn
            v-model="selected"
            class="m-auto"
            text
            plain
            @click="changeLang('ar')"
          >
            {{ $t('lang.ar') }}
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            v-model="selected"
            class="m-auto"
            text
            plain
            @click="changeLang('en')"
          >
            {{ $t('lang.en') }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <div class="header">
      <span>{{ $t('sidbar.company') }}</span>
    </div>
  </v-app-bar>
</template>

<script>

  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: (vm) => ({
      selected: '',
      userName: '',
      Languages: [
        { text: 'AR' },
        { text: 'EN' },
      ],
    }),

    computed: {
      ...mapState(['drawer']),
    },
    created () {
      this.userName = localStorage.getItem('userName').split(' ')[0]
      if (localStorage.getItem('userLang')) {
        const userLang = localStorage.getItem('userLang')
        if (userLang === 'en') {
          this.selected = 'English'
        } else if (userLang === 'ar') {
          this.selected = 'عربى'
        }
        userLang === 'ar' ? (this.$vuetify.rtl = true) : (this.$vuetify.rtl = false)
      }
    },

    methods: {
      selectedLang () {
        if (this.selected === 'EN') {
          this.changeLang('en')
        } else if (this.selected === 'AR') {
          this.changeLang('ar')
        }
      },
      changeLang (value) {
        localStorage.setItem('userLang', value)
        window.location.reload()
      },
      changeLTR () {
        this.$vuetify.rtl = false
      },
      changeRTL () {
        this.$vuetify.rtl = true
      },
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      logout () {
        this.$store.commit('logout')
      },
    },
  }
</script>

<style lang="scss">
  .v-app-bar{
    box-shadow: rgb(0 0 0 / 20%) 0px 4px 20px 0px, rgb(0 0 0 / 14%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 0px 0px 0px !important;
    .v-input{
      max-width: 15%;
    }
    .header{
    display: flex;
    justify-content: center;
    align-items: center;
    .logo{
      width: 50px;
      height: 50px;
    }
    span{
      font-size: 16px;
      margin: 0 10px;
    }
    }
    // responsive slider
    @media only screen and (max-width: 424.98px) {
      .header{
        display: none;
      }
    }
  }
</style>
