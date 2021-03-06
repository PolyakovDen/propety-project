<template>
  <v-card class="pa-5 ma-7">
    <v-card-title class="justify-center">
      <h3>Добавить объект:</h3>
    </v-card-title>
    <v-card-text class="justify-center">
      <v-form ref="form" v-model="formData.valid" lazy-validation class="form">
        <v-text-field
          v-model="formData.title"
          :rules="mainRule"
          label="Название объекта"
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
              Описание объекта
            </div>
          </template>
        </v-textarea>

        <v-text-field
          v-model="formData.address"
          :rules="mainRule"
          label="Адрес объекта"
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

        <v-select
          v-model="formData.agent"
          :items="agentsItems"
          :rules="mainRule"
          item-text="type"
          item-value="value"
          label="Агент"
          required
          outlined
          :menu-props="{ bottom: true, offsetY: true }"
        ></v-select>

        <v-text-field
          v-model="formData.telephone"
          label="Номер телефона"
          v-mask="'+38(###)-###-##-##'"
          disabled
          outlined
        ></v-text-field>

        <v-text-field
          v-model="formData.email"
          label="E-mail"
          disabled
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

        <image-uploader
          @getMainImage="getMainImage"
          @deleteMainImage="deleteMainImage"
          :value="valueImage"
          :main-image-url="mainImageUrl"
        />

        <multiple-image-uploader
          @getMainImages="getMainImages"
          @deleteImage="deleteImage"
          @changeImages="changeImages"
          :value="valueImages"
          :images="mainImages"
        />

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4 mt-4"
          @click="validate"
        >
          Добавить
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import MultipleImageUploader from "./MultipleImageUploader";
import ImageUploader from "./ImageUploader";
export default {
  components: {
    MultipleImageUploader,
    ImageUploader
  },
  data() {
    return {
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
        { type: "Без комисси!", value: "false" },
        { type: "С комиссией!", value: "true" }
      ],
      currencyItems: [
        { type: "USD", value: 1 },
        { type: "ГРН", value: 2 }
      ],
      realizedItems: [
        { type: "Нет", value: "false" },
        { type: "Да", value: "true" }
      ],
      sliderItems: [
        { type: "Нет", value: "false" },
        { type: "Да", value: "true" }
      ],
      agentsItems: [
        {
          type: "Кирилюк Александр",
          value: "Кирилюк Александр"
        },
        {
          type: "Фильченков Дмитрий",
          value: "Фильченков Дмитрий"
        },
        {
          type: "Неилко Галина",
          value: "Неилко Галина"
        },
        {
          type: "Геннадий Кушманцев",
          value: "Геннадий Кушманцев"
        },
        {
          type: "Москаленко Александр",
          value: "Москаленко Александр"
        }
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
        isRealized: false,
        isSlider: false
      },
      mainImage: null,
      images: null,
      mainImageUrl: null,
      mainImages: null,
      valueImages: [],
      valueImage: []
    };
  },
  watch: {
    "formData.agent": {
      handler(val) {
        if (val == "Кирилюк Александр") {
          this.formData.telephone = "0672321325";
          this.formData.email = "2321325@gmail.com";
        } else if (val == "Фильченков Дмитрий") {
          this.formData.telephone = "0936164919";
          this.formData.email = "akm2.kiev@gmail.com";
        } else if (val == "Неилко Галина") {
          this.formData.telephone = "0960202828";
          this.formData.email = "lady.nelko82@gmail.com";
        } else if (val == "Геннадий Кушманцев") {
          this.formData.telephone = "0934494130";
          this.formData.email = "KushG.akm2@gmail.com";
        } else {
          this.formData.telephone = "0675364060";
          this.formData.email = "a.n.moskalenko14@gmail.com";
        }
      }
    }
  },
  created() {
    this.getObjectTypes();
  },
  computed: {
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
    getMainImage(e) {
      if (e) {
        this.valueImage = e;
        this.mainImageUrl = URL.createObjectURL(e[0]);
      }
    },
    getMainImages(e) {
      if (e) {
        this.valueImages = e;
        this.mainImages = e.map(el => {
          return URL.createObjectURL(el);
        });
      }
    },
    async changeImages(event) {
      this.valueImages = await this.swap(
        this.valueImages,
        event.moved.oldIndex,
        event.moved.newIndex
      );
    },
    swap(arr, a, b) {
      arr[a] = arr.splice(b, 1, arr[a])[0];
      return arr;
    },
    deleteImage(index) {
      this.valueImages.splice(index, 1);
      this.mainImages.splice(index, 1);
    },
    deleteMainImage() {
      this.valueImage = [];
      this.mainImageUrl = null;
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.$emit(
          "click",
          this.formData,
          this.pricePerMeter,
          this.valueImage[0],
          this.valueImages
        );
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
@media screen and (max-width: 800px) {
  .form {
    max-width: 100%;
  }
}
</style>
