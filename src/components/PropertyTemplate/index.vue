<template>
  <div class="wrapper">
    <Header />
    <MainSection :title="title" :description="description" />
    <div class="list-wrapper">
      <div class="list">
        <ObjectCard
          v-for="(object, index) in objects"
          :key="index"
          :object="object"
          class="item"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/Header";
import MainSection from "../../components/MainSection";
import Footer from "../../components/Footer";
import ObjectCard from "../../components/ObjectCard";
export default {
  props: {
    objects: {
      type: Array,
      required: true
    },
    title: {
      type: String
    },
    description: {
      type: String
    }
  },
  components: {
    Header,
    MainSection,
    Footer,
    ObjectCard
  }
};
</script>

<style scoped src="@/assets/style.css" />
