import requests
from transformers import pipeline

# Google API setup
GOOGLE_API_KEY = 'AIzaSyDeikX1a42ijLZUnUyjJfuAjAaoWe-VoPk'
PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'
PLACE_DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json'

# Load sentiment analysis model
sentiment_pipeline = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")

def get_place_id(restaurant_name, location="Cochabamba, Bolivia"):
    params = {
        'input': f"{restaurant_name}, {location}",
        'inputtype': 'textquery',
        'fields': 'place_id,formatted_address',
        'key': GOOGLE_API_KEY
    }
    response = requests.get(PLACES_SEARCH_URL, params=params).json()
    candidates = response.get('candidates', [])
    if not candidates:
        return None, None
    return candidates[0]['place_id'], candidates[0].get('formatted_address', 'Dirección no encontrada')

def get_reviews(place_id):
    params = {
        'place_id': place_id,
        'fields': 'reviews',
        'key': GOOGLE_API_KEY
    }
    response = requests.get(PLACE_DETAILS_URL, params=params).json()
    reviews_raw = response.get("result", {}).get("reviews", [])
    
    reviews = []
    for r in reviews_raw:
        if r.get("text"):
            reviews.append({
                "text": r["text"],
                "author_name": r.get("author_name", "Anónimo"),
                "rating": r.get("rating", None),
                "relative_time_description": r.get("relative_time_description", "")
            })
    return reviews

def analyze_reviews(reviews, max_per_category=3):
    results = []
    for review in reviews:
        text = review["text"]
        if not text.strip():
            continue
        prediction = sentiment_pipeline(text[:512])[0]
        label = prediction["label"]
        score = prediction["score"]

        if "1 star" in label or "2 stars" in label:
            sentiment = "negativo"
        elif "3 stars" in label:
            sentiment = "neutral"
        else:
            sentiment = "positivo"

        results.append({
            "text": text,
            "author_name": review.get("author_name", "Anónimo"),
            "rating": review.get("rating", None),
            "relative_time_description": review.get("relative_time_description", ""),
            "sentiment": sentiment,
            "confidence": score
        })

    sentiment_counts = {"positivo": 0, "neutral": 0, "negativo": 0}
    for r in results:
        sentiment_counts[r["sentiment"]] += 1

    summary = (
        f"{len(results)} reviews analizados: "
        f"{sentiment_counts['positivo']} positivos, "
        f"{sentiment_counts['neutral']} neutrales, "
        f"{sentiment_counts['negativo']} negativos."
    )

    sorted_reviews = lambda s: sorted(
        [r for r in results if r["sentiment"] == s],
        key=lambda r: -r["confidence"]
    )[:max_per_category]

    return sorted_reviews("positivo"), sorted_reviews("neutral"), sorted_reviews("negativo"), summary

def run_analysis(restaurant_name):
    place_id, address = get_place_id(restaurant_name)
    if not place_id:
        return {"error": "No se encontro el restaurante."}

    reviews = get_reviews(place_id)
    if not reviews:
        return {"error": "No hay feedback disponibles."}

    positives, neutrals, negatives, summary = analyze_reviews(reviews)

    return {
        "address": address,
        "summary": summary,
        "positives": positives,
        "neutrals": neutrals,
        "negatives": negatives,
    }
