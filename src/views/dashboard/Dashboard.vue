<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/html-end-tags -->
<!-- eslint-disable vue/html-closing-bracket-spacing -->
<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <h1>Quick Links</h1>
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <v-card
          class="text-center"
          to="/"
        >
          <v-card-title>
            {{ $t('statistics.addNewSale') }}
          </v-card-title>
          <v-container class="text-center">
            <h1>
              <i class="fas fa-badge-dollar"></i>
            </h1>
          </v-container>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-card>
          <v-card-title>
            {{ $t('statistics.addNewItem') }}
          </v-card-title>
          <v-container class="text-center">
            <h1>
              <i class="fas fa-rings-wedding"></i>
            </h1>
          </v-container>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-card>
          <v-card-title>
            {{ $t('statistics.addNewStone') }}
          </v-card-title>
          <v-container class="text-center">
            <h1>
              <i class="fas fa-gem"></i>
            </h1>
          </v-container>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-card>
          <v-card-title>
            {{ $t('statistics.addNewCategory') }}
          </v-card-title>
          <v-container class="text-center">
            <h1>
              <i class="fas fa-ring-diamond"></i>
            </h1>
          </v-container>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-card>
          <v-card-title>
            {{ $t('statistics.addNewTransfer') }}
          </v-card-title>
          <v-container class="text-center">
            <h1>
              <i class="far fa-right-left"></i>
            </h1>
          </v-container>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-card>
          <v-card-title>
            {{ $t('statistics.pendingTransfer') }}
          </v-card-title>
          <v-container class="text-center">
            <h1>
              <v-icon>mdi-money-pending</v-icon>
            </h1>
          </v-container>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-card>
          <v-card-title>
            {{ $t('statistics.manageBranches') }}
          </v-card-title>
          <v-container class="text-center">
            <h1>
              <i class="fas fa-badge-dollar"></i>
            </h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // import PieChart from '../../components/PieChart.vue'
  // import BarChart from '../../components/BarChart.vue'
  export default {
    name: 'Dashboard',
    components: {
      // PieChart,
      // BarChart,
    },

    data () {
      return {
        chartData: {
          Books: 24,
          Magazine: 30,
          Newspapers: 10,
        },
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        fill: true,
        gradients: ['#774a00', '#E9BB70'],
        padding: 15,
        radius: 5,
        value: [0, 2, 5, 9, 5, 10, 3],
        width: 2,
      }
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>
<style lang="scss">
  h1{
    font-weight: 300;
  }
</style>
