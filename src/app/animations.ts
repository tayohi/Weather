import { trigger, state, style, animate, transition } from '@angular/animations';

export const Animations = [

  trigger('dataMove', [
    state('in', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(-300px)'
      }),
      animate(600)
    ]),
    transition('* => void', [
      animate(800, style({
        transform: 'translateY(500px)',
        opacity: 0
      }))
    ])
  ]),
  trigger('sunAnim', [
    state('out', style({
      'color': '#FF893E',
      'transform': 'scale(1.2) rotate(70deg)'
    })),
    state('in', style({
      'color': '#FFB837',
      'transform': 'rotate(0deg)'
    })),
    transition('* <=> *', animate(1000)),
  ]),
  trigger('snowAnim', [
    state('out', style({
      'color': '#27AAE1',
      'transform': 'scale(1.2) rotate(70deg)'
    })),
    state('in', style({
      'color': '#92DFF4',
      'transform': 'rotate(0deg)'
    })),
    transition('* <=> *', animate(1000)),
  ]),
  trigger('windAnim', [
    state('out', style({
      'transform': 'translateX(80px) rotate(200deg)'
    })),
    state('in', style({
      'transform': 'translateX(-80px) rotate(-200deg)'
    })),
    transition('* <=> *', animate(1000)),
]),
trigger('Anim', [
  state('out', style({
    'transform': 'translateY(0px)'
  })),
  state('in', style({
    'color': '#0099CE',
    'transform': 'translateY(30px) scale(1.1)'
  })),
  transition('* <=> *', animate(1000)),
]),
trigger('loading', [
  state('out', style({
    'transform': 'rotate(360deg)'
  })),
  state('in', style({
    'transform': 'rotate(360deg)'
  })),
  transition('* <=> *', animate(1000)),
])
];

