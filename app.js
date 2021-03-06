// Book class: Represents a Book
class Book{
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}

// UI class: Handle UI Task
class UI{
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        
        const row = document.createElement('tr');
        row.className = "bookrow";

        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href = "#" class = "btn btn-danger btn-sm delete"><i class="fas fa-times"></i></a></td>
        `;
        list.appendChild(row);

    }

    static deleteBook(el) {
            el.parentElement.parentElement.remove();
    }

    // static editBook(el) {
    //     const isbn_var = parentElement.parentElement.previousElementSibling;
    //     const author_var = isbn_var.previousElementSibling;
    //     const title_var = author_var.previousElementSibling;


    //     isbn_var.innerHTML = `
    //     <input value = ${isbn_var.textContent} type="text" id="changed_isbn">
    //     `;
    //     author_var.innerHTML=`
    //     <input value = ${author_var.textContent} type="text" id="changed_author">
    //     `;

    //     title_var.innerHTML =`
    //     <input value = ${title_var.textContent} type="text" id="changed_title">
    //     `;

    //     el.classList.add('checked')
    // }

    // static change_button(className, el) {
    //     const change = className;
    //     if (change === 'check') {
    //         el.classList.remove('fa-edit', 'edit');
    //         el.classList.add('fa-check');
    //     };
    //     if (change === 'edit') {
    //         el.classList.remove('fa-check', 'check');
    //         el.classList.add('fa-edit');
    //     };

    // }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);
        // Vanish in 3 seconds
        setTimeout(() => {document.querySelector('.alert').remove()
        }, 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }
}


// Store Class: Handles Storage

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {

        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));

    }
}

// Event: Display Books

document.addEventListener('DOMContentLoaded', UI.displayBooks);
// document.addEventListener('DOMContentLoaded', UI.editBtn('edit'));

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {

        //Prevent actual submit
        e.preventDefault();

        //Get form values
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const isbn = document.querySelector('#isbn').value;

        // Validate
        if (title === '' || author === '' || isbn === '') {
            UI.showAlert('Please fill in the fields', 'danger');
        } else {
            //Instatiate book
            const book = new Book(title, author, isbn);
    

            // Add book to UI
            UI.addBookToList(book);

            // Add book to store
            Store.addBook(book);

            // Show success message
            UI.showAlert('Book Added', 'success');


            // Clear Fields
            UI.clearFields();
        }
    });

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    if (e.target.classList.contains('delete')) {
        UI.deleteBook(e.target);
        //Remove book from store
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        // Show success message
        UI.showAlert('Book Removed', 'success');
    }
});



// document.querySelector('#book-list').addEventListener('click', (e) => {
//     if (e.target.classList.contains('edit')) {
//         UI.editBook(e.target);
//         // UI.change_button('check', e.target);
//         // e.target.classList.add('checked')
//     }
// });
