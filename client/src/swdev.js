export default function swPWA() {
    let urls = `${import.meta.env.VITE_APP_PUBLIC_URL}/worker.js`;
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker
          .register(urls)
          .then(
            function (registration) {
              console.log("service registration successful", registration.scope);
            },
            function (err) {
              console.log("Failed");
            }
          )
          .catch(function (err) {
            console.log(err);
          });
      });
    } else {
      console.warn("service worker not suported");
    }
    
    //if browser will perfectly then prceed with this.
    navigator.serviceWorker.register(urls).then((res) => {
      console.warn("response", res);
    });
  }