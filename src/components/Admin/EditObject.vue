<template>
  <v-card class="pa-5 ma-7">
    <v-card-title class="justify-center">
      <h3>Добавить объекты:</h3>
    </v-card-title>
    <v-card-text class="justify-center">
      <v-form ref="form" v-model="formData.valid" lazy-validation class="form">
        <v-text-field
          v-model="formData.title"
          :rules="mainRule"
          label="Название обьекта"
          required
          outlined
        ></v-text-field>

        <v-textarea
          v-model="formData.description"
          color="teal"
          required
          :rules="mainRule"
          outlined
        >
          <template v-slot:label>
            <div>
              Описание обьекта
            </div>
          </template>
        </v-textarea>

        <v-text-field
          v-model="formData.address"
          :rules="mainRule"
          label="Адрес обьекта"
          required
          outlined
        ></v-text-field>

        <v-select
          v-model="formData.objectType"
          :items="objectTypes"
          multiple
          item-text="type"
          item-value="value"
          :rules="objectTypeRules"
          label="Тип обьекта"
          required
          outlined
          small-chips
          :menu-props="{ bottom: true, offsetY: true }"
        ></v-select>

        <v-select
          v-model="formData.currency"
          :items="currencyItems"
          :rules="mainRule"
          item-text="type"
          item-value="value"
          label="Валюта"
          required
          outlined
          :menu-props="{ bottom: true, offsetY: true }"
        ></v-select>

        <v-text-field
          label="Цена"
          v-model="formData.price"
          :rules="mainRule"
          required
          outlined
        ></v-text-field>

        <v-text-field
          label="Площадь"
          v-model="formData.area"
          :rules="mainRule"
          required
          outlined
        ></v-text-field>

        <v-text-field
          label="Цена за м2"
          v-model="pricePerMeter"
          disabled
          outlined
        ></v-text-field>

        <v-select
          v-model="formData.deal"
          :items="dealItems"
          :rules="mainRule"
          item-text="type"
          item-value="value"
          label="Вид сделки"
          required
          outlined
          :menu-props="{ bottom: true, offsetY: true }"
        ></v-select>

        <v-select
          v-model="formData.commission"
          :items="commissionItems"
          :rules="mainRule"
          item-text="type"
          item-value="value"
          label="Комиссия"
          required
          outlined
          :menu-props="{ bottom: true, offsetY: true }"
        ></v-select>

        <v-text-field
          v-model="formData.agent"
          :rules="mainRule"
          label="Агент"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="formData.telephone"
          :rules="mainRule"
          label="Номер телефона"
          v-mask="'+38(###)-###-##-##'"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="formData.email"
          :rules="emailRules"
          label="E-mail"
          required
          outlined
        ></v-text-field>

        <v-select
          v-model="formData.isRealized"
          :items="realizedItems"
          :rules="mainRule"
          item-text="type"
          item-value="value"
          label="Реализованый объект?"
          required
          outlined
          :menu-props="{ bottom: true, offsetY: true }"
        ></v-select>

        <v-select
          v-model="formData.isSlider"
          :items="sliderItems"
          :rules="mainRule"
          item-text="type"
          item-value="value"
          label="Добавить объект в слайдер?"
          required
          outlined
          :menu-props="{ bottom: true, offsetY: true }"
        ></v-select>

        <v-select
          v-model="formData.archieved"
          :items="archievedItems"
          :rules="mainRule"
          item-text="type"
          item-value="value"
          label="Архивировать объект(не показывать)?"
          required
          outlined
          :menu-props="{ bottom: true, offsetY: true }"
        ></v-select>

        <!--        <v-file-input-->
        <!--          show-size-->
        <!--          counter-->
        <!--          multiple-->
        <!--          label="File input"-->
        <!--        ></v-file-input>-->

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Сохранить
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "EditObject",
  data: () => ({
    valid: true,
    mainRule: [v => !!v || "Заполните поле"],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    objectTypes: [],
    objectTypeRules: [
      v => !!v || "Заполните поле",
      v => v.length <= 3 || "Максимальное количество объектов - три"
    ],
    dealItems: [
      { type: "Продажа", value: 1 },
      { type: "Аренда", value: 2 }
    ],
    commissionItems: [
      { type: "С комиссией!", value: "true" },
      { type: "Без комисси!", value: "false" }
    ],
    currencyItems: [
      { type: "USD", value: 1 },
      { type: "ГРН", value: 2 }
    ],
    realizedItems: [
      { type: "Да", value: "true" },
      { type: "Нет", value: "false" }
    ],
    sliderItems: [
      { type: "Да", value: "true" },
      { type: "Нет", value: "false" }
    ],
    archievedItems: [
      { type: "Да", value: "true" },
      { type: "Нет", value: "false" }
    ],
    formData: {
      title: "",
      description: "",
      objectType: [],
      address: "",
      area: "",
      currency: "",
      price: "",
      deal: null,
      commission: null,
      agent: "",
      telephone: "",
      email: "",
      isRealized: null,
      isSlider: false,
      images: "",
      archieved: false
    }
  }),
  created() {
    this.getObjectTypes();
    this.getObjectById();
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    pricePerMeter() {
      return this.formData.price && this.formData.area
        ? Math.round(this.formData.price / this.formData.area)
        : 0;
    }
  },
  methods: {
    getObjectTypes() {
      this.axios.get("common/real-estate-categories").then(res => {
        this.objectTypes = res.data.map(el => ({
          type: el.category_name,
          value: el.id
        }));
      });
    },
    getObjectById() {
      const objectId = this.$route.params.id;
      this.axios
        .get(`api/common/real-estate/${objectId}`)
        .then(res => {
          this.formData.title = res.data.title;
          this.formData.description = res.data.description;
          this.formData.objectType = res.data.real_estate_categories.map(
            el => ({
              type: el.category_name,
              value: el.id
            })
          );
          this.formData.address = res.data.address;
          this.formData.area = res.data.square;
          this.formData.currency = res.data.currency_id;
          this.formData.price = res.data.price;
          this.formData.deal = res.data.contract_type_id;
          this.formData.commission = res.data.has_commision.toString();
          this.formData.agent = res.data.agent;
          this.formData.telephone = res.data.mobile_number;
          this.formData.email = res.data.email;
          this.formData.isRealized = res.data.realized.toString();
          this.formData.isSlider = res.data.show_in_slider.toString();
          this.formData.archieved = res.data.archieved.toString();
          this.formData.images = res.data.images;
        })
        .catch(e => {
          console.log(e);
        });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.axios
          .put(
            `admin/real-estate/${this.$route.params.id}`,
            {
              title: this.formData.title,
              description: this.formData.description,
              currency_id: this.formData.currency,
              price: +this.formData.price,
              price_per_square_meter: +this.pricePerMeter,
              square: +this.formData.area,
              address: this.formData.address,
              agent: this.formData.agent,
              mobile_number: this.formData.telephone,
              email: this.formData.email,
              has_commision: this.formData.commission,
              real_estate_categories: this.formData.objectType[0].value
                ? this.formData.objectType.map(el => el.value)
                : this.formData.objectType,
              contract_type_id: this.formData.deal,
              realized: this.formData.isRealized,
              show_in_slider: this.formData.isSlider,
              archieved: this.formData.archieved
            },
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            }
          )
          .then(() => {
            this.$router.push({ name: "allObjects" });
          });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  max-width: 70%;
  margin: 0 auto;
}
</style>
