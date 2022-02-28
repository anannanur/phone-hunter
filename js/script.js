const errorMsg = document.getElementById('error-msg');
// loading data 
const loadData = () => {
    const searchText = document.getElementById('search-text').value;
    console.log(typeof(searchText));
    if (searchText == '') {
        errorMsg.innerHTML = `
            <!-- Flexbox container for aligning the toasts -->
            <div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center align-items-center w-100">
        
            <!-- Then put toasts within -->
            <div class="toast show bg-danger text-white" role="alert" aria-live="assertive" aria-atomic="true">           
                <div class="d-flex">
                <div class="toast-body">
                        Search-box can't be empty!!
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        </div>`;
        document.getElementById('phone-container').textContent = '';
    }

    else if (isNaN(searchText) == false) {
        errorMsg.innerHTML = `
        <!-- Flexbox container for aligning the toasts -->
        <div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center align-items-center w-100">
    
        <!-- Then put toasts within -->
        <div class="toast show bg-danger text-white" role="alert" aria-live="assertive" aria-atomic="true">           
            <div class="d-flex">
            <div class="toast-body">
                   Please give your favourite phone name..
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>`;
    document.getElementById('phone-container').textContent = '';
   
    }
    
    else {
        document.getElementById('phone-container').textContent = '';
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(response => response.json())
            .then(data => displayPhone(data.data))
    }
    document.getElementById('search-text').value = '';
    
}
// displaying phone by search name 
const displayPhone = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    const top20Phones = phones.slice(0,20);
    console.log(top20Phones);
    if (phones.length == '') {
        errorMsg.innerHTML = `
        <!-- Flexbox container for aligning the toasts -->
        <div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center align-items-center w-100">
    
        <!-- Then put toasts within -->
        <div class="toast show bg-danger text-white" role="alert" aria-live="assertive" aria-atomic="true">           
            <div class="d-flex">
            <div class="toast-body">
                   No results found...
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>`;
    document.getElementById('phone-container').textContent = '';
    }
    for (const phone of top20Phones) {
        // console.log(phone);      
        document.getElementById('error-msg').textContent = '';
        const div = document.createElement('div');
        div.className = 'col-12 col-md-6 mt-5 col-lg-4';
        div.innerHTML = `
            <div class="card h-100 pt-5 pb-2 px-2">
                <div class="text-center">
                    <img src="${phone.image}" class="img-fluid" width="233px" height="233px">
                </div>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <h4 class="card-text">${phone.brand}</h4>
                    <a href="#" class="btn btn-primary">Explore it</a>
                </div>
            </div>          
       `;
        phoneContainer.appendChild(div);
    }
    
    

}