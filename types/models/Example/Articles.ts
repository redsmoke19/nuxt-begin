export namespace Articles {
  export interface Article {
    id: number
    title: string
    description: string
    content: string
    author_id?: number
    created_at: string
  }

  export interface Author {
    id: number
    name: string
    photo: string
  }

  export interface ArticleWithAuthor extends Omit<Article, 'author_id'> {
    author: Author
  }

  export interface Meta {
    total_items?: number
    total_pages: number
    current_page?: number
    per_page?: number
    remaining_count?: number
  }

  export interface ResponseWithMeta {
    meta: Meta
    items: Article[]
  }

  export type ServerResponse = ResponseWithMeta | Article[]
}
