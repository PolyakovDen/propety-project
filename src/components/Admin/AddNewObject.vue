<template>
  <div>
    <Form @click="addNewObject" />
  </div>
</template>

<script>
import Form from "../Form";
export default {
  components: {
    Form
  },
  data() {
    return {
      objectId: null
    };
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    }
  },
  methods: {
    async addNewObject(formData, pricePerMeter, mainImage, images) {
      await this.axios
        .post(
          "admin/real-estate",
          {
            title: formData.title,
            description: formData.description,
            currency_id: formData.currency,
            price: +formData.price,
            price_per_square_meter: +pricePerMeter,
            square: +formData.area,
            address: formData.address,
            agent: formData.agent,
            mobile_number: formData.telephone,
            email: formData.email,
            realized: formData.isRealized,
            has_commision: formData.commission,
            real_estate_categories: formData.objectType,
            contract_type_id: formData.deal,
            show_in_slider: formData.isSlider
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        )
        .then(res => {
          this.objectId = res.data.id;
        });
      await this.setMainImage(mainImage);
      await this.setImages(images);
    },
    async setMainImage(mainImage) {
      await this.axios.post(
        "admin/set-rs-main-img",
        {
          real_estate_id: this.objectId,
          img: mainImage
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.token}`
          }
        }
      );
    },
    async setImages(images) {
      await this.axios
        .post(
          "admin/upload-rs-imgs",
          {
            real_estate_id: this.objectId,
            img: images
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.token}`
            }
          }
        )
        .then(() => {
          this.$router.push({ name: "allObjects" });
        });
    }
  }
};
</script>

<style scoped></style>
