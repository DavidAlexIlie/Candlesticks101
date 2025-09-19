import pytesseract
from PIL import Image

def extract_text(image: Image.Image):
    try:
        text = pytesseract.image_to_string(image)
        return {
            "text": text.strip()
        }
    except Exception as e:
        return {
            "error": str(e)
        }
