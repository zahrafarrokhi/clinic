#!/bin/sh


python3 manage.py runserver
# or
# gunicorn backend:wsgi -w 4