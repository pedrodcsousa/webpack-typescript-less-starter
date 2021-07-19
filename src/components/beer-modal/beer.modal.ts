import "./beer.modal.less";

const MODAL_CONTENT_ID = ".beer-modal__content";

class BeerModal extends HTMLElement {
  constructor() {
    super();

    // Fetch beerModal template
    const beerModalTemplate: HTMLTemplateElement = document.getElementById(
      "beer-modal-template"
    ) as HTMLTemplateElement;

    // Clone and append it
    const beerModalClone = document.importNode(beerModalTemplate.content, true);
    this.appendChild(beerModalClone);
  }

  connectedCallback() {
    // Add escape key callback
    document.addEventListener("keyup", this._escapeWasPressed);

    // Add close button callback
    (
      this.getElementsByClassName(
        "beer-modal__content__close"
      )[0] as HTMLButtonElement
    ).addEventListener("mouseup", this._closeButtonPressed);

    // Lock page scroll
    document.body.style.overflow = "hidden";

    // Populate beer info
    this._populateBeerInfo();

    // Build orders dropdown
    this._buildDropdown();
  }

  disconnectedCallback() {
    // Remove escape key callback
    document.removeEventListener("keyup", this._escapeWasPressed);

    // Unlock page scroll
    document.body.style.overflow = "auto";
  }

  _closeButtonPressed = () => {
    this._removeModal();
  };

  _removeModal() {
    this.remove();
  }

  _escapeWasPressed = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      this._removeModal();
    }
  };

  _populateBeerInfo() {
    // Content into a variable for easier readibility
    const beerModalContent = this.querySelector(MODAL_CONTENT_ID);

    beerModalContent.querySelector(`${MODAL_CONTENT_ID}__name`).innerHTML =
      this.getAttribute("name");

    beerModalContent.querySelector(
      `${MODAL_CONTENT_ID}__description`
    ).innerHTML = this.getAttribute("description");

    // Populate badge info
    const badgePtr = beerModalContent.querySelector(
      `${MODAL_CONTENT_ID}__badge`
    );

    if (this.getAttribute("ibu")) {
      badgePtr.getElementsByClassName(
        "badge_ibu"
      )[0].innerHTML = `IBU ${this.getAttribute("ibu")}`;
    }

    badgePtr.getElementsByClassName(
      "badge_abv"
    )[0].innerHTML = `${this.getAttribute("abv")} %`;

    (
      badgePtr.getElementsByClassName("badge_img")[0] as SVGImageElement
    ).setAttribute("href", this.getAttribute("image_url"));
    (
      badgePtr.getElementsByClassName("badge_img")[0] as SVGImageElement
    ).setAttribute("alt", this.getAttribute("name"));
  }

  _buildDropdown() {
    const quantityListTemplate: HTMLTemplateElement = document.getElementById(
      "beer-order-quantity"
    ) as HTMLTemplateElement;

    const beerModalContent: HTMLElement = this.querySelector(MODAL_CONTENT_ID);

    const beerOrderContainer = beerModalContent.querySelector(
      `${MODAL_CONTENT_ID}__order`
    );

    const beerOrderListClass = "beer-modal__content__order__list";
    const itemsList =
      beerOrderContainer.getElementsByClassName(beerOrderListClass)[0];

    // Add event listeners
    // When the mouse enters (or it is touched):
    // - add '--visible' class
    // - add an eventListener to each item so that:
    // --- quantityDropdown appears when mouse enters
    // --- quantityDropdown disappears when mouse leaves
    beerOrderContainer.addEventListener("mouseenter", () => {
      itemsList.classList.add(`${beerOrderListClass}--visible`);
      Array.from(
        itemsList.getElementsByClassName(`${beerOrderListClass}__item`)
      ).forEach((li) => {
        li.addEventListener("mouseenter", () => {
          const quantityListClone = document.importNode(
            quantityListTemplate.content,
            true
          );
          li.appendChild(quantityListClone);
        });
        li.addEventListener("mouseleave", () => {
          while (li.childNodes.length > 1) li.removeChild(li.lastChild);
        });
      });
    });

    // Remove '--visible' class when mouse leaves
    beerOrderContainer.addEventListener("mouseleave", () => {
      itemsList.classList.remove(`${beerOrderListClass}--visible`);
    });
  }
}

export { BeerModal };
