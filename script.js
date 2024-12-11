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

    allExpenses.push(expenseItem);

    totalExpense += expense;
    headingEl.textContent = totalExpense;

    renderList(allExpenses);
    
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



// function to create list items as user enters and show on screen
function createListItem({ desc, amount }) {
    return `
            <li class="list-group-item d-flex justify-content-between">
							<div class="d-flex flex-column">
								${desc}
								<small class="text-muted">March 11, 2019</small>
							</div>
							<div>
								<span class="px-5">
									${amount}
								</span>
								<button type="button" class="btn btn-outline-danger btn-sm">
									<i class="fas fa-trash-alt"></i>
								</button>
							</div>
						</li>
    `
}