

const loadPhone = async (search, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
  const res = await fetch(url)
  const data = await res.json()
  displayPhone(data , dataLimit);
}




const displayPhone = (data, dataLimit) => {

  let phones = data.data;

  const phoneContainer = document.getElementById('phone-container')
  phoneContainer.innerHTML = ''

  const noFoundMsg = document.getElementById('no-found-msg')

  if (phones.length === 0) {
    noFoundMsg.classList.remove('d-none')
  } else {
    noFoundMsg.classList.add('d-none')
  }

  const showAll = document.getElementById('show-all')
  if(dataLimit && phones.length > 6){
    phones = phones.slice(0,6)
    showAll.classList.remove('d-none')

  }else{
    showAll.classList.add('d-none')
  }

  phones.forEach(phone => {
   
    const col = document.createElement('div')
    col.classList.add('col')
    col.innerHTML = `<div class="col ">
    <div class="card phone-card d-flex align-items-center justify-content-center p-3">
      <img src="${phone.image}" class="phone-image" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">${phone.brand}</p>
        <button onclick="loadDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>

      </div>
    </div>
  </div>`
    phoneContainer.appendChild(col)

  });
  loadSpinner(false)
}

const searchProcess = (dataLimit)=>{
  loadSpinner(true)
  const searchField = document.getElementById("search-field")
  const searchText = searchField.value
  loadPhone(searchText , dataLimit)
}




document.getElementById("search-btn").addEventListener("click", () => {
  
  searchProcess(6)
})
document.getElementById('search-field').addEventListener('keypress', (e)=>{
 if(e.key == 'Enter'){
  searchProcess(6)
 }
})

document.getElementById('btn-show-all').addEventListener('click', ()=>{
  searchProcess()
})


const loadSpinner = isLoading => {
  const spinner = document.getElementById('spinner')
  if (isLoading) {
    spinner.classList.remove('d-none')
  } else {
    spinner.classList.add('d-none')
  }
}
const loadDetails = async (id) =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url)
  const data = await res.json()
  displayDetails(data)
}

const displayDetails = (phone)=>{
  
  const phoneData = phone.data
  console.log(phoneData);
  const modalBody = document.getElementById('modal-body')
  modalBody.innerHTML = `<h2>Name: ${phoneData.name}</h2>
  <h4>Brand: ${phoneData.brand}</h4>
  <div>
    <h5>Main Features</h5>
    <ul>
        <li>Chipset: ${phoneData.mainFeatures.chipSet}</li>
        <li>Display Size: ${phoneData.mainFeatures.displaySize}</li>
        <li>Memory: ${phoneData.mainFeatures.memory}</li>
        <li>Sensor: ${phoneData.mainFeatures.sensors.join(' , ')}</li>
        <li>Others: ${phoneData.others.Bluetooth} , ${phoneData.others.GPS} , ${phoneData.others.USB} , ${phoneData.others.WLAN} , NFC:${phoneData.others.NFC} , Radio:${phoneData.others.Radio}</li>
    </ul>
    <h6>Release Date: <span class="text-danger">${phoneData.releaseDate ? phoneData.releaseDate : ' Coming Soon' }</span> </h6>
  </div>`

}






loadPhone('phone')