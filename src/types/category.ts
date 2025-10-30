// types/category.ts
export interface SpecificationField {
  fieldName: string
  label: string
  type: 'text' | 'number' | 'select' | 'multiselect'
  required: boolean
  options?: string[]
  min?: number
  max?: number
  unit?: string
}

export interface FilterField {
  fieldName: string
  label: string
  type: 'checkbox' | 'range'
  required: boolean
  min?: number
  max?: number
}

export interface CategoryConfig {
  id: string
  name: string
  slug: string
  subcategories?: string[]  // Made optional
  specifications: SpecificationField[]
  filters: FilterField[]
}