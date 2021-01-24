<template>
    <div>
        <h1>InfoBox</h1>
        <ul>

        </ul>
        <span> During {{selectedMonth}}</span>
        <span> in {{selectedCountry}}:</span>
        <div><br>There was {{confirmedCasesThisMonth}} confirmed cases. </div>
        <div><br>There was {{deathsThisMonth}} confirmed deaths this month. </div>

    </div>
</template>

<script>
import { getAPI } from '../axios-api'



export default {
    props: ['selectedMonth', 'selectedCountry'],
    methods: {
        fetchAPI: function () {
            getAPI.get(this.selectedMonth)
            .then((response) => {
                this.APIData = response.data.Document
                console.log('/n STARTING API CALL')
                console.log(this.APIData)
                let confirmedCasesThisMonth = 0;
                let deathsThisMonth = 0;

                response.data.Document.forEach(element => {
                    if ((element.country_region || element['country_region_[0]']) === this.selectedCountry) {
                        confirmedCasesThisMonth += element.confirmed
                        console.log('Number of entries for: ' + element.country_region)
                        if (element.deaths) {
                            deathsThisMonth += parseFloat(element.deaths)
                        }
                    } 
                })
                this.confirmedCasesThisMonth = confirmedCasesThisMonth
                this.deathsThisMonth = deathsThisMonth

                console.log('Confirmed cases: ' + confirmedCasesThisMonth)
                console.log('Confirmed deaths: ' + deathsThisMonth)
                console.log('API CALL COMPLETE /n')
            })
        },


        fetchConfirmedCasesAPI: function () {
            getAPI.get('time_series_confirmed_global')
            .then((response) => {
                this.APIData = response.data.Document
                console.log('/n STARTING API CALL')
                console.log(this.APIData)

                response.data.Document.forEach(element => {
                    if (element.country_region === this.selectedCountry) {
                        this.confirmedCasesThisMonth = this.getConfirmedCasesPerMonth(element);
                    } 
                })
                console.log('API CALL COMPLETE /n')
            })
        },

        getConfirmedCasesPerMonth: function (response) {
            if (response[this.selectedMonth + "312020"]) {
                return response[this.selectedMonth + "312020"]
            } 
            else if (response[this.selectedMonth + "302020"]) {
                return response[this.selectedMonth + "302020"]
            }
            else if (response[this.selectedMonth + "292020"]) {
                return response[this.selectedMonth + "292020"]
            }
            else if(response[this.selectedMonth + "282020"]) {
                return response[this.selectedMonth + "282020"]
            }
        }

    },
    
    data() {
        return {
            APIData: [],
            confirmedCasesThisMonth: 0,
            deathsThisMonth: 0
        }
    },

    created () {
        this.fetchConfirmedCasesAPI()
    },

    updated () {
        console.log('UPDATED START')
        console.log(this.selectedMonth)
        console.log(this.selectedCountry)
        this.fetchConfirmedCasesAPI()
        console.log('UPDATED END')
    }

    
    
}

</script>