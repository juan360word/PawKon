
// Informacion de aniamles

import Image1  from '/Perro1.png'
import Image2 from '/Gato1.png'
import Image3 from '/Pin.png'
import Image4 from '/OsoBonito.png'
import Image5 from '/ciervo.png'
import Image6 from '/Cerdito.png'
import Image7 from '/Tony.png'


// Informacion Tools

import Tool1 from '/digitalXray.png'
import Tool2 from '/sonido.png'
import Tool3 from '/Sugery.png'
import Tool4 from '/Laboratoy.png'
import Tool5 from '/Patio.png'
import Tool6 from '/eat.png'
import Tool7 from '/Lavado.png'
import Tool8 from '/toys.png'


export const AnimalesData = [
    {
        id:1,
        name:'Jorge',
        breed:'Beagle',
        image:Image1,
        description: {
          en:'This little dog was found on the street. His name is Jorge; he`s a very cute, friendly dog, and the most amazing thing is that he smiles.',
          es:'Este perrito fue encontrado en la calle. Se llama Jorge; es muy tierno y amigable, y lo más increíble es que sonríe.'
        }

    },
    {
        id:2,
        name:'Geto',
        breed:'Cornish Rex ',
        image:Image2,
        description:{
          en:'A cat that was found in an abandoned house, but we rescued him. The best part is that he stuck out his tongue when we took his picture.',
          es: 'Un gato que fue encontrado en una casa abandonada, pero lo rescatamos. Lo mejor es que sacó la lengua cuando le tomamos la foto.'
        }
    },
    {
        id:3,
        name:'Rom',
        breed:'Penguin',
        image:Image3,
        description: {
        en: 'A penguin rescued from the wrong hands of people; he was cared for and is now part of our team—he`s very fluffy.',
        es: 'Un pingüino rescatado de las manos equivocadas; fue cuidado y ahora es parte de nuestro equipo — es muy esponjoso.'
    }
    },
    {
        id:4,
        name:'Osito Bonito',
        breed:'Ursidae',
        image:Image4,
         description: {
        en: 'Let us introduce you to Osito Bonito—but we`ve given him the nickname Luis. He`s a very friendly bear; he always has us running around because he`s always wanting to play. Don`t let his eyes intimidate you.',
        es: 'Te presentamos a Osito Bonito — aunque le pusimos el apodo de Luis. Es un oso muy amigable; siempre nos tiene corriendo porque todo el tiempo quiere jugar. No dejes que sus ojos te intimiden.'
    }
    },
    {
        id:5,
        name:'Bambi Junior',
        image:Image5,
         description: {
        en: 'We saved this deer from a bullet—a hunter had tried to kill it, but we saved it, and now it`s happy and living a trouble-free life.',
        es: 'Salvamos a este venado de una bala — un cazador intentó matarlo, pero lo rescatamos, y ahora es feliz y vive una vida sin problemas.'
    }
        
    },
    {
        id:6,
        name:'Pogo',
        image:Image6,
       description: {
        en: 'Pogo was a little pig who lived with owners who loved each other very much, but they separated. They didn`t abandon him, though PawKon found him, gave him a bath, and now he`s playing with the others.',
        es: 'Pogo era un cerdito que vivía con dueños que se querían mucho, pero se separaron. No lo abandonaron, aunque PawKon lo encontró, lo bañó, y ahora juega con los demás.'
    }
    },
    {
        id:7,
        name:'Tony',
        image:Image7,
      description: {
        en: 'Tony was the only dog we couldn`t save. We tried everything we cleaned him, bathed him, gave him everything we could, and kept trying. Even the other animals could sense it and became sad, but he passed away. What makes him special and memorable is the kindness he showed to everyone, and also how much his family loves him.',
        es: 'Tony fue el único perrito que no pudimos salvar. Lo intentamos todo — lo limpiamos, lo bañamos, le dimos todo lo que estaba en nuestras manos. Hasta los otros animales lo sintieron y se pusieron tristes, pero falleció. Lo que lo hace especial y memorable es la bondad que mostró con todos, y también lo mucho que su familia lo ama.'
    }
    }
]


export const VetToolsData = [
    {
    id: 1,
    name: "Digital X-Ray",
    image: Tool1,
    description: "High resolution imaging for accurate bone and organ diagnosis"
  },
  {
    id: 2,
    name: "Ultrasound Scanner",
    image: Tool2,
    description: "Non invasive internal examination in real time"
  },
  {
    id: 3,
    name: "Surgery Room",
    image: Tool3,
    description: "Fully equipped sterile operating room for all procedures"
  },
  {
    id: 4,
    name: "Laboratory",
    image: Tool4,
    description: "In house blood tests and analysis with fast results"
  },
  {
    id:5,
    name:'Campus',
    image:Tool5,
    description:'We also have a very large patio where they and their owners can spend time together'
  },
  {
    id:6,
    name:'Healthful Food',
    image:Tool6,
    description:'We prepare very carefully selected, high-quality meals for them, since we make the food ourselves'
  },
  {
    id:7,
    name:'washing',
    image:Tool7,
    description:'We provide a complete grooming service with no hassle we wash their teeth, paws, tail, and body with great care, just as we would for them and for our employees'
  },
  {
    id:8,
    name:'Toys',
    image:Tool8,
    description:'toys for them so they won`t get scared and can have a good time while playing with other animals'
  }
]

