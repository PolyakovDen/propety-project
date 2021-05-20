<template>
  <div class="wrapper-main">
    <Header />
    <MainSection :show-slider="true" title="Комерческая недвижимость" />
    <MainActualObjects :objects="actualObjects" />
    <MainRealizedObjects :objects="realizedObjects" />
    <ContactInformation />
    <MainFooter />
  </div>
</template>

<script>
import Header from "../../components/Header";
import MainSection from "../../components/MainSection";
import ContactInformation from "../../components/ContactInformation";
import MainRealizedObjects from "../../components/MainRealizedObjects";
import MainActualObjects from "../../components/MainActualObjects";
import MainFooter from "../../components/MainFooter";
export default {
  components: {
    Header,
    MainSection,
    ContactInformation,
    MainRealizedObjects,
    MainActualObjects,
    MainFooter
  },
  data() {
    return {
      realizedObjects: [],
      actualObjects: []
    };
  },
  created() {
    this.getObjects();
  },
  methods: {
    getRealizedObjects() {
      this.axios
        .get("common/real-estate-featured?realized=true&arc=false")
        .then(res => {
          this.realizedObjects = res.data.data;
        });
    },
    getActualObjects() {
      this.axios
        .get(
          "common/real-estate-featured?per_page=6&realized=false&show_in_slider=false&arc=false"
        )
        .then(res => {
          this.actualObjects = res.data.data;
        });
    },
    getObjects() {
      this.getActualObjects();
      this.getRealizedObjects();
    }
  }
};
</script>
