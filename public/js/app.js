console.log("Bienvenue sur Okanban... tout est ok...");

const app = {

    //on initialise notre app
    init: () => {
        app.allLists();
    },

    //permet de récuperer toutes les listes et de générer le DOM
    allLists: async () => {

        try {
            //on recupere toutes les listes via notre api
            const requestLists = await fetch("/api/list");
            const allLists = await requestLists.json();

            //on génére les listes en fonction du retour de notre api
            for (let list of allLists) {

                app.createList(list);

                //on reconstruie le tableau des cards en fonction de la position
                const newTab = list.cards.sort((a, b) => a.order - b.order);

                //on genere les cartes de chaque liste
                for (let card of newTab) {
                    app.createCard(card);
                }
            }
        } catch (err) {
            console.error(err);
        }
    },

    //methode pour supprimer une carte
    deleteCard: async (event) => {

        try {
            const card = event.target;

            const requestDeleteCard = await fetch(`/api/card/${card.id}`, {
                method: "DELETE"
            });

            document.getElementById(`card_${card.id}`).remove();
        } catch (err) {
            console.error(err);
        }
    },

    //methode pour ajouter une carte
    addCard: async (event) => {

        try {
            const listId = event.target.id;

            const newCard = {
                title: "nouvelle carte",
                color: null,
                list_id: listId,
                order: 1
            };

            const requestNewCard = await fetch("/api/card", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(newCard)
            });

            const responseCard = await requestNewCard.json();

            if (responseCard) {

                app.createCard(responseCard);

            } else {
                console.error(`Nous n'avons pas pu créer l'élément demandé...`);
            }
        } catch (err) {
            console.error(err);
        }
    },

    //methode pour créer une liste dans le DOM
    createList: (listData) => {

        const divParent = document.querySelector(".container");

        const newList = document.createElement("div");
        newList.classList.add("container__list");
        newList.setAttribute("id", `list_${listData.id}`);
        divParent.appendChild(newList);
        const titleList = document.createElement("h2");
        titleList.classList.add("title-list");
        titleList.textContent = listData.title;
        newList.appendChild(titleList);

        const newAddCard = document.createElement("button");
        newAddCard.classList.add("close-button");
        newAddCard.setAttribute("id", listData.id);
        newAddCard.textContent = "Ajouter une carte";
        newAddCard.addEventListener("click", app.addCard);
        newList.appendChild(newAddCard);
    },

    //methode pour créer une carte dans le DOM
    createCard: (cardData) => {

        const listElement = document.querySelector(`#list_${cardData.list_id}`);

        const cardElement = document.createElement("div");
        cardElement.classList.add("list__card");
        cardElement.style.backgroundColor = cardData.color;
        cardElement.setAttribute("id", `card_${cardData.id}`);
        listElement.appendChild(cardElement);

        const newTitle = document.createElement("h3");
        newTitle.textContent = cardData.title;
        newTitle.dataset.cardId = cardData.id;
        cardElement.appendChild(newTitle);
        newTitle.addEventListener("click", app.updateTitle);

        //si il y a des tags alors on les affiches
        if (cardData.tags?.length > 0) {

            for (let tag of cardData.tags) {
                const newTag = document.createElement("span");
                newTag.classList.add("card-tag");
                newTag.textContent = tag.title;
                cardElement.appendChild(newTag);
            }
        };

        //on ajoute une croix pour supprimer une cards
        const newCloseButton = document.createElement("button");
        newCloseButton.classList.add("close-button");
        newCloseButton.textContent = "X";
        newCloseButton.setAttribute("id", cardData.id);
        cardElement.appendChild(newCloseButton);
        newCloseButton.addEventListener("click", app.deleteCard);

        //on ajoute un bouton pour la couleur pour supprimer une cards
        const newColorButton = document.createElement("input");
        newColorButton.classList.add("color-button");
        newColorButton.value = cardData.color;
        newColorButton.setAttribute("type", "color");
        newColorButton.dataset.id = cardData.id;
        cardElement.appendChild(newColorButton);
        newColorButton.addEventListener("change", app.updateColor);
    },

    updateTitle: (event) => {

        console.log(event.target.textContent);

        console.log(event.target.dataset.cardId);

        const parent = document.querySelector(`#card_${event.target.dataset.cardId}`);

        const title = event.target;
        const textTitle = event.target.textContent;
        title.remove();
        const inputElement = document.createElement("input");
        inputElement.setAttribute("type", "text");
        inputElement.dataset.type = "title";
        inputElement.dataset.cardId = event.target.dataset.cardId;
        inputElement.setAttribute("value", textTitle);
        parent.appendChild(inputElement);
        inputElement.addEventListener("keyup", app.requestUpdate);
    },

    requestUpdate: async (event) => {

        const columnUpdate = event.target.dataset.type;
        const valueUpdate = event.target.value;
        const cardId = event.target.dataset.cardId;

        if (event.key === "Enter") {

            console.log(cardId);

            const card = document.querySelector(`#card_${cardId}`);

            const obj = {};
            obj[columnUpdate] = valueUpdate;

            const request = await fetch(`/api/card/${cardId}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(obj)
            });

            location.reload();
        } else {
            return;
        }

    },

    updateColor: async (event) => {

        const color = event.target.value;
        const cardId = event.target.dataset.id;

        const obj = {
            color: color
        }

        const request = await fetch(`/api/card/${cardId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(obj)
        });

        

        location.reload();

    },
}

document.addEventListener("DOMContentLoaded", app.init);