export const ResultTimeType = {
  0: 'Siêu tốc (24-48h)',   // Express
  1: 'Nhanh (2-3 ngày)',         // Fast
  2: 'Bình thường (5-7 ngày)'    // Normal
};

export const SampleMethod = {
  0: 'Tự thu tại nhà',
  1: 'Nhân viên đến thu mẫu',
  2: 'Thu tại cơ sở y tế'
};

/**
 * Trả về label dựa trên enum object
 * @param {object} enumObj - Ví dụ: ResultTimeType
 * @param {number|string} value - Giá trị enum
 */
export function getEnumLabel(enumObj, value) {
  return enumObj[value] || 'Không rõ';
}
