interface Beer {
  id: number;
  name: string;
  description: string;
  abv: number;
  image_url: string;
  ibu?: number;
}

function fetchAllBeers(): Promise<Array<Beer>> {
  return fetch("https://api.punkapi.com/v2/beers").then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<Array<Beer>>;
  });
}

export { fetchAllBeers, Beer };
