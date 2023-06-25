import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

export const openNotification = {
  success: (api, description) => {
    api.success({
      message: 'Success',
      description,
      icon: (
        <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#29d15b' }} />
      ),
    })
  },
  error: (api, description) => {
    api.error({
      message: 'Error',
      description,
      icon: (
        <FontAwesomeIcon icon={faCircleXmark} style={{ color: '#ff0000' }} />
      ),
    })
  },
  info: (api, description) => {
    api.error({
      message: 'Info',
      description,
      icon: (
        <FontAwesomeIcon icon={faCircleXmark} style={{ color: '#ff0000' }} />
      ),
    })
  },
}
