document.addEventListener("DOMContentLoaded", function() {
  // Add Card Modal
  const addCardModal = document.getElementById("addCardModal");
  const addCardForm = document.getElementById("addCardForm");
  const addCardBtn = document.getElementById("addCardBtn");
  const closeModalButtons = document.querySelectorAll(".close");

  // Card Container
  const cardContainer = document.getElementById("cardContainer");
  const modal = document.getElementById("modal");
  const closeCardModal = document.querySelector("#modal .close");

  // Sample data for cards (you can replace it with your own data)
  const sampleCards = [
    { title: "Card 1", content: "This is card 1" },
    { title: "Card 2", content: "This is card 2" },
    { title: "Card 3", content: "This is card 3" }
  ];

  // Function to create a card element
  function createCard(title, content) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h2>${title}</h2>
      <p>${content}</p>
      <button class="delete-card">Delete</button>
    `;
    return card;
  }

  // Function to display cards
  function displayCards(cards) {
    cardContainer.innerHTML = "";
    cards.forEach(cardData => {
      const newCard = createCard(cardData.title, cardData.content);
      cardContainer.appendChild(newCard);
      newCard.addEventListener("click", () => {
        // Open modal to display card details when clicked
        modal.style.display = "block";
        document.getElementById("cardDetails").innerHTML = `
          <h2>${cardData.title}</h2>
          <p>${cardData.content}</p>
        `;
      });
      newCard.querySelector(".delete-card").addEventListener("click", (event) => {
        event.stopPropagation();
        cardContainer.removeChild(newCard);
      });
    });
  }

  // Event listeners
  addCardBtn.addEventListener("click", () => {
    addCardModal.style.display = "block";
  });

  closeModalButtons.forEach(button => {
    button.addEventListener("click", () => {
      addCardModal.style.display = "none";
      modal.style.display = "none";
    });
  });

  addCardForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const cardTitle = this.querySelector("#cardTitle").value.trim();
    const cardDescription = this.querySelector("#cardDescription").value.trim();
    if (cardTitle && cardDescription) {
      const newCard = createCard(cardTitle, cardDescription);
      cardContainer.appendChild(newCard);
      newCard.addEventListener("click", () => {
        modal.style.display = "block";
        document.getElementById("cardDetails").innerHTML = `
          <h2>${cardTitle}</h2>
          <p>${cardDescription}</p>
        `;
      });
      newCard.querySelector(".delete-card").addEventListener("click", (event) => {
        event.stopPropagation();
        cardContainer.removeChild(newCard);
      });
      addCardModal.style.display = "none";
    } else {
      alert("Please enter both title and description for the card.");
    }
  });

  // Display sample cards on load
  displayCards(sampleCards);

  // Close card modal
  closeCardModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
