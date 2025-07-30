<template>
    <div class="modal-overlay">
        <div class="modal-content a4-paper">
            <div class="modal-header justify-content-between">
                <h2 class="text-uppercase fw-bold text-center w-100">PHIẾU KẾT QUẢ PHÂN TÍCH ADN</h2>
                <button class="close-btn" @click="$emit('close')">&times;</button>
            </div>

             <p v-if="confirmedBooking?.bookingId" class="text-center text-muted small fst-italic mt-1">
                Căn cứ vào đề nghị xét nghiệm quan hệ huyết thống từ đơn hàng với mã: ĐH{{ confirmedBooking.bookingId }}
            </p>

            <div class="mt-3">
                <p><strong>Họ và tên người đề nghị:</strong> </p>
                <p><strong>Địa chỉ:</strong> </p>
                <p><strong>Email:</strong> </p>
                <p><strong>Số điện thoại:</strong> </p>
            </div>

             <div class="mt-4">
                <p>Công ty MATAP tiến hành phân tích các mẫu ADN sau:</p>

                <div class="border rounded sample-info-table">
                <div class="row fw-bold border-bottom py-2">
                    <div class="col text-center">STT</div>
                    <div class="col text-center">Người sở hữu mẫu</div>
                    <div class="col text-center">Quan hệ</div>
                    <div class="col text-center">Loại mẫu</div>
                    <div class="col text-center">Ngày thu mẫu</div>
                    <div class="col text-center">Kí hiệu mẫu</div>
                </div>

                <div v-for="(sample, index) in samples" :key="index" class="row py-2 border-bottom">
                    <div class="col text-center">{{ index + 1 }}</div>
                    <div class="col text-center">{{ sample.owner || '---' }}</div>
                    <div class="col text-center">{{ sample.relationship || '---' }}</div>
                    <div class="col text-center">{{ sample.type }}</div>
                    <div class="col text-center">{{ formatDate(sample.collectionTime) }}</div>
                    <div class="col text-center">{{ sample.code || 'M' + (index + 1) }}</div>
                </div>
                </div>
            </div>

            <div class="mt-4">
                <p>
                Sau khi phân tích các mẫu ADN có kí hiệu trên bằng bộ kít <strong>Identifiler-Plus</strong>
                của hãng <strong>Applied Biosystem</strong> của Mỹ, chúng tôi có kết quả sau:
                </p>
            </div>

            <div class="border rounded result-table">
                <div class="row fw-bold border-bottom text-center">
                <div class="col-3 border-right">Locus Gen</div>
                <div class="col-6 no-padding">
                    <div class="gen">Kiểu Gen</div>
                    <div class="d-flex justify-content-around mt-1">
                    <span v-for="(sample, idx) in samples" :key="idx" class="small">{{ sample.code || 'M' + (idx + 1) }}</span>
                    </div>
                </div>
                <div class="col-3 border-left">PI</div>
                </div>

                <div v-for="(locus, idx) in fakeResults" :key="idx" class="row py-2 border-bottom text-center">
                <div class="col-3">{{ locus.name }}</div>
                <div class="col-6 d-flex justify-content-around">
                    <span v-for="(genotype, i) in locus.genotypes" :key="i">{{ genotype }}</span>
                </div>
                <div class="col-3">{{ locus.pi }}</div>
                </div>
            </div>

            <div class="mt-4">
                <p><strong>Hội đồng khoa học công ty MATAP kết luận:</strong></p>
                <p>{{ conclusion }}</p>
            </div>

            <div  class="text-muted fst-italic small mt-3">
                Đây là xét nghiệm theo yêu cầu cá nhân, mẫu và tên mẫu do người đề nghị cung cấp,
                không phải do cơ quan tố tụng trưng cầu nên không được sử dụng kết quả trong tố tụng.
            </div>

            <div class="mt-4">
                <p class="text-end date">Ngày {{ formatDateTime(receiveDate) }}</p>
                <div class="row text-center mt-4">
                <div class="col"><strong>Trung tâm xét nghiệm</strong><br /><br />_________________</div>
                <div class="col"><strong>Hội đồng khoa học</strong><br /><br />_________________</div>
                <div class="col"><strong>Đại diện công ty</strong><br /><br />_________________</div>
                </div>
            </div>

            <div class="text-center text-muted small mt-5">
                Địa chỉ: 123 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh | Email: info@matap.vn | SĐT: 028-1234-5678
            </div>

            <div class="modal-footer">
                <button class="btn btn-secondary" @click="$emit('close')">Đóng</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios';

