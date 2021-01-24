<template>
<div>
    <div>
        <select v-model="selectedMonth">
            <option disabled value="">Select month</option>
            <option>jan</option>
            <option>feb</option>
            <option>mar</option>
            <option>apr</option>
            <option>may</option>
            <option>jun</option>
            <option>jul</option>
            <option>aug</option>
            <option>sep</option>
            <option>oct</option>
            <option>nov</option>
            <option>dec</option>
        </select>
        <select v-model="selectedCountry">
            <option disabled value="">Sort by Country</option>
            <option>Mainland China</option>
            <option>China</option>
            <option>Nepal</option>
            <option>US</option>
            <option>Australia</option>
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