import axios from 'axios'

const GET_QRCODE_URL = 'https://api.vietqr.io/v2/generate'

// x_client_id and x_api_key get from 'https://my.vietqr.io'
const X_CLIENT_ID = '6d5f81cc-8c1e-4695-a826-e3932100f541'
const X_API_KEY = '75e709af-01b5-4eff-ba73-52e23331f017'

const paymentService = {
  generateQrCodePayment: async (payload) => {
    return await axios({
      method: 'POST',
      baseURL: GET_QRCODE_URL,
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': X_CLIENT_ID,
        'x-api-key': X_API_KEY,
      },
      data: payload,
    })
  },
}

export default paymentService
