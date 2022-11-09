<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('settings.employees') }}
        <v-spacer />
        <router-link
          :to="{ path: '/settings/employeesForm'}"
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
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            v-if="item.is_active === 'active'"
            color="success"
            text-color="white"
          >
            {{ item.is_active }}
          </v-chip>
          <v-chip
            v-else
            color="red"
            text-color="white"
          >
            {{ item.is_active }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
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
                color="blue"
                v-bind="attrs"
                v-on="on"
                @click="editItem(item)"
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
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
                color="orange"
                v-bind="attrs"
                v-on="on"
                @click="confirmChangeStatus(item)"
              >
                <v-icon>
                  mdi-account
                </v-icon>
              </v-btn>
            </template>
            {{ $t('actions.changeStatus') }}
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
    <v-dialog
      v-model="changeStatusDailog"
      width="500"
    >
      <v-card
        class="text-center"
      >
        <base-material-card
          :title="$t('actions.changeStatusConfirmation')"
          color="orange"
          class="pt-12"
        >
          <v-card-text class="mt-2">
            {{ $t('actions.areYouSureChangeStatus') + ' ' + itemDetails.name + ' ' + $t('actions.?') }}
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="green"
              outlined
              :loading="loading"
              :disabled="disabled"
              @click="changeStatus(itemDetails)"
            >
              {{ $t('actions.save') }}
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
  import { mapActions } from 'vuex'
  import { ServiceFactory } from '@/services/ServiceFactory'
  const employeeService = ServiceFactory.get('employee')
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
      changeStatusDailog: false,
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
        { text: vm.$t('settings.employee.employeeName'), sortable: false, value: 'name' },
        { text: vm.$t('settings.employee.role'), sortable: false, value: 'role' },
        { text: vm.$t('settings.employee.status'), sortable: false, value: 'status' },
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
        const list = await employeeService.getAllItems(itemsPerPage, page, pageNumber)
        this.list = list.data
        this.total = list.total
        // this.numberOfPages = companies.data.pageCount
        this.dataLoading = false
      },
      confirmDeleteItem (data) {
        this.itemDetails = data
        this.deleteDailog = true
      },
      ...mapActions([
        'storeEmployee',
      ]),
      editItem (item) {
        this.storeEmployee(item)
        this.$router.push('/settings/employeesForm/' + item.id)
      },
      async deleteItem (itemDetails) {
        this.loading = true
        this.disabled = true
        const deleteItem = await employeeService.deleteItem(itemDetails.id)
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
      confirmChangeStatus (item) {
        this.itemDetails = item
        this.changeStatusDailog = true
      },
      async changeStatus (itemDetails) {
        this.loading = true
        this.disabled = true
        const changeStatus = await employeeService.changeStatus(itemDetails)
        if (changeStatus.status === 'success') {
          this.changeStatusDailog = false
          this.successMessage = 'Item Is changed his Status Successfuly'
          this.successSnackbar = true
          setTimeout(() => {
            if (itemDetails.is_active === 'inactive') {
              itemDetails.is_active = 'active'
            } else {
              itemDetails.is_active = 'inactive'
            }
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
