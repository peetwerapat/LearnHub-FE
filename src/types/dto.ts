export interface LoginDTO {
  username: string
  password: string
}

export interface ICreateUserDto {
  name: string
  username: string
  password: string
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
  postedBy: { id: number; username: string; name: string; registeredAt: string }
  createdAt: string
  updatedAt: string
}

export type ContentsDTO = ContentDTO[]

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
