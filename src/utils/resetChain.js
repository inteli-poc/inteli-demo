import tokenTypes from './tokenTypes'
import Api from './vitalamApi'
import { add } from '../features/tokensSlice'

const createRefToken = async (name, dispatch) => {
  const roles = { Owner: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty' } // TODO get correct owner
  const metadata = {
    type: tokenTypes.reference,
    name: name,
  }

  const formData = createFormData([], roles, metadata)
  const response = await Api().runProcess(formData)
  const token = {
    id: response[0],
    roles,
    metadata,
  }

  dispatch(add(token))
}

export default createRefToken