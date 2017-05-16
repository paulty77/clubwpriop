import {SUBJECT_UPDATEDPOINT, SUBJECTS_LOADED} from '../action-creators'

export default function subjects (state = [], action) {
  switch (action.type) {
    case SUBJECT_UPDATEDPOINT:
      const updateSubjectAdd = state.find(({id}) => id === action.payload.id)
      updateSubjectAdd.points = action.payload.points
      return state.map((subject) => subject.id === action.payload.id ? updateSubjectAdd : subject)
    case SUBJECTS_LOADED:
      return action.payload.subjects
    default:
      return state
  }
}
