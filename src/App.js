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
        <form>
          <h1>Nueva transaccion</h1>
          <label>Tajeta del estudiante</label>
          <input id="card" name="card"/>
          <label>Monto</label>
          <input id="amount" name="amount" />
          <button onClick={sendMoney} >Realizar transaccion</button>
          {/* <button onClick={getAccount} >Habilitar cuenta</button> */}
        </form>
      </header>
    </div>
  );
}

export default App;