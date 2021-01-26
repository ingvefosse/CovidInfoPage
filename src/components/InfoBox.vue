<template>
    <div>
        
        <div><br>Information from {{selectedCountry}} for {{selectedMonth}}/2020:</div>
        <div><br>Total number of confirmed cases: {{confirmedCasesThisMonth}}</div>
        <div><br>Total number of deaths: {{deathsThisMonth}}</div>


    </div>
</template>

<script>
import { getAPI } from '../axios-api'



export default {
    props: ['selectedMonth', 'selectedCountry'],
    methods: {
        


        fetchConfirmedCasesAPI: function () {
            getAPI.get('time_series_confirmed_global')
            .then((response) => {
                this.APIData = response.data.Document
                console.log(this.APIData)

                response.data.Document.forEach(element => {
                    if (element.country_region === this.selectedCountry) {
                        this.confirmedCasesThisMonth = this.getLastDayOfMonth(element);
                    } 
                })
            })
        },

        fetchConfirmedDeathsAPI: function () {
            getAPI.get('time_series_deaths_global')
            .then((response) => {
                this.APIData = response.data.Document
                console.log(this.APIData)

                response.data.Document.forEach(element => {
                    if (element.country_region === this.selectedCountry) {
                        this.deathsThisMonth = this.getLastDayOfMonth(element);
                    } 
                })
            })
        },

        getLastDayOfMonth: function (response) {
            if (response[this.selectedMonth + "/31/20"]) {
                return response[this.selectedMonth + "/31/20"]
            } 
            else if (response[this.selectedMonth + "/30/20"]) {
                return response[this.selectedMonth + "/30/20"]
            }
            else if (response[this.selectedMonth + "/29/20"]) {
                return response[this.selectedMonth + "/29/20"]
            }
            else if(response[this.selectedMonth + "/28/20"]) {
                return response[this.selectedMonth + "/28/20"]
            }
        },

        getArrayOfCountries: function(response) {
            response.Document.forEach(entry => {
                let country = entry.Document.country_region
                this.countries.push(country)
            })
        }
    },
    
    data() {
        return {
            APIData: [],
            countries: [],
            confirmedCasesThisMonth: 0,
            deathsThisMonth: 0
        }
    },

    created () {
        this.fetchConfirmedCasesAPI()
        this.fetchConfirmedDeathsAPI()
    },

    updated () {
        console.log('UPDATED START')
        console.log(this.selectedMonth)
        console.log(this.selectedCountry)
        this.fetchConfirmedCasesAPI()
        this.fetchConfirmedDeathsAPI()
        console.log('UPDATED END')
    }
}

</script>