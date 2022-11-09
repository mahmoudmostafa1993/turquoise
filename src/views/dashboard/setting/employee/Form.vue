<!-- eslint-disable vue/order-in-components -->
<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('settings.employee.editEmployee') : $t('settings.employee.addEmployee') }}
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
                  :label="$t('settings.employee.employeeName')"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.email"
                  required
                  type="email"
                  :label="$t('settings.employee.email')"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.mobile"
                  required
                  :label="$t('settings.employee.phone')"
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.password"
                  required
                  type="password"
                  :label="$t('settings.employee.password')"
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
  // import { mapState } from 'vuex'
  import { ServiceFactory } from '@/services/ServiceFactory'
  const employeeService = ServiceFactory.get('employee')

  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        id: null,
        name: '',
        email: '',
        password: '',
        mobile: '',
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
          email: this.data.email,
          password: this.data.password,
          mobile: this.data.mobile,
        }
        const employeeData = this.$store.state.employees.employee
        if (+this.$route.params.id === employeeData.id) {
          this.updateContent(this.$route.params.id, formData)
        } else {
          this.newItem(formData)
        }
      },
      async newItem (data) {
        const item = await employeeService.AddNewItem(data)
        try {
          if (item.status === 'success') {
            this.successMessage = 'Item Added Successfuly'
            this.successSnackbar = true
            setTimeout(() => {
              this.$router.push('/settings/employees')
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
        const item = await employeeService.updateItem(id, data)
        try {
          if (item.status === 'success') {
            this.successMessage = 'Item Updated Successfuly'
            this.successSnackbar = true
            setTimeout(() => {
              this.$router.push('/settings/employees')
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
        const employeeData = this.$store.state.employees.employee
        if (+id === employeeData.id) {
          this.data = employeeData
        }
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
