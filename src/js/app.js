const addArr = document.querySelectorAll(".add")

function showInput(elem) {
    elem.classList.add("invisible")
    const parent = elem.closest(".column");
    // const cards = parent.querySelector(".cards")
    const form = document.createElement("form");

    form.classList.add("form");
    
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Что нужно сделать?";
    input.classList.add("input");

    const button = document.createElement("button");
    button.type = "submit";
    button.classList.add("button");
    button.textContent = "Добавить";

    form.appendChild(input);
    form.appendChild(button);
    parent.insertBefore(form, elem)
    // cards.appendChild(form);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addCard(form);
        form.remove()
        elem.classList.remove("invisible")
    });
}

function addCard (elem) {
    const currentInput = elem.querySelector(".input");
    const parent = elem.closest(".column")
    const cards = parent.querySelector(".cards");

    const card = document.createElement("li");
    card.classList.add("card");

    const cardText = document.createElement("div");
    cardText.classList.add("card-text");
    cardText.textContent = currentInput.value;
    card.appendChild(cardText)    
    
    cards.appendChild(card)

    card.addEventListener("mouseenter", () => {
        const cardCross = document.createElement("div");
        cardCross.classList.add("card-cross");
        cardCross.textContent = "×"
        card.appendChild(cardCross)
        cardCross.addEventListener("click", () => {
            card.remove();
        })

        card.addEventListener("mouseleave", () => {
            cardCross.remove()
        })
    })
}

addArr.forEach(el => el.addEventListener("click", () => {
    showInput(el);
}))

const lists = document.querySelectorAll('.cards');

const cards = []; 
lists.forEach(list => {
    const cardNodes = list.querySelectorAll('.card');
    cardNodes.forEach(cardNode => cards.push(cardNode));
});

let actualElement;

const onMouseOver = (e) => {
    actualElement.style.top = `${e.pageY - actualElement.offsetHeight/2}px`;
    actualElement.style.left = `${e.pageX - actualElement.offsetWidth/2}px`;
};

const onMouseUp = (e) => {
    const mouseUpItem = e.target;
    const closestColumn = mouseUpItem.closest('.column')
    const closestCard = mouseUpItem.closest('.card');
    const closestCards = closestColumn.querySelector('.cards');

    if (closestColumn) {
        actualElement.classList.remove('dragged');
        if (closestCard && closestCard !== actualElement) {
            closestCards.insertBefore(actualElement, closestCard);
        } else {
            closestCards.appendChild(actualElement);
        }
    } else {
        actualElement.classList.remove('dragged');
        return
    }

    actualElement = undefined;

    document.documentElement.removeEventListener('mouseup', onMouseUp);
    document.documentElement.removeEventListener('mouseover', onMouseOver);
};

lists.forEach(list => list.addEventListener('mousedown', (e) => {
    const target = e.target;

    if (!target.classList.contains('card')) return;

    e.preventDefault();

    actualElement = target;
    actualElement.classList.add('dragged');

    document.documentElement.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseover', onMouseOver);
}));