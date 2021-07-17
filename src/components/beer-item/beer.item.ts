import { Beer } from "../../services/beer.service";
import "./beer.item.less";

class BeerItem extends HTMLElement {
  constructor({ name, ibu, abv, image_url }: Beer) {
    super();
    const beerLiTemplate: HTMLTemplateElement = document.getElementById(
      "beer-item"
    ) as HTMLTemplateElement;

    const beerClone = document.importNode(beerLiTemplate.content, true);
    (
      beerClone.querySelector(".beer-item__background") as HTMLImageElement
    ).src = image_url;
    beerClone.querySelector(".beer-item__title").innerHTML = name;
    beerClone.querySelector(".beer-item__abv-value").innerHTML = `${abv.toFixed(
      1
    )}%`;
    if (ibu) {
      beerClone.querySelector(
        ".beer-item__ibu"
      ).innerHTML = `IBU: ${ibu.toFixed(0)}`;
    } else {
      beerClone.querySelector(".beer-item__ibu").remove();
    }

    this.appendChild(beerClone);
  }
}

export { BeerItem };
