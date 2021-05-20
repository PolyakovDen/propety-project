<template>
  <div>
    <v-dialog v-model="dialog" width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mt-3 share-btn" text v-bind="attrs" v-on="on">
          Поделиться
          <v-icon class="ml-3">mdi-share-variant-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline">
          Поделиться объектом в:
        </v-card-title>
        <div class="share-network-list">
          <ShareNetwork
            v-for="network in networks"
            :network="network.network"
            :key="network.network"
            :style="{ backgroundColor: network.color }"
            :url="sharing.url"
            :title="sharing.title"
            :description="sharing.description"
            :quote="sharing.quote"
            :hashtags="sharing.hashtags"
            :twitterUser="sharing.twitterUser"
          >
            <div class="titles">
              <v-icon size="45" color="rgb(33, 150, 243)">{{
                network.icon
              }}</v-icon>
            </div>
          </ShareNetwork>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      sharing: {
        url: "https://news.vuejs.org/issues/180",
        title:
          "Say hi to Vite! A brand new, extremely fast development setup for Vue.",
        description:
          'This week, I’d like to introduce you to "Vite", which means "Fast". It’s a brand new development setup created by Evan You.',
        quote: "The hot reload is so fast it's near instant. - Evan You",
        hashtags: "AKM"
      },
      networks: [
        {
          network: "email",
          name: "Email",
          icon: "mdi-email-newsletter"
        },
        {
          network: "facebook",
          name: "Facebook",
          icon: "mdi-facebook"
        },
        {
          network: "telegram",
          name: "Telegram",
          icon: "mdi-telegram"
        },
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "mdi-whatsapp"
        }
      ]
    };
  }
};
</script>

<style scoped>
.share-network-list {
  display: flex;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap;
}
.titles {
  margin-right: 20px;
}
a {
  text-decoration: none;
}
.share-btn {
  text-transform: none;
  font-size: 18px;
  color: white;
}
</style>
