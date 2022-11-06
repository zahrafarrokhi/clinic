import datetime

import requests

from backend.settings import PAYMENT_SETTINGS
from payment.models import Payment


class BasePaymentService:
    settings = PAYMENT_SETTINGS['AP']
    @classmethod
    def create_payment(cls, user, amount, description=""):
        payment = Payment(user=user, amount=amount, description=description)
        payment.save()
        try:
            response = requests.post(cls.settings['urls']['get_token'],
                                     #json=>body
                                     json={
                                         "merchantConfigurationId": cls.settings['MERCHANT_ID'],
                                         "callbackUrl": f"http://localhost:3000/payment/{payment.id}/",
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
                                    # json
                                     json={
                                         "merchantConfigurationId": cls.settings['MERCHANT_ID'],
                                         "localInvoiceId": payment.id,
                                         # "refId": payment.ref_id,
                                         # "RefId": payment.ref_id,
                                     },
                                     headers={
                                         "usr":cls.settings['USERNAME'],
                                         "pwd":cls.settings['PASSWORD'],
                                         "Content-Type": "application/json",
                                     }
                                     )

            resp = response.json()
            print(resp, response.status_code)
            if response.status_code == 200:
                payment.card_number = resp['cardNumber']
                payment.rrn = resp['rrn']
                # status = resp['serviceStatusCode']
                payGateTranId = resp['payGateTranID']
                if cls.verify(payment, payGateTranId).status_code == 200:
                    payment.status = payment.Status.successful
                payment.save()
            else:
                payment.status = payment.Status.failed
                payment.save()

        except Exception as e:
            print(e)
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
        print("Verified", response, response.status_code)
        return response

class ApPaymentService(BasePaymentService):
    settings = PAYMENT_SETTINGS['AP']
# class ZarinpalPaymentService(BasePaymentService):
#     settings = PAYMENT_SETTINGS['Zarinpal']
