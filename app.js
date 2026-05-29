const dropdownsel=document.querySelectorAll(".dropdown select");
const button=document.querySelector("button");
const msg=document.querySelector("#msg");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

for(let sel of dropdownsel){
    for(let currCode in countryList ){
        let option=document.createElement("option");
        option.innerText=currCode;
        option.value=currCode;
        if(sel.name==="from" && currCode==="USD"){
            option.selected="selected";
        }
        else if(sel.name==="to" && currCode==="INR"){
            option.selected="selected";
        }
        sel.append(option);

sel.addEventListener("change",(e)=>{
    updateFlag(e.target);
});

const updateFlag=(event)=>{
    let currcode=event.value;
    let currname=countryList[currcode];
    let newimg=`https://flagsapi.com/${currname}/flat/64.png`;
    let n=event.parentElement.querySelector("img");
    n.src= newimg;
};

button.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amt input");
    amountValue=amount.value;
    if(amountValue="" || amountValue<1){
        amount.value="1";
    }
    
    const URL=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let FinalAmount=rate*(+(amount.value));

    msg.innerText=`${amount.value} ${fromCurr.value} = ${FinalAmount} ${toCurr.value}`;
});     
    }
}