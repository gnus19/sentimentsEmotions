import requests
import pandas as pd
from django.http import JsonResponse

from rest_framework.decorators import api_view
# Create your views here.

def sentimentQuery(payload):
    response = requests.post(
        "https://api-inference.huggingface.co/models/finiteautomata/beto-sentiment-analysis",
        headers={"Authorization": "Bearer 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"},
        json=payload
    )
    return response.json()

def emotionQuery(payload):
    response = requests.post(
        "https://api-inference.huggingface.co/models/finiteautomata/beto-emotion-analysis",
        headers={"Authorization": "Bearer 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"},
        json=payload
    )
    return response.json()

@api_view(['GET', 'POST'])
def healthy(request):
    if request.method == 'GET':
        data = {
            "Message": "Hello World"
        }
        return JsonResponse(data)
    elif request.method == 'POST':
        df = pd.read_csv('DataRedesSociales.csv', usecols=['text'])
        output = emotionQuery(
            { "inputs": df.iloc[0].values[0] }
        )
        print("[OUTPUT]: ", output)
        data = {
            "data": output
        }
        return JsonResponse(data)

@api_view(['GET'])   
def emotions(request):
    page = request.GET.get('page', 1)
    df = pd.read_csv('DataRedesSociales.csv', usecols=['text'], nrows=5, skiprows=(5*(page-1)))
    output = []
    for x in range(len(df.index)):
        output.append(
            {
                "text": df.iloc[x].values[0],
                "result": emotionQuery(
                    { "inputs": df.iloc[x].values[0] }
                )
            }
        )
    data = {
        "data": output
    }
    return JsonResponse(data) 

@api_view(['GET'])
def sentiments(request):
    page = request.GET.get('page', 1)
    df = pd.read_csv('DataRedesSociales.csv', usecols=['text'], nrows=5, skiprows=(5*(page-1)))
    output = []
    for x in range(len(df.index)):
        output.append(
            {
                "text": df.iloc[x].values[0],
                "result": sentimentQuery(
                    { "inputs": df.iloc[x].values[0] }
                )
            }
        )
    data = {
        "data": output
    }
    return JsonResponse(data) 