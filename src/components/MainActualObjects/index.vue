<template>
  <div class="wrapper">
    <v-container>
      <Title class="mt-10" title="Актуальные объекты" />
      <v-row class="mt-10 mb-10" justify="center">
        <v-col
          v-if="showPreloader"
          class="d-flex align-center justify-center"
          cols="12"
          xl="6"
          lg="9"
          md="12"
          sm="12"
        >
          <v-progress-circular
            class="d-flex justify-center align-center"
            :size="70"
            :width="7"
            color="#1e2d3b"
            indeterminate
          />
        </v-col>
        <v-col v-else cols="12" xl="6" lg="9" md="12" sm="12">
          <div class="objects-list d-flex justify-space-between flex-wrap">
            <ObjectCard
              class="mt-10 mr-3"
              v-for="(object, index) in objects"
              :key="index"
              :object="object"
            />
          </div>
        </v-col>
      </v-row>
      <main-button
        text="Посмотреть больше"
        :backgroundColor="'#1e2d3b'"
        color="white"
        :width="275"
        :height="60"
        to="/actual-objects"
      />
    </v-container>
  </div>
</template>

<script>
import Title from "../../components/Title";
import MainButton from "../../components/MainButton";
import ObjectCard from "../../components/ObjectCard";
export default {
  props: {
    showPreloader: {
      type: Boolean,
      default: false
    },
    objects: {
      type: Array
    }
  },
  components: {
    Title,
    MainButton,
    ObjectCard
  }
};
</script>

<style scoped>
.wrapper {
  background-color: #f7f5f5;
  padding-bottom: 45px;
}
@media screen and (max-width: 545px) {
  .objects-list {
    justify-content: center !important;
  }
}
</style>
