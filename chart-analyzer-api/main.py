from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from scanner.yolo_detector import analyze_chart
from PIL import Image
from io import BytesIO

app = FastAPI()

# Allow requests from your mobile app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with mobile app origin for production
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/analyze/")
async def analyze(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    result = analyze_chart(image)
    return result