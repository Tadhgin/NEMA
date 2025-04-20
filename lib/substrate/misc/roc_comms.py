import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

ROC_SERVER = os.getenv('ROC_SERVER')
AUTH_TOKEN = os.getenv('AUTH_TOKEN')

# Standard headers for API requests
HEADERS = {
    'Authorization': f'Bearer {AUTH_TOKEN}',
    'Content-Type': 'application/json'
}

def initialize_comms():
    """Check connectivity to ROC server clearly."""
    try:
        response = requests.get(f'{ROC_SERVER}/ping', headers=HEADERS, timeout=5)
        response.raise_for_status()
        print("ROC Server connection successful.")
        return True
    except requests.exceptions.RequestException as e:
        print(f"ROC Server connection failed: {e}")
        return False

def get_command():
    """Fetch a command from ROC server clearly."""
    try:
        response = requests.get(f'{ROC_SERVER}/get_command', headers=HEADERS, timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Failed to get command: {e}")
        return None

def send_data(data):
    """Send data to ROC server clearly."""
    try:
        response = requests.post(f'{ROC_SERVER}/send_data', json=data, headers=HEADERS, timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Failed to send data: {e}")
        return None

def send_image(image_path):
    """Upload an image file to ROC server clearly."""
    try:
        with open(image_path, 'rb') as image_file:
            files = {'image': image_file}
            headers = {'Authorization': f'Bearer {AUTH_TOKEN}'}
            response = requests.post(f'{ROC_SERVER}/upload_image', files=files, headers=headers, timeout=10)
            response.raise_for_status()
            return response.json()
    except Exception as e:
        print(f"Failed to send image: {e}")
        return None

def send_log(log_message):
    """Send log data clearly to ROC server."""
    data = {'log': log_message}
    return send_data(data)

# Usage clearly demonstrated if run directly
if __name__ == "__main__":
    if initialize_comms():
        print("Ready to communicate clearly.")
    else:
        print("Communication initialization failed.")
