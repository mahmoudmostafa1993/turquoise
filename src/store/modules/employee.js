
const employees = {
  state: {
    employee: {},
  },
  getters: {},
  mutations: {},
  actions: {
    storeEmployee ({ state }, employeeData) {
      state.employee = employeeData
    },
  },
}

export default employees
