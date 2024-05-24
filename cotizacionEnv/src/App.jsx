import './App.css'
import ShippingCalculator from '../src/components/ShippingCalculator'
import SucursalesList from './components/SucursalesList'
import Localidades from './components/Localidades'
// import ZipCodes from './components/zipCodes'
// import ZipCodeSearch from './components/zipCodeSearch'

function App() {

  return (
    <>
      <h1>App</h1>
      <Localidades />
      <ShippingCalculator />
      <SucursalesList />
      {/* <ZipCodes/>
      <ZipCodeSearch/> */}
    </>
  )
}

export default App
