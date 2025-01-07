const url =  "http://localhost:3000/links";
let currentLinkID = null;


window.addEventListener('load', LinkFetch);

function LinkFetch() {
 fetch(url)
  .then((result) => result.json())
   .then((links) => {
    // console.log(links);
    
   if (links.length > 0) {
   let html =``
   links.forEach((link) => {
     html +=  `
    <nav class="link-list mw-100 user-select-none">
     <div
     class="link-item position-relative d-flex mw-100 my-3" link-data-id="${link.id}" style="--border-color: ${link.color};";">
    <div class="link-wrapper  position-relative d-flex justify-content-between align-items-center overflow-hidden rounded">
      <a href="${link.url}" target="_blank" class="d-flex w-100 align-items-center justify-content-center text-decoration-none fw-bolder fs-2" aria-label="${link.name}"><span class="link-text shadow">${link.name}</span></a>
    </div>
    <div class="icon-wrapper d-flex flex-column align-items-center position-absolute top-50 .right-0 translate-middle-y" style="right: -2rem;">
      <i onclick="editLink(this)" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="bi bi-wrench-adjustable-circle icon-edit fs-4 link-warning link-opacity-50-hover" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Redigera" aria-label="Redigera"></i></i>
      <i onclick="deleteLink(${link.id}, '${link.name}')" id="del" class="bi bi-x-circle icon-delete fs-4 link-warning link-opacity-50-hover" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Ta bort" aria-label="Ta bort"></i>
    </div>
   </div>`;
  
 });



 const linkContainer = document.getElementById('linklist');
 linkContainer.innerHTML = '';
 linkContainer.insertAdjacentHTML('beforeend', html)
 const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
 const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
 }
 });

}

// console.log(linkForm);
linkForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  console.log(linkForm);
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
 
    console.log(serverLinkObject)
    if (currentLinkID) {
      // Append currentLinkID to the URL
      request = new Request(`${url}/${currentLinkID}`, {
        method: "PUT", // or your desired HTTP method
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serverLinkObject)
      });
      showToast("Modifierare", "Användaren är nu justerad!");
    } else {
      // Use the base URL
      request = new Request(url, {
        method: "POST", // or your desired HTTP method
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serverLinkObject)
      });
      showToast("Pålagd", "Ny användare!");
    }
    console.log(currentLinkID);
    currentLinkID = null;
    console.log(currentLinkID);
    fetch(request).then((response) => {
      LinkFetch();
      linkForm.reset();
    });
}
function editLink(element) {
  // Find the parent .link-item
  const linkItem = element.closest(".link-item");

  // Get the link-data-id
  currentLinkID = linkItem.getAttribute("link-data-id");

  // Extract the text and URL from the link
  const linkText = linkItem.querySelector(".link-text").textContent.trim();
  const linkURL = linkItem.querySelector("a").getAttribute("href");

  // Get the border color from the style attribute
  const borderColor = linkItem.style.getPropertyValue("--border-color").trim();

  // Populate the form fields
  document.getElementById("nameInput").value = linkText;
  document.getElementById("urlInput").value = linkURL;

  // Set the color in the color select field
  const colorSelect = document.getElementById("colorSelect");
  Array.from(colorSelect.options).forEach((option) => {
    if (option.value === borderColor) {
      option.selected = true;
    }
  });

  // Log the current link ID (for debugging)
  console.log("Current Link ID:", currentLinkID);
}

const delBtn = document.querySelector(".icon-delete")




function deleteLink(id) {
  console.log('del', id);
  fetch(`${url}/${id}`, { method: 'DELETE' }).then((result) => LinkFetch());
}