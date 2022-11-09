<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('settings.branch.editBranch') : $t('settings.branch.addBranch') }}
      </v-card-title>
      <template>
        <v-form
          v-model="valid"
          @submit.prevent="submitForm()"
        >
          <v-container fluid>
            <v-row class="mx-md-16 px-md-16">
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="data.name"
                  outlined
                  :label="$t('settings.branch.branchName')"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="data.phone"
                  required
                  :label="$t('settings.branch.phone')"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="data.address"
                  required
                  :label="$t('settings.branch.address')"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-select
                  v-model="data.city_id"
                  :items="cities"
                  item-text="name"
                  item-value="id"
                  :label="$t('settings.branch.city')"
                  outlined
                  required
                />
              </v-col>
            </v-row>
            <v-btn
              type="submit"
              class="mx-auto my-auto d-flex"
              color="indigo"
              :loading="loading"
              :disabled="disabled"
            >
              {{ this.$route.params.id ? $t('actions.save') : $t('actions.add') }}
            </v-btn>
          </v-container>
        </v-form>
      </template>
    </v-card>
    <v-snackbar
      v-model="successSnackbar"
      color="success"
      shaped
      absolute
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
      absolute
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
  const branchesService = ServiceFactory.get('branches')

  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        id: null,
        name: '',
        address: '',
        city_id: null,
        phone: '',
      },
      cities: [],
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      loading: false,
      disabled: false,
    }),
    created () {
      if (this.$route.params.id) {
        this.fetchOneItem(this.$route.params.id)
      }
      this.getAllCities()
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        const formData = {
          id: this.data.id,
          name: this.data.name,
          address: this.data.address,
          city_id: this.data.city_id,
          phone: this.data.phone,
        }
        if (this.$route.params.id) {
          this.updateContent(this.$route.params.id, formData)
        } else {
          this.newItem(formData)
        }
      },
      async newItem (data) {
        const item = await branchesService.AddNewItem(data)
        try {
          if (item.status === 'success') {
            this.successMessage = 'Item Added Successfuly'
            this.successSnackbar = true
            setTimeout(() => {
              this.$router.push('/settings/branches')
            }, 1500)
          } else {
            this.errorMessage('something Error')
            this.errorSnackbar = true
          }
        } catch (err) {
          console.log('err', err)
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async updateContent (id, data) {
        const item = await branchesService.updateItem(id, data)
        try {
          if (item.status === 'success') {
            this.successMessage = 'Item Updated Successfuly'
            this.successSnackbar = true
            setTimeout(() => {
              this.$router.push('/settings/branches')
            }, 1500)
          } else {
            this.errorMessage('something Error')
            this.errorSnackbar = true
          }
        } catch (err) {
          console.log('err', err)
          this.errorMessage('something Error')
          this.errorSnackbar = true
          setTimeout(() => {
            this.disabled = false
            this.loading = false
          }, 1500)
        }
        this.disabled = false
        this.loading = false
      },
      async fetchOneItem (id) {
        this.dataLoading = true
        const item = await branchesService.fetchOneItem(id)
        this.data = item.data
        this.dataLoading = false
      },
      async getAllCities () {
        this.dataLoading = true
        const items = await branchesService.getAllCities()
        console.log('citieas', items)
        this.cities = items
        this.dataLoading = false
      },
    },
  }
</script>
<style>
a{
  text-decoration: none;
}
</style>
