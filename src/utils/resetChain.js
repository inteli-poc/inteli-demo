import tokenTypes from './tokenTypes'
import Api from './vitalamApi'
import { add } from '../features/tokensSlice'
import { metadataTypes } from './'


const createFormData = (inputs, roles, metadata) => {
  const formData = new FormData()
  const outputs = [
    {
      roles,
      metadata: {
        type: { type: metadataTypes.literal, value: metadata.type },
        name: { type: metadataTypes.literal, value: metadata.name },
      },
      parent_index: 0,
    },
  ]

  formData.set(
    'request',
    JSON.stringify({
      inputs,
      outputs,
    })
  )

  return formData
}

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
