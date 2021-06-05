import './App.css';
// import { window.ethereum } from 'window.ethereum'

function App() {
  let accounts = [];
  async function sendMoney() {
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      var amount =  document.getElementById("amount").value
      var card =  document.getElementById("card").value
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

  return (
    <div className="App">
      <header className="App-header">
        <h2> WorkiTEC </h2>
        <div class="form">
          <div class="title">Nuevo pago</div>
          <div class="subtitle">Ingresa los datos del estudiante</div>
          <div class="input-container ic1">
            <input id="card" class="input" type="text" placeholder=" " />
            <div class="cut"></div>
            <label for="card" class="placeholder">Billetera del estudiante</label>
          </div>
          <div class="input-container ic2">
            <input id="lastname" class="input" type="text" placeholder=" " />
            <div class="cut"></div>
            <label for="amount" class="placeholder">Monto a debitar en ETH</label>
          </div>
          <button type="text" class="submit">Pagar</button>
        </div>
      </header>
    </div>
  );
}

export default App;