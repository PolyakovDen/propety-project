<template>
  <property-template
    title="Аренда зданий"
    description="Мы обладаем многолетним опытом сдачи в аренду и продажи зданий в городе Киеве.
      Наши сотрудники проконсультируют вас касательно концепции наполнения здания арендаторами.
      Обратившись к нам вы получите качественную услугу по подбору"
    :objects="objects"
  />
</template>

<script>
import PropertyTemplate from "../../components/PropertyTemplate";

export default {
  components: {
    PropertyTemplate
  },
  data() {
    return {
      objects: []
    };
  },
  created() {
    this.getObjects();
  },
  methods: {
    getObjects() {
      this.axios
        .get(
          "common/real-estate-featured?rec_ids[]=2&ct=2&realized=false&arc=false"
        )
        .then(res => {
          this.objects = res.data.data;
        });
    }
  }
};
</script>
