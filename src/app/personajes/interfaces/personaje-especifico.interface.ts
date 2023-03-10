export interface PersonajeEspecifico {
    id:       number;
    name:     string;
    status:   string;
    species:  string;
    type:     string;
    gender:   string;
    origin:   Location;
    location: Location;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
}

export interface Location {
    name: string;
    url:  string;
}


export interface CharacterEpisodes {
    id:         number;
    name:       string;
    air_date:   string;
    episode:    string;
    characters: string[];
    url:        string;
    created:    Date;
}


//creo una interface para guardar id y nombre de los
//episodios del perosnaje especifico
export interface NameIdEpisode{
  id: number;
  name: string;
}
