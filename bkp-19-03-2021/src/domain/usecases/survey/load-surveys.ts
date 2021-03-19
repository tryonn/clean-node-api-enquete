import { SurveyModel } from '@/data/usecases/account/add-account/db-add-account-protocols'

export interface LoadSurveys {
  load: () => Promise<SurveyModel[]>
}
