import './App.css';
// import { window.ethereum } from 'window.ethereum'

function App() {
  let accounts = [];

  async function sendMoney() {
    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: '0xcd3B766CCDd6AE721141F452C550Ca635964ce71',
            to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            value: '0x29a2241af62c0000',
            gasPrice: '0x09184e72a000',
            gas: '0x5208',
          },
        ],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error);
  };

  async function getAccount() {
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getAccount} >Enable window.ethereum</button>
        <button onClick={sendMoney} >Send Eth</button>
      </header>
    </div>
  );
}

export default App;