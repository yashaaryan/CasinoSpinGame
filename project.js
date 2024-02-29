//1- deposit- 
//2.determin no of lines
//2- collect a bet amount
//3-spin the slot machin
//4.check if user won 
//5.give or take the winning/loss
//6. play again 

// function deposit(){
//     return 
// }
const prompt= require("prompt-sync")();

const ROWS=3;
const COLS=3;

const SYMBOLS_COUNT= {
    "A":2,
    "B":4,
    "C":6,
    "D":8
}

const SYMBOLS_VALUES={
    "A":5,
    "B":4,
    "C":3,
    "D":2
}


const deposit=() =>{

    while(true){

    const depositAmount = prompt("enter a amt: ");
    const numberDepositAmount= parseFloat(depositAmount);
    if (isNaN(numberDepositAmount) || numberDepositAmount<=0){
        console.log("invalid Number");
    }
    else {
        return numberDepositAmount;
    }
}
};

const getNumberOfLine = () =>{
    while(true){
        const lines= prompt("enter num  of line(1-3): ");
        const noLines= parseFloat(lines);
        if (isNaN(noLines) || noLines<=0 || noLines>3){
            console.log("try again ")
        }
        else {
            return noLines;
        }
    }

}

const getBet= (balance,lines) =>{
    while(true){
        const bet= prompt("enter bet per line : ");
        const nobet= parseFloat(bet);
        if (isNaN(nobet) || nobet>=balance/lines){
            console.log("try again ")
        }
        else {
            return nobet;
        }
    }

}

const spin=() =>{
    const symbols=[];
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
        console.log(symbol,count)
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }
    const reels=[[],[],[]];
    for (let i=0;i<COLS;i++){
        const reelSymbols=[...symbols];
        for(let j=0;j<ROWS;j++){
            const randomIndex=Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol= reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.slice(randomIndex,1);
        }
    }
    return reels;
}

const transpose =(reels)=>{
    const rows=[];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
        
    }
    return rows;
}

const printRows=(rows)=>{
    for(const row of rows){
        let rowString="";
        for(const[i,symbol] of row.entries()){
            rowString+=symbol;
            if(i!=row.length-1){
                rowString+=" | ";
            }
            
        } console.log(rowString);   }
}

const getWinning=(rows,bet,lines)=>{
    let winning=0;
    for(let row=0;row<lines;row++){
        const symbols=rows[row];
        let allSame=true;
        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allSame=false;
                break;
            }
        }
        if (allSame){
            winning+=bet*SYMBOLS_VALUES[symbols[0]]

        }
    }
    return winning;
}

let balance=deposit();
const numberOfLines=getNumberOfLine();
const bet=getBet(balance,numberOfLines);
balance-=bet*3;
const reels=spin();
const rows= transpose(reels);
printRows(rows);
const winning= getWinning(rows,bet,numberOfLines);
balance+=winning;
console.log("You won,$" +winning.toString());
console.log("Your Balance: $"+balance)

if(balance<0){
    console.log("You ran out of money!")
}
else{
    let retry=prompt("Do you want to try again(Y/N)");
    while(retry=="Y" || retry=="y"){
        const numberOfLines=getNumberOfLine();
        const bet=getBet(balance,numberOfLines);
        balance-=bet*3;
        const reels=spin();
        const rows= transpose(reels);
        printRows(rows);
        const winning= getWinning(rows,bet,numberOfLines);
        balance+=winning;
        console.log("You won,$" +winning.toString());
        console.log("Your Balance: $"+balance)
        retry=prompt("Do you want to try again(Y/N)");
    }
    
    
    console.log("Game Over"); 
    
}