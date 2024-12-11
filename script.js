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

//function to delete item
function deleteItem(dateValue) {

        // Update the allExpenses array to exclude the deleted item
        const newArr = allExpenses.filter((expense) => expense.moment.valueOf() !== Number(dateValue));
        allExpenses.length = 0; // Clear the original array
        allExpenses.push(...newArr); // Push the filtered items back to the array
    
        // Re-render the list
        renderList(allExpenses);
    
        // Update the total expense
        const updatedTotal = newArr.reduce((acc, expense) => acc + expense.amount, 0);
        totalExpense = updatedTotal;
        headingEl.textContent = totalExpense;
    
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