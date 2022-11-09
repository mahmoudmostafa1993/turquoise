
import categoryServices from './setting/categoryServices'
import branchesServices from './setting/branchesServices'
import stoneServices from './setting/stoneServices'
import employeeServices from './setting/employeeServices'
import invoicesServices from './invoices/invoicesServices'

const services = {

  category: categoryServices,
  branches: branchesServices,
  stones: stoneServices,
  employee: employeeServices,
  invoices: invoicesServices,

}

export const ServiceFactory = {
    get: name => services[name],
}
