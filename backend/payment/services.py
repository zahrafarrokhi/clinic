import requests

from backend.settings import PAYMENT_SETTINGS
from payment.models import Payment


class BasePaymentService:
    settings = PAYMENT_SETTINGS['AP']
    @classmethod
    def create_payment(cls, user,amount):
        payment = Payment(user=user,amount=amount)
        payment.save()
        try:
            response = requests.post(cls.settings['urls']['get_token'],
                                     data={
                                         "merchantConfigurationId": cls.settings['MERCHANT_ID'],
                                         "callbackUrl": f"http://localhost:8000/api/payment/verify/{payment.id}/",
                                         "amountInRials": amount,
                                     },
                                     headers={
                                         "usr":cls.settings['USERNAME'],
                                         "pwd":cls.settings['PASSWORD'],
                                     }
                                     )

            payment.ref_id = response.text
        except:
            pass
        payment.save()
        return payment



class ApPaymentService(BasePaymentService):
    settings = PAYMENT_SETTINGS['AP']
# class ZarinpalPaymentService(BasePaymentService):
#     settings = PAYMENT_SETTINGS['Zarinpal']
