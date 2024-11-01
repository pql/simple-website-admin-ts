import { CustomFileDescriptorService } from '@/apis';

export const checkFileType = (file: File, accepts: string[]) => {
  let reg;
  if (!accepts || accepts.length === 0) {
    reg = /.(jpg|jpeg|png|gif|webp)$/i;
  } else {
    const newTypes = accepts.join('|');
    reg = new RegExp('\\.(' + newTypes + ')$', 'i');
  }
  return reg.test(file.name);
};

export const checkImgType = (file: File) => {
  return isImgTypeByName(file.name);
};

export const isImgTypeByName = (name: string) => {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(name);
};

export const getBase64WithFile = (file: File) => {
  return new Promise<{
    result: string;
    file: File;
  }>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve({ result: reader.result as string, file });
    reader.onerror = (error) => reject(error);
  });
};

/**
 * 根据图片id获取图片base64
 *  @param fileId
 */
export const getFileUrlById = async (fileId) => {
  if (!fileId) return;
  const imageBase64 = await CustomFileDescriptorService.postApiAppCustomFileDescriptorPreviewImages(
    {
      fileId: fileId,
    },
  );
  return imageBase64.base64String;
};

/**
 * 根据图片id获取图片信息
 *  @param fileId
 */
export const getFileInfoById = async (fileId) => {
  if (!fileId) return;
  const fileInfo = await CustomFileDescriptorService.postApiAppCustomFileDescriptorPreviewImages({
    fileId: fileId,
  });
  return fileInfo;
};
