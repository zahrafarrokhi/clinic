import datetime

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
                                     #json=>body
                                     json={
                                         "merchantConfigurationId": cls.settings['MERCHANT_ID'],
                                         "callbackUrl": f"http://localhost:8000/api/payment/verify/{payment.id}/",
                                         "amountInRials": amount,
                                         "serviceTypeId": 1,
                                         "localInvoiceId": payment.id,
                                         "paymentId": payment.id,
                                         # "additionalInfo": {
                                         #     "mobile": user.phone_number,
                                         #     "email": user.email,
                                         # },
                                         "localDate": datetime.datetime.now().strftime('%Y%m%d %H%M%S')
                                     },
                                     headers={
                                         "usr":cls.settings['USERNAME'],
                                         "pwd":cls.settings['PASSWORD'],
                                         "Content-Type": "application/json",
                                     }
                                     )
            print(response.text)

            payment.ref_id = response.text
        except:
            pass
        payment.save()
        return payment

    @classmethod
    def get_result(cls,payment):
        try:
            response = requests.get(cls.settings['urls']['get_result'],
                                    # data => queryparams
                                     data={
                                         "merchantConfigurationId": cls.settings['MERCHANT_ID'],
                                         "localInvoiceId": payment.id,
                                     },
                                     headers={
                                         "usr":cls.settings['USERNAME'],
                                         "pwd":cls.settings['PASSWORD'],
                                         "Content-Type": "application/json",
                                     }
                                     )

            resp = response.json()
            payment.card_number = resp['card_number']
            payment.rnn = resp['rnn']
            status = resp['serviceStatusCode']
            payGateTranId = resp['payGateTranId']
            if status == 0:
                payment.status = payment.Status.successful
                cls.verify(payment, payGateTranId)
                payment.save()
            elif status == 2:
                return
            else:
                payment.status = payment.Status.failed
                payment.save()

        except:
            pass
        return
    @classmethod
    def verify(cls, payment, payGateTranId):
        response = requests.post(cls.settings['urls']['verify'],
                                json={
                                    "merchantConfigurationId": cls.settings['MERCHANT_ID'],
                                    "payGateTranId": payGateTranId,
                                },
                                headers={
                                    "usr": cls.settings['USERNAME'],
                                    "pwd": cls.settings['PASSWORD'],
                                    "Content-Type": "application/json",
                                }
                                )

class ApPaymentService(BasePaymentService):
    settings = PAYMENT_SETTINGS['AP']
# class ZarinpalPaymentService(BasePaymentService):
#     settings = PAYMENT_SETTINGS['Zarinpal']
