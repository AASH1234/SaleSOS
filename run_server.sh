#!/bin/bash
cd backend
/home/autoinstall/myspace/python_projects/saleSOS/senv/bin/python -m uvicorn main:app --reload &
