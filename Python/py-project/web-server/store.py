import requests

def get_razas():
  r = requests.get('https://api.thedogapi.com/v1/breeds')
  if r.status_code == 200:
    return r.json()
  else:
    return []