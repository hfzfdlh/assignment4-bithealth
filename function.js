// function getData(BASE_URL, countryName){
//     $.ajax(`${BASE_URL}/statistics?country=${countryName}`,{
//         method:'GET',
//         headers:{
//             'X-RapidAPI-Key': '6e0b67e19amshde0c85ce1a9ccbep1ea652jsn6ddfc14d2c41',
//             'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
//         }
//     })
//     .done((data)=>{
//         if (!Array.isArray(data.errors)){
//             // throw new Error("Input is Wrong/Empty")
//             console.log(data)
//             $('#error-message').show()
//             $('#error-message').text(data.errors.country)
//             emptyData()
//         }
//         if (data.response.length < 1 ){
//             console.log(data)
//             $('#error-message').show()
//             $('#error-message').text("Country does not exist/Input Invalid")
//             emptyData()
//         } else{
//             $('#error-message').hide()
//             let response = data.response[0]
//             console.log(data.response)
//             let totDeath = response.deaths.total || 0
//             let active = response.cases.active || 0
//             let newCase = response.cases.new || 0
//             let recCase = response.cases.recovered || 0
//             let totCase = response.cases.total || 0
//             let totTest = response.tests.total || 0
//             fillData(active,newCase,recCase, totCase, totDeath, totTest)
//         }
        
//     })
//     .fail((err)=>{
//         console.log(err)
//     })
    
// }

async function getData(BASE_URL,countryName){
    try {
        const url = BASE_URL +`/statistics?country=${countryName}`
        // console.log(url)
        const responses = await fetch(url,{
            method:"GET",
            headers:{
                'X-RapidAPI-Key': '6e0b67e19amshde0c85ce1a9ccbep1ea652jsn6ddfc14d2c41',
                'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
            }
        })
        const res = JSON.parse(await responses.text())

        if (!Array.isArray(res.errors)){
            // throw new Error("Input is Wrong/Empty")
            console.log(res)
            let getP = document.getElementById('error-message')
            getP.innerHTML = res.errors.country
            getP.style.display="block"
            // $('#error-message').text(data.errors.country)
            emptyData()
        }
        if (res.response.length < 1 ){
            // console.log(res)
            let getP = document.getElementById('error-message')
            getP.innerHTML ="Input Invalid/ Country not available"
            getP.style.disp("block")
            emptyData()
        } else{
            // $('#error-message').hide()
            document.getElementById('error-message').style.display = "none"
            let search = `You are searching: ${countryName}`
            document.getElementById('search-res').innerText = search
            document.getElementById('search-res').style.display = "block"
            let response = res.response[0]
            console.log(res)
            let totDeath = response.deaths.total || 0
            let active = response.cases.active || 0
            let newCase = response.cases.new || 0
            let recCase = response.cases.recovered || 0
            let totCase = response.cases.total || 0
            let totTest = response.tests.total || 0
            fillData(active,newCase,recCase, totCase, totDeath, totTest)
        }
    } catch (error) {
        
    }
}


// const fillData = (active, newCase, recCase,totCase, totDeath, totTest)=>{
//     $('#active-cases').text(active)
//     $('#new-cases').text(newCase)
//     $('#rec-cases').text(recCase)
//     $('#total-cases').text(totCase)
//     $('#total-death').text(totDeath)
//     $('#total-test').text(totTest)
// }

// const emptyData = ()=>{
//     $('#active-cases').text("")
//     $('#new-cases').text("")
//     $('#rec-cases').text("")
//     $('#total-cases').text("")
//     $('#total-death').text("")
//     $('#total-test').text("")
// }

const fillData = (active, newCase, recCase,totCase, totDeath, totTest)=>{
    document.getElementById('active-cases').innerText = active
    document.getElementById('new-cases').innerText = newCase
    document.getElementById('rec-cases').innerText = recCase
    document.getElementById('total-cases').innerText = totCase
    document.getElementById('total-death').innerText = totDeath
    document.getElementById('total-test').innerText = totTest
}

const emptyData = ()=>{
    document.getElementById('active-cases').style.display = "none"
    document.getElementById('new-cases').style.display = "none"
    document.getElementById('rec-cases').style.display = "none"
    document.getElementById('total-cases').style.display = "none"
    document.getElementById('total-death').style.display = "none"
    document.getElementById('total-test').style.display = "none"

}

