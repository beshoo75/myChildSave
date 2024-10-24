import face_recognition
import cv2
import numpy as np
import os
import pickle
import logging

logger = logging.getLogger(__name__)


class FaceDetector:
    ROTATION_ANGLES = range(0, 360, 90)

    def __init__(self, photos_path: str):
        self.PHOTOS_PATH = photos_path
        self.model_file_name = "./face_model.pkl"
        self.face_samples = []
        self.ids = []
        self.load_model()

    def rotate_image(self, image: np.ndarray, angle: float) -> np.ndarray:
        """Rotate the image by the given angle."""
        h, w = image.shape[:2]
        center = (w // 2, h // 2)
        matrix = cv2.getRotationMatrix2D(center, angle, 1.0)
        return cv2.warpAffine(image, matrix, (w, h))

    def load_model(self):
        """Loads the known face encodings and names from a file."""
        try:
            with open(self.model_file_name, "rb") as f:
                self.face_samples, self.ids = pickle.load(f)
        except (FileNotFoundError, EOFError) as e:
            logger.warning(f"Model file not found or empty. Error: {e}")
            self.save_model()

    def train_model(self, new_id: int, new_img_path: str):
        """
        Trains the model with a new image.
        The image should be located in the specified photos directory.
        """
        # Check if the ID exists and remove old photo features if found
        try:
            index = self.ids.index(new_id)
            del self.ids[index]  # Remove old ID
            del self.face_samples[index]  # Remove corresponding face sample
            logger.info(f"Removed old features for ID {new_id}.")
        except ValueError:
            logger.info(f"No existing features for ID {new_id} to remove.")

        image_path = os.path.join(self.PHOTOS_PATH, new_img_path)

        # Check if the image file exists
        if not os.path.isfile(image_path):
            logger.error(f"Image file not found: {image_path}")
            return

        try:
            image = face_recognition.load_image_file(image_path)
            found_face = False

            for angle in self.ROTATION_ANGLES:
                rotated_image = self.rotate_image(image, angle)
                face_encodings = face_recognition.face_encodings(rotated_image)

                if face_encodings:
                    self.face_samples.append(face_encodings[0])
                    self.ids.append(new_id)
                    found_face = True
                    logger.info(f"Found face for ID {new_id} at {angle} degrees.")
                    break

            if not found_face:
                logger.warning(f"No faces found in image for ID {new_id}.")
            
            self.save_model()
        except Exception as e:
            logger.error(f"Error processing {new_id}: {e}")

    def save_model(self):
        """Saves the known face encodings and names to a file."""
        with open(self.model_file_name, "wb") as f:
            pickle.dump((self.face_samples, self.ids), f)

    def check_face(self, img) -> str:
        """Check the input image for faces and predict their IDs."""
        # self.load_model()
        image_data = img.read()
        img_arr = np.frombuffer(image_data, np.uint8)
        cv_img = cv2.imdecode(img_arr, cv2.IMREAD_COLOR)

        if cv_img is None:
            logger.error("Unable to load image.")
            return None

        rgb_image = cv2.cvtColor(cv_img, cv2.COLOR_BGR2RGB)

        for angle in self.ROTATION_ANGLES:
            rotated_image = self.rotate_image(rgb_image, angle)
            face_encodings = face_recognition.face_encodings(rotated_image)

            if face_encodings:
                matches = face_recognition.compare_faces(
                    self.face_samples, face_encodings[0]
                )
                face_distances = face_recognition.face_distance(
                    self.face_samples, face_encodings[0]
                )

                if matches:
                    best_match_index = np.argmin(face_distances)

                    if matches[best_match_index]:
                        student_id = self.ids[best_match_index]
                        best_match_distance = face_distances[best_match_index]
                        logger.info(
                            f"The image is for: {student_id} with a distance of {best_match_distance:.2f}"
                        )
                        return student_id

        logger.warning("No faces found in the image after rotating.")
        return None
