let myRow = document.querySelector(".country")
let myRowNone = document.querySelector(".none")
let searchInput = document.querySelector("input[name='search']")
let searchBtn = document.querySelector(".searchBtn")
let form = document.querySelector("form")

let Mode = document.querySelector(".Mode");
let modeIcon = document.querySelector(".Mode i");
let nav = document.querySelector("nav");

Mode.addEventListener("click", function(){
    if(modeIcon.classList.contains("far")){ //DARK MODE
        modeIcon.classList.replace("far", "fa");
    }
    else{
    modeIcon.classList.replace("fa", "far"); // LIGHT MODE
    }
    document.body.classList.toggle("dark-nav")
})

function newDivCollapse () {

    let newDiv = document.createElement("div")
        newDiv.classList.add("col-md-3")

    newDiv.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src=${country.flag} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title"><strong>${country.name}</strong></h5>
                <p class="card-text"><strong>Population:</strong> ${country.population}</p>
                <p class="card-text"><strong>Region:</strong> ${country.region}</p>
                <p class="card-text"><strong>Capital: </strong>${country.capital}</p>
            </div>
        </div>
        `
        myRow.append(newDiv)

}

let countriesPart = document.querySelectorAll(".countries")

async function AllCountries(path){
    let url = `https://restcountries.eu/rest/v2/${path}`;
    
    console.log(url)
    let countries = await (await fetch(url)).json()
    console.log(countries)
   

    countries.forEach((country, key) => {
        let newDiv = document.createElement("div")
        newDiv.classList.add("col-md-3")

        
        newDiv.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src=${country.flag} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title"><strong>${country.name}</strong></h5>
                <p class="card-text"><strong>Population:</strong> ${country.population}</p>
                <p class="card-text"><strong>Region:</strong> ${country.region}</p>
                <p class="card-text"><strong>Capital: </strong>${country.capital}</p>
            </div>
        </div>
        `
        myRow.append(newDiv)
        searchBtn.addEventListener("click", function(){
            newDiv.remove()
        })
        countriesPart.forEach(countryPart => {
            countryPart.addEventListener("click", function(){
                newDiv.remove()
            })
        })

        let cards = newDiv.querySelectorAll(".card");



        cards.forEach(card => {
            card.addEventListener("click", function(){
                console.log(country.name)

                // card.classList.add("d-none");

                myRow.classList.add("d-none")
                myRowNone.classList.remove("d-none")


                let newDivImgs = document.createElement("div")
                newDivImgs.classList.add("col-md-6")
                newDivImgs.classList.add("imgSide")
                newDivImgs.classList.add("mt-5")

                newDivImgs.innerHTML = `
                    <div class="imgs">
                        <img src=${country.flag} class="card-img-top flagCountry" alt="...">
                    </div>
                `
                let newDivAbouts = document.createElement("div")
                newDivAbouts.classList.add("col-md-6")
                newDivAbouts.classList.add("abouteSide")
                newDivAbouts.classList.add("mt-5")

                newDivAbouts.innerHTML = `
                <div class="nameCountry"><strong>${country.name}</strong></div>
                <div class="aboutes row">
                    <div class="col-md-6">
                        <p><strong>Native name:</strong> ${country.nativeName}</p>
                        <p><strong>Papulation:</strong> ${country.population}</p>
                        <p><strong>Region:</strong> ${country.region}</p>
                        <p><strong>Sub Region name:</strong> ${country.subregion}</p>
                        <p><strong>Capital: </strong> ${country.capital}</p>
                    </div>

                    <div class="col-md-6">
                        <p><strong>Domain</strong> ${country.topLevelDomain.map(domain => domain)}</p>
                        <p><strong>Currencies:</strong> ${country.currencies.map(curr => curr.code)}</p>
                        <p><strong>Languages:</strong> ${country.languages.map(lang => lang.name)}</p>
                    </div>
                    <p class="mt-5"><strong>Border Countries:</strong>
                     <span class="border">${country.borders.map(border => border + " ")}</span>
                    </p>
                </div>

                `
                

                myRowNone.append(newDivImgs)
                myRowNone.append(newDivAbouts)

                let back = document.querySelector(".back")

                back.addEventListener("click", function(){
                    // location.reload()

                    newDivImgs.style.display = "none"
                    newDivAbouts.style.display = "none"


                    myRow.classList.remove("d-none")
                    myRowNone.classList.add("d-none")

                })

            })
        })

        let back = document.querySelector(".back")

        back.addEventListener("click", function(){
            // location.reload()

            // newDivImgs.innerHTML = ""
            // newDivAbouts.innerHTML = ""

            setTimeout(()=>{
                myRow.classList.remove("d-none")
                myRowNone.classList.add("d-none")
            }, 100)
        })
    })
}

countriesPart.forEach(countryPart => {
    countryPart.addEventListener("click", function(e){
        console.log(e.target.innerText)
        e.preventDefault()
        searchInput.value = ""

        if(e.target.innerText === "All"){
            AllCountries("all")
        }
        else{
            AllCountries(`region/${e.target.innerText}`)
        }
        newDivCollapse()
    })
})

searchBtn.addEventListener("click", function(){
    // newDiv.innerHTML = ""
    if(!searchInput.value == ""){
        AllCountries(`name/${searchInput.value}`)
        newDivCollapse()

    }else{
        AllCountries("all")
    }

})

 if(searchInput.value == ""){
         AllCountries("all")
}
form.addEventListener("submit",function(e){
    e.preventDefault()
})
// MODAL




