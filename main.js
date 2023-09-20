const SHA256 = require("crypto-js/sha256");

class Block{
    constructor(index, timestamp, data, previousHash=""){
      this.index = index;
      this.timestamp = timestamp;
      this.data = data;
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenensisBlock()];
    }

    createGenensisBlock(){
        return new Block(0, "16/09/2023", "Genensis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    //Checking if our blockchain is valid
    isChainValid(){
        for(let i =1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash != previousBlock.hash){
                return false;
            }
        }
            return true;

    }
}

let myCoin = new Blockchain();
myCoin.addBlock(new Block(1, "17/09/2023", {amount: 4}));
myCoin.addBlock(new Block(2, "19/09/2023", {amount: 10}));


console.log("Is blockchain valid?" + myCoin.isChainValid());
// console.log(JSON.stringify(MyCoin, null, 4));

//let's temper with it and see what happens
myCoin.chain[1].data = { amount: 100};
myCoin.chain[1].hash = myCoin.chain[1].calculateHash();

console.log("Is blockchain valid?" + myCoin.isChainValid());