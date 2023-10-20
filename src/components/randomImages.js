//import React, {useEffect, useState} from "react"

import image1 from '../assets/img/shutterstock_150276857.jpg';
import image2 from '../assets/img/shutterstock_1493149190.jpg';
import image3 from '../assets/img/shutterstock_1197120001.jpg';
import image4 from '../assets/img/shutterstock_181679270.jpg';
import image5 from '../assets/img/shutterstock_189992306.jpg';
import image6 from '../assets/img/shutterstock_255040654.jpg';
import image7 from '../assets/img/shutterstock_290143517.jpg';
import image8 from '../assets/img/shutterstock_343735859.jpg';
import image9 from '../assets/img/shutterstock_610061735.jpg';
import image10 from '../assets/img/shutterstock_717437125.jpg';
import image11 from '../assets/img/shutterstock_1036798300.jpg';
import image12 from '../assets/img/shutterstock_1089540233.jpg';
import image13 from '../assets/img/shutterstock_1196903887.jpg';
import image14 from '../assets/img/shutterstock_112082681.jpg';
import image15 from '../assets/img/shutterstock_1241041093.jpg';
import image16 from '../assets/img/shutterstock_1458350501.jpg';
import image17 from '../assets/img/shutterstock_128794678.jpg';
import image18 from '../assets/img/shutterstock_1736524841.jpg';
import image19 from '../assets/img/shutterstock_1913234911.jpg';

const randomImage = (index) => {
  const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
  image19
  ];
  
  if(index > 18) {
  index = index - 18;
  }
  if(index > 36) {
  index = index - 36;
  }
  let src = images[index] + "?Mode=crop&width=450&height=250"
  return src;
  }
  
  export default randomImage;