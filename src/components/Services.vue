<template>
  <div class="example-component">
    <h1>{{ title }}</h1>
    <h2>{{ subtitle }}</h2>
    <p>{{ description }}</p>

    <div class="section" v-for="(section, index) in sections" :key="index">
      <h3>{{ section.title }}</h3>
      <p>{{ section.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleComponent',
  data() {
    return {
      title: 'Bienvenido a Vue',
      subtitle: 'Este es un ejemplo básico',
      description: 'Vue es un framework progresivo para construir interfaces de usuario de forma eficiente y sencilla.',
      sections: [
        { title: 'Sección 1', text: 'Este es el texto de la primera sección. En esta sección exploraremos cómo Vue puede ayudarte a estructurar tu aplicación de manera eficiente, utilizando componentes reutilizables y una sintaxis clara. Con Vue, puedes crear aplicaciones robustas y escalables con facilidad, centrándote en las necesidades específicas de tus usuarios.' },
        { title: 'Sección 2', text: 'Aquí hay algo de información adicional en la segunda sección. En este apartado, discutiremos cómo integrar Vue con otras herramientas modernas como Vuex para la gestión del estado y Vue Router para la navegación entre vistas. Esto te permitirá mantener tu aplicación organizada y modular, incluso cuando crezca en complejidad.' },
        { title: 'Sección 3', text: 'Finalmente, esta es la tercera sección con más contenido. En esta sección final, nos centraremos en las mejores prácticas para optimizar el rendimiento de tu aplicación Vue. Esto incluye el uso adecuado de directivas, la optimización de componentes y estrategias de carga diferida para mejorar la experiencia del usuario y la velocidad general de la aplicación.' }
      ]
    };
  }
};
</script>

<style scoped>
.example-component {
  text-align: center;
  font-family: Arial, sans-serif;
  background: white;
}

h1 {
  color: #42b983;
}

h2 {
  color: #35495e;
}

h3 {
  color: #2c3e50;
  margin-top: 20px;
}

p {
  color: #606060;
  font-size: 16px;
  margin: 10px 0;
}

.section {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
