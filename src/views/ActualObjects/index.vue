<template>
  <property-template title="Актуальные объекты" :objects="objects" />
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
          "common/real-estate-featured?realized=false&show_in_slider=false&arc=false"
        )
        .then(res => {
          this.objects = res.data.data;
        });
    }
  }
};
</script>
