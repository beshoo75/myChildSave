from os.path import join
from uuid import uuid4

def get_random_profile_photo_name(instance, filename):
    return get_random_file_name(filename, 'user_photo/')

def get_random_student_photo_name(instance, filename):
    return get_random_file_name(filename, 'student_photo/')

def get_random_file_name(filename, path):
    file_extension = filename.split('.')[-1]
    new_filename = f"{uuid4()}.{file_extension}"
    return join(path, new_filename)