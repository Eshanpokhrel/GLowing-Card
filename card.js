console.clear();

// Selects the element with the class of "cards"
const cardsContainer = document.querySelector(".cards");

// Selects the element with the class of "cards__inner"
const cardsContainerInner = document.querySelector(".cards__inner");

// Selects all elements with the class of "card" and converts the NodeList into an array
const cards = Array.from(document.querySelectorAll(".card"));

// Selects the element with the class of "overlay"
const overlay = document.querySelector(".overlay");

// This function sets the style properties of the overlay element based on the pageX and pageY coordinates of the event
const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;

   // The horizontal distance of the event from the left edge of the cardsContainer element
  const x = e.pageX - cardsContainer.offsetLeft;

   // The vertical distance of the event from the top edge of the cardsContainer element
  const y = e.pageY - cardsContainer.offsetTop;

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

// This function creates a new "cta" element and appends it to the specified overlayCard element
const createOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCta.classList.add("cta");
  overlayCta.textContent = ctaEl.textContent;
  overlayCta.setAttribute("aria-hidden", true);
  overlayCard.append(overlayCta);
};

// This ResizeObserver object observes changes to the border-box size of the target element and updates the width and height of the corresponding overlay element
const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  createOverlayCta(overlayCard, cardEl.lastElementChild);
  overlay.append(overlayCard);
  observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);
