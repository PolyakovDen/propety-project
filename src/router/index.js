import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import MainPage from "../views/Main";
import AdminLogin from "../views/Admin/AdminLogin";
import AdminPanel from "../components/Admin/AdminPanel";
import AllObjects from "../components/Admin/AllObjects";
import ArchivedObjects from "../components/Admin/ArchivedObjects";
import AddNewObject from "../components/Admin/AddNewObject";
import EditObject from "../components/Admin/EditObject";
import ObjectDetails from "../views/ObjectDetails";
import ActualObjects from "../views/ActualObjects";
import RealizedObjects from "../views/RealizedObjects";
import RentOffices from "../views/RentOffices";
import RentShops from "../views/RentShops";
import RentBuilds from "../views/RentBuilds";
import RentRestaurants from "../views/RentRestaurants";
import SaleOffices from "../views/SaleOffices";
import SaleProperty from "../views/SaleProperty";
import SaleShops from "../views/SaleShops";
import SaleBuilds from "../views/SaleBuilds";
import SaleRestaurants from "../views/SaleRestaurants";
import FeaturedObjects from "../views/FeaturedObjects";
import About from "../views/About";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: MainPage
  },
  {
    path: "/item/:id",
    name: "objectDetails",
    component: ObjectDetails
  },
  {
    path: "/actual-objects",
    name: "actualObjects",
    component: ActualObjects
  },
  {
    path: "/portfolio",
    name: "realizedObjects",
    component: RealizedObjects
  },
  {
    path: "/ofisy/arenda-ofisov",
    name: "rentOffices",
    component: RentOffices
  },
  {
    path: "/magaziny/arenda-magazinov",
    name: "rentShops",
    component: RentShops
  },
  {
    path: "/rent-builds",
    name: "rentBuilds",
    component: RentBuilds
  },
  {
    path: "/restorany/arenda-restoranov",
    name: "rentRestaurants",
    component: RentRestaurants
  },
  {
    path: "/ofisy/prodazha-ofisov",
    name: "saleOffices",
    component: SaleOffices
  },
  {
    path: "/dokhodnaya-nedvizhimost",
    name: "saleProperty",
    component: SaleProperty
  },
  {
    path: "/magaziny/prodazha-magazinov",
    name: "saleShops",
    component: SaleShops
  },
  {
    path: "/sale-builds",
    name: "saleBuilds",
    component: SaleBuilds
  },
  {
    path: "/restorany/prodazha-restoranov",
    name: "saleRestaurants",
    component: SaleRestaurants
  },
  {
    path: "/izbrannye",
    name: "featuredObjects",
    component: FeaturedObjects
  },
  {
    path: "/o-kompanii",
    name: "about",
    component: About
  },
  {
    path: "/login",
    name: "login",
    component: AdminLogin
  },
  {
    path: "/admin",
    component: AdminPanel,
    meta: { auth: true },
    children: [
      {
        path: "",
        name: "allObjects",
        component: AllObjects,
        meta: { auth: true }
      },
      {
        path: "add",
        name: "addObjects",
        component: AddNewObject,
        meta: { auth: true }
      },
      {
        path: "edit/:id",
        component: EditObject,
        name: "editObject",
        meta: { auth: true }
      },
      {
        path: "archived-objects",
        name: "archivedObjects",
        component: ArchivedObjects,
        meta: { auth: true }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = store.getters.getToken;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
