let cardArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

function displayCards() {
    const flashcards = document.querySelector(".flashcards");
    flashcards.innerHTML = '';
    cardArray.forEach((text, index) => {
        const newDiv = document.createElement("div");
        const h2_q = document.createElement("h2");
        const h2_a = document.createElement("h2");
        const checkbox = document.createElement("input");

        newDiv.className = 'flashcard';
        newDiv.style.paddingLeft = "30px";
        newDiv.style.position = "relative";

        checkbox.type = "checkbox";
        checkbox.className = "select-card";

        h2_q.setAttribute('style', "border-top: 1px solid red; padding: 15px; margin-top: 30px;");
        h2_q.innerHTML = text.myQuestion;

        h2_a.setAttribute('style', "display: none; color: red; text-align: center; border-top: 1px solid red; padding: 15px; margin-top: 30px;");
        h2_a.innerHTML = text.myAnswer;

        newDiv.appendChild(checkbox);
        newDiv.appendChild(h2_q);
        newDiv.appendChild(h2_a);

        newDiv.addEventListener('click', function (e) {
            if (e.target === checkbox) return;
            h2_a.style.display = h2_a.style.display === "none" ? "block" : "none";
            h2_q.style.display = h2_q.style.display === "none" ? "block" : "none";
        });

        flashcards.appendChild(newDiv);
    });
}

function addCard() {
    const question = document.getElementById("question").value.trim();
    const answer = document.getElementById("answer").value.trim();
    if (!question || !answer) return alert("両方を入力してください。");

    const FlashObject = { myQuestion: question, myAnswer: answer };
    cardArray.push(FlashObject);
    localStorage.setItem('items', JSON.stringify(cardArray));
    displayCards();

    document.getElementById("question").value = '';
    document.getElementById("answer").value = '';
    hideBox();
}

function delCard() {
    if (confirm("すべて削除しますか？")) {
        localStorage.removeItem("items");
        cardArray = [];
        displayCards();
    }
}

function deleteSelected() {
    const selectedCheckboxes = document.querySelectorAll(".select-card:checked");
    if (selectedCheckboxes.length === 0) {
        alert("削除するカードを選択してください。");
        return;
    }
    if (!confirm("選択されたカードを削除しますか？")) return;

    const flashcardElements = document.querySelectorAll(".flashcard");
    selectedCheckboxes.forEach((checkbox) => {
        const cardEl = checkbox.closest(".flashcard");
        const index = Array.from(flashcardElements).indexOf(cardEl);
        cardArray.splice(index, 1);
    });
    localStorage.setItem('items', JSON.stringify(cardArray));
    displayCards();
}

function hideBox() {
    document.querySelector(".create-box").style.display = 'none';
}

function newShown() {
    document.querySelector(".create-box").style.display = 'block';
}

function login() {
    const password = document.getElementById("admin-password").value;
    const adminPassword = "2345"; // Админ нууц үг
    if (password === adminPassword) {
        document.getElementById("admin-login").style.display = "none";
        document.getElementById("main-content").style.display = "block";
        displayCards();
    } else {
        alert("Нууц үг буруу байна。");
    }
}
// Сонгосон картуудыг устгах үйлдэл
document.getElementById("delete-selected").addEventListener("click", () => {
    const selectedCheckboxes = document.querySelectorAll(".select-card:checked");
    if (selectedCheckboxes.length === 0) {
        alert("Устгах карт сонгоогүй байна.");
        return;
    }

    if (confirm("Сонгосон картуудыг үнэхээр устгах уу?")) {
        selectedCheckboxes.forEach((checkbox) => {
            const flashcardElement = checkbox.closest(".flashcard");
            const index = Array.from(document.querySelectorAll(".flashcard")).indexOf(flashcardElement);
            
            // localStorage-с устгах
            let data = JSON.parse(localStorage.getItem("items") || "[]");
            data.splice(index, 1);
            localStorage.setItem("items", JSON.stringify(data));

            // DOM-оос устгах
            flashcardElement.remove();
        });
    }
});
