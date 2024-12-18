//get the elements
const inputAmountEl = document.querySelector("#inputAmount");
const inputDescEl = document.querySelector("#inputDesc");
const headingEl = document.querySelector("#heading");
const para = document.querySelector("#para");
const element = document.querySelector("#addExpenseBtn");
const expenseTableEl = document.querySelector("#expenseTable");
const searchBarEl = document.querySelector("#searchBar");
const transactionTypeEl = document.querySelector("#transactionType");
const resetBtn = document.querySelector("#resetTotals");
const totalIncomeEl = document.querySelector("#totalIncome");
const totalExpenseEl = document.querySelector("#totalExpense");
const filterTypeEl = document.querySelector("#filterType");

let totalIncome = 0;
let totalExpense = 0;

// an array to store the expenses
let allTransactions = [];

function updateHeader(){
    totalIncomeEl.textContent = `+₹${totalIncome}`;
    totalExpenseEl.textContent = `-₹${totalExpense}`;
}

function addTransaction() {
    const amount = parseInt(inputAmountEl.value);

    const desc = inputDescEl.value;

    const type = transactionTypeEl.value;

    const transaction = {
        desc,
        amount,
        type,
        moment : new Date()
    };

    if(isNaN(amount) || desc.value === ''){
        alert("Enter valid")
    }

    if(type === 'income'){
        totalIncome += amount;
    }else{
        totalExpense += amount;
    }

    allTransactions.push(transaction);
    saveToLocalStorage();
    updateHeader();
    renderList(allTransactions);

    inputAmountEl.value = '';
    inputDescEl.value = '';
}

function resetTotals() {
    totalIncome = 0;
    totalExpense = 0;

    totalIncomeEl.textContent = `+₹ 0`;
    totalExpenseEl.textContent = `-₹ 0`;

    allTransactions = [];

    saveToLocalStorage();
    renderList(allTransactions);

}


// add event listener to element
element.addEventListener("click", addTransaction);
resetBtn.addEventListener("click", resetTotals);


//function to save to local storage
function saveToLocalStorage() {
    localStorage.setItem('transactions',JSON.stringify(allTransactions))
};

//function to load the data from storage
function loadDataFromStorage(){
    const savedTransactions = localStorage.getItem('transactions');

    if(savedTransactions) {
        allTransactions = JSON.parse(savedTransactions).map(transaction => ({
            ...transaction,
            moment : new Date(transaction.moment)
        }))
    }

        totalIncome = 0;
        totalExpense = 0;

        allTransactions.forEach(transaction => {
            if(transaction.type === 'income'){
                totalIncome += transaction.amount;
            }else{
                totalExpense += transaction.amount;
            }
        });

        updateHeader();
        renderList(allTransactions);
    }


// function to render the list of arrays, used both for deleted and original array
function renderList(transactions){
    const listHTML = transactions.map(transaction => createListItem(transaction));
    const joinedListHTML = listHTML.join("");
    //update the ui
    expenseTableEl.innerHTML = joinedListHTML;
}

// function to get the current date
function getDateString(momento) {
    return momento.toLocaleString('en-US', 
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    )
}

/*
function deleteTransaction(timestamp){
    //ensure that the dateValue is a number
    const momentValue = Number(timestamp);

    const transactionIndex = allTransactions.findIndex(
        (t) => t.moment.valueOf() === momentValue
    );
    if(transactionIndex !== -1) {
        const transaction = allTransactions[transactionIndex];

        if(transaction.type === 'income') {
            totalIncome -= transaction.amount
        } else{
            totalExpense -= transaction.amount;
        }

        allTransactions.splice(transactionIndex, 1);
        saveToLocalStorage();
        updateHeader();
        renderList(allTransactions)
    }

}
*/

function deleteTransaction(timestamp) {
    // Convert the timestamp to a number for matching
    const momentValue = Number(timestamp);

    // Find the index of the transaction with the matching timestamp
    const transactionIndex = allTransactions.findIndex(
        (transaction) => transaction.moment.valueOf() === momentValue
    );

    // If the transaction exists, proceed to delete
    if (transactionIndex !== -1) {
        // Get the transaction details
        const transaction = allTransactions[transactionIndex];

        // Deduct the amount from the respective total based on transaction type
        if (transaction.type === 'income') {
            totalIncome -= transaction.amount;
        } else if (transaction.type === 'expense') {
            totalExpense -= transaction.amount;
        }

        // Remove the transaction from the array
        allTransactions.splice(transactionIndex, 1);

        // Save updated transactions to local storage
        saveToLocalStorage();

        // Update the totals displayed in the header
        updateHeader();

        // Re-render the transaction list
        renderList(allTransactions);
    } else {
        console.error(`Transaction with timestamp ${momentValue} not found.`);
    }
}

// function to create list items as user enters and show on screen
function createListItem({ desc, amount, moment,type }) {
    const amountClass = type === 'income' ? 'text-success' : 'text-danger';
    return `
            <li class="list-group-item d-flex justify-content-between">
							<div class="d-flex flex-column">
								${desc}
								<small class="text-muted">${getDateString(moment)}</small>
							</div>
							<div>
								<span class="px-5 ${amountClass}">
									₹${amount}
								</span>
								<button 
                                type="button" 
                                class="btn btn-outline-danger btn-sm"
                                onclick="deleteTransaction('${moment.valueOf()}')">
									<i class="fas fa-trash-alt"></i>
								</button>
							</div>
						</li>
    `
}

loadDataFromStorage();

//search functionality 
function searchBar() {
    //converts the value from searchbar to lowercase for case in-sensitive input
    const query = searchBarEl.value.toLowerCase();


    const filteredExpenses = allExpenses.filter(expense => 
        expense.desc.toLowerCase().includes(query) || //Converts the desc (description) of the expense to lowercase and checks if it contains the search query (query).
        getDateString(expense.moment).toLowerCase().includes(query) //Converts the formatted date string of the expense to lowercase and checks if it contains the search query.
    );

    renderList(filteredExpenses);
}

searchBarEl.addEventListener("input", searchBar);

function filterTransactionByType() {
    const selectedType = filterTypeEl.value;

    let filteredTransactions;

    if(selectedType === 'all') {
        filteredTransactions = allTransactions;
    } else{
        filteredTransactions = allTransactions.filter(transaction => transaction.type === selectedType);
    }

    renderList(filteredTransactions)
}

filterTypeEl.addEventListener("change", filterTransactionByType);

filterTransactionByType();