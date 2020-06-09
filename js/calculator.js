

document.addEventListener("DOMContentLoaded", function () {
    const packageList = document.querySelector(".calculator__package-list");
    const select = document.querySelector(".calculator__package-select")
    const arrow = document.querySelector(".calculator__package-img")
    const packageNameList = document.querySelectorAll(".calculator__package-item");

    select.addEventListener("click", function () {
        packageList.classList.toggle("is-hidden");
        arrow.classList.toggle("up");

    });

    packageNameList.forEach(e => {
        e.addEventListener("click", function () {
            document.querySelector(".calculator__package-text").innerText = e.innerText;
            packageList.classList.add("is-hidden");
            Calculate()
        })
    })

    
    
    const productsInput = document.querySelector("#products-input");
    const productsAmount = Number(document.querySelector("#products-input").value);
    const ordersInput = document.querySelector("#orders-input");
    const ordersAmount = Number(document.querySelector("#orders-input").value);
    const accountingCheckbox = document.querySelector("#checkbox__accounting");
    const terminalCheckbox = document.querySelector("#checkbox__rental");
    const resultContainer = document.querySelector(".calculator__result");
    const resultProductDiv = document.querySelector(".calculator__result-products");
    const resultOrderDiv = document.querySelector(".calculator__result-orders");
    const resultPackageDiv = document.querySelector(".calculator__result-package");
    const resultAccountingDiv = document.querySelector(".calculator__result-accounting");
    const resultTerminalDiv = document.querySelector(".calculator__result-terminal");
    const totalDiv = document.querySelector(".calculator__result-total")
    const productPrice = 0.5;
    const orderPrice = 0.25;
  

   

    const Calculate = () => {


        let total = 0;
        let accountingPrice = 0
        let terminalPrice = 0
        let packageName = document.querySelector(".calculator__package-text").innerText
        let packagePrice = 0;

        switch (packageName) {
            case "Basic":
                packagePrice = 0;
                break;
            case "Professional":
                packagePrice = 25;
                break;
            case "Premium":
                packagePrice = 60;

        }

        if (packageName !== "Choose package") {
            resultPackageDiv.classList.remove("is-hidden");
            totalDiv.classList.remove("is-hidden");
            resultPackageDiv.innerHTML = `
            <p>Package</p>
            <span>${packageName}</span>
            <strong>${packagePrice}$</strong>` 

        }

        if (Number(productsInput.value) > 0 ) {
            resultProductDiv.classList.remove("is-hidden");
            totalDiv.classList.remove("is-hidden");
            resultProductDiv.innerHTML = `
            <p>Products</p>
            <span>${Number(document.querySelector("#products-input").value)} * $${productPrice}</span>
            <strong>${Number(document.querySelector("#products-input").value)*productPrice}$</strong>` 
        } else {
            resultProductDiv.classList.add("is-hidden");
        
        }

        if (Number(ordersInput.value) > 0 ) {
            resultOrderDiv.classList.remove("is-hidden");
            totalDiv.classList.remove("is-hidden");
            resultOrderDiv.innerHTML = `
            <p>Orders</p>
            <span>${Number(document.querySelector("#orders-input").value)}*$${orderPrice}</span>
            <strong>${Number(document.querySelector("#orders-input").value)*orderPrice}$</strong>` 
        } else {
            resultOrderDiv.classList.add("is-hidden");
           
        }

        if (document.querySelector("#checkbox__accounting").checked) {
            accountingPrice = 35;
            resultAccountingDiv.classList.remove("is-hidden");
            resultAccountingDiv.innerHTML = `
            <p>Accounting</p>
            <strong>${accountingPrice}$</strong>` 
            
        } else {
            resultAccountingDiv.classList.add("is-hidden");
           
        }

       if (document.querySelector("#checkbox__rental").checked) {
           terminalPrice = 5;
           resultTerminalDiv.classList.remove("is-hidden");
           resultTerminalDiv.innerHTML = `
            <p>Terminal</p>
            <strong>${terminalPrice}$</strong>` 
          
       } else {
           resultTerminalDiv.classList.add("is-hidden");
           
       }

       if (Number(ordersInput.value) <= 0 && Number(productsInput.value) <=0 && !document.querySelector("#checkbox__rental").checked && !document.querySelector("#checkbox__rental").checked && packageName === "Choose package") {
        totalDiv.classList.add("is-hidden");
       }
            
        total = Number(document.querySelector("#products-input").value) * productPrice + Number(document.querySelector("#orders-input").value) * orderPrice + packagePrice + accountingPrice + terminalPrice;
        totalDiv.innerHTML = `
        <p>Total</p>
        <strong>${total}$</strong>
        `  

    }


    productsInput.addEventListener("input", Calculate);
    ordersInput.addEventListener("input", Calculate);
    accountingCheckbox.addEventListener("change", Calculate);
    terminalCheckbox.addEventListener("change", Calculate);
    Calculate();

  


   

   

});