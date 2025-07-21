<template>
  <div class="wrapper">
    <header>
      <img src="../assets/img/Clouds/cloud1.png" class="cloud-one" >
      <img src="../assets/img/Clouds/cloud2.png" class="cloud-two" >
      <img src="" class="ballon-one">
      <img src="../assets/img/elefanterosa.PNG" class="ballon-two">
      <img src="" class="ballon-three">
      <h1 class="titel">That’s yours truly</h1>
    </header>
    <section>
      Like the pink elephant floating above, I’ve always had a thing for defying gravity.  
I was born to walk, but all I want is to fly.

I’m a web developer with solid experience building modern, responsive websites that not only work great — they feel alive. On top of that, I currently work as a materials inspector, where attention to detail isn’t just a skill — it’s a must.

Between code and construction sites, I’ve found a passion for solving problems in unexpected ways. Whether it’s designing an interactive landing page or inspecting a weld with precision, I bring the same energy: curious, creative, and always looking for lift-off.

If you’re into bold ideas, flying elephants, or just want to build something cool —  
you’re in the right place.
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