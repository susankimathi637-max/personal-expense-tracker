// Store all transactions in a list
let transactions = [];

// Get the elements from the page
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const addButton = document.getElementById("add-btn");
const transactionList = document.getElementById("transaction-list");
const incomeDisplay = document.getElementById("total-income");
const expensesDisplay = document.getElementById("total-expenses");
const balanceDisplay = document.getElementById("balance");

// Add a transaction when the button is clicked
addButton.addEventListener("click", function () {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeSelect.value;

  // Check that the user entered valid details
  if (description === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a description and a valid amount.");
    return;
  }

  // Save the transaction
  transactions.push({ description, amount, type });

  // Clear the form
  descriptionInput.value = "";
  amountInput.value = "";

  // Update the page
  updatePage();
});

// Refresh the totals and the transaction list
function updatePage() {
  let totalIncome = 0;
  let totalExpenses = 0;

  transactionList.innerHTML = "";

  transactions.forEach(function (transaction) {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpenses += transaction.amount;
    }

    const item = document.createElement("li");
    item.className = transaction.type;

    const name = document.createElement("span");
    name.textContent = transaction.description;

    const value = document.createElement("span");
    value.textContent = "KES " + transaction.amount.toFixed(2);

    item.appendChild(name);
    item.appendChild(value);
    transactionList.appendChild(item);
  });

  const balance = totalIncome - totalExpenses;

  incomeDisplay.textContent = "KES " + totalIncome.toFixed(2);
  expensesDisplay.textContent = "KES " + totalExpenses.toFixed(2);
  balanceDisplay.textContent = "KES " + balance.toFixed(2);
}
