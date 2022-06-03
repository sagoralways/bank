'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2027-08-27T14:43:26.374Z',
    '2021-08-28T18:49:59.371Z',
    '2021-08-29T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'en-GB',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2027-08-27T14:43:26.374Z',
    '2021-08-28T18:49:59.371Z',
    '2021-08-29T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2027-08-27T14:43:26.374Z',
    '2021-08-28T18:49:59.371Z',
    '2021-08-29T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'bn-BN',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2027-08-27T14:43:26.374Z',
    '2021-08-28T18:49:59.371Z',
    '2021-08-29T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'bn-BN',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]



/////////////////////////////////////////////////

const updateUI = function (acc) {
  
// display mvements


displayMovements(acc);

// Display Balance

displayBalace(acc)

// Display Statics

displayStatics(acc)

}

// Calculate the currency

const formatBalance = function (locale, currency, value) {
  return Intl.NumberFormat(locale, {
    style : 'currency',
    currency :currency,
  }).format(value)
};







const createUserName = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  })
};



createUserName(accounts)


const displayBalace = function (account) {

  account.balance = account.movements.reduce(function (acc, move) {
    return acc + move;
  })
  labelBalance.textContent =  formatBalance(account.locale, account.currency, account.balance)

}


const dateFormated = function (date, locale) {

  const count = function (day2, day1) {

    return Math.round(Math.abs(day2 - day1) / (1000 * 60 * 60 * 24));

  };

  const countDays = count(new Date(), date)
 

  if (countDays === 0) return 'Today';
  if(countDays ===1) return 'Yesterday';
  if(countDays <= 7) return `${count}days ago`;

 
// const year = date.getFullYear();
// const month = String(date.getMonth() + 1).padStart(2, 0);
// const day = String(date.getDate()).padStart(2, 0);

// return `${day}/${month}/${year}`;

return Intl.DateTimeFormat(locale).format(date);

};


// Display movements

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const mov = sort ? acc.movements.slice().sort((a , b) => a - b) : acc.movements;

  mov.forEach(function (move, i) {


const date = new Date(acc.movementsDates[i]);


const displayDate = dateFormated(date, acc.locale);

const type = move > 0 ? 'deposit' : 'withdrawal'

const eachMove = formatBalance(acc.locale, acc.currency, move);

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${eachMove}</div>
  </div>
    `
    containerMovements.insertAdjacentHTML("afterbegin", html)

   
  })

}



const displayStatics = function (acc) {
//Deposite
  const deposite = acc.movements.filter(function (move) {
    return move > 0;
  }).reduce(function (acc, move) {
    return acc + move;
  });


  labelSumIn.textContent = formatBalance(acc.locale, acc.currency, deposite);

  const withdrawal = acc.movements.filter(function(move) {
    return move < 0;
  }).reduce(function (acc, move) {
    return acc + move;
  }, 0);

labelSumOut.textContent = formatBalance(acc.locale, acc.currency, Math.abs(withdrawal));

  const interest = acc.movements.filter(function (move) {
    return move > 0;
  }).map(function(move) {
    return (move * acc.interestRate)/ 100;

  })
  .reduce(function(acc, move) {
    return acc + move;
  
  })


  labelSumInterest.textContent = formatBalance(acc.locale, acc.currency, interest);


}




let currentAccount, timer;


//Fake accoounts

// currentAccount = account1;
// containerApp.style.opacity = 100;
// updateUI(currentAccount)






// timer 

const timerFunc = function () {

  let time = 240;


  function tick () {
  
    const min = time / 60;
    const sec = time % 60;
  
  labelTimer.textContent = `${Math.trunc(min)}:${Math.trunc(sec)}`
  
  
  if(time === 0) {
    clearInterval(timer);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started'
  
  }
  
  time--
  
  }

  tick();

  const timer = setInterval(tick, 1000);
  
  return timer;
  
  };


btnLogin.addEventListener('click', function (e) {
e.preventDefault();

currentAccount = accounts.find(function (accounts) {
 return accounts.username === inputLoginUsername.value;
})

if(currentAccount?.pin === Number(inputLoginPin.value)) {

  //General setting

  inputLoginUsername.value = inputLoginPin.value = '';

  inputLoginPin.blur();

// Display UI

labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`



// revome the opacity

containerApp.style.opacity =  100;

if(timer) clearInterval(timer);
timer = timerFunc();


// Date and times

const now = new Date();
// const year = String(now.getFullYear()).padStart(2, 0);
// const month = String(now.getMonth()).padStart(2, 0);
// const day = String(now.getDate()).padStart(2, 0);
// const hour = String(now.getHours()).padStart(2, 0);
// const min = String(now.getMinutes()).padStart(2, 0);


labelDate.textContent = Intl.DateTimeFormat(currentAccount.locale, {
  hour: 'numeric',
  minute : 'numeric',
  year : 'numeric',
  month : 'long',
  day : 'numeric',
  weekday : 'long'
}).format(now)


  
 

// Update UI
updateUI(currentAccount)


}

//
})






//Transfer accounts

btnTransfer.addEventListener('click', function (e) {
e.preventDefault();

const amount = Number(inputTransferAmount.value);
const receverAcc = accounts.find(function (user) {
  return user.username === inputTransferTo.value;
})

if(amount > 0 && receverAcc && amount <= currentAccount.balance && currentAccount.username !== receverAcc.username) {
    currentAccount.movements.push(-amount);
    receverAcc.movements.push(amount);

    //Add Date
    currentAccount.movementsDates.push(new Date().toISOString());

    receverAcc.movementsDates.push(new Date().toISOString());

    // Reset timer

    clearInterval(timer);
    timer = timerFunc();


    //Update UI
updateUI(currentAccount)

}

inputTransferTo.value = inputTransferAmount.value = '';

});


// Loan Section

btnLoan.addEventListener('click', function (e) {
e.preventDefault();

const amount = Number(inputLoanAmount.value);

if(amount > 0 && currentAccount.movements.some(function (move) {
    return move >= amount * 0.1;
})) {

 // Add Movements

 currentAccount.movements.push(amount);

 // Add date the accounts


 currentAccount.movementsDates.push(new Date().toISOString());


// Reset timer

clearInterval(timer);
timer = timerFunc();


 // Update ui

 updateUI(currentAccount)

}

inputLoanAmount.value = '';
})

//  Delete account


btnClose.addEventListener('click' , function (e) {
  e.preventDefault();

const index = accounts.findIndex(function (fi) {
  return fi.username === inputCloseUsername.value;
});

if(currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {
  accounts.splice(index, 1);

containerApp.style.opacity = 0;


}

inputCloseUsername.value = inputClosePin.value = '';

})


//sort movements

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;

}) 

