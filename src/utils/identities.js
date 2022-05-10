import {
  INTELI_DEMO_PERSONA,
  INTELI_CUST_IDENTITY,
  INTELI_AM_IDENTITY,
  INTELI_AMLAB_IDENTITY,
  INTELI_LAB_IDENTITY,
} from './env.js'

// Read identities from env vars instead of hardcoding
const identities = {
  am: INTELI_AM_IDENTITY,
  cust: INTELI_CUST_IDENTITY,
  lab: INTELI_LAB_IDENTITY,
  amlab: INTELI_AMLAB_IDENTITY,
}

identities.current = identities[INTELI_DEMO_PERSONA]

export default identities
