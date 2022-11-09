<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('settings.stone.editStone') : $t('settings.stone.addStone') }}
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
                md="6"
              >
                <v-text-field
                  v-model="data.name"
                  outlined
                  :label="$t('settings.stone.stoneName')"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.code"
                  required
                  :label="$t('settings.stone.code')"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.price"
                  required
                  type="number"
                  :label="$t('settings.stone.price')"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.setting"
                  required
                  type="number"
                  :label="$t('settings.stone.setting')"
                  outlined
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
  const stonesService = ServiceFactory.get('stones')

  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        id: null,
        name: '',
        code: '',
        price: null,
        setting: '',
      },
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
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        const formData = {
          id: this.data.id,
          name: this.data.name,
          code: this.data.code,
          price: this.data.price,
          setting: this.data.setting,
        }
        if (this.$route.params.id) {
          this.updateContent(this.$route.params.id, formData)
        } else {
          this.newItem(formData)
        }
      },
      async newItem (data) {
        const item = await stonesService.AddNewItem(data)
        try {
          if (item.status === 'success') {
            this.successMessage = 'Item Added Successfuly'
            this.successSnackbar = true
            setTimeout(() => {
              this.$router.push('/settings/stones')
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
        const item = await stonesService.updateItem(id, data)
        try {
          if (item.status === 'success') {
            this.successMessage = 'Item Updated Successfuly'
            this.successSnackbar = true
            setTimeout(() => {
              this.$router.push('/settings/stones')
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
      async fetchOneItem (id) {
        this.dataLoading = true
        const item = await stonesService.fetchOneItem(id)
        this.data = item.data
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
