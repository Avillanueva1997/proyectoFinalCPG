export interface RespuestaPosts {
  ok: boolean;
  pagina: number;
  posts: Post[];
}

export interface Post {
  imgs?: string[];
  _id?: string;
  mensaje?: string;
  coords?: string;
  usuario?: Usuario;
  created?: string;
}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
  password?: string;
}

export interface Componente {
  icon: string;
  name: string;
  redirectTo: string;
}

export interface Event {
  created: Date;
  description: string;
  place: string;
  organizador: string;
  cargo: string;
  email: string;
  telf: string;
  fein: Date;
  fefn: Date;
  hrin: Date;
  hrfn: Date;
  lios: boolean;
  caos: number;
  moto: string;
  coto: number;
  caia: string;
  post: Post;
}

export interface Asistente {
  created: Date;
  codigo: string;
  fuente: string;
  name: string;
  appaterno: string;
  apmaterno: string;
  empresa: string;
  cargo: string;
  tipoinvitado: string;
  email: string;
  telefono: string;
  ciudad: string;
  pais: string;
  leadsource: string;
  leadsourced: string;
  productinterest: string;
  leadowner: string;
  post: Post;
  asistio: boolean;
  fasistio: Date;
}


export interface Sala {
    created: Date;
    codigo: string;
    name: string;
    tipo: string;
    aforo: number;
    aforosuperado: number;
    post: Post;
}
