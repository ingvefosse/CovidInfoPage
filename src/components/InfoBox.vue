<template>
    <div>
        
        <div><br> <strong>Information from {{selectedCountry}} for {{selectedMonth}}/2020:</strong></div>
        
        <div><br>Total statistics:</div>
        <li>Total number of confirmed cases: {{confirmedCasesThisMonth}}</li>
        <li>Total number of recoveries: {{confirmedCasesThisMonth - deathsThisMonth}}</li>
        <li>Total number of deaths: {{deathsThisMonth}}</li>

        <div><br>Changes this month:</div>
        <li>New cases this month: {{confirmedCasesThisMonth - confirmedCasesLastMonth}}</li>
        <li>New amount of recoveries: {{(confirmedCasesThisMonth - confirmedCasesLastMonth) - (deathsThisMonth - deathsLastMonth)}}</li>
        <li>New deaths this month: {{deathsThisMonth - deathsLastMonth}}</li>

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
                response.data.Document.forEach(element => {
                    if (element.country_region === this.selectedCountry) {
                        this.confirmedCasesThisMonth = this.getLastDayOfMonth(element);
                        this.confirmedCasesLastMonth = this.getLastDayOfLastMonth(element);
                    } 
                })
            })
        },

        fetchConfirmedDeathsAPI: function () {
            getAPI.get('time_series_deaths_global')
            .then((response) => {
                this.APIData = response.data.Document
                response.data.Document.forEach(element => {
                    if (element.country_region === this.selectedCountry) {
                        this.deathsThisMonth = this.getLastDayOfMonth(element);
                        this.deathsLastMonth = this.getLastDayOfLastMonth(element);
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

        getLastDayOfLastMonth: function(response) {
            this.lastMonth = this.selectedMonth - 1
            if (response[this.selectedMonth + "/31/20"]) {
                if (response[this.lastMonth + "/31/20"]) {
                    return response[this.lastMonth + "/31/20"]
                }
                else if (response[this.lastMonth + "/30/20"]) {
                    return response[this.lastMonth + "/30/20"]
                }
                else if (response[this.lastMonth + "/29/20"]) {
                    return response[this.lastMonth + "/29/20"]
                }
                else if(response[this.lastMonth + "/28/20"]) {
                    return response[this.lastMonth + "/28/20"]
                }
            } 
            else if (response[this.selectedMonth + "/30/20"]) {
                if (response[this.lastMonth + "/30/20"]) {
                    return response[this.lastMonth + "/30/20"]
                }
                else if (response[this.lastMonth + "/29/20"]) {
                    return response[this.lastMonth + "/29/20"]
                }
                else if(response[this.lastMonth + "/28/20"]) {
                    return response[this.lastMonth + "/28/20"]
                }
            }
            else if (response[this.selectedMonth + "/29/20"]) {
                if (response[this.lastMonth + "/29/20"]) {
                    return response[this.lastMonth + "/29/20"]
                }
                else if(response[this.lastMonth + "/28/20"]) {
                    return response[this.lastMonth + "/28/20"]
                }
            }
            else if(response[this.selectedMonth + "/28/20"]) {
                if(response[this.lastMonth + "/28/20"]) {
                    return response[this.lastMonth + "/28/20"]
                }
            }
        }
    },
    
    data() {
        return {
            APIData: [],
            countries: [],
            confirmedCasesThisMonth: 0,
            confirmedCasesLastMonth: 0,
            lastMonth: 0,
            deathsThisMonth: 0,
            deathsLastMonth: 0
        }
    },

    created () {
        this.fetchConfirmedCasesAPI()
        this.fetchConfirmedDeathsAPI()
    },

    updated () {
        this.fetchConfirmedCasesAPI()
        this.fetchConfirmedDeathsAPI()
    }
}

</script>