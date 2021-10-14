
const displaySection = document.querySelector("#displaySection");
const addAuthor = document.getElementById('addAuthor')
const addTitle = document.getElementById('addTitle')
const addPages = document.getElementById('addPages')
const addRead = document.getElementById('addRead')
const content = document.querySelector('.content')
const addSection = document.getElementById('addSection')


// Book Class
class Book {
    constructor(author,title,pages,read) {
        this.author = author
        this.title = title
        this.pages = pages
        this.read = read
    }
}

//UI Class
class UI {
    static displayBooks() {
         const myLibrary = [
             {
                 title:'J.K.Rowling',
                 author:'Harry Potter',
                 pages:'500',
                 read: 'true'
             }
         ]
         const books = myLibrary;

         myLibrary.forEach((book) => UI.addBookToList(book))
    }
    static addBookToList(book){
        displaySection.innerHTML +=
        `<div class="test">                       
            <h3>Author: ${book.author}</h3>
            <p>Title: ${book.title}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read}</p>   
            <button class="delete">Delete</button>        
         </div>`
    }

    static deleteBook(element) {
        if(element.classList.contains('delete')){
            element.parentElement.remove();
        }
    }

    static clearFields() {
       
        addAuthor.value = ''        
        addTitle.value = ''      
        addPages.value = ''       
        addRead.value = ''
    }

    static showAlert(message){
        const div = document.createElement('div')        
        div.appendChild(document.createTextNode(message))       
        content.insertBefore(div, addSection);

        // Text vanishes in 3 sec
        setTimeout(()=> document.querySelector('.alert').remove(),3000)
    }
}


//Store Class: Locale Storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
    }

    static addBook(book) {
        const books = Store.getBooks()

        books.push(book)

        localStorage.setItem('books', JSON.stringify(books))

    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isb) {
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books',JSON.stringify(books))
    }

}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);  
//Event: Add Books
const addForm = document.getElementById('add-form')

addForm.addEventListener('submit', (e) =>
 {
     // Prevent actual submit
     e.preventDefault();

     // Get Form values
    const newAuthor = addAuthor.value;
    const newTitle = addTitle.value;
    const newPages = addPages.value;
    const newRead = addRead.value;

    // Validate
    if(newAuthor === '' || newTitle === '' || newPages === '' || newRead === ''){
        UI.showAlert('Please fill in all fields')
    }
    
    //Add new book

    const book = new Book(addAuthor,addTitle,addPages,addRead)
    
    // Add Book to UI
    UI.addBookToList(book);

    // Clear fields
    UI.clearFields();

    // Show success message
    UI.showAlert('Book Added')
    console.log(book);
})


//Event: Remove Books
displaySection.addEventListener('click', (e) => {
   
    UI.deleteBook(e.target);
})






































/*
let addAuthor,addTitle,addPages,addRead

function Book(author, title, pages, read) {
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
}

 


addButton.addEventListener("click", () => {
       // let newBook = new Book(addAuthor.value,addTitle.value,addPages.value,addButton.value);
        console.log(addAuthor.value,addTitle.value,addPages.value,addRead.value)
        displayLibrary();
  });







myLibrary.push(book1,book2)

const display = () => {
for (let index = 0; index < myLibrary.length; index++) {
    "<p>Fasasz</p>"
}}


displayLibrary();

function displayLibrary() {
    myLibrary.forEach(book => {
        displaySection.innerHTML +=
        `<div class="test">
            <button>Edit</button>
            <button>Delete</button>
            <h3>${book.author}Author</h3>
            <p>${book.title}Title</p>
            <p>${book.pages}Pages</p>
            <p>${book.read}Read:</p>           
         </div>`
    })
}


*/
