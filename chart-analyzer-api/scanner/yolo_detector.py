from scanner.ocr import extract_text
from scanner.utils import dummy_pattern_analysis
import cv2
import numpy as np

def analyze_chart(image_pil):
    img_cv = cv2.cvtColor(np.array(image_pil), cv2.COLOR_RGB2BGR)

    # 🔍 Replace with YOLOv8 inference later
    candles = dummy_pattern_analysis(img_cv)

    # OCR
    ocr_result = extract_text(image_pil)

    return {
        "success": True,
        "candles": candles,
        "ocr": ocr_result,
        "trend": "bullish",
        "confidence": 75,
        "message": "AI analysis complete"
    }
