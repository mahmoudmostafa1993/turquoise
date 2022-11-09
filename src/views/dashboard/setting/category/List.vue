<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('settings.categories') }}
        <v-spacer />
        <router-link
          :to="{ path: '/settings/categriesForm'}"
          color="primary"
        >
          <v-btn
            outlined
            class="mx-2"
            color="primary"
          >
            {{ $t('actions.add') }}
          </v-btn>
        </router-link>
      </v-card-title>
      <v-data-table
        :loading="dataLoading"
        :headers="headers"
        :search="search"
        :items="list"
        :items-per-page="20"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50]
        }"
        :options.sync="options"
        :server-items-length="total"
        :page-count="numberOfPages"
        @fetchAllItems="fetchAllItems"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip
            bottom
          >
            <template
              v-slot:activator="{ on, attrs }"
            >
              <router-link
                :to="'/settings/categriesForm/' + item.id"
              >
                <v-btn
                  small
                  fab
                  outlined
                  class="mx-2"
                  color="blue"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </router-link>
            </template>
            {{ $t('actions.edit') }}
          </v-tooltip>
          <v-tooltip
            bottom
          >
            <template
              v-slot:activator="{ on, attrs }"
            >
              <v-btn
                small
                fab
                outlined
                class="mx-2"
                color="red"
                v-bind="attrs"
                v-on="on"
                @click="confirmDeleteItem(item)"
              >
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            {{ $t('actions.delete') }}
          </v-tooltip>
        </template>

        <template
          v-slot:no-data
          loading
        >
          <p>{{ $t('actions.noData') }}</p>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog
      v-model="deleteDailog"
      width="500"
    >
      <v-card
        class="text-center"
      >
        <base-material-card
          :title="$t('actions.deleteConfirmation')"
          color="error"
          class="pt-12"
        >
          <v-card-text class="mt-2">
            {{ $t('actions.areYouSureDelete') + ' ' + itemDetails.name + ' ' + $t('actions.?') }}
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="green"
              outlined
              :loading="loading"
              :disabled="disabled"
              @click="deleteItem(itemDetails)"
            >
              {{ $t('actions.delete') }}
            </v-btn>
            <v-btn
              color="error"
              outlined
              @click="deleteDailog = false"
            >
              {{ $t('actions.close') }}
            </v-btn>
          </v-card-actions>
        </base-material-card>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="successSnackbar"
      color="success"
      shaped
      bottom
      right
      :timeout="timeout"
    >
      {{ successMessage }}
    </v-snackbar>
    <v-snackbar
      v-model="errorSnackbar"
      color="red"
      shaped
      bottom
      right
      :timeout="timeout"
    >
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>
<script>
  import { ServiceFactory } from '@/services/ServiceFactory'
  const categoryService = ServiceFactory.get('category')
  export default {
    name: 'Companies',
    data: (vm) => ({
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      list: [],
      loading: false,
      deleteDailog: false,
      itemDetails: {},
      editedIndex: -1,
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      disabled: false,
      headers: [
        {
          text: vm.$t('settings.id'),
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: vm.$t('settings.category.categoryName'), sortable: false, value: 'name' },
        { text: vm.$t('settings.category.code'), sortable: false, value: 'code' },
        { text: vm.$t('actions.actions'), value: 'actions', sortable: false },
      ],
    }),
    watch: {
      options: {
        handler () {
          this.fetchAllItems()
        },
      },
    },
    methods: {
      async fetchAllItems () {
        this.dataLoading = true
        const { page, itemsPerPage } = this.options
        const pageNumber = page - 1
        const list = await categoryService.getAllItems(itemsPerPage, page, pageNumber)
        console.log('list', list)
        this.list = list.data
        this.total = list.total
        // this.numberOfPages = companies.data.pageCount
        this.dataLoading = false
      },
      confirmDeleteItem (data) {
        this.itemDetails = data
        this.deleteDailog = true
      },
      async deleteItem (itemDetails) {
        this.loading = true
        this.disabled = true
        const deleteItem = await categoryService.deleteItem(itemDetails.id)
        if (deleteItem.status === 'success') {
          this.deleteDailog = false
          this.successMessage = 'Item Is Deleted Successfuly'
          this.successSnackbar = true
          setTimeout(() => {
            this.editedIndex = this.list.indexOf(itemDetails)
            this.list.splice(this.editedIndex, 1)
          }, 500)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
    },
  }
</script>
<style>
a{
  text-decoration: none;
}
</style>
