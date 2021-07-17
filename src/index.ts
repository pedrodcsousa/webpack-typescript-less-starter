import {
  CustomComponents,
  CustomComponentsMap,
  initCustomComponents,
} from "./components";
import { fetchAllBeers } from "./services/beer.service";
import "./style.less";

initCustomComponents();

fetchAllBeers().then((beers) => {
  beers.forEach((b) => {
    const beerLiInstance = new CustomComponentsMap[CustomComponents.BEER_ITEM]({
      ...b,
    });
    document.getElementById("beers").appendChild(beerLiInstance);
  });
});
