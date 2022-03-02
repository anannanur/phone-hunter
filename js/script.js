const newDiv = document.getElementById('new-div');
// loading data 
const loadData = () => {
    const searchText = document.getElementById('search-text').value;

    // error handling 
    if (searchText == '') {
        newDiv.innerHTML = `
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
        newDiv.innerHTML = `
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
    // fetching data here 
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
    const top20Phones = phones.slice(0, 20);
    if (phones.length == '') {
        newDiv.innerHTML = `
        <!-- Flexbox container for aligning the toasts -->
        <div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center align-items-center w-100">
    
        <!-- Then put toasts within -->
            <div class="toast show bg-danger text-white" role="alert" aria-live="assertive" aria-atomic="true">           
                <div class="d-flex">
                    <div class="toast-body">
                        No phone found of this name...
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>`;
        document.getElementById('phone-container').textContent = '';
    }

    for (const phone of top20Phones) {
        document.getElementById('new-div').textContent = '';
        const div = document.createElement('div');
        div.className = 'col-12 col-md-6 col-lg-4 mb-4';
        div.innerHTML = `
            <div class="card h-100 pt-5 pb-2 shadow">
                <div class="text-center">
                    <img src="${phone.image}" class="img-fluid" width="233px" height="233px">
                </div>
                <div class="card-body mt-2">
                    <h3 class="card-title text-dark fw-bold">${phone.phone_name}</h3>
                    <h4 class="card-text text-danger fw-bold">${phone.brand}</h4>
                    <button class="btn btn-primary mt-1" onclick="exploreDetails('${phone.slug}')">Explore it</button>
                </div>
            </div>         
       `;
        phoneContainer.appendChild(div);
    }
}
// exploring details 
const exploreDetails = (slug) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(response => response.json())
        .then(data => showDetails(data.data));

}
const showDetails = (details) => {
    newDiv.innerHTML = `
            <div class="row shadow text-dark py-5 mt-5 d-md-flex align-items-md-center rounded">
                <div class="col-12 col-md-5 text-center">
                    <img src="${details.image}" alt="" width="270px" height="400px">
                    <h5 class="card-title text-dark fw-bold mt-4">${details.name}</h5>
                    <h4 class="text-danger fw-bold mt-2"><span class="text-dark">Brand:</span> ${details.brand}</h4>
                </div>
                <div class="col-12 col-md-7 mt-4 mt-md-0 px-4 px-md-2 px-lg-0">
                    <p><span class="fw-bold text-dark">Release Date:</span> ${details?.releaseDate ? details.releaseDate : "Date is not available"}</p>
                    <p><span class="fw-bold text-dark">Chipset:</span> ${details?.mainFeatures?.chipSet ? details.mainFeatures.chipSet : 'Not available'}</p>
                    <p><span class="fw-bold text-dark">Display size:</span> ${details?.mainFeatures?.displaySize ? details.mainFeatures.displaySize : 'Not available'}</p>
                    <p><span class="fw-bold text-dark">Memory:</span> ${details?.mainFeatures?.memory ? details.mainFeatures.memory : 'Not available'}</p>
                    <p><span class="fw-bold text-dark">Storage:</span> ${details?.mainFeatures?.storage ? details.mainFeatures.storage : 'Not available'}</p>
                    <h3 class="fw-bold text-dark">Sensors</h3>
                        <ul>
                            <li>${details.mainFeatures?.sensors[0] ? details.mainFeatures.sensors[0] : '-'}</li>
                            <li>${details.mainFeatures?.sensors[1] ? details.mainFeatures.sensors[1] : '-'}</li>
                            <li>${details.mainFeatures?.sensors[2] ? details.mainFeatures.sensors[2] : '-'}</li>
                            <li>${details.mainFeatures?.sensors[3] ? details.mainFeatures.sensors[3] : '-'}</li>
                            <li>${details.mainFeatures?.sensors[4] ? details.mainFeatures.sensors[4] : '-'}</li>
                            <li>${details.mainFeatures?.sensors[5] ? details.mainFeatures.sensors[5] : '-'}</li>
                        </ul>
                    <h3 class="fw-bold text-dark">Others</h3>
                        <ul>
                            <li><span class="fw-bold text-dark">Bluetooth:</span> ${details?.others?.Bluetooth ? details.others.Bluetooth : 'not available'}</li>
                            <li><span class="fw-bold text-dark">GPS:</span> ${details?.others?.GPS ? details.others.GPS : 'not available'}</li>
                            <li><span class="fw-bold text-dark">NFC:</span> ${details?.others?.NFC ? details.others.NFC : 'not available'}</li>
                            <li><span class="fw-bold text-dark">Radio:</span> ${details?.others?.Radio ? details.others.Radio : 'not available'}</li>
                            <li><span class="fw-bold text-dark">USB:</span> ${details?.others?.USB ? details.others.USB : 'not available'}</li>
                            <li><span class="fw-bold text-dark">WLAN:</span> ${details?.others?.WLAN ? details.others.WLAN : 'not available'}</li>
                        </ul>
                </div>
            </div>  
    `;
    window.scrollTo(top);
}