import pyautogui
from io import BytesIO
import base64


# get a screencap
def get_screencap():
    sc = pyautogui.screenshot()

    buffered = BytesIO()
    sc.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())
    # img_base64 = bytes("data:image/jpeg;base64,", encoding='utf-8') + img_str

    return img_str
