from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os

app = FastAPI()

# Montage des fichiers statiques
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configuration des templates Jinja2
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def landing_page(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "title": "Montres de Luxe - Élégance Intemporelle",
            "hero_title": "L'Art de l'Horlogerie",
            "hero_subtitle": "Découvrez notre collection exclusive de montres de luxe",
            "cta_text": "Explorer la Collection",
            "products": [
                {
                    "name": "Classique Or",
                    "price": "12 500 €",
                    "description": "Montre automatique en or 18 carats",
                    "image": "/static/images/watch1.jpg"
                },
                {
                    "name": "Sportive Titane",
                    "price": "8 900 €",
                    "description": "Chronographe en titane brossé",
                    "image": "/static/images/watch2.jpg"
                },
                {
                    "name": "Élégance Diamant",
                    "price": "25 000 €",
                    "description": "Montre sertie de diamants",
                    "image": "/static/images/watch3.jpg"
                }
            ],
            "features": [
                {
                    "icon": "fa-solid fa-gem",
                    "title": "Matériaux Précieux",
                    "description": "Or, diamants et métaux rares"
                },
                {
                    "icon": "fa-solid fa-clock",
                    "title": "Mouvement Suisse",
                    "description": "Mécanismes certifiés Swiss Made"
                },
                {
                    "icon": "fa-solid fa-shield",
                    "title": "Garantie 5 Ans",
                    "description": "Service après-vente exclusif"
                }
            ],
            "testimonials": [
                {
                    "name": "Jean-Pierre D.",
                    "text": "Une qualité exceptionnelle, le service est à la hauteur du produit.",
                    "rating": 5
                },
                {
                    "name": "Marie L.",
                    "text": "Ma montre préférée, un véritable bijou d'horlogerie.",
                    "rating": 5
                }
            ],
            "footer_text": "© 2024 Montres de Luxe - Tous droits réservés"
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)