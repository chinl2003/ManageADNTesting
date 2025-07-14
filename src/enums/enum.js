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

export const BookingStatus = {
  0: 'Đang xử lý',
  1: 'Đã thanh toán',
  2: 'Đã nhận kit thu mẫu',
  3: 'Trung tâm đã nhận mẫu',
  4: 'Đang xét nghiệm',
  5: 'Đã hoàn thành',
  6: 'Đã hủy',
};

export const TransactionStatus = {
  0: 'Chưa được xử lý',
  1: 'Thành công',
  2: 'Thất bại',
};

/**
 * Trả về label dựa trên enum object
 * @param {object} enumObj - Ví dụ: ResultTimeType
 * @param {number|string} value - Giá trị enum
 */
export function getEnumLabel(enumObj, value) {
  return enumObj[value] || 'Không rõ';
}

export const transactionStatusOptions = Object.entries(TransactionStatus).map(
  ([value, label]) => ({
    value: parseInt(value),
    label,
  })
);
