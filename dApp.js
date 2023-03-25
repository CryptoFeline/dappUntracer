const untracerAbi = [
    "function DEPOSIT(bytes32 hashedPasswordManuallyTyped, bytes32 verificationNumberManuallyTyped) payable",
    "function GENERATE(string memory passwordToHash) pure returns(bytes32)",
    "function checkBalanceInWallet(address walletToCheck, address tokenToCheck) view returns(uint256)", 
    "function isContract(address addressToCheck) view returns(bool)", 
    "function CODE(uint amountToSend)",
    "function checkTokenOfUser(address walletToCheck) public view returns(bool)",
    "function FAHASH(uint256 FANumeric) public pure returns(bytes32)",
    "function WITHDRAW(string memory password) returns (bool)"
]

// Retrieve all data from the HTML form
const btnConnect = document.getElementById('connect');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const verificationNumber = document.getElementById('verificationNumber');

const verificationNumberWithdraw = document.getElementById('verificationNumberWithdraw');
const passwordWithdraw = document.getElementById('passwordWithdraw');
const uiIsTokenPresent = document.getElementById('tokenProject');


// Wallet connected to dApp
let userAddress = ""

// Web3 provider
let provider = new ethers.providers.Web3Provider(window.ethereum)

// Address of the smart contract in ETH Chain
const contractAddress = '0x5864c6A9cFdEBc8652DC576e4087c100B1F96E40' // address given while deploying the smart contract               ====> GOERLI




/* Function for DEPOSIT */

async function depositButton01() {
    if (password.value == password2.value && password.value.length >18 && verificationNumber.value >= 1)  {
        commitDeposit("100000000000000000")
    }
};

async function depositButton05() {
    if (password.value == password2.value && password.value.length >18 && verificationNumber.value >= 1)  {
        commitDeposit("500000000000000000")
    }
};
  
async function depositButton1() {
    if (password.value == password2.value && password.value.length >18 && verificationNumber.value >= 1)  {
        commitDeposit("1000000000000000000")
    }
};

async function depositButton5() {
    if (password.value == password2.value && password.value.length >18 && verificationNumber.value >= 1)  {
        commitDeposit("5000000000000000000")
    }
};


// Execute DEPOSIT inside the smartcontract. As @parameter we have the amount to send, called from buttons
async function commitDeposit(amountToSend) {
  
    const signer = provider.getSigner()
    const numberContract = new ethers.Contract(contractAddress, untracerAbi, provider);
    
    // Generate password hash from smartcontract
    const generatedHash = await numberContract.GENERATE(password.value)
  
    // Generate verification number hash from smartcontract 
    const generatedVerificationNumberHash = await numberContract.FAHASH(verificationNumber.value)
  
    // Estimate GAS usage and cost
    const gasPrice = await provider.getGasPrice();
  
    const txResponse = await numberContract.connect(signer).DEPOSIT(generatedHash, generatedVerificationNumberHash, { value: ethers.BigNumber.from(amountToSend), gasLimit: 500000, nonce: undefined,})
    await txResponse.wait()
    
  }


  // Execute confirm wallet and send security token
async function confirmWallet() {
  
    const mioContratto = new ethers.Contract(contractAddress, untracerAbi, provider);
    const signer = provider.getSigner()
    const numberContract = new ethers.Contract(contractAddress, untracerAbi, provider);
    const txResponse = await numberContract.connect(signer).CODE(verificationNumberWithdraw.value, { gasLimit: 500000, nonce: undefined,})
    await txResponse.wait()
  
  }


// Execute WITHDRAW
async function withdrawFunds() {
  
    const mioContratto = new ethers.Contract(contractAddress, untracerAbi, provider);
    const signer = provider.getSigner()   
    const numberContract = new ethers.Contract(contractAddress, untracerAbi, provider);
    const txResponse = await numberContract.connect(signer).WITHDRAW(passwordWithdraw.value, { gasLimit: 500000, nonce: undefined,})
    await txResponse.wait()
  
  }
  
/* Function to connect or disconnect Metamask */
async function connectWallet() {

    // If a connection is active, button will disconnect wallet. If not, execute a connect
    if (userAddress == "")    {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()
        const address = await signer.getAddress(),
        balance = await provider.getBalance(address),
        formattedBalance = ethers.utils.formatEther(balance)

        // Get the first 3 and the last 5 letters and numbers of the wallet connected
        var lastCharacterOfWalletConnected = address.substr(address.length - 5);
        var firstCharacterOfWalletConnected = address.slice(0, 3);
        
        // Print a message on the button  
        connect.innerHTML ="Connected with " + firstCharacterOfWalletConnected + "..." + lastCharacterOfWalletConnected
        // Set the address as a global variable
        userAddress = address
         // Check the presence of the STAKED TOKEN needed to use this service
         // Hide the default message 
         const defaultAccessTokenMessage = document.getElementById('defaultAccessToken')
         defaultAccessTokenMessage.style.visibility = 'hidden';
  const mioContratto = new ethers.Contract(contractAddress, untracerAbi, provider);
  const isPresent = await mioContratto.checkTokenOfUser(address);
  if (isPresent)  {
    uiIsTokenPresent.innerText = "Detected"
  }
  else  {
    uiIsTokenPresent.innerText = "Not Found"
  }
        return signer
    }
    else    {

        // Disconnect wallet refreshing page
        connect.innerHTML ="Connect your wallet"
        location.reload();
        return false;
    }
}

