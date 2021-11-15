const displaySection = document.querySelector("#displaySection");
const author = document.getElementById('author')
const title = document.getElementById('title')
const pages = document.getElementById('pages')
const read = document.getElementById('read')
const isbn = document.getElementById('isbn')
const content = document.querySelector('.content')
const addSection = document.getElementById('addSection')
let deleteButton = document.querySelectorAll('.delete')
let bookNumber;

// Book ClassW
class Book {
    constructor(author, title, pages, isbn, read,) {
        this.author = author
        this.title = title
        this.pages = pages
        this.isbn = isbn
        this.read = read
    }
}

//UI Class
class UI {
    static displayBooks() {        
        const books = Store.getBooks()            
        books.forEach((book) => UI.addBookToList(book))
    }
	
    static addBookToList(book) {        
        displaySection.innerHTML +=
            `<div class="book-list" data-isbn="${book.isbn}">                       
            <h3>Author: ${book.author}</h3>
            <p>Title:<span class="black"> ${book.title} </span> </p>
            <p>Pages:<span class="black"> ${book.pages}</span></p>
            <p>ISBN: <span class="black">${book.isbn}</span></p>  
            <p>Read:<span class="black"> ${book.read}</span></p>   
            <button class="delete"><img src="images/trash.png" width="60px" height="60px" alt="submit" /></button>        
         </div>`         
    }

    static deleteBook(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.remove();
        }
    }

    static clearFields() {
        author.value = ''
        title.value = ''
        pages.value = ''
        isbn.value = ''
        read.value = ''
    }

    static showAlert(message) {
        const div = document.createElement('div')
        div.classList.add('info')
        div.appendChild(document.createTextNode(message))
        content.insertBefore(div, addSection)
        // Text vanishes in 3 sec
        setTimeout(() => div.remove(), 3000)
    }
}

//Store Class: Locale Storage
class Store {
    static getBooks() {
        let books
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books
    }

    static addBook(book) {
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))       
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}

bookNumber = Store.getBooks().length;
console.log(bookNumber)

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add Books
const addForm = document.getElementById('add-form')

addForm.addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    let reads;

    if(read.checked == true){
        reads = "Yes"
    } else if (read.checked == false) {
        reads = "Not yet"
    }
    // Get Form values
    const newAuthor = author.value;
    const newTitle = title.value;
    const newPages = pages.value;
    const newIsbn = isbn.value
    const newRead = reads;

    // Validate
    if (newAuthor === '' || newTitle === '' || newPages === '' || newIsbn === '') {
        UI.showAlert('Please fill in all fields')
    } else {
        const books = Store.getBooks();

        if (books.length == 0) {
            //Add new book            
            const book = new Book(newAuthor, newTitle, newPages, newIsbn, newRead)

            // Add Book to UI
            UI.addBookToList(book)

            // Add book to store
            Store.addBook(book)
           
            // Clear fields
            UI.clearFields()

            // Show success message
            UI.showAlert('Book Added')
            bookNumber++;
            counting();
            

        } else {
            let logika;
            books.forEach((book, index) => {
                if (book.isbn == newIsbn) {
                    console.log(index + "van ilyen");
                    logika = true;
                }
              
            })

            if (logika == true) {
                console.log("van mar ilyen")
            } else {
                //Add new book            
                const book = new Book(newAuthor, newTitle, newPages, newIsbn, newRead)

                // Add Book to UI
                UI.addBookToList(book)

                // Add book to store
                Store.addBook(book)

                // Clear fields
                UI.clearFields();

                // Show success message
                UI.showAlert('Book Added')
                bookNumber++;
                counting();
            }
            /* books.forEach((book, index) => {
                 console.log(index + " egyznek"  + "isbn" + book.isbn + "új" +newIsbn)
                 if(book.isbn !== newIsbn) {
 
                    
                
                 }
                 } )
                */
              
                 
                
        }
    }
})

//Event: Remove Book
displaySection.addEventListener('click', (e) => {
    console.log(e.target.parentElement)

    const isButton = e.target.parentElement.nodeName === 'BUTTON';

    if (!isButton) {
        return;
    }

    console.dir(e.target.id);
    // Remove book from UI
    UI.deleteBook(e.target.parentElement);

    // Remove book from store    
    Store.removeBook(e.target.parentElement.parentElement.dataset.isbn);
    bookNumber--;    
    counting();
  

})

const counters = document.querySelectorAll('.counter');
const speed = 700; // The lower the slower
counting()
function counting () {    

counters.forEach(counter => {
	const updateCount = () => {
		const target = bookNumber;
		const count = +counter.innerText;

		// Lower inc to slow and higher to slow
		const inc = target / speed;
        

		// console.log(inc);
		// console.log(count);

		// Check if target is reached
		if (count < target) {
			// Add inc to count and output in counter
			counter.innerText = Math.ceil(count + inc);
			// Call function every ms
			setTimeout(updateCount, 200);
		} else {
			counter.innerText = target;
		}
	};

    updateCount();
});
}
