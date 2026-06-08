import { createTimeline } from 'animejs';

const obj = { translateX: '0px' };

const tl = createTimeline({
  autoplay: false
});

tl.add(obj, {
  translateX: [
    { to: '10px', duration: 330 },
    { to: '50px', duration: 120 },
    { to: '100px', duration: 550, easing: 'easeOutElastic(1, 0.75)' }
  ]
});

console.log('Seeking...');
tl.seek(450);
console.log('After seek(450):', obj);
tl.seek(800);
console.log('After seek(800):', obj);
tl.seek(1000);
console.log('After seek(1000):', obj);


