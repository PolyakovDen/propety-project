<template>
  <property-template
    title="Продажа зданий"
    :objects="objects"
    description="Мы обладаем многолетним опытом сдачи в аренду и продажи зданий в городе Киеве.
      Наши сотрудники проконсультируют вас касательно концепции наполнения здания арендаторами.
      Обратившись к нам вы получите качественную услугу по подбору и продаже зданий"
    :show-preloader="showPreloader"
  />
</template>

<script>
import PropertyTemplate from "../../components/PropertyTemplate";

export default {
  components: {
    PropertyTemplate
  },
  metaInfo: {
    title: "Продажа зданий"
  },
  data() {
    return {
      objects: [],
      showPreloader: true,
      itemsPerPage: 9999
    };
  },
  created() {
    this.getObjects();
  },
  methods: {
    getObjects() {
      this.axios
        .get(
          `common/real-estate-featured?per_page=${this.itemsPerPage}&rec_ids[]=2&ct=1&realized=false&arc=false`
        )
        .then(res => {
          this.objects = res.data.data;
          this.showPreloader = false;
        });
    }
  }
};
</script>
