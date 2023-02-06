export interface Usuario{
  mail: string,
  password: string
}

export interface RespLogin{
  header: {
    message: string,
    resultCode: number
  },
  data: {
    user: {
      id: string,
      mail: string,
      name: string
    }
  }
}

export interface ResponseRegistro{
  header: {
    message: string,
    resultCode:number
  }
}

export interface NuevoUsuario{
  name: string,
  mail: string,
  password: string
}
