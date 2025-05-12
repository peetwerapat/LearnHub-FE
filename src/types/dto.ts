export interface IResponseData<T> {
  message: {
    en: string;
    th: string;
  }
  data: T
}

export interface LoginDTO {
  email: string
  password: string
}

export interface ICreateUserDto {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface CredentialDTO {
  accessToken: string
}

export interface ContentDTO {
  id: number
  videoTitle: string
  videoUrl: string
  comment: string
  rating: number
  thumbnailUrl: string
  creatorName: string
  creatorUrl: string
  postedBy: string
  createdAt: string
  updatedAt: string
}

export interface ErrorDTO {
  statusCode: number
  message: string
  error: string
}

export interface CreateContentDTO {
  videoUrl: string
  comment: string
  rating: number
}

export interface UpdateContentDTO {
  comment: string
  rating: number
}
