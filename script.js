//get the elements
const inputAmountEl = document.querySelector("#inputAmount");
const inputDescEl = document.querySelector("#inputDesc");
const headingEl = document.querySelector("#heading");
const para = document.querySelector("#para");
const element = document.querySelector("#addExpenseBtn");
const expenseTableEl = document.querySelector("#expenseTable");

let totalExpense = 0;

headingEl.textContent = totalExpense;
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
    headingEl.textContent = totalExpense;

    renderList(allExpenses);
    
    //clear inputs
    inputAmountEl.value = '';
    inputDescEl.value = '';
}


// add event listener to element
element.addEventListener("click", addExpenseToTotal);

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
        headingEl.textContent = totalExpense;
    }

    //Create a new array of expenses that excludes the one we want to delete.
    const newArr = allExpenses.filter((expense) => expense.moment.valueOf() !== timestamp);

    // add this new array to the all expenses array 
    allExpenses.length = 0; //empty the array
    allExpenses.push(...newArr);

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
									${amount}
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

/*
function deleteItem(dateValue) {
    // Step 1: Filter out the item to delete.
    // Keep only the items that don't match the date of the item we want to delete.
    const newArr = allExpenses.filter((expense) => expense.moment.valueOf() !== Number(dateValue));
    
    // Step 2: Update the allExpenses array.
    // Clear the original array and replace it with the filtered array.
    allExpenses.length = 0; // Remove all items from the original array.
    allExpenses.push(...newArr); // Add the filtered items back into the array.

    // Step 3: Rerender the list.
    // Show the updated list of expenses on the screen.
    renderList(allExpenses);

    // Step 4: Update the total expense.
    // Recalculate the total by summing up the amounts of all remaining expenses.
    const updatedTotal = newArr.reduce((acc, expense) => acc + expense.amount, 0);
    totalExpense = updatedTotal;

    // Step 5: Show the updated total on the screen.
    headingEl.textContent = totalExpense;
}
*/