// Component Imports
import ResetPassword from '@views/Reset'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const ResetPasswordPage = () => {
  // Vars
  const mode = getServerMode()

  return <ResetPassword mode={mode} />
}

export default ResetPasswordPage
