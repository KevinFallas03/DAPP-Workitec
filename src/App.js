import './App.css';
import Select from 'react-select'

function App() {
  var colones = 0;
  var usd = 0;
  var wei = 0;
  var eth = 0;
  var commision = 0;
  var commisionWei = 0;
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
  function recalculate(){
    colones = parseInt(document.getElementById("amount").value);
    var col = colones;
    commision = col*0.10;
    usd = colones*0.0016;
    wei = 366272203455340*usd;
    eth = usd*0.00036;
    var w = wei
    commisionWei = w*0.10
    document.getElementById("p1").innerHTML = colones+'CRC = '+usd+'USD = '+eth+'ETH \n *Comision: '+commision+'CRC';
  }
  async function getComission(){
    var amount = (commisionWei).toString(16);
    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: accounts[0],
            to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
            value: '0x'+amount,
            gasPrice: '0x09184e72a000',
            gas: '0x5208',
          },
        ],
      })
      .then((txHash) => {
        alert('Hubo un erro, lo sentimos');
        console.log(txHash)})
      .catch((error) => console.error);
  }
  async function sendMoney() {
      getAccount()
      getComission()
      var amount = (wei).toString(16);
      window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: accounts[0],
              to: card,
              value: '0x'+amount,
              gasPrice: '0x09184e72a000',
              gas: '0x5208',
            },
          ],
        })
        .then((txHash) => {
          alert('Hubo un erro, lo sentimos');
          console.log(txHash)})
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
            <input onChange={recalculate} id="amount" className="input" type="text" placeholder=" " />
            <div className="cut"></div>
            <label htmlFor="amount" className="placeholder">Monto a debitar en colones</label>
          </div>
          <small id="p1">{ colones+'CRC = '+usd+'USD = '+eth+'ETH \n *Comision: '+commision+'CRC' }</small>
          <button type="text" onClick={sendMoney} className="submit">Pagar</button>
        </div>
      </header>
    </div>
  );
}

export default App;