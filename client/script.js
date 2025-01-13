const url =  "http://localhost:3000/links";
// Globala variabel för när en länk ska redigeras (istället för localstorage och I/O operation)
let currentLinkID = null;
// Global variabel för att spara namnet på länken som ska tas bort, används i bekräftelsemodalen
let deleteName = null;

//kör linkfetch när sidan laddat
window.addEventListener('load', LinkFetch);

//hämtar alla länkar i databasen och skickar dem till html så att dessa kan ses av clienten
function LinkFetch() {
 fetch(url)
  .then((result) => result.json())
   .then((links) => {
   if (links.length > 0) {
   let html =``
   links.forEach((link) => {
     html +=  `
    <nav class="link-list mw-100 user-select-none">
     <div
     class="link-item position-relative d-flex mw-100 my-3" link-data-id="${link.id}" style="--border-color: ${link.color};";">
    <div class="link-wrapper  position-relative d-flex justify-content-between align-items-center overflow-hidden rounded">
      <a href="${link.url}" target="_blank" class="d-flex w-100 align-items-center justify-content-center text-decoration-none fw-bolder fs-2" aria-label="${link.name}"><span class="link-text text-center shadow">${link.name}</span></a>
    </div>
    <div class="icon-wrapper d-flex flex-column align-items-center position-absolute top-50 .right-0 translate-middle-y" style="right: -2rem;">
      <i onclick="editLink(this)" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="bi bi-wrench-adjustable-circle icon-edit fs-4 link-warning link-opacity-50-hover" data-bs-placement="right" data-bs-title="Redigera" aria-label="Redigera"></i></i>
      <i onclick="deleteLink(${link.id}, '${link.name}')" id="del" class="bi bi-x-circle icon-delete fs-4 link-warning link-opacity-50-hover" data-bs-placement="right" data-bs-title="Ta bort" aria-label="Ta bort"></i>
    </div>
   </div>`;
  
 });

 const linkContainer = document.getElementById('linklist');
 linkContainer.innerHTML = '';
 linkContainer.insertAdjacentHTML('beforeend', html)
 }
 });
}

// 
linkForm.addEventListener("submit", handleSubmit);
//fånga upp text/val i formuläret och skicka dessa till Db alt updatera db om ett id skickas med finns
function handleSubmit(e) {
  // console.log(linkForm);
  e.preventDefault();
  const serverLinkObject = {
    name: '',
    url: '',
    color: '',
  } 
  serverLinkObject.name = linkForm.nameInput.value
  serverLinkObject.url = linkForm.urlInput.value
  serverLinkObject.color = linkForm.colorSelect.value
  
  let request;
  //tittar om id finns och använder Put alt Post beroende på om id finns 
  if (currentLinkID) {
    request = new Request(`${url}/${currentLinkID}`, {
      method: "PUT", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serverLinkObject)
    });
    showToast("Modifierare", "Användaren är nu justerad!");
  } else {
    request = new Request(url, {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serverLinkObject)
    });
    showToast("Pålagd", "Ny användare!");
  }
  currentLinkID = null;
  
  //Stäng offcanvas efter submit
  const offCanvasElement = document.getElementById('offcanvasRight');
  const openCanvas = bootstrap.Offcanvas.getInstance(offCanvasElement);
  openCanvas.hide();

  fetch(request).then((response) => {
    LinkFetch();
    linkForm.reset();
  });
}

//Hämtar datan för länken med det valda id:et och placerar dessa i formuläret
function editLink(element) {
  const linkItem = element.closest(".link-item");
  currentLinkID = linkItem.getAttribute("link-data-id");
  const linkText = linkItem.querySelector(".link-text").textContent.trim();
  const linkURL = linkItem.querySelector("a").getAttribute("href");
  const borderColor = linkItem.style.getPropertyValue("--border-color").trim();
  document.getElementById("nameInput").value = linkText;
  document.getElementById("urlInput").value = linkURL;
  const colorSelect = document.getElementById("colorSelect");
  Array.from(colorSelect.options).forEach((option) => {
    if (option.value === borderColor) {
      option.selected = true;
    }
  });
}

// Funktion för borttagning av ett valt object från databasen
function deleteLink(id, name) {
  deleteName = name;
  document.getElementById('deleteName').textContent = deleteName;
  // Hämta och visa modal för bekräftelse
  const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  deleteModal.show();

  // Funktion som körs när användaren bekräftar borttagning
  confirmDeleteBtn.onclick = function () {
    fetch(`${url}/${id}`, { method: 'DELETE' })
      .then((result) => {
        if (result.ok) {
          LinkFetch();
        } else {
          console.error('Error deleting link:', result.statusText);
        }
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => { 
        deleteModal.hide(); 
        showToast("Borta med vinden!", `Länk till "${deleteName}" har tagits bort!`)
      });
  };
}
