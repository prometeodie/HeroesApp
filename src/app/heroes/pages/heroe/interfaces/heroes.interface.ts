export interface Heroe {
    id?:              string;
    superhero:        string;
    publisher:       string | Publisher;
    alter_ego:        string;
    first_appearance: string;
    characters:       string;
    alt_img?:         string;
    heroe_desc?:      string;
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}
