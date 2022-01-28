// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authUrl:"http://localhost:8080/AUTH",
  reservaUrl:"http://localhost:8080/api/reservas",
  countriesUrl:"https://www.universal-tutorial.com/api",
  authCountryToken:"MYQfuiaoifiQPMS_5zl-vtYcg0YCkShKS_4GKeuOdqWd2rWYubUvZ6Uj0wkyKoMj_wc",
  houseUrl:"http://localhost:8080/api/casas",
  firebaseConfig:{
    apiKey: "AIzaSyAjrim9kDzhwyF3hft6IhJP3dXuwNm92AE",
    authDomain: "redapoyobackend.firebaseapp.com",
    projectId: "redapoyobackend",
    storageBucket: "redapoyobackend.appspot.com",
    messagingSenderId: "909267284823",
    appId: "1:909267284823:web:d3bead3cafb6647e570412",
    measurementId: "G-5H5KQXT27F"
  },
  calificacionUrl:'http://localhost:8080/api/calificaciones',
  userUrl:'http://localhost:8080/api/usuariopublico'
};

