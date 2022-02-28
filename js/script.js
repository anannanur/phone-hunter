
// loading data 
const loadData = () => {
    const searchText = document.getElementById('search-text').value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(response => response.json())
        .then(data => displayPhone(data.data))
}
// displaying phone by search name 
const displayPhone = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    console.log(phones);
    for (const phone of phones) {
        console.log(phone);
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