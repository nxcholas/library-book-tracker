//Exercise 1
// - user input -> js library -> update html in JS

//object array
const myLibrary = [];
const entryBtn = document.getElementById("entry-btn");
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const inputReadorNotRead = document.getElementById("read-or-notread");
const readButton = document.getElementById("readBtn");
const notReadButton = document.getElementById("notReadBtn");
let bookCounter;
let valueBookNum = -1;
let pressedReadBtn;
let pressedNotReadBtn;
let dataindexBtn = -1;
let dataReadBtn;
let dataNotReadBtn;
let dataRemoveBtn;
const entryArray = [];
const readornotreadbuttons = [];

class Book {
    constructor(title, author, pages, read, bookNum){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.num = bookNum;
        this.info = function() {
            info = title + " by " + author + ", " + pages + " pages," + " read: " + read;
            return info;
        }
    }
}

function addBookToLibrary () {
    event.preventDefault();
    let inputArray = [];

    const valueTitle = inputTitle.value;
    const valueAuthor = inputAuthor.value;
    const valuePages = inputPages.value;
    const valueReadOrNotRead = inputReadorNotRead.value;

    inputArray.push(valueTitle, valueAuthor, valuePages, valueReadOrNotRead, valueBookNum);
    valueBookNum++;

    var newBook = new Book(...inputArray);
    myLibrary.push(newBook);

    document.getElementById("bookForm").reset();
    inputArray = [];

    dataindexBtn++;

    console.log(myLibrary);
    console.log(bookCounter);
}

function addEntrytoEntryArray () {
    let newEntry = document.querySelector(`[data-index="${dataindexBtn}"]`);
    entryArray.push(newEntry);
}

function updateHTML () {
        //selecting element
        let titleText = document.querySelector(".title-text");
        let authorText = document.querySelector(".author-text");
        let pageText = document.querySelector(".page-text");
        let readText = document.getElementById(`readText${dataindexBtn}`);
        let readNumText = document.getElementById(`readNumText${dataindexBtn}`);

        // converts element into library index book value
        for (let i = 0; i < myLibrary.length; i++){
            titleText = myLibrary[i].title;
            authorText = myLibrary[i].author;
            pageText = myLibrary[i].pages;
            readText = myLibrary[i].read;
        }

        //update HTML content
        const targetEntryContainer = document.querySelector('.form-library');
        const newEntry = document.createElement("div");
        const newBtn2 = document.createElement("button");
        const newBtn3 = document.createElement("button");
        const newBtn4 = document.createElement("button");
        const HTMLString = `
                <h1 class="title-text">${titleText}</h1>
                <p class="author-text">${authorText}</p>
                <p class="page-text">${pageText}</p>
                <p class="read-text" 
                id="readNumText${dataindexBtn}"
                >${readText}</p>
        `;
        const HTMLString2 = `Read`;
        const HTMLString3 = `Not Read`;
        const HTMLString4 = 'Remove Entry';

        newEntry.innerHTML = HTMLString;
        newEntry.setAttribute("data-index", dataindexBtn);

        newBtn2.innerHTML = HTMLString2;
        newBtn2.setAttribute("class", "readBtn");
        // newBtn2.setAttribute("onclick", "updateReadText();");
        newBtn2.setAttribute("data-info" ,dataindexBtn);
        newBtn2.setAttribute("id", `readBtnNum${dataindexBtn}`);
        newBtn2.addEventListener('click', storeDataReadButton);

        newBtn3.innerHTML = HTMLString3;
        newBtn3.setAttribute("class", "notReadBtn");
        // newBtn3.setAttribute("onclick", "updateNotReadText();");
        newBtn3.setAttribute("data-info" ,dataindexBtn);
        newBtn3.setAttribute("id", `notReadBtnNum${dataindexBtn}`);
        newBtn3.addEventListener('click', storeDataNotReadButton);

        newBtn4.innerHTML = HTMLString4;
        newBtn4.setAttribute("id", "removeEntry");
        newBtn4.setAttribute("onclick", "removeEntry()")
        newBtn4.setAttribute("data-info" ,dataindexBtn);
        newBtn4.setAttribute("id", `readNum${dataindexBtn}`);
        newBtn4.addEventListener('click', storeDataRemoveButton);

        targetEntryContainer.appendChild(newEntry);
        newEntry.appendChild(newBtn2);
        newEntry.appendChild(newBtn3);  
        newEntry.appendChild(newBtn4);

        addEntrytoEntryArray;

        return readText;
}

function storeDataReadButton (event) {
    dataReadBtn = event.target;
    obtainReadBtnDataInfoValue();
    return dataReadBtn;
}

function storeDataNotReadButton (event) {
    dataNotReadBtn = event.target;
    obtainNotReadBtnDataInfoValue();
    return dataNotReadBtn;
}

function storeDataRemoveButton (event) {
    dataRemoveBtn = event.target;
    obtainRemoveDataInfoValue();
    return dataRemoveBtn;
}

function obtainReadBtnDataInfoValue () {
    let readBtnDataInfoValue = dataReadBtn.dataset.info;
    bookCounter = readBtnDataInfoValue;
    updateReadText();
}

function obtainNotReadBtnDataInfoValue () {
    let readBtnDataInfoValue = dataNotReadBtn.dataset.info;
    bookCounter = readBtnDataInfoValue;
    console.log(bookCounter);
    updateNotReadText();
}

function obtainRemoveDataInfoValue () {
    let removeBtnDataInfoValue = dataRemoveBtn.dataset.info;
    bookCounter = removeBtnDataInfoValue;
    removeEntry();
}

function updateReadText () {
    readText = document.getElementById(`readNumText${bookCounter}`);
    readText.innerHTML = "read";
    for (let i = bookCounter; i < myLibrary.length; i++){
        myLibrary[i].read = "read";
        console.log(myLibrary);
    }
}

function updateNotReadText () {
    readText = document.getElementById(`readNumText${bookCounter}`);
    readText.innerHTML = "not read";
    for (let i = bookCounter; i < myLibrary.length; i++){
        myLibrary[i].read = "not read";
        console.log(myLibrary);
    }
}

function removeEntry () {
    let HTMLentry = document.querySelector(`[data-index="${bookCounter}"]`);
    for (let i = bookCounter; i < myLibrary.length; i++){
        myLibrary.splice(i, 1);
        console.log(myLibrary);
    }
    HTMLentry.remove();
}

entryBtn.addEventListener('click', addBookToLibrary);
entryBtn.addEventListener("click", updateHTML);