import { CustomComponents, CustomComponentsMap } from "..";
import { Beer } from "../../services/beer.service";
import "./beer.item.less";

class BeerItem extends HTMLElement {
  beerInfo: Beer | undefined;

  constructor(beerInfo: Beer) {
    super();
    this.beerInfo = beerInfo;

    const { name, abv, ibu, image_url } = beerInfo;

    // Fetch beerLI template
    const beerLiTemplate: HTMLTemplateElement = document.getElementById(
      "beer-item-template"
    ) as HTMLTemplateElement;

    // Clone it
    const beerClone = document.importNode(beerLiTemplate.content, true);

    // Set background image
    (
      beerClone.querySelector(".beer-item__background") as HTMLImageElement
    ).src = image_url;
    (
      beerClone.querySelector(".beer-item__background") as HTMLImageElement
    ).alt = name;

    // Set beer name
    beerClone.querySelector(".beer-item__name").innerHTML = name;

    // Set ABV (toFixed(1) because of the examples)
    beerClone.querySelector(".beer-item__abv-value").innerHTML = `${abv.toFixed(
      1
    )}%`;

    // Set IBU
    // Remove IBU if it does not exist
    if (ibu) {
      beerClone.querySelector(
        ".beer-item__ibu"
      ).innerHTML = `IBU: ${ibu.toFixed(0)}`;

      // Add background color class
      beerClone.firstElementChild.classList.add(
        `bg${ibu.toString().charAt(0)}`
      );
    } else {
      // Remove IBU tag if it does not exist
      beerClone.querySelector(".beer-item__ibu").remove();
    }

    // Append the element
    this.appendChild(beerClone);
  }

  connectedCallback() {
    // Add event Listener
    this.addEventListener("click", () => {
      this.openModal();
    });
  }

  openModal() {
    // Set all attributes and open a modal
    const beerModal = new CustomComponentsMap[CustomComponents.BEER_MODAL]();
    beerModal.setAttribute("name", this.beerInfo.name);
    beerModal.setAttribute("description", this.beerInfo.description);
    if (this.beerInfo.ibu)
      beerModal.setAttribute("ibu", this.beerInfo.ibu.toFixed(0));
    beerModal.setAttribute("abv", this.beerInfo.abv.toFixed(1));
    beerModal.setAttribute("image_url", this.beerInfo.image_url);

    document.body.insertAdjacentElement("afterend", beerModal);
  }
}

export { BeerItem };
