import './App.css';

function App() {
  let accounts = [];
  async function sendMoney() {
      getAccount()
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
        <div className="form">
          <div className="title">Nuevo pago</div>
          <div className="subtitle">Ingresa los datos del estudiante</div>
          <div className="input-container ic1">
            <input id="card" className="input" type="text" placeholder=" " />
            <div className="cut"></div>
            <label htmlFor="card" className="placeholder">Billetera del estudiante</label>
          </div>
          <div className="input-container ic2">
            <input id="amount" className="input" type="text" placeholder=" " />
            <div className="cut"></div>
            <label htmlFor="amount" className="placeholder">Monto a debitar en ETH</label>
          </div>
          <button type="text" onClick={sendMoney} className="submit">Pagar</button>
        </div>
      </header>
    </div>
  );
}

export default App;