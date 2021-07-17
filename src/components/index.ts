import BeerItem from "./beer-item";

enum CustomComponents {
  BEER_ITEM = "beer-item",
}

const CustomComponentsMap: {
  [key in CustomComponents]: CustomElementConstructor;
} = {
  [CustomComponents.BEER_ITEM]: BeerItem,
};

function initCustomComponents() {
  customElements.define(CustomComponents.BEER_ITEM, BeerItem);
}

export { CustomComponents, CustomComponentsMap, initCustomComponents };
