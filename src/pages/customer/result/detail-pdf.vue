<template>
  <div class="a4-paper">
    <h2 class="text-uppercase fw-bold text-center">PHIẾU KẾT QUẢ PHÂN TÍCH ADN</h2>

    <p v-if="confirmedBooking?.bookingId" class="text-center text-muted small fst-italic mt-1">
      Căn cứ vào đề nghị xét nghiệm quan hệ huyết thống từ đơn hàng với mã: ĐH{{ confirmedBooking.bookingId }}
    </p>

    <div class="mt-3">
      <p><strong>Họ và tên người đề nghị:</strong> {{ customerInfo.fullName || '---' }}</p>
      <p><strong>Địa chỉ:</strong> {{ customerInfo.address || '---' }}</p>
      <p><strong>Email:</strong> {{ customerInfo.email || '---' }}</p>
      <p><strong>Số điện thoại:</strong> {{ customerInfo.phone || '---' }}</p>
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
          <div class="col text-center">{{ sample.type || '---' }}</div>
          <div class="col text-center">{{ formatDate(sample.collectionTime) || '---' }}</div>
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

    <div class="text-muted fst-italic small mt-3">
      Đây là xét nghiệm theo yêu cầu cá nhân, mẫu và tên mẫu do người đề nghị cung cấp,
      không phải do cơ quan tố tụng trưng cầu nên không được sử dụng kết quả trong tố tụng.
    </div>

    <div class="mt-4">
      <p class="text-end date">{{ formatDateTime(receiveDate) }}</p>
      <div class="row text-center mt-4">
        <div class="col"><strong>Trung tâm xét nghiệm</strong><br /><br />_________________</div>
        <div class="col"><strong>Hội đồng khoa học</strong><br /><br />_________________</div>
        <div class="col"><strong>Đại diện công ty</strong><br /><br />_________________</div>
      </div>
    </div>

    <div class="text-center text-muted small mt-5">
      Địa chỉ: 123 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh | Email: info@matap.vn | SĐT: 028-1234-5678
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
      customerInfo: {},
      receiveDate: '',
      conclusion: '',
      fakeResults: [],
    };
  },
  async mounted() {
    await this.fetchSampleReceiptDetail();
    this.$emit('ready'); 
  },
  methods: {
    async fetchSampleReceiptDetail() {
      const res = await axios.get('/test-result/get-list', {
        params: { TestResultId: this.sampleReceiptId },
      });
      const data = res.data.data.items[0];
      this.confirmedBooking = { bookingId: data.bookingId };
      this.receiveDate = data.createdAt;
      this.customerInfo = data.customerInfo;
      this.conclusion = data.conclusion || 'Không có kết luận';
      this.samples = (data.sampleDetails || []).map((s, index) => ({
        code: s.code || 'M' + (index + 1),
        owner: s.owner,
        relationship: s.relationship,
        type: s.sampleType,
        collectionTime: s.collectionTime || data.createdAt,
      }));
      this.fakeResults = (data.details || []).map(d => ({
        name: d.locus,
        genotypes: [`${d.allele1_Person1}, ${d.allele2_Person1}`, `${d.allele1_Person2}, ${d.allele2_Person2}`],
        pi: d.pi || '---',
      }));
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
.a4-paper {
  width: 794px;
  background-color: white;
  padding: 40px;
  font-family: 'Times New Roman', serif;
}
.border-right { border-right: 1px solid #ccc; }
.border-left { border-left: 1px solid #ccc; }
.result-table .col:last-child { border-right: none; }
.gen { border-bottom: 1px solid #ccc; }
.no-padding { padding: 0 !important; }
</style>
