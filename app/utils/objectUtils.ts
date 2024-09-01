import {ImageSourcePropType} from 'react-native';

export function convertObjectToFormData(
  object: Record<string, any>,
  properties?: string[],
): FormData {
  const formData = new FormData();
  if (!properties || properties.length === 0) {
    for (const key of Object.keys(object)) {
      formData.append(key, object[key]);
    }
  } else {
    for (const property of properties) {
      if (object[property]) {
        formData.append(property, object[property]);
      }
    }
  }
  return formData;
}

export function getImageSource(
  imageUrl: string | ImageSourcePropType,
): ImageSourcePropType {
  if (typeof imageUrl === 'string') {
    return {uri: imageUrl};
  }
  return imageUrl;
}
