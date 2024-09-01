import {ImageSourcePropType} from 'react-native';

export function convertObjectToFormData(object: Record<string, any>): FormData {
  const formData = new FormData();
  for (const key of Object.keys(object)) {
    formData.append(key, object[key]);
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
