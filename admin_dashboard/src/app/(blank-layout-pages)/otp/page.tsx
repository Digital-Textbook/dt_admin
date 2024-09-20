// Component Imports
import Otp from '@views/Otp'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const OtpPage = () => {
  // Vars
  const mode = getServerMode()

  return <Otp mode={mode} />
}

export default OtpPage
