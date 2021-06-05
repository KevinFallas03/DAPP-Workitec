import './App.css';
import Select from 'react-select'

function App() {
  let accounts = [];
  const options = [
    { value: '0x14dc79964da2c08b23698b3d3cc7ca32193d9955', label: 'Esteban Madrigal' },
    { value: '0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f', label: 'Jose Salazar' },
    { value: '0xa0ee7a142d267c1f36714e4a8f75612f20a79720', label: 'Kevin Fallas' },
    { value: '0xbcd4042de499d14e55001ccbb24a551f3b954096', label: 'Paola Chinchilla' },
    { value: '0x71be63f3384f5fb98995898a86b02fb2426c5788', label: 'Melania Morales' },
  ]
  var card = '';
  function handleChange(selectedOption){
    card = selectedOption.value
  };
  async function sendMoney() {
      getAccount()
      var amount =  document.getElementById("amount").value
      window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: accounts[0],
              to: card,
              value: amount,
              gasPrice: '0x09184e72a000',
              gas: '0x5208',
            },
          ],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error);
  }

  async function getAccount() {
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  }
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      color: 'gray',
      background: 'black',
      padding: 20,
    }),
  
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';   
      const background =  'black';
      return { ...provided, opacity, transition };
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2> WorkiTEC </h2>
        <div className="form">
          <div className="title">Nuevo pago</div>
          <div className="subtitle">Ingresa los datos del estudiante</div>
          <div className="input-container ic1">
          <Select onChange={handleChange} styles={customStyles} options={options} />
          </div>
          <div className="input-container ic2">
            <input id="amount" className="input" type="text" placeholder=" " />
            <div className="cut"></div>
            <label htmlFor="amount" className="placeholder">Monto a debitar</label>
          </div>
          <button type="text" onClick={sendMoney} className="submit">Pagar</button>
          
        </div>
      </header>
    </div>
  );
}

export default App;