export function objectToFormData(
    obj,
    formData = new FormData(),
    parentKey = ""
) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const formKey = parentKey ? `${parentKey}[${key}]` : key;

            if (value instanceof File) {
                // If value is a File, append directly
                formData.append(formKey, value);
            } else if (Array.isArray(value)) {
                // If value is an array, append each item
                value.forEach((item) => {
                    formData.append(formKey, item);
                });
            } else if (value && typeof value === "object") {
                // If value is an object, recursively call the function
                objectToFormData(value, formData, formKey);
            } else if (typeof value === "number") {
                // Otherwise, cast to string and append
                formData.append(formKey, parseInt(value));
            } else if (typeof value === "boolean") {
                // Otherwise, cast to string and append
                formData.append(formKey, value === true ? true : false);
            } else {
                formData.append(formKey, value);
            }
        }
    }
    return formData;
}

export const photoFileToDataURL = (photo, event) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        event(reader.result);
    };
    reader.readAsDataURL(photo);
};

export const httpToHttps = (url) => {
    // Ensure url is a string
    let tempURL = String(url);

    // Check if the URL includes "https://"
    if (tempURL.includes("https://")) {
        return tempURL;
    }
    // Check if the URL includes "http://"
    else if (tempURL.includes("http://")) {
        return tempURL.replace("http://", "https://");
    }
    // If neither, prepend "https://"
    else {
        return "https://" + tempURL;
    }
};
