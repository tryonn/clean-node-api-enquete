import { SurveyModel } from '@/data/usecases/add-account/db-add-account-protocols'

export interface LoadSurveys {
  load: () => Promise<SurveyModel[]>
}
