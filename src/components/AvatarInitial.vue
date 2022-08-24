<template>
  <div class="avatar-initials imaged flex justify-center items-center" :class="{rounded: dimension == 100}" ref="avatar" :style="{
    backgroundColor: colors[colorIndex],
    width: width,
    height: height,
    font: font,
    color: '#fff',
    borderRadius: rounded +'px',
    padding: width / 10 +'px',
  }"
  >
  {{initials}}
  </div>
</template>

<script>
export default {
  props: {
    name: {type: String, required: true},
    rounded: {type: Number, default: 10},
    dimension: Number,
  },
  data(){
    return{
      fullName: this.name,
      colors: ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"],
      initials: '',
      charIndex: '',
      colorIndex: '',
    }
  },
  computed: {
    width(){
      if(this.dimension){
        return `${this.dimension}px`
      }else{
        return '40px'
      }
    },
    height(){
      if(this.dimension){
        return `${this.dimension}px`
      }else{
        return '40px'
      }
    },
    font(){
      if(this.dimension){
        return  `${this.dimension / 2.2}px Arial`
      }
      else{
        return `${40 / 2.2}px Arial`
      }
    },
  },
  mounted() {
    let array_after_split = this.fullName.split(" ");
    if(array_after_split.length == 1){
      this.initials = this.fullName.split(" ")[0].charAt(0).toUpperCase();
    }
    else if (array_after_split.length == 2) {
      this.initials = this.fullName.split(" ")[0].charAt(0).toUpperCase() + this.fullName.split(" ")[1].charAt(0).toUpperCase();
    }
    else{
      this.initials = this.fullName.split(" ")[0].charAt(0).toUpperCase() + this.fullName.split(" ")[1].charAt(0).toUpperCase();
    }
    this.charIndex = this.initials.charCodeAt(0) - 65;
    this.colorIndex = this.charIndex % 19;
  },
};
</script>

<style scoped>
/* .avatar-initials {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
} */
</style>
