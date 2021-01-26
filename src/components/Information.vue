<template>
<div>
    <div>
        <div><br></div>
        <select v-model="selectedMonth">
            <option disabled value="">Select month</option>
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">May</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Aug</option>
            <option value="9">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
        </select>
        <select v-model="selectedCountry">
            <option disabled value="">Sort by Country</option>
            <option>Afghanistan</option>
            <option>Bulgaria</option>
            <option>Colombia</option>
            <option>Egypt</option>
            <option>Finland</option>
            <option>Germany</option>
            <option>Haiti</option>
            <option>India</option>
            <option>Japan</option>
            <option>Kuwait</option>
            <option>Luxembourg</option>
            <option>Moldova</option>
            <option>Nepal</option>
            <option>Norway</option>
            <option>Peru</option>
            <option>Russia</option>
        </select>

    </div>
    <div>
        <InfoBox v-if="selectedMonth && selectedCountry" v-bind:selected-month="selectedMonth" v-bind:selected-country="selectedCountry"/>
    </div>
</div>


</template>

<script>
import InfoBox from './InfoBox.vue'
export default {
  components: { InfoBox },
    data() {
        return {
            selectedMonth: '',
            selectedCountry: ''
        }
        
    }
    
}
</script>