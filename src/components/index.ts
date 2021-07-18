import BeerItem from "./beer-item";
import BeerModal from "./beer-modal";

enum CustomComponents {
  BEER_ITEM = "beer-item",
  BEER_MODAL = "beer-modal",
}

const CustomComponentsMap: {
  [key in CustomComponents]: CustomElementConstructor;
} = {
  [CustomComponents.BEER_ITEM]: BeerItem,
  [CustomComponents.BEER_MODAL]: BeerModal,
};

function initCustomComponents() {
  customElements.define(CustomComponents.BEER_ITEM, BeerItem);
  customElements.define(CustomComponents.BEER_MODAL, BeerModal);
}

export { CustomComponents, CustomComponentsMap, initCustomComponents };
