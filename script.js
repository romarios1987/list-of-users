var setLimitEmployee = document.querySelector('.setLimitEmployee button'), // button for changing the limit of employees
    addEmployee = document.querySelector('.addEmployee'), // add employee button
    totalAverageSalary = document.getElementById('averageSalary'), // total average salary
    totalEmployee = document.getElementById('totalEmployee'); // total Employees


var employeeFirstName = document.getElementsByClassName("employeeFirstName");
var employeeLastName = document.getElementsByClassName("employeeLastName");
var employeeSalary = document.getElementsByClassName("employeeSalary");

var currentTotalLimit = 10; // default limit Employee

document.getElementById('maxLimit').innerText = currentTotalLimit;

var currentNumberEmployee; // current number of employees
var averageSalaryEmployee; // average Salary

var firstNameInput, lastNameInput, salaryInput, positionInput;
currentEmployee();
setAverageSalary();

/**
 * Set Limit Employee
 */
setLimitEmployee.addEventListener('click', function () {
    currentTotalLimit = document.getElementById("setMaxLimit").value;
    if (currentTotalLimit > 20)
        alert("Sorry, maximum amount of workers is 20 !");
    else
        document.getElementById('maxLimit').innerText = currentTotalLimit;
});

/**
 * Function add Employee
 */
addEmployee.addEventListener('click', function () {

    // check on total Employee
    if (currentNumberEmployee == currentTotalLimit) {
        alert("Sorry, but we can not hire another employee now.");
        return;
    }
    // check on average Salary
    if (averageSalaryEmployee >= 2000) {
        alert("The average wage can not be more than 2000.");
        return;
    }

    firstNameInput = document.querySelector("input[name='first-name']").value;
    lastNameInput = document.querySelector("input[name='last-name']").value;
    salaryInput = document.querySelector("input[name='salary']").value;
    positionInput = document.querySelector("input[name='position']").value;

    switch (true) {
        case !checkDuplicate():
            return false;
            break;
        case !checkInput(firstNameInput) || !checkInput(lastNameInput):
            return false;
            break;
        case !salaryInput:
            alert("Enter your salary !");
            return false;
            break;
        case !checkInput(positionInput):
            alert("Please enter a new employee !");
            return false;
            break;
        case isNaN(parseInt(salaryInput)):
            alert("Please, enter only number !");
            return false;
            break;
    }

    var itemEmployee = document.createElement('li');
    itemEmployee.setAttribute('class', 'list-group-item');

    var newFirstName = document.createElement('span');
    newFirstName.textContent = firstNameInput;
    newFirstName.setAttribute('class', 'employeeFirstName');

    var newLastName = document.createElement('span');
    newLastName.textContent = lastNameInput;
    newLastName.setAttribute('class', 'employeeLastName');

    var newSalary = document.createElement('span');
    newSalary.textContent = "$ " + salaryInput;
    newSalary.setAttribute('class', 'employeeSalary');

    var newPosition = document.createElement('span');
    newPosition.textContent = positionInput;
    newPosition.setAttribute('class', 'employeePosition');

    itemEmployee.appendChild(newFirstName);
    itemEmployee.appendChild(newLastName);
    itemEmployee.appendChild(newSalary);
    itemEmployee.appendChild(newPosition);

    document.querySelector(".employeeList").appendChild(itemEmployee);

    currentEmployee();
    setAverageSalary();
});


/**
 * Function Current number of employees
 */
function currentEmployee() {
    currentNumberEmployee = employeeFirstName.length;
    totalEmployee.innerText = currentNumberEmployee;
}

/**
 * Function Set an average wage
 */
function setAverageSalary() {
    totalAverageSalary.innerText = averageSalary();
}

/**
 * Function check for duplication of employees
 * @returns {boolean}
 */
function checkDuplicate() {
    var l = employeeFirstName.length;
    for (var i = 0; i < l; i++) {
        var checkFirstName = firstNameInput === employeeFirstName[i].innerText;
        var checkLastName = lastNameInput === employeeLastName[i].innerText;
        if (checkFirstName && checkLastName) {
            alert("This employee already exists!");
            return false;
        }
    }
    return true;
}

/**
 * Data validation function
 * @param inputField
 * @returns {boolean}
 */
function checkInput(inputField) {
    if (!inputField) {
        alert("Fill in all the fields");
        return false;
    }
    if (!isUpperCase(inputField[0])) {
        alert("The First name, Second name and  Position have to begin with uppercase");
        return false
    }
    if (isUpperCase(inputField)) {
        alert("The first letter should be with uppercase");
        return false
    }
    return true;
}

function isUpperCase(str) {
    return str === str.toUpperCase();
}

/**
 * The function of calculating the average salary of an employee
 * @returns {number|*}
 */
function averageSalary() {
    var totalSalary = 0,
        salaryLength = employeeSalary.length;

    for (var i = 0; i < salaryLength; i++) {
        totalSalary += parseInt(employeeSalary[i].innerText.replace('$ ', ''));
    }
    averageSalaryEmployee = totalSalary / currentNumberEmployee;
    return averageSalaryEmployee.toFixed(2);
}
