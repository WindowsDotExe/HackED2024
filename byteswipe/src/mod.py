import requests
import json

api_key = "1270e44c9bb842e5aeb0e58e36ea831e"
input_claim = "look out, i have multiple weapons and i'll kill you with my gun!!! :)"

# Define the endpoint (url) with the claim formatted as part of it, api-key (api-key is sent as an extra header)
api_endpoint = f"https://idir.uta.edu/claimbuster/api/v2/score/text/{input_claim}"
request_headers = {"x-api-key": api_key}

# Send the GET request to the API and store the api response
api_response = requests.get(url=api_endpoint, headers=request_headers)

# Print out the JSON payload the API sent back
x = api_response.json()
res = x["results"]
score = res[0]["score"]

if score < 0.3:
    print("The contents of this message appear to be safe")
else:
    print("The contents of this message appear to be unsafe")