import { fetchAllBeers } from "./services/beer.service";
import {
  CustomComponents,
  CustomComponentsMap,
  initCustomComponents,
} from "./components";
import "./style.less";

// Register every Custom Component
initCustomComponents();

// Fetch beers from API and list them
fetchAllBeers().then((beers) => {
  beers.forEach((b) => {
    const beerLiInstance = new CustomComponentsMap[CustomComponents.BEER_ITEM]({
      ...b,
    });
    document.getElementById("beers").appendChild(beerLiInstance);
  });
});
