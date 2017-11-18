const Web3 = require('web3');


module.exports = class Blockchain {

    constructor(_node_Url, _pw) {
        this.connect(_node_Url, _pw);
    }

    connect(_node_Url, _pw) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_URL));
        if (this.web3 && !this.web3.isConnected()) {
            throw new Error("web3 is not connected. Please execute connect function if not already done. ")
        } else {
            this.web3.eth.defaultAccount = this.web3.eth.accounts[1];
            this.watch_Account = this.web3.eth.accounts[1];
            this.web3.personal.unlockAccount(this.watch_Account, _pw, 0);
            console.log(`Connected to Node at ${process.env.NODE_URL}`)
        }
    }

    set_User_Account(_account = web3.eth.accounts[2]) {
        this.user_Account = _account;
    }

    send_Ether(_value) {
        if (!this.web3) {
            throw new Error("Please connect first to Blockchain Node via connect() function.")
        }
        if (!this.user_Account) {
            throw new Error("Please set User Account first via set_User_Account function.")
        }

        let _value_in_wei = web3.toWei(_value);
        this.web3.eth.sendTransaction({ from: this.watch_Account, to: this.user_Account, value: _value_in_wei })
    }

}