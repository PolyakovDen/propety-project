<template>
  <property-template title="Реализованные объекты" :objects="objects" />
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
        .get("common/real-estate-featured?realized=true&arc=false")
        .then(res => {
          this.objects = res.data.data;
        });
    }
  }
};
</script>
