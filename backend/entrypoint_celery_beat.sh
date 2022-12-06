#!/bin/sh

celery -A backend beat -l info -S django