export default {
    props: {
        sampleReceiptId: {
            type: [String, Number],
            required: true,
        },
    },
    data() {
  return {
    confirmedBooking: null,
    samples: [],
    receiverName: '',
    receiveDate: '',
    conclusion: 'Các kết quả phân tích cho thấy mẫu số M1 và M2 có quan hệ cha - con sinh học.',
    fakeResults: [
      {
        name: 'D3S1358',
        genotypes: ['16, 17', '16, 18'],
        pi: '0.987'
      },
      {
        name: 'TH01',
        genotypes: ['9.3, 10', '9.3, 10'],
        pi: '1.000'
      },
      {
        name: 'D21S11',
        genotypes: ['29, 30', '30, 30'],
        pi: '0.992'
      }
    ]
  };
},
    mounted() {
        this.fetchSampleReceiptDetail();
    },
    methods: {
        fetchSampleReceiptDetail() {
  axios.get('/test-result/get-list', {
    params: {
      TestResultId: this.sampleReceiptId,
    },
  })
  .then(res => {
    if (res.data.success && res.data.data.items.length > 0) {
      const data = res.data.data.items[0];

      // Dữ liệu booking hiện chỉ có bookingId
      this.confirmedBooking = {
        bookingId: data.bookingId || null,
        customerFullName: null,
        customerPhone: null,
        customerEmail: null,
        customerAddress: null,
        isCivil: false
      };

      this.receiverName = null;
      this.receiveDate = data.createdAt || null;
      this.conclusion = data.conclusion || 'Không có kết luận';

      // Chuyển đổi sang định dạng tương thích với template
      this.samples = [
        {
          code: 'M1',
          owner: 'Người 1',
          relationship: '---',
          type: 'ADN',
          collectionTime: data.createdAt,
        },
        {
          code: 'M2',
          owner: 'Người 2',
          relationship: '---',
          type: 'ADN',
          collectionTime: data.createdAt,
        }
      ];

      // Convert chi tiết locus
      this.fakeResults = data.details.map(d => ({
        name: d.locus || '---',
        genotypes: [
          `${d.allele1_Person1}, ${d.allele2_Person1}`,
          `${d.allele1_Person2}, ${d.allele2_Person2}`
        ],
        pi: d.pi || null
      }));

    } else {
      console.warn('Không tìm thấy dữ liệu test result.');
    }
  })
  .catch(error => {
    console.error('Lỗi khi lấy chi tiết phiếu kết quả:', error);
  });
},

        formatDate(date) {
            if (!date) return '';
            const d = new Date(date);
            return d.toLocaleDateString('vi-VN');
        },
        formatDateTime(date) {
            if (!date) return '';
            const d = new Date(date);
            return `Ngày ${d.getDate()}, tháng ${d.getMonth() + 1}, năm ${d.getFullYear()}`;

        },
    },
};
</script>

<style scoped>
.label-bold {
    font-weight: 700;
}

.receipt-subtitle {
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 1rem;
}

.receipt-subtitle.text-center {
    text-align: center;
}

.form-label.d-block {
    margin-bottom: 0.25rem;
}

.value-inline {
    font-weight: normal;
    margin-left: 0.5rem;
}

.row.fw-bold.border-bottom.pb-2,
.row.py-2.align-items-center.border-bottom {
    display: flex;
    align-items: center;
}

.sample-table .row.fw-bold>div,
.sample-table .row.py-2>div {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sample-table .row.fw-bold>.text-start,
.sample-table .row.py-2>.text-start {
    justify-content: flex-start;
    padding-left: 10px;
    text-align: left;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    width: 80%;
    max-height: 90%;
    overflow-y: auto;
    border-radius: 8px;
    padding: 1rem;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
}

.close-btn {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.receipt-title {
    text-align: center;
    font-weight: bold;
}

.sample-table {
    font-size: 0.9rem;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
}

.form-control-plaintext {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    margin-bottom: 0;
    color: #212529;
}
.a4-paper {
  width: 794px; /* tương đương A4 ở 96dpi */
  background-color: white;
  padding: 40px;
  font-family: 'Times New Roman', serif;
}

.sample-info-table,
.result-table {
  font-size: 0.9rem;
}

.result-table .col {
  border-right: 1px solid #ccc;
}

.result-table .col:last-child {
  border-right: none;
}
.date{
    padding-right: 61px;
}
.gen{
border-bottom: 1px solid #ccc;
}
.border-right{
    border-right: 1px solid #ccc ;
}
.border-left{
    border-left: 1px solid #ccc ;
}
.no-padding{
    padding: 0 !important;
}
</style>
