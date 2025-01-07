const url =  "http://localhost:3000/links";

window.addEventListener('load', LinkFetch);

function LinkFetch() {
 fetch(url)
  .then((result) => result.json())
   .then((links) => {
    console.log(links);
    
   if (links.length > 0) {
   let html =``
   links.forEach((link) => {
     html +=  `
    <nav class="link-list mw-100 user-select-none">
     <div
     class="link-item position-relative d-flex mw-100 my-3" link-data-id="${link.id}">
    <div class="link-wrapper  position-relative d-flex justify-content-between align-items-center overflow-hidden rounded">
      <a href="${link.url}" target="_blank" class="d-flex w-100 align-items-center justify-content-center text-decoration-none fw-bolder fs-2" aria-label="${link.name}"><span class="link-text">${link.name}</span></a>
    </div>
    <div class="icon-wrapper d-flex flex-column align-items-center position-absolute top-50 .right-0 translate-middle-y" style="right: -2rem;">
      <i data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="bi bi-wrench-adjustable-circle icon-edit fs-4 link-warning link-opacity-50-hover" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Redigera" aria-label="Redigera"></i></i>
      <i id="del" class="bi bi-x-circle icon-delete fs-4 link-warning link-opacity-50-hover" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Ta bort" aria-label="Ta bort"></i>
    </div>
   </div>`;
  
 });



 const linkContainer = document.getElementById('linklist');
 linkContainer.innerHTML = '';
 linkContainer.insertAdjacentHTML('beforeend', html)
 }
 });

}

console.log(linkForm);
linkForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  console.log(linkForm);
    e.preventDefault();
    const serverlinkobject = {
    
      name: '',
      url: '',
      color: '',
    } 
    


    
    serverlinkobject.name = linkForm.nameInput.value
    serverlinkobject.url = linkForm.urlInput.value
    serverlinkobject.color = linkForm.colorSelect.value
     
    console.log(serverlinkobject)
    const id = localStorage.getItem('currentId');
    if (id) {
      serverlinkobject.id = id;
    }
  
    const request = new Request(url, {
      method: serverlinkobject.id ? 'PUT' : 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(serverlinkobject)
    });
  
    fetch(request).then((response) => {
      LinkFetch();
  
      localStorage.removeItem('currentId');
      linkForm.reset();
    });

}


const delBtn = document.querySelector(".icon-delete")


delBtn.addEventListener("click", deleteLink);

function deleteLink(id) {
  console.log('del', id);
  fetch(`${url}/${id}`, { method: 'DELETE' }).then((result) => LinkFetch());
}