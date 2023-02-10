export interface SpecificEpisodesResponse { //para datos generales del episodio especifico
    id:         number;
    name:       string;
    air_date:   string;
    episode:    string;
    characters: string[];
    url:        string;
    created:    Date;
}


export interface EpisodeCharacters { //para personajes en el episodio
    id:       number;
    name:     string;
    type:     string;
    origin:   Location;
    location: Location;
    image:    string;
    url:      string;
    created:  Date;
}


//creo una interface para guardar id y nombre de los
//perosnjaes del episodio especifico
export interface NameIdCharacter{
  id: number;
  name: string;
}
