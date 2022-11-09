
<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center mx-auto"
          size="150"
          rounded="0"
        >
          <v-avatar
            size="150"
            rounded="0"
            tile
          >
            <img
              src="../../../../assets/logos.png"
              alt="logo"
            >
          </v-avatar>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list>
      <template v-for="(item, i) in sidebarList">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        />
        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: (vm) => ({
      expand: false,
      sidebarList: [
        {
          title: vm.$t('sidbar.statistics'),
          icon: 'fa-home',
          to: '/',
          role: true,
        },
        {
          title: vm.$t('sidbar.mainStock'),
          icon: 'fa-gem',
          role: true,
          to: '/',
          children: [
            {
              title: vm.$t('sidbar.stockList'),
              to: '/',
              role: true,
            },
            {
              title: vm.$t('sidbar.transfer'),
              to: '/',
              role: true,
            },
          ],
        },
        {
          title: vm.$t('sidbar.sales'),
          icon: 'fa-badge-dollar',
          role: true,
          children: [
            {
              title: vm.$t('sidbar.salesList'),
              to: '/',
              role: true,
            },
            {
              title: vm.$t('sidbar.return'),
              to: '/price-offers',
              role: true,
            },
          ],
        },
        {
          title: vm.$t('sidbar.saveBox'),
          icon: 'fa-box',
          role: true,
          children: [
            {
              title: vm.$t('sidbar.saveBoxList'),
              to: '/',
              role: true,
            },
            {
              title: vm.$t('sidbar.saveBoxAction'),
              to: '/',
              role: true,
            },
          ],
        },
        {
          title: vm.$t('sidbar.clients'),
          icon: 'fa-users',
          role: true,
          children: [
            {
              title: vm.$t('sidbar.clientsList'),
              to: '/',
              role: true,
            },
          ],
        },
        {
          title: vm.$t('sidbar.clientReport'),
          icon: 'fa-file-pdf',
          to: '/',
          role: true,
        },
        {
          title: vm.$t('sidbar.invoices'),
          icon: 'fa-file-invoice-dollar',
          role: true,
          children: [
            {
              title: vm.$t('sidbar.invoicesList'),
              to: '/invoices/invoices',
              role: true,
            },
          ],
        },
        {
          title: vm.$t('sidbar.settings'),
          icon: 'fa-cog',
          role: true,
          children: [
            {
              title: vm.$t('sidbar.categries'),
              to: '/settings/categries',
              role: true,
            },
            {
              title: vm.$t('sidbar.stones'),
              to: '/settings/stones',
              role: true,
            },
            {
              title: vm.$t('sidbar.branches'),
              to: '/settings/branches',
              role: true,
            },
            {
              title: vm.$t('sidbar.users'),
              to: '/settings/employees',
              role: true,
            },
          ],
        },
        {
          title: vm.$t('sidbar.options'),
          icon: 'fa-filter',
          to: '/',
          role: true,
        },
        {
          title: vm.$t('sidbar.resallers'),
          icon: 'fa-user-tie',
          to: '/',
          role: true,
        },
        {
          title: vm.$t('sidbar.reports'),
          icon: 'fa-file-alt',
          role: true,
          children: [
            {
              title: vm.$t('sidbar.stockListReports'),
              to: '/',
              role: true,
            },
            {
              title: vm.$t('sidbar.salesListReports'),
              to: '/',
              role: true,
            },
            {
              title: vm.$t('sidbar.saveBoxReports'),
              to: '/',
              role: true,
            },
            {
              title: vm.$t('sidbar.transferReports'),
              to: '/',
              role: true,
            },
            {
              title: vm.$t('sidbar.resallerReports'),
              to: '/',
              role: true,
            },
          ],
        },
      ],
    }),
    computed: {
      ...mapState(['barColor'],
      // { role: state => state.login.userDataPermission },
      ),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      profile () {
        return {
          avatar: true,
          title: this.$t('avatar'),
        }
      },
    },
    methods: {
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  .v-navigation-drawer .v-icon.v-icon
      margin: 0 8px !important
      color: #fff !important

  .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled)
    color: #fff !important
    font-weight: bold

  #core-navigation-drawer

    .v-list-group__header.v-list-item--active:before
      opacity: .2
    .v-list-group__items
          .v-list-item
            margin-bottom: 0 !important
    .v-list-group--sub-group
      .v-list-item
        padding: 0
        padding-left: 0 !important
    .v-list-item--active
      background-color: transparent !important
      border-left: 5px solid #20a8d8
      border-color: #20a8d8 !important
      color: #20a8d8 !important
      font-weight: bold
      .v-icon.v-icon
        color: #20a8d8 !important
    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
