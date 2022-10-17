import requests

from backend.settings import PAYMENT_SETTINGS
from payment.models import Payment


class BasePaymentService:
    settings = PAYMENT_SETTINGS['AP']
    @classmethod
    def create_payment(cls, user,amount):
        payment = Payment(user=user,amount=amount)
        try:
            response = requests.post(cls.settings['urls']['token'],
                                     data={"merchantConfigurationId": cls.settings['MERCHANT_ID']},
                                     headers={"usr":cls.settings['USERNAME'],"pwd":cls.settings['PASSWORD']}
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
