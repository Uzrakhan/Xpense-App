//get the elements
const inputAmountEl = document.querySelector("#inputAmount");
const inputDescEl = document.querySelector("#inputDesc");
const headingEl = document.querySelector("#heading");
const para = document.querySelector("#para");
const element = document.querySelector("#addExpenseBtn");
const expenseTableEl = document.querySelector("#expenseTable");

let totalExpense = 0;

headingEl.textContent = `Total: ₹ ${totalExpense}`;
// an array to store the expenses
const allExpenses = [];

//function to add all the expenses as we enter them in the inputs
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


// add event listener to element
element.addEventListener("click", addExpenseToTotal);


//function to save to local storage
function saveToLocalStorage() {
    localStorage.setItem('expenses',JSON.stringify(allExpenses))
};

//function to load the data from storage
function loadDataFromStorage() {
    const savedExpenses = localStorage.getItem('expenses');

    // ensure if data is saved, if it is saved, then parse and process it
    if(savedExpenses) {
        const parsedExpenses = JSON.parse(savedExpenses);

        // 
        parsedExpenses.forEach(expense => expense.moment = new Date(expense.moment));

        allExpenses.push(...parsedExpenses);

        totalExpense = allExpenses.reduce((sum, expense) => sum + expense.amount,0);

        headingEl.textContent = `Total: ₹ ${totalExpense}`;

        renderList(allExpenses);
    }
}




// function to render the list of arrays, used both for deleted and original array
function renderList(arr){
    const allExpenseHTML = arr.map(expense => createListItem(expense));
    const joinedAllExpenseHTML = allExpenseHTML.join("");
    //update the ui
    expenseTableEl.innerHTML = joinedAllExpenseHTML;
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
function createListItem({ desc, amount, moment }) {
    return `
            <li class="list-group-item d-flex justify-content-between">
							<div class="d-flex flex-column">
								${desc}
								<small class="text-muted">${getDateString(moment)}</small>
							</div>
							<div>
								<span class="px-5">
									₹ ${amount}
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