<template>
  <div class="wrapper">
    <header>
      <img src="../assets/img/Clouds/cloud1.png" class="cloud-one" >
      <img src="../assets/img/Clouds/cloud2.png" class="cloud-two" >
      <img src="" class="ballon-one">
      <img src="../assets/img/elefanterosa.PNG" class="ballon-two">
      <img src="" class="ballon-three">
      <h1 class="titel">FLY to the Moond</h1>
    </header>
    <section>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.  

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer
    </section>
  </div>
</template>
<style scoped>

.wrapper{
height: 100vh;
overflow-y:auto;
overflow-x: hidden;
perspective: 10px;
background: var(--quaternary-color);
}

header{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  transform-style: preserve-3d;
  z-index: -1;
}

.ballon-one{
  transform: translateZ(-1px) scale(0.5);
  position: absolute;
  right: -10rem;
  
  
}
.ballon-two{
  transform: translateZ(-3px) scale(0.5);
  position: absolute;
bottom: -23rem;
 
}

.ballon-three{
  transform: translateZ(-8px) scale(0.3);
  position: absolute;
  bottom: -20rem;

}


.cloud-one{
position: absolute;
height: 100%;
width: 100%;
object-fit: cover;z-index: 0;
transform: translateZ(-10px) scale(2);

}

.cloud-two{
position: absolute;
height: 100%;
width: 100%;
object-fit: cover;z-index: 0;
transform: translateZ(-4px) scale(2.3);
top: 6rem;
left: 6rem;
opacity: 100%;

}





.titel{
  font-size: 5rem;
  color: var(--quaternary-color);
  position: absolute;
  top: 15rem;
  
}

section{
  font-size: 2rem;
  padding: 2rem;
  background-color: #333;
}

@media (max-width: 639px) {
  .ballon-one{
 left: 14rem;
 top: -10rem;
}

  
  .ballon-three{
 left: 1rem;
 transform: scale(0.5);
 bottom: -2rem;
}
.ballon-two{
  transform: translateZ(-3px);
  bottom: -5rem;
}
.titel{
  margin-top: 2rem;
  
}

}
</style>