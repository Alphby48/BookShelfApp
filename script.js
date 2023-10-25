document.addEventListener("DOMContentLoaded", function () {
  const formInput = document.querySelector("#inputBook");
  const btnSbmit = document.querySelector("#bookSubmit");
  const belumSelesai = document.getElementById("incompleteBookshelfList");
  const sudahSelesai = document.getElementById("completeBookshelfList");

  let arrBuku = [];

  formInput.addEventListener("submit", function (e) {
    e.preventDefault();
    const judul = document.getElementById("inputBookTitle").value;
    const penulis = document.getElementById("inputBookAuthor").value;
    const tahun = Number(document.getElementById("inputBookYear").value);
    const cek = document.getElementById("inputBookIsComplete").checked;

    const cekDuplikat = arrBuku.some((buku) => buku.title === judul);
    if (cekDuplikat) {
      alert("buku sudah ada didalam daftar");
    } else {
      const buku = {
        id: new Date().getTime(),
        title: judul,
        author: penulis,
        year: tahun,
        isComplete: cek,
      };
      arrBuku.push(buku);

      perbaruiInput();

      document.getElementById("inputBookTitle").value = "";
      document.getElementById("inputBookAuthor").value = "";
      document.getElementById("inputBookYear").value = "";
      document.getElementById("inputBookIsComplete").checked = false;
    }
  });
  function perbaruiInput() {
    belumSelesai.innerHTML = "";
    sudahSelesai.innerHTML = "";
    for (const buku of arrBuku) {
      const itemBuku = buatTampil(buku);
      if (buku.isComplete) {
        sudahSelesai.appendChild(itemBuku);
      } else {
        belumSelesai.appendChild(itemBuku);
      }
    }
  }

  function buatTampil(buku) {
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");

    const title = document.createElement("h3");
    title.textContent = buku.title;

    const author = document.createElement("p");
    author.textContent = "Penulis : " + buku.author;

    const year = document.createElement("p");
    year.textContent = "Penulis : " + buku.year;

    const action = document.createElement("div");
    action.classList.add("action");

    const btnRemove = createButton("Hapus", "red", function () {
      hapusBuku(buku.id);
    });

    let tglBtn;
    if (buku.isComplete) {
      tglBtn = createButton("Belum Selesai Dibaca", "yellow", function () {
        toggleIsComplete(buku.id);
      });
    } else {
      tglBtn = createButton("Selesai Dibaca", "green", function () {
        toggleIsComplete(buku.id);
      });
    }
    action.appendChild(tglBtn);
    action.appendChild(btnRemove);

    bookItem.appendChild(title);
    bookItem.appendChild(author);
    bookItem.appendChild(year);
    bookItem.appendChild(action);
    return bookItem;
  }

  function createButton(text, className, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add(className);
    button.addEventListener("click", clickHandler);
    return button;
  }

  function hapusBuku(id) {
    const index = arrBuku.findIndex((buku) => buku.id === id);
    if (index !== -1) {
      arrBuku.splice(index, 1);
      perbaruiInput();
    }
  }

  function toggleIsComplete(id) {
    const index = arrBuku.findIndex((buku) => buku.id === id);
    if (index !== -1) {
      arrBuku[index].isComplete = !arrBuku[index].isComplete;
      perbaruiInput();
    }
  }

  perbaruiInput();
});
