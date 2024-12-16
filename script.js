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


let totalIncome = 0;
let totalExpense = 0;

// an array to store the expenses
let allTransactions = [];

function updateHeader(){
    totalIncomeEl.textContent = `+₹${totalIncome}`;
    totalExpenseEl.textContent = `-₹${totalExpense}`;

}
//function to add all the expenses as we enter them in the inputs
/*
function addExpenseToTotal() {
    const expenseItem = {};

    const textAmount = inputAmountEl.value;

    const textDesc = inputDescEl.value;

    const expense = parseInt(textAmount, 10);

    expenseItem.desc = textDesc;
    expenseItem.amount = expense;
    expenseItem.moment = new Date();


    allExpenses.push(expenseItem);

    totalExpense += expense;
    headingEl.textContent = `Total: ₹ ${totalExpense}`;

    //save to local storage
    saveToLocalStorage();

    //display the expenses
    renderList(allExpenses);
    
    //clear inputs
    inputAmountEl.value = '';
    inputDescEl.value = '';
}
*/

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



// add event listener to element
element.addEventListener("click", addTransaction);


//function to save to local storage
function saveToLocalStorage() {
    localStorage.setItem('transactions',JSON.stringify(allTransactions))
};

//function to load the data from storage
function loadDataFromStorage(){
    const savedTransactions = localStorage.getItem('transactions');

    if(savedData) {
        allTransactions = JSON.parse(savedTransactions);
        totalIncome = 0;
        totalExpense = 0;

        allTransactions.forEach(transaction => {
            if(type === 'income'){
                totalIncome += transaction.amount;
            }else{
                totalExpense += transaction.amount;
            }
        });

        updateHeader()
        renderList(allTransactions)
    }
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

function deleteItem(dateValue){
    //ensure that the dateValue is a number
    const timestamp = Number(dateValue);

    if(isNaN(timestamp)) {
        console.error('invalid');
        return;
    }

    //find the expense u want to delete
    const expenseToDelete = allExpenses.find((expense) => expense.moment.valueOf() === timestamp);

    if(expenseToDelete) {
        totalExpense -= expenseToDelete.amount;
        headingEl.textContent = `Total: ₹ ${totalExpense}`;
    }

    //Create a new array of expenses that excludes the one we want to delete.
    const newArr = allExpenses.filter((expense) => expense.moment.valueOf() !== timestamp);

    // add this new array to the all expenses array 
    allExpenses.length = 0; //empty the array
    allExpenses.push(...newArr);

    //save to local storage
    saveToLocalStorage();

    //re-render the list
    renderList(allExpenses);
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
                                onclick="deleteItem('${moment.valueOf()}')">
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