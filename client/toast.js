const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

function showToast(headerText, bodyText) {
  // Hämta toast-elementet
  const toastElement = document.getElementById("liveToast");

  // Uppdatera <strong> (rubriken)
  const toastHeader = toastElement.querySelector(".toast-header strong");
  toastHeader.textContent = headerText;

  // Uppdatera .toast-body
  const toastBody = toastElement.querySelector(".toast-body");
  toastBody.textContent = bodyText;

  // Visa toasten med hjälp av Bootstrap API
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}