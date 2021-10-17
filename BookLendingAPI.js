
//in this task, I am faced with a challenge, Using Objects to get, review, borrow and return books
//all these for clarity, will be laid out in seperate functions
var BookLibrary = function() {
  'use strict'

  //lists to contain the Available books and Books which have been lent out
  let bookStore = [];
  let lentBooks = [];

  //to get a book into the store, we notify the user to input the book's details
  function addBookToStore() {

    const readline = require("readline");
    const addBookAction = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    addBookAction.question('\n Add the Book\'s Name, Author, ISBN and separate them with comas.', function (answer) {
    console.log("Closing the interface");
    addBookAction.close();
    });

    var newBook =answer.trim();
    //to avoid unexpected results, we check if the inputed string has comma to seperate them
    if (newBook && newBook.includes(',')) {
      //using the split function, we separate all the strings, using the comma as criteria and input them to the bookstore
      //using the push function.
      newBook = newBook.split(',');
      if (!isNaN(newBook[2]) || newBook[2].length == 10 || newBook[2].length == 13){
        newBook = ['Index: ' + function(){ return bookStore.length + 1 }(), ' Name: ' + newBook[0],' Author: ' + newBook[1], ' ISBN: ' + newBook[2] + '\n']
        bookStore.push(newBook);
        console.log('Operation Successfull')
        return true;
      }else {
      console.log('ISBN is incorrect.');
      addBookToStore();
      }
    }
  }

  //function to display all the books in the store
  function displayAvailableBooks () {
    if (bookStore.length == 0) {
      console.log('Book Store Empty');
      return false;
    } else {
      console.log('Available Books: \n' + bookStore);
      return true;
    }
  }

  //function to lend book
  function lendBook() {
    if (displayAvailableBooks()) {
      let lendIndex = prompt('To lend a book, input it\'s index ');
      lentBooks.push(bookStore.splice(lendIndex - 1, 1));
      console.log('Books Lending Succesfull')
    }
  }

  //function to display books that have been lent by the user
  function displayLentBooks() {
    if (lentBooks.length == 0) {
      console.log('No lent/borrowed books to show');
      return false
    } else {
      console.log('Here\'s the list of lent/borrowed books: \n ' + lentBooks);
      return true;
    }
  }

  //function that returns any lent book to the store
  function returnBookToStore() {
    if (displayLentBooks()) {
      let returnIndex = prompt('To return a book, INPUT IT\'S INDEX');
      bookStore.push(lentBooks.splice(returnIndex - 1, 1));
      console.log('Book Returned Successfull');
    }  
  }
  
  return {
    addBook: addBookToStore,
    lendBook: lendBook,
    returnBook: returnBookToStore,
    viewAvailableBooks: displayAvailableBooks,
    viewLentBooks: displayLentBooks
  }
}

  
console.log('Welcome to our book store, here you can lend, add, return and view books available in our store');

const readline = require("readline");

const action = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

action.question("\n What do you want to do? \n a. Add book \n b. Lend book \n c. Return book \n d. View available books or \n e. View lent books \n", function (answer) {
  if (answer) {
        switch (answer.trim()) {
          case 'a':
            this.BookLibrary.addBook();
            break;
    
          case 'b':
          this.BookLibrary.lendBook();
          break; 
    
          case 'c':
          this.BookLibrary.returnBook();
          break; 
    
          case 'd':
          this.BookLibrary.viewAvailableBooks();
          break; 
    
          case 'e':
          this.BookLibrary.viewLentBooks();
          break;  
    
          default: 
          console.log('Input invalid. Try again.');
          interfaceInner();
          break; 
        }
      }
  console.log("Closing the interface");
  action.close();
});